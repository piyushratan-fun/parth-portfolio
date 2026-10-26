"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PARTH_PROFILE } from "@/content/parthContent";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Hero", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "PCB Stream", href: "#pcb-curriculum" },
    { label: "Academic Journey", href: "#journey" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-foreground/5 bg-background/95 shadow-sm md:bg-background/90 md:backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex min-h-[4.5rem] max-w-[1600px] items-center justify-between px-6 md:px-12">
        {/* Brand Monogram */}
        <Link href="#hero" className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground text-background font-display font-bold text-sm tracking-tight transition-transform duration-300 group-hover:scale-105 shadow-md">
            {PARTH_PROFILE.monogram}
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold tracking-tight text-foreground text-base leading-none">
              PARTH<span className="text-primary font-normal">.K</span>
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground mt-1">
              PCB • Class 12
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground transition-colors duration-200 hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3 pl-4 border-l border-foreground/10">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[11px] font-medium text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Pre-Med Aspirant
            </div>
            <Button asChild size="sm" className="font-bold tracking-wider uppercase text-xs">
              <a href="#about">About Parth</a>
            </Button>
          </div>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] max-w-sm pt-12 bg-background border-border">
              <SheetHeader className="text-left mb-6">
                <SheetTitle className="font-display font-bold text-lg uppercase tracking-wider">
                  {PARTH_PROFILE.name}
                </SheetTitle>
                <p className="text-xs text-muted-foreground uppercase tracking-widest">
                  Physics • Chemistry • Biology
                </p>
              </SheetHeader>
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-base font-semibold uppercase tracking-wider text-foreground/80 hover:text-primary py-2 border-b border-foreground/5"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="pt-4">
                  <Button asChild className="w-full font-bold uppercase tracking-widest">
                    <a href="#about" onClick={() => setIsMobileMenuOpen(false)}>
                      Explore Profile
                    </a>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
}
