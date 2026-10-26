import { PARTH_PROFILE } from "@/content/parthContent";
import { Dna, Heart, Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-background border-t border-foreground/10 py-10">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-foreground text-background font-display font-bold text-xs">
            {PARTH_PROFILE.monogram}
          </div>
          <p className="text-xs font-semibold text-foreground tracking-wide">
            {PARTH_PROFILE.name}{" "}
            <span className="text-muted-foreground font-normal">
              • PCB Stream (Class 12)
            </span>
          </p>
        </div>

        <div className="flex items-center gap-6 text-xs text-muted-foreground uppercase tracking-widest font-medium">
          <a href="#hero" className="hover:text-foreground transition-colors">
            Back to Top
          </a>
          <a href="#about" className="hover:text-foreground transition-colors">
            About
          </a>
          <a href="#pcb-curriculum" className="hover:text-foreground transition-colors">
            PCB Focus
          </a>
        </div>

        <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-widest">
          &copy; {new Date().getFullYear()} {PARTH_PROFILE.name}. Dedicated to Science & Medicine.
        </p>
      </div>
    </footer>
  );
}
