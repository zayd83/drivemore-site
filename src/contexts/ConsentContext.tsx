"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type ConsentCategory = "functional" | "analytics" | "marketing";

export interface ConsentChoices {
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

interface StoredConsent extends ConsentChoices {
  necessary: true;
  decidedAt: string;
}

const STORAGE_KEY = "dm_cookie_consent";
const ALL_ON: ConsentChoices = { functional: true, analytics: true, marketing: true };
const ALL_OFF: ConsentChoices = { functional: false, analytics: false, marketing: false };

interface ConsentContextValue {
  /** null = bezoeker heeft nog geen keuze gemaakt. */
  consent: ConsentChoices | null;
  /** false tot localStorage is uitgelezen — andere componenten (zoals TrustToast) moeten hierop
      wachten voor ze beslissen of ze zichzelf mogen tonen, anders ontstaat een mount-order race. */
  ready: boolean;
  /** Banner moet getoond worden: geen keuze gemaakt, of handmatig heropend via "Instellingen". */
  bannerOpen: boolean;
  acceptAll: () => void;
  acceptNecessaryOnly: () => void;
  savePreferences: (choices: ConsentChoices) => void;
  openSettings: () => void;
  closeBanner: () => void;
  /** Helper voor later: of een categorie momenteel toestemming heeft (necessary is altijd true). */
  hasConsent: (category: ConsentCategory | "necessary") => boolean;
}

const ConsentContext = createContext<ConsentContextValue>({
  consent: null,
  ready: false,
  bannerOpen: false,
  acceptAll: () => {},
  acceptNecessaryOnly: () => {},
  savePreferences: () => {},
  openSettings: () => {},
  closeBanner: () => {},
  hasConsent: () => false,
});

function readStoredConsent(): ConsentChoices | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredConsent;
    return { functional: !!parsed.functional, analytics: !!parsed.analytics, marketing: !!parsed.marketing };
  } catch {
    return null;
  }
}

function writeStoredConsent(choices: ConsentChoices) {
  try {
    const toStore: StoredConsent = { necessary: true, ...choices, decidedAt: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
  } catch {
    // Privacy-modus/storage geblokkeerd — keuze geldt dan alleen voor dit bezoek (banner komt
    // bij een volgend bezoek gewoon opnieuw, wat hier de veiligste/eerlijkste fallback is.
  }
}

export function ConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<ConsentChoices | null>(null);
  const [bannerOpen, setBannerOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = readStoredConsent();
    setConsent(stored);
    setBannerOpen(stored === null);
    setHydrated(true);
  }, []);

  const decide = useCallback((choices: ConsentChoices) => {
    writeStoredConsent(choices);
    setConsent(choices);
    setBannerOpen(false);
  }, []);

  const acceptAll = useCallback(() => decide(ALL_ON), [decide]);
  const acceptNecessaryOnly = useCallback(() => decide(ALL_OFF), [decide]);
  const savePreferences = useCallback((choices: ConsentChoices) => decide(choices), [decide]);
  const openSettings = useCallback(() => setBannerOpen(true), []);
  const closeBanner = useCallback(() => setBannerOpen(false), []);

  const hasConsent = useCallback(
    (category: ConsentCategory | "necessary") => {
      if (category === "necessary") return true;
      return consent?.[category] ?? false;
    },
    [consent]
  );

  // Vóór hydratie (en dus vóór we weten of er al een keuze is) nooit de banner tonen — voorkomt
  // een flits van de banner voor bezoekers die al eerder een keuze maakten.
  return (
    <ConsentContext.Provider
      value={{
        consent,
        ready: hydrated,
        bannerOpen: hydrated && bannerOpen,
        acceptAll,
        acceptNecessaryOnly,
        savePreferences,
        openSettings,
        closeBanner,
        hasConsent,
      }}
    >
      {children}
    </ConsentContext.Provider>
  );
}

export function useConsent() {
  return useContext(ConsentContext);
}
