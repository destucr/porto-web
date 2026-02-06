import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AmbientBackground } from "@/components/ambient-background";
import { StructuredData } from "@/components/structured-data";


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
    default: "Destu Cikal | iOS & Full-stack Developer",
    template: "%s | Destu Cikal",
  },
  description: "Technical portfolio showcasing native iOS engineering, full-stack systems, and machine learning projects.",
  openGraph: {
    title: "Destu Cikal | iOS & Full-stack Developer",
    description: "Technical portfolio showcasing native iOS engineering, full-stack systems, and machine learning projects.",
    url: "./",
    siteName: "Destu Cikal Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Destu Cikal | iOS & Full-stack Developer",
    description: "Technical portfolio showcasing native iOS engineering, full-stack systems, and machine learning projects.",
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
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
