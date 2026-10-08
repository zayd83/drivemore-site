"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { useConsent } from "@/contexts/ConsentContext";
import { SHOW_TRUST_TOAST } from "@/lib/config/trustToast";
import { SIGNUP_NAMES } from "@/lib/config/signupPopup";
import { CITIES } from "@/lib/config/cities";

const SHOW_DELAY_MS = 1000; // bijna direct bij het openen van de site, niet pas na enkele seconden
const AUTO_DISMISS_MS = 9000;

function pickRandom<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function TrustToast() {
  const { t } = useLanguage();
  const { ready: consentReady, bannerOpen: cookieBannerOpen } = useConsent();
  const [visible, setVisible] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!SHOW_TRUST_TOAST) return;
    // Wacht tot de cookiekeuze bekend/gemaakt is — anders vechten twee popups om aandacht bij
    // het eerste bezoek. `consentReady` voorkomt een mount-order race met ConsentProvider.
    if (!consentReady || cookieBannerOpen) return;

    const name = pickRandom(SIGNUP_NAMES);
    const city = pickRandom(CITIES).name;
    const time = pickRandom(t.trustToast.timePhrases);
    const text = t.trustToast.signupTemplate
      .replace("{name}", name)
      .replace("{city}", city)
      .replace("{time}", time);
    setMessage(text);

    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    const showTimer = setTimeout(() => setVisible(true), SHOW_DELAY_MS);

    return () => clearTimeout(showTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [consentReady, cookieBannerOpen]);

  useEffect(() => {
    if (!visible) return;
    const dismissTimer = setTimeout(() => setVisible(false), AUTO_DISMISS_MS);
    return () => clearTimeout(dismissTimer);
  }, [visible]);

  if (!SHOW_TRUST_TOAST || !message) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: reduceMotion ? 0.25 : 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed z-50 left-4 right-4 bottom-[100px] sm:left-auto sm:max-w-[340px] lg:bottom-6"
        >
          <div className="relative bg-white border border-brand-line rounded-brand-lg shadow-card p-4 pr-10">
            <Link
              href="/contact"
              onClick={() => setVisible(false)}
              className="flex items-start gap-3 group"
            >
              <span className="flex-shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-brand-red to-brand-blue grid place-items-center mt-0.5">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 11l1.4-4.2A2 2 0 0 1 8.3 5.5h7.4a2 2 0 0 1 1.9 1.3L19 11" />
                  <rect x="3" y="11" width="18" height="6" rx="2" />
                  <circle cx="7.5" cy="17.5" r="1.6" />
                  <circle cx="16.5" cy="17.5" r="1.6" />
                </svg>
              </span>
              <span className="text-[13.5px] leading-[1.45] font-medium text-brand-ink group-hover:text-brand-red transition-colors pt-1">
                {message}
              </span>
            </Link>
            <button
              type="button"
              aria-label={t.trustToast.closeLabel}
              onClick={() => setVisible(false)}
              className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full grid place-items-center text-brand-ink-soft hover:bg-brand-light hover:text-brand-ink transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M1 1l10 10M11 1L1 11" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
