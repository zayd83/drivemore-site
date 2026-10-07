import type { Metadata } from "next";
import { readLegalDoc } from "@/lib/content/legal";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";

export const metadata: Metadata = {
  title: "Privacybeleid",
  description: "Privacybeleid van Rijschool Drive More.",
  alternates: { canonical: "/privacybeleid" },
};

export default function PrivacybeleidPage() {
  const doc = readLegalDoc("privacybeleid.md");
  return <LegalPageLayout pageKey="privacy" doc={doc} />;
}
