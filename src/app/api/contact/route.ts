import { NextRequest, NextResponse } from "next/server";

interface ContactBody {
  naam: string;
  email: string;
  tel?: string;
  interesse: string;
  bericht?: string;
  newsletter?: boolean;
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ContactBody;

    if (!body.naam || !body.email) {
      return NextResponse.json({ error: "naam en email zijn verplicht" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: "ongeldig e-mailadres" }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_EMAIL ?? "mbouslam@hotmail.com";

    if (!apiKey) {
      console.warn("RESEND_API_KEY not set — logging form submission");
      console.log("[Contact form]", body);
      return NextResponse.json({ ok: true });
    }

    const html = `
      <h2 style="font-family:sans-serif;color:#0E1320">Nieuw contactformulier — Drive More</h2>
      <table style="font-family:sans-serif;border-collapse:collapse;width:100%">
        <tr><td style="padding:8px 0;color:#5a6478;width:140px"><strong>Naam</strong></td><td>${escHtml(body.naam)}</td></tr>
        <tr><td style="padding:8px 0;color:#5a6478"><strong>E-mail</strong></td><td><a href="mailto:${escHtml(body.email)}">${escHtml(body.email)}</a></td></tr>
        ${body.tel ? `<tr><td style="padding:8px 0;color:#5a6478"><strong>Telefoon</strong></td><td>${escHtml(body.tel)}</td></tr>` : ""}
        <tr><td style="padding:8px 0;color:#5a6478"><strong>Interesse</strong></td><td>${escHtml(body.interesse)}</td></tr>
        ${body.bericht ? `<tr><td style="padding:8px 0;color:#5a6478;vertical-align:top"><strong>Bericht</strong></td><td style="white-space:pre-wrap">${escHtml(body.bericht)}</td></tr>` : ""}
        <tr><td style="padding:8px 0;color:#5a6478"><strong>Nieuwsbrief</strong></td><td>${body.newsletter ? "Ja" : "Nee"}</td></tr>
      </table>
      <hr style="margin:24px 0;border:none;border-top:1px solid #eee"/>
      <p style="font-family:sans-serif;font-size:12px;color:#9aa6bd">Verstuurd via rijschooldrivemore.nl</p>
    `;

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev',
        reply_to: body.email,
        to: [toEmail],
        subject: `Nieuwe aanvraag: ${body.interesse} — ${body.naam}`,
        html,
      }),
    });

    if (!resendRes.ok) {
      const errText = await resendRes.text();
      console.error("Resend error:", errText);
      return NextResponse.json({ error: "email send failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact route error:", err);
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
