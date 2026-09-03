// LearneJP — a Japanese (JLPT) study app for writing practice, quizzes, and dictionary lookup
// Copyright (C) 2026  Claudia Mithesa Peranginangin
//
// This program is free software: you can redistribute it and/or modify it under
// the terms of the GNU General Public License as published by the Free Software
// Foundation, either version 3 of the License, or (at your option) any later
// version. See <https://www.gnu.org/licenses/>.
//
// Contact: clmpnn@gmail.com · https://github.com/clmpnn


// Saved words, and reviewing them.
//
// The dictionary could look anything up and keep nothing. Vocabulary is the
// bulk of the work in a language, and a site that helps you meet a word and
// then lets you lose it is doing half the job — so every card now has a save
// button and the saved words go onto the same Leitner ladder the course
// questions use.
//
// Only the dictionary form is stored. Everything else — reading, meanings,
// whether it is common — is looked up again at review time from the dictionary
// that is already loaded on this page. That keeps a deck of a thousand words
// under a few kilobytes and means an entry never goes stale.
//
// This lives on the dictionary page rather than the learn page for the same
// reason: the entries are here, and shipping 2.4 MB of JMdict to the course so
// it could render a word would cost more than the feature is worth.

(function () {
    'use strict';

    const PREFIX = 'w:';

    function api() { return window.LearnReview; }
    function dict() { return window.LearneJPDict; }

    function idFor(word) { return PREFIX + word; }
    function wordFrom(id) { return id.slice(PREFIX.length); }

    // Find the entry again rather than storing a copy of it.
    //
    // Taking the first entry that contains the spelling is wrong, and wrong in a
    // way that looks fine: 本 appears in 元/本/素 before it appears in 本 itself,
    // so a saved 本 would come back reading もと. These are the signals the
    // sentence parser uses to choose between homographs — a spelling the
    // dictionary flags as common, listed early in its entry, in an entry the
    // dictionary has more to say about.
    function entryFor(word) {
        const entries = dict().entries();
        let best = null;
        let bestScore = Infinity;

        for (let i = 0; i < entries.length; i++) {
            const forms = entries[i][0].concat(entries[i][1]);
            for (let f = 0; f < forms.length; f++) {
                if (forms[f][0] !== word) continue;
                const score = (forms[f][1] ? 0 : 2) + f * 0.05 -
                    Math.min(entries[i][2].length, 6) * 0.03;
                if (score < bestScore) {
                    bestScore = score;
                    best = entries[i];
                }
                break;
            }
        }
        return best;
    }

    function readingOf(entry) {
        const kana = entry[1];
        if (!kana.length) return '';
        const preferred = kana.find(function (form) { return form[1]; }) || kana[0];
        return preferred[0];
    }

    function meaningOf(entry) {
        return entry[2].slice(0, 2).map(function (glosses) {
            return glosses.slice(0, 3).join('; ');
        }).join(' · ');
    }

    // ---------- rendering ----------

    let host = null;
    let session = null;

    function esc(text) { return dict().escapeHtml(text); }

    function romaji(reading) {
        if (!reading) return '';
        try {
            return dict().toMora(reading).map(function (u) { return u.romaji; }).join('');
        } catch (err) {
            return '';
        }
    }

    function renderList() {
        const ids = api().idsWithPrefix(PREFIX);
        if (!ids.length) {
            return '<p class="saved-empty">No saved words yet. Any card in Word or Sentence mode ' +
                'has a <strong>+ Save</strong> button — saved words come back here on a schedule, ' +
                'starting the same day you save them.</p>';
        }

        const rows = ids.map(function (id) {
            const word = wordFrom(id);
            const entry = entryFor(word);
            const box = api().boxOf(id);
            const state = box === 0 ? 'due' : box >= api().intervals.length ? 'known'
                : 'box ' + box;

            return '<li class="saved-row">' +
                '<button type="button" class="saved-word" data-lookup="' + esc(word) + '">' +
                    esc(word) + '</button>' +
                '<span class="saved-reading">' + esc(entry ? readingOf(entry) : '') + '</span>' +
                '<span class="saved-meaning">' +
                    esc(entry ? meaningOf(entry) : 'not in this dictionary') + '</span>' +
                '<span class="saved-state">' + esc(state) + '</span>' +
                '<button type="button" class="saved-drop" data-drop="' + esc(word) +
                    '" title="Remove">×</button>' +
            '</li>';
        }).join('');

        return '<ul class="saved-list">' + rows + '</ul>';
    }

    function render() {
        if (!host) return;
        const counts = api().statsFor(PREFIX);

        if (session) {
            if (session.index >= session.queue.length) {
                host.innerHTML = '<div class="saved-bar">' +
                    '<span class="saved-count">Done — ' + session.answered + ' reviewed</span>' +
                    '<button type="button" id="savedEnd" class="sent-btn sent-btn-quiet">Close</button>' +
                '</div>' + renderList();
                return;
            }

            const word = wordFrom(session.queue[session.index]);
            const entry = entryFor(word);
            const reading = entry ? readingOf(entry) : '';

            host.innerHTML = '<div class="saved-card">' +
                '<p class="saved-prompt">' + esc(word) + '</p>' +
                (session.shown
                    ? '<p class="saved-answer-reading">' + esc(reading) +
                        (romaji(reading) ? ' · ' + esc(romaji(reading)) : '') + '</p>' +
                      '<p class="saved-answer">' + esc(entry ? meaningOf(entry) : '—') + '</p>' +
                      '<div class="learn-rate">' +
                          '<button type="button" class="learn-rate-btn" data-saved="0">Not yet</button>' +
                          '<button type="button" class="learn-rate-btn is-yes" data-saved="1">Got it</button>' +
                      '</div>'
                    : '<button type="button" id="savedShow" class="sent-btn">Show meaning</button>') +
                '<p class="saved-progress">' + (session.index + 1) + ' of ' +
                    session.queue.length + '</p>' +
            '</div>';
            return;
        }

        host.innerHTML = '<div class="saved-bar">' +
            '<span class="saved-count">' +
                (counts.scheduled
                    ? counts.scheduled + ' saved · ' + counts.mastered + ' known'
                    : 'Nothing saved yet') + '</span>' +
            (counts.due
                ? '<button type="button" id="savedStart" class="sent-btn">Review ' +
                    counts.due + '</button>'
                : '') +
        '</div>' + renderList();
    }

    // ---------- wiring ----------

    function init() {
        host = document.getElementById('savedPanel');
        if (!host || !window.LearnReview) return;

        // Saving is delegated from the results area, so both the word search and
        // the sentence breakdown get it without either knowing this file exists.
        const results = document.getElementById('results');
        if (results) {
            results.addEventListener('click', function (event) {
                const button = event.target.closest('[data-save]');
                if (!button) return;

                const word = button.dataset.save;
                const id = idFor(word);

                if (api().has(id)) {
                    api().remove(id);
                    button.classList.remove('is-saved');
                    button.textContent = '+ Save';
                } else {
                    api().add(id);
                    button.classList.add('is-saved');
                    button.textContent = 'Saved';
                }
                render();
            });
        }

        host.addEventListener('click', function (event) {
            if (event.target.closest('#savedStart')) {
                const queue = api().dueIds(PREFIX);
                for (let i = queue.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    const t = queue[i]; queue[i] = queue[j]; queue[j] = t;
                }
                session = { queue: queue, index: 0, shown: false, answered: 0 };
            } else if (event.target.closest('#savedShow')) {
                session.shown = true;
            } else if (event.target.closest('.learn-rate-btn[data-saved]')) {
                const correct = event.target.closest('.learn-rate-btn').dataset.saved === '1';
                api().rate(session.queue[session.index], correct);
                session.index++;
                session.shown = false;
                session.answered++;
            } else if (event.target.closest('#savedEnd')) {
                session = null;
            } else if (event.target.closest('[data-drop]')) {
                api().remove(idFor(event.target.closest('[data-drop]').dataset.drop));
            } else if (event.target.closest('[data-lookup]')) {
                dict().lookUpWord(event.target.closest('[data-lookup]').dataset.lookup);
                return;
            } else {
                return;
            }
            render();
        });

        render();
    }

    // Exposed so the renderers can ask whether a word is already saved, and for
    // tests to drive the deck without a page.
    window.SavedWords = {
        idFor: idFor,
        isSaved: function (word) { return !!(window.LearnReview && api().has(idFor(word))); },
        render: render
    };

    if (typeof document !== 'undefined' && document.getElementById) init();
})();
