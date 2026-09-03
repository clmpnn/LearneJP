# The dictionary can now keep what you look up

New files `js/saved.js` and a generalised `js/learn-review.js`; changes to
`js/dictionary.js`, `js/sentence.js`, `html/dictionary.html` and
`css/style.css`.

```powershell
$dest = "$HOME\OneDrive\Projects\LearneJP"   # adjust to your path
Copy-Item html\dictionary.html "$dest\html\" -Force
Copy-Item js\*.js              "$dest\js\"   -Force
Copy-Item css\style.css        "$dest\css\"  -Force
```

## The gap

Vocabulary is the bulk of the work in a language, and the site could look
anything up and keep nothing. Meanwhile the Leitner ladder built for the course
questions was sitting there, generic enough that its ids never cared what they
pointed at.

Every card in Word and Sentence mode now has **+ Save**, and a third tab —
**Saved** — holds the deck and reviews what is due. A word arrives due the same
day, because a word you have just met is one you are about to forget.

## One ladder, two decks

The schedule is a single store, with questions and words told apart by an id
prefix: `q:verbs:2` and `w:食べる`. So both share the intervals, both share the
storage, and neither needed its own scheduler. `dueIds()` and `stats()` now take
a prefix, and default to questions so the course review is unchanged.

The decks are reviewed in different places on purpose. Questions on the learn
page, words on the dictionary page — because the entries live here, and shipping
2.4 MB of JMdict to the course so it could render a word would cost more than the
feature is worth.

## Only the word is stored

A saved word is four bytes of schedule and its dictionary form. Reading, meanings
and the common tag are looked up again at review time from the dictionary already
loaded on the page. A deck of a thousand words stays a few kilobytes, and an
entry can never go stale.

Words are saved against the **dictionary form**, not the surface: breaking down
読みました saves 読む, because 読みました and 読みます are the same word to
remember.

## The bug that came with it

Looking the entry up again meant writing a lookup, and my first one took the
first entry containing the spelling. That is wrong in a way that looks fine: 本
appears in 元/本/素 before it appears in 本 itself, so a saved 本 would have come
back reading **もと**. The parser already solves this, and I had reintroduced the
problem by not reusing its reasoning — a spelling flagged common, listed early,
in an entry the dictionary has more to say about. The test caught it because it
asserted the reading rather than that a reading existed.

## Checks

New `test-saved.js`, 17 assertions:

- a saved word is due today; word stats and question stats do not see each other,
  and the course review does not pick up words
- saving and unsaving from a card, and the button saying which
- the deck renders its reading and meaning **from the dictionary**, and storage
  contains nothing but a box and a due day
- a review session hides the meaning behind a press, and a correct answer moves
  the word to tomorrow
- sentence cards save the dictionary form rather than the inflection

One of the four initial failures was the test's fault rather than the code's —
the review queue is shuffled, and I had assumed a one-item deck while two words
were due. Made deterministic rather than papered over.

All nine suites pass: 17 saved, 8 links, 18 review, 37 learn, 11 handoff, 18
reading, 26 wiring, 14 layout, 6 redirect.
