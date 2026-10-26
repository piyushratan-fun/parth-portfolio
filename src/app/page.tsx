"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/home/Hero";
import { AboutSection } from "@/components/home/AboutSection";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="w-full bg-background min-h-screen">
      <Navbar />
      <Hero />
      <AboutSection />
      <Footer />
    </main>
  );
}
