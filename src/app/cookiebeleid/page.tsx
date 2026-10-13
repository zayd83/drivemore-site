import type { Metadata } from "next";
import { readLegalDoc } from "@/lib/content/legal";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { pageMetadata } from "@/lib/seo";
import { getBreadcrumbSchema } from "@/lib/structuredData";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = pageMetadata({
  title: "Cookiebeleid | Rijschool Drive More",
  description:
    "Welke cookies gebruikt de website van Rijschool Drive More, waarvoor, en hoe pas je je cookievoorkeuren aan?",
  path: "/cookiebeleid",
});

export default function CookiebeleidPage() {
  const doc = readLegalDoc("cookiebeleid.md");
  return (
    <>
      <JsonLd data={getBreadcrumbSchema([{ name: "Cookiebeleid", path: "/cookiebeleid" }])} />
      <LegalPageLayout pageKey="cookies" doc={doc} />
    </>
  );
}
