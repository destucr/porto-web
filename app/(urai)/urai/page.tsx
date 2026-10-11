import { DemoShowcase } from "./demo-showcase";
import styles from "./urai.module.css";

const inviteEmail =
  "mailto:business@destucikal.site?subject=Urai%20waitlist&body=Hi%2C%20please%20add%20me%20to%20the%20Urai%20waitlist.%20My%20Apple%20ID%20email%20for%20TestFlight%20is%3A%20";

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
          Join the waitlist
        </a>
      </header>

      <main className={styles.hero}>
        <div className={styles.intro}>
          <p className={styles.tagline}>Never read alone.</p>
          <h1>
            Share what you learn from <span className={styles.coralText}>programming books</span>.
          </h1>
          <p className={styles.lede}>
            Quote the line that clicked, add your take, and see what other developers took from the same chapter.
          </p>
          <div className={styles.actions}>
            <a href={inviteEmail} className={styles.primaryButton}>
              Join the waitlist
            </a>
            <span className={styles.actionNote}>
              <span className={styles.badgeDot} aria-hidden="true" />
              iPhone beta opening soon
            </span>
          </div>
        </div>

        <DemoShowcase />
      </main>

    </div>
  );
}
