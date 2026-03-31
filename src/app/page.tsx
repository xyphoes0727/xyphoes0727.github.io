import { BackgroundNetwork } from "@/components/BackgroundNetwork";
import { LandingActionCard } from "@/components/LandingActionCard";
import { LandingContactCard } from "@/components/LandingContactCard";
import { LandingProfileCard } from "@/components/LandingProfileCard";
import { LandingWelcome } from "@/components/LandingWelcome";

export default function Home() {
  return (
    <main>
      <BackgroundNetwork />
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <LandingProfileCard />
        <LandingWelcome />
        <LandingActionCard />
        <LandingContactCard />
      </div>
    </main>
  );
}
