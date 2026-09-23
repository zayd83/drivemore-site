import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { TrainingChoice } from "@/components/sections/TrainingChoice";
import { PackagesTeaser } from "@/components/sections/PackagesTeaser";
import { WhyDriveMore } from "@/components/sections/WhyDriveMore";
import { LessonCars } from "@/components/sections/LessonCars";
import { Reviews } from "@/components/sections/Reviews";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { EndCta } from "@/components/sections/EndCta";
import { FAQ } from "@/components/sections/FAQ";
import { getFaqSchema } from "@/lib/structuredData";
import { nl } from "@/lib/i18n/nl";
import { SHOW_REVIEWS } from "@/lib/config/reviews";

export const metadata: Metadata = {
  title: "Rijschool Drive More — Jouw weg naar je rijbewijs",
  description:
    "Persoonlijke rijlessen op maat. Rijlespakketten, spoedcursus en faalangstbegeleiding. Plan je proefles bij Rijschool Drive More.",
  alternates: { canonical: "/" },
};

// Volgorde bewust vastgelegd: Hero -> USP/vertrouwen -> Schakel/Automaat/Spoed ->
// Pakketten & prijzen -> Waarom Drive More -> Lesauto's -> Reviews ->
// Van proefles tot rijbewijs -> Spoed/Faalangst/Theorie -> Werkgebied -> FAQ -> Eind-CTA.
export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getFaqSchema(nl.faq.items)) }}
      />
      <Hero />
      <TrustBar />
      <TrainingChoice />
      <PackagesTeaser />
      <WhyDriveMore />
      <LessonCars />
      {SHOW_REVIEWS && <Reviews />}
      <HowItWorks />
      <ServicesPreview />
      <ServiceArea />
      <FAQ />
      <EndCta />
    </>
  );
}
