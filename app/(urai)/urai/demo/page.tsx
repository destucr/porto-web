import type { Metadata } from "next";
import Link from "next/link";
import styles from "../urai.module.css";

export const metadata: Metadata = {
  title: { absolute: "Urai demo: save a line with Back Tap" },
  description: "Copy a line in Apple Books, tap the back of your iPhone twice, and it waits in Urai for your take.",
  alternates: { canonical: "https://urai.destucikal.site/demo" },
};

// Clip names carry a hash of their content because /images is cached as immutable.
const demoClip = "/images/urai/urai-back-tap.6221912e";

export default function UraiDemoPage() {
  return (
    <div className={styles.screenFit}>
      <header className={styles.nav}>
        <Link href="/" className={styles.brand}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/urai/app-icon-180.png" alt="" width={34} height={34} />
          Urai
        </Link>
        <Link href="/#join" className={styles.navButton}>
          Get an invite
        </Link>
      </header>

      <main className={styles.demoPage}>
        <div>
          <p className={styles.tagline}>15-second demo</p>
          <h1>Save a line without leaving your book.</h1>
          <ol className={styles.macSteps}>
            <li>Select a line in Apple Books and tap Copy.</li>
            <li>Tap the back of your iPhone twice. Urai saves the line without opening.</li>
            <li>Later, open Urai: the line is waiting in Saved Lines, ready for your take.</li>
          </ol>
          <p className={styles.macHint}>Back Tap is set up once in Settings → Accessibility → Touch.</p>
        </div>

        <div className={styles.demoPhone}>
          <video
            src={`${demoClip}.mp4`}
            poster={`${demoClip}-poster.webp`}
            autoPlay
            muted
            loop
            playsInline
            controls
            aria-label="Copying a line in Apple Books, double-tapping the back of the iPhone to save it to Urai, then opening it in Urai's Saved Lines and composer"
          />
        </div>
      </main>

      <footer className={styles.footer}>© 2026 URAI RUANG DIGITAL</footer>
    </div>
  );
}
