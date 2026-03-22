"use client";

import { useState, useMemo } from "react";
import { Sparkles, Search, RefreshCw } from "lucide-react";
import { MemeCard, type Meme, type MemeCategory, type MemeLanguage } from "@/components/memes/meme-card";
import { cn } from "@/lib/utils";

const ALL_MEMES: Meme[] = [
  // ════════════════════════════════════════════════
  //  ENGLISH MEMES
  // ════════════════════════════════════════════════
  {
    id: 1,
    category: "Funny",
    language: "English",
    emoji: "😂",
    title: "Every IPL Fan's Last Over Experience",
    content:
      "Need 18 off 6 balls.\n\nBall 1: Wide. YES!\nBall 2: Six! Possible!\nBall 3: Dot. Okay fine.\nBall 4: OUT. 😭\nBall 5: Six! We're back!\nBall 6: Run Out.\n\nDoctors: 'Your ECG looks like a last-over scorecard.'",
    hashtags: ["#IPL2026", "#CricketMemes", "#LastOver", "#IPLFunny"],
    accent: "text-yellow-400",
    accentBg: "bg-yellow-500/10",
    accentBorder: "border-yellow-500/20",
  },
  {
    id: 2,
    category: "Funny",
    language: "English",
    emoji: "🏏",
    title: "Pitch Report Translation Guide",
    content:
      "What they say → What they mean:\n\n'Good batting track' → First innings 200+\n'Slight assistance for seamers' → Batsmen crying\n'Surface will deteriorate' → Last innings nightmare\n'Good dew tonight' → Coin toss = match result\n'Balanced surface' → Nobody knows anything 😂",
    hashtags: ["#CricketHumor", "#IPL2026", "#PitchReport", "#Cricket"],
    accent: "text-orange-400",
    accentBg: "bg-orange-500/10",
    accentBorder: "border-orange-500/20",
  },
  {
    id: 3,
    category: "Funny",
    language: "English",
    emoji: "😎",
    title: "CSK Fans Every Single Year",
    content:
      "2016: 'We'll be back!'\n2017: 'Ban? What ban?'\n2018: 'WE'RE BACK! CHAMPIONS!'\n2019: '5th final, we belong here'\n2020: 'Rebuilding... trust the process'\n2021: 'CHAMPIONS AGAIN!'\n2023: 'CHAMPIONS AGAIN AGAIN!'\n2026: 'This is literally our home.' 🏆\n\nMS Dhoni doesn't retire. Retirement retires.",
    hashtags: ["#CSK", "#Thala", "#MSDhoni", "#IPL2026", "#CricketMemes"],
    accent: "text-yellow-400",
    accentBg: "bg-yellow-500/10",
    accentBorder: "border-yellow-500/20",
  },
  {
    id: 4,
    category: "Funny",
    language: "English",
    emoji: "🤣",
    title: "RCB Fans Are Built Different",
    content:
      "Normal human: 'My team lost. I'm sad.'\n\nRCB fan: 'My team lost AGAIN. I am stronger. I am chosen. Pain is my meditation. Ee sala cup namde.'\n\nRCB hasn't won a title in 18 years but their fans have the most passion.\n\nStanford psychologists call this: 'Legendary Loyalty.' 🧠💜",
    hashtags: ["#RCB", "#EeSalaCupNamde", "#IPL2026", "#CricketMemes", "#Virat"],
    accent: "text-red-400",
    accentBg: "bg-red-500/10",
    accentBorder: "border-red-500/20",
  },
  {
    id: 5,
    category: "Funny",
    language: "English",
    emoji: "🗺️",
    title: "MI Fan's Season Map",
    content:
      "April: 'We lost 3 in a row. Season is over.'\nMay: 'Still mathematically alive!'\nMay 15: 'We qualified somehow?'\nPlayoffs: 'WE ARE MI. THIS IS WHAT WE DO.'\nFinal: 🏆🏆🏆🏆🏆\n\nMI fans have the shortest memory and the longest trophy shelf. 5 IPL titles.",
    hashtags: ["#MI", "#MumbaiIndians", "#IPL2026", "#CricketMemes"],
    accent: "text-blue-400",
    accentBg: "bg-blue-500/10",
    accentBorder: "border-blue-500/20",
  },
  {
    id: 6,
    category: "Funny",
    language: "English",
    emoji: "🎯",
    title: "IPL Toss Strategy Revealed",
    content:
      "Captain wins toss.\nThinks for 3 seconds.\nLooks at sky. Looks at pitch. Looks at crowd.\nChecks weather app.\n\n'We'll bat first.'\n\nCo-commentator: 'Brave decision.'\nResult: All out for 89. 😂\n\nThe toss matters 40% of the time... 100% of the time it's blamed.",
    hashtags: ["#IPLToss", "#CricketMemes", "#IPL2026", "#Funny"],
    accent: "text-purple-400",
    accentBg: "bg-purple-500/10",
    accentBorder: "border-purple-500/20",
  },
  {
    id: 7,
    category: "Fact",
    language: "English",
    emoji: "📊",
    title: "IPL 2026 — The Numbers Are Insane",
    content:
      "🏏 74 matches across 60 days\n🏟️ 13 world-class stadiums\n🌍 10 franchise teams\n💰 Total player auction pool: ₹639 crore\n📺 500+ million viewers globally\n🇮🇳 3rd most-watched league in the world\n⚡ Most sixes in any cricket league ever\n\nIPL 2026 kicks off March 28. Are you ready? 🔥",
    hashtags: ["#IPL2026", "#IPLFacts", "#CricketFacts", "#IPLStarts"],
    accent: "text-emerald-400",
    accentBg: "bg-emerald-500/10",
    accentBorder: "border-emerald-500/20",
  },
  {
    id: 8,
    category: "Fact",
    language: "English",
    emoji: "🏆",
    title: "IPL All-Time Champions List",
    content:
      "🥇 CSK — 5 titles (2010, 2011, 2018, 2021, 2023)\n🥈 MI — 5 titles (2013, 2015, 2017, 2019, 2020)\n🥉 KKR — 3 titles (2012, 2014, 2024)\n4️⃣ SRH — 2 titles (2016, 2022)\n5️⃣ RR — 1 title (2008)\n6️⃣ GT — 1 title (2022)\n\nRCB, PBKS, DC, LSG: Still hunting their first! 🫡",
    hashtags: ["#IPLChampions", "#IPLHistory", "#CricketFacts", "#IPL2026"],
    accent: "text-amber-400",
    accentBg: "bg-amber-500/10",
    accentBorder: "border-amber-500/20",
  },
  {
    id: 9,
    category: "Fact",
    language: "English",
    emoji: "👑",
    title: "Virat Kohli — The IPL GOAT Stats",
    content:
      "🏏 IPL matches: 237+\n💥 Runs scored: 7,000+\n🎯 Centuries: 8 (most in IPL history)\n📈 Average: 36+\n⚡ Strike Rate: 130+\n🏆 Orange Cap: 3 times\n\nVirat Kohli is the only player to score 7000+ IPL runs.\n\nAt 37, still scoring at will. Age is just a number for King Kohli. 👑",
    hashtags: ["#ViratKohli", "#KingKohli", "#RCB", "#IPL2026", "#CricketFacts"],
    accent: "text-red-400",
    accentBg: "bg-red-500/10",
    accentBorder: "border-red-500/20",
  },
  {
    id: 10,
    category: "Fact",
    language: "English",
    emoji: "💰",
    title: "IPL Economy Is Bigger Than You Think",
    content:
      "💵 IPL 2023 brand value: $10.7 BILLION\n📺 Media rights deal: ₹48,390 crore (2023-27)\n🎟️ Average match attendance: 40,000+\n💼 Jobs created: 1 lakh+ directly\n✈️ Tourism boost: ₹1,200 crore per season\n🏟️ Stadium naming rights: ₹100s of crore\n\nIPL is not just cricket. It's an economy. 🇮🇳🏏",
    hashtags: ["#IPLEconomy", "#IPLFacts", "#CricketBusiness", "#IPL2026"],
    accent: "text-green-400",
    accentBg: "bg-green-500/10",
    accentBorder: "border-green-500/20",
  },
  {
    id: 11,
    category: "Fact",
    language: "English",
    emoji: "🔥",
    title: "Top Fastest Centuries in IPL History",
    content:
      "1️⃣ Chris Gayle — 30 balls (vs KXIP, 2013)\n2️⃣ AB de Villiers — 31 balls (vs GL, 2016)\n3️⃣ Yusuf Pathan — 37 balls (IPL 2010)\n4️⃣ Rohit Sharma — 35 balls (IPL 2017)\n5️⃣ David Miller — 38 balls (IPL 2013)\n\nIPL has produced some of cricket's greatest batting moments. T20 is an art form. 🎨🏏",
    hashtags: ["#IPLRecords", "#T20Cricket", "#CricketFacts", "#IPL2026"],
    accent: "text-orange-400",
    accentBg: "bg-orange-500/10",
    accentBorder: "border-orange-500/20",
  },
  {
    id: 12,
    category: "Prediction",
    language: "English",
    emoji: "🔮",
    title: "IPL 2026 Power Rankings (Hot Take)",
    content:
      "Tier S — Favourites 🔥\n🟡 CSK | 🔵 MI\n\nTier A — Dark Horses ⚡\n🟣 KKR | 🟠 SRH\n\nTier B — Could Surprise 🎯\n🔴 RCB | 🩵 DC | 🩷 PBKS\n\nTier C — Rebuilding 🔧\n🔵 GT | 🟣 LSG | 🔵 RR\n\nProve me wrong at the end of May. 😏",
    hashtags: ["#IPL2026Predictions", "#IPL2026", "#CricketPredictions", "#IPLRankings"],
    accent: "text-violet-400",
    accentBg: "bg-violet-500/10",
    accentBorder: "border-violet-500/20",
  },
  {
    id: 13,
    category: "Prediction",
    language: "English",
    emoji: "🏅",
    title: "IPL 2026 Award Predictions",
    content:
      "🟠 Orange Cap (Most Runs): Virat Kohli\n🟣 Purple Cap (Most Wickets): Jasprit Bumrah\n🌟 Most Valuable Player: Hardik Pandya\n⚡ Emerging Player: Yashasvi Jaiswal\n🏆 Champions: CSK\n\nBumrah doing Bumrah things? That's guaranteed. 🎯",
    hashtags: ["#IPL2026Awards", "#OrangeCap", "#PurpleCap", "#IPL2026"],
    accent: "text-pink-400",
    accentBg: "bg-pink-500/10",
    accentBorder: "border-pink-500/20",
  },
  {
    id: 14,
    category: "Team Banter",
    language: "English",
    emoji: "⚔️",
    title: "CSK vs MI — The Greatest Rivalry",
    content:
      "CSK fan: 'Dhoni is God.'\nMI fan: 'Rohit has more titles.'\nCSK fan: 'But Thala's calm.'\nMI fan: 'But Rohit's smile.'\nCSK fan: '...'\nMI fan: '...'\n\nBoth teams combined: 10 IPL titles.\nRest of IPL combined: 7 titles.\n\nWhen these two play, the entire country picks a side. 🔥🏏",
    hashtags: ["#CSKvsMI", "#IPLRivalry", "#MSDhoni", "#RohitSharma", "#IPL2026"],
    accent: "text-yellow-400",
    accentBg: "bg-yellow-500/10",
    accentBorder: "border-yellow-500/20",
  },
  {
    id: 15,
    category: "Team Banter",
    language: "English",
    emoji: "💪",
    title: "Every Team's Vibe in 2026",
    content:
      "CSK: 'Experienced and calm'\nMI: 'Explosive and unpredictable'\nKKR: 'Young and dangerous'\nRCB: 'Passionate and... trying'\nSRH: 'Fearless and aggressive'\nDC: 'Consistent but unlucky'\nRR: 'Smart and tactical'\nGT: 'Hungry for more'\nPBKS: 'Finally getting serious'\nLSG: 'Learning fast'\n\nWhich one's YOUR team? 👇",
    hashtags: ["#IPL2026Teams", "#IPL2026", "#CricketFans"],
    accent: "text-cyan-400",
    accentBg: "bg-cyan-500/10",
    accentBorder: "border-cyan-500/20",
  },
  {
    id: 16,
    category: "Team Banter",
    language: "English",
    emoji: "🟡",
    title: "If IPL Teams Were People at a Party",
    content:
      "CSK: The wise uncle who wins every argument 🧓\nMI: The cool one who shows up late but leaves as host 😎\nKKR: The guy blasting EDM and dancing alone 🎵\nRCB: Cries at 11pm but still the loudest fan 😭🎉\nSRH: Picks fights with everyone but wins sometimes 💥\nDC: Shows up dressed well, leaves early 🤷\nRR: The chess player in the corner 🧠\nGT: New money, already bougie 💎\nPBKS: 'It's our year, I promise' 🫡\nLSG: Still figuring out the playlist 📻",
    hashtags: ["#IPLTeams", "#CricketHumor", "#IPL2026", "#CricketMemes"],
    accent: "text-indigo-400",
    accentBg: "bg-indigo-500/10",
    accentBorder: "border-indigo-500/20",
  },
  {
    id: 17,
    category: "Match Day",
    language: "English",
    emoji: "📅",
    title: "IPL 2026 Season at a Glance",
    content:
      "🗓️ Season Start: March 28, 2026\n🏁 Group Stage: 70 matches\n🎯 Playoffs: 4 teams battle it out\n🏆 Final: May 2026\n📍 Host Cities: 13 across India\n\nHigh-voltage matches every single day for 60 days!\n\nSet your reminder. Clear your calendar. 📲 IPL 2026 is HERE. 🔥",
    hashtags: ["#IPL2026", "#IPLSchedule", "#CricketSeason", "#IPLStarts", "#March28"],
    accent: "text-teal-400",
    accentBg: "bg-teal-500/10",
    accentBorder: "border-teal-500/20",
  },
  {
    id: 18,
    category: "Match Day",
    language: "English",
    emoji: "⚡",
    title: "Match Day Ritual (Every Fan, Every Night)",
    content:
      "6:00 PM — Check weather. No rain? Great.\n7:00 PM — Dinner done early. Priority.\n7:30 PM — Phone on DND. This is sacred time.\n7:30 PM — Toss. Pray to universe.\n7:35 PM — Argue about toss decision with family.\n8:00 PM — 'Just need 10 runs off 6 balls. Easy.'\n10:00 PM — Celebrating OR blaming the pitch.\n10:30 PM — 'Same time tomorrow!' 🔁🏏",
    hashtags: ["#IPLMatchDay", "#CricketLife", "#IPL2026", "#CricketFan"],
    accent: "text-rose-400",
    accentBg: "bg-rose-500/10",
    accentBorder: "border-rose-500/20",
  },
  {
    id: 19,
    category: "Match Day",
    language: "English",
    emoji: "🎙️",
    title: "Things Said During Every IPL Match",
    content:
      "'Wide ball for sure!'\n'That's LBW! How is that not out?!'\n'Why is he bowling him now?!'\n'DRS le lete yaar!'\n'This umpire is blind!'\n'Yes! Yes! Yes! FOUR!'\n'SIX! SIIIIIIIX!!!'\n'Ye toh haar gaye ab.'\n'Still alive! Anything can happen!'\n'Same time kal?' 😂🏏",
    hashtags: ["#IPLComments", "#CricketFans", "#IPL2026", "#CricketMemes", "#IPLFunny"],
    accent: "text-lime-400",
    accentBg: "bg-lime-500/10",
    accentBorder: "border-lime-500/20",
  },
  {
    id: 20,
    category: "Legend",
    language: "English",
    emoji: "🐐",
    title: "MS Dhoni — Numbers Don't Lie",
    content:
      "🏏 IPL matches: 250+\n💥 Runs: 5,243+\n⚡ Strike Rate (death overs): 180+\n🧤 Stumpings: 38 (most in IPL history)\n🏆 IPL titles: 5 (most as captain)\n🎖️ World Cup winner: 2007 T20, 2011 ODI, 2013 CT\n\n'Mahi chhappar phaad ke deta hai.'\n\nAt 44, he still plays. At 44, he still wins. 🫡",
    hashtags: ["#MSDhoni", "#Thala7", "#CSK", "#IPL2026", "#CricketLegend", "#GOAT"],
    accent: "text-yellow-400",
    accentBg: "bg-yellow-500/10",
    accentBorder: "border-yellow-500/20",
  },
  {
    id: 21,
    category: "Legend",
    language: "English",
    emoji: "💥",
    title: "Chris Gayle — The Universe Boss's IPL Legacy",
    content:
      "🏏 Fastest century: 30 balls (vs KXIP, 2013)\n💥 175* — Highest individual IPL score EVER\n🚀 Sixes hit: 357+ (IPL all-time record)\n📈 IPL runs: 4,965+\n🏆 IPL titles: 2 (with KKR & RCB)\n\n'Don't bowl at me. I'll hit you for six.'\n— Chris Gayle, probably.\n\nThe Universe Boss changed T20 cricket forever. 🌌",
    hashtags: ["#ChrisGayle", "#UniverseBoss", "#IPLLegend", "#CricketHistory"],
    accent: "text-purple-400",
    accentBg: "bg-purple-500/10",
    accentBorder: "border-purple-500/20",
  },
  {
    id: 22,
    category: "Legend",
    language: "English",
    emoji: "🎯",
    title: "Lasith Malinga — The Slinga from Lanka",
    content:
      "🏏 IPL wickets: 170+ (was all-time top for years)\n⚡ Yorker accuracy: Unmatched\n🎯 Death over economy: Under 7\n🏆 IPL titles: 4 (with MI)\n\nMalinga didn't bowl cricket balls.\nHe bowled problems disguised as cricket balls.\n\nWhen Malinga ran in, batsmen didn't know whether to laugh or cry.\n\nSometimes both. Usually both. 😂🎯",
    hashtags: ["#LasithMalinga", "#Slinga", "#MI", "#IPLLegend", "#CricketHistory"],
    accent: "text-blue-400",
    accentBg: "bg-blue-500/10",
    accentBorder: "border-blue-500/20",
  },

  // ════════════════════════════════════════════════
  //  HINDI MEMES  🇮🇳
  // ════════════════════════════════════════════════
  {
    id: 101,
    category: "Funny",
    language: "Hindi",
    emoji: "😂",
    title: "आखिरी ओवर का दर्द",
    content:
      "18 रन चाहिए 6 गेंदों में.\n\nगेंद 1: Wide! हाँ! 🙌\nगेंद 2: छक्का! हो सकता है! 💪\nगेंद 3: डॉट. ठीक है. 😤\nगेंद 4: आउट! 😭\nगेंद 5: छक्का! वापस आ गए! 🤩\nगेंद 6: रन आउट. 💀\n\nडॉक्टर: 'तुम्हारी ECG देखी? लगता है Last Over था।' 😂🏏",
    hashtags: ["#IPL2026", "#CricketMemes", "#आखिरीओवर", "#IPLFunny", "#Cricket"],
    accent: "text-yellow-400",
    accentBg: "bg-yellow-500/10",
    accentBorder: "border-yellow-500/20",
  },
  {
    id: 102,
    category: "Funny",
    language: "Hindi",
    emoji: "📺",
    title: "IPL देखने का Weekly Schedule",
    content:
      "सोमवार: 'बस आज थोड़ा देख लूँगा।'\nमंगलवार: रात 12 बजे भी स्क्रीन पर 👁️\nबुधवार: 'कल जल्दी सोऊँगा, पक्का।'\nगुरुवार: फिर रात 12 बजे 🙄\nशुक्रवार: 'Weekend है, सब चलता है।'\nशनिवार: Double Header! 🏏🏏\nरविवार: Double Header फिर से!! 😍\n\nपरिवार: 'IPL से ही शादी कर लो।' 😅",
    hashtags: ["#IPL2026", "#CricketLife", "#IPLFans", "#CricketHumor", "#हिंदी"],
    accent: "text-orange-400",
    accentBg: "bg-orange-500/10",
    accentBorder: "border-orange-500/20",
  },
  {
    id: 103,
    category: "Funny",
    language: "Hindi",
    emoji: "😎",
    title: "RCB Fans की अमर कहानी",
    content:
      "हर साल:\n'इस बार टीम बहुत मजबूत है।'\n'Kohli फॉर्म में है।'\n'2026 हमारा है, पक्का!'\n\nAPRIL: टॉप पर 🔝\nMAY: थोड़ा हिल गए 😬\nPlayoffs: बाहर 😭\n\nपर RCB fans हार नहीं मानते।\n'ई साला कप नामदे' — forever and always. 💜🔴\n\nये loyalty नहीं, religion है। 🙏",
    hashtags: ["#RCB", "#EeSalaCupNamde", "#IPL2026", "#CricketMemes", "#Kohli"],
    accent: "text-red-400",
    accentBg: "bg-red-500/10",
    accentBorder: "border-red-500/20",
  },
  {
    id: 104,
    category: "Funny",
    language: "Hindi",
    emoji: "🏏",
    title: "धोनी के बारे में सच — Finisher का दर्जा",
    content:
      "2026 में भी धोनी मैदान पर हैं।\n\nउम्र: कोई मायने नहीं 🤷\nFinisher: आज भी सबसे बेस्ट 🏆\nRetire: ये शब्द dictionary में नहीं\n\n'महेंद्र सिंह धोनी को सब retire बुलाते हैं,\nपर retire होती है बल्लेबाजों की हिम्मत।'\n\nThala ने CSK को 5 बार champion बनाया।\nBoss बोले तो — BOSS! 🐐🏏",
    hashtags: ["#MSDhoni", "#Thala7", "#CSK", "#IPL2026", "#CricketLegend", "#GOAT"],
    accent: "text-yellow-400",
    accentBg: "bg-yellow-500/10",
    accentBorder: "border-yellow-500/20",
  },
  {
    id: 105,
    category: "Fact",
    language: "Hindi",
    emoji: "📊",
    title: "IPL 2026 — जानिए कुछ बड़े नंबर",
    content:
      "🏏 74 मैच, 60 दिनों में\n🏟️ 13 स्टेडियम | 10 टीमें\n💰 कुल नीलामी: ₹639 करोड़\n📺 50 करोड़+ दर्शक\n🌍 दुनिया की तीसरी सबसे बड़ी league\n⚡ दुनिया में सबसे ज्यादा सिक्स\n\n📅 28 मार्च 2026 से शुरू!\n\nक्या आप तैयार हैं? 🔥🏏",
    hashtags: ["#IPL2026", "#IPLFacts", "#CricketFacts", "#IPLStarts", "#March28"],
    accent: "text-emerald-400",
    accentBg: "bg-emerald-500/10",
    accentBorder: "border-emerald-500/20",
  },
  {
    id: 106,
    category: "Fact",
    language: "Hindi",
    emoji: "🏆",
    title: "IPL के अब तक के Champions",
    content:
      "🥇 CSK — 5 खिताब (2010, 2011, 2018, 2021, 2023)\n🥈 MI — 5 खिताब (2013, 2015, 2017, 2019, 2020)\n🥉 KKR — 3 खिताब (2012, 2014, 2024)\n4️⃣ SRH — 2 खिताब (2016, 2022)\n5️⃣ RR — 1 खिताब (2008)\n6️⃣ GT — 1 खिताब (2022)\n\nRCB, PBKS, DC, LSG: अभी भी इंतजार में... 🫡",
    hashtags: ["#IPLChampions", "#IPLHistory", "#CricketFacts", "#IPL2026"],
    accent: "text-amber-400",
    accentBg: "bg-amber-500/10",
    accentBorder: "border-amber-500/20",
  },
  {
    id: 107,
    category: "Prediction",
    language: "Hindi",
    emoji: "🔮",
    title: "IPL 2026 — मेरी भविष्यवाणी",
    content:
      "🔮 IPL 2026 विजेता:\n\n🥇 CSK — थाला का जादू बरकरार\n🥈 MI — बुमराह की वापसी 💪\n🥉 KKR — नई पीढ़ी का जोश\n\nSurprise package: SRH 🔥\nRCB fans: 'इस बार पक्का!!' 😂\n\nये मेरी राय है — क्या आप सहमत हैं? 👇",
    hashtags: ["#IPL2026Predictions", "#IPL2026", "#CricketPredictions", "#भविष्यवाणी"],
    accent: "text-violet-400",
    accentBg: "bg-violet-500/10",
    accentBorder: "border-violet-500/20",
  },
  {
    id: 108,
    category: "Team Banter",
    language: "Hindi",
    emoji: "⚔️",
    title: "CSK vs MI — असली महामुकाबला",
    content:
      "CSK Fan: 'धोनी भगवान हैं।'\nMI Fan: 'रोहित के 5 खिताब हैं।'\nCSK Fan: 'थाला की शांति देखो।'\nMI Fan: 'रोहित की मुस्कान तो देखो।'\nCSK Fan: '...'\nMI Fan: '...'\n\nदोनों मिलकर: 10 IPL खिताब 🏆🏆\nबाकी 8 टीमें मिलकर: 7 खिताब\n\nये मैच होता है तो पूरा देश बंट जाता है। 🔥🏏",
    hashtags: ["#CSKvsMI", "#IPLRivalry", "#MSDhoni", "#RohitSharma", "#IPL2026"],
    accent: "text-yellow-400",
    accentBg: "bg-yellow-500/10",
    accentBorder: "border-yellow-500/20",
  },
  {
    id: 109,
    category: "Team Banter",
    language: "Hindi",
    emoji: "🎪",
    title: "हर IPL टीम का एक जुमला",
    content:
      "CSK: 'Yellove' 💛\nMI: 'One Family' 💙\nKKR: 'Korbo Lorbo Jeetbo Re' 🟣\nRCB: 'Ee Sala Cup Namde' 🔴\nSRH: 'Orange Army' 🟠\nDC: 'Roar Macha' 🔵\nRR: 'Halla Bol' 🩷\nGT: 'Aava De' 🔵\nPBKS: 'Sher Punjab' 🟡\nLSG: 'Lucknow Ki Shaan' 🟢\n\nकौन सा tagline आपका favourite है? 👇🏏",
    hashtags: ["#IPLTeams", "#IPL2026", "#CricketFans", "#हिंदी"],
    accent: "text-cyan-400",
    accentBg: "bg-cyan-500/10",
    accentBorder: "border-cyan-500/20",
  },
  {
    id: 110,
    category: "Match Day",
    language: "Hindi",
    emoji: "🌙",
    title: "IPL Match Night की दिनचर्या",
    content:
      "7:30 PM — टॉस 🎯\n7:35 PM — टॉस पर पूरे घर में बहस 🗣️\n8:00 PM — पहला विकेट 😱\n8:30 PM — 'सब खत्म हो गया' 😩\n9:00 PM — 'वापसी हो रही है!' 🤩\n9:30 PM — DRS की माँग 😤\n9:35 PM — umpire पर गुस्सा 😡\n10:00 PM — आखिरी ओवर 🫀\n10:06 PM — जीत OR हार\n10:07 PM — 'कल फिर मिलते हैं!' 🔁🏏",
    hashtags: ["#IPLMatchDay", "#CricketLife", "#IPL2026", "#IPLFans"],
    accent: "text-rose-400",
    accentBg: "bg-rose-500/10",
    accentBorder: "border-rose-500/20",
  },
  {
    id: 111,
    category: "Match Day",
    language: "Hindi",
    emoji: "🎙️",
    title: "हर IPL Match में सुनाई देता है ये...",
    content:
      "'Wide ball है यार!'\n'LBW था! ये कैसे नहीं?!'\n'इसे अभी क्यों बोलाया?!'\n'DRS ले लेते यार!'\n'ये umpire अंधा है!'\n'हाँ! हाँ! FOUR!!!'\n'SIX! भाई SIX!!!'\n'ये तो हार गए अब।'\n'अभी भी chance है!'\n'...'\n'कल फिर देखेंगे?' 😂🏏",
    hashtags: ["#IPLComments", "#CricketFans", "#IPL2026", "#CricketMemes", "#हिंदी"],
    accent: "text-lime-400",
    accentBg: "bg-lime-500/10",
    accentBorder: "border-lime-500/20",
  },
  {
    id: 112,
    category: "Funny",
    language: "Hindi",
    emoji: "👨‍👩‍👧",
    title: "IPL और परिवार — एक अजीब रिश्ता",
    content:
      "जब IPL match हो:\n\nबाबा: 'TV मेरा है, मैं ही देखूँगा।' 📺\nभाई: 'Phone पर Hotstar है।' 📱\nमम्मी: 'खाना ठंडा हो गया।' 🍽️\nदादाजी: 'पहले Real Cricket था।' 😤\nआप: सबको ignore करके screen पर टकटकी 👁️👁️\n\nIPL एक family event है —\nबस हर कोई अलग channel पर देखता है। 😂🏏",
    hashtags: ["#IPLFamily", "#CricketHumor", "#IPL2026", "#IndianFamily", "#CricketMemes"],
    accent: "text-purple-400",
    accentBg: "bg-purple-500/10",
    accentBorder: "border-purple-500/20",
  },
  {
    id: 113,
    category: "Legend",
    language: "Hindi",
    emoji: "👑",
    title: "विराट कोहली — IPL के King",
    content:
      "🏏 IPL matches: 237+\n💥 रन: 7,000+ (सबसे ज्यादा)\n🎯 शतक: 8 (IPL इतिहास में सर्वाधिक)\n📈 औसत: 36+\n⚡ Strike Rate: 130+\n🏆 Orange Cap: 3 बार\n\n37 साल की उम्र में भी सबसे आगे।\n\n'King' बोलते हैं — बिना वजह नहीं बोलते। 👑🔴",
    hashtags: ["#ViratKohli", "#KingKohli", "#RCB", "#IPL2026", "#CricketLegend"],
    accent: "text-red-400",
    accentBg: "bg-red-500/10",
    accentBorder: "border-red-500/20",
  },

  // ════════════════════════════════════════════════
  //  GUJARATI MEMES  🟠
  // ════════════════════════════════════════════════
  {
    id: 201,
    category: "Funny",
    language: "Gujarati",
    emoji: "😂",
    title: "છેલ્લો ઓવર — ગુજ્જુ Fan ની ઓળખ",
    content:
      "18 રન જોઈએ 6 બૉલમાં.\n\nગેંદ 1: Wide! 🙌\nગેંદ 2: છગ્ગો! 💪\nગેંદ 3: Dot. 😤\nગેંદ 4: OUT! 😭\nગેંદ 5: છગ્ગો ફરી! 🤩\nગેંદ 6: Run Out. 💀\n\nDoctor: 'ECG report IPL last over scorecard જેવી છે!' 😂🏏\n\nGujarat Titans fan ની life આ જ. 🔵",
    hashtags: ["#IPL2026", "#CricketMemes", "#GT", "#GujaratiMemes", "#IPLFunny"],
    accent: "text-yellow-400",
    accentBg: "bg-yellow-500/10",
    accentBorder: "border-yellow-500/20",
  },
  {
    id: 202,
    category: "Funny",
    language: "Gujarati",
    emoji: "🔵",
    title: "GT — ગુજ્જુ ટીમ ની ગજ્જબ Story",
    content:
      "2022: Gujarat Titans — BRAND NEW team! 🆕\nResult: 🏆 CHAMPIONS!\n\n2023: Second year! 🤩\nResult: 🏆 FINALISTS!\n\n2024: Third year. 😅\nResult: Playoffs miss...\n\n2026: Shubman Gill — Captain Cool! 😎\n\nGT fans: 'ગુજ્જુ ક્યારેય હારે નહીં!'\n\n'Aav De, GT Aav De!' 🧡🔵",
    hashtags: ["#GT", "#GujaratTitans", "#IPL2026", "#GujaratiMemes", "#ShubmanGill"],
    accent: "text-blue-400",
    accentBg: "bg-blue-500/10",
    accentBorder: "border-blue-500/20",
  },
  {
    id: 203,
    category: "Funny",
    language: "Gujarati",
    emoji: "🤣",
    title: "ગુજ્જુ Family અને IPL — ઝઘડો + Love",
    content:
      "Match time:\n\nPapa: 'TV maro chhe, hu jois!' 📺\nBhai: 'Hotstar phone pe chhe.' 📱\nMummy: 'Jaman thandi thai gai.' 🍽️\nDada: 'Pehla real cricket hatu.' 😤\nTame: Screen par aankhon atki 👁️👁️\n\nIPL ek Gujarati family festival chhe —\nBas baddha alag alag screen par! 😂🏏\n\n'Aav de re, aav de — IPL season!' 🎶",
    hashtags: ["#IPLFamily", "#CricketHumor", "#IPL2026", "#GujaratiMemes", "#GujaratCricket"],
    accent: "text-orange-400",
    accentBg: "bg-orange-500/10",
    accentBorder: "border-orange-500/20",
  },
  {
    id: 204,
    category: "Funny",
    language: "Gujarati",
    emoji: "🎯",
    title: "IPL Toss — ગુજ્જુ Style",
    content:
      "Captain toss jeete chhe.\n3 second vichar kare chhe.\n Sky joi lido. Pitch joi lidi. Crowd joi lidhun.\nPhone par weather check karyu.\n\n'Aapde batting karish.' 🏏\n\nCommentator: 'Brave decision!'\nResult: 89 all out. 😂\n\nGujarat ma kehvay chhe:\n'Toss jeevanu nahi, match jeevanu!'\n\nPan blame always toss ne j kare. 😅",
    hashtags: ["#IPLToss", "#CricketMemes", "#IPL2026", "#GujaratiMemes", "#CricketHumor"],
    accent: "text-purple-400",
    accentBg: "bg-purple-500/10",
    accentBorder: "border-purple-500/20",
  },
  {
    id: 205,
    category: "Fact",
    language: "Gujarati",
    emoji: "📊",
    title: "IPL 2026 — ગુજ્જુ Fans માટે Big Numbers",
    content:
      "🏏 74 Matches | 60 Days\n🏟️ 13 Stadiums across India\n🌟 10 Teams | 2026 Season\n📅 28 March 2026 thi sharu!\n💰 Total Auction: ₹639 Crore\n📺 50 Crore+ Gujarati Viewers\n🌍 World ni 3rd biggest sports league\n\nIPL Gujarat na ghar ghar ma pahonchi gayi chhe!\n\n'Aav de, IPL aav de!' 🎶🏏🧡",
    hashtags: ["#IPL2026", "#IPLFacts", "#GujaratiMemes", "#March28", "#CricketFacts"],
    accent: "text-emerald-400",
    accentBg: "bg-emerald-500/10",
    accentBorder: "border-emerald-500/20",
  },
  {
    id: 206,
    category: "Fact",
    language: "Gujarati",
    emoji: "🦁",
    title: "Hardik Pandya — Gujarat no Star",
    content:
      "🏏 Hardik Pandya — Made in Baroda, Gujarat!\n\n💥 IPL Runs: 2,500+\n🎯 IPL Wickets: 60+\n🏆 IPL Titles: 2 (with MI)\n🌟 T20 World Cup Winner 2024\n💰 IPL 2024 Auction: ₹15 Crore\n\nGujarat no chokro international superstar bani gayo!\n\n'Hardik = Gujarat ni Shaan' 🧡🦁\n\nBarodian boy world stadium ma chhe! 🌍",
    hashtags: ["#HardikPandya", "#Gujarat", "#IPL2026", "#GujaratiMemes", "#Baroda"],
    accent: "text-amber-400",
    accentBg: "bg-amber-500/10",
    accentBorder: "border-amber-500/20",
  },
  {
    id: 207,
    category: "Fact",
    language: "Gujarati",
    emoji: "🏆",
    title: "IPL Champions List — Gujarati ma",
    content:
      "🥇 CSK — 5 titles (2010, 2011, 2018, 2021, 2023)\n🥈 MI — 5 titles (2013, 2015, 2017, 2019, 2020)\n🥉 KKR — 3 titles (2012, 2014, 2024)\n4️⃣ SRH — 2 titles (2016, 2022)\n5️⃣ RR — 1 title (2008)\n6️⃣ GT — 1 title (2022) ✨\n\nGT 2022 ma j champion bani gaya — first time!\n\nRCB, PBKS, DC, LSG: Hujo wait karata... 🫡😂",
    hashtags: ["#IPLChampions", "#GT", "#GujaratiMemes", "#IPL2026", "#CricketFacts"],
    accent: "text-amber-400",
    accentBg: "bg-amber-500/10",
    accentBorder: "border-amber-500/20",
  },
  {
    id: 208,
    category: "Prediction",
    language: "Gujarati",
    emoji: "🔮",
    title: "IPL 2026 — ગુજ્જુ Prediction",
    content:
      "🔮 Gujarati Fan ni Bhavisyavani:\n\n🥇 GT — Home advantage + Shubman 🔵\n🥈 CSK — Thala magic forever 💛\n🥉 MI — Never count out Mumbai 💙\n\nSurprise team: KKR 🟣\nHeartbreak (as always): RCB 😂🔴\n\nCricket unpredictable chhe bhai!\nPan GT fans ni asha: 'Aa varo Gujarat no!' 🧡\n\nTame shu vicharavcho? 👇",
    hashtags: ["#IPL2026Predictions", "#GT", "#GujaratiMemes", "#CricketPredictions", "#IPL2026"],
    accent: "text-violet-400",
    accentBg: "bg-violet-500/10",
    accentBorder: "border-violet-500/20",
  },
  {
    id: 209,
    category: "Team Banter",
    language: "Gujarati",
    emoji: "⚔️",
    title: "CSK vs MI — ગુજ્જુ Version",
    content:
      "CSK Fan: 'Dhoni bhagwan chhe!'\nMI Fan: 'Rohit na 5 trophy chhe!'\nCSK Fan: 'Thala ni calm energy...'\nMI Fan: 'Rohit smile more powerful!'\n\nGT Fan (corner ma thi): 'Bhai, Gujarat Titans ni vaat karo na!' 😂🔵\n\nIPL = Zaghadko + Love + Cricket.\nPerfect Gujarati combo! 🏏❤️🧡",
    hashtags: ["#CSKvsMI", "#GT", "#IPLRivalry", "#GujaratiMemes", "#IPL2026"],
    accent: "text-yellow-400",
    accentBg: "bg-yellow-500/10",
    accentBorder: "border-yellow-500/20",
  },
  {
    id: 210,
    category: "Team Banter",
    language: "Gujarati",
    emoji: "🎪",
    title: "IPL Teams — Party ma Kon Kaisu?",
    content:
      "CSK: Dada jo experience thi jeete 🧓\nMI: Mast, late aave pan first jaay 😎\nKKR: Eklo naache, bija ne pasand aave 🎵\nRCB: Rade chhe pan sabse loud fan chhe 😭🎉\nSRH: Baddha sathe jhaghade pan jeete 💥\nDC: Saras kapda, jaldi jaay 🤷\nGT: Nava paise — bougie already 💎\nRR: Kone ma chess rami be 🧠\nPBKS: 'Aa varo maro chhe, pakko!' 🫡\nLSG: Playlist huju samajhata nathi 📻",
    hashtags: ["#IPLTeams", "#GujaratiMemes", "#CricketHumor", "#IPL2026"],
    accent: "text-indigo-400",
    accentBg: "bg-indigo-500/10",
    accentBorder: "border-indigo-500/20",
  },
  {
    id: 211,
    category: "Match Day",
    language: "Gujarati",
    emoji: "📅",
    title: "28 March 2026 — IPL Season Shuru!",
    content:
      "📅 IPL 2026 starts 28 March!\n\nGujarat ma cricket fever!\n\n☀️ Subah: Team news check karo\n🌅 Dopaher: Pitch report dekho\n🌆 Sanj: Toss Time!\n🌃 Raat: MATCH! 🏏🔥\n\n'Aav de, IPL aav de!'\nGujjus baddha gai raha chhe! 🎶🧡\n\nTame taiyar chho? Let's go! 🙌🏏",
    hashtags: ["#IPL2026", "#March28", "#GujaratiMemes", "#CricketSeason", "#GT"],
    accent: "text-teal-400",
    accentBg: "bg-teal-500/10",
    accentBorder: "border-teal-500/20",
  },
  {
    id: 212,
    category: "Match Day",
    language: "Gujarati",
    emoji: "⚡",
    title: "ગુજ્જુ Fan nu Match Night Routine",
    content:
      "7:00 PM — Dinner jaldi pataavu 🍽️\n7:30 PM — Phone DND on karo 📵\n7:30 PM — Toss dekho 🎯\n7:35 PM — Toss par ghar ma debate 🗣️\n8:00 PM — 'Aa wicket nu shu?' 😱\n9:00 PM — 'Vaapsi thay chhe!' 🤩\n9:30 PM — DRS ni maang 😤\n10:00 PM — Last over — dil rokalo 🫀\n10:06 PM — JIT ya HAAR\n10:07 PM — 'Kal fari joish, ha!' 🔁🏏",
    hashtags: ["#IPLMatchDay", "#CricketLife", "#GujaratiMemes", "#IPL2026", "#CricketFan"],
    accent: "text-rose-400",
    accentBg: "bg-rose-500/10",
    accentBorder: "border-rose-500/20",
  },
  {
    id: 213,
    category: "Legend",
    language: "Gujarati",
    emoji: "🐐",
    title: "MS Dhoni — Thala no GOAT",
    content:
      "🏏 IPL matches: 250+\n💥 Runs: 5,243+\n⚡ Death over strike rate: 180+\n🧤 Stumpings: 38 (IPL record)\n🏆 IPL titles: 5 (captain)\n🎖️ World Cup: 2007 T20, 2011 ODI, 2013 CT\n\n'Mahi chhappar phaad ke deta hai.'\n\n44 varshe pan rami rahe chhe.\n44 varshe pan jitavta rahe chhe. 🫡\n\nGujarat thi pan Dhoni nu fan club chhe! 💛🧡",
    hashtags: ["#MSDhoni", "#Thala7", "#CSK", "#IPL2026", "#GujaratiMemes", "#GOAT"],
    accent: "text-yellow-400",
    accentBg: "bg-yellow-500/10",
    accentBorder: "border-yellow-500/20",
  },
];

