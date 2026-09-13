"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { IconBlob } from "@/components/ui/IconBlob";
import { WaveDivider } from "@/components/ui/WaveDivider";

const ICONS = {
  red: [
    // Location pin
    <svg key="r1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21s-7-4.4-7-10a7 7 0 0 1 14 0c0 5.6-7 10-7 10z" />
      <circle cx="12" cy="11" r="2.5" />
    </svg>,
    // Calendar
    <svg key="r2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 2v4M16 2v4" />
    </svg>,
  ],
  blue: [
    // Target / check
    <svg key="b1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a9 9 0 1 0 9 9" />
      <path d="M21 5l-9 9-3-3" />
    </svg>,
  ],
};

export function WhyDriveMore() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const iconList = [ICONS.red[0], ICONS.blue[0], ICONS.red[1]];

  return (
    <section className="relative py-[clamp(64px,9vw,124px)] bg-brand-light overflow-hidden">
      <WaveDivider fill="#ffffff" flip />
      <div className="max-w-wrap mx-auto px-5 md:px-10 relative z-[2]">
        <motion.div
          ref={ref}
          className="max-w-[600px] mx-auto text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 font-sora font-semibold text-[11px] tracking-[0.22em] uppercase text-brand-ink-soft">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
            {t.why.eyebrow}
          </span>
          <h2 className="font-sora font-extrabold text-[clamp(30px,5.2vw,52px)] leading-[1.05] tracking-[-0.025em] mt-4">
            {t.why.heading1}{" "}
            <span className="grad">{t.why.headingAccent}</span>{" "}
            {t.why.heading2}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.why.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white border border-brand-line rounded-brand-lg p-8 hover:-translate-y-1.5 hover:shadow-card transition-all duration-300"
            >
              <IconBlob icon={iconList[i]} color={item.color} size="md" className="mb-5" />
              <h3 className="font-sora font-bold text-[21px] tracking-[-0.01em] text-brand-ink">
                {item.title}
              </h3>
              <p className="mt-3 text-[14.5px] leading-[1.65] text-brand-ink-body">
                {item.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
