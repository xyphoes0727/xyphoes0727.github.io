import { aboutSectionLinks } from "@/data/portfolio";

export function LandingTopCards() {
  return (
    <section className="pt-10 sm:pt-14">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {aboutSectionLinks.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="rounded-xl border border-line bg-surface/65 px-4 py-4 text-sm text-text shadow-panel transition hover:-translate-y-0.5 hover:border-accent/40 hover:bg-surface"
          >
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">Open</p>
            <p className="mt-1 font-medium">{item.label}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
