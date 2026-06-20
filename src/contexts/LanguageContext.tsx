"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { nl, en, type Dictionary } from "@/lib/i18n";

type Lang = "nl" | "en";

interface LanguageContextValue {
  lang: Lang;
  t: Dictionary;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: "nl",
  t: nl,
  toggleLang: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("nl");

  const toggleLang = useCallback(() => {
    setLang((l) => (l === "nl" ? "en" : "nl"));
  }, []);

  const t = lang === "nl" ? nl : en;

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
