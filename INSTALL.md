# Installing these files

Every file here is complete and final. Copy the whole tree over your repository
root, overwriting what's there. No scripts to run.

```bash
cp -r LearneJP-final/. /path/to/LearneJP/
```

## Then delete two files by hand

A zip can add and replace files but not remove them, and two files need to go:

```bash
git rm js/index.js        # IDE scaffold — console.log('Happy developing ✨'), loaded by nothing
git rm html/404.html      # replaced by 404.html at the repo root, where Pages can actually find it
git rm -r --cached .idea  # stop tracking JetBrains settings (now in .gitignore)
```

Leaving `html/404.html` in place is harmless but pointless — GitHub Pages only
reads a custom 404 from the site root.

## What's in here

**New — the Keigo page**

| File | |
| --- | --- |
| `html/keigo.html` | the page |
| `js/keigo-data.js` | all content: 5 categories, 29 verbs, 11 patterns, 39 phrases, 24 error pairs, 25 quiz questions |
| `js/keigo.js` | rendering, tabs, search, quiz, speech |
| `css/keigo.css` | page-specific styles, loaded only here |

**Modified**

| File | What changed |
| --- | --- |
| `html/index.html` `writing.html` `characters.html` `practice.html` `add.html` | Keigo nav link, GPL notice, canonical + Open Graph, favicon and manifest links, license/source footer; Klee One font request dropped from the three pages that never rendered it |
| `index.html` (root) | GPL notice |
| `css/style.css` | GPL notice |
| `js/dictionary-data.js` `stroke-data.js` `kanji-data.js` `practice-data.js` | GPL notice (7 lines at the top; content untouched) |
| `css/style.css` | new Japanese font system — see `FONT-NOTES.md` |
| `js/writing.js` | canvas tracing guide uses the textbook font stack |

**New — repository and Pages setup**

`404.html` · `.gitignore` · `.gitattributes` · `robots.txt` · `sitemap.xml` ·
`site.webmanifest` · `.github/workflows/deploy-pages.yml` · `README.md` ·
`OPTIMIZATION-NOTES.md` · `FONT-NOTES.md`

## Not included, because nothing changed

`LICENSE`, `favicon.svg`, `practice-data.json`, `audio/`, `images/`, and
`js/add.js`, `characters.js`, `dictionary.js`, `practice.js` — those already
carried correct GPL notices and needed no other change.

## Last step

**Settings → Pages → Build and deployment → Source → GitHub Actions.**

Then check that <https://clmpnn.github.io/LearneJP/nonexistent> shows your own
404 page rather than GitHub's.
