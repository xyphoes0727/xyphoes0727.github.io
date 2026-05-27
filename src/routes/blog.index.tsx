import { createFileRoute, Link } from "@tanstack/react-router";
import { allBlogs } from "@/lib/content";
import { SectionLabel } from "@/components/SectionLabel";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Writing — Yug Dalwadi" },
      { name: "description", content: "Essays and notes on machine learning, systems engineering, and the craft of shipping ML." },
      { property: "og:title", content: "Writing — Yug Dalwadi" },
      { property: "og:description", content: "Essays and notes on ML, systems, and engineering craft." },
      { property: "og:url", content: "/blog" },
    ],
    links: [
      { rel: "canonical", href: "/blog" },
      { rel: "alternate", type: "application/rss+xml", href: "/rss.xml", title: "Yug Dalwadi — Writing" },
    ],
  }),
  component: Blog,
});

function Blog() {
  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-10 pt-24 pb-16">
      <SectionLabel n="∎">Writing</SectionLabel>
      <h1 className="font-display text-5xl md:text-6xl leading-tight">Notes & essays.</h1>
      <p className="mt-5 text-muted-foreground max-w-xl">
        Long-form thinking on ML systems, deep learning, and the engineering craft that
        sits underneath. Updated occasionally.
      </p>

      <div className="mt-14 divide-y divide-border border-y border-border">
        {allBlogs.map((p) => (
          <Link
            key={p.slug}
            to="/blog/$slug"
            params={{ slug: p.slug }}
            className="group flex items-baseline justify-between gap-6 py-7 hover:px-3 transition-all"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-mono text-xs text-muted-foreground">{p.date}</span>
                <span className="text-muted-foreground/40">·</span>
                <span className="font-mono text-xs text-muted-foreground">{p.readingTime}</span>
                {p.tags.slice(0, 2).map((t) => (
                  <span key={t} className="font-mono text-xs text-accent/80">#{t}</span>
                ))}
              </div>
              <h2 className="font-display text-2xl md:text-3xl text-foreground group-hover:text-accent transition-colors">
                {p.title}
              </h2>
              <p className="mt-1.5 text-muted-foreground">{p.description}</p>
            </div>
            <ArrowUpRight size={18} className="text-muted-foreground group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0 hidden sm:block" />
          </Link>
        ))}
      </div>
    </div>
  );
}
