"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Button } from "@/components/ui/Button";
import { WaveDivider } from "@/components/ui/WaveDivider";

export function SpeedHighlight() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      className="relative py-[clamp(64px,10vw,130px)] overflow-hidden"
      id="spoed"
      style={{ background: "linear-gradient(120deg, #E11D28, #c0142c 55%, #1B4FD1)" }}
    >
      <WaveDivider fill="#ffffff" flip />

      {/* Decorative light spot */}
      <div
        className="absolute top-0 right-0 w-[55%] h-full opacity-20 pointer-events-none"
        style={{ background: "radial-gradient(60% 120% at 85% 0%, rgba(255,255,255,0.35), transparent 60%)" }}
      />
      {/* Soft decorative blob */}
      <div
        className="hidden md:block absolute -right-10 bottom-6 w-56 h-56 rounded-blob opacity-[0.12] pointer-events-none"
        style={{ background: "#ffffff" }}
      />
      {/* Speed lines deco */}
      <div className="absolute left-0 bottom-0 opacity-[0.1] pointer-events-none">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute h-[2px] bg-white rounded-full"
            style={{ width: `${80 + i * 40}px`, bottom: `${8 + i * 18}px`, left: `${20 + i * 6}px` }}
          />
        ))}
      </div>

      <div className="max-w-wrap mx-auto px-5 md:px-10 relative z-[2]">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[680px]"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 font-sora font-semibold text-[11px] tracking-[0.22em] uppercase text-white">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 2 4 14h6l-1 8 9-12h-6z" />
            </svg>
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
              <Button href="/contact" variant="white">
                {t.intensive.ctaPrimary}
              </Button>
            </MagneticButton>
            <Button href="/spoedcursus" variant="ghost-light">
              {t.intensive.ctaSecondary}
            </Button>
          </div>
        </motion.div>
      </div>

      <WaveDivider fill="#ffffff" />
    </section>
  );
}
