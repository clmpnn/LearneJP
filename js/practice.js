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

let practiceData = {};
let currentLevel = 'n5';
let currentMode = 'grammar';
let currentIndex = 0;
let dataLoaded = false;

// ===================== PERFORMANCE TRACKING =====================
// Every answer (in either mode) is recorded per question in localStorage.
// "Performance" selection uses those records: questions you keep missing are
// drawn far more often, unseen ones get promoted, mastered ones mostly rest,
// and the last few shown don't repeat immediately.

const PERF_STORE_KEY = 'learnejp-performance';
const MODE_STORE_KEY = 'learnejp-practice-order';

let perfStats = {};
try {
    perfStats = JSON.parse(localStorage.getItem(PERF_STORE_KEY)) || {};
} catch (err) {
    perfStats = {}; // storage unavailable — tracking is session-only
}

let selectionMode = 'performance';
try {
    const savedMode = localStorage.getItem(MODE_STORE_KEY);
    if (savedMode === 'order' || savedMode === 'performance') selectionMode = savedMode;
} catch (err) { /* keep the default */ }

let perfHistory = [];  // items shown this session (per level+section)
let perfPointer = -1;

function questionHash(str) {
    let h = 5381;
    for (let i = 0; i < str.length; i++) h = ((h << 5) + h + str.charCodeAt(i)) | 0;
    return (h >>> 0).toString(36);
}

// Identity survives adding/deleting other questions: level + section + a hash
// of the question text and its choices.
function statKey(item) {
    return `${currentLevel}|${currentMode}|` +
        questionHash(item.question + '\u00a6' + (item.choices || []).join('\u00a6'));
}

function getStats(item) {
    return perfStats[statKey(item)] || null;
}

function recordAnswer(item, wasCorrect) {
    const key = statKey(item);
    const st = perfStats[key] || (perfStats[key] = { c: 0, w: 0 });
    if (wasCorrect) st.c += 1;
    else st.w += 1;
    st.t = Date.now();
    try {
        localStorage.setItem(PERF_STORE_KEY, JSON.stringify(perfStats));
    } catch (err) { /* not persistable — still counts for this session */ }
}

function pickPerformanceIndex(set) {
    const recent = perfHistory.slice(-4);
    let total = 0;
    const weights = set.map(item => {
        if (set.length > 5 && recent.includes(item)) return 0;
        const st = getStats(item);
        let w;
        if (!st || st.c + st.w === 0) {
            w = 3;                                       // unseen: promote
        } else {
            const errorRate = st.w / (st.c + st.w);
            w = 0.4 + 8 * errorRate;                     // missed often → up to ~8.4
            if (st.c >= 3 && errorRate <= 0.1) w = 0.3;  // mastered: rest it
        }
        total += w;
        return w;
    });
    if (total <= 0) return Math.floor(Math.random() * set.length);
    let r = Math.random() * total;
    for (let i = 0; i < set.length; i++) {
        r -= weights[i];
        if (r <= 0) return i;
    }
    return set.length - 1;
}

function resetPerfSession() {
    perfHistory = [];
    perfPointer = -1;
}

const levelSelect = document.getElementById('levelSelect');
const grammarTab = document.getElementById('grammarTab');
const vocabularyTab = document.getElementById('vocabularyTab');
const kanjiTab = document.getElementById('kanjiTab');
const readingTab = document.getElementById('readingTab');
const listeningTab = document.getElementById('listeningTab');

const grammarSection = document.getElementById('grammarSection');
const vocabularySection = document.getElementById('vocabularySection');
const kanjiSection = document.getElementById('kanjiSection');
const readingSection = document.getElementById('readingSection');
const listeningSection = document.getElementById('listeningSection');

const grammarQuiz = document.getElementById('grammarQuiz');
const vocabularyQuiz = document.getElementById('vocabularyQuiz');
const kanjiQuiz = document.getElementById('kanjiQuiz');
const readingQuiz = document.getElementById('readingQuiz');
const listeningQuiz = document.getElementById('listeningQuiz');

const audioPlayer = document.getElementById('audioPlayer');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const questionCounter = document.getElementById('questionCounter');
const orderModeChip = document.getElementById('orderModeChip');
const perfModeChip = document.getElementById('perfModeChip');
const resetStatsBtn = document.getElementById('resetStatsBtn');

