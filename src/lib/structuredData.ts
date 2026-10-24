import { CONTACT } from "@/lib/utils";
import { BUSINESS, SOCIAL_PROFILES } from "@/lib/config/business";
import { CITIES } from "@/lib/config/cities";
import { SITE_URL } from "@/lib/seo";
import { nl } from "@/lib/i18n/nl";

const BUSINESS_ID = `${SITE_URL}/#business`;

function city(name: string) {
  return { "@type": "City", name };
}

// Alle vijf rijlespakketten als Offers — prijzen komen rechtstreeks uit nl.ts, zodat de
// structured data nooit afwijkt van wat er op de site staat.
function getOfferCatalog() {
  return {
    "@type": "OfferCatalog",
    name: "Rijlespakketten",
    url: `${SITE_URL}/rijlespakketten`,
    itemListElement: nl.packages.items.map((pkg) => ({
      "@type": "Offer",
      name: pkg.name,
      description: `${pkg.name}: ${pkg.lessons}, persoonlijk lesplan en vaste begeleiding.`,
      price: pkg.price,
      priceCurrency: "EUR",
      url: `${SITE_URL}/rijlespakketten`,
      itemOffered: {
        "@type": "Service",
        name: `${pkg.name} — ${pkg.lessons}`,
        serviceType: "Rijlessen (rijbewijs B)",
        additionalProperty: {
          "@type": "PropertyValue",
          name: "Aantal rijlessen",
          value: parseInt(pkg.lessons, 10),
        },
      },
    })),
  };
}

export function getLocalBusinessSchema(options?: { areaServed?: string; url?: string }) {
  const sameAs = SOCIAL_PROFILES.filter(Boolean);
  const isCityPage = Boolean(options?.areaServed);

  return {
    "@context": "https://schema.org",
    "@type": "DrivingSchool",
    // De hoofdentiteit krijgt een vaste @id; plaatspagina's verwijzen er via parentOrganization naar.
    "@id": isCityPage ? `${options?.url}#business` : BUSINESS_ID,
    name: BUSINESS.name,
    description: isCityPage
      ? `Persoonlijke rijlessen in ${options?.areaServed}, schakel en automaat, zonder wachtlijst.`
      : nl.meta.siteDescription,
    url: options?.url ?? SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: [`${SITE_URL}/opengraph-image`, `${SITE_URL}/logo.png`],
    telephone: `+31${CONTACT.phone.slice(1)}`,
    email: CONTACT.email,
    priceRange: BUSINESS.priceRange,
    currenciesAccepted: "EUR",
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.streetAddress,
      postalCode: BUSINESS.postalCode,
      addressLocality: BUSINESS.addressLocality,
      addressRegion: BUSINESS.addressRegion,
      addressCountry: BUSINESS.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.geo.latitude,
      longitude: BUSINESS.geo.longitude,
    },
    identifier: {
      "@type": "PropertyValue",
      name: "KvK",
      value: BUSINESS.kvk,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: BUSINESS.openingHours.days,
        opens: BUSINESS.openingHours.opens,
        closes: BUSINESS.openingHours.closes,
      },
    ],
    areaServed: isCityPage ? city(options!.areaServed!) : CITIES.map((c) => city(c.name)),
    knowsAbout: ["Rijlessen schakel", "Rijlessen automaat", "Spoedcursus rijbewijs", "Faalangstbegeleiding", "Theorie-examen"],
    hasOfferCatalog: getOfferCatalog(),
    ...(isCityPage && { parentOrganization: { "@id": BUSINESS_ID } }),
    ...(sameAs.length > 0 && { sameAs }),
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

/** Kruimelpad vanaf de homepage. `trail` = de stappen ná "Home", in volgorde. */
export function getBreadcrumbSchema(trail: { name: string; path: string }[]) {
  const items = [{ name: "Home", path: "" }, ...trail];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}
