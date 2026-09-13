"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { CountUp } from "@/components/ui/CountUp";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { STATS_VALUES } from "@/lib/config/stats";

const ICONS = [
  // Trophy — eerste keer geslaagd
  <svg key="i1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8 4h8v5a4 4 0 0 1-8 0V4z" />
    <path d="M8 5H5a3 3 0 0 0 3 5M16 5h3a3 3 0 0 1-3 5" />
    <path d="M12 13v3M9 20h6M9 20l.5-2h5l.5 2" />
  </svg>,
  // Road — km lesweg
  <svg key="i2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 4 5 20M15 4l4 16M12 8v2M12 14v2" />
  </svg>,
  // Star — beoordeling
  <svg key="i3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round">
    <path d="M12 3.5l2.6 5.4 5.9.8-4.3 4.2 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.2 5.9-.8z" />
  </svg>,
  // Target — maatwerk
  <svg key="i4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="12" cy="12" r="0.6" fill="currentColor" />
  </svg>,
];

export function Stats() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const stats = [
    { ...t.stats.s1, value: STATS_VALUES.s1, color: "text-[#ff6b73]" },
    { ...t.stats.s2, value: STATS_VALUES.s2, color: "text-white" },
    { ...t.stats.s3, value: STATS_VALUES.s3, color: "text-[#6f97ff]", decimal: true },
    { ...t.stats.s4, value: STATS_VALUES.s4, color: "text-white" },
  ];

  return (
    <section className="bg-brand-ink text-white">
      <div
        ref={ref}
        className="max-w-wrap mx-auto px-5 md:px-10 py-14 md:py-16 grid grid-cols-2 md:grid-cols-4 gap-8"
      >
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center text-center md:items-start md:text-left"
          >
            <div className={`rounded-blob bg-white/10 w-12 h-12 grid place-items-center mb-3 ${stat.color}`}>
              <div className="w-[22px] h-[22px]">{ICONS[i]}</div>
            </div>
            <div className={`font-sora font-extrabold text-[clamp(28px,4vw,40px)] leading-none ${stat.color}`}>
              <CountUp
                target={stat.value as number}
                suffix={stat.suffix}
                decimal={"decimal" in stat ? (stat.decimal as boolean) : false}
              />
            </div>
            <span className="text-[#9aa6bd] text-[13.5px] mt-1.5 block font-inter">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
