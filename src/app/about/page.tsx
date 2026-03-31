import { BackgroundNetwork } from "@/components/BackgroundNetwork";
import {
  aboutMe,
  education,
  profile,
  researchAreas,
  technicalSkills,
  workExperience,
} from "@/data/portfolio";

function SectionBlock({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 rounded-2xl border border-line bg-surface/70 p-5 shadow-panel sm:p-7">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">{title}</p>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <main>
      <BackgroundNetwork />
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-12 sm:px-8 sm:pb-24 lg:px-10">
        <div className="mb-8">
          <a href="/" className="font-mono text-sm text-muted transition hover:text-accent">
            &lt; back to home
          </a>
          <h1 className="mt-4 text-3xl font-semibold text-text sm:text-5xl">About {profile.name}</h1>
        </div>

        <div className="space-y-6">
          <SectionBlock id="about-me" title="About Me">
            <div className="space-y-2">
              {aboutMe.map((point) => (
                <p key={point} className="text-sm leading-relaxed text-text/90 sm:text-base">
                  {point}
                </p>
              ))}
            </div>
          </SectionBlock>

          <SectionBlock id="research-areas" title="Research Areas">
            <ul className="space-y-2">
              {researchAreas.map((area) => (
                <li key={area} className="text-sm leading-relaxed text-text/90 sm:text-base">
                  <span className="mr-2 font-mono text-accent">&gt;</span>
                  {area}
                </li>
              ))}
            </ul>
          </SectionBlock>

          <SectionBlock id="work-experience" title="Work Experience">
            <div className="space-y-5">
              {workExperience.map((item) => (
                <article key={`${item.title}-${item.period}`}>
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">{item.period}</p>
                  <h2 className="mt-1 text-lg font-semibold text-text">{item.title}</h2>
                  <p className="text-sm text-accent/90">{item.company}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.summary}</p>
                </article>
              ))}
            </div>
          </SectionBlock>

          <SectionBlock id="education" title="Education">
            <div className="space-y-4">
              {education.map((item) => (
                <article key={item.institute}>
                  <h2 className="text-lg font-semibold text-text">{item.institute}</h2>
                  <p className="text-sm text-text/90">{item.degree}</p>
                  <p className="text-sm text-muted">{item.period} • {item.detail}</p>
                </article>
              ))}
            </div>
          </SectionBlock>

          <SectionBlock id="technical-skills" title="Technical Skills">
            <div className="space-y-4">
              {technicalSkills.map((group) => (
                <div key={group.category}>
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">{group.category}</p>
                  <p className="mt-1 text-sm leading-relaxed text-text/90 sm:text-base">{group.items.join(", ")}</p>
                </div>
              ))}
            </div>
          </SectionBlock>
        </div>
      </div>
    </main>
  );
}
