import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { TrainingChoice } from "@/components/sections/TrainingChoice";
import { PackagesPreview } from "@/components/sections/PackagesPreview";
import { WhyDriveMore } from "@/components/sections/WhyDriveMore";
import { LessonCars } from "@/components/sections/LessonCars";
import { Reviews } from "@/components/sections/Reviews";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { TheoryPractice } from "@/components/sections/TheoryPractice";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { EndCta } from "@/components/sections/EndCta";
import { FAQ } from "@/components/sections/FAQ";
import { getFaqSchema } from "@/lib/structuredData";
import { pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { nl } from "@/lib/i18n/nl";
import { SHOW_REVIEWS } from "@/lib/config/reviews";

export const metadata: Metadata = pageMetadata({
  title: "Rijschool Dordrecht | Automaat & schakel rijlessen – Drive More",
  description:
    "Rijschool Drive More in Dordrecht e.o.: persoonlijke rijlessen in schakel of automaat, spoedcursus, faalangstbegeleiding en gratis theorie. Geen wachtlijst – plan je intake.",
  path: "",
});

// Volgorde bewust vastgelegd: Hero -> USP/vertrouwen -> Schakel/Automaat/Spoed ->
// Pakketten & prijzen (top 3, link naar alle 5) -> Waarom Drive More -> Lesauto's -> Reviews ->
// Van intake tot rijbewijs -> Spoed/Faalangst/Theorie -> Theorie & praktijk (video's/oefenexamens) ->
// Werkgebied -> FAQ -> Eind-CTA.
export default function HomePage() {
  return (
    <>
      <JsonLd data={getFaqSchema(nl.faq.items)} />
      <Hero />
      <TrustBar />
      <TrainingChoice />
      <PackagesPreview limit={3} />
      <WhyDriveMore />
      <LessonCars />
      {SHOW_REVIEWS && <Reviews />}
      <HowItWorks />
      <ServicesPreview />
      <TheoryPractice />
      <ServiceArea />
      <FAQ />
      <EndCta />
    </>
  );
}
