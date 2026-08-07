# The course, 54 stages

`js/learn-course.js`: **54 stages, 216 lessons, ~25,300 words**. Six new stages,
three new lessons inside existing ones, 18 more steps.

```powershell
$dest = "$HOME\OneDrive\Projects\LearneJP"   # adjust to your path
Copy-Item html\learn.html    "$dest\html\" -Force
Copy-Item js\learn-course.js "$dest\js\"   -Force
Copy-Item js\learn-romaji.js "$dest\js\"   -Force
Copy-Item README.md          "$dest\"      -Force
```

`js/learn-romaji.js` is regenerated again — 2,201 runs, up from 1,989. It has to
travel with the course, and the reading-entry assertion is what catches it if it
does not.

| | v1 | v6 | v7 | v8 | Now |
| --- | --- | --- | --- | --- | --- |
| Stages | 8 | 36 | 42 | 48 | **54** |
| Lessons | 22 | 148 | 170 | 193 | **216** |
| Words | 2,300 | 16,700 | 19,300 | 22,000 | **25,300** |
| Tables | 11 | 126 | 146 | 168 | **187** |
| Examples | 18 | 101 | 111 | 120 | **127** |
| Steps | 28 | 117 | 135 | 153 | **171** |

## Six new stages

**Where the language came from** — placed third, right after the kana, because it
retroactively explains things the reader has already had to accept. Japanese as
an isolate with no cognates to lean on. How hiragana came from writing characters
cursively until they dissolved, and katakana from cutting pieces out of them —
which is why one is round and the other angular. And the 1946 reforms, including
why は, へ and を kept their old spellings on purpose: spelling them phonetically
would have hidden the grammar. The irregularity you have lived with since stage
one is the one piece of the old system judged worth keeping.

**Names** — family name first and how long さん lasts; why nobody can read given
names either, since 名乗り readings exist only in names, which is why forms have
a furigana line and cards print the reading; and your own name in katakana, with
the 姓 and 名 field labels that override whatever your passport shows.

**How a paragraph holds together** — the first stage about reading past the
sentence. The opening connectives, with つまり flagged as the one to jump to when
a sentence has defeated you. その and それ pointing back at the text, which is
where the thread of an article is usually lost. And topic chains: a run of
subjectless sentences is a claim that nothing has changed.

**At work** — titles used instead of names, and your own 部長 losing his
honorific the moment you mention him to a client. Card exchange. Then 根回し and
稟議, which explain why a meeting is often ratification rather than debate.

**Getting around** — the train-type hierarchy, which is the difference between
arriving and not; IC cards and 精算; and 終電, which is why a Japanese evening ends
at a time nobody has to explain.

**Eating and drinking properly** — the kinds of restaurant, お通し (which is a
cover charge in edible form, not a mistake), the four chopstick acts that echo
funeral rites, and why you pour for other people rather than yourself.

## Three new lessons in existing stages

Gift-giving, including お返し at about half the value. The intermediate plateau —
why a month of study can produce no visible change, and why the answer is volume
rather than more grammar. And when to add a Japanese-Japanese dictionary: the
signal is two words returning the same English gloss.

## Checks

37 assertions. All **171** steps resolve, all **187** tables line up, all **127**
examples are Japanese, 92 dictionary steps route by intent, all 2,201 readings
reassemble into exactly their runs, and 4,694 ruby elements reach the page. Every
suite passes.
