"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { IconBlob } from "@/components/ui/IconBlob";
import { TRUST_BAR_ITEMS, type TrustBarIcon } from "@/lib/config/trustBar";
import { SHOW_GOOGLE_REVIEW, GOOGLE_RATING, GOOGLE_REVIEW_COUNT } from "@/lib/config/googleReview";

const ICONS: Record<TrustBarIcon, React.ReactNode> = {
  calendar: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 2v4M16 2v4" />
    </svg>
  ),
  bolt: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2 4 14h6l-1 8 9-12h-6z" />
    </svg>
  ),
  person: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="3.4" />
      <path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6" />
    </svg>
  ),
  car: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 11l1.4-4.2A2 2 0 0 1 8.3 5.5h7.4a2 2 0 0 1 1.9 1.3L19 11" />
      <rect x="3" y="11" width="18" height="6" rx="2" />
      <circle cx="7.5" cy="17.5" r="1.6" />
      <circle cx="16.5" cy="17.5" r="1.6" />
    </svg>
  ),
};

export function TrustBar() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const items = TRUST_BAR_ITEMS.filter((item) => item.enabled);
  if (items.length === 0 && !SHOW_GOOGLE_REVIEW) return null;

  return (
    <section className="bg-white border-b border-brand-line">
      <div ref={ref} className="max-w-wrap mx-auto px-5 md:px-10 py-6 md:py-7">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-5">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-2.5"
            >
              <IconBlob icon={ICONS[item.icon]} color={i % 2 === 0 ? "red" : "blue"} size="sm" />
              <span className="font-sora font-bold text-[13px] sm:text-[14px] leading-snug text-brand-ink">
                {t.trustBar[item.id]}
              </span>
            </motion.div>
          ))}
        </div>

        {SHOW_GOOGLE_REVIEW && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="mt-5 pt-5 border-t border-brand-line flex justify-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-light px-4 py-2">
              <span className="text-[#f5b301] text-[13px] tracking-widest">★★★★★</span>
              <span className="font-sora font-bold text-[13px] text-brand-ink">{GOOGLE_RATING}</span>
              <span className="font-inter text-[12px] text-brand-ink-soft">
                ({GOOGLE_REVIEW_COUNT}) {t.trustBar.googleReviewSuffix}
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
