"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const PLAYGROUNDS_DATA = [
  {
    id: "zandvoort",
    name: "Circuit Zandvoort",
    tagline: "THE ORANGE FORTRESS",
    sector: "SECTOR 1",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCUisLXuA8SLjIGNscwmroRyvjCYv7ww5X5Qd0AkPcld8klvlbej7Q_-F_sCNK2OsaWVhoo6dWdiAs6S0z3sY2J0X1hvZ-sQLE_UJJfkEf8_QgDcvrtqctdu2SAk3VuB9JVn1n6MZV0aSdkxk3NdN3-UO-YfscPTjTfzftlEGOWYMT_1CPraHqmoBc4SNp3d2IeShuglN-GjHYi4-j7z-7wjpKqmEvIlZpLFv2e6_h6luNWAKvcyqbfP4VvsVebT-E5YKYKcWxu9UCK",
    wins: "3 / 3",
    status: "KING",
    lapRecord: "1:11.097",
    length: "4.259 KM",
    corners: "14",
    topSpeed: "315 KM/H"
  },
  {
    id: "spa",
    name: "Spa-Francorchamps",
    tagline: "DRIVER'S CIRCUIT",
    sector: "SECTOR 2",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAD_WYWSLZa_XnHPkVX8eLIhEqVx34t4yWFd6UxEA75Gi7mJZ_bN_BaPQy79gDCJrxYP5J6gXMtggYG6kKAlUvtF10v04UIIsISbSpUp4sbfYYj7GBd670aUWSJNOGxkvT5boPUygn9D78vSuwVueA67cB67x7Ok1J344mHJWDR2TlisVaBh9HMRBrDyv59nJekNz23-3vShL1u0nPc3e3xUKWJ9PWvB7i3Hgh5Rg3ZFcXC09Al5z2CecVfv_ydYLX1W_weZ6zOJSFe",
    wins: "4 / 10",
    status: "MASTER",
    lapRecord: "1:46.286",
    length: "7.004 KM",
    corners: "19",
    topSpeed: "345 KM/H"
  },
  {
    id: "redbullring",
    name: "Red Bull Ring",
    tagline: "HOME GROUND",
    sector: "SECTOR 3",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDnITk1xzZtvJwkMhs06qBEPhEDqhH-MDrD95TLMbqp0jAhtEsiZ_Ht8onh1voq8SBbEhCvaDb0iyCjhsznvxlmTfBCD5hBOLrVgutD61VxLhvVNt7YkRilIVzJn6bfhLfSlfoNeZdPymkV3bzoAMjJOXUgjai3xJ-ERKMB1UJYvRUcaChiRCN3LVQivwQiBUEWqR3qWDH8S1R518izDvNH2X5qB-sjNTNYZV0TexyNxftIMXHcrzPxfx4akJzKn8OnxkIJAW6DNaIx",
    wins: "4 / 8",
    status: "DOMINANT",
    lapRecord: "1:05.619",
    length: "4.318 KM",
    corners: "10",
    topSpeed: "330 KM/H"
  },
  {
    id: "mexico",
    name: "Autódromo Hermanos",
    tagline: "ALTITUDE KING",
    sector: "SECTOR 1",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAERzWILgj1L50bjsat_veKBgsYg7uu24B-TRqCBQD8z-9J4dG8Ii2SWIZd5lqjM9h52KBQRKK7Cvq8Sr4SMz-r2qQRgoR_ZZQHuoaBakPMTS447y_CW9iJMCGYTPk1yeBLKvJ3QKtT87nh0n6nW9TEDI9-L2_4rwDJokgthQYg-wRVjShCQsovfsYVry_-wsDH112VC91mfGlJPj4-pY6t5d2QYiI8JUyM5zrxW_iXgzc-Uc7mzrxd5ChjdwvUsbqZRXbxGYp-IBYA",
    wins: "5 / 8",
    status: "RECORD",
    lapRecord: "1:17.774",
    length: "4.304 KM",
    corners: "17",
    topSpeed: "350 KM/H"
  },
  {
    id: "yasmarina",
    name: "Yas Marina Circuit",
    tagline: "CHAMPIONSHIP GLORY",
    sector: "SECTOR 2",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBECBfSTZSRY8lxyH2b5BaUgEKZpKPQRSq11ZI-ZQzYz92UJoaqjRdwEgBwRRbvlmimgudvDQheI3RgDcDv70ZQ1Au1K7Sg6ld1aiLwpisrYipcO2r8C-HEhi9PbURCUqpvTCsHkNYi2uulJg7jQ-BfI8zcUyoov_QYjbdxnmT9e1ZvqQviqdU_xhJ_kBOj3uylMSqZmhj4h6gJIan7iLYtBXgKI-GRf8Nqgqe-Y-lwc1F8jka6JLjGATWvG6AWpdAPc5GRPeqbYY5e",
    wins: "4 / 9",
    status: "LEGACY",
    lapRecord: "1:26.103",
    length: "5.281 KM",
    corners: "16",
    topSpeed: "325 KM/H"
  },
  {
    id: "suzuka",
    name: "Suzuka Circuit",
    tagline: "PURE PRECISION",
    sector: "SECTOR 3",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAfJxQPWmA13dZtiwEe4kxeniJtOIaDvFQjsEJDpFg3NONcFmNyLn5KZF7SBTPxKj-GBvz1m_THP_YphwGmRFKRgG-4w1JXQYgUDAgUmCGjAtEZEJevCAl-gDwnifWkdMLAlzr8GwkcdYQy7fQFn3plb5GdEU2Z57snlEsMTnf-DlL_8mLFIuAtAUqKnt4CkBrxs-bf0bH_oAZGXzU-gvq8LJbWOKivI0_MYrQiord9An34ESVZy7ykUEozmA8iAxPz3hKfGEfj8taw",
    wins: "3 / 7",
    status: "HONDA",
    lapRecord: "1:30.983",
    length: "5.807 KM",
    corners: "18",
    topSpeed: "335 KM/H"
  },
  {
    id: "interlagos",
    name: "Autódromo de Interlagos",
    tagline: "RAIN MASTER",
    sector: "WET TRACK",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9F-HeQYvHp16XiIY7hrvI2YOuAR6TWhAzYjW_-Nj2EgRTs11SPpbojbHAxOtO0toq4iRk0XFIaFMjV3bIvbGkvc54K5o9m-F7-1WlivprKFUnSAGP9QFh0BF5me65JUGdV9ewGTHjn5m5VuGtUUi7tKaiY1sJnXr6GzUnMyo9HEPuIyewDX9fVVUopNRVfArK5CQhIYhB7qbNVnWjVjOKCXzxO23CtZrk3GYwgw2NibXsfvxKUwlRCRRg0Mb_rXaJ5XDxwQp1qBNX",
    wins: "2 / 7",
    status: "SHINE",
    lapRecord: "1:10.540",
    length: "4.309 KM",
    corners: "15",
    topSpeed: "320 KM/H"
  }
];

