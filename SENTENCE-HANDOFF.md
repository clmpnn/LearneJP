# Break it down now opens the Sentence tab

Four files: `js/dictionary.js`, `js/sentence.js`, `js/learn.js`,
`js/learn-course.js`.

```powershell
$dest = "$HOME\OneDrive\Projects\LearneJP"   # adjust to your path
Copy-Item js\dictionary.js, js\sentence.js, js\learn.js, js\learn-course.js "$dest\js\" -Force
```

## The bug

Every "Break it down" button on the course, and ten of the steps, linked to
`dictionary.html#q=<sentence>`. That hash is the word search's, so a whole
sentence went into a box that matches single dictionary entries and found
nothing — the one place on the site where the answer was guaranteed to be empty.

## The fix

A second hash the sentence tab owns:

| Link | Opens |
| --- | --- |
| `dictionary.html#q=食べる` | Word tab, searched |
| `dictionary.html#s=私は学生です` | **Sentence tab, broken down** |

`sentence.js` claims `#s=` itself rather than through a callback, because
`dictionary.js` runs its hand-off during its own startup — before `sentence.js`
has even loaded, so a callback would never be registered in time. `dictionary.js`
checks for a pending `#s=` and stands down when it sees one.

One guard: it only stands down when `#sentenceInput` is actually on the page. On
a page that loads the dictionary without sentence mode, `#s=` falls through and
is treated as an ordinary query rather than silently doing nothing.

## What changed in the links

The course already distinguished the two intents in its own labels, so the split
follows them exactly:

- **"Look up 母", "Look up 好き", "Search to eat"** — 13 steps, still `#q=`
- **"Break down 行きました", "Break down たら", "Try 私は学生です"** — 10 steps, now `#s=`
- **All 55 worked examples** — the "Break it down →" link under each one, now `#s=`

## One thing worth flagging

Moving the hand-off exposed an ordering bug in `init()`: it ran before the empty
state was drawn, so the empty state wiped the breakdown a moment after rendering
it. The status line still said "4 words" while the panel showed the placeholder,
which is exactly the kind of half-right failure that survives a manual check. The
hand-off now runs last.

## Checks

New `test-handoff.js`, 11 assertions on a page loaded at `#s=私は学生です`:

- the word search does not claim the sentence, and its box stays empty
- sentence mode is active, the text is in the textarea, the panel is showing
- the strip, the literal reading and the word cards all rendered
- the status counts words
- `#q=` links still reach the word search and render there

`test-learn.js` gained two: every breakdown link opens the Sentence tab and every
lookup opens the word search, checked against the step's own wording; and no
worked example points at `#q=`. 30 assertions there now, and the reading, wiring,
layout and redirect suites are unchanged.
