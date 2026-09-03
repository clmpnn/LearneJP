# It is deploying — read the status line

```
Current status: deployment_in_progress
```

That is the working state. GitHub has accepted your artifact and is publishing
it. The state to worry about was `deployment_queued` repeating forever, which is
what a misconfigured Pages source produces — that possibility is now ruled out,
because a queued deployment never reaches `in_progress`.

So nothing is broken. It is slow, which is what 258 MB across 1,893 files costs.

## What to watch for

| What you see | What it means |
| --- | --- |
| `deployment_in_progress`, then the job goes green | Done. Give it a few minutes. |
| `Error: Timeout reached, aborting!` | The publish was **cancelled**, and your site stays on the previous version. |

That second row is the one worth knowing. A timeout is not just a red tick — the
action calls `Canceling Pages deployment` on its way out, so the deploy is
abandoned rather than finished in the background. Your timeout is now 20 minutes
rather than 10, which should be ample, but if you ever see it fire, the site did
not update.

## The size fix, now a single switch

`audio/` is 231 MB of the 258 MB, and it never changes — yet it is re-uploaded
and re-published on every push, even when you edited one line of CSS.

Three files now make that flippable without editing any code:

- `js/audio-base.js` — new, empty by default
- `html/practice.html` — loads it before `practice.js`
- `.github/workflows/deploy-pages.yml` — reads an `AUDIO_BASE` repository variable

**Unset, everything behaves exactly as it does today.** Set it, and the workflow
writes the base into `audio-base.js` and leaves `audio/` out of the artifact:

```
AUDIO_BASE unset  →  1,893 files   258 MB
AUDIO_BASE set    →    967 files    25 MB
```

Ten times smaller, on every push, forever.

## Flipping it

1. Create a second repository — `clmpnn/LearneJP-audio` — and put `audio/` in it,
   keeping the directory name so the paths still line up.
2. Enable Pages on it. It publishes once, slowly, and then essentially never
   again, because the clips do not change.
3. In `LearneJP`, go to **Settings → Secrets and variables → Actions →
   Variables** and add:

   ```
   AUDIO_BASE = https://clmpnn.github.io/LearneJP-audio
   ```

4. Push anything. The staging step will print `audio served from …, not bundled`.

A trailing slash is fine either way — `practice.js` strips it.

I suggested a second GitHub Pages site rather than a CDN deliberately. jsDelivr
would work and be faster, but 231 MB of audio is not what a free package CDN is
for, and their acceptable use says so. A second Pages site is infrastructure you
already have, with no third party to depend on.

## Order matters

Move the files and enable Pages on the audio repo **first**, then set the
variable. Setting it before the files are reachable would deploy a site whose
listening questions point at nothing. Nothing else on the site is affected —
only `practice.js` reads `AUDIO_BASE`.
