// Zet op true zodra de klant bevestigt dat een herexamen na zakken écht gratis is.
// Bij UIT (default) tonen de pakketten "Examenbegeleiding" in plaats van "Gratis herexamen".
export const GRATIS_HEREXAMEN = false;

// Actie op de losse-lesprijs. Zet op true + vul ACTIE hieronder in zodra de klant een tijdelijke
// actieprijs bevestigt. Bij UIT (default) tonen we alleen de nette losse-lesprijs, zonder
// van-prijs, korting of einddatum.
export const ACTIE_ACTIEF = false;

export const ACTIE = {
  normalePrijsPerLes: 60,
  actiePrijsPerLes: 53,
  // VUL IN: echte einddatum van de actie zodra bevestigd, bijv. new Date("2026-09-30").
  actieEinddatum: null as Date | null,
};
