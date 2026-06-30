"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";

const LIVERIES = [
  {
    id: 1,
    name: "Lone Star Texas",
    year: "2023",
    race: "United States Grand Prix",
    description: "Sleek American flag stars and red-white-blue stripes running along the sidepods of the RB19 in Austin.",
    img: "/liveries/IMG_20260624_161756_936.jpg",
    designer: "Make Your Mark Contest",
    status: "EXCLUSIVE",
    highlight: "AMERICAN SPIRIT"
  },
  {
    id: 2,
    name: "Jerez Camo Bull",
    year: "2015",
    race: "Pre-Season Testing",
    description: "A dazzling black-and-white camouflage design aimed at concealing aerodynamics and body shapes from competitor spy cameras.",
    img: "/liveries/IMG_20260624_161759_527.jpg",
    designer: "RB Aerodynamics Team",
    status: "PROTOTYPE",
    highlight: "STEALTH CAMO"
  },
  {
    id: 3,
    name: "Miami Palm Deco",
    year: "2023",
    race: "Miami Grand Prix",
    description: "Featuring retro pastel pink, teal, and blue palm leaves, capturing the iconic Miami Vice sunset aesthetic.",
    img: "/liveries/IMG_20260624_161801_804.jpg",
    designer: "Martina Adriano (Make Your Mark)",
    status: "FAN DESIGNED",
    highlight: "PASTEL DECO"
  },
  {
    id: 4,
    name: "Monaco Superman",
    year: "2006",
    race: "Monaco Grand Prix",
    description: "A special promotional livery for the movie Superman Returns, featuring the iconic S-shield on the rear wing and cape graphics on the engine cover.",
    img: "/liveries/IMG_20260624_161803_995.jpg",
    designer: "Warner Bros. & Red Bull",
    status: "HISTORIC",
    highlight: "SUPERMAN RETURNS"
  },
  {
    id: 5,
    name: "Disruptive Blue Camo",
    year: "2018",
    race: "Silverstone Shakedown",
    description: "A sleek digital blue, black, and dark navy camouflage wrap designed to mask body panel curves during early aero testing.",
    img: "/liveries/IMG_20260624_161806_296.jpg",
    designer: "Red Bull Design Studio",
    status: "PROTOTYPE",
    highlight: "DIGITAL BLUE"
  },
  {
    id: 6,
    name: "White Bull Tribute",
    year: "2026",
    race: "Concept Showcase",
    description: "A modern tribute to the white livery, adapting the historic Honda-inspired colors onto the newer aerodynamic chassis profile.",
    img: "/liveries/IMG_20260624_161808_871.jpg",
    designer: "Red Bull Creative Dept",
    status: "CONCEPT",
    highlight: "WHITE BULL"
  },
  {
    id: 7,
    name: "Wings for Life Brazil",
    year: "2008",
    race: "Brazilian Grand Prix",
    description: "David Coulthard's final career Grand Prix car, painted in an all-white livery to raise awareness for the Wings for Life spinal cord research foundation.",
    img: "/liveries/IMG_20260624_161811_413.jpg",
    designer: "Wings for Life Foundation",
    status: "CHARITY SPECIAL",
    highlight: "COULTHARD FAREWELL"
  },
  {
    id: 8,
    name: "The White Tribute",
    year: "2021",
    race: "Turkish Grand Prix",
    description: "A legendary full-white livery honoring engine partner Honda. Inspired by the historic Honda RA272 that won the 1965 Mexican GP.",
    img: "/liveries/IMG_20260624_161813_364.jpg",
    designer: "Red Bull Creative Dept",
    status: "LEGENDARY",
    highlight: "HONDA TRIBUTE"
  },
  {
    id: 9,
    name: "Silverstone Fan Mosaic",
    year: "2012",
    race: "British Grand Prix",
    description: "A charity livery featuring a mosaic compiled of over 25,000 individual photos of fans who donated to the Wings for Life foundation.",
    img: "/liveries/IMG_20260624_161815_832.jpg",
    designer: "Wings for Life Foundation",
    status: "CHARITY SPECIAL",
    highlight: "FAN MOSAIC"
  },
  {
    id: 10,
    name: "Wings for Life Mosaic",
    year: "2007",
    race: "British Grand Prix",
    description: "The initial fan-photo mosaic livery where the car was wrapped in the images of thousands of fans supporting spinal cord research.",
    img: "/liveries/IMG_20260624_161817_882.jpg",
    designer: "Wings for Life Foundation",
    status: "CHARITY SPECIAL",
    highlight: "10,000 FAN FACES"
  },
  {
    id: 11,
    name: "Classic Carbon Shakedown",
    year: "2019",
    race: "Silverstone Filming Day",
    description: "Raw matte dark grey carbon fiber panels mixed with sharp chevron stripes, styled for the launch of the Honda era.",
    img: "/liveries/IMG_20260624_161820_176.jpg",
    designer: "Red Bull Design Studio",
    status: "LAUNCH LIVERY",
    highlight: "RAW CARBON"
  },
  {
    id: 12,
    name: "Las Vegas Neon Lights",
    year: "2023",
    race: "Las Vegas Grand Prix",
    description: "Custom purple neon and yellow lighting graphics celebrating the return of Formula 1 to the legendary Las Vegas Strip.",
    img: "/liveries/IMG_20260624_161822_244.jpg",
    designer: "Fan Submission (Rebull E-Club)",
    status: "EXCLUSIVE",
    highlight: "NEON THEME"
  }
];

