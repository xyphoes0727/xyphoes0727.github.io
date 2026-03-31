import { profile } from "@/data/portfolio";
import { SectionTitle } from "@/components/SectionTitle";

export function ContactTerminal() {
  const links = [
    { label: "Email", href: `mailto:${profile.email}`, value: profile.email },
    { label: "GitHub", href: profile.github, value: "github.com/YugDalwadi" },
    { label: "LinkedIn", href: profile.linkedin, value: "linkedin.com/in/yug-dalwadi-304032257" },
  ];

  return (
    <section className="mt-24 pb-16 sm:pb-24">
      <SectionTitle id="contact" label="04 / Contact" title="Open for Collaboration" />
      <div className="mt-6 rounded-2xl border border-line bg-surface/75 p-5 shadow-panel sm:p-7">
        <p className="font-mono text-sm text-accent">$ connect --channel all</p>
        <div className="mt-4 space-y-3">
          {links.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={item.href.startsWith("mailto:") ? undefined : "noreferrer"}
              className="flex items-center justify-between rounded-lg border border-line px-4 py-3 text-sm text-text transition hover:border-accent/40 hover:bg-accent/5"
            >
              <span className="font-mono text-muted">[{item.label}]</span>
              <span>{item.value}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
