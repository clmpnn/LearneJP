# The course, four times larger

`js/learn-course.js` grew from 8 stages to **12**, from 22 lessons to **52**, and
from ~2,300 words to **~5,700**. `js/learn.js`, `html/learn.html` and
`css/style.css` changed to carry it.

```powershell
$dest = "$HOME\OneDrive\Projects\LearneJP"   # adjust to your path
Copy-Item html\learn.html "$dest\html\" -Force
Copy-Item js\learn*.js    "$dest\js\"   -Force
Copy-Item css\style.css   "$dest\css\"  -Force
Copy-Item README.md       "$dest\"      -Force
```

| | Before | Now |
| --- | --- | --- |
| Stages | 8 | 12 |
| Lessons | 22 | 52 |
| Tables | 11 | 35 |
| Worked examples | 18 | 42 |
| Self-checks | 22 | 52 |
| Steps into the tools | 28 | 42 |

## Four new stages

**How Japanese sounds** — the thing most courses skip and every learner needs.
Mora timing, and that っ, ん and a long vowel each take a full beat. Devoicing,
so です is heard as *des* and 好き as *ski* — which is why what you hear does not
match what you read, and both are right. Pitch instead of stress, with 雨/飴 and
the 箸/橋/端 set. And the four sounds that need retraining: the ら tap, bilabial
ふ, つ, and ん changing shape before b, p and m.

**Words you can use today** — greetings by time of day, why こんにちは is spelled
with は, the phrases that do not translate (よろしくお願いします, お疲れ様,
すみません doing three jobs), and how はい and いいえ answer the statement rather
than the question, so a negative question flips them.

**Numbers, time and counting** — the 万 grouping that makes 十万 a hundred
thousand, why four, seven and nine each have two readings, the clock's fixed
irregulars (よじ, しちじ, くじ, いっぷん), and the dates that have to be learned
one at a time — ついたち, ふつか, はつか.

**How verbs change** — the stage the course most needed. Three groups and the
る-ending traps (帰る, 走る, 入る). The stem, and that ます, たい, ながら, やすい
all hang off the same hook. The te-form with its full sound-change table and
行く's exception. Plain past and negative. Then the eight patterns that plug into
the te-form, which is the payoff for learning it.

## Added to existing stages

- **words** — the こそあど grid (これ/この/ここ/こんな), and question words, which
  sit where the answer goes so nothing reorders
- **sentences** — か and the trap that 誰か is *someone* not *who*; あります vs
  います and why a taxi takes あります; adjective predicates, and why 高いでした
  is wrong
- **kanji** — radicals as the parts characters are built from, okurigana and how
  it disambiguates 上/上げる/上る, and four ways to look up a character you cannot
  read
- **politeness** — お and ご and which words take which, plus when plain form is
  correct: inside a clause, even in a polite sentence
- **reading** — eight patterns worth recognising on sight, and why names defeat
  the dictionary (さん after an unresolvable chunk is the tell)
- **onwards** — what the JLPT levels actually measure (reading and listening
  only), and designing a routine around the days you do not feel like it

## Navigation

Twelve stages is more than fits on a screen, so the page now opens with a jump
list — a numbered chip per stage, anchored to it. Someone returning on day nine
wants stage nine, not a scroll.

## Checks

28 assertions, up from 26. All 42 steps point at files that exist; every hash is
validated against the destination's real set of charts, quizzes and levels; every
traced character has stroke data; all six tools are reached; every lesson has
prose and ends with something to answer; every table row matches its header
width; all 42 worked examples are real Japanese; all 52 lessons and self-checks
reach the rendered page; the contents lists every stage and every stage has an
anchor; and ticking a step still does not tear down the open lessons.

One bug worth mentioning because it would have been silent: assembling the file
left a stray comma between stages, which JavaScript reads as an elision — seven
empty holes in the array. The stage count in the test caught it.