const sectionsByMode = {
    grammar: { section: grammarSection, quiz: grammarQuiz, tab: grammarTab },
    vocabulary: { section: vocabularySection, quiz: vocabularyQuiz, tab: vocabularyTab },
    kanji: { section: kanjiSection, quiz: kanjiQuiz, tab: kanjiTab },
    reading: { section: readingSection, quiz: readingQuiz, tab: readingTab },
    listening: { section: listeningSection, quiz: listeningQuiz, tab: listeningTab }
};

grammarTab.addEventListener('click', () => switchMode('grammar'));
vocabularyTab.addEventListener('click', () => switchMode('vocabulary'));
kanjiTab.addEventListener('click', () => switchMode('kanji'));
readingTab.addEventListener('click', () => switchMode('reading'));
listeningTab.addEventListener('click', () => switchMode('listening'));

function applyModeChips() {
    orderModeChip.classList.toggle('active', selectionMode === 'order');
    perfModeChip.classList.toggle('active', selectionMode === 'performance');
}

function setSelectionMode(mode) {
    selectionMode = mode;
    try { localStorage.setItem(MODE_STORE_KEY, mode); } catch (err) { /* fine */ }
    applyModeChips();
    currentIndex = 0;
    resetPerfSession();
    renderQuestion();
}

orderModeChip.addEventListener('click', () => setSelectionMode('order'));
perfModeChip.addEventListener('click', () => setSelectionMode('performance'));
applyModeChips();

resetStatsBtn.addEventListener('click', () => {
    const sure = confirm('Reset all performance statistics? Your answer history for every level and section will be cleared.');
    if (!sure) return;
    perfStats = {};
    try { localStorage.removeItem(PERF_STORE_KEY); } catch (err) { /* fine */ }
    resetPerfSession();
    renderQuestion();
});

// HOW QUESTION DATA IS LOADED
// ---------------------------
// The question sets live in js/practice-data.js, which practice.html loads
// with an ordinary <script> tag *before* this file. That script assigns the
// whole data object to window.PRACTICE_DATA. Because no fetch() is involved,
// it works even when practice.html is opened straight from disk (file://),
// where browsers block fetch() of local files — which is the usual reason
// the questions silently never appear.
//
// The old fetch() paths are kept only as a fallback in case practice-data.js
// is ever missing and the site is being served over http:// instead.
const DATA_PATHS = ['../practice-data.json', '../data/practice-data.json'];

showLoadingState();
loadPracticeData();

async function loadPracticeData() {
    // Preferred source: js/practice-data.js (no fetch, works everywhere).
    if (typeof window.PRACTICE_DATA === 'object' && window.PRACTICE_DATA !== null) {
        practiceData = window.PRACTICE_DATA;
        dataLoaded = true;
        renderQuestion();
        applyPracticeHash();
        return;
    }

    // Fallback: fetch the raw JSON (only works over http://, not file://).
    let lastError = new Error(
        'window.PRACTICE_DATA is not defined — check that practice.html loads ' +
        'js/practice-data.js in a <script> tag just above the one for js/practice.js.'
    );

    for (const path of DATA_PATHS) {
        try {
            const res = await fetch(path);
            if (!res.ok) {
                lastError = new Error(`Server responded ${res.status} ${res.statusText} for ${path}`);
                continue;
            }
            practiceData = await res.json();
            dataLoaded = true;
            renderQuestion();
            applyPracticeHash();
            return;
        } catch (err) {
            lastError = err;
        }
    }

    console.error('Could not load practice data:', lastError);
    showLoadError(lastError);
}

function showLoadingState() {
    Object.values(sectionsByMode).forEach(refs => {
        refs.quiz.innerHTML = '<p class="no-results">Loading questions…</p>';
    });
    questionCounter.textContent = '';
}

function showLoadError(err) {
    const detail = err?.message || 'Unknown error';
    const message = `<p class="no-results">
        Couldn't load the practice questions (${detail}).<br><br>
        The questions are loaded from <code>js/practice-data.js</code> via a
        <code>&lt;script&gt;</code> tag in practice.html, placed just above the tag for
        practice.js. Make sure that file exists in your <code>js/</code> folder and that
        the script tag is present.<br><br>
        (Fetching the raw <code>practice-data.json</code> is only a fallback, and it
        requires the site to be served through a local server — e.g.
        <code>npx serve</code> or <code>python3 -m http.server</code> — because browsers
        block <code>fetch()</code> on file:// pages.)
    </p>`;

    Object.values(sectionsByMode).forEach(refs => {
        refs.quiz.innerHTML = message;
    });
    questionCounter.textContent = '';
}

