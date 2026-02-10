import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AmbientBackground } from "@/components/ambient-background";
import { StructuredData } from "@/components/structured-data";
import { GoogleAnalytics } from "@/components/google-analytics";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://destucikal.site"),
  title: {
    default: "Destu Cikal | iOS Developer",
    template: "%s | Destu Cikal",
  },
  description: "Native iOS Developer building high-performance applications with UIKit and SwiftUI.",
  openGraph: {
    title: "Destu Cikal | iOS Developer",
    description: "Native iOS Developer building high-performance applications with UIKit and SwiftUI.",
    url: "./",
    siteName: "Destu Cikal Portfolio",
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "./",
  },
  twitter: {
    card: "summary_large_image",
    title: "Destu Cikal | iOS Developer",
    description: "Native iOS Developer building high-performance applications with UIKit and SwiftUI.",
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
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fadeIn 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          }
        `}} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__name = window.__name || ((f, n) => f);`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AmbientBackground />
          <StructuredData />
          <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GA_ID || "G-XXXXXXXXXX"} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
