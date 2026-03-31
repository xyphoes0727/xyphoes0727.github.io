import { aboutCardCopy, blogsCardCopy, projectsCardCopy } from "@/data/portfolio";

export function LandingActionCard() {
  return (
    <section className="mt-8">
      <div className="rounded-2xl border border-line bg-surface/75 p-6 shadow-panel sm:p-8">
        <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">Navigate</p>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-line/80 bg-bg/40 p-4">
            <h2 className="text-lg font-semibold text-text">About Me</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{aboutCardCopy}</p>
            <a
              href="/about"
              className="mt-4 inline-flex rounded-lg border border-accent/60 bg-accent/10 px-4 py-2 text-sm font-medium text-text transition hover:bg-accent/20"
            >
              About Me
            </a>
          </div>

          <div className="rounded-xl border border-line/80 bg-bg/40 p-4">
            <h2 className="text-lg font-semibold text-text">Projects</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{projectsCardCopy}</p>
            <a
              href="/projects"
              className="mt-4 inline-flex rounded-lg border border-line bg-surface px-4 py-2 text-sm font-medium text-text transition hover:border-accent/40"
            >
              Projects
            </a>
          </div>

          <div className="rounded-xl border border-line/80 bg-bg/40 p-4">
            <h2 className="text-lg font-semibold text-text">Blogs</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{blogsCardCopy}</p>
            <a
              href="/blogs"
              className="mt-4 inline-flex rounded-lg border border-line bg-surface px-4 py-2 text-sm font-medium text-text transition hover:border-accent/40"
            >
              Blogs
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
