"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const TIMELINE_DATA = [
  {
    year: "2015",
    title: "The Breakthrough",
    tagline: "GRID ARRIVAL",
    milestones: [
      "Youngest Grand Prix Starter: 17 years, 166 days (Australian Grand Prix)",
      "Youngest Driver to Score Points: 17 years, 180 days (Malaysian Grand Prix)"
    ]
  },
  {
    year: "2016",
    title: "Record-Breaking Debut",
    tagline: "RED BULL ASCENT",
    milestones: [
      "Youngest Grand Prix Winner: 18 years, 228 days (Spanish Grand Prix)",
      "Youngest Driver to Stand on a Podium: 18 years, 228 days (Spanish Grand Prix)",
      "Youngest Driver to Lead a Race: 18 years, 228 days (Spanish Grand Prix)"
    ]
  },
  {
    year: "2021",
    title: "First World Championship",
    tagline: "ABU DHABI CORONATION",
    milestones: [
      "First Dutch F1 World Champion: Claimed at Yas Marina",
      "Most Podiums in a Season: 18 podium finishes"
    ]
  },
  {
    year: "2022",
    title: "Title Two & Domination",
    tagline: "RECORD SHATTERING",
    milestones: [
      "Most Wins in a Season: 15 victories (breaking Vettel's previous record)",
      "Most Points in a Season: 454 points"
    ]
  },
  {
    year: "2023",
    title: "Rewriting History",
    tagline: "APEX VELOCITY",
    milestones: [
      "Most Consecutive Wins: 10 victories (Sebastian Vettel's record broken)",
      "Most Wins in a Season: 19 victories (86.36% Win Rate)",
      "Most Laps Led in a Season: 1,003 laps (75.7% of all season laps)",
      "Most Points in a Season: 575 points",
      "Most Consecutive Wins From Pole"
    ]
  },
  {
    year: "2024",
    title: "Consolidating Legacy",
    tagline: "FOUR-PEAT CHAMPION",
    milestones: [
      "Four-Peat World Champion: Secured his fourth consecutive Drivers' World Title"
    ]
  },
  {
    year: "RECORDS",
    title: "Additional Records",
    tagline: "GLOBAL STAT BENCHMARK",
    milestones: [
      "Most Wins from Different Grid Spots",
      "Most Sprint Race Wins: Most successful driver in Sprint format"
    ]
  }
];

