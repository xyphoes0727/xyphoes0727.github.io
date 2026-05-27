export function SectionLabel({ children, n }: { children: React.ReactNode; n?: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      {n && <span className="font-mono text-xs text-accent">{n}</span>}
      <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{children}</span>
      <span className="flex-1 h-px bg-border" />
    </div>
  );
}
