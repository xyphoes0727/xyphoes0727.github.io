import { SectionTitle } from "@/components/SectionTitle";
import { projects } from "@/data/portfolio";

export function ProjectsGrid() {
  return (
    <section className="mt-24">
      <SectionTitle id="projects" label="02 / Projects" title="Selected Work" />
      <div className="mt-7 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <article
            key={project.title}
            className="group rounded-2xl border border-line bg-surface/70 p-5 shadow-panel transition duration-300 hover:-translate-y-1 hover:border-accent/40"
          >
            <h3 className="text-lg font-semibold text-text">{project.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{project.description}</p>
            <p className="mt-4 rounded-lg border border-accent/25 bg-accent/10 p-3 text-sm text-text">
              {project.impact}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-line px-2 py-1 font-mono text-xs text-muted transition group-hover:border-accent/30 group-hover:text-text"
                >
                  {item}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
