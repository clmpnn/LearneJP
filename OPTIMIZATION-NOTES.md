# LearneJP — audit and optimization notes

Reviewed at commit `78fa758`, 1,909 files, 213 MB.

---

## Things that were broken

### The custom 404 page was never being served

`html/404.html` existed and looked right, but GitHub Pages only serves a custom
404 from the **root of the published site**. At `/LearneJP/html/404.html` it was
unreachable, so every bad URL got GitHub's generic page instead.

Fixed by moving it to `404.html` at the repo root. Its links are absolute
(`/LearneJP/…`) on purpose, because a 404 can be served at any URL depth — a
relative link would resolve differently depending on where the visitor landed.

### The Git LFS rule pointed at a file that doesn't exist

`.gitattributes` contained:

```
data/dictionary-data.json filter=lfs diff=lfs merge=lfs -text
```

There is no `data/` directory in this repo — the file is `js/dictionary-data.js`.
So the rule was inert. That's lucky, because **GitHub Pages does not resolve LFS
pointers.** If that path had ever existed, Pages would have served the ~130-byte
pointer file instead of the dictionary, and the search box would have failed with
a confusing parse error.

The replacement `.gitattributes` drops LFS entirely and instead marks the
generated data files as `-diff linguist-generated`, so they stop producing
unreadable multi-megabyte diffs, and marks `audio/` and `images/` as vendored so
the repo's language bar reflects the actual code.

### `js/index.js` was dead

It contained the JetBrains new-project scaffold — a copyright header followed by
`console.log('Happy developing ✨')` — and no page loaded it. Deleted.

### `.idea/` was committed

Five JetBrains project files were tracked. They're per-developer settings and
change constantly. Now in `.gitignore`; run this once to stop tracking them:

```bash
git rm -r --cached .idea
```

### Two pages were missing the favicon

`writing.html`, `characters.html`, and `add.html` had
`<link rel="icon" href="../favicon.svg">`. `index.html` and `practice.html`
didn't — so the home page, the most-linked page, showed the browser's default
icon. Added.

---

## Performance

### `writing.html` ships 4.50 MB of JavaScript

> **Mostly resolved (2026-08-05).** Writing and the dictionary are now separate
> pages, so neither one downloads the other's data: `writing.html` is 2.13 MB
> and the new `dictionary.html` is 2.41 MB. That was the whole of the doubling.
> Option 2 below is still worth doing — it would defer the dictionary payload
> until the search box is used — but it is no longer the biggest lever, and
> nobody pays for a dataset they didn't come for. The table records the state
> before the split.

| Page | JS payload |
| --- | --- |
| `writing.html` | **4.50 MB** (`stroke-data.js` 2.20 MB + `dictionary-data.js` 2.47 MB) |
| `practice.html` | 2.19 MB |
| `add.html` | 2.18 MB |
| `characters.html` | 0.25 MB |
| `index.html` | 0 MB |

The `defer` attributes are correct, so nothing blocks first paint — but the
browser still downloads, parses, and evaluates 4.5 MB before the dictionary or
the trace canvas responds. On a phone that's several seconds of the page looking
loaded but not working.

**This is the single biggest remaining win, and it needs a decision from you, so
I haven't touched it.** Two options:

1. **Convert the data files to fetched JSON.** `fetch('../data/stroke-data.json')`
   lets the browser cache them separately from your code, so a CSS tweak no
   longer invalidates 4.5 MB. Cost: the pages stop working over `file://`, which
   the comments in `practice.js` show was a deliberate design goal.
2. **Load on demand.** Keep the script tags for stroke data, but only load
   `dictionary-data.js` when the search box is first focused. The trace canvas
   works immediately; the dictionary costs 2.47 MB only if used. This keeps the
   `file://` behaviour and is roughly a dozen lines.

Option 2 fits the existing design better.

### `practice-data.json` duplicates `practice-data.js`

Both are ~2.26 MB of the same questions. `practice.js` loads
`window.PRACTICE_DATA` from the script tag first and only falls back to fetching
the JSON if that's missing — which in production never happens. So the JSON is
2.26 MB downloaded by the Pages build and served to nobody.

