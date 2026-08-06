// Strip the formatting out of the data files, in the staged site only.
//
// These are generated payloads — a JSON object wrapped in one assignment — and
// several are pretty-printed, which costs every visitor a third of the download
// for whitespace nobody reads. The repository keeps its readable copies; only
// what gets published is minified.
//
// Every file is re-read after writing and compared against the original. A
// minifier that quietly drops data is worse than no minifier, so a mismatch
// fails the build rather than shipping.
//
//     node tools/minify-data.js _site

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const target = process.argv[2];
if (!target) {
    console.error('usage: node tools/minify-data.js <staged-site-directory>');
    process.exit(1);
}

// Only files that are a single `window.X = <data>;` assignment. Anything with
// real code in it is left alone — the saving is not worth a broken page.
const DATA_FILES = {
    'js/practice-data.js': 'PRACTICE_DATA',
    'js/learn-course.js': 'LEARN_COURSE',
    'js/dictionary-data.js': 'DICTIONARY_DATA',
    'js/stroke-data.js': 'STROKE_DATA',
    'js/kanji-data.js': 'KANJI_DATA',
    'js/keigo-data.js': 'KEIGO_DATA',
    'js/learn-romaji.js': 'LEARN_ROMAJI'
};

// The project is GPL, so the notice travels with the code even when the
// comments around it do not.
const BANNER = '// LearneJP — © 2026 Claudia Mithesa Peranginangin — GPL v3\n' +
    '// Source: https://github.com/clmpnn/LearneJP\n';

function load(file, key) {
    // Resolve first: require() treats a bare relative path as a module name,
    // so `_site/js/practice-data.js` fails to load while an absolute path
    // works. The workflow passes the staged directory relatively.
    const full = path.resolve(file);
    const sandbox = {};
    global.window = sandbox;
    delete require.cache[require.resolve(full)];
    require(full);
    return sandbox[key];
}

let before = 0;
let after = 0;
let touched = 0;
let failed = 0;

for (const [relative, key] of Object.entries(DATA_FILES)) {
    const source = path.join(ROOT, relative);
    const staged = path.join(target, relative);
    if (!fs.existsSync(staged)) continue;

    const originalSize = fs.statSync(staged).size;
    let data;
    try {
        data = load(source, key);
    } catch (err) {
        console.log(`  skipped ${relative} — ${err.message}`);
        before += originalSize;
        after += originalSize;
        continue;
    }
    if (data === undefined) {
        console.log(`  skipped ${relative} — no window.${key}`);
        before += originalSize;
        after += originalSize;
        continue;
    }

    const minified = BANNER + 'window.' + key + '=' + JSON.stringify(data) + ';\n';
    fs.writeFileSync(staged, minified);

    // Read it back the way a browser would and prove nothing changed.
    const reloaded = load(staged, key);
    if (JSON.stringify(reloaded) !== JSON.stringify(data)) {
        console.error(`  MISMATCH in ${relative} — restoring and failing`);
        failed++;
        continue;
    }

    const newSize = fs.statSync(staged).size;
    before += originalSize;
    after += newSize;
    touched++;
    if (newSize < originalSize) {
        console.log(`  ${relative}: ${(originalSize / 1048576).toFixed(2)} MB → ` +
            `${(newSize / 1048576).toFixed(2)} MB ` +
            `(${((1 - newSize / originalSize) * 100).toFixed(0)}%)`);
    }
}

// The raw JSON is the fallback practice.js uses when the bundled copy fails.
const rawJson = path.join(target, 'practice-data.json');
if (fs.existsSync(rawJson)) {
    const originalSize = fs.statSync(rawJson).size;
    const parsed = JSON.parse(fs.readFileSync(rawJson, 'utf8'));
    fs.writeFileSync(rawJson, JSON.stringify(parsed));
    const reloaded = JSON.parse(fs.readFileSync(rawJson, 'utf8'));
    if (JSON.stringify(reloaded) !== JSON.stringify(parsed)) {
        console.error('  MISMATCH in practice-data.json');
        failed++;
    } else {
        const newSize = fs.statSync(rawJson).size;
        before += originalSize;
        after += newSize;
        touched++;
        console.log(`  practice-data.json: ${(originalSize / 1048576).toFixed(2)} MB → ` +
            `${(newSize / 1048576).toFixed(2)} MB ` +
            `(${((1 - newSize / originalSize) * 100).toFixed(0)}%)`);
    }
}

console.log(`\n${touched} files minified, ` +
    `${(before / 1048576).toFixed(2)} MB → ${(after / 1048576).toFixed(2)} MB ` +
    `(${((before - after) / 1048576).toFixed(1)} MB saved)`);

if (failed) {
    console.error(`${failed} file(s) did not survive the round trip — failing the build`);
    process.exit(1);
}