interface LiveryCardProps {
  livery: typeof LIVERIES[0];
  index: number;
  total: number;
  scrollYProgress: any;
}

function LiveryCard({ livery, index, total, scrollYProgress }: LiveryCardProps) {
  const center = index / (total - 1);
  const step = 1 / (total - 1);

  // Card parameters across the scroll trajectory
  const inputRange = [
    center - 2 * step,
    center - step,
    center,
    center + step,
    center + 2 * step
  ];

  const x = useTransform(scrollYProgress, inputRange, ["120%", "40%", "0%", "-40%", "-120%"]);
  const z = useTransform(scrollYProgress, inputRange, [-200, -100, 0, -100, -200]);
  const scale = useTransform(scrollYProgress, inputRange, [0.75, 0.88, 1.05, 0.88, 0.75]);
  const rotateY = useTransform(scrollYProgress, inputRange, [40, 20, 0, -20, -40]);
  const rotateZ = useTransform(scrollYProgress, inputRange, [6, 3, 0, -3, -6]);
  const opacity = useTransform(scrollYProgress, inputRange, [0, 0.5, 1, 0.5, 0]);

  return (
    <motion.div
      style={{
        x,
        translateZ: z,
        scale,
        rotateY,
        rotateZ,
        opacity,
        transformStyle: "preserve-3d",
      }}
      className="absolute w-[260px] sm:w-[340px] h-[360px] bg-black/90 border border-white/10 hover:border-f1-red/50 mechanical-transition hover:shadow-[0_0_30px_rgba(225,6,0,0.2)] aero-edge overflow-hidden group shrink-0"
    >
      {/* Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-70 group-hover:opacity-90 transition-opacity duration-300"
        style={{ backgroundImage: `url(${livery.img})` }}
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />

      {/* Telemetry Decals / Details */}
      <div className="absolute inset-0 p-5 flex flex-col justify-between z-20 pointer-events-none">
        <div className="flex justify-between items-start">
          <span className="font-mono text-[8px] text-white/50 bg-black/60 border border-white/10 px-2 py-0.5 rounded tracking-widest uppercase">
            RB_CHASSIS_SPEC
          </span>
          <span className="bg-f1-red text-white font-mono text-[9px] font-bold px-2 py-0.5 skew-title">
            {livery.year}
          </span>
        </div>

        <div className="text-left">
          <span className="font-mono text-rb-yellow text-[8px] tracking-wider uppercase block font-bold mb-1">
            {livery.highlight}
          </span>
          <h4 className="font-sans text-lg italic-headline font-black text-white skew-title uppercase leading-tight">
            {livery.name}
          </h4>
        </div>
      </div>
    </motion.div>
  );
}

