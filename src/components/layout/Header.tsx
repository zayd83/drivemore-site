"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Button } from "@/components/ui/Button";
import { CONTACT } from "@/lib/utils";

const NAV_LINKS = [
  { labelKey: "packages" as const, href: "/rijlespakketten" },
  { labelKey: "services" as const, href: "/diensten" },
  { labelKey: "intensive" as const, href: "/spoedcursus" },
  { labelKey: "about" as const, href: "/over-ons" },
  { labelKey: "contact" as const, href: "/contact" },
];

const staggerChildren = {
  open: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
  closed: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
};

const linkVariant = {
  open: { y: 0, opacity: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  closed: { y: 32, opacity: 0, transition: { duration: 0.25 } },
};

export function Header() {
  const { t, lang, toggleLang } = useLanguage();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Homepage hero is a full-screen dark video — use light header text there until scrolled.
  // Every other page keeps the original dark-text header untouched.
  const lightMode = pathname === "/" && !scrolled && !menuOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[80] transition-all duration-300 border-b ${
          scrolled
            ? "bg-white/85 backdrop-blur-xl border-brand-line shadow-[0_1px_0_0_rgba(14,19,32,0.06)]"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="max-w-wrap mx-auto px-5 md:px-10 flex items-center h-[72px] gap-6">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 flex-shrink-0"
            aria-label="Drive More home"
            onClick={() => setMenuOpen(false)}
          >
            <span className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
              <Image src="/drivemorelogo.jpeg" alt="Drive More logo" fill sizes="40px" className="object-cover" priority />
            </span>
            <span className="leading-none">
              <span className={`block font-sora font-bold text-[12px] sm:text-[13px] tracking-[0.13em] transition-colors duration-300 ${lightMode ? "text-white" : "text-brand-ink"}`}>
                DRIVE MORE
              </span>
              <span className={`block font-inter text-[8.5px] sm:text-[9px] tracking-[0.2em] font-semibold uppercase transition-colors duration-300 ${lightMode ? "text-white/70" : "text-brand-ink-soft"}`}>
                RIJSCHOOL · {lang.toUpperCase()}
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7 ml-auto" aria-label="Hoofdmenu">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-inter font-medium transition-colors duration-300 ${lightMode ? "text-white/80 hover:text-white" : "text-brand-ink-soft hover:text-brand-ink"}`}
              >
                {t.nav[link.labelKey]}
              </Link>
            ))}
          </nav>

          {/* Desktop right */}
          <div className="hidden lg:flex items-center gap-3 ml-6">
            <button
              onClick={toggleLang}
              className={`text-[12px] font-sora font-semibold transition-colors duration-300 cursor-pointer ${lightMode ? "text-white/80 hover:text-white" : "text-brand-ink-soft hover:text-brand-ink"}`}
              aria-label="Taal wisselen"
            >
              {t.nav.langSwitch}
            </button>
            <MagneticButton>
              <Button href="/contact" size="md">{t.nav.cta}</Button>
            </MagneticButton>
          </div>

          {/* Hamburger */}
          <button
            className={`lg:hidden ml-auto w-11 h-11 rounded-blob border flex flex-col items-center justify-center gap-[5px] transition-colors duration-300 ${lightMode ? "border-white/30 bg-white/10 hover:bg-white/20" : "border-brand-line bg-white/60 hover:bg-white"}`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Menu sluiten" : "Menu openen"}
            aria-expanded={menuOpen}
          >
            <motion.span
              className={`block w-[18px] h-[2px] rounded-full origin-center transition-colors duration-300 ${lightMode ? "bg-white" : "bg-brand-ink"}`}
              animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.span
              className={`block w-[18px] h-[2px] rounded-full transition-colors duration-300 ${lightMode ? "bg-white" : "bg-brand-ink"}`}
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className={`block w-[18px] h-[2px] rounded-full origin-center transition-colors duration-300 ${lightMode ? "bg-white" : "bg-brand-ink"}`}
              animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
          </button>
        </div>
      </header>

      {/* Full-screen mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            className="fixed inset-0 z-[79] bg-white flex flex-col overflow-y-auto"
            initial={{ clipPath: "circle(0% at calc(100% - 56px) 36px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 56px) 36px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 56px) 36px)" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Decorative gradient blob */}
            <div
              className="absolute top-0 right-0 w-[340px] h-[340px] rounded-full opacity-[0.06] pointer-events-none"
              style={{
                background: "radial-gradient(circle, #E11D28 0%, #1B4FD1 100%)",
                filter: "blur(80px)",
              }}
            />

            <div className="px-6 pt-[96px] pb-12 flex flex-col flex-1 relative z-10">
              <motion.nav
                variants={staggerChildren}
                initial="closed"
                animate="open"
                exit="closed"
                className="flex flex-col gap-1"
                aria-label="Mobiel menu"
              >
                {NAV_LINKS.map((link) => (
                  <motion.div key={link.href} variants={linkVariant}>
                    <Link
                      href={link.href}
                      className="block font-sora font-bold text-[28px] py-3.5 border-b border-brand-line text-brand-ink hover:text-brand-red transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      {t.nav[link.labelKey]}
                    </Link>
                  </motion.div>
                ))}
              </motion.nav>

              <motion.div
                className="mt-8 flex flex-col gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.4 }}
              >
                <div onClick={() => setMenuOpen(false)}>
                  <Button href="/contact" className="w-full">{t.nav.cta}</Button>
                </div>
                <div onClick={() => setMenuOpen(false)}>
                  <Button href={CONTACT.whatsapp} variant="secondary" className="w-full">
                    WhatsApp — {CONTACT.phoneDisplay}
                  </Button>
                </div>
                <button
                  onClick={() => { toggleLang(); }}
                  className="text-sm font-inter text-brand-ink-soft mt-2"
                >
                  Switch to{" "}
                  <span className="font-semibold text-brand-ink">
                    {t.nav.langSwitch}
                  </span>
                </button>
              </motion.div>

              {/* Mini steering wheel deco */}
              <motion.div
                className="absolute bottom-10 right-8 opacity-5 pointer-events-none"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <svg
                  width="120"
                  height="120"
                  viewBox="0 0 120 120"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                >
                  <circle cx="60" cy="60" r="54" />
                  <circle cx="60" cy="60" r="20" />
                  <line x1="60" y1="6" x2="60" y2="40" />
                  <line x1="60" y1="80" x2="60" y2="114" />
                  <line x1="6" y1="60" x2="40" y2="60" />
                  <line x1="80" y1="60" x2="114" y2="60" />
                </svg>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
