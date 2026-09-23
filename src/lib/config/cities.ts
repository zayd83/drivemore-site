import type { Metadata } from "next";

export interface CityInfo {
  slug: string;
  name: string;
  /** Unieke intro-tekst per plaats — bewust verschillend van structuur, niet alleen de naam verwisseld. */
  intro: string;
  /** Unieke meta description per plaats (~150-160 tekens). */
  metaDescription: string;
}

export const CITIES: CityInfo[] = [
  {
    slug: "dordrecht",
    name: "Dordrecht",
    intro:
      "Woon of werk je in Dordrecht en wil je op een prettige, persoonlijke manier leren rijden? Bij Drive More rijd je met een vaste instructeur die met jou meedenkt — geen wisselende gezichten, geen vast lesschema, maar een aanpak die bij jouw tempo past. Schakel of automaat: we starten met een proefles, zodat we precies weten waar we moeten beginnen.",
    metaDescription:
      "Rijschool in Dordrecht met persoonlijke begeleiding, schakel of automaat en geen wachtlijst. Plan je proefles bij Drive More en start snel met rijlessen op jouw niveau.",
  },
  {
    slug: "zwijndrecht",
    name: "Zwijndrecht",
    intro:
      "Rijschool Drive More verzorgt rijlessen voor leerlingen uit Zwijndrecht en de directe omgeving. In plaats van een standaardprogramma krijg je een lesplan dat is afgestemd op jouw niveau en doelen, met dezelfde begeleider van je eerste proefles tot aan het examen. Geen wachtlijst: je kunt vaak al binnen korte tijd starten.",
    metaDescription:
      "Op zoek naar een rijschool in Zwijndrecht? Drive More biedt persoonlijke rijlessen, schakel én automaat, zonder wachtlijst. Plan vandaag nog je proefles.",
  },
  {
    slug: "papendrecht",
    name: "Papendrecht",
    intro:
      "Op zoek naar een rijschool in Papendrecht die echt naar jou luistert? Bij Drive More begin je met een proefles waarin we je niveau in kaart brengen, waarna je een persoonlijk traject krijgt — schakel of automaat, in jouw tempo. Eén vaste instructeur, heldere afspraken en geen onnodige lessen.",
    metaDescription:
      "Rijlessen in Papendrecht bij Drive More: één vaste instructeur, een lesplan op jouw tempo en direct starten zonder wachtlijst. Plan je proefles.",
  },
  {
    slug: "sliedrecht",
    name: "Sliedrecht",
    intro:
      "Leerlingen uit Sliedrecht kiezen voor Drive More vanwege de persoonlijke aanpak: één vaste begeleider, een lesplan op jouw niveau en de mogelijkheid om zowel schakel als automaat te leren rijden. We starten altijd met een proefles, zodat je precies weet wat je kunt verwachten voordat je een pakket kiest.",
    metaDescription:
      "Drive More verzorgt rijlessen in Sliedrecht — schakel of automaat, persoonlijke begeleiding en een lesplan op jouw niveau. Plan je proefles.",
  },
  {
    slug: "hendrik-ido-ambacht",
    name: "Hendrik-Ido-Ambacht",
    intro:
      "Ook in Hendrik-Ido-Ambacht geeft Drive More rijles volgens hetzelfde uitgangspunt: geen lopende band, maar begeleiding die met jou meebeweegt. Tijdens je proefles bekijken we samen waar je staat, waarna we een lesplan opstellen dat past bij jouw tempo en doel — of dat nu rustig opbouwen is of juist snel richting je examen.",
    metaDescription:
      "Rijschool in Hendrik-Ido-Ambacht met persoonlijke rijlessen op maat, schakel of automaat en geen wachtlijst. Plan je proefles bij Drive More.",
  },
  {
    slug: "alblasserdam",
    name: "Alblasserdam",
    intro:
      "Drive More begeleidt leerlingen uit Alblasserdam van hun eerste proefles tot en met het praktijkexamen. Je rijdt bij dezelfde instructeur, op een schema dat rekening houdt met jouw agenda, en kiest zelf voor schakel of automaat. Geen wachtlijst en geen verrassingen — alleen een heldere aanpak.",
    metaDescription:
      "Rijlessen in Alblasserdam bij Drive More: vaste begeleiding, schakel of automaat en snel starten zonder wachtlijst. Plan vandaag je proefles.",
  },
  {
    slug: "barendrecht",
    name: "Barendrecht",
    intro:
      "Voor leerlingen in Barendrecht biedt Drive More persoonlijke rijlessen zonder wachtlijst. Na je proefles stellen we een lesplan op dat aansluit bij jouw niveau en tempo, met dezelfde begeleider gedurende het hele traject — tot en met je praktijkexamen.",
    metaDescription:
      "Rijschool in Barendrecht: persoonlijke rijlessen bij Drive More, zonder wachtlijst en met een lesplan op jouw niveau. Plan je proefles.",
  },
  {
    slug: "ridderkerk",
    name: "Ridderkerk",
    intro:
      "In Ridderkerk rijd je bij Drive More met een vaste instructeur die jouw voortgang goed kent, in plaats van steeds wisselende begeleiders. We beginnen met een proefles om je niveau te bepalen en bouwen van daaruit een lesplan op — schakel of automaat, in jouw tempo.",
    metaDescription:
      "Drive More geeft rijles in Ridderkerk met een vaste instructeur, schakel of automaat en geen wachtlijst. Plan vandaag nog je proefles.",
  },
];

export function getCity(slug: string): CityInfo | undefined {
  return CITIES.find((c) => c.slug === slug);
}

export function getCityMetadata(slug: string): Metadata {
  const city = getCity(slug);
  if (!city) return {};

  const title = `Rijschool in ${city.name}`;
  return {
    title,
    description: city.metaDescription,
    alternates: { canonical: `/rijschool-${city.slug}` },
    openGraph: {
      type: "website",
      locale: "nl_NL",
      title: `${title} | Rijschool Drive More`,
      description: city.metaDescription,
    },
  };
}
