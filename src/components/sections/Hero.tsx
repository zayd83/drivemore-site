"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Button } from "@/components/ui/Button";
import { WaveDivider } from "@/components/ui/WaveDivider";

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

const POINT_ICONS: Record<"bolt" | "car" | "person", React.ReactNode> = {
  bolt: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2 4 14h6l-1 8 9-12h-6z" />
    </svg>
  ),
  car: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 11l1.4-4.2A2 2 0 0 1 8.3 5.5h7.4a2 2 0 0 1 1.9 1.3L19 11" />
      <rect x="3" y="11" width="18" height="6" rx="2" />
      <circle cx="7.5" cy="17.5" r="1.6" />
      <circle cx="16.5" cy="17.5" r="1.6" />
    </svg>
  ),
  person: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="3.4" />
      <path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6" />
    </svg>
  ),
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
    <section className="relative min-h-[580px] sm:min-h-[640px] md:min-h-[680px] lg:min-h-[100svh] flex flex-col justify-end overflow-hidden bg-brand-ink">
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
        <div className="max-w-wrap mx-auto px-5 md:px-10 pb-8 sm:pb-10 md:pb-20 lg:pb-24">
          <motion.div
            variants={containerVariants}
            initial={reduceMotion ? false : "hidden"}
            animate={contentVisible ? "visible" : "hidden"}
            className="max-w-[600px]"
          >
            <motion.span variants={itemVariants} className="flex items-center gap-2 font-sora font-semibold text-[11px] tracking-[0.22em] uppercase text-white/85">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
              {t.hero.eyebrow}
            </motion.span>

            <motion.h1
              variants={itemVariants}
              className="font-sora font-extrabold text-[clamp(32px,7.5vw,62px)] leading-[1.05] tracking-[-0.025em] mt-3 max-w-[22ch] lg:max-w-[16ch] text-white"
            >
              {t.hero.heading1}{" "}
              <span className="grad">{t.hero.headingAccent}</span>{" "}
              {t.hero.heading2}
            </motion.h1>

            <motion.p variants={itemVariants} className="mt-3 text-[clamp(14.5px,1.8vw,17px)] leading-[1.55] text-white/75 max-w-[46ch]">
              {t.hero.lead}
            </motion.p>

            <motion.ul variants={itemVariants} className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-5 sm:gap-y-2">
              {t.hero.points.map((point, i) => (
                <li key={i} className="flex items-center gap-2 text-[13.5px] font-sora font-semibold text-white/90">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/15 grid place-items-center text-white">
                    <span className="w-3.5 h-3.5">{POINT_ICONS[point.icon]}</span>
                  </span>
                  {point.label}
                </li>
              ))}
            </motion.ul>

            <motion.div variants={itemVariants} className="mt-6 flex flex-wrap gap-3">
              <MagneticButton>
                <Button href="/contact">{t.hero.ctaPrimary}</Button>
              </MagneticButton>
              <Button href="/rijlespakketten" variant="ghost-light">
                {t.hero.ctaSecondary}
              </Button>
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

      <WaveDivider fill="#ffffff" className="z-[2]" />
    </section>
  );
}
