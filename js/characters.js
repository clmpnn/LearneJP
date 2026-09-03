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

// ===================== KANA DATA =====================
// Each chart is a list of sections; each section has a title and rows;
// each row is a list of [character, romaji] cells (null = empty grid slot).

const HIRAGANA_CHARTS = [
    {
        title: 'Basic (gojūon)',
        cols: ['a', 'i', 'u', 'e', 'o'],
        rows: [
            ['', [['あ', 'a'], ['い', 'i'], ['う', 'u'], ['え', 'e'], ['お', 'o']]],
            ['k', [['か', 'ka'], ['き', 'ki'], ['く', 'ku'], ['け', 'ke'], ['こ', 'ko']]],
            ['s', [['さ', 'sa'], ['し', 'shi'], ['す', 'su'], ['せ', 'se'], ['そ', 'so']]],
            ['t', [['た', 'ta'], ['ち', 'chi'], ['つ', 'tsu'], ['て', 'te'], ['と', 'to']]],
            ['n', [['な', 'na'], ['に', 'ni'], ['ぬ', 'nu'], ['ね', 'ne'], ['の', 'no']]],
            ['h', [['は', 'ha'], ['ひ', 'hi'], ['ふ', 'fu'], ['へ', 'he'], ['ほ', 'ho']]],
            ['m', [['ま', 'ma'], ['み', 'mi'], ['む', 'mu'], ['め', 'me'], ['も', 'mo']]],
            ['y', [['や', 'ya'], null, ['ゆ', 'yu'], null, ['よ', 'yo']]],
            ['r', [['ら', 'ra'], ['り', 'ri'], ['る', 'ru'], ['れ', 're'], ['ろ', 'ro']]],
            ['w', [['わ', 'wa'], null, null, null, ['を', 'wo']]],
            ['', [['ん', 'n'], null, null, null, null]]
        ]
    },
    {
        title: 'Dakuten & handakuten',
        cols: ['a', 'i', 'u', 'e', 'o'],
        rows: [
            ['g', [['が', 'ga'], ['ぎ', 'gi'], ['ぐ', 'gu'], ['げ', 'ge'], ['ご', 'go']]],
            ['z', [['ざ', 'za'], ['じ', 'ji'], ['ず', 'zu'], ['ぜ', 'ze'], ['ぞ', 'zo']]],
            ['d', [['だ', 'da'], ['ぢ', 'ji'], ['づ', 'zu'], ['で', 'de'], ['ど', 'do']]],
            ['b', [['ば', 'ba'], ['び', 'bi'], ['ぶ', 'bu'], ['べ', 'be'], ['ぼ', 'bo']]],
            ['p', [['ぱ', 'pa'], ['ぴ', 'pi'], ['ぷ', 'pu'], ['ぺ', 'pe'], ['ぽ', 'po']]]
        ]
    },
    {
        title: 'Combinations (yōon)',
        cols: ['ya', 'yu', 'yo'],
        rows: [
            ['k', [['きゃ', 'kya'], ['きゅ', 'kyu'], ['きょ', 'kyo']]],
            ['s', [['しゃ', 'sha'], ['しゅ', 'shu'], ['しょ', 'sho']]],
            ['t', [['ちゃ', 'cha'], ['ちゅ', 'chu'], ['ちょ', 'cho']]],
            ['n', [['にゃ', 'nya'], ['にゅ', 'nyu'], ['にょ', 'nyo']]],
            ['h', [['ひゃ', 'hya'], ['ひゅ', 'hyu'], ['ひょ', 'hyo']]],
            ['m', [['みゃ', 'mya'], ['みゅ', 'myu'], ['みょ', 'myo']]],
            ['r', [['りゃ', 'rya'], ['りゅ', 'ryu'], ['りょ', 'ryo']]],
            ['g', [['ぎゃ', 'gya'], ['ぎゅ', 'gyu'], ['ぎょ', 'gyo']]],
            ['j', [['じゃ', 'ja'], ['じゅ', 'ju'], ['じょ', 'jo']]],
            ['j*', [['ぢゃ', 'ja'], ['ぢゅ', 'ju'], ['ぢょ', 'jo']]],
            ['b', [['びゃ', 'bya'], ['びゅ', 'byu'], ['びょ', 'byo']]],
            ['p', [['ぴゃ', 'pya'], ['ぴゅ', 'pyu'], ['ぴょ', 'pyo']]]
        ],
        note: '* ぢゃ・ぢゅ・ぢょ are rare and appear only in a few words.'
    },
    {
        title: 'Small & special',
        cols: [],
        rows: [
            ['', [['っ', 'double consonant'], ['ゃ', 'small ya'], ['ゅ', 'small yu'], ['ょ', 'small yo']]],
            ['', [['ぁ', 'small a'], ['ぃ', 'small i'], ['ぅ', 'small u'], ['ぇ', 'small e'], ['ぉ', 'small o']]]
        ]
    }
];

