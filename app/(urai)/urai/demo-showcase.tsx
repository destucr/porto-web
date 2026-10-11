"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./urai.module.css";

type DemoStep = {
  title: string;
  body: string;
  durationMs: number;
  screen: { kind: "video"; src: string; poster: string } | { kind: "image"; src: string };
  screenLabel: string;
  callout: { sticker: string; label: string; caption: string; tone: "tech" | "media" };
};

const demoSteps: DemoStep[] = [
  {
    title: "Write like you text",
    body: "Mention a book or a topic. Urai spots it while you type: no hashtags, no waiting.",
    durationMs: 12500,
    screen: { kind: "video", src: "/images/urai/urai-writing.mp4", poster: "/images/urai/urai-writing-poster.webp" },
    screenLabel: "Typing a note about UIKit Apprentice; a UIKit chip appears above the keyboard",
    callout: { sticker: "/images/urai/sticker-code.svg", label: "UIKit", caption: "spotted as you type", tone: "tech" },
  },
  {
    title: "Find people into the same thing",
    body: "Your feed fills with notes about what you follow. Tap any coloured name to see everyone else on it.",
    durationMs: 5500,
    screen: { kind: "image", src: "/images/urai/urai-feed.webp" },
    screenLabel: "The Urai feed with notes about Grokking Algorithms and Swift concurrency",
    callout: {
      sticker: "/images/urai/sticker-book.svg",
      label: "Grokking Algorithms",
      caption: "tap to see who's reading it",
      tone: "media",
    },
  },
  {
    title: "Watch your shelf grow",
    body: "Every book and topic you write about becomes a sticker on your profile, next to what you're reading now.",
    durationMs: 5500,
    screen: { kind: "image", src: "/images/urai/urai-profile.webp" },
    screenLabel: "A profile reading Structure and Interpretation of Computer Programs, with stickers for books and topics",
    callout: { sticker: "/images/urai/sticker-book.svg", label: "Reading now · SICP", caption: "chapter 1.2", tone: "media" },
  },
];

export function DemoShowcase() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const writingVideoRef = useRef<HTMLVideoElement>(null);
  const activeStep = demoSteps[activeStepIndex];

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(motionQuery.matches);
  }, []);

  useEffect(() => {
    const writingVideo = writingVideoRef.current;
    if (writingVideo && activeStep.screen.kind === "video" && !prefersReducedMotion) {
      writingVideo.currentTime = 0;
      writingVideo.play().catch(() => {});
    }
    if (prefersReducedMotion) return;
    const advanceTimer = window.setTimeout(
      () => setActiveStepIndex((index) => (index + 1) % demoSteps.length),
      activeStep.durationMs,
    );
    return () => window.clearTimeout(advanceTimer);
  }, [activeStep, prefersReducedMotion]);

  return (
    <div className={styles.showcase}>
      <ol className={styles.steps}>
        {demoSteps.map((step, index) => {
          const isActive = index === activeStepIndex;
          return (
            <li key={step.title}>
              <button
                type="button"
                className={`${styles.step} ${isActive ? styles.stepActive : ""}`}
                aria-current={isActive ? "step" : undefined}
                onClick={() => setActiveStepIndex(index)}
              >
                <span className={styles.stepNumber}>{index + 1}</span>
                <span className={styles.stepText}>
                  <span className={styles.stepTitle}>{step.title}</span>
                  <span className={styles.stepBody}>{step.body}</span>
                </span>
                {isActive && !prefersReducedMotion && (
                  <span
                    key={activeStepIndex}
                    className={styles.stepProgress}
                    style={{ animationDuration: `${step.durationMs}ms` }}
                  />
                )}
              </button>
            </li>
          );
        })}
      </ol>

      <div className={styles.stage}>
        <div className={styles.phone}>
          {demoSteps.map((step, index) => {
            const screenClass = `${styles.screen} ${index === activeStepIndex ? styles.screenVisible : ""}`;
            return step.screen.kind === "video" ? (
              <video
                key={step.title}
                ref={writingVideoRef}
                className={screenClass}
                src={step.screen.src}
                poster={step.screen.poster}
                muted
                playsInline
                preload="auto"
                aria-label={step.screenLabel}
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={step.title}
                className={screenClass}
                src={step.screen.src}
                alt={step.screenLabel}
                width={720}
                height={1469}
                decoding="async"
              />
            );
          })}
        </div>

        <div
          key={activeStepIndex}
          className={`${styles.callout} ${activeStep.callout.tone === "tech" ? styles.calloutTech : styles.calloutMedia}`}
          aria-hidden="true"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={activeStep.callout.sticker} alt="" width={30} height={30} />
          <span>
            <strong>{activeStep.callout.label}</strong>
            <small>{activeStep.callout.caption}</small>
          </span>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={styles.mascot} src="/images/urai/mascot-waving.svg" alt="" width={110} height={110} />
      </div>
    </div>
  );
}
