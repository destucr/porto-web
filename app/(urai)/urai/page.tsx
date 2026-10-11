import styles from "./urai.module.css";

const inviteEmail =
  "mailto:business@destucikal.site?subject=Urai%20beta%20invite&body=Hi%2C%20I'd%20like%20to%20try%20Urai.%20My%20Apple%20ID%20email%20for%20TestFlight%20is%3A%20";

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return <div className={styles.phone}>{children}</div>;
}

function Screenshot({ src, alt }: { src: string; alt: string }) {
  return (
    <PhoneFrame>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} width={720} height={1469} loading="lazy" decoding="async" />
    </PhoneFrame>
  );
}

const features = [
  {
    eyebrow: "Your feed",
    title: "Follow interests, not just people",
    body: "For you shows notes about the books, tools and topics you follow. Every name in a note is coloured and tappable, so one note leads to everyone else reading the same thing.",
    image: "/images/urai/urai-feed.webp",
    alt: "Urai feed with notes about Grokking Algorithms, Swift concurrency and The Swift Programming Language",
  },
  {
    eyebrow: "Your profile",
    title: "A shelf of what you're into",
    body: "Your profile shows what you're reading now and a sticker for everything you write about, so people can see what you're into at a glance.",
    image: "/images/urai/urai-profile.webp",
    alt: "A Urai profile reading Structure and Interpretation of Computer Programs, with Into stickers for books and topics",
  },
  {
    eyebrow: "Quotes",
    title: "Paste a line from a book, then write your take",
    body: "Copy a sentence in Books and paste it, or share it straight to Urai. The book and chapter come along, and your note sits under the quote.",
    image: "/images/urai/urai-composer.webp",
    alt: "The Urai composer with a Paste button for quotes and a note about UIKit Apprentice",
  },
];

const smallerFeatures = [
  ["Thoughts", "Reply to a note with a thought. Short, one level deep, no threads to get lost in."],
  ["Reading now", "Set the book you're on and see who else is reading it, and which chapter they're at."],
  ["Share as image", "Turn any note into a clean card for Threads, X or your story."],
  ["Your own words", "Write the way you talk, in English, Indonesian or both. Urai keeps your exact words."],
];

export default function UraiLandingPage() {
  return (
    <>
      <header className={styles.nav}>
        <a href="#top" className={styles.brand}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/urai/app-icon-180.png" alt="" width={36} height={36} />
          <span>Urai</span>
        </a>
        <a href={inviteEmail} className={styles.navButton}>
          Get an invite
        </a>
      </header>

      <main id="top">
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.badge}>Private beta on iPhone</p>
            <h1>
              Notes on what <span className={styles.coralText}>you&apos;re into</span>.
            </h1>
            <p className={styles.lede}>
              Write a line about the book you&apos;re reading or the thing you&apos;re learning. Urai understands
              what it&apos;s about and puts it next to everyone else who&apos;s into it.
            </p>
            <div className={styles.heroActions}>
              <a href={inviteEmail} className={styles.primaryButton}>
                Ask for a TestFlight invite
              </a>
              <a href="#how" className={styles.secondaryButton}>
                See how it works
              </a>
            </div>
          </div>
          <div className={styles.heroPhone}>
            <PhoneFrame>
              <video
                src="/images/urai/urai-writing.mp4"
                poster="/images/urai/urai-writing-poster.webp"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Writing a note in Urai: as the note mentions UIKit, a UIKit chip appears above the keyboard"
              />
            </PhoneFrame>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className={styles.heroMascot} src="/images/urai/mascot-waving.svg" alt="" width={140} height={140} />
          </div>
        </section>

        <section id="how" className={styles.understanding}>
          <p className={styles.eyebrow}>While you write</p>
          <h2>Urai reads along, and never makes you wait</h2>
          <p className={styles.sectionLede}>
            Type naturally. Urai picks out the books, tools and topics in your note and shows them as chips above
            the keyboard. Wrong guess? Tap the chip and fix it.
          </p>
          <div className={styles.sampleNote}>
            <p>
              <span className={styles.mediaMention}>Grokking Algorithms</span> ch. 6,{" "}
              <span className={styles.techMention}>breadth-first search</span>. Drew the graph on paper and it finally
              made sense.
            </p>
            <div className={styles.chips}>
              <span className={`${styles.chip} ${styles.mediaChip}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/urai/sticker-book.svg" alt="" width={22} height={22} />
                Grokking Algorithms
              </span>
              <span className={`${styles.chip} ${styles.techChip}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/urai/sticker-code.svg" alt="" width={22} height={22} />
                breadth-first search
              </span>
            </div>
          </div>
        </section>

        {features.map((feature, index) => (
          <section
            key={feature.title}
            className={`${styles.feature} ${index % 2 === 1 ? styles.featureReversed : ""}`}
          >
            <div className={styles.featureCopy}>
              <p className={styles.eyebrow}>{feature.eyebrow}</p>
              <h2>{feature.title}</h2>
              <p>{feature.body}</p>
            </div>
            <div className={styles.featureImage}>
              <Screenshot src={feature.image} alt={feature.alt} />
            </div>
          </section>
        ))}

        <section className={styles.smallerFeatures}>
          {smallerFeatures.map(([title, body]) => (
            <div key={title} className={styles.smallerFeature}>
              <h3>{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </section>

        <section className={styles.closing}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/urai/mascot-happy.svg" alt="" width={120} height={120} />
          <h2>Be one of the first people on Urai</h2>
          <p>
            The beta is small on purpose. Send the email you use for your Apple ID and you&apos;ll get a TestFlight
            invite.
          </p>
          <a href={inviteEmail} className={styles.primaryButton}>
            Email business@destucikal.site
          </a>
        </section>
      </main>

      <footer className={styles.footer}>
        <span>Urai · made in Jakarta by</span> <a href="https://destucikal.site">Destu Cikal</a>
      </footer>
    </>
  );
}
