"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { IconBlob } from "@/components/ui/IconBlob";
import { Button } from "@/components/ui/Button";

const ICONS = {
  spoedcursus: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2 4 14h6l-1 8 9-12h-6z" />
    </svg>
  ),
  faalangst: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.5 4.5 5.5v5.5c0 4.6 3.2 7.5 7.5 8.5 4.3-1 7.5-3.9 7.5-8.5V5.5z" />
      <path d="M9 11.5 11.2 13.7 15.3 9" />
    </svg>
  ),
  theorie: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z" />
      <path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20" />
      <path d="M8 8h8M8 11.5h5" />
    </svg>
  ),
};

export function ServicesPreview() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-[clamp(48px,7vw,88px)]" id="diensten">
      <div className="max-w-wrap mx-auto px-5 md:px-10">
        {/* Header */}
        <motion.div
          className="max-w-[600px] mb-8"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          <span className="inline-flex items-center gap-2 font-sora font-semibold text-[11px] tracking-[0.22em] uppercase text-brand-ink-soft">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
            {t.services.eyebrow}
          </span>
          <h2 className="font-sora font-extrabold text-[clamp(26px,4.5vw,42px)] leading-[1.08] tracking-[-0.025em] mt-3">
            {t.services.heading1}{" "}
            <span className="grad">{t.services.headingAccent}</span>.
          </h2>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 items-stretch">
          {t.services.items.map((item, i) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col h-full bg-white border border-brand-line rounded-brand-lg p-6 group hover:-translate-y-1 hover:shadow-card hover:border-brand-ink/15 transition-all duration-300"
            >
              <IconBlob icon={ICONS[item.id as keyof typeof ICONS]} color={item.color} size="sm" className="mb-4" />
              <h3 className="font-sora font-bold text-[17px] tracking-[-0.01em] text-brand-ink">
                {item.name}
              </h3>
              <p className="mt-1.5 text-[13.5px] leading-[1.5] text-brand-ink-body flex-1">
                {item.description}
              </p>
              <Button href={item.link} size="md" className="mt-4 w-full">
                {item.linkLabel}
              </Button>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
