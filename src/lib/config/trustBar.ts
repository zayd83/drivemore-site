export type TrustBarIcon = "bolt" | "globe";

export interface TrustBarItemConfig {
  id: "noWaitlist" | "bilingual";
  enabled: boolean;
  icon: TrustBarIcon;
}

// Zet `enabled` op false om een USP tijdelijk te verbergen — geen codewijziging elders nodig.
// Tekst per taal staat in src/lib/i18n/nl.ts en en.ts onder `trustBar`.
export const TRUST_BAR_ITEMS: TrustBarItemConfig[] = [
  { id: "noWaitlist", enabled: true, icon: "bolt" },
  { id: "bilingual", enabled: true, icon: "globe" },
];
