// Builds js/learn-romaji.js — the romaji for every Japanese run in the course.
//
// The learn page has no dictionary of its own and should not gain one: loading
// 2.4 MB of JMdict so a page of prose can show readings would cost more than
// the feature is worth. So the readings are worked out once, here, using the
// same segmenter the Sentence tab uses, and shipped as a lookup table.
//
// Run this after editing js/learn-course.js:
//     node tools/build-romaji.js
//
// Anything it cannot read is reported at the end rather than silently skipped.

const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

// --- a DOM stub, just enough for dictionary.js and sentence.js to load ---
class CL { constructor() { this.s = new Set(); } add(c) { this.s.add(c); } remove(c) { this.s.delete(c); } contains(c) { return this.s.has(c); } toggle(c, o) { o ? this.add(c) : this.remove(c); } }
class El {
    constructor() {
        this.classList = new CL(); this.innerHTML = ''; this.textContent = ''; this.value = '';
        this.href = ''; this.hidden = false; this.dataset = {}; this.children = []; this.l = {};
        this.style = { setProperty() {}, removeProperty() {} };
    }
    getBoundingClientRect() { return { height: 0 }; }
    addEventListener(t, f) { (this.l[t] = this.l[t] || []).push(f); }
    dispatchEvent() { return true; }
    setAttribute() {} appendChild(c) { this.children.push(c); return c; }
    remove() {} querySelectorAll() { return []; } closest() { return null; }
    focus() {} scrollIntoView() {}
}
global.window = { addEventListener() {}, location: { hash: '', search: '' }, matchMedia: () => ({ matches: false }) };
global.sessionStorage = { getItem() { return null; }, removeItem() {} };
global.performance = { now: () => Date.now() };
global.CustomEvent = class { constructor(t) { this.type = t; } };
global.Event = class { constructor(t) { this.type = t; } };
global.document = {
    getElementById: () => new El(), createElement: () => new El(),
    listeners: {}, addEventListener() {}, dispatchEvent() {}
};

require(path.join(ROOT, 'js/dictionary-data.js'));
require(path.join(ROOT, 'js/dictionary.js'));
require(path.join(ROOT, 'js/sentence.js'));
require(path.join(ROOT, 'js/learn-course.js'));
require(path.join(ROOT, 'js/kanji-data.js'));

const analyze = window.SentenceLookup.analyze;
const COURSE = window.LEARN_COURSE;

// Runs of Japanese, matching what learn.js will look for at render time.
const JP_RUN = /[\u3005\u3040-\u30fa\u30fc-\u30ff\u4e00-\u9fff\u3400-\u4dbf]+/g;

// Every string in the course that a reader will see.
function* texts() {
    for (const stage of COURSE) {
        yield stage.title; yield stage.aim; yield stage.body;
        for (const lesson of stage.lessons || []) {
            yield lesson.title;
            for (const p of lesson.body) yield p;
            if (lesson.table) {
                for (const h of lesson.table.head) yield h;
                for (const row of lesson.table.rows) for (const cell of row) yield cell;
            }
            for (const ex of lesson.examples || []) {
                yield ex.jp; yield ex.en; if (ex.note) yield ex.note;
            }
            if (lesson.check) { yield lesson.check.q; yield lesson.check.a; }
        }
        for (const step of stage.steps) { yield step.text; yield step.label; }
    }
}

const runs = new Set();
for (const text of texts()) {
    if (!text) continue;
    for (const m of String(text).matchAll(JP_RUN)) runs.add(m[0]);
}

// Word-level pairs rather than one reading for the whole run, so the ruby sits
// over the word it belongs to instead of stretching across a sentence.
// A short list the dictionary cannot reach: four-character idioms, classical
// forms and archaic pronouns that appear in the later stages. Each is here
// because it is genuinely absent from a common-words dictionary, not because
// the segmenter got it wrong.
const MANUAL = {
    '温故知新': [['温故知新', 'onko chishin']],
    '見ざる聞かざる言わざる': [['見ざる', 'mizaru'], ['聞かざる', 'kikazaru'], ['言わざる', 'iwazaru']],
    '見ざる聞かざる': [['見ざる', 'mizaru'], ['聞かざる', 'kikazaru']],
    '汝': [['汝', 'nanji']]
};

const table = {};
const unreadable = [];
let words = 0;

// Kana already say how they are pronounced, so a token the dictionary does not
// recognise can still be read if it is written in kana — which covers the kana
// charts, the katakana combinations, and every stray particle quoted alone.
const ALL_KANA = /^[\u3040-\u30ff\u30fc]+$/;

function kanaRomaji(text) {
    if (!ALL_KANA.test(text)) return '';
    try {
        return window.LearneJPDict.toMora(text).map(u => u.romaji).join('');
    } catch (err) {
        return '';
    }
}

// A character quoted on its own — in a radical table, or a stroke-order
// example — is not a dictionary word, so the segmenter has nothing to offer.
// The kanji chart does: prefer a kun reading that stands as a whole word
// (山 is yama), and fall back to the on reading used to cite the character.
const KANJI = new Map();
for (const level of Object.values(window.KANJI_DATA || {})) {
    for (const entry of level) if (!KANJI.has(entry.c)) KANJI.set(entry.c, entry);
}

function kanjiRomaji(text) {
    if (text.length !== 1) return '';
    const entry = KANJI.get(text);
    if (!entry) return '';
    const wholeWordKun = (entry.kun || []).find(r => !/[.\-]/.test(r));
    const reading = wholeWordKun || (entry.on || [])[0] || (entry.kun || [])[0];
    return reading ? kanaRomaji(reading.replace(/[.\-]/g, '')) : '';
}

for (const run of runs) {
    if (MANUAL[run]) {
        table[run] = MANUAL[run];
        words += MANUAL[run].length;
        continue;
    }

    const pairs = [];
    let missing = false;
    for (const token of analyze(run)) {
        let romaji = token.kind === 'word' ? token.romaji : '';
        if (!romaji) romaji = kanaRomaji(token.surface) || kanjiRomaji(token.surface);
        if (romaji) words++;
        else if (token.kind === 'unknown' || token.kind === 'word') missing = true;
        pairs.push([token.surface, romaji]);
    }
    // A kana run the segmenter split badly reads better whole: きゃ is one
    // sound, not き followed by a small ゃ with no reading of its own.
    if (missing && ALL_KANA.test(run)) {
        const whole = kanaRomaji(run);
        if (whole) {
            table[run] = [[run, whole]];
            words++;
            continue;
        }
    }

    table[run] = pairs;
    if (missing) unreadable.push(run);
}

const out = `// LearneJP — generated by tools/build-romaji.js. Do not edit by hand.
//
// Readings for every Japanese run in js/learn-course.js, worked out with the
// same segmenter the Sentence tab uses. Each entry is a list of [word, romaji]
// pairs so the ruby text sits over the word it belongs to. Regenerate after
// editing the course:  node tools/build-romaji.js

window.LEARN_ROMAJI = ${JSON.stringify(table)};
`;

fs.writeFileSync(path.join(ROOT, 'js/learn-romaji.js'), out);

console.log(`${runs.size} Japanese runs, ${words} words`);
console.log(`js/learn-romaji.js written — ${(out.length / 1024).toFixed(0)} KB`);
if (unreadable.length) {
    console.log(`\n${unreadable.length} runs contain something the dictionary could not read:`);
    unreadable.slice(0, 40).forEach(r => console.log('  ' + r));
    if (unreadable.length > 40) console.log(`  …and ${unreadable.length - 40} more`);
}
