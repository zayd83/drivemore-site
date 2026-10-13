"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { GRATIS_THEORIE } from "@/lib/config/theory";

function CheckIcon() {
  return (
    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-blue/10 grid place-items-center mt-0.5">
      <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
        <path d="M1 6.2 4.3 9.5 11 2.5" stroke="#1B4FD1" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function TheoryVisual() {
  return (
    <div className="relative aspect-[4/3] rounded-brand-lg overflow-hidden">
      <Image
        src="/gratistheorie.jpg"
        alt="Lesauto met theorie-examen-bord bij een kruising met fietspad en voorrangsborden"
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover"
      />
    </div>
  );
}

export function TheoryPractice() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-[clamp(56px,8vw,100px)]">
      <div className="max-w-wrap mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 font-sora font-semibold text-[11px] tracking-[0.22em] uppercase text-brand-ink-soft">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
              {GRATIS_THEORIE ? t.theoryPractice.eyebrowFree : t.theoryPractice.eyebrow}
            </span>
            <h2 className="font-sora font-extrabold text-[clamp(28px,4.8vw,44px)] leading-[1.08] tracking-[-0.025em] mt-4 max-w-[18ch]">
              {t.theoryPractice.heading}
            </h2>
            <p className="mt-4 text-[15.5px] leading-[1.65] text-brand-ink-body max-w-[46ch]">
              {t.theoryPractice.body}
            </p>
            <ul className="mt-6 flex flex-col gap-3">
              {t.theoryPractice.checks.map((check, i) => (
                <li key={i} className="flex gap-3 items-start text-[14.5px] font-medium text-brand-ink">
                  <CheckIcon />
                  {check}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <TheoryVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
