import type { Metadata } from "next";
import { readLegalDoc } from "@/lib/content/legal";
import { LegalPageLayout } from "@/components/legal/LegalPageLayout";

export const metadata: Metadata = {
  title: "Cookiebeleid",
  description: "Cookiebeleid van Rijschool Drive More.",
  alternates: { canonical: "/cookiebeleid" },
};

export default function CookiebeleidPage() {
  const doc = readLegalDoc("cookiebeleid.md");
  return <LegalPageLayout pageKey="cookies" doc={doc} />;
}