// The learn page links straight at one quiz, and sometimes at one level:
// #vocabulary, or #kanji=n4.
function applyPracticeHash() {
    const raw = (location.hash || '').replace(/^#/, '');
    if (!raw) return;

    const [mode, level] = raw.split('=');
    if (level && practiceData[level]) {
        currentLevel = level;
        levelSelect.value = level;
    }
    if (sectionsByMode[mode]) switchMode(mode);
    else { currentIndex = 0; resetPerfSession(); renderQuestion(); }
}
window.addEventListener('hashchange', applyPracticeHash);

levelSelect.addEventListener('change', (e) => {
    currentLevel = e.target.value;
    currentIndex = 0;
    resetPerfSession();
    renderQuestion();
});

function switchMode(mode) {
    currentMode = mode;
    currentIndex = 0;
    resetPerfSession();

    Object.entries(sectionsByMode).forEach(([key, refs]) => {
        refs.tab.classList.toggle('active', key === mode);
        refs.section.classList.toggle('hidden', key !== mode);
    });

    renderQuestion();
}

function getCurrentSet() {
    return practiceData[currentLevel]?.[currentMode] || [];
}

function shuffleChoices(item) {
    const indexed = item.choices.map((choice, i) => ({ choice, isCorrect: i === item.answer }));

    for (let i = indexed.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indexed[i], indexed[j]] = [indexed[j], indexed[i]];
    }

    const shuffledChoices = indexed.map(entry => entry.choice);
    const newAnswerIndex = indexed.findIndex(entry => entry.isCorrect);

    return { shuffledChoices, newAnswerIndex };
}

function renderQuestion() {
    if (!dataLoaded) return;

    // Wipe every quiz container first. Previously, hidden tabs kept their old
    // question HTML, so the page ended up with several elements sharing the
    // ids "feedback" and "deleteQuestionBtn". document.getElementById() then
    // returned the *hidden* tab's copy, which silently broke answer feedback
    // and the delete button on every tab after the first one you visited.
    Object.values(sectionsByMode).forEach(refs => {
        refs.quiz.innerHTML = '';
    });

    const set = getCurrentSet();
    const container = sectionsByMode[currentMode].quiz;

    if (set.length === 0) {
        container.innerHTML = '<p class="no-results">No questions available for this level yet.</p>';
        questionCounter.textContent = '';
        return;
    }

    let item;
    if (selectionMode === 'performance') {
        // Drop history entries whose question has been deleted meanwhile.
        perfHistory = perfHistory.filter(h => set.includes(h));
        if (perfPointer > perfHistory.length) perfPointer = perfHistory.length;
        if (perfPointer < 0) perfPointer = 0;
        if (perfPointer >= perfHistory.length) {
            // Stepped past the end of history → draw a fresh weighted pick.
            perfHistory.push(set[pickPerformanceIndex(set)]);
            perfPointer = perfHistory.length - 1;
        }
        item = perfHistory[perfPointer];
    } else {
        if (currentIndex >= set.length) currentIndex = set.length - 1;
        if (currentIndex < 0) currentIndex = 0;
        item = set[currentIndex];
    }
    const { shuffledChoices, newAnswerIndex } = shuffleChoices(item);

    let html = '';

    if (currentMode === 'reading' && item.passage) {
        html += `<p class="passage">${item.passage}</p>`;
    }

    if (currentMode === 'listening' && item.audio) {
        // The clips are the bulk of this repository, and GitHub Pages re-uploads
        // the whole site on every deploy. Setting window.AUDIO_BASE (see
        // html/practice.html) points them at a host outside the Pages artifact
        // without touching the data file. Unset, it behaves exactly as before.
        audioPlayer.src = window.AUDIO_BASE
            ? window.AUDIO_BASE.replace(/\/$/, '') + item.audio.replace(/^\.\./, '')
            : item.audio;
        audioPlayer.load();
    }

    if (currentMode === 'listening' && item.image) {
        html += `<img class="listening-image" loading="lazy" decoding="async" src="${item.image}" alt="Listening question image" onerror="this.style.display='none';">`;
    }

    html += `<p class="question-text">${item.question}</p>`;
    html += '<div class="choices">';
    shuffledChoices.forEach((choice, i) => {
        html += `<button class="choice-btn" data-index="${i}">${choice}</button>`;
    });
    html += '</div>';
    html += '<div class="feedback"></div>';
    html += '<button id="deleteQuestionBtn">Delete This Question</button>';

    container.innerHTML = html;
    updateQuestionCounter(item, set);

    // Query inside the active container only — never via document.getElementById —
    // so we always talk to the visible question's elements.
    const feedbackEl = container.querySelector('.feedback');

    container.querySelectorAll('.choice-btn').forEach(btn => {
        btn.addEventListener('click', () => checkAnswer(btn, newAnswerIndex, feedbackEl, item));
    });

    container.querySelector('#deleteQuestionBtn').addEventListener('click', () => {
        deleteCurrentQuestion();
    });
}

