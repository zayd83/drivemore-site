import { NextRequest, NextResponse } from "next/server";

interface NewsletterBody {
  email: string;
  website?: string; // honeypot — moet leeg zijn
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as NewsletterBody;

    // Honeypot: bots vullen doorgaans elk veld in. Doe alsof het gelukt is, verstuur niets.
    if (body.website) {
      return NextResponse.json({ ok: true });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!body.email || !emailRegex.test(body.email)) {
      return NextResponse.json({ error: "ongeldig e-mailadres" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_EMAIL ?? "contact@rijschooldrivemore.nl";
    // MAIL_FROM werkt pas nadat het domein rijschooldrivemore.nl bij Resend is geverifieerd.
    // Tot die tijd valt dit terug op het Resend-testadres, zodat versturen tijdens development blijft werken.
    const mailFrom = process.env.MAIL_FROM ?? "onboarding@resend.dev";

    if (!apiKey) {
      console.warn("RESEND_API_KEY not set — logging newsletter signup");
      console.log("[Newsletter signup]", body.email);
      return NextResponse.json({ ok: true });
    }

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: mailFrom,
        to: [toEmail],
        subject: `Nieuwe nieuwsbrief-aanmelding — ${body.email}`,
        html: `<p style="font-family:sans-serif;color:#0E1320">Nieuwe aanmelding voor de nieuwsbrief: <strong>${escHtml(body.email)}</strong></p>`,
      }),
    });

    if (!resendRes.ok) {
      const errText = await resendRes.text();
      console.error("Resend error:", errText);
      return NextResponse.json({ error: "email send failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Newsletter route error:", err);
    return NextResponse.json({ error: "internal error" }, { status: 500 });
  }
}

function escHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
