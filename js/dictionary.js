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


const searchInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('results');
const statusText = document.getElementById('statusText');
const jishoExtLink = document.getElementById('jishoExt');

// ===================== DATA LOADING =====================
// Entries are compact triples: [kanjiForms, kanaForms, senses]
//   kanjiForms / kanaForms: [ [text, isCommon], ... ]
//   senses: [ [gloss, gloss, ...], ... ]
//
// Preferred source is js/dictionary-data.js, which dictionary.html loads with an
// ordinary <script> tag *before* this file (window.DICTIONARY_DATA). No fetch
// is involved, so it works even when the site is opened straight from disk
// (file://), where browsers block fetch() of local files — the reason the old
// dictionary silently never loaded. Fetching the raw JMdict JSON is kept only
// as a fallback for http:// setups.

// ===================== KANA → ROMAJI (for mora display) =====================

const ROMAJI = (() => {
    const map = {};
    const base = {
        'あ': 'a', 'い': 'i', 'う': 'u', 'え': 'e', 'お': 'o',
        'か': 'ka', 'き': 'ki', 'く': 'ku', 'け': 'ke', 'こ': 'ko',
        'さ': 'sa', 'し': 'shi', 'す': 'su', 'せ': 'se', 'そ': 'so',
        'た': 'ta', 'ち': 'chi', 'つ': 'tsu', 'て': 'te', 'と': 'to',
        'な': 'na', 'に': 'ni', 'ぬ': 'nu', 'ね': 'ne', 'の': 'no',
        'は': 'ha', 'ひ': 'hi', 'ふ': 'fu', 'へ': 'he', 'ほ': 'ho',
        'ま': 'ma', 'み': 'mi', 'む': 'mu', 'め': 'me', 'も': 'mo',
        'や': 'ya', 'ゆ': 'yu', 'よ': 'yo',
        'ら': 'ra', 'り': 'ri', 'る': 'ru', 'れ': 're', 'ろ': 'ro',
        'わ': 'wa', 'を': 'wo', 'ん': 'n',
        'が': 'ga', 'ぎ': 'gi', 'ぐ': 'gu', 'げ': 'ge', 'ご': 'go',
        'ざ': 'za', 'じ': 'ji', 'ず': 'zu', 'ぜ': 'ze', 'ぞ': 'zo',
        'だ': 'da', 'ぢ': 'ji', 'づ': 'zu', 'で': 'de', 'ど': 'do',
        'ば': 'ba', 'び': 'bi', 'ぶ': 'bu', 'べ': 'be', 'ぼ': 'bo',
        'ぱ': 'pa', 'ぴ': 'pi', 'ぷ': 'pu', 'ぺ': 'pe', 'ぽ': 'po',
        'ぁ': 'a', 'ぃ': 'i', 'ぅ': 'u', 'ぇ': 'e', 'ぉ': 'o'
    };
    const toKatakana = s => String.fromCharCode(s.charCodeAt(0) + 0x60);

    Object.entries(base).forEach(([h, r]) => {
        map[h] = r;
        map[toKatakana(h)] = r;
    });

    // Yōon digraphs: consonant + small ya/yu/yo, in both scripts.
    const yoonBases = ['き', 'し', 'ち', 'に', 'ひ', 'み', 'り', 'ぎ', 'じ', 'ぢ', 'び', 'ぴ'];
    const smalls = { 'ゃ': 'a', 'ゅ': 'u', 'ょ': 'o' };
    yoonBases.forEach(b => {
        const prefix = base[b].slice(0, -1); // strip the "i"
        Object.entries(smalls).forEach(([small, vowel]) => {
            const r = ['sh', 'ch', 'j'].includes(prefix)
                ? prefix + vowel
                : prefix + 'y' + vowel;
            map[b + small] = r;
            map[toKatakana(b) + toKatakana(small)] = r;
        });
    });

    // Extended katakana for foreign sounds.
    Object.assign(map, {
        'ヴ': 'vu', 'ファ': 'fa', 'フィ': 'fi', 'フェ': 'fe', 'フォ': 'fo',
        'ヴァ': 'va', 'ヴィ': 'vi', 'ヴェ': 've', 'ヴォ': 'vo',
        'ウィ': 'wi', 'ウェ': 'we', 'ウォ': 'wo',
        'ティ': 'ti', 'ディ': 'di', 'トゥ': 'tu', 'ドゥ': 'du',
        'シェ': 'she', 'ジェ': 'je', 'チェ': 'che',
        'ツァ': 'tsa', 'ツィ': 'tsi', 'ツェ': 'tse', 'ツォ': 'tso',
        'フュ': 'fyu', 'デュ': 'dyu', 'テュ': 'tyu'
    });
    return map;
})();

