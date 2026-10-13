import type { Metadata } from "next";
import { readLegalDoc } from "@/lib/content/legal";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { pageMetadata } from "@/lib/seo";
import { getBreadcrumbSchema } from "@/lib/structuredData";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = pageMetadata({
  title: "Algemene voorwaarden | Rijschool Drive More",
  description:
    "De algemene voorwaarden van Rijschool Drive More in Dordrecht: afspraken over rijlessen, pakketten, betaling, annulering en examens.",
  path: "/algemene-voorwaarden",
});

export default function AlgemeneVoorwaardenPage() {
  const doc = readLegalDoc("algemene-voorwaarden.md");
  return (
    <>
      <JsonLd data={getBreadcrumbSchema([{ name: "Algemene voorwaarden", path: "/algemene-voorwaarden" }])} />
      <LegalPageLayout pageKey="terms" doc={doc} />
    </>
  );
}
