import { createFileRoute } from "@tanstack/react-router";
import { SectionLabel } from "@/components/SectionLabel";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Yug Dalwadi" },
      { name: "description", content: "About Yug Dalwadi — an undergraduate student at IIT Jodhpur, specializing in Artificial Intelligence and Data Science." },
      { property: "og:title", content: "About — Yug Dalwadi" },
      { property: "og:description", content: "About Yug Dalwadi — an undergraduate student at IIT Jodhpur, specializing in Artificial Intelligence and Data Science." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

const timeline = [
  { year: "2024 — 2028", title: "B.Tech in AI & Data Science, IIT Jodhpur", desc: "Pursuing my undergraduate degree with a focus on machine learning, data structures, and algorithms." },
  { year: "2025 — 2026", title: "Core Team Member, Devlup & RAID", desc: "Active member of the open-source and AI clubs, contributing to projects and mentoring peers." },
  { year: "2025", title: "Inter IIT Tech Meet 14.0", desc: "Architected a real-time fraud detection system, securing a top rank against 23 IITs." },
];

const stack = {
  "Languages": ["Python", "C++", "Go", "SQL", "C#", "Lua"],
  "AI/ML": ["PyTorch", "Scikit-learn", "River (Streaming ML)", "Transformer Architectures", "Vector Search (Pinecone)", "LLM Pre-training"],
  "Systems & Tools": ["Kafka", "Docker", "FastAPI", "Django", "PostgreSQL", "Neo4j", "Apache Arrow", "Celery", "Weights & Biases"],
  "Developer Tools": ["Git", "Linux (Bash)", "Microservices Architecture"],
};

function About() {
  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-10 pt-24 pb-16">
      <SectionLabel n="∎">About</SectionLabel>
      <h1 className="font-display text-5xl md:text-6xl leading-[1.05]">
        I'm Yug — a student and developer passionate about <span className="italic text-muted-foreground">building intelligent systems</span>.
      </h1>

      <div className="mt-10 space-y-6 text-lg leading-relaxed text-muted-foreground max-w-2xl">
        <p>
          I am an undergraduate student at IIT Jodhpur, pursuing a B.Tech in Artificial Intelligence and Data Science. My primary interests lie in the fields of machine learning, deep learning, and building robust backend systems.
        </p>
        <p>
          I am fascinated by the process of taking a research idea and turning it into a functional, real-world application. I enjoy exploring everything from the theoretical foundations of algorithms to the practical challenges of deploying and scaling them.
        </p>
        <p>
          Outside of my coursework, I am an active member of my university's open-source and AI clubs. I also enjoy writing about what I'm learning and contributing to open-source projects.
        </p>
      </div>

      <div className="mt-20">
        <SectionLabel n="01">Timeline</SectionLabel>
        <div className="space-y-0 border-l border-border ml-2">
          {timeline.map((t) => (
            <div key={t.year} className="pl-8 pb-10 relative">
              <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-accent" />
              <p className="font-mono text-xs text-accent tracking-wider">{t.year}</p>
              <h3 className="mt-1.5 font-display text-2xl">{t.title}</h3>
              <p className="mt-1.5 text-muted-foreground">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <SectionLabel n="02">Stack</SectionLabel>
        <div className="grid sm:grid-cols-2 gap-6">
          {Object.entries(stack).map(([k, items]) => (
            <div key={k} className="p-5 border border-border rounded-xl bg-surface/40">
              <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-3">{k}</p>
              <div className="flex flex-wrap gap-1.5">
                {items.map((i) => (
                  <span key={i} className="px-2.5 py-1 text-sm border border-border rounded text-foreground/90">{i}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
