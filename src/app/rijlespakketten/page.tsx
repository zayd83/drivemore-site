import type { Metadata } from "next";
import Link from "next/link";
import { PackagesPreview } from "@/components/sections/PackagesPreview";
import { FAQ } from "@/components/sections/FAQ";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { WaveDivider } from "@/components/ui/WaveDivider";

export const metadata: Metadata = {
  title: "Rijlespakketten",
  description:
    "Kies je rijlespakket bij Rijschool Drive More. Van Drive Start tot Drive Ultimate — transparante prijzen, maatwerk altijd.",
};

export default function RijlespakkettenPage() {
  return (
    <>
      {/* Page hero */}
      <section className="pt-[120px] pb-16 bg-gradient-to-b from-brand-light to-white">
        <div className="max-w-wrap mx-auto px-5 md:px-10">
          <span className="inline-flex items-center gap-2 font-sora font-semibold text-[11px] tracking-[0.22em] uppercase text-brand-ink-soft">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
            Rijlespakketten
          </span>
          <h1 className="font-sora font-extrabold text-[clamp(36px,6vw,64px)] leading-[1.02] tracking-[-0.025em] mt-4 max-w-[16ch]">
            Kies je route naar je <span className="grad">rijbewijs</span>.
          </h1>
          <p className="mt-5 text-[clamp(15px,1.8vw,18px)] leading-[1.65] text-brand-ink-body max-w-[52ch]">
            Vijf heldere pakketten, van Drive Start tot Drive Ultimate. Alle prijzen zijn inclusief BTW. Rijbewijs snel nodig? Bekijk onze <Link href="/spoedcursus" className="underline underline-offset-2 hover:text-brand-ink">spoedopleiding</Link>. Twijfel? Plan een intake en we adviseren je eerlijk.
          </p>
        </div>
      </section>

      {/* What's included block */}
      <section className="relative py-14 bg-brand-light overflow-hidden">
        <WaveDivider fill="#ffffff" flip />
        <div className="max-w-wrap mx-auto px-5 md:px-10 relative z-[2]">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: "✓", title: "45 of 90 minuten per les", body: "Kies de lesduur die bij jou past — flexibel per pakket of losse les." },
              { icon: "✓", title: "Persoonlijk lesplan", body: "Geen standaard schema, maar een plan dat past bij jouw niveau en doel." },
              { icon: "✓", title: "Transparante prijzen", body: "Wat je ziet is wat je betaalt. Geen verborgen kosten." },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start">
                <span className="w-9 h-9 rounded-blob bg-brand-red/10 text-brand-red grid place-items-center font-sora font-bold text-sm flex-shrink-0 mt-0.5">
                  {item.icon}
                </span>
                <div>
                  <h3 className="font-sora font-bold text-[15px] text-brand-ink">{item.title}</h3>
                  <p className="text-[14px] text-brand-ink-body leading-relaxed mt-0.5">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PackagesPreview />
      <FAQ />
      <ContactCTA />
    </>
  );
}
