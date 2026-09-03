// LearneJP — a Japanese (JLPT) study app for writing practice, quizzes, and dictionary lookup
// Copyright (C) 2026  Claudia Mithesa Peranginangin
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version. See <https://www.gnu.org/licenses/>.
//
// Contact: clmpnn@gmail.com · https://github.com/clmpnn


// The path from nothing to a first sentence.
//
// Every other page here is a tool, and a tool assumes you already know what you
// came for. Someone starting from zero doesn't: they need an order, and they
// need the explanation that makes the order make sense. So this page pairs the
// two — lessons from js/learn-course.js that teach the idea, and steps that
// deep-link into the page which already does that job. Nothing here duplicates
// a tool; it says what to use when, explains why, and remembers how far you got.

(function () {
    'use strict';

    const STORE_KEY = 'learnejp-path-progress';
    const STAGES = Array.isArray(window.LEARN_COURSE) ? window.LEARN_COURSE : [];

    // ---------- progress ----------

    let done = {};

    function load() {
        try {
            done = JSON.parse(localStorage.getItem(STORE_KEY)) || {};
        } catch (err) {
            done = {};
        }
    }

    function save() {
        try {
            localStorage.setItem(STORE_KEY, JSON.stringify(done));
        } catch (err) {
            // Private browsing, or storage full. The page still works; the ticks
            // just won't survive a reload.
        }
    }

    function key(stageIndex, stepIndex) {
        return STAGES[stageIndex].id + ':' + stepIndex;
    }

    function totalSteps() {
        return STAGES.reduce(function (sum, stage) { return sum + stage.steps.length; }, 0);
    }

    function doneCount() {
        return Object.keys(done).filter(function (id) { return done[id]; }).length;
    }

    function stageDone(stage, index) {
        return stage.steps.filter(function (step, i) { return done[key(index, i)]; }).length;
    }

    // ---------- rendering ----------

    function esc(text) {
        return String(text).replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
    }

    // Every Japanese word on the page carries its romaji above it, the way a
    // textbook puts furigana over kanji — <ruby> is the element for exactly
    // this, so it stays inline, wraps properly and reads correctly aloud.
    //
    // The readings come from js/learn-romaji.js rather than being worked out
    // live, because working them out needs the 2.4 MB dictionary and this page
    // has no other use for it. Regenerate with tools/build-romaji.js after
    // editing the course; anything without an entry simply shows unannotated.
    const JP_RUN = /[\u3005\u3040-\u30fa\u30fc-\u30ff\u4e00-\u9fff\u3400-\u4dbf]+/g;
    const READINGS = window.LEARN_ROMAJI || {};

    function rubyRun(run) {
        const pairs = READINGS[run];
        if (!pairs) return esc(run);
        return '<ruby>' + pairs.map(function (pair) {
            return esc(pair[0]) + '<rt>' + esc(pair[1] || '') + '</rt>';
        }).join('') + '</ruby>';
    }

    // Use for anything a reader sees. Attributes keep plain esc().
    function ruby(text) {
        const source = String(text == null ? '' : text);
        let out = '';
        let last = 0;
        let match;

        JP_RUN.lastIndex = 0;
        while ((match = JP_RUN.exec(source)) !== null) {
            out += esc(source.slice(last, match.index)) + rubyRun(match[0]);
            last = match.index + match[0].length;
        }
        return out + esc(source.slice(last));
    }

    function renderTable(table) {
        const head = '<tr>' + table.head.map(function (cell) {
            return '<th>' + ruby(cell) + '</th>';
        }).join('') + '</tr>';

        const rows = table.rows.map(function (row) {
            return '<tr>' + row.map(function (cell, i) {
                const tag = i === 0 ? 'th' : 'td';
                return '<' + tag + '>' + ruby(cell) + '</' + tag + '>';
            }).join('') + '</tr>';
        }).join('');

        return '<div class="learn-table-wrap"><table class="learn-table">' +
            '<thead>' + head + '</thead><tbody>' + rows + '</tbody></table></div>';
    }

    // Every example is one tap from the tool that takes it apart, which is the
    // point of teaching inside the same site as the dictionary.
    function renderExamples(examples) {
        return '<ul class="learn-examples">' + examples.map(function (ex) {
            return '<li class="learn-example">' +
                '<div class="learn-ex-head">' +
                    '<span class="learn-ex-jp">' + ruby(ex.jp) + '</span>' +
                    '<span class="learn-ex-en">' + ruby(ex.en) + '</span>' +
                '</div>' +
                (ex.note ? '<p class="learn-ex-note">' + ruby(ex.note) + '</p>' : '') +
                // #s= opens the Sentence tab with this pasted in. #q= would
                // hand a whole sentence to the word search, which finds nothing.
                '<a class="learn-ex-go" href="dictionary.html#s=' +
                    encodeURIComponent(ex.jp) + '">Break it down →</a>' +
            '</li>';
        }).join('') + '</ul>';
    }

    function renderLesson(lesson) {
        const body = lesson.body.map(function (para) {
            return '<p>' + ruby(para) + '</p>';
        }).join('');

        return '<details class="learn-lesson">' +
            '<summary><span class="learn-lesson-title">' + ruby(lesson.title) + '</span></summary>' +
            '<div class="learn-lesson-body">' +
                body +
                (lesson.table ? renderTable(lesson.table) : '') +
                (lesson.examples ? renderExamples(lesson.examples) : '') +
                (lesson.check
                    ? '<details class="learn-check">' +
                        '<summary>' + ruby(lesson.check.q) + '</summary>' +
                        '<p>' + ruby(lesson.check.a) + '</p>' +
                      '</details>'
                    : '') +
            '</div>' +
        '</details>';
    }

    function renderStage(stage, index) {
        const complete = stageDone(stage, index);
        const total = stage.steps.length;
        const lessons = stage.lessons || [];

        const steps = stage.steps.map(function (step, i) {
            const id = key(index, i);
            const ticked = !!done[id];
            return '<li class="learn-step' + (ticked ? ' is-done' : '') + '">' +
                '<label class="learn-tick">' +
                    '<input type="checkbox" data-step="' + esc(id) + '"' +
                        (ticked ? ' checked' : '') + '>' +
                    '<span class="learn-step-text">' + ruby(step.text) + '</span>' +
                '</label>' +
                '<a class="learn-go" href="' + esc(step.href) + '">' + ruby(step.label) + ' →</a>' +
            '</li>';
        }).join('');

        return '<li class="learn-stage' + (complete === total ? ' is-complete' : '') +
            '" id="stage-' + esc(stage.id) + '">' +
            '<div class="learn-stage-head">' +
                '<span class="learn-stage-no">' + (index + 1) + '</span>' +
                '<div class="learn-stage-titles">' +
                    '<h3>' + ruby(stage.title) + '</h3>' +
                    '<p class="learn-stage-aim">' + ruby(stage.aim) + '</p>' +
                '</div>' +
                '<span class="learn-stage-count">' + complete + '/' + total + '</span>' +
            '</div>' +
            '<p class="learn-stage-body">' + ruby(stage.body) + '</p>' +
            (lessons.length
                ? '<div class="learn-lessons">' +
                    '<p class="learn-lessons-label">Understand first — ' + lessons.length +
                        (lessons.length === 1 ? ' lesson' : ' lessons') + '</p>' +
                    lessons.map(renderLesson).join('') +
                  '</div>'
                : '') +
            '<p class="learn-steps-label">Then do</p>' +
            '<ul class="learn-steps">' + steps + '</ul>' +
        '</li>';
    }

    // Twelve stages is a lot to scroll past to reach the one you wanted.
    function renderContents() {
        const host = document.getElementById('learnContents');
        if (!host) return;
        host.innerHTML = STAGES.map(function (stage, i) {
            return '<a class="learn-jump" href="#stage-' + esc(stage.id) + '">' +
                '<span class="learn-jump-no">' + (i + 1) + '</span>' + ruby(stage.title) + '</a>';
        }).join('');
    }

    function renderProgress() {
        const total = totalSteps();
        const complete = doneCount();
        const bar = document.getElementById('learnBar');
        const count = document.getElementById('learnCount');

        if (bar) bar.style.width = total ? Math.round((complete / total) * 100) + '%' : '0%';
        if (count) {
            count.textContent = total && complete === total
                ? 'All ' + total + ' done — the tools are yours now'
                : complete + ' of ' + total + ' done';
        }
    }

    function render() {
        const host = document.getElementById('learnStages');
        if (!host) return;

        if (!STAGES.length) {
            host.innerHTML = '<li class="learn-stage"><p class="learn-stage-body">The course did not ' +
                'load. Check that learn.html has a &lt;script&gt; tag for js/learn-course.js just above ' +
                'the one for js/learn.js.</p></li>';
            return;
        }

        host.innerHTML = STAGES.map(renderStage).join('');
        renderContents();
        renderProgress();
    }

    // ---------- wiring ----------

    function init() {
        const host = document.getElementById('learnStages');
        if (!host) return;

        load();
        render();

        // Re-rendering on every tick would slam every open lesson shut, so the
        // ticked step is updated in place and only the counts are redrawn.
        host.addEventListener('change', function (event) {
            const box = event.target.closest('input[data-step]');
            if (!box) return;

            done[box.dataset.step] = box.checked;
            save();

            const step = box.closest('.learn-step');
            if (step) step.classList.toggle('is-done', box.checked);

            const stage = box.closest('.learn-stage');
            const index = stage ? Array.prototype.indexOf.call(host.children, stage) : -1;
            if (index >= 0 && STAGES[index]) {
                const complete = stageDone(STAGES[index], index);
                const counter = stage.querySelector('.learn-stage-count');
                if (counter) counter.textContent = complete + '/' + STAGES[index].steps.length;
                stage.classList.toggle('is-complete', complete === STAGES[index].steps.length);
            }

            renderProgress();
        });

        // Romaji on by default; someone reading comfortably can turn it off, and
        // the choice sticks. Rendered either way and hidden in CSS, so toggling
        // costs nothing and never re-renders the page.
        const romajiBox = document.getElementById('learnRomaji');
        if (romajiBox) {
            let showRomaji = true;
            try {
                showRomaji = localStorage.getItem('learnejp-romaji') !== 'off';
            } catch (err) {
                showRomaji = true;
            }

            function applyRomaji() {
                romajiBox.checked = showRomaji;
                document.body.classList.toggle('no-romaji', !showRomaji);
            }

            romajiBox.addEventListener('change', function () {
                showRomaji = romajiBox.checked;
                try {
                    localStorage.setItem('learnejp-romaji', showRomaji ? 'on' : 'off');
                } catch (err) {
                    // Storage unavailable; the toggle still works for this visit.
                }
                applyRomaji();
            });
            applyRomaji();
        }

        const reset = document.getElementById('learnReset');
        if (reset) {
            reset.addEventListener('click', function () {
                if (!doneCount()) return;
                if (!confirm('Clear every tick and start the path again?')) return;
                done = {};
                save();
                render();
            });
        }
    }

    if (typeof document !== 'undefined' && document.getElementById) init();

    // Exposed so the path can be checked against the pages it links to.
    window.LearnPath = { stages: STAGES };
})();
