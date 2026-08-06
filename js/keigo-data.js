// LearneJP — a Japanese (JLPT) study app for writing practice, quizzes, and dictionary lookup
// Copyright (C) 2026 Claudia Mithesa Peranginangin
//
// This program is free software: you can redistribute it and/or modify it under
// the terms of the GNU General Public License as published by the Free Software
// Foundation, either version 3 of the License, or (at your option) any later
// version. See <https://www.gnu.org/licenses/>.
//
// ---------------------------------------------------------------------------
// KEIGO REFERENCE DATA
//
// Category names follow the five-way split set out by the Bunka Shingikai in
// 敬語の指針 (2007), which replaced the older three-way textbook split:
//
// 尊敬語 sonkeigo raises the person you're talking about
// 謙譲語I kenjōgo I lowers you, toward the person your action touches
// 謙譲語II teichōgo lowers you, toward the person you're speaking to
// 丁寧語 teineigo です・ます — politeness toward the listener
// 美化語 bikago お茶・ご飯 — refinement, no target at all
//
// The distinction that matters in practice is I vs II: 伺う needs someone to
// go *to*, 参る doesn't. See the Overview tab in the page.
//
// Loaded by js/keigo.js as a plain script (no fetch), so the page works when
// opened from disk as well as over http.
// ---------------------------------------------------------------------------

