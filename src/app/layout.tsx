import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import type { ReactNode } from "react";

import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

import "./globals.css";
import { sharedOpenGraph, siteUrl } from "@/lib/site";
import { cn } from "@/lib/utils";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const visbyCF = localFont({
  src: [
    {
      path: "../assets/fonts/visby/VisbyCF-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/visby/VisbyCF-MediumOblique.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../assets/fonts/visby/VisbyCF-DemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../assets/fonts/visby/VisbyCF-DemiBoldOblique.otf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../assets/fonts/visby/VisbyCF-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../assets/fonts/visby/VisbyCF-BoldOblique.otf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: "%s | Gilead Odo",
    default: "Gilead Odo, Senior Frontend Engineer",
  },
  description:
    "Senior Frontend Engineer building complex SaaS and fintech applications with React, Next.js, and TypeScript.",
  openGraph: {
    title: "Gilead Odo, Senior Frontend Engineer",
    description:
      "Senior Frontend Engineer building complex SaaS and fintech applications with React, Next.js, and TypeScript.",
    ...sharedOpenGraph,
  },
  twitter: {
    card: "summary_large_image",
    title: "Gilead Odo, Senior Frontend Engineer",
    description:
      "Senior Frontend Engineer building complex SaaS and fintech applications with React, Next.js, and TypeScript.",
    creator: "@balmofcodes",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

// Inline script that runs before first paint to prevent theme flash.
// Reads localStorage "theme", falls back to system preference, applies
// data-theme + .dark class on <html> synchronously.
const themeInitScript = `(function(){
  var t = localStorage.getItem('theme');
  if (!t) { t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'; }
  document.documentElement.setAttribute('data-theme', t);
  if (t === 'dark') { document.documentElement.classList.add('dark'); document.documentElement.classList.remove('light'); }
  else { document.documentElement.classList.add('light'); document.documentElement.classList.remove('dark'); }
})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn(visbyCF.variable)}>
      <head>
        {/* No-flash theme initialization, must run before body renders */}
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
      </head>
      <body
        className={`${instrumentSerif.variable} ${inter.variable} ${visbyCF.variable} min-h-screen bg-background text-foreground antialiased`}
      >
        {/* Global grain overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-50 opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px 128px",
          }}
        />
        <div className="flex min-h-screen flex-col overflow-x-hidden">
          <Nav />
          <main className="flex min-h-0 flex-1 flex-col">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