const KATAKANA_CHARTS = [
    {
        title: 'Basic (gojūon)',
        cols: ['a', 'i', 'u', 'e', 'o'],
        rows: [
            ['', [['ア', 'a'], ['イ', 'i'], ['ウ', 'u'], ['エ', 'e'], ['オ', 'o']]],
            ['k', [['カ', 'ka'], ['キ', 'ki'], ['ク', 'ku'], ['ケ', 'ke'], ['コ', 'ko']]],
            ['s', [['サ', 'sa'], ['シ', 'shi'], ['ス', 'su'], ['セ', 'se'], ['ソ', 'so']]],
            ['t', [['タ', 'ta'], ['チ', 'chi'], ['ツ', 'tsu'], ['テ', 'te'], ['ト', 'to']]],
            ['n', [['ナ', 'na'], ['ニ', 'ni'], ['ヌ', 'nu'], ['ネ', 'ne'], ['ノ', 'no']]],
            ['h', [['ハ', 'ha'], ['ヒ', 'hi'], ['フ', 'fu'], ['ヘ', 'he'], ['ホ', 'ho']]],
            ['m', [['マ', 'ma'], ['ミ', 'mi'], ['ム', 'mu'], ['メ', 'me'], ['モ', 'mo']]],
            ['y', [['ヤ', 'ya'], null, ['ユ', 'yu'], null, ['ヨ', 'yo']]],
            ['r', [['ラ', 'ra'], ['リ', 'ri'], ['ル', 'ru'], ['レ', 're'], ['ロ', 'ro']]],
            ['w', [['ワ', 'wa'], null, null, null, ['ヲ', 'wo']]],
            ['', [['ン', 'n'], null, null, null, null]]
        ]
    },
    {
        title: 'Dakuten & handakuten',
        cols: ['a', 'i', 'u', 'e', 'o'],
        rows: [
            ['g', [['ガ', 'ga'], ['ギ', 'gi'], ['グ', 'gu'], ['ゲ', 'ge'], ['ゴ', 'go']]],
            ['z', [['ザ', 'za'], ['ジ', 'ji'], ['ズ', 'zu'], ['ゼ', 'ze'], ['ゾ', 'zo']]],
            ['d', [['ダ', 'da'], ['ヂ', 'ji'], ['ヅ', 'zu'], ['デ', 'de'], ['ド', 'do']]],
            ['b', [['バ', 'ba'], ['ビ', 'bi'], ['ブ', 'bu'], ['ベ', 'be'], ['ボ', 'bo']]],
            ['p', [['パ', 'pa'], ['ピ', 'pi'], ['プ', 'pu'], ['ペ', 'pe'], ['ポ', 'po']]]
        ]
    },
    {
        title: 'Combinations (yōon)',
        cols: ['ya', 'yu', 'yo'],
        rows: [
            ['k', [['キャ', 'kya'], ['キュ', 'kyu'], ['キョ', 'kyo']]],
            ['s', [['シャ', 'sha'], ['シュ', 'shu'], ['ショ', 'sho']]],
            ['t', [['チャ', 'cha'], ['チュ', 'chu'], ['チョ', 'cho']]],
            ['n', [['ニャ', 'nya'], ['ニュ', 'nyu'], ['ニョ', 'nyo']]],
            ['h', [['ヒャ', 'hya'], ['ヒュ', 'hyu'], ['ヒョ', 'hyo']]],
            ['m', [['ミャ', 'mya'], ['ミュ', 'myu'], ['ミョ', 'myo']]],
            ['r', [['リャ', 'rya'], ['リュ', 'ryu'], ['リョ', 'ryo']]],
            ['g', [['ギャ', 'gya'], ['ギュ', 'gyu'], ['ギョ', 'gyo']]],
            ['j', [['ジャ', 'ja'], ['ジュ', 'ju'], ['ジョ', 'jo']]],
            ['b', [['ビャ', 'bya'], ['ビュ', 'byu'], ['ビョ', 'byo']]],
            ['p', [['ピャ', 'pya'], ['ピュ', 'pyu'], ['ピョ', 'pyo']]]
        ]
    },
    {
        title: 'Extended (foreign sounds) & special',
        cols: [],
        rows: [
            ['', [['ヴ', 'vu'], ['ファ', 'fa'], ['フィ', 'fi'], ['フェ', 'fe'], ['フォ', 'fo']]],
            ['', [['ヴァ', 'va'], ['ヴィ', 'vi'], ['ヴェ', 've'], ['ヴォ', 'vo'], ['フュ', 'fyu']]],
            ['', [['ウィ', 'wi'], ['ウェ', 'we'], ['ウォ', 'wo'], ['ティ', 'ti'], ['ディ', 'di']]],
            ['', [['シェ', 'she'], ['ジェ', 'je'], ['チェ', 'che'], ['トゥ', 'tu'], ['ドゥ', 'du']]],
            ['', [['ツァ', 'tsa'], ['ツィ', 'tsi'], ['ツェ', 'tse'], ['ツォ', 'tso'], ['デュ', 'dyu']]],
            ['', [['ー', 'long vowel'], ['ッ', 'double consonant'], ['ャ', 'small ya'], ['ュ', 'small yu'], ['ョ', 'small yo']]]
        ]
    }
];