It isn't dead, though: `add.html` uses the same fallback, and the
"Download Updated JSON" flow is easier to reason about with a canonical JSON
around. Suggestion: keep it in the repo but move it to `data/practice-data.json`
so its role is obvious, and update the two `DATA_PATHS` arrays. Or drop it and
generate it from `practice-data.js` when needed.

### Correction: the Klee One webfont

An earlier version of these notes claimed `--font-handwriting` ("Klee One")
appeared "exactly once in `style.css`, on `.result-kanji`", and on that basis the
font request was stripped from `practice.html`, `characters.html` and
`add.html`. **That was wrong.** It is used by fourteen selectors:

```
.result-kanji  .mora-kana  .passage  .question-text  .choice-btn
.q-passage-preview  .q-text  .kana-char  .kanji-tile  .kmodal-kanji
.kmodal-jp  .say-chip  #traceSelect  .trace-custom
```

Those cover the kana chart, the kanji grid, the kanji detail modal, quiz
questions and answer buttons, and the trace controls — the three pages the font
was removed from are exactly the pages that needed it most. The bad conclusion
came from a `grep … | sort -u -t: -k2` that collapsed every identical
`font-family:` declaration into one line, so fourteen usages read as one.

Restored, and the font system rebuilt around it — see `FONT-NOTES.md`.

---

## Structure: a change I recommend *against*

The obvious tidy-up is to flatten `html/` into the repo root and delete the
meta-refresh redirect in `index.html`. That would remove a round-trip and give
you clean URLs like `/LearneJP/practice.html`.

**Don't.** The practice data hardcodes relative media paths:

- 925 occurrences of `"../audio/…"`
- 921 occurrences of `"../images/…"`

Those live inside `practice-data.js` *and* `practice-data.json`, and the "Add"
page writes new ones in the same form. Moving the pages up one level breaks all
1,846 of them, plus any question set a user has already exported. The redirect
costs one extra request on first load; the flatten risks silently breaking every
listening question. Not a good trade.

What was done instead: each page now declares a `<link rel="canonical">` pointing
at its real URL, so search engines index `html/practice.html` directly rather
than guessing from a soft redirect.

---

## Licensing

`LICENSE` is already the canonical GPLv3 (674 lines, byte-exact), and seven of
the hand-written JS files carried proper notices. Gaps that were filled:

- All six HTML files, `css/style.css`, and the three generated data files
  (`dictionary-data.js`, `stroke-data.js`, `kanji-data.js`) had no notice.
  They had "generated file, do not edit" comments, but a generated file is still
  a covered work.
- Every page footer said only `© LearneJP`. Software delivered over a network
  should tell users where to get the source; the footer now links to the license
  and the repository.

Two things worth knowing:

**Data licenses travel separately.** JMdict, KANJIDIC2, and KanjiVG are all
CC BY-SA, not GPL. Your code being GPLv3 doesn't relicense them, and CC BY-SA
carries its own share-alike obligation on the data itself. The in-page credits
are already correct — the new README adds them in a table so anyone forking gets
the picture before they copy the `js/*-data.js` files.

**The GPL is hard to reverse.** Anyone who receives a version keeps those rights
permanently. That's normally exactly right for a study tool. But if you later
wanted to ship a proprietary build, or accept a contribution from someone who
won't license under GPL, you'd need every contributor's agreement to relicense.
Easier to settle now than after the first outside pull request.

---

## Repository size

213 MB, of which ~196 MB is `audio/` and 17 MB is `images/`. That's fine —
GitHub Pages allows a 1 GB published site — but two notes:

- Pages has a soft bandwidth limit of 100 GB/month. At ~200 MB of media, heavy
  use of the listening section could approach it. Worth knowing, not worth acting
  on yet.
- Ten image files are byte-identical duplicates (the `n5_listening_02_*` and
  `n5_listening_12_*` JPGs are the same images). Trivial in size; mentioned only
  because it suggests the import script may double-write.

The GitHub Actions checkout uses `fetch-depth: 1` so the deploy doesn't pull the
full history of a media-heavy repo on every push.

---

## Checklist after applying

- [ ] `git rm -r --cached .idea`
- [ ] Settings → Pages → Source → **GitHub Actions**
- [ ] Confirm <https://clmpnn.github.io/LearneJP/nonexistent> shows your 404
- [ ] Delete `optimize.py` once the result is committed
- [ ] Decide on the `dictionary-data.js` lazy-load
