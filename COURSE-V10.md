# The course, 60 stages

`js/learn-course.js`: **60 stages, 237 lessons, ~27,900 words**. Six new stages,
two new lessons inside existing ones, 18 more steps.

```powershell
$dest = "$HOME\OneDrive\Projects\LearneJP"   # adjust to your path
Copy-Item html\learn.html    "$dest\html\" -Force
Copy-Item js\learn-course.js "$dest\js\"   -Force
Copy-Item js\learn-romaji.js "$dest\js\"   -Force
Copy-Item README.md          "$dest\"      -Force
```

`js/learn-romaji.js` regenerated again — 2,440 runs, 86 KB.

| | v1 | v7 | v8 | v9 | Now |
| --- | --- | --- | --- | --- | --- |
| Stages | 8 | 42 | 48 | 54 | **60** |
| Lessons | 22 | 170 | 193 | 216 | **237** |
| Words | 2,300 | 19,300 | 22,000 | 25,300 | **27,900** |
| Tables | 11 | 146 | 168 | 187 | **207** |
| Examples | 18 | 111 | 120 | 127 | **138** |
| Steps | 28 | 135 | 153 | 171 | **189** |

## Two grammar gaps closed

These are the ones I most wanted to find, because both are core and both were
genuinely missing rather than merely thin.

**The の that explains** — んです. 頭が痛いです states a fact; 頭が痛いんです offers
it as the reason for something. It is one of the most common things in spoken
Japanese and one of the last things textbooks explain properly. Includes the
question form, where どうしましたか is correct and cold while どうしたんですか
acknowledges that you noticed something — and the regret family, 〜ばよかった and
〜ておけばよかった.

**Seeing, hearing and things that happen by themselves** — 見える against 見られる.
Something being visible is not the same as being able to see it, and Japanese
splits them where English does not: 山が見えます because the mountain is there,
映画が見られます because you got the chance. Plus the spontaneous voice, which is
why 〜と思われる can make a claim without naming who holds it, and why られる has
three readings the Sentence tab has to hedge between.

## Four more stages

**The Japanese of shops and staff** — the phrases that are simply correct, then
マニュアル敬語: コーヒーになります, お会計のほう, よろしかったでしょうか. You hear
these constantly, native speakers argue about them, and they are house style
rather than models. Recognise, do not adopt.

**The country outside Tokyo** — why a standard was deliberately created, Kansai
grammar as a learnable set, the east–west split, and that Okinawan is a separate
language rather than a dialect. Ends with undo rules: へん to ない, とる to ている,
so an unfindable word can be looked up.

**School and growing up** — the April year, 部活 and where 先輩 behaviour is
actually learned, and 受験, 塾 and 浪人.

**Shrines, temples and ceremonies** — telling them apart by the gate, the fixed
sequences (and the one difference: no clapping at a temple), and why used
banknotes are correct for a funeral and new ones for a wedding.

## Two new lessons in existing stages

How Japanese shortens things — two morae per element, targeting about four, which
is a rule you can run backwards on a word you have never met. And the convenience
store, where four fixed questions cover every visit.

## Checks

37 assertions. All **189** steps resolve, all **207** tables line up, all **138**
examples are Japanese, all 2,440 readings reassemble into exactly their runs, and
5,227 ruby elements reach the page. Every suite passes.
