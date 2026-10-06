// Brand pages (/makita/, /wolfcraft/). Rendered via site/templates/brand.js.

const IMG = "/assets/images";
const MK = "/assets/images/makita";

export const MAKITA = {
  slug: "makita",
  brand: "Makita",
  label: "Makita",
  short: "Vegla elektrike LXT, XGT, CXT",
  title: "Makita Tiranë – Vegla Elektrike LXT, XGT, CXT | Lulja 08",
  description:
    "Vegla Makita në Tiranë: trapano, smerigliatriçe, çekiçë, sharra dhe vegla kopshti — LXT 18V, XGT 40Vmax, CXT 12Vmax dhe me kabllo. Bateri e karikues.",
  keywords:
    "Makita Tirana, Makita Tiranë, Makita Albania, Makita tools Albania, Makita cordless drill Tirana, Makita distributor Albania, vegla Makita, trapano Makita, smerigliatrice Makita, Makita LXT 18V, Makita XGT 40V, Makita CXT 12V, bateri Makita",
  eyebrow: "Gjendet te Lulja 08 — Tiranë",
  h1: "Vegla Makita në Tiranë",
  intro:
    "Vegla elektrike profesionale Makita me bateri dhe me kabllo — trapano, smerigliatriçe, çekiçë, sharra dhe pajisje kopshti nga marka më e besuar për vegla pune.",
  hero: { src: `${IMG}/makita-vegla-profesionale-tirane.jpg`, alt: "Punëtor me smerigliatriçe Makita në kantier – vegla Makita në Tiranë", width: 1536, height: 1024 },
  chips: ["LXT 18V", "XGT 40Vmax", "CXT 12Vmax", "Me kabllo"],
  platforms: [
    { name: "LXT 18V", tag: "Më e gjera", icon: "battery", text: "Platforma më e gjerë e Makita me bateri. Një bateri LXT 18V punon në të gjitha veglat LXT — nga trapanot te kositëset e barit. Modelet më të fuqishme punojnë me dy bateri (18V×2)." },
    { name: "XGT 40Vmax", tag: "Fuqi maksimale", icon: "bolt", text: "Për punë të rënda që kërkojnë fuqinë e veglave me kabllo, por me lirinë e baterisë. Platformë më vete, me bateritë e veta XGT." },
    { name: "CXT 12Vmax", tag: "Kompakte", icon: "sparkles", text: "Vegla të vogla dhe të lehta për montime, instalime elektrike e hidraulike dhe punë të shpejta në hapësira të ngushta." },
    { name: "Me kabllo", tag: "Pa ndalim", icon: "link", text: "Fuqi konstante pa u shqetësuar për karikimin — çekiçë demolues, trapano dhe vidhosëse për përdorim intensiv dhe të vazhdueshëm." },
  ],
  filters: [
    { id: "trapano", label: "Trapano & Vidhosëse" },
    { id: "smerigliatrice", label: "Smerigliatriçe" },
    { id: "cekice", label: "Çekiçë" },
    { id: "sharra", label: "Sharra" },
    { id: "kopsht", label: "Kopsht" },
    { id: "te-tjera", label: "Matje & Pastrim" },
  ],
  productsTitle: "Katalogu i veglave Makita",
  productsIntro:
    "Modelet që ofrojmë në Tiranë. Filtroni sipas llojit dhe na shkruani për çmimin dhe disponueshmërinë — përgjigjemi shpejt në WhatsApp.",
  products: [
    { model: "HP002G", name: "Trapano combi XGT", type: "trapano", platform: "XGT 40Vmax", img: `${MK}/makita-combi-drill-xgt-hp002g.png`, text: "Trapano me goditje dhe vidhosëse për punë të rënda në beton, tulla, dru dhe metal." },
    { model: "DDF490", name: "Trapano vidhosëse brushless", type: "trapano", platform: "LXT 18V", img: `${MK}/makita-drill-driver-brushless-18v-lxt-ddf490.png`, text: "Motor pa karbona (brushless) për efikasitet dhe jetëgjatësi — për vidhosje dhe shpime të përditshme." },
    { model: "DGA463", name: "Smerigliatriçe këndore", type: "smerigliatrice", platform: "LXT 18V", img: `${MK}/makita-angle-grinder-lxt-dga463.jpg`, text: "Smerigliatriçe me bateri për prerje dhe lëmim metali, pllakash dhe guri — pa kabllo në kantier." },
    { model: "DHR165", name: "Çekiç rrotullues SDS-plus", type: "cekice", platform: "LXT 18V", img: `${MK}/makita-rotary-hammer-lxt-dhr165.jpg`, text: "Çekiç rrotullues me bateri për shpime të shpeshta në beton dhe tulla." },
    { model: "HM0870C", name: "Çekiç demolues SDS-max", type: "cekice", platform: "Me kabllo", img: `${MK}/makita-demolition-hammer-hm0870c.png`, text: "Për thyerje betoni, heqje pllakash dhe punime demolimi." },
    { model: "JV101D", name: "Sharrë dekupazhi", type: "sharra", platform: "CXT 12Vmax", img: `${MK}/makita-jigsaw-cxt-jv101d.png`, text: "Sharrë kompakte për prerje të drejta dhe të lakuara në dru, panele dhe metal të hollë." },
    { model: "DUC405", name: "Sharrë me zinxhir", type: "sharra", platform: "LXT 18V", img: `${MK}/makita-chainsaw-lxt-duc405.png`, text: "Sharrë me zinxhir me bateri për prerje druri dhe krasitje — pa tym dhe pa motor me benzinë." },
    { model: "SK106GD", name: "Lazer nivelimi, rreze e gjelbër", type: "te-tjera", platform: "CXT 12Vmax", img: `${MK}/makita-cross-line-laser-cxt-sk106gd.png`, text: "Lazer me vija të kryqëzuara dhe rreze të gjelbër shumë të dukshme — për pllaka, profile dhe mobilie." },
    { model: "HP488D", name: "Trapano combi", type: "trapano", platform: "18V G-Series", img: `${MK}/makita-combi-drill-g-series-hp488d.png`, text: "Trapano me goditje 18V nga seria G — zgjidhje praktike për punë në shtëpi dhe mirëmbajtje." },
    { model: "DDF482", name: "Trapano vidhosëse", type: "trapano", platform: "LXT 18V", img: `${MK}/makita-drill-driver-lxt-ddf482.png`, text: "E lehtë dhe e balancuar — për montime, mobilieri dhe shpime në dru dhe metal." },
    { model: "DDF484", name: "Trapano vidhosëse brushless", type: "trapano", platform: "LXT 18V", img: `${MK}/makita-drill-driver-lxt-ddf484.png`, text: "Motor pa karbona në trup kompakt — më shumë kohë pune me një karikim." },
    { model: "CXT", name: "Trapano vidhosëse kompakte", type: "trapano", platform: "CXT 12Vmax", img: `${MK}/makita-drill-driver-cxt.png`, text: "Shumë e lehtë — ideale për montime, elektricistë dhe punë në hapësira të ngushta." },
    { model: "DF0300", name: "Trapano vidhosëse me kabllo", type: "trapano", platform: "Me kabllo", img: `${MK}/makita-drill-driver-df0300.png`, text: "Për punë të vazhdueshme pa u shqetësuar për baterinë." },
    { model: "DDA351", name: "Trapano këndore", type: "trapano", platform: "LXT 18V", img: `${MK}/makita-angle-drill-lxt-dda351.png`, text: "Kokë këndore për shpime dhe vidhosje mes trarëve, brenda mobiljeve dhe në qoshe të ngushta." },
    { model: "TD003G", name: "Vidhosëse me goditje", type: "trapano", platform: "XGT 40Vmax", img: `${MK}/makita-impact-driver-xgt-40vmax-td003g.png`, text: "Impact driver për vida të gjata, bulona dhe punime konstruksioni." },
    { model: "HP1631", name: "Trapano me goditje", type: "trapano", platform: "Me kabllo", img: `${MK}/makita-percussion-drill-hp1631.png`, text: "Klasike dhe e besueshme për shpime në beton, tulla, dru dhe metal." },
    { model: "DP4700", name: "Trapano", type: "trapano", platform: "Me kabllo", img: `${MK}/makita-rotary-drill-dp4700.png`, text: "Trapano rrotulluese pa goditje për shpime precize në dru dhe metal." },
    { model: "DGA901", name: "Smerigliatriçe e madhe 18V×2", type: "smerigliatrice", platform: "LXT 18V×2", img: `${MK}/makita-angle-grinder-lxt-dga901.jpg`, text: "Me dy bateri 18V (36V) për prerje të rënda në beton, gur dhe metal." },
    { model: "HR140D", name: "Çekiç rrotullues SDS-plus", type: "cekice", platform: "CXT 12Vmax", img: `${MK}/makita-rotary-hammer-cxt-hr140d.png`, text: "Kompakt dhe i lehtë për shpime në beton — ideal për instalues dhe elektricistë." },
    { model: "HM0871C", name: "Çekiç demolues SDS-max", type: "cekice", platform: "Me kabllo", img: `${MK}/makita-demolition-hammer-hm0871c.png`, text: "Performancë e lartë për punime të rënda thyerjeje dhe demolimi." },
    { model: "DLM432", name: "Kositëse bari", type: "kopsht", platform: "LXT 18V", img: `${MK}/makita-lawn-mower-lxt-dlm432.png`, text: "Kositëse me bateri — e qetë, pa tym dhe pa mirëmbajtjen e motorit me benzinë." },
    { model: "UP100D", name: "Gërshërë krasitjeje", type: "kopsht", platform: "CXT 12Vmax", img: `${MK}/makita-pruning-shear-cxt-up100d.png`, text: "Për degë dhe shkurre — më pak lodhje në duar gjatë punëve të gjata në kopsht." },
    { model: "CL106FD", name: "Aspirator dore", type: "te-tjera", platform: "CXT 12Vmax", img: `${MK}/makita-vacuum-cleaner-cxt-cl106fd.png`, text: "Pastrim i shpejtë i makinës, punishtes dhe ambienteve pas punimeve." },
  ],
  extras: {
    title: "Bateri, karikues dhe aksesorë",
    text: "Bateri dhe karikues të sistemit LXT 18V, disqe prerëse, punta dhe bit-e — gjithçka që i duhet veglës suaj Makita për të punuar pa ndalim.",
    items: ["Bateri LXT 18V", "Karikues", "Disqe prerëse", "Punta & bit-e"],
  },
  guide: {
    title: "Si të zgjidhni veglën Makita",
    intro: "Katër pyetje që ju çojnë te vegla e duhur — pa paguar për fuqi që nuk ju duhet.",
    steps: [
      { title: "Filloni nga bateria që keni", text: "Nëse keni bateri LXT 18V, çdo veglë LXT punon me to — mund të blini vetëm veglën dhe të kurseni." },
      { title: "Përshtatni fuqinë me punën", text: "CXT 12Vmax për punë të lehta e montime; LXT 18V për shumicën e punëve profesionale; XGT 40Vmax ose me kabllo për punë të rënda e të vazhdueshme." },
      { title: "SDS-plus apo SDS-max?", text: "Çekiçët SDS-plus (DHR165, HR140D) janë për shpime në beton; SDS-max (HM0870C, HM0871C) janë për demolim dhe thyerje të rënda." },
      { title: "Brushless për përdorim të përditshëm", text: "Motorët pa karbona japin më shumë punë për çdo karikim, nxehen më pak dhe zgjasin më shumë — ia vlen për profesionistët." },
    ],
  },
  faqs: [
    { q: "Cili është ndryshimi mes LXT, XGT dhe CXT?", a: "LXT 18V është platforma më e gjerë me bateri; XGT 40Vmax është për punë të rënda me fuqi të lartë; CXT 12Vmax është për vegla kompakte dhe të lehta. Secila platformë përdor bateritë e veta." },
    { q: "A punon bateria LXT në të gjitha veglat Makita?", a: "Bateritë LXT 18V punojnë në të gjitha veglat e platformës LXT. Platformat XGT dhe CXT, si dhe seria G 18V, kanë bateritë e tyre dhe nuk ndërkëmbehen me LXT." },
    { q: "Cili trapano Makita është më i miri për beton?", a: "Për shpime të shpeshta në beton zgjidhni një çekiç rrotullues SDS-plus si DHR165 ose HR140D. Për shpime të rastësishme në tulla dhe beton mjafton një trapano me goditje si HP002G, HP488D ose HP1631." },
    { q: "A mund ta blej veglën pa bateri?", a: "Varet nga modeli dhe disponueshmëria. Na shkruani modelin në WhatsApp dhe ju tregojmë opsionet që kemi." },
    { q: "A keni bateri, karikues dhe aksesorë Makita?", a: "Po — bateri dhe karikues të sistemit LXT 18V, disqe prerëse, punta dhe bit-e." },
    { q: "Si mund të porosis një veglë Makita?", a: "Telefononi në +355 67 315 6271 ose na shkruani në WhatsApp me modelin që ju intereson. Mund të vini edhe direkt në dyqan në Tiranë; bëjmë edhe dërgesë." },
  ],
  related: ["vegla-pune", "wolfcraft", "materiale-ndertimi"],
  waText: "Përshëndetje, jam i interesuar për vegla Makita. Mund të më jepni informacion?",
};

