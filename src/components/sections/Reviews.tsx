"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export function Reviews() {
  const { t } = useLanguage();
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
            {t.reviews.eyebrow}
          </span>
          <h2 className="font-sora font-extrabold text-[clamp(30px,5.2vw,52px)] leading-[1.05] tracking-[-0.025em] mt-4">
            {t.reviews.heading1}{" "}
            <span className="grad">{t.reviews.headingAccent}</span>{" "}
            {t.reviews.heading2}
          </h2>
          <p className="mt-4 text-[clamp(15px,1.8vw,17px)] leading-[1.65] text-brand-ink-body">
            {t.reviews.lead}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.reviews.items.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white border border-brand-line rounded-brand-lg p-7 flex flex-col hover:-translate-y-1 hover:shadow-card transition-all duration-300"
            >
              {/* Stars */}
              <div className="text-[#f5b301] text-[15px] tracking-widest">★★★★★</div>
              <blockquote className="mt-4 text-[15.5px] leading-[1.65] text-[#2a3344] flex-1">
                &ldquo;{review.text}&rdquo;
              </blockquote>
              <div className="mt-5 flex items-center gap-3 pt-4 border-t border-brand-line">
                <div
                  className="w-11 h-11 rounded-blob grid place-items-center font-sora font-bold text-white text-[15px] flex-shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #E11D28, #1B4FD1)",
                  }}
                >
                  {review.initials}
                </div>
                <div>
                  <span className="font-sora font-bold text-[14.5px] text-brand-ink block">
                    {review.name} · {review.city}
                  </span>
                  <span className="font-inter text-[12.5px] text-brand-ink-soft">
                    {review.tag}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-[12.5px] text-brand-ink-soft mt-8">
          {t.reviews.note}
        </p>
      </div>
    </section>
  );
}
