export type TrustBarIcon = "calendar" | "bolt" | "person" | "car";

export interface TrustBarItemConfig {
  id: "experience" | "noWaitlist" | "personalGuidance" | "manualAutomatic";
  enabled: boolean;
  icon: TrustBarIcon;
}

// Zet `enabled` op false om een USP tijdelijk te verbergen — geen codewijziging elders nodig.
// Tekst per taal staat in src/lib/i18n/nl.ts en en.ts onder `trustBar`.
export const TRUST_BAR_ITEMS: TrustBarItemConfig[] = [
  { id: "experience", enabled: true, icon: "calendar" },
  { id: "noWaitlist", enabled: true, icon: "bolt" },
  { id: "personalGuidance", enabled: true, icon: "person" },
  { id: "manualAutomatic", enabled: true, icon: "car" },
];
