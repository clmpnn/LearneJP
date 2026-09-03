# The course, doubled again

`js/learn-course.js`: **18 stages, 78 lessons, ~8,700 words**. Six new stages,
six new lessons inside existing ones, and 19 more steps into the tools.

```powershell
$dest = "$HOME\OneDrive\Projects\LearneJP"   # adjust to your path
Copy-Item html\learn.html    "$dest\html\" -Force
Copy-Item js\learn-course.js "$dest\js\"   -Force
Copy-Item README.md          "$dest\"      -Force
```

`js/learn.js` and `css/style.css` are unchanged from the last package — the
renderer already handles any number of stages, which is what putting the content
in its own data file bought.

| | First version | Last | Now |
| --- | --- | --- | --- |
| Stages | 8 | 12 | **18** |
| Lessons | 22 | 52 | **78** |
| Words | 2,300 | 5,700 | **8,700** |
| Tables | 11 | 35 | **58** |
| Examples | 18 | 42 | **55** |
| Self-checks | 22 | 52 | **78** |
| Steps | 28 | 42 | **61** |

## Six new stages

**Talking about people** — introducing yourself and why 私は every sentence marks
you as translating; さん, くん, ちゃん, 様, 先生 and never using any of them about
yourself; the uchi–soto line, so your mother is 母 to a colleague and お母さん to
her face; and あげる / くれる / もらう, where English has one verb and Japanese
has three sorted by direction.

**Describing and comparing** — the degree adverbs, including あまり and 全然
demanding a negative ending; comparison with より, のほうが and 一番, since
Japanese has no comparative form at all; 好き taking が rather than を because it
is an adjective; and colours split between い-adjectives and nouns needing の.

**Joining ideas together** — から, ので, けど and が attaching to the end of the
clause rather than the front, so the reason precedes the result; all four
conditionals with the warning that と cannot take a request; 前に, 後で, てから,
とき and the timing shift between 行くとき and 行ったとき; and まだ / もう.

**Out in the world** — shops, restaurants, trains and directions, and what to say
when something goes wrong. The scripts are fixed, so you can take part in them
long before you can converse.

**Writing it down** — 。 and 、 and 「 」, vertical text, typing with an IME
(why ん needs nn and っ comes from doubling), and which script to choose, since
learners over-use kanji and ありがとう is almost never written 有難う.

**Mistakes everyone makes** — wasei-eigo (マンション is a flat, スマート means
slim, コンセント is a power socket), the eight errors that keep coming back in one
table, and how to catch them: parse your own writing, because you read your
intention and a parser only reads your words.

## Six new lessons in existing stages

Getting kana into your head, and why tracing beats a chart. The combinations
katakana invented — ファ, ティ, ヴ, ウェ. How compounds stack, so 電 plus 話 is a
telephone and each new kanji buys more words than the last. And intensive versus
extensive reading, with the point that you cannot look up your way to reading
speed.

## Checks

28 assertions, all passing. All **61** steps point at files that exist; every
hash validates against the destination's real charts, quizzes and levels; every
traced character has stroke data; all six tools are reached; every lesson has
prose and ends with something to answer; every one of the **58** tables has rows
matching its header; all **55** examples are real Japanese; all 78 lessons and
self-checks reach the page; the contents lists every stage; ticking does not tear
down open lessons. The reading, wiring, layout and redirect suites still pass.
