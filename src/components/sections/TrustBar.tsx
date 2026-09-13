"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { IconBlob } from "@/components/ui/IconBlob";
import { TRUST_BAR_ITEMS, type TrustBarIcon } from "@/lib/config/trustBar";

const ICONS: Record<TrustBarIcon, React.ReactNode> = {
  bolt: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2 4 14h6l-1 8 9-12h-6z" />
    </svg>
  ),
  globe: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 3.8 5.6 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.6-3.8-9s1.3-6.5 3.8-9z" />
    </svg>
  ),
};

export function TrustBar() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const items = TRUST_BAR_ITEMS.filter((item) => item.enabled);
  if (items.length === 0) return null;

  return (
    <section className="bg-white border-b border-brand-line">
      <div
        ref={ref}
        className="max-w-wrap mx-auto px-5 md:px-10 py-7 md:py-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-5"
      >
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-3.5"
          >
            <IconBlob icon={ICONS[item.icon]} color={i % 2 === 0 ? "red" : "blue"} size="sm" />
            <span className="font-sora font-bold text-[15px] leading-snug text-brand-ink">
              {t.trustBar[item.id]}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
