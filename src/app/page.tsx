import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Stats } from "@/components/sections/Stats";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { SpeedHighlight } from "@/components/sections/SpeedHighlight";
import { PackagesPreview } from "@/components/sections/PackagesPreview";
import { WhyDriveMore } from "@/components/sections/WhyDriveMore";
import { Reviews } from "@/components/sections/Reviews";
import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { FAQ } from "@/components/sections/FAQ";
import { FloatingCardClient } from "@/components/3d/FloatingCardClient";
import { getFaqSchema } from "@/lib/structuredData";
import { nl } from "@/lib/i18n/nl";
import { SHOW_REVIEWS } from "@/lib/config/reviews";

export const metadata: Metadata = {
  title: "Rijschool Drive More — Jouw weg naar je rijbewijs",
  description:
    "Persoonlijke rijlessen op maat. Rijlespakketten, spoedcursus en faalangstbegeleiding. Plan je intake bij Rijschool Drive More.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getFaqSchema(nl.faq.items)) }}
      />
      <Hero />
      <TrustBar />
      <Stats />
      <ServicesPreview />
      <HowItWorks />

      {/* 3D floating card section */}
      <section className="py-[clamp(60px,9vw,118px)] overflow-hidden">
        <div className="max-w-wrap mx-auto px-5 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 font-sora font-semibold text-[11px] tracking-[0.22em] uppercase text-brand-ink-soft">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
              Jouw doel
            </span>
            <h2 className="font-sora font-extrabold text-[clamp(30px,5.2vw,52px)] leading-[1.05] tracking-[-0.025em] mt-4">
              Die roze pas.{" "}
              <span className="grad">Eindelijk</span> in jouw handen.
            </h2>
            <p className="mt-5 text-[16px] leading-[1.75] text-brand-ink-body max-w-[42ch]">
              Elk traject bij Drive More eindigt op hetzelfde punt: jij, met je rijbewijs op zak,
              klaar voor de weg. Wij regelen de rest.
            </p>
          </div>
          <div className="h-[320px] md:h-[380px] w-full">
            <FloatingCardClient />
          </div>
        </div>
      </section>

      <SpeedHighlight />
      <PackagesPreview />
      <WhyDriveMore />
      {SHOW_REVIEWS && <Reviews />}
      <AboutTeaser />
      <FAQ />
      <ServiceArea />
      <ContactCTA />
    </>
  );
}
