import { DemoShowcase } from "./demo-showcase";
import styles from "./urai.module.css";
import { WaitlistForm } from "./waitlist-form";

const readingSources = ["Apple Books", "Kindle", "PocketBook", "any EPUB reader", "paper books", "your Mac"];

export default function UraiLandingPage() {
  return (
    <>
      <div className={styles.screenFit}>
        <header className={styles.nav}>
          <span className={styles.brand}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/urai/app-icon-180.png" alt="" width={34} height={34} />
            Urai
          </span>
          <a href="#join" className={styles.navButton}>
            Get an invite
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
              <WaitlistForm id="hero-waitlist" />
              <span className={styles.actionNote}>iPhone beta opening soon</span>
            </div>
          </div>

          <DemoShowcase />
        </main>
      </div>

      <section className={styles.worksWith} aria-labelledby="works-with-heading">
        <h2 id="works-with-heading">Save lines from where you already read</h2>
        <ul>
          {readingSources.map((readingSource) => (
            <li key={readingSource}>{readingSource}</li>
          ))}
        </ul>
        <p>Share a highlight, copy a line, scan a printed page, or press a key on your Mac.</p>
      </section>

      <section className={styles.privacy}>
        <p>
          <strong>No ads. No third-party tracking.</strong> Your notes aren&apos;t sold, and page scans stay on your
          iPhone.
        </p>
      </section>

      <section id="join" className={styles.closing}>
        <h2>Be first on the chapter.</h2>
        <p>The beta is small. Leave your email and you&apos;ll get a TestFlight invite.</p>
        <WaitlistForm id="closing-waitlist" />
      </section>

      <footer className={styles.footer}>
        © 2026 URAI RUANG DIGITAL · Built by <a href="https://destucikal.site">Destu Cikal ↗</a>
      </footer>
    </>
  );
}
