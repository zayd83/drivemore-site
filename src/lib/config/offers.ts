// BEVESTIGD door de klant (2026-10-04): een herexamen na zakken is écht gratis.
// Bij UIT tonen de pakketten "Examenbegeleiding" in plaats van "Gratis herexamen".
export const GRATIS_HEREXAMEN = true;

// Actie op de losse-lesprijs. BEVESTIGD door de klant (2026-10-24): actie verlengd t/m 30-11-2026
// (eind november 2026). Gebruik isActieZichtbaar() in componenten (nooit ACTIE_ACTIEF rechtstreeks)
// — die verbergt de actie vanzelf zodra actieEinddatum verstreken is, zonder dat er iets in code
// hoeft te wijzigen.
export const ACTIE_ACTIEF = true;

export const ACTIE = {
  actieEinddatum: new Date("2026-11-30T23:59:59"),
};

// Losse-lesprijs per lesauto. BEVESTIGD door de klant (2026-10-25): schakel €60 → €53,
// automaat €72 → €65 tijdens de actie. `actie` geldt alleen zolang isActieZichtbaar() true is.
export const LESPRIJZEN = {
  schakel: { normaal: 60, actie: 53 },
  automaat: { normaal: 72, actie: 65 },
};

export type LesautoType = keyof typeof LESPRIJZEN;

/** Prijs die nu geldt, plus de doorgestreepte normale prijs zolang de actie loopt. */
export function getLesprijs(type: LesautoType): { prijs: number; oudePrijs?: number } {
  const { normaal, actie } = LESPRIJZEN[type];
  return isActieZichtbaar() ? { prijs: actie, oudePrijs: normaal } : { prijs: normaal };
}

// Eigen functie i.p.v. een module-scope constante: Date.now() moet bij elke render opnieuw
// worden geëvalueerd (ook in een lang draaiend serverproces), anders bevriest de uitkomst op het
// moment dat de server is gestart. PackagesPreview is een client component, dus deze check draait
// ook live in de browser bij hydratie — na de einddatum corrigeert de pagina zichzelf uiterlijk
// bij het laden, zelfs als een eerdere statische build de actie nog "actief" liet zien.
export function isActieZichtbaar(): boolean {
  if (!ACTIE_ACTIEF) return false;
  if (!ACTIE.actieEinddatum) return true;
  return Date.now() <= ACTIE.actieEinddatum.getTime();
}
