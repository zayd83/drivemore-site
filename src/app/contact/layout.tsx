import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { getBreadcrumbSchema } from "@/lib/structuredData";
import { JsonLd } from "@/components/seo/JsonLd";

// page.tsx is een client component (formulier), dus metadata en structured data staan hier.
export const metadata: Metadata = pageMetadata({
  title: "Contact & intake plannen | Rijschool Drive More Dordrecht",
  description:
    "Plan je intake bij Rijschool Drive More, Merwedestraat 100 in Dordrecht. Bel of app 06 11206001 of mail contact@rijschooldrivemore.nl. Bereikbaar ma–vr 09:00–17:00.",
  path: "/contact",
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={getBreadcrumbSchema([{ name: "Contact", path: "/contact" }])} />
      {children}
    </>
  );
}
