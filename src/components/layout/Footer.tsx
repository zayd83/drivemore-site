"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/Button";
import { WaveDivider } from "@/components/ui/WaveDivider";
import { CONTACT } from "@/lib/utils";

export function Footer() {
  const { t, toggleLang, lang } = useLanguage();
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot — moet leeg blijven
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const year = new Date().getFullYear();

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "loading") return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <footer className="relative bg-[#070a10] text-[#c7cedd] overflow-hidden">
      <WaveDivider fill="#0E1320" flip />
      <div className="max-w-wrap mx-auto px-5 md:px-10 pt-16 pb-8 relative z-[2]">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="relative w-12 h-12 rounded-full overflow-hidden mb-4">
              <Image src="/drivemorelogo.jpeg" alt="Drive More logo" fill sizes="48px" className="object-cover" />
            </div>
            <p className="text-[14px] leading-relaxed text-[#8e98ad] max-w-[280px]">
              {t.footer.tagline}
            </p>
            {/* VUL IN: zodra er echte Instagram/Facebook-profielen zijn, kunnen die hier weer terugkomen. */}
            <div className="flex gap-2.5 mt-5">
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-10 h-10 rounded-blob border border-white/[0.14] grid place-items-center hover:bg-white/10 transition-colors"
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
            {status === "success" ? (
              <p className="text-sm text-[#8fb4ff]">{t.footer.newsletter.success}</p>
            ) : (
              <form onSubmit={handleNewsletter}>
                {/* Honeypot — hidden from real visitors, bots tend to fill every field */}
                <div className="absolute -left-[9999px] w-px h-px overflow-hidden" aria-hidden="true">
                  <label htmlFor="footer-website">Website</label>
                  <input
                    id="footer-website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.footer.newsletter.placeholder}
                  required
                  aria-label={t.footer.newsletter.placeholder}
                  className="w-full text-[14px] text-white bg-white/[0.06] border border-white/[0.16] rounded-brand-sm px-4 py-3 outline-none focus:border-brand-blue-light focus:bg-white/10 transition-all placeholder:text-[#5a6478]"
                />
                {status === "error" && (
                  <p className="text-[12.5px] text-[#ff8f8f] mt-2">{t.footer.newsletter.error}</p>
                )}
                <Button type="submit" disabled={status === "loading"} size="md" className="w-full mt-2.5">
                  {status === "loading" ? "..." : t.footer.newsletter.cta}
                </Button>
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
