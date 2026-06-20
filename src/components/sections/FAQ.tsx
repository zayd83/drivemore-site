"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export function FAQ() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-[clamp(60px,9vw,118px)]">
      <div className="max-w-wrap mx-auto px-5 md:px-10">
        <motion.div
          ref={ref}
          className="max-w-[660px] mx-auto text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 font-sora font-semibold text-[11px] tracking-[0.22em] uppercase text-brand-ink-soft">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
            {t.faq.eyebrow}
          </span>
          <h2 className="font-sora font-extrabold text-[clamp(30px,5.2vw,52px)] leading-[1.05] tracking-[-0.025em] mt-4">
            {t.faq.heading1}{" "}
            <span className="grad">{t.faq.headingAccent}</span>.
          </h2>
        </motion.div>

        <div className="max-w-[820px] mx-auto">
          {t.faq.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.07 }}
              className="border-b border-brand-line"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 py-5 px-1 text-left group"
                aria-expanded={openIndex === i}
              >
                <span className="font-sora font-bold text-[clamp(16px,2.2vw,19px)] text-brand-ink group-hover:text-brand-red transition-colors">
                  {item.q}
                </span>
                <span
                  className={`flex-shrink-0 w-[26px] h-[26px] rounded-full border border-brand-line grid place-items-center relative transition-all ${
                    openIndex === i ? "bg-brand-red border-brand-red" : ""
                  }`}
                >
                  <span
                    className={`absolute w-[11px] h-[2px] rounded-full transition-colors ${
                      openIndex === i ? "bg-white" : "bg-brand-ink"
                    }`}
                  />
                  <span
                    className={`absolute w-[2px] h-[11px] rounded-full transition-all ${
                      openIndex === i ? "bg-white scale-y-0" : "bg-brand-ink"
                    }`}
                  />
                </span>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 px-1 text-[15px] leading-[1.65] text-brand-ink-body">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
