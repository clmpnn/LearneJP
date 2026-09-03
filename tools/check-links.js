// Verify every entry in js/learn-links.js still points at a real lesson.
//
// The course gets restructured often, and a link to a lesson index that has
// shifted is worse than no link: it lands the reader somewhere confidently
// wrong. This is run by the test suite for that reason.

const path = require('path');
const ROOT = path.join(__dirname, '..');

global.window = {};
require(path.join(ROOT, 'js/learn-course.js'));
require(path.join(ROOT, 'js/learn-links.js'));

const COURSE = window.LEARN_COURSE;
const LINKS = window.LEARN_LINKS;

function resolve(target) {
    const [stageId, index] = target.split(':');
    const stage = COURSE.filter(s => s.id === stageId)[0];
    if (!stage) return null;
    const lesson = stage.lessons[Number(index)];
    return lesson ? { stage, lesson } : null;
}

const broken = [];
let total = 0;

for (const group of ['reasons', 'particles']) {
    for (const [key, target] of Object.entries(LINKS[group])) {
        total++;
        const found = resolve(target);
        if (!found) broken.push(`${group}.${key} → ${target}`);
        else if (process.argv.includes('--list')) {
            console.log(`${key.padEnd(20)} → ${found.stage.title} · ${found.lesson.title}`);
        }
    }
}

console.log(`\n${total} links, ${broken.length} broken`);
broken.forEach(b => console.log('  ' + b));
process.exitCode = broken.length ? 1 : 0;
