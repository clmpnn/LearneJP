# From something to read into something that teaches

New file `js/learn-review.js`, plus changes to `js/learn.js`, `html/learn.html`
and `css/style.css`. No new lessons — this round makes the 237 already there
work harder.

```powershell
$dest = "$HOME\OneDrive\Projects\LearneJP"   # adjust to your path
Copy-Item html\learn.html "$dest\html\" -Force
Copy-Item js\learn*.js    "$dest\js\"   -Force
Copy-Item css\style.css   "$dest\css\"  -Force
```

## The problem with the page as it was

Sixty stages and 237 lessons, and every one of them ended with a question that
sat inert as text you could open and close. That is re-reading, which is close to
the least effective thing you can do with a question. Answering it from memory,
and then meeting it again days later, is close to the most effective. The whole
asset was there and doing nothing.

Meanwhile the sixty stages were presented as one flat list, which silently claims
they are equally urgent — the one judgement a beginner cannot make.

## Every self-check is now a scheduled question

Each check gained two buttons: **Not yet** and **Got it**. Rating one puts it on
a Leitner ladder, and a **Review** panel at the top of the page drills whatever
is due.

| Box | Next sighting |
| --- | --- |
| 1 | tomorrow |
| 2 | 2 days |
| 3 | 4 days |
| 4 | 9 days |
| 5 | 3 weeks |
| 6 | 2 months |

Getting one wrong drops it to the bottom **and returns it in the same session** —
finding out you were wrong and then not seeing the question again for a day
wastes the moment you learned it.

Three deliberate choices:

- **The pool starts empty.** A question enters the schedule when you rate it in
  its lesson, so the drill grows with your reading rather than opening at 237.
- **The review shows the question before the answer**, with the answer behind a
  press. Producing an answer is the mechanism; recognising one is not.
- **The queue is shuffled.** Recalling a fact because it followed another fact is
  not recalling the fact.

Storage is a box number and a day number per question — days as integers, not
timestamps — so the whole schedule stays a few kilobytes.

## The sixty stages now have an order of attention

Each stage is tagged **Foundation**, **Core** or **Reference**, with chips at the
top to show one tier at a time. Ten stages are Foundation: kana, sounds,
greetings, first words, sentences, verbs, numbers, kanji, describing. That is a
plan. The 24 Reference stages — history, dialects, business, ritual, the advanced
grammar — are the ones to read when the situation arrives.

The filter **hides rather than removes**, and the setting persists. Nothing is
taken away; the order of attention is just made explicit.

## Structure

`js/learn-review.js` is scheduling only — no rendering — so the ladder can be
reasoned about and tested without a page. That is the same separation that let
`learn-course.js` grow to 60 stages without `learn.js` changing.

## Checks

New `test-review.js`, 18 assertions, and they test the behaviour rather than the
code shape:

- a correct answer schedules for tomorrow; six correct reach two months
- a lapse drops to the bottom **and is due immediately**
- tomorrow's question is not in today's queue
- the pool starts empty rather than at 237
- every stage has a tier, the foundation is between 8 and 14 stages, and
  Reference is the largest
- all **237** check ids in the rendered page resolve to a real question — a
  broken id would silently drop a question out of the schedule forever

Plus the existing 37 learn, 11 handoff, 18 reading, 26 wiring, 14 layout and 6
redirect assertions, all still passing.

## What I would do next

Not more lessons. The remaining gap is that the tools do not point back at the
course: when the Sentence tab labels something *potential or passive*, there is a
lesson explaining exactly that, and no link between them. A map from grammar
labels to lesson anchors would close the loop — read a sentence, hit a pattern,
land on the lesson, and the question from that lesson enters your review queue.
