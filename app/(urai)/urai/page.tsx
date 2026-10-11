import { DemoShowcase } from "./demo-showcase";
import styles from "./urai.module.css";

const inviteEmail =
  "mailto:business@destucikal.site?subject=Urai%20early%20access&body=Hi%2C%20I'd%20like%20to%20try%20Urai.%20My%20Apple%20ID%20email%20for%20TestFlight%20is%3A%20";

export default function UraiLandingPage() {
  return (
    <div className={styles.screenFit}>
      <header className={styles.nav}>
        <span className={styles.brand}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/urai/app-icon-180.png" alt="" width={34} height={34} />
          Urai
        </span>
        <a href={inviteEmail} className={styles.navButton}>
          Get early access
        </a>
      </header>

      <main className={styles.hero}>
        <div className={styles.intro}>
          <p className={styles.badge}>
            <span className={styles.badgeDot} aria-hidden="true" />
            Landing on iPhone soon
          </p>
          <h1>
            Notes on what <span className={styles.coralText}>you&apos;re into</span>.
          </h1>
          <p className={styles.lede}>
            Jot a line about what you&apos;re reading or learning. Urai gets what it&apos;s about and connects you
            with people into the same thing.
          </p>
          <div className={styles.actions}>
            <a href={inviteEmail} className={styles.primaryButton}>
              Get early access
            </a>
            <span className={styles.actionNote}>Try it first on TestFlight, free</span>
          </div>
        </div>

        <DemoShowcase />
      </main>

      <footer className={styles.footer}>
        Made in Jakarta by <a href="https://destucikal.site">Destu Cikal</a>
      </footer>
    </div>
  );
}