export default function LiveryArchive() {
  const [activeLiveryIndex, setActiveLiveryIndex] = useState(0);

  // Liveries 3D scroll refs
  const liveriesRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: liveriesScroll } = useScroll({
    target: liveriesRef,
    offset: ["start start", "end end"]
  });

  const smoothLiveriesScroll = useSpring(liveriesScroll, {
    damping: 30,
    stiffness: 100,
    mass: 0.5,
    restDelta: 0.001
  });

  // Track active livery index by scroll progress
  useMotionValueEvent(smoothLiveriesScroll, "change", (latest) => {
    const idx = Math.min(
      LIVERIES.length - 1,
      Math.max(0, Math.floor(latest * LIVERIES.length))
    );
    if (idx !== activeLiveryIndex) {
      setActiveLiveryIndex(idx);
    }
  });

  return (
    <section ref={liveriesRef} className="relative h-[350vh] bg-[#050505] border-y border-f1-red/20">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center py-12">
        <div className="max-w-[1440px] w-full mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Metadata Specifications */}
          <div className="lg:col-span-5 flex flex-col justify-center z-20">
            <div className="border-l-4 border-f1-red pl-4 mb-6">
              <div className="font-mono text-rb-yellow mb-1 tracking-widest font-bold italic text-xs uppercase">
                Telemetry: Special_Editions
              </div>
              <h2 className="font-sans text-3xl md:text-5xl italic-headline font-black text-white skew-title uppercase">
                THE LIVERY ARCHIVE
              </h2>
            </div>

            {/* Info Container */}
            <div className="relative min-h-[280px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeLiveryIndex}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div>
                    <span className="font-mono text-f1-red text-xs uppercase tracking-widest font-bold">
                      Chassis 0{activeLiveryIndex + 1} // {LIVERIES[activeLiveryIndex].year}
                    </span>
                    <h3 className="font-sans text-2xl md:text-3xl italic-headline font-black text-white uppercase tracking-wide mt-1">
                      {LIVERIES[activeLiveryIndex].name}
                    </h3>
                    <span className="inline-block mt-2 font-mono text-[9px] text-rb-yellow bg-rb-yellow/10 border border-rb-yellow/20 px-2 py-0.5 rounded tracking-wider uppercase font-semibold">
                      {LIVERIES[activeLiveryIndex].highlight}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-white/60 font-mono leading-relaxed">
                    {LIVERIES[activeLiveryIndex].description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4 font-mono">
                    <div>
                      <span className="text-[8px] text-white/40 uppercase block">Inaugural Race</span>
                      <span className="text-white text-xs font-bold block mt-0.5">{LIVERIES[activeLiveryIndex].race}</span>
                    </div>
                    <div>
                      <span className="text-[8px] text-white/40 uppercase block">Designer Concept</span>
                      <span className="text-white text-xs font-bold block mt-0.5">{LIVERIES[activeLiveryIndex].designer}</span>
                    </div>
                    <div>
                      <span className="text-[8px] text-white/40 uppercase block">Status</span>
                      <span className="text-white text-xs font-bold block mt-0.5">{LIVERIES[activeLiveryIndex].status}</span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: 3D Cover Flow Card Stack */}
          <div className="lg:col-span-7 flex items-center justify-center relative h-[450px] w-full" style={{ perspective: 1200, transformStyle: "preserve-3d" }}>
            {LIVERIES.map((livery, idx) => (
              <LiveryCard
                key={livery.id}
                livery={livery}
                index={idx}
                total={LIVERIES.length}
                scrollYProgress={smoothLiveriesScroll}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