export const WOLFCRAFT = {
  slug: "wolfcraft",
  brand: "Wolfcraft",
  label: "Wolfcraft",
  short: "Kapëse, zmerilim, silikon, punta",
  title: "Wolfcraft Tiranë – Vegla & Aksesorë Wolfcraft | Lulja 08",
  description:
    "Wolfcraft në Tiranë: kapëse, pistoletë mbërthimi, vegla zmerilimi, set fugash dhe prerës silikoni, punta HSS dhe punta menteshash 35 mm. Te Lulja 08.",
  keywords:
    "Wolfcraft Tirana, Wolfcraft Tiranë, Wolfcraft Albania, vegla Wolfcraft, kapëse Wolfcraft, pistoletë mbërthimi, set fugash silikoni, prerës silikoni, punta menteshash 35mm, punta shkallëzuar HSS, bllok zmerile",
  eyebrow: "Cilësi gjermane",
  h1: "Vegla dhe aksesorë Wolfcraft në Tiranë",
  intro:
    "Wolfcraft është markë gjermane e specializuar në vegla dhe aksesorë të zgjuar — për fiksim, zmerilim, silikon, shpim dhe mobileri. Zgjidhje praktike për mjeshtër dhe për punët në shtëpi.",
  heroImages: [
    { src: `${IMG}/wolfcraft-pistole-mberthimi.jpeg`, alt: "Pistoletë mbërthimi Wolfcraft", width: 1512, height: 2016 },
    { src: `${IMG}/wolfcraft-multivegel-pince.jpeg`, alt: "Multivegël pincë Wolfcraft me këllëf", width: 1512, height: 2016 },
    { src: `${IMG}/wolfcraft-kapese-microtip-2.jpeg`, alt: "Kapëse me sustë Wolfcraft Microtip", width: 1512, height: 2016 },
  ],
  chips: ["Kapëse & fiksim", "Zmerilim", "Silikon & fuga", "Shpim & mobileri"],
  filters: [
    { id: "fiksim", label: "Kapëse & Fiksim" },
    { id: "zmerilim", label: "Zmerilim & Lyerje" },
    { id: "silikon", label: "Silikon & Fuga" },
    { id: "shpim", label: "Shpim & Mobileri" },
    { id: "dore", label: "Vegla Dore" },
  ],
  productsTitle: "Produktet Wolfcraft",
  productsIntro: "Produktet Wolfcraft që gjeni në dyqan. Na shkruani për çmimin dhe disponueshmërinë.",
  products: [
    { name: "Pistoletë mbërthimi", type: "fiksim", img: `${IMG}/wolfcraft-pistole-mberthimi.jpeg`, text: "Me kapëse metalike për fiksimin e pëlhurës, kartonit, najlonit dhe materialeve izoluese." },
    { name: "Kapëse këndi ES22", type: "fiksim", img: `${IMG}/wolfcraft-kapese-kendi-es22.jpeg`, text: "Për bashkime në kënd të drejtë (90°) — korniza, kuti dhe mobilie." },
    { name: "Kapëse me sustë Microtip", type: "fiksim", img: `${IMG}/wolfcraft-kapese-microtip-2.jpeg`, text: "Të lehta dhe të shpejta — për ngjitje, fiksime të përkohshme dhe punime të imëta." },
    { name: "Bllok zmerile dore", type: "zmerilim", img: `${IMG}/wolfcraft-bllok-zmerile-dore.jpeg`, text: "Bllok dore 93×230 mm për lëmim të njëtrajtshëm të sipërfaqeve të sheshta." },
    { name: "Zmerilues për radiatorë", type: "zmerilim", img: `${IMG}/wolfcraft-leter-zmerile-radiatore-2.jpeg`, text: "Për zmerilim në vende të ngushta si radiatorë, grila dhe profile." },
    { name: "Mistri për kënde", type: "zmerilim", img: `${IMG}/wolfcraft-mistri-lyerje-kendet.jpeg`, text: "Majë trekëndëshe për të arritur këndet dhe skajet ku nuk arrin rula." },
    { name: "Set fugash silikoni", type: "silikon", img: `${IMG}/wolfcraft-set-fugash-silikoni.jpeg`, text: "Spatula për lëmimin dhe formësimin e fugave të silikonit — fuga të pastra në banjo dhe kuzhina." },
    { name: "Prerës silikoni", type: "silikon", img: `${IMG}/wolfcraft-preres-silikoni.jpeg`, text: "Për heqjen e silikonit të vjetër dhe pastrimin e fugave para riaplikimit." },
    { name: "Punta shkallëzuar HSS", type: "shpim", img: `${IMG}/wolfcraft-punta-shkallezuar-hss.jpeg`, text: "Vrima me diametra të ndryshëm në llamarinë, alumin dhe plastikë — me një punta të vetme." },
    { name: "Punta menteshash 35 mm", type: "shpim", img: `${IMG}/wolfcraft-punta-mentesha-35mm.jpeg`, text: "Për folenë 35 mm të menteshave të fshehura në dollapë dhe mobilie." },
    { name: "Set frezash gdhëndjeje", type: "shpim", img: `${IMG}/wolfcraft-freza-gdhendje-set.jpeg`, text: "Për formësim dhe punime precize në dru." },
    { name: "Multivegël pincë", type: "dore", img: `${IMG}/wolfcraft-multivegel-pince.jpeg`, text: "Multivegël kompakte me pincë dhe vegla të integruara, me këllëf për brez." },
    { name: "Kaçavidë fleksibël", type: "dore", img: `${IMG}/wolfcraft-kaciavide-fleksibel.jpeg`, text: "Zgjatues fleksibël për vidhosje në vende të vështira për t'u arritur." },
  ],
  uses: [
    { icon: "grid", title: "Kapëse & fiksim", text: "Mbajnë pjesët në vend gjatë ngjitjes, vidhosjes dhe montimit — punë më e saktë me më pak duar." },
    { icon: "sparkles", title: "Zmerilim & lyerje", text: "Lëmim i njëtrajtshëm dhe lyerje e pastër deri në kënde, radiatorë dhe profile." },
    { icon: "droplet", title: "Silikon & fuga", text: "Heqje e silikonit të vjetër dhe fuga të reja të drejta e të lëmuara në banjo dhe kuzhina." },
    { icon: "tools", title: "Shpim & mobileri", text: "Punta të specializuara për mentesha, llamarinë dhe punime precize në dru." },
  ],
  guide: {
    title: "Fuga silikoni si nga profesionisti",
    intro: "Me veglat e duhura Wolfcraft, rifreskimi i fugave në banjo dhe kuzhinë bëhet shpejt dhe pastër.",
    steps: [
      { title: "Hiqni silikonin e vjetër", text: "Me prerësin e silikonit hiqni fugën e vjetër deri në fund, pa gërvishtur pllakat." },
      { title: "Pastroni dhe thani", text: "Pastroni mbetjet dhe yndyrën dhe lëreni fugën të thahet plotësisht — silikoni nuk ngjitet në sipërfaqe të lagur." },
      { title: "Aplikoni silikonin", text: "Mbushni fugën me një rrjedhë të vazhdueshme silikoni, pa ndalesa." },
      { title: "Formësoni fugën", text: "Me spatulën e duhur nga seti i fugave lëmoni fugën në një lëvizje — rezultati: vijë e drejtë dhe e pastër." },
    ],
  },
  faqs: [
    { q: "Çfarë produktesh Wolfcraft keni?", a: "Kapëse këndi dhe me sustë, pistoletë mbërthimi, vegla zmerilimi, set fugash dhe prerës silikoni, punta të shkallëzuara HSS, punta menteshash 35 mm, freza, multivegla dhe kaçavidë fleksibël." },
    { q: "Për çfarë shërben punta 35 mm?", a: "35 mm është përmasa standarde e folesë për menteshat e fshehura të dollapëve të kuzhinës dhe mobiljeve — me këtë punta hapni folenë me saktësi." },
    { q: "Si i bëj fugat e silikonit të pastra?", a: "Hiqni silikonin e vjetër me prerësin, pastroni dhe thani fugën, aplikoni silikonin dhe formësojeni me spatulat e setit të fugave." },
    { q: "A mund të porosis produkte Wolfcraft që nuk janë në listë?", a: "Na shkruani në WhatsApp ose na telefononi me produktin që kërkoni dhe ju konfirmojmë disponueshmërinë." },
  ],
  related: ["vegla-pune", "bojera", "makita"],
  waText: "Përshëndetje, jam i interesuar për produkte Wolfcraft. Mund të më jepni informacion?",
};
