import {
  Atom,
  Dna,
  FlaskConical,
  HeartPulse,
  Microscope,
  Stethoscope,
  Sparkles,
  BookOpen,
  GraduationCap,
  Target,
  Compass,
} from "lucide-react";

export const PARTH_PROFILE = {
  name: "Parth Kashyap",
  firstName: "Parth",
  lastName: "Kashyap",
  monogram: "PK",
  domain: "parthkashyap.in",
  tagline: "Exploring life, molecular systems, and the science of living matter.",
  stream: "PCB",
  streamFullName: "Physics, Chemistry & Biology",
  level: "Class 12 Senior Secondary",
  focus: "Pre-Medical • Biological Sciences • Conceptual Rigor",
  location: "Uttar Pradesh, India",
  summary:
    "I'm Parth Kashyap, a Class 12 student in the PCB (Physics, Chemistry, Biology) stream. Driven by an intense curiosity about living organisms, physiological systems, and biomedical sciences, I combine analytical reasoning with meticulous scientific study.",
  bio: [
    "I am a Class 12 student with a focused commitment to the medical sciences and natural sciences. For me, choosing PCB was a natural calling: understanding how physical laws govern molecular interactions, and how biochemical pathways sustain life.",
    "Whether breaking down complex metabolic cascades in biology, mastering electron movements in organic chemistry, or solving problems in ray optics and electrostatics, I believe in mastering first principles rather than rote memorization.",
    "My near-term objective is building rock-solid conceptual mastery for medical entrance examinations (NEET) and laying a rigorous foundation for a career in medicine, clinical healthcare, and biological research.",
  ],
  stats: [
    { label: "Core Stream", value: "PCB", sub: "Physics, Chem, Bio" },
    { label: "Academic Level", value: "Class 12", sub: "Senior Secondary" },
    { label: "Ambition", value: "Medicine", sub: "Pre-Med / NEET" },
    { label: "Discipline", value: "100%", sub: "Conceptual Mastery" },
  ],
  subjects: [
    {
      title: "Biology & Life Systems",
      icon: Dna,
      badge: "Core Passion",
      color: "from-emerald-500/10 to-teal-500/10",
      accent: "text-emerald-600 dark:text-emerald-400",
      description:
        "Deep exploration into human physiology, cellular respiration, genetics, and biotechnology. Understanding how micro-scale biomolecules coordinate complex macroscopic life.",
      topics: [
        "Human Physiology & Endocrine Systems",
        "Genetics, Molecular Biology & Inheritance",
        "Cell Division & Cytology",
        "Ecology, Biodiversity & Evolution",
      ],
    },
    {
      title: "Chemistry & Molecular Sciences",
      icon: FlaskConical,
      badge: "Biochemical Core",
      color: "from-blue-500/10 to-indigo-500/10",
      accent: "text-blue-600 dark:text-blue-400",
      description:
        "Bridging theoretical atomic structure with organic reaction kinetics, chemical equilibrium, coordination compounds, and biomolecular synthesis.",
      topics: [
        "Organic Reaction Mechanisms & Carbonyls",
        "Biomolecules: Proteins, Carbohydrates, DNA",
        "Chemical Kinetics & Electrochemistry",
        "Coordination Chemistry & Periodic Trends",
      ],
    },
    {
      title: "Physics & Natural Laws",
      icon: Atom,
      badge: "Analytical Precision",
      color: "from-purple-500/10 to-violet-500/10",
      accent: "text-purple-600 dark:text-purple-400",
      description:
        "Applying mathematical precision to the physical laws governing energy, motion, optics, electromagnetism, and modern nuclear phenomena.",
      topics: [
        "Electromagnetism & Current Electricity",
        "Ray & Wave Optics",
        "Thermodynamics & Fluid Dynamics",
        "Modern Physics & Atomic Structure",
      ],
    },
  ],
  milestones: [
    {
      period: "Class 11 Foundations",
      title: "Mastering Core Foundations",
      desc: "Built comprehensive conceptual clarity in cell biology, plant physiology, chemical bonding, and Newtonian mechanics.",
      icon: BookOpen,
    },
    {
      period: "Class 12 Focus",
      title: "Integrated PCB & Pre-Med Prep",
      desc: "Delving deep into human organ systems, genetics, electrochemistry, and problem-solving speed for competitive medical exams.",
      icon: Target,
    },
    {
      period: "Future Horizon",
      title: "Medical & Healthcare Impact",
      desc: "Aiming to enter top medical institutions to dedicate life to clinical practice, healing, and biomedical advancement.",
      icon: Compass,
    },
  ],
};
