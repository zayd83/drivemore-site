import type { Metadata } from "next";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://rijschooldrivemore.nl";
export const SITE_NAME = "Rijschool Drive More";

// Datum van de laatste inhoudelijke wijziging — gebruikt als <lastmod> in de sitemap. Pas aan
// bij een echte contentwijziging (niet bij elke build, anders negeert Google de waarde).
export const CONTENT_LAST_UPDATED = "2026-10-13";

// Gegenereerd door app/opengraph-image.tsx. Expliciet meegeven is nodig: zodra een pagina een
// eigen `openGraph`-object heeft, erft Next.js het beeld uit de root niet meer.
const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Rijschool Drive More — persoonlijke rijlessen in Dordrecht en omgeving",
};

/**
 * Volledige metadata voor één pagina: unieke title/description, canonical, hreflang en
 * Open Graph + Twitter Card. Next.js voegt `openGraph` niet diep samen met de root-layout,
 * dus elke pagina krijgt hier de complete set mee.
 *
 * `title` is altijd absoluut (geen template), zodat elke pagina precies de lokaal
 * geoptimaliseerde titel krijgt die hier wordt meegegeven.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  /** Pad zonder domein, bijv. "/spoedcursus" of "" voor de homepage. */
  path: string;
}): Metadata {
  const url = path || "/";
  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: url,
      // De Engelse versie is een taalwissel op dezelfde URL (geen eigen /en-route), dus er is
      // alleen een Nederlandse variant om naar te verwijzen.
      languages: { "nl-NL": url, "x-default": url },
    },
    openGraph: {
      type: "website",
      locale: "nl_NL",
      siteName: SITE_NAME,
      url,
      title,
      description,
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
