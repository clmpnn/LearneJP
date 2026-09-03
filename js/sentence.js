// LearneJP — a Japanese (JLPT) study app for writing practice, quizzes, and dictionary lookup
// Copyright (C) 2026  Claudia Mithesa Peranginangin
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.
//
// Contact: clmpnn@gmail.com · https://github.com/clmpnn


// Sentence mode for the dictionary panel: paste Japanese text, get every word
// in it looked up. Japanese is written without spaces, so this does three jobs
// the word search never had to do:
//
//   1. deinflect — 食べさせられませんでした has to be walked back to 食べる
//      before the dictionary has anything to say about it;
//   2. segment   — 私は本を読みます has no word boundaries, so we pick the
//      split that explains the whole line with the fewest, best-attested words;
//   3. read      — 食べました is shown as たべました / tabemashita by borrowing
//      the entry's own reading and re-attaching the okurigana from the surface.
//
// Everything runs against the dictionary already in memory (window.DICTIONARY_DATA),
// so this works offline and from file:// like the rest of the site.

(function () {
    'use strict';

    // ===================== TUNING =====================

    const MAX_TOKEN = 12;    // longest substring we'll try to look up at once
    const MAX_INPUT = 3000;  // characters accepted in one go
    const MAX_DEPTH = 5;     // deinflection steps followed before giving up
    const MAX_ENTRIES = 3;   // dictionary entries shown per word

    // ===================== KANA TABLES =====================
    // Godan verbs shift their final kana around one consonant row. Each pair is
    // [inflected kana, dictionary-form kana] for one row of the gojūon.

    const I_STEM = [['い', 'う'], ['き', 'く'], ['ぎ', 'ぐ'], ['し', 'す'], ['ち', 'つ'],
                    ['に', 'ぬ'], ['び', 'ぶ'], ['み', 'む'], ['り', 'る']];
    const A_STEM = [['わ', 'う'], ['か', 'く'], ['が', 'ぐ'], ['さ', 'す'], ['た', 'つ'],
                    ['な', 'ぬ'], ['ば', 'ぶ'], ['ま', 'む'], ['ら', 'る']];
    const E_STEM = [['え', 'う'], ['け', 'く'], ['げ', 'ぐ'], ['せ', 'す'], ['て', 'つ'],
                    ['ね', 'ぬ'], ['べ', 'ぶ'], ['め', 'む'], ['れ', 'る']];
    const O_STEM = [['お', 'う'], ['こ', 'く'], ['ご', 'ぐ'], ['そ', 'す'], ['と', 'つ'],
                    ['の', 'ぬ'], ['ぼ', 'ぶ'], ['も', 'む'], ['ろ', 'る']];

    const U_ROW = 'うくぐすつぬぶむる';

    // ===================== DEINFLECTION RULES =====================
    // A rule rewrites a suffix and says what kind of word the result must look
    // like. We have no part-of-speech data in the compact entry format, so the
    // shape test is what stops 行く from being read as an inflection of 行い:
    // a godan result must end on the u-row, an ichidan result on る, an
    // i-adjective on い. Anything that survives the shape test still has to be
    // in the dictionary to count.

    const RULES = [];

    function rule(from, to, reason, shape) {
        RULES.push({ from: from, to: to, reason: reason, shape: shape || 'any' });
    }

    // Suffixes that attach to the 連用形 (masu-stem): ~ます, ~たい, ~ながら…
    function stemRule(suffix, reason) {
        I_STEM.forEach(function (pair) { rule(pair[0] + suffix, pair[1], reason, 'v5'); });
        rule(suffix, 'る', reason, 'v1');
    }

    // Suffixes that attach to the 未然形 (negative stem): ~ない, ~れる, ~せる…
    function negRule(suffix, reason, ichidanFrom) {
        A_STEM.forEach(function (pair) { rule(pair[0] + suffix, pair[1], reason, 'v5'); });
        rule(ichidanFrom || suffix, 'る', reason, 'v1');
    }

    // --- て / た forms, including the godan sound changes ---
    ['う', 'つ', 'る'].forEach(function (u) {
        rule('って', u, 'te-form', 'v5');
        rule('った', u, 'past', 'v5');
    });
    ['ぬ', 'ぶ', 'む'].forEach(function (u) {
        rule('んで', u, 'te-form', 'v5');
        rule('んだ', u, 'past', 'v5');
    });
    rule('いて', 'く', 'te-form', 'v5');
    rule('いた', 'く', 'past', 'v5');
    rule('いで', 'ぐ', 'te-form', 'v5');
    rule('いだ', 'ぐ', 'past', 'v5');
    rule('して', 'す', 'te-form', 'v5');
    rule('した', 'す', 'past', 'v5');
    rule('て', 'る', 'te-form', 'v1');
    rule('た', 'る', 'past', 'v1');

    // --- auxiliaries that hang off the て-form, voiced and unvoiced ---
    [['て', 'で']].forEach(function (pair) {
        [
            ['いる', 'progressive'], ['る', 'progressive'], ['いた', 'progressive'],
            ['ある', 'resultant'], ['おく', 'in preparation'], ['しまう', 'completed'],
            ['みる', 'trying'], ['いく', 'going on'], ['くる', 'coming to'],
            ['あげる', 'doing for'], ['くれる', 'done for me'], ['もらう', 'having done'],
            ['ほしい', 'wanting'], ['ください', 'please']
        ].forEach(function (aux) {
            rule(pair[0] + aux[0], pair[0], aux[1]);
            rule(pair[1] + aux[0], pair[1], aux[1]);
        });
    });
    rule('とく', 'て', 'in preparation');
    rule('どく', 'で', 'in preparation');
    rule('ちゃう', 'て', 'completed');
    rule('じゃう', 'で', 'completed');
    rule('ちゃった', 'ちゃう', 'past');
    rule('じゃった', 'じゃう', 'past');

    // --- polite ---
    stemRule('ます', 'polite');
    rule('ました', 'ます', 'past');
    rule('ません', 'ます', 'negative');
    rule('ませんでした', 'ません', 'past');
    rule('まして', 'ます', 'te-form');
    rule('ましょう', 'ます', 'volitional');
    rule('ましたら', 'ました', 'conditional');

    // --- other masu-stem suffixes ---
    stemRule('たい', 'want to');
    stemRule('たがる', 'wants to');
    stemRule('ながら', 'while');
    stemRule('なさい', 'command');
    stemRule('そう', 'looks like');
    stemRule('やすい', 'easy to');
    stemRule('にくい', 'hard to');
    stemRule('すぎる', 'too much');
    stemRule('すぎ', 'too much');
    stemRule('方', 'way of');
    stemRule('かた', 'way of');

    // --- negative ---
    negRule('ない', 'negative');
    negRule('ず', 'negative');
    negRule('ぬ', 'negative');
    rule('なかった', 'ない', 'past');
    rule('なくて', 'ない', 'te-form');
    rule('なく', 'ない', 'adverbial');
    rule('なければ', 'ない', 'conditional');
    rule('ないで', 'ない', 'without');
    rule('なきゃ', 'ない', 'must');
    rule('なくちゃ', 'ない', 'must');

    // --- i-adjectives ---
    rule('かった', 'い', 'past', 'adj');
    rule('くない', 'い', 'negative', 'adj');
    rule('くて', 'い', 'te-form', 'adj');
    rule('く', 'い', 'adverbial', 'adj');
    rule('ければ', 'い', 'conditional', 'adj');
    rule('さ', 'い', 'noun form', 'adj');
    rule('すぎる', 'い', 'too much', 'adj');
    rule('そう', 'い', 'looks like', 'adj');
    // 寒がる — showing signs of a feeling, which is how you describe someone
    // else's. Built on the adjective stem, so it deinflects like one.
    rule('がる', 'い', 'shows signs of', 'adj');

    // --- potential, passive, causative ---
    E_STEM.forEach(function (pair) { rule(pair[0] + 'る', pair[1], 'potential', 'v5'); });
    rule('られる', 'る', 'potential/passive', 'v1');
    rule('れる', 'る', 'potential', 'v1');
    negRule('れる', 'passive', 'られる');
    negRule('せる', 'causative', 'させる');
    negRule('す', 'causative', 'さす');
    rule('される', 'せる', 'passive');

    // --- volitional, conditional, imperative ---
    O_STEM.forEach(function (pair) { rule(pair[0] + 'う', pair[1], 'volitional', 'v5'); });
    rule('よう', 'る', 'volitional', 'v1');
    E_STEM.forEach(function (pair) { rule(pair[0] + 'ば', pair[1], 'conditional', 'v5'); });
    rule('れば', 'る', 'conditional', 'v1');
    rule('たら', 'た', 'conditional');
    rule('だら', 'だ', 'conditional');
    rule('たり', 'た', 'listing');
    rule('だり', 'だ', 'listing');
    E_STEM.forEach(function (pair) { rule(pair[0], pair[1], 'imperative', 'v5'); });
    rule('ろ', 'る', 'imperative', 'v1');

    // --- copula ---
    rule('でした', 'です', 'past');
    rule('でしょう', 'です', 'probably');
    rule('じゃない', 'だ', 'negative');
    rule('ではない', 'だ', 'negative');
    rule('だった', 'だ', 'past');
    rule('ならば', 'なら', 'conditional');

    // Rules bucketed by the last character of their suffix, so a candidate word
    // only ever tests the handful of rules that could possibly apply to it.
    const RULES_BY_LAST = new Map();
    RULES.forEach(function (r) {
        const key = r.from[r.from.length - 1];
        if (!RULES_BY_LAST.has(key)) RULES_BY_LAST.set(key, []);
        RULES_BY_LAST.get(key).push(r);
    });

    // する, 来る, 行く and the copula don't follow the rows above at all.
    const IRREGULAR = {
        'し': ['する', ['stem']], 'して': ['する', ['te-form']], 'した': ['する', ['past']],
        'します': ['する', ['polite']], 'しました': ['する', ['polite', 'past']],
        'しません': ['する', ['polite', 'negative']], 'しませんでした': ['する', ['polite', 'negative', 'past']],
        'しない': ['する', ['negative']], 'しなかった': ['する', ['negative', 'past']],
        'しよう': ['する', ['volitional']], 'しろ': ['する', ['imperative']], 'せよ': ['する', ['imperative']],
        'すれば': ['する', ['conditional']], 'したら': ['する', ['conditional']], 'したい': ['する', ['want to']],
        'される': ['する', ['passive']], 'させる': ['する', ['causative']], 'できる': ['する', ['potential']],
        'できます': ['する', ['potential', 'polite']], 'できない': ['する', ['potential', 'negative']],
        'くる': ['来る', []], 'きて': ['来る', ['te-form']], 'きた': ['来る', ['past']],
        'きます': ['来る', ['polite']], 'きました': ['来る', ['polite', 'past']],
        'こない': ['来る', ['negative']], 'こなかった': ['来る', ['negative', 'past']],
        'こよう': ['来る', ['volitional']], 'こい': ['来る', ['imperative']], 'これば': ['来る', ['conditional']],
        'こられる': ['来る', ['potential']],
        '来て': ['来る', ['te-form']], '来た': ['来る', ['past']], '来ます': ['来る', ['polite']],
        '来ました': ['来る', ['polite', 'past']], '来ない': ['来る', ['negative']],
        '来よう': ['来る', ['volitional']], '来れば': ['来る', ['conditional']], '来い': ['来る', ['imperative']],
        '行って': ['行く', ['te-form']], '行った': ['行く', ['past']],
        'いって': ['行く', ['te-form']], 'いった': ['行く', ['past']],
        'あった': ['ある', ['past']], 'あって': ['ある', ['te-form']],
        'あります': ['ある', ['polite']], 'ありません': ['ある', ['polite', 'negative']],
        'ありました': ['ある', ['polite', 'past']],
        'よかった': ['いい', ['past']], 'よくない': ['いい', ['negative']], 'よく': ['いい', ['adverbial']],
        'です': ['です', []], 'でした': ['です', ['past']]
    };

    // ===================== INDEX =====================
    // form → indices into the dictionary array. Built once, on first use, so a
    // visitor who never opens sentence mode never pays for it.

    let index = null;
    const candidateCache = new Map();

    function api() { return window.LearneJPDict; }

    // Each hit records where the form sat in its entry: JMdict lists the
    // commonest spelling first and flags it, and both facts are what tell 本
    // (ほん, book) apart from 本 (もと, origin), where 本 is only the second
    // spelling of the first headword 元.
    function buildIndex() {
        if (index) return index;
        index = new Map();
        const entries = api().entries();
        for (let i = 0; i < entries.length; i++) {
            const forms = entries[i][0].concat(entries[i][1]);
            for (let f = 0; f < forms.length; f++) {
                const text = forms[f][0];
                if (!text || text.length > MAX_TOKEN) continue;
                const hit = { id: i, common: !!forms[f][1], pos: f };
                const bucket = index.get(text);
                if (bucket) bucket.push(hit);
                else index.set(text, [hit]);
            }
        }
        return index;
    }

    function shapeOk(form, shape) {
        if (!form) return false;
        const last = form[form.length - 1];
        if (shape === 'v5') return U_ROW.indexOf(last) !== -1;
        if (shape === 'v1') return last === 'る';
        if (shape === 'adj') return last === 'い';
        return true;
    }

    // Walk a surface form back towards dictionary forms, breadth-first, keeping
    // the chain of reasons that got us there. Shortest chains come out first.
    function deinflect(surface) {
        const found = [];
        const seen = new Set([surface]);
        const queue = [{ form: surface, reasons: [] }];

        while (queue.length) {
            const node = queue.shift();
            if (node.reasons.length >= MAX_DEPTH) continue;

            const bucket = RULES_BY_LAST.get(node.form[node.form.length - 1]);
            if (!bucket) continue;

            for (let i = 0; i < bucket.length; i++) {
                const r = bucket[i];
                if (node.form.length <= r.from.length) continue;
                if (node.form.slice(-r.from.length) !== r.from) continue;

                const next = node.form.slice(0, node.form.length - r.from.length) + r.to;
                if (seen.has(next) || !shapeOk(next, r.shape)) continue;
                seen.add(next);

                const step = { form: next, reasons: node.reasons.concat(r.reason) };
                found.push(step);
                queue.push(step);
            }
        }
        return found;
    }

    // How much to distrust a reading of the surface. Steps are the deinflections
    // it took; the two penalties cover the readings that are technically valid
    // but almost never what was meant, and the discount rewards a form JMdict
    // marks as common. Lower is better, and negative is fine — a common word
    // spelled exactly as written should be hard to beat.
    const TE_PENALTY = 1.5;      // ~て is a waypoint, never a headword
    const STEM_PENALTY = 1.2;    // bare masu-stems are real but weak evidence
    const KANA_PENALTY = 0.4;    // a word usually written in kanji, spelled out
    const AUX_BONUS = 0.8;       // ~ている and friends are worth trusting
    const COMMON_BONUS = 0.6;

    // Chains built on the て-form. Nothing else in the language looks like them,
    // so when one matches it beats reading the pieces separately: 勉強している is
    // する in progress, not the noun して followed by いる.
    const AUXILIARIES = new Set(['progressive', 'resultant', 'in preparation', 'completed',
        'trying', 'going on', 'coming to', 'doing for', 'done for me', 'having done',
        'wanting', 'please']);

    // A few endings are shaped so loosely that they match almost anything: the
    // godan imperative turns any e-row ending into a verb, which would read
    // のころ as an order to 残る. Charge them for the privilege.
    const REASON_PENALTY = { imperative: 1.8, 'noun form': 0.5, adverbial: 0.3, listing: 0.3 };

    const ALL_KANA = /^[\u3040-\u30ff\u30fc]+$/;

    function rankOf(form, reasons, penalty, hits, entries) {
        let cost = reasons.length + penalty;
        reasons.forEach(function (r) { cost += REASON_PENALTY[r] || 0; });
        if (hits.some(function (h) { return h.common; })) cost -= COMMON_BONUS;
        if (reasons.some(function (r) { return AUXILIARIES.has(r); })) cost -= AUX_BONUS;

        // Matched in kana a word whose usual spelling is kanji — possible, but
        // weaker evidence than a word that lives in kana. This is what keeps
        // ようと from being read as 用途 in 家にいようと思う.
        if (ALL_KANA.test(form) && hits.some(function (h) {
            return h.common && entries[h.id][0].some(function (f) { return f[1]; });
        })) cost += KANA_PENALTY;

        return cost;
    }

    // Every dictionary form this surface could be, likeliest first.
    function candidates(surface) {
        if (candidateCache.has(surface)) return candidateCache.get(surface);

        const idx = buildIndex();
        const out = [];
        const taken = new Set();

        function accept(form, reasons, penalty) {
            const hits = idx.get(form);
            if (taken.has(form) || !hits) return;
            taken.add(form);

            let cost = penalty || 0;
            // A て/で form that we reached by deinflecting is the middle of a
            // chain, not the end of one: 勉強している should land on する, even
            // though して is itself an entry (the lead in a Noh play).
            if (reasons.length && /[てで]$/.test(form)) cost += TE_PENALTY;

            out.push({
                dictForm: form, reasons: reasons, steps: reasons.length,
                hits: hits, rank: rankOf(form, reasons, cost, hits, api().entries())
            });
        }

        accept(surface, [], 0);
        if (IRREGULAR[surface]) accept(IRREGULAR[surface][0], IRREGULAR[surface][1], 0);
        deinflect(surface).forEach(function (step) {
            accept(step.form, step.reasons, 0);
            if (IRREGULAR[step.form]) {
                accept(IRREGULAR[step.form][0], step.reasons.concat(IRREGULAR[step.form][1]), 0);
            }
        });

        // Bare masu-stems: 見に行く, 話し合う, お帰り. The stem carries no ending
        // to deinflect, so it has to be rebuilt — 見 + る, or 読み → 読む.
        const last = surface[surface.length - 1];
        I_STEM.forEach(function (pair) {
            if (last !== pair[0] || surface.length < 2) return;
            accept(surface.slice(0, -1) + pair[1], ['stem'], STEM_PENALTY);
        });
        accept(surface + 'る', ['stem'], STEM_PENALTY);

        out.sort(function (a, b) { return a.rank - b.rank; });
        candidateCache.set(surface, out);
        return out;
    }

    // ===================== SEGMENTATION =====================
    // Minimum-cost split: every word costs about the same, so the cheapest way
    // to cover the line is the one with the fewest words — which is also the
    // one that found the longest real words. Deinflected and single-character
    // matches cost a little extra, and anything the dictionary can't explain
    // costs a lot, so guesses lose to genuine entries.

    const WORD_COST = 1;
    const STEP_COST = 0.45;
    const SHORT_COST = 0.3;
    const UNKNOWN_COST = 2.4;

    function segment(run) {
        const n = run.length;
        const best = new Array(n + 1).fill(null);
        best[0] = { cost: 0, from: -1, token: null };

        for (let i = 0; i < n; i++) {
            if (!best[i]) continue;
            const maxLen = Math.min(MAX_TOKEN, n - i);

            for (let len = maxLen; len >= 1; len--) {
                const surface = run.substr(i, len);
                const found = candidates(surface);
                if (!found.length) continue;

                const cost = best[i].cost + WORD_COST + STEP_COST * found[0].rank +
                    (len === 1 ? SHORT_COST : 0);
                if (!best[i + len] || cost < best[i + len].cost) {
                    best[i + len] = {
                        cost: cost, from: i,
                        token: { surface: surface, kind: 'word', matches: found }
                    };
                }
            }

            const skipCost = best[i].cost + UNKNOWN_COST;
            if (!best[i + 1] || skipCost < best[i + 1].cost) {
                best[i + 1] = {
                    cost: skipCost, from: i,
                    token: { surface: run[i], kind: 'unknown', matches: [] }
                };
            }
        }

        const tokens = [];
        let at = n;
        while (at > 0 && best[at]) {
            tokens.unshift(best[at].token);
            at = best[at].from;
        }

        // Runs of unrecognised characters read better as one blob than as a
        // string of single-character shrugs.
        const merged = [];
        tokens.forEach(function (t) {
            const last = merged[merged.length - 1];
            if (t.kind === 'unknown' && last && last.kind === 'unknown') last.surface += t.surface;
            else merged.push(t);
        });
        return merged;
    }

    // ===================== READINGS =====================
    // JMdict gives a reading for the dictionary form, not for the shape that
    // turned up in the sentence. Line the two up on their shared tail — 食べる
    // and たべる both end べる, so 食 is た — then re-attach whatever okurigana
    // the surface actually had: 食べました → たべました.

    const KANA = /^[\u3040-\u30ff\u30fc]+$/;

    function readingFor(surface, entry) {
        if (KANA.test(surface)) return surface;

        const kanjiForms = entry[0];
        const kanaForms = entry[1];
        if (!kanaForms.length) return '';
        const preferred = kanaForms.find(function (f) { return f[1]; }) || kanaForms[0];
        const kana = preferred[0];
        if (!kanjiForms.length) return kana;

        let head = '';
        let headReading = '';
        for (let i = 0; i < kanjiForms.length; i++) {
            const kanji = kanjiForms[i][0];
            let shared = 0;
            while (shared < kanji.length && shared < kana.length &&
                   kanji[kanji.length - 1 - shared] === kana[kana.length - 1 - shared]) shared++;

            const stem = kanji.slice(0, kanji.length - shared);
            if (stem && surface.indexOf(stem) === 0 && stem.length > head.length) {
                head = stem;
                headReading = kana.slice(0, kana.length - shared);
            }
        }
        if (!head) return kana;
        return headReading + surface.slice(head.length);
    }

    // は and へ keep their spelling but change their sound when they act as
    // particles — 私は is watashi wa, never watashi ha. The word search shows
    // the kana in isolation, where "ha" is right; a sentence being read aloud
    // is the one place that distinction has to be made.
    const PARTICLE_SOUND = { 'は': 'wa', 'へ': 'e' };

    function particleOverride(token) {
        const sound = PARTICLE_SOUND[token.surface];
        if (!sound || token.surface.length !== 1 || !token.senses.length) return null;
        // The particle is the entry with no kanji spelling at all; 葉, 歯 and 刃
        // are all は too, and they are read the way they are written.
        return token.senses[0].entry[0].length === 0 ? sound : null;
    }

    function moraFor(token) {
        const units = api().toMora(token.reading);
        const sound = particleOverride(token);
        if (sound && units.length === 1) units[0] = { kana: units[0].kana, romaji: sound };
        return units;
    }

    function romajiFor(reading) {
        if (!reading || !KANA.test(reading)) return '';
        return api().toMora(reading).map(function (u) { return u.romaji; }).join('');
    }

    // ===================== ANALYSIS =====================

    const JP_CHAR = /[\u3005\u3040-\u30fa\u30fc-\u30ff\u4e00-\u9fff\u3400-\u4dbf]/;
    const LATIN = /[0-9A-Za-z\uff10-\uff19\uff21-\uff3a\uff41-\uff5a]/;

    function analyze(text) {
        const tokens = [];
        let i = 0;

        while (i < text.length) {
            const ch = text[i];

            if (JP_CHAR.test(ch)) {
                let j = i;
                while (j < text.length && JP_CHAR.test(text[j])) j++;
                segment(text.slice(i, j)).forEach(function (t) { tokens.push(t); });
                i = j;
            } else if (LATIN.test(ch)) {
                let j = i;
                while (j < text.length && LATIN.test(text[j])) j++;
                tokens.push({ surface: text.slice(i, j), kind: 'other', matches: [] });
                i = j;
            } else if (ch === '\n') {
                tokens.push({ surface: '\n', kind: 'break', matches: [] });
                i++;
            } else if (/\s/.test(ch)) {
                i++;
            } else {
                tokens.push({ surface: ch, kind: 'punct', matches: [] });
                i++;
            }
        }

        // Decorate the words with the entries, readings and romaji the UI needs.
        const entries = api().entries();
        tokens.forEach(function (token) {
            if (token.kind !== 'word') return;

            const ranked = [];
            token.matches.forEach(function (match) {
                match.hits.forEach(function (hit) {
                    ranked.push({
                        entry: entries[hit.id],
                        dictForm: match.dictForm,
                        reasons: match.reasons,
                        // Among spellings that tie, prefer the word the
                        // dictionary has more to say about: こと is the
                        // everywhere-word 事, not 古都, a city with one sense.
                        rank: match.rank + (hit.common ? 0 : COMMON_BONUS) + hit.pos * 0.05 -
                            Math.min(entries[hit.id][2].length, 6) * 0.03,
                        common: hit.common
                    });
                });
            });
            ranked.sort(function (a, b) { return a.rank - b.rank; });

            token.senses = ranked.slice(0, MAX_ENTRIES);
            token.dictForm = ranked[0].dictForm;
            token.reasons = ranked[0].reasons;
            token.common = ranked[0].common;
            token.reading = readingFor(token.surface, ranked[0].entry);
            token.romaji = romajiFor(token.reading);
            const particle = particleOverride(token);
            if (particle) token.romaji = particle;
        });

        return tokens;
    }

    // ===================== READING THE WHOLE LINE =====================
    // A pile of definitions is not a meaning. The parse already knows which
    // word each chunk is built on, what was done to it, and which particle
    // marks its role — enough to say the line back in English, in the order
    // Japanese put it. Not a translation: no subject is invented, no clause is
    // reordered, and a particle is shown as the role it marks rather than
    // guessed at. What it does buy is that 行きました reads "went" instead of
    // "to go · past · polite", which is the difference between a gloss and
    // something you can read.

    // Particles carry the grammar Japanese doesn't spell out. Several of these
    // have more than one job — に alone covers to, at, in, on and for — so the
    // label names the role and leaves the choice to the reader, who has the
    // full entry one tap away.
    const PARTICLES = {
        'は': 'topic', 'が': 'subject', 'を': 'object', 'に': 'to/at', 'へ': 'to',
        'で': 'at/by', 'と': 'with/and', 'の': 'of', 'も': 'also', 'や': 'and',
        'から': 'from/because', 'まで': 'until', 'より': 'than', 'ほど': 'as much as',
        'か': '?', 'ね': 'right?', 'よ': '!', 'ぞ': '!', 'わ': '!', 'な': '!',
        'けど': 'but', 'けれど': 'but', 'ので': 'because', 'のに': 'although',
        'だけ': 'only', 'しか': 'only', 'ばかり': 'just', 'など': 'etc.',
        'ながら': 'while', 'たり': 'and so on', 'とか': 'or so', 'って': 'that'
    };

    const COPULA = { 'です': 1, 'だ': 1, 'である': 1 };

    // English verbs that don't take -ed, limited to the ones that actually turn
    // up at the front of a JMdict gloss.
    const IRREGULAR_PAST = {
        be: 'was', become: 'became', begin: 'began', bend: 'bent', bite: 'bit',
        blow: 'blew', break: 'broke', bring: 'brought', build: 'built', burn: 'burnt',
        buy: 'bought', can: 'could', catch: 'caught', choose: 'chose', come: 'came',
        cost: 'cost', cut: 'cut', deal: 'dealt', dig: 'dug', do: 'did', draw: 'drew',
        drink: 'drank', drive: 'drove', eat: 'ate', fall: 'fell', feed: 'fed',
        feel: 'felt', fight: 'fought', find: 'found', fly: 'flew', forget: 'forgot',
        forgive: 'forgave', freeze: 'froze', get: 'got', give: 'gave', go: 'went',
        grow: 'grew', hang: 'hung', have: 'had', hear: 'heard', hide: 'hid',
        hit: 'hit', hold: 'held', hurt: 'hurt', keep: 'kept', know: 'knew',
        lay: 'laid', lead: 'led', learn: 'learnt', leave: 'left', lend: 'lent',
        let: 'let', lie: 'lay', light: 'lit', lose: 'lost', make: 'made',
        mean: 'meant', meet: 'met', pay: 'paid', put: 'put', quit: 'quit',
        read: 'read', ride: 'rode', ring: 'rang', rise: 'rose', run: 'ran',
        say: 'said', see: 'saw', seek: 'sought', sell: 'sold', send: 'sent',
        set: 'set', shake: 'shook', shine: 'shone', shoot: 'shot', show: 'showed',
        shut: 'shut', sing: 'sang', sink: 'sank', sit: 'sat', sleep: 'slept',
        speak: 'spoke', spend: 'spent', stand: 'stood', steal: 'stole',
        stick: 'stuck', strike: 'struck', swim: 'swam', take: 'took',
        teach: 'taught', tear: 'tore', tell: 'told', think: 'thought',
        throw: 'threw', understand: 'understood', wake: 'woke', wear: 'wore',
        win: 'won', write: 'wrote'
    };

    const IRREGULAR_PP = {
        be: 'been', become: 'become', begin: 'begun', bite: 'bitten', blow: 'blown',
        break: 'broken', choose: 'chosen', come: 'come', do: 'done', draw: 'drawn',
        drink: 'drunk', drive: 'driven', eat: 'eaten', fall: 'fallen', fly: 'flown',
        forget: 'forgotten', forgive: 'forgiven', freeze: 'frozen', give: 'given',
        go: 'gone', grow: 'grown', hide: 'hidden', know: 'known', lie: 'lain',
        ride: 'ridden', ring: 'rung', rise: 'risen', run: 'run', see: 'seen',
        shake: 'shaken', show: 'shown', sing: 'sung', sink: 'sunk', speak: 'spoken',
        steal: 'stolen', swim: 'swum', take: 'taken', tear: 'torn', throw: 'thrown',
        wake: 'woken', wear: 'worn', write: 'written'
    };

    // Glosses are phrases — "look at", "be able to" — so only the first word
    // carries the inflection.
    function onFirstWord(phrase, change) {
        const parts = phrase.split(' ');
        parts[0] = change(parts[0]);
        return parts.join(' ');
    }

    const DOUBLES = /^[^aeiou]?[aeiou][bdgklmnprt]$/;

    function pastOf(phrase) {
        return onFirstWord(phrase, function (verb) {
            if (IRREGULAR_PAST[verb]) return IRREGULAR_PAST[verb];
            if (/e$/.test(verb)) return verb + 'd';
            if (/[^aeiou]y$/.test(verb)) return verb.slice(0, -1) + 'ied';
            if (DOUBLES.test(verb)) return verb + verb.slice(-1) + 'ed';
            return verb + 'ed';
        });
    }

    function ingOf(phrase) {
        return onFirstWord(phrase, function (verb) {
            if (/ie$/.test(verb)) return verb.slice(0, -2) + 'ying';
            if (/[^aeiou]e$/.test(verb)) return verb.slice(0, -1) + 'ing';
            if (DOUBLES.test(verb)) return verb + verb.slice(-1) + 'ing';
            return verb + 'ing';
        });
    }

    function ppOf(phrase) {
        return onFirstWord(phrase, function (verb) {
            return IRREGULAR_PP[verb] || pastOf(verb);
        });
    }

    // The shortest honest English for a word: first sense, first gloss, with
    // the disambiguating parenthetical dropped — "blade (of a fan)" is "blade".
    function glossFor(token) {
        const senses = token.senses[0].entry[2];
        const first = senses[0][0] || '';
        const trimmed = first.replace(/\s*\([^)]*\)/g, '').trim();
        return trimmed || first;
    }

    // Reasons that survive as a label rather than changing the English.
    const REASON_LABEL = {
        polite: 'polite', conditional: 'if', 'te-form': 'and', while: 'while',
        listing: 'and so on', completed: 'ended up', trying: 'try',
        'in preparation': 'in advance', resultant: 'left done', 'going on': 'onward',
        'coming to': 'come to', 'doing for': 'for someone', 'done for me': 'for me',
        'having done': 'have it done', wanting: 'want', 'too much': 'too much',
        'easy to': 'easy to', 'hard to': 'hard to', 'looks like': 'seems',
        'potential/passive': 'potential or passive', imperative: 'an order',
        command: 'an order', without: 'without'
    };

    // Turn one word plus everything done to it into an English phrase.
    function phraseFor(token) {
        const reasons = token.reasons || [];
        const has = function (r) { return reasons.indexOf(r) !== -1; };

        const gloss = glossFor(token);
        const isVerb = /^to /.test(gloss);
        const head = isVerb ? gloss.slice(3) : gloss;

        const past = has('past');
        const negative = has('negative');

        // ~ている is built on the て-form, but the English already says
        // "is reading" — labelling it "and" as well is noise.
        const auxiliaryUsed = reasons.some(function (r) {
            return AUXILIARIES.has(r) || r === 'please';
        });

        const tags = [];
        reasons.forEach(function (r) {
            if (r === 'te-form' && auxiliaryUsed) return;
            const label = REASON_LABEL[r];
            if (label && tags.indexOf(label) === -1) tags.push(label);
        });

        if (!isVerb) {
            // Adjectives and nouns: the tense sits on the copula, stated or not.
            let english = head;
            if (negative) english = (past ? "wasn't " : 'not ') + english;
            else if (past) english = 'was ' + english;
            return { english: english, tags: tags.slice(0, 3), isVerb: false };
        }

        // Each auxiliary governs the form of whatever follows it, and the first
        // one in the line is the one that carries tense and negation —
        // "could not be eaten" inflects `can`, not `eat`.
        // 食べさせられる is not "can make someone eat" — the two auxiliaries
        // collapse into one English shape.
        if (has('causative') && (has('passive') || has('potential/passive'))) {
            let made = past ? 'was' : 'is';
            if (negative) made += "n't";
            return { english: made + ' made to ' + head, tags: tags.slice(0, 3), isVerb: true };
        }

        const chain = [];
        if (has('want to') || has('wants to')) chain.push({ word: 'want to', governs: 'base' });
        if (has('potential') || has('potential/passive')) chain.push({ word: 'can', governs: 'base' });
        if (has('progressive')) chain.push({ word: 'be', governs: 'ing' });
        else if (has('passive')) chain.push({ word: 'be', governs: 'pp' });
        if (has('causative')) chain.push({ word: 'make someone', governs: 'base' });

        const governs = chain.length ? chain[chain.length - 1].governs : 'tense';
        let headWord = head;
        if (governs === 'ing') headWord = ingOf(head);
        else if (governs === 'pp') headWord = ppOf(head);

        let english;
        if (!chain.length) {
            if (negative) english = (past ? "didn't " : "don't ") + head;
            else if (past) english = pastOf(head);
            else english = head;
        } else {
            let first = chain[0].word;
            if (first === 'be') {
                first = past ? 'was' : 'is';
                if (negative) first += "n't";
            } else if (first === 'can') {
                if (negative) first = past ? "couldn't" : "can't";
                else if (past) first = 'could';
            } else if (negative) {
                first = (past ? "didn't " : "don't ") + first;
            } else if (past) {
                first = pastOf(first);
            }
            english = [first].concat(chain.slice(1).map(function (c) { return c.word; }),
                                     headWord).join(' ');
        }

        if (has('volitional')) english = "let's " + head;
        if (has('please')) english = 'please ' + english;
        if (has('imperative') || has('command')) english = english + '!';

        return { english: english, tags: tags.slice(0, 3), isVerb: true };
    }

    // Japanese groups a content word with the particles that follow it. Reading
    // by those groups rather than by token is what makes the line scan: 友達と
    // is one idea — a friend, and the と says what part they played.
    function chunkTokens(tokens, cardIndex) {
        const chunks = [];
        let open = null;

        tokens.forEach(function (token) {
            if (token.kind === 'break') { open = null; chunks.push({ kind: 'break' }); return; }
            if (token.kind === 'punct') { open = null; chunks.push({ kind: 'punct', jp: token.surface }); return; }
            if (token.kind === 'other') { open = null; chunks.push({ kind: 'plain', jp: token.surface, english: token.surface, roles: [] }); return; }
            if (token.kind === 'unknown') { open = null; chunks.push({ kind: 'unknown', jp: token.surface, roles: [] }); return; }

            const role = PARTICLES[token.surface];
            if (role && open) {
                open.jp += token.surface;
                if (open.roles.indexOf(role) === -1) open.roles.push(role);
                return;
            }
            if (COPULA[token.surface] && open) {
                open.jp += token.surface;
                // After a verb the copula is only politeness — 行きたいです is
                // "want to go", not "is want to go".
                if (!open.isVerb) {
                    open.english = ((token.reasons || []).indexOf('past') !== -1 ? 'was ' : 'is ') +
                        open.english;
                }
                return;
            }

            // JMdict describes the grammatical words by the job they do
            // ("indicates a question"). That is a role, not a meaning, so it
            // joins the chunk it modifies instead of standing on its own.
            const job = token.senses && /^indicates /.test(glossFor(token))
                ? glossFor(token).replace(/^indicates (a |the |sentence )?/, '')
                : null;
            if (job && open) {
                open.jp += token.surface;
                if (open.roles.indexOf(job) === -1) open.roles.push(job);
                return;
            }

            const phrase = phraseFor(token);
            open = {
                kind: 'word',
                jp: token.surface,
                english: role || job || phrase.english,
                roles: phrase.tags.slice(),
                isVerb: phrase.isVerb,
                card: cardIndex.get(token.surface)
            };
            chunks.push(open);
        });

        return chunks;
    }

    // ===================== RENDERING =====================

    const EXAMPLE = '昨日は友達と映画を見に行きました。とても面白かったです。';

    let strip = null;
    let meaningHost = null;
    let cardsHost = null;

    function esc(s) { return api().escapeHtml(s); }

    // A breakdown that names a pattern and then leaves you there is only half a
    // tool. js/learn-links.js maps the labels this file produces to the lesson
    // that explains each one; where a mapping exists the label becomes a link.
    // Absent the file, everything renders exactly as before.
    function lessonHref(kind, key) {
        const links = window.LEARN_LINKS;
        const target = links && links[kind] ? links[kind][key] : null;
        return target ? 'learn.html#lesson=' + encodeURIComponent(target) : null;
    }

    function renderStrip(tokens, cardIndex) {
        return tokens.map(function (token, i) {
            if (token.kind === 'break') return '<span class="sent-break"></span>';
            if (token.kind === 'punct' || token.kind === 'other') {
                return '<span class="sent-token is-plain">' +
                    '<span class="sent-token-jp">' + esc(token.surface) + '</span>' +
                    '<span class="sent-token-roma"></span></span>';
            }
            if (token.kind === 'unknown') {
                return '<span class="sent-token is-unknown" title="Not in the dictionary">' +
                    '<span class="sent-token-jp">' + esc(token.surface) + '</span>' +
                    '<span class="sent-token-roma">?</span></span>';
            }
            const card = cardIndex.get(token.surface);
            return '<button type="button" class="sent-token' +
                (token.reasons.length ? ' is-inflected' : '') +
                '" data-card="' + card + '" data-token="' + i + '">' +
                '<span class="sent-token-jp">' + esc(token.surface) + '</span>' +
                '<span class="sent-token-roma">' + esc(token.romaji) + '</span></button>';
        }).join('');
    }

    function renderCard(token, id) {
        const top = token.senses[0];

        const mora = token.reading
            ? '<div class="mora-row">' + moraFor(token).map(function (u) {
                return '<div class="mora-unit"><span class="mora-kana">' + esc(u.kana) +
                    '</span><span class="mora-romaji">' + esc(u.romaji) + '</span></div>';
            }).join('') + '</div>'
            : '';

        const origin = token.reasons.length
            ? '<div class="sent-origin">from <button type="button" class="sent-dictform">' +
                esc(token.dictForm) + '</button>' +
                token.reasons.slice().reverse().map(function (r) {
                    const href = lessonHref('reasons', r);
                    return href
                        ? '<a class="sent-reason is-link" href="' + href + '">' + esc(r) + '</a>'
                        : '<span class="sent-reason">' + esc(r) + '</span>';
                }).join('') + '</div>'
            : '';

        const meaning = top.entry[2].map(function (glosses, i) {
            const n = top.entry[2].length > 1 ? (i + 1) + '. ' : '';
            return n + esc(glosses.join('; '));
        }).join('&ensp;');

        const others = token.senses.slice(1).map(function (s) {
            const head = s.entry[0].length ? s.entry[0][0][0] : s.entry[1][0][0];
            return esc(head) + ' — ' + esc(s.entry[2][0].slice(0, 2).join('; '));
        });
        const also = others.length
            ? '<div class="sent-also">also ' + others.join(' · ') + '</div>' : '';

        // A particle card has no deinflection to hang a label on, so it gets a
        // link of its own. The kanji-form test is the one used for readings: it
        // is the grammatical entry, not 葉 or 歯, that this explains.
        const particleHref = top.entry[0].length === 0
            ? lessonHref('particles', token.surface) : null;
        const learn = particleHref
            ? '<a class="sent-learn" href="' + particleHref + '">What ' +
                esc(token.surface) + ' does →</a>'
            : '';

        return '<article class="result-card sentence-card" id="sent-card-' + id + '">' +
            '<div class="result-word">' +
                '<button type="button" class="result-kanji sent-head">' + esc(token.surface) + '</button>' +
                (token.common ? '<span class="result-tag result-tag-common">common</span>' : '') +
            '</div>' + mora + origin +
            '<div class="result-meaning">' + meaning + '</div>' + also + learn +
        '</article>';
    }

    function renderMeaning(chunks) {
        const line = chunks.map(function (chunk) {
            if (chunk.kind === 'break') return '<span class="sent-gloss-break"></span>';
            if (chunk.kind === 'punct') return '<span class="sent-gloss-punct">' + esc(chunk.jp) + '</span>';

            const roles = chunk.roles.map(function (role) {
                return '<span class="sent-gloss-role">' + esc(role) + '</span>';
            }).join('');
            const body = '<span class="sent-gloss-en">' + esc(chunk.english || '?') + '</span>' +
                roles + '<span class="sent-gloss-jp">' + esc(chunk.jp) + '</span>';

            if (chunk.kind === 'word' && chunk.card !== undefined) {
                return '<button type="button" class="sent-gloss" data-card="' + chunk.card + '">' +
                    body + '</button>';
            }
            return '<span class="sent-gloss is-' + chunk.kind + '">' + body + '</span>';
        }).join('');

        return '<p class="sent-meaning-label">Literal reading</p>' +
            '<div class="sent-meaning-line">' + line + '</div>' +
            '<p class="sent-meaning-note">Word order follows the Japanese, and nothing is ' +
            'supplied that the sentence left out. Particles are named by the role they mark — ' +
            'most cover several English words, so tap a chunk for the full entry.</p>';
    }

    function render(tokens) {
        const cardIndex = new Map();
        const cards = [];
        tokens.forEach(function (token) {
            if (token.kind !== 'word' || cardIndex.has(token.surface)) return;
            cardIndex.set(token.surface, cards.length);
            cards.push(renderCard(token, cards.length));
        });

        strip.innerHTML = renderStrip(tokens, cardIndex);
        strip.hidden = false;
        meaningHost.innerHTML = renderMeaning(chunkTokens(tokens, cardIndex));
        meaningHost.hidden = false;
        cardsHost.innerHTML = cards.join('');

        const unknown = tokens.filter(function (t) { return t.kind === 'unknown'; }).length;
        return { words: cards.length, unknown: unknown };
    }

    // ===================== WIRING =====================

    function init() {
        const input = document.getElementById('sentenceInput');
        if (!input) return;

        const wordBtn = document.getElementById('modeWordBtn');
        const sentenceBtn = document.getElementById('modeSentenceBtn');
        const wordPanel = document.getElementById('wordMode');
        const sentencePanel = document.getElementById('sentenceMode');
        const runBtn = document.getElementById('sentenceRunBtn');
        const clearBtn = document.getElementById('sentenceClearBtn');
        const status = document.getElementById('statusText');
        const results = document.getElementById('results');
        const searchInput = document.getElementById('searchInput');

        strip = document.createElement('div');
        strip.className = 'sentence-strip';
        strip.hidden = true;
        meaningHost = document.createElement('section');
        meaningHost.className = 'sentence-meaning';
        meaningHost.hidden = true;
        cardsHost = document.createElement('div');
        cardsHost.className = 'sentence-cards';

        // The composer is full size while it is being written in and folds away
        // once there is a breakdown to read. See .is-compact in style.css.
        let hasBreakdown = false;
        let writing = false;

        // The strip is sticky, so cards have to be told how much of the top of
        // the results it covers. Its height depends on how long the pasted line
        // is and how wide the panel is, so it is measured rather than guessed.
        function syncLayout() {
            sentencePanel.classList.toggle('is-compact', hasBreakdown && !writing);

            if (!strip.getBoundingClientRect) return;
            const height = strip.hidden ? 0 : Math.round(strip.getBoundingClientRect().height);
            cardsHost.style.setProperty('--sent-strip-h', height + 'px');
        }

        function emptyState() {
            strip.hidden = true;
            strip.innerHTML = '';
            meaningHost.hidden = true;
            meaningHost.innerHTML = '';
            cardsHost.innerHTML = '<p class="sent-hint">Paste a line of Japanese above and every word in it ' +
                'gets looked up — conjugations included.<br>' +
                '<button type="button" class="sent-example">Try ' + esc(EXAMPLE) + '</button></p>';
            hasBreakdown = false;
            syncLayout();
        }

        function showSentenceResults() {
            results.innerHTML = '';
            results.appendChild(strip);
            results.appendChild(meaningHost);
            results.appendChild(cardsHost);
        }

        function setMode(mode) {
            const sentence = mode === 'sentence';
            api().mode = mode;
            wordBtn.classList.toggle('active', !sentence);
            sentenceBtn.classList.toggle('active', sentence);
            wordBtn.setAttribute('aria-selected', String(!sentence));
            sentenceBtn.setAttribute('aria-selected', String(sentence));
            wordPanel.hidden = sentence;
            sentencePanel.hidden = !sentence;

            if (sentence) {
                showSentenceResults();
                if (!cardsHost.innerHTML) emptyState();
                run();
                input.focus();
            } else {
                strip.remove();
                meaningHost.remove();
                cardsHost.remove();
                results.innerHTML = '';
                if (searchInput.value.trim()) searchInput.dispatchEvent(new Event('input'));
                else if (api().isReady()) {
                    status.textContent = 'Dictionary loaded — ' +
                        api().entries().length.toLocaleString() + ' common words. Start typing to search.';
                }
            }
        }

        function run() {
            const text = input.value.trim();

            if (!api().isReady()) {
                status.textContent = 'Loading dictionary…';
                return;
            }
            if (!text) {
                emptyState();
                status.textContent = 'Paste or type Japanese text to break it into words.';
                return;
            }
            if (text.length > MAX_INPUT) {
                emptyState();
                status.textContent = 'That is ' + text.length.toLocaleString() + ' characters — trim it to ' +
                    MAX_INPUT.toLocaleString() + ' or fewer and it will run.';
                return;
            }
            if (!JP_CHAR.test(text)) {
                emptyState();
                status.textContent = 'No Japanese found here. Switch to Word to search English meanings.';
                return;
            }

            const counts = render(analyze(text));
            hasBreakdown = true;
            syncLayout();

            status.textContent = counts.words + (counts.words === 1 ? ' word' : ' words') +
                (counts.unknown ? ' · ' + counts.unknown + ' not in the dictionary' : '') +
                ' · tap one to jump to it';
        }

        input.addEventListener('focus', function () { writing = true; syncLayout(); });
        input.addEventListener('blur', function () { writing = false; syncLayout(); });

        // Rewrapping the strip at a new width changes its height, and the cards
        // need the new number to keep landing clear of it.
        let resizeTimer;
        window.addEventListener('resize', function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(syncLayout, 150);
        });

        let timer;
        input.addEventListener('input', function () {
            clearTimeout(timer);
            timer = setTimeout(run, 250);
        });
        input.addEventListener('keydown', function (event) {
            if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
                event.preventDefault();
                clearTimeout(timer);
                run();
            }
        });

        runBtn.addEventListener('click', function () { clearTimeout(timer); run(); });
        clearBtn.addEventListener('click', function () {
            input.value = '';
            emptyState();
            status.textContent = 'Paste or type Japanese text to break it into words.';
            input.focus();
        });
        wordBtn.addEventListener('click', function () { setMode('word'); });
        sentenceBtn.addEventListener('click', function () { setMode('sentence'); });

        // Tapping a word — in the strip, or in the reading — walks you to its
        // card; tapping a headword hands the whole word over to the word search.
        function jumpToCard(index) {
            const card = document.getElementById('sent-card-' + index);
            if (!card) return;

            cardsHost.querySelectorAll('.is-target').forEach(function (el) {
                el.classList.remove('is-target');
            });
            card.classList.add('is-target');

            // Fold the composer and re-measure the strip before scrolling, not
            // after: both change how far the card has to travel, and a target
            // worked out against the old layout lands in the wrong place.
            // The fold is deliberately not animated so the geometry is final
            // by the time scrollIntoView reads it.
            syncLayout();
            card.scrollIntoView({
                block: 'start',
                behavior: window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
                    ? 'auto' : 'smooth'
            });
        }

        strip.addEventListener('click', function (event) {
            const chip = event.target.closest('.sent-token[data-card]');
            if (chip) jumpToCard(chip.dataset.card);
        });

        meaningHost.addEventListener('click', function (event) {
            const chunk = event.target.closest('.sent-gloss[data-card]');
            if (chunk) jumpToCard(chunk.dataset.card);
        });

        cardsHost.addEventListener('click', function (event) {
            const example = event.target.closest('.sent-example');
            if (example) {
                input.value = EXAMPLE;
                run();
                return;
            }
            const head = event.target.closest('.sent-head, .sent-dictform');
            if (head) api().lookUpWord(head.textContent.trim());
        });

        // The word search owns the panel again whenever it is handed a query.
        api().onWordLookup = function () { if (api().mode !== 'word') setMode('word'); };

        // ...and sentence mode claims #s=, which is how the course links say
        // "take this apart" rather than "look this word up". Read here rather
        // than through a callback in dictionary.js, because that file runs its
        // hand-off before this one has loaded.
        function readSentenceHash() {
            const hash = (window.location.hash || '').replace(/^#/, '');
            if (!hash) return;

            const text = new URLSearchParams(hash).get('s');
            if (!text) return;

            input.value = text;
            if (api().mode !== 'sentence') setMode('sentence');
            else run();
        }
        window.addEventListener('hashchange', readSentenceHash);
        document.addEventListener('learnejp:dictionary-ready', function () {
            if (api().mode === 'sentence') run();
        });

        emptyState();

        // Last, so the empty state above cannot wipe what it renders.
        readSentenceHash();
    }

    // Exposed for the console and for tests; the page itself only needs init().
    window.SentenceLookup = {
        analyze: analyze, candidates: candidates, deinflect: deinflect,
        reading: function (text) { return chunkTokens(analyze(text), new Map()); }
    };

    if (typeof document !== 'undefined' && document.getElementById) init();
})();
