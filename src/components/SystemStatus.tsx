import { status } from "@/data/portfolio";

export function SystemStatus() {
  return (
    <div className="grid w-full gap-3 sm:grid-cols-3">
      {status.map((item) => (
        <div
          key={item.label}
          className="rounded-xl border border-line/80 bg-surface/60 px-4 py-3 shadow-panel backdrop-blur"
        >
          <p className="text-xs uppercase tracking-[0.18em] text-muted">{item.label}</p>
          <p className="mt-1 text-xl font-semibold text-text">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
