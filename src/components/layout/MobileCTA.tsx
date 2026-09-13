"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/Button";
import { CONTACT } from "@/lib/utils";

export function MobileCTA() {
  const { t } = useLanguage();

  return (
    <motion.div
      className="fixed bottom-0 inset-x-0 z-[70] lg:hidden pb-safe"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ delay: 1.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex gap-2.5 p-3 bg-white/90 backdrop-blur-xl border-t border-brand-line shadow-[0_-4px_24px_-4px_rgba(14,19,32,0.12)]">
        <Button href="/contact" size="md" className="flex-1">
          {t.mobileCta.plan}
        </Button>
        <Button href={CONTACT.whatsapp} variant="whatsapp" size="md" className="flex-1" ariaLabel="WhatsApp">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 21l2.2-5.3A8.5 8.5 0 1 1 21 11.5z" />
          </svg>
          {t.mobileCta.whatsapp}
        </Button>
      </div>
    </motion.div>
  );
}
