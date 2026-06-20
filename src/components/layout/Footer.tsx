"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { CONTACT } from "@/lib/utils";

export function Footer() {
  const { t, toggleLang, lang } = useLanguage();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const year = new Date().getFullYear();

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <footer className="bg-[#070a10] text-[#c7cedd]">
      <div className="max-w-wrap mx-auto px-5 md:px-10 pt-16 pb-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="font-sora font-black text-[28px] leading-none tracking-tight mb-4">
              <span className="text-brand-red">D</span>
              <span className="text-brand-blue-light">M</span>
            </div>
            <p className="text-[14px] leading-relaxed text-[#8e98ad] max-w-[280px]">
              {t.footer.tagline}
            </p>
            <div className="flex gap-2.5 mt-5">
              <a
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 rounded-[11px] border border-white/[0.14] grid place-items-center hover:bg-white/10 transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.8" fill="white" stroke="none" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="w-10 h-10 rounded-[11px] border border-white/[0.14] grid place-items-center hover:bg-white/10 transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 9h3V6h-3a3 3 0 0 0-3 3v2H9v3h2v6h3v-6h2.5l.5-3H14V9z" />
                </svg>
              </a>
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-10 h-10 rounded-[11px] border border-white/[0.14] grid place-items-center hover:bg-white/10 transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 21l2.2-5.3A8.5 8.5 0 1 1 21 11.5z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h5 className="font-sora font-bold text-[12px] tracking-[0.14em] uppercase text-white mb-4">
              {t.footer.colServices.heading}
            </h5>
            <ul className="space-y-0.5">
              {t.footer.colServices.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="block text-[14.5px] py-1.5 text-[#aab3c5] hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* School */}
          <div>
            <h5 className="font-sora font-bold text-[12px] tracking-[0.14em] uppercase text-white mb-4">
              {t.footer.colSchool.heading}
            </h5>
            <ul className="space-y-0.5">
              {t.footer.colSchool.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="block text-[14.5px] py-1.5 text-[#aab3c5] hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h5 className="font-sora font-bold text-[12px] tracking-[0.14em] uppercase text-white mb-4">
              {t.footer.newsletter.heading}
            </h5>
            <p className="text-[14px] text-[#8e98ad] leading-relaxed mb-3">
              {t.footer.newsletter.sub}
            </p>
            {submitted ? (
              <p className="text-sm text-[#8fb4ff]">{t.footer.newsletter.success}</p>
            ) : (
              <form onSubmit={handleNewsletter}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.footer.newsletter.placeholder}
                  required
                  aria-label={t.footer.newsletter.placeholder}
                  className="w-full text-[14px] text-white bg-white/[0.06] border border-white/[0.16] rounded-xl px-4 py-3 outline-none focus:border-brand-blue-light focus:bg-white/10 transition-all placeholder:text-[#5a6478]"
                />
                <button
                  type="submit"
                  className="w-full mt-2.5 font-sora font-semibold text-[14px] bg-brand-red text-white rounded-full py-3 hover:-translate-y-0.5 transition-all shadow-red-cta"
                >
                  {t.footer.newsletter.cta}
                </button>
                <p className="text-[12px] text-[#7e8799] mt-2">
                  {t.footer.newsletter.privacy}
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-[12.5px] text-[#7e8799]">
          <span>
            © {year} {t.footer.copyright} · {t.footer.kvk}
          </span>
          <button
            onClick={toggleLang}
            className="hover:text-white transition-colors font-semibold"
          >
            {lang === "nl" ? "🇬🇧 English" : "🇳🇱 Nederlands"}
          </button>
        </div>
      </div>
    </footer>
  );
}
