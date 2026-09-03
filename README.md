<div align="center">

# LearneJP

**Learn Japanese by practice — write kanji, look up words, and drill for the JLPT, all in one place.**

[![Deploy to GitHub Pages](https://github.com/clmpnn/LearneJP/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/clmpnn/LearneJP/actions/workflows/deploy-pages.yml)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

[**Open the app →**](https://clmpnn.github.io/LearneJP/)

</div>

---

## What it does

- **A path from zero** — a forty-two-stage course, 170 lessons, every Japanese word shown with its romaji, for anyone who has never studied Japanese; each stage teaches the idea then sends you to the tool that drills it
- **Writing practice** — trace any kana or kanji with numbered stroke order, replay the strokes, zoom and pan the canvas
- **Japanese dictionary** — search by kanji, kana, or English, built in from JMdict, or paste a whole sentence and get every word in it looked up, conjugations and all
- **Kana & kanji reference** — full hiragana and katakana charts with audio, plus every JLPT kanji with meanings, readings, and stroke counts
- **JLPT practice** — grammar, vocabulary, kanji, reading, and listening questions for N5 through N1, in order or weighted by how you've been performing
- **Add your own** — write new questions, attach audio or images, and export the updated question set

Everything runs in the browser. No account, no server, and your answer history stays in your own browser storage.

> On a touch screen, hold the drawing canvas with two fingers and drag to move it.

## Run it locally

No build step and no dependencies.

```bash
git clone https://github.com/clmpnn/LearneJP.git
cd LearneJP
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

The writing and practice pages load their data from `<script>` tags rather than `fetch()`, so most of the app also works when opened directly from disk. Serving over HTTP is still the way to test what visitors will actually get.

## How it's laid out

```
index.html            redirect into html/ (GitHub Pages serves this at the site root)
404.html              custom not-found page — must stay at the root to work
html/                 the seven real pages
css/style.css         all styling, driven by custom properties in :root
js/*.js               page logic
js/*-data.js          generated data (dictionary, kanji, stroke order, questions)
audio/, images/       JLPT listening material, by level
```

The `js/*-data.js` files are generated. Don't hand-edit them — regenerate them from their sources instead.

## Deployment

Every push to `main` publishes to <https://clmpnn.github.io/LearneJP/> through GitHub Actions. Enable it once under **Settings → Pages → Build and deployment → Source → GitHub Actions**.

Because the site is served from `/LearneJP/` rather than a domain root, asset paths have to stay relative (`../css/style.css`, not `/css/style.css`). The one deliberate exception is `404.html`, which uses absolute paths since it can be served at any URL depth.

## Contributing

Issues and pull requests are welcome. Useful contributions: corrections to kanji readings or question answers, new practice questions, and accessibility fixes.

If you're correcting Japanese data, please include a source for the correction. Readings and nuance are easy to get subtly wrong.

## License

LearneJP is free software: you can redistribute it and modify it under the terms of the **GNU General Public License v3.0 or later** as published by the Free Software Foundation.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See [LICENSE](./LICENSE) for details.

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
