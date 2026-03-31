import { aboutPoints } from "@/data/portfolio";
import { SectionTitle } from "@/components/SectionTitle";

export function AboutTerminal() {
  return (
    <section className="mt-24">
      <SectionTitle id="about" label="01 / About" title="Engineer Profile" />
      <div className="mt-6 overflow-hidden rounded-2xl border border-line bg-surface/70 shadow-panel backdrop-blur">
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          <span className="ml-3 font-mono text-xs text-muted">profile@system:~</span>
        </div>
        <div className="space-y-3 px-5 py-5 sm:px-7 sm:py-7">
          {aboutPoints.map((point) => (
            <p key={point} className="font-mono text-sm text-text/90 sm:text-base">
              <span className="mr-2 text-accent">&gt;</span>
              {point}
            </p>
          ))}
          <p className="font-mono text-sm text-muted">
            status: active
            <span className="ml-1 inline-block h-4 w-[2px] bg-accent align-[-2px] motion-safe:animate-blink" />
          </p>
        </div>
      </div>
    </section>
  );
}
