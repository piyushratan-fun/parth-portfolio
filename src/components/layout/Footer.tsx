import { PARTH_PROFILE } from "@/content/parthContent";
import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-background border-t border-foreground/10 py-12">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
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

        {/* Authoritative Backlink & Credits Badge */}
        <div className="pt-6 border-t border-foreground/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-foreground/[0.03] dark:bg-foreground/[0.05] border border-foreground/10 text-xs text-muted-foreground transition-all duration-200 hover:border-foreground/20">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="tracking-wide">
              Crafted with precision by{" "}
              <a
                href="https://piyushratan.in"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-foreground hover:text-primary transition-colors underline-offset-4 hover:underline"
              >
                Piyush Ratan
              </a>{" "}
              • Powered by{" "}
              <a
                href="https://quzar.in"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-foreground hover:text-primary transition-colors underline-offset-4 hover:underline"
              >
                Quzar
              </a>
            </span>
          </div>

          <p className="text-[11px] font-mono tracking-wider uppercase text-muted-foreground/70">
            Senior Secondary Pre-Med Archive
          </p>
        </div>
      </div>
    </footer>
  );
}
