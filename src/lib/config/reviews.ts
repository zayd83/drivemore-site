// Zet op true zodra er echte reviews in REVIEWS staan — verbergt tot die tijd de hele
// reviews-sectie op alle pagina's. Nooit verzonnen reviews tonen in productie.
export const SHOW_REVIEWS = false;

export interface Review {
  /** Voornaam (of "Voornaam A."-vorm) — geen volledige naam i.v.m. privacy. */
  authorName: string;
  /** 1-5 */
  rating: number;
  text: string;
  /** Waar de review vandaan komt — later "google" zodra de API-koppeling er is. */
  source: "manual" | "google";
}

// VUL IN: vervang door echte reviews (handmatig ingevoerd, of straks automatisch gevuld
// vanuit de Google Places API — die levert vergelijkbare velden: author_name, rating, text).
// De vorm hier (authorName/rating/text/source) is bewust al zo gekozen dat een Google-koppeling
// later alleen deze array hoeft te vervangen — de rest van de site hoeft niet te wijzigen.
export const REVIEWS: Review[] = [
  { authorName: "Voornaam", rating: 5, text: "Voorbeeldtekst — vervang door een echte review.", source: "manual" },
  { authorName: "Voornaam", rating: 5, text: "Voorbeeldtekst — vervang door een echte review.", source: "manual" },
  { authorName: "Voornaam", rating: 5, text: "Voorbeeldtekst — vervang door een echte review.", source: "manual" },
];

// VUL IN: link naar het volledige overzicht (bijv. het Google Bedrijfsprofiel) zodra bekend.
export const REVIEWS_LINK = "#";
