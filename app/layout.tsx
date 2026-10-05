import type { Metadata } from "next";
import { Newsreader, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { StructuredData } from "@/components/structured-data";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
});

const jbmono = JetBrains_Mono({
  variable: "--font-jbmono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://destucikal.site"),
  title: {
    default: "Destu Cikal, iOS developer",
    template: "%s, Destu Cikal",
  },
  description: "I'm Destu Cikal. I build native iOS apps people trust. Fintech, health, transit. Notes on how I work, what I've made, and where I'm going.",
  keywords: ["Destu Cikal", "iOS Developer", "Swift", "SwiftUI", "UIKit", "portfolio", "essays"],
  openGraph: {
    title: "Destu Cikal, iOS developer",
    description: "I build native iOS apps people trust. Work, notes, and ambitions.",
    url: "./",
    siteName: "Destu Cikal",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/logo/og-cover.png",
        width: 1200,
        height: 630,
        alt: "Destu Cikal",
      },
    ],
  },
  alternates: {
    canonical: "./",
  },
  twitter: {
    card: "summary_large_image",
    title: "Destu Cikal, iOS developer",
    description: "I build native iOS apps people trust. Work, notes, and ambitions.",
    images: ["/images/logo/og-cover.png"],
  },
  icons: {
    icon: [{ url: "/images/logo/icon.png", sizes: "64x64", type: "image/png" }],
    apple: [{ url: "/images/logo/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${newsreader.variable} ${jbmono.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        <ThemeProvider>
          <StructuredData />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
