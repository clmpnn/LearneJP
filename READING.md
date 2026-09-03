# The sentence tab now reads the whole line

Two files changed: `js/sentence.js` and `css/style.css`. Copy them over.

```powershell
$dest = "$HOME\OneDrive\Projects\LearneJP"   # adjust to your path
Copy-Item js\sentence.js "$dest\js\"  -Force
Copy-Item css\style.css  "$dest\css\" -Force
```

A **Literal reading** block now sits between the reading strip and the word
cards. The strip says how the line sounds; the reading says what it says; the
cards are still there for detail. Tapping a chunk jumps to its card, same as
the strip.

```
昨日は友達と映画を見に行きました。

yesterday   friend      movie     see      went
[topic]     [with/and]  [object]  [to/at]  [polite]
昨日は       友達と       映画を     見に      行きました
```

## What it does, and what it deliberately doesn't

Japanese is grouped the way Japanese groups it: a content word plus the
particles trailing it is one chunk, so 友達と is one idea with the と naming the
part the friend played. Word order is left alone, no subject is invented, and
no clause is moved. That is the honest limit of what a dictionary can do — real
translation would need a translation engine, which is the trade you turned down.

What it *does* buy is English that reads:

| | |
| --- | --- |
| 行きました | went `polite` |
| 食べたい | want to eat |
| 読んでいます | is reading `polite` |
| 読めない | can't read |
| 終わらなかった | didn't end |
| 面白かった | was interesting |
| 食べさせられました | was made to eat |
| 話してください | please talk |

That needed a small English morphology layer: ~120 irregular verbs plus regular
`-ed` / `-ing` / participle rules, and an auxiliary chain where the first
element carries tense and negation, so *could not be eaten* inflects `can` and
not `eat`. Causative-passive collapses to one shape rather than stacking into
"could make someone eat".

Particles are named by role rather than translated, because most cover several
English words — に alone is to, at, in, on and for. The label says `to/at` and
the full entry is one tap away.

## Two fixes that came with it

- **Grammatical glosses no longer stand alone.** JMdict describes function words
  by the job they do, so ですか used to render as the chunk "indicates question".
  Anything glossed that way now joins the chunk it modifies as a role: いいですか
  reads *good* `question`.
- **Ties between spellings now prefer the word the dictionary has more to say
  about.** こと was resolving to 古都 (an ancient city, one sense) rather than 事
  (thing, seven senses). This also fixed かかる → *take* rather than *contract*,
  and なる → *become* rather than *sound*. It costs one: 弾く now picks はじく
  (flip) over ひく (play).

## Where it still misreads

The same ambiguities as before, all needing frequency data the common-words
JMdict doesn't carry:

- 叱られて reads *can scold* rather than *was scolded*. られる is both potential
  and passive; the tag says `potential or passive` so the ambiguity is at least
  visible, but the default leads with the wrong one for godan verbs.
- Only the first sense of a word is used, so a word chosen for a sense further
  down the entry reads oddly.
- 家にいようと思う still parses ようと as 用途, and 今日は as the greeting.

## Checks

18 new assertions on the composed English — tense, polarity, each auxiliary,
adjectives, particles-as-roles, and a whole line in order — alongside the 26
wiring, 14 layout and 6 redirect ones. `window.SentenceLookup.reading('…')` is
exposed in the console and returns the chunks.
