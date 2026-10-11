import type { Metadata } from "next";
import Link from "next/link";
import styles from "../urai.module.css";
import { MacKeyCopy } from "./mac-key-copy";

export const metadata: Metadata = {
  title: { absolute: "Save to Urai from your Mac" },
  description: "Add the Save to Urai shortcut: save a line from any reading app on your Mac with one keystroke.",
  alternates: { canonical: "https://urai.destucikal.site/mac" },
  robots: { index: false },
};

/// Opened from Urai on the iPhone (Handoff): add the shortcut, paste the key
/// the phone just copied, done.
export default function UraiMacSetupPage() {
  return (
    <div className={styles.screenFit}>
      <header className={styles.nav}>
        <Link href="/" className={styles.brand}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/urai/app-icon-180.png" alt="" width={34} height={34} />
          Urai
        </Link>
      </header>

      <main className={styles.macSetup}>
        <p className={styles.tagline}>Urai on your Mac</p>
        <h1>Save a line from any book on your Mac.</h1>
        <p className={styles.lede}>
          Select a line in your reading app, press your shortcut, and it waits in Urai on your iPhone.
        </p>

        <ol className={styles.macSteps}>
          <li>
            <strong>Copy your key:</strong>
            <MacKeyCopy />
          </li>
          <li>
            <a href="/urai/Save-to-Urai.shortcut" className={styles.secondaryLink} download="Save to Urai.shortcut">
              Add to Shortcuts
            </a>
            , open the downloaded file and click <strong>Add Shortcut</strong>.
          </li>
          <li>
            When it asks for your key, press <kbd>⌘V</kbd>.
          </li>
          <li>
            Optional: in the shortcut&apos;s details, choose <strong>Add Keyboard Shortcut</strong>, like <kbd>⌥⌘U</kbd>.
          </li>
        </ol>

        <p className={styles.macHint}>
          To save a line: select it in your reading app, then right-click → Services → Save to Urai (or your keyboard shortcut).
        </p>
      </main>

      <footer className={styles.footer}>
        © 2026 URAI RUANG DIGITAL
      </footer>
    </div>
  );
}
