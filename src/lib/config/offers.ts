// BEVESTIGD door de klant (2026-10-04): een herexamen na zakken is écht gratis.
// Bij UIT tonen de pakketten "Examenbegeleiding" in plaats van "Gratis herexamen".
export const GRATIS_HEREXAMEN = true;

// Actie op de losse-lesprijs. BEVESTIGD door de klant (2026-10-06): actie loopt t/m 31-10-2026
// (eind oktober 2026). Gebruik isActieZichtbaar() in componenten (nooit ACTIE_ACTIEF rechtstreeks)
// — die verbergt de actie vanzelf zodra actieEinddatum verstreken is, zonder dat er iets in code
// hoeft te wijzigen.
export const ACTIE_ACTIEF = true;

export const ACTIE = {
  normalePrijsPerLes: 60,
  actiePrijsPerLes: 53,
  actieEinddatum: new Date("2026-10-31T23:59:59"),
};

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
