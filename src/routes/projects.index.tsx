import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { allProjects } from "@/lib/content";
import { SectionLabel } from "@/components/SectionLabel";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Projects — Yug Dalwadi" },
      { name: "description", content: "A selection of ML systems, autonomous software, and research prototypes by Yug Dalwadi." },
      { property: "og:title", content: "Projects — Yug Dalwadi" },
      { property: "og:description", content: "A selection of ML systems, autonomous software, and research prototypes." },
      { property: "og:url", content: "/projects" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: Projects,
});

function Projects() {
  const categories = useMemo(() => ["All", ...Array.from(new Set(allProjects.map((p) => p.category)))], []);
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? allProjects : allProjects.filter((p) => p.category === active);

  return (
    <div className="max-w-6xl mx-auto px-6 lg:px-10 pt-24 pb-16">
      <SectionLabel n="∎">Projects</SectionLabel>
      <h1 className="font-display text-5xl md:text-6xl leading-tight">Case studies.</h1>
      <p className="mt-5 max-w-xl text-muted-foreground">
        Selected work spanning machine learning research, autonomous software, and the
        infrastructure underneath. Each is documented as a technical write-up rather than a pitch.
      </p>

      <div className="mt-12 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`px-3.5 py-1.5 text-sm rounded-md border transition-all ${
              active === c
                ? "border-accent text-accent bg-accent/5"
                : "border-border text-muted-foreground hover:border-border-strong hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {filtered.map((p) => (
          <Link
            key={p.slug}
            to="/projects/$slug"
            params={{ slug: p.slug }}
            className="group flex flex-col border border-border rounded-xl overflow-hidden bg-surface/40 hover:border-border-strong hover:-translate-y-0.5 transition-all duration-300"
          >
            <div className="aspect-[16/10] overflow-hidden bg-surface-2 border-b border-border relative">
              {p.cover ? (
                <img src={p.cover} alt={p.title} loading="lazy" className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-500" />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-display text-7xl text-muted-foreground/25">
                  {p.title.charAt(0)}
                </div>
              )}
              <span className="absolute top-3 left-3 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-accent bg-background/70 backdrop-blur rounded border border-border">
                {p.category}
              </span>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-baseline justify-between gap-3">
                <h2 className="font-display text-2xl group-hover:text-accent transition-colors">{p.title}</h2>
                <span className="font-mono text-xs text-muted-foreground">{p.year}</span>
              </div>
              <p className="mt-2 text-muted-foreground flex-1">{p.description}</p>
              <div className="mt-5 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.slice(0, 4).map((t) => (
                    <span key={t} className="px-2 py-0.5 text-[11px] font-mono text-muted-foreground border border-border rounded">{t}</span>
                  ))}
                </div>
                <ArrowUpRight size={16} className="text-muted-foreground group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
