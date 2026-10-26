import type { Metadata, Viewport } from "next";
import { AppShell } from "@/components/layout/AppShell";
import { Providers } from "@/app/providers";
import { JsonLd } from "@/components/seo/JsonLd";
import { PARTH_PROFILE } from "@/content/parthContent";
import "../index.css";

const siteUrl = "https://parthkashyap.web.app";
const title = `${PARTH_PROFILE.name} | PCB Stream, Science & Pre-Med Portfolio`;
const description = `${PARTH_PROFILE.name} is a Class 12 student in the PCB (Physics, Chemistry, Biology) stream with a dedicated focus on medical sciences, human physiology, and conceptual scientific inquiry.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s | ${PARTH_PROFILE.name}`,
  },
  description,
  applicationName: "Parth Kashyap Portfolio",
  authors: [
    { name: "Parth Kashyap", url: siteUrl },
    { name: "Piyush Ratan", url: "https://piyushratan.in" },
  ],
  creator: "Piyush Ratan (https://piyushratan.in)",
  publisher: "Quzar (https://quzar.in)",
  keywords: [
    "Parth Kashyap",
    "Parth Kashyap portfolio",
    "PCB stream",
    "Class 12 PCB",
    "NEET aspirant",
    "pre-med student",
    "Physics Chemistry Biology",
    "biology student",
    "medical sciences",
  ],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "profile",
    locale: "en_IN",
    url: siteUrl,
    title,
    description,
    siteName: "Parth Kashyap Portfolio",
    images: [
      {
        url: "/logo.svg",
        width: 1200,
        height: 630,
        alt: "Parth Kashyap - PCB Stream & Pre-Med Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/logo.svg"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: ["/favicon.svg"],
    apple: ["/favicon.svg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0a0a0a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="author" href="https://piyushratan.in" />
        <JsonLd />
      </head>
      <body>
        <noscript>
          <style>{`[data-route-shell]{opacity:1!important;pointer-events:auto!important}`}</style>
        </noscript>
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
