"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./urai.module.css";

type DemoStep = {
  title: string;
  body: string;
  clipName: string;
  clipLabel: string;
  callout: { sticker: string; label: string; caption: string; tone: "tech" | "media" };
};

const demoSteps: DemoStep[] = [
  {
    title: "Write your take",
    body: "Say what clicked, or paste the line that did. Urai picks out the book and the concepts as you type.",
    clipName: "urai-writing",
    clipLabel: "Typing a note about UIKit Apprentice; a UIKit chip appears above the keyboard",
    callout: { sticker: "/images/urai/sticker-code.svg", label: "UIKit", caption: "spotted as you type", tone: "tech" },
  },
  {
    title: "See what others took from it",
    body: "Quotes and takes from developers reading the books you read. Tap a book or a concept to see every take on it.",
    clipName: "urai-feed",
    clipLabel: "Scrolling the feed: quotes from A Philosophy of Software Design and notes about Swift and DDIA",
    callout: {
      sticker: "/images/urai/sticker-book.svg",
      label: "A Philosophy of Software Design",
      caption: "quoted in the feed",
      tone: "media",
    },
  },
  {
    title: "Add a thought",
    body: "Agree, push back, or share the bug that taught you the same lesson. Short replies, one level deep.",
    clipName: "urai-thoughts",
    clipLabel: "Opening a note with a quote and reading the thought under it",
    callout: { sticker: "/images/urai/sticker-book.svg", label: "1 thought", caption: "under sena's quote", tone: "media" },
  },
  {
    title: "Find people on the same chapter",
    body: "See who's reading the same book right now, and where they are. Tap “I'm reading this” to join them.",
    clipName: "urai-reading-together",
    clipLabel: "Opening a book from a profile, tapping I'm reading this, and adding a chapter",
    callout: { sticker: "/images/urai/sticker-book.svg", label: "2 reading now", caption: "you're on chapter 6", tone: "media" },
  },
];

const fallbackStepDurationMs = 8000;

export function DemoShowcase() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [clipDurationsMs, setClipDurationsMs] = useState<Record<number, number>>({});
  const clipRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    setPrefersReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    clipRefs.current.forEach((clip, index) => {
      if (!clip) return;
      if (index === activeStepIndex && !prefersReducedMotion) {
        clip.currentTime = 0;
        clip.play().catch(() => {});
      } else {
        clip.pause();
      }
    });
  }, [activeStepIndex, prefersReducedMotion]);

  const showNextStep = () => setActiveStepIndex((index) => (index + 1) % demoSteps.length);
  const activeClipDurationMs = clipDurationsMs[activeStepIndex] ?? fallbackStepDurationMs;
  const activeStep = demoSteps[activeStepIndex];

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
                    style={{ animationDuration: `${activeClipDurationMs}ms` }}
                  />
                )}
              </button>
            </li>
          );
        })}
      </ol>

      <div className={styles.stage}>
        <div className={styles.phone}>
          {demoSteps.map((step, index) => (
            <video
              key={step.clipName}
              ref={(clip) => {
                clipRefs.current[index] = clip;
              }}
              className={`${styles.screen} ${index === activeStepIndex ? styles.screenVisible : ""}`}
              src={`/images/urai/${step.clipName}.mp4`}
              poster={`/images/urai/${step.clipName}-poster.webp`}
              muted
              playsInline
              preload={index === 0 ? "auto" : "metadata"}
              onLoadedMetadata={(event) => {
                const clipDurationMs = event.currentTarget.duration * 1000;
                setClipDurationsMs((durations) => ({ ...durations, [index]: clipDurationMs }));
              }}
              onEnded={index === activeStepIndex ? showNextStep : undefined}
              aria-label={step.clipLabel}
              aria-hidden={index !== activeStepIndex}
            />
          ))}
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
