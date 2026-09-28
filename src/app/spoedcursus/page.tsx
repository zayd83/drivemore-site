import type { Metadata } from "next";
import { PackagesPreview } from "@/components/sections/PackagesPreview";
import { Reviews } from "@/components/sections/Reviews";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { SHOW_REVIEWS } from "@/lib/config/reviews";
import { Button } from "@/components/ui/Button";
import { WaveDivider } from "@/components/ui/WaveDivider";

export const metadata: Metadata = {
  title: "Spoedcursus",
  description:
    "Rijbewijs in een paar weken met de spoedcursus van Drive More. Intensief, compact en volledig begeleiding van les tot examen.",
};

const checks = [
  "Je rijbewijs nodig voor een nieuwe baan of stage",
  "Je studie vraagt om mobiliteit",
  "Je hebt al rijervaring maar mist het bewijs",
  "Je wilt niet maanden wachten",
  "Je wilt structuur en vaart, niet eindeloos lessen",
];

export default function SpoedcursusPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="pt-[120px] pb-[clamp(48px,8vw,96px)] relative overflow-hidden"
        style={{ background: "linear-gradient(120deg, #E11D28 0%, #c0142c 50%, #1B4FD1 100%)" }}
      >
        <div
          className="absolute top-0 right-0 w-[60%] h-full opacity-15 pointer-events-none"
          style={{
            background: "radial-gradient(60% 100% at 80% 0%, rgba(255,255,255,0.4), transparent 60%)",
          }}
        />
        <div className="max-w-wrap mx-auto px-5 md:px-10 relative z-10">
          <span className="inline-flex items-center gap-2 font-sora font-semibold text-[11px] tracking-[0.22em] uppercase text-white/85">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            Spoedcursus
          </span>
          <h1 className="font-sora font-extrabold text-[clamp(36px,6vw,64px)] leading-[1.02] tracking-[-0.025em] mt-4 text-white max-w-[16ch]">
            Rijbewijs? In een paar weken.
          </h1>
          <p className="mt-5 text-[clamp(15px,1.8vw,18px)] leading-[1.65] text-white/90 max-w-[50ch]">
            De spoedcursus van Drive More is een compact, intensief traject waarbij we alles rond jou plannen: lessen, tussentijdse toets en examen — in minimale tijd, zonder in te leveren op kwaliteit.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/contact" variant="white">Vraag de mogelijkheden →</Button>
            <Button href="#pakketten" variant="ghost-light">Bekijk pakketten</Button>
          </div>
        </div>
        <WaveDivider fill="#ffffff" />
      </section>

      {/* How it works */}
      <section className="py-[clamp(48px,7vw,96px)]">
        <div className="max-w-wrap mx-auto px-5 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          <div>
            <span className="inline-flex items-center gap-2 font-sora font-semibold text-[11px] tracking-[0.22em] uppercase text-brand-ink-soft">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
              Hoe het werkt
            </span>
            <h2 className="font-sora font-extrabold text-[clamp(28px,4.5vw,46px)] leading-[1.05] tracking-[-0.025em] mt-4">
              Van aanmelding tot <span className="grad">geslaagd</span>.
            </h2>
            <p className="mt-5 text-[16px] leading-[1.75] text-brand-ink-body">
              We starten met een intake om te kijken wat je al kunt en hoeveel lessen realistisch zijn. Daarna plannen we alles in een vloeiend schema: lessen achter elkaar, examendatum zo vroeg mogelijk.
            </p>
            <div className="mt-8 flex flex-col gap-4">
              {[
                { n: "01", t: "Intake", b: "We beoordelen je niveau en bespreken een realistisch tijdspad." },
                { n: "02", t: "Intensief lesschema", b: "Lessen worden compact ingepland — ook s' avonds of in het weekend." },
                { n: "03", t: "Tussentijdse toets (TVT)", b: "Verplicht bij CBR — we regelen dit als onderdeel van het traject." },
                { n: "04", t: "Praktijkexamen", b: "We regelen een vroege examendatum en begeleiden je volledig." },
              ].map((step, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div
                    className={`w-10 h-10 rounded-full grid place-items-center font-sora font-extrabold text-[14px] flex-shrink-0 ${
                      i % 2 === 0 ? "bg-brand-red/10 text-brand-red" : "bg-brand-blue/10 text-brand-blue"
                    }`}
                  >
                    {step.n}
                  </div>
                  <div>
                    <h3 className="font-sora font-bold text-[16px] text-brand-ink">{step.t}</h3>
                    <p className="text-[14.5px] text-brand-ink-body leading-relaxed mt-0.5">{step.b}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* For who */}
          <div className="bg-brand-light border border-brand-line rounded-brand-lg p-8">
            <h3 className="font-sora font-bold text-[22px] text-brand-ink">
              Is de spoedcursus iets voor jou?
            </h3>
            <p className="mt-3 text-[15px] text-brand-ink-body leading-relaxed">
              De spoedcursus past het best als...
            </p>
            <ul className="mt-5 flex flex-col gap-3">
              {checks.map((item, i) => (
                <li key={i} className="flex gap-3 text-[15px] text-[#2a3344]">
                  <span className="w-5 h-5 rounded-blob bg-brand-red/10 text-brand-red grid place-items-center flex-shrink-0 mt-0.5 text-xs font-bold">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 pt-6 border-t border-brand-line">
              <p className="text-[14px] text-brand-ink-soft">
                Twijfel je of het bij je past? Bel of app ons — we geven je eerlijk advies.
              </p>
              <Button href="https://wa.me/31611206001" variant="whatsapp" size="md" className="mt-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 21l2.2-5.3A8.5 8.5 0 1 1 21 11.5z" />
                </svg>
                WhatsApp ons
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div id="pakketten">
        <PackagesPreview showSpoedToeslag />
      </div>
      {SHOW_REVIEWS && <Reviews />}
      <ContactCTA />
    </>
  );
}
