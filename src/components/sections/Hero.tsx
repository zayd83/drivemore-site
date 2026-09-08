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
    const onChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener("change", onChange);

    const timer = setTimeout(() => setContentVisible(true), 300);

    return () => {
      mq.removeEventListener("change", onChange);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    if (reduceMotion) {
      vid.pause();
    } else {
      vid.play().catch(() => {});
    }
  }, [reduceMotion]);

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-end overflow-hidden bg-brand-ink">
      {/* Video background — full-screen cover, autoplay + loop, poster fallback */}
      {!reduceMotion ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/hero-poster.jpg"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center"
        >
          <source src="/Drive-more-headervideo.mp4" type="video/mp4" />
        </video>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/hero-poster.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      )}

      {/* Scrim — bottom-heavy gradient for text legibility (video is dark, text is light) */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-ink via-brand-ink/55 via-40% to-transparent pointer-events-none" />
      {/* Scrim — top, keeps header legible over the video */}
      <div className="absolute inset-x-0 top-0 h-32 md:h-40 bg-gradient-to-b from-black/55 to-transparent pointer-events-none" />

      {/* Content — bottom-left, over the scrim */}
      <div className="relative z-10 w-full">
        <div className="max-w-wrap mx-auto px-5 md:px-10 pb-[max(56px,7vh)] md:pb-20 lg:pb-24">
          <motion.div
            variants={containerVariants}
            initial={reduceMotion ? false : "hidden"}
            animate={contentVisible ? "visible" : "hidden"}
            className="max-w-[600px]"
          >
            <motion.span variants={itemVariants} className="inline-flex items-center gap-2 font-sora font-semibold text-[11px] tracking-[0.22em] uppercase text-white/85">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
              {t.hero.eyebrow}
            </motion.span>

            <motion.h1
              variants={itemVariants}
              className="font-sora font-extrabold text-[clamp(34px,7.5vw,62px)] leading-[1.02] tracking-[-0.025em] mt-4 max-w-[14ch] text-white"
            >
              {t.hero.heading1}{" "}
              <span className="grad">{t.hero.headingAccent}</span>{" "}
              {t.hero.heading2}
            </motion.h1>

            <motion.p variants={itemVariants} className="mt-4 text-[clamp(15px,1.8vw,17px)] leading-[1.65] text-white/75 max-w-[44ch]">
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
                className="font-sora font-semibold text-[15px] border border-white/35 text-white rounded-full px-6 py-4 backdrop-blur-sm hover:border-white hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-200 inline-flex items-center"
              >
                {t.hero.ctaSecondary}
              </Link>
            </motion.div>
          </motion.div>
        </div>
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
          <span className="font-sora text-[10px] tracking-[0.2em] uppercase text-white/70">Scroll</span>
          <div className="w-5 h-8 rounded-full border-2 border-white/40 flex items-start justify-center pt-1.5">
            <div className="w-1 h-2 bg-white/70 rounded-full" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
