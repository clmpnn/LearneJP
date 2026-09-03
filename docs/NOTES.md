# Engineering notes

Decisions that are not obvious from the code, and traps worth knowing before
changing things. Most of the reasoning lives next to what it explains — see
[Where the rest is](#where-the-rest-is) at the bottom.

## Don't flatten `html/` into the root

The obvious tidy-up is to move the pages up a level and delete the meta-refresh
in `index.html`. Don't.

The practice data hardcodes relative media paths — 925 `../audio/…` and 921
`../images/…` in `js/practice-data.js`, plus another 894 in
`practice-data.json`. The Add page writes new ones in the same form, so every
question set a user has already exported uses them too. Moving the pages breaks
all of them at once, silently: the page still loads, the clip just never plays.

The redirect costs one request on first load. Each page carries a
`<link rel="canonical">` so search engines index the real URL rather than
guessing from the redirect.

## `practice-data.json` is a fallback, not a duplicate

It looks like a 2.2 MB copy of `js/practice-data.js`, and it nearly got deleted
on that basis. Both `js/practice.js` and `js/add.js` fall back to fetching it
when `window.PRACTICE_DATA` fails to load. It has been dropped from a deploy
once already — that is why the workflow's **Check what was staged** step asserts
its presence.

## Sentence parser: known misreads

`js/sentence.js` segments without word-frequency data, because the common-words
JMdict build doesn't carry any. Where two readings both explain a span, it has
no way to rank them:

| Input | Read as | Should be |
| --- | --- | --- |
| `家にいようと思う` | 用途 | いよう + と |
| `今日はいい天気` | こんにちは | 今日 + は |
| `弾く` | はじく | ひく |

Names are out of scope for the same reason — 田中 comes apart into 田 + 中.
Fixing any of these properly needs frequency data, not more rules.

## Japanese type has a size floor

Nothing holding Japanese renders below 12.8px. Dense kanji carry roughly 1.8×
the ink of kana at the same size, and coverage climbs steeply below 0.78rem as
the counters close up — 謙 alone has fourteen enclosed spaces to lose. The
reason the font stack is what it is, and why Japanese is never bold, is
commented in `css/style.css`.

## Open: lazy-load the dictionary

`html/dictionary.html` loads `js/dictionary-data.js` (2.4 MB) eagerly. Deferring
it until the search box is first focused is about a dozen lines and keeps the
`file://` behaviour the rest of the site is built around. Converting the data
files to fetched JSON would cache better but breaks `file://`, which is a
deliberate design goal — see the comments in `js/practice.js`.

## Where the rest is

| Question | Answer lives in |
| --- | --- |
| Why 教科書体, why Japanese is never bold, why the two font stacks | `css/style.css`, `:root` |
| Why the deploy stages `_site` by exclusion, and what `AUDIO_BASE` does | `.github/workflows/deploy-pages.yml` |
| Why there are no Git LFS rules | `.gitattributes` |
| Why the audio is not over-encoded (it averages 39 kbps VBR) | `tools/shrink-audio.py` docstring |
| Why `404.html` sits at the root with absolute links | `404.html` |
| How deinflection, segmentation and reading work | `js/sentence.js` header |
