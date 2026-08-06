# The full workflow, optimized for Pages

`.github/workflows/deploy-pages.yml` complete, plus `tools/minify-data.js`.
Copy both.

## What each part does

**1. `paths-ignore`** — a 260 MB site should not rebuild because a README
changed. Those paths are excluded from the artifact anyway, so a push touching
only them has nothing to publish.

**2. `timeout-minutes: 40`** — the publish step waits up to 20 minutes; this
stops a wedged job burning runner time for hours beyond that.

**3. Staging by exclusion** — deploy everything except what is not the website.
The old include list silently dropped `practice-data.json`, which is the
fallback `practice.js` uses when the bundled data fails to load. An exclude list
fails the safe direction, and anything you add in future deploys without being
told.

**4. `AUDIO_BASE`** — one repository variable takes `audio/` out of the artifact:
1,895 files and 258 MB becomes 968 files and 26 MB. Unset, nothing changes.

**5. Minifying the data payloads** — new. These are generated JSON wrapped in one
assignment, and several are pretty-printed:

| File | Before | After | |
| --- | --- | --- | --- |
| `js/practice-data.js` | 2.17 MB | 1.50 MB | **31%** |
| `practice-data.json` | 2.16 MB | 1.49 MB | **31%** |
| `js/learn-course.js` | 0.35 MB | 0.25 MB | **27%** |
| the rest | — | — | already compact |

**1.4 MB saved per visitor and per deploy.** The 31% on `practice-data.js`
matters most: it is the main payload of the practice page, and it was a third
whitespace.

Only the staged copy is minified — the repository keeps its readable files. Each
file is re-read after writing and compared against the original, and a mismatch
fails the build. A minifier that quietly drops data is worse than none. The GPL
notice is preserved as a two-line banner, since stripping it would be a
licensing problem rather than an optimization.

`js/dictionary-data.js` and `js/stroke-data.js` are already compact and come out
unchanged, which is the honest result rather than a padded one.

**6. Verification** — 16 paths that must be present, five that must not be
published, the audio invariant both ways, and now a check that the minifier
actually ran.

## Two bugs the testing caught

Worth naming because both would have shipped:

- **`require()` on a relative path.** `tools/minify-data.js` loaded the staged
  file to verify it, and the workflow passes `_site` relatively — which `require`
  treats as a module name, not a path. It worked when I tested with an absolute
  directory and failed the moment I ran it the way the workflow does. It resolves
  the path first now.
- **Half-minified output.** Because the crash came after the first file was
  written, `practice-data.js` was minified and the other seven were not, and my
  size check still passed. The check now runs as its own step after the
  minifier, which exits non-zero on any failure.

## What is deliberately not here

- **Pre-compressing with gzip or brotli.** GitHub Pages compresses text on the
  fly and does not serve `.gz` files as encodings, so it would add weight.
- **Cache headers.** Pages sets its own and does not let you configure them.
- **Re-encoding audio.** Measured earlier: the clips are variable bitrate and
  already average 39 kbps, so 48 kbps saves 2%. Not worth the quality.
- **Minifying the code files.** Only single-assignment data files are touched.
  A broken page is not worth 20 KB.

## Result

```
AUDIO_BASE unset   1,895 files   258 MB   checks pass
AUDIO_BASE set       968 files    26 MB   checks pass
```

Both run end to end here, including the minifier and every assertion.
