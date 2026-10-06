"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { IconBlob } from "@/components/ui/IconBlob";
import { Button } from "@/components/ui/Button";

const ICONS = {
  gear: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
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
  bolt: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2 4 14h6l-1 8 9-12h-6z" />
    </svg>
  ),
};

export function TrainingChoice() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-[clamp(48px,7vw,84px)] bg-brand-light">
      <div className="max-w-wrap mx-auto px-5 md:px-10">
        <motion.div
          className="max-w-[600px] mb-[clamp(28px,4vw,44px)]"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          <span className="inline-flex items-center gap-2 font-sora font-semibold text-[11px] tracking-[0.22em] uppercase text-brand-ink-soft">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
            {t.trainingChoice.eyebrow}
          </span>
          <h2 className="font-sora font-extrabold text-[clamp(26px,4.5vw,42px)] leading-[1.1] tracking-[-0.025em] mt-3">
            {t.trainingChoice.heading}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          {t.trainingChoice.items.map((item, i) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`relative flex flex-col h-full bg-white rounded-brand-lg p-6 group hover:-translate-y-1 hover:shadow-card transition-all duration-300 ${
                item.featured ? "border-2 border-brand-red/30" : "border border-brand-line"
              }`}
            >
              {item.featured && (
                <span className="absolute -top-3 left-6 font-sora font-bold text-[10.5px] tracking-[0.12em] uppercase text-white bg-brand-red px-3 py-1 rounded-full">
                  {t.trainingChoice.featuredBadge}
                </span>
              )}
              <IconBlob icon={ICONS[item.icon]} color={item.color} size="sm" className="mb-4" />
              <h3 className="font-sora font-bold text-[19px] tracking-[-0.01em] text-brand-ink">
                {item.title}
              </h3>
              <p className="mt-2 text-[14px] leading-[1.6] text-brand-ink-body flex-1">
                {item.description}
              </p>
              <Button href={item.href} className="mt-4 w-full">
                {item.linkLabel}
              </Button>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
