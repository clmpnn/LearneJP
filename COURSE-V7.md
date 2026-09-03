# The course, 42 stages

`js/learn-course.js`: **42 stages, 170 lessons, ~19,300 words**. Six new stages,
three new lessons inside existing ones, 18 more steps.

```powershell
$dest = "$HOME\OneDrive\Projects\LearneJP"   # adjust to your path
Copy-Item html\learn.html    "$dest\html\" -Force
Copy-Item js\learn-course.js "$dest\js\"   -Force
Copy-Item README.md          "$dest\"      -Force
```

| | v1 | v4 | v5 | v6 | Now |
| --- | --- | --- | --- | --- | --- |
| Stages | 8 | 24 | 30 | 36 | **42** |
| Lessons | 22 | 104 | 125 | 148 | **170** |
| Words | 2,300 | 11,700 | 14,200 | 16,700 | **19,300** |
| Tables | 11 | 83 | 103 | 126 | **146** |
| Examples | 18 | 74 | 88 | 101 | **111** |
| Steps | 28 | 81 | 99 | 117 | **135** |

## Six new stages

**Talking about other people** — the gap I most wanted to close. 彼は寒いです is
not merely unnatural, it is ungrammatical: you cannot assert an internal state
you have no access to. So 寒がっています for behaviour you can see, 嬉しそうです for
how they look, 〜と言っています for what they told you. Plus why 思う goes
progressive for a third person, and why あなた is what textbooks teach and
speakers avoid.

**Words that ignore their kanji** — 熟字訓, where 今日 is きょう and no character
contributes a sound, so guessing is wasted effort. Then 当て字 (寿司, 珈琲) and
furigana conventions, including why business cards print the reading of a name:
native readers cannot always tell either.

**Idioms you will meet daily** — the 気 family, with 気になる (involuntary) against
気にする (voluntary), which is why the reassurance is 気にしないで. Body idioms where
耳が痛い means the criticism hits home. Fixed verb pairings — 薬を飲む, 風邪をひく,
写真を撮る. And 四字熟語 including 三日坊主, the three-day monk.

**Proverbs and what they reveal** — the dozen everyone quotes half of, what a set
of sayings is and is not evidence for, and the honest advice that recognition
pays and production usually lands oddly.

**The next tier of patterns** — ものの, にもかかわらず, どころか (which reverses
rather than qualifies), を通じて, 次第, あげく with its built-in bad verdict, and
限り for hedging a claim.

**Old forms still in use** — ず and ぬ, why the three wise monkeys are monkeys
(見ざる sounds like 猿), べからず and the compact noun-phrase grammar of signs,
and the fossils nobody thinks of as old — including 〜たり〜たり, which you already
use.

## Three new lessons in existing stages

Printed versus handwritten shapes: 令 genuinely differs, and tracing a ゴシック
screen face teaches you to write like a typesetter. Telephone Japanese, which is
scripted enough to learn outright and where もしもし is wrong at work. And what
the JLPT actually looks like — three sections, no speaking or writing, and
sectional minimums that fail you regardless of your total.

## Checks

30 assertions. All **135** steps resolve, all **146** tables have rows matching
their headers, all **111** examples are real Japanese, all 70 dictionary steps
route by intent, every stage has a unique id and an anchor. Every suite passes.
