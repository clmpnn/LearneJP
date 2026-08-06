# Writing and Dictionary are now separate pages

This package supersedes the earlier `LearneJP-sentence-mode` one — it contains
both changes. Copy everything over your checkout, keeping the folder structure.

```powershell
$dest = "$HOME\OneDrive\Projects\LearneJP"   # adjust to your path
Copy-Item html\*  "$dest\html\" -Force
Copy-Item js\*    "$dest\js\"   -Force
Copy-Item css\*   "$dest\css\"  -Force
Copy-Item *.xml, *.md "$dest\" -Force        # sitemap + docs, skip if you'd rather not
```

Nothing is deleted. `html/dictionary.html` and `js/sentence.js` are new; the
rest are edits.

## What moved

| | Before | After |
| --- | --- | --- |
| Writing practice | `writing.html`, left half | `writing.html`, whole page |
| Dictionary | `writing.html`, right half | `dictionary.html` |
| Nav label | "Writing & Dictionary" | "Writing" · "Dictionary" |
| Kanji modal → look up | `writing.html#q=` | `dictionary.html#q=` |
| Kanji modal → trace | `writing.html#trace=` | unchanged |

Each page now loads only the data it needs, which is what the split is really
worth:

| Page | JS payload before | after |
| --- | --- | --- |
| `writing.html` | 4.50 MB | **2.13 MB** |
| `dictionary.html` | — | 2.41 MB |

That closes most of the "`writing.html` ships 4.50 MB" item in
`OPTIMIZATION-NOTES.md`, which has been annotated rather than rewritten — the
lazy-load idea in it is still worth doing, it just isn't the big lever any more.

## Old links still work

`writing.html#q=食べる` — an old bookmark, or a stale copy of the kanji
reference — is forwarded to `dictionary.html#q=食べる` by `readTraceHash()` in
`js/writing.js`. `#trace=` links are untouched. The `sessionStorage` fallback
that carries a query across `file://` setups still works; only the page reading
it changed.

The forward runs from `writing.js`, which executes after `stroke-data.js` is
parsed, so a stale link pauses on the writing page for a moment before moving
on. Moving that check into its own small script tag ahead of the stroke data
would make it instant, at the cost of one more file.

## Files in this package

**New**

- `html/dictionary.html` — the dictionary, both modes
- `js/sentence.js` — the sentence parser (deinflection, segmentation, readings)

**Edited**

- `html/writing.html` — dictionary half removed, layout un-split, scripts trimmed
- `html/index.html`, `add.html`, `characters.html`, `keigo.html`, `practice.html` — nav
- `html/characters.html` — the two "use Trace on the …" hints
- `js/characters.js` — the kanji modal's two hand-off links
- `js/writing.js` — the `#q=` forward, and a comment about it
- `js/dictionary.js` — the `window.LearneJPDict` surface, `lookUpWord()`, the
  sentence-mode guard, the ready event, and comments that named the old page
- `css/style.css` — the `Sentence mode` section, plus `.solo-page` for a single
  panel filling the shell
- `sitemap.xml` — the new URL
- `README.md`, `OPTIMIZATION-NOTES.md` — kept honest

## Layout note

Both pages use `<section class="side-panel full-width solo-page">` with the
content directly inside — no inner `.split-panel`, since there is nothing to
split. `.split-page` and `.split-panel` are left in the stylesheet untouched in
case another page wants them.

On phones the app shell unlocks and the whole document scrolls, which leaves
`flex: 1` children with no height to grow into. `.solo-page` gives them their
size back: the canvas takes `min(60vh, 460px)` — more than it had when the
dictionary sat under it — and the results list runs its natural length instead
of scrolling inside a short box. The sentence reading strip stays sticky either
way; on desktop it pins inside the results column, on a phone to the viewport.

## Checks run

- 26 wiring assertions against a DOM shim: tab switching, debounce, rendering,
  escaping, empty and oversized input, chip-to-card links
- 6 hash cases against the real `readTraceHash()`: `#trace=`, `#q=`,
  pre-encoded, and empty
- Every internal `href`/`src` across all pages resolves to a file that exists
- Every element ID each script asks for is present on the pages that load it,
  and neither page carries the other's markup

## Parser tuning

Unchanged from the last package. The constants near the top of
`js/sentence.js` (`STEP_COST`, `COMMON_BONUS`, `TE_PENALTY`, `AUX_BONUS`,
`REASON_PENALTY`, …) control how the segmenter weighs one reading against
another, and `window.SentenceLookup.candidates('食べさせられませんでした')` is
exposed in the console for poking at it.
