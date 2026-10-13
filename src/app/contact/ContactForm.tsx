"use client";

import { useActionState, useEffect, useRef } from "react";

import { sendMessage } from "./actions";
import styles from "./page.module.css";
import { initialContactState } from "./types";

export function ContactForm() {
  const [state, action, pending] = useActionState(sendMessage, initialContactState);
  // Stamped in the browser (not at prerender) so the server can reject instant bot posts.
  const started = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (started.current) started.current.value = String(Date.now());
  }, []);

  if (state.status === "sent") {
    return (
      <div className={styles.sent} role="status">
        <p className={`fa ${styles.sentFa}`} lang="fa">
          تشکر
        </p>
        <p className={styles.sentText}>Thank you — your message is on its way.</p>
      </div>
    );
  }

  const err = state.fieldErrors ?? {};

  return (
    <form action={action} className={styles.form} noValidate>
      <input ref={started} type="hidden" name="started" defaultValue="" />
      <div className={styles.hp} aria-hidden="true">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className={styles.field}>
        <span className="mono">name*</span>
        <input name="name" type="text" autoComplete="name" required aria-invalid={Boolean(err.name)} />
        {err.name && <span className={styles.error}>{err.name}</span>}
      </label>
      <label className={styles.field}>
        <span className="mono">email*</span>
        <input name="email" type="email" autoComplete="email" required aria-invalid={Boolean(err.email)} />
        {err.email && <span className={styles.error}>{err.email}</span>}
      </label>
      <label className={`${styles.field} ${styles.wide}`}>
        <span className="mono">message*</span>
        <textarea name="message" rows={6} required aria-invalid={Boolean(err.message)} />
        {err.message && <span className={styles.error}>{err.message}</span>}
      </label>

      <div className={styles.submitRow}>
        <button type="submit" className={styles.submit} disabled={pending}>
          {pending ? "Sending…" : "Let’s talk"}
        </button>
        <p className={styles.status} aria-live="polite">
          {state.message}
        </p>
      </div>
    </form>
  );
}
