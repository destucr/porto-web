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
  "An iPhone app for short takes on the programming books you're reading. Quote a passage, add what you learned, and see what others took from the same chapter.";

export const metadata: Metadata = {
  metadataBase: new URL("https://urai.destucikal.site"),
  title: { absolute: "Urai: never read alone" },
  description,
  alternates: { canonical: "https://urai.destucikal.site" },
  openGraph: {
    title: "Urai: never read alone",
    description,
    url: "https://urai.destucikal.site",
    siteName: "Urai",
    type: "website",
    images: [{ url: "/images/urai/app-icon-512.png", width: 512, height: 512, alt: "Urai" }],
  },
  twitter: {
    card: "summary",
    title: "Urai: never read alone",
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
