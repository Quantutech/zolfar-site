"use server";

import nodemailer from "nodemailer";

import type { ContactState } from "./types";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/** Humans take a few seconds to write; bots post instantly. */
const MIN_FILL_MS = 3000;

function text(formData: FormData, key: string, max: number): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function sendMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot: a field people never see. Pretend success so bots move on.
  if (text(formData, "website", 200)) return { status: "sent" };
  const started = Number(formData.get("started"));
  if (!Number.isFinite(started) || Date.now() - started < MIN_FILL_MS) return { status: "sent" };

  const name = text(formData, "name", 120);
  const email = text(formData, "email", 200);
  const message = text(formData, "message", 5000);

  const fieldErrors: ContactState["fieldErrors"] = {};
  if (!name) fieldErrors.name = "Tell me your name.";
  if (!EMAIL.test(email)) fieldErrors.email = "That email doesn’t look right.";
  if (message.length < 5) fieldErrors.message = "Say a little more.";
  if (Object.keys(fieldErrors).length) return { status: "error", fieldErrors };

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO, CONTACT_FROM } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !CONTACT_TO) {
    console.error("[contact] SMTP is not configured; message not sent.");
    return { status: "error", message: "The form isn’t connected yet. Please try again later." };
  }

  try {
    const port = Number(SMTP_PORT ?? 465);
    const transport = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure: port === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
    await transport.sendMail({
      from: `"zolfar.de" <${CONTACT_FROM ?? SMTP_USER}>`,
      to: CONTACT_TO,
      replyTo: { name, address: email },
      subject: `New message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}\n\n— sent from the contact form on zolfar.de`,
    });
    return { status: "sent" };
  } catch (err) {
    console.error("[contact] sending failed", err);
    return { status: "error", message: "Something went wrong sending that. Please try again." };
  }
}
