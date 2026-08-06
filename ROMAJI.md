# Romaji over every Japanese word on the learn page

```powershell
$dest = "$HOME\OneDrive\Projects\LearneJP"   # adjust to your path
Copy-Item html\learn.html "$dest\html\" -Force
Copy-Item js\*.js         "$dest\js\"   -Force
Copy-Item css\style.css   "$dest\css\"  -Force
Copy-Item README.md       "$dest\"      -Force
New-Item  "$dest\tools" -ItemType Directory -Force | Out-Null
Copy-Item tools\build-romaji.js "$dest\tools\" -Force
```

Every Japanese word in the course now carries its reading above it, in `<ruby>`
— the element made for exactly this, so it stays inline, wraps properly and does
not break the sentence into a list. **3,742 ruby elements, 5,585 readings.**

```
私      は   日本語    を   勉強     します
watashi wa   nihongo   wo   benkyou  shimasu
```

A **Romaji** checkbox at the top turns it off for anyone reading comfortably,
and the choice sticks. The annotations render either way and are hidden in CSS,
so toggling never redraws the page.

## Why the readings are pre-generated

Working them out in the browser needs the segmenter, which needs the 2.4 MB
dictionary — on a page that otherwise has no use for one. That would have made
the learn page the heaviest on the site to add reading marks to prose.

So `tools/build-romaji.js` does it once, offline, using the same segmenter the
Sentence tab uses, and writes `js/learn-romaji.js`: **60 KB** covering all 1,719
Japanese runs in the course. Rerun it after editing the course text:

```
node tools/build-romaji.js
```

It prints anything it could not read rather than skipping silently. Right now
that is 10 items, and all ten are correct to leave blank: the marks ゛ ゜ ー, the
small kana ゃ ゅ ょ quoted alone, the radicals 亻 and 氵, and 読んて — which is a
deliberately wrong form used as a counter-example in the te-form lesson.

Readings are stored per word rather than per sentence, so the annotation sits
over the word it belongs to instead of stretching across a line.

## Three fixes it forced

Generating the table surfaced gaps in the Sentence tab's deinflector, all now
fixed — so these improve the dictionary too, not just the learn page:

- **〜がる** — 寒がっています did not resolve to 寒い. This is the form the course
  teaches for describing someone else's feelings, so it not resolving was a real
  hole.
- **〜なきゃ / 〜なくちゃ** — 行かなきゃ did not resolve. Both are taught in the
  casual stage and are extremely common in speech.
- **Lone kanji and stray kana** — a character quoted alone in a radical table is
  not a dictionary word. The generator now falls back to the kanji chart's own
  readings, preferring a kun reading that stands as a whole word (山 → yama) over
  the on reading used to cite a character (校 → kou).

## Checks

37 assertions in the learn suite, seven of them new:

- every one of the 1,719 Japanese runs has a reading entry
- every reading reassembles into exactly its run — a misaligned one would show
  the wrong text under the ruby
- 1,709 of 1,719 runs are fully annotated
- ruby and rt elements reach the rendered page
- and the old crude escaping check is replaced with a stronger one: every tag in
  the output is on the renderer's allowlist

The reading, wiring, layout, handoff and redirect suites all still pass.
