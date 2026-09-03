# The tools now point back at the course

New files `js/learn-links.js` and `tools/check-links.js`; changes to
`js/sentence.js`, `js/learn.js`, `html/dictionary.html` and `css/style.css`.

```powershell
$dest = "$HOME\OneDrive\Projects\LearneJP"   # adjust to your path
Copy-Item html\*.html   "$dest\html\" -Force
Copy-Item js\*.js       "$dest\js\"   -Force
Copy-Item css\style.css "$dest\css\"  -Force
Copy-Item tools\check-links.js "$dest\tools\" -Force
```

## The gap this closes

The Sentence tab has been telling people a word is a causative, or a potential,
or the topic particle — and then leaving them there. The course has a lesson on
each of those and no way to be found from the moment you needed it. The two
halves of the site were not connected.

Now they are. Break a sentence down, and the grammar labels on a word card are
links:

```
食べさせられました
from 食べる  [causative] [potential/passive] [polite]
             └──────────┴───────────────────┴─ each opens the lesson that explains it
```

Following one lands on the learn page with that lesson **already open and its
question expanded** — which is the whole point. You met a pattern in the wild,
read why it works, answered the question, and it entered your review schedule.
That is the loop the review system was missing an entrance to.

Particle cards get their own link, since a particle has no deinflection to hang
a label on: **What は does →**.

## 62 links, and a test that keeps them honest

`js/learn-links.js` maps 37 grammar labels and 25 particles to a stage and a
lesson index. The course gets restructured often, and a link to an index that has
shifted is worse than no link — it lands the reader somewhere confidently wrong.
So `tools/check-links.js` verifies every target, and the test suite runs it.

Three labels are deliberately **not** mapped: `listing`, `imperative` and
`command` have no lesson that really covers them. Sending someone to a lesson
that does not answer their question is worse than not offering a link, and a
test asserts these still render as plain pills rather than linking nowhere.

## Two details that would have bitten

- **The linked lesson may be in a hidden tier.** The filter added last round can
  hide Reference stages, so a link to `classical:0` would have scrolled to
  nothing. Following a link now switches the filter to All first.
- **The kanji-form test for particle links.** は is also 葉 and 歯. The link only
  appears on the entry with no kanji spelling at all — the same test that decides
  whether to read it *wa*.

## Checks

New `test-links.js`, 8 assertions:

- all 62 links resolve, and none points at a lesson that lacks a question
- 26 of the 29 labels the deinflector can emit have a lesson
- a real breakdown renders linked labels and particle links
- **every href in the rendered output is one of the real targets** — a typo'd
  link would otherwise be a dead end nobody notices
- an unmapped label stays plain text, tested against a sentence that actually
  produces one rather than hoping the previous one did

All eight suites pass: 8 links, 18 review, 37 learn, 11 handoff, 18 reading, 26
wiring, 14 layout, 6 redirect.
