#!/usr/bin/env python3
"""
LearneJP repository optimizer.

Run once from the repository root:

    python3 optimize.py          # apply the changes
    python3 optimize.py --dry-run  # show what would change, touch nothing

Safe to run twice — every edit checks whether it has already been applied.
Delete this file once you've committed the result.
"""

import argparse
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent
DRY = False
CHANGES: list[str] = []

HOLDER = "Claudia Mithesa Peranginangin"
YEAR = "2026"
SITE = "https://clmpnn.github.io/LearneJP"

HTML_HEADER = f"""<!--
  LearneJP — a Japanese (JLPT) study app for writing practice, quizzes, and dictionary lookup
  Copyright (C) {YEAR}  {HOLDER}

  This program is free software: you can redistribute it and/or modify it under
  the terms of the GNU General Public License as published by the Free Software
  Foundation, either version 3 of the License, or (at your option) any later
  version. See <https://www.gnu.org/licenses/>.
-->
"""

CSS_HEADER = f"""/*
 * LearneJP — a Japanese (JLPT) study app for writing practice, quizzes, and dictionary lookup
 * Copyright (C) {YEAR}  {HOLDER}
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option) any later
 * version. See <https://www.gnu.org/licenses/>.
 */
"""

JS_HEADER = f"""// LearneJP — a Japanese (JLPT) study app for writing practice, quizzes, and dictionary lookup
// Copyright (C) {YEAR}  {HOLDER}
//
// This program is free software: you can redistribute it and/or modify it under
// the terms of the GNU General Public License as published by the Free Software
// Foundation, either version 3 of the License, or (at your option) any later
// version. See <https://www.gnu.org/licenses/>.
"""

# Page -> (canonical filename, social title, social description)
PAGES = {
    "html/index.html": (
        "index.html",
        "LearneJP — Learn Japanese by Practice",
        "Write kanji, look up words, and practice for the JLPT, all in one place.",
    ),
    "html/writing.html": (
        "writing.html",
        "LearneJP — Writing & Dictionary",
        "Trace every kana and kanji with stroke order, and search a built-in Japanese dictionary.",
    ),
    "html/characters.html": (
        "characters.html",
        "LearneJP — Kana & Kanji",
        "Hiragana and katakana charts with audio, plus every JLPT kanji with readings and meanings.",
    ),
    "html/practice.html": (
        "practice.html",
        "LearneJP — JLPT Practice",
        "Grammar, vocabulary, kanji, reading and listening questions for N5 through N1.",
    ),
    "html/add.html": (
        "add.html",
        "LearneJP — Add Content",
        "Add your own JLPT practice questions, including listening audio and images.",
    ),
}


def log(msg: str) -> None:
    CHANGES.append(msg)
    print(("  would " if DRY else "  ") + msg)


def read(p: pathlib.Path) -> str:
    return p.read_text(encoding="utf-8")


def write(p: pathlib.Path, text: str) -> None:
    if not DRY:
        p.write_text(text, encoding="utf-8")


# ---------------------------------------------------------------- step 1
def remove_orphans() -> None:
    """js/index.js is an unused IDE scaffold; html/404.html never gets served."""
    print("\n[1] Removing files that do nothing")

    orphan = ROOT / "js/index.js"
    if orphan.exists():
        body = read(orphan)
        if "Happy developing" in body and len(body) < 1200:
            log("delete js/index.js (IDE scaffold, not loaded by any page)")
            if not DRY:
                orphan.unlink()
        else:
            print("  skip js/index.js — it has real code now, review by hand")
    else:
        print("  js/index.js already gone")

    old404 = ROOT / "html/404.html"
    if old404.exists():
        if (ROOT / "404.html").exists():
            log("delete html/404.html (replaced by 404.html at the root)")
            if not DRY:
                old404.unlink()
        else:
            print("  !! html/404.html found but no root 404.html — copy the new one in first")
    else:
        print("  html/404.html already gone")


# ---------------------------------------------------------------- step 2
def add_license_headers() -> None:
    """The GPL asks each source file to carry a notice pointing at the license."""
    print("\n[2] Adding GPL notices to files that lack one")

    targets = [
        *(ROOT / p for p in PAGES),
        ROOT / "index.html",
        ROOT / "css/style.css",
        ROOT / "js/dictionary-data.js",
        ROOT / "js/stroke-data.js",
        ROOT / "js/kanji-data.js",
    ]

    for path in targets:
        if not path.exists():
            print(f"  skip {path.relative_to(ROOT)} — not found")
            continue
        body = read(path)
        if "GNU General Public License" in body[:2000]:
            continue

        rel = path.relative_to(ROOT)
        if path.suffix == ".html":
            m = re.match(r"(<!DOCTYPE html>\s*\n)", body, re.IGNORECASE)
            if not m:
                print(f"  skip {rel} — no <!DOCTYPE html> to anchor to")
                continue
            body = m.group(1) + HTML_HEADER + body[m.end():]
        elif path.suffix == ".css":
            body = CSS_HEADER + body
        else:  # generated .js data files
            body = JS_HEADER + body

        write(path, body)
        log(f"add GPL notice to {rel}")


