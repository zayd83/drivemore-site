"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/Button";
import { CONTACT } from "@/lib/utils";

export default function ContactPage() {
  const { t } = useLanguage();
  const tf = t.contact.form;

  const [formData, setFormData] = useState({
    naam: "",
    email: "",
    tel: "",
    interesse: tf.interesseOptions[0],
    bericht: "",
    newsletter: false,
    website: "", // honeypot — moet leeg blijven, echte bezoekers zien/vullen dit veld niet
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const directLinks = [
    {
      href: CONTACT.whatsapp,
      external: true,
      bg: "#25D366",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 21l2.2-5.3A8.5 8.5 0 1 1 21 11.5z" />
          <path d="M8.5 9.5c0 3 2 5 5 5" />
        </svg>
      ),
      label: t.contact.direct.whatsapp.label,
      sub: t.contact.direct.whatsapp.sub,
    },
    {
      href: `tel:${CONTACT.phone}`,
      external: false,
      bg: "#1B4FD1",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 4h4l2 5-3 2a12 12 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
        </svg>
      ),
      label: t.contact.direct.phone.label,
      sub: t.contact.direct.phone.sub,
    },
    {
      href: `mailto:${CONTACT.email}`,
      external: false,
      bg: "#E11D28",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      ),
      label: t.contact.direct.email.label,
      sub: t.contact.direct.email.sub,
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="pt-[120px] pb-16 bg-brand-ink text-white">
        <div className="max-w-wrap mx-auto px-5 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 font-sora font-semibold text-[11px] tracking-[0.22em] uppercase text-white/80">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
              {t.contact.eyebrow}
            </span>
            <h1 className="font-sora font-extrabold text-[clamp(36px,6vw,64px)] leading-[1.02] tracking-[-0.025em] mt-4 text-white max-w-[14ch]">
              {t.contact.heading1}{" "}
              <span className="grad">{t.contact.headingAccent}</span>
              {t.contact.heading2}
            </h1>
            <p className="mt-5 text-[clamp(15px,1.8vw,18px)] leading-[1.65] text-white/80 max-w-[52ch]">
              {t.contact.lead}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form + contact */}
      <section className="py-[clamp(48px,7vw,96px)]">
        <div className="max-w-wrap mx-auto px-5 md:px-10 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-[clamp(40px,5vw,72px)]">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {status === "success" ? (
              <div className="rounded-brand-lg bg-brand-blue/10 border border-brand-blue/30 p-8 text-center">
                <div className="text-4xl mb-4">🚗</div>
                <h2 className="font-sora font-bold text-[22px] text-brand-ink">{tf.success}</h2>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-0">
                {/* Honeypot — hidden from real visitors, bots tend to fill every field */}
                <div className="absolute -left-[9999px] w-px h-px overflow-hidden" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.website}
                    onChange={handleChange}
                  />
                </div>

                {/* Name + tel */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="naam" className="font-sora font-semibold text-[13px] text-brand-ink">
                      {tf.naam}
                    </label>
                    <input
                      id="naam"
                      name="naam"
                      type="text"
                      autoComplete="name"
                      required
                      value={formData.naam}
                      onChange={handleChange}
                      className="font-inter text-[15px] text-brand-ink bg-brand-light border border-brand-line rounded-brand-sm px-4 py-3.5 outline-none focus:border-brand-blue focus:bg-white transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="tel" className="font-sora font-semibold text-[13px] text-brand-ink">
                      {tf.tel}
                    </label>
                    <input
                      id="tel"
                      name="tel"
                      type="tel"
                      autoComplete="tel"
                      value={formData.tel}
                      onChange={handleChange}
                      className="font-inter text-[15px] text-brand-ink bg-brand-light border border-brand-line rounded-brand-sm px-4 py-3.5 outline-none focus:border-brand-blue focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2 mb-4">
                  <label htmlFor="email" className="font-sora font-semibold text-[13px] text-brand-ink">
                    {tf.email}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="font-inter text-[15px] text-brand-ink bg-brand-light border border-brand-line rounded-brand-sm px-4 py-3.5 outline-none focus:border-brand-blue focus:bg-white transition-all"
                  />
                </div>

                {/* Interest */}
                <div className="flex flex-col gap-2 mb-4">
                  <label htmlFor="interesse" className="font-sora font-semibold text-[13px] text-brand-ink">
                    {tf.interesse}
                  </label>
                  <select
                    id="interesse"
                    name="interesse"
                    value={formData.interesse}
                    onChange={handleChange}
                    className="font-inter text-[15px] text-brand-ink bg-brand-light border border-brand-line rounded-brand-sm px-4 py-3.5 outline-none focus:border-brand-blue focus:bg-white transition-all cursor-pointer"
                  >
                    {tf.interesseOptions.map((opt) => (
                      <option key={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2 mb-5">
                  <label htmlFor="bericht" className="font-sora font-semibold text-[13px] text-brand-ink">
                    {tf.bericht}
                  </label>
                  <textarea
                    id="bericht"
                    name="bericht"
                    rows={4}
                    placeholder={tf.berichtPlaceholder}
                    value={formData.bericht}
                    onChange={handleChange}
                    className="font-inter text-[15px] text-brand-ink bg-brand-light border border-brand-line rounded-brand-sm px-4 py-3.5 outline-none focus:border-brand-blue focus:bg-white transition-all resize-y min-h-[110px] placeholder:text-brand-ink-soft"
                  />
                </div>

                {/* Newsletter */}
                <label className="flex items-start gap-3 text-[13.5px] text-brand-ink-soft cursor-pointer mb-5">
                  <input
                    type="checkbox"
                    name="newsletter"
                    checked={formData.newsletter}
                    onChange={handleChange}
                    className="mt-0.5 w-4 h-4 accent-brand-red cursor-pointer"
                  />
                  {tf.newsletter}
                </label>

                {status === "error" && (
                  <p className="text-brand-red text-[14px] mb-3">{tf.error}</p>
                )}

                <Button type="submit" disabled={status === "loading"} className="w-full">
                  {status === "loading" ? "Versturen..." : tf.submit}
                </Button>
                <p className="text-[13px] text-brand-ink-soft mt-3 text-center">{tf.note}</p>

                <Button href={CONTACT.whatsapp} variant="secondary" className="w-full mt-4">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 21l2.2-5.3A8.5 8.5 0 1 1 21 11.5z" />
                    <path d="M8.5 9.5c0 3 2 5 5 5" />
                  </svg>
                  {t.contact.lowThreshold}
                </Button>
              </form>
            )}
          </motion.div>

          {/* Direct contact */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <h2 className="font-sora font-bold text-[22px] text-brand-ink">
              {t.contact.direct.heading}
            </h2>
            <p className="mt-2 text-[15px] text-brand-ink-body leading-relaxed">
              Liever meteen contact? We reageren snel.
            </p>

            <div className="mt-6 flex flex-col gap-3">
              {directLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-4 border border-brand-line rounded-brand-sm px-4 py-4 hover:-translate-y-0.5 hover:shadow-card-sm transition-all duration-200"
                >
                  <div
                    className="w-11 h-11 rounded-blob grid place-items-center flex-shrink-0"
                    style={{ background: link.bg }}
                  >
                    {link.icon}
                  </div>
                  <div>
                    <span className="font-sora font-semibold text-[15px] text-brand-ink block">
                      {link.label}
                    </span>
                    <span className="font-inter text-[13px] text-brand-ink-soft">
                      {link.sub}
                    </span>
                  </div>
                </a>
              ))}
            </div>

            {/* Hours / note */}
            <div className="mt-8 p-5 bg-brand-light rounded-brand-lg border border-brand-line">
              <h3 className="font-sora font-bold text-[15px] text-brand-ink">Bereikbaarheid</h3>
              <div className="mt-3 flex flex-col gap-2 text-[14px] text-brand-ink-body">
                <div className="flex justify-between">
                  <span>Maandag – Vrijdag</span>
                  <span className="font-medium text-brand-ink">08:00 – 21:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Zaterdag</span>
                  <span className="font-medium text-brand-ink">08:00 – 17:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Zondag</span>
                  <span className="font-medium text-brand-ink">Op aanvraag</span>
                </div>
              </div>
              <p className="mt-4 text-[12.5px] text-brand-ink-soft">
                Via WhatsApp reageren we ook buiten kantoortijden.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
