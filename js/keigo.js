// LearneJP — a Japanese (JLPT) study app for writing practice, quizzes, and dictionary lookup
// Copyright (C) 2026  Claudia Mithesa Peranginangin
//
// This program is free software: you can redistribute it and/or modify it under
// the terms of the GNU General Public License as published by the Free Software
// Foundation, either version 3 of the License, or (at your option) any later
// version. See <https://www.gnu.org/licenses/>.
//
// ---------------------------------------------------------------------------
// KEIGO PAGE
//
// Content lives in js/keigo-data.js, loaded by a plain <script> tag before this
// file — the same no-fetch approach practice.js uses, so the page also works
// when opened straight from disk.
// ---------------------------------------------------------------------------

(function () {
    'use strict';

    const DATA = window.KEIGO_DATA;

    if (!DATA) {
        const main = document.querySelector('.side-panel');
        if (main) {
            main.insertAdjacentHTML('beforeend',
                '<p class="no-results">Could not load the keigo data. Check that ' +
                'keigo.html loads <code>js/keigo-data.js</code> in a &lt;script&gt; tag ' +
                'just above the one for <code>js/keigo.js</code>.</p>');
        }
        return;
    }

    // ===================== HELPERS =====================

    const $ = sel => document.querySelector(sel);
    const $$ = sel => Array.from(document.querySelectorAll(sel));

    // Content is authored by hand in keigo-data.js rather than user-supplied,
    // but escaping keeps a stray < in a future edit from breaking the page.
    function esc(s) {
        return String(s == null ? '' : s)
            .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    // A few data fields carry deliberate <em> emphasis; allow only that tag.
    function richText(s) {
        return esc(s).replace(/&lt;(\/?)em&gt;/g, '<$1em>');
    }

    // Strips the bracketed annotations and markers that appear in quiz stems
    // and example lines so the speech engine doesn't read them aloud.
    function speakable(text) {
        return String(text)
            .replace(/[【】〔〕（）()]/g, ' ')
            .replace(/[✗×○]/g, ' ')
            .replace(/＿+/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
    }

    // ===================== PRONUNCIATION =====================
    // Same voice-ranking approach as js/characters.js: prefer neural voices,
    // then standard system voices, then any Japanese voice at all.

    const speech = window.speechSynthesis || null;
    let jpVoice = null;

    function pickJapaneseVoice() {
        if (!speech) return null;
        const japanese = speech.getVoices()
            .filter(v => (v.lang || '').toLowerCase().startsWith('ja'));
        if (japanese.length === 0) return null;
        const rank = v => {
            const n = v.name.toLowerCase();
            if (n.includes('google')) return 0;
            if (n.includes('natural') || n.includes('online')) return 1;
            if (n.includes('enhanced') || n.includes('premium')) return 2;
            if (n.includes('nanami') || n.includes('keita')) return 3;
            if (n.includes('kyoko') || n.includes('otoya')) return 4;
            return 5;
        };
        japanese.sort((a, b) =>
            rank(a) - rank(b) || (b.localService === true) - (a.localService === true));
        return japanese[0];
    }

    if (speech) {
        jpVoice = pickJapaneseVoice();
        speech.onvoiceschanged = () => { jpVoice = pickJapaneseVoice(); };
    }

    function speakJapanese(text) {
        if (!speech || !text) return;
        speech.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ja-JP';
        if (!jpVoice) jpVoice = pickJapaneseVoice();
        if (jpVoice) utterance.voice = jpVoice;
        utterance.rate = 0.85; // full sentences, gently slowed
        utterance.pitch = 1;
        speech.speak(utterance);
    }

    const speechAvailable = Boolean(speech);

    function sayBtn(text) {
        if (!speechAvailable) return '';
        return `<button type="button" class="kg-say" data-say="${esc(speakable(text))}"
                    title="Hear this" aria-label="Hear this read aloud">🔊</button>`;
    }

    // One delegated listener covers every speak button on the page.
    document.addEventListener('click', e => {
        const btn = e.target.closest('.kg-say');
        if (btn) speakJapanese(btn.dataset.say);
    });

    // ===================== TABS =====================

    const TABS = ['overview', 'verbs', 'patterns', 'situations', 'pitfalls', 'quiz'];

    function showTab(name) {
        if (!TABS.includes(name)) name = 'overview';
        TABS.forEach(t => {
            const section = $('#kg-' + t);
            const button = $('#tab-' + t);
            if (section) section.classList.toggle('hidden', t !== name);
            if (button) {
                button.classList.toggle('active', t === name);
                button.setAttribute('aria-selected', String(t === name));
            }
        });
        if (speech) speech.cancel();
    }

    TABS.forEach(t => {
        const button = $('#tab-' + t);
        if (button) {
            button.addEventListener('click', () => {
                showTab(t);
                history.replaceState(null, '', '#' + t);
            });
        }
    });

    // ===================== OVERVIEW =====================

    function renderOverview() {
        const html = DATA.categories.map(c => `
            <article class="kg-card" id="cat-${esc(c.id)}">
                <span class="kg-dir kg-dir-${esc(c.direction)}">${esc(dirLabel(c.direction))}</span>
                <h3><span lang="ja">${esc(c.jp)}</span>
                    <span class="kg-reading" lang="ja">${esc(c.reading)}</span></h3>
                <p class="kg-gloss">${esc(c.en)} — ${esc(c.gloss)}</p>
                <p>${richText(c.body)}</p>
                <p class="kg-en" style="margin-top:6px">Subject of the verb: ${esc(c.subject)}</p>
                <div class="kg-ex">
                    ${c.examples.map(ex => exampleRow(ex)).join('')}
                </div>
            </article>`).join('');
        $('#kg-overview-list').innerHTML = html;
    }

    function dirLabel(direction) {
        return {
            'up': '↑ raises the other person',
            'down-target': '↓ lowers you, toward a target',
            'down-listener': '↓ lowers you, toward the listener',
            'listener': '→ polite to the listener',
            'none': '• points at nobody'
        }[direction] || '';
    }

    function exampleRow(ex) {
        return `
            <div class="kg-ex-row">
                <span class="kg-jp${ex.bad ? ' kg-jp-bad' : ''}" lang="ja">${esc(ex.jp)}</span>
                ${ex.bad ? '' : sayBtn(ex.jp)}
                <span class="kg-en">${esc(ex.en)}</span>
                ${ex.r ? `<span class="kg-r" lang="ja">${esc(ex.r)}</span>` : ''}
            </div>`;
    }

    // ===================== VERB TABLE =====================

    let verbFilter = 'all';

    function renderVerbs() {
        const query = ($('#kg-verb-search').value || '').trim().toLowerCase();

        const rows = DATA.verbs.filter(v => {
            if (verbFilter === 'son' && v.son.length === 0) return false;
            if (verbFilter === 'ken' && v.ken.length === 0) return false;
            if (/^N[1-5]$/.test(verbFilter) && v.level !== verbFilter) return false;
            if (!query) return true;
            const haystack = [
                v.plain, v.reading, v.en,
                ...v.son.map(f => f.f + f.r),
                ...v.ken.map(f => f.f + f.r)
            ].join(' ').toLowerCase();
            return haystack.includes(query);
        });

        $('#kg-verb-count').textContent =
            `${rows.length} of ${DATA.verbs.length} verbs`;

        if (rows.length === 0) {
            $('#kg-verb-body').innerHTML =
                '<tr><td colspan="5" class="kg-empty">No verbs match that search.</td></tr>';
            return;
        }

        $('#kg-verb-body').innerHTML = rows.map(v => `
            <tr>
                <td>
                    <span class="kg-plain" lang="ja">${esc(v.plain)}</span>
                    <span class="kg-plain-en">${esc(v.reading)} · ${esc(v.en)}</span>
                </td>
                <td>${formCell(v.son)}</td>
                <td>${formCell(v.ken)}</td>
                <td><span class="kg-lvl">${esc(v.level)}</span></td>
                <td class="kg-note-cell">${esc(v.note || '')}</td>
            </tr>`).join('');
    }

    function formCell(forms) {
        if (!forms || forms.length === 0) return '<span class="kg-dash">—</span>';
        return forms.map(f => `
            <span class="kg-form">
                <span lang="ja">${esc(f.f)}</span>${sayBtn(f.f)}
                ${f.t ? `<span class="kg-tag" lang="ja"
                    title="${f.t === 1 ? '謙譲語Ⅰ — needs a target' : '謙譲語Ⅱ — courteous, no target'}"
                    >${f.t === 1 ? 'Ⅰ' : 'Ⅱ'}</span>` : ''}
                <span class="kg-form-r" lang="ja">${esc(f.r)}</span>
            </span>`).join('');
    }

    // ===================== PATTERNS =====================

    let patternFilter = 'all';

    function renderPatterns() {
        const rows = DATA.patterns.filter(p =>
            patternFilter === 'all' || p.groupId === patternFilter);

        $('#kg-pattern-list').innerHTML = rows.map(p => `
            <article class="kg-card">
                <span class="kg-dir" lang="ja">${esc(p.group)}</span>
                <h3><span class="kg-pattern-form" lang="ja">${esc(p.form)}</span>
                    <span class="kg-strength">${esc(p.strength)}</span></h3>
                <p>${richText(p.body)}</p>
                <div class="kg-ex">
                    ${p.examples.map(ex => `
                        <div class="kg-ex-row">
                            <span class="kg-jp" lang="ja">${esc(ex.jp)}</span>
                            ${sayBtn(ex.jp)}
                            <span class="kg-en">${esc(ex.en)}</span>
                        </div>`).join('')}
                </div>
                ${p.warn ? `<p class="kg-warn">${richText(p.warn)}</p>` : ''}
            </article>`).join('');
    }

    // ===================== SITUATIONS =====================

    function renderSituations() {
        $('#kg-situation-list').innerHTML = DATA.situations.map(s => `
            <article class="kg-card" id="sit-${esc(s.id)}">
                <div class="kg-sit-head">
                    <span class="kg-sit-icon" aria-hidden="true">${esc(s.icon)}</span>
                    <h3>${esc(s.title)}</h3>
                </div>
                <p>${richText(s.intro)}</p>
                <div class="kg-ex">
                    ${s.lines.map(l => `
                        <div class="kg-line">
                            <div class="kg-ex-row">
                                <span class="kg-jp${l.bad ? ' kg-jp-bad' : ''}" lang="ja">${esc(l.jp)}</span>
                                ${l.bad ? '' : sayBtn(l.jp)}
                            </div>
                            <div class="kg-en">${esc(l.en)}</div>
                            ${l.r ? `<div class="kg-r" lang="ja">${esc(l.r)}</div>` : ''}
                        </div>`).join('')}
                </div>
            </article>`).join('');
    }

    // ===================== PITFALLS =====================

    function renderPitfalls() {
        $('#kg-pitfall-list').innerHTML = DATA.pitfalls.map(p => `
            <article class="kg-card" id="pit-${esc(p.id)}">
                <h3 lang="ja">${esc(p.title)}</h3>
                <p>${richText(p.body)}</p>
                <div class="kg-ex">
                    ${p.pairs.map(pair => `
                        <div class="kg-pair">
                            <span class="kg-bad">
                                <span class="kg-mark" aria-hidden="true">✗</span>
                                <span lang="ja">${esc(pair.bad)}</span>
                            </span>
                            <span class="kg-arrow" aria-hidden="true">→</span>
                            <span class="kg-good">
                                <span class="kg-mark" aria-hidden="true">○</span>
                                <span lang="ja">${esc(pair.good)}</span>
                                ${sayBtn(pair.good)}
                            </span>
                            <span class="kg-why">${esc(pair.why)}</span>
                        </div>`).join('')}
                </div>
                ${p.note ? `<p class="kg-warn">${richText(p.note)}</p>` : ''}
            </article>`).join('');
    }

    // ===================== QUIZ =====================

    let quizOrder = [];
    let quizIndex = 0;
    let quizScore = 0;
    let quizAnswered = false;

    function shuffle(list) {
        const out = list.slice();
        for (let i = out.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [out[i], out[j]] = [out[j], out[i]];
        }
        return out;
    }

    function startQuiz() {
        quizOrder = shuffle(DATA.quiz.map((_, i) => i));
        quizIndex = 0;
        quizScore = 0;
        renderQuestion();
    }

    function renderQuestion() {
        const total = quizOrder.length;

        if (quizIndex >= total) {
            const pct = Math.round((quizScore / total) * 100);
            $('#kg-quiz-body').innerHTML = `
                <div class="kg-card">
                    <h3>Finished</h3>
                    <p class="kg-gloss">${quizScore} of ${total} correct — ${pct}%</p>
                    <p>${esc(verdict(pct))}</p>
                </div>`;
            $('#kg-quiz-progress').textContent = '';
            $('#kg-quiz-score').textContent = `Score ${quizScore} / ${total}`;
            return;
        }

        const item = DATA.quiz[quizOrder[quizIndex]];
        quizAnswered = false;

        $('#kg-quiz-progress').textContent = `Question ${quizIndex + 1} of ${total}`;
        $('#kg-quiz-score').textContent = `Score ${quizScore} / ${quizIndex}`;
        $('#kg-quiz-body').innerHTML = `
            <p class="kg-q-text" lang="ja">${esc(item.q)}</p>
            <div class="kg-choices" role="group" aria-label="Answer choices">
                ${item.choices.map((c, i) => `
                    <button type="button" class="kg-choice" data-choice="${i}" lang="ja">
                        ${esc(c)}
                    </button>`).join('')}
            </div>
            <div id="kg-quiz-feedback"></div>`;
    }

    function verdict(pct) {
        if (pct >= 90) return 'Business-ready. You are reading direction and register correctly.';
        if (pct >= 70) return 'Solid. Review the pitfalls tab for the cases you missed.';
        if (pct >= 50) return 'Getting there. The verb table is worth another pass.';
        return 'Start with the overview tab — the five categories make the rest fall into place.';
    }

    $('#kg-quiz-body').addEventListener('click', e => {
        const button = e.target.closest('.kg-choice');
        if (!button || quizAnswered) return;

        quizAnswered = true;
        const chosen = Number(button.dataset.choice);
        const item = DATA.quiz[quizOrder[quizIndex]];
        const correct = chosen === item.a;
        if (correct) quizScore++;

        $$('.kg-choice').forEach((b, i) => {
            b.disabled = true;
            if (i === item.a) b.classList.add('kg-choice-correct');
            else if (i === chosen) b.classList.add('kg-choice-wrong');
        });

        $('#kg-quiz-feedback').innerHTML = `
            <div class="kg-feedback">
                <span lang="ja">${correct ? '正解' : '不正解'}</span>
                <strong>${correct ? '— correct' : '— not quite'}</strong><br>
                ${esc(item.why)}
            </div>`;
        $('#kg-quiz-score').textContent = `Score ${quizScore} / ${quizIndex + 1}`;
        $('#kg-quiz-next').classList.remove('hidden-field');
        $('#kg-quiz-next').focus();
    });

    $('#kg-quiz-next').addEventListener('click', () => {
        quizIndex++;
        $('#kg-quiz-next').classList.add('hidden-field');
        renderQuestion();
    });

    $('#kg-quiz-restart').addEventListener('click', () => {
        $('#kg-quiz-next').classList.add('hidden-field');
        startQuiz();
    });

    // ===================== FILTER WIRING =====================

    $('#kg-verb-search').addEventListener('input', renderVerbs);

    $$('#kg-verb-filters .level-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            $$('#kg-verb-filters .level-chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            verbFilter = chip.dataset.filter;
            renderVerbs();
        });
    });

    $$('#kg-pattern-filters .level-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            $$('#kg-pattern-filters .level-chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            patternFilter = chip.dataset.filter;
            renderPatterns();
        });
    });

    // ===================== INITIALISE =====================

    renderOverview();
    renderVerbs();
    renderPatterns();
    renderSituations();
    renderPitfalls();
    startQuiz();

    // Deep links: /keigo.html#verbs opens straight on the verb table.
    showTab((location.hash || '').replace('#', '') || 'overview');
    window.addEventListener('hashchange', () => {
        showTab((location.hash || '').replace('#', ''));
    });
})();
