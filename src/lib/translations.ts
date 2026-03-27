export type Lang = "en" | "hi" | "gu";

const translations = {
  en: {
    // ── Nav ────────────────────────────────────────
    home: "Home",
    playerCards: "Player Cards",
    schedule: "Schedule",
    matchCard: "Match Card",
    fanSupport: "Fan Support",
    more: "More",
    teams: "Teams",
    memesAndPosts: "Memes & Posts",
    createPoster: "Create Poster",
    cricketQuiz: "Cricket Quiz",
    helpAndGuide: "Help & Guide",
    aboutUs: "About Us",
    signIn: "Sign In",
    signOut: "Sign Out",
    signInRegister: "Sign In / Register",
    createNow: "Create Now",
    signedInAs: "Signed in as",

    // ── Business Details ────────────────────────────
    addBusiness: "Add Business",
    myBusiness: "My Business",
    businessDetails: "Business Details",
    business: "Business",
    addBusinessDetails: "Add Business Details",
    companyBrandName: "Company / Brand Name",
    phone: "Phone",
    website: "Website",
    autoSaved: "Auto-saved",
    changesAutoSaved: "Changes saved automatically",
    save: "Save",
    saved: "Saved!",
    skipForNow: "Skip for now",
    personalizeYourPosters: "Personalize Your Posters",
    bizPopupDesc:
      "Add your business details once — they'll appear on every poster, card & meme you create.",
    bizFeature1: "Your brand name on every poster",
    bizFeature2: "Phone & website for customers",
    bizFeature3: "Instagram, Facebook & X handles",
    addYourBusinessDetails: "Add your business details",
    personalizePostersTooltip:
      "Personalize posters with your brand name, contact & social links.",
    personalizePostersTooltipShort:
      "Personalize posters with your brand & contact info.",

    // ── Footer ──────────────────────────────────────
    footerDisclaimer:
      "© 2026 cricpost.in — Fan-made tool. Not affiliated with BCCI or IPL. Team logos & player images © their respective owners.",
    termsAndConditions: "Terms & Conditions",

    // ── Home page ────────────────────────────────────
    heroTitle: "Cricket Posters,",
    heroTitle2: "Memes & Cards",
    heroSubtitle:
      "Create stunning IPL match posters, player cards, fan support posts & memes — with your business branding built in. Free. Instant. Shareable.",
    howItWorks: "How It Works",
    step1Title: "Pick a Match or Player",
    step1Desc: "Browse the full cricket schedule or 150+ player roster",
    step2Title: "Add Your Details",
    step2Desc:
      "Company name, phone, social media & logo — saved for next time",
    step3Title: "Download & Share",
    step3Desc: "Export as PNG and share instantly on WhatsApp or Instagram",

    // tools
    toolMatchPoster: "Match Poster",
    toolMatchPosterDesc:
      "Branded cricket match posters with your business details.",
    toolPlayerCards: "Player Cards",
    toolPlayerCardsDesc: "Download digital trading cards for 150+ cricketers.",
    toolMatchCard: "Match Card",
    toolMatchCardDesc: '"I\'m going to the match" card with your photo & team.',
    toolFanSupport: "Fan Support",
    toolFanSupportDesc:
      "Personal fan support poster for your favourite team or player.",
    toolMemes: "Memes & Posts",
    toolMemesDesc: "Shareable cricket memes and ready-made social posts.",
    toolSchedule: "Schedule",
    toolScheduleDesc: "Full cricket fixture list with venues and timings.",
    toolTeams: "Teams",
    toolTeamsDesc: "All cricket franchise teams with squads and stats.",
    toolCricketQuiz: "Cricket Quiz",
    toolCricketQuizDesc: "15-question IPL trivia. Test your cricket knowledge!",
    toolInstagram: "Instagram Posts",
    toolInstagramDesc: "Ready-made IPL images with captions. Download & post instantly.",
    badgeMostPopular: "Most Popular",
    badgeNew: "New",

    // home hero
    heroH1a: "Your Ultimate",
    heroH1b: "Cricket",
    heroH1c: "Content Hub",
    heroDesc: "Create match posters, player cards, fan support posts, memes, and match-day cards — all branded with your business details. Free for everyone.",
    createPosterFree: "Create Poster — Free",
    viewSchedule: "View Schedule",
    getStarted: "Get Started in",
    getStarted3Steps: "3 Steps",
    nextMatch: "Next",
    nextMatchHighlight: "Match",

    // upcoming matches
    upcomingMatches: "Upcoming Matches",
    upcomingMatchesHighlight: "Matches",
    viewFullSchedule: "Full Schedule",
    vs: "vs",

    // ── Schedule page ───────────────────────────────
    phase1Schedule: "Phase 1 Schedule",
    cricket2026MatchSchedule: "IPL 2026",
    matchSchedule: "Match Schedule",
    scheduleSubtitle: (matches: number, venues: number) =>
      `${matches} matches (Phase 1) • ${venues} venues • Click any match to create a poster`,
    matchesLabel: "Matches",
    teamsLabel: "Teams",
    venuesLabel: "Venues",
    phase2ComingSoon: "Phase 2 schedule (Matches 21-84) coming soon",
    phase2Desc:
      "BCCI is expected to release the remaining schedule shortly. We'll update automatically.",

    // ── Players page ─────────────────────────────────
    downloadableCards: "Downloadable Cards",
    playerCardsTitle: "Player",
    playerCardsHighlight: "Cards",
    playersSubtitle: (players: number, teams: number) =>
      `${players} cricketers • ${teams} teams • Free to download & share`,
    playersLabel: "Players",
    pngFormat: "PNG Format",

    // ── Teams page ────────────────────────────────────
    cricket2026Badge: "IPL 2026",
    allTeamsTitle: "All Teams &",
    allTeamsHighlight: "Squads",
    teamsSubtitle: (teams: number, players: number) =>
      `${teams} franchises • ${players} players • One champion`,
    totalTitles: "Total Titles",
    roleLegend: "Role Legend:",
    batsman: "Batsman",
    bowler: "Bowler",
    allRounder: "All-Rounder",
    wicketKeeper: "Wicket-Keeper",

    // ── Own Poster page ───────────────────────────────
    fanSupportBadge: "❤️ Fan Support Poster",
    fanSupportTitle: "Create Your",
    fanSupportHighlight: "Fan Support",
    fanSupportTitle2: "Poster",
    fanSupportDesc:
      "Pick your favourite team or player, write your cheer message, and download a shareable support poster — with your business branding built right in.",

    // ── Memes page ────────────────────────────────────
    memesBadge: "Memes & Posts",
    memesTitle: "Cricket",
    memesHighlight: "Memes & Posts",
    memesSubtitle: "Funny & viral cricket memes. Copy, share on WhatsApp & Instagram.",
    memesCount: "100+ memes",
    allCategories: "All",
    funny: "Funny",
    facts: "Facts",
    predictions: "Predictions",
    motivation: "Motivation",
    allLanguages: "All Languages",
    searchMemes: "Search memes...",
    noMemesFound: "No memes found",
    tryDifferentFilter: "Try a different category or search term.",
    shuffleMemes: "Shuffle",
  },

  hi: {
    // ── Nav ────────────────────────────────────────
    home: "होम",
    playerCards: "खिलाड़ी कार्ड",
    schedule: "शेड्यूल",
    matchCard: "मैच कार्ड",
    fanSupport: "फैन सपोर्ट",
    more: "और",
    teams: "टीम",
    memesAndPosts: "मीम्स और पोस्ट",
    createPoster: "पोस्टर बनाएं",
    cricketQuiz: "क्रिकेट क्विज़",
    helpAndGuide: "मदद और गाइड",
    aboutUs: "हमारे बारे में",
    signIn: "साइन इन",
    signOut: "साइन आउट",
    signInRegister: "साइन इन / रजिस्टर",
    createNow: "अभी बनाएं",
    signedInAs: "साइन इन है",

    // ── Business Details ────────────────────────────
    addBusiness: "बिज़नेस जोड़ें",
    myBusiness: "मेरा बिज़नेस",
    businessDetails: "बिज़नेस विवरण",
    business: "बिज़नेस",
    addBusinessDetails: "बिज़नेस विवरण जोड़ें",
    companyBrandName: "कंपनी / ब्रांड नाम",
    phone: "फोन",
    website: "वेबसाइट",
    autoSaved: "ऑटो-सेव",
    changesAutoSaved: "बदलाव अपने आप सेव होते हैं",
    save: "सेव",
    saved: "सेव हो गया!",
    skipForNow: "अभी छोड़ें",
    personalizeYourPosters: "पोस्टर पर्सनलाइज़ करें",
    bizPopupDesc:
      "अपना बिज़नेस विवरण एक बार जोड़ें — यह हर पोस्टर, कार्ड और मीम पर दिखेगा।",
    bizFeature1: "हर पोस्टर पर आपका ब्रांड नाम",
    bizFeature2: "ग्राहकों के लिए फोन और वेबसाइट",
    bizFeature3: "Instagram, Facebook और X हैंडल",
    addYourBusinessDetails: "अपना बिज़नेस विवरण जोड़ें",
    personalizePostersTooltip:
      "अपने ब्रांड नाम, संपर्क और सोशल लिंक के साथ पोस्टर पर्सनलाइज़ करें।",
    personalizePostersTooltipShort:
      "अपने ब्रांड और संपर्क जानकारी के साथ पोस्टर पर्सनलाइज़ करें।",

    // ── Footer ──────────────────────────────────────
    footerDisclaimer:
      "© 2026 cricpost.in — फैन-निर्मित टूल। BCCI या IPL से कोई संबंध नहीं। टीम लोगो और खिलाड़ी छवियां © उनके संबंधित स्वामियों की।",
    termsAndConditions: "नियम और शर्तें",

    // ── Home page ────────────────────────────────────
    heroTitle: "क्रिकेट पोस्टर,",
    heroTitle2: "मीम्स और कार्ड",
    heroSubtitle:
      "आईपीएल मैच पोस्टर, खिलाड़ी कार्ड, फैन सपोर्ट पोस्ट और मीम्स बनाएं — अपने बिज़नेस ब्रांडिंग के साथ। मुफ़्त। तुरंत। शेयर करें।",
    howItWorks: "कैसे काम करता है",
    step1Title: "मैच या खिलाड़ी चुनें",
    step1Desc: "पूरे क्रिकेट शेड्यूल या 150+ खिलाड़ियों में से चुनें",
    step2Title: "अपना विवरण जोड़ें",
    step2Desc:
      "कंपनी नाम, फोन, सोशल मीडिया और लोगो — अगली बार के लिए सेव",
    step3Title: "डाउनलोड और शेयर करें",
    step3Desc: "PNG में एक्सपोर्ट करें और WhatsApp या Instagram पर तुरंत शेयर करें",

    // tools
    toolMatchPoster: "मैच पोस्टर",
    toolMatchPosterDesc: "आपके बिज़नेस विवरण के साथ ब्रांडेड क्रिकेट मैच पोस्टर।",
    toolPlayerCards: "खिलाड़ी कार्ड",
    toolPlayerCardsDesc: "150+ क्रिकेटरों के डिजिटल ट्रेडिंग कार्ड डाउनलोड करें।",
    toolMatchCard: "मैच कार्ड",
    toolMatchCardDesc: "अपनी फोटो और टीम के साथ 'मैच देखने जा रहा हूं' कार्ड।",
    toolFanSupport: "फैन सपोर्ट",
    toolFanSupportDesc: "अपनी पसंदीदा टीम या खिलाड़ी के लिए फैन सपोर्ट पोस्टर।",
    toolMemes: "मीम्स और पोस्ट",
    toolMemesDesc: "शेयर करने योग्य क्रिकेट मीम्स और रेडी-मेड सोशल पोस्ट।",
    toolSchedule: "शेड्यूल",
    toolScheduleDesc: "स्थानों और समय के साथ पूरी क्रिकेट फिक्सचर लिस्ट।",
    toolTeams: "टीम",
    toolTeamsDesc: "स्क्वाड और स्टैट्स के साथ सभी क्रिकेट फ्रेंचाइज़ी टीमें।",
    toolCricketQuiz: "क्रिकेट क्विज़",
    toolCricketQuizDesc: "15 सवालों का आईपीएल ट्रिविया। अपना क्रिकेट ज्ञान परखें!",
    toolInstagram: "Instagram पोस्ट",
    toolInstagramDesc: "तैयार IPL इमेज और कैप्शन। डाउनलोड करें और तुरंत पोस्ट करें।",
    badgeMostPopular: "सबसे लोकप्रिय",
    badgeNew: "नया",

    // home hero
    heroH1a: "आपका अल्टीमेट",
    heroH1b: "क्रिकेट",
    heroH1c: "कंटेंट हब",
    heroDesc: "मैच पोस्टर, खिलाड़ी कार्ड, फैन सपोर्ट पोस्ट, मीम्स और मैच-डे कार्ड बनाएं — सभी आपके बिज़नेस विवरण के साथ। सबके लिए मुफ़्त।",
    createPosterFree: "पोस्टर बनाएं — मुफ़्त",
    viewSchedule: "शेड्यूल देखें",
    getStarted: "शुरू करें",
    getStarted3Steps: "3 आसान चरणों में",
    nextMatch: "अगला",
    nextMatchHighlight: "मैच",

    // upcoming matches
    upcomingMatches: "आगामी",
    upcomingMatchesHighlight: "मैच",
    viewFullSchedule: "पूरा शेड्यूल",
    vs: "बनाम",

    // ── Schedule page ───────────────────────────────
    phase1Schedule: "फेज़ 1 शेड्यूल",
    cricket2026MatchSchedule: "क्रिकेट 2026",
    matchSchedule: "मैच शेड्यूल",
    scheduleSubtitle: (matches: number, venues: number) =>
      `${matches} मैच (फेज़ 1) • ${venues} मैदान • पोस्टर बनाने के लिए किसी भी मैच पर क्लिक करें`,
    matchesLabel: "मैच",
    teamsLabel: "टीम",
    venuesLabel: "मैदान",
    phase2ComingSoon: "फेज़ 2 शेड्यूल (मैच 21-84) जल्द आएगा",
    phase2Desc:
      "BCCI जल्द ही बाकी शेड्यूल जारी करेगा। हम स्वचालित रूप से अपडेट करेंगे।",

    // ── Players page ─────────────────────────────────
    downloadableCards: "डाउनलोड करने योग्य कार्ड",
    playerCardsTitle: "खिलाड़ी",
    playerCardsHighlight: "कार्ड",
    playersSubtitle: (players: number, teams: number) =>
      `${players} क्रिकेटर • ${teams} टीम • मुफ़्त डाउनलोड और शेयर`,
    playersLabel: "खिलाड़ी",
    pngFormat: "PNG फॉर्मेट",

    // ── Teams page ────────────────────────────────────
    cricket2026Badge: "क्रिकेट 2026",
    allTeamsTitle: "सभी टीम और",
    allTeamsHighlight: "स्क्वाड",
    teamsSubtitle: (teams: number, players: number) =>
      `${teams} फ्रेंचाइज़ी • ${players} खिलाड़ी • एक चैंपियन`,
    totalTitles: "कुल खिताब",
    roleLegend: "भूमिका:",
    batsman: "बल्लेबाज़",
    bowler: "गेंदबाज़",
    allRounder: "ऑल-राउंडर",
    wicketKeeper: "विकेटकीपर",

    // ── Own Poster page ───────────────────────────────
    fanSupportBadge: "❤️ फैन सपोर्ट पोस्टर",
    fanSupportTitle: "अपना",
    fanSupportHighlight: "फैन सपोर्ट",
    fanSupportTitle2: "पोस्टर बनाएं",
    fanSupportDesc:
      "अपनी पसंदीदा टीम या खिलाड़ी चुनें, अपना चीयर मैसेज लिखें, और एक शेयर करने योग्य सपोर्ट पोस्टर डाउनलोड करें — आपकी बिज़नेस ब्रांडिंग के साथ।",

    // ── Memes page ────────────────────────────────────
    memesBadge: "मीम्स और पोस्ट",
    memesTitle: "क्रिकेट",
    memesHighlight: "मीम्स और पोस्ट",
    memesSubtitle: "मज़ेदार और वायरल क्रिकेट मीम्स। WhatsApp और Instagram पर शेयर करें।",
    memesCount: "100+ मीम्स",
    allCategories: "सभी",
    funny: "मज़ेदार",
    facts: "तथ्य",
    predictions: "भविष्यवाणी",
    motivation: "प्रेरणा",
    allLanguages: "सभी भाषाएं",
    searchMemes: "मीम्स खोजें...",
    noMemesFound: "कोई मीम नहीं मिला",
    tryDifferentFilter: "दूसरी कैटेगरी या खोज शब्द आज़माएं।",
    shuffleMemes: "शफल",
  },

  gu: {
    // ── Nav ────────────────────────────────────────
    home: "હોમ",
    playerCards: "ખેલાડી કાર્ડ",
    schedule: "શેડ્યૂલ",
    matchCard: "મેચ કાર્ડ",
    fanSupport: "ફેન સપોર્ટ",
    more: "વધુ",
    teams: "ટીમ",
    memesAndPosts: "મીમ્સ અને પોસ્ટ",
    createPoster: "પોસ્ટર બનાવો",
    cricketQuiz: "ક્રિકેટ ક્વિઝ",
    helpAndGuide: "મદદ અને માર્ગદર્શન",
    aboutUs: "અમારા વિશે",
    signIn: "સાઇન ઇન",
    signOut: "સાઇન આઉટ",
    signInRegister: "સાઇન ઇન / નોંધણી",
    createNow: "હવે બનાવો",
    signedInAs: "સાઇન ઇન છે",

    // ── Business Details ────────────────────────────
    addBusiness: "બિઝનેસ ઉમેરો",
    myBusiness: "મારો બિઝનેસ",
    businessDetails: "બિઝનેસ વિગતો",
    business: "બિઝનેસ",
    addBusinessDetails: "બિઝનેસ વિગતો ઉમેરો",
    companyBrandName: "કંપની / બ્રાન્ડ નામ",
    phone: "ફોન",
    website: "વેબસાઇટ",
    autoSaved: "ઓટો-સેવ",
    changesAutoSaved: "ફેરફારો આપોઆપ સેવ થાય છે",
    save: "સેવ",
    saved: "સેવ થઈ ગયું!",
    skipForNow: "અત્યારે છોડો",
    personalizeYourPosters: "પોસ્ટર વ્યક્તિગત કરો",
    bizPopupDesc:
      "એક વખત તમારી બિઝનેસ વિગતો ઉમેરો — તે દરેક પોસ્ટર, કાર્ડ અને મીમ પર દેખાશે.",
    bizFeature1: "દરેક પોસ્ટર પર તમારું બ્રાન્ડ નામ",
    bizFeature2: "ગ્રાહકો માટે ફોન અને વેબસાઇટ",
    bizFeature3: "Instagram, Facebook અને X હેન્ડલ",
    addYourBusinessDetails: "તમારી બિઝનેસ વિગતો ઉમેરો",
    personalizePostersTooltip:
      "તમારા બ્રાન્ડ નામ, સંપર્ક અને સોશ્યલ લિંક સાથે પોસ્ટર વ્યક્તિગત કરો.",
    personalizePostersTooltipShort:
      "તમારા બ્રાન્ડ અને સંપર્ક માહિતી સાથે પોસ્ટર વ્યક્તિગત કરો.",

    // ── Footer ──────────────────────────────────────
    footerDisclaimer:
      "© 2026 cricpost.in — ફેન-નિર્મિત ટૂલ. BCCI અથવા IPL સાથે કોઈ સંબંધ નથી. ટીમ લોગો અને ખેલાડી છબીઓ © તેમના સંબંધિત માલિકોની.",
    termsAndConditions: "નિયમો અને શરતો",

    // ── Home page ────────────────────────────────────
    heroTitle: "ક્રિકેટ પોસ્ટર,",
    heroTitle2: "મીમ્સ અને કાર્ડ",
    heroSubtitle:
      "IPL મેચ પોસ્ટર, ખેલાડી કાર્ડ, ફેન સપોર્ટ પોસ્ટ અને મીમ્સ બનાવો — તમારી બિઝનેસ બ્રાન્ડિંગ સાથે. મફત. તાત્કાલિક. શેર કરો.",
    howItWorks: "કેવી રીતે કામ કરે છે",
    step1Title: "મેચ અથવા ખેલાડી પસંદ કરો",
    step1Desc: "સંપૂર્ણ ક્રિકેટ શેડ્યૂલ અથવા 150+ ખેલાડીઓ બ્રાઉઝ કરો",
    step2Title: "તમારી વિગતો ઉમેરો",
    step2Desc:
      "કંપની નામ, ફોન, સોશ્યલ મીડિયા અને લોગો — આગળ માટે સેવ",
    step3Title: "ડાઉનલોડ અને શેર કરો",
    step3Desc: "PNG તરીકે એક્સપોર્ટ કરો અને WhatsApp અથવા Instagram પર તરત શેર કરો",

    // tools
    toolMatchPoster: "મેચ પોસ્ટર",
    toolMatchPosterDesc: "તમારી બિઝનેસ વિગત સાથે બ્રાન્ડેડ ક્રિકેટ મેચ પોસ્ટર.",
    toolPlayerCards: "ખેલાડી કાર્ડ",
    toolPlayerCardsDesc: "150+ ક્રિકેટરો માટે ડિજિટલ ટ્રેડિંગ કાર્ડ ડાઉનલોડ કરો.",
    toolMatchCard: "મેચ કાર્ડ",
    toolMatchCardDesc: "તમારા ફોટો અને ટીમ સાથે 'હું મેચ જોવા જઈ રહ્યો છું' કાર્ડ.",
    toolFanSupport: "ફેન સપોર્ટ",
    toolFanSupportDesc: "તમારી મનપસંદ ટીમ અથવા ખેલાડી માટે ફેન સપોર્ટ પોસ્ટર.",
    toolMemes: "મીમ્સ અને પોસ્ટ",
    toolMemesDesc: "શેર કરી શકાય તેવા ક્રિકેટ મીમ્સ અને તૈયાર સોશ્યલ પોસ્ટ.",
    toolSchedule: "શેડ્યૂલ",
    toolScheduleDesc: "સ્થળો અને સમય સાથે સંપૂર્ણ ક્રિકેટ ફિક્સ્ચર લિસ્ટ.",
    toolTeams: "ટીમ",
    toolTeamsDesc: "સ્ક્વોડ અને આંકડા સાથે તમામ ક્રિકેટ ફ્રેન્ચાઇઝ ટીમો.",
    toolCricketQuiz: "ક્રિકેટ ક્વિઝ",
    toolCricketQuizDesc: "15 સવાલ IPL ટ્રિવિયા. તમારું ક્રિકેટ જ્ઞાન ચકાસો!",
    toolInstagram: "Instagram પોસ્ટ",
    toolInstagramDesc: "તૈયાર IPL ઇમેજ અને કેપ્શન. ડાઉનલોડ કરો અને તરત પોસ્ટ કરો.",
    badgeMostPopular: "સૌથી લોકપ્રિય",
    badgeNew: "નવું",

    // home hero
    heroH1a: "તમારો અલ્ટિમેટ",
    heroH1b: "ક્રિકેટ",
    heroH1c: "કન્ટેન્ટ હબ",
    heroDesc: "મેચ પોસ્ટર, ખેલાડી કાર્ડ, ફેન સપોર્ટ પોસ્ટ, મીમ્સ અને મેચ-ડે કાર્ડ બનાવો — બધા તમારી બિઝનેસ વિગત સાથે. બધા માટે મફત.",
    createPosterFree: "પોસ્ટર બનાવો — મફત",
    viewSchedule: "શેડ્યૂલ જુઓ",
    getStarted: "શરૂ કરો",
    getStarted3Steps: "3 સ્ટેપ્સ",
    nextMatch: "આગળ",
    nextMatchHighlight: "મેચ",

    // upcoming matches
    upcomingMatches: "આગામી",
    upcomingMatchesHighlight: "મેચ",
    viewFullSchedule: "સંપૂર્ણ શેડ્યૂલ",
    vs: "વિ",

    // ── Schedule page ───────────────────────────────
    phase1Schedule: "ફેઝ 1 શેડ્યૂલ",
    cricket2026MatchSchedule: "ક્રિકેટ 2026",
    matchSchedule: "મેચ શેડ્યૂલ",
    scheduleSubtitle: (matches: number, venues: number) =>
      `${matches} મેચ (ફેઝ 1) • ${venues} મેદાન • પોસ્ટર બનાવવા કોઈ પણ મેચ પર ક્લિક કરો`,
    matchesLabel: "મેચ",
    teamsLabel: "ટીમ",
    venuesLabel: "મેદાન",
    phase2ComingSoon: "ફેઝ 2 શેડ્યૂલ (મેચ 21-84) ટૂંક સમયમાં",
    phase2Desc:
      "BCCI ટૂંક સમયમાં બાકીનો શેડ્યૂલ જાહેર કરવાની અપેક્ષા છે. અમે આપોઆપ અપડેટ કરીશું.",

    // ── Players page ─────────────────────────────────
    downloadableCards: "ડાઉનલોડ કરી શકાય તેવા કાર્ડ",
    playerCardsTitle: "ખેલાડી",
    playerCardsHighlight: "કાર્ડ",
    playersSubtitle: (players: number, teams: number) =>
      `${players} ક્રિકેટર • ${teams} ટીમ • મફત ડાઉનલોડ અને શેર`,
    playersLabel: "ખેલાડી",
    pngFormat: "PNG ફોર્મેટ",

    // ── Teams page ────────────────────────────────────
    cricket2026Badge: "ક્રિકેટ 2026",
    allTeamsTitle: "તમામ ટીમ અને",
    allTeamsHighlight: "સ્ક્વોડ",
    teamsSubtitle: (teams: number, players: number) =>
      `${teams} ફ્રેન્ચાઇઝ • ${players} ખેલાડી • એક ચેમ્પિયન`,
    totalTitles: "કુલ ખિતાબ",
    roleLegend: "ભૂમિકા:",
    batsman: "બેટ્સમેન",
    bowler: "બોલર",
    allRounder: "ઓલ-રાઉન્ડર",
    wicketKeeper: "વિકેટ-કીપર",

    // ── Own Poster page ───────────────────────────────
    fanSupportBadge: "❤️ ફેન સપોર્ટ પોસ્ટર",
    fanSupportTitle: "તમારો",
    fanSupportHighlight: "ફેન સપોર્ટ",
    fanSupportTitle2: "પોસ્ટર બનાવો",
    fanSupportDesc:
      "તમારી મનપસંદ ટીમ અથવા ખેલાડી પસંદ કરો, તમારો ચીઅર મેસેજ લખો, અને શેર કરી શકાય તેવો સપોર્ટ પોસ્ટર ડાઉનલોડ કરો — તમારી બિઝનેસ બ્રાન્ડિંગ સાથે.",

    // ── Memes page ────────────────────────────────────
    memesBadge: "મીમ્સ અને પોસ્ટ",
    memesTitle: "ક્રિકેટ",
    memesHighlight: "મીમ્સ અને પોસ્ટ",
    memesSubtitle: "મઝેદાર અને વાઇરલ ક્રિકેટ મીમ્સ. WhatsApp અને Instagram પર શેર કરો.",
    memesCount: "100+ મીમ્સ",
    allCategories: "બધા",
    funny: "મઝેદાર",
    facts: "તથ્ય",
    predictions: "આગાહી",
    motivation: "પ્રેરણા",
    allLanguages: "બધી ભાષાઓ",
    searchMemes: "મીમ્સ શોધો...",
    noMemesFound: "કોઈ મીમ મળ્યું નહીં",
    tryDifferentFilter: "અલગ કેટેગરી અથવા શોધ શબ્દ અજમાવો.",
    shuffleMemes: "શફલ",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;

export function getT(lang: Lang) {
  const dict = translations[lang] ?? translations.en;
  return function t<K extends TranslationKey>(key: K): (typeof translations.en)[K] {
    return (dict as typeof translations.en)[key] ?? translations.en[key];
  };
}
