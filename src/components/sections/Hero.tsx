"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { MagneticButton } from "@/components/ui/MagneticButton";
import Link from "next/link";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero() {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [contentVisible, setContentVisible] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    if (mq.matches) { setContentVisible(true); return; }

    const vid = videoRef.current;
    if (!vid) { setContentVisible(true); return; }

    const show = () => setContentVisible(true);
    const onTimeUpdate = () => { if (vid.currentTime >= 2.2) show(); };
    vid.addEventListener("timeupdate", onTimeUpdate);
    vid.addEventListener("ended", show);
    const fallback = setTimeout(show, 2800);

    vid.play().catch(show);

    return () => {
      vid.removeEventListener("timeupdate", onTimeUpdate);
      vid.removeEventListener("ended", show);
      clearTimeout(fallback);
    };
  }, []);

  const replay = () => {
    const vid = videoRef.current;
    if (!vid) return;
    setContentVisible(false);
    vid.currentTime = 0;
    vid.play().catch(() => setContentVisible(true));
  };

  return (
    <section className="relative min-h-[100svh] flex flex-col overflow-hidden bg-gradient-to-b from-[#eaf1fb] to-white">
      {/* Video — full bleed mobile, contained panel desktop */}
      <div className="absolute inset-0 lg:relative lg:inset-auto lg:order-2 lg:flex-1 lg:h-[min(82svh,780px)] lg:flex lg:items-center lg:justify-center">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          poster="/hero-poster.jpg"
          aria-label="Drive More rijschool introductievideo"
          className="w-full h-full object-cover object-[50%_40%] lg:object-contain lg:rounded-brand lg:shadow-[0_40px_80px_-42px_rgba(20,30,60,0.5)]"
        />
        {/* Scrim — mobile only */}
        <div className="absolute inset-0 lg:hidden pointer-events-none bg-gradient-to-b from-white/10 via-transparent via-50% to-white" />
      </div>

      {/* Replay button */}
      {!reduceMotion && (
        <button
          onClick={replay}
          className="absolute top-[84px] right-4 z-10 lg:bottom-5 lg:top-auto lg:right-5 flex items-center gap-1.5 font-sora font-semibold text-[11px] text-brand-ink bg-white/70 backdrop-blur-md border border-brand-line rounded-full px-3.5 py-2 hover:bg-white transition-colors"
          aria-label={t.hero.replay}
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12a9 9 0 1 0 3-6.7" />
            <path d="M3 4v5h5" />
          </svg>
          {t.hero.replay}
        </button>
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end flex-1 px-5 pb-16 lg:pb-0 lg:px-0 lg:order-1 lg:justify-center lg:pr-12 lg:max-w-[520px]">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={contentVisible ? "visible" : "hidden"}
        >
          <motion.span variants={itemVariants} className="inline-flex items-center gap-2 font-sora font-semibold text-[11px] tracking-[0.22em] uppercase text-brand-ink-soft">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
            {t.hero.eyebrow}
          </motion.span>

          <motion.h1
            variants={itemVariants}
            className="font-sora font-extrabold text-[clamp(34px,7.5vw,62px)] leading-[1.02] tracking-[-0.025em] mt-4 max-w-[14ch]"
          >
            {t.hero.heading1}{" "}
            <span className="grad">{t.hero.headingAccent}</span>{" "}
            {t.hero.heading2}
          </motion.h1>

          <motion.p variants={itemVariants} className="mt-4 text-[clamp(15px,1.8vw,17px)] leading-[1.65] text-brand-ink-body max-w-[44ch]">
            {t.hero.lead}
          </motion.p>

          <motion.div variants={itemVariants} className="mt-7 flex flex-wrap gap-3">
            <MagneticButton>
              <Link
                href="/contact"
                className="font-sora font-semibold text-[15px] bg-brand-red text-white rounded-full px-6 py-4 shadow-red-cta hover:shadow-red-hover hover:-translate-y-0.5 transition-all duration-200 inline-flex items-center"
              >
                {t.hero.ctaPrimary}
              </Link>
            </MagneticButton>
            <Link
              href="/rijlespakketten"
              className="font-sora font-semibold text-[15px] border border-brand-line text-brand-ink rounded-full px-6 py-4 hover:border-brand-ink hover:-translate-y-0.5 transition-all duration-200 inline-flex items-center"
            >
              {t.hero.ctaSecondary}
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="hidden lg:flex absolute bottom-8 left-0 right-0 justify-center z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: contentVisible ? 1 : 0 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="flex flex-col items-center gap-1.5"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="font-sora text-[10px] tracking-[0.2em] uppercase text-brand-ink-soft">Scroll</span>
          <div className="w-5 h-8 rounded-full border-2 border-brand-line flex items-start justify-center pt-1.5">
            <div className="w-1 h-2 bg-brand-ink-soft rounded-full" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
