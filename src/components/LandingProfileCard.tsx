import { interests, profile } from "@/data/portfolio";

export function LandingProfileCard() {
  return (
    <section className="pt-10 sm:pt-14">
      <div className="grid gap-6 rounded-2xl border border-line bg-surface/75 p-6 shadow-panel sm:grid-cols-[1fr_180px] sm:p-8">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">Identity</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-text sm:text-5xl">{profile.name}</h1>
          <p className="mt-2 text-lg text-text/90">{profile.role}</p>
          <p className="mt-1 text-sm text-muted">{profile.tagline}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {interests.map((keyword) => (
              <span
                key={keyword}
                className="rounded-md border border-line bg-bg/60 px-3 py-1.5 font-mono text-xs uppercase tracking-[0.08em] text-muted"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>

        <div className="mx-auto h-36 w-36 overflow-hidden rounded-2xl border border-line bg-bg/60 sm:mx-0 sm:h-40 sm:w-40">
          <img src={profile.photoUrl} alt={`${profile.name} profile`} className="h-full w-full object-cover" />
        </div>
      </div>
    </section>
  );
}
