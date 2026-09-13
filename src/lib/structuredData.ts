import { CONTACT } from "@/lib/utils";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://rijschooldrivemore.nl";

// VUL IN: echt vestigingsadres van de rijschool — nodig voor correcte lokale SEO (Google Bedrijfsprofiel/Maps).
const ADDRESS = {
  streetAddress: "Straatnaam 1", // VUL IN: echte straatnaam + huisnummer
  postalCode: "1234 AB", // VUL IN: echte postcode
  addressLocality: "Plaatsnaam", // VUL IN: echte plaats/stad
  addressCountry: "NL",
};

export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "DrivingSchool",
    name: "Rijschool Drive More",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/logo.png`,
    telephone: `+31${CONTACT.phone.slice(1)}`,
    email: CONTACT.email,
    address: {
      "@type": "PostalAddress",
      ...ADDRESS,
    },
    // VUL IN: pas aan naar het echte werkgebied (zie ook src/lib/i18n — serviceArea.cities).
    areaServed: "Plaatsnaam e.o.",
  };
}

export function getFaqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}
