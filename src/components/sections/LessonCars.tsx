"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Button } from "@/components/ui/Button";

function CarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 11l1.4-4.2A2 2 0 0 1 8.3 5.5h7.4a2 2 0 0 1 1.9 1.3L19 11" />
      <rect x="3" y="11" width="18" height="6" rx="2" />
      <circle cx="7.5" cy="17.5" r="1.6" />
      <circle cx="16.5" cy="17.5" r="1.6" />
    </svg>
  );
}

export function LessonCars() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-[clamp(48px,7vw,88px)]">
      <div className="max-w-wrap mx-auto px-5 md:px-10">
        <motion.div
          ref={ref}
          className="max-w-[600px] mb-8"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 font-sora font-semibold text-[11px] tracking-[0.22em] uppercase text-brand-ink-soft">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
            {t.lessonCars.eyebrow}
          </span>
          <h2 className="font-sora font-extrabold text-[clamp(28px,4.8vw,46px)] leading-[1.08] tracking-[-0.025em] mt-3">
            {t.lessonCars.heading}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {t.lessonCars.items.map((item, i) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-brand-lg overflow-hidden aspect-[4/5] sm:aspect-[4/4.5] group"
            >
              {/* Photo placeholder — replace with real photography (see photoAlt / i18n comment) */}
              <div
                role="img"
                aria-label={item.photoAlt}
                className="absolute inset-0 bg-gradient-to-br from-[#2a3344] to-[#0E1320]"
              >
                <div
                  className={`absolute -top-10 -right-10 w-56 h-56 rounded-blob opacity-20 ${
                    item.color === "red" ? "bg-brand-red" : "bg-brand-blue"
                  }`}
                />
                <div className="absolute -bottom-16 -left-10 w-64 h-64 rounded-blob bg-white/[0.06]" />
                <div className="absolute inset-0 grid place-items-center">
                  <div className="w-28 h-28 sm:w-36 sm:h-36 text-white/15 transition-transform duration-500 group-hover:scale-105">
                    <CarIcon />
                  </div>
                </div>
                <span className="absolute top-4 right-4 font-sora font-semibold text-[10px] tracking-[0.14em] uppercase text-white/40">
                  Foto volgt
                </span>
              </div>

              {/* Bottom scrim + content */}
              <div className="absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-brand-ink via-brand-ink/70 to-transparent pointer-events-none" />
              <div className="relative z-10 h-full flex flex-col justify-end p-6 sm:p-7">
                <span
                  className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 font-sora font-bold text-[11px] tracking-[0.1em] uppercase text-white mb-3 ${
                    item.color === "red" ? "bg-brand-red" : "bg-brand-blue"
                  }`}
                >
                  {item.badge}
                </span>
                <h3 className="font-sora font-extrabold text-[22px] sm:text-[24px] tracking-[-0.015em] text-white">
                  {item.carName}
                </h3>
                <p className="mt-1.5 text-[14px] leading-[1.5] text-white/80 max-w-[32ch]">
                  {item.description}
                </p>
                <MagneticButton className="mt-4 w-fit">
                  <Button href={item.href} variant="white" size="md">
                    {item.cta}
                  </Button>
                </MagneticButton>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
