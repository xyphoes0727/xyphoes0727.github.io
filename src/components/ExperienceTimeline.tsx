import { SectionTitle } from "@/components/SectionTitle";
import { experience } from "@/data/portfolio";

export function ExperienceTimeline() {
  return (
    <section className="mt-24">
      <SectionTitle id="experience" label="03 / Experience" title="Career Timeline" />
      <div className="relative mt-7 space-y-6 border-l border-line pl-5 sm:pl-7">
        {experience.map((item) => (
          <article key={`${item.company}-${item.period}`} className="relative">
            <span className="absolute -left-[30px] top-1 font-mono text-accent sm:-left-[38px]">$</span>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">{item.period}</p>
            <h3 className="mt-1 text-lg font-semibold text-text">{item.title}</h3>
            <p className="text-sm text-accent/90">{item.company}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{item.summary}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