function updateQuestionCounter(item, set) {
    if (selectionMode === 'performance') {
        const st = getStats(item);
        if (!st || st.c + st.w === 0) {
            questionCounter.textContent = 'New question';
        } else {
            const seen = st.c + st.w;
            const pct = Math.round((100 * st.c) / seen);
            questionCounter.textContent = `Seen ${seen}\u00d7 \u00b7 ${pct}% correct`;
        }
    } else {
        questionCounter.textContent = `Question ${currentIndex + 1} of ${set.length}`;
    }
}

function checkAnswer(btn, correctIndex, feedback, item) {
    const chosen = parseInt(btn.dataset.index);
    const allBtns = btn.parentElement.querySelectorAll('.choice-btn');

    allBtns.forEach(b => b.disabled = true);

    recordAnswer(item, chosen === correctIndex);
    updateQuestionCounter(item, getCurrentSet());

    if (chosen === correctIndex) {
        btn.classList.add('correct');
        feedback.textContent = 'Correct!';
        feedback.className = 'feedback correct-text';
    } else {
        btn.classList.add('incorrect');
        allBtns[correctIndex].classList.add('correct');
        feedback.textContent = 'Incorrect. The correct answer is highlighted.';
        feedback.className = 'feedback incorrect-text';
    }
}

function deleteCurrentQuestion() {
    const set = getCurrentSet();
    if (set.length === 0) return;

    const shown = selectionMode === 'performance' && perfHistory[perfPointer]
        ? perfHistory[perfPointer]
        : set[currentIndex];
    const removeIndex = set.indexOf(shown);
    if (removeIndex === -1) return;

    const confirmed = confirm(`Delete this ${currentMode} question? This cannot be undone until you replace js/practice-data.js with the freshly downloaded copy.`);
    if (!confirmed) return;

    set.splice(removeIndex, 1);

    if (currentIndex >= set.length) currentIndex = set.length - 1;
    if (currentIndex < 0) currentIndex = 0;

    renderQuestion();
    downloadUpdatedData();
}

function downloadUpdatedData() {
    const jsonStr = JSON.stringify(practiceData, null, 2);
    const fileContents =
        '// LearneJP practice questions — generated file.\n' +
        '// Move this into your js/ folder, replacing the old practice-data.js.\n' +
        `window.PRACTICE_DATA = ${jsonStr};\n`;
    const blob = new Blob([fileContents], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'practice-data.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

prevBtn.addEventListener('click', () => {
    const set = getCurrentSet();
    if (set.length === 0) return;
    if (selectionMode === 'performance') {
        if (perfPointer > 0) {
            perfPointer -= 1;
            renderQuestion();
        }
        return;
    }
    currentIndex = (currentIndex - 1 + set.length) % set.length;
    renderQuestion();
});

nextBtn.addEventListener('click', () => {
    const set = getCurrentSet();
    if (set.length === 0) return;
    if (selectionMode === 'performance') {
        perfPointer += 1; // beyond history → renderQuestion draws a fresh pick
        renderQuestion();
        return;
    }
    currentIndex = (currentIndex + 1) % set.length;
    renderQuestion();
});