export default function Playgrounds() {
  const playgroundsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: playgroundsScroll } = useScroll({
    target: playgroundsRef,
    offset: ["start start", "end end"]
  });
  const horizontalX = useTransform(playgroundsScroll, [0, 1], ["0%", "-78%"]);

  return (
    <section ref={playgroundsRef} className="relative h-[250vh] bg-[#050505] border-y border-f1-red/20">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center py-12">
        {/* Header */}
        <div className="max-w-[1440px] w-full mx-auto px-6 md:px-12 mb-8 border-l-4 border-f1-red pl-4 z-20">
          <div className="font-mono text-rb-yellow mb-1 tracking-widest font-bold italic text-xs uppercase">
            Global_Dominance
          </div>
          <h2 className="font-sans text-3xl md:text-5xl italic-headline font-black text-white skew-title uppercase">
            MAX'S PLAYGROUNDS
          </h2>
          <div className="font-mono text-[9px] text-white/40 mt-1 uppercase tracking-wider hidden sm:block">
            SCROLL DOWN TO DRIFT THROUGH TRACK RECORDS &gt;&gt;&gt;
          </div>
        </div>

        {/* Horizontal Track Container */}
        <div className="relative w-full flex items-center">
          {/* Ambient track glow behind cards */}
          <div className="absolute top-1/2 left-1/3 -translate-y-1/2 h-72 w-72 rounded-full bg-f1-red/5 blur-[100px] pointer-events-none" />
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 h-72 w-72 rounded-full bg-rb-blue/15 blur-[100px] pointer-events-none" />

          <motion.div 
            style={{ x: horizontalX }} 
            className="flex gap-6 px-6 md:px-12 w-max items-center z-10"
          >
            {PLAYGROUNDS_DATA.map((track) => (
              <div 
                key={track.id}
                className="relative w-[300px] sm:w-[400px] h-[480px] group overflow-hidden bg-black/90 border border-white/10 mechanical-transition hover:border-f1-red/50 hover:shadow-[0_0_30px_rgba(225,6,0,0.15)] aero-edge flex flex-col justify-between shrink-0"
              >
                {/* Track image */}
                <div className="absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:scale-110 opacity-50 group-hover:opacity-85" 
                  style={{ backgroundImage: `url('${track.img}')` }}
                />
                
                {/* Image Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-[#050505] z-0" />

                {/* Top sector bar */}
                <div className="relative z-10 flex justify-between items-center p-4">
                  <span className="font-mono text-[9px] text-white/50 bg-[#0c2340]/60 border border-white/5 px-2 py-0.5 rounded tracking-widest uppercase">
                    GP_TELEMETRY
                  </span>
                  <span className="bg-f1-red text-white font-mono text-[9px] font-bold px-3 py-1 skew-title">
                    {track.sector}
                  </span>
                </div>

                {/* Middle content / title */}
                <div className="relative z-10 p-6 flex flex-col justify-end h-full">
                  <span className="font-mono text-rb-yellow mb-1 font-bold italic text-[9px] tracking-wider uppercase">
                    {track.tagline}
                  </span>
                  <h3 className="font-sans italic-headline font-black text-white skew-title text-lg sm:text-2xl uppercase tracking-wide leading-tight group-hover:text-f1-red transition-colors duration-300">
                    {track.name}
                  </h3>
                </div>

                {/* Bottom Stats details overlay */}
                <div className="relative z-10 border-t border-white/10 bg-black/85 backdrop-blur-md p-4 sm:p-5 flex flex-col gap-3 font-mono">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-[8px] text-white/40 uppercase block tracking-wider">Lap Record</span>
                      <span className="text-white text-xs sm:text-sm font-bold lcd-text block mt-0.5">{track.lapRecord}</span>
                    </div>
                    <div>
                      <span className="text-[8px] text-white/40 uppercase block tracking-wider">Top Speed</span>
                      <span className="text-white text-xs sm:text-sm font-bold lcd-text block mt-0.5">{track.topSpeed}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 border-t border-white/5 pt-2.5">
                    <div>
                      <span className="text-[7px] text-white/40 uppercase block tracking-wider">Wins</span>
                      <span className="text-white text-[10px] sm:text-xs font-bold block mt-0.5">{track.wins}</span>
                    </div>
                    <div>
                      <span className="text-[7px] text-white/40 uppercase block tracking-wider">Length</span>
                      <span className="text-white text-[10px] sm:text-xs font-bold block mt-0.5">{track.length}</span>
                    </div>
                    <div>
                      <span className="text-[7px] text-white/40 uppercase block tracking-wider">Corners</span>
                      <span className="text-white text-[10px] sm:text-xs font-bold block mt-0.5">{track.corners}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
