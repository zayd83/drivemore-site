import { CONTACT } from "@/lib/utils";
import { BUSINESS } from "@/lib/config/business";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://rijschooldrivemore.nl";

export function getLocalBusinessSchema(options?: { areaServed?: string; url?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "DrivingSchool",
    name: BUSINESS.name,
    url: options?.url ?? SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/logo.png`,
    telephone: `+31${CONTACT.phone.slice(1)}`,
    email: CONTACT.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.streetAddress,
      postalCode: BUSINESS.postalCode,
      addressLocality: BUSINESS.addressLocality,
      addressCountry: BUSINESS.addressCountry,
    },
    identifier: {
      "@type": "PropertyValue",
      name: "KvK",
      value: BUSINESS.kvk,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "17:00",
      },
    ],
    areaServed: options?.areaServed ?? BUSINESS.areaServed,
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
