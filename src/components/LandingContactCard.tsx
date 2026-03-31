import { profile } from "@/data/portfolio";

export function LandingContactCard() {
  const links = [
    { label: "GitHub", href: profile.github, value: "github.com/YugDalwadi" },
    { label: "LinkedIn", href: profile.linkedin, value: "linkedin.com/in/yug-dalwadi-304032257" },
    { label: "Email", href: `mailto:${profile.email}`, value: profile.email },
    { label: "Discord", href: "#", value: profile.discord },
  ];

  return (
    <section className="mt-8 pb-16 sm:pb-24">
      <div className="rounded-2xl border border-line bg-surface/75 p-6 shadow-panel sm:p-8">
        <p className="font-mono text-sm text-accent">$ connect --channel all</p>
        <div className="mt-4 space-y-3">
          {links.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between rounded-lg border border-line px-4 py-3 text-sm text-text"
            >
              <span className="font-mono text-muted">[{item.label}]</span>
                {item.href === "#" ? (
                <span>{item.value}</span>
                ) : (
                  <a
                    href={item.href}
                    target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={item.href.startsWith("mailto:") ? undefined : "noreferrer"}
                    className="transition hover:text-accent"
                  >
                    {item.value}
                  </a>
                )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
