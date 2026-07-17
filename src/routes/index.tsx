import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Github, Linkedin, Mail, FileText } from "lucide-react";
import { allBlogs, allProjects } from "@/lib/content";
import { SectionLabel } from "@/components/SectionLabel";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Yug Dalwadi — AI/ML Engineer" },
      { name: "description", content: "AI/ML engineer at IIT Jodhpur building real-time ML systems, LLM training pipelines, and applied AI products." },
      { property: "og:title", content: "Yug Dalwadi — AI/ML Engineer" },
      { property: "og:description", content: "AI/ML engineer at IIT Jodhpur building real-time ML systems, LLM training pipelines, and applied AI products." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  const featured = allProjects.filter((p) => p.featured).slice(0, 3);
  const projects = featured.length ? featured : allProjects.slice(0, 3);
  const posts = allBlogs.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 lg:px-10 pt-24 md:pt-36 pb-28">
        <Reveal>
          <p className="font-mono text-xs text-accent tracking-wider">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent mr-2 align-middle" />
            AVAILABLE FOR RESEARCH & ENGINEERING ROLES
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="mt-6 font-display text-5xl md:text-7xl lg:text-[88px] leading-[1.02] tracking-tight">
            Yug Dalwadi.
            <br />
            <span className="text-muted-foreground italic">AI/ML engineer</span>
            <span className="text-accent">.</span>
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-8 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
            I build machine learning systems that ship, from streaming fraud detection
            pipelines to large-scale model training workflows. I am currently focused
            on deep learning systems, online learning, and reliable backend
            infrastructure for AI applications.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              to="/projects"
              className="group inline-flex items-center gap-2 px-5 py-3 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              View projects
              <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-5 py-3 text-sm border border-border-strong rounded-md hover:bg-surface transition-colors"
            >
              Read writing
            </Link>
            <a
              href="/resume.pdf"
              className="inline-flex items-center gap-2 px-5 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <FileText size={15} /> Resume
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="mt-16 flex items-center gap-5 text-muted-foreground">
            <a href="https://github.com/xyphoes0727" target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-accent transition-colors"><Github size={18} /></a>
            <a href="https://www.linkedin.com/in/yug-dalwadi-304032257/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-accent transition-colors"><Linkedin size={18} /></a>
            <a href="mailto:yugdalwadi@gmail.com" aria-label="Email" className="hover:text-accent transition-colors"><Mail size={18} /></a>
          </div>
        </Reveal>
      </section>

      {/* About preview */}
      <section className="max-w-6xl mx-auto px-6 lg:px-10 py-20 border-t border-border">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <SectionLabel n="01">About</SectionLabel>
            <h2 className="font-display text-3xl md:text-4xl leading-tight">
              Research-minded, engineering-disciplined.
            </h2>
          </div>
          <div className="md:col-span-7 md:col-start-6 space-y-5 text-muted-foreground leading-relaxed">
            <p>
              My work sits between three disciplines: <span className="text-foreground">machine learning</span>,{" "}
              <span className="text-foreground">systems engineering</span>, and{" "}
              <span className="text-foreground">AI product development</span>. I care deeply about
              the execution layer that makes models useful in production: telemetry,
              evaluation, reproducibility, and latency.
            </p>
            <p>
              I have worked on real-time fraud detection, LLM pre-training, and multimodal retrieval
              systems, while mentoring student cohorts through hands-on ML projects. Outside of work,
              I write about machine learning, deep learning, and AI systems.
            </p>
            <div className="pt-4 grid grid-cols-2 gap-y-3 gap-x-6 text-sm">
              {[
                ["Focus", "ML Systems · Deep Learning"],
                ["Systems", "Streaming · Backend"],
                ["Domain", "Fraud Detection · LLMs"],
                ["Tools", "PyTorch · FastAPI · Django"],
              ].map(([k, v]) => (
                <div key={k} className="flex flex-col">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/60">{k}</span>
                  <span className="text-foreground">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured projects */}
      <section className="max-w-6xl mx-auto px-6 lg:px-10 py-20 border-t border-border">
        <div className="flex items-end justify-between mb-12">
          <div className="flex-1">
            <SectionLabel n="02">Selected work</SectionLabel>
            <h2 className="font-display text-3xl md:text-4xl">Things I've built.</h2>
          </div>
          <Link to="/projects" className="hidden md:inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent">
            All projects <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <Link
                to="/projects/$slug"
                params={{ slug: p.slug }}
                className="group block border border-border rounded-xl overflow-hidden bg-surface/50 hover:border-border-strong transition-all hover:-translate-y-0.5 duration-300 h-full"
              >
                <div className="aspect-[16/10] overflow-hidden bg-surface-2 border-b border-border relative">
                  {p.cover ? (
                    <img src={p.cover} alt={p.title} loading="lazy" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-display text-6xl text-muted-foreground/30">
                      {p.title.charAt(0)}
                    </div>
                  )}
                  <span className="absolute top-3 left-3 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-accent bg-background/70 backdrop-blur rounded border border-border">
                    {p.category}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-display text-xl text-foreground group-hover:text-accent transition-colors">{p.title}</h3>
                    <span className="font-mono text-xs text-muted-foreground">{p.year}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{p.description}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.tags.slice(0, 3).map((t) => (
                      <span key={t} className="px-2 py-0.5 text-[11px] font-mono text-muted-foreground border border-border rounded">{t}</span>
                    ))}
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Blog preview */}
      <section className="max-w-6xl mx-auto px-6 lg:px-10 py-20 border-t border-border">
        <div className="flex items-end justify-between mb-12">
          <div className="flex-1">
            <SectionLabel n="03">Writing</SectionLabel>
            <h2 className="font-display text-3xl md:text-4xl">Recent notes.</h2>
          </div>
          <Link to="/blog" className="hidden md:inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent">
            All posts <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="divide-y divide-border border-y border-border">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.05}>
              <Link
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="group flex items-baseline justify-between gap-6 py-6 hover:px-3 transition-all"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className="font-mono text-xs text-muted-foreground">{p.date}</span>
                    <span className="text-muted-foreground/40">·</span>
                    <span className="font-mono text-xs text-muted-foreground">{p.readingTime}</span>
                  </div>
                  <h3 className="font-display text-2xl text-foreground group-hover:text-accent transition-colors truncate">{p.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground truncate">{p.description}</p>
                </div>
                <ArrowUpRight size={18} className="text-muted-foreground group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0" />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="max-w-6xl mx-auto px-6 lg:px-10 py-24 border-t border-border">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <SectionLabel n="04">Contact</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl leading-tight">
              Have something to build?
            </h2>
            <p className="mt-4 text-muted-foreground max-w-md">
              The best way to reach me is email. I am based in Vadodara, Gujarat, and open to research and engineering collaborations.
            </p>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <a
              href="mailto:yugdalwadi@gmail.com"
              className="group flex items-center justify-between p-6 border border-border rounded-xl hover:border-accent transition-colors"
            >
              <div>
                <p className="font-mono text-xs text-muted-foreground uppercase tracking-wider">Email</p>
                <p className="mt-1 font-display text-xl text-foreground group-hover:text-accent transition-colors">yugdalwadi@gmail.com</p>
              </div>
              <ArrowUpRight className="text-muted-foreground group-hover:text-accent transition-colors" />
            </a>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {[
                { icon: Github, label: "GitHub", href: "https://github.com/xyphoes0727" },
                { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/yug-dalwadi-304032257/" },
                { icon: FileText, label: "Resume", href: "/resume.pdf" },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col items-center gap-2 p-5 border border-border rounded-xl hover:border-border-strong hover:bg-surface transition-all"
                >
                  <Icon size={16} className="text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
