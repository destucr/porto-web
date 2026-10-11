import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import styles from "./urai.module.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "700", "800", "900"],
});

const description =
  "Write a line about the book you're reading or the thing you're learning. Urai understands what it's about and puts it next to everyone else who's into it.";

export const metadata: Metadata = {
  metadataBase: new URL("https://urai.destucikal.site"),
  title: { absolute: "Urai: notes on what you're into" },
  description,
  alternates: { canonical: "https://urai.destucikal.site" },
  openGraph: {
    title: "Urai: notes on what you're into",
    description,
    url: "https://urai.destucikal.site",
    siteName: "Urai",
    type: "website",
    images: [{ url: "/images/urai/app-icon-512.png", width: 512, height: 512, alt: "Urai" }],
  },
  twitter: {
    card: "summary",
    title: "Urai: notes on what you're into",
    description,
    images: ["/images/urai/app-icon-512.png"],
  },
  icons: {
    icon: [{ url: "/images/urai/icon-64.png", sizes: "64x64", type: "image/png" }],
    apple: [{ url: "/images/urai/app-icon-180.png", sizes: "180x180" }],
  },
};

export default function UraiLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${nunito.variable} ${styles.page}`}>{children}</div>;
}
