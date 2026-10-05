import Image from "next/image"

export function HeroSection() {
  return (
    <section className="pt-10 md:pt-14">
      <p className="reveal font-serif text-[1.375rem] font-semibold tracking-tight" style={{ animationDelay: "0ms" }}>
        Destu Cikal, iOS Developer
      </p>
      <h1
        className="reveal font-serif text-[clamp(1.75rem,4.5vw,2.5rem)] leading-[1.12] font-medium tracking-[-0.015em] text-balance"
        style={{ animationDelay: "40ms" }}
      >
        I build iOS apps for <span className="marker">everyday life</span>.
      </h1>
      <p className="reveal mt-6 max-w-[38rem] text-[1.125rem] leading-[1.7]" style={{ animationDelay: "80ms" }}>
        My day job is{" "}
        <Image
          src="/images/tring-icon.webp"
          alt=""
          width={20}
          height={20}
          className="inline-block size-5 rounded-[5px] border border-border align-[-3px] mr-1"
          unoptimized
        />
        <a
          href="https://apps.apple.com/us/app/tring-by-pegadaian/id1350501409"
          target="_blank"
          rel="noopener noreferrer"
          className="essay-link text-foreground"
        >
          Tring! by Pegadaian
        </a>, the mobile app of Pegadaian, Indonesia&apos;s state owned financial company, known
        for gold investment and pawn loans.
      </p>
    </section>
  )
}
