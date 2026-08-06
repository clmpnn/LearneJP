#!/usr/bin/env python3
"""
Wire the new Keigo page into the existing site.

Copy html/keigo.html, js/keigo.js, js/keigo-data.js and css/keigo.css into place
first, then run this from the repository root:

    python3 add-keigo.py --dry-run
    python3 add-keigo.py

It adds the nav link to the five existing pages and lists the new page in
sitemap.xml. Safe to run twice. Delete it once the result is committed.
"""

import argparse
import pathlib
import sys

ROOT = pathlib.Path(__file__).resolve().parent
DRY = False
COUNT = 0

PAGES = [
    "html/index.html",
    "html/writing.html",
    "html/characters.html",
    "html/practice.html",
    "html/add.html",
]

# The nav is identical on every page: Keigo slots between the reference pages
# and the practice pages, which is the order a learner moves through them.
NAV_ANCHOR = '<a href="characters.html">Kana &amp; Kanji</a>'
NAV_NEW = NAV_ANCHOR + '\n        <a href="keigo.html">Keigo</a>'

SITEMAP_ANCHOR = """  <url>
    <loc>https://clmpnn.github.io/LearneJP/html/practice.html</loc>"""

SITEMAP_NEW = """  <url>
    <loc>https://clmpnn.github.io/LearneJP/html/keigo.html</loc>
    <lastmod>2026-08-03</lastmod>
    <priority>0.9</priority>
  </url>
""" + SITEMAP_ANCHOR


def log(msg):
    global COUNT
    COUNT += 1
    print(("  would " if DRY else "  ") + msg)


def main():
    global DRY
    ap = argparse.ArgumentParser(description="Add the Keigo page to the site.")
    ap.add_argument("--dry-run", action="store_true", help="report without editing")
    DRY = ap.parse_args().dry_run

    if not (ROOT / "html").is_dir():
        print("Run this from the repository root (the folder holding html/ and js/).")
        return 1

    print("[1] Checking the new files are in place")
    required = ["html/keigo.html", "js/keigo.js", "js/keigo-data.js", "css/keigo.css"]
    missing = [f for f in required if not (ROOT / f).exists()]
    if missing:
        print("  missing: " + ", ".join(missing))
        print("  Copy them in from the bundle first, then re-run.")
        return 1
    for f in required:
        print(f"  found {f}")

    print("\n[2] Adding the nav link")
    for rel in PAGES:
        path = ROOT / rel
        if not path.exists():
            print(f"  skip {rel} — not found")
            continue
        body = path.read_text(encoding="utf-8")
        if 'href="keigo.html"' in body:
            continue
        if NAV_ANCHOR not in body:
            print(f"  skip {rel} — nav markup differs, add the link by hand")
            continue
        if not DRY:
            path.write_text(body.replace(NAV_ANCHOR, NAV_NEW, 1), encoding="utf-8")
        log(f"add Keigo link to {rel}")

    print("\n[3] Listing the page in sitemap.xml")
    sitemap = ROOT / "sitemap.xml"
    if not sitemap.exists():
        print("  skip — no sitemap.xml at the repo root yet")
    else:
        body = sitemap.read_text(encoding="utf-8")
        if "keigo.html" in body:
            print("  already listed")
        elif SITEMAP_ANCHOR not in body:
            print("  skip — sitemap layout differs, add the entry by hand")
        else:
            if not DRY:
                sitemap.write_text(body.replace(SITEMAP_ANCHOR, SITEMAP_NEW, 1), encoding="utf-8")
            log("add keigo.html to sitemap.xml")

    print(f"\n{COUNT} change(s) {'pending' if DRY else 'applied'}.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
