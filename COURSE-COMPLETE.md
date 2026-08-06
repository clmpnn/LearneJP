# The course, past a hundred lessons

`js/learn-course.js`: **24 stages, 104 lessons, ~11,700 words**. Six new stages,
five new lessons inside existing ones, 20 more steps.

```powershell
$dest = "$HOME\OneDrive\Projects\LearneJP"   # adjust to your path
Copy-Item html\learn.html    "$dest\html\" -Force
Copy-Item js\learn-course.js "$dest\js\"   -Force
Copy-Item README.md          "$dest\"      -Force
```

`js/learn.js` and `css/style.css` are untouched again.

| | v1 | v2 | v3 | Now |
| --- | --- | --- | --- | --- |
| Stages | 8 | 12 | 18 | **24** |
| Lessons | 22 | 52 | 78 | **104** |
| Words | 2,300 | 5,700 | 8,700 | **11,700** |
| Tables | 11 | 35 | 58 | **83** |
| Examples | 18 | 42 | 55 | **74** |
| Steps | 28 | 42 | 61 | **81** |

## Six new stages

**Building bigger phrases** — the gap that mattered most. Japanese modifies a
noun by putting a whole plain-form clause in front of it with no relative
pronoun at all: 私が読んだ本. Once you see it, long sentences stop being walls of
text and become one noun with a long description attached. Plus nominalising
with こと and の, adverbs from both adjective families, and the formal nouns
(はず, つもり, ところ, まま) that look like vocabulary and behave like grammar.

**Saying what someone said** — と for quoting and thinking, why 行きますと言いました
is wrong, って doing four separate jobs in speech, and embedded questions with か
and かどうか.

**Verbs that come in pairs** — transitive and intransitive (開く/開ける,
つく/つける), and the distinction that follows: 窓が開いている reports a state,
窓が開けてある says someone did it deliberately. Then the passive including the
suffering passive — 雨に降られた means the rain spoiled things, which no English
passive can say — and the causative, with 〜させてください as the polite way to ask
to do something yourself.

**How people actually talk** — plain-form conversation, the contractions (てる,
とく, ちゃう, なきゃ), the sentence-final particles and why よ can sound rude, and
the particles that vanish in speech. を goes first, which is also where the
Sentence tab struggles most, for the same reason.

**Words that sound like what they mean** — 擬音語 and 擬態語. English has almost
nothing for the second kind, and ぺらぺら is standard adult vocabulary for
fluency with no sound involved. Includes the symptom words a doctor will expect.

**Weather, seasons and small talk** — the weather remark as a fixed opening
rather than filler, 梅雨 as a fifth season, and あいづち: making noises while
someone speaks, because silent listening reads as inattention.

## Five new lessons in existing stages

Money, phone numbers and addresses (and why 4 and 7 are read よん and なな over a
phone line). The potential form, and why it takes が. How to actually learn kanji
— in words, by components, spaced, and written. At the doctor, built on one
pattern: body part plus が痛いです. And signs, menus and door vocabulary, which is
pure recognition and the highest-return reading there is.

## Checks

30 assertions. All **81** steps resolve; every hash validates against the
destination's real charts, quizzes and levels; all **83** tables have rows
matching their headers; all **74** examples are real Japanese; every one of the
104 lessons has prose and ends with something to answer; all 37 dictionary steps
route by intent — breakdowns to the Sentence tab, lookups to the word search.
The handoff, reading, wiring, layout and redirect suites all still pass.
