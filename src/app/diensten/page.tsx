import type { Metadata } from "next";
import Link from "next/link";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { WhyDriveMore } from "@/components/sections/WhyDriveMore";
import { ContactCTA } from "@/components/sections/ContactCTA";

export const metadata: Metadata = {
  title: "Diensten",
  description:
    "Rijlessen, spoedcursus, faalangstbegeleiding en theorie bij Rijschool Drive More. Voor elke leerling de juiste aanpak.",
};

const services = [
  {
    id: "rijlessen",
    eyebrow: "1 · Rijlessen",
    title: "Rijlessen op maat",
    subtitle: "Praktijk · Één-op-één · Elke les afgestemd op jou",
    forWhom: "Voor wie rustig en stap voor stap wil opbouwen.",
    emphasized: false,
    body: [
      "Bij Drive More start je niet met een standaard programma. We beginnen met een intake om in kaart te brengen waar je staat: wat kun je al, waar zit je spanning, en hoe leer jij het liefst? Pas daarna stellen we een lesplan op — alleen voor jou.",
      "Elke rijles duurt 60 minuten en is gericht op concrete vooruitgang. Na elke les krijg je eerlijke, opbouwende feedback: wat ging goed, wat gaan we de volgende keer aanpakken. Zo weet je altijd waar je aan toe bent.",
    ],
    color: "blue" as const,
  },
  {
    id: "spoedcursus",
    eyebrow: "2 · Spoedcursus",
    title: "Spoedcursus",
    subtitle: "Intensief · Compact · Klaar in weken",
    forWhom: "Voor wie over 6 weken een auto nodig heeft voor werk, stage of studie.",
    emphasized: false,
    body: [
      "Heb je je rijbewijs snel nodig — voor een nieuwe baan, je studie of gewoon omdat het er al te lang bij staat? Met de spoedcursus van Drive More plannen we je lessen compact achter elkaar en regelen we een vroeg examen.",
      "Snel wil niet zeggen slopend. We stemmen ook het spoedtraject af op jouw tempo en energieniveau, zodat je niet alleen snel maar ook goed achter het stuur zit.",
    ],
    color: "red" as const,
  },
  {
    id: "faalangst",
    eyebrow: "3 · Faalangstbegeleiding",
    title: "Faalangstbegeleiding",
    subtitle: "Rust · Vertrouwen · Jij achter het stuur",
    forWhom: "Trillende handen op het examen? Hartkloppingen bij het idee alleen al? Je bent niet de enige — en het is op te lossen.",
    emphasized: true,
    body: [
      "Faalangst bij het rijden is veel gewoner dan je denkt. Zenuwen voor het examen, het gevoel dat je achter het stuur blokkeert, of steeds opnieuw zakken terwijl je het eigenlijk wél kunt — het komt vaker voor dan mensen beseffen.",
      "We werken rustig aan je zelfvertrouwen: kleine stapjes, veel herhaling waar nodig, en altijd in een veilige omgeving. Geen druk, geen haast — alleen aandacht voor jou.",
    ],
    color: "blue" as const,
  },
  {
    id: "theorie",
    eyebrow: "4 · Theorie",
    title: "Theorietraining",
    subtitle: "Inzicht · Oefenexamens · In één keer slagen",
    forWhom: "Voor wie liever inzicht heeft dan trucjes stampen.",
    emphasized: false,
    body: [
      "Theorie slagen begint met écht begrijpen, niet met stampen. Onze theorietraining is gericht op inzicht in de verkeersregels: hoe werken voorrangssituaties, wat betekenen borden in de context van een weg, hoe beoordeel je gevaar?",
      "We oefenen met echte CBR-examentrainingen en bespreken de logica achter lastige vragen. Zo ga je het examen in met begrip, niet alleen met antwoorden uit je hoofd.",
    ],
    color: "red" as const,
  },
];

export default function DienstenPage() {
  return (
    <>
      {/* Page hero */}
      <section className="pt-[120px] pb-16 bg-gradient-to-b from-brand-light to-white">
        <div className="max-w-wrap mx-auto px-5 md:px-10">
          <span className="inline-flex items-center gap-2 font-sora font-semibold text-[11px] tracking-[0.22em] uppercase text-brand-ink-soft">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
            Diensten
          </span>
          <h1 className="font-sora font-extrabold text-[clamp(36px,6vw,64px)] leading-[1.02] tracking-[-0.025em] mt-4 max-w-[16ch]">
            Voor elke leerling de <span className="grad">juiste les</span>.
          </h1>
          <p className="mt-5 text-[clamp(15px,1.8vw,18px)] leading-[1.65] text-brand-ink-body max-w-[52ch]">
            Geen standaard aanpak. Geen vaste pakketten die jij maar moet volgen. We starten altijd bij jou — wie je bent, hoe je leert, en wat je doel is.
          </p>
        </div>
      </section>

      {/* Detailed service blocks */}
      <section className="py-[clamp(48px,7vw,96px)]">
        <div className="max-w-wrap mx-auto px-5 md:px-10 flex flex-col gap-[clamp(48px,7vw,96px)]">
          {services.map((svc) => (
            <div
              key={svc.id}
              id={svc.id}
              className={`grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-10 lg:gap-16 items-start ${
                svc.emphasized ? "bg-brand-blue/5 border border-brand-blue/15 rounded-brand-lg p-6 lg:p-10 -mx-6 lg:-mx-10" : ""
              }`}
            >
              {/* Label column */}
              <div>
                <span
                  className={`inline-flex items-center gap-2 font-sora font-semibold text-[11px] tracking-[0.22em] uppercase ${
                    svc.color === "blue" ? "text-brand-blue" : "text-brand-red"
                  }`}
                >
                  {svc.eyebrow}
                </span>
                <h2 className="font-sora font-extrabold text-[clamp(28px,4vw,42px)] leading-[1.08] tracking-[-0.025em] mt-3">
                  {svc.title}
                </h2>
                <p
                  className={`font-sora font-semibold text-[13px] mt-2 ${
                    svc.color === "blue" ? "text-brand-blue" : "text-brand-red"
                  }`}
                >
                  {svc.subtitle}
                </p>
                <p
                  className={
                    svc.emphasized
                      ? "mt-4 font-sora font-bold text-[17px] leading-[1.45] text-brand-ink"
                      : "mt-4 text-[14.5px] leading-relaxed text-brand-ink-soft"
                  }
                >
                  {svc.forWhom}
                </p>
                <Link
                  href="/contact"
                  className={`mt-6 inline-flex items-center gap-2 font-sora font-semibold text-[14px] rounded-full px-5 py-3 transition-all hover:-translate-y-0.5 ${
                    svc.color === "blue"
                      ? "bg-brand-blue text-white"
                      : "bg-brand-red text-white shadow-red-cta hover:shadow-red-hover"
                  }`}
                >
                  Plan een intake →
                </Link>
              </div>
              {/* Body column */}
              <div className="flex flex-col gap-4">
                {svc.body.map((p, i) => (
                  <p key={i} className="text-[16px] leading-[1.75] text-brand-ink-body">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <WhyDriveMore />
      <ContactCTA />
    </>
  );
}
