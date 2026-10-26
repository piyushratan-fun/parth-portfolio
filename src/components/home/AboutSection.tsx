"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Sparkles,
  Target,
  Stethoscope,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PARTH_PROFILE } from "@/content/parthContent";

export function AboutSection() {
  return (
    <section id="about" className="w-full bg-background py-24 md:py-32 border-t border-foreground/5">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-20"
        >
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <p className="text-primary text-xs font-bold uppercase tracking-[0.25em]">
                About The Student
              </p>
            </div>
            <h2 className="font-display font-bold text-[clamp(36px,7vw,80px)] leading-none tracking-tighter text-display-tone uppercase">
              Science of Life.
            </h2>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mt-4 leading-relaxed">
              {PARTH_PROFILE.summary}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Badge variant="outline" className="px-4 py-1.5 text-xs font-bold tracking-widest uppercase border-foreground/20">
              Stream: PCB
            </Badge>
            <Badge className="px-4 py-1.5 text-xs font-bold tracking-widest uppercase bg-primary text-white">
              Class 12
            </Badge>
          </div>
        </motion.div>

        {/* Bio Grid + Key Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
          {/* Bio text column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 space-y-6 text-muted-foreground text-base md:text-lg leading-relaxed"
          >
            {PARTH_PROFILE.bio.map((para, index) => (
              <p key={index} className="first-of-type:text-foreground first-of-type:font-medium">
                {para}
              </p>
            ))}

            <div className="pt-4 flex flex-wrap gap-4">
              <Button asChild size="lg" className="uppercase font-bold tracking-widest text-xs">
                <a href="#pcb-curriculum">
                  Explore PCB Disciplines <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Stats Cards Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-5 grid grid-cols-2 gap-4"
          >
            {PARTH_PROFILE.stats.map((stat, idx) => (
              <div
                key={stat.label}
                className="group relative overflow-hidden rounded-none border border-foreground/10 bg-card p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-lg"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Stethoscope className="w-16 h-16 text-primary" />
                </div>
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-2">
                  {stat.label}
                </p>
                <p className="font-display text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground mt-2 font-medium">
                  {stat.sub}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* PCB Stream Breakdown Section */}
        <div id="pcb-curriculum" className="pt-12 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <p className="text-primary text-xs font-bold uppercase tracking-[0.25em] mb-2">
              Curriculum & Rigor
            </p>
            <h3 className="font-display font-bold text-3xl md:text-5xl uppercase tracking-tight text-display-tone">
              The Three Pillars of PCB
            </h3>
            <p className="text-muted-foreground text-sm md:text-base mt-2 max-w-xl">
              An interconnected approach to science—from macro anatomical systems down to subatomic particles.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PARTH_PROFILE.subjects.map((subject, idx) => {
              const Icon = subject.icon;
              return (
                <motion.div
                  key={subject.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.12 }}
                  className="rounded-none border border-foreground/10 bg-card p-8 flex flex-col justify-between transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:-translate-y-1"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="h-12 w-12 rounded-none bg-foreground/5 flex items-center justify-center text-foreground group-hover:text-primary transition-colors">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-widest">
                        {subject.badge}
                      </Badge>
                    </div>

                    <h4 className="font-display font-bold text-xl uppercase tracking-tight text-foreground mb-3">
                      {subject.title}
                    </h4>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mb-6">
                      {subject.description}
                    </p>
                  </div>

                  <div className="border-t border-foreground/5 pt-5 space-y-2">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-2">
                      Key Study Domains:
                    </p>
                    {subject.topics.map((topic) => (
                      <div key={topic} className="flex items-center gap-2 text-xs text-foreground/80 font-medium">
                        <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span>{topic}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Academic Milestones / Journey */}
        <div id="journey" className="pt-16 border-t border-foreground/5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <p className="text-primary text-xs font-bold uppercase tracking-[0.25em] mb-2">
              Progression
            </p>
            <h3 className="font-display font-bold text-3xl md:text-5xl uppercase tracking-tight text-display-tone">
              Academic Milestones
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PARTH_PROFILE.milestones.map((m, idx) => {
              const MIcon = m.icon;
              return (
                <motion.div
                  key={m.period}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="rounded-none border border-foreground/10 bg-muted/30 p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <MIcon className="h-4 w-4 text-primary" />
                      <span className="text-xs font-bold uppercase tracking-wider text-primary">
                        {m.period}
                      </span>
                    </div>
                    <h5 className="font-display font-bold text-lg text-foreground mb-2">
                      {m.title}
                    </h5>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {m.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
