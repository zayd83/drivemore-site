"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function SpeedHighlight() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-[clamp(60px,9vw,118px)]" id="spoed">
      <div className="max-w-wrap mx-auto px-5 md:px-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[28px] overflow-hidden p-[clamp(34px,6vw,64px)]"
          style={{
            background: "linear-gradient(120deg, #E11D28, #c0142c 55%, #1B4FD1)",
          }}
        >
          {/* Decorative light spot */}
          <div
            className="absolute top-0 right-0 w-[50%] h-full opacity-20 pointer-events-none"
            style={{
              background:
                "radial-gradient(60% 120% at 85% 0%, rgba(255,255,255,0.35), transparent 60%)",
            }}
          />
          {/* Speed lines deco */}
          <div className="absolute left-0 bottom-0 opacity-[0.07] pointer-events-none">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="absolute h-[2px] bg-white rounded-full"
                style={{
                  width: `${80 + i * 40}px`,
                  bottom: `${8 + i * 18}px`,
                  left: `${20 + i * 6}px`,
                }}
              />
            ))}
          </div>

          <div className="relative z-10 max-w-[680px]">
            <span className="inline-flex items-center gap-2 font-sora font-semibold text-[11px] tracking-[0.22em] uppercase text-white/85">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              {t.intensive.eyebrow}
            </span>
            <h2 className="font-sora font-extrabold text-[clamp(28px,5vw,48px)] leading-[1.06] tracking-[-0.025em] mt-4 text-white">
              {t.intensive.heading}
            </h2>
            <p className="mt-4 text-[clamp(15px,1.8vw,17px)] leading-[1.65] text-white/90 max-w-[52ch]">
              {t.intensive.body}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <MagneticButton>
                <Link
                  href="/contact"
                  className="font-sora font-semibold text-[15px] bg-white text-brand-ink rounded-full px-6 py-3.5 hover:-translate-y-0.5 hover:shadow-card transition-all duration-200 inline-flex items-center"
                >
                  {t.intensive.ctaPrimary}
                </Link>
              </MagneticButton>
              <Link
                href="/spoedcursus"
                className="font-sora font-semibold text-[15px] border border-white/40 text-white rounded-full px-6 py-3.5 hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-200 inline-flex items-center"
              >
                {t.intensive.ctaSecondary}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
