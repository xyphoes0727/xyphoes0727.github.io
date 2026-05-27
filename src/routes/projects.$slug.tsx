import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getProject, type Project } from "@/lib/content";
import { Markdown } from "@/components/Markdown";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project } as { project: Project };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.project.title} — Yug Dalwadi` },
          { name: "description", content: loaderData.project.description },
          { property: "og:title", content: loaderData.project.title },
          { property: "og:description", content: loaderData.project.description },
          { property: "og:type", content: "article" },
          ...(loaderData.project.cover ? [{ property: "og:image", content: loaderData.project.cover }] : []),
        ]
      : [],
    links: loaderData ? [{ rel: "canonical", href: `/projects/${loaderData.project.slug}` }] : [],
  }),
  component: ProjectPage,
  notFoundComponent: () => (
    <div className="max-w-2xl mx-auto px-6 py-32 text-center">
      <p className="font-mono text-xs text-accent">404</p>
      <h1 className="mt-3 font-display text-4xl">Project not found.</h1>
      <Link to="/projects" className="mt-6 inline-block text-accent hover:underline">← All projects</Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="max-w-2xl mx-auto px-6 py-32 text-center">
      <h1 className="font-display text-3xl">Could not load project.</h1>
      <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
    </div>
  ),
});

function ProjectPage() {
  const { project } = Route.useLoaderData();

  return (
    <article className="max-w-3xl mx-auto px-6 lg:px-10 pt-20 pb-20">
      <Link to="/projects" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent">
        <ArrowLeft size={14} /> All projects
      </Link>

      <header className="mt-10">
        <div className="flex items-center gap-3 mb-5">
          <span className="font-mono text-xs text-accent uppercase tracking-wider">{project.category}</span>
          <span className="text-muted-foreground/40">·</span>
          <span className="font-mono text-xs text-muted-foreground">{project.year}</span>
        </div>
        <h1 className="font-display text-4xl md:text-5xl leading-tight">{project.title}</h1>
        <p className="mt-5 text-lg text-muted-foreground leading-relaxed">{project.description}</p>

        <div className="mt-6 flex flex-wrap gap-1.5">
          {project.tags.map((t: string) => (
            <span key={t} className="px-2 py-0.5 text-[11px] font-mono text-muted-foreground border border-border rounded">{t}</span>
          ))}
        </div>

        {project.links && project.links.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-3">
            {project.links.map((l: { label: string; href: string }) => (
              <a key={l.href} href={l.href} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-sm border border-border-strong rounded-md hover:bg-surface transition-colors">
                {l.label} <ArrowUpRight size={13} />
              </a>
            ))}
          </div>
        )}
      </header>

      {project.cover && (
        <img src={project.cover} alt={project.title} className="mt-10 rounded-xl border border-border w-full" />
      )}

      <div className="mt-12">
        <Markdown>{project.content}</Markdown>
      </div>
    </article>
  );
}
