# Start from Zero now teaches, not just routes

New file `js/learn-course.js`, rewritten `js/learn.js`, plus the lesson styles
in `css/style.css` and one script tag in `html/learn.html`.

```powershell
$dest = "$HOME\OneDrive\Projects\LearneJP"   # adjust to your path
Copy-Item html\learn.html "$dest\html\" -Force
Copy-Item js\*.js         "$dest\js\"   -Force
Copy-Item css\style.css   "$dest\css\"  -Force
```

## What changed

The page was a route: eight stages of links with a paragraph of context each.
It told you what to do next but never why, which is the half that makes the
order stick. Each stage now runs **understand first, then do**:

- **22 lessons** — ~2,300 words of actual teaching, collapsed by default
- **11 tables** — the kana grid, the particle list, the polite/humble/honorific
  swaps, stroke-order rules, counters, the です/ます four-square
- **18 worked examples** — each one links straight into the Sentence tab, so the
  example you just read is one tap from the tool that takes it apart
- **22 self-checks** — one question per lesson, answer hidden until you ask

The steps went from 26 to 28: 国 was added to the kanji stage so the
close-the-box-last rule can be seen happening, and シ to katakana, since the
シ/ツ confusion is settled by writing rather than by looking.

## What the lessons actually cover

Not a summary of the tools — the things a beginner gets stuck on:

- why Japanese needs no spaces (the script changes at the boundary)
- that hiragana is five vowels and nine consonants, not 46 shapes
- the five squares in the grid that break the pattern — し ち つ ふ を
- what っ does, and that きて and きって are different words
- how borrowed words get padded, and that アルバイト is German
- why dictionaries say "to eat", and that 食べる is already a whole sentence
- ある vs いる, and the い/な adjective split with the 綺麗 trap
- the verb waiting at the end, and the negative arriving after it
- every common particle with an example, は versus が given honestly as hard
- on'yomi vs kun'yomi and which to guess first
- stroke order as seven rules rather than a list to memorise
- counters, and why 十万 is a hundred thousand
- the three politeness dials, and that the giveaway mistake is honorific-for-self
- how to read above your level: start at the end, then the particles
- where the Sentence tab is unreliable, in its own words

## Structure

The content lives in `js/learn-course.js` as `window.LEARN_COURSE`, matching how
`kanji-data.js`, `keigo-data.js` and `practice-data.js` already work — so
`learn.js` is now rendering and progress only, and editing a lesson never means
touching logic. If the course file fails to load, the page says so rather than
rendering empty.

Lessons are native `<details>`. They open without JavaScript, they are
keyboard-reachable for free, and find-in-page can search inside a closed one —
someone hunting for "particle" finds it whether or not they thought to open
stage four. Ticking a step now updates that step in place instead of re-rendering,
because a full redraw would slam every open lesson shut.

## Checks

24 assertions on the path and course, including the new ones:

- every stage teaches before it sends you off
- every lesson has prose, and ends with something to answer
- every table row matches its header width
- every worked example is real Japanese with a translation
- all 22 lessons and self-checks reach the rendered page
- nothing in the content escapes into the markup unescaped
- ticking a step does not tear down the open lessons

Plus the earlier ones: all 28 steps point at files that exist, every hash is one
the destination understands, every traced character has stroke data, all six
tools are reached. No broken links across nine pages. The reading, wiring,
layout and redirect suites still pass.
