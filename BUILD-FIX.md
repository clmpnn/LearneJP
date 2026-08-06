# Clearing the Node 20 deprecation warning

Copy one file:

```powershell
Copy-Item .github\workflows\deploy-pages.yml "$HOME\OneDrive\Projects\LearneJP\.github\workflows\" -Force
```

## What the message meant

It is a warning, not a failure — the runner already forced both actions onto
Node 24 and your build ran. But it is not purely cosmetic either: Node 20 actions
were due to stop being accepted from June 2026, so you are running on a
compatibility shim rather than on supported ground.

Two actions were named:

| Named | Where it came from |
| --- | --- |
| `actions/checkout@v4` | directly in your workflow |
| `actions/upload-artifact@v4` | **not yours** — `upload-pages-artifact@v3` uses it internally |

The second is why you could not find it in your own file.

## The bumps

| Was | Now | Why |
| --- | --- | --- |
| `actions/checkout@v4` | `@v5` | v5 is the release that moved to node24 |
| `actions/upload-pages-artifact@v3` | `@v5` | v5 uses `upload-artifact` v7, which is node24 |
| `actions/configure-pages@v5` | unchanged | not named in the warning |
| `actions/deploy-pages@v5` | unchanged | not named in the warning |

`actions/checkout@v6` exists and is fine here too — it differs only in where it
persists credentials, which a plain shallow checkout with no container actions
does not care about. v5 is the smaller step that clears the warning, so that is
what I used.

## The trap in that second bump

`upload-pages-artifact@v4` made a breaking change that is easy to walk into:
**hidden files, specifically dotfiles, are no longer included in the artifact.**

Your repository has `.nojekyll` at the root. Going from v3 straight to v5 would
have dropped it, and nothing would have failed — the site would build and deploy
and look fine, until Jekyll started processing files it should not. The kind of
break you find weeks later.

v5 added an input for it, which the new workflow sets:

```yaml
      - uses: actions/upload-pages-artifact@v5
        with:
          path: _site
          include-hidden-files: true
```

If you ever add another dotfile the site needs, it is already covered.

## Still worth checking

This does not touch the slow-deploy problem from before. `audio/` is still 231 MB
being re-uploaded on every push, and the deploy timeout is still set to 20
minutes because of it. The `window.AUDIO_BASE` hook is in `js/practice.js`
whenever you want to move those files off the artifact.