// ===================== PRONUNCIATION (Web Speech API) =====================
// Speaks through the best Japanese voice installed in the browser. Neural
// voices ("Google 日本語", Microsoft "…Natural") sound the most accurate, so
// they are preferred, then the standard system voices, then any ja-JP voice.
// No audio files are needed and locally installed voices work offline.

const speech = window.speechSynthesis || null;
let jpVoice = null;

function pickJapaneseVoice() {
    if (!speech) return null;
    const japanese = speech.getVoices().filter(v => (v.lang || '').toLowerCase().startsWith('ja'));
    if (japanese.length === 0) return null;
    const rank = v => {
        const n = v.name.toLowerCase();
        if (n.includes('google')) return 0;                          // Chrome neural
        if (n.includes('natural') || n.includes('online')) return 1; // Edge neural
        if (n.includes('enhanced') || n.includes('premium')) return 2; // Apple upgraded
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
    // Chrome fills its voice list asynchronously, so re-pick when it arrives.
    speech.onvoiceschanged = () => { jpVoice = pickJapaneseVoice(); };
}

function speakJapanese(text) {
    if (!speech || !text) return;
    speech.cancel(); // stop anything still playing
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    if (!jpVoice) jpVoice = pickJapaneseVoice();
    if (jpVoice) utterance.voice = jpVoice;
    // Learner pacing: single characters slowest, words gently slowed.
    // Much below these rates most engines start to sound stretched
    // and unnatural rather than merely slow.
    utterance.rate = [...text].length === 1 ? 0.7 : 0.8;
    utterance.pitch = 1;
    speech.speak(utterance);
}

// ===================== KANA RENDERING =====================

function renderKanaCharts(container, charts) {
    let html = '';
    charts.forEach(chart => {
        html += '<section class="kana-block">';
        html += `<h3 class="kana-heading">${chart.title}</h3>`;
        html += '<table class="kana-table"><tbody>';
        chart.rows.forEach(([label, cells]) => {
            html += '<tr>';
            html += `<th class="kana-rowlabel">${label}</th>`;
            cells.forEach(cell => {
                if (!cell) {
                    html += '<td class="kana-cell kana-empty"></td>';
                } else {
                    // Plain-letter romaji means a real syllable; descriptive
                    // labels ("small ya", "double consonant") aren't speakable.
                    const speakable = /^[a-z]+$/.test(cell[1]);
                    html += `<td class="kana-cell${speakable ? ' kana-speakable' : ''}"${speakable ? ` data-say="${cell[0]}"` : ''}>
                        <span class="kana-char">${cell[0]}</span>
                        <span class="kana-romaji">${cell[1]}</span>
                    </td>`;
                }
            });
            html += '</tr>';
        });
        html += '</tbody></table>';
        if (chart.note) html += `<p class="kana-note">${chart.note}</p>`;
        html += '</section>';
    });
    container.innerHTML = html;
}

renderKanaCharts(document.getElementById('hiraganaCharts'), HIRAGANA_CHARTS);
renderKanaCharts(document.getElementById('katakanaCharts'), KATAKANA_CHARTS);

[document.getElementById('hiraganaCharts'), document.getElementById('katakanaCharts')].forEach(container => {
    container.addEventListener('click', (e) => {
        const cell = e.target.closest('.kana-speakable');
        if (cell) speakJapanese(cell.dataset.say);
    });
});

// ===================== TOP-LEVEL TABS =====================

const charTabs = {
    hiragana: { tab: document.getElementById('hiraganaTab'), section: document.getElementById('hiraganaSection') },
    katakana: { tab: document.getElementById('katakanaTab'), section: document.getElementById('katakanaSection') },
    kanji: { tab: document.getElementById('kanjiTab'), section: document.getElementById('kanjiSection') }
};

function showCharTab(key) {
    if (!charTabs[key]) return;
    Object.entries(charTabs).forEach(([k, r]) => {
        r.tab.classList.toggle('active', k === key);
        r.section.classList.toggle('hidden', k !== key);
    });
}

Object.keys(charTabs).forEach(key => {
    charTabs[key].tab.addEventListener('click', () => showCharTab(key));
});

// ===================== KANJI TAB =====================

const LEVEL_ORDER = ['n5', 'n4', 'n3', 'n2', 'n1'];
const kanjiGrid = document.getElementById('kanjiGrid');
const kanjiCount = document.getElementById('kanjiCount');
const kanjiSearch = document.getElementById('kanjiSearch');
const levelChips = document.querySelectorAll('.level-chip');

let currentKanjiLevel = 'n5';
let visibleKanji = []; // the entries currently rendered, in grid order

// Data comes from js/kanji-data.js (window.KANJI_DATA), loaded by a <script>
// tag before this file — same pattern as practice-data.js, so it works on
// file:// pages too.
const KANJI = (typeof window.KANJI_DATA === 'object' && window.KANJI_DATA !== null)
    ? window.KANJI_DATA
    : { n5: [], n4: [], n3: [], n2: [], n1: [] };

// Tag every entry with its level once, and build the combined list.
LEVEL_ORDER.forEach(lvl => (KANJI[lvl] || []).forEach(e => { e.lvl = lvl; }));
const ALL_KANJI = LEVEL_ORDER.flatMap(lvl => KANJI[lvl] || []);

function getLevelList(level) {
    return level === 'all' ? ALL_KANJI : (KANJI[level] || []);
}

function matchesQuery(entry, q) {
    if (entry.c.includes(q)) return true;
    if (entry.m.some(m => m.toLowerCase().includes(q))) return true;
    const stripReading = r => r.replace(/[.\-]/g, '');
    if (entry.on.some(r => stripReading(r).includes(q))) return true;
    if (entry.kun.some(r => stripReading(r).includes(q))) return true;
    return false;
}

function renderKanjiGrid() {
    const list = getLevelList(currentKanjiLevel);
    const q = kanjiSearch.value.trim().toLowerCase();

    visibleKanji = q ? list.filter(e => matchesQuery(e, q)) : list;

    const label = currentKanjiLevel === 'all' ? 'All levels' : currentKanjiLevel.toUpperCase();
    kanjiCount.textContent = q
        ? `${label} — showing ${visibleKanji.length} of ${list.length} kanji`
        : `${label} — ${list.length} kanji`;

    if (visibleKanji.length === 0) {
        kanjiGrid.innerHTML = '<p class="no-results">No kanji match your search.</p>';
        return;
    }

    let html = '';
    visibleKanji.forEach((e, i) => {
        html += `<button class="kanji-tile" data-i="${i}" title="${e.m[0] || ''}">${e.c}</button>`;
    });
    kanjiGrid.innerHTML = html;
}

levelChips.forEach(chip => {
    chip.addEventListener('click', () => {
        currentKanjiLevel = chip.dataset.level;
        levelChips.forEach(c => c.classList.toggle('active', c === chip));
        renderKanjiGrid();
    });
});

let kanjiSearchTimer;
kanjiSearch.addEventListener('input', () => {
    clearTimeout(kanjiSearchTimer);
    kanjiSearchTimer = setTimeout(renderKanjiGrid, 150);
});

renderKanjiGrid();

// The learn page sends people to a particular chart, and sometimes to a
// particular JLPT level within the kanji tab: #katakana, or #kanji=n4.
function applyCharHash() {
    const raw = (location.hash || '').replace(/^#/, '');
    if (!raw) return;

    const [tab, level] = raw.split('=');
    showCharTab(tab);

    if (tab === 'kanji' && level) {
        const chip = document.querySelector(`.level-chip[data-level="${level}"]`);
        if (!chip) return;
        currentKanjiLevel = level;
        levelChips.forEach(c => c.classList.toggle('active', c === chip));
        renderKanjiGrid();
    }
}
window.addEventListener('hashchange', applyCharHash);
applyCharHash();

// ===================== KANJI DETAIL MODAL =====================

const modal = document.getElementById('kanjiModal');
const modalChar = document.getElementById('kmodalChar');
const modalLevel = document.getElementById('kmodalLevel');
const modalStrokes = document.getElementById('kmodalStrokes');
const modalMeanings = document.getElementById('kmodalMeanings');
const modalOn = document.getElementById('kmodalOn');
const modalKun = document.getElementById('kmodalKun');
const modalJisho = document.getElementById('kmodalJisho');
const modalClose = document.getElementById('kmodalClose');
const modalSay = document.getElementById('kmodalSay');
const modalTrace = document.getElementById('kmodalTrace');

// KANJIDIC kun'yomi use "." to mark where okurigana starts (た.べる);
// show that boundary as an interpunct instead.
const displayReading = r => r.replace(/\./g, '・');

let currentModalEntry = null;

// Fallback channel for the dictionary hand-off: also stash the query in
// sessionStorage on click, in case the environment drops both the URL hash
// and the query string. dictionary.js reads and clears it.
modalJisho.addEventListener('click', () => {
    if (!currentModalEntry) return;
    try {
        sessionStorage.setItem('learnejp-dict-query', currentModalEntry.c);
    } catch (err) {
        // Storage unavailable — the URL hash still carries the query.
    }
});

// Speaks the kanji's primary reading (first kun'yomi, else first on'yomi).
modalSay.addEventListener('click', () => {
    if (!currentModalEntry) return;
    const primary = (currentModalEntry.kun[0] || currentModalEntry.on[0] || '').replace(/[.\-]/g, '');
    speakJapanese(primary);
});

// Render readings as tappable chips that pronounce themselves. The spoken
// form drops KANJIDIC's okurigana dot and affix hyphens (た.べる → たべる).
function fillReadingChips(container, readings) {
    container.innerHTML = '';
    if (readings.length === 0) {
        container.textContent = '—';
        return;
    }
    readings.forEach(reading => {
        const chip = document.createElement('button');
        chip.type = 'button';
        chip.className = 'say-chip';
        chip.title = 'Play pronunciation';
        chip.textContent = displayReading(reading);
        chip.addEventListener('click', () => speakJapanese(reading.replace(/[.\-]/g, '')));
        container.appendChild(chip);
    });
}

function openKanjiModal(entry) {
    currentModalEntry = entry;
    modalChar.textContent = entry.c;
    modalLevel.textContent = entry.lvl.toUpperCase();
    modalStrokes.textContent = `${entry.s} stroke${entry.s === 1 ? '' : 's'}`;
    modalMeanings.textContent = entry.m.join(', ') || '—';
    fillReadingChips(modalOn, entry.on);
    fillReadingChips(modalKun, entry.kun);
    // Two different pages: the dictionary looks the kanji up, the writing page
    // loads it as a tracing template. Both take the character in a #hash rather
    // than a ?query, because fragments survive file:// setups that drop
    // query strings (see dictionary.js and writing.js).
    modalJisho.href = `dictionary.html#q=${encodeURIComponent(entry.c)}`;
    modalTrace.href = `writing.html#trace=${encodeURIComponent(entry.c)}`;
    modal.classList.remove('hidden');
}

function closeKanjiModal() {
    modal.classList.add('hidden');
    if (speech) speech.cancel();
}

kanjiGrid.addEventListener('click', (e) => {
    const tile = e.target.closest('.kanji-tile');
    if (!tile) return;
    const entry = visibleKanji[parseInt(tile.dataset.i)];
    if (entry) openKanjiModal(entry);
});

modalClose.addEventListener('click', closeKanjiModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeKanjiModal();
});
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeKanjiModal();
});
