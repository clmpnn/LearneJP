# A page for people who haven't started yet

New page `html/learn.html` + `js/learn.js`, plus deep-link support in two
existing pages so the path can send people to exactly the right place.

```powershell
$dest = "$HOME\OneDrive\Projects\LearneJP"   # adjust to your path
Copy-Item html\*  "$dest\html\" -Force
Copy-Item js\*    "$dest\js\"   -Force
Copy-Item css\*   "$dest\css\"  -Force
Copy-Item sitemap.xml, README.md "$dest\" -Force
```

## The idea

Every other page here is a tool, and a tool assumes you already know what you
came for. Somebody starting from zero doesn't — they need an order. So this page
contains no Japanese of its own. It's eight stages, 26 steps, and every step is
a link into the page that already does that job:

1. **Hiragana** — chart, then trace the vowels, then the rows, then kana-only vocab
2. **Katakana** — the fast reading win; コーヒー is coffee
3. **Your first words** — search in English to go looking for the word you want
4. **How a sentence holds together** — particles, verb last, read via the Sentence tab
5. **Your first kanji** — the N5 set, traced, then met inside real words
6. **Politeness** — 食べる / 食べます / 召し上がる and where you stand
7. **Read something real** — reading and listening sets, then text you weren't given
8. **Keep going** — N4, Performance mode, and writing your own questions

A progress bar across the top, a per-stage count, and a tick against each step,
kept in `localStorage` under `learnejp-path-progress` — the same mechanism
`practice.js` already uses for answer history. Nothing is uploaded.

I chose a numbered route down the page rather than a grid of cards: a grid says
every entry is equally good to start with, which is exactly the thing a beginner
can't judge.

## Deep links added

The path needed to land people *inside* a tool, not at its front door, so two
pages learned to read a hash. Both are additive — nothing changes for anyone
arriving without one.

| Link | Lands on |
| --- | --- |
| `characters.html#hiragana` `#katakana` `#kanji` | that chart |
| `characters.html#kanji=n4` | the kanji chart, filtered to N4 |
| `practice.html#vocabulary` `#grammar` `#kanji` `#reading` `#listening` | that quiz |
| `practice.html#kanji=n4` | that quiz at that level |

`writing.html#trace=`, `dictionary.html#q=` and `keigo.html#overview` already
worked and are used as they are. The practice hash is applied after the question
data loads, since the level means nothing before then.

## Checks

15 assertions on the path, and they're the ones worth having:

- all 26 steps point at a file that exists
- every hash is one the destination page actually understands — chart names,
  quiz names and JLPT levels are checked against the real sets, not assumed
- every character the path asks you to trace has stroke data, so no step opens a
  blank template
- all six tools are reached by the path at least once
- ticking, unticking, saving and the progress bar

Plus: no broken internal links across all eight pages, and one identical nav on
every one of them. The reading, wiring, layout and redirect suites still pass.

## Worth knowing

- The nav is seven items now. It wraps and shrinks on phones already, so it
  holds, but it's near the point where it would want a different shape.
- Stage 1 sends you to trace あ and か as starting points rather than linking all
  46 kana — the writing page has ◀ ▶ to walk the row, which is the better tool
  for that job than 46 links.
