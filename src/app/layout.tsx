import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Sora } from "next/font/google";
import type { ReactNode } from "react";

import { ThemeHotkey } from "@/components/theme-hotkey";
import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Gilead Odo — Software Developer",
  description:
    "Portfolio of Gilead Odo — software developer exploring the intersection of design, music, and code.",
  openGraph: {
    title: "Gilead Odo — Software Developer",
    description:
      "Portfolio of Gilead Odo — software developer exploring the intersection of design, music, and code.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gilead Odo — Software Developer",
    description:
      "Portfolio of Gilead Odo — software developer exploring the intersection of design, music, and code.",
    creator: "@balmofcodes",
  },
  // Archived v1 served at v1.gileadodo.com — keep it out of search results
  // and point search engines at the current site.
  robots: { index: false, follow: true },
  alternates: { canonical: "https://gileadodo.com/" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${sora.variable} ${instrumentSerif.variable} min-h-screen bg-background text-foreground antialiased`}
      >
        <ThemeProvider>
          <ThemeHotkey />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
