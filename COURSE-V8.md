# The course, 48 stages

`js/learn-course.js`: **48 stages, 193 lessons, ~22,000 words**. Six new stages,
three new lessons inside existing ones, 18 more steps.

```powershell
$dest = "$HOME\OneDrive\Projects\LearneJP"   # adjust to your path
Copy-Item html\learn.html    "$dest\html\" -Force
Copy-Item js\learn-course.js "$dest\js\"   -Force
Copy-Item js\learn-romaji.js "$dest\js\"   -Force
Copy-Item README.md          "$dest\"      -Force
```

**`js/learn-romaji.js` is regenerated and must be copied with the course** —
1,989 runs now, up from 1,719. The test that every Japanese run has a reading
entry is what catches a forgotten rebuild.

| | v1 | v5 | v6 | v7 | Now |
| --- | --- | --- | --- | --- | --- |
| Stages | 8 | 30 | 36 | 42 | **48** |
| Lessons | 22 | 125 | 148 | 170 | **193** |
| Words | 2,300 | 14,200 | 16,700 | 19,300 | **22,000** |
| Tables | 11 | 103 | 126 | 146 | **168** |
| Examples | 18 | 88 | 101 | 111 | **120** |
| Steps | 28 | 99 | 117 | 135 | **153** |

## Six new stages

**Where the words came from** — 和語, 漢語 and 外来語, the three vocabulary
strata. This is the lesson that explains why Japanese appears to have so many
synonyms: 山, 登山 and ハイキング are the same terrain described from three social
positions. It also explains the two-reading kanji system as the seam between two
vocabularies rather than a historical accident, and why learners sound stiff —
dictionaries list the 漢語 first, and using it in conversation reads like a manual.

**The Japanese nobody speaks** — 役割語, role language. An old scholar says じゃ
and わし; a wealthy young woman says ですわ. Nobody talks like this, and it is
invisible from inside because it is fluent, grammatical Japanese. Includes the
women's-language case, where fiction uses わ and かしら far more than speech does,
and an honest account of what anime *is* good for: rhythm, contractions, speed.

**Paperwork and a place to live** — the ward office, 住民票, the seal grades
(認印 / 実印 / 銀行印), decoding a rental listing (1LDK, 六畳, 築十年, and why
敷金 comes back while 礼金 does not), and rubbish separation, which sounds
trivial and is the friction new arrivals actually hit.

**When the ground moves** — 震度 against マグニチュード, and which one tells you
what your building just experienced. The three warning levels 注意報 / 警報 /
特別警報. And the numbers, worth fixing now: 119 is the ambulance and 110 the
police, the reverse of several other countries.

**More vocabulary by place** — technology, hobbies, feelings and the natural
world. The feelings set carries the がる rule forward, and explains why 彼は怒って
います is fine while 彼は嬉しいです is not.

**Measuring things** — metric plus the traditional units that survived where
they were most useful: 畳 for rooms, 坪 for land, 合 for rice. Plus 割 for
discounts, which is what a sale sign actually uses.

## Three new lessons in existing stages

How many kanji there officially are — 2,136 常用漢字, 1,026 taught by school
grade, and the separate name list that is part of why names defeat dictionaries.
The year's calendar and when the country stops. And the exclamations that are not
words: へえ signals interest and ふーん reads as bored, which is a distinction
worth having before you make it by accident.

## Checks

37 assertions. All **153** steps resolve, all **168** tables line up, all **120**
examples are real Japanese, all 82 dictionary steps route by intent, all 1,989
Japanese runs have a reading that reassembles into exactly its run, and 4,261
ruby elements reach the page. Every suite passes.
