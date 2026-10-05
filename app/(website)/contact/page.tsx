import Link from "next/link"
import { Metadata } from "next"
import { CopyEmail } from "@/components/copy-email"

export const metadata: Metadata = {
  title: "Contact",
  description: "Hire Destu Cikal for iOS roles and freelance builds. Email, response time, and what to write.",
}

export default function ContactPage() {
  return (
    <div className="pb-24">
      <section className="pt-14 md:pt-20 pb-10">
        <h1 className="text-[clamp(2.25rem,6vw,3.25rem)] leading-[1.05] font-semibold tracking-[-0.03em]">
          Contact.
        </h1>
        <p className="lede mt-7 max-w-[34rem]">
          I&apos;m looking for iOS work, freelance or full time.
        </p>
      </section>

      <section className="pb-4">
        <CopyEmail email="destucr@gmail.com" className="text-xl" />
        <p className="mt-6 text-foreground/75 leading-[1.75] max-w-[34rem]">
          Tell me what you&apos;re building, when you need it, and what done looks like. I read
          every message and answer within a few days.
        </p>
        <p className="meta tnum mt-6">
          <Link
            href="https://github.com/destucr"
            target="_blank"
            rel="noopener noreferrer"
            className="essay-link"
          >
            GitHub
          </Link>
          {"  ·  "}
          <Link
            href="https://linkedin.com/in/destucikal"
            target="_blank"
            rel="noopener noreferrer"
            className="essay-link"
          >
            LinkedIn
          </Link>
        </p>
      </section>
    </div>
  )
}
