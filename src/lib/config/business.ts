// Echte bedrijfsgegevens — één centrale plek, gebruikt door structuredData.ts, llms.txt, de footer
// en de contactpagina. Wijzig hier, niet los op meerdere plekken.
export const BUSINESS = {
  name: "Rijschool Drive More",
  streetAddress: "Merwedestraat 100",
  postalCode: "3313 CS",
  addressLocality: "Dordrecht",
  addressRegion: "Zuid-Holland",
  addressCountry: "NL",
  kvk: "42070738",
  areaServed: "Dordrecht en omgeving",
  // Coördinaten van Dordrecht (centrum). Verfijn naar het exacte adres zodra bekend, bijv. via
  // de "Wat is hier?"-functie in Google Maps op Merwedestraat 100.
  geo: { latitude: 51.8133, longitude: 4.6901 },
  // Openingstijden (telefonisch/kantoor). Weergave staat vertaald in nl.ts/en.ts onder
  // `contact.openingHours` — houd die gelijk aan dit blok.
  openingHours: {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "17:00",
  },
  // Prijsindicatie voor zoekmachines: van de losse intake t/m het grootste pakket.
  priceRange: "€45 - €2650",
};

// Social-profielen voor `sameAs` in de structured data. Lege strings worden automatisch
// weggelaten, dus vul alleen in wat echt bestaat.
export const SOCIAL_PROFILES: string[] = [
  "", // VUL IN: Google Bedrijfsprofiel-URL (bijv. https://maps.app.goo.gl/...)
  "", // VUL IN: Instagram-URL
  "", // VUL IN: Facebook-URL
  "", // VUL IN: TikTok-URL
];