// Split a kana string into mora units of { kana, romaji }.
function toMora(kana) {
    const units = [];
    let i = 0;
    while (i < kana.length) {
        const two = kana.substr(i, 2);
        const one = kana[i];

        if (one === 'っ' || one === 'ッ') {
            // Sokuon: doubles the next mora's first consonant.
            const next = ROMAJI[kana.substr(i + 1, 2)] || ROMAJI[kana[i + 1]] || '';
            units.push({ kana: one, romaji: next ? next[0] : "'" });
            i += 1;
        } else if (one === 'ー') {
            // Long-vowel mark: repeats the previous unit's final vowel.
            const prev = units.length ? units[units.length - 1].romaji : '';
            units.push({ kana: one, romaji: prev.slice(-1) });
            i += 1;
        } else if (ROMAJI[two] && two.length === 2) {
            units.push({ kana: two, romaji: ROMAJI[two] });
            i += 2;
        } else if (ROMAJI[one]) {
            units.push({ kana: one, romaji: ROMAJI[one] });
            i += 1;
        } else {
            units.push({ kana: one, romaji: '' });
            i += 1;
        }
    }
    return units;
}

// ===================== SEARCH =====================

// Lower score = better match. Exact form > prefix > substring, with English
// glosses ranked by word-level quality (whole-word matches beat mere prefixes
// like "waterweed" for "water"), and common words nudged up.
function scoreEntry(entry, rawQuery, lowerQuery, wordRe) {
    const [kanjiForms, kanaForms, senses] = entry;
    let best = Infinity;

    const formScore = t => {
        if (t === rawQuery) return 0;
        if (t.startsWith(rawQuery)) return 1;
        if (t.includes(rawQuery)) return 2;
        return Infinity;
    };
    kanjiForms.forEach(([t]) => { best = Math.min(best, formScore(t)); });
    kanaForms.forEach(([t]) => { best = Math.min(best, formScore(t)); });

    senses.forEach(glosses => glosses.forEach(g => {
        const gl = g.toLowerCase();
        if (gl === lowerQuery) best = Math.min(best, 0.5);
        else if (gl.split(/[\s(]/)[0] === lowerQuery) best = Math.min(best, 0.8);
        else if (wordRe.test(gl)) best = Math.min(best, 1.2);
        else if (gl.startsWith(lowerQuery)) best = Math.min(best, 1.6);
        else if (gl.includes(lowerQuery)) best = Math.min(best, 2.5);
    }));

    if (best === Infinity) return Infinity;

    const isCommon = kanjiForms.some(([, c]) => c) || kanaForms.some(([, c]) => c);
    return best - (isCommon ? 0.2 : 0);
}

function searchWord(query) {
    const rawQuery = query.trim();
    const lowerQuery = rawQuery.toLowerCase();
    if (!rawQuery) return [];

    const escaped = lowerQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const wordRe = new RegExp('\\b' + escaped + '\\b');

    const scored = [];
    for (let i = 0; i < dictionaryData.length; i++) {
        const s = scoreEntry(dictionaryData[i], rawQuery, lowerQuery, wordRe);
        if (s !== Infinity) scored.push([s, dictionaryData[i]]);
    }
    scored.sort((a, b) =>
        a[0] - b[0] || a[1][1][0][0].length - b[1][1][0][0].length);
    return scored.slice(0, 30).map(pair => pair[1]);
}

// ===================== RENDERING =====================

function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function renderResults(entries, query) {
    resultsContainer.innerHTML = '';

    if (entries.length === 0) {
        resultsContainer.innerHTML = '<p class="no-results">No matches found.</p>';
        return;
    }

    const html = entries.map(([kanjiForms, kanaForms, senses]) => {
        const headword = kanjiForms.length
            ? kanjiForms.map(([t]) => escapeHtml(t)).join(', ')
            : escapeHtml(kanaForms[0][0]);
        const isCommon = kanjiForms.some(([, c]) => c) || kanaForms.some(([, c]) => c);

        const moraRows = kanaForms.slice(0, 2).map(([t]) => {
            const units = toMora(t).map(u => `
                <div class="mora-unit">
                    <span class="mora-kana">${escapeHtml(u.kana)}</span>
                    <span class="mora-romaji">${escapeHtml(u.romaji)}</span>
                </div>`).join('');
            return `<div class="mora-row">${units}</div>`;
        }).join('');

        const meanings = senses.map((glosses, i) => {
            const number = senses.length > 1 ? `${i + 1}. ` : '';
            return number + escapeHtml(glosses.join('; '));
        }).join('&ensp;');

        return `<div class="result-card">
            <div class="result-word">
                <span class="result-kanji">${headword}</span>
                ${isCommon ? '<span class="result-tag result-tag-common">common</span>' : ''}
            </div>
            ${moraRows}
            <div class="result-meaning">${meanings}</div>
        </div>`;
    }).join('');

    resultsContainer.innerHTML = html;
}

function runSearch() {
    const query = searchInput.value;

    if (jishoExtLink) {
        jishoExtLink.href = query.trim()
            ? `https://jisho.org/search/${encodeURIComponent(query.trim())}`
            : 'https://jisho.org/';
    }

    // Sentence mode borrows #results and #statusText while it is open, so the
    // word search stays quiet until the panel is handed back to it.
    if (window.LearneJPDict && window.LearneJPDict.mode !== 'word') return;

    if (!isLoaded) return;
    if (!query.trim()) {
        resultsContainer.innerHTML = '';
        statusText.textContent =
            `Dictionary loaded — ${dictionaryData.length.toLocaleString()} common words. Start typing to search.`;
        return;
    }
    const results = searchWord(query);
    statusText.textContent = results.length === 30
        ? 'Showing the 30 best matches.'
        : `${results.length} match${results.length === 1 ? '' : 'es'}.`;
    renderResults(results, query);
}

let debounceTimer;
searchInput.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(runSearch, 150);
});

