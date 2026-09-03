// LearneJP — a Japanese (JLPT) study app for writing practice, quizzes, and dictionary lookup
// Copyright (C) 2026  Claudia Mithesa Peranginangin
//
// This program is free software: you can redistribute it and/or modify it under
// the terms of the GNU General Public License as published by the Free Software
// Foundation, either version 3 of the License, or (at your option) any later
// version. See <https://www.gnu.org/licenses/>.
//
// Contact: clmpnn@gmail.com · https://github.com/clmpnn


// Scheduling for the course's self-checks.
//
// The course ends every lesson with a question. Until now they sat in the page
// as text you could open and close, which is re-reading — the least effective
// thing you can do with a question. Answering from memory and then meeting the
// question again days later is, by a wide margin, the most effective. This file
// is the difference between those two.
//
// The schedule is a Leitner ladder rather than anything cleverer. Each question
// sits in a box; getting it right moves it up and pushes the next sighting
// further away, getting it wrong drops it to the bottom and brings it back the
// same day. Six boxes take a question out to two months, which is long enough
// that anything surviving the ladder is genuinely known.
//
// Storage is intentionally small: a box number and a due day per question, in
// localStorage, with days counted as integers rather than timestamps so the
// whole schedule for 237 questions stays a few kilobytes.
//
// This file is scheduling only. Rendering lives in js/learn.js, so the ladder
// can be reasoned about — and tested — without a page.

(function () {
    'use strict';

    const STORE_KEY = 'learnejp-review';

    // Days until the next sighting, by box. A question answered correctly six
    // times in a row is not worth asking again for two months.
    const INTERVALS = [1, 2, 4, 9, 21, 60];

    // Which stages are the job and which are there when you need them.
    //
    // Sixty stages presented as one list says they are equally urgent, which is
    // the one thing a beginner cannot judge. These three tiers say: learn the
    // first group, work through the second, and read the third when the
    // situation arrives. Nothing is hidden — the filter only changes what is
    // shown first.
    const FOUNDATION = ['hiragana', 'sounds', 'katakana', 'greetings', 'words',
        'sentences', 'verbs', 'numbers', 'kanji', 'describing'];

    const REFERENCE = ['history', 'cohesion', 'wordbuilding', 'strata', 'keigopatterns',
        'register', 'business', 'service', 'trains', 'eating', 'living', 'emergency',
        'school', 'ritual', 'dialects', 'onomatopoeia', 'idioms', 'proverbs',
        'smalltalk', 'culture', 'rolelanguage', 'formalgrammar', 'advgrammar', 'classical'];

    function tierOf(stageId) {
        if (FOUNDATION.indexOf(stageId) !== -1) return 'foundation';
        if (REFERENCE.indexOf(stageId) !== -1) return 'reference';
        return 'core';
    }

    // Days since the epoch. Integers rather than timestamps: the schedule only
    // ever needs to know which day, and a day number survives being stored,
    // compared and subtracted without any of the trouble a date brings.
    function today() {
        return Math.floor(Date.now() / 86400000);
    }

    let schedule = {};

    function load() {
        try {
            schedule = JSON.parse(localStorage.getItem(STORE_KEY)) || {};
        } catch (err) {
            schedule = {};
        }
        return schedule;
    }

    function save() {
        try {
            localStorage.setItem(STORE_KEY, JSON.stringify(schedule));
        } catch (err) {
            // Private browsing, or storage full. The session still works; the
            // schedule just will not survive a reload.
        }
    }

    // Rating a question is what puts it into the schedule in the first place.
    // Nothing is drilled that you have not met in its lesson, which is why the
    // pool grows with your reading rather than starting at 237.
    function rate(id, correct) {
        const current = schedule[id];
        const box = correct
            ? Math.min((current ? current.box : 0) + 1, INTERVALS.length)
            : 0;

        schedule[id] = {
            box: box,
            // A lapse comes back in this same session. Getting something wrong
            // and not seeing it again for a day wastes the moment you learned
            // it was wrong.
            due: correct ? today() + INTERVALS[box - 1] : today()
        };
        save();
        return schedule[id];
    }

    function dueIds() {
        const day = today();
        return Object.keys(schedule).filter(function (id) {
            return schedule[id].due <= day;
        });
    }

    function stats() {
        const ids = Object.keys(schedule);
        return {
            scheduled: ids.length,
            due: dueIds().length,
            // Through the whole ladder: seen correctly six times, spaced out to
            // two months. Worth counting separately from merely scheduled.
            mastered: ids.filter(function (id) {
                return schedule[id].box >= INTERVALS.length;
            }).length
        };
    }

    function boxOf(id) {
        return schedule[id] ? schedule[id].box : null;
    }

    function reset() {
        schedule = {};
        save();
    }

    load();

    window.LearnReview = {
        rate: rate,
        dueIds: dueIds,
        stats: stats,
        boxOf: boxOf,
        reset: reset,
        tierOf: tierOf,
        today: today,
        intervals: INTERVALS,
        // Exposed for tests, which need to drive the clock rather than wait.
        _load: load,
        _schedule: function () { return schedule; }
    };
})();
