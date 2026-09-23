import Link from "next/link";
import { notFound } from "next/navigation";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Button } from "@/components/ui/Button";
import { TrustBar } from "@/components/sections/TrustBar";
import { EndCta } from "@/components/sections/EndCta";
import { CITIES, getCity } from "@/lib/config/cities";
import { getLocalBusinessSchema } from "@/lib/structuredData";

export function CityPageContent({ slug }: { slug: string }) {
  const city = getCity(slug);
  if (!city) notFound();

  const otherCities = CITIES.filter((c) => c.slug !== slug);
  const schema = getLocalBusinessSchema({ areaServed: city.name });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Header */}
      <section className="pt-[120px] pb-14 md:pb-16 bg-gradient-to-b from-brand-light to-white">
        <div className="max-w-wrap mx-auto px-5 md:px-10">
          <div className="max-w-[680px]">
            <span className="inline-flex items-center gap-2 font-sora font-semibold text-[11px] tracking-[0.22em] uppercase text-brand-ink-soft">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
              Werkgebied · {city.name}
            </span>
            <h1 className="font-sora font-extrabold text-[clamp(32px,5.5vw,56px)] leading-[1.05] tracking-[-0.025em] mt-4">
              Rijschool in <span className="grad">{city.name}</span>
            </h1>
            <p className="mt-5 text-[16px] leading-[1.75] text-brand-ink-body">
              {city.intro}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <MagneticButton>
                <Button href="/contact">Plan een proefles →</Button>
              </MagneticButton>
              <Button href="/rijlespakketten" variant="secondary">
                Bekijk pakketten
              </Button>
            </div>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* Pakketten CTA */}
      <section className="py-12 md:py-16">
        <div className="max-w-wrap mx-auto px-5 md:px-10">
          <div className="bg-brand-light border border-brand-line rounded-brand-lg p-7 md:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
            <div>
              <h2 className="font-sora font-bold text-[20px] text-brand-ink">
                Rijlespakketten voor leerlingen uit {city.name}
              </h2>
              <p className="mt-1.5 text-[15px] text-brand-ink-body leading-relaxed">
                Bekijk onze pakketten en kies wat bij jouw tempo en doel past — of vraag eerst een proefles aan.
              </p>
            </div>
            <MagneticButton className="flex-shrink-0">
              <Button href="/rijlespakketten" className="whitespace-nowrap">
                Bekijk pakketten →
              </Button>
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* Nearby cities — internal linking */}
      <section className="pb-14 md:pb-16">
        <div className="max-w-wrap mx-auto px-5 md:px-10 text-center">
          <span className="font-sora font-semibold text-[11px] tracking-[0.22em] uppercase text-brand-ink-soft">
            Ook actief in de omgeving
          </span>
          <div className="mt-5 flex flex-wrap justify-center gap-2.5">
            {otherCities.map((c) => (
              <Link
                key={c.slug}
                href={`/rijschool-${c.slug}`}
                className="font-sora font-semibold text-[13px] text-brand-ink bg-white border border-brand-line rounded-full px-4 py-2 hover:border-brand-ink hover:-translate-y-0.5 transition-all duration-200"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <EndCta />
    </>
  );
}