// ===================== SEARCH HAND-OFF =====================
// Other pages (e.g. a kanji tapped on the Kana & Kanji reference) link here
// with dictionary.html#q=<term>. The hash form is used because fragments survive
// every environment — including file:// pages, where some setups drop or
// mangle ?query strings. The older ?q= and ?jisho= forms still work, and
// Jisho-style "#tags" are stripped since this dictionary doesn't use them.

function readHandoffQuery() {
    const hash = window.location.hash.replace(/^#/, '');
    if (hash) {
        const params = new URLSearchParams(hash);
        const fromHash = params.get('q') || params.get('s');
        if (fromHash) return fromHash;
    }
    const params = new URLSearchParams(window.location.search);
    const fromSearch = params.get('q') || params.get('jisho') || params.get('s');
    if (fromSearch) return fromSearch;

    // Last-resort channel: the linking page (characters.js) also stashes the
    // query in sessionStorage on click, for environments that drop both the
    // hash and the query string. Read once, then clear.
    try {
        const stored = sessionStorage.getItem('learnejp-dict-query');
        if (stored) {
            sessionStorage.removeItem('learnejp-dict-query');
            return stored;
        }
    } catch (err) {
        // Storage unavailable — nothing more to try.
    }
    return null;
}

// A whole sentence handed to the word search finds nothing — it is not a word.
// So links that mean "take this apart" use #s= instead of #q=, and sentence.js
// claims those before the word search sees them. If the sentence UI is not on
// the page at all, fall through and treat it as an ordinary query rather than
// silently ignoring the link.
function sentenceHandoffPending() {
    const hash = window.location.hash.replace(/^#/, '');
    if (!hash) return false;
    return !!new URLSearchParams(hash).get('s') && !!document.getElementById('sentenceInput');
}

function applyQueryParam() {
    if (sentenceHandoffPending()) return;

    const raw = readHandoffQuery();
    if (!raw) return;
    const query = raw.replace(/#\S+/g, '').trim();
    if (!query) return;
    lookUpWord(query);
}

// Single way in for anything that wants the word search to show a term: the
// hash hand-off above, and sentence mode when a word in a parsed line is
// tapped. Sentence mode registers onWordLookup so it can close itself first.
function lookUpWord(term) {
    const dict = window.LearneJPDict;
    if (dict && typeof dict.onWordLookup === 'function') dict.onWordLookup();
    searchInput.value = term;
    runSearch();
    searchInput.focus({ preventScroll: true });
}

// Shared surface for js/sentence.js, which needs the loaded entries and the
// kana helpers but has no business reaching into this file's internals.
window.LearneJPDict = {
    mode: 'word',
    onWordLookup: null,
    isReady: () => isLoaded,
    entries: () => dictionaryData,
    toMora,
    escapeHtml,
    search: searchWord,
    lookUpWord
};

// Landing on dictionary.html#q=... while already on the page (e.g. back/forward)
// changes only the hash, so also react to that.
window.addEventListener('hashchange', applyQueryParam);

// ===================== STARTUP =====================
// Runs last so that a ?q= hand-off can search immediately with everything
// above already initialized.

let dictionaryData = [];
let isLoaded = false;

function normalizeJmdictWord(w) {
    const forms = list => (list || [])
        .slice()
        .sort((a, b) => (b.common === true) - (a.common === true))
        .slice(0, 3)
        .map(f => [f.text, f.common ? 1 : 0]);
    const senses = (w.sense || [])
        .slice(0, 5)
        .map(s => (s.gloss || []).map(g => g.text).filter(Boolean).slice(0, 5))
        .filter(g => g.length > 0);
    return [forms(w.kanji), forms(w.kana), senses];
}

function onDictionaryReady() {
    isLoaded = true;
    statusText.textContent =
        `Dictionary loaded — ${dictionaryData.length.toLocaleString()} common words. Start typing to search.`;
    applyQueryParam();
    document.dispatchEvent(new CustomEvent('learnejp:dictionary-ready'));
}

if (Array.isArray(window.DICTIONARY_DATA)) {
    dictionaryData = window.DICTIONARY_DATA;
    onDictionaryReady();
} else {
    fetch('../data/dictionary-data.json')
        .then(response => {
            if (!response.ok) throw new Error('Failed to load dictionary file');
            return response.json();
        })
        .then(data => {
            const words = data.words || data;
            dictionaryData = words.map(normalizeJmdictWord).filter(e => e[1].length && e[2].length);
            onDictionaryReady();
        })
        .catch(err => {
            statusText.textContent =
                'Could not load the dictionary. Check that dictionary.html has a <script> tag for js/dictionary-data.js just above the one for js/dictionary.js.';
            console.error(err);
        });
}
