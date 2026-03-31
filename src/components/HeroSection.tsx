import { profile } from "@/data/portfolio";
import { SystemStatus } from "@/components/SystemStatus";

export function HeroSection() {
  return (
    <section className="pt-16 sm:pt-24">
      <div className="max-w-4xl">
        <p className="w-fit overflow-hidden whitespace-nowrap font-mono text-sm text-accent/90 motion-safe:animate-typing">
          $ whoami
          <span className="ml-1 inline-block h-4 w-[2px] bg-accent align-[-2px] motion-safe:animate-blink" />
        </p>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-text sm:text-6xl">{profile.name}</h1>
        <p className="mt-4 text-lg text-muted sm:text-xl">{profile.role}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#projects"
            className="rounded-lg border border-accent/60 bg-accent/10 px-5 py-2.5 text-sm font-medium text-text transition hover:bg-accent/20"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="rounded-lg border border-line bg-surface px-5 py-2.5 text-sm font-medium text-text transition hover:border-accent/40"
          >
            Contact
          </a>
        </div>
      </div>
      <div className="mt-10 max-w-4xl">
        <SystemStatus />
      </div>
    </section>
  );
}
