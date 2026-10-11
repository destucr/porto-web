"use client";

import { useState, type FormEvent } from "react";
import styles from "./urai.module.css";

const waitlistEndpoint = "https://api.destucikal.site/waitlist";

type SignupState = "idle" | "sending" | "joined" | "failed";

/// "Get an invite": one email field. The hidden "website" field catches bots.
export function WaitlistForm({ id }: { id?: string }) {
  const [email, setEmail] = useState("");
  const [signupState, setSignupState] = useState<SignupState>("idle");
  const [problem, setProblem] = useState("");

  const joinWaitlist = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const honeypot = new FormData(event.currentTarget).get("website");
    setSignupState("sending");
    try {
      const response = await fetch(waitlistEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website: honeypot ?? "" }),
      });
      if (response.ok) {
        setSignupState("joined");
        return;
      }
      setProblem(response.status === 400 ? "That email doesn't look right." : "Couldn't sign you up. Try again in a moment.");
      setSignupState("failed");
    } catch {
      setProblem("Couldn't reach Urai. Check your connection and try again.");
      setSignupState("failed");
    }
  };

  if (signupState === "joined") {
    return (
      <p id={id} className={styles.waitlistJoined} role="status">
        You&apos;re on the list. We&apos;ll email you when the first invites go out.
      </p>
    );
  }

  return (
    <form id={id} className={styles.waitlistForm} onSubmit={joinWaitlist}>
      <label className={styles.visuallyHidden} htmlFor={`${id ?? "waitlist"}-email`}>
        Email
      </label>
      <input
        id={`${id ?? "waitlist"}-email`}
        type="email"
        required
        autoComplete="email"
        placeholder="you@example.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        className={styles.waitlistInput}
      />
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className={styles.honeypot} />
      <button type="submit" className={styles.primaryButton} disabled={signupState === "sending"}>
        {signupState === "sending" ? "Joining…" : "Get an invite"}
      </button>
      {signupState === "failed" && (
        <p className={styles.waitlistProblem} role="alert">
          {problem}
        </p>
      )}
    </form>
  );
}
