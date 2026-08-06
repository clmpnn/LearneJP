# Nothing to fix in that description — but the step it describes had bugs

What you pasted is an accurate summary of the change, not a bug report. There is
no error in it to correct.

Re-reading the step it describes, though, three real problems turned up. All are
fixed here.

## 1. The include list was silently dropping files

The old step named what to copy:

```bash
cp -r html css js images audio _site/
cp index.html 404.html favicon.svg site.webmanifest robots.txt _site/
cp sitemap.xml LICENSE .nojekyll _site/ 2>/dev/null || true
```

That is the wrong way round. Add a file to the site and it silently does not
deploy — no error, no warning, and the page only breaks for visitors.

It had already happened. **`practice-data.json` was being dropped**, and it is
not the dead duplicate I took it for: `practice.js` and `add.js` both fall back
to fetching it when `window.PRACTICE_DATA` fails to load. So the safety net was
removed from exactly the situation it exists for. `sitemap.xml` only survived
because it happened to be on the third line, behind a `|| true` that would have
hidden its absence anyway.

The step now excludes what is not the website and deploys the rest:

```bash
excludes=( --exclude=./_site --exclude=./.git --exclude=./.github
           --exclude=./tools --exclude=./.gitignore --exclude=./.gitattributes
           --exclude=*.py --exclude=*.md )
tar "${excludes[@]}" -cf - . | tar -xf - -C _site
```

`practice-data.json` and `sitemap.xml` come back on their own, and anything you
add in future deploys without being told to. `tar` rather than `rsync` because
it is guaranteed present on the runner, and it copies dotfiles without being
asked — which `.nojekyll` depends on.

## 2. Nothing checked the result

A mis-staged site deploys perfectly happily and reports success. There is now a
**Check what was staged** step that fails the build instead:

- 16 files and directories that must be present, including `.nojekyll`,
  `practice-data.json`, `js/learn-romaji.js` and each key page
- five that must not be published — `.github`, `tools`, `optimize.py`,
  `add-keigo.py`, `README.md`
- and the audio invariant both ways: bundled when `AUDIO_BASE` is unset, absent
  and replaced by a generated `audio-base.js` when it is set

That last one matters most. Setting `AUDIO_BASE` while the files are unreachable,
or unsetting it without restoring `audio/`, both produce a site where listening
questions silently play nothing.

## 3. The variable went into JavaScript unescaped

`AUDIO_BASE` was interpolated straight into a string literal. A quote in the
value would have produced a syntax error in `audio-base.js` and taken the
practice page down. It is escaped now.

## Verified

I ran the staging logic in both modes:

```
AUDIO_BASE unset   1,895 files   260 MB   checks pass
AUDIO_BASE set       968 files    27 MB   checks pass
```

The unset figure is slightly higher than before because `practice-data.json` is
back where it belongs.

One note on the exclude list: `*.md` drops `README.md`, `INSTALL.md`,
`FONT-NOTES.md` and `OPTIMIZATION-NOTES.md`, which is intended. If you ever want
to publish a markdown file, exclude it more narrowly.
