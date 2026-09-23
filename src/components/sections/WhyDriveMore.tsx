"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { IconBlob } from "@/components/ui/IconBlob";
import { WaveDivider } from "@/components/ui/WaveDivider";

const ICONS = {
  person: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="3.4" />
      <path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6" />
    </svg>
  ),
  clipboard: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 3h6a1 1 0 0 1 1 1v1H8V4a1 1 0 0 1 1-1z" />
      <path d="M8 11h8M8 15h5" />
    </svg>
  ),
  calendar: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 2v4M16 2v4" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.5 4.5 5.5v5.5c0 4.6 3.2 7.5 7.5 8.5 4.3-1 7.5-3.9 7.5-8.5V5.5z" />
      <path d="M9 11.5 11.2 13.7 15.3 9" />
    </svg>
  ),
};

export function WhyDriveMore() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-[clamp(56px,8vw,100px)] bg-brand-light overflow-hidden">
      <WaveDivider fill="#ffffff" flip />
      <div className="max-w-wrap mx-auto px-5 md:px-10 relative z-[2]">
        <motion.div
          ref={ref}
          className="max-w-[600px] mx-auto text-center mb-10"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 font-sora font-semibold text-[11px] tracking-[0.22em] uppercase text-brand-ink-soft">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
            {t.why.eyebrow}
          </span>
          <h2 className="font-sora font-extrabold text-[clamp(28px,5vw,48px)] leading-[1.05] tracking-[-0.025em] mt-4">
            {t.why.heading1}{" "}
            <span className="grad">{t.why.headingAccent}</span>{" "}
            {t.why.heading2}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {t.why.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.08 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white border border-brand-line rounded-brand-lg p-6 hover:-translate-y-1 hover:shadow-card transition-all duration-300"
            >
              <IconBlob icon={ICONS[item.icon]} color={item.color} size="sm" className="mb-4" />
              <h3 className="font-sora font-bold text-[16px] tracking-[-0.01em] text-brand-ink">
                {item.title}
              </h3>
              <p className="mt-1.5 text-[13.5px] leading-[1.5] text-brand-ink-body">
                {item.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