window.KEIGO_DATA = {

// ===================== THE FIVE CATEGORIES =====================

categories: [
{
id: 'sonkeigo',
jp: '尊敬語',
reading: 'そんけいご',
en: 'Respectful language',
direction: 'up',
gloss: 'Raises the person you are talking about.',
body: 'Used for the actions, belongings and states of someone you are showing respect to — a customer, a teacher, a client, your boss. Never use it about yourself or about your own group when speaking to an outsider.',
subject: 'the other person',
examples: [
{ jp: '先生がお読みになります。', r: 'せんせいが およみに なります', en: 'The teacher reads.' },
{ jp: '社長はもうお帰りになりました。', r: 'しゃちょうは もう おかえりに なりました', en: 'The president has already gone home.' },
{ jp: 'お客様がいらっしゃいました。', r: 'おきゃくさまが いらっしゃいました', en: 'The customer has arrived.' },
{ jp: '部長は何とおっしゃいましたか。', r: 'ぶちょうは なんと おっしゃいましたか', en: 'What did the manager say?' },
{ jp: 'どうぞ召し上がってください。', r: 'どうぞ めしあがって ください', en: 'Please help yourself.' },
{ jp: 'ご覧になりましたでしょうか。', r: 'ごらんに なりましたでしょうか', en: 'Have you had a look?' },
{ jp: '先生はご存じでいらっしゃいます。', r: 'せんせいは ごぞんじで いらっしゃいます', en: 'The teacher knows.' },
{ jp: 'お客様がお見えになりました。', r: 'おきゃくさまが おみえに なりました', en: 'The visitor has arrived.' }
]
},
{
id: 'kenjo1',
jp: '謙譲語Ⅰ',
reading: 'けんじょうご いち',
en: 'Humble language (toward a target)',
direction: 'down-target',
gloss: 'Lowers you, relative to the person your action reaches.',
body: 'Use when your action is directed at someone you respect. There has to be a target: you visit someone, you tell someone, you meet someone. 伺う, 申し上げる, 拝見する, お目にかかる and the お〜する pattern all belong here.',
subject: 'you (or your group)',
examples: [
{ jp: '明日、御社に伺います。', r: 'あした、おんしゃに うかがいます', en: "I'll visit your company tomorrow." },
{ jp: '部長に申し上げました。', r: 'ぶちょうに もうしあげました', en: 'I told the department head.' },
{ jp: '資料を拝見しました。', r: 'しりょうを はいけんしました', en: 'I have looked at the documents.' },
{ jp: 'お目にかかれて光栄です。', r: 'おめに かかれて こうえいです', en: 'It is an honour to meet you.' },
{ jp: 'お荷物をお持ちいたします。', r: 'おにもつを おもち いたします', en: 'Allow me to carry your bag.' },
{ jp: 'ご案内いたします。', r: 'ごあんない いたします', en: 'I will show you the way.' },
{ jp: 'ご確認いただけますでしょうか。', r: 'ごかくにん いただけますでしょうか', en: 'Could you confirm?' },
{ jp: '田中様は存じ上げております。', r: 'たなかさまは ぞんじあげて おります', en: 'I know Mr Tanaka.' }
]
},
{
id: 'kenjo2',
jp: '謙譲語Ⅱ（丁重語）',
reading: 'けんじょうご に・ていちょうご',
en: 'Courteous language',
direction: 'down-listener',
gloss: 'Lowers you, relative to the person you are speaking to.',
body: 'Use when there is no particular target — you are simply speaking politely about your own actions. 参る, 申す, いたす, おる, 存じる. The giveaway: 参る works even when you go somewhere nobody respected is waiting. 伺う does not.',
subject: 'you (or your group)',
examples: [
{ jp: '来週、大阪へ参ります。', r: 'らいしゅう、おおさかへ まいります', en: "I'll go to Osaka next week." },
{ jp: '山田と申します。', r: 'やまだと もうします', en: 'My name is Yamada.' },
{ jp: '担当者は席を外しております。', r: 'たんとうしゃは せきを はずしております', en: 'The person in charge is away from their desk.' },
{ jp: 'まもなく電車が参ります。', r: 'まもなく でんしゃが まいります', en: 'The train will arrive shortly.' },
{ jp: '本日は休業いたします。', r: 'ほんじつは きゅうぎょう いたします', en: 'We are closed today.' },
{ jp: 'その件は存じております。', r: 'その けんは ぞんじて おります', en: 'I am aware of the matter.' },
{ jp: '楽しみにしております。', r: 'たのしみに して おります', en: 'I am looking forward to it.' },
{ jp: '弊社の山田がそう申しておりました。', r: 'へいしゃの やまだが そう もうして おりました', en: 'Our Yamada said so.' }
]
},
{
id: 'teineigo',
jp: '丁寧語',
reading: 'ていねいご',
en: 'Polite language',
direction: 'listener',
gloss: 'Politeness toward whoever is listening.',
body: 'です・ます, and the more formal ございます. Independent of who the sentence is about — you can be polite to your listener while talking about a dog. This is the layer you learned first, and it sits underneath everything else.',
subject: 'anyone',
examples: [
{ jp: '雨が降っています。', r: 'あめが ふっています', en: 'It is raining.' },
{ jp: 'こちらが資料でございます。', r: 'こちらが しりょうで ございます', en: 'Here are the documents.' },
{ jp: '受付は二階にございます。', r: 'うけつけは にかいに ございます', en: 'Reception is on the second floor.' },
{ jp: '本日は満席でございます。', r: 'ほんじつは まんせきで ございます', en: 'We are fully booked today.' },
{ jp: 'あいにく在庫がございません。', r: 'あいにく ざいこが ございません', en: 'Unfortunately it is out of stock.' },
{ jp: 'こちらでよろしいでしょうか。', r: 'こちらで よろしいでしょうか', en: 'Is this all right?' },
{ jp: '恐れ入りますが、少々お待ちください。', r: 'おそれいりますが、しょうしょう おまち ください', en: 'Sorry to trouble you — one moment, please.' },
{ jp: '明日は休みます。', r: 'あすは やすみます', en: 'I am off tomorrow.' }
]
},
{
id: 'bikago',
jp: '美化語',
reading: 'びかご',
en: 'Beautification',
direction: 'none',
gloss: 'Refines the word itself. Points at nobody.',
body: 'お茶, お酒, ご飯. The prefix makes your speech sound refined rather than showing respect to a person — which is why you can say お茶 about tea you are drinking alone. Some have fused permanently: ご飯 and お腹 are no longer optional.',
subject: 'nobody',
examples: [
{ jp: 'お茶をどうぞ。', r: 'おちゃを どうぞ', en: 'Please have some tea.' },
{ jp: 'お腹がすきました。', r: 'おなかが すきました', en: "I'm hungry." },
{ jp: 'ご飯を食べます。', r: 'ごはんを たべます', en: 'I eat a meal.' },
{ jp: 'お菓子はいかがですか。', r: 'おかしは いかがですか', en: 'Would you like some sweets?' },
{ jp: 'お料理が届きました。', r: 'おりょうりが とどきました', en: 'The food has arrived.' },
{ jp: 'お水を一杯ください。', r: 'おみずを いっぱい ください', en: 'A glass of water, please.' },
{ jp: 'お天気がいいですね。', r: 'おてんきが いいですね', en: 'Nice weather, is it not.' },
{ jp: 'お財布を忘れました。', r: 'おさいふを わすれました', en: 'I forgot my wallet.' }
]
}
],

// ===================== SPECIAL VERB TABLE =====================
// t: 1 = 謙譲語Ⅰ (has a target), 2 = 謙譲語Ⅱ (courteous, no target)

verbs: [
{
plain: 'する', reading: 'する', en: 'do', level: 'N3',
son: [{ f: 'なさる', r: 'なさる' }, { f: 'される', r: 'される' }],
ken: [{ f: 'いたす', r: 'いたす', t: 2 }],
note: 'なさる is an irregular -aru verb: なさいます, not ×なさります.'
},
{
plain: 'いる', reading: 'いる', en: 'be, exist (animate)', level: 'N3',
son: [{ f: 'いらっしゃる', r: 'いらっしゃる' }, { f: 'おいでになる', r: 'おいでに なる' }],
ken: [{ f: 'おる', r: 'おる', t: 2 }],
note: 'おる also forms the humble progressive: 〜ております.'
},
{
plain: '行く', reading: 'いく', en: 'go', level: 'N3',
son: [{ f: 'いらっしゃる', r: 'いらっしゃる' }, { f: 'おいでになる', r: 'おいでに なる' }],
ken: [{ f: '伺う', r: 'うかがう', t: 1 }, { f: '参る', r: 'まいる', t: 2 }],
note: '伺う needs a respected destination. Going to the station is 参ります, never ×伺います.'
},
{
plain: '来る', reading: 'くる', en: 'come', level: 'N3',
son: [{ f: 'いらっしゃる', r: 'いらっしゃる' }, { f: 'お見えになる', r: 'おみえに なる' }, { f: 'お越しになる', r: 'おこしに なる' }],
ken: [{ f: '伺う', r: 'うかがう', t: 1 }, { f: '参る', r: 'まいる', t: 2 }],
note: 'お見えになる and お越しになる are warmer than いらっしゃる and common in shops and receptions.'
},
{
plain: '言う', reading: 'いう', en: 'say', level: 'N3',
son: [{ f: 'おっしゃる', r: 'おっしゃる' }],
ken: [{ f: '申し上げる', r: 'もうしあげる', t: 1 }, { f: '申す', r: 'もうす', t: 2 }],
note: 'Introducing yourself is 山田と申します — no target, so 謙譲語Ⅱ.'
},
{
plain: '食べる', reading: 'たべる', en: 'eat', level: 'N3',
son: [{ f: '召し上がる', r: 'めしあがる' }],
ken: [{ f: 'いただく', r: 'いただく', t: 1 }, { f: '頂戴する', r: 'ちょうだいする', t: 1 }],
note: '×お召し上がりになる is double keigo. 召し上がる is already respectful.'
},
{
plain: '飲む', reading: 'のむ', en: 'drink', level: 'N3',
son: [{ f: '召し上がる', r: 'めしあがる' }],
ken: [{ f: 'いただく', r: 'いただく', t: 1 }],
note: 'Same verb covers eating and drinking in respectful speech.'
},
{
plain: '見る', reading: 'みる', en: 'see, look at', level: 'N3',
son: [{ f: 'ご覧になる', r: 'ごらんに なる' }],
ken: [{ f: '拝見する', r: 'はいけんする', t: 1 }],
note: '見る has a one-mora stem, so ×お見になる is impossible — the special form fills the gap.'
},
{
plain: '見せる', reading: 'みせる', en: 'show', level: 'N2',
son: [{ f: 'お見せになる', r: 'おみせに なる' }],
ken: [{ f: 'お目にかける', r: 'おめに かける', t: 1 }, { f: 'ご覧に入れる', r: 'ごらんに いれる', t: 1 }],
note: 'Both humble forms are formal and slightly literary.'
},
{
plain: '聞く', reading: 'きく', en: 'hear, ask', level: 'N3',
son: [{ f: 'お聞きになる', r: 'おききに なる' }],
ken: [{ f: '伺う', r: 'うかがう', t: 1 }, { f: '拝聴する', r: 'はいちょうする', t: 1 }, { f: '承る', r: 'うけたまわる', t: 1 }],
note: '伺う covers three meanings: go, visit, and ask. Context separates them.'
},
{
plain: '知る・知っている', reading: 'しる', en: 'know', level: 'N3',
son: [{ f: 'ご存じだ', r: 'ごぞんじだ' }],
ken: [{ f: '存じ上げる', r: 'ぞんじあげる', t: 1 }, { f: '存じる', r: 'ぞんじる', t: 2 }],
note: '存じ上げる is for people, 存じる for facts and things. ×その件は存じ上げております.'
},
{
plain: '思う', reading: 'おもう', en: 'think', level: 'N2',
son: [{ f: 'お思いになる', r: 'おおもいに なる' }],
ken: [{ f: '存じる', r: 'ぞんじる', t: 2 }],
note: '〜と存じます is a formal written equivalent of 〜と思います.'
},
{
plain: '会う', reading: 'あう', en: 'meet', level: 'N2',
son: [{ f: 'お会いになる', r: 'おあいに なる' }],
ken: [{ f: 'お目にかかる', r: 'おめに かかる', t: 1 }],
note: 'お目にかかる is warm and standard on first meetings.'
},
{
plain: 'あげる・与える', reading: 'あげる', en: 'give (to someone else)', level: 'N3',
son: [],
ken: [{ f: 'さしあげる', r: 'さしあげる', t: 1 }],
note: 'Can sound condescending when offering to a customer. Prefer お持ちします over お持ちしてさしあげます.'
},
{
plain: 'くれる', reading: 'くれる', en: 'give (to me)', level: 'N3',
son: [{ f: 'くださる', r: 'くださる' }],
ken: [],
note: 'Irregular -aru verb: くださいます, and the imperative ください.'
},
{
plain: 'もらう', reading: 'もらう', en: 'receive', level: 'N3',
son: [],
ken: [{ f: 'いただく', r: 'いただく', t: 1 }, { f: '頂戴する', r: 'ちょうだいする', t: 1 }],
note: 'Also the backbone of 〜ていただく, the humble way to ask for an action.'
},
{
plain: '借りる', reading: 'かりる', en: 'borrow', level: 'N2',
son: [{ f: 'お借りになる', r: 'おかりに なる' }],
ken: [{ f: '拝借する', r: 'はいしゃくする', t: 1 }],
note: 'The 拝 prefix marks a cluster of humble verbs: 拝見, 拝借, 拝聴, 拝読, 拝受.'
},
{
plain: '読む', reading: 'よむ', en: 'read', level: 'N2',
son: [{ f: 'お読みになる', r: 'およみに なる' }],
ken: [{ f: '拝読する', r: 'はいどくする', t: 1 }],
note: 'Common in email: ご著書を拝読しました.'
},
{
plain: '着る', reading: 'きる', en: 'wear', level: 'N1',
son: [{ f: 'お召しになる', r: 'おめしに なる' }],
ken: [],
note: '召す also gives お風邪を召す (catch a cold), お年を召す (grow older), お気に召す (like).'
},
{
plain: '寝る', reading: 'ねる', en: 'sleep', level: 'N2',
son: [{ f: 'お休みになる', r: 'おやすみに なる' }],
ken: [],
note: 'Also the source of おやすみなさい.'
},
{
plain: '死ぬ', reading: 'しぬ', en: 'die', level: 'N1',
son: [{ f: 'お亡くなりになる', r: 'おなくなりに なる' }],
ken: [],
note: 'For your own family, 亡くなりました or 他界いたしました.'
},
{
plain: '訪ねる', reading: 'たずねる', en: 'visit', level: 'N2',
son: [{ f: 'お訪ねになる', r: 'おたずねに なる' }],
ken: [{ f: '伺う', r: 'うかがう', t: 1 }, { f: 'お伺いする', r: 'おうかがいする', t: 1 }],
note: 'お伺いする is technically double keigo but the 2007 guidelines list it as established usage.'
},
{
plain: '受け取る', reading: 'うけとる', en: 'receive (a thing)', level: 'N1',
son: [{ f: 'お受け取りになる', r: 'おうけとりに なる' }],
ken: [{ f: '拝受する', r: 'はいじゅする', t: 1 }],
note: 'Written register: メール拝受いたしました.'
},
{
plain: '引き受ける', reading: 'ひきうける', en: 'undertake, accept', level: 'N1',
son: [],
ken: [{ f: '承る', r: 'うけたまわる', t: 1 }],
note: 'ご注文を承りました — the standard phrase for accepting an order.'
},
{
plain: 'わかる', reading: 'わかる', en: 'understand, agree to', level: 'N3',
son: [],
ken: [{ f: '承知する', r: 'しょうちする', t: 1 }, { f: 'かしこまる', r: 'かしこまる', t: 1 }],
note: 'かしこまりました is the service-industry standard; 承知しました suits business email.'
},
{
plain: 'ある', reading: 'ある', en: 'exist (inanimate)', level: 'N3',
son: [],
ken: [{ f: 'ございます', r: 'ございます', t: 2 }],
note: 'Strictly 丁寧語 in most analyses, but it patterns with the humble set in practice.'
},
{
plain: 'だ・である', reading: 'だ', en: 'be (copula)', level: 'N2',
son: [{ f: 'でいらっしゃる', r: 'でいらっしゃる' }],
ken: [{ f: 'でございます', r: 'でございます', t: 2 }],
note: '田中様でいらっしゃいますか — confirming someone\'s identity politely.'
},
{
plain: '買う', reading: 'かう', en: 'buy', level: 'N1',
son: [{ f: 'お求めになる', r: 'おもとめに なる' }],
ken: [],
note: 'Shop signage favours お求めやすい価格 over お買いやすい.'
},
{
plain: '気に入る', reading: 'きにいる', en: 'like, be pleased by', level: 'N1',
son: [{ f: 'お気に召す', r: 'おきに めす' }],
ken: [],
note: 'お気に召しましたか — did it please you?'
},
{
plain: '帰る', reading: 'かえる', en: 'go home, leave', level: 'N4',
son: [{ f: 'お帰りになる', r: 'おかえりに なる' }],
ken: [{ f: '失礼する', r: 'しつれいする', t: 2 }],
note: '失礼します doubles as "excuse me" and "I\'ll be leaving now" — context tells them apart.'
},
{
plain: '座る', reading: 'すわる', en: 'sit', level: 'N4',
son: [{ f: 'おかけになる', r: 'おかけに なる' }],
ken: [],
note: 'おかけになる, not お座りになる, is the standard respectful form in service settings — こちらにおかけください.'
},
{
plain: '入る', reading: 'はいる', en: 'enter', level: 'N4',
son: [{ f: 'お入りになる', r: 'おはいりに なる' }],
ken: [],
note: '×お入りになられる is 二重敬語. Stop at お入りになる.'
},
{
plain: '考える', reading: 'かんがえる', en: 'think, consider', level: 'N3',
son: [{ f: 'お考えになる', r: 'おかんがえに なる' }],
ken: [{ f: '拝察する', r: 'はいさつする', t: 1 }],
note: '拝察する is for guessing at someone else\'s feelings or situation: ご心痛のほど拝察いたします.'
},
{
plain: '頼む', reading: 'たのむ', en: 'ask a favour', level: 'N4',
son: [],
ken: [{ f: 'お願いする', r: 'おねがいする', t: 1 }],
note: 'お願いいたします is the everyday humble request — softer and more common than 頼みます.'
},
{
plain: '尋ねる', reading: 'たずねる', en: 'ask, inquire', level: 'N2',
son: [{ f: 'お尋ねになる', r: 'おたずねに なる' }],
ken: [{ f: '伺う', r: 'うかがう', t: 1 }, { f: 'お尋ねする', r: 'おたずねする', t: 1 }],
note: '尋ねる (ask) and 訪ねる (visit) share a reading but different kanji; 伺う covers both meanings humbly.'
},
{
plain: '待つ', reading: 'まつ', en: 'wait', level: 'N5',
son: [{ f: 'お待ちになる', r: 'おまちに なる' }],
ken: [{ f: 'お待ちする', r: 'おまちする', t: 1 }],
note: 'The base for two very common set phrases: お待ちください and お待ちしております.'
},
{
plain: '電話する', reading: 'でんわする', en: 'phone someone', level: 'N4',
son: [{ f: 'お電話になる', r: 'おでんわに なる' }],
ken: [{ f: 'お電話する', r: 'おでんわする', t: 1 }, { f: 'お電話いたす', r: 'おでんわいたす', t: 1 }],
note: '折り返しお電話いたします — "I will call you back" — is standard phone closing.'
},
{
plain: '死ぬ・亡くなる', reading: 'なくなる', en: 'pass away', level: 'N2',
son: [{ f: '逝去なさる', r: 'せいきょ なさる' }],
ken: [],
note: '逝去する appears almost exclusively in obituaries and formal announcements, never spoken casually.'
},
{
plain: '住む', reading: 'すむ', en: 'live, reside', level: 'N3',
son: [{ f: 'お住まいになる', r: 'おすまいに なる' }],
ken: [],
note: 'お住まい is also the polite noun for "residence": どちらにお住まいですか。'
},
{
plain: '働く', reading: 'はたらく', en: 'work', level: 'N3',
son: [],
ken: [{ f: '働かせていただく', r: 'はたらかせて いただく', t: 1 }],
note: 'Almost always appears as 働かせていただいております, describing your current job humbly.'
},
{
plain: '休む', reading: 'やすむ', en: 'rest, take a day off', level: 'N4',
son: [{ f: 'お休みになる', r: 'おやすみに なる' }],
ken: [],
note: 'Shares お休みになる with 寝る; context (bed vs. day off) disambiguates.'
},
{
plain: '始める', reading: 'はじめる', en: 'begin, start', level: 'N4',
son: [{ f: 'お始めになる', r: 'おはじめに なる' }],
ken: [{ f: '始めさせていただく', r: 'はじめさせて いただく', t: 1 }],
note: 'ただいまより始めさせていただきます opens most formal meetings and ceremonies.'
},
{
plain: '終わる', reading: 'おわる', en: 'end, finish', level: 'N4',
son: [],
ken: [{ f: '終えさせていただく', r: 'おえさせて いただく', t: 1 }],
note: 'これをもちまして終わらせていただきます closes a formal proceeding.'
},
{
plain: '出す', reading: 'だす', en: 'submit, hand in', level: 'N3',
son: [{ f: 'お出しになる', r: 'おだしに なる' }],
ken: [{ f: '提出する', r: 'ていしゅつする', t: 1 }],
note: '提出させていただきます is legitimate here — approval genuinely depends on the reader.'
},
{
plain: '確認する', reading: 'かくにんする', en: 'confirm, check', level: 'N3',
son: [{ f: 'ご確認になる', r: 'ごかくにんに なる' }],
ken: [{ f: 'ご確認する', r: 'ごかくにんする', t: 1 }],
note: 'ご確認いただけますでしょうか is the standard humble request pattern built on this verb.'
},
{
plain: '案内する', reading: 'あんないする', en: 'guide, show around', level: 'N3',
son: [{ f: 'ご案内なさる', r: 'ごあんない なさる' }],
ken: [{ f: 'ご案内する', r: 'ごあんないする', t: 1 }],
note: 'ご案内いたします is the standard phrase at receptions, hotels, and events.'
},
{
plain: '説明する', reading: 'せつめいする', en: 'explain', level: 'N3',
son: [{ f: 'ご説明なさる', r: 'ごせつめい なさる' }],
ken: [{ f: 'ご説明する', r: 'ごせつめいする', t: 1 }],
note: 'ご説明させていただきます works when the listener is granting you time to explain.'
},
{
plain: '相談する', reading: 'そうだんする', en: 'consult, discuss', level: 'N3',
son: [{ f: 'ご相談なさる', r: 'ごそうだん なさる' }],
ken: [{ f: 'ご相談する', r: 'ごそうだんする', t: 1 }],
note: 'ご相談させていただきたいのですが is a soft, humble way to open a request for advice.'
},
{
plain: '書く', reading: 'かく', en: 'write', level: 'N5',
son: [{ f: 'お書きになる', r: 'おかきに なる' }],
ken: [{ f: 'お書きする', r: 'おかきする', t: 1 }],
note: 'お書きください is the standard instruction printed on forms.'
},
{
plain: '持つ', reading: 'もつ', en: 'hold, carry', level: 'N5',
son: [{ f: 'お持ちになる', r: 'おもちに なる' }],
ken: [{ f: 'お持ちする', r: 'おもちする', t: 1 }],
note: '持って行く and 持って来る both become 持参する in formal speech.'
},
{
plain: '送る', reading: 'おくる', en: 'send, see off', level: 'N4',
son: [{ f: 'お送りになる', r: 'おおくりに なる' }],
ken: [{ f: 'お送りする', r: 'おおくりする', t: 1 }],
note: 'お送りします covers both posting something and walking a guest out.'
},
{
plain: '届ける', reading: 'とどける', en: 'deliver', level: 'N3',
son: [{ f: 'お届けになる', r: 'おとどけに なる' }],
ken: [{ f: 'お届けする', r: 'おとどけする', t: 1 }]
},
{
plain: '使う', reading: 'つかう', en: 'use', level: 'N5',
son: [{ f: 'お使いになる', r: 'おつかいに なる' }],
ken: [{ f: '使わせていただく', r: 'つかわせて いただく', t: 1 }],
note: 'For the Sino-Japanese 使用する, the respectful form is ご使用になる.'
},
{
plain: '利用する', reading: 'りようする', en: 'use, make use of', level: 'N3',
son: [{ f: 'ご利用になる', r: 'ごりように なる' }],
ken: [{ f: '利用させていただく', r: 'りようさせて いただく', t: 1 }],
note: 'ご利用される is widely heard but sits close to 二重敬語; ご利用になる is safer.'
},
{
plain: '出席する', reading: 'しゅっせきする', en: 'attend', level: 'N3',
son: [{ f: 'ご出席になる', r: 'ごしゅっせきに なる' }, { f: 'ご出席なさる', r: 'ごしゅっせき なさる' }],
ken: [{ f: '出席いたす', r: 'しゅっせきいたす', t: 2 }],
note: '出席させていただきます is natural when you were invited.'
},
{
plain: '参加する', reading: 'さんかする', en: 'participate', level: 'N3',
son: [{ f: 'ご参加になる', r: 'ごさんかに なる' }],
ken: [{ f: '参加いたす', r: 'さんかいたす', t: 2 }]
},
{
plain: '到着する', reading: 'とうちゃくする', en: 'arrive', level: 'N3',
son: [{ f: 'ご到着になる', r: 'ごとうちゃくに なる' }],
ken: [{ f: '到着いたす', r: 'とうちゃくいたす', t: 2 }],
note: 'お着きになる is the softer spoken alternative.'
},
{
plain: '出発する', reading: 'しゅっぱつする', en: 'depart', level: 'N3',
son: [{ f: 'ご出発になる', r: 'ごしゅっぱつに なる' }],
ken: [{ f: '出発いたす', r: 'しゅっぱついたす', t: 2 }]
},
{
plain: '出かける', reading: 'でかける', en: 'go out', level: 'N4',
son: [{ f: 'お出かけになる', r: 'おでかけに なる' }],
ken: [{ f: '外出いたす', r: 'がいしゅついたす', t: 2 }],
note: 'お出かけですか is a common neighbourly greeting, not a real question.'
},
{
plain: '連絡する', reading: 'れんらくする', en: 'contact, get in touch', level: 'N3',
son: [{ f: 'ご連絡になる', r: 'ごれんらくに なる' }, { f: 'ご連絡なさる', r: 'ごれんらく なさる' }],
ken: [{ f: 'ご連絡する', r: 'ごれんらくする', t: 1 }, { f: 'ご連絡いたす', r: 'ごれんらくいたす', t: 1 }],
note: 'ご連絡いたします is the standard closing line of a business email.'
},
{
plain: '返事する', reading: 'へんじする', en: 'reply', level: 'N3',
son: [{ f: 'お返事になる', r: 'おへんじに なる' }],
ken: [{ f: 'お返事する', r: 'おへんじする', t: 1 }],
note: 'お返事 and ご返事 both occur; お返事 is the more common in speech.'
},
{
plain: '答える', reading: 'こたえる', en: 'answer', level: 'N4',
son: [{ f: 'お答えになる', r: 'おこたえに なる' }],
ken: [{ f: 'お答えする', r: 'おこたえする', t: 1 }],
note: 'お答えいたしかねます is the formal way to say you cannot answer.'
},
{
plain: '質問する', reading: 'しつもんする', en: 'ask a question', level: 'N4',
son: [{ f: 'ご質問になる', r: 'ごしつもんに なる' }],
ken: [{ f: '質問させていただく', r: 'しつもんさせて いただく', t: 1 }],
note: 'お伺いする is usually the more natural humble choice.'
},
{
plain: '教える', reading: 'おしえる', en: 'teach, tell', level: 'N5',
son: [{ f: 'お教えになる', r: 'おおしえに なる' }],
ken: [{ f: 'お教えする', r: 'おおしえする', t: 1 }],
note: 'Telling a superior a fact is usually お伝えする, not お教えする.'
},
{
plain: '伝える', reading: 'つたえる', en: 'convey, pass on', level: 'N3',
son: [{ f: 'お伝えになる', r: 'おつたえに なる' }],
ken: [{ f: 'お伝えする', r: 'おつたえする', t: 1 }, { f: '申し伝える', r: 'もうしつたえる', t: 1 }],
note: '申し伝える is for passing a message to your own colleague on behalf of an outsider.'
},
{
plain: '習う', reading: 'ならう', en: 'learn, be taught', level: 'N4',
son: [{ f: 'お習いになる', r: 'おならいに なる' }],
ken: [{ f: '習わせていただく', r: 'ならわせて いただく', t: 1 }]
},
{
plain: '覚える', reading: 'おぼえる', en: 'remember, learn', level: 'N4',
son: [{ f: 'お覚えになる', r: 'おおぼえに なる' }],
ken: [],
note: 'お見知りおきください is the set phrase asking someone to remember you.'
},
{
plain: '忘れる', reading: 'わすれる', en: 'forget', level: 'N5',
son: [{ f: 'お忘れになる', r: 'おわすれに なる' }],
ken: [],
note: 'お忘れ物のございませんよう is the standard station announcement.'
},
{
plain: '選ぶ', reading: 'えらぶ', en: 'choose', level: 'N4',
son: [{ f: 'お選びになる', r: 'おえらびに なる' }],
ken: [{ f: 'お選びする', r: 'おえらびする', t: 1 }]
},
{
plain: '決める', reading: 'きめる', en: 'decide', level: 'N4',
son: [{ f: 'お決めになる', r: 'おきめに なる' }],
ken: [{ f: '決めさせていただく', r: 'きめさせて いただく', t: 1 }],
note: 'お決まりでしょうか is how a server asks whether you have chosen.'
},
{
plain: '検討する', reading: 'けんとうする', en: 'consider, look into', level: 'N2',
son: [{ f: 'ご検討になる', r: 'ごけんとうに なる' }],
ken: [{ f: '検討いたす', r: 'けんとういたす', t: 2 }],
note: '検討させていただきます frequently signals a soft refusal rather than real deliberation.'
},
{
plain: '断る', reading: 'ことわる', en: 'decline, refuse', level: 'N3',
son: [{ f: 'お断りになる', r: 'おことわりに なる' }],
ken: [{ f: 'お断りする', r: 'おことわりする', t: 1 }],
note: '辞退させていただきます is softer for invitations and honours.'
},
{
plain: '謝る', reading: 'あやまる', en: 'apologise', level: 'N3',
son: [],
ken: [{ f: 'お詫び申し上げる', r: 'おわび もうしあげる', t: 1 }],
note: 'The verb is rarely raised; the formality sits in the noun お詫び.'
},
{
plain: '感謝する', reading: 'かんしゃする', en: 'thank, be grateful', level: 'N3',
son: [],
ken: [{ f: '感謝申し上げる', r: 'かんしゃ もうしあげる', t: 1 }],
note: 'お礼申し上げます is the more common written thanks.'
},
{
plain: '祝う', reading: 'いわう', en: 'celebrate, congratulate', level: 'N3',
son: [{ f: 'お祝いになる', r: 'おいわいに なる' }],
ken: [{ f: 'お祝い申し上げる', r: 'おいわい もうしあげる', t: 1 }],
note: 'お慶び申し上げます uses the celebratory kanji reserved for written congratulations.'
},
{
plain: '招待する', reading: 'しょうたいする', en: 'invite', level: 'N3',
son: [{ f: 'ご招待になる', r: 'ごしょうたいに なる' }, { f: 'ご招待なさる', r: 'ごしょうたい なさる' }],
ken: [{ f: 'ご招待する', r: 'ごしょうたいする', t: 1 }],
note: 'お招きする is the softer native-Japanese equivalent.'
},
{
plain: '迎える', reading: 'むかえる', en: 'welcome, go to meet', level: 'N3',
son: [{ f: 'お迎えになる', r: 'おむかえに なる' }],
ken: [{ f: 'お迎えする', r: 'おむかえする', t: 1 }],
note: 'お迎えに上がります is the humble form used when collecting a guest.'
},
{
plain: '見送る', reading: 'みおくる', en: 'see off', level: 'N3',
son: [{ f: 'お見送りになる', r: 'おみおくりに なる' }],
ken: [{ f: 'お見送りする', r: 'おみおくりする', t: 1 }],
note: 'In business writing 見送る also means to pass on an offer.'
},
{
plain: '呼ぶ', reading: 'よぶ', en: 'call, summon', level: 'N4',
son: [{ f: 'お呼びになる', r: 'およびに なる' }],
ken: [{ f: 'お呼びする', r: 'およびする', t: 1 }],
note: 'お呼び立てして申し訳ございません apologises for making someone come.'
},
{
plain: '手伝う', reading: 'てつだう', en: 'help, assist', level: 'N4',
son: [{ f: 'お手伝いになる', r: 'おてつだいに なる' }],
ken: [{ f: 'お手伝いする', r: 'おてつだいする', t: 1 }]
},
{
plain: '助ける', reading: 'たすける', en: 'help, rescue', level: 'N3',
son: [{ f: 'お助けになる', r: 'おたすけに なる' }],
ken: [{ f: 'お助けする', r: 'おたすけする', t: 1 }]
},
{
plain: '貸す', reading: 'かす', en: 'lend', level: 'N4',
son: [{ f: 'お貸しになる', r: 'おかしに なる' }],
ken: [{ f: 'お貸しする', r: 'おかしする', t: 1 }],
note: 'The mirror image, borrowing, has the special humble 拝借する.'
},
{
plain: '返す', reading: 'かえす', en: 'return something', level: 'N4',
son: [{ f: 'お返しになる', r: 'おかえしに なる' }],
ken: [{ f: 'お返しする', r: 'おかえしする', t: 1 }]
},
{
plain: '払う', reading: 'はらう', en: 'pay', level: 'N4',
son: [{ f: 'お支払いになる', r: 'おしはらいに なる' }],
ken: [{ f: 'お支払いする', r: 'おしはらいする', t: 1 }],
note: 'お支払いになる is the wording used on invoices and payment screens.'
},
{
plain: '注文する', reading: 'ちゅうもんする', en: 'order', level: 'N4',
son: [{ f: 'ご注文になる', r: 'ごちゅうもんに なる' }, { f: 'ご注文なさる', r: 'ごちゅうもん なさる' }],
ken: [{ f: '注文いたす', r: 'ちゅうもんいたす', t: 2 }],
note: 'ご注文は以上でよろしいでしょうか is the standard confirmation.'
},
{
plain: '予約する', reading: 'よやくする', en: 'reserve, book', level: 'N4',
son: [{ f: 'ご予約になる', r: 'ごよやくに なる' }],
ken: [{ f: '予約させていただく', r: 'よやくさせて いただく', t: 1 }],
note: 'ご予約承ります is what a hotel or restaurant says when taking the booking.'
},
{
plain: '変更する', reading: 'へんこうする', en: 'change, amend', level: 'N3',
son: [{ f: 'ご変更になる', r: 'ごへんこうに なる' }],
ken: [{ f: '変更いたす', r: 'へんこういたす', t: 2 }]
},
{
plain: '延期する', reading: 'えんきする', en: 'postpone', level: 'N2',
son: [{ f: 'ご延期になる', r: 'ごえんきに なる' }],
ken: [{ f: '延期いたす', r: 'えんきいたす', t: 2 }]
},
{
plain: '中止する', reading: 'ちゅうしする', en: 'call off', level: 'N2',
son: [{ f: 'ご中止になる', r: 'ごちゅうしに なる' }],
ken: [{ f: '中止いたす', r: 'ちゅうしいたす', t: 2 }],
note: '中止させていただきます is the standard cancellation notice.'
},
{
plain: '立つ', reading: 'たつ', en: 'stand', level: 'N5',
son: [{ f: 'お立ちになる', r: 'おたちに なる' }],
ken: [],
note: 'お立ちください sounds abrupt; ご起立ください is used at ceremonies.'
},
{
plain: '歩く', reading: 'あるく', en: 'walk', level: 'N5',
son: [{ f: 'お歩きになる', r: 'おあるきに なる' }],
ken: [],
note: 'When guiding someone, ご案内いたします replaces it entirely.'
},
{
plain: '乗る', reading: 'のる', en: 'ride, board', level: 'N5',
son: [{ f: 'お乗りになる', r: 'おのりに なる' }, { f: 'ご乗車になる', r: 'ごじょうしゃに なる' }],
ken: [{ f: '乗らせていただく', r: 'のらせて いただく', t: 1 }],
note: 'ご乗車 is rail-specific; ご搭乗 is the aviation equivalent.'
},
{
plain: '降りる', reading: 'おりる', en: 'get off, alight', level: 'N4',
son: [{ f: 'お降りになる', r: 'おおりに なる' }],
ken: [],
note: 'お降りのお客様 is the standard announcement phrasing.'
},
{
plain: '泊まる', reading: 'とまる', en: 'stay overnight', level: 'N4',
son: [{ f: 'お泊まりになる', r: 'おとまりに なる' }],
ken: [{ f: '泊まらせていただく', r: 'とまらせて いただく', t: 1 }],
note: 'ご宿泊 is the noun hotels use on signage and paperwork.'
},
{
plain: '楽しむ', reading: 'たのしむ', en: 'enjoy', level: 'N3',
son: [{ f: 'お楽しみになる', r: 'おたのしみに なる' }],
ken: [{ f: '楽しませていただく', r: 'たのしませて いただく', t: 1 }],
note: 'お楽しみください is the standard closing of an event announcement.'
},
{
plain: '過ごす', reading: 'すごす', en: 'spend time', level: 'N3',
son: [{ f: 'お過ごしになる', r: 'おすごしに なる' }],
ken: [{ f: '過ごさせていただく', r: 'すごさせて いただく', t: 1 }],
note: 'いかがお過ごしでしょうか is a standard letter opener.'
},
{
plain: '喜ぶ', reading: 'よろこぶ', en: 'be pleased', level: 'N3',
son: [{ f: 'お喜びになる', r: 'およろこびに なる' }],
ken: [{ f: 'お喜び申し上げる', r: 'およろこび もうしあげる', t: 1 }],
note: 'Written congratulations use the 慶 kanji: お慶び申し上げます.'
},
{
plain: '心配する', reading: 'しんぱいする', en: 'worry', level: 'N3',
son: [{ f: 'ご心配になる', r: 'ごしんぱいに なる' }, { f: 'ご心配なさる', r: 'ごしんぱい なさる' }],
ken: [{ f: 'ご心配をおかけする', r: 'ごしんぱいを おかけする', t: 1 }],
note: 'ご心配をおかけしました apologises for having caused worry.'
},
{
plain: '驚く', reading: 'おどろく', en: 'be surprised', level: 'N3',
son: [{ f: 'お驚きになる', r: 'おおどろきに なる' }],
ken: []
},
{
plain: '困る', reading: 'こまる', en: 'be troubled, be stuck', level: 'N4',
son: [{ f: 'お困りになる', r: 'おこまりに なる' }],
ken: [],
note: 'お困りのことがございましたら is the standard offer of help.'
},
{
plain: '疲れる', reading: 'つかれる', en: 'get tired', level: 'N4',
son: [{ f: 'お疲れになる', r: 'おつかれに なる' }],
ken: [],
note: 'お疲れ様でございます is the more formal variant of the office greeting.'
},
{
plain: '回復する', reading: 'かいふくする', en: 'recover', level: 'N3',
son: [{ f: 'ご回復なさる', r: 'ごかいふく なさる' }],
ken: [],
note: 'ご全快をお祈り申し上げます is the formal recovery wish.'
},
{
plain: '生まれる', reading: 'うまれる', en: 'be born', level: 'N4',
son: [{ f: 'お生まれになる', r: 'おうまれに なる' }],
ken: [],
note: 'ご出生 and ご誕生 are the formal nouns used on documents.'
},
{
plain: '結婚する', reading: 'けっこんする', en: 'marry', level: 'N4',
son: [{ f: 'ご結婚になる', r: 'ごけっこんに なる' }, { f: 'ご結婚なさる', r: 'ごけっこん なさる' }],
ken: [{ f: '結婚いたす', r: 'けっこんいたす', t: 2 }],
note: 'ご結婚おめでとうございます is the fixed congratulation.'
},
{
plain: '引っ越す', reading: 'ひっこす', en: 'move house', level: 'N3',
son: [{ f: 'お引っ越しになる', r: 'おひっこしに なる' }],
ken: [{ f: '引っ越しいたす', r: 'ひっこしいたす', t: 2 }],
note: '転居 is the formal noun used on change-of-address cards.'
},
{
plain: '卒業する', reading: 'そつぎょうする', en: 'graduate', level: 'N4',
son: [{ f: 'ご卒業になる', r: 'ごそつぎょうに なる' }, { f: 'ご卒業なさる', r: 'ごそつぎょう なさる' }],
ken: [{ f: '卒業いたす', r: 'そつぎょういたす', t: 2 }]
},
{
plain: '入学する', reading: 'にゅうがくする', en: 'enter a school', level: 'N4',
son: [{ f: 'ご入学になる', r: 'ごにゅうがくに なる' }],
ken: [{ f: '入学いたす', r: 'にゅうがくいたす', t: 2 }]
},
{
plain: '就職する', reading: 'しゅうしょくする', en: 'get a job', level: 'N3',
son: [{ f: 'ご就職になる', r: 'ごしゅうしょくに なる' }],
ken: [{ f: '就職いたす', r: 'しゅうしょくいたす', t: 2 }]
},
{
plain: '退職する', reading: 'たいしょくする', en: 'resign, retire', level: 'N2',
son: [{ f: 'ご退職になる', r: 'ごたいしょくに なる' }, { f: 'ご退職なさる', r: 'ごたいしょく なさる' }],
ken: [{ f: '退職いたす', r: 'たいしょくいたす', t: 2 }],
note: '退職させていただくことになりました is the standard announcement wording.'
},
{
plain: '出張する', reading: 'しゅっちょうする', en: 'go on a business trip', level: 'N3',
son: [{ f: 'ご出張になる', r: 'ごしゅっちょうに なる' }],
ken: [{ f: '出張いたす', r: 'しゅっちょういたす', t: 2 }]
},
{
plain: '入院する', reading: 'にゅういんする', en: 'be hospitalised', level: 'N3',
son: [{ f: 'ご入院になる', r: 'ごにゅういんに なる' }, { f: 'ご入院なさる', r: 'ごにゅういん なさる' }],
ken: [{ f: '入院いたす', r: 'にゅういんいたす', t: 2 }]
},
{
plain: '見舞う', reading: 'みまう', en: 'visit the sick', level: 'N2',
son: [{ f: 'お見舞いになる', r: 'おみまいに なる' }],
ken: [{ f: 'お見舞い申し上げる', r: 'おみまい もうしあげる', t: 1 }],
note: 'お見舞い申し上げます also covers sympathy after a disaster.'
},
{
plain: '寄る', reading: 'よる', en: 'drop by', level: 'N3',
son: [{ f: 'お寄りになる', r: 'およりに なる' }],
ken: [{ f: '立ち寄らせていただく', r: 'たちよらせて いただく', t: 1 }],
note: 'お立ち寄りください is the standard invitation on shop flyers.'
},
{
plain: '集まる', reading: 'あつまる', en: 'gather, assemble', level: 'N4',
son: [{ f: 'お集まりになる', r: 'おあつまりに なる' }],
ken: [],
note: 'お集まりいただきありがとうございます thanks an audience for coming.'
},
{
plain: '集める', reading: 'あつめる', en: 'collect', level: 'N4',
son: [{ f: 'お集めになる', r: 'おあつめに なる' }],
ken: [{ f: 'お集めする', r: 'おあつめする', t: 1 }]
},
{
plain: '開催する', reading: 'かいさいする', en: 'hold an event', level: 'N2',
son: [{ f: 'ご開催になる', r: 'ごかいさいに なる' }],
ken: [{ f: '開催いたす', r: 'かいさいいたす', t: 2 }],
note: '開催させていただきます is common on invitations and notices.'
},
{
plain: '開ける', reading: 'あける', en: 'open', level: 'N5',
son: [{ f: 'お開けになる', r: 'おあけに なる' }],
ken: [{ f: 'お開けする', r: 'おあけする', t: 1 }]
},
{
plain: '閉める', reading: 'しめる', en: 'close', level: 'N5',
son: [{ f: 'お閉めになる', r: 'おしめに なる' }],
ken: [{ f: 'お閉めする', r: 'おしめする', t: 1 }]
},
{
plain: '置く', reading: 'おく', en: 'put, place', level: 'N5',
son: [{ f: 'お置きになる', r: 'おおきに なる' }],
ken: [{ f: 'お置きする', r: 'おおきする', t: 1 }]
},
{
plain: '取る', reading: 'とる', en: 'take, pick up', level: 'N5',
son: [{ f: 'お取りになる', r: 'おとりに なる' }],
ken: [{ f: 'お取りする', r: 'おとりする', t: 1 }],
note: 'ご自由にお取りください means please help yourself.'
},
{
plain: '渡す', reading: 'わたす', en: 'hand over', level: 'N4',
son: [{ f: 'お渡しになる', r: 'おわたしに なる' }],
ken: [{ f: 'お渡しする', r: 'おわたしする', t: 1 }]
},
{
plain: '受ける', reading: 'うける', en: 'receive, take (an exam)', level: 'N4',
son: [{ f: 'お受けになる', r: 'おうけに なる' }],
ken: [{ f: 'お受けする', r: 'おうけする', t: 1 }],
note: 'お受けいたしかねます is the formal refusal of a request.'
},
{
plain: '調べる', reading: 'しらべる', en: 'look into, check', level: 'N4',
son: [{ f: 'お調べになる', r: 'おしらべに なる' }],
ken: [{ f: 'お調べする', r: 'おしらべする', t: 1 }],
note: '確認いたします is the more usual business phrasing.'
},
{
plain: '探す', reading: 'さがす', en: 'look for', level: 'N4',
son: [{ f: 'お探しになる', r: 'おさがしに なる' }],
ken: [{ f: 'お探しする', r: 'おさがしする', t: 1 }],
note: '何かお探しでしょうか is the standard shop-floor opener.'
},
{
plain: '見つける', reading: 'みつける', en: 'find', level: 'N4',
son: [{ f: 'お見つけになる', r: 'おみつけに なる' }],
ken: []
},
{
plain: '作る', reading: 'つくる', en: 'make', level: 'N5',
son: [{ f: 'お作りになる', r: 'おつくりに なる' }],
ken: [{ f: 'お作りする', r: 'おつくりする', t: 1 }]
},
{
plain: '直す', reading: 'なおす', en: 'fix, correct', level: 'N4',
son: [{ f: 'お直しになる', r: 'おなおしに なる' }],
ken: [{ f: 'お直しする', r: 'おなおしする', t: 1 }]
},
{
plain: '運ぶ', reading: 'はこぶ', en: 'carry, transport', level: 'N4',
son: [{ f: 'お運びになる', r: 'おはこびに なる' }],
ken: [{ f: 'お運びする', r: 'おはこびする', t: 1 }],
note: 'お運びいただき is a formal thanks to someone for making the journey.'
},
{
plain: '片付ける', reading: 'かたづける', en: 'tidy up', level: 'N3',
son: [{ f: 'お片付けになる', r: 'おかたづけに なる' }],
ken: [{ f: 'お片付けする', r: 'おかたづけする', t: 1 }]
},
{
plain: '洗う', reading: 'あらう', en: 'wash', level: 'N5',
son: [{ f: 'お洗いになる', r: 'おあらいに なる' }],
ken: [{ f: 'お洗いする', r: 'おあらいする', t: 1 }]
},
{
plain: '記入する', reading: 'きにゅうする', en: 'fill in', level: 'N3',
son: [{ f: 'ご記入になる', r: 'ごきにゅうに なる' }],
ken: [{ f: '記入いたす', r: 'きにゅういたす', t: 2 }],
note: 'ご記入ください is the standard instruction on paperwork.'
},
{
plain: '署名する', reading: 'しょめいする', en: 'sign', level: 'N2',
son: [{ f: 'ご署名になる', r: 'ごしょめいに なる' }],
ken: [{ f: '署名いたす', r: 'しょめいいたす', t: 2 }],
note: 'ご署名ください on contracts, ご記名ください on registers.'
},
{
plain: '押す', reading: 'おす', en: 'push, press', level: 'N5',
son: [{ f: 'お押しになる', r: 'おおしに なる' }],
ken: [],
note: 'Signs prefer the noun form: 押しボタンをお押しください.'
},
{
plain: '申し込む', reading: 'もうしこむ', en: 'apply, sign up', level: 'N3',
son: [{ f: 'お申し込みになる', r: 'おもうしこみに なる' }],
ken: [{ f: 'お申し込みする', r: 'おもうしこみする', t: 1 }],
note: 'The 申 here is lexical, not humble — お申し込みになる is not a direction error.'
},
{
plain: '応募する', reading: 'おうぼする', en: 'apply for', level: 'N2',
son: [{ f: 'ご応募になる', r: 'ごおうぼに なる' }],
ken: [{ f: '応募いたす', r: 'おうぼいたす', t: 2 }]
},
{
plain: '報告する', reading: 'ほうこくする', en: 'report', level: 'N3',
son: [{ f: 'ご報告になる', r: 'ごほうこくに なる' }],
ken: [{ f: 'ご報告する', r: 'ごほうこくする', t: 1 }, { f: 'ご報告申し上げる', r: 'ごほうこく もうしあげる', t: 1 }],
note: 'ご報告申し上げます belongs in writing rather than speech.'
},
{
plain: '契約する', reading: 'けいやくする', en: 'sign a contract', level: 'N2',
son: [{ f: 'ご契約になる', r: 'ごけいやくに なる' }],
ken: [{ f: '契約いたす', r: 'けいやくいたす', t: 2 }]
},
{
plain: '発表する', reading: 'はっぴょうする', en: 'announce, present', level: 'N3',
son: [{ f: 'ご発表になる', r: 'ごはっぴょうに なる' }, { f: 'ご発表なさる', r: 'ごはっぴょう なさる' }],
ken: [{ f: '発表いたす', r: 'はっぴょういたす', t: 2 }]
},
{
plain: '紹介する', reading: 'しょうかいする', en: 'introduce', level: 'N4',
son: [{ f: 'ご紹介になる', r: 'ごしょうかいに なる' }],
ken: [{ f: 'ご紹介する', r: 'ごしょうかいする', t: 1 }],
note: 'ご紹介にあずかりました〇〇です is the set opening after being introduced.'
},
{
plain: '手配する', reading: 'てはいする', en: 'arrange', level: 'N2',
son: [{ f: 'ご手配になる', r: 'ごてはいに なる' }],
ken: [{ f: 'ご手配する', r: 'ごてはいする', t: 1 }]
},
{
plain: '準備する', reading: 'じゅんびする', en: 'prepare', level: 'N4',
son: [{ f: 'ご準備になる', r: 'ごじゅんびに なる' }],
ken: [{ f: 'ご準備する', r: 'ごじゅんびする', t: 1 }]
},
{
plain: '用意する', reading: 'よういする', en: 'get ready, provide', level: 'N4',
son: [{ f: 'ご用意になる', r: 'ごよういに なる' }],
ken: [{ f: 'ご用意する', r: 'ごよういする', t: 1 }],
note: 'ご用意しております is standard when something is waiting for a guest.'
},
{
plain: '願う', reading: 'ねがう', en: 'wish, request', level: 'N4',
son: [{ f: 'お願いになる', r: 'おねがいに なる' }],
ken: [{ f: 'お願い申し上げる', r: 'おねがい もうしあげる', t: 1 }],
note: '何卒よろしくお願い申し上げます closes most formal letters.'
},
{
plain: '望む', reading: 'のぞむ', en: 'hope for, desire', level: 'N2',
son: [{ f: 'お望みになる', r: 'おのぞみに なる' }],
ken: [],
note: 'ご希望 is the noun used on forms and in service settings.'
},
{
plain: '期待する', reading: 'きたいする', en: 'expect, look forward to', level: 'N2',
son: [{ f: 'ご期待になる', r: 'ごきたいに なる' }, { f: 'ご期待なさる', r: 'ごきたい なさる' }],
ken: [{ f: '期待いたす', r: 'きたいいたす', t: 2 }],
note: 'ご期待ください is the standard teaser line in announcements.'
},
{
plain: '信じる', reading: 'しんじる', en: 'believe', level: 'N3',
son: [{ f: 'お信じになる', r: 'おしんじに なる' }],
ken: []
},
{
plain: '賛成する', reading: 'さんせいする', en: 'agree, approve', level: 'N3',
son: [{ f: 'ご賛成になる', r: 'ごさんせいに なる' }],
ken: [{ f: '賛成いたす', r: 'さんせいいたす', t: 2 }]
},
{
plain: '遠慮する', reading: 'えんりょする', en: 'refrain, hold back', level: 'N3',
son: [{ f: 'ご遠慮になる', r: 'ごえんりょに なる' }],
ken: [{ f: '遠慮させていただく', r: 'えんりょさせて いただく', t: 1 }],
note: 'ご遠慮ください is the polite prohibition seen on signs.'
},
{
plain: '辞退する', reading: 'じたいする', en: 'decline an offer', level: 'N1',
son: [{ f: 'ご辞退になる', r: 'ごじたいに なる' }],
ken: [{ f: '辞退させていただく', r: 'じたいさせて いただく', t: 1 }]
},
{
plain: '参列する', reading: 'さんれつする', en: 'attend a ceremony', level: 'N1',
son: [{ f: 'ご参列になる', r: 'ごさんれつに なる' }],
ken: [{ f: '参列いたす', r: 'さんれついたす', t: 2 }],
note: 'ご参列 belongs to weddings and funerals; ご出席 covers ordinary events.'
},
{
plain: '帰国する', reading: 'きこくする', en: 'return to your country', level: 'N3',
son: [{ f: 'ご帰国になる', r: 'ごきこくに なる' }],
ken: [{ f: '帰国いたす', r: 'きこくいたす', t: 2 }]
},
{
plain: '訪問する', reading: 'ほうもんする', en: 'visit', level: 'N3',
son: [{ f: 'ご訪問になる', r: 'ごほうもんに なる' }],
ken: [{ f: '訪問いたす', r: 'ほうもんいたす', t: 2 }],
note: 'お伺いする is the more natural humble form when calling on a client.'
},
{
plain: '面会する', reading: 'めんかいする', en: 'meet, have an interview', level: 'N2',
son: [{ f: 'ご面会になる', r: 'ごめんかいに なる' }],
ken: [{ f: '面会いたす', r: 'めんかいいたす', t: 2 }],
note: 'お目にかかる is warmer and far more common in speech.'
},
{
plain: '掃除する', reading: 'そうじする', en: 'clean', level: 'N4',
son: [{ f: 'お掃除になる', r: 'おそうじに なる' }],
ken: [{ f: 'お掃除する', r: 'おそうじする', t: 1 }],
note: 'This is one of the Sino-Japanese words that takes お rather than ご.'
},
{
plain: '料理する', reading: 'りょうりする', en: 'cook', level: 'N4',
son: [{ f: 'お料理なさる', r: 'おりょうり なさる' }],
ken: [{ f: 'お料理する', r: 'おりょうりする', t: 1 }],
note: 'お料理 is also plain 美化語 when it simply means food.'
},
{
plain: '数える', reading: 'かぞえる', en: 'count', level: 'N4',
son: [{ f: 'お数えになる', r: 'おかぞえに なる' }],
ken: [{ f: 'お数えする', r: 'おかぞえする', t: 1 }]
},
{
plain: '触る', reading: 'さわる', en: 'touch', level: 'N4',
son: [{ f: 'お触りになる', r: 'おさわりに なる' }],
ken: [],
note: 'お手を触れないでください is the museum-sign phrasing.'
},
{
plain: '使用する', reading: 'しようする', en: 'use, operate', level: 'N3',
son: [{ f: 'ご使用になる', r: 'ごしように なる' }],
ken: [{ f: '使用いたす', r: 'しよういたす', t: 2 }],
note: 'ご使用になれます is the potential form found in manuals.'
},
{
plain: '参照する', reading: 'さんしょうする', en: 'refer to', level: 'N1',
son: [{ f: 'ご参照になる', r: 'ごさんしょうに なる' }],
ken: [{ f: '参照いたす', r: 'さんしょういたす', t: 2 }],
note: 'ご参照ください is the standard cross-reference in documents.'
},
{
plain: '承諾する', reading: 'しょうだくする', en: 'consent, agree to', level: 'N1',
son: [{ f: 'ご承諾になる', r: 'ごしょうだくに なる' }],
ken: [{ f: '承諾いたす', r: 'しょうだくいたす', t: 2 }],
note: 'ご承諾いただけますでしょうか is the formal way to ask for agreement.'
},
{
plain: '発送する', reading: 'はっそうする', en: 'ship, dispatch', level: 'N2',
son: [{ f: 'ご発送になる', r: 'ごはっそうに なる' }],
ken: [{ f: '発送いたす', r: 'はっそういたす', t: 2 }],
note: '本日発送いたしました is the standard shipping notification.'
}
],

// ===================== FORMATION PATTERNS =====================

patterns: [
{
group: '尊敬語', groupId: 'sonkeigo',
id: 'o-ni-naru',
form: 'お + ます-stem + になる',
strength: 'standard',
body: 'The main productive respectful pattern. Take the ます-stem, wrap it in お〜になる. Sino-Japanese verbs take ご instead.',
examples: [
{ jp: '読む → お読みになる', en: 'reads' },
{ jp: '待つ → お待ちになる', en: 'waits' },
{ jp: '利用する → ご利用になる', en: 'uses' }
],
warn: 'Fails on one-mora stems: ×お見になる, ×お寝になる. Use the special verb instead.'
},
{
group: '尊敬語', groupId: 'sonkeigo',
id: 'rareru',
form: '〜れる / 〜られる',
strength: 'light',
body: 'The passive form doubles as a light honorific. Quick to produce and common in spoken business Japanese, but it is the weakest respectful form and can be misread as passive or potential.',
examples: [
{ jp: '読む → 読まれる', en: 'reads' },
{ jp: '来る → 来られる', en: 'comes' },
{ jp: '出席する → 出席される', en: 'attends' }
],
warn: 'Ambiguous. 社長が話された could be respectful, passive, or potential.'
},
{
group: '尊敬語', groupId: 'sonkeigo',
id: 'o-desu',
form: 'お + ます-stem + です',
strength: 'light',
body: 'A compact respectful statement of someone\'s current state. Shorter than お〜になっている.',
examples: [
{ jp: 'お急ぎですか', en: 'Are you in a hurry?' },
{ jp: 'チケットをお持ちですか', en: 'Do you have a ticket?' },
{ jp: '何をお探しですか', en: 'What are you looking for?' }
]
},
{
group: '尊敬語', groupId: 'sonkeigo',
id: 'o-kudasai',
form: 'お + ます-stem + ください',
strength: 'standard',
body: 'The respectful request. ご + Sino-Japanese noun + ください for kanji compounds.',
examples: [
{ jp: '少々お待ちください', en: 'Please wait a moment.' },
{ jp: 'ご確認ください', en: 'Please confirm.' },
{ jp: 'こちらにお掛けください', en: 'Please have a seat here.' }
],
warn: 'Still an imperative. Softer options: お待ちいただけますか / お待ちいただけますでしょうか.'
},
{
group: '尊敬語', groupId: 'sonkeigo',
id: 'te-irassharu',
form: '〜ていらっしゃる',
strength: 'strong',
body: 'Respectful progressive — the honorific counterpart of 〜ている.',
examples: [
{ jp: '待っていらっしゃる', en: 'is waiting' },
{ jp: '何をなさっていらっしゃいますか', en: 'What do you do?' }
]
},
{
group: '尊敬語', groupId: 'sonkeigo',
id: 'go-noun-nasaru',
form: 'ご + 漢語動詞の語幹 + なさる',
strength: 'standard',
body: 'A respectful alternative to される for Sino-Japanese verbs, built on なさる instead of the passive/potential form. Reads as clearly respectful, never ambiguous.',
examples: [
{ jp: '利用する → ご利用なさる', en: 'uses' },
{ jp: '出席する → ご出席なさる', en: 'attends' },
{ jp: '注文する → ご注文なさる', en: 'orders' }
],
warn: 'Slightly stiffer than ご利用になる in everyday speech; common in written notices.'
},
{
group: '謙譲語Ⅰ', groupId: 'kenjo1',
id: 'o-suru',
form: 'お + ます-stem + する / いたす',
strength: 'standard',
body: 'The main productive humble pattern, for actions aimed at someone you respect. いたす raises the formality a further step.',
examples: [
{ jp: '持つ → お持ちします', en: "I'll carry it (for you)." },
{ jp: '送る → お送りいたします', en: "I'll send it." },
{ jp: '案内する → ご案内いたします', en: "I'll show you the way." }
],
warn: 'Only when the action reaches someone. Your own private reading is not ×本をお読みします.'
},
{
group: '謙譲語Ⅰ', groupId: 'kenjo1',
id: 'te-itadaku',
form: '〜ていただく',
strength: 'standard',
body: 'Humbly receiving an action from someone. The workhorse of polite requests.',
examples: [
{ jp: '教えていただけますか', en: 'Could you tell me?' },
{ jp: 'ご確認いただけますでしょうか', en: 'Could you please confirm?' },
{ jp: 'お待ちいただけますか', en: 'Could you wait?' }
]
},
{
group: '謙譲語Ⅰ', groupId: 'kenjo1',
id: 'sasete-itadaku',
form: '〜させていただく',
strength: 'strong',
body: 'Literally "I humbly receive permission to do X". Legitimate when you genuinely need the other party\'s consent, or benefit from it.',
examples: [
{ jp: '説明させていただきます', en: 'Allow me to explain.' },
{ jp: '検討させていただきます', en: "We'll consider it." }
],
warn: 'Heavily overused. If nobody is granting permission, use いたします. ×本日休業させていただきます → ○本日休業いたします.'
},
{
group: '謙譲語Ⅰ', groupId: 'kenjo1',
id: 'o-moushiageru',
form: 'お/ご + noun + 申し上げる',
strength: 'strong',
body: 'The most formal humble frame, mostly written.',
examples: [
{ jp: 'お願い申し上げます', en: 'I humbly request.' },
{ jp: 'お詫び申し上げます', en: 'I sincerely apologise.' },
{ jp: 'ご案内申し上げます', en: 'We respectfully inform you.' }
]
},
{
group: '謙譲語Ⅱ', groupId: 'kenjo2',
id: 'gozonji-vs-zonjiru',
form: 'ご存じ (尊敬語) / 存じる・存じ上げる (謙譲語Ⅱ)',
strength: 'standard',
body: 'ご存じ is respectful "know"; 存じる is the humble counterpart for facts and things, 存じ上げる specifically for people.',
examples: [
{ jp: '先生はご存じですか', en: 'Does the teacher know?' },
{ jp: 'その件は存じております', en: 'I am aware of that matter.' },
{ jp: '田中様のことは存じ上げております', en: 'I am acquainted with Mr. Tanaka.' }
],
warn: 'Swapping ご存じ and 存じる reverses who the sentence respects.'
},
{
group: '丁寧語', groupId: 'teineigo',
id: 'gozaimasu',
form: '〜でございます',
strength: 'strong',
body: 'A more formal です. Standard on the phone, at reception, and in announcements.',
examples: [
{ jp: '田中でございます', en: 'This is Tanaka.' },
{ jp: 'お手洗いは奥にございます', en: 'The restroom is at the back.' }
],
warn: 'Describes things and yourself, not the listener. Use 田中様でいらっしゃいますか, not ×田中様でございますか.'
},
{
group: '丁寧語', groupId: 'teineigo',
id: 'masu-stem-formal-nouns',
form: 'お/ご + noun (fixed politeness)',
strength: 'light',
body: 'A layer of everyday nouns take お/ご as a fixed part of polite speech rather than a live grammatical choice — dropping the prefix sounds blunt rather than neutral.',
examples: [
{ jp: 'お水・お箸・お手洗い', en: 'fixed polite nouns' },
{ jp: 'ご飯・ご馳走', en: 'fused beautifications' }
],
warn: 'These differ from 美化語 proper in that many now function as the neutral, unmarked word.'
},
{
group: '美化語', groupId: 'bikago',
id: 'o-go-prefix',
form: 'お + native word / ご + Sino-Japanese word',
strength: 'light',
body: 'The prefix follows word origin: native readings take お, kanji compounds take ご. Exceptions are frozen and must be memorised.',
examples: [
{ jp: 'お名前・お手紙・お時間', en: 'native (kun) readings' },
{ jp: 'ご住所・ご意見・ご家族', en: 'Sino-Japanese (on) readings' },
{ jp: 'お電話・お食事・お礼', en: 'exceptions taking お despite kanji readings' }
],
warn: 'Never attach to loanwords: ×おコーヒー, ×おビール.'
},
{
group: '尊敬語', groupId: 'sonkeigo',
id: 'o-ni-narareru',
form: 'お + ます-stem + になられる',
strength: 'strong',
body: 'A stacked variant of お〜になる that some speakers use for extra formality, though many style guides flag it as redundant.',
examples: [
{ jp: '読む → お読みになられる', en: 'reads (extra formal, contested)' },
{ jp: '出席する → ご出席になられる', en: 'attends (contested)' }
],
warn: 'Widely treated as 二重敬語 in style guides, though it appears in real speech. Prefer plain お〜になる.'
},
{
group: '尊敬語', groupId: 'sonkeigo',
id: 'meshi-prefix',
form: '召し〜 (fixed respectful compounds)',
strength: 'standard',
body: 'A small family of respectful compounds built on 召す, covering eating, wearing, catching illness, and liking — each idiomatic rather than productive.',
examples: [
{ jp: '風邪を召す', en: 'catch a cold (respectful)' },
{ jp: 'お年を召す', en: 'grow older (respectful)' },
{ jp: 'お気に召す', en: 'find pleasing (respectful)' }
],
warn: 'These do not generalise — you cannot build new 召し〜 compounds freely.'
},
{
group: '謙譲語Ⅰ', groupId: 'kenjo1',
id: 'hai-prefix',
form: '拝 + 漢語動詞 (fixed humble compounds)',
strength: 'strong',
body: 'A cluster of Sino-Japanese verbs prefixed with 拝, all humble and mostly written or highly formal spoken register.',
examples: [
{ jp: '拝見する', en: 'see, look at (humble)' },
{ jp: '拝借する', en: 'borrow (humble)' },
{ jp: '拝読する', en: 'read (humble)' }
],
warn: 'Closed set — do not attach 拝 to arbitrary Sino-Japanese verbs.'
},
{
group: '謙譲語Ⅰ', groupId: 'kenjo1',
id: 'o-mimai-mousiageru',
form: 'お/ご + noun + 申し上げる (extended)',
strength: 'strong',
body: 'The same frame as お願い申し上げます extends to a wider set of formal written nouns for greetings, thanks, and condolences.',
examples: [
{ jp: 'お慶び申し上げます', en: 'I offer my congratulations.' },
{ jp: 'お見舞い申し上げます', en: 'I extend my sympathies (illness).' },
{ jp: 'お悔やみ申し上げます', en: 'My condolences.' }
],
warn: 'Register is formal written Japanese — sounds stiff if spoken casually.'
},
{
group: '丁寧語', groupId: 'teineigo',
id: 'de-gozaimasu-question',
form: '〜でしょうか / 〜でございましょうか',
strength: 'standard',
body: 'Softens a direct question into a tentative, polite one — very common in service and customer-facing speech.',
examples: [
{ jp: 'こちらでよろしいでしょうか', en: 'Is this all right?' },
{ jp: '何をお探しでしょうか', en: 'What are you looking for?' }
],
warn: 'でございましょうか is unusually formal; でしょうか alone suffices in most settings.'
},
{
group: '美化語', groupId: 'bikago',
id: 'bikago-verbs',
form: 'お + verb stem (light beautification)',
strength: 'light',
body: 'A handful of everyday verbs take お as pure refinement rather than showing respect to anyone, mostly in domestic or feminine-coded speech.',
examples: [
{ jp: 'お洗濯', en: 'laundry (refined)' },
{ jp: 'お掃除', en: 'cleaning (refined)' },
{ jp: 'お料理', en: 'cooking (refined)' }
],
warn: 'Overusing this register outside its typical context can sound old-fashioned or overly formal for the setting.'
},
{
group: '尊敬語', groupId: 'sonkeigo',
id: 'go-ni-naru',
form: 'ご + Sino-Japanese noun + になる',
strength: 'standard',
body: 'The ご counterpart of お〜になる, used with Sino-Japanese verbal nouns. If the verb is written する after a two-kanji compound, this is almost always the pattern you want.',
examples: [
{ jp: '利用する → ご利用になる', en: 'uses' },
{ jp: '出発する → ご出発になる', en: 'departs' },
{ jp: '確認する → ご確認になる', en: 'checks' }
],
warn: 'A handful of Sino-Japanese words take お instead: お食事, お掃除, お electricity-style loans. There is no rule; they are memorised.'
},
{
group: '尊敬語', groupId: 'sonkeigo',
id: 'nasaru-suffix',
form: 'Sino-Japanese noun + なさる',
strength: 'standard',
body: 'なさる replaces する directly. Slightly warmer and more spoken than ご〜になる, and very common with words describing life events.',
examples: [
{ jp: '結婚する → ご結婚なさる', en: 'gets married' },
{ jp: '心配する → ご心配なさる', en: 'worries' },
{ jp: '発表する → ご発表なさる', en: 'announces' }
],
warn: 'なさる conjugates irregularly: なさいます, なさいません — never ×なさります.'
},
{
group: '尊敬語', groupId: 'sonkeigo',
id: 'te-kudasaru',
form: '〜てくださる',
strength: 'standard',
body: 'Marks an action someone did for your benefit while raising them. The mirror image of 〜ていただく, which lowers you instead. Both describe the same event; they differ in whose side the sentence stands on.',
examples: [
{ jp: '先生が教えてくださいました', en: 'The teacher kindly taught me.' },
{ jp: 'ご確認くださりありがとうございます', en: 'Thank you for checking.' },
{ jp: 'お越しくださいまして光栄です', en: 'It is an honour that you came.' }
],
warn: 'くださる is another irregular -aru verb: くださいます, not ×くださります.'
},
{
group: '尊敬語', groupId: 'sonkeigo',
id: 'o-ni-nareru',
form: 'お + ます-stem + になれる',
strength: 'standard',
body: 'The potential of お〜になる — used to tell someone politely what they are able to do. Manuals, signage and service announcements rely on it heavily.',
examples: [
{ jp: 'こちらでお休みになれます', en: 'You can rest here.' },
{ jp: 'カードでお支払いになれます', en: 'You may pay by card.' },
{ jp: '二階でご利用になれます', en: 'It is available on the second floor.' }
],
warn: 'お〜できます is the humble-shaped alternative and lowers you, so it is wrong for describing what the customer can do.'
},
{
group: '尊敬語', groupId: 'sonkeigo',
id: 'o-adjective',
form: 'お / ご + adjective',
strength: 'light',
body: 'Adjectives describing the other person take the prefix too. Native adjectives take お, Sino-Japanese ones take ご.',
examples: [
{ jp: 'お忙しいところ恐れ入ります', en: 'Sorry to trouble you when you are busy.' },
{ jp: 'お元気そうで何よりです', en: 'I am glad you look well.' },
{ jp: 'ご不安な点はございませんか', en: 'Do you have any concerns?' }
],
warn: 'Do not apply it to yourself: ×私はお忙しいです.'
},
{
group: '尊敬語', groupId: 'sonkeigo',
id: 'son-prefix-nouns',
form: '貴 / 御 + noun',
strength: 'strong',
body: 'Fixed prefixes that raise a noun belonging to the other side. 御社 is spoken, 貴社 is written — using the wrong one is the classic job-hunting slip.',
examples: [
{ jp: '御社の理念に共感しております', en: 'I identify with your company philosophy.' },
{ jp: '貴社ますますご清栄のこととお慶び申し上げます', en: 'I trust your company continues to prosper.' },
{ jp: '貴殿のご意見を賜りたく存じます', en: 'I should like to receive your opinion.' }
],
warn: '貴殿 is stiff and male-leaning in tone; ご担当者様 is safer in ordinary correspondence.'
},
{
group: '尊敬語', groupId: 'sonkeigo',
id: 'sama-dono-onchu',
form: '様 / 殿 / 御中 / 各位',
strength: 'standard',
body: 'Address suffixes are keigo too. 様 for a named person, 御中 for an organisation, 各位 for a group, 殿 only in stiff internal documents.',
examples: [
{ jp: '田中様', en: 'Mr/Ms Tanaka' },
{ jp: '株式会社〇〇 御中', en: 'To 〇〇 Co., Ltd.' },
{ jp: '関係者各位', en: 'To all concerned' }
],
warn: 'Never combine them: ×〇〇株式会社御中 田中様 on one line, and never ×お客様各位様.'
},
{
group: '尊敬語', groupId: 'sonkeigo',
id: 'oide-okoshi',
form: 'おいでになる / お越しになる / お見えになる',
strength: 'standard',
body: 'Three respectful ways to say someone comes. お越しになる is the warmest in service settings, お見えになる suggests an expected visitor, おいでになる also covers going and being.',
examples: [
{ jp: '本日はお越しくださりありがとうございます', en: 'Thank you for coming today.' },
{ jp: 'お客様がお見えになりました', en: 'The visitor has arrived.' },
{ jp: '明日はどちらへおいでになりますか', en: 'Where are you going tomorrow?' }
],
warn: 'いらっしゃる covers all three meanings and is never wrong — reach for it when unsure.'
},
{
group: '尊敬語', groupId: 'sonkeigo',
id: 'o-ni-narimasen-ka',
form: 'お + ます-stem + になりませんか',
strength: 'standard',
body: 'A respectful invitation. The negative question softens it further: you are offering rather than instructing.',
examples: [
{ jp: '少しお休みになりませんか', en: 'Would you like to rest a while?' },
{ jp: 'こちらをご覧になりませんか', en: 'Would you care to look at this?' },
{ jp: 'お召し上がりになりませんか', en: 'Would you like to eat?' }
],
warn: 'For a real instruction use お〜ください; this pattern reads as an offer that can be refused.'
},
{
group: '尊敬語', groupId: 'sonkeigo',
id: 'son-nouns',
form: 'お / ご + noun belonging to the other person',
strength: 'standard',
body: 'The prefix raises anything that belongs to, comes from, or concerns the person you respect — their name, opinion, family, schedule.',
examples: [
{ jp: 'お名前を頂戴できますか', en: 'May I have your name?' },
{ jp: 'ご意見をお聞かせください', en: 'Please let me hear your opinion.' },
{ jp: 'ご都合はいかがでしょうか', en: 'How does your schedule look?' }
],
warn: 'This looks identical to 美化語 in form. The difference is whether the noun points at someone: お茶 on its own is decoration, お名前 is respect.'
},
{
group: '尊敬語', groupId: 'sonkeigo',
id: 'rareru-kango',
form: 'ご + Sino-Japanese noun + される',
strength: 'light',
body: 'Extremely common in spoken business Japanese and treated as acceptable by many style guides, but contested: ご already carries respect, so される can read as a second layer.',
examples: [
{ jp: 'ご利用されますか', en: 'Will you be using it?' },
{ jp: 'ご確認されましたか', en: 'Have you checked?' },
{ jp: 'ご出席されるそうです', en: 'I hear they will attend.' }
],
warn: 'Safe rewrite in every case: ご利用になりますか / ご確認になりましたか. Use those in writing and in exams.'
},
{
group: '尊敬語', groupId: 'sonkeigo',
id: 'son-set-greetings',
form: 'いらっしゃいませ / お帰りなさいませ',
strength: 'strong',
body: 'Fully lexicalised respectful greetings. The ませ ending survives only in these fossils and in service speech, where it adds warmth without adding a grammatical layer.',
examples: [
{ jp: 'いらっしゃいませ', en: 'Welcome. (entering a shop)' },
{ jp: 'お帰りなさいませ', en: 'Welcome back.' },
{ jp: '少々お待ちくださいませ', en: 'One moment, please.' }
],
warn: 'ませ outside these fixed forms sounds theatrical: ×ご確認くださいませんませ.'
},
{
group: '尊敬語', groupId: 'sonkeigo',
id: 'son-negative-request',
form: 'ご遠慮ください / お控えください',
strength: 'standard',
body: 'The polite prohibition. Both frame a ban as something you are asking the listener to choose, which is why public signage prefers them to 禁止.',
examples: [
{ jp: '車内での通話はご遠慮ください', en: 'Please refrain from phone calls in the carriage.' },
{ jp: '再入場はお控えください', en: 'Please refrain from re-entering.' },
{ jp: '撮影はご遠慮願います', en: 'We ask that you refrain from photography.' }
],
warn: 'ご遠慮ください is a request in form only — it is a prohibition in practice, and answering it as a genuine choice will not go well.'
},
{
group: '尊敬語', groupId: 'sonkeigo',
id: 'son-chain',
form: '敬語連結 — two verbs, one layer each',
strength: 'standard',
body: 'Chaining a respectful te-form onto another respectful verb is legitimate, because each verb carries only one layer. This is what separates 敬語連結 from 二重敬語.',
examples: [
{ jp: 'お読みになっていらっしゃる', en: 'is reading' },
{ jp: 'お帰りになっていらっしゃいました', en: 'had gone home' },
{ jp: 'ご覧になってくださる', en: 'kindly looks at it' }
],
warn: 'The test is per verb: お読みになられる stacks two layers on one verb and is 二重敬語; the forms above do not.'
},
{
group: '謙譲語Ⅰ', groupId: 'kenjo1',
id: 'o-itasu',
form: 'お + ます-stem + いたす',
strength: 'strong',
body: 'A notch above お〜する. The いたす contributes 謙譲語Ⅱ courtesy on top of the 謙譲語Ⅰ direction, which is why it feels more formal without being a stacking error.',
examples: [
{ jp: 'お待ちいたします', en: 'I will wait.' },
{ jp: 'お送りいたします', en: 'I will send it.' },
{ jp: 'お知らせいたします', en: 'I will inform you.' }
],
warn: 'Reserve it for real formality; in casual office speech お待ちします is enough.'
},
{
group: '謙譲語Ⅰ', groupId: 'kenjo1',
id: 'go-suru',
form: 'ご + Sino-Japanese noun + する / いたす',
strength: 'standard',
body: 'The ご version of お〜する, for Sino-Japanese verbs whose action reaches the person you respect.',
examples: [
{ jp: 'ご案内いたします', en: 'I will show you the way.' },
{ jp: 'ご説明いたします', en: 'I will explain.' },
{ jp: 'ご連絡いたします', en: 'I will be in touch.' }
],
warn: 'Only works when the action touches the listener. ×ご出席します is wrong because attending does not reach them — say 出席いたします.'
},
{
group: '謙譲語Ⅰ', groupId: 'kenjo1',
id: 'te-sashiageru',
form: '〜てさしあげる',
strength: 'standard',
body: 'Humble form of 〜てあげる. Grammatically correct but socially risky: it advertises that you are doing someone a favour.',
examples: [
{ jp: 'お荷物をお持ちしましょうか', en: 'Shall I carry your bag? (preferred)' },
{ jp: '案内してさしあげてください', en: 'Please show them the way. (third-party instruction)' },
{ jp: '母に読んでさしあげた', en: 'I read it to my mother.' }
],
warn: 'Almost never say it to the beneficiary directly. お〜しましょうか sounds helpful; 〜てさしあげましょうか sounds condescending.'
},
{
group: '謙譲語Ⅰ', groupId: 'kenjo1',
id: 'te-itadakemasu-ka',
form: '〜ていただけますか / いただけませんか',
strength: 'standard',
body: 'The workhorse request form. The potential plus a question mark makes it an enquiry about possibility rather than a demand; the negative version is softer still.',
examples: [
{ jp: 'ご確認いただけますでしょうか', en: 'Could you confirm?' },
{ jp: 'もう一度お願いできませんでしょうか', en: 'Could I trouble you to repeat that?' },
{ jp: 'お時間をいただけますと幸いです', en: 'I would be grateful for some of your time.' }
],
warn: 'いただけますでしょうか is technically redundant but thoroughly established; いただけますか is the tighter choice in writing.'
},
{
group: '謙譲語Ⅰ', groupId: 'kenjo1',
id: 'kenjo-prefix-nouns',
form: '弊 / 小 / 拙 / 粗 + noun',
strength: 'strong',
body: 'Prefixes that lower your own side. The mirror image of 貴・御, and the pair is what makes business correspondence read as balanced.',
examples: [
{ jp: '弊社の担当者が伺います', en: 'Our representative will visit.' },
{ jp: '粗品ではございますが', en: 'It is only a small gift, but...' },
{ jp: '拙宅にお越しいただければ幸いです', en: 'I should be glad if you came to my home.' }
],
warn: '当社 is neutral rather than humble — fine internally, but 弊社 is expected when facing a client.'
},
{
group: '謙譲語Ⅰ', groupId: 'kenjo1',
id: 'o-me-ni-compounds',
form: 'お目にかかる / お目にかける',
strength: 'strong',
body: 'Two fixed humble compounds that are easy to confuse. かかる is you meeting them; かける is you showing them something.',
examples: [
{ jp: 'お目にかかれて光栄です', en: 'It is an honour to meet you.' },
{ jp: '資料をお目にかけます', en: 'I will show you the materials.' },
{ jp: '一度お目にかかりたく存じます', en: 'I should like to meet you once.' }
],
warn: '×お目にかけていただく inverts the direction — the other person looking is ご覧になる.'
},
{
group: '謙譲語Ⅰ', groupId: 'kenjo1',
id: 'onegai-forms',
form: 'お願いできますでしょうか',
strength: 'standard',
body: 'The most portable request frame in business Japanese. Attach it to a noun and you have a complete polite ask without conjugating anything.',
examples: [
{ jp: 'ご確認をお願いできますでしょうか', en: 'Could I ask you to confirm?' },
{ jp: '来週までにお願いできますと助かります', en: 'It would help if you could do it by next week.' },
{ jp: 'ご対応のほどよろしくお願いいたします', en: 'Thank you in advance for handling it.' }
],
warn: '〜のほど is a softener, not a direction word; overusing it is a common way to make email sound padded.'
},
{
group: '謙譲語Ⅰ', groupId: 'kenjo1',
id: 'itadakitaku-zonjimasu',
form: '〜ていただきたく存じます',
strength: 'strong',
body: 'Written-register request. 〜たく is the classical adverbial of 〜たい, and 存じます supplies the humble verb of thinking.',
examples: [
{ jp: 'ご検討いただきたく存じます', en: 'I should like you to consider it.' },
{ jp: 'ご教示いただきたく存じます', en: 'I should be grateful for your guidance.' },
{ jp: 'ご確認いただきたく、お願い申し上げます', en: 'I ask that you confirm.' }
],
warn: 'This belongs in letters and formal email. Spoken aloud in an ordinary meeting it sounds stilted.'
},
{
group: '謙譲語Ⅰ', groupId: 'kenjo1',
id: 'sasete-itadakitai',
form: '〜させていただきたく',
strength: 'strong',
body: 'The request form of させていただく: you are asking for the permission that させていただく assumes you already have.',
examples: [
{ jp: '明日お伺いさせていただきたく存じます', en: 'I should like to visit tomorrow.' },
{ jp: '一点確認させていただきたいのですが', en: 'I would like to check one thing.' },
{ jp: '同席させていただければ幸いです', en: 'I would be glad to be allowed to attend.' }
],
warn: 'Unlike bare させていただきます, this version is safe precisely because it does not presume the permission.'
},
{
group: '謙譲語Ⅰ', groupId: 'kenjo1',
id: 'mail-closers',
form: '何卒よろしくお願い申し上げます',
strength: 'strong',
body: 'The fixed closing of formal correspondence. 何卒 raises the register of よろしく, and 申し上げます supplies the humble verb.',
examples: [
{ jp: '何卒よろしくお願い申し上げます', en: 'I respectfully ask for your kind consideration.' },
{ jp: '引き続きよろしくお願いいたします', en: 'Thank you for your continued support.' },
{ jp: 'ご査収のほどよろしくお願い申し上げます', en: 'Please find the attached and confirm receipt.' }
],
warn: '申し上げます outranks いたします. Mixing registers within one email reads as inconsistent rather than polite.'
},
{
group: '謙譲語Ⅰ', groupId: 'kenjo1',
id: 'itadaku-vs-kudasaru',
form: '〜ていただく against 〜てくださる',
strength: 'standard',
body: 'Both describe the other person doing something for you. いただく makes you the subject receiving; くださる makes them the subject giving. Neither is more polite — they differ in whose side the sentence takes.',
examples: [
{ jp: 'ご確認いただきありがとうございます', en: 'Thank you for confirming. (I received it)' },
{ jp: 'ご確認くださりありがとうございます', en: 'Thank you for confirming. (you gave it)' },
{ jp: '教えていただけますか', en: 'Could you tell me?' }
],
warn: 'The request form only works with いただく: ×教えてくださいますか is possible but stiff, and ×教えてくださいませんか is the natural くださる request.'
},
{
group: '謙譲語Ⅰ', groupId: 'kenjo1',
id: 'o-suru-limits',
form: 'When お〜する does not apply',
strength: 'standard',
body: 'お〜する needs a target: the action has to reach the person you respect. Actions that touch nobody take 謙譲語Ⅱ instead.',
examples: [
{ jp: '資料をお送りします', en: 'I will send you the materials. (target: you)' },
{ jp: '明日出張いたします', en: 'I am travelling tomorrow. (no target)' },
{ jp: '駅まで参ります', en: 'I will go to the station. (no target)' }
],
warn: 'This is the single most common source of ×お〜します errors: ×お帰りします, ×お休みします, ×ご出席します.'
},
{
group: '謙譲語Ⅱ', groupId: 'kenjo2',
id: 'mairu',
form: '参る',
strength: 'standard',
body: 'The 丁重語 verb of coming and going. It lowers you toward whoever is listening, not toward a destination — so it works for places that deserve no respect at all.',
examples: [
{ jp: '電車が参ります', en: 'The train is arriving.' },
{ jp: '来週大阪へ参ります', en: 'I am going to Osaka next week.' },
{ jp: 'ただいま参ります', en: 'I am on my way.' }
],
warn: 'If the destination is the listener or their organisation, 伺う is expected instead.'
},
{
group: '謙譲語Ⅱ', groupId: 'kenjo2',
id: 'oru-te-oru',
form: 'おる / 〜ております',
strength: 'standard',
body: 'The 丁重語 of existing. As an auxiliary it turns any progressive into a courteous one, which is why it saturates phone and email Japanese.',
examples: [
{ jp: '田中は席を外しております', en: 'Tanaka is away from his desk.' },
{ jp: '承知しております', en: 'I am aware of it.' },
{ jp: '楽しみにしております', en: 'I am looking forward to it.' }
],
warn: 'おる is humble, so it never describes the listener: ×お客様がおられますか. Use いらっしゃいますか.'
},
{
group: '謙譲語Ⅱ', groupId: 'kenjo2',
id: 'mousu',
form: '申す',
strength: 'standard',
body: 'The 丁重語 of saying. Used for your own speech and for your own side, with no particular target required.',
examples: [
{ jp: '田中と申します', en: 'My name is Tanaka.' },
{ jp: '弊社の山田がそう申しておりました', en: 'Our Yamada said so.' },
{ jp: 'お礼を申し上げます', en: 'I offer my thanks.' }
],
warn: '申し上げる is 謙譲語Ⅰ and needs someone spoken to; 申す is 謙譲語Ⅱ and does not. Self-introductions take 申します.'
},
{
group: '謙譲語Ⅱ', groupId: 'kenjo2',
id: 'itasu',
form: 'いたす',
strength: 'standard',
body: 'The 丁重語 of doing. Replaces する in any formal statement about your own actions, whether or not anyone is affected.',
examples: [
{ jp: '失礼いたします', en: 'Excuse me.' },
{ jp: '本日は休業いたします', en: 'We are closed today.' },
{ jp: '準備いたします', en: 'I will prepare it.' }
],
warn: 'For actions that do reach the listener, お〜いたす adds the 謙譲語Ⅰ layer: お送りいたします rather than 送付いたします.'
},
{
group: '謙譲語Ⅱ', groupId: 'kenjo2',
id: 'zonjiru-teichou',
form: '存じる',
strength: 'standard',
body: 'The 丁重語 of knowing and thinking, for facts and things. Its 謙譲語Ⅰ partner 存じ上げる is reserved for people.',
examples: [
{ jp: 'その件は存じております', en: 'I am aware of the matter.' },
{ jp: '嬉しく存じます', en: 'I am pleased.' },
{ jp: '田中様は存じ上げております', en: 'I know Mr Tanaka.' }
],
warn: '×存じ上げません about a document is a common overcorrection — things take 存じません.'
},
{
group: '謙譲語Ⅱ', groupId: 'kenjo2',
id: 'kenjo1-vs-kenjo2-test',
form: 'The Ⅰ-or-Ⅱ test',
strength: 'standard',
body: 'Ask whether the action lands on somebody. If it does, use 謙譲語Ⅰ and point it at them. If it lands on nobody, use 謙譲語Ⅱ and simply be courteous to whoever is listening.',
examples: [
{ jp: '御社に伺います', en: 'I will visit your company. (Ⅰ — lands on you)' },
{ jp: '実家に参ります', en: 'I am going to my parents home. (Ⅱ — lands on nobody)' },
{ jp: '部長に申し上げました', en: 'I told the manager. (Ⅰ)' }
],
warn: 'This test also explains the ×ご出席します error: attending lands on nobody, so only 出席いたします works.'
},
{
group: '丁寧語', groupId: 'teineigo',
id: 'desu-masu-base',
form: 'です / ます',
strength: 'standard',
body: 'The base layer of politeness, aimed at the listener regardless of what the sentence is about. Everything else in keigo sits on top of it.',
examples: [
{ jp: '雨が降っています', en: 'It is raining.' },
{ jp: '田中は明日休みます', en: 'Tanaka is off tomorrow.' },
{ jp: 'これは私の資料です', en: 'This is my document.' }
],
warn: 'Dropping です・ます mid-conversation reads as a deliberate shift in distance, not as neutrality.'
},
{
group: '丁寧語', groupId: 'teineigo',
id: 'gozaimasen',
form: 'ございません',
strength: 'strong',
body: 'The formal negative of ある. Standard in service settings for saying something is unavailable, and in the fixed apology 申し訳ございません.',
examples: [
{ jp: 'あいにく在庫がございません', en: 'Unfortunately it is out of stock.' },
{ jp: '申し訳ございません', en: 'I am very sorry.' },
{ jp: '問題はございません', en: 'There is no problem.' }
],
warn: '申し訳ございません is technically irregular — 申し訳ない is one word — but it is completely established and safe to use.'
},
{
group: '丁寧語', groupId: 'teineigo',
id: 'yoroshii-deshou-ka',
form: 'よろしいでしょうか',
strength: 'standard',
body: 'The polite permission check. Replaces いいですか wherever the listener outranks you, and softens any confirmation into an enquiry.',
examples: [
{ jp: 'こちらでよろしいでしょうか', en: 'Is this all right?' },
{ jp: 'お名前を伺ってもよろしいでしょうか', en: 'May I ask your name?' },
{ jp: '少しお時間よろしいでしょうか', en: 'Do you have a moment?' }
],
warn: 'The past form よろしかったでしょうか about something happening now is バイト敬語 — see the pitfalls tab.'
},
{
group: '丁寧語', groupId: 'teineigo',
id: 'cushion-words',
form: 'クッション言葉',
strength: 'standard',
body: 'Fixed openers that absorb the impact of a request, refusal or interruption. They carry no propositional content — their whole job is to soften what follows.',
examples: [
{ jp: '恐れ入りますが、少々お待ちください', en: 'Sorry to trouble you, but please wait a moment.' },
{ jp: 'あいにくですが、本日は満席でございます', en: 'Unfortunately we are fully booked today.' },
{ jp: '差し支えなければ、ご連絡先を伺えますか', en: 'If it is no trouble, may I have your contact details?' }
],
warn: 'One is plenty. Stacking two — 大変恐縮ではございますが、誠に申し訳ございませんが — reads as padding.'
},
{
group: '丁寧語', groupId: 'teineigo',
id: 'kashikomarimashita',
form: 'かしこまりました / 承知しました',
strength: 'standard',
body: 'Acknowledgements ranked by formality. かしこまりました is service-level, 承知しました is standard business, 了解しました is peer-level or downward only.',
examples: [
{ jp: 'かしこまりました', en: 'Certainly. (to a customer)' },
{ jp: '承知いたしました', en: 'Understood. (to a client or superior)' },
{ jp: '了解です', en: 'Got it. (to a peer)' }
],
warn: '了解しました to a client or a superior is one of the most-corrected errors in Japanese offices.'
},
{
group: '丁寧語', groupId: 'teineigo',
id: 'written-register',
form: 'でございます in writing',
strength: 'strong',
body: 'Written Japanese runs a notch more formal than speech. でございます, 申し上げます and 存じます are ordinary in letters and heavy in conversation.',
examples: [
{ jp: '以上、ご報告まででございます', en: 'That concludes my report.' },
{ jp: '添付のとおりでございます', en: 'It is as attached.' },
{ jp: 'ご不明な点がございましたらお問い合わせください', en: 'Please contact us with any questions.' }
],
warn: 'Casual connectives leak easily into otherwise formal email: なので and ちょっと break the register instantly.'
},
{
group: '美化語', groupId: 'bikago',
id: 'o-vs-go-rule',
form: 'お for native words, ご for Sino-Japanese',
strength: 'standard',
body: 'The default split follows word origin: お attaches to native readings, ご to Sino-Japanese compounds. It holds often enough to guess with.',
examples: [
{ jp: 'お名前 / お手紙 / お時間', en: 'native readings take お' },
{ jp: 'ご住所 / ご意見 / ご都合', en: 'Sino-Japanese take ご' },
{ jp: 'お電話 / お食事 / お掃除', en: 'established exceptions taking お' }
],
warn: 'The exceptions are frequent everyday words, so they get learned early — but there is no rule generating them.'
},
{
group: '美化語', groupId: 'bikago',
id: 'bikago-fixed',
form: 'Words that fused with the prefix',
strength: 'standard',
body: 'Some nouns absorbed the prefix entirely and no longer have a bare form in ordinary speech. They are no longer felt as polite at all.',
examples: [
{ jp: 'ご飯', en: 'cooked rice, a meal' },
{ jp: 'お菓子', en: 'sweets' },
{ jp: 'お腹', en: 'stomach' }
],
warn: 'Stripping the prefix from these does not make speech plainer, it makes it wrong: ×腹がすきました is not neutral, it is coarse.'
},
{
group: '美化語', groupId: 'bikago',
id: 'bikago-limits',
form: 'Where the prefix stops working',
strength: 'light',
body: 'Loanwords, long words and words with negative content resist the prefix. When it does attach to a loanword it usually reads as archaic or as a joke.',
examples: [
{ jp: 'おビール', en: 'sounds dated or affected' },
{ jp: 'おトイレ', en: 'accepted in practice, unlike most loanwords' },
{ jp: 'お財布', en: 'fine — native reading' }
],
warn: 'Native speakers disagree about several of these. If a form sounds odd to you, the safest move is to drop the prefix rather than defend it.'
},
{
group: '美化語', groupId: 'bikago',
id: 'bikago-vs-sonkeigo',
form: 'Telling 美化語 from 尊敬語',
strength: 'standard',
body: 'The same お looks like both. The test is whether the noun points at somebody: if it belongs to the person you respect it is 尊敬語, if it belongs to nobody it is decoration.',
examples: [
{ jp: 'お茶を入れました', en: 'I made tea. (美化語 — nobody is raised)' },
{ jp: 'お客様のお荷物', en: 'the guest bag (尊敬語 — belongs to them)' },
{ jp: 'お手紙を書きました', en: 'ambiguous — depends whose letter it is' }
],
warn: 'This is why you can use お茶 alone at home: nothing is being aimed anywhere.'
}
],

// ===================== SITUATIONAL PHRASES =====================

situations: [
{
id: 'phone', title: 'On the phone', icon: '☎',
intro: 'Phone Japanese is the densest keigo you will meet, because the caller cannot see you and everything rests on wording.',
lines: [
{ jp: 'お電話ありがとうございます。〇〇でございます。', r: 'おでんわ ありがとうございます', en: 'Thank you for calling. This is ○○.' },
{ jp: '恐れ入りますが、お名前を伺ってもよろしいでしょうか。', r: 'おそれいりますが、おなまえを うかがっても よろしいでしょうか', en: 'Excuse me, may I ask your name?' },
{ jp: '少々お待ちくださいませ。', r: 'しょうしょう おまちくださいませ', en: 'One moment please.' },
{ jp: 'あいにく田中は席を外しております。', r: 'あいにく たなかは せきを はずしております', en: 'Tanaka is unfortunately away from his desk.' },
{ jp: '折り返しお電話いたしましょうか。', r: 'おりかえし おでんわ いたしましょうか', en: 'Shall we call you back?' },
{ jp: 'お電話が遠いようですので、もう一度お願いできますでしょうか。', r: 'おでんわが とおいようですので', en: "I'm having trouble hearing you — could you repeat that?" },
{ jp: '失礼いたします。', r: 'しつれい いたします', en: 'Goodbye. (ending the call)' }
]
},
{
id: 'email', title: 'Email and letters', icon: '✉',
intro: 'Written keigo runs one notch more formal than speech. 申し上げます and 存じます belong here more than in conversation.',
lines: [
{ jp: 'いつもお世話になっております。', r: 'いつも おせわに なっております', en: 'Thank you for your continued support. (standard opener)' },
{ jp: 'お忙しいところ恐れ入ります。', r: 'おいそがしい ところ おそれいります', en: 'I am sorry to trouble you when you are busy.' },
{ jp: 'ご確認のほどよろしくお願いいたします。', r: 'ごかくにんの ほど よろしく おねがいいたします', en: 'I would be grateful if you could confirm.' },
{ jp: 'ご査収ください。', r: 'ごさしゅう ください', en: 'Please find the attached and check it.' },
{ jp: '取り急ぎご連絡まで。', r: 'とりいそぎ ごれんらく まで', en: 'A quick note for now.' },
{ jp: 'ご返信お待ちしております。', r: 'ごへんしん おまちしております', en: 'I look forward to your reply.' },
{ jp: '何卒よろしくお願い申し上げます。', r: 'なにとぞ よろしく おねがい もうしあげます', en: 'I respectfully ask for your kind consideration. (formal close)' }
]
},
{
id: 'business', title: 'Meetings and the office', icon: '％',
intro: 'Note the direction of each phrase — several are only correct downward or only upward.',
lines: [
{ jp: '本日はお時間をいただきありがとうございます。', r: 'ほんじつは おじかんを いただき ありがとうございます', en: 'Thank you for making time today.' },
{ jp: '承知いたしました。', r: 'しょうち いたしました', en: 'Understood. (to a superior or client)' },
{ jp: 'かしこまりました。', r: 'かしこまりました', en: 'Certainly. (to a customer)' },
{ jp: '検討させていただきます。', r: 'けんとう させていただきます', en: "We'll give it consideration." },
{ jp: 'お先に失礼します。', r: 'おさきに しつれいします', en: 'Excuse me for leaving first.' },
{ jp: 'お疲れ様です。', r: 'おつかれさまです', en: 'Thank you for your work. (to anyone, including superiors)' },
{ jp: 'ご苦労様です。', r: 'ごくろうさまです', en: 'Thank you for your work. (downward only — never to a superior)' }
]
},
{
id: 'service', title: 'Shops and restaurants', icon: '⛩',
intro: 'The customer is 神様 grammatically: everything they do takes 尊敬語, everything staff do takes 謙譲語.',
lines: [
{ jp: 'いらっしゃいませ。', r: 'いらっしゃいませ', en: 'Welcome.' },
{ jp: '何名様でしょうか。', r: 'なんめいさま でしょうか', en: 'How many in your party?' },
{ jp: 'こちらでお召し上がりですか。', r: 'こちらで おめしあがり ですか', en: 'Will you be eating here?' },
{ jp: 'ご注文は以上でよろしいでしょうか。', r: 'ごちゅうもんは いじょうで よろしいでしょうか', en: 'Is that everything?' },
{ jp: '少々お待ちくださいませ。', r: 'しょうしょう おまち くださいませ', en: 'Please wait just a moment.' },
{ jp: '千円お預かりいたします。', r: 'せんえん おあずかり いたします', en: 'Taking ¥1,000. (not 千円から)' },
{ jp: 'ありがとうございました。またお越しくださいませ。', r: 'また おこし くださいませ', en: 'Thank you. Please come again.' }
]
},
{
id: 'interview', title: 'Job interviews', icon: '✓',
intro: 'Say 御社 when speaking, write 貴社. Mixing them up is the classic tell.',
lines: [
{ jp: '本日はよろしくお願いいたします。', r: 'ほんじつは よろしく おねがい いたします', en: 'Thank you for seeing me today.' },
{ jp: '御社の理念に共感いたしました。', r: 'おんしゃの りねんに きょうかん いたしました', en: "I identify with your company's philosophy." },
{ jp: '〜と考えております。', r: 'と かんがえて おります', en: 'I believe that…' },
{ jp: '精一杯努めてまいります。', r: 'せいいっぱい つとめて まいります', en: 'I will do my utmost.' },
{ jp: '恐れ入りますが、もう一度お伺いしてもよろしいでしょうか。', r: 'おそれいりますが', en: 'Sorry, could I ask you to repeat that?' },
{ jp: '本日はお時間をいただき、ありがとうございました。', r: 'ほんじつは おじかんを いただき', en: 'Thank you for your time today.' }
]
},
{
id: 'uchisoto', title: 'Inside and outside （内・外）', icon: '⇄',
intro: 'The rule that catches everyone: respect follows group membership, not rank. Speaking to an outsider, your own boss becomes an insider — so you humble them, drop their title, and use their bare surname.',
lines: [
{ jp: '【社内】部長はいらっしゃいますか。', r: 'ぶちょうは いらっしゃいますか', en: 'Inside the company: Is the manager in? (respectful)' },
{ jp: '【社外】田中はただいま外出しております。', r: 'たなかは ただいま がいしゅつ しております', en: 'To a client: Tanaka is out at the moment. (humble, no title)' },
{ jp: '✗ 田中部長はいらっしゃいません。', r: '', en: 'Wrong to a client — title kept and boss elevated.', bad: true },
{ jp: '【社外】弊社の山田が伺います。', r: 'へいしゃの やまだが うかがいます', en: 'To a client: Yamada from our company will visit.' },
{ jp: '【社外】御社のご都合はいかがでしょうか。', r: 'おんしゃの ごつごうは いかが でしょうか', en: 'To a client: What would suit your company?' }
]
},
{
id: 'hotel', title: 'Hotels and travel', icon: '🛎',
intro: 'Front-desk Japanese leans on the same customer-is-elevated pattern as shops, with a few travel-specific set phrases.',
lines: [
{ jp: 'ご予約のお客様でいらっしゃいますか。', r: 'ごよやくの おきゃくさまで いらっしゃいますか', en: 'Do you have a reservation?' },
{ jp: 'パスポートを拝見してもよろしいでしょうか。', r: 'パスポートを はいけんしても よろしいでしょうか', en: 'May I see your passport?' },
{ jp: 'お部屋にご案内いたします。', r: 'おへやに ごあんない いたします', en: "I'll show you to your room." },
{ jp: 'チェックアウトは十時でございます。', r: 'チェックアウトは じゅうじで ございます', en: "Checkout is at 10 o'clock." },
{ jp: '何かございましたら、フロントまでお申し付けください。', r: 'なにか ございましたら', en: 'If you need anything, please let the front desk know.' }
]
},
{
id: 'apology', title: 'Apologising formally', icon: '🙇',
intro: 'Written and spoken apologies stack humble and polite forms more heavily than ordinary requests, since the goal is visible deference.',
lines: [
{ jp: 'ご迷惑をおかけし、誠に申し訳ございません。', r: 'ごめいわくを おかけし', en: 'I am truly sorry for the inconvenience caused.' },
{ jp: '深くお詫び申し上げます。', r: 'ふかく おわび もうしあげます', en: 'I offer my deepest apologies.' },
{ jp: '二度とないよう、注意いたします。', r: 'にどと ないよう、ちゅうい いたします', en: 'I will make sure it does not happen again.' },
{ jp: '今後とも何卒よろしくお願い申し上げます。', r: 'こんごとも なにとぞ よろしく', en: 'I ask for your continued goodwill going forward.' }
]
}
,
{
id: 'social-media', title: 'Formal messages and announcements', icon: '📢',
intro: 'Public-facing announcements — store notices, event invitations, official statements — favour a dense, written register even when short.',
lines: [
{ jp: '謹んでお知らせ申し上げます。', r: 'つつしんで おしらせ もうしあげます', en: 'We respectfully wish to inform you.' },
{ jp: '下記の通り、ご案内申し上げます。', r: 'かきの とおり、ごあんない もうしあげます', en: 'Please find the details below.' },
{ jp: '皆様のご参加を心よりお待ち申し上げております。', r: 'みなさまの ごさんかを こころより おまち もうしあげております', en: 'We sincerely look forward to your participation.' },
{ jp: 'ご不明な点がございましたら、お問い合わせください。', r: 'ごふめいな てんが ございましたら', en: 'If anything is unclear, please contact us.' },
{ jp: '何卒ご了承くださいますようお願い申し上げます。', r: 'なにとぞ ごりょうしょう くださいますよう', en: 'We respectfully ask for your understanding.' }
]
},
{
id: 'condolence', title: 'Condolences and formal sympathy', icon: '🕯',
intro: 'Language for illness, loss, and hardship carries its own set phrases, distinct from the everyday apology register.',
lines: [
{ jp: 'この度はご愁傷様でございます。', r: 'このたびは ごしゅうしょうさまで ございます', en: 'Please accept my condolences.' },
{ jp: '心よりお悔やみ申し上げます。', r: 'こころより おくやみ もうしあげます', en: 'My deepest condolences.' },
{ jp: 'ご冥福をお祈りいたします。', r: 'ごめいふくを おいのり いたします', en: 'I pray for their peaceful rest.' },
{ jp: 'お加減はいかがでしょうか。', r: 'おかげんは いかが でしょうか', en: 'How are you feeling? (to someone unwell)' },
{ jp: '一日も早いご回復をお祈り申し上げます。', r: 'いちにちも はやい ごかいふくを おいのり もうしあげます', en: 'I pray for a swift recovery.' }
]
},
{
id: 'gift', title: 'Giving and receiving gifts', icon: '🎁',
intro: 'Gift-giving language leans humble when offering, respectful when someone gives to you.',
lines: [
{ jp: 'つまらないものですが、どうぞ。', r: 'つまらない ものですが、どうぞ', en: "It's nothing much, but please accept it." },
{ jp: 'お心遣い、ありがとうございます。', r: 'おこころづかい、ありがとう ございます', en: 'Thank you for your thoughtfulness.' },
{ jp: 'ありがたく頂戴いたします。', r: 'ありがたく ちょうだい いたします', en: 'I gratefully accept.' },
{ jp: 'お気遣いなく。', r: 'おきづかい なく', en: "Please don't trouble yourself." },
{ jp: 'ささやかですが、お受け取りください。', r: 'ささやかですが、おうけとり ください', en: "It's a small thing, but please accept it." }
]
},
{
id: 'invitation', title: 'Invitations and RSVPs', icon: '✒',
intro: 'Formal invitations and their replies follow near-fixed templates in Japanese business and social correspondence.',
lines: [
{ jp: 'ぜひご出席賜りますようお願い申し上げます。', r: 'ぜひ ごしゅっせき たまわりますよう', en: 'We kindly request the honor of your attendance.' },
{ jp: '喜んで出席させていただきます。', r: 'よろこんで しゅっせき させていただきます', en: 'I would be delighted to attend.' },
{ jp: 'あいにく都合がつかず、欠席させていただきます。', r: 'あいにく つごうが つかず', en: 'Unfortunately I am unable to attend.' },
{ jp: 'ご招待いただき、誠にありがとうございます。', r: 'ごしょうたい いただき、まことに ありがとう ございます', en: 'Thank you very much for the invitation.' },
{ jp: '出欠のご返信を賜りますようお願いいたします。', r: 'しゅっけつの ごへんしんを たまわりますよう', en: 'Please reply with your attendance status.' }
]
},
{
id: 'complaint', title: 'Handling complaints', icon: '⚠',
intro: 'Responding to a complaint pairs a formal apology with careful, humble explanation — tone matters as much as wording.',
lines: [
{ jp: 'この度はご不便をおかけし、申し訳ございません。', r: 'このたびは ごふべんを おかけし', en: 'We apologize for the inconvenience caused.' },
{ jp: '詳しい状況をお聞かせいただけますでしょうか。', r: 'くわしい じょうきょうを おきかせ いただけますでしょうか', en: 'Could you tell us more about the situation?' },
{ jp: '早急に確認の上、ご連絡いたします。', r: 'そうきゅうに かくにんの うえ、ごれんらく いたします', en: 'We will check promptly and get back to you.' },
{ jp: '重ねてお詫び申し上げます。', r: 'かさねて おわび もうしあげます', en: 'We apologize once again.' },
{ jp: '今後このようなことがないよう努めてまいります。', r: 'こんご このような ことが ないよう つとめて まいります', en: 'We will work to ensure this does not happen again.' }
]
},
{
id: 'introductions', title: 'Introducing other people', icon: '🤝',
intro: 'Introducing a third party layers keigo in both directions at once: raise the person being introduced, lower your own side.',
lines: [
{ jp: 'こちら、弊社の田中でございます。', r: 'こちら、へいしゃの たなかで ございます', en: 'This is Tanaka from our company.' },
{ jp: 'こちらは取引先の山田様でいらっしゃいます。', r: 'こちらは とりひきさきの やまださまで いらっしゃいます', en: 'This is Mr. Yamada from our business partner.' },
{ jp: 'いつもお世話になっております、鈴木と申します。', r: 'いつも おせわに なっております、すずきと もうします', en: 'Thank you for your continued support, I am Suzuki.' },
{ jp: 'お引き合わせいただき、ありがとうございます。', r: 'おひきあわせ いただき、ありがとう ございます', en: 'Thank you for the introduction.' },
{ jp: '以後、お見知りおきください。', r: 'いご、おみしりおき ください', en: 'Please remember me favorably going forward.' }
]
},

{
id: 'bank', title: 'At the bank', icon: '🏦',
intro: 'Counter Japanese is highly scripted. Staff use 尊敬語 for everything you do and 謙譲語Ⅱ for everything they do, and the script barely varies between branches.',
lines: [
{ jp: '本日はどのようなご用件でしょうか。', r: 'ほんじつは どのような ごようけんでしょうか', en: 'What can we help you with today?' },
{ jp: '恐れ入りますが、通帳をお預かりいたします。', r: 'おそれいりますが、つうちょうを おあずかり いたします', en: 'Excuse me, I will take your passbook.' },
{ jp: 'こちらにご記入をお願いいたします。', r: 'こちらに ごきにゅうを おねがい いたします', en: 'Please fill this in.' },
{ jp: '暗証番号をお間違えのないようお願いいたします。', r: 'あんしょうばんごうを おまちがえの ないよう おねがい いたします', en: 'Please make sure the PIN is correct.' },
{ jp: '番号札をお持ちになってお待ちください。', r: 'ばんごうふだを おもちに なって おまちください', en: 'Please take a numbered ticket and wait.' },
{ jp: 'お待たせいたしました。三番の番号札をお持ちのお客様。', r: 'おまたせ いたしました。さんばんの ばんごうふだを おもちの おきゃくさま', en: 'Thank you for waiting. Customer holding ticket number three.' },
{ jp: 'ご確認の上、こちらにご署名をお願いいたします。', r: 'ごかくにんの うえ、こちらに ごしょめいを おねがい いたします', en: 'Please check it and sign here.' },
{ jp: '本日はご来店いただきありがとうございました。', r: 'ほんじつは ごらいてん いただき ありがとうございました', en: 'Thank you for visiting us today.' }
]
},
{
id: 'post-office', title: 'Post office and delivery', icon: '📮',
intro: 'Delivery language leans on お預かり and お届け — the pair that frames the company as temporarily holding something that belongs to you.',
lines: [
{ jp: 'お荷物をお預かりいたします。', r: 'おにもつを おあずかり いたします', en: 'I will take your parcel.' },
{ jp: '中身は何でございましょうか。', r: 'なかみは なんで ございましょうか', en: 'What are the contents?' },
{ jp: '明日中にはお届けできる見込みでございます。', r: 'あすじゅうには おとどけ できる みこみで ございます', en: 'We expect to deliver it by tomorrow.' },
{ jp: 'ご不在の場合は不在票をお入れいたします。', r: 'ごふざいの ばあいは ふざいひょうを おいれ いたします', en: 'If you are out we will leave a notice.' },
{ jp: '再配達のご依頼を承ります。', r: 'さいはいたつの ごいらいを うけたまわります', en: 'We can arrange redelivery.' },
{ jp: '恐れ入りますが、こちらにご印鑑をお願いいたします。', r: 'おそれいりますが、こちらに ごいんかんを おねがい いたします', en: 'Sorry to trouble you — your seal here, please.' },
{ jp: '確かにお預かりいたしました。', r: 'たしかに おあずかり いたしました', en: 'I have received it.' }
]
},
{
id: 'hospital', title: 'Clinics and hospitals', icon: '🏥',
intro: 'Medical settings mix service keigo with careful softeners, because almost every instruction is also an intrusion.',
lines: [
{ jp: '保険証をお持ちでしょうか。', r: 'ほけんしょうを おもちでしょうか', en: 'Do you have your insurance card?' },
{ jp: 'こちらの問診票にご記入ください。', r: 'こちらの もんしんひょうに ごきにゅう ください', en: 'Please fill in this questionnaire.' },
{ jp: 'お名前をお呼びしますので、おかけになってお待ちください。', r: 'おなまえを およびしますので、おかけに なって おまちください', en: 'We will call your name, so please take a seat.' },
{ jp: '少し痛みますが、ご辛抱ください。', r: 'すこし いたみますが、ごしんぼう ください', en: 'It will hurt a little — please bear with it.' },
{ jp: 'お大事になさってください。', r: 'おだいじに なさって ください', en: 'Please take care of yourself.' },
{ jp: '次回は一週間後にお越しください。', r: 'じかいは いっしゅうかんごに おこし ください', en: 'Please come again in a week.' },
{ jp: 'ご不明な点がございましたら、遠慮なくお尋ねください。', r: 'ごふめいな てんが ございましたら、えんりょなく おたずね ください', en: 'Please ask freely if anything is unclear.' }
]
},
{
id: 'station', title: 'Stations and announcements', icon: '🚉',
intro: 'Railway Japanese is the most formulaic register in daily life. Announcements use 参ります for trains and お〜ください for passengers, almost without variation.',
lines: [
{ jp: 'まもなく二番線に電車が参ります。', r: 'まもなく にばんせんに でんしゃが まいります', en: 'A train will shortly arrive at platform two.' },
{ jp: '白線の内側までお下がりください。', r: 'はくせんの うちがわまで おさがり ください', en: 'Please stand back behind the white line.' },
{ jp: 'お忘れ物のございませんようご注意ください。', r: 'おわすれものの ございませんよう ごちゅうい ください', en: 'Please take care not to leave anything behind.' },
{ jp: '駆け込み乗車はおやめください。', r: 'かけこみ じょうしゃは おやめ ください', en: 'Please do not rush onto the train.' },
{ jp: '車内での通話はご遠慮ください。', r: 'しゃないでの つうわは ごえんりょ ください', en: 'Please refrain from phone calls in the carriage.' },
{ jp: 'お急ぎのところ誠に申し訳ございません。', r: 'おいそぎの ところ まことに もうしわけ ございません', en: 'We are truly sorry to those in a hurry.' },
{ jp: 'ご乗車ありがとうございました。', r: 'ごじょうしゃ ありがとうございました', en: 'Thank you for riding with us.' }
]
},
{
id: 'taxi', title: 'Taxis and drivers', icon: '🚕',
intro: 'Short, high-frequency exchanges. The driver uses full service keigo; the passenger can stay at ordinary です・ます without sounding rude.',
lines: [
{ jp: 'どちらまでいらっしゃいますか。', r: 'どちらまで いらっしゃいますか', en: 'Where are you headed?' },
{ jp: '駅までお願いできますか。', r: 'えきまで おねがい できますか', en: 'Could you take me to the station?' },
{ jp: '少々混んでおりますので、遠回りしてもよろしいでしょうか。', r: 'しょうしょう こんで おりますので、とおまわり しても よろしいでしょうか', en: 'It is a little congested — may I take a detour?' },
{ jp: 'こちらで結構でございます。', r: 'こちらで けっこうで ございます', en: 'Here is fine.' },
{ jp: '領収書をお願いいたします。', r: 'りょうしゅうしょを おねがい いたします', en: 'A receipt, please.' },
{ jp: 'お忘れ物はございませんか。', r: 'おわすれものは ございませんか', en: 'Have you left anything behind?' },
{ jp: 'ありがとうございました。お気をつけて。', r: 'ありがとうございました。おきをつけて', en: 'Thank you. Take care.' }
]
},
{
id: 'airport', title: 'Airports and flights', icon: '✈',
intro: 'Aviation has its own vocabulary: ご搭乗 rather than ご乗車, お手荷物 rather than お荷物. The grammar is the same service keigo underneath.',
lines: [
{ jp: 'パスポートを拝見してもよろしいでしょうか。', r: 'パスポートを はいけん しても よろしいでしょうか', en: 'May I see your passport?' },
{ jp: 'お預けになるお手荷物はございますか。', r: 'おあずけに なる おてにもつは ございますか', en: 'Do you have baggage to check in?' },
{ jp: '搭乗口は十五番でございます。', r: 'とうじょうぐちは じゅうごばんで ございます', en: 'Your boarding gate is number fifteen.' },
{ jp: 'ご搭乗のお客様は三十分前までにお越しください。', r: 'ごとうじょうの おきゃくさまは さんじゅっぷんまえまでに おこし ください', en: 'Passengers should arrive at least thirty minutes before.' },
{ jp: 'ただいまより優先搭乗のご案内をいたします。', r: 'ただいまより ゆうせん とうじょうの ごあんないを いたします', en: 'We will now begin priority boarding.' },
{ jp: 'シートベルトをお締めください。', r: 'シートベルトを おしめ ください', en: 'Please fasten your seatbelt.' },
{ jp: '本日はご搭乗いただき誠にありがとうございました。', r: 'ほんじつは ごとうじょう いただき まことに ありがとうございました', en: 'Thank you very much for flying with us today.' }
]
},
{
id: 'restaurant-booking', title: 'Booking a restaurant', icon: '📅',
intro: 'Reservation calls run on 承る and ご予約. The staff take the booking humbly; the guest is raised at every turn.',
lines: [
{ jp: 'ご予約を承ります。', r: 'ごよやくを うけたまわります', en: 'I will take your reservation.' },
{ jp: '何名様でいらっしゃいますか。', r: 'なんめいさまで いらっしゃいますか', en: 'How many people will there be?' },
{ jp: 'あいにく満席でございます。', r: 'あいにく まんせきで ございます', en: 'Unfortunately we are fully booked.' },
{ jp: '別のお時間でしたらご用意できます。', r: 'べつの おじかんでしたら ごようい できます', en: 'We could accommodate a different time.' },
{ jp: 'お名前とご連絡先を頂戴できますでしょうか。', r: 'おなまえと ごれんらくさきを ちょうだい できますでしょうか', en: 'May I have your name and contact details?' },
{ jp: 'アレルギーなどはございますか。', r: 'アレルギーなどは ございますか', en: 'Do you have any allergies?' },
{ jp: 'ご来店を心よりお待ち申し上げております。', r: 'ごらいてんを こころより おまち もうしあげて おります', en: 'We look forward sincerely to your visit.' }
]
},
{
id: 'restaurant-guest', title: 'Dining as a guest', icon: '🍽',
intro: 'What the guest says matters too — especially at a meal paid for by a client or a superior, where refusing and accepting both need care.',
lines: [
{ jp: '本日はお招きいただきありがとうございます。', r: 'ほんじつは おまねき いただき ありがとうございます', en: 'Thank you for inviting me today.' },
{ jp: 'それでは、遠慮なくいただきます。', r: 'それでは、えんりょなく いただきます', en: 'Then I will help myself, thank you.' },
{ jp: 'とてもおいしゅうございます。', r: 'とても おいしゅう ございます', en: 'It is delicious. (formal register)' },
{ jp: '十分に頂戴いたしました。', r: 'じゅうぶんに ちょうだい いたしました', en: 'I have had plenty, thank you.' },
{ jp: 'お気遣いいただき恐れ入ります。', r: 'おきづかい いただき おそれいります', en: 'Thank you for your consideration.' },
{ jp: '本日はごちそうさまでございました。', r: 'ほんじつは ごちそうさまで ございました', en: 'Thank you for the meal today.' },
{ jp: '次回はぜひ私どもにお持たせください。', r: 'じかいは ぜひ わたくしどもに おもたせ ください', en: 'Next time please let us treat you.' }
]
},
{
id: 'school', title: 'School and teachers', icon: '🎓',
intro: 'Teachers are 尊敬語 targets by default, and remain so for life. This is where most learners first produce keigo that is not just です・ます.',
lines: [
{ jp: '先生はいらっしゃいますか。', r: 'せんせいは いらっしゃいますか', en: 'Is the teacher in?' },
{ jp: '先生がおっしゃったとおりにいたしました。', r: 'せんせいが おっしゃった とおりに いたしました', en: 'I did as you said.' },
{ jp: 'ご指導いただきありがとうございました。', r: 'ごしどう いただき ありがとうございました', en: 'Thank you for your guidance.' },
{ jp: '一点お伺いしてもよろしいでしょうか。', r: 'いってん おうかがい しても よろしいでしょうか', en: 'May I ask one thing?' },
{ jp: 'レポートをご覧いただけますでしょうか。', r: 'レポートを ごらん いただけますでしょうか', en: 'Could you look over my report?' },
{ jp: '本日は貴重なお話をありがとうございました。', r: 'ほんじつは きちょうな おはなしを ありがとうございました', en: 'Thank you for your valuable talk today.' },
{ jp: '今後ともご指導のほどよろしくお願い申し上げます。', r: 'こんごとも ごしどうの ほど よろしく おねがい もうしあげます', en: 'I ask for your continued guidance.' }
]
},
{
id: 'university-office', title: 'Administrative offices', icon: '🗂',
intro: 'Counter staff at universities and city offices use a flatter, more procedural register than shops — polite but not deferential.',
lines: [
{ jp: '恐れ入りますが、学生証をご提示ください。', r: 'おそれいりますが、がくせいしょうを ごていじ ください', en: 'Please show your student ID.' },
{ jp: '申請書はこちらでお受け取りいただけます。', r: 'しんせいしょは こちらで おうけとり いただけます', en: 'You can collect the application form here.' },
{ jp: '発行までに三日ほどお時間を頂戴いたします。', r: 'はっこうまでに みっかほど おじかんを ちょうだい いたします', en: 'Issuing it will take about three days.' },
{ jp: '窓口は十六時までとなっております。', r: 'まどぐちは じゅうろくじまでと なって おります', en: 'The counter is open until four.' },
{ jp: '担当者に確認いたしますので、少々お待ちください。', r: 'たんとうしゃに かくにん いたしますので、しょうしょう おまち ください', en: 'I will check with the person in charge — one moment.' },
{ jp: 'こちらの書類に不備がございます。', r: 'こちらの しょるいに ふびが ございます', en: 'There is a problem with this document.' },
{ jp: 'ご不明な点はお問い合わせください。', r: 'ごふめいな てんは おといあわせ ください', en: 'Please contact us with any questions.' }
]
},
{
id: 'landlord', title: 'Housing and landlords', icon: '🏠',
intro: 'Tenancy language sits between business and neighbourly. 恐れ入りますが does a lot of work, because most exchanges are requests.',
lines: [
{ jp: '内見をお願いできますでしょうか。', r: 'ないけんを おねがい できますでしょうか', en: 'Could I arrange a viewing?' },
{ jp: '恐れ入りますが、更新の手続きについて伺えますか。', r: 'おそれいりますが、こうしんの てつづきに ついて うかがえますか', en: 'May I ask about the renewal procedure?' },
{ jp: '水漏れの件でご連絡いたしました。', r: 'みずもれの けんで ごれんらく いたしました', en: 'I am contacting you about a leak.' },
{ jp: 'ご対応いただけますと助かります。', r: 'ごたいおう いただけますと たすかります', en: 'It would help if you could deal with it.' },
{ jp: '早急に業者を手配いたします。', r: 'そうきゅうに ぎょうしゃを てはい いたします', en: 'We will arrange a contractor immediately.' },
{ jp: 'ご不便をおかけして申し訳ございません。', r: 'ごふべんを おかけして もうしわけ ございません', en: 'We apologise for the inconvenience.' },
{ jp: '退去のご連絡は一か月前までにお願いいたします。', r: 'たいきょの ごれんらくは いっかげつまえまでに おねがい いたします', en: 'Please give notice a month before moving out.' }
]
},
{
id: 'neighbors', title: 'Neighbours and greetings', icon: '🚪',
intro: 'Neighbourly keigo is light — お and ご plus です・ます, without 尊敬語 verbs. Overdoing it here creates distance rather than respect.',
lines: [
{ jp: 'いつもお世話になっております。', r: 'いつも おせわに なって おります', en: 'Thank you for everything.' },
{ jp: 'お出かけですか。', r: 'おでかけですか', en: 'Off out? (a greeting, not a question)' },
{ jp: '先日はご迷惑をおかけしました。', r: 'せんじつは ごめいわくを おかけしました', en: 'Sorry for the trouble the other day.' },
{ jp: 'つまらないものですが、お近づきのしるしに。', r: 'つまらない ものですが、おちかづきの しるしに', en: 'A small thing, as a token of introduction.' },
{ jp: '引っ越してまいりました田中と申します。', r: 'ひっこして まいりました たなかと もうします', en: 'I am Tanaka — I have just moved in.' },
{ jp: '何かとご迷惑をおかけするかと存じますが。', r: 'なにかと ごめいわくを おかけするかと ぞんじますが', en: 'I expect I will be a nuisance at times.' },
{ jp: '今後ともよろしくお願いいたします。', r: 'こんごとも よろしく おねがい いたします', en: 'I look forward to being your neighbour.' }
]
},
{
id: 'wedding', title: 'Weddings and celebrations', icon: '💐',
intro: 'Ceremonial keigo is fixed and heavily written in register. Certain words are avoided outright as 忌み言葉 — words of breaking, ending or returning.',
lines: [
{ jp: 'ご結婚おめでとうございます。', r: 'ごけっこん おめでとうございます', en: 'Congratulations on your marriage.' },
{ jp: '心よりお慶び申し上げます。', r: 'こころより およろこび もうしあげます', en: 'I offer my sincere congratulations.' },
{ jp: '本日はお招きいただき光栄に存じます。', r: 'ほんじつは おまねき いただき こうえいに ぞんじます', en: 'It is an honour to be invited today.' },
{ jp: 'ご両家のますますのご繁栄をお祈り申し上げます。', r: 'ごりょうけの ますますの ごはんえいを おいのり もうしあげます', en: 'I wish both families continued prosperity.' },
{ jp: '末永くお幸せに。', r: 'すえながく おしあわせに', en: 'May you be happy for many years.' },
{ jp: 'ご指名により、一言ご挨拶申し上げます。', r: 'ごしめいに より、ひとこと ごあいさつ もうしあげます', en: 'Having been asked, I will say a few words.' },
{ jp: '簡単ではございますが、お祝いの言葉とさせていただきます。', r: 'かんたんでは ございますが、おいわいの ことばと させて いただきます', en: 'Brief though it is, that is my congratulation.' }
]
},
{
id: 'funeral', title: 'Funerals and wakes', icon: '🕊',
intro: 'At a wake you say very little, and what you say is fixed. Sentences are deliberately left unfinished — completing them sounds too composed for grief.',
lines: [
{ jp: 'この度はご愁傷様でございます。', r: 'このたびは ごしゅうしょうさまで ございます', en: 'I am very sorry for your loss.' },
{ jp: '心よりお悔やみ申し上げます。', r: 'こころより おくやみ もうしあげます', en: 'My sincere condolences.' },
{ jp: '謹んでご冥福をお祈り申し上げます。', r: 'つつしんで ごめいふくを おいのり もうしあげます', en: 'I respectfully pray for the repose of the departed.' },
{ jp: '突然のことで、何と申し上げてよいか。', r: 'とつぜんの ことで、なんと もうしあげて よいか', en: 'So sudden — I hardly know what to say.' },
{ jp: 'ご霊前にお供えください。', r: 'ごれいぜんに おそなえ ください', en: 'Please place this before the altar.' },
{ jp: 'どうぞお力を落とされませんように。', r: 'どうぞ おちからを おとされませんように', en: 'Please do not lose heart.' },
{ jp: '生前は大変お世話になりました。', r: 'せいぜんは たいへん おせわに なりました', en: 'I was greatly indebted to the deceased.' }
]
},
{
id: 'newyear', title: 'New Year and seasonal cards', icon: '🎍',
intro: 'Seasonal correspondence is almost entirely fixed phrases. The formulas differ by whether the year has turned and by whether the household is in mourning.',
lines: [
{ jp: '謹んで新年のお慶びを申し上げます。', r: 'つつしんで しんねんの およろこびを もうしあげます', en: 'I respectfully offer New Year greetings.' },
{ jp: '旧年中は大変お世話になりました。', r: 'きゅうねんちゅうは たいへん おせわに なりました', en: 'Thank you for all your help last year.' },
{ jp: '本年もどうぞよろしくお願い申し上げます。', r: 'ほんねんも どうぞ よろしく おねがい もうしあげます', en: 'I ask for your favour again this year.' },
{ jp: '皆様のご健康とご多幸をお祈り申し上げます。', r: 'みなさまの ごけんこうと ごたこうを おいのり もうしあげます', en: 'I wish you all health and happiness.' },
{ jp: '喪中につき年頭のご挨拶を失礼させていただきます。', r: 'もちゅうに つき ねんとうの ごあいさつを しつれい させて いただきます', en: 'Being in mourning, I will forgo New Year greetings.' },
{ jp: '暑中お見舞い申し上げます。', r: 'しょちゅう おみまい もうしあげます', en: 'Midsummer greetings.' },
{ jp: '時節柄、くれぐれもご自愛くださいませ。', r: 'じせつがら、くれぐれも ごじあい くださいませ', en: 'Given the season, please take care of yourself.' }
]
},
{
id: 'seasonal-openers', title: 'Letter openings and closings', icon: '📜',
intro: 'Formal letters open with a seasonal clause and a health enquiry before any content. The pairing of 拝啓 and 敬具 frames the whole thing.',
lines: [
{ jp: '拝啓 時下ますますご清栄のこととお慶び申し上げます。', r: 'はいけい じか ますます ごせいえいの ことと およろこび もうしあげます', en: 'Dear Sir/Madam — I trust you are flourishing.' },
{ jp: '平素は格別のご高配を賜り厚く御礼申し上げます。', r: 'へいそは かくべつの ごこうはいを たまわり あつく おれい もうしあげます', en: 'I thank you warmly for your exceptional consideration.' },
{ jp: 'さて、この度は〜の件でご連絡申し上げます。', r: 'さて、このたびは 〜の けんで ごれんらく もうしあげます', en: 'Now, I write regarding the matter of...' },
{ jp: 'まずは書中にてご挨拶申し上げます。', r: 'まずは しょちゅうにて ごあいさつ もうしあげます', en: 'For now, my greetings by letter.' },
{ jp: '何卒よろしくお願い申し上げます。 敬具', r: 'なにとぞ よろしく おねがい もうしあげます。 けいぐ', en: 'I respectfully ask your kind consideration. Yours faithfully.' },
{ jp: '末筆ながら、皆様のご健勝をお祈り申し上げます。', r: 'まっぴつながら、みなさまの ごけんしょうを おいのり もうしあげます', en: 'In closing, I wish you all good health.' },
{ jp: '取り急ぎご報告まで。', r: 'とりいそぎ ごほうこくまで', en: 'A hurried note by way of report.' }
]
},
{
id: 'business-card', title: 'Exchanging business cards', icon: '🪪',
intro: 'The 名刺交換 script is short and rigid. The card is treated as standing in for the person, which is why 頂戴 and 拝見 appear.',
lines: [
{ jp: '株式会社〇〇の田中と申します。', r: 'かぶしきがいしゃ まるまるの たなかと もうします', en: 'I am Tanaka of 〇〇 Co., Ltd.' },
{ jp: '名刺を頂戴できますでしょうか。', r: 'めいしを ちょうだい できますでしょうか', en: 'May I have your card?' },
{ jp: '頂戴いたします。', r: 'ちょうだい いたします', en: 'Thank you, I will take it.' },
{ jp: '恐れ入ります、こちらこそ。', r: 'おそれいります、こちらこそ', en: 'Thank you — likewise.' },
{ jp: 'お名前は何とお読みすればよろしいでしょうか。', r: 'おなまえは なんと およみすれば よろしいでしょうか', en: 'How should I read your name?' },
{ jp: 'あいにく名刺を切らしておりまして、失礼いたします。', r: 'あいにく めいしを きらして おりまして、しつれい いたします', en: 'I am afraid I am out of cards — my apologies.' },
{ jp: '以後お見知りおきください。', r: 'いご おみしりおき ください', en: 'Please remember me from now on.' }
]
},
{
id: 'negotiation', title: 'Quotes and negotiation', icon: '⚖',
intro: 'Commercial negotiation is where hedging does real work: almost every position is stated as a difficulty rather than a refusal.',
lines: [
{ jp: 'お見積書をお送りいたします。', r: 'おみつもりしょを おおくり いたします', en: 'I will send you a quotation.' },
{ jp: 'ご予算の範囲を伺えますでしょうか。', r: 'ごよさんの はんいを うかがえますでしょうか', en: 'May I ask your budget range?' },
{ jp: 'その条件では少々難しいかと存じます。', r: 'その じょうけんでは しょうしょう むずかしいかと ぞんじます', en: 'That condition would be somewhat difficult.' },
{ jp: '社内で検討させていただけますでしょうか。', r: 'しゃないで けんとう させて いただけますでしょうか', en: 'May we discuss it internally?' },
{ jp: 'ご期待に沿えず申し訳ございません。', r: 'ごきたいに そえず もうしわけ ございません', en: 'I am sorry we cannot meet your expectations.' },
{ jp: '折衷案をご提案させていただきます。', r: 'せっちゅうあんを ごていあん させて いただきます', en: 'Allow me to propose a compromise.' },
{ jp: '前向きにご検討いただければ幸いです。', r: 'まえむきに ごけんとう いただければ さいわいです', en: 'I would be glad if you considered it favourably.' }
]
},
{
id: 'sales-visit', title: 'Visiting a client', icon: '🚶',
intro: 'The visit script begins before you arrive and ends after you leave. 伺う rather than 参る throughout, because the destination is the client.',
lines: [
{ jp: '明日十時に伺ってもよろしいでしょうか。', r: 'あした じゅうじに うかがっても よろしいでしょうか', en: 'May I visit at ten tomorrow?' },
{ jp: 'ただいま到着いたしました。', r: 'ただいま とうちゃく いたしました', en: 'I have just arrived.' },
{ jp: 'お忙しいところお時間を頂戴し恐れ入ります。', r: 'おいそがしい ところ おじかんを ちょうだいし おそれいります', en: 'Thank you for your time when you are busy.' },
{ jp: '早速ですが、本日の議題に入らせていただきます。', r: 'さっそくですが、ほんじつの ぎだいに はいらせて いただきます', en: 'If I may, let us move to today agenda.' },
{ jp: '本日はお時間をいただきありがとうございました。', r: 'ほんじつは おじかんを いただき ありがとうございました', en: 'Thank you for your time today.' },
{ jp: '改めてご連絡差し上げます。', r: 'あらためて ごれんらく さしあげます', en: 'I will be in touch again.' },
{ jp: '失礼いたします。', r: 'しつれい いたします', en: 'Excuse me. (leaving)' }
]
},
{
id: 'entertaining', title: 'Client entertaining', icon: '🍶',
intro: '接待 language balances hospitality with restraint. The host offers without pressing; the guest accepts without seeming eager.',
lines: [
{ jp: 'どうぞお召し上がりください。', r: 'どうぞ おめしあがり ください', en: 'Please help yourself.' },
{ jp: 'お注ぎいたします。', r: 'おつぎ いたします', en: 'Allow me to pour.' },
{ jp: 'お飲み物は何になさいますか。', r: 'おのみものは なんに なさいますか', en: 'What would you like to drink?' },
{ jp: 'お口に合いますでしょうか。', r: 'おくちに あいますでしょうか', en: 'I hope it is to your taste.' },
{ jp: '本日はお付き合いいただき恐縮です。', r: 'ほんじつは おつきあい いただき きょうしゅくです', en: 'Thank you for joining us today.' },
{ jp: 'そろそろお開きとさせていただきます。', r: 'そろそろ おひらきと させて いただきます', en: 'We will draw things to a close.' },
{ jp: 'お車を手配いたしましょうか。', r: 'おくるまを てはい いたしましょうか', en: 'Shall I arrange a car for you?' }
]
},
{
id: 'presentation', title: 'Presenting to a room', icon: '📊',
intro: 'Presentation Japanese is heavily 謙譲語Ⅱ: you are describing your own actions to a whole audience, so 〜させていただく and いたす recur.',
lines: [
{ jp: 'ただいまご紹介にあずかりました田中でございます。', r: 'ただいま ごしょうかいに あずかりました たなかで ございます', en: 'I am Tanaka, as just introduced.' },
{ jp: '本日は貴重なお時間を頂戴し、ありがとうございます。', r: 'ほんじつは きちょうな おじかんを ちょうだいし、ありがとうございます', en: 'Thank you for your valuable time today.' },
{ jp: '早速ですが、ご説明させていただきます。', r: 'さっそくですが、ごせつめい させて いただきます', en: 'Without delay, allow me to explain.' },
{ jp: 'お手元の資料をご覧ください。', r: 'おてもとの しりょうを ごらん ください', en: 'Please look at the materials in front of you.' },
{ jp: 'ご質問がございましたらお受けいたします。', r: 'ごしつもんが ございましたら おうけ いたします', en: 'I will take any questions.' },
{ jp: '貴重なご意見をありがとうございます。', r: 'きちょうな ごいけんを ありがとうございます', en: 'Thank you for that valuable comment.' },
{ jp: '以上をもちましてご説明を終わらせていただきます。', r: 'いじょうを もちまして ごせつめいを おわらせて いただきます', en: 'That concludes my explanation.' }
]
},
{
id: 'meeting-chair', title: 'Chairing a meeting', icon: '🗓',
intro: 'The chair speaks to everyone at once, so 丁寧語 does most of the work, with 謙譲語Ⅱ for the chair own moves.',
lines: [
{ jp: 'それでは、会議を始めさせていただきます。', r: 'それでは、かいぎを はじめさせて いただきます', en: 'Let us begin the meeting.' },
{ jp: 'お忙しいところお集まりいただきありがとうございます。', r: 'おいそがしい ところ おあつまり いただき ありがとうございます', en: 'Thank you for gathering when you are busy.' },
{ jp: '次の議題に移らせていただきます。', r: 'つぎの ぎだいに うつらせて いただきます', en: 'Let us move to the next item.' },
{ jp: 'ご意見をお聞かせいただけますでしょうか。', r: 'ごいけんを おきかせ いただけますでしょうか', en: 'Could we hear your views?' },
{ jp: 'お時間の都合もございますので、手短にお願いいたします。', r: 'おじかんの つごうも ございますので、てみじかに おねがい いたします', en: 'For time reasons, please keep it brief.' },
{ jp: '本件は持ち帰らせていただきます。', r: 'ほんけんは もちかえらせて いただきます', en: 'We will take this away and reconsider.' },
{ jp: '本日はありがとうございました。以上で終了とさせていただきます。', r: 'ほんじつは ありがとうございました。いじょうで しゅうりょうと させて いただきます', en: 'Thank you. That concludes today meeting.' }
]
},
{
id: 'documents', title: 'Sending documents', icon: '📎',
intro: 'Attachment and receipt language is formulaic. ご査収 and ご笑納 are written-only, and both request an act of checking rather than mere receipt.',
lines: [
{ jp: '資料を添付いたしましたのでご確認ください。', r: 'しりょうを てんぷ いたしましたので ごかくにん ください', en: 'I have attached the materials — please check them.' },
{ jp: 'ご査収のほどよろしくお願い申し上げます。', r: 'ごさしゅうの ほど よろしく おねがい もうしあげます', en: 'Please examine and accept the attached.' },
{ jp: '確かに拝受いたしました。', r: 'たしかに はいじゅ いたしました', en: 'I have duly received it.' },
{ jp: '拝見いたしました。ありがとうございます。', r: 'はいけん いたしました。ありがとうございます', en: 'I have looked at it. Thank you.' },
{ jp: '修正版を改めてお送りいたします。', r: 'しゅうせいばんを あらためて おおくり いたします', en: 'I will send a revised version.' },
{ jp: '差し替えをお願いできますでしょうか。', r: 'さしかえを おねがい できますでしょうか', en: 'Could I ask you to replace it?' },
{ jp: 'ご不明な点がございましたらお申し付けください。', r: 'ごふめいな てんが ございましたら おもうしつけ ください', en: 'Please let me know if anything is unclear.' }
]
},
{
id: 'reminder', title: 'Chasing a reply', icon: '⏰',
intro: 'Reminders are the hardest email to write politely. The convention is to blame the message rather than the reader — perhaps it did not arrive.',
lines: [
{ jp: '度々のご連絡失礼いたします。', r: 'たびたびの ごれんらく しつれい いたします', en: 'Apologies for contacting you again.' },
{ jp: '先日お送りしたメールの件でございますが。', r: 'せんじつ おおくりした メールの けんで ございますが', en: 'Regarding the email I sent the other day...' },
{ jp: '行き違いでしたら申し訳ございません。', r: 'いきちがいでしたら もうしわけ ございません', en: 'My apologies if our messages crossed.' },
{ jp: 'ご確認いただけましたでしょうか。', r: 'ごかくにん いただけましたでしょうか', en: 'Have you had a chance to check?' },
{ jp: 'お手すきの際にご返信いただけますと幸いです。', r: 'おてすきの さいに ごへんしん いただけますと さいわいです', en: 'A reply when convenient would be appreciated.' },
{ jp: '恐れ入りますが、今週中にご回答を頂戴できますでしょうか。', r: 'おそれいりますが、こんしゅうちゅうに ごかいとうを ちょうだい できますでしょうか', en: 'Might I have an answer this week?' },
{ jp: 'ご多忙のところ恐縮ですが、よろしくお願いいたします。', r: 'ごたぼうの ところ きょうしゅくですが、よろしく おねがい いたします', en: 'Sorry to press you when busy — thank you.' }
]
},
{
id: 'refusal', title: 'Turning something down', icon: '🚫',
intro: 'Refusals are built from a cushion, a reason, an apology and an alternative. The word 断る itself almost never appears.',
lines: [
{ jp: 'せっかくのお話ではございますが。', r: 'せっかくの おはなしでは ございますが', en: 'It is a kind offer, but...' },
{ jp: '誠に残念ではございますが、今回は見送らせていただきます。', r: 'まことに ざんねんでは ございますが、こんかいは みおくらせて いただきます', en: 'Regrettably, we will pass this time.' },
{ jp: '社内で検討いたしましたが、お引き受けいたしかねます。', r: 'しゃないで けんとう いたしましたが、おひきうけ いたしかねます', en: 'Having discussed it internally, we cannot accept.' },
{ jp: '辞退させていただきたく存じます。', r: 'じたい させて いただきたく ぞんじます', en: 'I should like to decline.' },
{ jp: 'ご期待に添えず申し訳ございません。', r: 'ごきたいに そえず もうしわけ ございません', en: 'I am sorry not to meet your expectations.' },
{ jp: '別の形でご協力できることがあればお申し付けください。', r: 'べつの かたちで ごきょうりょく できる ことが あれば おもうしつけ ください', en: 'If we can help another way, please say.' },
{ jp: '何卒ご容赦くださいますようお願い申し上げます。', r: 'なにとぞ ごようしゃ くださいますよう おねがい もうしあげます', en: 'I ask for your understanding.' }
]
},
{
id: 'request-favor', title: 'Asking a favour', icon: '🙏',
intro: 'A request escalates in three steps: cushion, potential-negative question, and a statement of gratitude that assumes nothing.',
lines: [
{ jp: '恐れ入りますが、一点お願いがございます。', r: 'おそれいりますが、いってん おねがいが ございます', en: 'Excuse me — I have one request.' },
{ jp: 'ご無理を承知でお願い申し上げます。', r: 'ごむりを しょうちで おねがい もうしあげます', en: 'I know it is a lot to ask.' },
{ jp: 'お力添えいただけないでしょうか。', r: 'おちからぞえ いただけないでしょうか', en: 'Might I ask for your assistance?' },
{ jp: 'ご都合のよろしいときで構いません。', r: 'ごつごうの よろしい ときで かまいません', en: 'Whenever is convenient for you is fine.' },
{ jp: 'お引き受けいただけますと大変助かります。', r: 'おひきうけ いただけますと たいへん たすかります', en: 'It would help enormously if you could.' },
{ jp: 'ご負担でしたら遠慮なくお断りください。', r: 'ごふたんでしたら えんりょなく おことわり ください', en: 'Please refuse freely if it is a burden.' },
{ jp: 'ご検討のほどよろしくお願い申し上げます。', r: 'ごけんとうの ほど よろしく おねがい もうしあげます', en: 'I ask that you consider it.' }
]
},
{
id: 'thanks', title: 'Thanking formally', icon: '💌',
intro: 'Formal thanks name the specific act and the benefit. お礼申し上げます outranks ありがとうございます and belongs in writing.',
lines: [
{ jp: '厚く御礼申し上げます。', r: 'あつく おれい もうしあげます', en: 'I thank you warmly.' },
{ jp: '早速のご対応、誠にありがとうございます。', r: 'さっそくの ごたいおう、まことに ありがとうございます', en: 'Thank you sincerely for the prompt response.' },
{ jp: 'お心遣いに感謝申し上げます。', r: 'おこころづかいに かんしゃ もうしあげます', en: 'I am grateful for your thoughtfulness.' },
{ jp: 'おかげさまで無事終了いたしました。', r: 'おかげさまで ぶじ しゅうりょう いたしました', en: 'Thanks to you it finished without incident.' },
{ jp: '身に余るお言葉を頂戴し恐縮です。', r: 'みに あまる おことばを ちょうだいし きょうしゅくです', en: 'Your words are more than I deserve.' },
{ jp: '何とお礼を申し上げてよいか分かりません。', r: 'なんと おれいを もうしあげて よいか わかりません', en: 'I hardly know how to thank you.' },
{ jp: '今後ともご厚誼のほどお願い申し上げます。', r: 'こんごとも ごこうぎの ほど おねがい もうしあげます', en: 'I ask for your continued goodwill.' }
]
},
{
id: 'sick-leave', title: 'Absence and lateness', icon: '🤒',
intro: 'Calling in requires an apology, a reason without detail, a handover and an estimated return. The reason stays vague on purpose.',
lines: [
{ jp: '朝早くから恐れ入ります。', r: 'あさ はやくから おそれいります', en: 'Sorry to call so early.' },
{ jp: '体調が優れず、本日お休みをいただきたく存じます。', r: 'たいちょうが すぐれず、ほんじつ おやすみを いただきたく ぞんじます', en: 'I am unwell and would like to take today off.' },
{ jp: '電車の遅延により、三十分ほど遅れて出社いたします。', r: 'でんしゃの ちえんに より、さんじゅっぷんほど おくれて しゅっしゃ いたします', en: 'Owing to train delays I will be about thirty minutes late.' },
{ jp: 'ご迷惑をおかけして申し訳ございません。', r: 'ごめいわくを おかけして もうしわけ ございません', en: 'I am sorry for the inconvenience.' },
{ jp: '本日の打ち合わせは山田に代わってもらいます。', r: 'ほんじつの うちあわせは やまだに かわって もらいます', en: 'Yamada will cover today meeting for me.' },
{ jp: '明日には出社できる見込みでございます。', r: 'あすには しゅっしゃ できる みこみで ございます', en: 'I expect to be in tomorrow.' },
{ jp: '昨日はお休みをいただきありがとうございました。', r: 'きのうは おやすみを いただき ありがとうございました', en: 'Thank you for letting me take yesterday off.' }
]
}
],

// ===================== COMMON MISTAKES =====================

pitfalls: [
{
id: 'double',
title: '二重敬語 — stacking keigo twice',
body: 'Applying a respectful pattern to a verb that is already respectful. One layer per verb is the rule.',
pairs: [
{ bad: 'おっしゃられる', good: 'おっしゃる', why: 'おっしゃる is already 尊敬語; られる adds a second layer.' },
{ bad: 'ご覧になられる', good: 'ご覧になる', why: 'Same problem — ご覧になる is complete.' },
{ bad: 'お召し上がりになる', good: '召し上がる', why: '召し上がる already contains the respect.' },
{ bad: '拝見させていただく', good: '拝見します', why: '拝見 is already humble; させていただく doubles it.' }
],
note: 'Chaining across two verbs is fine — お読みになっていらっしゃる is 敬語連結, not 二重敬語, because each verb carries one layer.'
},
{
id: 'direction',
title: 'Pointing the respect the wrong way',
body: 'Respectful forms describe other people; humble forms describe you. Swapping them is the most visible error.',
pairs: [
{ bad: '私が申されました', good: '私が申しました', why: 'される cannot apply to yourself.' },
{ bad: '先生が申しました', good: '先生がおっしゃいました', why: 'Humble form used for a respected person.' },
{ bad: '私が召し上がります', good: '私がいただきます', why: '召し上がる is for the other person only.' },
{ bad: 'ご覧になりたいです（自分が）', good: '拝見したいです', why: 'Respectful form applied to your own wish.' }
]
},
{
id: 'kenjo-mix',
title: '伺う and 参る confused',
body: 'Both mean go, but 伺う needs a respected destination and 参る does not.',
pairs: [
{ bad: '駅へ伺います', good: '駅へ参ります', why: 'A station is nobody to respect.' },
{ bad: '部長のところへ参ります（部長に敬意）', good: '部長のところへ伺います', why: 'A respected target calls for 謙譲語Ⅰ.' },
{ bad: 'その件は存じ上げております', good: 'その件は存じております', why: '存じ上げる is reserved for people.' }
]
},
{
id: 'baito',
title: 'バイト敬語 — part-time-job keigo',
body: 'Phrases that spread through service-industry manuals and are widely criticised. Understand them, avoid producing them.',
pairs: [
{ bad: 'よろしかったでしょうか', good: 'よろしいでしょうか', why: 'Past tense for a present question.' },
{ bad: 'こちらコーヒーになります', good: 'こちらコーヒーでございます', why: 'なる implies a change that is not happening.' },
{ bad: '千円からお預かりします', good: '千円お預かりします', why: 'The から has no grammatical role.' },
{ bad: 'お会計のほう、よろしいですか', good: 'お会計はよろしいですか', why: 'ほう vaguely softens nothing.' },
{ bad: 'お名前をいただけますか', good: 'お名前を教えていただけますか', why: 'You cannot receive a name.' }
]
},
{
id: 'register',
title: 'Words that only travel one direction',
body: 'Some set phrases encode rank. Using them upward reads as condescending.',
pairs: [
{ bad: 'ご苦労様です（上司に）', good: 'お疲れ様です', why: 'ご苦労様 goes from superior to subordinate only.' },
{ bad: '了解しました（取引先に）', good: '承知しました / かしこまりました', why: 'Business convention treats 了解 as too casual upward.' },
{ bad: '参考になりました（上司に）', good: '勉強になりました', why: '参考 implies you judged the value of their advice.' },
{ bad: 'なるほどですね', good: 'おっしゃるとおりです', why: 'なるほど evaluates the speaker from above.' }
]
},
{
id: 'aru-verbs',
title: 'The five irregular -aru verbs',
body: 'いらっしゃる, おっしゃる, くださる, なさる and ござる drop to い before ます instead of taking り.',
pairs: [
{ bad: 'いらっしゃります', good: 'いらっしゃいます', why: 'Irregular -aru conjugation.' },
{ bad: 'おっしゃります', good: 'おっしゃいます', why: 'Same pattern.' },
{ bad: 'くださります', good: 'くださいます', why: 'Same pattern.' },
{ bad: 'なさります', good: 'なさいます', why: 'Same pattern.' }
],
note: 'Their imperatives are shortened too: いらっしゃい, おっしゃい, ください, なさい.'
},
{
id: 'sasete-overuse',
title: 'させていただく without permission',
body: 'させていただく is only correct when someone could plausibly refuse or is granting a benefit. Attaching it to routine announcements is the single most-criticised pattern in modern business Japanese.',
pairs: [
{ bad: '本日は閉店させていただきます', good: '本日は閉店いたします', why: 'Nobody grants permission to close for the day.' },
{ bad: '発表させていただきます資料は', good: '発表いたします資料は', why: 'No consent is being received; plain いたす suffices.' },
{ bad: '削除させていただきました', good: '削除いたしました', why: 'A one-sided administrative action, not a favour granted by the reader.' }
],
note: 'A useful check: if you cannot finish the sentence with "…because you kindly allowed it", drop させていただく for いたす.'
},
{
id: 'name-suffix',
title: 'Titles doubling as respect',
body: '様 and さん already carry politeness; stacking a respectful verb on top of a title used for yourself, or dropping 様 for a customer, both misfire.',
pairs: [
{ bad: '私、田中様と申します', good: '私、田中と申します', why: 'You never attach 様 to your own name.' },
{ bad: 'お客様、田中さんがご案内します', good: 'お客様、田中がご案内いたします', why: 'Drop the title on your own colleague when speaking to a customer.' },
{ bad: '山田課長様', good: '山田課長 or 課長の山田', why: '課長 is already a title; 様 on top of it is redundant.' }
]
}
,
{
id: 'ra-nuki-keigo',
title: 'ら抜き言葉 leaking into keigo',
body: 'Dropping ら from potential forms is common in casual speech but stands out even more sharply in keigo, where it clashes with the formal register around it.',
pairs: [
{ bad: '来れますか（お客様に）', good: '来られますか / いらっしゃれますか', why: 'ら抜き reads as casual, jarring against a respectful context.' },
{ bad: '食べれますか', good: '召し上がれますか', why: 'Dropping ら undercuts the respectful verb entirely.' },
{ bad: '見れますか', good: 'ご覧になれますか', why: 'Same pattern — casual contraction clashing with formal register.' }
]
},
{
id: 'over-hedging',
title: 'Stacking too many softeners',
body: 'Keigo rewards one respectful layer, not several hedges piled on top of each other. Overdoing it reads as anxious rather than polite.',
pairs: [
{ bad: 'もしよろしければ、お差し支えなければ、可能でしたら…', good: 'よろしければ〜', why: 'Pick one softening phrase, not a chain of them.' },
{ bad: '大変恐縮ではございますが、誠に申し訳ございませんが…', good: '恐縮ですが〜 / 申し訳ございませんが〜', why: 'One apology-softener is enough; stacking both is redundant.' }
],
note: 'A single well-placed 恐れ入りますが or 恐縮ですが carries the same social weight as several stacked together.'
},

{
id: 'prefix-choice',
title: 'お or ご — picking the wrong prefix',
body: 'The default is お for native readings and ご for Sino-Japanese compounds. The rule holds often, and the exceptions are common words rather than rare ones.',
pairs: [
{ bad: 'ご名前', good: 'お名前', why: '名前 is a native reading, so it takes お.' },
{ bad: 'お住所', good: 'ご住所', why: '住所 is a Sino-Japanese compound.' },
{ bad: 'ご電話', good: 'お電話', why: 'An established exception — 電話 takes お despite being Sino-Japanese.' },
{ bad: 'ご返事いたします', good: 'お返事いたします', why: 'Both exist, but お返事 is far more usual in speech.' }
],
note: 'Other frequent exceptions taking お: お食事, お掃除, お会計, お礼, お時間.'
},
{
id: 'bikago-overuse',
title: 'Prefixing words that resist it',
body: 'Loanwords, long compounds and words about other people generally reject the beautifying prefix. Attaching it anyway sounds affected rather than polite.',
pairs: [
{ bad: 'おビールをお持ちしました', good: 'ビールをお持ちしました', why: 'Loanwords rarely take the prefix outside dated service speech.' },
{ bad: 'お店員さんに伺いました', good: '店員の方に伺いました', why: 'The prefix does not attach to job titles this way.' },
{ bad: 'ごパソコンをご覧ください', good: 'パソコンをご覧ください', why: 'The verb already carries the respect; the noun does not need it.' }
],
note: 'Native speakers disagree at the edges — おトイレ and おソース are accepted by many. If a form sounds odd to you, drop the prefix.'
},
{
id: 'uchi-soto-raise',
title: 'Raising your own side to an outsider',
body: 'To someone outside your group, everyone inside it — including your boss — is lowered. Titles are dropped and 尊敬語 becomes 謙譲語.',
pairs: [
{ bad: '部長はただいま外出されています', good: '部長の田中はただいま外出しております', why: 'Your own manager is lowered when speaking to a client.' },
{ bad: '弊社の社長がおっしゃいました', good: '弊社の社長が申しておりました', why: 'おっしゃる raises your own side to an outsider.' },
{ bad: '田中さんは席にいらっしゃいません', good: '田中は席を外しております', why: 'Drop the suffix and the respectful verb for your own colleague.' }
],
note: 'Reverse it inside the office: 部長がおっしゃいました is correct when speaking to a colleague.'
},
{
id: 'tondemo',
title: 'とんでもございません',
body: 'とんでもない is a single adjective, so splitting it to insert ございません is formally irregular. The form is nonetheless extremely widespread.',
pairs: [
{ bad: 'とんでもございません', good: 'とんでもないことでございます', why: 'The formally consistent version keeps とんでもない intact.' },
{ bad: 'とんでもありません', good: '恐れ入ります', why: 'Sidestepping the construction avoids the argument entirely.' }
],
note: '敬語の指針 explicitly treats とんでもございません as established usage. This is a case where prescription and practice have parted ways.'
},
{
id: 'o-ukagai',
title: 'お伺いする',
body: '伺う is already 謙譲語Ⅰ, so adding お is technically a second layer. The guidelines nonetheless list it among forms accepted by convention.',
pairs: [
{ bad: 'お伺いさせていただきます', good: '伺います', why: 'Three layers on one verb is indefensible even by the lenient reading.' },
{ bad: 'お伺いいたしたく存じます', good: '伺いたく存じます', why: 'Trim to one humble marker in written requests.' }
],
note: 'Plain お伺いします is safe in speech. It is the stacked versions that draw correction.'
},
{
id: 'shitsurei-tense',
title: '失礼します or 失礼しました',
body: 'The tense tracks whether the intrusion is beginning or finished. Getting it backwards is a small slip that native listeners notice immediately.',
pairs: [
{ bad: '（入室時に）失礼しました', good: '失礼します', why: 'You are about to intrude, so the intrusion is not yet past.' },
{ bad: '（ぶつかった後に）失礼します', good: '失礼しました', why: 'The intrusion has already happened.' },
{ bad: '（電話を切るとき）失礼しました', good: '失礼いたします', why: 'Ending a call is treated as an ongoing departure.' }
]
},
{
id: 'sumimasen-formal',
title: 'すみません where an apology is needed',
body: 'すみません covers thanks, apology and getting attention, which is exactly why it is too light for a real apology to a client.',
pairs: [
{ bad: 'すみませんでした', good: '申し訳ございませんでした', why: 'A genuine business apology needs the heavier form.' },
{ bad: 'すいません', good: '恐れ入ります', why: 'すいません is a casual contraction; use a cushion word instead.' },
{ bad: 'ごめんなさい（取引先に）', good: '大変申し訳ございません', why: 'ごめんなさい belongs to private relationships.' }
],
note: 'すみません is fine for attracting attention: すみません、お伺いします.'
},
{
id: 'adjective-gozaimasu',
title: 'Adjectives with ございます',
body: 'Adjectives take a sound change before ございます — おいしい becomes おいしゅう. The forms are correct but read as old-fashioned outside set phrases.',
pairs: [
{ bad: 'おいしいでございます', good: 'おいしゅうございます', why: 'The plain adjective cannot sit directly before でございます.' },
{ bad: '高いでございます', good: '高うございます', why: 'Same sound change: 高い becomes 高う.' },
{ bad: '大変結構でございました', good: '大変結構でした', why: 'な-adjectives take で directly without the sound change.' }
],
note: 'ありがとうございます is the same construction, fossilised — which is why nobody hears it as archaic.'
},
{
id: 'dekimasen',
title: 'Saying no without saying できません',
body: 'A bare できません is blunt in service and business Japanese. いたしかねます frames the refusal as difficulty rather than refusal.',
pairs: [
{ bad: 'できません', good: 'いたしかねます', why: 'かねる softens an outright inability into a limit.' },
{ bad: '分かりません', good: '分かりかねます', why: 'Same construction applied to knowledge.' },
{ bad: 'ありません', good: 'ございません', why: 'The formal negative of ある in any service setting.' }
],
note: 'いたしかねます already means no. Adding 申し訳ございませんが in front is normal; adding a second apology after is padding.'
},
{
id: 'zonjimasen',
title: '存じません and 存じ上げません',
body: 'The humble verb of knowing splits by object: things and facts take 存じません, people take 存じ上げません.',
pairs: [
{ bad: 'その件は存じ上げません', good: 'その件は存じません', why: '存じ上げる is 謙譲語Ⅰ and needs a person as its object.' },
{ bad: '田中様は存じません', good: '田中様は存じ上げません', why: 'A person as object takes the Ⅰ form.' },
{ bad: '知りません（お客様に）', good: '存じません', why: '知りません is too flat when facing a customer.' }
]
},
{
id: 'kosoado',
title: 'Casual demonstratives in polite speech',
body: 'The こっち series is the casual register of こちら. A single one in an otherwise formal sentence undoes the whole register.',
pairs: [
{ bad: 'こっちの資料をご覧ください', good: 'こちらの資料をご覧ください', why: 'こちら is the polite series.' },
{ bad: 'どっちがよろしいですか', good: 'どちらがよろしいでしょうか', why: 'どちら pairs with the polite question ending.' },
{ bad: 'あの人がおっしゃいました', good: 'あちらの方がおっしゃいました', why: 'あの人 is neutral at best; あちらの方 raises them.' }
]
},
{
id: 'anata',
title: 'あなた to someone above you',
body: 'あなた is not a polite pronoun in Japanese. Addressing a superior or a client with it reads as distant or confrontational.',
pairs: [
{ bad: 'あなたのご意見は', good: '田中様のご意見は', why: 'Use the name plus a suffix.' },
{ bad: 'あなたの会社では', good: '御社では', why: 'The organisation has its own honorific form.' },
{ bad: 'あなたはどう思われますか', good: 'いかがお考えでしょうか', why: 'Dropping the pronoun entirely is the most natural fix.' }
],
note: 'Japanese prefers to omit the second person altogether. If you can drop it, drop it.'
},
{
id: 'first-person',
title: 'Which word you use for yourself',
body: 'The first person carries register too. 僕 and 俺 undercut any keigo built on top of them.',
pairs: [
{ bad: '僕が伺います', good: '私が伺います', why: '私 is the neutral business first person.' },
{ bad: '俺がやっておきます', good: '私が対応いたします', why: 'Both the pronoun and the verb needed raising.' },
{ bad: 'うちの会社では（取引先に）', good: '弊社では', why: 'うち is casual; 弊社 lowers your own organisation properly.' }
],
note: 'わたくし is the formal step above 私, standard in ceremonies and first meetings.'
},
{
id: 'sensei-sama',
title: 'Titles that already contain respect',
body: '先生, 社長 and 課長 are honorific in themselves. Adding 様 or さん stacks respect on a word that has it.',
pairs: [
{ bad: '先生様', good: '先生', why: '先生 is already a respectful address.' },
{ bad: '社長様', good: '社長', why: 'Titles do not take 様 when addressing directly.' },
{ bad: '山田社長様', good: '山田社長', why: 'Name plus title is complete on its own.' }
],
note: 'In writing to an unknown holder of a role, 各位 or ご担当者様 covers it without stacking.'
},
{
id: 'minasama-gata',
title: 'Plural honorifics doubling up',
body: '様 and 方 are both honorific plurals in certain combinations, and 各位 already means everyone. Combining them repeats respect rather than increasing it.',
pairs: [
{ bad: 'お客様各位様', good: 'お客様各位', why: '各位 already carries the address.' },
{ bad: '皆様方各位', good: '皆様', why: 'One plural honorific is enough.' },
{ bad: 'ご来場の皆様がた各位', good: 'ご来場の皆様', why: 'Stacking three markers is not more polite.' }
],
note: '皆様方 on its own is acceptable and quite common in speeches — it is the third layer that breaks it.'
},
{
id: 'onsha-kisha',
title: '御社 in writing, 貴社 in speech',
body: 'Both mean your company. The split is by channel, not by politeness, and job applicants are corrected on it constantly.',
pairs: [
{ bad: '（面接で）貴社を志望いたしました', good: '御社を志望いたしました', why: '御社 is the spoken form.' },
{ bad: '（メールで）御社ますますご清栄のことと', good: '貴社ますますご清栄のことと', why: '貴社 is the written form.' },
{ bad: '御社の田中様（宛名に）', good: '株式会社〇〇 田中様', why: 'Address lines take the actual company name.' }
],
note: 'The same split applies to 貴行・御行 for banks and 貴校・御校 for schools.'
},
{
id: 'toritsugi',
title: 'Answering the phone about a colleague',
body: 'A caller from outside is an outsider, so your colleague is lowered no matter how senior they are — even if the caller asked for them respectfully.',
pairs: [
{ bad: '田中さんはいらっしゃいません', good: '田中は席を外しております', why: 'Drop both the suffix and the respectful verb.' },
{ bad: '部長は会議に出席されています', good: '部長の山田は会議に出ております', why: 'Your own manager takes humble forms toward a caller.' },
{ bad: '田中様に伝えておきます', good: '田中に申し伝えます', why: '申し伝える is the humble form for passing a message internally.' }
],
note: 'The caller will use いらっしゃいますか about your colleague. Do not mirror it back.'
},
{
id: 'omachi-tense',
title: 'Tense in fixed service phrases',
body: 'Several service phrases are fixed in one tense. Switching it changes what you are claiming about the timeline.',
pairs: [
{ bad: 'お待ちしております（到着後に）', good: 'お待ちしておりました', why: 'The waiting is over once they have arrived.' },
{ bad: 'お世話になりました（継続中の相手に）', good: 'お世話になっております', why: 'The relationship is ongoing, so the progressive is right.' },
{ bad: 'ありがとうございました（これからも続く関係で）', good: 'ありがとうございます', why: 'The past form closes the matter off.' }
]
},
{
id: 'kudasaru-itadaku',
title: 'いただく and くださる pointed backwards',
body: 'いただく makes you the subject receiving; くださる makes them the subject giving. Swapping the subjects produces sentences that mean the opposite of what was intended.',
pairs: [
{ bad: '私がご説明いただきます', good: '私がご説明いたします', why: 'You are giving the explanation, not receiving one.' },
{ bad: '先生が教えていただきました', good: '先生が教えてくださいました', why: 'With 先生 as subject, the giving verb is required.' },
{ bad: 'お客様にご覧いただけません', good: 'お客様はご覧になれません', why: 'Describing what the customer can do takes the respectful potential.' }
]
},
{
id: 'family-keigo',
title: 'Keigo about your own family',
body: 'Your family is 内 when you speak to anyone outside it. Their actions take humble forms and their titles take the plain series.',
pairs: [
{ bad: 'うちの母がおっしゃっていました', good: '母が申しておりました', why: 'Your own mother is lowered to an outsider.' },
{ bad: 'お父さんは会社にいらっしゃいます', good: '父は会社におります', why: 'Use 父 rather than お父さん when speaking about him.' },
{ bad: '息子さんが大学に入られました', good: '息子が大学に入りました', why: 'The suffix and honorific belong to other people children.' }
],
note: 'Reverse it for their family: お母様, ご子息, ご主人様 all take the respectful series.'
},
{
id: 'spoken-leak',
title: 'Spoken forms leaking into formal writing',
body: 'Written Japanese sits a notch above speech. A single casual connective is enough to break the register of an otherwise careful email.',
pairs: [
{ bad: 'なので、ご確認をお願いします', good: 'つきましては、ご確認をお願い申し上げます', why: 'なので is spoken; つきましては is the written connective.' },
{ bad: 'ちょっとお時間いただけますか', good: '少々お時間を頂戴できますでしょうか', why: 'ちょっと is casual in writing.' },
{ bad: 'すごく助かりました', good: '大変助かりました', why: 'すごく belongs to conversation.' }
]
},
{
id: 'o-suru-no-target',
title: 'お〜する with nothing to aim at',
body: 'お〜する is 謙譲語Ⅰ and requires a target the action reaches. Applied to actions that touch nobody, it produces sentences that lower you toward no one.',
pairs: [
{ bad: 'お先にお帰りします', good: 'お先に失礼いたします', why: 'Going home does not reach the listener.' },
{ bad: '明日ご出席します', good: '明日出席いたします', why: 'Attending lands on nobody, so 謙譲語Ⅱ applies.' },
{ bad: '来週お休みします', good: '来週休ませていただきます', why: 'Taking leave needs the permission frame, not お〜する.' }
]
},
{
id: 'counting',
title: 'Counters with honorific forms',
body: 'People are counted differently depending on register. 名様 is service-level, 名 is neutral, 人 is plain.',
pairs: [
{ bad: '二人様でよろしいですか', good: '二名様でよろしいでしょうか', why: '名様 is the service counter for guests.' },
{ bad: '私ども三名様で伺います', good: '私ども三名で伺います', why: '様 never applies to your own side.' },
{ bad: 'お一人でいらっしゃいますか', good: 'お一人様でいらっしゃいますか', why: 'The service register expects 様 for the customer.' }
]
},
{
id: 'reported-speech',
title: 'Reporting what someone said',
body: 'Reported speech carries the same direction rules as direct speech. Whose words they were decides which verb you use.',
pairs: [
{ bad: '社長が申しておりました（社内で）', good: '社長がおっしゃっていました', why: 'Inside the company your president is raised.' },
{ bad: '弊社の社長がおっしゃっていました（客先で）', good: '弊社の社長が申しておりました', why: 'To a client your own president is lowered.' },
{ bad: 'お客様が申されました', good: 'お客様がおっしゃいました', why: '申す is humble and cannot describe a customer.' }
]
},
{
id: 'dochira-sama',
title: 'Asking who someone is',
body: '誰 is too direct when the answer concerns a customer or a caller. どちら様 handles the same question respectfully.',
pairs: [
{ bad: '誰ですか', good: 'どちら様でしょうか', why: 'The polite interrogative for a person.' },
{ bad: 'どこの会社ですか', good: 'どちらの会社でいらっしゃいますか', why: 'どちら also replaces どこ in polite questions.' },
{ bad: '何の用ですか', good: 'どのようなご用件でしょうか', why: 'ご用件 is the polite noun for business at hand.' }
]
},
{
id: 'mairu-for-others',
title: '参る applied to the other person',
body: '参る is 謙譲語Ⅱ. It lowers whoever it describes, so using it about a customer inverts the whole sentence.',
pairs: [
{ bad: 'お客様が参りました', good: 'お客様がお見えになりました', why: 'A customer arriving takes a respectful verb.' },
{ bad: '先生が参ります', good: '先生がいらっしゃいます', why: '参る cannot describe someone you respect.' },
{ bad: 'どちらへ参りますか', good: 'どちらへいらっしゃいますか', why: 'Asking where they are going needs 尊敬語.' }
],
note: 'The exception is announcements about objects: 電車が参ります is correct, because a train is not a person.'
},
{
id: 'oru-for-others',
title: 'おる applied to the other person',
body: 'おる is the humble verb of existing. Applied to a customer or a superior it lowers exactly the person you meant to raise.',
pairs: [
{ bad: 'お客様がおられます', good: 'お客様がいらっしゃいます', why: 'いらっしゃる is the respectful existence verb.' },
{ bad: '社長はおられますか（社外の方が）', good: '社長はいらっしゃいますか', why: 'An outsider asking about your president raises him.' },
{ bad: '先生が待っておられます', good: '先生がお待ちになっています', why: 'The respectful progressive avoids おる entirely.' }
],
note: 'おられる is standard in some western dialects, which is why it is heard often. In national business Japanese it is still avoided.'
},
{
id: 'sonkeigo-noun-self',
title: 'Honorific prefixes on your own things',
body: 'お and ご raise what they attach to. On your own name, opinion or family they raise you, which is the direction error in noun form.',
pairs: [
{ bad: '私のお名前は田中です', good: '私は田中と申します', why: 'Your own name takes no prefix.' },
{ bad: '私のご意見では', good: '私の意見では', why: 'Your opinion is not raised.' },
{ bad: '弊社のご担当者が伺います', good: '弊社の担当者が伺います', why: 'Your own staff are lowered, not raised.' }
],
note: 'The exceptions are 美化語 words fused with the prefix — お茶 and ご飯 stay prefixed even when they are yours.'
},
{
id: 'keigo-negation',
title: 'Negatives that come out heavier than intended',
body: 'Negative questions in keigo can turn accusatory. The convention is to make the negative about possibility, not about the person.',
pairs: [
{ bad: 'ご存じないのですか', good: 'ご存じでいらっしゃいますか', why: 'The negative question implies they should have known.' },
{ bad: 'おっしゃいませんでしたか', good: '伺っておりませんでしたでしょうか', why: 'Shifting the negative onto yourself avoids blame.' },
{ bad: 'まだご確認されていませんか', good: 'ご確認いただけましたでしょうか', why: 'The positive question carries no accusation.' }
]
},
{
id: 'itadaku-scope',
title: 'Thinking いただく is only about food',
body: 'いただく is the humble verb of receiving in general. Eating is one instance of receiving, not the core meaning, which is why it appears throughout business Japanese.',
pairs: [
{ bad: 'お名前をもらえますか', good: 'お名前を頂戴できますでしょうか', why: 'Receiving anything from a customer takes the humble verb.' },
{ bad: 'ご確認してもらえますか', good: 'ご確認いただけますでしょうか', why: 'The request form is built on いただく, not もらう.' },
{ bad: '資料をもらいました（客先から）', good: '資料を頂戴いたしました', why: 'もらう is neutral and too flat toward a client.' }
]
}
],

// ===================== QUIZ =====================

quiz: [
{ q: '先生が本を＿＿。（読む・尊敬語）', choices: ['お読みになります', 'お読みします', '読ませていただきます', '拝読します'], a: 0, why: 'The teacher is the subject, so the respectful お〜になる pattern applies.' },
{ q: '（自分が）資料を＿＿。（見る・謙譲語）', choices: ['ご覧になります', '拝見します', 'お見になります', '見られます'], a: 1, why: '拝見する is the humble form. ご覧になる would elevate yourself.' },
{ q: '部長は何と＿＿か。（言う・尊敬語）', choices: ['申しました', 'おっしゃいました', '申し上げました', '言われて'], a: 1, why: 'おっしゃる is the respectful form; 申す family is humble.' },
{ q: '山田と＿＿。（自己紹介）', choices: ['おっしゃいます', '申します', '申し上げます', 'いらっしゃいます'], a: 1, why: 'Introducing yourself has no target, so 謙譲語Ⅱ 申す.' },
{ q: '明日、御社に＿＿。', choices: ['参ります', '伺います', 'いらっしゃいます', 'おいでになります'], a: 1, why: 'A respected destination calls for 謙譲語Ⅰ 伺う.' },
{ q: '来週、大阪へ＿＿。（出張）', choices: ['伺います', '参ります', 'いらっしゃいます', 'お越しになります'], a: 1, why: 'Osaka is not a person, so the courteous 参る is correct.' },
{ q: 'どうぞ＿＿ください。（食べる・尊敬語）', choices: ['いただいて', '召し上がって', 'お食べになられて', '頂戴して'], a: 1, why: '召し上がる is respectful; いただく and 頂戴する are humble.' },
{ q: 'この件について＿＿おりません。（知る）', choices: ['ご存じ', '存じ上げて', '存じて', 'お知りになって'], a: 2, why: '存じる is for facts; 存じ上げる is reserved for people.' },
{ q: '正しいのはどれ？', choices: ['おっしゃられました', 'おっしゃいました', 'お言いになりました', '申されました'], a: 1, why: 'おっしゃられる is 二重敬語 — one layer of respect per verb.' },
{ q: '（お客様に）お待ち＿＿。', choices: ['してください', 'いたしてください', 'ください', 'させてください'], a: 2, why: 'お + stem + ください is the respectful request.' },
{ q: '荷物を＿＿。（自分が客の荷物を持つ）', choices: ['お持ちになります', 'お持ちします', 'お持ちになられます', '持たれます'], a: 1, why: 'Your action toward the customer takes the humble お〜する.' },
{ q: '取引先に自分の上司のことを話すとき、正しいのは？', choices: ['田中部長はいらっしゃいません', '田中部長はおりません', '田中は外出しております', '田中さんは外出されています'], a: 2, why: 'To an outsider your boss becomes an insider: humble form, no title.' },
{ q: '「ご苦労様です」を使ってよいのは？', choices: ['上司に対して', '部下に対して', '取引先に対して', '先生に対して'], a: 1, why: 'ご苦労様 travels downward only. Upward, use お疲れ様です.' },
{ q: '「いらっしゃる」のます形は？', choices: ['いらっしゃります', 'いらっしゃいます', 'いらっしゃれます', 'いらっしゃるます'], a: 1, why: 'One of the five irregular -aru verbs.' },
{ q: '正しい言い方は？（レジで）', choices: ['千円からお預かりします', '千円お預かりします', '千円をいただきます', '千円になります'], a: 1, why: 'The から in 千円から is バイト敬語 with no grammatical role.' },
{ q: '「こちらコーヒーになります」の正しい形は？', choices: ['こちらコーヒーでございます', 'こちらコーヒーになられます', 'こちらコーヒーです', 'こちらコーヒーでいらっしゃいます'], a: 0, why: 'なる implies a change. でございます is the polite copula for objects.' },
{ q: '社長に「わかりました」と伝えるとき最も適切なのは？', choices: ['了解です', '了解しました', '承知いたしました', 'わかりました'], a: 2, why: '承知いたしました is the standard upward form.' },
{ q: '（自分が）先生に会う。', choices: ['お会いになります', 'お目にかかります', 'お目にかけます', 'ご覧になります'], a: 1, why: 'お目にかかる is humble "meet"; お目にかける means "show".' },
{ q: '「する」の丁重語は？', choices: ['なさる', 'される', 'いたす', 'させていただく'], a: 2, why: 'いたす is 謙譲語Ⅱ; なさる and される are respectful.' },
{ q: '「休業します」の正しい敬語は？', choices: ['休業させていただきます', '休業いたします', '休業になります', 'お休業します'], a: 1, why: 'Nobody grants permission to close, so させていただく is not warranted.' },
{ q: '「お客様がお見えになりました」の意味は？', choices: ['お客様が見た', 'お客様が来た', 'お客様が見せた', 'お客様が見られた'], a: 1, why: 'お見えになる is a respectful form of 来る, not 見る.' },
{ q: 'ご + 漢語 の組み合わせが正しいのは？', choices: ['ご名前', 'ご住所', 'ごコーヒー', 'ご手紙'], a: 1, why: 'ご attaches to Sino-Japanese readings; 名前 and 手紙 take お, loanwords take neither.' },
{ q: '「田中様＿＿か」（本人確認）', choices: ['でございます', 'でいらっしゃいます', 'とおっしゃいます', 'になります'], a: 1, why: 'でございます describes yourself or things; the listener takes でいらっしゃいます.' },
{ q: '「注文を受けました」の敬語は？', choices: ['ご注文を承りました', 'ご注文をいただかれました', 'ご注文をお受けになりました', 'ご注文を頂戴されました'], a: 0, why: '承る is the humble form for accepting an order.' },
{ q: '二重敬語ではないものは？', choices: ['お読みになられる', 'お伺いいたします', 'お読みになっていらっしゃる', 'ご覧になられる'], a: 2, why: 'Two verbs each carrying one layer of respect is 敬語連結, which is acceptable.' },
{ q: 'お客様を席に案内するとき正しいのは？', choices: ['お座りください', 'おかけください', 'お座りしてください', '座られてください'], a: 1, why: 'おかけください is the standard respectful invitation to sit.' },
{ q: '「利用する」の尊敬語として不自然でないものは？', choices: ['ご利用される', 'ご利用になる', 'ご利用させる', 'ご利用いたす'], a: 1, why: 'ご利用になる is the clear, standard respectful form for Sino-Japanese verbs.' },
{ q: '閉店のお知らせとして適切なのは？', choices: ['本日休業させていただきます', '本日休業いたします', '本日休業されます', '本日休業なさいます'], a: 1, why: 'No one grants permission to close, so plain いたします is correct.' },
{ q: '自分の名前を名乗るとき正しいのは？', choices: ['田中様と申します', '田中と申します', '田中さんと申します', '田中でいらっしゃいます'], a: 1, why: 'Never attach 様 or さん to your own name.' },
{ q: 'パスポートを見せてもらうとき、フロントで適切なのは？', choices: ['パスポートを拝見します', 'パスポートをご覧になります', 'パスポートを見せていただきます', 'パスポートを拝見してもよろしいでしょうか'], a: 3, why: 'A polite request form, not a bare declarative, suits asking a guest for a document.' },
{ q: '「明日、そちらに参ってもよろしいでしょうか」の下線部が正しい理由は？', choices: ['相手の会社は敬意の対象ではないから', '目的地が特に敬意の対象ではないから', '謙譲語Ⅰを使うべきだから', '尊敬語を使うべきだから'], a: 1, why: '相手の会社を訪ねる場合は伺う（謙譲語Ⅰ）が適切。参るは目的地に敬意がない場合。' },
{ q: '「ご確認いただけますでしょうか」の敬語の種類は？', choices: ['尊敬語のみ', '謙譲語Ⅰのみ', '謙譲語Ⅰと丁寧語の組み合わせ', '美化語'], a: 2, why: 'いただく（謙譲語Ⅰ）とでしょうか（丁寧語）が組み合わさっている。' },
{ q: '「お心遣い、ありがとうございます」はどんな場面で使う？', choices: ['謝罪するとき', '贈り物を受け取ったとき', '電話を切るとき', '自己紹介するとき'], a: 1, why: '相手の気遣いや贈り物に感謝する定型表現。' },
{ q: '「ら抜き言葉」が敬語で問題になる理由は？', choices: ['文法的に誤りだから', '尊敬語の効果を弱めるから', '古い言い方だから', '意味が変わるから'], a: 1, why: 'ら抜きはカジュアルな響きがあり、周囲の丁寧な表現と合わない。' },
{ q: '「ご案内申し上げます」の申し上げますの役割は？', choices: ['丁寧語を加える', '謙譲語Ⅰの動詞を作る', '尊敬語に変える', '美化語にする'], a: 1, why: '申し上げる自体が謙譲語Ⅰの動詞。' },
{ q: '「拝借する」はどの動詞の謙譲語？', choices: ['読む', '借りる', '見る', '聞く'], a: 1, why: '拝借するは借りるの謙譲語Ⅰ。' },
{ q: '「お住まいはどちらですか」の意味は？', choices: ['どこで働いていますか', 'どこに住んでいますか', 'どこで生まれましたか', 'どこへ行きますか'], a: 1, why: 'お住まいは住むの尊敬の名詞形。' },
{ q: '結婚式などの案内状で使われる表現は？', choices: ['ぜひご出席賜りますようお願い申し上げます', 'よかったら来てね', '来てください', '出席してください'], a: 0, why: 'フォーマルな招待状の定型表現。' },
{ q: '「重ねてお詫び申し上げます」はどんな場面？', choices: ['お礼を言うとき', '苦情対応で再度謝罪するとき', '自己紹介するとき', '電話を取り次ぐとき'], a: 1, why: '重ねては「再度」を意味し、謝罪を繰り返す場面に使う。' },
{ q: '「以後、お見知りおきください」の意味に近いのは？', choices: ['今後もよろしくお願いします', 'もう会いません', 'お先に失礼します', 'お大事にしてください'], a: 0, why: '初対面の挨拶で、今後の関係を願う表現。' },
{ q: '「ご不明な点がございましたら」の後に続く自然な表現は？', choices: ['お問い合わせください', '聞いてね', '教えてください', '連絡して'], a: 0, why: '公式な案内文に合う丁寧な依頼表現。' },
{ q: '「大変恐縮ではございますが、誠に申し訳ございませんが」の問題点は？', choices: ['敬語が足りない', 'ソフナーを重ねすぎている', '文法的に誤り', '謙譲語が欠けている'], a: 1, why: '謝罪のソフナーを二重に重ねており冗長。' },
{ q: '「謹んでお知らせ申し上げます」はどんな文書で使う？', choices: ['友人へのメール', '公式なお知らせ・案内状', 'カジュアルなSNS投稿', '電話の挨拶'], a: 1, why: '謹んでは非常にフォーマルな書き言葉で公式文書向き。' },
{ q: '「ご冥福をお祈りいたします」はどんな場面で使う？', choices: ['結婚式', 'お悔やみ', '就職面接', '電話対応'], a: 1, why: '故人の死を悼む際の定型表現。' },
{ q: '「喜んで出席させていただきます」のさせていただくが適切な理由は？', choices: ['相手の許可や招待に応じているから', '単なる動作だから', '謙譲語ではないから', '丁寧語だから'], a: 0, why: '相手からの招待という許可・恩恵があるため、させていただくが自然。' },
{ q: '「お差し支えなければ」の意味に近いのは？', choices: ['もしよろしければ', '絶対に', 'すぐに', '残念ながら'], a: 0, why: '相手に配慮して尋ねる際の柔らかい前置き表現。' },
{ q: '「弊社の田中でございます」の弊社の意味は？', choices: ['あなたの会社', '私たちの会社（謙譲）', '第三者の会社', '有名な会社'], a: 1, why: '弊社は自分の会社をへりくだって言う言葉。' },
{ q: '「御社」と「貴社」の使い分けは？', choices: ['御社は書き言葉、貴社は話し言葉', '御社は話し言葉、貴社は書き言葉', '両方とも話し言葉のみ', '違いはない'], a: 1, why: '御社は話すとき、貴社は書くときに使うのが慣習。' },
{ q: '「一日も早いご回復をお祈り申し上げます」はどんな相手に使う？', choices: ['新入社員', '病気や怪我をした人', '退職する人', '結婚する人'], a: 1, why: '体調を気遣う定型的なお見舞いの表現。' },
{ q: '「お引き合わせいただき、ありがとうございます」の意味は？', choices: ['紹介してくれてありがとう', '手伝ってくれてありがとう', '来てくれてありがとう', '待ってくれてありがとう'], a: 0, why: '引き合わせるは人を紹介するという意味。' },

{ q: '「言う」の尊敬語は？', choices: ['伺う', 'おっしゃる', '存じる', '申す'], a: 1, why: 'おっしゃる is the respectful form; 申す is the humble one.' },
{ q: '「食べる」の尊敬語は？', choices: ['召し上がる', '頂戴する', '拝食する', 'いただく'], a: 0, why: '召し上がる raises the person eating.' },
{ q: '「見る」の謙譲語Ⅰは？', choices: ['拝見する', 'ご覧になる', '見られる', 'お見になる'], a: 0, why: '拝見する lowers you toward whoever owns what you are looking at.' },
{ q: '「聞く」の謙譲語として使えないのは？', choices: ['拝聴する', 'お聞きになる', '伺う', '承る'], a: 1, why: 'お聞きになる is 尊敬語, not 謙譲語.' },
{ q: '「知っている」の尊敬語は？', choices: ['拝察します', 'ご存じです', '存じております', '承知しております'], a: 1, why: 'ご存じ raises the person who knows.' },
{ q: '「会う」の謙譲語Ⅰは？', choices: ['お目にかける', 'お目にかかる', 'ご面会になる', 'お会いになる'], a: 1, why: 'お目にかかる is you meeting them.' },
{ q: '「見せる」の謙譲語Ⅰは？', choices: ['お目にかかる', 'ご覧になる', '拝見する', 'お目にかける'], a: 3, why: 'お目にかける is you showing them something.' },
{ q: '「借りる」の謙譲語Ⅰは？', choices: ['拝聴する', '拝借する', '拝受する', '拝読する'], a: 1, why: '拝借する is the humble form of borrowing.' },
{ q: '「読む」の謙譲語Ⅰは？', choices: ['拝読する', 'ご覧になる', '拝見する', 'お読みになる'], a: 0, why: '拝読する is specific to reading someone written work.' },
{ q: '「もらう」の謙譲語Ⅰとして正しいのは？', choices: ['お渡しする', '頂戴する', 'くださる', 'さしあげる'], a: 1, why: '頂戴する and いただく are the humble forms of receiving.' },
{ q: '「あげる」の謙譲語Ⅰは？', choices: ['さしあげる', 'くださる', 'いただく', '賜る'], a: 0, why: 'さしあげる lowers you as the giver.' },
{ q: '「くれる」の尊敬語は？', choices: ['頂戴する', 'いただく', 'さしあげる', 'くださる'], a: 3, why: 'くださる raises the person giving to you.' },
{ q: '「する」の謙譲語Ⅱは？', choices: ['いたす', 'あそばす', 'される', 'なさる'], a: 0, why: 'いたす is the 丁重語 of する.' },
{ q: '「いる」の謙譲語Ⅱは？', choices: ['おいでになる', 'おる', 'ございます', 'いらっしゃる'], a: 1, why: 'おる lowers you and produces 〜ております.' },
{ q: '「行く」で、相手の会社へ向かうときに使うのは？', choices: ['お越しになります', '参ります', 'いらっしゃいます', '伺います'], a: 3, why: '伺う needs a respected destination, which the client company is.' },
{ q: '「行く」で、駅へ向かうときに使うのは？', choices: ['お見えになります', 'いらっしゃいます', '伺います', '参ります'], a: 3, why: 'A station deserves no respect, so 参る applies.' },
{ q: '「来る」の尊敬語として使われないのは？', choices: ['参る', 'お見えになる', 'いらっしゃる', 'お越しになる'], a: 0, why: '参る is humble and cannot describe the other person coming.' },
{ q: '「思う」の謙譲語Ⅱは？', choices: ['存じる', 'ご存じだ', '拝察する', 'お思いになる'], a: 0, why: '存じる is the 丁重語 of thinking and knowing.' },
{ q: '人について「知らない」と言うときの謙譲語は？', choices: ['存じません', '存じ上げません', '承知しません', '拝察しません'], a: 1, why: '存じ上げる takes a person as its object.' },
{ q: '「受け取る」の謙譲語Ⅰは？', choices: ['拝察する', '拝読する', '拝借する', '拝受する'], a: 3, why: '拝受する is the humble form of receiving a document or item.' },
{ q: '「引き受ける」の謙譲語として自然なのは？', choices: ['承る', 'ご引き受けする', 'お引き受けになる', '拝受する'], a: 0, why: '承る is the fixed humble verb for taking on a request.' },
{ q: '「死ぬ」の尊敬語は？', choices: ['お死にになる', '参る', '亡くなる', 'お亡くなりになる'], a: 3, why: 'お亡くなりになる is the respectful form; 逝去なさる is more formal still.' },
{ q: '「着る」の尊敬語は？', choices: ['お召し上がりになる', 'お着になる', '召し上がる', 'お召しになる'], a: 3, why: '召す gives お召しになる for wearing.' },
{ q: '「寝る」の尊敬語は？', choices: ['お寝になる', '就寝される', 'お眠りになる', 'お休みになる'], a: 3, why: 'One-mora stems block お〜になる, so 休む supplies the form.' },
{ q: '「ある」の丁寧語は？', choices: ['いらっしゃいます', 'ございます', 'おります', '存じます'], a: 1, why: 'ございます is the formal existence verb for things.' },
{ q: '「〜だ」の尊敬語は？', choices: ['でいらっしゃる', 'でございます', 'でおります', 'であります'], a: 0, why: 'でいらっしゃる raises the subject; でございます is 丁寧語.' },
{ q: '「買う」の尊敬語は？', choices: ['お求めになる', 'お買いする', '買われております', 'ご購入する'], a: 0, why: 'お求めになる is the standard retail phrasing.' },
{ q: '「気に入る」の尊敬語は？', choices: ['ご満足する', 'お気に入りになる', 'お好みする', 'お気に召す'], a: 3, why: 'お気に召す is the fixed respectful form.' },
{ q: '「帰る」で自分が退出するときの表現は？', choices: ['お帰りになります', '帰らせられます', 'お帰りします', '失礼いたします'], a: 3, why: 'お〜する needs a target; leaving reaches nobody.' },
{ q: '「待つ」の謙譲語Ⅰは？', choices: ['お待ちする', '待たれる', 'お待ちになる', 'お待たせになる'], a: 0, why: 'お待ちする lowers you toward the person you are waiting for.' },
{ q: '「聞く（尋ねる）」の謙譲語Ⅰとして最も自然なのは？', choices: ['伺う', '拝聴する', 'お聞きになる', 'お尋ねになる'], a: 0, why: '伺う covers both asking and listening humbly.' },
{ q: '「案内する」の謙譲語Ⅰは？', choices: ['ご案内なさる', 'ご案内になる', 'ご案内する', '案内される'], a: 2, why: 'ご案内する directs the action at the person being guided.' },
{ q: '「確認する」の尊敬語は？', choices: ['ご確認いたす', 'ご確認する', '確認させていただく', 'ご確認になる'], a: 3, why: 'ご〜になる is the respectful pattern for Sino-Japanese verbs.' },
{ q: '「説明する」の謙譲語Ⅰは？', choices: ['ご説明いたす', 'ご説明される', 'ご説明なさる', 'ご説明になる'], a: 0, why: 'ご説明いたします lowers you toward the person hearing the explanation.' },
{ q: '「相談する」を上司に持ちかけるときの表現は？', choices: ['ご相談いたされたいのですが', 'ご相談させていただきたいのですが', 'ご相談になりたいのですが', 'ご相談されたいのですが'], a: 1, why: 'The permission frame is natural because you are asking for their time.' },
{ q: '「電話する」の謙譲語Ⅰは？', choices: ['お電話になる', 'お電話される', 'ご電話なさる', 'お電話する'], a: 3, why: 'お電話します or お電話いたします when calling the other person.' },
{ q: '「住む」の尊敬語は？', choices: ['お住みになる', '住まわれます', 'ご在住する', 'お住まいになる'], a: 3, why: 'お住まいになる is the established form.' },
{ q: '「働く」を上司の前で謙遜して言うなら？', choices: ['お働きします', 'お働きになっております', '働かれております', '働かせていただいております'], a: 3, why: 'The permission frame is the natural humble version.' },
{ q: '「出す（提出する）」の謙譲語Ⅰは？', choices: ['ご提出する', '提出される', 'お出しになる', 'ご提出になる'], a: 0, why: 'The action reaches the recipient, so 謙譲語Ⅰ applies.' },
{ q: '「持つ」を客の荷物について言うとき正しいのは？', choices: ['お荷物をお持ちします', 'お荷物をお持ちくださいます', 'お荷物を持たれます', 'お荷物をお持ちになります'], a: 0, why: 'You are the one carrying, so the humble form applies.' },
{ q: '「送る」の謙譲語Ⅰは？', choices: ['送られる', 'お送りする', 'お送りになる', 'ご送付になる'], a: 1, why: 'お送りします reaches the recipient.' },
{ q: '「教える」で、上司に事実を知らせるとき自然なのは？', choices: ['ご教示します', 'お教えになります', 'お伝えします', 'お教えします'], a: 2, why: 'Teaching a superior sounds presumptuous; お伝えする is neutral.' },
{ q: '「教えてもらう」を上司に頼むときの表現は？', choices: ['お教えしてもよろしいですか', 'ご教示いただけますでしょうか', 'お教えになれますか', 'ご教示してくださいますか'], a: 1, why: 'ご教示いただく is the standard humble request for instruction.' },
{ q: '「使う」の尊敬語は？', choices: ['お使いする', '使わせていただく', 'お使いになる', 'ご使用する'], a: 2, why: 'お使いになる or ご使用になる for the other person.' },
{ q: '「利用する」の尊敬語として最も安全なのは？', choices: ['ご利用いたす', 'ご利用される', 'ご利用する', 'ご利用になる'], a: 3, why: 'ご利用になる avoids the layering argument entirely.' },
{ q: '「注文する」を客に確認する言い方は？', choices: ['ご注文を決めますか', 'ご注文されましたか', 'ご注文はお決まりですか', 'ご注文はお決まりしますか'], a: 2, why: 'お決まりですか is the fixed service phrasing.' },
{ q: '「予約する」を店側が受けるときの表現は？', choices: ['ご予約になります', 'ご予約されます', 'ご予約いたします', 'ご予約承ります'], a: 3, why: '承る is the humble verb for accepting a booking.' },
{ q: '「支払う」の尊敬語は？', choices: ['ご支払いする', 'お支払いする', 'お支払いになる', 'お支払いいたす'], a: 2, why: 'The customer pays, so the respectful form applies.' },
{ q: '「乗る」の尊敬語として鉄道で使われるのは？', choices: ['乗せられる', 'お乗りする', 'ご乗車になる', 'ご乗車する'], a: 2, why: 'ご乗車になる is the railway register.' },
{ q: '「休む」を自分の欠勤について言うときの表現は？', choices: ['休ませていただきます', 'お休みされます', 'お休みになります', 'お休みします'], a: 0, why: 'Taking leave requires permission, so させていただく fits.' },
{ q: '「見舞う」の謙譲語Ⅰは？', choices: ['お見舞い申し上げる', 'お見舞いされる', 'お見舞いになる', 'ご見舞いする'], a: 0, why: 'お見舞い申し上げます is the formal expression of sympathy.' },
{ q: '「祝う」の書き言葉での謙譲表現は？', choices: ['お祝いになる', 'お慶び申し上げる', 'お祝われる', 'ご祝いする'], a: 1, why: 'The 慶 kanji marks the written congratulatory register.' },
{ q: '「謝る」の改まった謙譲表現は？', choices: ['ご謝罪になる', '謝らせていただく', 'お謝りする', 'お詫び申し上げる'], a: 3, why: 'The formality sits in the noun お詫び.' },
{ q: '「訪ねる」を客先について言うときの謙譲語は？', choices: ['伺う', 'ご訪問になる', '参る', 'お訪ねになる'], a: 0, why: 'The client is a respected destination, so 伺う applies.' },
{ q: '「承知する」と同じ意味で客に使う言葉は？', choices: ['認識しました', 'かしこまりました', '把握しました', '了解しました'], a: 1, why: 'かしこまりました is the service-level acknowledgement.' },
{ q: '「見る」を客に促すときの正しい形は？', choices: ['お見になってください', '拝見してください', '見られてください', 'ご覧ください'], a: 3, why: '拝見 is humble and cannot be aimed at the customer.' },
{ q: '「考える」の謙譲語Ⅰは？', choices: ['お考えになる', 'ご検討になる', '考えられる', '拝察する'], a: 3, why: '拝察する humbly describes your own inference about someone.' },
{ q: '「答える」を断るときの婉曲表現は？', choices: ['お答えいたしかねます', 'お答えできません', 'お答えしません', 'お答えになれません'], a: 0, why: 'かねる frames the refusal as a limit rather than a refusal.' },
{ q: '「わかりました」を取引先に言うときの表現は？', choices: ['わかりました', '了解です', '承知いたしました', '把握いたしました'], a: 2, why: '承知いたしました is the standard business acknowledgement.' },
{ q: '「もらう」を客の名前について言うときの表現は？', choices: ['お名前をもらえますか', 'お名前をいただきますか', 'お名前をくださいますか', 'お名前を頂戴できますでしょうか'], a: 3, why: '頂戴する is the humble verb for receiving from a customer.' },
{ q: '特別な敬語がない動詞に使う基本の尊敬パターンは？', choices: ['お〜になる', '〜させていただく', 'お〜する', 'お〜いたす'], a: 0, why: 'お〜になる is the main productive respectful pattern.' },
{ q: '特別な敬語がない動詞に使う基本の謙譲パターンは？', choices: ['お〜くださる', 'お〜になる', 'お〜なさる', 'お〜する'], a: 3, why: 'お〜する is the main productive humble pattern.' },
{ q: '漢語動詞の尊敬語パターンは？', choices: ['ご〜になる', 'お〜いたす', 'お〜になる', 'ご〜する'], a: 0, why: 'Sino-Japanese verbs take ご rather than お.' },
{ q: '「お読みになられる」の問題は？', choices: ['二重敬語である', '文法的に不可能', '丁寧語が足りない', '謙譲語である'], a: 0, why: 'お〜になる and られる each add a layer to the same verb.' },
{ q: '「お読みになっていらっしゃる」が許容される理由は？', choices: ['謙譲語だから', '古語だから', '一つの動詞に一層ずつだから', '二重敬語だから'], a: 2, why: 'This is 敬語連結 — two verbs, one layer each.' },
{ q: '「〜れる／〜られる」の敬語としての特徴は？', choices: ['最も軽い尊敬語', '最も強い尊敬語', '美化語', '謙譲語Ⅰ'], a: 0, why: 'It is the lightest respectful form and can be misread as passive.' },
{ q: '「お見になる」が誤りである理由は？', choices: ['見るは漢語だから', '謙譲語だから', '一音節の語幹には使えないから', '古語だから'], a: 2, why: 'One-mora stems block the pattern; ご覧になる replaces it.' },
{ q: '「お〜ください」はどの種類の敬語？', choices: ['美化語', '謙譲語Ⅱ', '尊敬語', '謙譲語Ⅰ'], a: 2, why: 'It asks the respected person to act, so it is 尊敬語.' },
{ q: '「お〜になれます」が表すのは？', choices: ['相手の可能', '過去の動作', '自分の能力', '許可の願い'], a: 0, why: 'It is the potential of お〜になる, describing what the other person can do.' },
{ q: '「お〜できます」を客の能力について使うと？', choices: ['正しい', '二重敬語になる', '自分を下げてしまう', '美化語になる'], a: 2, why: 'It is humble in shape, so it lowers the wrong person.' },
{ q: '「〜ていただく」の主語は？', choices: ['不特定', '相手', '自分', '第三者'], a: 2, why: 'You are the subject receiving the benefit.' },
{ q: '「〜てくださる」の主語は？', choices: ['相手', '自分', '不特定', '第三者'], a: 0, why: 'The other person is the subject giving the benefit.' },
{ q: '「〜させていただく」が適切なのは？', choices: ['物について言うとき', '自分だけで決めたとき', '相手が動作するとき', '相手の許可や恩恵があるとき'], a: 3, why: 'The construction presupposes permission or benefit.' },
{ q: '「本日休業させていただきます」の問題は？', choices: ['二重敬語である', '謙譲語が足りない', '丁寧語がない', '誰の許可も得ていない'], a: 3, why: 'Nobody grants permission to close, so 休業いたします is correct.' },
{ q: '「お待ちいたします」が「お待ちします」より丁寧な理由は？', choices: ['美化語だから', '二重敬語だから', '丁重語のいたすが加わるから', '尊敬語が加わるから'], a: 2, why: 'いたす adds a 謙譲語Ⅱ layer on top of the 謙譲語Ⅰ direction.' },
{ q: '「ご出席します」が誤りである理由は？', choices: ['古語だから', '尊敬語だから', '漢語だから', '動作が相手に及ばないから'], a: 3, why: 'お／ご〜する needs a target the action reaches.' },
{ q: '「参る」と「伺う」の違いを決めるのは？', choices: ['目的地に敬意があるか', '話し相手の年齢', '動詞の活用', '文の長さ'], a: 0, why: '伺う needs a respected destination; 参る does not.' },
{ q: '「おる」が使えないのは？', choices: ['自分の家族', '自分', '客', '自分の同僚'], a: 2, why: 'おる is humble and never describes the customer.' },
{ q: '「申す」と「申し上げる」の違いは？', choices: ['違いはない', '書き言葉か話し言葉か', '相手が必要かどうか', '丁寧さの度合いだけ'], a: 2, why: '申し上げる is 謙譲語Ⅰ and needs someone spoken to; 申す is Ⅱ.' },
{ q: '自己紹介で正しいのは？', choices: ['田中でおります', '田中と申します', '田中とおっしゃいます', '田中と申し上げます'], a: 1, why: 'A self-introduction has no target, so 謙譲語Ⅱ applies.' },
{ q: '「存じる」と「存じ上げる」の使い分けの基準は？', choices: ['過去か現在か', '肯定か否定か', '対象が人か物か', '話し言葉か書き言葉か'], a: 2, why: '存じ上げる takes a person; 存じる takes facts and things.' },
{ q: '「ございます」はどの種類の敬語？', choices: ['尊敬語', '丁寧語', '美化語', '謙譲語Ⅰ'], a: 1, why: 'It raises the politeness toward the listener, not the subject.' },
{ q: '「でいらっしゃる」と「でございます」の違いは？', choices: ['どちらも謙譲語', '同じもの', '前者は尊敬語、後者は丁寧語', '前者は丁寧語、後者は尊敬語'], a: 2, why: 'でいらっしゃる raises the subject; でございます raises the register.' },
{ q: '「お茶」が美化語である理由は？', choices: ['漢語だから', '誰も指していないから', '相手のものだから', '古語だから'], a: 1, why: '美化語 decorates the word without aiming at anyone.' },
{ q: '「お名前」が尊敬語である理由は？', choices: ['漢語だから', '丁寧語だから', '相手に属するから', '誰も指していないから'], a: 2, why: 'The noun belongs to the person being raised.' },
{ q: '漢語に付く接頭辞は原則として？', choices: ['おん', 'お', 'ご', 'み'], a: 2, why: 'ご attaches to Sino-Japanese readings by default.' },
{ q: '和語に付く接頭辞は原則として？', choices: ['ご', 'たい', 'み', 'お'], a: 3, why: 'お attaches to native readings by default.' },
{ q: '例外的に「お」が付く漢語はどれ？', choices: ['お住所', 'お意見', 'お連絡', 'お食事'], a: 3, why: 'お食事, お掃除 and お電話 are established exceptions.' },
{ q: '「なさる」の丁寧形は？', choices: ['なさいます', 'なされます', 'なさられます', 'なさります'], a: 0, why: 'なさる is an irregular -aru verb.' },
{ q: '「くださる」の丁寧形は？', choices: ['くださります', 'くださいます', 'くだされます', 'くださられます'], a: 1, why: 'The same irregular -aru pattern applies.' },
{ q: '不規則な-aru動詞に含まれないのは？', choices: ['いらっしゃる', 'おっしゃる', 'くださる', '召し上がる'], a: 3, why: '召し上がる conjugates regularly: 召し上がります.' },
{ q: '「ご〜される」が議論を呼ぶ理由は？', choices: ['漢語だから', '古語だから', 'ごが既に敬意を持つから', '謙譲語だから'], a: 2, why: 'The prefix already raises, so される can read as a second layer.' },
{ q: '「ご利用されますか」の安全な言い換えは？', choices: ['ご利用いたしますか', 'ご利用しますか', 'ご利用させますか', 'ご利用になりますか'], a: 3, why: 'ご〜になる is uncontested.' },
{ q: '「お忙しい」の「お」の働きは？', choices: ['丁寧語', '美化語', '自分を下げる', '相手の状態を高める'], a: 3, why: 'The prefix on an adjective raises the person it describes.' },
{ q: '「貴社」を使うのはどの場面？', choices: ['電話で話すとき', '面接で話すとき', '社内会議', 'メールで書くとき'], a: 3, why: '貴社 is the written form; 御社 is spoken.' },
{ q: '「弊社」の働きは？', choices: ['相手の会社を高める', '第三者の会社を指す', '会社一般を指す', '自分の会社を下げる'], a: 3, why: '弊 is a humbling prefix for your own organisation.' },
{ q: '会社宛ての封筒に書く敬称は？', choices: ['様', '各位', '殿', '御中'], a: 3, why: '御中 addresses an organisation rather than a person.' },
{ q: '「関係者各位」に「様」を付けると？', choices: ['書き言葉になる', '正式になる', '敬称が重複する', 'より丁寧になる'], a: 2, why: '各位 already contains the address.' },
{ q: '「お目にかかる」の意味は？', choices: ['自分が会う', '相手が見る', '相手が会う', '自分が見せる'], a: 0, why: 'It is the humble verb for you meeting someone.' },
{ q: '「お目にかける」の意味は？', choices: ['相手が見せる', '自分が会う', '相手が見る', '自分が見せる'], a: 3, why: 'かける is showing; かかる is meeting.' },
{ q: '「〜ていただけますでしょうか」の性質は？', choices: ['可能性への問い', '許可の付与', '命令', '禁止'], a: 0, why: 'The potential plus a question turns a request into an enquiry.' },
{ q: '「〜ていただきたく存じます」が向いているのは？', choices: ['日常会話', '社内チャット', '書き言葉や改まった文書', '友人へのメッセージ'], a: 2, why: 'The classical 〜たく belongs to written register.' },
{ q: '「何卒よろしくお願い申し上げます」が使われるのは？', choices: ['自己紹介', '社内チャット', '正式な文書の結び', '電話の第一声'], a: 2, why: 'It is the fixed closing of formal correspondence.' },
{ q: '「恐れ入りますが」の役割は？', choices: ['情報を伝える', '依頼の衝撃を和らげる', '感謝を示す', '断りを示す'], a: 1, why: 'It is a クッション言葉 with no propositional content.' },
{ q: 'クッション言葉を二つ重ねると？', choices: ['文法的に誤り', '冗長になる', '謙譲語になる', 'より丁寧になる'], a: 1, why: 'One softener carries the weight; two read as padding.' },
{ q: '「かしこまりました」が最も自然なのは？', choices: ['同僚に', '家族に', '友人に', '客に'], a: 3, why: 'It is the service-level acknowledgement.' },
{ q: '「了解しました」を使ってよいのは？', choices: ['同僚や部下に', '客に', '取引先に', '上司に'], a: 0, why: 'It travels sideways and downward only.' },
{ q: '「ご遠慮ください」の実質的な意味は？', choices: ['推奨', '禁止', '許可', '自由に選んでよい'], a: 1, why: 'It is a prohibition dressed as a request.' },
{ q: '「いらっしゃいませ」の「ませ」の働きは？', choices: ['過去形', '固定表現の一部', '文法的な必須要素', '謙譲語の印'], a: 1, why: 'ませ survives only in fixed service forms.' },
{ q: '「お〜になりませんか」が表すのは？', choices: ['禁止', '勧誘', '報告', '命令'], a: 1, why: 'The negative question frames it as an offer.' },
{ q: '「お越しになる」が最も自然な場面は？', choices: ['自分が行く', '客が来る', '物が届く', '電車が来る'], a: 1, why: 'It is a warm respectful form for someone coming.' },
{ q: '「電車が参ります」が正しい理由は？', choices: ['美化語だから', '尊敬語だから', '電車を高めているから', '電車は人ではないから'], a: 3, why: '参る lowers toward the listener, and a train is not a person to raise.' },
{ q: '「〜ております」が表すのは？', choices: ['自分の進行動作を丁重に', '未来の予定', '相手の進行動作', '過去の完了'], a: 0, why: 'おる supplies the humble progressive.' },
{ q: '「いたしかねます」の意味は？', choices: ['できない', 'するかもしれない', '喜んでする', 'すでにした'], a: 0, why: 'かねる marks inability in softened form.' },
{ q: '「ご査収ください」の意味は？', choices: ['返送してください', '破棄してください', 'ただ受け取ってください', '確認して受け取ってください'], a: 3, why: '査 means to examine, so it asks for checking as well as receipt.' },
{ q: '「お手すきの際に」の意味は？', choices: ['手が空いたときに', '来週までに', '明日までに', '今すぐ'], a: 0, why: 'It leaves the timing entirely to the other person.' },
{ q: '「差し支えなければ」の役割は？', choices: ['感謝', '断り', '強い要求', '相手に配慮した前置き'], a: 3, why: 'It offers the listener an easy way to decline.' },
{ q: '「〜のほど」の働きは？', choices: ['方向を示す', '数量を示す', '表現を和らげる', '時間を示す'], a: 2, why: 'It is a softener, common in ご検討のほど and ご対応のほど.' },
{ q: '「ご笑納ください」が使われるのは？', choices: ['会議の開始', '電話の終わり', '贈り物を渡すとき', '謝罪のとき'], a: 2, why: 'It humbly asks the recipient to accept a small gift.' },
{ q: '「お引き立て」の意味に近いのは？', choices: ['ご心配', 'ご不便', 'ご愛顧', 'ご迷惑'], a: 2, why: 'Both refer to a customer continued patronage.' },
{ q: '電話を取ったときの第一声として適切なのは？', choices: ['お電話ありがとうございます', 'もしもし', 'はい、誰ですか', 'どうしましたか'], a: 0, why: 'Business calls open with thanks rather than もしもし.' },
{ q: '相手の名前を聞くときの表現は？', choices: ['お名前を伺ってもよろしいでしょうか', '誰ですか', 'お名前をもらえますか', '名前は何ですか'], a: 0, why: '伺う plus the permission question is the standard.' },
{ q: '担当者が不在のとき、取引先に伝える表現は？', choices: ['田中さんはいらっしゃいません', '田中は席を外しております', '田中様は外出されています', '田中さんは今いません'], a: 1, why: 'Your own colleague is lowered toward an outsider.' },
{ q: '折り返しの申し出として正しいのは？', choices: ['また電話してください', '折り返しお電話いたしましょうか', 'かけ直させます', '後でかけます'], a: 1, why: 'The offer is framed humbly with いたす.' },
{ q: '電話が聞き取りにくいときの表現は？', choices: ['お電話が遠いようです', 'よく聞こえません', 'もっと大きく話してください', '声が小さいです'], a: 0, why: 'Blaming the line rather than the speaker is the convention.' },
{ q: '電話を切るときの表現は？', choices: ['失礼いたします', 'また明日', 'さようなら', 'バイバイ'], a: 0, why: '失礼いたします closes a business call.' },
{ q: 'メールの標準的な書き出しは？', choices: ['お疲れ様', 'いつもお世話になっております', 'こんにちは', 'はじめまして'], a: 1, why: 'It is the fixed opener for ongoing business relationships.' },
{ q: '初めて送るメールの書き出しは？', choices: ['突然のご連絡失礼いたします', 'いつもお世話になっております', 'ご無沙汰しております', 'お疲れ様です'], a: 0, why: 'There is no prior relationship to invoke.' },
{ q: '久しぶりに連絡するときの表現は？', choices: ['お世話になります', 'はじめまして', '失礼いたします', 'ご無沙汰しております'], a: 3, why: 'ご無沙汰 acknowledges the gap in contact.' },
{ q: '添付ファイルを送るときの表現は？', choices: ['ご確認くださいますようお願いいたします', 'ファイルあります', '添付しといた', 'ファイルを見てください'], a: 0, why: 'The request form is standard in business email.' },
{ q: '返信を促すときの表現として適切なのは？', choices: ['お手すきの際にご返信いただけますと幸いです', '早く返事してください', 'まだですか', '返信を要求します'], a: 0, why: 'It leaves the timing to the recipient.' },
{ q: '催促のメールで使う定型の前置きは？', choices: ['何度も言いますが', 'まだ届いていませんが', '行き違いでしたら申し訳ございません', '無視しないでください'], a: 2, why: 'The convention blames the message, not the reader.' },
{ q: '会議を始めるときの表現は？', choices: ['始めましょうか', '始めます', '会議やります', 'それでは会議を始めさせていただきます'], a: 3, why: 'The permission frame suits addressing a room.' },
{ q: '会議で意見を求める表現は？', choices: ['意見はありますか', '誰か発言を', '何か言ってください', 'ご意見をお聞かせいただけますでしょうか'], a: 3, why: 'The humble request form is standard.' },
{ q: '持ち帰って検討すると伝える表現は？', choices: ['無理です', 'また今度', '本件は持ち帰らせていただきます', '考えておきます'], a: 2, why: 'It signals internal discussion without committing.' },
{ q: '面接の冒頭で自分を名乗る表現は？', choices: ['田中でいらっしゃいます', '田中と申します', '田中さんです', '田中様と申します'], a: 1, why: 'Never attach a title to your own name.' },
{ q: '面接で相手の会社を指す言葉は？', choices: ['貴社', '御社', '弊社', '当社'], a: 1, why: '御社 is spoken; 貴社 is written.' },
{ q: '面接の終わりの表現として適切なのは？', choices: ['では失礼', '本日は貴重なお時間をいただきありがとうございました', 'ありがとうございました', 'また来ます'], a: 1, why: 'Naming what you received makes the thanks specific.' },
{ q: '客を席に案内するときの表現は？', choices: ['おかけになってお待ちください', 'お座りください', '座ってください', '座られてください'], a: 0, why: 'おかけになる is the standard respectful invitation to sit.' },
{ q: '会計時の正しい表現は？', choices: ['千円からお預かりします', '千円になります', '千円お預かりいたします', '千円いただきます'], a: 2, why: 'The から is superfluous バイト敬語.' },
{ q: 'コーヒーを出すときの正しい表現は？', choices: ['こちらコーヒーになります', 'こちらコーヒーでございます', 'コーヒーです', 'コーヒーになられます'], a: 1, why: 'Nothing is transforming into coffee.' },
{ q: '注文を確認するときの正しい表現は？', choices: ['よろしいでしょうか', 'よろしいですね', 'よろしかったでしょうか', 'いいですか'], a: 0, why: 'The past form about a present matter is バイト敬語.' },
{ q: 'ホテルで部屋へ案内するときの表現は？', choices: ['お部屋にご案内いたします', '部屋に行きます', 'お部屋にご案内になります', '部屋を見せます'], a: 0, why: 'You are guiding, so the humble form applies.' },
{ q: 'ホテルでパスポートを見せてもらうときの表現は？', choices: ['パスポートを見ます', 'パスポートを見せなさい', 'パスポートを拝見してもよろしいでしょうか', 'パスポートをご覧になります'], a: 2, why: 'A request rather than a declarative suits asking a guest.' },
{ q: '空港で荷物を預かるときの表現は？', choices: ['荷物を出してください', 'お預けになるお手荷物はございますか', 'お荷物を預けなさい', '荷物ありますか'], a: 1, why: 'The respectful form describes what the guest does.' },
{ q: '駅の案内放送で正しいのは？', choices: ['電車がお見えになります', '電車が来られます', '電車が参ります', '電車がいらっしゃいます'], a: 2, why: '参る is correct because a train is not a person to raise.' },
{ q: '車内での通話を止める表現は？', choices: ['電話しないでください', '電話禁止', '車内での通話はご遠慮ください', '電話するな'], a: 2, why: 'ご遠慮ください is the standard polite prohibition.' },
{ q: '病院で患者を気遣う表現は？', choices: ['お大事になさってください', '大丈夫ですか', '気をつけて', '早く治して'], a: 0, why: 'なさる raises the patient own act of taking care.' },
{ q: '銀行で書類への記入を頼む表現は？', choices: ['こちらにご記入をお願いいたします', 'ご記入されてください', '書いてください', '記入しなさい'], a: 0, why: 'ご記入 plus the humble request is standard counter language.' },
{ q: '謝罪の場面で最も重い表現は？', choices: ['ごめんなさい', '申し訳ございません', 'すみません', '失礼しました'], a: 1, why: 'It is the standard formal business apology.' },
{ q: '苦情対応で再度謝罪する表現は？', choices: ['すみませんでした', 'もう一度すみません', '重ねてお詫び申し上げます', 'また謝ります'], a: 2, why: '重ねて marks a repeated apology.' },
{ q: '謝罪後に改善を約束する表現は？', choices: ['もうしません', '再発防止に努めてまいります', '大丈夫です', '気をつけます'], a: 1, why: '〜てまいります frames ongoing effort humbly.' },
{ q: '贈り物を渡すときの謙遜表現は？', choices: ['いいものです', 'つまらないものですが', '高いものです', '安いものです'], a: 1, why: 'The giver lowers the gift, not its recipient.' },
{ q: '贈り物を受け取るときの表現は？', choices: ['いただきます', 'ありがとう', 'お心遣いありがとうございます', 'もらいます'], a: 2, why: 'お心遣い names the thoughtfulness behind the gift.' },
{ q: '結婚を祝う表現は？', choices: ['よかったですね', 'ご結婚おめでとうございます', '幸せに', 'おめでとう'], a: 1, why: 'The prefixed noun plus the full form is the standard congratulation.' },
{ q: '弔事で使う定型表現は？', choices: ['おめでとうございます', 'ご愁傷様でございます', 'お疲れ様です', 'よろしくお願いします'], a: 1, why: 'It is the fixed expression of condolence.' },
{ q: '故人を悼む表現は？', choices: ['ご多幸をお祈りします', 'ご冥福をお祈り申し上げます', 'ご健康をお祈りします', 'ご活躍をお祈りします'], a: 1, why: '冥福 refers specifically to the repose of the departed.' },
{ q: '招待を受けるときの表現は？', choices: ['出席されます', '行きます', '喜んで出席させていただきます', '参加します'], a: 2, why: 'The invitation is the permission that させていただく presupposes.' },
{ q: '招待を断るときの表現は？', choices: ['行けません', '無理です', '都合が悪いです', '誠に残念ではございますが、欠席させていただきます'], a: 3, why: 'Regret plus the permission frame is the convention.' },
{ q: '名刺を受け取るときの表現は？', choices: ['もらいます', '頂戴いたします', 'ありがとう', 'ください'], a: 1, why: '頂戴 treats the card as standing in for the person.' },
{ q: '名刺を切らしているときの表現は？', choices: ['名刺ありません', '忘れました', '今日は持っていません', 'あいにく名刺を切らしておりまして'], a: 3, why: 'あいにく plus the humble progressive softens the admission.' },
{ q: '見積もりを断るときの表現は？', choices: ['高すぎます', 'できません', '無理です', 'その条件では少々難しいかと存じます'], a: 3, why: 'Difficulty rather than refusal is the negotiating register.' },
{ q: '取引を見送るときの表現は？', choices: ['興味ありません', '今回は見送らせていただきます', 'やめます', '断ります'], a: 1, why: '見送る frames the refusal as a postponement.' },
{ q: '客先を訪問する前の確認表現は？', choices: ['明日十時に伺ってもよろしいでしょうか', '明日行きます', '明日参ります', '行っていいですか'], a: 0, why: '伺う plus the permission question fits a client visit.' },
{ q: 'プレゼンの冒頭で自分を名乗る表現は？', choices: ['私は田中と言います', 'ただいまご紹介にあずかりました田中でございます', '田中です', '田中と申し上げます'], a: 1, why: 'It is the set phrase following an introduction.' },
{ q: 'プレゼンで資料を見てもらう表現は？', choices: ['資料を見られてください', '資料を拝見してください', '資料を見てください', 'お手元の資料をご覧ください'], a: 3, why: 'ご覧 is the respectful verb for the audience looking.' },
{ q: '遅刻の連絡として適切なのは？', choices: ['間に合いません', '電車の遅延により、三十分ほど遅れて出社いたします', '遅れます', '遅刻します'], a: 1, why: 'Reason, duration and the humble verb are all present.' },
{ q: '欠勤の連絡として適切なのは？', choices: ['今日は無理です', '休みます', '体調が優れず、本日お休みをいただきたく存じます', '行けません'], a: 2, why: 'The reason stays vague and the request is properly humble.' },
{ q: '退職を伝える表現は？', choices: ['退職させていただくことになりました', '会社を出ます', '退職されます', '辞めます'], a: 0, why: 'The permission frame is conventional for resignations.' },
{ q: '新年の挨拶として正しいのは？', choices: ['謹んで新年のお慶びを申し上げます', 'あけましておめでとう', '今年もよろしく', '新年です'], a: 0, why: '謹んで marks the formal written register.' },
{ q: '喪中の相手への年賀を控える表現は？', choices: ['今年は書きません', '年賀状は送りません', '失礼します', '喪中につき年頭のご挨拶を失礼させていただきます'], a: 3, why: 'It is the fixed 喪中 notice wording.' },
{ q: '手紙の書き出しの定型は？', choices: ['拝啓 時下ますますご清栄のことと', 'お世話になります', 'はじめまして', 'こんにちは'], a: 0, why: '拝啓 opens a formal letter and pairs with 敬具.' },
{ q: '「拝啓」と対になる結語は？', choices: ['以上', 'さようなら', 'よろしく', '敬具'], a: 3, why: 'The pair frames a formal letter.' },
{ q: '近所への引っ越しの挨拶として適切なのは？', choices: ['よろしく', '引っ越してまいりました田中と申します', 'こんにちは', '隣に来ました'], a: 1, why: '参る supplies the courteous verb of coming.' },
{ q: '先生への感謝を伝える表現は？', choices: ['助かりました', 'ご指導いただきありがとうございました', 'ありがとう', '感謝します'], a: 1, why: 'Naming the guidance received makes it specific.' },
{ q: '上司から学んだと伝える表現は？', choices: ['参考になりました', '勉強になりました', '面白かったです', '役に立ちました'], a: 1, why: '参考になる evaluates the speaker, so it travels downward only.' },
{ q: '相手の意見に同意する表現は？', choices: ['そうですね', 'おっしゃるとおりです', 'わかりました', 'なるほどですね'], a: 1, why: 'なるほど evaluates, which is why it is avoided upward.' },
{ q: '客の来店に感謝する表現は？', choices: ['来店しました', 'いらっしゃいました', 'ご来店いただきありがとうございます', '来てくれてありがとう'], a: 2, why: 'The humble receiving verb frames the thanks.' },
{ q: '相手の健康を気遣う手紙の結びは？', choices: ['気をつけて', '風邪ひかないで', 'くれぐれもご自愛くださいませ', '元気でね'], a: 2, why: 'ご自愛 is the written formula for wishing good health.' },
{ q: '在庫がないと伝える表現は？', choices: ['あいにく在庫がございません', '売り切れです', 'ないです', 'ありません'], a: 0, why: 'あいにく plus ございません is the service register.' },
{ q: '相手に時間があるか尋ねる表現は？', choices: ['暇ですか', '今いいですか', '時間ありますか', '少しお時間よろしいでしょうか'], a: 3, why: 'よろしいでしょうか is the polite permission check.' },
{ q: '「おっしゃられる」の誤りは？', choices: ['丁寧語の欠如', '謙譲語の誤用', '二重敬語', '方向の誤り'], a: 2, why: 'おっしゃる already carries the respect; られる adds a second layer.' },
{ q: '「拝見させていただく」の問題は？', choices: ['尊敬語である', '謙譲語が二重', '丁寧語が足りない', '古語である'], a: 1, why: '拝見 is already humble.' },
{ q: '「私が申されました」の誤りは？', choices: ['謙譲語の欠如', '自分に尊敬語', '丁寧語の誤り', '二重敬語'], a: 1, why: 'される cannot apply to yourself.' },
{ q: '「先生が申しました」の誤りは？', choices: ['丁寧語の欠如', '尊敬すべき人に謙譲語', '時制の誤り', '二重敬語'], a: 1, why: '申す lowers the person it describes.' },
{ q: '「お客様が参りました」の誤りは？', choices: ['誤りではない', '二重敬語', '謙譲語を客に使っている', '丁寧語の欠如'], a: 2, why: '参る is 謙譲語Ⅱ and lowers the customer.' },
{ q: '「お客様がおられます」の問題は？', choices: ['古語だから', 'おるは謙譲語だから', '正しい', '二重敬語だから'], a: 1, why: 'いらっしゃいます is the respectful existence verb.' },
{ q: '「駅へ伺います」の誤りは？', choices: ['二重敬語だから', '駅に敬意の対象がないから', '尊敬語だから', '誤りではない'], a: 1, why: '伺う needs a respected destination; 参る fits here.' },
{ q: '「その件は存じ上げております」の問題は？', choices: ['二重敬語', '尊敬語の誤用', '人以外に存じ上げるを使っている', '誤りではない'], a: 2, why: '存じ上げる takes a person as its object.' },
{ q: '「いらっしゃります」の誤りは？', choices: ['謙譲語だから', '二重敬語', '古語', '-aru動詞の活用の誤り'], a: 3, why: 'The irregular -aru verbs give いらっしゃいます.' },
{ q: '「山田課長様」の問題は？', choices: ['誤りではない', '敬称の重複', '謙譲語の誤用', '二重敬語の動詞'], a: 1, why: '課長 is already a respectful title.' },
{ q: '「私、田中様と申します」の誤りは？', choices: ['丁寧語の欠如', '自分に様を付けている', '二重敬語', '申すの誤用'], a: 1, why: 'Never attach 様 to your own name.' },
{ q: '「弊社の社長がおっしゃいました」を客先で言う問題は？', choices: ['謙譲語が強すぎる', '身内を高めている', '誤りではない', '二重敬語'], a: 1, why: 'Your own side is lowered toward an outsider.' },
{ q: '「うちの母がおっしゃっていました」の誤りは？', choices: ['二重敬語', '謙譲語の誤用', '丁寧語の欠如', '身内に尊敬語'], a: 3, why: 'Your own family is 内 toward anyone outside it.' },
{ q: '「田中さんはいらっしゃいません」を取引先に言う問題は？', choices: ['同僚を高めている', '謙譲語が強い', '誤りではない', '丁寧語の欠如'], a: 0, why: 'Drop the suffix and the respectful verb for your own colleague.' },
{ q: '「お先にお帰りします」の誤りは？', choices: ['誤りではない', '尊敬語の誤用', 'お〜するに対象がない', '二重敬語'], a: 2, why: 'Going home reaches nobody; 失礼いたします is the fix.' },
{ q: '「ご出席します」の誤りは？', choices: ['動作が相手に及ばないから', '古語だから', '漢語だから', '二重敬語だから'], a: 0, why: '出席いたします is the correct 謙譲語Ⅱ.' },
{ q: '「よろしかったでしょうか」の問題は？', choices: ['謙譲語の誤用', '誤りではない', '現在のことに過去形', '二重敬語'], a: 2, why: 'The matter is present, so よろしいでしょうか applies.' },
{ q: '「千円からお預かりします」の問題は？', choices: ['丁寧語の欠如', '二重敬語', 'からが不要', '預かるが誤り'], a: 2, why: 'The から has no grammatical role here.' },
{ q: '「こちらコーヒーになります」の問題は？', choices: ['何も変化していない', '謙譲語の誤用', '二重敬語', '誤りではない'], a: 0, why: 'でございます states what it is.' },
{ q: '「お会計のほう、よろしいですか」の問題は？', choices: ['尊敬語の欠如', '会計が誤り', '二重敬語', 'のほうが不要'], a: 3, why: '〜のほう is a hedge with no function here.' },
{ q: '「了解しました」を取引先に使う問題は？', choices: ['誤りではない', '謙譲語すぎる', '敬意が不足している', '二重敬語'], a: 2, why: '承知しました or かしこまりました is expected.' },
{ q: '「ご苦労様です」を上司に使う問題は？', choices: ['二重敬語だから', '上から下への言葉だから', '古語だから', '謙譲語だから'], a: 1, why: 'お疲れ様です travels in every direction.' },
{ q: '「なるほどですね」を上司に使う問題は？', choices: ['謙譲語の誤用', '相手を評価している', '二重敬語', '誤りではない'], a: 1, why: 'おっしゃるとおりです agrees without evaluating.' },
{ q: '「参考になりました」を上司に使う問題は？', choices: ['誤りではない', '二重敬語', '自分が評価する立場になる', '謙譲語が強い'], a: 2, why: '勉強になりました places you as the learner.' },
{ q: '「見れますか」をお客様に使う問題は？', choices: ['誤りではない', '二重敬語', 'ら抜き言葉', '謙譲語の誤用'], a: 2, why: 'ご覧になれますか is the respectful potential.' },
{ q: '「食べれますか」の敬語としての修正は？', choices: ['召し上がれますか', 'お食べになれますか', '食べられませんか', 'いただけますか'], a: 0, why: '召し上がる supplies the respectful potential.' },
{ q: '「あなたのご意見は」を上司に使う問題は？', choices: ['二重敬語', '誤りではない', 'あなたが失礼になりうる', '謙譲語の欠如'], a: 2, why: 'Use the name, or drop the pronoun entirely.' },
{ q: '「僕が伺います」の問題は？', choices: ['二重敬語', '伺うが誤り', '一人称が場に合っていない', '誤りではない'], a: 2, why: '私 is the neutral business first person.' },
{ q: '「こっちの資料をご覧ください」の問題は？', choices: ['ご覧が誤り', '二重敬語', 'こっちが砕けすぎている', '誤りではない'], a: 2, why: 'こちら is the polite series.' },
{ q: '「私のお名前は田中です」の問題は？', choices: ['自分の名前に接頭辞', '二重敬語', '謙譲語の欠如', '誤りではない'], a: 0, why: 'The prefix raises what it attaches to.' },
{ q: '「弊社のご担当者が伺います」の問題は？', choices: ['誤りではない', '身内にご', '二重敬語', '伺うが誤り'], a: 1, why: 'Your own staff take no honorific prefix.' },
{ q: '「私がご説明いただきます」の誤りは？', choices: ['いただくの方向が逆', '二重敬語', '丁寧語の欠如', '誤りではない'], a: 0, why: 'You are giving the explanation: ご説明いたします.' },
{ q: '「先生が教えていただきました」の誤りは？', choices: ['主語といただくが合わない', '謙譲語の欠如', '二重敬語', '誤りではない'], a: 0, why: 'With 先生 as subject, くださいました is required.' },
{ q: '「ご名前」の誤りは？', choices: ['和語にごを付けている', '謙譲語の誤用', '誤りではない', '二重敬語'], a: 0, why: '名前 is a native reading and takes お.' },
{ q: '「お住所」の誤りは？', choices: ['尊敬語の欠如', '二重敬語', '漢語におを付けている', '誤りではない'], a: 2, why: '住所 is Sino-Japanese and takes ご.' },
{ q: '「お客様各位様」の問題は？', choices: ['各位が誤り', '誤りではない', '敬称の重複', '謙譲語の誤用'], a: 2, why: '各位 already addresses everyone.' },
{ q: '「すみませんでした」を取引先への謝罪に使う問題は？', choices: ['誤りではない', '重すぎる', '軽すぎる', '文法的誤り'], a: 2, why: '申し訳ございませんでした carries the weight.' },
{ q: '入室時に「失礼しました」と言う問題は？', choices: ['誤りではない', '謙譲語の誤用', '時制が逆', '二重敬語'], a: 2, why: 'The intrusion has not happened yet: 失礼します.' },
{ q: '「お待ちしております」を到着後の相手に言う問題は？', choices: ['謙譲語の誤用', '二重敬語', '待つ行為が終わっている', '誤りではない'], a: 2, why: 'お待ちしておりました is the completed form.' },
{ q: '「ご存じないのですか」が避けられる理由は？', choices: ['相手を責める響きがある', '古語', '二重敬語', '謙譲語の誤用'], a: 0, why: 'The positive question carries no accusation.' },
{ q: '「本日休業させていただきます」の問題は？', choices: ['許可の主体がいない', '誤りではない', '謙譲語が足りない', '二重敬語'], a: 0, why: '休業いたします is the plain and correct choice.' },
{ q: '「大変恐縮ではございますが、誠に申し訳ございませんが」の問題は？', choices: ['謙譲語の欠如', 'クッション言葉の重複', '文法的誤り', '敬語が足りない'], a: 1, why: 'One softener is enough.' },
{ q: '「お伺いさせていただきます」の問題は？', choices: ['尊敬語の誤用', '謙譲語が足りない', '誤りではない', '敬語の層が多すぎる'], a: 3, why: '伺います alone is complete.' },
{ q: '「二重敬語ではないもの」はどれ？', choices: ['ご覧になられる', 'おっしゃられる', 'お召し上がりになる', 'お読みになっていらっしゃる'], a: 3, why: 'Two verbs with one layer each is 敬語連結.' },
{ q: '「おビール」が避けられる理由は？', choices: ['文法的誤り', '謙譲語の誤用', '外来語に接頭辞が付きにくい', '二重敬語'], a: 2, why: 'Loanwords generally resist the prefix.' },
{ q: '「なので、ご確認をお願いします」をメールで使う問題は？', choices: ['誤りではない', '敬語が足りない', '話し言葉が混じっている', '二重敬語'], a: 2, why: 'つきましては is the written connective.' },
{ q: '「二名様で伺います」を自分側について言う問題は？', choices: ['伺うが誤り', '二重敬語', '自分側に様を付けている', '誤りではない'], a: 2, why: '様 never applies to your own side.' },
{ q: '「お客様が申されました」の誤りは？', choices: ['誤りではない', '申すは謙譲語だから', '丁寧語がないから', '二重敬語だから'], a: 1, why: 'おっしゃいました is the respectful form.' },
{ q: '「社長がおっしゃっていました」を客先で言う問題は？', choices: ['誤りではない', '謙譲語が強い', '二重敬語', '身内を高めている'], a: 3, why: '申しておりました lowers your own side.' },
{ q: '「先生様」の問題は？', choices: ['二重敬語の動詞', '先生自体が敬称', '謙譲語の誤用', '誤りではない'], a: 1, why: 'Adding 様 stacks respect on a respectful word.' },
{ q: '「とんでもございません」が議論される理由は？', choices: ['謙譲語だから', '古語だから', 'とんでもないが一語だから', '外来語だから'], a: 2, why: 'Splitting the adjective is formally irregular, though the form is established.' },
{ q: '「お名前をいただけますか」の問題は？', choices: ['名前は貰えるものではない', '謙譲語の誤用', '二重敬語', '誤りではない'], a: 0, why: 'お名前を頂戴できますでしょうか or 教えていただけますか.' },
{ q: '「ご確認してください」の誤りは？', choices: ['古語だから', '誤りではない', '二重敬語だから', 'ご〜するは謙譲語だから'], a: 3, why: 'The listener acts, so ご確認ください is correct.' },
{ q: '「お座りください」が避けられることがある理由は？', choices: ['文法的誤り', '二重敬語', '謙譲語の誤用', '動物に使う響きがある'], a: 3, why: 'おかけください is the neutral service phrasing.' },
{ q: '「拝見してください」の誤りは？', choices: ['誤りではない', '二重敬語', '丁寧語の欠如', '謙譲語を相手に使っている'], a: 3, why: 'ご覧ください is the respectful instruction.' },
{ q: '「どっちがよろしいですか」の問題は？', choices: ['よろしいが誤り', '二重敬語', 'どっちが砕けすぎている', '誤りではない'], a: 2, why: 'どちらがよろしいでしょうか matches the register.' },
{ q: '「息子さんが大学に入られました」を自分の子について言う問題は？', choices: ['誤りではない', '身内に敬語', '二重敬語', '謙譲語の欠如'], a: 1, why: 'Your own child takes plain forms toward outsiders.' },
{ q: '「皆様方各位」の問題は？', choices: ['皆様が誤り', '複数敬称の重複', '誤りではない', '各位が誤り'], a: 1, why: 'One plural honorific is enough.' },
{ q: '「高いでございます」の誤りは？', choices: ['二重敬語', '謙譲語の誤用', '音便が必要', '誤りではない'], a: 2, why: 'The adjective becomes 高う before ございます.' },
{ q: '「誰ですか」を来客に使う問題は？', choices: ['二重敬語', '誤りではない', '謙譲語の誤用', '直接的すぎる'], a: 3, why: 'どちら様でしょうか is the polite interrogative.' },
{ q: '敬語の指針（2007）が示した敬語の分類は？', choices: ['三分類', '六分類', '四分類', '五分類'], a: 3, why: 'The 2007 guidelines split the older three-way division into five.' },
{ q: '謙譲語Ⅰと謙譲語Ⅱを分けるのは？', choices: ['動作が向かう相手がいるか', '丁寧さの度合い', '動詞の種類', '書き言葉か話し言葉か'], a: 0, why: 'Ⅰ needs a target; Ⅱ is simply courteous toward the listener.' },
{ q: '丁寧語が向いている相手は？', choices: ['第三者', '文の主語', '誰でもない', '話し相手'], a: 3, why: '丁寧語 addresses whoever is listening, whatever the sentence is about.' },
{ q: '美化語が指しているのは？', choices: ['誰も指していない', '話し相手', '第三者', '文の主語'], a: 0, why: '美化語 decorates the word itself without aiming at anyone.' },
{ q: '尊敬語が高めるのは？', choices: ['自分', '誰も', '話し相手のみ', '話題の人物'], a: 3, why: 'It raises the person the sentence is about.' },
{ q: '内・外の原則で、取引先と話すとき自分の上司は？', choices: ['中立にする', '下げる', '言及しない', '高める'], a: 1, why: 'Your own side is lowered toward outsiders regardless of rank.' },
{ q: '社内で同僚と話すとき、自分の部長は？', choices: ['下げる', '中立にする', '言及しない', '高める'], a: 3, why: 'Inside the group, rank applies normally.' },
{ q: '謙譲語Ⅱの動詞として正しい組み合わせは？', choices: ['おっしゃる・なさる', '召し上がる・ご覧になる', 'くださる・いらっしゃる', '参る・申す・おる'], a: 3, why: 'These are the 丁重語 verbs that need no target.' },
{ q: '「お茶」を一人で飲むときに使えるのはなぜ？', choices: ['謙譲語だから', '尊敬語だから', '美化語で誰も指さないから', '丁寧語だから'], a: 2, why: 'Nothing is being aimed anywhere, so the prefix is pure decoration.' }
]

};
