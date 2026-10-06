import type { Metadata } from "next";
import { WhyDriveMore } from "@/components/sections/WhyDriveMore";
import { Reviews } from "@/components/sections/Reviews";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { SHOW_REVIEWS } from "@/lib/config/reviews";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { WaveDivider } from "@/components/ui/WaveDivider";

export const metadata: Metadata = {
  title: "Over ons",
  description:
    "Maak kennis met de oprichter van Rijschool Drive More. Persoonlijke begeleiding, maatwerk en een duidelijke aanpak — dat is hoe we werken.",
};

const values = [
  {
    title: "Eerlijkheid",
    body: "We zeggen wat we denken. Als je meer lessen nodig hebt dan gepland, zeggen we dat. Als je sneller vooruitgaat dan verwacht, ook.",
  },
  {
    title: "Geduld",
    body: "Rijden leer je niet in één dag. We nemen de tijd die jij nodig hebt — zonder druk, zonder haast.",
  },
  {
    title: "Vakmanschap",
    body: "Een goede rijinstructeur is meer dan iemand die naast je zit. We leren je écht omgaan met het verkeer.",
  },
];

export default function OverOnsPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-[120px] pb-16 bg-gradient-to-b from-brand-light to-white">
        <div className="max-w-wrap mx-auto px-5 md:px-10">
          <span className="inline-flex items-center gap-2 font-sora font-semibold text-[11px] tracking-[0.22em] uppercase text-brand-ink-soft">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
            Over ons
          </span>
          <h1 className="font-sora font-extrabold text-[clamp(36px,6vw,64px)] leading-[1.02] tracking-[-0.025em] mt-4 max-w-[16ch]">
            De mens achter <span className="grad">Drive More</span>.
          </h1>
        </div>
      </section>

      {/* Founder story */}
      <section className="py-[clamp(48px,7vw,96px)]">
        <div className="max-w-wrap mx-auto px-5 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-14 items-center">
            {/* Photo */}
            <div className="relative aspect-[4/5] max-w-sm mx-auto lg:mx-0 w-full">
              <div className="w-full h-full rounded-brand-lg bg-brand-light border border-brand-line grid place-items-center overflow-hidden">
                <p className="font-sora font-semibold text-[11px] tracking-[0.14em] uppercase text-brand-ink-soft">
                  Foto volgt
                </p>
              </div>
            </div>

            {/* Story */}
            <div>
              <h2 className="font-sora font-extrabold text-[clamp(26px,4vw,38px)] leading-[1.1] tracking-[-0.02em]">
                Opgericht met één idee: les die past bij jou.
              </h2>
              <div className="mt-6 flex flex-col gap-5 text-[16px] leading-[1.75] text-brand-ink-body">
                <p>
                  Drive More is opgericht vanuit een simpele overtuiging: rijles moet passen bij de leerling, niet andersom. Na jarenlange ervaring in het rijonderwijs viel keer op keer hetzelfde patroon op: leerlingen die vastliepen, niet omdat ze niet konden rijden, maar omdat de aanpak niet bij hen paste.
                </p>
                <p>
                  Dus begon hij anders. Geen vast programma, geen afvinklijstjes. In plaats daarvan: een intake om te begrijpen wie jij bent als leerling. Daarna een plan dat écht bij je past — of je nu rustig wilt opbouwen, snel moet slagen of zenuwen hebt bij het examen.
                </p>
                <p>
                  Dat idee is uitgegroeid tot Rijschool Drive More. Een kleine rijschool met een grote focus: jij, achter het stuur, met vertrouwen. En uiteindelijk — die roze pas.
                </p>
              </div>
              <blockquote className="mt-8 border-l-[3px] border-brand-red pl-5 text-[17px] font-sora font-semibold italic text-brand-ink leading-[1.6]">
                "Elke leerling leert anders. Mijn taak is erachter komen hoe jij leert — en dan precies die les geven."
              </blockquote>
              <div className="mt-6 pt-6 border-t border-brand-line">
                <span className="font-sora font-bold text-[16px] text-brand-ink block">Oprichter & rijinstructeur</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative py-[clamp(48px,7vw,96px)] bg-brand-light overflow-hidden">
        <WaveDivider fill="#ffffff" flip />
        <div className="max-w-wrap mx-auto px-5 md:px-10 relative z-[2]">
          <div className="max-w-[560px] mb-12">
            <h2 className="font-sora font-extrabold text-[clamp(28px,4.5vw,44px)] leading-[1.06] tracking-[-0.025em]">
              Zo werken we bij <span className="grad">Drive More</span>.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <div key={i} className="bg-white border border-brand-line rounded-brand-lg p-7 hover:-translate-y-1 hover:shadow-card transition-all duration-300">
                <h3 className="font-sora font-bold text-[20px] text-brand-ink">{v.title}</h3>
                <p className="mt-3 text-[15px] leading-[1.65] text-brand-ink-body">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-wrap mx-auto px-5 md:px-10 text-center">
          <h2 className="font-sora font-extrabold text-[clamp(28px,4.5vw,44px)] leading-[1.06] tracking-[-0.025em]">
            Klaar om kennis te maken?
          </h2>
          <p className="mt-4 text-[16px] text-brand-ink-body max-w-[46ch] mx-auto leading-relaxed">
            Plan een intake en maak kennis met de aanpak van Drive More.
          </p>
          <div className="mt-7 flex justify-center">
            <MagneticButton>
              <Button href="/contact">Plan een intake →</Button>
            </MagneticButton>
          </div>
        </div>
      </section>

      <WhyDriveMore />
      {SHOW_REVIEWS && <Reviews />}
      <ContactCTA />
    </>
  );
}
