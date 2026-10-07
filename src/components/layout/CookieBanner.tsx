"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useConsent, type ConsentCategory, type ConsentChoices } from "@/contexts/ConsentContext";
import { Button } from "@/components/ui/Button";

const CATEGORIES: ConsentCategory[] = ["functional", "analytics", "marketing"];

function Toggle({ checked, disabled, onChange }: { checked: boolean; disabled?: boolean; onChange?: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={onChange}
      className={`relative w-10 h-6 rounded-full flex-shrink-0 transition-colors duration-200 ${
        checked ? "bg-brand-red" : "bg-brand-line"
      } ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
          checked ? "translate-x-4" : "translate-x-0"
        }`}
      />
    </button>
  );
}

export function CookieBanner() {
  const { t } = useLanguage();
  const { bannerOpen, consent, acceptAll, acceptNecessaryOnly, savePreferences } = useConsent();
  const [showSettings, setShowSettings] = useState(false);
  const [draft, setDraft] = useState<ConsentChoices>({ functional: false, analytics: false, marketing: false });
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (bannerOpen) {
      setDraft(consent ?? { functional: false, analytics: false, marketing: false });
      setShowSettings(false);
    }
  }, [bannerOpen, consent]);

  if (!bannerOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: reduceMotion ? 0.2 : 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 bottom-0 z-[100] p-4 sm:p-5"
      >
        <div className="max-w-wrap mx-auto bg-white border border-brand-line rounded-brand-lg shadow-card p-5 sm:p-7">
          {!showSettings ? (
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <p className="text-[13.5px] sm:text-[14px] leading-[1.6] text-brand-ink-body flex-1">
                {t.cookieBanner.text}{" "}
                <Link href="/cookiebeleid" className="underline underline-offset-2 text-brand-ink hover:text-brand-red transition-colors">
                  {t.cookieBanner.linkLabel}
                </Link>
              </p>
              <div className="flex flex-wrap gap-2.5 flex-shrink-0">
                <Button variant="secondary" size="md" onClick={() => setShowSettings(true)}>
                  {t.cookieBanner.settingsCta}
                </Button>
                <Button variant="secondary" size="md" onClick={acceptNecessaryOnly}>
                  {t.cookieBanner.necessaryOnly}
                </Button>
                <Button size="md" onClick={acceptAll}>
                  {t.cookieBanner.acceptAll}
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="font-sora font-bold text-[18px] text-brand-ink">{t.cookieBanner.settingsTitle}</h2>
              <div className="mt-4 flex flex-col divide-y divide-brand-line">
                <div className="flex items-center justify-between gap-4 py-3">
                  <div>
                    <div className="font-sora font-semibold text-[14px] text-brand-ink">
                      {t.cookieBanner.categories.necessary.label}
                    </div>
                    <p className="text-[13px] text-brand-ink-soft mt-0.5">
                      {t.cookieBanner.categories.necessary.description}
                    </p>
                  </div>
                  <span className="flex-shrink-0 text-[12px] font-sora font-semibold text-brand-ink-soft">
                    {t.cookieBanner.alwaysOn}
                  </span>
                </div>
                {CATEGORIES.map((cat) => (
                  <div key={cat} className="flex items-center justify-between gap-4 py-3">
                    <div>
                      <div className="font-sora font-semibold text-[14px] text-brand-ink">
                        {t.cookieBanner.categories[cat].label}
                      </div>
                      <p className="text-[13px] text-brand-ink-soft mt-0.5">
                        {t.cookieBanner.categories[cat].description}
                      </p>
                    </div>
                    <Toggle
                      checked={draft[cat]}
                      onChange={() => setDraft((d) => ({ ...d, [cat]: !d[cat] }))}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-2.5">
                <Button variant="secondary" size="md" onClick={() => setShowSettings(false)}>
                  {t.cookieBanner.back}
                </Button>
                <Button size="md" onClick={() => savePreferences(draft)}>
                  {t.cookieBanner.save}
                </Button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
