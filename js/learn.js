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

    // Where a question lives, for the schedule. Prefixed so it can never be
    // confused with a step id, which lives in a different store entirely.
    function checkIdFor(stageId, lessonIndex) {
        return 'q:' + stageId + ':' + lessonIndex;
    }

    function rateState(id) {
        const review = window.LearnReview;
        if (!review) return '';
        const box = review.boxOf(id);
        if (box === null) return '';
        if (box === 0) return 'back today';
        if (box >= review.intervals.length) return 'known';
        return 'again in ' + review.intervals[box - 1] +
            (review.intervals[box - 1] === 1 ? ' day' : ' days');
    }

    function renderLesson(lesson, checkId) {
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
                    ? '<details class="learn-check" data-check="' + esc(checkId) + '">' +
                        '<summary>' + ruby(lesson.check.q) + '</summary>' +
                        '<p>' + ruby(lesson.check.a) + '</p>' +
                        // Answering is only half of it. Rating what you knew is
                        // what puts the question into the schedule, so it comes
                        // back on a day when you have started to forget it.
                        '<div class="learn-rate">' +
                            '<button type="button" class="learn-rate-btn" data-rate="0">Not yet</button>' +
                            '<button type="button" class="learn-rate-btn is-yes" data-rate="1">Got it</button>' +
                            '<span class="learn-rate-state">' + rateState(checkId) + '</span>' +
                        '</div>' +
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

        const tier = window.LearnReview ? window.LearnReview.tierOf(stage.id) : 'core';

        return '<li class="learn-stage' + (complete === total ? ' is-complete' : '') +
            '" id="stage-' + esc(stage.id) + '" data-tier="' + esc(tier) + '">' +
            '<div class="learn-stage-head">' +
                '<span class="learn-stage-no">' + (index + 1) + '</span>' +
                '<div class="learn-stage-titles">' +
                    '<h3>' + ruby(stage.title) + '</h3>' +
                    '<p class="learn-stage-aim">' + ruby(stage.aim) + '</p>' +
                    '<span class="learn-tier learn-tier-' + esc(tier) + '">' + tier + '</span>' +
                '</div>' +
                '<span class="learn-stage-count">' + complete + '/' + total + '</span>' +
            '</div>' +
            '<p class="learn-stage-body">' + ruby(stage.body) + '</p>' +
            (lessons.length
                ? '<div class="learn-lessons">' +
                    '<p class="learn-lessons-label">Understand first — ' + lessons.length +
                        (lessons.length === 1 ? ' lesson' : ' lessons') + '</p>' +
                    lessons.map(function (lesson, i) {
                        return renderLesson(lesson, checkIdFor(stage.id, i));
                    }).join('') +
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
            const tier = window.LearnReview ? window.LearnReview.tierOf(stage.id) : 'core';
            return '<a class="learn-jump" data-tier="' + esc(tier) +
                '" href="#stage-' + esc(stage.id) + '">' +
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
        renderReview();
    }

    // ---------- review ----------
    //
    // The session is the point of the whole file. Everything above renders
    // things to read; this asks you to produce an answer before showing you
    // one, on a day chosen because you are starting to forget.

    function questionFor(id) {
        const parts = id.split(':');
        const stage = STAGES.filter(function (s) { return s.id === parts[1]; })[0];
        if (!stage) return null;
        const lesson = stage.lessons[Number(parts[2])];
        if (!lesson || !lesson.check) return null;
        return { id: id, stage: stage, lesson: lesson };
    }

    let session = null;

    function renderReview() {
        const host = document.getElementById('learnReview');
        const review = window.LearnReview;
        if (!host || !review) return;

        const counts = review.stats();

        if (!session) {
            if (!counts.scheduled) {
                host.innerHTML = '<p class="learn-review-idle">Nothing scheduled yet. Answer the ' +
                    'question at the end of any lesson and rate yourself — it will come back here ' +
                    'on the day you are starting to forget it.</p>';
                return;
            }
            host.innerHTML = '<div class="learn-review-bar">' +
                '<span class="learn-review-count">' +
                    (counts.due ? counts.due + ' due today' : 'nothing due today') + '</span>' +
                '<span class="learn-review-sub">' + counts.scheduled + ' scheduled · ' +
                    counts.mastered + ' known</span>' +
                (counts.due ? '<button type="button" id="learnReviewStart" class="sent-btn">Review</button>' : '') +
            '</div>';
            return;
        }

        if (session.index >= session.queue.length) {
            host.innerHTML = '<div class="learn-review-bar">' +
                '<span class="learn-review-count">Done — ' + session.answered + ' reviewed</span>' +
                '<span class="learn-review-sub">' +
                    (counts.due ? counts.due + ' still due' : 'nothing left due today') + '</span>' +
                '<button type="button" id="learnReviewEnd" class="sent-btn sent-btn-quiet">Close</button>' +
            '</div>';
            return;
        }

        const item = questionFor(session.queue[session.index]);
        if (!item) { session.index++; renderReview(); return; }

        host.innerHTML = '<div class="learn-review-card">' +
            '<p class="learn-review-from">' + ruby(item.stage.title) + ' · ' +
                ruby(item.lesson.title) + '</p>' +
            '<p class="learn-review-q">' + ruby(item.lesson.check.q) + '</p>' +
            (session.shown
                ? '<p class="learn-review-a">' + ruby(item.lesson.check.a) + '</p>' +
                  '<div class="learn-rate">' +
                      '<button type="button" class="learn-rate-btn" data-session="0">Not yet</button>' +
                      '<button type="button" class="learn-rate-btn is-yes" data-session="1">Got it</button>' +
                  '</div>'
                : '<button type="button" id="learnReviewShow" class="sent-btn">Show answer</button>') +
            '<p class="learn-review-progress">' + (session.index + 1) + ' of ' +
                session.queue.length + '</p>' +
        '</div>';
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

        // Rating from inside a lesson, and from inside a review session.
        host.addEventListener('click', function (event) {
            const button = event.target.closest('.learn-rate-btn[data-rate]');
            if (!button || !window.LearnReview) return;

            const check = button.closest('.learn-check');
            if (!check) return;

            window.LearnReview.rate(check.dataset.check, button.dataset.rate === '1');
            const state = check.querySelector('.learn-rate-state');
            if (state) state.textContent = rateState(check.dataset.check);
            renderReview();
        });

        const reviewHost = document.getElementById('learnReview');
        if (reviewHost && window.LearnReview) {
            reviewHost.addEventListener('click', function (event) {
                if (event.target.closest('#learnReviewStart')) {
                    // Shuffle so the order is not the order you read them in —
                    // recalling a fact because it followed another one is not
                    // recalling the fact.
                    const queue = window.LearnReview.dueIds();
                    for (let i = queue.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        const t = queue[i]; queue[i] = queue[j]; queue[j] = t;
                    }
                    session = { queue: queue, index: 0, shown: false, answered: 0 };
                } else if (event.target.closest('#learnReviewShow')) {
                    session.shown = true;
                } else if (event.target.closest('.learn-rate-btn[data-session]')) {
                    const correct = event.target.closest('.learn-rate-btn').dataset.session === '1';
                    window.LearnReview.rate(session.queue[session.index], correct);
                    session.index++;
                    session.shown = false;
                    session.answered++;
                } else if (event.target.closest('#learnReviewEnd')) {
                    session = null;
                    render();
                    return;
                } else {
                    return;
                }
                renderReview();
            });
        }

        // Tier filter. Nothing is removed — this only changes what is in front
        // of you, because sixty stages presented flat says they are equally
        // urgent, which is the one thing a beginner cannot judge.
        const tiers = document.getElementById('learnTiers');
        if (tiers) {
            let showing = 'all';
            try {
                showing = localStorage.getItem('learnejp-tier') || 'all';
            } catch (err) {
                showing = 'all';
            }

            function applyTier() {
                document.body.setAttribute('data-showing', showing);
                Array.prototype.forEach.call(tiers.children, function (chip) {
                    chip.classList.toggle('is-active', chip.dataset.tier === showing);
                });
            }

            tiers.addEventListener('click', function (event) {
                const chip = event.target.closest('[data-tier]');
                if (!chip) return;
                showing = chip.dataset.tier;
                try {
                    localStorage.setItem('learnejp-tier', showing);
                } catch (err) {
                    // Not fatal; the filter just will not persist.
                }
                applyTier();
            });
            applyTier();
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
