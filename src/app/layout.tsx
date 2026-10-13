import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ConsentProvider } from "@/contexts/ConsentContext";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { MobileCTA } from "@/components/layout/MobileCTA";
import { TrustToast } from "@/components/layout/TrustToast";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { getLocalBusinessSchema } from "@/lib/structuredData";
import { SITE_NAME, SITE_URL } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

const sora = Sora({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

// Fallback-metadata; elke pagina overschrijft title/description/canonical/OG via pageMetadata().
// Het OG-/Twitter-beeld komt uit app/opengraph-image.tsx en geldt automatisch voor alle routes.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Rijschool Dordrecht | Automaat & schakel rijlessen – Drive More",
    template: "%s | Rijschool Drive More",
  },
  description:
    "Rijschool Drive More in Dordrecht: persoonlijke rijlessen in schakel of automaat, spoedcursus en faalangstbegeleiding. Geen wachtlijst. Plan je intake.",
  applicationName: SITE_NAME,
  keywords: [
    "rijschool Dordrecht",
    "rijlessen Dordrecht",
    "rijles automaat",
    "rijles schakel",
    "spoedcursus rijbewijs",
    "faalangstbegeleiding rijexamen",
    "rijschool Zwijndrecht",
    "rijschool Papendrecht",
    "Drive More",
  ],
  openGraph: {
    type: "website",
    locale: "nl_NL",
    siteName: SITE_NAME,
    title: "Rijschool Dordrecht | Automaat & schakel rijlessen – Drive More",
    description:
      "Persoonlijke rijlessen in Dordrecht en omgeving. Schakel of automaat, spoedcursus en faalangstbegeleiding. Plan je intake.",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="nl"
      className={`${sora.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="font-inter antialiased">
        <JsonLd data={getLocalBusinessSchema()} />
        <LanguageProvider>
          <ConsentProvider>
            <LenisProvider>
              <ScrollProgress />
              <Header />
              <main>{children}</main>
              <Footer />
              <MobileCTA />
              <TrustToast />
              <CookieBanner />
            </LenisProvider>
          </ConsentProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
