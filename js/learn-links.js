// LearneJP — a Japanese (JLPT) study app for writing practice, quizzes, and dictionary lookup
// Copyright (C) 2026  Claudia Mithesa Peranginangin
//
// This program is free software: you can redistribute it and/or modify it under
// the terms of the GNU General Public License as published by the Free Software
// Foundation, either version 3 of the License, or (at your option) any later
// version. See <https://www.gnu.org/licenses/>.
//
// Contact: clmpnn@gmail.com · https://github.com/clmpnn


// From a pattern in a sentence to the lesson that explains it.
//
// The Sentence tab has been telling people that a word is a causative, or a
// potential, or the topic particle, and then leaving them there. Meanwhile the
// course has a lesson on each of those things and no way to be found from the
// place you needed it. This file is the join.
//
// Keys are the labels sentence.js actually produces — the raw reasons on a word
// card, and the particle surfaces — and values are stage id plus lesson index.
// Anything without a good home is deliberately absent: sending someone to a
// lesson that does not cover their question is worse than not offering a link.
//
// tools/check-links.js — run by the test suite — verifies every target still
// resolves after the course is edited.

window.LEARN_LINKS = {

    // Grammar the deinflector names on a word card.
    reasons: {
        'past': 'verbs:3',
        'negative': 'verbs:3',
        'polite': 'sentences:3',
        'te-form': 'verbs:2',
        'stem': 'verbs:1',
        'potential': 'verbs:5',
        'passive': 'transitivity:2',
        'potential/passive': 'transitivity:2',
        'causative': 'transitivity:3',
        'conditional': 'joining:1',
        'volitional': 'casual:0',
        'want to': 'verbs:1',
        'wants to': 'verbs:1',
        'progressive': 'verbs:4',
        'resultant': 'transitivity:1',
        'please': 'verbs:4',
        'completed': 'verbs:4',
        'trying': 'verbs:4',
        'in preparation': 'verbs:4',
        'wanting': 'verbs:4',
        'going on': 'motion:1',
        'coming to': 'motion:1',
        'doing for': 'people:3',
        'done for me': 'people:3',
        'having done': 'people:3',
        'shows signs of': 'others:0',
        'looks like': 'seeming:0',
        'probably': 'seeming:1',
        'adverbial': 'modifying:2',
        'noun form': 'wordbuilding:1',
        'must': 'casual:1',
        'while': 'joining:2',
        'easy to': 'verbs:1',
        'hard to': 'verbs:1',
        'too much': 'verbs:1',
        'way of': 'verbs:1',
        'without': 'classical:0'
    },

    // Particles, keyed on the surface, because a particle card has no
    // deinflection to hang a link from.
    particles: {
        'は': 'sentences:2',
        'が': 'sentences:2',
        'を': 'sentences:1',
        'に': 'sentences:1',
        'へ': 'sentences:1',
        'で': 'sentences:1',
        'と': 'sentences:1',
        'の': 'sentences:1',
        'や': 'sentences:1',
        'も': 'particles2:1',
        'から': 'joining:0',
        'ので': 'joining:0',
        'けど': 'joining:0',
        'のに': 'particles2:3',
        'まで': 'particles2:2',
        'だけ': 'particles2:0',
        'しか': 'particles2:0',
        'ばかり': 'particles2:0',
        'さえ': 'particles2:1',
        'こそ': 'particles2:1',
        'か': 'sentences:4',
        'ね': 'casual:2',
        'よ': 'casual:2',
        'って': 'quoting:1',
        'ながら': 'joining:2'
    }
};