export default function TrophyRoom() {
  const trophyRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: trophyScroll } = useScroll({
    target: trophyRef,
    offset: ["start start", "end end"]
  });
  const trophyX = useTransform(trophyScroll, [0, 1], ["0%", "-78%"]);

  return (
    <section ref={trophyRef} className="relative h-[250vh] bg-[#050505] border-y border-f1-red/20">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center py-12">
        
        {/* Top Header & Core HUD Stats Strip */}
        <div className="max-w-[1440px] w-full mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 z-20 mb-8">
          <div className="border-l-4 border-f1-red pl-4">
            <div className="font-mono text-rb-yellow mb-1 tracking-widest font-bold italic text-xs uppercase">
              Database: Career_Metrics
            </div>
            <h2 className="font-sans text-3xl md:text-5xl italic-headline font-black text-white skew-title uppercase">
              THE TROPHY ROOM
            </h2>
          </div>
          
          {/* Horizontal Mini HUD Stats */}
          <div className="flex flex-wrap gap-4 md:gap-6 bg-black/60 border border-white/5 p-4 rounded-xl backdrop-blur-sm w-full md:w-auto">
            <div className="px-3">
              <span className="text-[8px] text-white/40 font-mono uppercase block tracking-wider">Championships</span>
              <span className="text-white text-base font-bold font-mono lcd-text block">4</span>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="px-3">
              <span className="text-[8px] text-white/40 font-mono uppercase block tracking-wider">GP Wins</span>
              <span className="text-white text-base font-bold font-mono lcd-text block">71</span>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="px-3">
              <span className="text-[8px] text-white/40 font-mono uppercase block tracking-wider">Poles</span>
              <span className="text-white text-base font-bold font-mono lcd-text block">48</span>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="px-3">
              <span className="text-[8px] text-white/40 font-mono uppercase block tracking-wider">Podiums</span>
              <span className="text-white text-base font-bold font-mono lcd-text block">128</span>
            </div>
          </div>
        </div>

        {/* Timeline Scroll Container */}
        <div className="relative w-full flex items-center">
          {/* The Timeline Connecting Axis Line */}
          <div className="absolute top-[80px] left-0 w-full h-[2px] bg-gradient-to-r from-f1-red/10 via-f1-red/40 to-f1-red/10 z-0 pointer-events-none" />

          <motion.div 
            style={{ x: trophyX }} 
            className="flex gap-6 px-6 md:px-12 w-max items-start z-10"
          >
            {/* Introduction Card: Career Benchmarks */}
            <div className="relative w-[320px] sm:w-[400px] h-[380px] bg-black/80 border border-white/5 aero-edge-reverse p-6 flex flex-col justify-between shrink-0">
              <div>
                <div className="font-mono text-f1-red text-[10px] tracking-widest uppercase font-bold mb-2">
                  LOG_START // BENCHMARKS
                </div>
                <h3 className="font-sans text-xl italic-headline font-black text-white uppercase tracking-wider mb-4">
                  Absolute Records
                </h3>
                <p className="text-xs text-white/50 font-mono leading-relaxed mb-6">
                  A summary of the historical milestones established during the most dominant single-season campaigns in Formula One history.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4 font-mono">
                <div>
                  <span className="text-[8px] text-white/40 uppercase block">Wins / Season</span>
                  <span className="text-rb-yellow text-sm font-bold block mt-0.5">19 WINS</span>
                </div>
                <div>
                  <span className="text-[8px] text-white/40 uppercase block">Consecutive Wins</span>
                  <span className="text-rb-yellow text-sm font-bold block mt-0.5">10 IN A ROW</span>
                </div>
                <div>
                  <span className="text-[8px] text-white/40 uppercase block">Points / Season</span>
                  <span className="text-rb-yellow text-sm font-bold block mt-0.5">575 PTS</span>
                </div>
                <div>
                  <span className="text-[8px] text-white/40 uppercase block">Podiums / Season</span>
                  <span className="text-rb-yellow text-sm font-bold block mt-0.5">21 PODIUMS</span>
                </div>
              </div>
            </div>

            {/* Chronological Timeline Cards */}
            {TIMELINE_DATA.map((item, idx) => (
              <div 
                key={idx}
                className="relative w-[300px] sm:w-[420px] h-[380px] bg-black/80 border border-white/10 hover:border-f1-red/30 mechanical-transition hover:shadow-[0_0_20px_rgba(225,6,0,0.1)] aero-edge p-6 flex flex-col justify-between shrink-0 group"
              >
                {/* Timeline node connection visual */}
                <div className="absolute -top-[52px] left-[32px] flex flex-col items-center">
                  <div className="w-[1px] h-6 bg-white/20 group-hover:bg-f1-red/50 mechanical-transition" />
                  <div className="milestone-dot" />
                </div>

                <div>
                  {/* Header */}
                  <div className="flex justify-between items-start mb-3">
                    <span className="font-mono text-f1-red text-2xl font-black italic-headline tracking-tighter">
                      {item.year}
                    </span>
                    <span className="font-mono text-[9px] text-white/40 bg-white/5 border border-white/5 px-2 py-0.5 rounded tracking-widest uppercase">
                      {item.tagline}
                    </span>
                  </div>

                  <h3 className="font-sans text-lg italic-headline font-black text-white uppercase tracking-wider mb-4 group-hover:text-f1-red transition-colors duration-300">
                    {item.title}
                  </h3>

                  {/* Milestones list */}
                  <ul className="space-y-3 overflow-y-auto max-h-[200px] pr-2">
                    {item.milestones.map((milestone, mIdx) => (
                      <li key={mIdx} className="flex items-start gap-2.5">
                        <span className="text-f1-red text-xs mt-0.5 font-bold font-mono shrink-0">&gt;</span>
                        <span className="text-xs text-white/70 font-mono leading-relaxed">
                          {milestone}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card bottom details */}
                <div className="border-t border-white/5 pt-3 flex justify-between items-center text-[9px] font-mono text-white/30">
                  <span>STATUS: ACTIVE_ARCHIVE</span>
                  <span>METRIC_INDEX // 0{idx + 1}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
