"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export function AboutTeaser() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-[clamp(60px,9vw,118px)] bg-brand-light">
      <div className="max-w-wrap mx-auto px-5 md:px-10">
        <div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(28px,5vw,64px)] items-center"
        >
          {/* Photo placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/5] max-w-sm mx-auto lg:mx-0 w-full"
          >
            <div className="w-full h-full rounded-[24px] bg-gradient-to-br from-[#dfe6f3] to-[#eef2f9] border border-brand-line grid place-items-center overflow-hidden">
              {/* DM monogram as placeholder */}
              <div className="text-center select-none">
                <div className="font-sora font-black text-[90px] leading-none tracking-[-3px] opacity-30">
                  <span className="text-brand-red">D</span>
                  <span className="text-brand-blue">M</span>
                </div>
                <p className="font-sora font-semibold text-[11px] tracking-[0.14em] uppercase text-brand-ink-soft mt-3">
                  {t.about.photoLabel}
                </p>
              </div>
            </div>
            {/* Decorative badge */}
            <div className="absolute -bottom-4 -right-4 bg-white rounded-[16px] shadow-card p-4 flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl grid place-items-center text-white font-sora font-extrabold"
                style={{ background: "linear-gradient(135deg, #E11D28, #1B4FD1)" }}
              >
                ★
              </div>
              <div>
                <div className="font-sora font-bold text-[15px] text-brand-ink">4.9★</div>
                <div className="font-inter text-[11px] text-brand-ink-soft">Gemiddeld</div>
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center gap-2 font-sora font-semibold text-[11px] tracking-[0.22em] uppercase text-brand-ink-soft">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
              {t.about.eyebrow}
            </span>
            <h2 className="font-sora font-extrabold text-[clamp(30px,5.2vw,52px)] leading-[1.05] tracking-[-0.025em] mt-4">
              {t.about.heading1}{" "}
              <span className="grad">{t.about.headingAccent}</span>.
            </h2>
            <p className="mt-5 text-[16px] leading-[1.75] text-brand-ink-body">
              {t.about.body1}
            </p>
            <p className="mt-4 text-[16px] leading-[1.75] text-brand-ink-body">
              {t.about.body2}
            </p>
            <div className="mt-7 pt-6 border-t border-brand-line">
              <span className="font-sora font-bold text-[17px] text-brand-ink block">
                {t.about.founder}
              </span>
              <span className="font-inter font-medium text-[13px] text-brand-ink-soft mt-0.5 block">
                {t.about.founderRole}
              </span>
            </div>
            <Link
              href="/over-ons"
              className="inline-flex items-center gap-2 mt-6 font-sora font-semibold text-[15px] text-brand-ink hover:text-brand-red transition-colors"
            >
              {t.about.cta}
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
