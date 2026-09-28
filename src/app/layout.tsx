import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { MobileCTA } from "@/components/layout/MobileCTA";
import { getLocalBusinessSchema } from "@/lib/structuredData";

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

export const metadata: Metadata = {
  title: {
    default: "Rijschool Drive More — Jouw weg naar je rijbewijs",
    template: "%s | Rijschool Drive More",
  },
  description:
    "Rijschool Drive More: persoonlijke rijlessen op maat. Rijlespakketten, spoedcursus, faalangstbegeleiding en theorie. Plan je intake.",
  keywords: [
    "rijschool",
    "rijlessen",
    "spoedcursus",
    "rijbewijs",
    "faalangstbegeleiding",
    "Drive More",
    "Rotterdam",
  ],
  openGraph: {
    type: "website",
    locale: "nl_NL",
    siteName: "Rijschool Drive More",
    title: "Rijschool Drive More — Jouw weg naar je rijbewijs",
    description:
      "Persoonlijke rijlessen op maat. Rijlespakketten, spoedcursus en faalangstbegeleiding. Plan je intake.",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getLocalBusinessSchema()) }}
        />
        <LanguageProvider>
          <LenisProvider>
            <ScrollProgress />
            <Header />
            <main>{children}</main>
            <Footer />
            <MobileCTA />
          </LenisProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
