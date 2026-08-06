// LearneJP — a Japanese (JLPT) study app for writing practice, quizzes, and dictionary lookup
// Copyright (C) 2026  Claudia Mithesa Peranginangin
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version. See <https://www.gnu.org/licenses/>.
//
// Contact: clmpnn@gmail.com · https://github.com/clmpnn


// The course behind the path.
//
// The other data files here hold questions and characters; this one holds
// explanations. A route through the tools tells you what to do next, but it
// can't tell you why ん is the only kana that stands alone, or why the verb
// waits until the end. That is what the lessons are for.
//
// Shape of a stage:
//   id, title, aim, body   — the stage as it appears on the path
//   lessons[]              — what to understand before doing the steps
//     title, body[]        — paragraphs
//     table                — { head: [], rows: [[]] } for grids and lists
//     examples[]           — { jp, en, note } — each links into the dictionary
//     check                — { q, a } — one question you should be able to answer
//   steps[]                — the tickable actions, each a link into a tool

window.LEARN_COURSE = [
{
    id: 'hiragana',
    title: 'Hiragana',
    aim: 'The 46 sounds Japanese is built from. Everything later assumes these.',
    body: 'Japanese has no alphabet — it has syllables. Learn to read them before anything else, ' +
        'because every word, every kanji reading and every quiz answer on this site is written in them.',
    lessons: [
        {
            title: 'Three scripts, and what each is for',
            body: [
                "Japanese writes with three systems at once, and they are not alternatives — a normal " +
                "sentence uses all three. Kanji carry meaning and mark where the content words are. " +
                "Hiragana handles everything grammatical: endings, particles, native words with no kanji. " +
                "Katakana is for words borrowed from other languages.",
                "This is why Japanese is readable without spaces. The switch from kanji to hiragana is " +
                "itself the word boundary — your eye learns to break the line at the change of script " +
                "long before you can read either."
            ],
            examples: [
                { jp: '私は日本語を勉強します',
                  en: 'I study Japanese',
                  note: '私・日本語・勉強 are kanji; は・を・します are hiragana doing the grammar.' }
            ],
            check: {
                q: 'Why can Japanese get away with having no spaces between words?',
                a: 'Because the script changes at the boundaries: kanji for content, hiragana for the ' +
                   'grammar around it. The change of shape does the job a space would.'
            }
        },
        {
            title: 'The grid is the whole system',
            body: [
                "Hiragana is not 46 unrelated shapes to memorise — it is five vowels, and then those " +
                "five vowels with a consonant in front. Learn the vowels in the order a-i-u-e-o and " +
                "every row after that follows the same order, which means you are really learning nine " +
                "consonants, not forty-six characters.",
                "Two rows are short: the や row has only ya, yu, yo, and the わ row has only wa and wo. " +
                "And one character sits outside the grid entirely — ん, the only sound in Japanese that " +
                "is a consonant on its own. It never starts a word, which is why the word game shiritori " +
                "ends when someone is forced to play one."
            ],
            table: {
                head: ['', 'a', 'i', 'u', 'e', 'o'],
                rows: [
                    ['—', 'あ', 'い', 'う', 'え', 'お'],
                    ['k', 'か', 'き', 'く', 'け', 'こ'],
                    ['s', 'さ', 'し (shi)', 'す', 'せ', 'そ'],
                    ['t', 'た', 'ち (chi)', 'つ (tsu)', 'て', 'と'],
                    ['n', 'な', 'に', 'ぬ', 'ね', 'の'],
                    ['h', 'は', 'ひ', 'ふ (fu)', 'へ', 'ほ'],
                    ['m', 'ま', 'み', 'む', 'め', 'も'],
                    ['y', 'や', '', 'ゆ', '', 'よ'],
                    ['r', 'ら', 'り', 'る', 'れ', 'ろ'],
                    ['w', 'わ', '', '', '', 'を (o)'],
                    ['n', 'ん', '', '', '', '']
                ]
            },
            check: {
                q: 'Five squares in the grid do not follow the pattern. Which, and why?',
                a: 'し is shi not si, ち is chi not ti, つ is tsu not tu, ふ is fu not hu, and を is ' +
                   'said o though it is written wo. They are historical spellings the language kept.'
            }
        },
        {
            title: 'Four marks that multiply the grid',
            body: [
                "Once the 46 are in place, four small additions cover almost every remaining sound, and " +
                "none of them are new shapes to learn.",
                "A dakuten — two strokes at the top right — voices a consonant: か ka becomes が ga, " +
                "さ sa becomes ざ za, た ta becomes だ da, は ha becomes ば ba. A handakuten, the small " +
                "circle, turns は into ぱ pa. A small ゃ ゅ ょ after an i-row character fuses the two into " +
                "one syllable: き + ゃ is kya, not ki-ya. And a small っ has no sound of its own — it " +
                "doubles the consonant that follows and holds a beat of silence."
            ],
            table: {
                head: ['Mark', 'Does', 'Example'],
                rows: [
                    ['゛ dakuten', 'k→g, s→z, t→d, h→b', 'か ka → が ga'],
                    ['゜ handakuten', 'h→p', 'は ha → ぱ pa'],
                    ['small ゃゅょ', 'fuses with the i-row into one beat', 'き + ゃ → きゃ kya'],
                    ['small っ', 'doubles the next consonant', 'きと kito → きっと kitto'],
                    ['vowel repeat', 'holds the vowel for two beats', 'おかさん → おかあさん okaasan']
                ]
            },
            examples: [
                { jp: '学校', en: 'school', note: 'がっこう — a dakuten and a small っ in four characters.' },
                { jp: '東京', en: 'Tokyo', note: 'とうきょう — a long o, then a fused きょ.' }
            ],
            check: {
                q: 'What is the difference between きて and きって?',
                a: 'A beat. きて is kite, come here; きって is kitte, a postage stamp. The small っ is ' +
                   'the whole distinction, and dropping it changes the word.'
            }
        },
        {
            title: 'Getting them into your head',
            body: [
                "Kana are the one part of Japanese where brute repetition is genuinely the right method, " +
                "and where a week of focus removes an obstacle that would otherwise slow everything " +
                "after it. A few things make that week shorter.",
                "Write them. Reading alone builds a weak, one-directional memory; the hand learns " +
                "sequences and the eye only learns shapes. Tracing with stroke order is worth more than " +
                "twice the time spent staring at a chart.",
                "Drop romaji as early as you can stand to. Every time you read あ as a and then a as " +
                "the sound, you are practising a detour. It is slower for about three days and faster " +
                "forever after.",
                "And read something, however trivial. Kana-only words in the vocabulary quiz, signs in " +
                "photographs, the menu of a Japanese restaurant. Recognition under mild pressure fixes " +
                "characters that a chart never will."
            ],
            check: {
                q: 'Why is tracing better than reading a chart?',
                a: 'Because writing builds a motor sequence and reading only builds recognition. The ' +
                   'hand remembers order; the eye only remembers shape, and shapes blur together.'
            }
        }
    ],
    steps: [
        { text: 'Read the hiragana chart end to end. Tap any character to hear it.',
          href: 'characters.html#hiragana', label: 'Open the chart' },
        { text: 'Trace the five vowels until you can write them without the template.',
          href: 'writing.html#trace=%E3%81%82', label: 'Trace あ' },
        { text: 'Work along the rows — か さ た な は ま や ら わ — tracing each row before moving on.',
          href: 'writing.html#trace=%E3%81%8B', label: 'Trace か' },
        { text: 'Test yourself on words written in kana only.',
          href: 'practice.html#vocabulary=n5', label: 'N5 vocabulary' }
    ]
},
{
    id: 'sounds',
    title: 'How Japanese sounds',
    aim: 'Rhythm, pitch, and the sounds English does not have.',
    body: 'Japanese has few sounds and a strict rhythm. Getting the rhythm right matters more for ' +
        'being understood than getting any individual sound perfect.',
    lessons: [
        {
            title: 'Every beat is the same length',
            body: [
                "English stretches and squashes syllables — the co in coffee is longer than the ffee. " +
                "Japanese does not. Every unit gets one beat of equal length, and those units are not " +
                "syllables but morae, which is why timing is the single most useful thing to fix early.",
                "Three things take a whole beat even though they feel like nothing. A small っ is a beat " +
                "of silence. An ん is a beat on its own. And a long vowel is two beats, not one held " +
                "longer. Speakers who compress these are hard to follow even when every sound is correct.",
                "Count 東京 and you get four beats: to-u-kyo-u. Not two, not three. きょ is one beat " +
                "because the small ょ fuses; the う after it is a second."
            ],
            table: {
                head: ['Word', 'Beats', 'Counted'],
                rows: [
                    ['東京 とうきょう', '4', 'to-u-kyo-u'],
                    ['学校 がっこう', '4', 'ga-(pause)-ko-u'],
                    ['日本 にほん', '3', 'ni-ho-n'],
                    ['切手 きって', '3', 'ki-(pause)-te'],
                    ['お母さん おかあさん', '5', 'o-ka-a-sa-n']
                ]
            },
            examples: [
                { jp: '学校', en: 'school', note: 'Four beats. The pause where っ sits is as long as any of the others.' }
            ],
            check: {
                q: 'How many beats in 切符 きっぷ?',
                a: 'Three — ki, the silent beat of っ, then pu. Say it in two and it stops sounding like ' +
                   'a ticket.'
            }
        },
        {
            title: 'Five pure vowels, and the ones that disappear',
            body: [
                "Japanese has exactly five vowels and they do not glide. English oh drifts towards a w " +
                "at the end and ay drifts towards a y; Japanese お and え hold one position and stop. " +
                "Keeping them short and flat is most of sounding natural.",
                "Then there is a habit nobody mentions until you are confused by it: i and u go quiet " +
                "between two voiceless consonants, and often at the end of a word. です is said des. " +
                "好き is closer to ski than su-ki. ました comes out mashta. The vowel is still there in " +
                "the writing and still occupies its beat — it just loses its voice.",
                "This is why what you hear does not match what you have learned to read. Both are right."
            ],
            table: {
                head: ['Written', 'Said closer to', 'Why'],
                rows: [
                    ['です', 'des', 'u at the end, after a voiceless s'],
                    ['好き すき', 'ski', 'u caught between s and k'],
                    ['ました', 'mashta', 'i caught between sh and t'],
                    ['靴 くつ', 'kts', 'u between k and ts'],
                    ['学生 がくせい', 'gaksei', 'u between k and s']
                ]
            },
            check: {
                q: 'You hear "des" but the textbook writes です. Which is wrong?',
                a: 'Neither. The u is devoiced, not deleted — it keeps its beat and its spelling, and ' +
                   'just loses its voicing between the s and the end of the word.'
            }
        },
        {
            title: 'Pitch, not stress',
            body: [
                "English marks a syllable by hitting it harder. Japanese marks it by pitch: the voice " +
                "steps up or down, and where it drops can change the word entirely. Every word has a " +
                "pattern, and the pattern is part of the word.",
                "You do not need to study these formally as a beginner, and most learners never do. But " +
                "knowing pitch exists stops you from importing English stress, which is what makes " +
                "otherwise accurate Japanese hard to listen to. Copy the shape of what you hear rather " +
                "than hammering a syllable.",
                "The classic pairs are worth knowing because they show what is at stake. あめ with the " +
                "drop after the first beat is rain; flat and rising it is candy. はし dropping after the " +
                "first is chopsticks; rising it is bridge or edge, and which of those two depends on " +
                "what happens to the particle that follows."
            ],
            table: {
                head: ['Written', 'Pitch', 'Means'],
                rows: [
                    ['雨 あめ', 'high then low', 'rain'],
                    ['飴 あめ', 'low then high', 'candy'],
                    ['箸 はし', 'high then low', 'chopsticks'],
                    ['橋 はし', 'low then high, falls on the particle', 'bridge'],
                    ['端 はし', 'low then high, stays up', 'edge']
                ]
            },
            check: {
                q: 'Why can you not tell 橋 and 端 apart from the word alone?',
                a: 'Both rise across はし. The difference shows on the next word: after 橋 the particle ' +
                   'drops, after 端 it stays high. The accent lives in the phrase, not the word.'
            }
        },
        {
            title: 'The four sounds that need retraining',
            body: [
                "Most Japanese sounds already exist in English. Four do not, and all four are ordinary " +
                "enough that they come up in the first week.",
                "The ら row is neither l nor r. It is a single tap of the tongue against the ridge behind " +
                "the teeth — the same sound as the tt in the American pronunciation of butter. English " +
                "speakers reaching for r round their lips and it stops sounding Japanese immediately.",
                "ふ is not f. There are no teeth involved: it is blown between the lips, closer to " +
                "someone quietly putting out a candle. つ is ts, the sound at the end of cats, which is " +
                "easy at the end of a word and awkward at the start until you practise it. And ん changes " +
                "shape depending on what follows — it is m before b, p and m, which is why しんぶん comes " +
                "out shimbun."
            ],
            examples: [
                { jp: '新聞', en: 'newspaper', note: 'しんぶん — the ん before ぶ is said as an m.' },
                { jp: '富士山', en: 'Mount Fuji', note: 'ふじさん — that first sound is lips only, no teeth.' }
            ],
            check: {
                q: 'What English sound is closest to the ら row?',
                a: 'The tt in butter as an American says it — a single tap. Not an English r, which is ' +
                   'the instinct to unlearn.'
            }
        },
        {
            title: 'Not everyone speaks like Tokyo',
            body: [
                "What you are learning is 標準語, the standard based on Tokyo speech. It is what " +
                "broadcasting, textbooks and this site use, and it is understood everywhere. It is not " +
                "what most of the country actually speaks at home.",
                "Kansai-ben, around Osaka and Kyoto, is the variety you are most likely to meet, " +
                "because so much broadcast comedy comes from there. Its differences are systematic: " +
                "だ becomes や, negatives take へん instead of ない, ありがとう is often おおきに, and " +
                "the pitch patterns are close to inverted from Tokyo's on many words.",
                "You do not need to learn any of it to speak. You do need to know it exists, because " +
                "hearing ちゃう for 違う or あかん for だめ and finding neither in the dictionary is a " +
                "confusing way to spend an afternoon.",
                "The register question is simpler than it looks: speak standard, understand the rest. " +
                "Nobody expects a learner to switch dialect, and attempting it before you are fluent " +
                "usually lands as parody."
            ],
            table: {
                head: ['Standard', 'Kansai', 'Means'],
                rows: [
                    ['だ', 'や', 'is'],
                    ['〜ない', '〜へん', 'not — 行かへん'],
                    ['違う', 'ちゃう', 'that is wrong'],
                    ['だめ', 'あかん', 'no good'],
                    ['本当', 'ほんま', 'really'],
                    ['ありがとう', 'おおきに', 'thank you'],
                    ['そうだね', 'せやな', 'that is right']
                ]
            },
            check: {
                q: 'Should you learn to speak a dialect?',
                a: 'Not deliberately, and not early. Speak the standard and learn to understand what ' +
                   'you hear — nobody expects a learner to switch, and trying tends to sound like ' +
                   'mimicry.'
            }
        }
    ],
    steps: [
        { text: 'Tap through the hiragana chart and listen — every character is spoken.',
          href: 'characters.html#hiragana', label: 'Hear the sounds' },
        { text: 'Look up 雨 and 飴 and say both. Same kana, different words.',
          href: 'dictionary.html#q=雨', label: 'Look up 雨' },
        { text: 'Train your ear where rhythm actually matters — in whole sentences.',
          href: 'practice.html#listening=n5', label: 'N5 listening' }
    ]
},
{
    id: 'katakana',
    title: 'Katakana',
    aim: 'The same 46 sounds, second set. Used for borrowed words.',
    body: 'Katakana spells words Japanese took from other languages, so it is the fastest reading win ' +
        'there is — コーヒー is coffee, テレビ is television.',
    lessons: [
        {
            title: 'What katakana is actually for',
            body: [
                "Katakana covers four jobs: words borrowed from other languages, the names of foreign " +
                "people and places, sound effects, and emphasis — the equivalent of italics. Scientific " +
                "writing also uses it for species names.",
                "The shapes are more angular than hiragana because they came from a different process. " +
                "Hiragana is what happens when you write a kanji fast and cursive until it dissolves; " +
                "katakana is a piece of a kanji, cut out and used for its sound. Same sounds, same grid, " +
                "same order — only the strokes differ."
            ],
            check: {
                q: 'You see a word in katakana that you do not know. What is your first guess?',
                a: 'Say it out loud in a Japanese rhythm and listen for an English word. Most katakana ' +
                   'you meet early is a borrowing, and hearing it beats looking it up.'
            }
        },
        {
            title: 'Reading a borrowed word back',
            body: [
                "Japanese syllables are consonant-plus-vowel, so a borrowed word gets padded until it " +
                "fits. Every stranded consonant picks up a u — or an o after t and d — and the result " +
                "is longer than the original. Strike becomes su-to-ra-i-ku. Once you expect the padding " +
                "you can usually reverse it in your head.",
                "The long vowel bar ー is katakana-only and very common in borrowings, because English " +
                "stressed vowels tend to land as long ones. There is no l in Japanese, so l and r both " +
                "become the ら row, and there is no v, so v usually becomes the ば row."
            ],
            table: {
                head: ['Katakana', 'Reading', 'From'],
                rows: [
                    ['コーヒー', 'koohii', 'coffee'],
                    ['テレビ', 'terebi', 'television'],
                    ['パソコン', 'pasokon', 'personal computer'],
                    ['アルバイト', 'arubaito', 'Arbeit — German for work, meaning a part-time job'],
                    ['ストライク', 'sutoraiku', 'strike']
                ]
            },
            examples: [
                { jp: 'コーヒー', en: 'coffee', note: 'Two long vowels, both written with the ー bar.' }
            ],
            check: {
                q: 'Why is アルバイト not from English?',
                a: 'It came from German Arbeit, through medicine and academia in the Meiji era. Not every ' +
                   'katakana word is English, which is worth remembering when a guess fails.'
            }
        },
        {
            title: 'The pairs that trip everyone',
            body: [
                "Four pairs of katakana look nearly identical, and they are the reason katakana feels " +
                "harder than hiragana even though there is nothing new to learn. The rule that separates " +
                "them is direction of stroke, not shape.",
                "シ and ン are written from the lower left, with the strokes moving up and to the right. " +
                "ツ and ソ are written from the top, with the strokes coming down. If you learn them by " +
                "writing rather than by looking, they stop being confusable — which is the strongest " +
                "argument there is for tracing them rather than flashcarding them."
            ],
            table: {
                head: ['Pair', 'Tell them apart by'],
                rows: [
                    ['シ shi / ツ tsu', 'シ strokes rise from the left; ツ strokes fall from the top'],
                    ['ソ so / ン n', 'ン rises from the lower left; ソ falls from the top'],
                    ['ク ku / ワ wa / ケ ke', 'ク has a sharp corner, ワ is open and round, ケ has a third stroke'],
                    ['ノ no / メ me / ヌ nu', 'メ and ヌ add a stroke crossing the ノ']
                ]
            },
            check: {
                q: 'How do you tell シ from ツ without looking at the shape?',
                a: 'By where the strokes start. シ is written from the lower left going up; ツ is written ' +
                   'from the top going down. The finished shapes differ because the hands did.'
            }
        },
        {
            title: 'The combinations katakana invented',
            body: [
                "Japanese has no f, v, ti or di sounds of its own, so katakana built them. A normal " +
                "character is followed by a small vowel, and the pair is read as one sound that " +
                "hiragana never needed to write.",
                "フ plus a small vowel gives ファ フィ フェ フォ. テ and デ plus a small ィ give ティ " +
                "and ディ. ウ plus a small vowel gives ウィ ウェ ウォ. And ヴ, a ウ with a dakuten, is " +
                "a v — though in practice many words settle on the ば row instead, which is why " +
                "violin is usually バイオリン and only sometimes ヴァイオリン.",
                "You will not need to write these often, but you will read them constantly, because " +
                "they appear in exactly the borrowed words that are easiest to recognise."
            ],
            table: {
                head: ['Combination', 'Sound', 'Seen in'],
                rows: [
                    ['ファ フィ フェ フォ', 'fa fi fe fo', 'ファイル file'],
                    ['ティ ディ', 'ti di', 'パーティー party'],
                    ['ウィ ウェ ウォ', 'wi we wo', 'ウェブ web'],
                    ['ヴ', 'v', 'ヴァイオリン violin'],
                    ['シェ ジェ チェ', 'she je che', 'チェック check'],
                    ['ツァ ツェ', 'tsa tse', 'ピッツァ pizza']
                ]
            },
            check: {
                q: 'Why does violin appear as both バイオリン and ヴァイオリン?',
                a: 'Because ヴ is a modern invention for a sound Japanese does not have. Older ' +
                   'borrowings settled on the ば row and mostly stayed there.'
            }
        }
    ],
    steps: [
        { text: 'Read the katakana chart against the hiragana one — same order, same sounds.',
          href: 'characters.html#katakana', label: 'Open the chart' },
        { text: 'Trace the vowels again in their katakana shapes.',
          href: 'writing.html#trace=%E3%82%A2', label: 'Trace ア' },
        { text: 'Trace シ and ツ side by side until the stroke direction is automatic.',
          href: 'writing.html#trace=%E3%82%B7', label: 'Trace シ' },
        { text: 'Look up a borrowed word and see if you can read it before the meaning loads.',
          href: 'dictionary.html#q=%E3%82%B3%E3%83%BC%E3%83%92%E3%83%BC', label: 'Look up コーヒー' }
    ]
},
{
    id: 'greetings',
    title: 'Words you can use today',
    aim: 'The set phrases that carry ordinary interaction.',
    body: 'A handful of fixed expressions do an enormous amount of work in Japanese, and none of them ' +
        'need grammar to use.',
    lessons: [
        {
            title: 'Greetings, and the time of day',
            body: [
                "Japanese greetings are tied to the clock more strictly than English ones. おはよう " +
                "ございます is morning only; こんにちは covers the middle of the day; こんばんは is " +
                "evening. Using the wrong one is not rude, but it marks you out instantly.",
                "Note that こんにちは and こんばんは end in は, written as the topic particle and said wa. " +
                "They are the leftovers of longer sentences that got cut off — literally as for today " +
                "and as for this evening, with the rest left unsaid. That is why the spelling looks wrong."
            ],
            table: {
                head: ['Japanese', 'When', 'Meaning'],
                rows: [
                    ['おはようございます', 'morning', 'good morning — drop ございます with friends'],
                    ['こんにちは', 'daytime', 'hello'],
                    ['こんばんは', 'evening', 'good evening'],
                    ['おやすみなさい', 'going to bed', 'good night'],
                    ['さようなら', 'a long parting', 'goodbye — heavier than English goodbye'],
                    ['またね', 'seeing them soon', 'see you'],
                    ['行ってきます', 'leaving home', 'I am off and will be back'],
                    ['ただいま', 'arriving home', 'I am back']
                ]
            },
            check: {
                q: 'Why is こんにちは spelled with は rather than わ?',
                a: 'Because it is the topic particle. The phrase is the front half of a longer sentence ' +
                   'about today that stopped being finished centuries ago.'
            }
        },
        {
            title: 'The phrases that do not translate',
            body: [
                "Several everyday expressions have no English equivalent, and trying to translate them " +
                "word by word gives you nothing useful. They are better learned as gestures than as " +
                "sentences.",
                "よろしくお願いします is the widest of them. Literally it asks for goodwill; in practice " +
                "it closes an introduction, accompanies a request, and ends an email. お疲れ様です " +
                "acknowledges someone's effort and doubles as hello and goodbye at work. いただきます " +
                "before eating and ごちそうさま after it are said whether or not anyone cooked for you.",
                "And すみません does three separate jobs: sorry, excuse me, and thank you — the last of " +
                "these carrying a sense of having put someone to trouble, which is why it often sounds " +
                "warmer than ありがとう."
            ],
            table: {
                head: ['Phrase', 'Used for'],
                rows: [
                    ['よろしくお願いします', 'closing an introduction, or asking a favour'],
                    ['お疲れ様です', 'acknowledging effort — also hello and goodbye at work'],
                    ['いただきます', 'before eating'],
                    ['ごちそうさまでした', 'after eating'],
                    ['すみません', 'sorry, excuse me, and thank you'],
                    ['失礼します', 'entering or leaving a room, ending a call'],
                    ['お先に失礼します', 'leaving before your colleagues']
                ]
            },
            examples: [
                { jp: 'よろしくお願いします', en: 'please treat me well',
                  note: 'Break it down and you get the pieces — but the pieces do not add up to the use.' }
            ],
            check: {
                q: 'Someone holds a door for you. すみません or ありがとう?',
                a: 'Either works, and すみません is common — it carries the sense that they went to ' +
                   'trouble for you, which ありがとう does not.'
            }
        },
        {
            title: 'Yes, no, and the space between',
            body: [
                "はい and いいえ are usually glossed as yes and no, but they answer a different question " +
                "than English does. They confirm or deny the statement as asked, so a negative question " +
                "flips them: asked 行きませんか, did you not go, はい means correct, I did not.",
                "In practice はい is used far more often than いいえ, because a flat no is direct in a way " +
                "Japanese avoids. Refusals soften — ちょっと trailing off, or 大丈夫です, which declines " +
                "politely while sounding like reassurance. Learning to hear a soft no is as important as " +
                "learning to say one."
            ],
            table: {
                head: ['Japanese', 'Means'],
                rows: [
                    ['はい', 'yes — or that is correct'],
                    ['いいえ', 'no — direct, used less than you would expect'],
                    ['ちょっと…', 'that is a little difficult — a refusal'],
                    ['大丈夫です', 'I am fine — often declining an offer'],
                    ['そうです', 'that is so'],
                    ['違います', 'that is not right']
                ]
            },
            check: {
                q: 'Asked 分かりませんか — do you not understand? — and you do not. はい or いいえ?',
                a: 'はい. You are agreeing with the statement as it was put, not answering yes to ' +
                   'understanding.'
            }
        }
    ],
    steps: [
        { text: 'Look up よろしく and read how many situations one word covers.',
          href: 'dictionary.html#q=よろしく', label: 'Look up よろしく' },
        { text: 'Break down a full set phrase and see the pieces it is made of.',
          href: 'dictionary.html#s=お疲れ様です', label: 'Break down お疲れ様です' },
        { text: 'Read the situations page — the same phrases, sorted by where you would use them.',
          href: 'keigo.html#situations', label: 'Keigo situations' }
    ]
},
{
    id: 'people',
    title: 'Talking about people',
    aim: 'Introducing yourself, naming others, and the inside–outside line.',
    body: 'Japanese encodes relationships in its vocabulary. Who someone is to you changes which word ' +
        'you use for them, and getting that wrong is more noticeable than a grammar slip.',
    lessons: [
        {
            title: 'Introducing yourself',
            body: [
                "A self-introduction in Japanese has a shape, and following it makes you sound prepared " +
                "rather than fluent — which is exactly right at the start. Name, where you are from, " +
                "what you do, then よろしくお願いします to close.",
                "Two habits to build now. Japanese order is family name first, so 田中健 is Mr Tanaka " +
                "whose given name is Ken. And you rarely need 私は at all: starting with your name is " +
                "normal, and the topic is obvious. Beginners who say 私は every sentence sound like a " +
                "textbook exercise."
            ],
            table: {
                head: ['Japanese', 'Means'],
                rows: [
                    ['はじめまして', 'how do you do — first meeting only'],
                    ['〜と申します', 'my name is — humble, safest in formal settings'],
                    ['〜です', 'I am — plain and fine in most situations'],
                    ['〜から来ました', 'I come from ~'],
                    ['〜をしています', 'I do ~ for a living'],
                    ['よろしくお願いします', 'closes every introduction']
                ]
            },
            examples: [
                { jp: 'はじめまして、田中と申します', en: 'How do you do, my name is Tanaka',
                  note: '申します is the humble form of 言う — you are lowering yourself, politely.' }
            ],
            check: {
                q: 'Why do you rarely need to say 私は when introducing yourself?',
                a: 'Because the topic is already obvious. Japanese drops anything the situation supplies, ' +
                   'and repeating 私は marks you as translating from English.'
            }
        },
        {
            title: 'さん, くん, ちゃん, 様, 先生',
            body: [
                "Names almost never stand bare. A suffix goes on the end, and which one you pick states " +
                "the relationship — so leaving it off is not neutral, it is intimate. Dropping the " +
                "suffix entirely is something done between close friends and by parents to children.",
                "さん is the default and works for anyone. 様 is markedly formal, used for customers and " +
                "in writing. くん is for junior males and classmates, ちゃん for children and close " +
                "friends. 先生 is used for teachers, doctors and anyone with expertise, and it replaces " +
                "the suffix rather than joining it.",
                "The rule people forget: never use any of these about yourself. 田中さんです about " +
                "yourself is the same error as calling yourself Mr Tanaka."
            ],
            table: {
                head: ['Suffix', 'Used for'],
                rows: [
                    ['〜さん', 'anyone — the safe default'],
                    ['〜様 さま', 'customers, formal writing, deities'],
                    ['〜くん', 'junior men, classmates, sometimes junior staff'],
                    ['〜ちゃん', 'children, close friends, pets'],
                    ['〜先生', 'teachers, doctors, lawyers, writers'],
                    ['no suffix', 'close friends, family, or yourself']
                ]
            },
            check: {
                q: 'Your teacher is called 山田. What do you call her?',
                a: '山田先生. 先生 replaces さん rather than stacking with it — 山田先生さん is wrong.'
            }
        },
        {
            title: 'Family, and the inside–outside line',
            body: [
                "Japanese has two complete sets of family words: one for your own family and one for " +
                "everyone else's. Your mother is 母; someone else's is お母さん. This is the clearest " +
                "example of a principle that runs through the whole language — uchi and soto, inside " +
                "and outside.",
                "Inside is your family, your company, your group. You speak humbly about the inside and " +
                "respectfully about the outside, even when the outside person is junior to you. This is " +
                "why an employee talking to a customer refers to their own company president without any " +
                "honorific at all.",
                "Confusingly, you use the outside words to address your own family directly. You call " +
                "your mother お母さん to her face and 母 when telling someone else about her."
            ],
            table: {
                head: ['Relation', 'Yours', "Someone else's"],
                rows: [
                    ['mother', '母 はは', 'お母さん'],
                    ['father', '父 ちち', 'お父さん'],
                    ['older sister', '姉 あね', 'お姉さん'],
                    ['older brother', '兄 あに', 'お兄さん'],
                    ['younger sister', '妹 いもうと', '妹さん'],
                    ['younger brother', '弟 おとうと', '弟さん'],
                    ['family', '家族 かぞく', 'ご家族']
                ]
            },
            examples: [
                { jp: '母は先生です', en: 'My mother is a teacher',
                  note: '母 because she is inside. Talking to her, you would say お母さん.' }
            ],
            check: {
                q: 'You tell a colleague about your mother. 母 or お母さん?',
                a: '母. She is inside your group and the colleague is outside, so you speak of her plainly. ' +
                   'お母さん would be for their mother, or for addressing yours directly.'
            }
        },
        {
            title: 'Giving and receiving',
            body: [
                "Three verbs cover giving, and which one you use depends on the direction relative to " +
                "you. This has no English parallel and it catches everyone.",
                "あげる is giving away from you — I give to someone, or one outsider gives another. " +
                "くれる is giving towards you — someone gives to me, or to my group. English uses give " +
                "for both, which is why learners say あげる when they mean くれる and accidentally " +
                "describe themselves as the giver.",
                "もらう flips the sentence around: it is receiving, so the receiver becomes the subject " +
                "and the giver takes から or に. All three also attach to the te-form to describe doing " +
                "a favour rather than handing over an object, which is where they turn up most often."
            ],
            table: {
                head: ['Verb', 'Direction', 'Example'],
                rows: [
                    ['あげる', 'I → someone else', '友達に本をあげました'],
                    ['くれる', 'someone else → me', '友達が本をくれました'],
                    ['もらう', 'I receive', '友達に本をもらいました'],
                    ['〜てあげる', 'do a favour for someone', '教えてあげる — I teach them'],
                    ['〜てくれる', 'someone does me a favour', '教えてくれる — they teach me'],
                    ['〜てもらう', 'have someone do it', '教えてもらう — I get taught']
                ]
            },
            examples: [
                { jp: '友達が本をくれました', en: 'A friend gave me a book',
                  note: 'くれる, because it came towards me. あげる here would mean I gave it.' }
            ],
            check: {
                q: 'Someone helps you. 手伝ってあげました or 手伝ってくれました?',
                a: 'くれました — the favour came towards you. あげました would mean you helped them.'
            }
        }
    ],
    steps: [
        { text: 'Look up the two words for mother and see them listed side by side.',
          href: 'dictionary.html#q=母', label: 'Look up 母' },
        { text: 'Break down a self-introduction and see 申します resolve to 言う.',
          href: 'dictionary.html#s=田中と申します', label: 'Break down 申します' },
        { text: 'Read how the inside–outside line drives honorific choice.',
          href: 'keigo.html#situations', label: 'Keigo situations' }
    ]
},
{
    id: 'words',
    title: 'Your first words',
    aim: 'Enough vocabulary to have something to put in a sentence.',
    body: 'Grammar with no words to hang on it is abstract. Collect a small stock first — people, ' +
        'places, everyday verbs.',
    lessons: [
        {
            title: 'Why the dictionary says "to eat"',
            body: [
                "Japanese verbs are listed in their plain non-past form, which always ends in an u-sound: " +
                "食べる taberu, 行く iku, 話す hanasu. English has no single word for that form, so " +
                "dictionaries render it as the infinitive — hence to eat, to go, to speak. It is not an " +
                "infinitive, though. On its own it is a complete, if blunt, sentence: 食べる means I eat, " +
                "or I will eat, or he eats, depending on who you were talking about.",
                "That same form is what every conjugation is built from, and it is what the Sentence tab " +
                "on this site works back to. When a breakdown says 行きました comes from 行く, it is " +
                "telling you where in the dictionary to look."
            ],
            examples: [
                { jp: '食べる', en: 'to eat', note: 'Plain non-past. 食べます is the same thing, said politely.' },
                { jp: '行きました', en: 'went', note: 'Break this down and the reading names 行く as its source.' }
            ],
            check: {
                q: 'Does 食べる mean I eat or he eats?',
                a: 'Either. Japanese verbs do not change for person or number, and the subject is usually ' +
                   'left out. Context supplies who.'
            }
        },
        {
            title: 'The first words worth owning',
            body: [
                "Vocabulary is the one part of this that is pure volume, but the first stretch is steep: " +
                "a few dozen words cover an enormous share of ordinary sentences. These are worth knowing " +
                "cold before you touch grammar, because every example you meet will be built from them."
            ],
            table: {
                head: ['Japanese', 'Reading', 'Meaning'],
                rows: [
                    ['私', 'watashi', 'I, me'],
                    ['人', 'hito', 'person'],
                    ['友達', 'tomodachi', 'friend'],
                    ['先生', 'sensei', 'teacher'],
                    ['学生', 'gakusei', 'student'],
                    ['日本', 'nihon', 'Japan'],
                    ['本', 'hon', 'book'],
                    ['水', 'mizu', 'water'],
                    ['家', 'ie', 'house, home'],
                    ['今日', 'kyou', 'today'],
                    ['行く', 'iku', 'to go'],
                    ['来る', 'kuru', 'to come'],
                    ['見る', 'miru', 'to see, to watch'],
                    ['食べる', 'taberu', 'to eat'],
                    ['飲む', 'nomu', 'to drink'],
                    ['する', 'suru', 'to do'],
                    ['ある', 'aru', 'to exist — things'],
                    ['いる', 'iru', 'to exist — people and animals'],
                    ['大きい', 'ookii', 'big'],
                    ['いい', 'ii', 'good']
                ]
            },
            check: {
                q: 'When would you use ある rather than いる?',
                a: 'ある for things that do not move themselves — a book, a station, an appointment. ' +
                   'いる for people and animals. Getting this backwards is one of the most audible ' +
                   'beginner mistakes.'
            }
        },
        {
            title: 'Two kinds of adjective',
            body: [
                "Japanese adjectives come in two families that behave differently, and the dictionary " +
                "will not always warn you which is which.",
                "い-adjectives end in い and conjugate like verbs — they carry their own tense. 高い is " +
                "expensive, 高かった was expensive, 高くない is not expensive. Notice there is no です " +
                "needed to make the past: the adjective did it itself.",
                "な-adjectives are really nouns wearing an adjective hat. They take な before the thing " +
                "they describe — 静かな部屋, a quiet room — and their tense goes on the copula instead: " +
                "静かでした, it was quiet. A useful trap: 綺麗 and 嫌い end in い but are な-adjectives."
            ],
            examples: [
                { jp: '高かった', en: 'was expensive', note: 'An い-adjective carrying its own past tense.' },
                { jp: '静かでした', en: 'was quiet', note: 'A な-adjective; でした does the tense for it.' }
            ],
            check: {
                q: '綺麗 ends in い. Why is it not an い-adjective?',
                a: 'Because the い is part of the kanji reading きれい, not a grammatical ending. It ' +
                   'behaves as a な-adjective: 綺麗な花, 綺麗でした. 嫌い and 有名 are the same trap.'
            }
        },
        {
            title: 'これ, それ, あれ — pointing at things',
            body: [
                "Japanese demonstratives come in a set of four that covers every combination, and once " +
                "you see the grid you never have to learn another one. The first syllable says how far: " +
                "こ is near me, そ is near you, あ is away from both, ど is the question.",
                "The endings say what kind of word it is. れ makes a standalone pronoun — これ, this one. " +
                "の attaches to a noun — この本, this book. こ makes a place — ここ, here. And んな " +
                "describes a kind — こんな, this sort of.",
                "Learners often reach for これ when they mean この. The difference is whether a noun " +
                "follows: これは本です, this is a book, versus この本は, as for this book."
            ],
            table: {
                head: ['', 'near me', 'near you', 'over there', 'which?'],
                rows: [
                    ['thing', 'これ', 'それ', 'あれ', 'どれ'],
                    ['+ noun', 'この', 'その', 'あの', 'どの'],
                    ['place', 'ここ', 'そこ', 'あそこ', 'どこ'],
                    ['kind of', 'こんな', 'そんな', 'あんな', 'どんな'],
                    ['way', 'こう', 'そう', 'ああ', 'どう']
                ]
            },
            examples: [
                { jp: 'これは私の本です', en: 'This is my book', note: 'これ stands alone — no noun after it.' },
                { jp: 'この本は面白いです', en: 'This book is interesting', note: 'この needs the noun.' }
            ],
            check: {
                q: 'When do you use これ and when この?',
                a: 'これ stands on its own as this one. この must be followed by the noun it points at. ' +
                   'The same split runs through the whole grid.'
            }
        },
        {
            title: 'Asking with question words',
            body: [
                "Japanese question words slot into the same position the answer would occupy, which " +
                "means you do not have to reorder anything. Where English moves the question to the " +
                "front, Japanese leaves it exactly where the missing information belongs and adds か " +
                "at the end.",
                "何を食べますか, what will you eat, has 何 sitting where the food would go. Answer it and " +
                "you drop the answer into the same slot. This is one of the genuinely easy parts of " +
                "Japanese grammar, and it holds for every question word in the list."
            ],
            table: {
                head: ['Japanese', 'Reading', 'Asks'],
                rows: [
                    ['何', 'nani / nan', 'what'],
                    ['誰', 'dare', 'who'],
                    ['どこ', 'doko', 'where'],
                    ['いつ', 'itsu', 'when'],
                    ['どう', 'dou', 'how'],
                    ['どうして / なぜ', 'doushite / naze', 'why'],
                    ['いくら', 'ikura', 'how much — price'],
                    ['いくつ', 'ikutsu', 'how many'],
                    ['どの', 'dono', 'which']
                ]
            },
            examples: [
                { jp: '何を食べますか', en: 'What will you eat?',
                  note: '何 sits exactly where the food would. Nothing moves.' }
            ],
            check: {
                q: 'How does Japanese word order change when you ask a question?',
                a: 'It does not. The question word goes where the answer would go, and か marks the ' +
                   'sentence as a question at the end.'
            }
        }
    ],
    steps: [
        { text: 'Look up the words you would use about yourself: I, you, name, student, teacher.',
          href: 'dictionary.html#q=%E7%A7%81', label: 'Start with 私' },
        { text: 'Search in English to find the Japanese — try "to eat", "to go", "water".',
          href: 'dictionary.html#q=to%20eat', label: 'Search "to eat"' },
        { text: 'Drill vocabulary until the common ones come without thinking.',
          href: 'practice.html#vocabulary=n5', label: 'N5 vocabulary' }
    ]
},
{
    id: 'domains',
    title: 'Vocabulary by place',
    aim: 'The words that come with a room, a job or a journey.',
    body: 'Vocabulary learned by topic sticks better than vocabulary learned by frequency, because you ' +
        'meet it all at once when you are actually there.',
    lessons: [
        {
            title: 'Food and the kitchen',
            body: [
                "Food vocabulary pays back immediately, because you use it several times a day and " +
                "because menus are made of it. Start with the staples and the verbs that go with them.",
                "One point of grammar rides along here: 作る is to make and 料理する is to cook, and " +
                "料理 by itself is both the activity and the dish. Similarly 飲む covers drinking " +
                "anything including soup, which Japanese drinks rather than eats."
            ],
            table: {
                head: ['Japanese', 'Reading', 'Means'],
                rows: [
                    ['ご飯', 'gohan', 'rice, or a meal'],
                    ['肉', 'niku', 'meat'],
                    ['魚', 'sakana', 'fish'],
                    ['野菜', 'yasai', 'vegetables'],
                    ['卵', 'tamago', 'egg'],
                    ['水 / お茶', 'mizu / ocha', 'water / tea'],
                    ['朝ご飯 / 昼ご飯 / 晩ご飯', '—', 'breakfast / lunch / dinner'],
                    ['作る', 'tsukuru', 'to make'],
                    ['焼く / 煮る / 揚げる', '—', 'grill / simmer / deep-fry'],
                    ['おいしい / まずい', '—', 'tasty / unpleasant']
                ]
            },
            check: {
                q: 'What does ご飯 mean besides rice?',
                a: 'A meal. 朝ご飯 is breakfast whether or not any rice is involved — the staple food ' +
                   'gave its name to eating generally.'
            }
        },
        {
            title: 'Home and daily routine',
            body: [
                "The house and the day that happens in it. These are the words a diary entry needs, " +
                "which makes them a good set to learn if you are writing anything for practice.",
                "Note that several everyday actions pair a noun with する or a specific verb rather " +
                "than translating one-to-one: お風呂に入る is to take a bath, literally to enter the " +
                "bath, and 歯を磨く is to brush teeth, literally to polish them."
            ],
            table: {
                head: ['Japanese', 'Reading', 'Means'],
                rows: [
                    ['家 / うち', 'ie / uchi', 'house / home'],
                    ['部屋', 'heya', 'room'],
                    ['台所', 'daidokoro', 'kitchen'],
                    ['お風呂', 'ofuro', 'bath'],
                    ['起きる / 寝る', '—', 'get up / sleep'],
                    ['お風呂に入る', '—', 'take a bath'],
                    ['歯を磨く', '—', 'brush your teeth'],
                    ['掃除する / 洗濯する', '—', 'clean / do laundry'],
                    ['出かける / 帰る', '—', 'go out / come home']
                ]
            },
            check: {
                q: 'Why is it お風呂に入る rather than お風呂をする?',
                a: 'Because Japanese describes it as entering the bath. Several daily actions pair a ' +
                   'noun with a specific verb rather than する.'
            }
        },
        {
            title: 'Work and school',
            body: [
                "These two share most of their vocabulary, because the social shape is similar: a " +
                "place, a schedule, people above and below you, and a lot of meetings.",
                "先輩 and 後輩 have no English equivalent and matter more than the words suggest. They " +
                "mark whether someone entered before or after you, in a school or a company, and that " +
                "relationship persists regardless of age or ability — it decides which register you " +
                "speak in for years."
            ],
            table: {
                head: ['Japanese', 'Reading', 'Means'],
                rows: [
                    ['会社', 'kaisha', 'company'],
                    ['学校 / 大学', '—', 'school / university'],
                    ['仕事', 'shigoto', 'work, a job'],
                    ['会議', 'kaigi', 'meeting'],
                    ['宿題', 'shukudai', 'homework'],
                    ['試験 / テスト', '—', 'exam / test'],
                    ['先輩 / 後輩', 'senpai / kouhai', 'senior / junior by entry, not age'],
                    ['同僚', 'douryou', 'colleague'],
                    ['休み', 'yasumi', 'a day off, a holiday'],
                    ['残業', 'zangyou', 'overtime']
                ]
            },
            check: {
                q: 'Is a 先輩 necessarily older than you?',
                a: 'No. The word marks who entered the school or company first. Someone younger who ' +
                   'joined a year earlier is still your 先輩.'
            }
        },
        {
            title: 'Travel, shopping and money',
            body: [
                "The words for getting about and paying for things. Most of these you will read before " +
                "you say — on signs, tickets and receipts — which makes recognition the priority.",
                "Two practical notes. 切符 is a paper ticket and most people now use an IC card, so you " +
                "will hear カード more. And お釣り, change, is worth having ready, along with " +
                "レシート for the receipt as against 領収書, which is the formal receipt you ask for if " +
                "you need to claim expenses."
            ],
            table: {
                head: ['Japanese', 'Reading', 'Means'],
                rows: [
                    ['駅 / 空港', 'eki / kuukou', 'station / airport'],
                    ['電車 / バス / 地下鉄', '—', 'train / bus / underground'],
                    ['切符', 'kippu', 'ticket'],
                    ['荷物', 'nimotsu', 'luggage'],
                    ['店 / お店', 'mise', 'shop'],
                    ['値段', 'nedan', 'price'],
                    ['お釣り', 'otsuri', 'change'],
                    ['レシート / 領収書', '—', 'receipt / formal receipt'],
                    ['安い / 高い', '—', 'cheap / expensive'],
                    ['予約する', 'yoyaku suru', 'to book, to reserve']
                ]
            },
            examples: [
                { jp: '予約したいんですが', en: 'I would like to make a booking…',
                  note: 'んですが trailing off — the polite opening from the hedging lesson.' }
            ],
            check: {
                q: 'When would you ask for a 領収書 rather than a レシート?',
                a: 'When you need to claim it back. A レシート is the ordinary till receipt; a 領収書 is ' +
                   'the formal one made out to a name.'
            }
        }
    ],
    steps: [
        { text: 'Look up a word from a set you use daily.',
          href: 'dictionary.html#q=仕事', label: 'Look up 仕事' },
        { text: 'Break down a booking request.',
          href: 'dictionary.html#s=予約したいんですが', label: 'Break down a request' },
        { text: 'Drill vocabulary at the next level up.',
          href: 'practice.html#vocabulary=n4', label: 'N4 vocabulary' }
    ]
},
{
    id: 'describing',
    title: 'Describing and comparing',
    aim: 'Degree, comparison, and the adjectives that behave like verbs.',
    body: 'Once you can name things, the next thing you want is to say how much, and which of two you ' +
        'prefer. Both are more regular in Japanese than in English.',
    lessons: [
        {
            title: 'How much — the degree words',
            body: [
                "A handful of adverbs sit in front of an adjective or verb and set the intensity. They " +
                "go before what they modify and nothing else changes, so they are the cheapest way to " +
                "make a sentence say more.",
                "Two of them are traps, because they force the rest of the sentence negative. あまり " +
                "means not very and 全然 means not at all — but both require a negative ending to " +
                "finish the thought. あまり高いです is wrong; あまり高くないです is right. The adverb " +
                "sets up a negative that the verb has to deliver."
            ],
            table: {
                head: ['Word', 'Means', 'Note'],
                rows: [
                    ['とても', 'very', ''],
                    ['すごく', 'really', 'casual'],
                    ['ちょっと', 'a little', 'also softens a refusal'],
                    ['少し すこし', 'a little', 'politer than ちょっと'],
                    ['あまり', 'not very', 'needs a negative ending'],
                    ['全然 ぜんぜん', 'not at all', 'needs a negative ending'],
                    ['もっと', 'more', ''],
                    ['たくさん', 'a lot', 'quantity, not intensity']
                ]
            },
            examples: [
                { jp: 'あまり高くないです', en: 'It is not very expensive',
                  note: 'あまり at the front, negative at the back. Both halves are required.' }
            ],
            check: {
                q: 'What is wrong with 全然おいしいです?',
                a: '全然 demands a negative. Either finish it — 全然おいしくないです — or use a different ' +
                   'adverb. In very casual speech the positive turns up, but not in anything you write.'
            }
        },
        {
            title: 'Comparing two things, and picking a best',
            body: [
                "Japanese has no comparative form — no -er, no more. Comparison is done with particles " +
                "instead, which means the adjective never changes.",
                "より marks the thing you are comparing against: AはBより高い, A is more expensive than B. " +
                "For a question or a preference, のほうが marks the side you favour: コーヒーのほうが " +
                "いいです, coffee is better. And 一番, literally number one, makes a superlative: " +
                "一番高い, the most expensive.",
                "For a comparison question the frame is fixed and worth memorising whole: AとBとどちらが " +
                "— between A and B, which?"
            ],
            table: {
                head: ['Pattern', 'Means', 'Example'],
                rows: [
                    ['AはBより〜', 'A is more ~ than B', '日本語は英語より難しい'],
                    ['Aのほうが〜', 'A is the more ~ one', 'コーヒーのほうがいいです'],
                    ['AとBとどちらが〜', 'which of A and B is ~?', 'コーヒーと紅茶とどちらが好きですか'],
                    ['〜の中で一番〜', 'the most ~ of all', 'クラスの中で一番高い']
                ]
            },
            examples: [
                { jp: '日本語は英語より難しいです', en: 'Japanese is harder than English',
                  note: 'より does the comparing. 難しい itself never changes shape.' }
            ],
            check: {
                q: 'How do you say more expensive in Japanese?',
                a: 'You do not — 高い is already it. The comparison lives in より or のほうが, not in the ' +
                   'adjective.'
            }
        },
        {
            title: 'Liking, wanting, and the が that surprises everyone',
            body: [
                "好き is not a verb. It is a な-adjective meaning likeable, which changes the whole shape " +
                "of the sentence: what you like is not an object taking を but a subject taking が. " +
                "私は寿司が好きです is literally as for me, sushi is likeable.",
                "The same pattern covers a set of very common words: 嫌い for dislike, 上手 and 下手 for " +
                "good and bad at, and 欲しい for wanting a thing. All of them take が, and all of them " +
                "sit on a は topic that is usually left out.",
                "Wanting to do something is different again — that is the たい form from the verb stage, " +
                "and it also prefers が, though を is common and accepted."
            ],
            table: {
                head: ['Pattern', 'Means', 'Example'],
                rows: [
                    ['〜が好き', 'like ~', '寿司が好きです'],
                    ['〜が嫌い', 'dislike ~', '納豆が嫌いです'],
                    ['〜が上手', 'good at ~', '日本語が上手ですね'],
                    ['〜が下手', 'bad at ~', '料理が下手です'],
                    ['〜が欲しい', 'want ~ (a thing)', '車が欲しいです'],
                    ['〜たい', 'want to ~ (do)', '行きたいです']
                ]
            },
            examples: [
                { jp: '寿司が好きです', en: 'I like sushi',
                  note: 'が, not を — 好き is an adjective, and sushi is what is likeable.' }
            ],
            check: {
                q: 'Why is 寿司を好きです wrong?',
                a: 'Because 好き is not a verb and takes no object. Sushi is the subject of being ' +
                   'likeable, so it takes が.'
            }
        },
        {
            title: 'Colours, and the ones that are secretly nouns',
            body: [
                "Some colours are い-adjectives and behave like any other: 赤い, 青い, 白い, 黒い, 黄色い. " +
                "They go straight in front of a noun and carry their own tense.",
                "The rest are nouns, and they need の to attach: 緑の車, a green car — not 緑い. Pink, " +
                "grey, orange and most borrowed colour words work this way too, since they arrived as " +
                "nouns from other languages.",
                "This is the same い versus な split from the vocabulary stage showing up in a place " +
                "where the difference is visible, which makes colours a good way to test whether the " +
                "distinction has landed."
            ],
            table: {
                head: ['Colour', 'Type', 'With a noun'],
                rows: [
                    ['赤い', 'い-adjective', '赤い車'],
                    ['青い', 'い-adjective', '青い空'],
                    ['白い', 'い-adjective', '白い紙'],
                    ['黒い', 'い-adjective', '黒い猫'],
                    ['緑', 'noun', '緑の車'],
                    ['紫', 'noun', '紫の花'],
                    ['ピンク', 'noun', 'ピンクのシャツ']
                ]
            },
            check: {
                q: 'How do you say a green car?',
                a: '緑の車. 緑 is a noun, so it needs の. 緑い is not a word — unlike 赤い, which is.'
            }
        }
    ],
    steps: [
        { text: 'Look up 好き and notice it is filed as an adjective, not a verb.',
          href: 'dictionary.html#q=好き', label: 'Look up 好き' },
        { text: 'Break down a comparison and watch より do the work.',
          href: 'dictionary.html#s=日本語は英語より難しいです', label: 'Break down a comparison' },
        { text: 'Drill the adjectives and adverbs.',
          href: 'practice.html#vocabulary=n5', label: 'N5 vocabulary' }
    ]
},
{
    id: 'numbers',
    title: 'Numbers, time and counting',
    aim: 'The system, the irregular readings, and how to say when.',
    body: 'Numbers are regular right up until they are not. The exceptions are few, fixed, and turn up ' +
        'constantly, so they are worth learning as a block.',
    lessons: [
        {
            title: 'The number system, and the unit English lacks',
            body: [
                "One to ten are the foundation and everything else is built from them: eleven is " +
                "十一, ten-one; twenty is 二十, two-ten; ninety-nine is 九十九. There is no separate word " +
                "for eleven or for twenty, which makes the first hundred numbers almost free.",
                "Above that, Japanese groups by ten thousand rather than by thousand. English steps " +
                "thousand, million, billion; Japanese steps 万 ten-thousand, 億 hundred-million, " +
                "兆 trillion. So a hundred thousand is 十万, ten ten-thousands, and a million is 百万, " +
                "a hundred ten-thousands. This is the single most common place where people lose track " +
                "of a price."
            ],
            table: {
                head: ['Number', 'Japanese', 'Reading'],
                rows: [
                    ['1–10', '一二三四五六七八九十', 'ichi ni san yon go roku nana hachi kyuu juu'],
                    ['11', '十一', 'juu-ichi'],
                    ['20', '二十', 'ni-juu'],
                    ['100', '百', 'hyaku'],
                    ['1,000', '千', 'sen'],
                    ['10,000', '一万', 'ichi-man'],
                    ['100,000', '十万', 'juu-man — ten ten-thousands'],
                    ['1,000,000', '百万', 'hyaku-man — a hundred ten-thousands']
                ]
            },
            check: {
                q: 'A price reads 三万円. How much is that?',
                a: 'Thirty thousand yen — three ten-thousands. Reading it as three thousand is the ' +
                   'classic mistake, and an expensive one.'
            }
        },
        {
            title: 'Four, seven and nine have two readings each',
            body: [
                "Three numbers are unstable. Four is よん or し, seven is なな or しち, nine is きゅう or " +
                "く, and which one you use depends on what follows. There is no rule that covers it — " +
                "the combinations are simply fixed, and you learn them where they occur.",
                "The reason is superstition as much as phonetics: し also reads as death and く as " +
                "suffering, so よん and きゅう took over in most everyday counting. But the older " +
                "readings survive inside set expressions, especially times and dates, which is exactly " +
                "where a beginner meets them first."
            ],
            table: {
                head: ['', 'Usually', 'But in time'],
                rows: [
                    ['4', 'よん', '四時 よじ — four o\u2019clock'],
                    ['7', 'なな', '七時 しちじ — seven o\u2019clock'],
                    ['9', 'きゅう', '九時 くじ — nine o\u2019clock'],
                    ['4 (minutes)', '—', '四分 よんぷん'],
                    ['1 (minute)', '—', '一分 いっぷん — not いちふん']
                ]
            },
            check: {
                q: 'Why is four o\u2019clock よじ rather than よんじ or しじ?',
                a: 'Because the time readings are fixed by usage, not by rule. よじ is simply the form ' +
                   'that stuck, and it has to be learned as a word rather than assembled.'
            }
        },
        {
            title: 'Telling the time and saying when',
            body: [
                "Time is number plus 時 for the hour and number plus 分 for minutes, with 半 for half " +
                "past. 午前 marks morning and 午後 afternoon, and they go in front rather than behind: " +
                "午後三時, three in the afternoon.",
                "The word for minute changes shape depending on the number in front of it — ふん after " +
                "some, ぷん after others — which is a sound change rather than a rule worth memorising " +
                "in the abstract. Say a few and the pattern sets itself.",
                "Relative time words carry more weight in Japanese than in English because they let you " +
                "skip tense complexity entirely. 今日, 明日, 昨日, 毎日 and 今 will get you through most " +
                "early conversations."
            ],
            table: {
                head: ['Japanese', 'Reading', 'Meaning'],
                rows: [
                    ['三時', 'sanji', '3 o\u2019clock'],
                    ['三時半', 'sanji-han', 'half past three'],
                    ['三時十五分', 'sanji juugo-fun', '3:15'],
                    ['午前 / 午後', 'gozen / gogo', 'a.m. / p.m.'],
                    ['今日', 'kyou', 'today'],
                    ['明日', 'ashita', 'tomorrow'],
                    ['昨日', 'kinou', 'yesterday'],
                    ['毎日', 'mainichi', 'every day']
                ]
            },
            examples: [
                { jp: '会議は三時からです', en: 'The meeting is from three',
                  note: 'から marks the start; 時 makes the number a time.' }
            ],
            check: {
                q: 'How would you say half past nine in the morning?',
                a: '午前九時半 — gozen kuji han. Note the く reading of nine, which the clock demands.'
            }
        },
        {
            title: 'Days, months and dates',
            body: [
                "Months are pure arithmetic: 一月 is January, 二月 February, straight through to 十二月. " +
                "There is nothing to memorise beyond the numbers.",
                "Days of the month are the opposite. The first twelve or so have their own readings " +
                "inherited from older Japanese, and they must be learned individually — ついたち for the " +
                "first, ふつか for the second, みっか for the third. From about the eleventh onwards the " +
                "regular number plus にち takes over, with a few holdouts like 十四日 and 二十日.",
                "Weekdays are named after the classical elements, which makes them easy to remember once " +
                "you see it: sun, moon, fire, water, wood, gold, earth."
            ],
            table: {
                head: ['Japanese', 'Reading', 'Meaning'],
                rows: [
                    ['一月', 'ichi-gatsu', 'January'],
                    ['一日', 'tsuitachi', 'the 1st — irregular'],
                    ['二日', 'futsuka', 'the 2nd — irregular'],
                    ['三日', 'mikka', 'the 3rd — irregular'],
                    ['十四日', 'juuyokka', 'the 14th — irregular'],
                    ['二十日', 'hatsuka', 'the 20th — irregular'],
                    ['日曜日', 'nichiyoubi', 'Sunday — sun day'],
                    ['月曜日', 'getsuyoubi', 'Monday — moon day'],
                    ['火曜日', 'kayoubi', 'Tuesday — fire day'],
                    ['水曜日', 'suiyoubi', 'Wednesday — water day']
                ]
            },
            examples: [
                { jp: '一日', en: 'the first of the month',
                  note: 'ついたち here, but いちにち when it means one whole day. Same writing.' }
            ],
            check: {
                q: '一月一日 — how is each 一 read?',
                a: 'いちがつ ついたち. The month is regular, the day is not, and the same character reads ' +
                   'differently twice in four syllables.'
            }
        },
        {
            title: 'Numbers in the wild — money, phones, addresses',
            body: [
                "Three everyday places use numbers in ways the counting lesson does not cover, and all " +
                "three catch people out.",
                "Money is straightforward once the 万 grouping is in hand: prices are the number plus " +
                "円, and a five-figure price will be spoken in 万. 一万五千円 is fifteen thousand yen. " +
                "Coins go up to 500 and notes start at 1,000, so cash transactions involve larger " +
                "numbers than most countries.",
                "Phone numbers are read digit by digit, with の standing in for the hyphen: 03-1234-5678 " +
                "is ゼロさん の いちにーさんよん の ごーろくななはち. Note にー and ごー stretched, and " +
                "よん and なな rather than し and しち — precisely to avoid the confusion those cause.",
                "Addresses run the opposite way to English: largest unit first. Prefecture, city, ward, " +
                "district, block, building number. The house number comes last, which means you can " +
                "read a Japanese address top to bottom and get steadily closer."
            ],
            table: {
                head: ['Written', 'Read as', 'Note'],
                rows: [
                    ['1,500円', 'せんごひゃくえん', 'ordinary price'],
                    ['15,000円', 'いちまんごせんえん', 'grouped by 万'],
                    ['03-1234-5678', 'ゼロさん の …', 'の for the hyphen'],
                    ['〒100-0001', 'postal code', 'always written before the address'],
                    ['東京都新宿区…', 'largest unit first', 'the opposite of English order']
                ]
            },
            check: {
                q: 'Why are 4 and 7 read よん and なな in phone numbers?',
                a: 'To avoid confusion. し and しち sound too alike over a phone line, so the ' +
                   'unambiguous readings are used for anything spoken digit by digit.'
            }
        },
        {
            title: 'Eras, and saying when relative to now',
            body: [
                "Japan counts years twice. The Western calendar is used everywhere, but official " +
                "documents, forms and news also use era names tied to the reign of the emperor. " +
                "令和 began in 2019, 平成 ran from 1989, and 昭和 from 1926 — so 昭和五十年 is 1975, " +
                "and a form asking for your birth year may expect this.",
                "The arithmetic is simple once you know the start year: era year plus start year minus " +
                "one. But most people simply learn the current era and the last two, because those " +
                "cover everything a living person needs.",
                "For relative time, Japanese extends further from now than English does in one word. " +
                "おととい is the day before yesterday and あさって the day after tomorrow, both single " +
                "words. The same runs through weeks, months and years — 先々週, 再来年 — and " +
                "〜ぶり measures a gap: 三年ぶり, for the first time in three years."
            ],
            table: {
                head: ['Japanese', 'Means'],
                rows: [
                    ['令和 / 平成 / 昭和', 'eras from 2019 / 1989 / 1926'],
                    ['おととい / 昨日 / 今日 / 明日 / あさって', 'the five days around now'],
                    ['先々週 / 先週 / 今週 / 来週 / 再来週', 'the five weeks around now'],
                    ['先月 / 今月 / 来月', 'last, this, next month'],
                    ['去年 / 今年 / 来年 / 再来年', 'last, this, next, the year after'],
                    ['三年ぶり', 'for the first time in three years'],
                    ['〜おきに', 'every other ~']
                ]
            },
            check: {
                q: 'A form asks for your birth year and shows 昭和 / 平成 / 令和. What is it asking?',
                a: 'Which era you were born in, then the year within it. Japan uses both calendars, and ' +
                   'official paperwork often expects the era one.'
            }
        }
    ],
    steps: [
        { text: 'Trace the numerals — they are the fewest strokes you will ever get for this much use.',
          href: 'writing.html#trace=一', label: 'Trace 一' },
        { text: 'Trace 時, which turns any number into a time.',
          href: 'writing.html#trace=時', label: 'Trace 時' },
        { text: 'Look up 一日 and notice the two readings sitting in one entry.',
          href: 'dictionary.html#q=一日', label: 'Look up 一日' },
        { text: 'Drill the number vocabulary until the irregular ones stop catching you.',
          href: 'practice.html#vocabulary=n5', label: 'N5 vocabulary' }
    ]
},
{
    id: 'counters',
    title: 'Counting things properly',
    aim: 'The counters, and the sound changes nobody warns you about.',
    body: 'Counting in Japanese needs a word between the number and the thing, and the number itself ' +
        'often changes shape to fit it. This is the part beginners quietly avoid.',
    lessons: [
        {
            title: 'Why the number keeps changing',
            body: [
                "一本 is いっぽん, 三本 is さんぼん, 六本 is ろっぽん. The counter is the same 本 " +
                "throughout and the sound moves anyway, which makes counters feel arbitrary when they " +
                "are actually regular.",
                "The rule is about ease of pronunciation. A counter starting with h — 本, 匹, 杯, 分 — " +
                "turns into p after 1, 6, 8 and 10, and into b after 3. A counter starting with k — 個, " +
                "階, 回 — doubles its consonant after the same numbers. Everything else stays put.",
                "You do not need to memorise the rule as a rule. Say each set out loud a few times and " +
                "the pattern installs itself, because it exists precisely because the unchanged versions " +
                "are awkward to say."
            ],
            table: {
                head: ['', '本 long things', '匹 small animals', '個 small objects', '人 people'],
                rows: [
                    ['1', 'いっぽん', 'いっぴき', 'いっこ', 'ひとり'],
                    ['2', 'にほん', 'にひき', 'にこ', 'ふたり'],
                    ['3', 'さんぼん', 'さんびき', 'さんこ', 'さんにん'],
                    ['4', 'よんほん', 'よんひき', 'よんこ', 'よにん'],
                    ['6', 'ろっぽん', 'ろっぴき', 'ろっこ', 'ろくにん'],
                    ['8', 'はっぽん', 'はっぴき', 'はっこ', 'はちにん'],
                    ['10', 'じゅっぽん', 'じゅっぴき', 'じゅっこ', 'じゅうにん']
                ]
            },
            check: {
                q: 'Why is 三本 さんぼん rather than さんほん?',
                a: 'Because a counter beginning with h voices to b after three. It is a sound change ' +
                   'for ease of speech, and it applies across the whole h-initial family.'
            }
        },
        {
            title: 'The counters worth having',
            body: [
                "There are hundreds and you need about ten. The rest can be handled with つ, the " +
                "general counter, which works for most objects up to nine and is what native speakers " +
                "reach for when the specific counter escapes them too.",
                "One irregularity worth flagging: 一人 and 二人 are ひとり and ふたり, not いちにん and " +
                "ににん — the older native readings survived for exactly the two numbers used most. And " +
                "二十歳, twenty years old, is はたち, a word with no relation to its parts at all."
            ],
            table: {
                head: ['Counter', 'For', 'Example'],
                rows: [
                    ['つ', 'anything, 1–9', '三つ'],
                    ['人 にん', 'people', '三人'],
                    ['本 ほん', 'long thin things', 'ペン三本'],
                    ['枚 まい', 'flat thin things', '紙三枚'],
                    ['個 こ', 'small objects', 'りんご三個'],
                    ['匹 ひき', 'small animals', '猫三匹'],
                    ['台 だい', 'machines, vehicles', '車三台'],
                    ['冊 さつ', 'books', '本三冊'],
                    ['杯 はい', 'cupfuls, glassfuls', 'コーヒー三杯'],
                    ['歳 さい', 'years of age', '二十歳 — はたち']
                ]
            },
            examples: [
                { jp: 'コーヒーを二杯飲みました', en: 'I drank two cups of coffee',
                  note: 'The counter goes after the number and before the verb, not attached to the noun.' }
            ],
            check: {
                q: 'You cannot remember the counter for something. What do you say?',
                a: 'Use つ — 三つ. It is the general counter, it works to nine, and native speakers use ' +
                   'it the same way when the specific one escapes them.'
            }
        },
        {
            title: 'Order, fractions and how often',
            body: [
                "Ordinals add 目 to a counter: 三人目 the third person, 三日目 the third day. For " +
                "positions in a sequence, 番目 is the general form — 三番目, the third one.",
                "Fractions run backwards from English: the denominator comes first. 三分の一 is one " +
                "third, literally of three parts, one. Percentages use パーセント, but 割 is also " +
                "common and means a tenth, so 三割 is thirty per cent.",
                "Frequency uses ordinary adverbs plus a counter: 週に三回, three times a week. The に " +
                "there marks the period, and the same frame handles 一日に二回 and 月に一回."
            ],
            table: {
                head: ['Japanese', 'Means'],
                rows: [
                    ['三番目', 'the third one'],
                    ['三日目', 'the third day'],
                    ['三分の一', 'one third'],
                    ['三割', 'thirty per cent'],
                    ['週に三回', 'three times a week'],
                    ['一日中', 'all day long'],
                    ['三時間', 'three hours — duration'],
                    ['三時', 'three o\u2019clock — a point in time']
                ]
            },
            examples: [
                { jp: '週に三回行きます', en: 'I go three times a week',
                  note: 'に marks the period, 回 counts the occasions.' }
            ],
            check: {
                q: 'What is the difference between 三時 and 三時間?',
                a: '三時 is three o\u2019clock, a point. 三時間 is three hours, a duration. 間 is what ' +
                   'turns a moment into a length.'
            }
        }
    ],
    steps: [
        { text: 'Look up a counter and see how many things it covers.',
          href: 'dictionary.html#q=本', label: 'Look up 本' },
        { text: 'Break down a sentence with a counter in it.',
          href: 'dictionary.html#s=コーヒーを二杯飲みました', label: 'Break down a counter' },
        { text: 'Drill the number vocabulary.',
          href: 'practice.html#vocabulary=n5', label: 'N5 vocabulary' }
    ]
},
{
    id: 'sentences',
    title: 'How a sentence holds together',
    aim: 'Particles, and the verb going last.',
    body: 'Japanese marks what each word is doing with a particle rather than by word order, and the ' +
        'verb comes last.',
    lessons: [
        {
            title: 'The verb waits until the end',
            body: [
                "English fixes meaning with order: the dog bit the man is not the man bit the dog. " +
                "Japanese fixes it with particles, so the order of the pieces is comparatively free — " +
                "with one hard rule. The verb goes last. Everything else is setup.",
                "This has a consequence worth bracing for: you do not know what happened until the " +
                "sentence ends, and you do not know whether it happened at all until after that, because " +
                "the negative is also on the end. Listening to Japanese means holding the pieces until " +
                "the verb lands.",
                "The other habit to build early is that Japanese omits anything obvious. If it is clear " +
                "you are talking about yourself, 私は disappears. Sentences with no visible subject are " +
                "normal, not elliptical."
            ],
            examples: [
                { jp: '私は本を読みます', en: 'I read a book',
                  note: 'topic — object — verb. Drop 私は and it still means the same thing.' },
                { jp: '本を読みません', en: 'I do not read books',
                  note: 'The negative arrives after the verb, at the very end.' }
            ],
            check: {
                q: 'Why is Japanese word order called free when the verb is fixed at the end?',
                a: 'Because the particles, not the positions, say who did what. Move 本を before 私は and ' +
                   'the sentence still means the same — the を is still marking the book as the object.'
            }
        },
        {
            title: 'The particles, one at a time',
            body: [
                "Particles are the grammar. Each one attaches to the word before it and names that " +
                "word's job in the sentence. There are not many, and the common ones do most of the work.",
                "Two warnings about how they are written. は is read wa when it is the topic particle, " +
                "and へ is read e when it marks direction — both are historical spellings. And を is only " +
                "ever the object particle; it is not used to write the sound o inside a word."
            ],
            table: {
                head: ['Particle', 'Marks', 'Example'],
                rows: [
                    ['は (wa)', 'the topic — what the sentence is about', '私は学生です — as for me, student'],
                    ['が', 'the subject, often new information', '雨が降る — it rains'],
                    ['を (o)', 'the direct object', 'ご飯を食べる — eat a meal'],
                    ['に', 'destination, time, indirect object', '学校に行く — go to school'],
                    ['で', 'where an action happens, or the means', '家で食べる — eat at home'],
                    ['へ (e)', 'direction, softer than に', '東京へ — towards Tokyo'],
                    ['と', 'with, and — a complete list', '友達と行く — go with a friend'],
                    ['や', 'and — an incomplete list', '本や雑誌 — books, magazines and so on'],
                    ['から', 'from, or because', '三時から — from three o\u2019clock'],
                    ['まで', 'until, as far as', '駅まで — as far as the station'],
                    ['の', 'of, belonging to', '私の本 — my book'],
                    ['も', 'also, too', '私も — me too']
                ]
            },
            examples: [
                { jp: '学校で日本語を勉強します', en: 'I study Japanese at school',
                  note: 'で for the place, を for the object. Break it down to see the roles named.' }
            ],
            check: {
                q: 'What is the difference between 家に行く and 家で食べる?',
                a: 'に marks a destination — the place you end up. で marks where an action takes place. ' +
                   'Going has a destination; eating has a location.'
            }
        },
        {
            title: 'は versus が, honestly',
            body: [
                "This is the first genuinely hard thing in Japanese, and no short rule covers it. What " +
                "follows is enough to be right most of the time early on.",
                "は sets the topic: it says here is what I am talking about, and everything after is the " +
                "comment. It often translates as as for. が picks out the subject, and it tends to carry " +
                "new or contrasted information — the answer to a question rather than the setup for one.",
                "A useful test: が answers who or what, は does not. Ask who came, and the answer is " +
                "田中さんが来ました, with が pointing at the new fact. Say 田中さんは来ました and you are " +
                "telling me something about Tanaka, whom we were already discussing.",
                "Do not try to settle this now. Read a few hundred sentences and it starts to feel " +
                "obvious long before you can explain it."
            ],
            examples: [
                { jp: '田中さんが来ました', en: 'Tanaka came',
                  note: 'が — the new information is who it was.' },
                { jp: '田中さんは来ました', en: 'Tanaka did come',
                  note: 'は — we were already talking about Tanaka; this is the news about him.' }
            ],
            check: {
                q: 'Someone asks 誰が食べましたか — who ate? Would you answer with は or が?',
                a: 'が. The question is asking for new information, and the answer supplies exactly the ' +
                   'piece が marks. Answering with は would sound like changing the subject.'
            }
        },
        {
            title: 'です and ます, the two polite endings',
            body: [
                "です attaches to nouns and な-adjectives and means is. ます attaches to verbs and makes " +
                "them polite. Between them they end most sentences a beginner will write, and both carry " +
                "the tense and the negative for the sentence.",
                "Learn these four shapes as a block. Every polite sentence you meet is one of them."
            ],
            table: {
                head: ['', 'です — nouns', 'ます — verbs'],
                rows: [
                    ['now', '学生です — is a student', '食べます — eat'],
                    ['not now', '学生ではありません', '食べません — do not eat'],
                    ['past', '学生でした — was a student', '食べました — ate'],
                    ['not past', '学生ではありませんでした', '食べませんでした — did not eat']
                ]
            },
            examples: [
                { jp: '食べませんでした', en: 'did not eat',
                  note: 'Negative then past, both stacked on the end. The breakdown names each.' }
            ],
            check: {
                q: 'Where does the tense of a polite Japanese sentence live?',
                a: 'On the last word — です or ます and their forms. The verb stem never changes for ' +
                   'tense the way an English verb does; the ending does all of it.'
            }
        },
        {
            title: 'Asking, and the か at the end',
            body: [
                "Turning a statement into a question takes one character: add か to the end. 学生です " +
                "becomes 学生ですか. Nothing else moves, no auxiliary appears, and the word order stays " +
                "as it was — which is why Japanese questions are easier than English ones.",
                "In casual speech か is often dropped and the pitch rises instead, exactly as in English. " +
                "And in writing, a question mark is optional: か already did the job, so plenty of " +
                "Japanese questions end in a plain full stop.",
                "One trap: か after a question word can also mean some rather than which. 誰か is " +
                "someone, 何か is something, どこか is somewhere. Same character, opposite job."
            ],
            examples: [
                { jp: '学生ですか', en: 'Are you a student?', note: 'One character does all the work.' },
                { jp: '誰かいますか', en: 'Is anyone there?', note: '誰か is someone, not who — then か again for the question.' }
            ],
            check: {
                q: 'What is the difference between 何を食べますか and 何か食べますか?',
                a: 'The first asks what you will eat. The second asks whether you will eat something at ' +
                   'all — 何か is something, not what.'
            }
        },
        {
            title: 'There is, there are — あります and います',
            body: [
                "Japanese has two verbs for existence and picks between them by what exists. あります is " +
                "for things that do not move themselves: books, buildings, appointments. います is for " +
                "people and animals. Getting this wrong is one of the most audible beginner errors, " +
                "because it sounds like you have described a friend as furniture.",
                "The pattern is location に thing が あります. The に marks where, the が marks what " +
                "exists — and が rather than は because the existing thing is the new information, which " +
                "is the clearest everyday example of what が is for.",
                "The same verbs also cover having something: 車があります, I have a car, literally a car " +
                "exists. There is no separate verb for possession at this level."
            ],
            table: {
                head: ['Pattern', 'Example', 'Means'],
                rows: [
                    ['place に thing が あります', '机の上に本があります', 'There is a book on the desk'],
                    ['place に person が います', '教室に先生がいます', 'The teacher is in the classroom'],
                    ['thing が あります', '時間がありません', 'There is no time'],
                    ['thing が あります', '車があります', 'I have a car']
                ]
            },
            examples: [
                { jp: '教室に先生がいます', en: 'The teacher is in the classroom',
                  note: 'に for the place, が for what exists, います because it is a person.' }
            ],
            check: {
                q: 'Would you use あります or います for a taxi?',
                a: 'あります. It moves, but it does not move itself — the split is animacy, not motion. ' +
                   'The driver takes います.'
            }
        },
        {
            title: 'Sentences that are just an adjective',
            body: [
                "You do not need a verb to make a sentence. An adjective can be the whole predicate, and " +
                "how it does that depends on which family it belongs to.",
                "An い-adjective carries its own tense, so 高いです and 高かったです both work with です " +
                "simply adding politeness — and note that the past goes on the adjective, not the です. " +
                "高いでした is wrong, a mistake almost every learner makes once.",
                "A な-adjective cannot conjugate, so the copula does it: 静かです, 静かでした. Which is " +
                "another way of saying that な-adjectives behave like nouns, because that is essentially " +
                "what they are."
            ],
            table: {
                head: ['', 'い-adjective 高い', 'な-adjective 静か'],
                rows: [
                    ['now', '高いです', '静かです'],
                    ['past', '高かったです', '静かでした'],
                    ['not now', '高くないです', '静かではありません'],
                    ['not past', '高くなかったです', '静かではありませんでした'],
                    ['before a noun', '高い本', '静かな部屋']
                ]
            },
            examples: [
                { jp: '高かったです', en: 'It was expensive',
                  note: 'The past is on 高い. です only adds politeness.' }
            ],
            check: {
                q: 'Why is 高いでした wrong?',
                a: 'Because 高い already carries tense — it becomes 高かった. です cannot take the past ' +
                   'for it, the way it does for a な-adjective.'
            }
        }
    ],
    steps: [
        { text: 'Break down a first sentence and read the roles under each chunk.',
          href: 'dictionary.html#s=%E7%A7%81%E3%81%AF%E5%AD%A6%E7%94%9F%E3%81%A7%E3%81%99', label: 'Try 私は学生です' },
        { text: 'Open the Sentence tab and paste something longer — the reading handles conjugations.',
          href: 'dictionary.html', label: 'Sentence tab' },
        { text: 'Look up the particles on their own; each has more jobs than one sentence shows.',
          href: 'dictionary.html#q=%E3%81%AF', label: 'Look up は' },
        { text: 'Test the patterns.',
          href: 'practice.html#grammar=n5', label: 'N5 grammar' }
    ]
},
{
    id: 'verbs',
    title: 'How verbs change',
    aim: 'Three groups, and the forms everything else is built on.',
    body: 'Japanese verbs are regular to a degree English speakers find suspicious. Learn which group ' +
        'a verb is in and every form follows.',
    lessons: [
        {
            title: 'Three groups, and how to tell them apart',
            body: [
                "Every Japanese verb belongs to one of three groups, and the group decides how it " +
                "conjugates. There are exactly two irregular verbs in the whole language — する and " +
                "来る — which is a remarkable thing to be able to say about any language.",
                "Group 2, often called ichidan or ru-verbs, ends in る with an e or i sound before it: " +
                "食べる, 見る. They are the easy ones — drop the る and add whatever you need. Group 1, " +
                "godan or u-verbs, is everything else: the final kana shifts around its consonant row " +
                "instead.",
                "The catch is that some Group 1 verbs also end in る — 帰る, 走る, 入る — and look " +
                "exactly like Group 2. There is no way to tell from the spelling alone; they simply have " +
                "to be learned. Fortunately there are not many, and they are common enough that you meet " +
                "them early."
            ],
            table: {
                head: ['Group', 'Ends', 'Examples'],
                rows: [
                    ['2 — ichidan', 'る after an e or i sound', '食べる, 見る, 起きる, 教える'],
                    ['1 — godan', 'any other u-sound', '書く, 話す, 読む, 買う, 待つ'],
                    ['1 — the traps', 'る, but still godan', '帰る, 走る, 入る, 知る, 切る'],
                    ['3 — irregular', 'only two exist', 'する, 来る']
                ]
            },
            check: {
                q: '見る and 帰る both end in る. Why do they behave differently?',
                a: 'Because 帰る is godan despite its ending — it is one of the handful that look like ' +
                   'Group 2 and are not. 見ます but 帰ります, not 帰ます.'
            }
        },
        {
            title: 'The ます-form, and the stem underneath it',
            body: [
                "The polite form is where most learners start, and it is built from a piece of the verb " +
                "worth naming: the stem. For Group 2, drop the る. For Group 1, shift the last kana from " +
                "the u-row to the i-row — く becomes き, む becomes み, す becomes し.",
                "That stem is not only for ます. It carries たい for wanting, ながら for doing two things " +
                "at once, and やすい and にくい for easy and hard to do. Learn the stem and you have " +
                "learned the hook that half a dozen endings hang on.",
                "The Sentence tab names this when it finds one: a word tagged as a stem is this form, " +
                "standing on its own."
            ],
            table: {
                head: ['Dictionary', 'Stem', 'Polite'],
                rows: [
                    ['食べる — group 2', '食べ', '食べます'],
                    ['見る — group 2', '見', '見ます'],
                    ['書く — group 1', '書き', '書きます'],
                    ['話す — group 1', '話し', '話します'],
                    ['読む — group 1', '読み', '読みます'],
                    ['する — irregular', 'し', 'します'],
                    ['来る — irregular', 'き', '来ます']
                ]
            },
            examples: [
                { jp: '食べたい', en: 'want to eat', note: 'Stem 食べ plus たい — no ます involved.' },
                { jp: '読みながら', en: 'while reading', note: 'The same stem, a different ending.' }
            ],
            check: {
                q: 'What do 書きます, 書きたい and 書きながら have in common?',
                a: 'The stem 書き. Three different endings, one hook — which is why the stem is worth ' +
                   'learning as a thing in its own right.'
            }
        },
        {
            title: 'The te-form, and why it is worth the trouble',
            body: [
                "The te-form is the most useful single thing at this level and the only place Japanese " +
                "conjugation gets genuinely fiddly. It joins clauses — do this, then that — and it is " +
                "the socket that a dozen common endings plug into.",
                "Group 2 is trivial: drop る, add て. Group 1 depends on the final kana, and the changes " +
                "exist because the older forms were awkward to say quickly. There is a well-known song " +
                "for the pattern, but the table is short enough to read a few times instead.",
                "行く is the one irregular here: it should be 行いて by the rule and is 行って in fact."
            ],
            table: {
                head: ['Ends in', 'Becomes', 'Example'],
                rows: [
                    ['る (group 2)', 'て', '食べる → 食べて'],
                    ['う, つ, る', 'って', '買う → 買って'],
                    ['ぬ, ぶ, む', 'んで', '読む → 読んで'],
                    ['く', 'いて', '書く → 書いて'],
                    ['ぐ', 'いで', '泳ぐ → 泳いで'],
                    ['す', 'して', '話す → 話して'],
                    ['行く', 'って — irregular', '行く → 行って']
                ]
            },
            examples: [
                { jp: '読んでいます', en: 'am reading', note: 'te-form plus いる: an action in progress.' },
                { jp: '見てください', en: 'please look', note: 'The same socket, a different plug.' }
            ],
            check: {
                q: 'What is the te-form of 泳ぐ, and why is it not 泳いて?',
                a: '泳いで. The voiced ぐ carries its voicing into the ending, so て becomes で — the same ' +
                   'reason 読む gives 読んで rather than 読んて.'
            }
        },
        {
            title: 'Past and negative, plain and polite',
            body: [
                "Once the te-form is in place the plain past is free: swap て for た and で for だ. " +
                "書いて becomes 書いた, 読んで becomes 読んだ. Everything you learned for one applies to " +
                "the other.",
                "The plain negative uses a different stem — the a-row for Group 1, so 書く gives 書かない, " +
                "読む gives 読まない. Group 2 drops る and adds ない. The one to watch is 買う, where the " +
                "expected 買あない is 買わない instead, and ある, whose negative is simply ない.",
                "Polite forms need none of this: ます becomes ました, ません, ませんでした, and the verb " +
                "itself never moves. That is why beginners are taught polite first, and also why the " +
                "plain forms feel like a second language later."
            ],
            table: {
                head: ['', 'Plain', 'Polite'],
                rows: [
                    ['now', '書く', '書きます'],
                    ['past', '書いた', '書きました'],
                    ['not now', '書かない', '書きません'],
                    ['not past', '書かなかった', '書きませんでした'],
                    ['group 2', '食べる / 食べた / 食べない', '食べます / 食べました / 食べません'],
                    ['irregular', 'する / した / しない', 'します / しました / しません']
                ]
            },
            examples: [
                { jp: '書かなかった', en: 'did not write',
                  note: 'Negative stem, then the negative made past. Break it down to see both named.' }
            ],
            check: {
                q: 'If you know 読んで, what is the plain past of 読む?',
                a: '読んだ. Swap the で for だ — the sound change was already done for you by the te-form.'
            }
        },
        {
            title: 'What plugs into the te-form',
            body: [
                "This is the payoff. Learn one form and the following all become available, because each " +
                "is the te-form plus a helper verb carrying its own meaning. The helper conjugates " +
                "normally, so tense and politeness work exactly as they already do.",
                "The Sentence tab names these when it finds them: a breakdown tagged progressive, ended " +
                "up or please is telling you which helper is attached."
            ],
            table: {
                head: ['Pattern', 'Means', 'Example'],
                rows: [
                    ['〜ている', 'in progress, or a resulting state', '読んでいる — is reading'],
                    ['〜てください', 'please do', '待ってください — please wait'],
                    ['〜てもいい', 'may, is allowed to', '見てもいい — may I look'],
                    ['〜てはいけない', 'must not', '入ってはいけない — must not enter'],
                    ['〜てしまう', 'do completely, or regrettably', '食べてしまった — ate it all'],
                    ['〜てみる', 'try doing', '行ってみる — try going'],
                    ['〜ておく', 'do in advance', '買っておく — buy ahead of time'],
                    ['〜てから', 'after doing', '食べてから — after eating']
                ]
            },
            examples: [
                { jp: '食べてしまいました', en: 'ended up eating it all',
                  note: 'te-form, helper, polite past — three layers the breakdown separates.' }
            ],
            check: {
                q: 'Why is the te-form worth more effort than any other single form?',
                a: 'Because eight or more common patterns are built directly on it. Learn it once and ' +
                   'they all become available at the cost of one helper verb each.'
            }
        },
        {
            title: 'Ability — the potential form',
            body: [
                "Saying you can do something has its own conjugation. Group 1 verbs shift the final " +
                "kana to the e-row and add る: 書く becomes 書ける. Group 2 adds られる: 食べる becomes " +
                "食べられる. する has its own word, できる, and 来る becomes 来られる.",
                "The potential changes the particle. What you can do takes が rather than を, because " +
                "the sentence has stopped being about doing something to a thing and started being " +
                "about an ability existing: 漢字が読めます, kanji are readable to me. を is heard and " +
                "accepted, but が is the form to learn.",
                "In casual speech Group 2 verbs often drop the ら — 食べれる rather than 食べられる. This " +
                "is ら抜き言葉, ra-dropped speech, and it is extremely common while still being marked " +
                "as incorrect in writing. It also removes the ambiguity with the passive, which is " +
                "probably why it spread.",
                "The alternative 〜ことができる means the same and sounds more formal. It is longer, so " +
                "speech prefers the potential form and written Japanese uses either."
            ],
            table: {
                head: ['Dictionary', 'Potential', 'Group'],
                rows: [
                    ['書く', '書ける', '1 — e-row plus る'],
                    ['話す', '話せる', '1'],
                    ['読む', '読める', '1'],
                    ['食べる', '食べられる / 食べれる', '2 — the second is casual'],
                    ['見る', '見られる / 見れる', '2'],
                    ['する', 'できる', 'irregular'],
                    ['来る', '来られる', 'irregular']
                ]
            },
            examples: [
                { jp: '漢字が読めます', en: 'I can read kanji',
                  note: 'が, not を — the ability is what the sentence is about.' }
            ],
            check: {
                q: 'Why does the potential form take が?',
                a: 'Because the sentence is no longer about acting on something. It states that an ' +
                   'ability exists, and が marks what that ability applies to.'
            }
        }
    ],
    steps: [
        { text: 'Break down a progressive form and see the te-form named inside it.',
          href: 'dictionary.html#s=読んでいます', label: 'Break down 読んでいます' },
        { text: 'Break down a plain negative past — two changes stacked on one stem.',
          href: 'dictionary.html#s=書かなかった', label: 'Break down 書かなかった' },
        { text: 'Look up a verb and check which group it is from the shape of its ending.',
          href: 'dictionary.html#q=帰る', label: 'Look up 帰る' },
        { text: 'Test the conjugations.',
          href: 'practice.html#grammar=n5', label: 'N5 grammar' }
    ]
},
{
    id: 'joining',
    title: 'Joining ideas together',
    aim: 'Because, but, if, and after — how clauses connect.',
    body: 'Everything so far makes single statements. Connecting them is what turns a vocabulary list ' +
        'into speech, and Japanese does it with endings rather than with conjunctions at the front.',
    lessons: [
        {
            title: 'Because and but, inside the sentence',
            body: [
                "English puts because and but at the front of the second clause. Japanese attaches them " +
                "to the end of the first, which means the reason usually comes before the result — the " +
                "reverse of the English habit.",
                "から and ので both mean because. から is direct and states your reasoning; ので is " +
                "softer and presents the reason as circumstance, which makes it the safer choice when " +
                "excusing yourself. けど and が both mean but, with けど the everyday one and が slightly " +
                "more formal.",
                "One quirk worth knowing: が and けど are often used with no contrast at all, simply to " +
                "soften an opening. すみませんが is not saying but sorry — it is clearing its throat."
            ],
            table: {
                head: ['Ending', 'Means', 'Example'],
                rows: [
                    ['〜から', 'because — direct', '高いから買いません'],
                    ['〜ので', 'because — softer', '雨なので行きません'],
                    ['〜けど', 'but — everyday', '高いけど買います'],
                    ['〜が', 'but — formal, or just softening', '高いですが買います'],
                    ['〜し', 'and what is more', '安いし、おいしい']
                ]
            },
            examples: [
                { jp: '高いから買いません', en: 'I will not buy it because it is expensive',
                  note: 'Reason first, result second — the opposite order to the English.' }
            ],
            check: {
                q: 'Why does から come in the middle of the sentence rather than the start?',
                a: 'Because Japanese attaches connectors to the end of the clause they belong to. The ' +
                   'reason clause finishes with から, and the result follows.'
            }
        },
        {
            title: 'The four ways to say if',
            body: [
                "Japanese has four conditionals where English has one, and they are not " +
                "interchangeable. This is a genuine step up in difficulty, so treat this lesson as " +
                "orientation rather than something to master now.",
                "と is for automatic consequences — press this and that happens. It cannot be used for " +
                "requests or intentions. ば is the general hypothetical, common in set phrases and in " +
                "writing. たら is the most flexible and the safest bet in speech: if or when this " +
                "happens, then. なら picks up something the other person just said: if that is the case.",
                "If you remember one thing, make it that たら is usually acceptable, and that と cannot " +
                "be followed by a command or a wish."
            ],
            table: {
                head: ['Form', 'Sense', 'Example'],
                rows: [
                    ['〜と', 'inevitable result', '春になると暖かくなる'],
                    ['〜ば', 'general hypothetical', '安ければ買います'],
                    ['〜たら', 'if or when — most flexible', '雨が降ったら行きません'],
                    ['〜なら', 'if that is the case', '日本に行くなら京都へ']
                ]
            },
            examples: [
                { jp: '雨が降ったら行きません', en: 'If it rains I will not go',
                  note: 'The たら sits on the past form — which is why the breakdown calls it conditional.' }
            ],
            check: {
                q: 'Which conditional cannot be followed by a request?',
                a: 'と. It states an automatic consequence, so it cannot introduce something you want ' +
                   'someone to do. Use たら instead.'
            }
        },
        {
            title: 'Before, after, and while',
            body: [
                "Ordering events uses nouns and verb forms rather than prepositions, and the pattern is " +
                "consistent enough to learn as a set.",
                "前に means before and takes the plain non-past, even when the whole sentence is in the " +
                "past. 後で means after and takes the plain past. てから also means after doing, with a " +
                "stronger sense of sequence. とき means when, and which form goes in front of it changes " +
                "the timing — plain non-past for before the event, past for after it.",
                "That last point is the one to watch. 日本に行くとき is when going, on the way there. " +
                "日本に行ったとき is when I went, once arrived."
            ],
            table: {
                head: ['Pattern', 'Means', 'Takes'],
                rows: [
                    ['〜前に', 'before doing', 'plain non-past'],
                    ['〜後で', 'after doing', 'plain past'],
                    ['〜てから', 'after doing — sequence', 'te-form'],
                    ['〜とき', 'when', 'either, and the choice changes the timing'],
                    ['〜ながら', 'while doing', 'the stem'],
                    ['〜間に', 'during', 'plain non-past or noun + の']
                ]
            },
            examples: [
                { jp: '食べてから行きます', en: 'I will go after eating',
                  note: 'te-form plus から — the same から as because, doing a different job.' }
            ],
            check: {
                q: 'What is the difference between 行くとき and 行ったとき?',
                a: 'Timing. 行くとき is when going — before or during the trip. 行ったとき is when I went — ' +
                   'the arrival has happened.'
            }
        },
        {
            title: 'Still, already, and not yet',
                    body: [
                "まだ and もう are a pair, and between them they cover a surprising amount of everyday " +
                "conversation. もう means already with a positive verb and not any more with a negative. " +
                "まだ means still with a positive and not yet with a negative.",
                "The one that catches people is まだです as an answer. Asked もう食べましたか, have you " +
                "eaten yet, まだです means not yet — a complete answer with no verb in it at all. Japanese " +
                "is comfortable finishing there in a way English is not.",
                "For linking whole sentences rather than clauses, a short list of openers does the job: " +
                "そして and それから for and then, でも and しかし for but, だから and それで for so."
            ],
            table: {
                head: ['Word', 'With positive', 'With negative'],
                rows: [
                    ['もう', 'already — もう食べました', 'not any more — もう食べません'],
                    ['まだ', 'still — まだあります', 'not yet — まだ食べていません'],
                    ['そして', 'and then', ''],
                    ['でも', 'but — casual', ''],
                    ['しかし', 'however — formal', ''],
                    ['だから', 'so, therefore', '']
                ]
            },
            check: {
                q: 'Asked もう食べましたか, you have not. What is the shortest correct answer?',
                a: 'まだです. Not yet — and there is no need to add a verb, which would sound laboured.'
            }
        },
        {
            title: 'Purpose, decisions and the more-the-more',
            body: [
                "Three patterns round out the connectors, and each fills a gap English handles with a " +
                "word Japanese has no equivalent for.",
                "ように expresses a purpose you cannot directly control — 分かるように説明します, I will " +
                "explain so that you understand. Compare ために, which is for a purpose you do control: " +
                "勉強するために, in order to study. The split is whether the outcome is up to you.",
                "ことにする is a decision you make; ことになる is one that gets made for you. " +
                "行くことにしました, I decided to go. 行くことになりました, it has been decided that I " +
                "will go — which is what you say about a transfer at work, and the difference is not " +
                "subtle.",
                "And 〜ば〜ほど is the more, the more: 見れば見るほど, the more you look at it, the more…"
            ],
            table: {
                head: ['Pattern', 'Means', 'Example'],
                rows: [
                    ['〜ために', 'in order to — you control it', '勉強するために'],
                    ['〜ように', 'so that — you do not', '分かるように'],
                    ['〜ことにする', 'I decide to', '行くことにしました'],
                    ['〜ことになる', 'it is decided that', '行くことになりました'],
                    ['〜ば〜ほど', 'the more ~, the more', '見れば見るほど'],
                    ['〜ようになる', 'come to be able to', '読めるようになりました']
                ]
            },
            examples: [
                { jp: '読めるようになりました', en: 'I have become able to read',
                  note: 'Potential plus ようになる — a change of state over time, not a single event.' }
            ],
            check: {
                q: 'What is the difference between 行くことにしました and 行くことになりました?',
                a: 'Who decided. にする is your decision; になる is a decision that arrived — which is ' +
                   'how you announce a transfer or a wedding without sounding boastful.'
            }
        }
    ],
    steps: [
        { text: 'Break down a because-clause and see から named.',
          href: 'dictionary.html#s=高いから買いません', label: 'Break down から' },
        { text: 'Break down a conditional and watch たら resolve through the past form.',
          href: 'dictionary.html#s=雨が降ったら', label: 'Break down たら' },
        { text: 'Test the connectors.',
          href: 'practice.html#grammar=n5', label: 'N5 grammar' }
    ]
},
{
    id: 'modifying',
    title: 'Building bigger phrases',
    aim: 'Putting a whole clause in front of a noun.',
    body: 'This is the structural leap that separates simple sentences from real ones, and Japanese ' +
        'does it with no extra words at all.',
    lessons: [
        {
            title: 'A whole clause can describe a noun',
            body: [
                "English needs a relative pronoun — the book that I read, the person who came. Japanese " +
                "needs nothing. The clause goes directly in front of the noun in plain form, and that " +
                "is the entire mechanism: 私が読んだ本, the book I read.",
                "Two rules make it work. The verb must be plain, never ます, even in a polite sentence. " +
                "And the subject inside the clause takes が rather than は, because は sets the topic of " +
                "the whole sentence and this clause is only part of it. In shorter modifying clauses " +
                "the が is often replaced by の, which is a quirk rather than a difference in meaning.",
                "Once you can see this, long Japanese sentences stop being frightening. What looks like " +
                "a wall of text is usually one noun with a long description attached to its front."
            ],
            table: {
                head: ['Japanese', 'Means'],
                rows: [
                    ['私が読んだ本', 'the book I read'],
                    ['昨日買った本', 'the book I bought yesterday'],
                    ['日本語を話す人', 'a person who speaks Japanese'],
                    ['母が作った料理', 'the food my mother made'],
                    ['学生が多い大学', 'a university with many students']
                ]
            },
            examples: [
                { jp: '私が読んだ本は面白かったです', en: 'The book I read was interesting',
                  note: 'Everything before 本 describes it. The sentence proper starts at は.' }
            ],
            check: {
                q: 'Why is 私が読みました本 wrong?',
                a: 'A clause modifying a noun must be in plain form. It is 読んだ, and the politeness ' +
                   'goes on the verb that ends the whole sentence instead.'
            }
        },
        {
            title: 'Turning a verb into a noun',
            body: [
                "To use a verb where a noun belongs — as a subject, or after が好き — you nominalise it. " +
                "Two words do this: こと and の, both attached to a plain-form verb.",
                "の is the more immediate and concrete; こと is the more abstract. 泳ぐのが好きです and " +
                "泳ぐことが好きです both mean I like swimming, and either is fine. But some patterns " +
                "insist: perception verbs take の — 子供が遊んでいるのを見た, I saw the children playing " +
                "— and ことができる takes こと.",
                "This also explains a word you have already met. 事 is the kanji behind こと, which is " +
                "why the dictionary lists it as thing, matter, fact — the nominaliser is that noun, " +
                "doing grammatical work."
            ],
            table: {
                head: ['Pattern', 'Means', 'Example'],
                rows: [
                    ['〜のが好き', 'like doing', '読むのが好きです'],
                    ['〜ことがある', 'have done before', '行ったことがあります'],
                    ['〜ことができる', 'can do', '泳ぐことができます'],
                    ['〜のを見る', 'see something happening', '出るのを見ました'],
                    ['〜のは', 'the act of ~ is', '早く起きるのは大変です']
                ]
            },
            examples: [
                { jp: '行ったことがあります', en: 'I have been there before',
                  note: 'Past form plus ことがある — experience, not a single past event.' }
            ],
            check: {
                q: 'What is the difference between 行きました and 行ったことがあります?',
                a: 'The first says you went, once, at a time being discussed. The second says you have ' +
                   'the experience of having gone — it is about your history, not an occasion.'
            }
        },
        {
            title: 'Adjectives becoming adverbs',
            body: [
                "Turning a description of a thing into a description of an action takes one character, " +
                "and which one depends on the adjective family you already know.",
                "い-adjectives swap い for く: 早い becomes 早く, quickly. な-adjectives take に: 静か " +
                "becomes 静かに, quietly. That is the whole rule, and it is one of the few places in " +
                "Japanese grammar with no exceptions worth mentioning.",
                "You have already used this without noticing. よく from いい, and the 〜く of 高くない — " +
                "the negative of an い-adjective is built on its adverb form."
            ],
            table: {
                head: ['Adjective', 'Adverb', 'Means'],
                rows: [
                    ['早い', '早く', 'quickly, early'],
                    ['遅い', '遅く', 'slowly, late'],
                    ['上手', '上手に', 'skilfully'],
                    ['静か', '静かに', 'quietly'],
                    ['きれい', 'きれいに', 'neatly, cleanly'],
                    ['いい', 'よく', 'well — irregular']
                ]
            },
            examples: [
                { jp: '静かに話してください', en: 'Please speak quietly',
                  note: 'な-adjective plus に, describing how rather than what.' }
            ],
            check: {
                q: 'What is the adverb form of いい?',
                a: 'よく. いい is irregular throughout — its past is よかった and its negative よくない, ' +
                   'all built from the older form よい.'
            }
        },
        {
            title: 'The nouns that only exist for grammar',
            body: [
                "A handful of nouns almost never stand alone. They sit after a modifying clause and add " +
                "a shade of meaning to the whole thing — expectation, intention, timing, reason. They " +
                "are worth recognising because they look like vocabulary and behave like grammar.",
                "はず says something is expected to be so. つもり says you intend it. ところ marks a " +
                "moment — 食べているところ, in the middle of eating. ため gives a purpose or a cause. " +
                "And まま says a state was left unchanged: つけたまま, left switched on.",
                "All of them take the plain form in front, exactly like the modifying clauses above, " +
                "because that is precisely what they are."
            ],
            table: {
                head: ['Noun', 'Adds', 'Example'],
                rows: [
                    ['はず', 'it should be so', '来るはずです'],
                    ['つもり', 'I intend to', '行くつもりです'],
                    ['ところ', 'the moment of', '食べているところです'],
                    ['ため', 'for the purpose of, because', '勉強するために'],
                    ['まま', 'left as it was', 'つけたまま'],
                    ['よう', 'seems, appears', '雨が降るようです']
                ]
            },
            check: {
                q: 'What form of the verb goes in front of はず, つもり and ところ?',
                a: 'Plain form — the same as any clause modifying a noun, because that is what these ' +
                   'are. 来るはず, not 来ますはず.'
            }
        }
    ],
    steps: [
        { text: 'Break down a sentence with a clause in front of its noun.',
          href: 'dictionary.html#s=私が読んだ本は面白かったです', label: 'Break down a modified noun' },
        { text: 'Look up こと and see the nominaliser sitting among its ordinary meanings.',
          href: 'dictionary.html#q=こと', label: 'Look up こと' },
        { text: 'Test the patterns.',
          href: 'practice.html#grammar=n4', label: 'N4 grammar' }
    ]
},
{
    id: 'quoting',
    title: 'Saying what someone said',
    aim: 'Reporting speech, thoughts, and questions inside a sentence.',
    body: 'One particle handles quoting, thinking, calling and naming. Learn と here and a large family ' +
        'of everyday sentences opens up.',
    lessons: [
        {
            title: 'と for quoting and thinking',
            body: [
                "と marks the end of a quote and hands it to a verb. と言う is to say, と思う is to " +
                "think, と聞く is to hear. English changes tense and pronouns when reporting speech; " +
                "Japanese does not touch the quoted part at all.",
                "Direct quotes go in 「」 and stay exactly as spoken. Indirect ones drop the brackets " +
                "and take plain form — always plain, even in a polite sentence, for the same reason a " +
                "modifying clause does: politeness belongs to the sentence, not to the piece inside it.",
                "A useful pair: 〜と思います softens an opinion into something offered rather than " +
                "asserted, which is why it appears at the end of so many Japanese sentences that would " +
                "be flat statements in English."
            ],
            table: {
                head: ['Pattern', 'Means', 'Example'],
                rows: [
                    ['〜と言いました', 'said that', '行くと言いました'],
                    ['「〜」と言いました', 'said, quote', '「行きます」と言いました'],
                    ['〜と思います', 'I think that', '面白いと思います'],
                    ['〜と聞きました', 'I heard that', '来ると聞きました'],
                    ['〜という', 'called, named', '田中という人']
                ]
            },
            examples: [
                { jp: '面白いと思います', en: 'I think it is interesting',
                  note: 'Plain 面白い inside, polite 思います outside.' }
            ],
            check: {
                q: 'Why is 行きますと言いました wrong?',
                a: 'Because an indirect quote takes plain form. Say 行くと言いました, or keep the polite ' +
                   'form inside brackets as a direct quote.'
            }
        },
        {
            title: 'って, and how people actually quote',
            body: [
                "In speech, と becomes って almost universally, and という becomes っていう or just って. " +
                "It is the same grammar with the edges worn off, and you will hear it far more often " +
                "than the textbook form.",
                "って also does a job of its own: it introduces a topic the way は does, but casually. " +
                "日本語って難しい means Japanese, huh — it is hard. And at the end of a sentence it " +
                "reports hearsay: 明日雨だって, apparently it will rain tomorrow.",
                "Because って covers so much ground, context does the disambiguating. The Sentence tab " +
                "will label it as a quoting particle, which is its core job, and the rest follows from " +
                "where it sits."
            ],
            table: {
                head: ['Casual', 'Formal equivalent', 'Job'],
                rows: [
                    ['って', 'と', 'quoting'],
                    ['っていう / って', 'という', 'called, named'],
                    ['〜って', 'は', 'topic, casually'],
                    ['〜だって', 'だそうです', 'apparently, I hear']
                ]
            },
            check: {
                q: 'You hear 田中さんって知ってる? What is って doing?',
                a: 'Marking the topic, casually — the same job as は. Do you know Tanaka, is the ' +
                   'question.'
            }
        },
        {
            title: 'Questions inside sentences',
            body: [
                "To put a question inside a larger sentence, keep the question word where it is and " +
                "end the embedded part with か. 何を食べるか分かりません — I do not know what to eat. " +
                "Nothing reorders, exactly as with a standalone question.",
                "When the embedded question is a yes-or-no one, か on its own is not enough: use " +
                "かどうか, whether or not. 来るかどうか分かりません, I do not know whether he is coming.",
                "The verbs that take these are the ones you would expect — 分かる, 知る, 聞く, 覚える, " +
                "決める. And as always the embedded verb is plain form."
            ],
            table: {
                head: ['Pattern', 'Means', 'Example'],
                rows: [
                    ['〜か分かりません', 'I do not know what/who/where ~', 'どこにあるか分かりません'],
                    ['〜かどうか', 'whether or not', '来るかどうか分かりません'],
                    ['〜か知っていますか', 'do you know ~?', '誰が来るか知っていますか'],
                    ['〜か覚えていません', 'I do not remember ~', '何と言ったか覚えていません']
                ]
            },
            examples: [
                { jp: '来るかどうか分かりません', en: 'I do not know whether he is coming',
                  note: 'かどうか because there is no question word to carry the か.' }
            ],
            check: {
                q: 'When do you need かどうか rather than plain か?',
                a: 'When the embedded question has no question word — a yes-or-no question. With 何 or ' +
                   '誰 or どこ present, か alone is enough.'
            }
        }
    ],
    steps: [
        { text: 'Break down an opinion and see 思う take the quoted clause.',
          href: 'dictionary.html#s=面白いと思います', label: 'Break down と思います' },
        { text: 'Look up という and read how many jobs one phrase covers.',
          href: 'dictionary.html#q=という', label: 'Look up という' },
        { text: 'Test the patterns.',
          href: 'practice.html#grammar=n4', label: 'N4 grammar' }
    ]
},
{
    id: 'transitivity',
    title: 'Verbs that come in pairs',
    aim: 'Transitive and intransitive, passive, causative.',
    body: 'Japanese often has two verbs where English has one, and picking the wrong one changes who ' +
        'is responsible for what happened.',
    lessons: [
        {
            title: 'Something opens, or someone opens it',
            body: [
                "English uses open for both the door opening and a person opening it. Japanese uses two " +
                "different verbs: 開く for the door doing it and 開ける for the person. The pairs are " +
                "everywhere and they are not optional.",
                "The intransitive one describes what happened, with no actor. The transitive one names " +
                "someone doing it, and takes を for the thing acted on. So ドアが開きました is the door " +
                "opened, and ドアを開けました is I opened the door.",
                "There is no reliable rule for which is which, but there are patterns: pairs ending " +
                "〜まる and 〜める split intransitive and transitive that way round, as do 〜がる and " +
                "〜げる. Learn the common pairs as pairs and the rest follow by ear."
            ],
            table: {
                head: ['Intransitive — it happens', 'Transitive — someone does it', 'Means'],
                rows: [
                    ['開く あく', '開ける あける', 'open'],
                    ['閉まる', '閉める', 'close'],
                    ['始まる', '始める', 'begin'],
                    ['入る はいる', '入れる いれる', 'enter / put in'],
                    ['出る でる', '出す だす', 'leave / take out'],
                    ['つく', 'つける', 'switch on'],
                    ['消える', '消す', 'go out / turn off'],
                    ['落ちる', '落とす', 'fall / drop'],
                    ['決まる', '決める', 'be decided / decide']
                ]
            },
            examples: [
                { jp: 'ドアが開きました', en: 'The door opened', note: 'が, and no one did it.' },
                { jp: 'ドアを開けました', en: 'I opened the door', note: 'を, and someone is responsible.' }
            ],
            check: {
                q: 'The lights are on. 電気がついています or 電気をつけています?',
                a: 'ついています — describing the state, with no actor. をつけています would mean someone ' +
                   'is in the act of switching them on.'
            }
        },
        {
            title: 'ている and てある — two kinds of state',
            body: [
                "The pairs matter most once ている arrives, because the intransitive and transitive " +
                "verbs produce different kinds of state.",
                "Intransitive plus ている describes how something is: 窓が開いている, the window is open. " +
                "No one is mentioned and none is implied. Transitive plus てある describes a state " +
                "someone deliberately produced and left: 窓が開けてある, the window has been opened — " +
                "and somebody opened it on purpose.",
                "The difference matters in ordinary speech. 準備してあります says the preparation was " +
                "done and is ready, which is reassuring. 準備しています says someone is preparing right " +
                "now, which is not."
            ],
            table: {
                head: ['Pattern', 'Says', 'Example'],
                rows: [
                    ['intransitive + ている', 'the state it is in', '窓が開いている — the window is open'],
                    ['transitive + ている', 'the action in progress', '窓を開けている — is opening it'],
                    ['transitive + てある', 'left done, on purpose', '窓が開けてある — has been opened'],
                    ['〜てしまっている', 'done, and it matters now', '忘れてしまっている']
                ]
            },
            examples: [
                { jp: '窓が開けてあります', en: 'The window has been opened',
                  note: 'Somebody did it deliberately, and left it that way.' }
            ],
            check: {
                q: 'What does 開けてある say that 開いている does not?',
                a: 'That a person did it on purpose and left it so. 開いている only reports the state, ' +
                   'with no actor implied.'
            }
        },
        {
            title: 'The passive, including the one that complains',
            body: [
                "The passive is built from the negative stem plus れる for godan verbs and られる for " +
                "ichidan, which is the same shape as the potential — the ambiguity the Sentence tab " +
                "flags rather than guesses at. The person doing it takes に.",
                "Japanese also has a use English lacks. The suffering passive says something happened " +
                "to your disadvantage, even with a verb that takes no object: 雨に降られた, literally I " +
                "was rained on, means the rain spoiled things. 友達に来られた means a friend came and it " +
                "was inconvenient — which no English passive can say.",
                "Because of this, the passive in Japanese often carries a complaint that a neutral " +
                "English translation loses entirely."
            ],
            table: {
                head: ['Pattern', 'Means', 'Example'],
                rows: [
                    ['〜られる / 〜れる', 'is done to', '先生に叱られました'],
                    ['agent に', 'by whom', '友達に言われた'],
                    ['suffering passive', 'and it was a nuisance', '雨に降られた'],
                    ['〜と言われている', 'it is said that', '体にいいと言われている']
                ]
            },
            examples: [
                { jp: '先生に叱られました', en: 'I was scolded by the teacher',
                  note: 'に marks who did it. The breakdown flags the potential-or-passive ambiguity.' }
            ],
            check: {
                q: 'What does 雨に降られた say that "it rained" does not?',
                a: 'That the rain happened to you, and was unwelcome. Japanese can passivise an ' +
                   'intransitive verb to register that something was a nuisance.'
            }
        },
        {
            title: 'Making and letting someone do it',
            body: [
                "The causative — negative stem plus せる or させる — covers both make and let, and " +
                "context decides which. 子供に野菜を食べさせました is either made or let the child eat " +
                "vegetables, and only the situation tells you.",
                "The permission reading is how you ask to do something politely: 〜させてください, " +
                "please let me. 説明させてください, let me explain. This is worth having ready because " +
                "it sounds courteous in situations where the direct form would not.",
                "Stack the causative with the passive and you get 〜させられる, made to do — the form " +
                "with an unmistakably resentful flavour. 残業させられました means I was made to work " +
                "late, and nobody says it happily."
            ],
            table: {
                head: ['Pattern', 'Means', 'Example'],
                rows: [
                    ['〜せる / 〜させる', 'make or let someone do', '食べさせる'],
                    ['〜させてください', 'please let me', '説明させてください'],
                    ['〜させられる', 'be made to do', '残業させられました'],
                    ['〜てもらう', 'have someone do it for you', '教えてもらう']
                ]
            },
            examples: [
                { jp: '説明させてください', en: 'Please let me explain',
                  note: 'Causative plus a request — asking permission rather than announcing.' }
            ],
            check: {
                q: 'How do you politely ask to do something yourself?',
                a: 'Causative plus ください — 〜させてください. You are asking to be allowed, which is ' +
                   'softer than saying you will.'
            }
        }
    ],
    steps: [
        { text: 'Look up the intransitive half of a pair and then the transitive one.',
          href: 'dictionary.html#q=開く', label: 'Look up 開く' },
        { text: 'Break down a passive and see the ambiguity flagged.',
          href: 'dictionary.html#s=先生に叱られました', label: 'Break down a passive' },
        { text: 'Break down a causative-passive — two changes in one word.',
          href: 'dictionary.html#s=残業させられました', label: 'Break down させられました' },
        { text: 'Test the forms.',
          href: 'practice.html#grammar=n4', label: 'N4 grammar' }
    ]
},
{
    id: 'aspect',
    title: 'Just now, still, about to',
    aim: 'Where an action sits in time, beyond past and present.',
    body: 'Japanese has only two tenses, past and non-past. Everything finer than that is done with ' +
        'aspect — words that place an action inside its own progress.',
    lessons: [
        {
            title: 'Just did it — ばかり and ところ',
            body: [
                "Two patterns both translate as just, and they measure different things. 〜たばかり is " +
                "subjective: it feels recent to the speaker. You can say 日本に来たばかりです months " +
                "after arriving, because it still feels new.",
                "〜たところ is objective and narrow: the action finished at this moment. 食べたところです " +
                "means I have this second finished eating, and saying it an hour later would be wrong.",
                "So 始めたばかり is I have only just started, possibly weeks ago, and 始めたところ is I " +
                "started a moment ago. The difference is whether you are describing your sense of it or " +
                "the clock."
            ],
            table: {
                head: ['Pattern', 'Means', 'Measured by'],
                rows: [
                    ['〜たばかり', 'only just — feels recent', 'the speaker'],
                    ['〜たところ', 'just this moment', 'the clock'],
                    ['〜ているところ', 'in the middle of', 'now'],
                    ['〜るところ', 'about to', 'now'],
                    ['〜たところだった', 'had just', 'a past moment']
                ]
            },
            examples: [
                { jp: '日本に来たばかりです', en: 'I have only just come to Japan',
                  note: 'Could be months ago. ばかり measures how it feels, not how long it has been.' }
            ],
            check: {
                q: 'You arrived in Japan three months ago. ばかり or ところ?',
                a: 'ばかり. It measures your sense of recency, so three months is fine. ところ would ' +
                   'claim you walked in this minute.'
            }
        },
        {
            title: 'Still, already, and not any more',
            body: [
                "もう and まだ do more than the earlier stage covered once ている is in play. The four " +
                "combinations are worth laying out because two of them are counter-intuitive to English " +
                "speakers.",
                "もう食べました is already ate. まだ食べていません is have not eaten yet — and note the " +
                "ている, not ません. まだ食べません would mean I am still refusing to eat, which is a " +
                "different sentence entirely. The perfect sense of not yet needs the progressive form.",
                "The other pair: まだあります is there is still some, and もうありません is there is none " +
                "left. Same two words, opposite ends of the same story."
            ],
            table: {
                head: ['Japanese', 'Means'],
                rows: [
                    ['もう食べました', 'I have already eaten'],
                    ['まだ食べていません', 'I have not eaten yet'],
                    ['まだ食べません', 'I am still not going to eat'],
                    ['まだあります', 'there is still some'],
                    ['もうありません', 'there is none left'],
                    ['まだです', 'not yet — a complete answer']
                ]
            },
            examples: [
                { jp: 'まだ食べていません', en: 'I have not eaten yet',
                  note: 'ていません, not ません — the difference between not yet and refusing.' }
            ],
            check: {
                q: 'Why is まだ食べません not the answer to have you eaten yet?',
                a: 'Because it means you are still declining to eat. Not yet needs the progressive: ' +
                   'まだ食べていません.'
            }
        },
        {
            title: 'Becoming, and states that stick',
            body: [
                "なる is the verb for becoming and it takes different shapes depending on what precedes " +
                "it. い-adjectives use their adverb form: 高くなる, become expensive. な-adjectives and " +
                "nouns take に: 静かになる, 先生になる.",
                "Attached to a potential form it describes a change in ability that happened over time: " +
                "読めるようになりました, I became able to read. This is how you talk about progress in " +
                "a language, and it is worth having early for that reason alone.",
                "Two more worth recognising. 〜てくる and 〜ていく from the motion stage put a change on " +
                "a timeline: 寒くなってきた, it has been getting colder. And 〜つつある is the formal " +
                "written version of in the process of: 増えつつある, is increasing."
            ],
            table: {
                head: ['Pattern', 'Means', 'Example'],
                rows: [
                    ['い-adj + くなる', 'become ~', '高くなる'],
                    ['な-adj / noun + になる', 'become ~', '先生になる'],
                    ['〜ようになる', 'come to be able to', '読めるようになる'],
                    ['〜なくなる', 'stop being able to, cease', '行かなくなった'],
                    ['〜てくる', 'has been becoming', '寒くなってきた'],
                    ['〜つつある', 'is in the process of', '増えつつある']
                ]
            },
            examples: [
                { jp: '読めるようになりました', en: 'I have become able to read',
                  note: 'The sentence a learner most wants, and it is three pieces you already have.' }
            ],
            check: {
                q: 'How do you say you have become able to do something?',
                a: 'Potential form plus ようになりました. 読めるようになりました — a change of ability ' +
                   'over time, rather than a single event.'
            }
        }
    ],
    steps: [
        { text: 'Break down a not-yet answer and see the progressive doing the work.',
          href: 'dictionary.html#s=まだ食べていません', label: 'Break down まだ〜ていません' },
        { text: 'Break down the sentence you will want to say about your own progress.',
          href: 'dictionary.html#s=読めるようになりました', label: 'Break down ようになる' },
        { text: 'Test the patterns.',
          href: 'practice.html#grammar=n4', label: 'N4 grammar' }
    ]
},
{
    id: 'seeming',
    title: 'Seems, looks like, apparently',
    aim: 'Five ways to hedge, and how to tell them apart.',
    body: 'Japanese distinguishes carefully between what you saw, what you inferred and what you were ' +
        'told. English uses seems for all three, which is why this trips everyone.',
    lessons: [
        {
            title: 'そう, twice, meaning two different things',
            body: [
                "そう does two unrelated jobs, and which one you get depends entirely on what it " +
                "attaches to. This is the single most common confusion in the whole family.",
                "Attached to a verb stem or a bare adjective, it means it looks that way from here: " +
                "おいしそう, looks tasty; 降りそう, looks like rain. You are reporting an appearance, and " +
                "you have not tasted anything or checked a forecast.",
                "Attached to a plain form, it means you were told: おいしいそうです, I hear it is tasty; " +
                "降るそうです, apparently it will rain. The evidence is now someone else's word rather " +
                "than your eyes.",
                "So おいしそうです and おいしいそうです differ by one character and mean quite different " +
                "things. The first is a guess from looking; the second is a report."
            ],
            table: {
                head: ['Form', 'Attaches to', 'Means'],
                rows: [
                    ['おいしそう', 'adjective, い dropped', 'looks tasty'],
                    ['おいしいそうです', 'plain form', 'I hear it is tasty'],
                    ['降りそう', 'verb stem', 'looks like rain'],
                    ['降るそうです', 'plain form', 'apparently it will rain'],
                    ['よさそう', 'いい — irregular', 'looks good']
                ]
            },
            examples: [
                { jp: 'おいしそうです', en: 'It looks delicious',
                  note: 'Stem plus そう — an appearance. Not a report from anyone.' }
            ],
            check: {
                q: 'What is the difference between 高そうです and 高いそうです?',
                a: 'The first says it looks expensive — your own guess from looking. The second says you ' +
                   'heard it is expensive. One character, two sources of evidence.'
            }
        },
        {
            title: 'よう, みたい, らしい, っぽい',
            body: [
                "The rest of the family shade by evidence and by register. よう is inference from " +
                "something you observed: 誰かいるようです, it seems someone is in — you heard a noise. " +
                "みたい is the same thing in casual speech, and attaches straight to plain forms and nouns.",
                "らしい is hearsay with a hint of it being typical: 雨らしい, apparently rain. It has a " +
                "second life attached to a noun meaning characteristic of — 男らしい is manly, " +
                "学生らしい is student-like, and 日本らしい is very Japanese in a complimentary way.",
                "っぽい is casual and often slightly negative: 子供っぽい, childish; 忘れっぽい, forgetful. " +
                "Unlike らしい it suggests resembling without really being."
            ],
            table: {
                head: ['Form', 'Register', 'Evidence'],
                rows: [
                    ['〜ようです', 'formal', 'inference from what you noticed'],
                    ['〜みたいです', 'casual', 'the same, spoken'],
                    ['〜らしいです', 'either', 'hearsay, or typical of'],
                    ['〜っぽい', 'casual', 'resembles, often unflatteringly'],
                    ['〜かもしれません', 'either', 'might be — lowest confidence'],
                    ['〜でしょう', 'either', 'probably']
                ]
            },
            examples: [
                { jp: '雨が降るみたいです', en: 'It looks like it will rain',
                  note: 'Casual inference. ようです would be the same claim, more formally.' }
            ],
            check: {
                q: 'What does 学生らしい mean, and why is it not hearsay?',
                a: 'Student-like, typical of a student. Attached to a noun, らしい means characteristic ' +
                   'of rather than reportedly — the same word doing a different job.'
            }
        },
        {
            title: 'Hedging, and why Japanese does so much of it',
            body: [
                "Flat assertions are rarer in Japanese than in English, and softening one is not " +
                "weakness — it is the default register for anything that is not a plain fact. Learners " +
                "who state everything baldly sound abrupt without meaning to.",
                "The everyday softeners are few. と思います turns a claim into an opinion. かもしれません " +
                "lowers confidence. んですが at the end of a sentence opens a request by trailing off, " +
                "leaving the other person to complete it — すみません、道を聞きたいんですが is a whole " +
                "polite approach that never finishes its sentence.",
                "This is also why refusals soften into ちょっと and stop. The unfinished sentence is " +
                "doing the work, and finishing it would be blunter than the situation wants."
            ],
            table: {
                head: ['Softener', 'Turns a claim into'],
                rows: [
                    ['〜と思います', 'an opinion'],
                    ['〜かもしれません', 'a possibility'],
                    ['〜でしょう', 'a likelihood'],
                    ['〜んですが', 'an opening, trailing off'],
                    ['ちょっと…', 'a refusal, unfinished'],
                    ['〜ような気がします', 'a feeling that']
                ]
            },
            examples: [
                { jp: '道を聞きたいんですが', en: 'I would like to ask the way…',
                  note: 'It never finishes. The trailing が is the politeness.' }
            ],
            check: {
                q: 'Why would you leave a sentence unfinished on purpose?',
                a: 'Because the unfinished part is the imposition. Trailing off with が or ちょっと lets ' +
                   'the listener supply it, which is softer than saying it yourself.'
            }
        }
    ],
    steps: [
        { text: 'Break down an appearance-そう and see the stem it attaches to.',
          href: 'dictionary.html#s=おいしそうです', label: 'Break down おいしそう' },
        { text: 'Look up らしい and find both of its jobs in one entry.',
          href: 'dictionary.html#q=らしい', label: 'Look up らしい' },
        { text: 'Test the patterns.',
          href: 'practice.html#grammar=n4', label: 'N4 grammar' }
    ]
},
{
    id: 'others',
    title: 'Talking about other people',
    aim: 'Why you cannot simply say that someone else is cold.',
    body: 'Japanese draws a line between what you know directly and what you can only infer. Your own ' +
        'feelings are on one side of it and everyone else\u2019s are on the other.',
    lessons: [
        {
            title: 'You cannot know how someone else feels',
            body: [
                "彼は寒いです is wrong, and the reason is not grammar but evidence. Adjectives of " +
                "sensation and emotion — 寒い, 痛い, 欲しい, 嬉しい, 怖い — describe an internal state, " +
                "and Japanese does not let you assert one you have no access to.",
                "For yourself they are fine: 寒いです, I am cold. For anyone else you must mark how you " +
                "know. The most direct way is 〜がる, which turns the adjective into a verb meaning to " +
                "show signs of: 彼は寒がっています, he is acting cold.",
                "This is not politeness or hedging. It is a grammatical requirement, and getting it " +
                "wrong is one of the few learner errors that is genuinely ungrammatical rather than " +
                "merely unnatural."
            ],
            table: {
                head: ['About yourself', 'About someone else'],
                rows: [
                    ['寒いです', '寒がっています'],
                    ['痛いです', '痛がっています'],
                    ['欲しいです', '欲しがっています'],
                    ['行きたいです', '行きたがっています'],
                    ['嬉しいです', '嬉しそうです'],
                    ['怖いです', '怖がっています']
                ]
            },
            examples: [
                { jp: '彼は寒がっています', en: 'He seems cold',
                  note: 'がる turns the feeling into observable behaviour, which you can report.' }
            ],
            check: {
                q: 'Why is 彼は寒いです wrong rather than just unusual?',
                a: 'Because you cannot assert an internal state you have no access to. Japanese requires ' +
                   'you to mark it as inferred — 寒がっています, or 寒そうです.'
            }
        },
        {
            title: 'The ways to say how you know',
            body: [
                "がる is one of several routes, and each says something different about your evidence. " +
                "Picking the right one is the whole skill.",
                "〜がる reports behaviour you can see. 〜そうです on a bare adjective reports appearance: " +
                "嬉しそうです, looks happy. 〜ようです and 〜みたいです report your inference from " +
                "circumstances. 〜と言っています reports what they told you, which is the strongest " +
                "evidence available. And 〜らしいです reports hearsay from elsewhere.",
                "For thoughts specifically, note that 思う behaves the same way: 私は思います but " +
                "彼は思っています. The progressive form is what makes a third person's thought " +
                "reportable, which is the same logic in a different costume."
            ],
            table: {
                head: ['Form', 'Your evidence'],
                rows: [
                    ['〜がる', 'behaviour you can see'],
                    ['〜そうです', 'how they look'],
                    ['〜ようです / みたいです', 'inference from circumstances'],
                    ['〜と言っています', 'they told you'],
                    ['〜らしいです', 'you heard it from elsewhere'],
                    ['〜と思っています', 'their stated or evident thought']
                ]
            },
            examples: [
                { jp: '田中さんは行きたがっています', en: 'Tanaka wants to go',
                  note: 'たい becomes たがる for a third person. The evidence is their behaviour.' }
            ],
            check: {
                q: 'Someone told you directly that they are cold. Which form?',
                a: '寒いと言っています. When they said it themselves, you report the statement rather ' +
                   'than inferring from behaviour.'
            }
        },
        {
            title: 'Pronouns, and why you should avoid them',
            body: [
                "Japanese has many words for I and you and uses almost none of them. 私 is safe, 僕 is " +
                "casual and male-leaning, 俺 is blunt and male, あたし is casual and female-leaning. " +
                "Each says something about you before your sentence does.",
                "You is worse. あなた sounds distant or intimate depending on context and is rarely " +
                "right; textbooks teach it and native speakers avoid it. きみ and おまえ carry " +
                "seniority or roughness. The normal solution is to use the person's name with さん, " +
                "even when speaking directly to them — 田中さんは行きますか, rather than あなたは.",
                "彼 and 彼女 for he and she are used less than English uses them too, and both double as " +
                "boyfriend and girlfriend, which produces its own confusions. Most of the time the " +
                "topic is already established and no pronoun is needed at all."
            ],
            table: {
                head: ['Word', 'Says'],
                rows: [
                    ['私 わたし', 'I — safe in every setting'],
                    ['僕 ぼく', 'I — casual, male-leaning, softer'],
                    ['俺 おれ', 'I — blunt, male, casual only'],
                    ['あなた', 'you — usually avoid; use their name'],
                    ['きみ / おまえ', 'you — senior to junior, or rough'],
                    ['彼 / 彼女', 'he / she — also boyfriend / girlfriend']
                ]
            },
            check: {
                q: 'How do you say you to someone whose name you know?',
                a: 'Use their name with さん. 田中さんは — even talking straight to them. あなた is what ' +
                   'the textbook teaches and what speakers avoid.'
            }
        }
    ],
    steps: [
        { text: 'Break down a third-person feeling and see がる resolve.',
          href: 'dictionary.html#s=彼は寒がっています', label: 'Break down がる' },
        { text: 'Look up 欲しい and notice the separate 欲しがる entry.',
          href: 'dictionary.html#q=欲しがる', label: 'Look up 欲しがる' },
        { text: 'Test the patterns.',
          href: 'practice.html#grammar=n4', label: 'N4 grammar' }
    ]
},
{
    id: 'motion',
    title: 'Coming and going',
    aim: 'Direction from the Japanese point of view.',
    body: 'Japanese decides between come and go by where the speaker is, not by where the listener is. ' +
        'That one difference produces a lot of confused sentences.',
    lessons: [
        {
            title: 'Why you go to someone rather than come',
            body: [
                "In English, if a friend invites you over, you say I will come. In Japanese you say " +
                "行きます, I will go, because 来る means movement towards where the speaker currently " +
                "is — and you are not there.",
                "The rule is simple once stated: 行く is away from the speaker's position, 来る is " +
                "towards it. English shifts perspective to the listener as a courtesy; Japanese does " +
                "not, and saying 来ます about going to someone else's house is one of the most " +
                "recognisable learner errors there is.",
                "The same logic covers 帰る, to go back to where you belong — home, your country — as " +
                "against 戻る, to return to a place you merely left. You 帰る to your house and 戻る to " +
                "your desk."
            ],
            table: {
                head: ['Verb', 'Means', 'From whose position'],
                rows: [
                    ['行く', 'go — away from me', 'the speaker'],
                    ['来る', 'come — towards me', 'the speaker'],
                    ['帰る', 'go back where you belong', 'home, country'],
                    ['戻る', 'return to a place', 'a desk, a shop'],
                    ['通う かよう', 'commute, attend regularly', 'school, work']
                ]
            },
            examples: [
                { jp: '明日そちらに行きます', en: 'I will come to you tomorrow',
                  note: '行きます, because you are not there yet. English flips it; Japanese does not.' }
            ],
            check: {
                q: 'A friend asks you to their party. Do you say 行きます or 来ます?',
                a: '行きます. You are moving away from where you are, and 来る would mean moving towards ' +
                   'yourself, which makes no sense.'
            }
        },
        {
            title: '〜ていく and 〜てくる',
            body: [
                "Attach 行く or 来る to a te-form and the direction becomes metaphorical: not physical " +
                "movement, but movement in time or in the course of an action.",
                "〜ていく points away and forward — これから増えていく, it will go on increasing from " +
                "here. 〜てくる points towards you and back — だんだん寒くなってきた, it has been getting " +
                "colder up to now. The tense of English changes to match: いく takes will, くる takes " +
                "has been.",
                "There is also a plain physical use worth knowing: 買ってくる means go and buy and come " +
                "back, which is a single errand rather than two actions. 持っていく is take, and " +
                "持ってくる is bring — the same come-and-go rule as before, applied to objects."
            ],
            table: {
                head: ['Pattern', 'Means', 'Example'],
                rows: [
                    ['〜ていく', 'from now onwards, away', '増えていく — will keep increasing'],
                    ['〜てくる', 'up to now, towards', '増えてきた — has been increasing'],
                    ['持っていく', 'take — away from here', '傘を持っていく'],
                    ['持ってくる', 'bring — towards here', '傘を持ってくる'],
                    ['買ってくる', 'go and buy, and return', 'パンを買ってくる']
                ]
            },
            examples: [
                { jp: '寒くなってきました', en: 'It has got colder',
                  note: 'てくる — the change ran up to now. ていく would push it into the future.' }
            ],
            check: {
                q: 'What is the difference between 持っていく and 持ってくる?',
                a: 'Take versus bring. いく moves the object away from where the speaker is; くる brings ' +
                   'it towards them. Same rule as 行く and 来る.'
            }
        },
        {
            title: 'Getting there — transport and route',
            body: [
                "The particles do the work here, and each marks a different part of the journey. で " +
                "marks the means: 電車で行く, go by train. に or へ marks the destination. を, " +
                "unusually, marks the route travelled through — 道を歩く, walk along the road, and " +
                "公園を通る, pass through the park.",
                "That を is worth noting because it is the one place the object particle marks " +
                "something that is not an object. With verbs of motion it means across, along or " +
                "through, and it is the same particle you have been using for direct objects.",
                "On foot has no で. It is 歩いて, the te-form of 歩く, used adverbially: 歩いて行きます, " +
                "I will walk there — literally, walking, I go."
            ],
            table: {
                head: ['Particle', 'Marks', 'Example'],
                rows: [
                    ['で', 'means of transport', '電車で行く'],
                    ['に / へ', 'destination', '駅に行く'],
                    ['を', 'route travelled', '道を歩く'],
                    ['から / まで', 'from / as far as', '東京から大阪まで'],
                    ['歩いて', 'on foot — no particle', '歩いて行きます']
                ]
            },
            examples: [
                { jp: '駅まで歩いて行きます', en: 'I will walk to the station',
                  note: 'まで for as far as, 歩いて for how, 行きます for the motion itself.' }
            ],
            check: {
                q: 'Why does 道を歩く use を when there is no object?',
                a: 'Because with verbs of motion を marks the route travelled through, not a thing acted ' +
                   'on. Same particle, a second job.'
            }
        }
    ],
    steps: [
        { text: 'Break down a journey sentence and see each particle named.',
          href: 'dictionary.html#s=駅まで歩いて行きます', label: 'Break down a journey' },
        { text: 'Break down a てくる and watch the auxiliary resolve.',
          href: 'dictionary.html#s=寒くなってきました', label: 'Break down てくる' },
        { text: 'Look up 帰る and compare it with 戻る.',
          href: 'dictionary.html#q=帰る', label: 'Look up 帰る' }
    ]
},
{
    id: 'particles2',
    title: 'Particles, second pass',
    aim: 'Only, even, although — and particles stuck together.',
    body: 'The basic particles mark roles. These shade meaning, and several of them stack onto the ' +
        'ones you already know.',
    lessons: [
        {
            title: 'Only — だけ, しか and ばかり',
            body: [
                "Three words mean only and they are not interchangeable. だけ is neutral: 千円だけ " +
                "あります, I have a thousand yen — a statement of quantity. しか demands a negative " +
                "verb and adds regret: 千円しかありません, I only have a thousand yen, and it is not " +
                "enough.",
                "The negative with しか is not optional. It is built into the word, which surprises " +
                "people because the English translation has no negative in it at all.",
                "ばかり means nothing but, and carries a hint of excess: テレビばかり見ている, does " +
                "nothing but watch television. It has a second job attached to a past verb — " +
                "食べたばかり, just ate — which the aspect stage covers."
            ],
            table: {
                head: ['Word', 'Feel', 'Example'],
                rows: [
                    ['だけ', 'neutral only', '千円だけあります'],
                    ['しか + negative', 'only, and it is a shame', '千円しかありません'],
                    ['ばかり', 'nothing but, too much of', 'テレビばかり見ている'],
                    ['のみ', 'only — formal, written', '会員のみ']
                ]
            },
            examples: [
                { jp: '千円しかありません', en: 'I only have a thousand yen',
                  note: 'The Japanese is negative and the English is not. しか requires it.' }
            ],
            check: {
                q: 'Why is 千円しかあります wrong?',
                a: 'Because しか must be followed by a negative. The regret is carried by the negative ' +
                   'verb, which is why the English translation loses it.'
            }
        },
        {
            title: 'Even, at least, and emphasis',
            body: [
                "さえ means even, in the sense of a surprising minimum: 名前さえ書けない, cannot even " +
                "write his name. も does the same job more casually — 一度も行ったことがない, have not " +
                "been even once.",
                "でも after a noun means even, or something like: コーヒーでも飲みませんか, shall we have " +
                "coffee or something — which softens an invitation by pretending not to have chosen.",
                "こそ emphasises: 今日こそ, today of all days. And まで, which you know as until, also " +
                "means even at its outer edge: 子供まで知っている, even the children know."
            ],
            table: {
                head: ['Particle', 'Adds', 'Example'],
                rows: [
                    ['さえ', 'even — a surprising minimum', '名前さえ書けない'],
                    ['でも', 'even, or something like', 'コーヒーでも'],
                    ['こそ', 'this one precisely', '今日こそ'],
                    ['まで', 'even, at the extreme', '子供まで知っている'],
                    ['も', 'even, also', '一度も行ったことがない']
                ]
            },
            check: {
                q: 'Why does コーヒーでも飲みませんか sound politer than コーヒーを飲みませんか?',
                a: 'Because でも presents coffee as one option among many rather than a decision. Not ' +
                   'insisting on the choice is what makes it softer.'
            }
        },
        {
            title: 'Particles stacked on particles',
            body: [
                "Particles combine, and the combination is usually the first particle's meaning with a " +
                "topic or contrast layered on. には is に plus は: 日本には四季があります, in Japan " +
                "there are four seasons — with a faint sense of as for Japan, by contrast.",
                "では works the same way and turns up constantly: 日本では, in Japan; では、始めましょう, " +
                "well then, let us start. とは marks a definition — 敬語とは, what keigo is.",
                "The one to watch is までに against まで. まで is until, continuously up to a point. " +
                "までに is by, a deadline. 五時まで待ちます means I will wait until five; 五時までに来て" +
                "ください means be here by five. One character, and missing it means missing a deadline."
            ],
            table: {
                head: ['Combination', 'Means', 'Example'],
                rows: [
                    ['には', 'in/to ~, as for it', '日本には四季があります'],
                    ['では', 'in ~, as for there', '日本では'],
                    ['とは', 'the thing called ~', '敬語とは'],
                    ['からは', 'from ~ onwards', '来月からは'],
                    ['まで', 'until — continuous', '五時まで待ちます'],
                    ['までに', 'by — a deadline', '五時までに来てください']
                ]
            },
            examples: [
                { jp: '五時までに来てください', en: 'Please come by five',
                  note: 'までに, not まで. The に is the difference between a deadline and a duration.' }
            ],
            check: {
                q: 'What is the difference between 五時まで and 五時までに?',
                a: 'まで is until — the action continues to five. までに is by — it must be complete ' +
                   'before five. The に turns a duration into a deadline.'
            }
        },
        {
            title: 'のに, ので, and the regret in although',
            body: [
                "のに means although, and unlike English although it carries dissatisfaction. " +
                "勉強したのに、できませんでした means I studied and still could not do it, with the " +
                "frustration built in. It is not a neutral connector.",
                "This is why のに cannot be used for a neutral contrast. For that, けど or が is right. " +
                "And のに never introduces a request or a command, for the same reason と cannot — the " +
                "emotional weight makes it wrong.",
                "It sits one character from ので, which is a plain because, so the pair is worth reading " +
                "carefully. 高いので買いません is because it is expensive. 高いのに買いました is even " +
                "though it was expensive, I bought it."
            ],
            table: {
                head: ['Ending', 'Means', 'Carries'],
                rows: [
                    ['〜ので', 'because', 'nothing extra'],
                    ['〜から', 'because', 'your reasoning, more direct'],
                    ['〜のに', 'although', 'frustration or regret'],
                    ['〜けど / 〜が', 'but', 'neutral contrast'],
                    ['〜ても', 'even if', 'concession']
                ]
            },
            examples: [
                { jp: '勉強したのにできませんでした', en: 'Even though I studied, I could not do it',
                  note: 'のに is the complaint. けど would report the same facts without it.' }
            ],
            check: {
                q: 'When should you use けど rather than のに for although?',
                a: 'Whenever you are not dissatisfied. のに carries frustration; using it for a neutral ' +
                   'contrast sounds like a complaint you did not mean to make.'
            }
        }
    ],
    steps: [
        { text: 'Break down a しか sentence and see the required negative.',
          href: 'dictionary.html#s=千円しかありません', label: 'Break down しか' },
        { text: 'Look up のに and read both of its jobs.',
          href: 'dictionary.html#q=のに', label: 'Look up のに' },
        { text: 'Test the particles.',
          href: 'practice.html#grammar=n4', label: 'N4 grammar' }
    ]
},
{
    id: 'kanji',
    title: 'Your first kanji',
    aim: 'The N5 set — around 100 characters.',
    body: 'Kanji carry meaning rather than sound, and most have more than one reading.',
    lessons: [
        {
            title: 'Why one kanji has two kinds of reading',
            body: [
                "Japan borrowed Chinese characters to write a language that already existed and was " +
                "unrelated. Each character arrived with its Chinese pronunciation, and was also attached " +
                "to the native Japanese word that already meant the same thing. Both survived.",
                "The Chinese-derived reading is the on\u2019yomi, and it turns up mostly in compounds of " +
                "two or more kanji. The native reading is the kun\u2019yomi, used when the character " +
                "stands alone or carries hiragana endings. 山 alone is やま; inside 富士山 it is サン.",
                "Do not memorise the reading lists cold. Learn each character inside a word you already " +
                "know, and the readings come attached to something you can actually use."
            ],
            table: {
                head: ['Kanji', 'Alone (kun)', 'In a compound (on)'],
                rows: [
                    ['山', 'やま — mountain', '富士山 ふじサン — Mt Fuji'],
                    ['人', 'ひと — person', '日本人 にほんジン — a Japanese person'],
                    ['日', 'ひ — day, sun', '日本 ニほん — Japan'],
                    ['学', '— rarely alone', '学生 ガクせい — student']
                ]
            },
            examples: [
                { jp: '日本人', en: 'Japanese person', note: 'Three kanji, all on\u2019yomi, one word.' }
            ],
            check: {
                q: 'You meet a kanji you know, but it is next to another kanji. Which reading do you try?',
                a: 'The on\u2019yomi first. Two kanji together is usually a compound, and compounds ' +
                   'usually take the Chinese-derived readings.'
            }
        },
        {
            title: 'Stroke order is not decoration',
            body: [
                "Every kanji has a fixed order and direction for its strokes, and it is worth following " +
                "for three reasons. Characters written in order come out balanced, because the rules " +
                "exist to keep the proportions right. Handwriting recognition and paper dictionaries " +
                "both depend on it. And the order is a memory aid — the hand remembers sequences much " +
                "better than the eye remembers shapes.",
                "Almost all of it falls out of a handful of rules, and the tracing page numbers every " +
                "stroke so you can check yourself."
            ],
            table: {
                head: ['Rule', 'Example'],
                rows: [
                    ['Top to bottom', '三 — the three lines from the top down'],
                    ['Left to right', '川 — left stroke first'],
                    ['Horizontal before vertical when they cross', '十 — the across stroke, then the down one'],
                    ['Centre before the sides', '小 — the middle stroke leads'],
                    ['Outside before inside', '国 — the box first, then the contents'],
                    ['Close the box last', '国 — the bottom line of the frame comes after the inside'],
                    ['Left-falling before right-falling', '人 — the leftward stroke first']
                ]
            },
            examples: [
                { jp: '国', en: 'country', note: 'Frame, contents, then the bottom line closes it.' }
            ],
            check: {
                q: 'In 国, when is the bottom of the outer box drawn?',
                a: 'Last. You draw the frame open, fill in the inside, then close it — the same order ' +
                   'you would use to put something in a container.'
            }
        },
        {
            title: 'Numbers, and why counting needs a word',
            body: [
                "The numbers are the highest-value kanji you will ever learn, and among the simplest: " +
                "一二三四五六七八九十, then 百 hundred, 千 thousand, 万 ten thousand. Note that Japanese " +
                "groups large numbers by ten thousand, not by thousand — 100,000 is 十万, ten ten-thousands.",
                "Counting anything requires a counter word between the number and the noun, chosen by " +
                "the shape or nature of the thing. This feels arbitrary and is: English does the same " +
                "with two loaves of bread. Learn a handful and use つ when you are stuck, which is what " +
                "the general counter is for."
            ],
            table: {
                head: ['Counter', 'Used for', 'Example'],
                rows: [
                    ['つ', 'anything, up to nine', '三つ — three of them'],
                    ['人 nin', 'people', '三人 — three people'],
                    ['本 hon', 'long thin things', 'ペン三本 — three pens'],
                    ['枚 mai', 'flat thin things', '紙三枚 — three sheets of paper'],
                    ['匹 hiki', 'small animals', '猫三匹 — three cats'],
                    ['冊 satsu', 'books', '本三冊 — three books']
                ]
            },
            check: {
                q: 'What is 十万?',
                a: 'One hundred thousand — ten ten-thousands. Japanese counts in units of 万, so large ' +
                   'numbers need regrouping rather than direct translation.'
            }
        },
        {
            title: 'Radicals — the parts kanji are made of',
            body: [
                "Kanji are not drawings to be memorised whole. Almost all of them are assembled from a " +
                "few hundred recurring components, and once you can see the components a complicated " +
                "character stops being complicated — it becomes three simple things stacked.",
                "One component, the radical, is traditionally the one a paper dictionary files the " +
                "character under, and it often hints at the meaning. Water appears as three strokes on " +
                "the left in 海, 泳, 洗 — sea, swim, wash. Another component frequently carries the " +
                "sound instead, which is why 校, 効 and 郊 all read こう.",
                "You do not need to study radical names as a beginner. You do need to stop looking at a " +
                "kanji as a single shape, because that is the habit that makes the four-hundredth one " +
                "as hard as the first."
            ],
            table: {
                head: ['Radical', 'Suggests', 'Seen in'],
                rows: [
                    ['亻 person', 'people, actions', '休 rest, 何 what, 作 make'],
                    ['氵 water', 'liquid', '海 sea, 泳 swim, 酒 alcohol'],
                    ['木 tree', 'wood, plants', '林 grove, 森 forest, 校 school'],
                    ['言 words', 'speech', '語 language, 話 talk, 読 read'],
                    ['心 heart', 'feeling', '思 think, 悲 sad, 感 feel'],
                    ['日 sun', 'time, light', '時 time, 明 bright, 曜 weekday']
                ]
            },
            examples: [
                { jp: '森', en: 'forest', note: 'Three trees. Some kanji really are that literal.' },
                { jp: '休', en: 'rest', note: 'A person beside a tree.' }
            ],
            check: {
                q: 'You meet 泳 for the first time. What can you guess before looking it up?',
                a: 'That it has something to do with water, from the three strokes on the left. It ' +
                   'means to swim — the radical narrowed it down before you read a definition.'
            }
        },
        {
            title: 'Okurigana — the hiragana on the end',
            body: [
                "食べる is written with a kanji and two kana. The kanji carries the meaning and the kana " +
                "carry the grammar, and the kana on the end have a name: okurigana. They are what let " +
                "one character serve a verb that changes shape constantly.",
                "This is also how Japanese disambiguates readings. 上 alone can be うえ; 上る is のぼる " +
                "and 上げる is あげる. The okurigana tells you which word you are looking at, and " +
                "removing them would make the sentence genuinely ambiguous rather than merely terse.",
                "For the same reason, okurigana is where conjugation happens. Everything the verb stage " +
                "covers happens in those trailing kana, and the kanji never moves."
            ],
            table: {
                head: ['Written', 'Reading', 'Means'],
                rows: [
                    ['上', 'ue', 'above, top'],
                    ['上げる', 'ageru', 'to raise'],
                    ['上る', 'noboru', 'to climb'],
                    ['下', 'shita', 'below'],
                    ['下げる', 'sageru', 'to lower'],
                    ['下さい', 'kudasai', 'please give']
                ]
            },
            check: {
                q: 'Why can 食べる not be written just 食?',
                a: 'Because the べる is doing the grammar. Without it there is nothing to conjugate and ' +
                   'no way to tell which of the character\u2019s readings is meant.'
            }
        },
        {
            title: 'Looking up a kanji you cannot read',
            body: [
                "Sooner or later you meet a character with no reading you can guess, and that used to be " +
                "the hardest problem in learning Japanese. It no longer is, and there are four ways out.",
                "If it is on screen, copy it and paste it into the dictionary here — the search takes " +
                "kanji directly. If it is on paper, the kanji chart on the Kana and Kanji page is " +
                "searchable by meaning and by reading, so a guess at either will often find it. Handwriting " +
                "input on a phone works well and rewards knowing stroke order, since recognition follows " +
                "the strokes you draw.",
                "And if you can identify the radical and count the strokes, you can find anything in a " +
                "paper dictionary — slower, but it is the skill that never stops working."
            ],
            check: {
                q: 'Why does knowing stroke order help with handwriting input?',
                a: 'Because recognition uses the order and direction of your strokes, not just the ' +
                   'finished shape. Drawn in the wrong order, a correct-looking character often fails.'
            }
        },
        {
            title: 'Compounds, and how meaning stacks',
            body: [
                "Most Japanese vocabulary above the basics is built by combining kanji, and the " +
                "combinations are often transparent once you know the parts. 電 electricity plus 話 " +
                "talk is 電話, telephone. Plus 車 vehicle it is 電車, train. Plus 気 spirit it is 電気, " +
                "electricity or the lights.",
                "This is why the return on each new kanji rises rather than falls. The first hundred " +
                "buy you a hundred words; the second hundred buy you several hundred, because each new " +
                "character combines with everything you already have.",
                "One family is worth naming: a great many nouns become verbs simply by adding する. " +
                "勉強 is study as a noun, 勉強する is to study. This covers hundreds of words and costs " +
                "nothing to learn, since する is one of the two irregular verbs you already know."
            ],
            table: {
                head: ['Compound', 'Parts', 'Means'],
                rows: [
                    ['電話', 'electricity + talk', 'telephone'],
                    ['電車', 'electricity + vehicle', 'train'],
                    ['大学', 'big + learning', 'university'],
                    ['先生', 'before + born', 'teacher'],
                    ['入口', 'enter + mouth', 'entrance'],
                    ['勉強する', 'study + do', 'to study'],
                    ['料理する', 'cooking + do', 'to cook']
                ]
            },
            examples: [
                { jp: '電車', en: 'train', note: 'Two characters you already know, one word you did not.' }
            ],
            check: {
                q: 'Why does learning kanji get easier rather than harder?',
                a: 'Because each new character combines with every one you already have. The hundredth ' +
                   'kanji unlocks more words than the tenth did.'
            }
        },
        {
            title: 'How to actually learn them',
            body: [
                "Kanji is the part of Japanese where method matters most, because the volume is large " +
                "enough that a bad method costs years. Four things make the difference.",
                "Learn them in words, not alone. A character memorised in isolation has no reading " +
                "attached that you can use, and readings only make sense inside vocabulary. 日 alone is " +
                "ambiguous; 日本, 今日 and 日曜日 each teach you a reading you can actually deploy.",
                "Use the components. Every kanji above about ten strokes is made of pieces you already " +
                "know, and inventing a story from those pieces makes it stick far better than " +
                "repetition — 休 is a person beside a tree, resting, and you will not forget that.",
                "Space the repetition. Reviewing something just as it starts to fade is worth many " +
                "times reviewing it while you still know it, which is what any spaced system is doing. " +
                "The Performance mode in the quizzes here works on the same principle.",
                "And write them. It is slower than recognition drilling and it is the reason the " +
                "characters stop blurring together — the hand distinguishes shapes the eye confuses."
            ],
            table: {
                head: ['Do', 'Rather than'],
                rows: [
                    ['learn 日 inside 日本, 今日, 日曜日', 'memorise its reading list'],
                    ['break 語 into its parts', 'memorise fourteen strokes'],
                    ['review what is fading', 'review what you know'],
                    ['write them', 'only read them'],
                    ['follow a frequency order', 'work through by stroke count']
                ]
            },
            check: {
                q: 'Why is learning a kanji inside a word better than learning it alone?',
                a: 'Because the readings only make sense in context, and a word gives you something to ' +
                   'use immediately. A reading list with nowhere to apply it fades.'
            }
        },
        {
            title: 'Characters that look almost the same',
            body: [
                "A number of kanji differ by one stroke, one length or one dot, and they are not rare " +
                "characters — several are in the first hundred. Meeting them side by side once is worth " +
                "more than discovering them one confusion at a time.",
                "The commonest trap is 待 and 持: wait and hold, differing only in the left-hand " +
                "component. 未 and 末 differ in which horizontal stroke is longer — not yet versus end. " +
                "土 and 士, earth and gentleman, are the same trick.",
                "The defence is the same as for everything else about kanji: look at the components, " +
                "not the silhouette. 待 has the going-person radical and 持 has the hand radical, which " +
                "makes them obviously different once you see the parts rather than the shape."
            ],
            table: {
                head: ['Pair', 'Difference', 'Means'],
                rows: [
                    ['待 / 持', 'left component', 'wait / hold'],
                    ['未 / 末', 'which stroke is longer', 'not yet / end'],
                    ['土 / 士', 'which stroke is longer', 'earth / gentleman'],
                    ['大 / 犬', 'one dot', 'big / dog'],
                    ['日 / 目', 'one stroke inside', 'sun / eye'],
                    ['人 / 入', 'which stroke is on top', 'person / enter'],
                    ['刀 / 力', 'one stroke', 'sword / power']
                ]
            },
            check: {
                q: 'How do you tell 待 from 持 reliably?',
                a: 'By the left-hand component, not the overall shape. 持 has the hand radical — you ' +
                   'hold with a hand — and 待 does not.'
            }
        }
    ],
    steps: [
        { text: 'Browse the N5 kanji. Tap one for its readings, meanings and stroke count.',
          href: 'characters.html#kanji=n5', label: 'N5 kanji' },
        { text: 'Trace the numbers first — they turn up everywhere and the strokes are few.',
          href: 'writing.html#trace=%E4%B8%80', label: 'Trace 一' },
        { text: 'Trace 国 and watch where the last stroke of the frame falls.',
          href: 'writing.html#trace=%E5%9B%BD', label: 'Trace 国' },
        { text: 'From any kanji, use Look up in Dictionary to meet it inside real words.',
          href: 'dictionary.html#q=%E6%97%A5%E6%9C%AC', label: 'Look up 日本' },
        { text: 'Drill the readings.',
          href: 'practice.html#kanji=n5', label: 'N5 kanji quiz' }
    ]
},
{
    id: 'jukujikun',
    title: 'Words that ignore their kanji',
    aim: 'Readings you cannot work out from the characters.',
    body: 'A set of common words are read as whole units, with no relationship between the reading and ' +
        'the individual characters. Knowing they exist stops you trying to derive them.',
    lessons: [
        {
            title: '熟字訓 — the reading belongs to the word',
            body: [
                "今日 is きょう. Neither character contributes きょ or う — the word came first and the " +
                "characters were fitted to its meaning afterwards. These are 熟字訓, readings assigned " +
                "to a compound as a whole, and there is nothing to work out. You either know the word " +
                "or you look it up.",
                "The good news is that the list is short and front-loaded with words you need on day " +
                "one: 今日, 昨日, 明日, 大人, 一人, 二人. You will meet almost all the common ones early " +
                "and can stop worrying about the rest.",
                "The bad news is that they defeat guessing entirely, which is worth knowing before you " +
                "spend ten minutes trying to make 果物 read as かぶつ."
            ],
            table: {
                head: ['Written', 'Read', 'Means'],
                rows: [
                    ['今日', 'きょう', 'today'],
                    ['昨日', 'きのう', 'yesterday'],
                    ['明日', 'あした / あす', 'tomorrow'],
                    ['一昨日', 'おととい', 'the day before yesterday'],
                    ['今朝', 'けさ', 'this morning'],
                    ['大人', 'おとな', 'adult'],
                    ['一人 / 二人', 'ひとり / ふたり', 'one person / two people'],
                    ['果物', 'くだもの', 'fruit'],
                    ['眼鏡', 'めがね', 'glasses'],
                    ['上手 / 下手', 'じょうず / へた', 'skilled / unskilled'],
                    ['梅雨', 'つゆ', 'the rainy season'],
                    ['土産', 'みやげ', 'a souvenir']
                ]
            },
            examples: [
                { jp: '今日', en: 'today',
                  note: 'Two characters, one reading, and no way to derive it from either.' }
            ],
            check: {
                q: 'You meet 田舎 and cannot make the readings fit. What should you assume?',
                a: 'That it is 熟字訓 — いなか, countryside. When neither character explains the sound, ' +
                   'stop deriving and look it up.'
            }
        },
        {
            title: '当て字 — kanji borrowed for their sound',
            body: [
                "The opposite trick also exists. 当て字 uses characters for their sound while ignoring " +
                "their meaning, which is how foreign words were written before katakana took over. " +
                "亜米利加 is America, spelled with characters meaning Asia, rice and profit — none of " +
                "which is relevant.",
                "Most have been replaced by katakana, but some survive because they look better on a " +
                "sign or a menu: 寿司 for sushi, 珈琲 for coffee. Both are read as ordinary words and " +
                "neither can be worked out from the parts.",
                "A handful of native words are also written this way, usually in older or more literary " +
                "text: 兎に角 for とにかく, anyway, and 出鱈目 for でたらめ, nonsense. Seeing them in " +
                "kana is far more common now."
            ],
            table: {
                head: ['Written', 'Read', 'Means'],
                rows: [
                    ['寿司', 'すし', 'sushi'],
                    ['珈琲', 'コーヒー', 'coffee'],
                    ['亜米利加', 'アメリカ', 'America — now written in katakana'],
                    ['兎に角', 'とにかく', 'anyway'],
                    ['出鱈目', 'でたらめ', 'nonsense'],
                    ['滅茶苦茶', 'めちゃくちゃ', 'a mess, absurd']
                ]
            },
            check: {
                q: 'Why does 珈琲 have nothing to do with jewels or strings?',
                a: 'Because the characters were chosen for their sound, not their meaning. It is 当て字, ' +
                   'and the parts carry no information about the word.'
            }
        },
        {
            title: 'Furigana, and when it appears',
            body: [
                "The system's own answer to unreadable kanji is furigana — small kana printed alongside " +
                "to give the reading. In horizontal text they sit above; in vertical text, to the right.",
                "They turn up wherever the reader might not know the character: children's books, manga, " +
                "textbooks, and in ordinary adult writing for rare kanji, unusual name readings, and " +
                "anything a writer wants read a particular way. A newspaper will add them to a " +
                "character outside the standard list.",
                "For a learner this is a gift. Material with furigana is readable several levels above " +
                "your kanji, which is exactly why the reading stage recommends looking for it. And " +
                "names print theirs on business cards for the same reason you would need them — even " +
                "Japanese readers cannot always tell."
            ],
            table: {
                head: ['Where', 'Why'],
                rows: [
                    ['children\u2019s books', 'the reader does not know the kanji yet'],
                    ['manga', 'young readers, and stylistic effect'],
                    ['newspapers', 'characters outside the standard list'],
                    ['business cards', 'name readings are unpredictable'],
                    ['textbooks', 'teaching the reading alongside the word']
                ]
            },
            check: {
                q: 'Why do Japanese business cards print the reading of the name?',
                a: 'Because name readings are genuinely unpredictable, and native readers cannot always ' +
                   'tell either. It is not a courtesy to foreigners.'
            }
        }
    ],
    steps: [
        { text: 'Look up a word whose reading you could never have guessed.',
          href: 'dictionary.html#q=今日', label: 'Look up 今日' },
        { text: 'Break down a sentence containing one and see the reading supplied.',
          href: 'dictionary.html#s=今日は果物を買いました', label: 'Break down 熟字訓' },
        { text: 'Browse the chart and notice how many readings each character carries.',
          href: 'characters.html#kanji=n5', label: 'N5 kanji' }
    ]
},
{
    id: 'wordbuilding',
    title: 'Making words from words',
    aim: 'The prefixes, suffixes and compounds that multiply vocabulary.',
    body: 'A large share of Japanese vocabulary is assembled from parts. Learn the parts and you stop ' +
        'learning words one at a time.',
    lessons: [
        {
            title: 'Prefixes that flip or shade a meaning',
            body: [
                "A small set of single kanji attach to the front of a word and change it predictably. " +
                "Four of them negate, in slightly different ways, and knowing which is which lets you " +
                "read a word you have never met.",
                "不 is the general not — 不便, inconvenient. 無 is without — 無料, free of charge, " +
                "literally without fee. 非 is non- and tends towards the official — 非常口, emergency " +
                "exit, literally non-ordinary exit. 未 is not yet — 未定, not yet decided.",
                "Others shade rather than negate: 再 is re-, 大 and 小 scale things up and down, 各 is " +
                "each, and お and ご you already know from politeness."
            ],
            table: {
                head: ['Prefix', 'Means', 'Example'],
                rows: [
                    ['不 ふ', 'not, un-', '不便 inconvenient'],
                    ['無 む', 'without', '無料 free of charge'],
                    ['非 ひ', 'non-', '非常 emergency, extraordinary'],
                    ['未 み', 'not yet', '未定 undecided'],
                    ['再 さい', 're-, again', '再開 resume'],
                    ['大 だい', 'big, major', '大学 university'],
                    ['各 かく', 'each', '各駅 every station']
                ]
            },
            examples: [
                { jp: '非常口', en: 'emergency exit',
                  note: 'Three characters you may know separately, one sign you will see everywhere.' }
            ],
            check: {
                q: 'You see 未使用 on a package. What does it mean?',
                a: 'Unused — 未 not yet plus 使用 use. The prefix tells you the rest without a dictionary.'
            }
        },
        {
            title: 'Suffixes that change what kind of word it is',
            body: [
                "The other end does more work. 的 turns a noun into an adjective — 経済, economy, " +
                "becomes 経済的, economical. 化 turns it into a process — 国際, international, becomes " +
                "国際化, internationalisation. 性 turns it into a quality — 可能, possible, becomes " +
                "可能性, possibility.",
                "For people, several suffixes divide by role: 者 is a person doing something, 家 an " +
                "expert or practitioner, 員 a member of staff, 屋 a shop or the person who runs it. " +
                "So 学者 is a scholar, 作家 a writer, 店員 a shop assistant, 本屋 a bookshop.",
                "And two turn adjectives into nouns with different flavours: さ measures — 高さ, height " +
                "— while み gives the quality as something felt: 暖かみ, warmth in the sense of feeling " +
                "rather than temperature."
            ],
            table: {
                head: ['Suffix', 'Makes', 'Example'],
                rows: [
                    ['〜的 てき', 'an adjective', '経済的 economical'],
                    ['〜化 か', 'a process', '国際化 internationalisation'],
                    ['〜性 せい', 'a quality', '可能性 possibility'],
                    ['〜者 しゃ', 'a person who', '学者 scholar'],
                    ['〜家 か', 'an expert', '作家 writer'],
                    ['〜員 いん', 'a member of staff', '店員 shop assistant'],
                    ['〜屋 や', 'a shop or its keeper', '本屋 bookshop'],
                    ['〜さ', 'a measurable noun', '高さ height'],
                    ['〜中 ちゅう', 'in the middle of', '会議中 in a meeting']
                ]
            },
            examples: [
                { jp: '可能性', en: 'possibility',
                  note: '可能 possible plus 性. The suffix does the work a whole English word would.' }
            ],
            check: {
                q: 'What is the difference between 高さ and 高み?',
                a: '高さ is height as a measurement — how tall. 高み is a height in the sense of an ' +
                   'elevated place or feeling. さ measures; み evokes.'
            }
        },
        {
            title: 'Verbs stuck to other verbs',
            body: [
                "Japanese joins verbs by attaching a second one to the first verb's stem, and the " +
                "result is a single word with a combined meaning. This is enormously productive and " +
                "almost invisible to learners until it is pointed out.",
                "読み始める is to start reading, from 読む plus 始める. 食べ終わる is to finish eating. " +
                "話し続ける is to keep talking. Once you see the seam, dozens of apparently new verbs " +
                "become two verbs you already know.",
                "Some of the second halves have drifted from their literal meaning. 〜出す means to " +
                "suddenly start — 泣き出す, burst into tears — rather than to put out. 〜直す is to " +
                "redo, 〜込む is to do into or thoroughly, and 〜合う is to do mutually."
            ],
            table: {
                head: ['Compound', 'Parts', 'Means'],
                rows: [
                    ['読み始める', '読む + 始める', 'start reading'],
                    ['食べ終わる', '食べる + 終わる', 'finish eating'],
                    ['話し続ける', '話す + 続ける', 'keep talking'],
                    ['泣き出す', '泣く + 出す', 'burst into tears'],
                    ['やり直す', 'やる + 直す', 'do over'],
                    ['話し合う', '話す + 合う', 'discuss together'],
                    ['申し込む', '申す + 込む', 'apply for']
                ]
            },
            examples: [
                { jp: '本を読み始めました', en: 'I started reading a book',
                  note: 'Stem plus a second verb. Only the last one conjugates.' }
            ],
            check: {
                q: 'In 読み始めました, which verb carries the tense?',
                a: 'The second one. 読み is the stem, doing no grammar, and 始める takes the polite past ' +
                   'for the whole compound.'
            }
        }
    ],
    steps: [
        { text: 'Break down a compound verb and see both halves named.',
          href: 'dictionary.html#s=本を読み始めました', label: 'Break down 読み始める' },
        { text: 'Look up a word built from a suffix.',
          href: 'dictionary.html#q=可能性', label: 'Look up 可能性' },
        { text: 'Move the kanji chart up — the compounds get easier as the characters accumulate.',
          href: 'characters.html#kanji=n3', label: 'N3 kanji' }
    ]
},
{
    id: 'writing',
    title: 'Writing it down',
    aim: 'Punctuation, typing, and choosing a script.',
    body: 'Producing Japanese has its own small set of conventions, none of them hard, all of them ' +
        'invisible until you get one wrong.',
    lessons: [
        {
            title: 'Punctuation and layout',
            body: [
                "Japanese punctuation looks familiar and is not. The full stop is 。, a small hollow " +
                "circle, and the comma is 、 leaning the other way from a Western one. Both occupy a " +
                "full character width, like everything else in the line.",
                "Quotation uses corner brackets: 「 」 for speech, and 『 』 for a quote inside a quote " +
                "or for titles. Question marks and exclamation marks exist but are optional and " +
                "informal, since か already marks a question.",
                "Text runs horizontally left to right in most modern contexts, but vertically — top to " +
                "bottom, columns right to left — in novels, newspapers and anything formal. The same " +
                "characters work in both directions, which is part of why the writing system survived " +
                "the transition to print unchanged."
            ],
            table: {
                head: ['Mark', 'Name', 'Used for'],
                rows: [
                    ['。', 'kuten', 'full stop'],
                    ['、', 'touten', 'comma'],
                    ['「 」', 'kagi kakko', 'speech, quotations'],
                    ['『 』', 'nijuu kagi', 'titles, quote within a quote'],
                    ['・', 'nakaguro', 'separating items, foreign names'],
                    ['〜', 'nami dash', 'ranges, or trailing off'],
                    ['ー', 'chouonpu', 'long vowel in katakana']
                ]
            },
            check: {
                q: 'Why are ？ and ！ optional in Japanese?',
                a: 'Because か already marks a question grammatically. The marks were borrowed and are ' +
                   'used for tone, mostly in casual writing.'
            }
        },
        {
            title: 'Typing Japanese',
            body: [
                "You type Japanese in romaji and the input method converts it. Type ka and か appears; " +
                "type nihon and press space and it offers 日本, 二本 and others, and you pick. The IME " +
                "is doing the same job as the segmenter on this site, in reverse.",
                "A few conventions catch people. ん needs nn or a following consonant, or it will attach " +
                "to the next vowel. The small っ comes from doubling the next consonant — kitte gives " +
                "きって. Small kana on their own take an x or l prefix: xa gives ぁ. And を is typed wo " +
                "even though it is said o.",
                "Learning to type is worth doing early. It makes looking things up trivial, and " +
                "choosing between the candidates the IME offers is itself kanji practice — you cannot " +
                "pick the right one without recognising it."
            ],
            table: {
                head: ['To get', 'Type'],
                rows: [
                    ['ん', 'nn'],
                    ['っ', 'double the next consonant — kitte'],
                    ['を', 'wo'],
                    ['ぁ ぃ ぅ', 'xa xi xu'],
                    ['ー', 'the hyphen key'],
                    ['、 。', 'the comma and full stop keys']
                ]
            },
            check: {
                q: 'Why does typing "honya" not give you 本屋?',
                a: 'Because the ん needs nn — hon-ya typed as honya reads as ほにゃ. Type honnya, or ' +
                   'rely on the apostrophe convention some IMEs accept.'
            }
        },
        {
            title: 'Which script, and when',
            body: [
                "With three scripts available, the same word can often be written more than one way, " +
                "and the choice carries tone. There are conventions rather than rules.",
                "Kanji is the default for content words that have one. Hiragana takes over when the " +
                "kanji is rare, when the writing is aimed at children, or to soften the look of a " +
                "sentence — ありがとう is almost never written 有難う. Katakana marks borrowings, but " +
                "also emphasis and sound effects, which is why an ordinary Japanese word in katakana " +
                "reads as if it were in italics.",
                "Learners tend to over-use kanji because it feels advanced. Native writing uses less " +
                "than beginners expect, and words like こと, もの, ある and いる are usually kana even " +
                "though kanji exists for all of them."
            ],
            examples: [
                { jp: 'ありがとう', en: 'thank you',
                  note: 'Kanji exists — 有難う — and almost nobody writes it.' }
            ],
            check: {
                q: 'You see an ordinary Japanese word written in katakana. What does that signal?',
                a: 'Emphasis, or a particular tone — the equivalent of italics. It is not a borrowing ' +
                   'just because it is in katakana.'
            }
        },
        {
            title: 'Printed and handwritten are not the same shape',
            body: [
                "A character can look noticeably different in print and by hand, and neither is wrong. " +
                "The best-known case is 令: printed it usually has a straight vertical under a flat " +
                "top, while handwritten it takes a shape closer to a small katakana マ. Both are the " +
                "same character and both are correct.",
                "The two common typefaces differ too. 明朝体 is the serif face used for body text, with " +
                "thick and thin strokes and small triangular flourishes. ゴシック体 is the sans-serif " +
                "used for headings, signs and screens, with even strokes. Learners often trace ゴシック " +
                "shapes because that is what a screen shows, and end up writing letters that look " +
                "printed rather than written.",
                "The tracing templates here use a handwriting face for this reason. What you copy " +
                "should be what a hand produces, not what a typesetter does."
            ],
            table: {
                head: ['Character', 'Printed', 'Handwritten'],
                rows: [
                    ['令', 'straight vertical', 'マ-shaped lower part'],
                    ['心', 'even curve', 'a looser sweep'],
                    ['糸', 'separated lower strokes', 'often joined'],
                    ['さ / き', 'stroke separated', 'often connected by hand'],
                    ['明朝体', 'serif — body text', '—'],
                    ['ゴシック体', 'sans — signs, screens', '—']
                ]
            },
            check: {
                q: 'Your handwritten 令 does not match the one on screen. Is it wrong?',
                a: 'No. The printed and handwritten forms of that character genuinely differ, and both ' +
                   'are standard. Copy the handwriting form when writing.'
            }
        }
    ],
    steps: [
        { text: 'Trace 書, the character for writing.',
          href: 'writing.html#trace=書', label: 'Trace 書' },
        { text: 'Look up a word that is usually written in kana and see the kanji it hides.',
          href: 'dictionary.html#q=ありがとう', label: 'Look up ありがとう' },
        { text: 'Type a sentence into the Sentence tab — the IME practice is the point.',
          href: 'dictionary.html', label: 'Sentence tab' }
    ]
},
{
    id: 'politeness',
    title: 'Politeness',
    aim: 'Why the same sentence has several forms.',
    body: 'Japanese changes shape depending on who you are talking to, and which form you pick says ' +
        'where you stand relative to the listener.',
    lessons: [
        {
            title: 'Three dials, not one scale',
            body: [
                "Politeness in Japanese is not a single slider from casual to formal. Three separate " +
                "things are going on, and they combine.",
                "Teineigo is plain politeness — the です and ます forms. It is about the listener, and it " +
                "is the safe default with anyone you do not know well. Sonkeigo is honorific: it raises " +
                "the person you are talking about, so you use it for their actions, never your own. " +
                "Kenjougo is humble: it lowers you, so you use it for your own actions when the other " +
                "person deserves deference.",
                "The mistake that gives learners away is not being too casual — it is using an honorific " +
                "form for yourself. Saying you will 召し上がる your own lunch elevates you above your " +
                "listener, which is worse than being blunt."
            ],
            check: {
                q: 'Your manager asks whether you have eaten. Which verb do you use about yourself?',
                a: 'The humble one — いただきました — or plain polite 食べました. Never 召し上がりました, ' +
                   'which is honorific and raises the person it describes.'
            }
        },
        {
            title: 'The swaps you will actually meet',
            body: [
                "A small number of very common verbs have their own honorific and humble forms rather " +
                "than following a pattern. These are the ones you will hear in shops, offices and on " +
                "trains, and knowing them is most of practical keigo at this stage."
            ],
            table: {
                head: ['Plain', 'Polite', 'Honorific — them', 'Humble — you'],
                rows: [
                    ['食べる', '食べます', '召し上がる', 'いただく'],
                    ['行く', '行きます', 'いらっしゃる', '参る'],
                    ['来る', '来ます', 'いらっしゃる', '参る'],
                    ['見る', '見ます', 'ご覧になる', '拝見する'],
                    ['する', 'します', 'なさる', 'いたす'],
                    ['言う', '言います', 'おっしゃる', '申す'],
                    ['いる', 'います', 'いらっしゃる', 'おる']
                ]
            },
            examples: [
                { jp: '行きました', en: 'went',
                  note: 'Plain polite. The breakdown tags it polite — that tag is this whole topic.' }
            ],
            check: {
                q: 'A shop assistant says いらっしゃいませ. What is happening grammatically?',
                a: 'It is the honorific いらっしゃる — to come or to be — addressed to you. They are ' +
                   'raising the customer, which is why you never say it back.'
            }
        },
        {
            title: 'お and ご, the polite prefixes',
            body: [
                "Some nouns take a prefix that makes them politer: お for words of native Japanese " +
                "origin and ご for words built from Chinese-derived readings. お名前, your name; ご家族, " +
                "your family. It is a small thing that raises the register of a whole sentence.",
                "The rule is not absolute — お電話 and お時間 both use お despite being on-reading words " +
                "— but the split holds often enough to guess from.",
                "A few words have absorbed the prefix permanently and are no longer polite at all: お茶, " +
                "ご飯, お金. Nobody says 茶 for a cup of tea in ordinary speech. And there is a limit: " +
                "attaching it to your own things sounds absurd, in the same way as calling your own house " +
                "a residence."
            ],
            table: {
                head: ['Prefix', 'Used with', 'Examples'],
                rows: [
                    ['お', 'native readings', 'お名前, お仕事, お金, お茶'],
                    ['ご', 'Chinese-derived readings', 'ご家族, ご住所, ご注文, ご飯'],
                    ['fixed', 'no longer optional', 'お茶, ご飯, お金, お風呂']
                ]
            },
            check: {
                q: 'Would you say お名前 about yourself?',
                a: 'No. The prefix elevates whatever it attaches to, so using it for your own name ' +
                   'raises you. Say 名前 for yours and お名前 for theirs.'
            }
        },
        {
            title: 'When plain form is the right choice',
            body: [
                "Polite form is the safe default, but always using it is its own mistake. Between " +
                "friends, or with family, ます and です put up a wall — the register says we are not " +
                "close, which is precisely what you did not mean.",
                "Plain form is right with friends, family, children, and anyone clearly junior in a " +
                "casual setting. It is also what you use inside a sentence rather than at the end of " +
                "one: subordinate clauses take plain form even when the sentence itself is polite. " +
                "食べる時間がありません is correct — the 食べる is plain because it modifies 時間.",
                "The usual advice is to stay polite until someone else drops first, which is sound. " +
                "Over-formality is a small mistake and easily forgiven; over-familiarity is not."
            ],
            examples: [
                { jp: '食べる時間がありません', en: 'There is no time to eat',
                  note: 'Plain 食べる inside, polite ありません at the end. Both correct at once.' }
            ],
            check: {
                q: 'A polite sentence has a plain verb in the middle of it. Is that a mistake?',
                a: 'No. Politeness is carried by the final verb only; clauses inside the sentence take ' +
                   'plain form regardless of how formal the whole thing is.'
            }
        }
    ],
    steps: [
        { text: 'Read the overview: plain, polite, humble, honorific — and when each is used.',
          href: 'keigo.html#overview', label: 'Keigo overview' },
        { text: 'Notice the polite tag in a sentence breakdown — it marks ます and です forms.',
          href: 'dictionary.html#s=%E8%A1%8C%E3%81%8D%E3%81%BE%E3%81%97%E3%81%9F', label: 'Break down 行きました' }
    ]
},
{
    id: 'keigopatterns',
    title: 'Keigo you can build',
    aim: 'The patterns that turn any verb honorific or humble.',
    body: 'The swap table only covers a dozen verbs. These patterns cover the rest, which is what makes ' +
        'keigo learnable rather than memorisable.',
    lessons: [
        {
            title: 'お〜になる — raising what they do',
            body: [
                "Take a verb stem, put お in front and になる behind, and you have the honorific form of " +
                "almost any verb. 書く becomes お書きになる, 待つ becomes お待ちになる. For する-verbs " +
                "built from Chinese-derived nouns, use ご instead: 利用する becomes ご利用になる.",
                "There is a second honorific route that is easier to say and slightly less elevated: the " +
                "passive form used as an honorific. 書かれる can mean is written, can write, or — in the " +
                "right register — writes, honorifically. Context separates them, and the fact that it " +
                "looks identical to the passive is why the Sentence tab flags that ambiguity rather " +
                "than resolving it.",
                "The rule that matters: this is for what other people do. Applying it to yourself " +
                "elevates you, which is the error that gets noticed."
            ],
            table: {
                head: ['Plain', 'Honorific — built', 'Honorific — special'],
                rows: [
                    ['書く', 'お書きになる', '—'],
                    ['待つ', 'お待ちになる', '—'],
                    ['読む', 'お読みになる', '—'],
                    ['利用する', 'ご利用になる', '—'],
                    ['食べる', '—', '召し上がる'],
                    ['行く', '—', 'いらっしゃる'],
                    ['言う', '—', 'おっしゃる']
                ]
            },
            examples: [
                { jp: 'お待ちください', en: 'Please wait',
                  note: 'お plus stem plus ください — the honorific request you will hear most.' }
            ],
            check: {
                q: 'Is お書きになりました correct about yourself?',
                a: 'No. お〜になる raises the subject, so using it for your own actions puts you above ' +
                   'your listener. Use お書きしました, the humble form, or plain 書きました.'
            }
        },
        {
            title: 'お〜する — lowering what you do',
            body: [
                "The mirror pattern is お plus stem plus する, and it does the opposite: it lowers your " +
                "own action, which raises the person it is done for. お持ちします, I will carry it. " +
                "お送りします, I will send it. The formal version swaps する for いたす: お待ちいたします.",
                "For ご-words the shape is the same: ご説明いたします, I will explain. This is the " +
                "backbone of customer-facing and business Japanese, and it sounds natural rather than " +
                "stiff in those settings.",
                "One more worth having: 〜させていただきます, built from the causative plus the humble " +
                "receive. It literally asks to be allowed and means I will, humbly — 説明させていただき" +
                "ます. It is very common, occasionally overused, and always safe."
            ],
            table: {
                head: ['Plain', 'Humble — built', 'Humble — special'],
                rows: [
                    ['持つ', 'お持ちします', '—'],
                    ['送る', 'お送りいたします', '—'],
                    ['説明する', 'ご説明いたします', '—'],
                    ['行く / 来る', '—', '参る'],
                    ['見る', '—', '拝見する'],
                    ['言う', '—', '申す / 申し上げる'],
                    ['する', '—', 'いたす']
                ]
            },
            examples: [
                { jp: '説明させていただきます', en: 'Allow me to explain',
                  note: 'Causative plus humble receiving — asking permission as a way of announcing.' }
            ],
            check: {
                q: 'Which pattern would a shop assistant use to say they will bring something?',
                a: 'お持ちします — the humble one, lowering their own action. お持ちになります would ' +
                   'elevate themselves and is the classic error.'
            }
        },
        {
            title: 'Which dial, and how far',
            body: [
                "Three questions decide it. Whose action is it — yours or theirs? Are you inside their " +
                "group or outside it? And how formal is the setting?",
                "For their action, honorific. For yours, humble. For anything neutral or shared, plain " +
                "polite です・ます is enough and is the correct answer far more often than beginners " +
                "assume — piling keigo onto every sentence reads as anxious rather than respectful.",
                "The inside–outside line overrides seniority. Talking to a customer about your own " +
                "company president, you use humble forms for what he does, because he is inside your " +
                "group and the customer is not. This is the part that feels strangest and is the " +
                "clearest evidence that keigo is about relationships rather than rank."
            ],
            table: {
                head: ['Situation', 'Use'],
                rows: [
                    ['their action, they are senior or a customer', 'honorific — お〜になる'],
                    ['your action, done for them', 'humble — お〜する'],
                    ['neutral, ordinary politeness', 'です・ます'],
                    ['your boss, to an outsider', 'humble — he is inside your group'],
                    ['your boss, to a colleague', 'honorific — both inside']
                ]
            },
            check: {
                q: 'You tell a client what your own manager said. Honorific or humble?',
                a: 'Humble. Your manager is inside your group and the client is outside, so you lower ' +
                   'your side regardless of who outranks whom internally.'
            }
        }
    ],
    steps: [
        { text: 'Read the verbs page — the special forms alongside the built ones.',
          href: 'keigo.html#verbs', label: 'Keigo verbs' },
        { text: 'Read the patterns page for these frames in context.',
          href: 'keigo.html#patterns', label: 'Keigo patterns' },
        { text: 'Test yourself on the keigo quiz.',
          href: 'keigo.html#quiz', label: 'Keigo quiz' }
    ]
},
{
    id: 'register',
    title: 'Writing to people',
    aim: 'Email, formal writing, and the two written styles.',
    body: 'Written Japanese chooses a style and holds it. Mixing them is the most visible mistake in ' +
        'anything you send.',
    lessons: [
        {
            title: 'The two written styles',
            body: [
                "Japanese prose comes in two registers and you pick one per document. です・ます体 is " +
                "the polite style you already know, used in letters, email, textbooks and anything " +
                "addressed to a reader. だ・である体 is the plain style used in newspapers, academic " +
                "writing, reports and novels — it addresses nobody in particular.",
                "である is a written form of だ that appears almost nowhere in speech. Seeing it tells " +
                "you immediately what kind of text you are in, which is useful long before you can read " +
                "the rest of it.",
                "The rule is consistency. A paragraph that starts です・ます and slips into plain reads " +
                "as careless in a way that has no English equivalent, because English has no equivalent " +
                "switch to be inconsistent about."
            ],
            table: {
                head: ['', 'です・ます体', 'だ・である体'],
                rows: [
                    ['is', 'です', 'だ / である'],
                    ['does', 'します', 'する'],
                    ['did', 'しました', 'した'],
                    ['not', 'しません', 'しない'],
                    ['used in', 'email, letters, textbooks', 'news, papers, reports, novels']
                ]
            },
            check: {
                q: 'You see である in the first line of a text. What does that tell you?',
                a: 'That it is written rather than spoken register — a report, an article or an essay. ' +
                   'である almost never appears in conversation.'
            }
        },
        {
            title: 'Email that does not read as rude',
            body: [
                "Japanese business email has a fixed frame, and following it matters more than the " +
                "quality of the Japanese in between. Opening straight into your request, which is " +
                "normal and efficient in English, reads as abrupt.",
                "The shape is: address the person by name and title, open with a set greeting, state " +
                "your business, close with a set phrase, sign. お世話になっております is the standard " +
                "opening to anyone you have dealings with — it thanks them for the relationship and " +
                "means almost nothing literally.",
                "For requests, 恐れ入りますが and お手数ですが soften the imposition before it arrives. " +
                "And よろしくお願いいたします closes almost everything, in the more formal いたします " +
                "form rather than します."
            ],
            table: {
                head: ['Phrase', 'Where'],
                rows: [
                    ['〜様 / 〜さん', 'the addressee, at the top'],
                    ['お世話になっております', 'opening line, existing contact'],
                    ['はじめてご連絡いたします', 'opening line, first contact'],
                    ['恐れ入りますが', 'before a request'],
                    ['お手数ですが', 'before asking for effort'],
                    ['ご確認ください', 'please check'],
                    ['よろしくお願いいたします', 'closing line, almost always'],
                    ['失礼いたします', 'a formal sign-off']
                ]
            },
            examples: [
                { jp: 'お世話になっております', en: 'Thank you for your continued support',
                  note: 'Break it down and the pieces make sense; the use does not follow from them.' }
            ],
            check: {
                q: 'Why not open an email with the request itself?',
                a: 'Because Japanese email expects a greeting frame first. Going straight to business ' +
                   'reads as abrupt, in the same way as starting an English phone call with a demand.'
            }
        },
        {
            title: 'When to be less formal, and how to tell',
            body: [
                "Over-formality is a mild error and under-formality is not, so when in doubt stay " +
                "polite. But permanently formal Japanese with people you know well is its own signal — " +
                "it says you are keeping your distance.",
                "The cues are readable. If someone writes to you in plain form, matching them is " +
                "correct. If they drop 様 for さん, follow. If a colleague uses your given name, the " +
                "register has moved. The general principle is to follow rather than lead, and to move " +
                "one step at a time.",
                "One asymmetry worth knowing: seniority runs in both directions. A senior person moving " +
                "to casual with you is not an invitation to do the same back, unless they also invite it."
            ],
            table: {
                head: ['Signal', 'Means'],
                rows: [
                    ['〜様 → 〜さん', 'the distance has closed a step'],
                    ['です・ます → plain', 'they are treating you as familiar'],
                    ['family name → given name', 'a considerable step'],
                    ['敬語 throughout', 'formal distance, or you are the customer']
                ]
            },
            check: {
                q: 'A senior colleague writes to you casually. Do you reply the same way?',
                a: 'Not automatically. Seniority is asymmetric — they can be casual with you before you ' +
                   'can be with them. Follow only when it is clearly invited.'
            }
        },
        {
            title: 'On the telephone',
            body: [
                "Phone Japanese is its own dialect of politeness, partly because you cannot bow down a " +
                "phone line and partly because the other person cannot see you. It is highly scripted, " +
                "which makes it learnable.",
                "もしもし is the informal opener and is not used in business — a company answers with " +
                "the company name plus でございます, the humble form of です. If you are calling, you " +
                "identify yourself first, then ask for the person: 〜の田中と申しますが、山田さんは" +
                "いらっしゃいますか.",
                "少々お待ちください asks them to hold, かしこまりました acknowledges an instruction, and " +
                "失礼いたします ends the call. Nobody says さようなら on a business call.",
                "One habit worth borrowing: Japanese callers give their own name and organisation " +
                "before anything else, every time. It removes the guessing that opens most English " +
                "phone calls."
            ],
            table: {
                head: ['Japanese', 'Used'],
                rows: [
                    ['もしもし', 'informal calls only'],
                    ['〜でございます', 'answering — company or own name'],
                    ['〜と申します', 'introducing yourself'],
                    ['〜さんはいらっしゃいますか', 'asking for someone'],
                    ['少々お待ちください', 'please hold'],
                    ['かしこまりました', 'understood — service register'],
                    ['失礼いたします', 'ending the call']
                ]
            },
            examples: [
                { jp: '少々お待ちください', en: 'One moment please',
                  note: 'お plus stem plus ください — the honorific request pattern.' }
            ],
            check: {
                q: 'Should you answer a business call with もしもし?',
                a: 'No. Answer with your company or your own name plus でございます. もしもし is for ' +
                   'informal calls and sounds careless at work.'
            }
        }
    ],
    steps: [
        { text: 'Break down the standard email opening.',
          href: 'dictionary.html#s=お世話になっております', label: 'Break down the opener' },
        { text: 'Read the patterns page — the set phrases in context.',
          href: 'keigo.html#patterns', label: 'Keigo patterns' },
        { text: 'Check yourself against the pitfalls.',
          href: 'keigo.html#pitfalls', label: 'Keigo pitfalls' }
    ]
},
{
    id: 'situations',
    title: 'Out in the world',
    aim: 'Shops, restaurants, trains, and asking for help.',
    body: 'Real situations run on a small number of fixed exchanges. Knowing the script means you can ' +
        'take part long before you can converse.',
    lessons: [
        {
            title: 'Shopping and prices',
            body: [
                "Shop language is almost entirely formulaic, and most of it comes at you rather than " +
                "from you. いらっしゃいませ greets you and expects no reply. The exchange you need to " +
                "produce is short: name the thing, ask the price, say please.",
                "ください is the workhorse — これをください, this one please. For asking how much, " +
                "いくらですか covers everything. And 〜はありますか asks whether they have something, " +
                "which is more useful than any amount of vocabulary because it lets you ask for what " +
                "you cannot name."
            ],
            table: {
                head: ['Japanese', 'Means'],
                rows: [
                    ['いらっしゃいませ', 'welcome — no reply needed'],
                    ['これをください', 'this one, please'],
                    ['いくらですか', 'how much is it?'],
                    ['〜はありますか', 'do you have ~?'],
                    ['見ているだけです', 'just looking'],
                    ['袋はいりません', 'I do not need a bag'],
                    ['カードは使えますか', 'can I use a card?']
                ]
            },
            examples: [
                { jp: 'これをください', en: 'This one, please',
                  note: 'ください is the te-form request pattern from the verb stage, standing alone.' }
            ],
            check: {
                q: 'A shop assistant says いらっしゃいませ. What do you say back?',
                a: 'Nothing. It is a greeting to the customer, not an opening for conversation — a nod ' +
                   'is the whole of the expected response.'
            }
        },
        {
            title: 'Eating out',
            body: [
                "Restaurants follow an even tighter script. You are seated, asked how many, given water " +
                "and a menu, and left alone until you call. Calling is expected: すみません across the " +
                "room is normal and not rude.",
                "Ordering is noun plus をください, or をお願いします which is slightly softer. When the " +
                "food arrives, いただきます before eating and ごちそうさまでした after are said whether " +
                "or not anyone is listening.",
                "Paying usually happens at the till rather than the table, and splitting a bill is less " +
                "common than in the West — 別々でお願いします asks for it, and is understood everywhere " +
                "even where it is unusual."
            ],
            table: {
                head: ['Japanese', 'Means'],
                rows: [
                    ['何名様ですか', 'how many people?'],
                    ['二人です', 'two of us'],
                    ['メニューをお願いします', 'the menu, please'],
                    ['これをお願いします', 'this one, please — ordering'],
                    ['お会計をお願いします', 'the bill, please'],
                    ['別々でお願いします', 'separate bills, please'],
                    ['おいしかったです', 'it was delicious']
                ]
            },
            check: {
                q: 'How do you get a server\u2019s attention?',
                a: 'すみません, said clearly across the room. Waiting to be noticed is the mistake — ' +
                   'staff leave you alone until called.'
            }
        },
        {
            title: 'Trains and directions',
            body: [
                "Station Japanese is dense but repetitive, and a handful of words unlock the signs. " +
                "駅 station, 線 line, 番線 platform, 出口 exit, 入口 entrance, 北 南 東 西 for the " +
                "compass points on exits.",
                "Asking directions works with a fixed frame: 〜はどこですか, where is ~. The answer will " +
                "come faster than you can parse it, so listen for the direction words and the landmark " +
                "rather than the sentence. まっすぐ straight, 右 right, 左 left, 次 next.",
                "If you get lost, 道に迷いました — I have lost my way — is worth having ready, along " +
                "with ゆっくりお願いします, slowly please, which is the single most useful sentence a " +
                "beginner can carry."
            ],
            table: {
                head: ['Japanese', 'Means'],
                rows: [
                    ['〜はどこですか', 'where is ~?'],
                    ['まっすぐ', 'straight ahead'],
                    ['右 / 左', 'right / left'],
                    ['次の駅', 'the next station'],
                    ['何番線ですか', 'which platform?'],
                    ['東口 / 西口', 'east exit / west exit'],
                    ['道に迷いました', 'I am lost']
                ]
            },
            examples: [
                { jp: '駅はどこですか', en: 'Where is the station?',
                  note: 'Swap the noun and this frame asks for anything.' }
            ],
            check: {
                q: 'What is the most useful sentence to have ready as a beginner?',
                a: 'ゆっくりお願いします — slowly, please. It turns an incomprehensible answer into a ' +
                   'comprehensible one more often than any amount of vocabulary.'
            }
        },
        {
            title: 'When something goes wrong',
            body: [
                "Trouble is where the language gets hardest and matters most, so these are worth " +
                "learning before you need them. All of them are short by design.",
                "分かりません is I do not understand, and もう一度お願いします asks for it again. " +
                "日本語が分かりません states the problem outright and is not an admission of failure — " +
                "it is information the other person needs.",
                "For anything urgent, 助けてください is help me and 救急車を呼んでください asks for an " +
                "ambulance. Emergency numbers are 110 for police and 119 for fire and ambulance."
            ],
            table: {
                head: ['Japanese', 'Means'],
                rows: [
                    ['分かりません', 'I do not understand'],
                    ['もう一度お願いします', 'once more, please'],
                    ['ゆっくりお願いします', 'slowly, please'],
                    ['日本語が分かりません', 'I do not speak Japanese'],
                    ['英語が話せますか', 'do you speak English?'],
                    ['助けてください', 'please help'],
                    ['大丈夫ですか', 'are you all right?']
                ]
            },
            check: {
                q: 'Why is 分かりません better than silence when you are lost in a conversation?',
                a: 'Because it tells the other person what to change. Nodding through incomprehension ' +
                   'keeps the speed up and leaves you further behind.'
            }
        },
        {
            title: 'At the doctor',
            body: [
                "Medical Japanese is worth having before you need it, and the core of it is one " +
                "pattern: body part plus が痛いです, it hurts. 頭が痛いです, I have a headache. That " +
                "sentence plus a handful of nouns covers most of what you need to say.",
                "The other essentials are 熱があります for having a temperature, 風邪をひきました for " +
                "having caught a cold, and 気分が悪いです for feeling unwell generally. Symptoms are " +
                "often described with the mimetic words from the previous stages — a doctor asking how " +
                "the pain feels expects ずきずき or きりきり as the answer.",
                "Practically: bring your 保険証, the insurance card, and expect to be sent to a 薬局, a " +
                "pharmacy, with a prescription rather than given medicine at the clinic."
            ],
            table: {
                head: ['Japanese', 'Means'],
                rows: [
                    ['頭 あたま', 'head'],
                    ['お腹 おなか', 'stomach'],
                    ['喉 のど', 'throat'],
                    ['歯 は', 'tooth'],
                    ['〜が痛いです', '~ hurts'],
                    ['熱があります', 'I have a temperature'],
                    ['風邪をひきました', 'I have caught a cold'],
                    ['気分が悪いです', 'I feel unwell'],
                    ['保険証', 'insurance card'],
                    ['薬局 やっきょく', 'pharmacy']
                ]
            },
            examples: [
                { jp: 'お腹が痛いです', en: 'My stomach hurts',
                  note: 'が痛いです takes any body part. One pattern, whole vocabulary.' }
            ],
            check: {
                q: 'How do you say any part of you hurts?',
                a: 'The body part plus が痛いです. It is one frame that works for all of them, which ' +
                   'makes the vocabulary the only thing to learn.'
            }
        }
    ],
    steps: [
        { text: 'Look up ください and see how many requests it covers.',
          href: 'dictionary.html#q=ください', label: 'Look up ください' },
        { text: 'Break down a shop phrase into its grammar.',
          href: 'dictionary.html#s=これをください', label: 'Break down これをください' },
        { text: 'Read the situations page for the polite register these exchanges expect.',
          href: 'keigo.html#situations', label: 'Keigo situations' },
        { text: 'Practise hearing them at speed.',
          href: 'practice.html#listening=n5', label: 'N5 listening' }
    ]
},
{
    id: 'casual',
    title: 'How people actually talk',
    aim: 'Plain form, contractions, and the particles at the end.',
    body: 'Textbook Japanese and spoken Japanese differ in predictable ways. Knowing the shortcuts is ' +
        'the difference between following a conversation and following a recording.',
    lessons: [
        {
            title: 'Conversation in plain form',
            body: [
                "Between friends the ます and です forms disappear. What is left is the plain form you " +
                "already know from modifying clauses, used as a whole sentence — which is why learning " +
                "plain form early pays twice.",
                "Questions drop か and rise in pitch instead: 食べる? means are you eating. だ is " +
                "usually left off entirely after a noun in casual speech, especially by women — " +
                "学生? rather than 学生だ?. And the negative ない replaces ません throughout.",
                "The register shift is real and quick. Someone moving from ます forms to plain form " +
                "mid-conversation is signalling that the distance has closed, and following them is " +
                "the polite response."
            ],
            table: {
                head: ['Polite', 'Casual'],
                rows: [
                    ['食べますか', '食べる?'],
                    ['食べません', '食べない'],
                    ['食べました', '食べた'],
                    ['学生です', '学生だ / 学生'],
                    ['行きましょう', '行こう'],
                    ['すみません', 'ごめん'],
                    ['ありがとうございます', 'ありがとう']
                ]
            },
            examples: [
                { jp: 'ご飯食べた?', en: 'Have you eaten?',
                  note: 'Plain past, no か, and the を dropped as well.' }
            ],
            check: {
                q: 'How is a casual question marked if か is dropped?',
                a: 'By pitch — the voice rises at the end, exactly as in English. In writing, a question ' +
                   'mark does the same job.'
            }
        },
        {
            title: 'The contractions you will hear',
            body: [
                "Spoken Japanese compresses common endings, and the compressed forms are so frequent " +
                "that hearing the full version can be the unusual event. All of them are predictable " +
                "once you know the pattern.",
                "ている loses its い and becomes てる. ておく becomes とく. てしまう becomes ちゃう, and " +
                "でしまう becomes じゃう. なければならない, that long must, collapses to なきゃ or " +
                "なくちゃ and usually stops there — the ならない is simply left off.",
                "The Sentence tab handles most of these, because they are built into its deinflection " +
                "rules. 食べてる resolves to 食べる and 食べちゃった resolves to 食べる with the endings " +
                "named."
            ],
            table: {
                head: ['Full', 'Contracted', 'Example'],
                rows: [
                    ['〜ている', '〜てる', '食べてる'],
                    ['〜ておく', '〜とく', '買っとく'],
                    ['〜てしまう', '〜ちゃう', '食べちゃう'],
                    ['〜でしまう', '〜じゃう', '飲んじゃう'],
                    ['〜なければ', '〜なきゃ', '行かなきゃ'],
                    ['〜なくては', '〜なくちゃ', '行かなくちゃ'],
                    ['〜では', '〜じゃ', 'じゃない'],
                    ['〜という', '〜って', '田中って人']
                ]
            },
            examples: [
                { jp: '食べちゃった', en: 'I ended up eating it',
                  note: 'てしまった contracted. The breakdown still resolves it to 食べる.' }
            ],
            check: {
                q: 'You hear 行かなきゃ and the sentence stops there. Is it finished?',
                a: 'Yes, in speech. なければならない is routinely cut after the なきゃ — the obligation ' +
                   'is understood without the rest.'
            }
        },
        {
            title: 'The particles at the end of the sentence',
            body: [
                "Japanese sentences often end with a small particle that adds no information and a " +
                "great deal of tone. Leaving them all out is grammatical and sounds oddly flat; using " +
                "the wrong one sounds worse.",
                "ね seeks agreement — いい天気ですね expects a yes. よ informs, telling the listener " +
                "something they did not know, and it can sound pushy if the information was obvious. " +
                "よね combines them: I think this, right? かな wonders aloud, and の asks or explains " +
                "with a softer, more personal tone.",
                "A few are marked by gender in standard Japanese — ぞ and ぜ read as masculine, わ and " +
                "the bare の as feminine — though this is much softer in practice than textbooks " +
                "suggest, and varies by region and age."
            ],
            table: {
                head: ['Particle', 'Adds'],
                rows: [
                    ['ね', 'seeking agreement — right?'],
                    ['よ', 'informing — you did not know this'],
                    ['よね', 'I think so, do you agree?'],
                    ['な', 'to oneself, or casual ね'],
                    ['かな', 'I wonder'],
                    ['の', 'explanation or a gentle question'],
                    ['でしょう', 'probably, or seeking agreement politely']
                ]
            },
            examples: [
                { jp: 'いい天気ですね', en: 'Nice weather, isn\u2019t it',
                  note: 'ね invites agreement — the whole point of saying it.' }
            ],
            check: {
                q: 'Why can よ sound rude?',
                a: 'Because it presents information as new to the listener. Used on something obvious, ' +
                   'it implies they had not noticed.'
            }
        },
        {
            title: 'The particles that go missing',
            body: [
                "Casual speech drops particles that context can supply. を goes first and most often, " +
                "は not far behind, and に survives longer because it usually carries information " +
                "nothing else does.",
                "ご飯食べた? has lost its を. 明日どこ行く? has lost both は and に. Nothing is ambiguous, " +
                "because the word order and the situation between them do the work the particles were " +
                "doing.",
                "This is worth knowing mainly as a listener. Producing dropped particles is easy; " +
                "recognising a sentence whose particles are missing is what makes casual speech hard " +
                "to parse when you have only ever read the full forms. It is also where the Sentence " +
                "tab has the most trouble, for the same reason."
            ],
            examples: [
                { jp: '明日どこ行く', en: 'Where are you going tomorrow?',
                  note: 'Full form would be 明日はどこに行きますか. Three pieces gone, nothing lost.' }
            ],
            check: {
                q: 'Which particle is dropped most readily in speech?',
                a: 'を. The object is usually obvious from the verb and the word order, so it carries ' +
                   'the least information of any particle.'
            }
        }
    ],
    steps: [
        { text: 'Break down a contracted form and watch it resolve to the dictionary verb.',
          href: 'dictionary.html#s=食べちゃった', label: 'Break down 食べちゃった' },
        { text: 'Break down a casual progressive.',
          href: 'dictionary.html#s=本を読んでる', label: 'Break down 読んでる' },
        { text: 'Look up ね and see how much a one-character particle carries.',
          href: 'dictionary.html#q=ね', label: 'Look up ね' },
        { text: 'Hear the contractions at conversational speed.',
          href: 'practice.html#listening=n4', label: 'N4 listening' }
    ]
},
{
    id: 'conversation',
    title: 'Keeping a conversation going',
    aim: 'Fillers, repairs, and how to hold your turn.',
    body: 'Understanding a language and taking part in it are different skills. This is the second one, ' +
        'and it needs about twenty words.',
    lessons: [
        {
            title: 'Buying time out loud',
            body: [
                "Silence while you think reads as a stalled conversation, so Japanese has a full set of " +
                "noises for filling it. Using them is not sloppy — it signals that you are still " +
                "composing rather than finished.",
                "えーと and あのー are the workhorses, roughly um and er. なんか is like, used far more " +
                "than any teacher will admit. まあ softens whatever follows. And そうですね, which " +
                "literally agrees, functions as a whole sentence of thinking time before you answer a " +
                "question.",
                "For a learner these are more valuable than they look. A pause filled in Japanese keeps " +
                "you inside the conversation; a pause filled in English, or with nothing, hands the " +
                "turn back before you are ready."
            ],
            table: {
                head: ['Word', 'Roughly'],
                rows: [
                    ['えーと', 'um, let me think'],
                    ['あのー', 'er — also opening an approach'],
                    ['そのー', 'that, er…'],
                    ['なんか', 'like, sort of'],
                    ['まあ', 'well, sort of'],
                    ['そうですね', 'let me see — buys a whole beat'],
                    ['ちょっと', 'a little — also a stall before a refusal']
                ]
            },
            check: {
                q: 'Why fill a pause in Japanese rather than just pausing?',
                a: 'Because an unfilled pause hands the turn back. A filler says you are still speaking, ' +
                   'which buys you the time to finish the sentence.'
            }
        },
        {
            title: 'Repairing what you did not catch',
            body: [
                "You will lose the thread constantly, and asking well is a skill worth more than the " +
                "vocabulary you missed. The key is to ask about a specific thing rather than the whole " +
                "sentence, because a general もう一度 just gets you the same speed again.",
                "〜って何ですか asks what a particular word means. どういう意味ですか asks what a phrase " +
                "means. ゆっくりお願いします asks for speed rather than repetition and is usually the " +
                "more useful request.",
                "For producing rather than understanding, 〜は日本語で何と言いますか — how do you say ~ " +
                "in Japanese — turns your conversation partner into a dictionary, and asking it is " +
                "flattering rather than awkward."
            ],
            table: {
                head: ['Japanese', 'Asks for'],
                rows: [
                    ['もう一度お願いします', 'repeat that'],
                    ['ゆっくりお願いします', 'more slowly'],
                    ['〜って何ですか', 'what does that word mean'],
                    ['どういう意味ですか', 'what does that mean'],
                    ['〜は日本語で何と言いますか', 'how do you say ~ in Japanese'],
                    ['書いてもらえますか', 'could you write it down'],
                    ['すみません、聞き取れませんでした', 'I could not catch that']
                ]
            },
            examples: [
                { jp: '日本語で何と言いますか', en: 'How do you say it in Japanese?',
                  note: 'と here is the quoting particle — literally, what is it said as.' }
            ],
            check: {
                q: 'You did not catch one word. Which is better — もう一度 or 〜って何ですか?',
                a: 'The specific one. もう一度 gets the same sentence at the same speed; naming the word ' +
                   'you missed gets you the answer.'
            }
        },
        {
            title: 'Turning, changing and closing',
            body: [
                "Japanese conversation has signposts for its joins, and using them makes you sound " +
                "organised rather than fluent — which is the better goal early.",
                "ところで changes the subject cleanly: by the way. そういえば introduces something the " +
                "conversation reminded you of: come to think of it. じゃあ marks a decision or a move " +
                "onward — じゃあ、行きましょう.",
                "Closing has its own etiquette. そろそろ, meaning it is about that time, is the standard " +
                "warning shot before leaving, and it is understood as such. Then 失礼します to go, or " +
                "また今度 for see you next time. Leaving without the warning reads as abrupt."
            ],
            table: {
                head: ['Japanese', 'Does'],
                rows: [
                    ['ところで', 'changes the subject'],
                    ['そういえば', 'come to think of it'],
                    ['じゃあ', 'well then — moving on'],
                    ['そろそろ', 'it is about that time — a warning you are leaving'],
                    ['また今度', 'another time'],
                    ['失礼します', 'formal goodbye'],
                    ['お先に失礼します', 'leaving before others']
                ]
            },
            examples: [
                { jp: 'そろそろ失礼します', en: 'I should be going',
                  note: 'そろそろ is the signal; 失礼します is the departure.' }
            ],
            check: {
                q: 'Why say そろそろ before leaving rather than just leaving?',
                a: 'Because it warns that you are about to go, which gives the other person a chance to ' +
                   'close properly. Standing up without it is abrupt.'
            }
        }
    ],
    steps: [
        { text: 'Break down a repair question.',
          href: 'dictionary.html#s=日本語で何と言いますか', label: 'Break down a repair' },
        { text: 'Look up そろそろ and see how much a mimetic word does.',
          href: 'dictionary.html#q=そろそろ', label: 'Look up そろそろ' },
        { text: 'Hear the fillers at conversational speed.',
          href: 'practice.html#listening=n4', label: 'N4 listening' }
    ]
},
{
    id: 'onomatopoeia',
    title: 'Words that sound like what they mean',
    aim: 'The mimetic vocabulary that carries a surprising amount of ordinary speech.',
    body: 'Japanese has thousands of these and uses them constantly, in conversation, in news, and in ' +
        'the doctor\u2019s surgery. They are not childish, and skipping them leaves a real gap.',
    lessons: [
        {
            title: 'Two families, both everywhere',
            body: [
                "English has onomatopoeia for sounds — bang, splash — and almost nothing for states. " +
                "Japanese has both, in enormous quantity, and the second kind is the one that surprises " +
                "people.",
                "擬音語 are sound words: ワンワン for a dog, ザーザー for heavy rain. 擬態語 describe " +
                "manner or condition with no sound involved at all: きらきら for sparkling, どきどき for " +
                "a pounding heart, ぺらぺら for speaking fluently. Nothing about a fluent speaker makes " +
                "a pera noise, and the word is still standard adult vocabulary.",
                "Most are doubled, which is why they are easy to spot. They attach to する to become " +
                "verbs, take と to become adverbs, and some work bare in front of a verb."
            ],
            table: {
                head: ['Word', 'Kind', 'Means'],
                rows: [
                    ['ワンワン', 'sound', 'a dog barking'],
                    ['ニャーニャー', 'sound', 'a cat'],
                    ['ザーザー', 'sound', 'heavy rain'],
                    ['ドキドキ', 'state', 'heart pounding'],
                    ['キラキラ', 'state', 'sparkling'],
                    ['ペラペラ', 'state', 'fluent in a language'],
                    ['ゆっくり', 'state', 'slowly'],
                    ['しっかり', 'state', 'firmly, properly']
                ]
            },
            examples: [
                { jp: '日本語がペラペラです', en: 'Speaks Japanese fluently',
                  note: 'Ordinary adult speech, and there is no sound involved.' }
            ],
            check: {
                q: 'Why is ぺらぺら not childish?',
                a: 'Because 擬態語 are standard vocabulary, not baby talk. There is often no other word ' +
                   'for the thing — fluent is exactly ぺらぺら.'
            }
        },
        {
            title: 'The ones worth knowing first',
            body: [
                "A few dozen carry most of the everyday load. These come up in conversation constantly " +
                "and several of them you have probably already met without realising what they were — " +
                "ゆっくり and しっかり are both mimetic words.",
                "Two are worth special attention. びっくりする is the ordinary way to say be surprised, " +
                "with no plainer alternative in common use. And the medical ones matter: a doctor will " +
                "ask how the pain feels, and the answer is expected to be one of these."
            ],
            table: {
                head: ['Word', 'Used for'],
                rows: [
                    ['びっくりする', 'to be startled'],
                    ['のんびり', 'relaxed, taking it easy'],
                    ['ぐっすり', 'sleeping soundly'],
                    ['はっきり', 'clearly'],
                    ['ぼんやり', 'vaguely, absent-mindedly'],
                    ['にこにこ', 'smiling'],
                    ['ぺこぺこ', 'very hungry — お腹がぺこぺこ'],
                    ['ずきずき', 'a throbbing pain'],
                    ['ぴりぴり', 'a stinging pain, or tension'],
                    ['むかむか', 'feeling sick']
                ]
            },
            examples: [
                { jp: 'お腹がぺこぺこです', en: 'I am starving',
                  note: 'The standard way to say it. 空腹 exists and sounds like a medical form.' }
            ],
            check: {
                q: 'A doctor asks how your headache feels. What kind of word do they expect?',
                a: 'A mimetic one — ずきずき for throbbing, きりきり for sharp. The vocabulary of ' +
                   'symptoms is largely 擬態語.'
            }
        },
        {
            title: 'How they fit into a sentence',
            body: [
                "Three patterns cover almost all uses. With する they become verbs: どきどきする, to have " +
                "one's heart pound. With と they become adverbs: はっきりと言う, to say clearly — though " +
                "the と is often dropped. And a few work as な-adjectives or with だ.",
                "Which pattern a given word takes is fixed and has to be learned with the word, but the " +
                "options are few enough that guessing usually works. If it describes an action, try と " +
                "or bare; if it describes a condition someone is in, try する.",
                "In writing they appear in katakana as often as hiragana. Katakana makes them louder and " +
                "more vivid, which is why manga uses it almost exclusively."
            ],
            table: {
                head: ['Pattern', 'Example', 'Means'],
                rows: [
                    ['〜する', 'びっくりした', 'was startled'],
                    ['〜と + verb', 'はっきりと言う', 'say clearly'],
                    ['bare + verb', 'ゆっくり歩く', 'walk slowly'],
                    ['〜だ / 〜です', 'お腹がぺこぺこです', 'I am starving']
                ]
            },
            check: {
                q: 'Why do manga write these in katakana?',
                a: 'Because katakana reads louder and more vivid, like italics or bold. The word is the ' +
                   'same either way; the script sets the volume.'
            }
        }
    ],
    steps: [
        { text: 'Look up a mimetic word and see it treated as ordinary vocabulary.',
          href: 'dictionary.html#q=ゆっくり', label: 'Look up ゆっくり' },
        { text: 'Break down a sentence built on one.',
          href: 'dictionary.html#s=お腹がぺこぺこです', label: 'Break down ぺこぺこ' },
        { text: 'Drill the vocabulary they turn up in.',
          href: 'practice.html#vocabulary=n4', label: 'N4 vocabulary' }
    ]
},
{
    id: 'idioms',
    title: 'Idioms you will meet daily',
    aim: 'The 気 family, and the body doing figurative work.',
    body: 'A few hundred fixed expressions carry an outsized share of ordinary Japanese, and most are ' +
        'built from words you already know.',
    lessons: [
        {
            title: 'The 気 family',
            body: [
                "気 means spirit, mind, or the feel of a thing, and it anchors more everyday " +
                "expressions than any other character. Learning the set together is far more efficient " +
                "than meeting them one at a time, because they differ in small and consistent ways.",
                "The pair that catches everyone is 気になる against 気にする. 気になる is involuntary — " +
                "something bothers you or catches your interest without your choosing. 気にする is " +
                "voluntary — you mind it, you dwell on it. Which is why the standard reassurance is " +
                "気にしないで, do not let it bother you, and not 気にならないで, which would be asking " +
                "someone not to have a reaction.",
                "The rest divide neatly: things you do with 気 take を, and things that happen to it " +
                "take が."
            ],
            table: {
                head: ['Expression', 'Means', 'Voluntary?'],
                rows: [
                    ['気にする', 'to mind, to dwell on', 'yes'],
                    ['気になる', 'to be bothered by, to be curious', 'no'],
                    ['気をつける', 'to be careful', 'yes'],
                    ['気がつく', 'to notice', 'no'],
                    ['気がする', 'to have a feeling that', 'no'],
                    ['気が合う', 'to get on well', 'no'],
                    ['気を使う', 'to be considerate, to fuss over', 'yes'],
                    ['気が短い', 'short-tempered', '—'],
                    ['空気を読む', 'to read the room', 'yes']
                ]
            },
            examples: [
                { jp: '気にしないでください', en: 'Please do not worry about it',
                  note: 'にする, because you are asking them to stop doing something.' }
            ],
            check: {
                q: 'Why is it 気にしないで and not 気にならないで?',
                a: 'Because になる is involuntary — you cannot ask someone not to have a reaction. にする ' +
                   'is the one they control, so that is the one you ask them to stop.'
            }
        },
        {
            title: 'The body, used figuratively',
            body: [
                "Body parts do a great deal of idiomatic work, and several of the expressions are close " +
                "enough to English to guess — 手を貸す is to lend a hand — while others are not at all.",
                "頭が痛い is the good example of both. Literally it is a headache; figuratively it means " +
                "a problem is troubling you, exactly as in English. 顔が広い, a wide face, means " +
                "well-connected, which English does not do at all. And 耳が痛い, my ears hurt, means " +
                "the criticism is uncomfortably accurate.",
                "These are ordinary adult speech rather than literary flourishes. 腹が立つ is simply how " +
                "you say you are angry, and there is no plainer alternative in common use."
            ],
            table: {
                head: ['Expression', 'Literally', 'Means'],
                rows: [
                    ['頭が痛い', 'my head hurts', 'a headache, or a troubling problem'],
                    ['顔が広い', 'a wide face', 'well connected'],
                    ['口が軽い', 'a light mouth', 'cannot keep a secret'],
                    ['耳が痛い', 'my ears hurt', 'the criticism hits home'],
                    ['手を貸す', 'lend a hand', 'to help'],
                    ['足を運ぶ', 'carry your feet', 'to go there in person'],
                    ['目がない', 'no eyes', 'crazy about something'],
                    ['腹が立つ', 'the belly stands', 'to get angry'],
                    ['首になる', 'become a neck', 'to be fired']
                ]
            },
            examples: [
                { jp: '腹が立ちます', en: 'It makes me angry',
                  note: 'The ordinary way to say it. There is no plainer alternative.' }
            ],
            check: {
                q: 'Your boss points out a mistake and you say 耳が痛いです. What do you mean?',
                a: 'That the criticism is fair and uncomfortable. It is an admission, not a complaint ' +
                   'about your ears.'
            }
        },
        {
            title: 'Verbs that come pre-attached',
            body: [
                "Many Japanese nouns take a fixed verb, and choosing the wrong one is a mistake even " +
                "when the meaning is clear. English does this too — you take a photograph rather than " +
                "making one — but Japanese does it far more.",
                "写真を撮る, take a photograph. 風邪をひく, catch a cold — literally to pull one. " +
                "電話をかける, make a phone call, literally to hang it. 傘をさす, put up an umbrella. " +
                "None of these verbs is guessable from the noun and all of them are fixed.",
                "The practical approach is to learn the pair rather than the noun. A dictionary entry " +
                "will often show the collocation, and the Sentence tab will show you which verb a real " +
                "sentence used, which is the more reliable teacher."
            ],
            table: {
                head: ['Japanese', 'Literally', 'Means'],
                rows: [
                    ['写真を撮る', 'take a photograph', 'take a photo'],
                    ['風邪をひく', 'pull a cold', 'catch a cold'],
                    ['電話をかける', 'hang a telephone', 'make a call'],
                    ['傘をさす', 'point an umbrella', 'put up an umbrella'],
                    ['薬を飲む', 'drink medicine', 'take medicine'],
                    ['シャワーを浴びる', 'bathe in a shower', 'have a shower'],
                    ['嘘をつく', 'attach a lie', 'to lie'],
                    ['メモを取る', 'take a note', 'make a note']
                ]
            },
            check: {
                q: 'How do you say take medicine in Japanese?',
                a: '薬を飲む — to drink it. 取る would be wrong, and the pairing has to be learned with ' +
                   'the noun rather than derived.'
            }
        },
        {
            title: 'Four-character compounds',
            body: [
                "四字熟語 are fixed four-kanji phrases, usually from Chinese, that pack a whole idea into " +
                "four characters. They appear in speeches, headlines, essays and ordinary conversation, " +
                "and knowing a handful makes formal Japanese noticeably more readable.",
                "Several are transparent once you have the characters. 一石二鳥 is one stone two birds. " +
                "十人十色 is ten people ten colours — to each their own. 自業自得 is your own deed, your " +
                "own gain — you brought it on yourself.",
                "One is worth knowing for its own sake: 一期一会, one time one meeting, from tea " +
                "ceremony. It means treating an encounter as unrepeatable, and it is the sort of thing " +
                "that turns up on a wall scroll and in a farewell speech."
            ],
            table: {
                head: ['Compound', 'Literally', 'Means'],
                rows: [
                    ['一石二鳥', 'one stone, two birds', 'killing two birds with one stone'],
                    ['十人十色', 'ten people, ten colours', 'to each their own'],
                    ['自業自得', 'own deed, own gain', 'you brought it on yourself'],
                    ['一期一会', 'one time, one meeting', 'treasure the encounter'],
                    ['以心伝心', 'heart to heart', 'unspoken understanding'],
                    ['三日坊主', 'three-day monk', 'someone who gives up quickly'],
                    ['温故知新', 'warm the old, know the new', 'learning from the past']
                ]
            },
            examples: [
                { jp: '三日坊主', en: 'someone who gives up quickly',
                  note: 'Four characters you may know, one idea English needs a clause for.' }
            ],
            check: {
                q: 'You start something and quit after a few days. What are you?',
                a: '三日坊主 — a three-day monk. It is self-deprecating and very commonly used about ' +
                   'abandoned New Year resolutions.'
            }
        }
    ],
    steps: [
        { text: 'Look up 気 and see how many expressions it anchors.',
          href: 'dictionary.html#q=気', label: 'Look up 気' },
        { text: 'Break down a 気 expression.',
          href: 'dictionary.html#s=気にしないでください', label: 'Break down 気にしない' },
        { text: 'Drill vocabulary at the next level.',
          href: 'practice.html#vocabulary=n3', label: 'N3 vocabulary' }
    ]
},
{
    id: 'proverbs',
    title: 'Proverbs and what they reveal',
    aim: 'The sayings everyone knows, and why they are worth knowing.',
    body: 'Proverbs are shortcuts to shared assumptions. A dozen of them will let you follow a great ' +
        'deal of speech and writing that assumes you already have them.',
    lessons: [
        {
            title: 'The ones everyone knows',
            body: [
                "ことわざ are quoted the way English quotes early bird catches the worm — half of one, " +
                "with the rest assumed. Saying 猿も木から and stopping is perfectly clear to a Japanese " +
                "listener, and completely opaque if you do not have the whole.",
                "Several are recognisably universal: 猿も木から落ちる, even monkeys fall from trees, is " +
                "everyone makes mistakes. 石の上にも三年, three years on a rock, is perseverance. " +
                "七転び八起き, fall seven times get up eight, is resilience.",
                "One is worth pausing on. 出る杭は打たれる — the stake that sticks out gets hammered — is " +
                "quoted both as a warning and as a criticism of the attitude it describes, and which of " +
                "those is meant depends entirely on tone."
            ],
            table: {
                head: ['Proverb', 'Literally', 'Means'],
                rows: [
                    ['猿も木から落ちる', 'even monkeys fall from trees', 'anyone can make a mistake'],
                    ['石の上にも三年', 'three years on a rock', 'persistence pays'],
                    ['七転び八起き', 'fall seven, rise eight', 'resilience'],
                    ['出る杭は打たれる', 'the stake that sticks out is hammered', 'standing out invites trouble'],
                    ['花より団子', 'dumplings over flowers', 'substance over show'],
                    ['塵も積もれば山となる', 'dust piles into a mountain', 'small things add up'],
                    ['井の中の蛙', 'a frog in a well', 'a narrow view of the world']
                ]
            },
            check: {
                q: 'Someone says 猿も木から and trails off. What have they said?',
                a: 'That anyone can make a mistake — including whoever just made one. The second half is ' +
                   'assumed, exactly as English drops the end of a familiar saying.'
            }
        },
        {
            title: 'What they say about the culture',
            body: [
                "Proverbs are not neutral. Read as a set, the common Japanese ones lean noticeably " +
                "towards patience, group harmony and the quiet accumulation of effort, and away from " +
                "individual assertion — which is a fair reflection of what the language does " +
                "grammatically as well.",
                "That is worth taking as observation rather than conclusion. Every culture has proverbs " +
                "pointing both ways, and a set of sayings is evidence about what people found worth " +
                "repeating rather than about how anyone actually behaves.",
                "Still, the overlap with the culture stage is real. 出る杭は打たれる and the habit of " +
                "leaving refusals unfinished are the same instinct in two forms, and noticing that " +
                "connection makes both easier to remember."
            ],
            check: {
                q: 'Do proverbs tell you how a culture actually behaves?',
                a: 'No — they tell you what was worth repeating. Every culture has sayings pointing ' +
                   'both ways, and the set is evidence about values, not behaviour.'
            }
        },
        {
            title: 'Using them without sounding odd',
            body: [
                "The safest way to use a proverb as a learner is to recognise it, not to deploy it. " +
                "Dropping ことわざ into your own speech is the linguistic equivalent of using thee — it " +
                "can land beautifully and it more often lands strangely.",
                "The exception is when someone else raises one. Completing it, or nodding at it, shows " +
                "you followed, and that is worth more than producing one unprompted.",
                "The same goes for 四字熟語 and for the more literary idioms. Recognition is the skill " +
                "with real return; production is a flourish, and flourishes need a level of control " +
                "that comes later."
            ],
            check: {
                q: 'Should you use proverbs in your own Japanese?',
                a: 'Mostly not yet. Recognising them is the skill that pays; producing them unprompted ' +
                   'usually lands oddly until your control is much higher.'
            }
        }
    ],
    steps: [
        { text: 'Look up a proverb word and see how ordinary its parts are.',
          href: 'dictionary.html#q=猿', label: 'Look up 猿' },
        { text: 'Break down a proverb into its grammar.',
          href: 'dictionary.html#s=猿も木から落ちる', label: 'Break down a proverb' },
        { text: 'Read passages where they turn up.',
          href: 'practice.html#reading=n3', label: 'N3 reading' }
    ]
},
{
    id: 'smalltalk',
    title: 'Weather, seasons and small talk',
    aim: 'The conversation that happens before the conversation.',
    body: 'Japanese small talk has a fixed opening and a predictable shape, which makes it one of the ' +
        'easiest things to join in with early.',
    lessons: [
        {
            title: 'The weather opens everything',
            body: [
                "Remarking on the weather is not filler in Japanese — it is the standard opening of a " +
                "conversation, a letter and an email, and skipping it can read as brusque. The formula " +
                "is one adjective plus ですね, and the ね is doing the real work: it invites agreement, " +
                "which is the actual purpose.",
                "The expected reply is agreement, even token agreement. そうですね is a complete and " +
                "correct answer to almost any of these, and it buys you time. Disagreeing about the " +
                "weather is possible but is not what the exchange is for.",
                "Seasons carry more weight than in English, and referring to them is normal in ordinary " +
                "conversation — the arrival of cherry blossom, the rainy season, the first cold day are " +
                "all standard things to remark on."
            ],
            table: {
                head: ['Japanese', 'Means'],
                rows: [
                    ['いい天気ですね', 'nice weather, isn\u2019t it'],
                    ['暑いですね', 'hot, isn\u2019t it'],
                    ['寒いですね', 'cold, isn\u2019t it'],
                    ['涼しくなりましたね', 'it has got cooler'],
                    ['雨が降りそうですね', 'looks like rain'],
                    ['そうですね', 'yes, indeed — the standard reply'],
                    ['本当ですね', 'it really is']
                ]
            },
            examples: [
                { jp: '暑いですね', en: 'Hot, isn\u2019t it',
                  note: 'Adjective plus ですね. The ね is what makes it an opening rather than a statement.' }
            ],
            check: {
                q: 'What is the expected reply to 暑いですね?',
                a: 'そうですね, or any agreement. The remark is an invitation to agree, not a claim ' +
                   'about temperature.'
            }
        },
        {
            title: 'The four seasons, and the fifth',
            body: [
                "春 夏 秋 冬 — spring, summer, autumn, winter — are among the first kanji worth knowing " +
                "because they turn up in conversation constantly. Japan also has a fifth season with a " +
                "name of its own: 梅雨, the rainy season, running roughly through June.",
                "Each season has its own set of things people mention, and knowing two or three gives " +
                "you somewhere to take the conversation after the weather remark. 花見 in spring, " +
                "花火 in summer, 紅葉 in autumn, 雪 in winter.",
                "The kanji themselves reward a look. 梅雨 is plum rain, named for when the plums ripen. " +
                "紅葉 is crimson leaves and reads こうよう as a noun and もみじ as the maple itself."
            ],
            table: {
                head: ['Japanese', 'Reading', 'Means'],
                rows: [
                    ['春', 'haru', 'spring'],
                    ['夏', 'natsu', 'summer'],
                    ['秋', 'aki', 'autumn'],
                    ['冬', 'fuyu', 'winter'],
                    ['梅雨', 'tsuyu', 'the rainy season'],
                    ['花見', 'hanami', 'cherry blossom viewing'],
                    ['花火', 'hanabi', 'fireworks'],
                    ['紅葉', 'kouyou / momiji', 'autumn leaves']
                ]
            },
            check: {
                q: 'What is 梅雨 and why is it called that?',
                a: 'The rainy season, around June. The name means plum rain — it arrives when the plums ' +
                   'ripen.'
            }
        },
        {
            title: 'Keeping it going',
            body: [
                "Japanese conversation expects the listener to be audibly present. Short interjections " +
                "— あいづち — are dropped in constantly, and their absence reads as inattention rather " +
                "than politeness. はい, ええ, そうですか, なるほど.",
                "This is worth practising deliberately, because English speakers listen silently and " +
                "then respond, which in a Japanese conversation looks like a line gone dead. You are " +
                "not interrupting; you are confirming you are still there.",
                "After the weather, the usual moves are the same everywhere: where are you from, how " +
                "long have you been here, is the food all right. Having an answer ready for each turns " +
                "the first three minutes of any conversation into something you can do."
            ],
            table: {
                head: ['Japanese', 'Means'],
                rows: [
                    ['はい / ええ', 'yes — as backchannel, said often'],
                    ['そうですか', 'is that so'],
                    ['なるほど', 'I see, that makes sense'],
                    ['本当ですか', 'really?'],
                    ['どちらから来ましたか', 'where are you from?'],
                    ['日本は長いですか', 'have you been in Japan long?'],
                    ['日本の食べ物はどうですか', 'how do you find Japanese food?']
                ]
            },
            check: {
                q: 'Why should you make noises while someone else is speaking?',
                a: 'Because あいづち signal that you are following. Silent listening, which is polite in ' +
                   'English, reads in Japanese as though you have stopped paying attention.'
            }
        }
    ],
    steps: [
        { text: 'Break down the standard weather opener.',
          href: 'dictionary.html#s=いい天気ですね', label: 'Break down 天気ですね' },
        { text: 'Look up 梅雨 and see a season English has no word for.',
          href: 'dictionary.html#q=梅雨', label: 'Look up 梅雨' },
        { text: 'Hear small talk at conversational speed.',
          href: 'practice.html#listening=n5', label: 'N5 listening' }
    ]
},
{
    id: 'culture',
    title: 'What the language assumes',
    aim: 'The habits of mind that show up as grammar.',
    body: 'Several features of Japanese only make sense once you see what they are for. This stage is ' +
        'about the why behind patterns you have already learned.',
    lessons: [
        {
            title: 'Saying no without saying no',
            body: [
                "Direct refusal is avoided, and the avoidance is systematic rather than evasive. " +
                "ちょっと followed by nothing is a complete refusal. 難しいですね means it will not " +
                "happen. 考えておきます — I will think about it — usually means no.",
                "This is not dishonesty. The refusal is delivered and understood; what is avoided is " +
                "forcing the other person to be refused explicitly, which would put them in the wrong " +
                "for having asked. The information transfers and nobody loses face.",
                "The practical consequence for a learner is that a yes may not be one. Listen for " +
                "hesitation, for a drawn-out そうですね, for a sentence that trails off. Those are the " +
                "answer."
            ],
            table: {
                head: ['What is said', 'What it means'],
                rows: [
                    ['ちょっと…', 'no'],
                    ['難しいですね', 'no'],
                    ['考えておきます', 'probably no'],
                    ['検討します', 'no, formally'],
                    ['大丈夫です', 'no thank you — declining an offer'],
                    ['そうですねぇ…', 'buying time before a no']
                ]
            },
            check: {
                q: 'You propose a plan and hear 難しいですね. What has happened?',
                a: 'You have been refused. It is not an invitation to explain how it could be made ' +
                   'easier — the difficulty is the polite form of no.'
            }
        },
        {
            title: 'Apology as social lubricant',
            body: [
                "Japanese apologises far more than English does, and most of it is not an admission of " +
                "fault. すみません covers thank you when someone has gone to trouble for you, and it is " +
                "warmer than ありがとう precisely because it acknowledges the cost to them.",
                "This runs deep enough to shape grammar. The suffering passive exists so you can " +
                "register that something was a nuisance without blaming anyone. The causative-request " +
                "form lets you ask to do something by requesting permission rather than announcing " +
                "intent. Both are ways of not imposing.",
                "For a learner the useful habit is to over-apologise slightly rather than under. " +
                "失礼します entering a room, すみません to get attention, お疲れ様です on leaving — none " +
                "of these cost anything and their absence is noticed."
            ],
            table: {
                head: ['Phrase', 'Not really'],
                rows: [
                    ['すみません', 'sorry — often thank you'],
                    ['失礼します', 'excuse my rudeness — just entering'],
                    ['お疲れ様です', 'you must be tired — just hello'],
                    ['恐れ入ります', 'I am overwhelmed — a soft please'],
                    ['お邪魔します', 'I am intruding — entering a home']
                ]
            },
            check: {
                q: 'Someone holds a lift for you and you say すみません. Are you apologising?',
                a: 'Not really. You are acknowledging that they went to trouble, which is why it reads ' +
                   'as warmer than ありがとう in that situation.'
            }
        },
        {
            title: 'What gets left out, and why',
            body: [
                "Japanese omits anything the situation supplies — subjects, objects, whole clauses. " +
                "This is the feature that makes the language feel impossible early on, and it comes " +
                "from the same place as everything else in this stage: what both parties already know " +
                "does not need saying, and saying it can imply they did not know.",
                "Repeating 私は in every sentence does not just sound like a textbook. It faintly " +
                "insists on yourself, which is why it reads as odd rather than merely redundant.",
                "The skill this demands is holding context. A Japanese conversation carries the topic " +
                "forward silently until something changes it, and a sentence with no subject means the " +
                "subject has not changed. When you lose track, 誰がですか — who is? — is a normal and " +
                "unembarrassing question."
            ],
            examples: [
                { jp: '行きますか', en: 'Are you going?',
                  note: 'No subject at all. Who is going is carried by the situation.' }
            ],
            check: {
                q: 'A Japanese sentence has no subject. What should you assume?',
                a: 'That it has not changed since the last one that had one. Omission signals continuity, ' +
                   'not ambiguity.'
            }
        }
    ],
    steps: [
        { text: 'Read the pitfalls page — the same principles, applied to politeness.',
          href: 'keigo.html#pitfalls', label: 'Keigo pitfalls' },
        { text: 'Break down a subjectless sentence and notice what the parser cannot supply either.',
          href: 'dictionary.html#s=明日行きますか', label: 'Break down a subjectless line' },
        { text: 'Hear indirect refusals in context.',
          href: 'practice.html#listening=n4', label: 'N4 listening' }
    ]
},
{
    id: 'formalgrammar',
    title: 'Grammar for reading',
    aim: 'The patterns that appear in print and almost never in speech.',
    body: 'Written Japanese has its own set of connectives and endings. They are formulaic, which makes ' +
        'them easier than they look — each is one fixed shape with one job.',
    lessons: [
        {
            title: 'The formal connectives',
            body: [
                "News, reports and official writing use a set of phrases where speech would use a " +
                "particle. They all attach to a noun, and each corresponds to something short and " +
                "casual you already know.",
                "として means as, in the capacity of — 学生として, as a student. において means in, at, " +
                "for a formal setting or field. に関して and について both mean regarding, with に関して " +
                "the more formal. によって means by, or depending on, and marks the agent in a written " +
                "passive. に対して means towards, or in contrast with.",
                "Recognising these is most of what makes a newspaper readable at this level, because " +
                "the sentences are long but the joins are drawn from a short list."
            ],
            table: {
                head: ['Formal', 'Means', 'Casual equivalent'],
                rows: [
                    ['〜として', 'as, in the role of', '—'],
                    ['〜において', 'in, at — formal', '〜で'],
                    ['〜に関して', 'regarding', '〜について'],
                    ['〜によって', 'by, depending on', '〜で'],
                    ['〜に対して', 'towards, in contrast with', '—'],
                    ['〜に基づいて', 'based on', '—'],
                    ['〜とともに', 'along with', '〜と一緒に']
                ]
            },
            check: {
                q: 'A sentence uses 〜において where you would expect 〜で. What does that tell you?',
                a: 'That the text is formal — a report, an article or an announcement. It means the same ' +
                   'thing and signals the register.'
            }
        },
        {
            title: 'The わけ family',
            body: [
                "わけ means reason or the case, and four expressions built on it appear constantly in " +
                "explanatory writing and in careful speech. They are worth separating because they look " +
                "similar and mean quite different things.",
                "わけだ says that is why — it presents a conclusion that follows from what was just " +
                "said. わけではない denies an inference: it is not that ~, correcting something the " +
                "listener might have assumed. わけがない says there is no way, a flat impossibility. " +
                "And わけにはいかない says one cannot, for reasons of obligation rather than ability.",
                "The middle one is the most useful. 嫌いなわけではない — it is not that I dislike it — " +
                "heads off a wrong conclusion without asserting the opposite, which is exactly the kind " +
                "of thing Japanese likes to be able to say."
            ],
            table: {
                head: ['Pattern', 'Means'],
                rows: [
                    ['〜わけだ', 'that is why, it follows that'],
                    ['〜わけではない', 'it is not that ~'],
                    ['〜わけがない', 'there is no way that ~'],
                    ['〜わけにはいかない', 'I cannot, for obligation'],
                    ['〜というわけで', 'and so, for that reason']
                ]
            },
            examples: [
                { jp: '嫌いなわけではありません', en: 'It is not that I dislike it',
                  note: 'Denying an inference without asserting its opposite.' }
            ],
            check: {
                q: 'What is the difference between 行けない and 行くわけにはいかない?',
                a: 'Ability versus obligation. 行けない means you cannot manage it; 行くわけにはいかない ' +
                   'means circumstances do not permit it, though you physically could.'
            }
        },
        {
            title: 'Obligation, certainty and impossibility',
            body: [
                "Formal writing has its own ways of saying must, surely and cannot, and they are more " +
                "emphatic than the everyday forms. Each is fixed, so recognising the shape is enough.",
                "べき means should, in the sense of ought — 行くべきです. ざるを得ない means have no " +
                "choice but to, and is markedly formal. に違いない says must be, expressing certainty " +
                "rather than obligation — 本当に違いない, it must be true.",
                "And a pair from customer-facing writing: 〜かねます is a very polite cannot, used in " +
                "refusals — お答えしかねます, we are unable to answer. Its opposite 〜かねない means " +
                "might well, with a bad outcome implied."
            ],
            table: {
                head: ['Pattern', 'Means', 'Register'],
                rows: [
                    ['〜べきだ', 'ought to', 'formal'],
                    ['〜なければならない', 'must', 'neutral'],
                    ['〜ざるを得ない', 'have no choice but', 'very formal'],
                    ['〜に違いない', 'must be, surely', 'formal'],
                    ['〜はずがない', 'cannot possibly be', 'neutral'],
                    ['〜かねます', 'we are unable to', 'business, polite refusal'],
                    ['〜かねない', 'might well — badly', 'formal']
                ]
            },
            examples: [
                { jp: 'お答えしかねます', en: 'We are unable to answer',
                  note: 'Humble お〜する plus かねる — a refusal so polite it barely looks like one.' }
            ],
            check: {
                q: 'A company replies お答えしかねます. Have they answered?',
                a: 'No — they have refused, very politely. かねる is a formal cannot, and it is the ' +
                   'standard way a business declines without saying no.'
            }
        }
    ],
    steps: [
        { text: 'Break down a formal refusal and see the humble pattern inside it.',
          href: 'dictionary.html#s=お答えしかねます', label: 'Break down かねます' },
        { text: 'Look up わけ and read the noun the whole family is built on.',
          href: 'dictionary.html#q=わけ', label: 'Look up わけ' },
        { text: 'Read passages that use these.',
          href: 'practice.html#reading=n3', label: 'N3 reading' }
    ]
},
{
    id: 'advgrammar',
    title: 'The next tier of patterns',
    aim: 'What appears above N3, and how to recognise it.',
    body: 'These are fixed shapes with fixed jobs. Recognising them is most of what separates reading ' +
        'a newspaper from decoding one.',
    lessons: [
        {
            title: 'Contrast and concession',
            body: [
                "Above N3 the language acquires a set of more precise ways to say but, and each carries " +
                "a different weight. They all attach to a plain form and sit at the end of the first " +
                "clause, exactly like the connectors you already know.",
                "ものの is although, with a sense of the expectation not being met. にもかかわらず is " +
                "despite, and is emphatic and formal. どころか is far from — 安いどころか高い, far from " +
                "cheap, it is expensive — and reverses the expectation rather than qualifying it. " +
                "反面 presents the other side: 便利な反面、高い.",
                "からには is now that, carrying obligation: やるからには, now that we are doing it, we " +
                "had better do it properly."
            ],
            table: {
                head: ['Pattern', 'Means'],
                rows: [
                    ['〜ものの', 'although — expectation unmet'],
                    ['〜にもかかわらず', 'despite — formal, emphatic'],
                    ['〜どころか', 'far from ~, on the contrary'],
                    ['〜反面', 'on the other hand'],
                    ['〜からには', 'now that ~, so we must'],
                    ['〜ながらも', 'while being ~, nonetheless'],
                    ['〜とはいえ', 'that said']
                ]
            },
            examples: [
                { jp: '安いどころか高いです', en: 'Far from cheap, it is expensive',
                  note: 'どころか reverses rather than qualifies — the opposite is true.' }
            ],
            check: {
                q: 'What does どころか do that けど does not?',
                a: 'It reverses. けど qualifies a statement; どころか says the opposite of what was ' +
                   'expected is the case.'
            }
        },
        {
            title: 'Cause, means and timing',
            body: [
                "The second group covers relationships between events with more precision than から and " +
                "ので manage. Most attach to nouns rather than clauses, which makes them easy to spot.",
                "を通じて and を通して both mean through, by means of. に伴って means accompanying, for " +
                "changes that move together. をきっかけに means triggered by. 次第 has two jobs: after " +
                "a verb stem it means as soon as — 着き次第, as soon as I arrive — and after a noun it " +
                "means depending on.",
                "あげく is worth flagging because it carries a verdict. It means after all that, and the " +
                "outcome is always bad: 迷ったあげく、買わなかった, after all that dithering, I did not " +
                "buy it. Using it for a happy ending would be wrong."
            ],
            table: {
                head: ['Pattern', 'Means'],
                rows: [
                    ['〜を通じて / を通して', 'through, by means of'],
                    ['〜に伴って', 'accompanying, along with'],
                    ['〜をきっかけに', 'triggered by'],
                    ['〜次第', 'as soon as / depending on'],
                    ['〜あげく', 'after all that — badly'],
                    ['〜上で', 'upon doing, having done'],
                    ['〜に際して', 'on the occasion of — formal']
                ]
            },
            check: {
                q: 'Why can あげく not describe a happy outcome?',
                a: 'Because the verdict is built in. It means after all that trouble, and the result is ' +
                   'always disappointing — that is the point of choosing it.'
            }
        },
        {
            title: 'Limits, extents and inevitability',
            body: [
                "The last group qualifies how far something holds. 限り means as far as, or as long as — " +
                "私の知る限り, as far as I know, is a useful hedge to have ready. ほど measures extent, " +
                "and paired with ば gives the more-the-more you met earlier.",
                "〜ざるを得ない, have no choice but, is very formal and slightly literary. 〜得る and " +
                "〜得ない mark what is possible: ありえない, that cannot be, is common in speech and " +
                "worth knowing on its own.",
                "And 〜ようがない means there is no way to — 説明しようがない, there is no explaining it. " +
                "All of these are fixed, so the work is recognition rather than construction."
            ],
            table: {
                head: ['Pattern', 'Means'],
                rows: [
                    ['〜限り', 'as far as, as long as'],
                    ['〜ほど', 'to the extent that'],
                    ['〜ざるを得ない', 'have no choice but to'],
                    ['ありえない', 'impossible, no way'],
                    ['〜ようがない', 'there is no way to'],
                    ['〜わけがない', 'there is no way that'],
                    ['〜に過ぎない', 'is no more than']
                ]
            },
            examples: [
                { jp: '私の知る限り', en: 'As far as I know',
                  note: 'A modifying clause plus 限り — the pattern from the phrases stage, formalised.' }
            ],
            check: {
                q: 'How would you hedge a claim you are not certain of?',
                a: '私の知る限り — as far as I know. It marks the limit of your evidence without ' +
                   'weakening the claim inside it.'
            }
        }
    ],
    steps: [
        { text: 'Break down a hedged claim.',
          href: 'dictionary.html#s=私の知る限り分かりません', label: 'Break down 限り' },
        { text: 'Look up どころか and read how it reverses.',
          href: 'dictionary.html#q=どころか', label: 'Look up どころか' },
        { text: 'Read at the level these appear.',
          href: 'practice.html#reading=n2', label: 'N2 reading' }
    ]
},
{
    id: 'classical',
    title: 'Old forms still in use',
    aim: 'The classical grammar that survives on signs and in set phrases.',
    body: 'Modern Japanese carries fossils of the older language. You will not write them, but you will ' +
        'read them, and they are opaque until someone points them out.',
    lessons: [
        {
            title: 'ぬ and ず — the older negative',
            body: [
                "Before ない there was ず, and it survives in fixed forms and formal writing. 〜ずに " +
                "means without doing — 食べずに出かけた, went out without eating — and is the written " +
                "equivalent of 〜ないで.",
                "The ぬ form appears in set expressions and in dialect: 知らぬ, unknown; 見ず知らず, " +
                "complete strangers, literally not seeing not knowing. You will meet it in idioms long " +
                "before you meet it anywhere you would use it.",
                "The most famous instance is a pun. 見ざる聞かざる言わざる — see not, hear not, speak not " +
                "— uses the classical ざる negative, and it happens to sound like 猿, monkey, which is " +
                "why the three wise monkeys are monkeys."
            ],
            table: {
                head: ['Classical', 'Modern', 'Means'],
                rows: [
                    ['〜ずに', '〜ないで', 'without doing'],
                    ['〜ず', '〜ない', 'not — written'],
                    ['〜ぬ', '〜ない', 'not — set phrases, dialect'],
                    ['〜ざる', '〜ない', 'not — 見ざる聞かざる'],
                    ['知らぬ', '知らない', 'unknown'],
                    ['見ず知らず', '—', 'total strangers']
                ]
            },
            examples: [
                { jp: '食べずに出かけました', en: 'I went out without eating',
                  note: 'ずに, the written form of ないで. Both are current; the register differs.' }
            ],
            check: {
                q: 'Why are the three wise monkeys monkeys?',
                a: 'Because 〜ざる, the classical negative, sounds like 猿, monkey. 見ざる聞かざる言わざる ' +
                   'is a pun that became a sculpture.'
            }
        },
        {
            title: 'べし, べからず and the language of signs',
            body: [
                "Public notices use older, blunter grammar because it is compact and impersonal. " +
                "〜べからず means must not and appears on prohibition signs, though 禁止 has largely " +
                "replaced it. Its modern descendant 〜べき, ought to, is fully current.",
                "Signs also drop everything droppable. 立入禁止 is entry prohibited, three characters " +
                "doing the work of a sentence. 使用中 is in use, 故障中 out of order, 準備中 preparing. " +
                "The 中 suffix from the word-building stage is doing a lot of this.",
                "Reading signs is worth practising precisely because they are not sentences. The grammar " +
                "you have learned barely applies, and what is needed instead is recognising compact " +
                "noun phrases — which is a different skill and a quick one to acquire."
            ],
            table: {
                head: ['Sign', 'Reading', 'Means'],
                rows: [
                    ['立入禁止', 'tachiiri kinshi', 'no entry'],
                    ['使用中', 'shiyouchuu', 'in use'],
                    ['故障中', 'koshouchuu', 'out of order'],
                    ['関係者以外', 'kankeisha igai', 'staff only — literally, other than those concerned'],
                    ['土足厳禁', 'dosoku genkin', 'no outdoor shoes'],
                    ['〜べからず', '—', 'must not — older signs']
                ]
            },
            check: {
                q: 'Why is sign Japanese hard even when you know the words?',
                a: 'Because signs are not sentences. They are compact noun phrases with the grammar ' +
                   'stripped out, so the patterns you learned barely apply.'
            }
        },
        {
            title: 'Other fossils worth recognising',
            body: [
                "A scattering of older forms turn up in ordinary modern Japanese, usually in fixed " +
                "phrases where nobody thinks of them as old at all.",
                "ませ is a classical polite imperative and survives in いらっしゃいませ and " +
                "ごめんくださいませ. 〜がたい, hard to, is a classical form still used in 信じがたい, " +
                "hard to believe. 〜つつ means while, and 〜つつある means in the process of, both " +
                "formal and current.",
                "Adjectives had a different shape too, ending in き before a noun and し when standing " +
                "alone — 良き, 悪しき — which survives in phrases like 良き友 and in place names. And " +
                "the pronouns 我 and 汝 turn up in translations, mottos and song lyrics rather than " +
                "conversation."
            ],
            table: {
                head: ['Fossil', 'Where you meet it'],
                rows: [
                    ['〜ませ', 'いらっしゃいませ'],
                    ['〜がたい', '信じがたい, 得がたい'],
                    ['〜つつ / つつある', 'formal writing'],
                    ['良き / 悪しき', 'set phrases, mottos'],
                    ['我 われ', 'translations, slogans'],
                    ['〜たり〜たり', 'fully current — the classical たり survived']
                ]
            },
            check: {
                q: 'You already use one classical form constantly. Which?',
                a: '〜たり〜たり, the listing form. It descends from the classical たり and is completely ' +
                   'ordinary modern Japanese.'
            }
        }
    ],
    steps: [
        { text: 'Break down a ずに sentence and see the negative resolve.',
          href: 'dictionary.html#s=食べずに出かけました', label: 'Break down ずに' },
        { text: 'Look up 禁止 — the word most signs are built from.',
          href: 'dictionary.html#q=禁止', label: 'Look up 禁止' },
        { text: 'Read passages at the level these appear.',
          href: 'practice.html#reading=n2', label: 'N2 reading' }
    ]
},
{
    id: 'reading',
    title: 'Read something real',
    aim: 'Put the four together on text you did not choose.',
    body: 'The jump from studying Japanese to reading it happens the first time you work through a ' +
        'passage nobody prepared for you.',
    lessons: [
        {
            title: 'How to read above your level',
            body: [
                "Reading real Japanese before you are ready is the fastest way to get ready, provided " +
                "you read it in the right order. Do not go left to right word by word — that is how you " +
                "end up with a pile of definitions and no sentence.",
                "Find the end first. The verb is there, and it tells you what happened, whether it " +
                "happened, when, and how politely. Then scan back for the particles: they mark the " +
                "boundaries and name the roles, so they cut the line into chunks before you know what " +
                "any chunk means. Then fill in the chunks. Anything still missing is vocabulary, and " +
                "vocabulary is the part you can look up.",
                "Accept that you will not understand everything. Reading with eighty per cent " +
                "comprehension and momentum beats reading with a hundred per cent and none."
            ],
            check: {
                q: 'Where do you start when a sentence is too long to take in?',
                a: 'At the end, with the verb — it carries tense, polarity and politeness. Then work ' +
                   'backwards through the particles, which chunk the line for you.'
            }
        },
        {
            title: 'Getting the most from the Sentence tab',
            body: [
                "Paste a line into the Sentence tab and it does three things: it splits the text into " +
                "words, works each one back to its dictionary form, and lays out a literal reading with " +
                "each particle named by its role. It is a reading aid, not a translation — word order " +
                "stays Japanese and nothing that was left out is supplied.",
                "Two habits make it much more useful. Read the literal line before the word cards, so " +
                "you meet the sentence as a sentence. And treat anything marked as unrecognised as " +
                "information: it is usually a name, or a word outside the common set, and knowing which " +
                "tells you whether to look it up.",
                "It is also worth knowing where it is unreliable. It picks the first sense of a word, so " +
                "a word used in a later sense reads oddly. られる is both potential and passive and it " +
                "labels the ambiguity rather than resolving it. And a handful of spellings are genuinely " +
                "undecidable without more context than a dictionary carries."
            ],
            examples: [
                { jp: '昨日は友達と映画を見に行きました', en: 'Yesterday I went to see a film with a friend',
                  note: 'Five chunks, four particles, one verb at the end doing all the tense.' }
            ],
            check: {
                q: 'The breakdown labels a word potential or passive. What should you do?',
                a: 'Decide from context. られる is both, and if the sentence has someone marked with に ' +
                   'doing the action to the subject, it is passive.'
            }
        },
        {
            title: 'Patterns worth recognising on sight',
            body: [
                "Beyond individual words, a small number of fixed patterns carry a lot of ordinary " +
                "Japanese. They look intimidating strung out in a sentence and are trivial once you can " +
                "spot the shape, because each is a form you already know plus a fixed tail.",
                "Learn to see the seam. 〜ことができる is a plain verb plus a noun plus できる; " +
                "〜たほうがいい is a past form plus a comparison. Nothing new is happening — the pieces " +
                "are ones the earlier stages already covered."
            ],
            table: {
                head: ['Pattern', 'Means', 'Example'],
                rows: [
                    ['〜ことができる', 'can, is able to', '日本語を話すことができます'],
                    ['〜たほうがいい', 'had better, should', '休んだほうがいい'],
                    ['〜なければならない', 'must', '行かなければなりません'],
                    ['〜と思います', 'I think that', '面白いと思います'],
                    ['〜かもしれません', 'might', '雨かもしれません'],
                    ['〜そうです', 'looks like, or I hear that', '難しそうです'],
                    ['〜つもりです', 'intend to', '行くつもりです'],
                    ['〜ながら', 'while doing', '音楽を聞きながら']
                ]
            },
            examples: [
                { jp: '行かなければなりません', en: 'I must go',
                  note: 'A negative conditional plus a negative — literally, if I do not go it will not do.' }
            ],
            check: {
                q: 'Why does 行かなければなりません look so long for the word must?',
                a: 'Because it is a double negative built from parts: if one does not go, it will not do. ' +
                   'Japanese has no single word for must, so it assembles one.'
            }
        },
        {
            title: 'Names, and why they defeat dictionaries',
            body: [
                "The first thing that will stump the Sentence tab is a name. 田中 comes apart into 田 " +
                "and 中 because the common-word dictionary it uses holds words, not names — and names " +
                "are the one part of Japanese where readings are close to unpredictable.",
                "The same characters can be read several ways: 田中 is たなか, but 中田 is なかた or " +
                "なかだ depending on the family. Given names are worse. Japanese people themselves ask, " +
                "and business cards print the reading in small kana above the kanji for exactly this " +
                "reason.",
                "Practically: when a breakdown produces two single characters that make no sense " +
                "together, and the sentence is about a person or a place, suspect a name and move on. " +
                "It is not a failure to understand."
            ],
            examples: [
                { jp: '田中さんは先生です', en: 'Tanaka is a teacher',
                  note: 'The breakdown splits 田中 — the さん beside it is the clue that it is a name.' }
            ],
            check: {
                q: 'The breakdown gives you two kanji that mean nothing together, followed by さん. What is it?',
                a: 'A name. さん after a chunk that will not resolve is the strongest signal there is, ' +
                   'and no dictionary of common words will contain it.'
            }
        },
        {
            title: 'Signs, menus and the words on doors',
            body: [
                "The first Japanese most people need to read is not a sentence — it is a sign. These " +
                "are short, fixed, and repeat everywhere, which makes them the highest-return reading " +
                "you can do.",
                "押す and 引く on doors, 入口 and 出口 for entrance and exit, and お手洗い or トイレ for " +
                "the lavatory. 営業中 means open for business and 準備中 means they are getting ready, " +
                "which is the polite version of closed.",
                "Menus have their own vocabulary. 定食 is a set meal, 大盛り a large portion, おかわり a " +
                "refill, 税込 tax included and 税別 tax not included — a distinction that matters at " +
                "the till. Prices ending in 税別 will be higher than they look.",
                "None of this needs grammar. It is pure recognition, and half an hour of looking at " +
                "signs in photographs pays for itself the first day you are somewhere they matter."
            ],
            table: {
                head: ['Sign', 'Reading', 'Means'],
                rows: [
                    ['押す / 引く', 'osu / hiku', 'push / pull'],
                    ['入口 / 出口', 'iriguchi / deguchi', 'entrance / exit'],
                    ['営業中', 'eigyouchuu', 'open'],
                    ['準備中', 'junbichuu', 'closed, preparing'],
                    ['禁煙', 'kin\u2019en', 'no smoking'],
                    ['お手洗い', 'otearai', 'lavatory'],
                    ['定食', 'teishoku', 'set meal'],
                    ['大盛り', 'oomori', 'large portion'],
                    ['税込 / 税別', 'zeikomi / zeibetsu', 'tax included / excluded']
                ]
            },
            check: {
                q: 'A restaurant door says 準備中. Are they open?',
                a: 'No — they are preparing. It is the polite way of saying not yet, and it is far ' +
                   'more common on doors than 閉店.'
            }
        },
        {
            title: 'Finding something you can actually read',
            body: [
                "The bottleneck at this point is material. Real Japanese written for adults is far " +
                "above N5, and reading only what a textbook gives you runs out quickly.",
                "Look for three properties: furigana over the kanji, short sentences, and a subject you " +
                "already know something about. Familiarity does an enormous amount of work — a news " +
                "story about something you already read in English is comprehensible several levels " +
                "earlier than one that is not.",
                "Graded readers exist precisely for this and are worth their cost. Children's books are " +
                "a mixed blessing: the kanji are easy but the vocabulary can be strange and the grammar " +
                "casual. Manga with furigana is genuinely useful, with the caveat that the speech is " +
                "casual and often stylised — good for reading, less good as a model for what to say.",
                "Whatever you pick, choose something you would read anyway. Interest sustains reading " +
                "at a level where discipline does not."
            ],
            table: {
                head: ['Source', 'Good for', 'Watch out for'],
                rows: [
                    ['graded readers', 'controlled level, real narrative', 'they cost money'],
                    ['news written for learners', 'current, has furigana', 'formal register only'],
                    ['manga with furigana', 'motivating, high volume', 'casual and stylised speech'],
                    ['children\u2019s books', 'easy kanji', 'odd vocabulary, casual grammar'],
                    ['something you already read in English', 'familiarity carries you', 'translation quirks']
                ]
            },
            check: {
                q: 'Why is a news story you already read in English easier than one you have not?',
                a: 'Because you can predict most of it. Familiarity supplies the vocabulary and the ' +
                   'structure, so the Japanese only has to confirm what you already expect.'
            }
        }
    ],
    steps: [
        { text: 'Work through the reading questions — short passages with the questions after.',
          href: 'practice.html#reading=n5', label: 'N5 reading' },
        { text: 'Train your ear on the listening set.',
          href: 'practice.html#listening=n5', label: 'N5 listening' },
        { text: 'Paste anything Japanese you come across and break it down.',
          href: 'dictionary.html', label: 'Sentence tab' }
    ]
},
{
    id: 'mistakes',
    title: 'Mistakes everyone makes',
    aim: 'The errors that survive years of study, gathered in one place.',
    body: 'Some mistakes are so common they are almost a stage of learning. Meeting them early does ' +
        'not prevent them, but it shortens how long they last.',
    lessons: [
        {
            title: 'Words that look like English and are not',
            body: [
                "Japanese has a large stock of words built from English parts that mean something else " +
                "entirely. They are called wasei-eigo, English made in Japan, and guessing from the " +
                "English will mislead you more often than it helps.",
                "Some are shortenings — a マンション is an apartment block, not a mansion. Some shifted " +
                "in meaning: ナイーブ means gullible rather than innocent, and using it as a compliment " +
                "does not land. And a few are inventions with no English source at all, like " +
                "サラリーマン and コンセント.",
                "The rule of thumb: katakana tells you the word was borrowed, not that it kept its " +
                "meaning."
            ],
            table: {
                head: ['Japanese', 'Looks like', 'Actually means'],
                rows: [
                    ['マンション', 'mansion', 'apartment block'],
                    ['アパート', 'apartment', 'a cheaper, smaller building'],
                    ['コンセント', 'consent', 'power socket'],
                    ['サラリーマン', 'salaryman', 'an office worker'],
                    ['ナイーブ', 'naive', 'gullible, oversensitive'],
                    ['スマート', 'smart', 'slim'],
                    ['クレーム', 'claim', 'a complaint'],
                    ['バイキング', 'viking', 'a buffet']
                ]
            },
            check: {
                q: 'A Japanese colleague describes someone as スマート. What are they saying?',
                a: 'That the person is slim. It is not about intelligence, and taking it that way has ' +
                   'produced a lot of confused conversations.'
            }
        },
        {
            title: 'The eight errors that keep coming back',
            body: [
                "These are the ones that persist. Most come from mapping an English structure onto " +
                "Japanese where the two do not line up, and the fix is usually to remember which side " +
                "the Japanese takes.",
                "None of them will stop you being understood. They will, however, keep marking you out " +
                "as a learner for as long as they last, which is reason enough to know the list."
            ],
            table: {
                head: ['Mistake', 'Correct', 'Why'],
                rows: [
                    ['寿司を好きです', '寿司が好きです', '好き is an adjective, not a verb'],
                    ['高いでした', '高かったです', 'い-adjectives carry their own past'],
                    ['私は every sentence', 'drop it', 'the topic persists until it changes'],
                    ['友達がいます for a book', '本があります', 'いる is for animate things'],
                    ['あげる when helped', 'くれる', 'the favour came towards you'],
                    ['全然いいです', '全然よくないです', '全然 demands a negative'],
                    ['田中さんです about yourself', '田中です', 'no honorific for yourself'],
                    ['三千 for 30,000', '三万', 'Japanese groups by ten thousand']
                ]
            },
            check: {
                q: 'Which of these is a grammar error and which is just unnatural?',
                a: '寿司を好き and 高いでした are grammatically wrong. Repeating 私は is grammatical but ' +
                   'unnatural — and unnatural is the harder one to notice yourself doing.'
            }
        },
        {
            title: 'How to correct yourself',
            body: [
                "The hard part of these is not knowing them, it is catching them in the moment. Three " +
                "habits help more than study does.",
                "First, read your own sentences back through the Sentence tab. Seeing your Japanese " +
                "parsed by something that does not know what you meant is the closest thing to an " +
                "outside reader. If the breakdown names a role you did not intend, the sentence says " +
                "something you did not mean.",
                "Second, keep a list. Not of grammar points, but of the specific sentences you got " +
                "wrong. Patterns emerge from about ten entries, and they are always narrower than you " +
                "expect — most people have four or five recurring errors, not forty.",
                "Third, write questions for your own list. The Add page exists for this, and the act of " +
                "phrasing a question forces you to state what exactly the confusion is, which is often " +
                "where it dissolves."
            ],
            check: {
                q: 'Why parse your own writing rather than just re-reading it?',
                a: 'Because you read your own intention rather than your words. A parser only sees what ' +
                   'is there, and names the roles the particles actually mark.'
            }
        }
    ],
    steps: [
        { text: 'Paste something you wrote into the Sentence tab and read the roles it found.',
          href: 'dictionary.html', label: 'Sentence tab' },
        { text: 'Read the pitfalls page — the same idea, for politeness.',
          href: 'keigo.html#pitfalls', label: 'Keigo pitfalls' },
        { text: 'Turn your own recurring errors into questions.',
          href: 'add.html', label: 'Add questions' }
    ]
},
{
    id: 'onwards',
    title: 'Keep going',
    aim: 'N4 and past it.',
    body: 'N5 is the floor, not the goal. The same tools go all the way up.',
    lessons: [
        {
            title: 'What the next level adds',
            body: [
                "N4 roughly doubles the kanji — about 300 in total — and adds the grammar that lets " +
                "sentences join up rather than sit end to end. The te-form is the centre of it: it " +
                "chains actions, and it is what every one of those auxiliary endings attaches to. " +
                "Conditionals arrive, along with giving and receiving verbs, and casual speech starts " +
                "appearing in the material rather than only polite forms.",
                "The practical change is that sentences get longer. One clause at a time stops being " +
                "enough, and reading the whole line before translating any of it starts to matter."
            ],
            check: {
                q: 'What single grammar point does most of the work at N4?',
                a: 'The te-form. It joins clauses and carries the whole family of auxiliaries — ている, ' +
                   'てしまう, てみる, てください — so learning it well pays for a dozen other points.'
            }
        },
        {
            title: 'Repetition beats hours',
            body: [
                "Memory fades on a curve, and the way to beat it is to meet a thing again just as it is " +
                "slipping. That means short sessions often, not long ones occasionally. Twenty minutes " +
                "daily will take you further in a month than a full day each weekend.",
                "The quizzes here have a Performance mode that leans on this: instead of marching " +
                "through questions in order, it draws on what you have got wrong, so your time goes to " +
                "the material that needs it. Your answer history is kept in this browser, which also " +
                "means it is worth using the same one.",
                "And the last tool on the site is the one you will want eventually: when something keeps " +
                "catching you out, write a question for it yourself. Making the question forces you to " +
                "say exactly what you did not understand, which is often the moment you do."
            ],
            check: {
                q: 'Why does Performance mode not just go through the questions in order?',
                a: 'Because time spent on what you already know is time not spent on what you do not. ' +
                   'It weights toward the questions you have missed.'
            }
        },
        {
            title: 'What the JLPT levels actually mean',
            body: [
                "The levels run backwards: N5 is the entry point and N1 is the hardest. They are a " +
                "reading and listening test only — there is no speaking or writing section, which is " +
                "worth knowing before you treat the level as a measure of fluency.",
                "The gaps between them are not even. N5 to N4 is a modest step; N3 to N2 is where most " +
                "people stall, because the material shifts from textbook Japanese to the language as it " +
                "is actually used. N1 is comfortably past what is needed for ordinary life.",
                "The site follows the same levels, so once you have N5 comfortably in hand, everything " +
                "here moves up with you: the kanji chart, all five quizzes, and the vocabulary."
            ],
            table: {
                head: ['Level', 'Roughly', 'Kanji'],
                rows: [
                    ['N5', 'basic sentences, everyday phrases', '~100'],
                    ['N4', 'simple conversation, familiar topics', '~300'],
                    ['N3', 'everyday Japanese at natural speed', '~650'],
                    ['N2', 'newspapers, most workplace material', '~1,000'],
                    ['N1', 'abstract and academic writing', '~2,000']
                ]
            },
            check: {
                q: 'Does passing N1 mean you can speak Japanese?',
                a: 'Not by itself. The exam tests reading and listening only. Producing the language is ' +
                   'a separate skill that has to be practised separately.'
            }
        },
        {
            title: 'Building a routine you will actually keep',
            body: [
                "The single strongest predictor of getting anywhere with Japanese is not talent or hours " +
                "— it is whether you show up on days you do not feel like it. Design for those days.",
                "Make the minimum embarrassingly small: one quiz question, one traced character. A " +
                "session you cannot fail is a session you will not skip, and the days you do more will " +
                "take care of themselves. Attach it to something you already do without deciding — " +
                "coffee, the commute, brushing your teeth.",
                "Mix the four things rather than blocking them. Ten minutes each of kana, vocabulary, " +
                "a quiz and one sentence broken down will beat forty minutes of any one, because " +
                "switching forces recall and recall is what builds memory.",
                "And keep a note of what you keep getting wrong. That list is worth more than any " +
                "textbook, because it is the only study material written specifically for you — which " +
                "is exactly what the Add page is for."
            ],
            check: {
                q: 'What is the best length for a study session?',
                a: 'Short and daily beats long and occasional. Set a minimum you cannot fail on a bad ' +
                   'day, because the bad days are the ones that decide whether you continue.'
            }
        },
        {
            title: 'Reading widely versus reading closely',
            body: [
                "There are two kinds of reading and you need both, at different times, for different " +
                "reasons. Doing only one is the most common way to stall.",
                "Intensive reading is what this site is built for: take one sentence, break it down, " +
                "look up every word, understand the grammar completely. It builds precision, and it is " +
                "slow by design. Do it with material slightly above your level.",
                "Extensive reading is the opposite — read a lot, quickly, at a level where you " +
                "understand most of it without help, and do not stop for unknown words. It builds " +
                "speed, and it is what turns knowledge into fluency. Graded readers and children's " +
                "books exist for exactly this.",
                "The usual failure is doing only intensive reading, because it feels productive and " +
                "measurable. But you cannot look up your way to reading speed, and speed is what makes " +
                "the language usable."
            ],
            table: {
                head: ['', 'Intensive', 'Extensive'],
                rows: [
                    ['Level', 'slightly above yours', 'comfortably below'],
                    ['Speed', 'slow', 'as fast as you can'],
                    ['Look-ups', 'every unknown word', 'almost none'],
                    ['Builds', 'precision, grammar', 'speed, intuition'],
                    ['Here', 'the Sentence tab', 'the reading quizzes']
                ]
            },
            check: {
                q: 'Which kind of reading are you doing when you use the Sentence tab?',
                a: 'Intensive. It is built for taking one line apart completely, which is precisely why ' +
                   'you also need something easy to read fast alongside it.'
            }
        },
        {
            title: 'Practising output',
            body: [
                "Everything on this site builds comprehension. Producing the language is a separate " +
                "skill that does not arrive on its own, and the gap between the two is the most common " +
                "shape of being stuck — people who read comfortably and cannot order lunch.",
                "Shadowing closes part of it: play a recording and speak along a beat behind, copying " +
                "rhythm and pitch rather than translating. It feels ridiculous and works, because it " +
                "trains the mouth on patterns the ear already knows.",
                "Writing closes another part, and it is the cheapest practice there is. Three sentences " +
                "a day about what you did, in whatever grammar you have. Paste them into the Sentence " +
                "tab afterwards and read the roles it found — if the parse is not what you meant, the " +
                "sentence is not what you meant either.",
                "The rest needs another person. A language exchange, a tutor, a conversation group. " +
                "Nothing replaces having to answer in real time, and the discomfort of it is the point " +
                "rather than a sign you are not ready."
            ],
            table: {
                head: ['Practice', 'Builds', 'Cost'],
                rows: [
                    ['shadowing a recording', 'rhythm, pitch, fluency', 'free, feels silly'],
                    ['three sentences a day', 'grammar under pressure', 'free'],
                    ['parsing what you wrote', 'catching your own errors', 'free'],
                    ['talking to yourself', 'retrieval speed', 'free'],
                    ['language exchange', 'real-time response', 'time'],
                    ['a tutor', 'correction you would not spot', 'money']
                ]
            },
            check: {
                q: 'Why parse your own writing rather than only reading it back?',
                a: 'Because you read your intention rather than your words. A parser reports the roles ' +
                   'the particles actually mark, which is what a reader would get.'
            }
        },
        {
            title: 'What the exam actually looks like',
            body: [
                "If you sit the JLPT, knowing the shape of it in advance is worth a level. It is held " +
                "twice a year in most countries, in July and December, and you register months ahead — " +
                "places fill.",
                "Every level has the same three parts: vocabulary and characters, grammar and reading, " +
                "and listening. At N4 and N5 the first two are combined into one paper. There is no " +
                "speaking and no writing, which is why a JLPT certificate says what you can take in " +
                "rather than what you can produce.",
                "The scoring catches people out. You need both a total score and a minimum in each " +
                "section, so a very strong reader who cannot listen will fail regardless of the total. " +
                "Practise the section you like least, which is almost always listening.",
                "Timing is the other trap. Reading sections are long enough that finishing is part of " +
                "the test, and the single most useful preparation is doing a full paper against the " +
                "clock rather than studying more grammar."
            ],
            table: {
                head: ['Section', 'Covers', 'Note'],
                rows: [
                    ['文字・語彙', 'characters and vocabulary', 'combined with grammar at N4–N5'],
                    ['文法・読解', 'grammar and reading', 'the long one — timing matters'],
                    ['聴解', 'listening', 'played once, no rewind'],
                    ['scoring', 'total plus a minimum per section', 'a weak section fails you outright'],
                    ['held', 'July and December', 'register months ahead']
                ]
            },
            check: {
                q: 'You score highly overall but poorly on listening. Do you pass?',
                a: 'No. Each section has a minimum of its own, so a weak section fails you regardless ' +
                   'of the total.'
            }
        }
    ],
    steps: [
        { text: 'Move the kanji chart up a level.',
          href: 'characters.html#kanji=n4', label: 'N4 kanji' },
        { text: 'Take the N4 quizzes, in Performance mode.',
          href: 'practice.html#grammar=n4', label: 'N4 grammar' },
        { text: 'Write your own questions for whatever keeps catching you out.',
          href: 'add.html', label: 'Add questions' }
    ]
}
];
