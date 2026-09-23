"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/Button";
import { REVIEWS, REVIEWS_LINK } from "@/lib/config/reviews";

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
            <span className="grad">{t.reviews.headingAccent}</span>
            {t.reviews.heading2}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.slice(0, 3).map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white border border-brand-line rounded-brand-lg p-7 flex flex-col hover:-translate-y-1 hover:shadow-card transition-all duration-300"
            >
              <div className="text-[#f5b301] text-[15px] tracking-widest" aria-label={`${review.rating} van de 5 sterren`}>
                {"★".repeat(review.rating)}
                {"☆".repeat(Math.max(0, 5 - review.rating))}
              </div>
              <blockquote className="mt-4 text-[15.5px] leading-[1.65] text-[#2a3344] flex-1">
                &ldquo;{review.text}&rdquo;
              </blockquote>
              <span className="mt-5 pt-4 border-t border-brand-line font-sora font-bold text-[14.5px] text-brand-ink">
                {review.authorName}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button href={REVIEWS_LINK} variant="secondary">
            {t.reviews.cta}
          </Button>
        </div>
      </div>
    </section>
  );
}
