import { BackgroundNetwork } from "@/components/BackgroundNetwork";
import { projects, profile } from "@/data/portfolio";

export default function ProjectsPage() {
  return (
    <main>
      <BackgroundNetwork />
      <div className="mx-auto max-w-7xl px-5 pb-16 pt-12 sm:px-8 sm:pb-24 lg:px-12">
        <div className="mb-8">
          <a href="/" className="font-mono text-sm text-muted transition hover:text-accent">
            &lt; back to home
          </a>
          <h1 className="mt-4 text-3xl font-semibold text-text sm:text-5xl">Projects by {profile.name}</h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
            A selection of ML and systems projects focused on measurable impact, implementation quality, and production constraints.
          </p>
        </div>

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group rounded-2xl border border-line bg-surface/75 p-5 shadow-panel transition duration-300 hover:-translate-y-1 hover:border-accent/40"
            >
              <h2 className="text-lg font-semibold text-text">{project.title}</h2>
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
        </section>
      </div>
    </main>
  );
}
