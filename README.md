<div align="center">

# LearneJP

**Learn Japanese by practice — write kanji, look up words, and drill for the JLPT, all in one place.**

[![Deploy to GitHub Pages](https://github.com/clmpnn/LearneJP/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/clmpnn/LearneJP/actions/workflows/deploy-pages.yml)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

[**Open the app →**](https://clmpnn.github.io/LearneJP/)

</div>

---

## What it does

- **A path from zero** — sixty stages, 237 lessons, every Japanese word shown with its romaji; each stage teaches the idea, then sends you to the tool that drills it
- **Writing practice** — trace any kana or kanji with numbered stroke order, replay the strokes, zoom and pan
- **Dictionary** — search by kanji, kana, or English, built in from JMdict; or paste a whole sentence and get every word in it looked up, conjugations and all
- **Kana & kanji reference** — hiragana and katakana charts with audio, plus every JLPT kanji with meanings, readings, and stroke counts
- **JLPT practice** — grammar, vocabulary, kanji, reading, and listening for N5 through N1, in order or weighted by how you've been performing
- **Add your own** — write new questions, attach audio or images, export the updated set

Everything runs in the browser. No account, no server; your answer history stays in your own browser storage.

> On a touch screen, hold the drawing canvas with two fingers and drag to move it.

## Run it locally

No build step, no dependencies.

```bash
git clone https://github.com/clmpnn/LearneJP.git
cd LearneJP
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

Data loads from `<script>` tags rather than `fetch()`, so most of the app also
works opened straight from disk — but serve over HTTP to test what visitors
actually get.

## How it's laid out

```
index.html            redirect into html/ (GitHub Pages serves this at the site root)
404.html              custom not-found page — must stay at the root to work
html/                 the seven real pages
css/style.css         all styling, driven by custom properties in :root
js/*.js               page logic
js/*-data.js          generated data (dictionary, kanji, stroke order, questions)
audio/, images/       JLPT listening material, by level
docs/NOTES.md         decisions and traps worth knowing before changing things
```

The `js/*-data.js` files are generated — regenerate them from their sources
rather than hand-editing.

**Read [`docs/NOTES.md`](docs/NOTES.md) before restructuring anything.** It
covers why `html/` can't be flattened into the root, why `practice-data.json`
isn't the duplicate it looks like, and what the sentence parser is known to get
wrong.

## Deployment

Every push to `main` publishes to <https://clmpnn.github.io/LearneJP/> through
GitHub Actions. Enable it once under **Settings → Pages → Build and deployment →
Source → GitHub Actions**.

The site is served from `/LearneJP/`, not a domain root, so asset paths stay
relative (`../css/style.css`, never `/css/style.css`). `404.html` is the one
deliberate exception — it uses absolute paths because it can be served at any
URL depth.

`audio/` is 231 MB of the artifact and never changes. Setting the `AUDIO_BASE`
repository variable leaves it out and points the player elsewhere, taking the
deploy from 258 MB to about 27 MB; the workflow comments explain the switch.

## Contributing

Issues and pull requests welcome. Most useful: corrections to kanji readings or
question answers, new practice questions, accessibility fixes.

If you're correcting Japanese data, please include a source. Readings and nuance
are easy to get subtly wrong.

## License

LearneJP is free software: you can redistribute it and modify it under the terms
of the **GNU General Public License v3.0 or later** as published by the Free
Software Foundation.

This program is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE. See [LICENSE](./LICENSE) for details.

Copyright © 2026 Claudia Mithesa Peranginangin

## Data sources

The bundled data carries its own licenses, separate from the GPL that covers this code:

| Data | Source | License |
| --- | --- | --- |
| Dictionary entries | [JMdict](https://www.edrdg.org/jmdict/j_jmdict.html) (EDRDG) | CC BY-SA 4.0 |
| Kanji readings and meanings | [KANJIDIC2](https://www.edrdg.org/wiki/index.php/KANJIDIC_Project) (EDRDG) | CC BY-SA 4.0 |
| Stroke order paths | [KanjiVG](https://kanjivg.tagaini.net) | CC BY-SA 3.0 |

JLPT level groupings follow the widely used unofficial post-2010 lists.

## Contact

clmpnn@gmail.com · [GitHub](https://github.com/clmpnn) · [LinkedIn](https://www.linkedin.com/in/clmpnn)
