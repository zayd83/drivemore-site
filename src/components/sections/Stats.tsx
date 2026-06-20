"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { CountUp } from "@/components/ui/CountUp";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export function Stats() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const stats = [
    { ...t.stats.s1, color: "text-[#ff6b73]" },
    { ...t.stats.s2, color: "text-white" },
    { ...t.stats.s3, color: "text-[#6f97ff]", decimal: true },
    { ...t.stats.s4, color: "text-white" },
  ];

  return (
    <section className="bg-brand-ink text-white">
      <div
        ref={ref}
        className="max-w-wrap mx-auto px-5 md:px-10 py-12 grid grid-cols-2 md:grid-cols-4 gap-8"
      >
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
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
