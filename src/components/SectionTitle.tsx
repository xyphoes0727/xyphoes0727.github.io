type SectionTitleProps = {
  id: string;
  label: string;
  title: string;
};

export function SectionTitle({ id, label, title }: SectionTitleProps) {
  return (
    <div id={id} className="scroll-mt-24">
      <p className="font-mono text-xs uppercase tracking-[0.24em] text-accent/80">{label}</p>
      <h2 className="mt-3 text-2xl font-semibold text-text sm:text-3xl">{title}</h2>
    </div>
  );
}
