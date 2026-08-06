# Why this font

## The problem with print faces

Japanese print fonts and Japanese handwriting disagree about the shape of
several characters. The disagreement is invisible to a fluent reader and
actively misleading to a learner.

| Character | Gothic / Mincho print form | Handwritten form |
| --- | --- | --- |
| き | lower stroke joined to the one above | separate — four strokes |
| さ | lower stroke joined | separate — three strokes |
| ふ | often fused into two marks | four distinct strokes |
| り | two strokes frequently joined | separate |
| 令 | bottom drawn as 龴 | bottom drawn as マ + 卩 |
| 糸 | top drawn as 幺 with a flat join | angled, with a visible break |

Someone copying the printed shape of き learns three strokes for a
four-stroke character, and writes it wrong from then on. This is not a fringe
concern — it is the reason the Japanese school system does not print textbooks
in gothic.

## 教科書体

**教科書体** (kyōkasho-tai, "textbook style") exists to solve exactly this. It
renders the kaisho forms a hand actually produces: stroke entries and exits,
separations where separations belong, and the angle at which a brush or pen
would leave the paper. It is what every Japanese primary-school textbook is set
in.

For a site whose whole purpose is writing practice, this is not a stylistic
preference. It is the difference between a reference that teaches the right
shape and one that teaches the wrong one.

It also makes the app internally consistent. The tracing canvas draws KanjiVG
stroke paths, which are drawn to handwritten forms. Setting the surrounding
characters in a gothic face meant the printed 令 in the kanji grid disagreed
with the 令 the canvas asked you to trace.

## The stack

```css
--font-jp-study: "UD デジタル教科書体 N-R", "UD Digi Kyokasho N-R",
                 "YuKyokasho", "Yu Kyokasho", "Klee One",
                 "Hiragino Mincho ProN", serif;
```

One family, one weight. There is no bold companion — see below.

**Local textbook faces first.** Windows 10 and 11 ship UD デジタル教科書体, a
kyōkasho face developed by Morisawa against readability research, including work
on readers with dyslexia and low vision. Where it is installed it is the better
face and it costs nothing — and because a browser only downloads a webfont it
actually needs, those users never fetch Klee One at all.

**Klee One for everyone else.** A pen-kaisho face by Fontworks, on Google Fonts
under the SIL Open Font License, so it is GPL-compatible for redistribution. It
was already in the project as `--font-handwriting`; this change promotes it from
a decorative accent to the primary face for anything the learner is meant to
read in order to write.

## Japanese is never bold

Not anywhere, at any size. A synthesised bold thickens stroke junctions, which
is precisely the detail kyōkasho exists to keep clear — but a *real* bold kaisho
cut does much the same thing, just more tidily. Either way the separations that
distinguish き from a three-stroke shape start closing up, and those separations
are the whole reason for using this face.

So emphasis is carried by size and colour instead. Twenty rules state
`font-weight: 400` explicitly rather than relying on inheritance, and a
belt-and-braces rule backs them up:

```css
[lang="ja"] { font-weight: 400; }
```

Three places needed markup changes rather than CSS, because they mixed scripts
inside one bold element: the page heading (`Keigo 敬語`), the quiz verdict
(`正解 — correct`), and the verb table's `<th>` cells, which inherit the
browser's default bold. In the first two the Japanese moved into its own
`lang="ja"` span so the English label can stay bold; the table header dropped to
normal weight, since its tinted background already separates the row.

One useful side effect: Klee One is now requested at weight 400 only, halving
what a visitor downloads.

## A second stack for UI

```css
--font-jp-ui: "Hiragino Sans", "Hiragino Kaku Gothic ProN", "BIZ UDPGothic",
              "Yu Gothic Medium", "Yu Gothic", "Noto Sans JP", "Meiryo",
              sans-serif;
```

Kaisho is the right face for a character shown at 4rem. It is the wrong face for
a 0.75rem note, where a gothic is simply easier to read. So UI chrome and dense
text get a system gothic — no download, since every platform ships one.

There is a second reason to name these explicitly. `Poppins` contains no
Japanese glyphs, so before this change every Japanese character in body text
fell through to the browser's generic `sans-serif`. On a system whose fontconfig
resolves that to a Chinese font, Han unification renders kanji with **Chinese**
glyph shapes — 直, 骨 and 令 all differ visibly between Japanese and Simplified
Chinese conventions. Naming a Japanese face closes that hole. The `lang="ja"`
attributes already on the markup help browsers make the same choice.

## Where each is used

| | Face |
| --- | --- |
| Kana chart cells, kanji grid tiles, kanji modal | study |
| Dictionary headwords, trace selector and input | study |
| Quiz questions, answer buttons, reading passages | study |
| Keigo examples, verb table forms, phrase lines | study |
| Canvas tracing guide glyph (`writing.js`) | study |
| Everything else — labels, notes, navigation, English | Poppins → UI gothic |

## Cost

One extra family on five pages. `index.html` has no Japanese text, so it does
not request Klee One at all. Google Fonts splits Japanese faces into unicode
range subsets, so a browser fetches only the chunks holding characters actually
on the page, and Windows users with UD デジタル教科書体 fetch nothing.

## If you want to go further

The most complete option is licensing a commercial kyōkasho face — Morisawa's
UD Digi Kyokasho or Iwata's — and self-hosting a subset built from the character
set your data actually uses. Your kanji list is fixed and known, so a subset
would be a fraction of a full CJK font. That is a real cost and a licensing
question, and Klee One is good enough that it is not urgent.

## Why kanji still looked heavy after unbolding

Removing bold was necessary but not sufficient. Three separate things were
thickening dense characters, and none of them was font-weight.

**The heading glow.** `--glow-accent` puts a 10px and a 20px orange blur behind
`.side-panel h2`. Around open Latin letterforms that reads as a halo. Around 敬語
it bleeds into the enclosed counters and the character turns into a blot.
`[lang="ja"]` now sets `text-shadow: none`.

**Size.** Measuring ink coverage — the share of the text box that is dark —
shows why small kanji fail:

| size | 謙譲語Ⅰ | あいうえ |
| --- | --- | --- |
| 0.62rem (9.9px) | 0.327 | 0.194 |
| 0.70rem (11.2px) | 0.349 | 0.183 |
| 0.78rem (12.5px) | 0.311 | 0.170 |
| 0.90rem (14.4px) | 0.297 | 0.171 |
| 1.00rem (16px) | 0.290 | 0.172 |

Dense kanji carry roughly 1.8× the ink of kana at the same size, and coverage
climbs steeply below 0.78rem as the counters close up. 謙 alone has fourteen
enclosed spaces to lose. Nothing holding Japanese now renders below 12.8px.

**Subpixel antialiasing.** macOS defaults to it, and it thickens CJK
perceptibly. Japanese text now asks for grayscale AA instead.

Two other changes came out of the same pass. `--font-jp-ui` had
`"Yu Gothic Medium"` sitting ahead of `"Yu Gothic"` — Medium is the heavier cut,
so Windows was getting the wrong one; UD gothics now lead the stack, since they
are drawn for legibility at small sizes. And the humble-tier badge in the verb
table read 謙譲語Ⅰ at 0.62rem, the densest string on the page at the smallest
size on the page. The column header already says 謙譲語, so the badge now carries
just Ⅰ or Ⅱ, with the full term in its tooltip and in a legend above the table.
