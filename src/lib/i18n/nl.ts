import { BUSINESS } from "@/lib/config/business";

export const nl = {
  meta: {
    siteName: "Rijschool Drive More",
    siteDescription:
      "Rijschool Drive More — persoonlijke rijlessen op maat. Rijlespakketten, spoedcursus, faalangstbegeleiding en theorie in Rotterdam e.o. Plan je intake.",
  },
  nav: {
    services: "Diensten",
    packages: "Pakketten",
    intensive: "Spoedcursus",
    about: "Over ons",
    contact: "Contact",
    cta: "Plan intake",
    langSwitch: "EN",
  },
  hero: {
    eyebrow: "Rijschool · 1-op-1 maatwerk",
    // Optie B (niet actief) — alternatieve invalshoek gericht op leerlingen die al eens gezakt zijn of examenangst hebben:
    // heading1: "Al een keer gezakt?", headingAccent: "Of bang dat het weer gebeurt?", heading2: ""
    // lead: "Bij Drive More rij je met een instructeur die jouw tempo kent — zonder haast, zonder oordeel, tot je met vertrouwen slaagt."
    heading1: "Rijles die past bij",
    headingAccent: "jou,",
    heading2: "niet andersom.",
    lead: "Persoonlijke rijlessen in Dordrecht en omgeving. Schakel of automaat, altijd met persoonlijke begeleiding en een aanpak die bij jou past.",
    points: [
      { icon: "bolt" as const, label: "Geen wachtlijst — direct starten" },
      { icon: "car" as const, label: "Schakel & automaat" },
      { icon: "person" as const, label: "Persoonlijke begeleiding" },
    ],
    ctaPrimary: "Plan een intake →",
    ctaSecondary: "Bekijk pakketten",
    replay: "Opnieuw",
  },
  // Compact "Extra begeleiding"-kaarten — volledige uitleg staat op de eigen pagina's.
  services: {
    eyebrow: "Extra begeleiding",
    heading1: "Meer dan alleen",
    headingAccent: "rijlessen",
    items: [
      {
        id: "spoedcursus",
        name: "Spoedopleiding",
        description: "Snel richting je rijbewijs met een intensief traject.",
        link: "/spoedcursus",
        linkLabel: "Bekijk spoedopleiding",
        color: "red" as const,
      },
      {
        id: "faalangst",
        name: "Faalangstbegeleiding",
        description: "Rust en vertrouwen achter het stuur en tijdens je examen.",
        link: "/diensten",
        linkLabel: "Lees hoe wij helpen",
        color: "blue" as const,
      },
      {
        id: "theorie",
        name: "Theorie",
        description: "Begrijpen in plaats van alleen stampen.",
        link: "/diensten",
        linkLabel: "Bekijk theorietraining",
        color: "red" as const,
      },
    ],
  },
  howItWorks: {
    eyebrow: "Zo werkt het",
    heading1: "Van eerste intake tot",
    headingAccent: "rijbewijs",
    lead: "Een helder traject in vier stappen — en op elk moment afgestemd op jou.",
    steps: [
      {
        n: "01",
        title: "Intake (1 uur)",
        body: "We bekijken je niveau en bepalen welke aanpak bij jou past.",
      },
      {
        n: "02",
        title: "Persoonlijk lesplan",
        body: "Je krijgt een traject gebaseerd op jouw niveau, tempo en doel.",
      },
      {
        n: "03",
        title: "Rijlessen",
        body: "Je werkt stap voor stap aan zelfstandig en veilig autorijden.",
      },
      {
        n: "04",
        title: "Praktijkexamen",
        body: "Ben je er klaar voor? Dan begeleiden we je richting het praktijkexamen.",
      },
    ],
  },
  intensive: {
    eyebrow: "Spoedcursus",
    heading: "Haast met je rijbewijs?",
    body: "Met onze spoedcursus rijd je in een compact, intensief traject naar je examen — soms in een paar weken. Ideaal als je snel mobiel moet zijn voor werk, studie of stage. We plannen je lessen kort achter elkaar en regelen je examen, zonder in te leveren op kwaliteit.",
    ctaPrimary: "Vraag de mogelijkheden →",
    ctaSecondary: "Bekijk spoedpakketten",
  },
  // Echte pakketten en prijzen — op één plek aan te passen.
  packages: {
    eyebrow: "Rijlespakketten",
    heading1: "Kies je route naar je",
    headingAccent: "rijbewijs",
    lead: "Vijf heldere pakketten — kies wat past bij jouw tempo en doel.",
    from: "vanaf",
    cta: "Plan een intake →",
    perLesson: "Liever per les betalen? Dat kan ook — €53 per rijles van 45 minuten.",
    spoedToeslagLabel: "spoedtoeslag",
    note: {
      heading: "Twijfel je welk pakket bij jou past?",
      body: "Plan een intake. We bekijken je niveau en adviseren je eerlijk welk traject bij jou past.",
      cta: "Plan mijn intake →",
    },
    noWaitlistBadge: "Geen wachtlijst · direct starten",
    badge: "Meest gekozen",
    items: [
      {
        name: "Drive Start",
        lessons: "15 rijlessen",
        price: 795,
        features: ["15 rijlessen (45 min)", "Persoonlijk lesplan", "Vaste begeleiding"],
        featured: false,
      },
      {
        name: "Drive Plus",
        lessons: "25 rijlessen",
        price: 1325,
        features: ["25 rijlessen (45 min)", "Persoonlijk lesplan", "Vaste begeleiding", "Examenbegeleiding"],
        featured: true,
      },
      {
        name: "Drive Pro",
        lessons: "35 rijlessen",
        price: 1855,
        features: ["35 rijlessen (45 min)", "Persoonlijk lesplan", "Vaste begeleiding", "Ruime voorbereiding op het examen"],
        featured: false,
      },
      {
        name: "Drive Max",
        lessons: "40 rijlessen",
        price: 2120,
        features: ["40 rijlessen (45 min)", "Persoonlijk lesplan", "Vaste begeleiding", "Ruime voorbereiding op het examen"],
        featured: false,
      },
      {
        name: "Drive Ultimate",
        lessons: "50 rijlessen",
        price: 2650,
        features: ["50 rijlessen (45 min)", "Persoonlijk lesplan", "Vaste begeleiding", "Maximale voorbereiding en rust"],
        featured: false,
      },
    ],
  },
  // Compacte USP/vertrouwen-balk — items aan/uit te zetten via src/lib/config/trustBar.ts
  trustBar: {
    experience: "13+ jaar ervaring",
    noWaitlist: "Geen wachtlijst",
    personalGuidance: "Vaste persoonlijke begeleiding",
    manualAutomatic: "Schakel & automaat",
    // Google-beoordeling — pas SHOW_GOOGLE_REVIEW aan in src/lib/config/googleReview.ts zodra
    // dit onderbouwd is met een echt cijfer en aantal reviews.
    googleReviewSuffix: "op Google",
  },
  trainingChoice: {
    eyebrow: "Rijopleiding",
    heading: "Kies de rijopleiding die bij jou past.",
    items: [
      {
        id: "schakel",
        icon: "gear" as const,
        title: "Schakel",
        description: "Leer volledig zelfstandig rijden en schakelen.",
        linkLabel: "Meer over schakel",
        // VUL IN: link naar eigen landingspagina voor schakel zodra die bestaat.
        href: "#",
        color: "blue" as const,
      },
      {
        id: "automaat",
        icon: "car" as const,
        title: "Automaat",
        description: "Comfortabel en ontspannen leren rijden zonder schakelen.",
        linkLabel: "Meer over automaat",
        // VUL IN: link naar eigen landingspagina voor automaat zodra die bestaat.
        href: "#",
        color: "red" as const,
      },
      {
        id: "spoed",
        icon: "bolt" as const,
        title: "Spoedopleiding",
        description: "Snel je rijbewijs nodig? Volg een intensief traject richting je examen.",
        linkLabel: "Bekijk spoedopleiding",
        href: "/spoedcursus",
        color: "blue" as const,
      },
    ],
  },
  // Compacte pakketten-teaser op de homepage. Prijzen/inhoud zijn nog placeholders (// VUL IN),
  // op één plek hier aan te passen. De volledige, uitgebreide pakketten (met regulier/spoed-
  // toggle en bevestigde prijzen) staan los op /rijlespakketten — die blijven ongewijzigd.
  serviceArea: {
    eyebrow: "Werkgebied",
    heading1: "Rijles bij jou",
    headingAccent: "in de buurt",
    lead: "Drive More geeft rijles in onder andere:",
    // Losse landingspagina's per plaats (/rijschool-<slug>) volgen later — links wijzen er
    // nu al naartoe zodat er niets meer aangepast hoeft te worden zodra die pagina's er zijn.
    cities: [
      { name: "Dordrecht", slug: "dordrecht" },
      { name: "Zwijndrecht", slug: "zwijndrecht" },
      { name: "Papendrecht", slug: "papendrecht" },
      { name: "Sliedrecht", slug: "sliedrecht" },
      { name: "Hendrik-Ido-Ambacht", slug: "hendrik-ido-ambacht" },
      { name: "Alblasserdam", slug: "alblasserdam" },
      { name: "Barendrecht", slug: "barendrecht" },
      { name: "Ridderkerk", slug: "ridderkerk" },
    ],
  },
  why: {
    eyebrow: "Waarom Drive More",
    heading1: "Geen lopende band.",
    headingAccent: "Jouw",
    heading2: "tempo.",
    items: [
      {
        icon: "person" as const,
        title: "Vaste begeleiding",
        body: "Geen steeds wisselende aanpak.",
        color: "red" as const,
      },
      {
        icon: "clipboard" as const,
        title: "Persoonlijk lesplan",
        body: "Je rijdt op jouw niveau en tempo.",
        color: "blue" as const,
      },
      {
        icon: "calendar" as const,
        title: "Flexibel plannen",
        body: "We kijken samen naar een passend lesschema.",
        color: "red" as const,
      },
      {
        icon: "shield" as const,
        title: "Eerlijke begeleiding",
        body: "Geen onnodige lessen; we kijken naar wat jij daadwerkelijk nodig hebt.",
        color: "blue" as const,
      },
    ],
  },
  lessonCars: {
    eyebrow: "Onze lesauto's",
    heading: "Kies wat bij jou past.",
    items: [
      {
        id: "automaat",
        badge: "Automaat",
        carName: "Cupra Formentor",
        description: "Comfortabel, modern en ontspannen leren rijden.",
        cta: "Rijles in automaat →",
        href: "/contact",
        photoSrc: "/cupra-automaat.jpg",
        photoAlt: "Groene Cupra Formentor lesauto van Rijschool Drive More",
        color: "red" as const,
      },
      {
        id: "schakel",
        badge: "Schakel",
        carName: "Volkswagen Golf 8",
        description: "Leer volledig zelfstandig schakelen en autorijden.",
        cta: "Rijles in schakel →",
        href: "/contact",
        photoSrc: "/golf8-schakel.jpg",
        photoAlt: "Zwarte Volkswagen Golf 8 lesauto van Rijschool Drive More",
        color: "blue" as const,
      },
    ],
  },
  // Reviewdata (namen/tekst/rating) staat in src/lib/config/reviews.ts (REVIEWS) — klaar
  // om later te vervangen door een Google Reviews-koppeling. Hier alleen de sectietekst.
  reviews: {
    eyebrow: "Ervaringen",
    heading1: "Wat leerlingen over",
    headingAccent: "Drive More",
    heading2: "zeggen.",
    cta: "Bekijk alle reviews →",
  },
  about: {
    eyebrow: "Over ons",
    heading1: "De mens achter",
    headingAccent: "Drive More",
    body1:
      "Drive More is opgericht vanuit een simpel idee: iedereen verdient les die past bij wie hij of zij is. Geen standaard programma waar jij je naar moet plooien, maar een aanpak die meebeweegt met jouw tempo, jouw doelen en jouw manier van leren.",
    body2:
      "Na jaren ervaring in de praktijk weten we precies waar leerlingen op vastlopen — en hoe je daar met rust, geduld en een duidelijk plan doorheen komt. Of je nu net begint, faalangst hebt of snel je rijbewijs nodig hebt: we rijden samen naar dat ene doel, die roze pas.",
    founder: "Mouad",
    founderRole: "Oprichter — Rijschool Drive More",
    photoAlt: "Foto Mouad, oprichter Drive More",
    cta: "Meer over ons",
    photoLabel: "Foto volgt",
  },
  contact: {
    eyebrow: "Contact",
    heading1: "Klaar om te",
    headingAccent: "starten",
    heading2: "?",
    lead: "Plan je intake of stel je vraag. We reageren snel via WhatsApp, telefoon of e-mail.",
    lowThreshold: "Nog twijfels? Stuur ons gewoon een appje — geen verplichtingen.",
    form: {
      naam: "Naam",
      tel: "Telefoon",
      email: "E-mail",
      interesse: "Waarvoor neem je contact op?",
      interesseOptions: [
        "Intake",
        "Rijlespakket",
        "Spoedcursus",
        "Faalangstbegeleiding",
        "Theorie",
        "Iets anders",
      ],
      bericht: "Bericht",
      berichtPlaceholder: "Vertel kort waar we je mee kunnen helpen…",
      newsletter: "Hou me op de hoogte van tips en aanbiedingen (nieuwsbrief).",
      submit: "Verstuur aanvraag",
      note: "Door te versturen ga je akkoord dat we contact met je opnemen.",
      success: "Bedankt! Je aanvraag is verstuurd — we nemen snel contact met je op.",
      error: "Er ging iets mis. Probeer het opnieuw of stuur een e-mail.",
    },
    direct: {
      heading: "Direct contact",
      whatsapp: { label: "WhatsApp", sub: "06 11206001 — vaak het snelst" },
      phone: { label: "Bellen", sub: "06 11206001" },
      email: { label: "E-mail", sub: "contact@rijschooldrivemore.nl" },
    },
  },
  // Compacte eind-CTA vlak boven de footer (homepage) — los van `contact`, dat blijft
  // de hero-tekst van de losse /contact-pagina.
  endCta: {
    eyebrow: "Aan de slag",
    heading1: "Klaar om achter het stuur te",
    headingAccent: "stappen",
    heading2: "?",
    lead: "Plan je intake en ontdek welk rijtraject bij jou past.",
    cta: "Plan mijn intake →",
    whatsappPrefix: "Liever eerst iets vragen?",
    whatsappLink: "WhatsApp ons.",
  },
  footer: {
    tagline: "Rijschool Drive More — persoonlijke rijlessen op maat. Jouw weg naar je rijbewijs, op jouw tempo.",
    colServices: {
      heading: "Diensten",
      links: [
        { label: "Rijlessen", href: "/rijlespakketten" },
        { label: "Spoedcursus", href: "/spoedcursus" },
        { label: "Faalangstbegeleiding", href: "/diensten" },
        { label: "Theorie", href: "/diensten" },
      ],
    },
    colSchool: {
      heading: "Rijschool",
      links: [
        { label: "Rijlespakketten", href: "/rijlespakketten" },
        { label: "Over ons", href: "/over-ons" },
        { label: "Werken bij ons", href: "/contact" },
        { label: "Contact", href: "/contact" },
      ],
    },
    newsletter: {
      heading: "Nieuwsbrief",
      sub: "Tips, acties en nieuws — af en toe, nooit spam.",
      placeholder: "Je e-mailadres",
      cta: "Aanmelden",
      success: "Bedankt — je bent aangemeld!",
      error: "Er ging iets mis. Probeer het later opnieuw.",
      privacy: "Geen spam. Afmelden kan altijd.",
    },
    kvk: `KvK ${BUSINESS.kvk}`,
    copyright: "Rijschool Drive More",
  },
  mobileCta: {
    plan: "Plan intake",
    whatsapp: "WhatsApp",
  },
  faq: {
    eyebrow: "Veelgestelde vragen",
    heading1: "Goed om te",
    headingAccent: "weten",
    items: [
      {
        q: "Hoeveel rijlessen heb ik nodig?",
        a: "Dat verschilt per persoon — tijdens je intake geven we een eerlijke inschatting. Voor veel leerlingen past een pakket van 20 tot 30 lessen goed.",
      },
      {
        q: "Kan ik direct beginnen met rijlessen?",
        a: "In veel gevallen wel. Plan een intake en we bekijken samen wanneer je kunt starten.",
      },
      {
        q: "Geven jullie automaat- en schakelrijlessen?",
        a: "Ja, beide. Tijdens je intake adviseren we wat het beste bij jou past.",
      },
      {
        q: "Kan ik mijn rijopleiding in termijnen betalen?",
        a: "Neem contact met ons op om de mogelijkheden te bespreken — we denken graag met je mee.",
      },
      {
        q: "Hoe lang duurt een rijles?",
        a: "Een rijles duurt bij ons 45 of 90 minuten, afhankelijk van je pakket of voorkeur.",
      },
      {
        q: "In welke plaatsen geeft Drive More rijles?",
        a: "We geven rijles in onder andere Dordrecht, Zwijndrecht, Papendrecht, Sliedrecht, Hendrik-Ido-Ambacht, Alblasserdam, Barendrecht en Ridderkerk.",
      },
      {
        q: "Bieden jullie spoedopleidingen aan?",
        a: "Zeker. In een compact, intensief traject naar je examen — soms in een paar weken.",
      },
      {
        q: "Wat gebeurt er tijdens de intake?",
        a: "Tijdens je intake rijd je een stukje, zodat we je niveau kunnen inschatten. Daarna geven we je eerlijk advies over welk traject en tempo het beste bij je past.",
      },
    ],
  },
};

export type Dictionary = typeof nl;
