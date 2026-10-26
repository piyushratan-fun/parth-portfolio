import type { Metadata, Viewport } from "next";
import { AppShell } from "@/components/layout/AppShell";
import { Providers } from "@/app/providers";
import { PARTH_PROFILE } from "@/content/parthContent";
import "../index.css";

export const metadata: Metadata = {
  title: `${PARTH_PROFILE.name} | PCB Stream, Science & Pre-Med Portfolio`,
  description: `${PARTH_PROFILE.name} is a Class 12 student specializing in the PCB (Physics, Chemistry, Biology) stream with a dedicated focus on medical sciences, human physiology, and conceptual scientific rigor.`,
  keywords: [
    "Parth Kashyap",
    "Parth Kashyap portfolio",
    "PCB stream",
    "Class 12 PCB",
    "NEET aspirant",
    "pre-med student",
    "Physics Chemistry Biology",
    "biology student",
  ],
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
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
