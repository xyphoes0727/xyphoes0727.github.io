import { welcome } from "@/data/portfolio";

export function LandingWelcome() {
  return (
    <section className="mt-8">
      <div className="rounded-2xl border border-line bg-surface/75 p-6 shadow-panel sm:p-8">
        <p className="w-fit overflow-hidden whitespace-nowrap font-mono text-sm text-accent/90 motion-safe:animate-typing">
          $ hello.sh
          <span className="ml-1 inline-block h-4 w-[2px] bg-accent align-[-2px] motion-safe:animate-blink" />
        </p>
        <h2 className="mt-4 text-2xl font-semibold text-text sm:text-3xl">Welcome</h2>
        <p className="mt-4 max-w-4xl text-base leading-relaxed text-text/90">{welcome.intro}</p>
        <p className="mt-3 max-w-4xl text-sm leading-relaxed text-muted sm:text-base">{welcome.message}</p>
      </div>
    </section>
  );
}
