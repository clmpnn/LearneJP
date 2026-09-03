# Sentence mode — what to copy where

Four files. Drop them into your LearneJP checkout, keeping the folder
structure, and overwrite when asked.

```
js/sentence.js        NEW    the whole feature
js/dictionary.js      EDITED three small changes, listed below
html/writing.html     EDITED the Word / Sentence tabs and the textarea
css/style.css         EDITED one new section appended before the mobile block
```

In PowerShell, from the folder this note sits in:

```powershell
$dest = "$HOME\OneDrive\Projects\LearneJP"   # adjust to your path
Copy-Item js\*.js    "$dest\js\"    -Force
Copy-Item html\*.html "$dest\html\" -Force
Copy-Item css\*.css  "$dest\css\"   -Force
```

Then open `html/writing.html`. It works straight from disk — nothing is
fetched, and the parser runs against the JMdict array already loaded by
`js/dictionary-data.js`.

To check it quickly, paste this into the Sentence tab:

```
昨日は友達と映画を見に行きました。とても面白かったです。
```

## What changed in the three edited files

**`html/writing.html`**

- A `.tab-toggle` with `#modeWordBtn` / `#modeSentenceBtn` above the search box.
  The existing `#searchInput` now sits inside `#wordMode`.
- A `#sentenceMode` panel with the textarea, a Break down button, and Clear.
- `<script defer src="../js/sentence.js">` after the tag for `dictionary.js`.
- The `description` and `og:description` meta tags mention the new mode.

**`js/dictionary.js`**

- `window.LearneJPDict` — the loaded entries, `toMora`, `escapeHtml`, and the
  ready flag, so `sentence.js` never reaches into the file's internals.
- `lookUpWord(term)` — one way in for anything that wants the word search to
  show a term. The `writing.html#q=…` hand-off from the kanji reference now
  routes through it, so sentence mode steps aside when a hand-off arrives.
- `runSearch()` returns early while sentence mode owns `#results`, and
  `onDictionaryReady()` fires a `learnejp:dictionary-ready` event.

Nothing else in the file moved. The search, scoring, romaji and hand-off logic
are untouched.

**`css/style.css`**

One new section, `Sentence mode`, inserted directly above the existing
`Small screens` block at the end of the file. It adds only new class names
(`.dict-modes`, `.sentence-strip`, `.sent-token`, `.sent-origin`,
`.sent-reason`, and friends) — no existing rule was edited. The tabs reuse
`.tab-btn` from the practice page, and the word cards reuse `.result-card`,
`.mora-row` and `.result-tag` from word mode.

## Tuning the parser

The constants near the top of `js/sentence.js` are where the segmenter's
judgement lives:

| Constant | Does what |
|---|---|
| `WORD_COST`, `UNKNOWN_COST` | how hard it tries to explain every character |
| `STEP_COST` | how much each deinflection step counts against a reading |
| `SHORT_COST` | discourages splitting into single characters |
| `COMMON_BONUS` | rewards forms JMdict flags as common |
| `TE_PENALTY` | keeps ~て from being treated as a headword |
| `STEM_PENALTY` | how much to trust a bare masu-stem (見に行く) |
| `KANA_PENALTY` | a word usually written in kanji, spelled out in kana |
| `AUX_BONUS` | trusts ~ている and the other て-form chains |
| `REASON_PENALTY` | reins in loose rules, mainly the godan imperative |

Raising a penalty makes that reading rarer; raising `AUX_BONUS` or
`COMMON_BONUS` makes those readings win more often. `window.SentenceLookup`
is exposed in the console for poking at it:

```js
SentenceLookup.candidates('食べさせられませんでした')
SentenceLookup.analyze('日本語を勉強しています。')
```

## Known misreads

Both need word-frequency data to fix properly, which the common-words JMdict
build doesn't carry:

- `家にいようと思う` — `ようと` is read as 用途 rather than いよう + と.
- `今日はいい天気` — `今日は` is read as the greeting こんにちは.
- 弾く picks はじく over ひく. Same cause: two entries, no way to rank them.

Names are also out of scope — 田中 comes apart into 田 + 中, since JMdict's
common-words edition has no name dictionary.

## Porting to LearneKR

The segmenter and the ranking transfer as-is; the rule tables do not. Korean
is spaced, so the minimum-cost split only has to run inside an eojeol, but the
deinflection tables would have to be rewritten for verb and adjective endings
(-아/어요, -았/었-, -(으)ㄹ, honorific -시-) and for irregular stems, and the
reading strip becomes a romanisation strip instead of a furigana one.
