"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { IconBlob } from "@/components/ui/IconBlob";

const ICONS = {
  rijlessen: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="2.4" />
      <path d="M12 3.6v6M4.2 16.2l5.5-3.1M19.8 16.2l-5.5-3.1" />
    </svg>
  ),
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
    <section className="py-[clamp(60px,9vw,118px)]" id="diensten">
      <div className="max-w-wrap mx-auto px-5 md:px-10">
        {/* Header */}
        <motion.div
          className="max-w-[660px] mb-[clamp(36px,5vw,56px)]"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          ref={ref}
        >
          <span className="inline-flex items-center gap-2 font-sora font-semibold text-[11px] tracking-[0.22em] uppercase text-brand-ink-soft">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
            {t.services.eyebrow}
          </span>
          <h2 className="font-sora font-extrabold text-[clamp(30px,5.2vw,52px)] leading-[1.05] tracking-[-0.025em] mt-4">
            {t.services.heading1}{" "}
            <span className="grad">{t.services.headingAccent}</span>.
          </h2>
          <p className="mt-4 text-[clamp(15px,1.8vw,17px)] leading-[1.65] text-brand-ink-body">
            {t.services.lead}
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {t.services.items.map((item, i) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`rounded-brand-lg p-7 group hover:-translate-y-1 transition-all duration-300 ${
                item.emphasized
                  ? "bg-brand-blue/5 border border-brand-blue/20 hover:shadow-card"
                  : "bg-white border border-brand-line hover:shadow-card hover:border-brand-ink/15"
              }`}
            >
              <IconBlob icon={ICONS[item.id as keyof typeof ICONS]} color={item.color} size="md" className="mb-5" />
              <h3 className="font-sora font-bold text-[21px] tracking-[-0.01em] text-brand-ink">
                {item.name}
              </h3>
              <p className="font-sora font-semibold text-[12px] text-brand-ink-soft mt-0.5">
                {item.subtitle}
              </p>
              <p className="mt-3 text-[14.5px] leading-[1.65] text-brand-ink-body">
                {item.description}
              </p>
              <p
                className={
                  item.emphasized
                    ? "mt-3 font-sora font-bold text-[15px] leading-[1.5] text-brand-ink"
                    : "mt-3 text-[13.5px] leading-[1.5] text-brand-ink-soft"
                }
              >
                {item.forWhom}
              </p>
              <Link
                href={item.link}
                className="inline-flex items-center gap-2 mt-4 font-sora font-semibold text-[14px] text-brand-ink group-hover:text-brand-red transition-colors"
              >
                {item.linkLabel}
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
