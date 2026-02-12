import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { StructuredData } from "@/components/structured-data";
import { GoogleAnalytics } from "@/components/google-analytics";

const rocGrotesk = localFont({
  variable: "--font-roc-grotesk",
  display: "swap",
  src: [
    {
      path: "../public/fonts/fonnts.com-Roc_Grotesk_Thin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/fonnts.com-Roc_Grotesk_Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/fonnts.com-Roc_Grotesk_Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/fonnts.com-Roc_Grotesk_Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/fonnts.com-Roc_Grotesk_Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/fonnts.com-Roc_Grotesk_Black.otf",
      weight: "900",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://destucikal.site"),
  title: {
    default: "Destu Cikal — iOS Developer",
    template: "%s — Destu Cikal",
  },
  description: "iOS Developer crafting native apps with Swift, UIKit, and SwiftUI. Apple Developer Academy graduate building production mobile applications.",
  keywords: ["iOS Developer", "Swift", "UIKit", "SwiftUI", "mobile app developer", "Destu Cikal", "Apple Developer Academy", "portfolio"],
  openGraph: {
    title: "Destu Cikal — iOS Developer",
    description: "iOS Developer crafting native apps with Swift, UIKit, and SwiftUI.",
    url: "./",
    siteName: "Destu Cikal",
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "./",
  },
  twitter: {
    card: "summary_large_image",
    title: "Destu Cikal — iOS Developer",
    description: "iOS Developer crafting native apps with Swift, UIKit, and SwiftUI.",
  },
  icons: {
    icon: [
      { url: "/images/logo/logo-light.webp", media: "(prefers-color-scheme: light)" },
      { url: "/images/logo/logo-dark.webp", media: "(prefers-color-scheme: dark)" },
    ],
    apple: [
      { url: "/images/logo/logo-light.webp" }
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
      </head>
      <body
        className={`${rocGrotesk.variable} ${rocGrotesk.className} antialiased min-h-screen bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <StructuredData />
          <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GA_ID || "G-XXXXXXXXXX"} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