# ---------------------------------------------------------------- step 3
def add_head_metadata() -> None:
    """Canonical URL, social preview tags, favicon and manifest on every page."""
    print("\n[3] Adding canonical, Open Graph, favicon and manifest links")

    for rel, (fname, title, desc) in PAGES.items():
        path = ROOT / rel
        if not path.exists():
            print(f"  skip {rel} — not found")
            continue
        body = read(path)
        canonical = f"{SITE}/html/{fname}"

        # Favicon — present on three pages, missing on two.
        if 'rel="icon"' not in body:
            body = body.replace(
                '<link rel="stylesheet" href="../css/style.css">',
                '<link rel="icon" type="image/svg+xml" href="../favicon.svg">\n'
                '    <link rel="stylesheet" href="../css/style.css">',
                1,
            )
            log(f"add favicon link to {rel}")

        if 'rel="manifest"' not in body:
            body = body.replace(
                '<link rel="stylesheet" href="../css/style.css">',
                '<link rel="manifest" href="../site.webmanifest">\n'
                '    <link rel="stylesheet" href="../css/style.css">',
                1,
            )
            log(f"add manifest link to {rel}")

        if 'rel="canonical"' not in body:
            block = (
                f'<link rel="canonical" href="{canonical}">\n'
                f'    <meta property="og:type" content="website">\n'
                f'    <meta property="og:site_name" content="LearneJP">\n'
                f'    <meta property="og:title" content="{title}">\n'
                f'    <meta property="og:description" content="{desc}">\n'
                f'    <meta property="og:url" content="{canonical}">\n'
                f'    <meta name="twitter:card" content="summary">\n'
                f'    <link rel="stylesheet" href="../css/style.css">'
            )
            body = body.replace(
                '<link rel="stylesheet" href="../css/style.css">', block, 1
            )
            log(f"add canonical and Open Graph tags to {rel}")

        write(path, body)


# ---------------------------------------------------------------- step 4
def trim_unused_font() -> None:
    """Klee One is a Japanese webfont. Only dictionary results use it."""
    print("\n[4] Dropping the Klee One webfont from pages that don't render it")

    # css/style.css uses --font-handwriting ("Klee One") only in .result-kanji,
    # which is produced by js/dictionary.js — that runs on writing.html alone.
    for rel in ("html/practice.html", "html/characters.html", "html/add.html"):
        path = ROOT / rel
        if not path.exists():
            continue
        body = read(path)
        if "Klee+One" not in body:
            continue

        new = body.replace("family=Klee+One:wght@400;600&", "")
        if new != body:
            write(path, new)
            log(f"remove Klee One request from {rel}")

    # index.html never requested Klee One and doesn't need it — nothing to do.
    idx = ROOT / "html/index.html"
    if idx.exists() and "Klee+One" in read(idx):
        print("  note: html/index.html requests Klee One but has no dictionary results")


# ---------------------------------------------------------------- step 5
def add_source_link() -> None:
    """Software delivered over a network should tell users where the source is."""
    print("\n[5] Adding a source link to each page footer")

    old = "<footer>\n    <p>&copy; LearneJP</p>\n</footer>"
    new = (
        "<footer>\n"
        f"    <p>&copy; {YEAR} {HOLDER} · Free software under the\n"
        '        <a href="https://www.gnu.org/licenses/gpl-3.0.html" rel="license">GNU GPL v3</a> ·\n'
        '        <a href="https://github.com/clmpnn/LearneJP">Source code</a></p>\n'
        "</footer>"
    )

    for rel in PAGES:
        path = ROOT / rel
        if not path.exists():
            continue
        body = read(path)
        if "rel=\"license\"" in body:
            continue
        if old not in body:
            print(f"  skip {rel} — footer markup differs, add the link by hand")
            continue
        write(path, body.replace(old, new, 1))
        log(f"add license and source link to the {rel} footer")


def main() -> int:
    global DRY
    ap = argparse.ArgumentParser(description="Optimize the LearneJP repository.")
    ap.add_argument("--dry-run", action="store_true", help="report without editing")
    DRY = ap.parse_args().dry_run

    if not (ROOT / "js").is_dir() or not (ROOT / "html").is_dir():
        print("Run this from the repository root (the folder holding html/ and js/).")
        return 1

    print(f"LearneJP optimizer — {'DRY RUN, nothing will be written' if DRY else 'applying changes'}")

    remove_orphans()
    add_license_headers()
    add_head_metadata()
    trim_unused_font()
    add_source_link()

    print(f"\n{len(CHANGES)} change(s) {'pending' if DRY else 'applied'}.")
    if not DRY and CHANGES:
        print("Review with: git diff")
    return 0


if __name__ == "__main__":
    sys.exit(main())