const CATEGORIES: (MemeCategory | "All")[] = [
  "All", "Funny", "Fact", "Prediction", "Team Banter", "Match Day", "Legend",
];

const LANGUAGES: (MemeLanguage | "All")[] = ["All", "English", "Hindi", "Gujarati"];

const LANG_LABELS: Record<string, string> = {
  All: "🌐 All Languages",
  English: "🌐 English",
  Hindi: "🇮🇳 हिंदी",
  Gujarati: "🟠 ગુજરાતી",
};

export function MemesClient() {
  const [activeCategory, setActiveCategory] = useState<MemeCategory | "All">("All");
  const [activeLang, setActiveLang] = useState<MemeLanguage | "All">("All");
  const [search, setSearch] = useState("");
  const [shuffleKey, setShuffleKey] = useState(0);

  const filtered = useMemo(() => {
    let list = [...ALL_MEMES];
    if (activeCategory !== "All") {
      list = list.filter((m) => m.category === activeCategory);
    }
    if (activeLang !== "All") {
      list = list.filter((m) => m.language === activeLang);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.content.toLowerCase().includes(q) ||
          m.hashtags.some((h) => h.toLowerCase().includes(q))
      );
    }
    if (shuffleKey > 0) {
      list = [...list].sort(() => Math.random() - 0.5);
    }
    return list;
  }, [activeCategory, activeLang, search, shuffleKey]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-purple-500/10 via-background to-orange-500/10 px-4 py-4">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/5 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="mb-1.5 inline-flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-400">
              <Sparkles className="h-3 w-3" />
              AI-Crafted Cricket Content
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              IPL Memes &amp;{" "}
              <span className="bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
                Viral Posts
              </span>
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Funny &amp; shareable IPL content in{" "}
              <span className="font-semibold text-foreground">English, हिंदी &amp; ગુજરાતી</span>. Copy &amp; share instantly! 🏏🔥
            </p>
          </div>

          {/* Language Stats */}
          <div className="flex flex-wrap gap-2">
            {(["English", "Hindi", "Gujarati"] as MemeLanguage[]).map((lang) => {
              const count = ALL_MEMES.filter((m) => m.language === lang).length;
              return (
                <button
                  key={lang}
                  onClick={() => { setActiveLang(lang); setActiveCategory("All"); }}
                  className={cn(
                    "rounded-full border px-3 py-1 text-xs font-semibold transition-all",
                    lang === "Hindi"
                      ? "border-orange-500/30 bg-orange-500/10 text-orange-400 hover:bg-orange-500/20"
                      : lang === "Gujarati"
                      ? "border-green-500/30 bg-green-500/10 text-green-400 hover:bg-green-500/20"
                      : "border-blue-500/30 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
                  )}
                >
                  {LANG_LABELS[lang]} · {count}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Controls */}
      <div className="sticky top-16 z-40 border-b border-border bg-background/90 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 py-3 space-y-3">
          {/* Search + Shuffle */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search memes, teams, players..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-border bg-secondary pl-9 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <button
              onClick={() => setShuffleKey((k) => k + 1)}
              className="flex items-center gap-2 rounded-lg border border-border bg-secondary px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:text-foreground hover:bg-secondary/80"
              title="Shuffle"
            >
              <RefreshCw className="h-4 w-4" />
              <span className="hidden sm:inline">Shuffle</span>
            </button>
          </div>

          {/* Language Pills */}
          <div className="flex gap-2 overflow-x-auto pb-0.5 scrollbar-none">
            {LANGUAGES.map((lang) => (
              <button
                key={lang}
                onClick={() => setActiveLang(lang)}
                className={cn(
                  "flex-shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition-all border",
                  activeLang === lang
                    ? lang === "Hindi"
                      ? "bg-orange-500 text-white border-orange-500 shadow-md"
                      : lang === "Gujarati"
                      ? "bg-green-600 text-white border-green-600 shadow-md"
                      : "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/25"
                    : "bg-secondary text-muted-foreground border-border hover:text-foreground"
                )}
              >
                {LANG_LABELS[lang]}
              </button>
            ))}
          </div>

          {/* Category Pills */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "flex-shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition-all",
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Memes Grid */}
      <div className="mx-auto max-w-7xl px-4 py-8">
        {filtered.length === 0 ? (
          <div className="py-24 text-center text-muted-foreground">
            <p className="text-lg">No posts found.</p>
            <button
              onClick={() => { setSearch(""); setActiveCategory("All"); setActiveLang("All"); }}
              className="mt-4 text-sm text-primary underline-offset-4 hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <>
            <p className="mb-6 text-sm text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filtered.length}</span> of{" "}
              <span className="font-semibold text-foreground">{ALL_MEMES.length}</span> posts
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((meme) => (
                <MemeCard key={`${meme.id}-${shuffleKey}`} meme={meme} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Footer CTA */}
      <section className="border-t border-border bg-card/50 px-4 py-10">
        <div className="mx-auto max-w-3xl">
          <p className="mb-5 text-center text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            More ways to share your cricket love
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Business poster */}
            <a
              href="/poster"
              className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 transition-all hover:border-primary/30 hover:bg-primary/5"
            >
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-white">Business Match Poster</p>
                <p className="text-xs text-muted-foreground">Branded poster with your logo &amp; contact — free</p>
              </div>
              <span className="ml-auto text-xs font-semibold text-primary opacity-0 transition-opacity group-hover:opacity-100">
                Go →
              </span>
            </a>

            {/* Own poster */}
            <a
              href="/own-poster"
              className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 transition-all hover:border-red-500/30 hover:bg-red-500/5"
            >
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-400 transition-colors group-hover:bg-red-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-white">Fan Support Poster</p>
                <p className="text-xs text-muted-foreground">Support your team or player with custom text</p>
              </div>
              <span className="ml-auto text-xs font-semibold text-red-400 opacity-0 transition-opacity group-hover:opacity-100">
                Go →
              </span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
