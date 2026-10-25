import { BUSINESS } from "@/lib/config/business";
import { CITIES } from "@/lib/config/cities";
import { EXTRA_COSTS } from "@/lib/config/extraCosts";
import { ACTIE, GRATIS_HEREXAMEN, getLesprijs, type LesautoType } from "@/lib/config/offers";
import { SPOED_TOESLAG } from "@/lib/config/pricing";
import { GRATIS_THEORIE } from "@/lib/config/theory";
import { nl } from "@/lib/i18n/nl";
import { SITE_URL } from "@/lib/seo";
import { CONTACT, formatPrice } from "@/lib/utils";

// /llms.txt — platte-tekstsamenvatting voor AI-zoekmachines (llmstxt.org). Alles wordt
// opgebouwd uit dezelfde config als de site, dus prijzen en acties lopen nooit uit de pas.
// Dagelijks opnieuw opgebouwd zodat een verlopen actie vanzelf verdwijnt.
export const revalidate = 86400;

// Bedragen met centen (bijv. € 44,50) altijd met twee decimalen.
const eur = (n: number) =>
  n % 1 === 0 ? formatPrice(n) : new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(n);

export function GET() {
  const losseLes = (type: LesautoType) => {
    const { prijs, oudePrijs } = getLesprijs(type);
    return oudePrijs !== undefined
      ? `${formatPrice(prijs)} per les (actie t/m ${ACTIE.actieEinddatum.toLocaleDateString("nl-NL")}, normaal ${formatPrice(oudePrijs)})`
      : `${formatPrice(prijs)} per les`;
  };

  const lines = [
    `# ${BUSINESS.name}`,
    "",
    `> ${BUSINESS.name} is een rijschool in ${BUSINESS.addressLocality} (Nederland) voor rijbewijs B. Persoonlijke rijlessen in schakel en automaat, met één vaste instructeur, een persoonlijk lesplan en geen wachtlijst. Daarnaast een spoedcursus, faalangstbegeleiding en theorietraining.`,
    "",
    "## Kerngegevens",
    `- Adres: ${BUSINESS.streetAddress}, ${BUSINESS.postalCode} ${BUSINESS.addressLocality}`,
    `- Telefoon en WhatsApp: +31${CONTACT.phone.slice(1)} (${CONTACT.phoneDisplay})`,
    `- E-mail: ${CONTACT.email}`,
    "- Telefonisch bereikbaar: maandag t/m vrijdag 09:00–17:00 (via WhatsApp ook daarbuiten)",
    `- KvK: ${BUSINESS.kvk}`,
    `- Werkgebied: ${CITIES.map((c) => c.name).join(", ")}`,
    "- Lesauto's: Volkswagen Golf 8 (schakel) en Cupra Formentor (automaat)",
    "",
    "## Diensten",
    "- Rijlessen op maat (schakel of automaat), lessen van 45 of 90 minuten, start altijd met een intake",
    `- Spoedcursus: compact, intensief traject met lessen, tussentijdse toets en examen kort achter elkaar (spoedtoeslag ${formatPrice(SPOED_TOESLAG)} bovenop de pakketprijs)`,
    "- Faalangstbegeleiding: rustig opbouwen van zelfvertrouwen achter het stuur en voor het examen",
    GRATIS_THEORIE
      ? "- Gratis theorie: uitlegvideo's en 50 oefenexamens"
      : "- Theorietraining: uitlegvideo's en 50 oefenexamens",
    "",
    "## Prijzen (incl. btw)",
    `- Intake (1 uur): ${nl.packages.intakeNoteText.replace(/^Intake /, "")}`,
    `- Losse rijles schakel: ${losseLes("schakel")}`,
    `- Losse rijles automaat: ${losseLes("automaat")}`,
    ...nl.packages.items.map((p) => `- ${p.name}: ${p.lessons} — ${formatPrice(p.price)}`),
    GRATIS_HEREXAMEN ? "- Bij alle pakketten: gratis herexamen als je zakt" : "",
    `- Inschrijfkosten Drive More: ${formatPrice(EXTRA_COSTS.driveMore.inschrijfkosten)}`,
    `- CBR-kosten (los van het pakket): praktijkexamen ${eur(EXTRA_COSTS.cbr.rijexamen)}, theorie-examen ${eur(EXTRA_COSTS.cbr.theorieExamen)}, medische verklaring ${eur(EXTRA_COSTS.cbr.medischeVerklaring)}`,
    "",
    "## Veelgestelde vragen",
    ...nl.faq.items.flatMap((item) => [`### ${item.q}`, item.a, ""]),
    "## Pagina's",
    `- [Home](${SITE_URL}/)`,
    `- [Spoedcursus](${SITE_URL}/spoedcursus)`,
    `- [Rijlespakketten en prijzen](${SITE_URL}/rijlespakketten)`,
    `- [Diensten](${SITE_URL}/diensten)`,
    `- [Over ons](${SITE_URL}/over-ons)`,
    `- [Contact en intake plannen](${SITE_URL}/contact)`,
    ...CITIES.map((c) => `- [Rijschool ${c.name}](${SITE_URL}/rijschool-${c.slug})`),
    "",
  ];

  return new Response(lines.filter((l, i, arr) => !(l === "" && arr[i - 1] === "")).join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
