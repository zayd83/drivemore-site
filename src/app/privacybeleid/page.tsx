import type { Metadata } from "next";
import { readLegalDoc } from "@/lib/content/legal";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { pageMetadata } from "@/lib/seo";
import { getBreadcrumbSchema } from "@/lib/structuredData";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = pageMetadata({
  title: "Privacybeleid | Rijschool Drive More",
  description:
    "Lees hoe Rijschool Drive More in Dordrecht omgaat met je persoonsgegevens: welke gegevens we verwerken, waarom, hoe lang en wat je rechten zijn.",
  path: "/privacybeleid",
});

export default function PrivacybeleidPage() {
  const doc = readLegalDoc("privacybeleid.md");
  return (
    <>
      <JsonLd data={getBreadcrumbSchema([{ name: "Privacybeleid", path: "/privacybeleid" }])} />
      <LegalPageLayout pageKey="privacy" doc={doc} />
    </>
  );
}
