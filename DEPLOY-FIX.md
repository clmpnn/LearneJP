# Why the Pages deploy is slow, and what to do

Your log stops at `Created deployment for …`, which is where `deploy-pages`
starts polling. The next lines decide what you are looking at, so read them
before changing anything:

| What repeats | What it is |
| --- | --- |
| `Current status: syncing_files` | Working. It is publishing your payload — expect minutes at this size. |
| `Current status: deployment_queued`, forever | Stuck on GitHub's side, not yours. |
| `Error: Timeout reached, aborting!` at ~10 min | The default timeout fired mid-publish. |

## First, rule out the stuck case

If it never leaves `deployment_queued` and then times out, the artifact size is
irrelevant — the deployment was never picked up. Check the repo's Pages state:

```
gh api repos/clmpnn/LearneJP/pages
```

If `"status"` comes back `errored`, or `.../pages/builds/latest` is stuck
`building` on a commit that is no longer your HEAD, re-apply the Pages source
and push again — that is the documented fix for this failure mode. Also confirm
**Settings → Pages → Source** is set to **GitHub Actions**, not "Deploy from a
branch": with the branch setting, `deploy-pages` creates a deployment that
nothing ever consumes, and you get exactly this hang.

## If it is genuinely just slow, here is why

I measured the repository:

| | |
| --- | --- |
| Total | **260 MB, 1,904 files** |
| `audio/` | 231 MB, 927 files |
| `images/` | 17 MB, 931 files |
| `js/` | 7.8 MB |
| everything else | ~4 MB |

Your workflow uploads `path: '.'` — the whole repository, including
`optimize.py`, `add-keigo.py`, the developer notes and a 2.2 MB duplicate of the
practice data. All of that is re-uploaded, re-downloaded and re-published on
every single push, even when you changed one line of CSS.

## What I tried that does not work

My first instinct was that the audio was over-encoded, and the MP3 frame headers
agreed: 526 files reporting 96–320 kbps, apparently 100 MB of waste. **That was
wrong.** The files are variable bitrate, so the header describes the opening
frame and not the file. Measured properly with ffprobe, the audio averages
**39 kbps** — 231 MB really is what 13.7 hours of speech costs.

Re-encoding at 48 kbps saves 2%. `tools/shrink-audio.py` is included with the
measurement built into its docstring, defaulting to 32 kbps (saves 43 MB) and
supporting 24 kbps (saves 90 MB) — but both are audible losses on material where
straining to catch a particle is the exercise. I would not do it.

## What actually helps

**1. Raise the timeout.** Included in the new workflow: 20 minutes instead of
10. This does not make it faster, it stops a slow publish being reported as a
failure.

**2. Stage the site instead of uploading the repo.** Also included. It drops the
scripts, notes and duplicate data from your public site. Be clear-eyed about the
size though — 260 MB → 258 MB, because audio dominates. This is hygiene, not
speed.

**3. Move the audio out of the artifact.** This is the only real fix, and it
takes the deploy from 258 MB to about 27 MB — roughly ten times faster, on every
push forever. `js/practice.js` now reads an optional `window.AUDIO_BASE`, so the
change is one line in `html/practice.html` rather than a rewrite of the data:

```html
<script>window.AUDIO_BASE = 'https://cdn.jsdelivr.net/gh/clmpnn/LearneJP-audio@main';</script>
```

Put `audio/` in a second repository, or a release, or any static host. Unset, it
behaves exactly as it does today, so you can move the files first and flip the
switch afterwards.

## Files

- `.github/workflows/deploy-pages.yml` — stages `_site`, 20-minute timeout, `deploy-pages@v5`
- `js/practice.js` — optional `window.AUDIO_BASE`
- `tools/shrink-audio.py` — measured, and honest about being a bad trade

One caveat on the staging step: it copies `sitemap.xml` and `LICENSE` with
`|| true`, so a missing file will not fail the build. If you add a top-level
file to the site, add it to that `cp` line or it will silently not deploy.
