import Hero from "@/components/Hero";
import ScrollSequence from "@/components/ScrollSequence";
import RaceDayExperience from "@/components/RaceDayExperience";

export default function Home() {
  return (
    <main className="relative bg-[#050505] w-full min-h-screen">
      {/* Hero Landing Section */}
      <Hero />

      {/* Scroll-Linked Canvas Sequence */}
      <ScrollSequence />

      {/* Other Race Day Sections */}
      <RaceDayExperience />
    </main>
  );
}
