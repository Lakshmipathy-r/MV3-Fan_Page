"use client";

import TrophyRoom from "./TrophyRoom";
import LiveryArchive from "./LiveryArchive";
import Playgrounds from "./Playgrounds";
import FanZone from "./FanZone";
import Footer from "./Footer";

export default function RaceDayExperience() {
  return (
    <div className="w-full bg-[#050505] text-white">
      {/* Section 2: Trophy Room (Stat Engine) - Horizontal Scroll Timeline */}
      <TrophyRoom />

      {/* Section 3: Red Bull Racing Liveries - 3D Card Scroll Showcase */}
      <LiveryArchive />

      {/* Section 4: Max's Playgrounds (Track Records) - Horizontal Scroll Journey */}
      <Playgrounds />

      {/* Section 5: Fan Zone */}
      <FanZone />

      {/* Footer */}
      <Footer />
    </div>
  );
}
