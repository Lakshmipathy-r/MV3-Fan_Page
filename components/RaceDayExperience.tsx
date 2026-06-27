"use client";

import { useState, useEffect, useRef } from "react";
import { 
  AlertTriangle, 
  Settings, 
  Flag, 
  Mic, 
  Share2, 
  Bell, 
  ArrowRight,
  Volume2,
  Zap,
  Flame,
  Maximize2,
  Play,
  Square,
  Sparkles,
  Info,
  Radio,
  Trophy
} from "lucide-react";
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

interface SmokeParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  rotation: number;
  rotationSpeed: number;
}

interface OrangeSmokeCanvasProps {
  triggerRef: React.RefObject<((x: number, y: number, count: number) => void) | null>;
}

function OrangeSmokeCanvas({ triggerRef }: OrangeSmokeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: SmokeParticle[] = [];

    const handleResize = () => {
      if (containerRef.current) {
        canvas.width = containerRef.current.clientWidth;
        canvas.height = containerRef.current.clientHeight;
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const createParticle = (x: number, y: number, isBurst = false): SmokeParticle => {
      const angle = Math.random() * Math.PI * 2;
      const speed = isBurst ? Math.random() * 4 + 1.5 : Math.random() * 0.4 + 0.15;
      return {
        x,
        y,
        vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 0.2,
        vy: isBurst ? Math.sin(angle) * speed - 0.5 : -Math.random() * 0.8 - 0.2,
        size: isBurst ? Math.random() * 50 + 20 : Math.random() * 90 + 50,
        alpha: isBurst ? 0.95 : Math.random() * 0.35 + 0.1,
        decay: isBurst ? Math.random() * 0.007 + 0.004 : Math.random() * 0.002 + 0.0008,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.008,
      };
    };

    // Pre-populate ambient smoke
    for (let i = 0; i < 25; i++) {
      particles.push(
        createParticle(
          Math.random() * canvas.width,
          Math.random() * canvas.height * 0.8 + canvas.height * 0.2
        )
      );
    }

    // Set trigger ref function
    triggerRef.current = (x: number, y: number, count: number) => {
      for (let i = 0; i < count; i++) {
        particles.push(createParticle(x, y, true));
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn regular ambient smoke
      if (Math.random() < 0.08 && particles.length < 50) {
        particles.push(createParticle(Math.random() * canvas.width, canvas.height + 25));
      }

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.alpha -= p.decay;

        // Push smoke with mouse
        const dx = p.x - mouseRef.current.x;
        const dy = p.y - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) {
          const force = (180 - dist) / 180;
          p.x += (dx / dist) * force * 3;
          p.y += (dy / dist) * force * 3;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
        grad.addColorStop(0, `rgba(249, 115, 22, ${p.alpha})`); // Orange Army Orange
        grad.addColorStop(0.4, `rgba(239, 68, 68, ${p.alpha * 0.4})`); // F1 Red blend
        grad.addColorStop(1, "rgba(225, 6, 0, 0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(0, 0, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      particles = particles.filter((p) => p.alpha > 0);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
      cancelAnimationFrame(animationId);
      triggerRef.current = null;
    };
  }, [triggerRef]);

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-25">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}

const RADIO_CALLS = [
  {
    id: "radio-check",
    label: "Radio Check",
    clip: "Max: 'Radio check.' GP: 'You are loud.' Max: 'But not clear?'",
    subtitle: "2023 Austrian GP - Pre-session check",
    freq: 440,
    beeps: [440, 440, 880],
    audioSrc: "/audio/radio-check.m4a",
    startTime: 0,
    duration: 160
  },
  {
    id: "simply-lovely",
    label: "Simply Lovely!",
    clip: "Simply lovely! Unbelievable performance guys, thank you so much.",
    subtitle: "2023 British GP - Silverstone win",
    freq: 554.37,
    beeps: [554.37, 554.37, 1108.73],
    audioSrc: "/audio/simply-lovely.m4a",
    startTime: 0,
    duration: 160
  },
  {
    id: "send-regards",
    label: "Send Regards",
    clip: "Yeah, that's fine, send them my regards.",
    subtitle: "2023 Las Vegas GP - Penalty response",
    freq: 330,
    beeps: [330, 330, 660],
    audioSrc: "/audio/send-regards.m4a",
    startTime: 0,
    duration: 160
  },
  {
    id: "unleash-lion",
    label: "World Champion!",
    clip: "Yes! Haha! We did it! Unbelievable, what a team effort. Let's go!",
    subtitle: "2021 Abu Dhabi GP - World Champion moment",
    freq: 659.25,
    beeps: [659.25, 659.25, 1318.51],
    audioSrc: "/audio/unleash-lion.m4a",
    startTime: 0,
    duration: 168
  },
  {
    id: "no-power",
    label: "No Grip",
    clip: "I have zero grip in these tires. It's like driving on ice. Unbelievable.",
    subtitle: "2024 Monaco GP - Tire struggle",
    freq: 370,
    beeps: [370, 370, 740],
    audioSrc: "/audio/no-grip.m4a",
    startTime: 0,
    duration: 460
  }
];

const SIGHTS_DATA = [
  {
    id: 1,
    title: "Zandvoort Flares",
    tagline: "ORANGE INVASION",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBovvuqSQSot1FidJe2fOrOa6a0bFFESGu09zNS-VJzB6bR6SpKhfbgvJHnPObAFi4IaWIUTb3tKwk9tJxFtcx9Jpycd2ngcQHpX1n2IgjCJ6Nsf_mY9zWmnzhLkDWx2y-ClBGZvUEThfpdADAxNiTnr28-kWaZTBF4tiIo3TGaA-z3Qo2ZxjOr9MWbPL_6MEqs7yomU_8jsseUWNDYpzDZiaFD0dWyIGFej3mbI5JeJ5xC-GdZn56bDC1tRqDLSQGAzQIflzZfdyQ3",
    year: "2023 EDITION",
    stats: {
      attendance: "120,000 FANS",
      flares: "85KG SMOKE",
      decibel: "131 dB PEAK",
      vibe: "MAXIMUM TURBULENCE"
    },
    description: "The home race in Zandvoort transforms into a wall of orange smoke as soon as Max exits the pitlane. The grandstands bounce in unison, creating mini-seismic tremors registered on track seismographs."
  },
  {
    id: 2,
    title: "Spielberg Stands",
    tagline: "AUSTRIA TAKEOVER",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAfJxQPWmA13dZtiwEe4kxeniJtOIaDvFQjsEJDpFg3NONcFmNyLn5KZF7SBTPxKj-GBvz1m_THP_YphwGmRFKRgG-4w1JXQYgUDAgUmCGjAtEZEJevCAl-gDwnifWkdMLAlzr8GwkcdYQy7fQFn3plb5GdEU2Z57snlEsMTnf-DlL_8mLFIuAtAUqKnt4CkBrxs-bf0bH_oAZGXzU-gvq8LJbWOKivI0_MYrQiord9An34ESVZy7ykUEozmA8iAxPz3hKfGEfj8taw",
    year: "MAX POWER",
    stats: {
      attendance: "95,000 FANS",
      flares: "60KG SMOKE",
      decibel: "128 dB PEAK",
      vibe: "STADIUM ATMOSPHERE"
    },
    description: "Red Bull's home track in Austria becomes a temporary colony of the Dutch Orange Army. The entire hillside grandstand is shrouded in orange haze, with airhorns and drums pulsing throughout the weekend."
  },
  {
    id: 3,
    title: "Precision Hub",
    tagline: "GARAGE TELEMETRY",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7lvHOW3G-aABo905t5f8T_oKgrT_F8Xf9p2HvyVFW-Bn2R22MYhOrtEQlLY3Z81rPenGvW4VCtKubK3S1ZdEjEJOk6dYz4LfzRpkBZ712sl7ksN2m5rILKwO6U1QFBOpbNVBvUHntYxLerVlk7gi9X3WNcV69mCainusKV_64br4QYpUqUePXNyaWDs4ZCzSYywn9TlTU0K3jBx1SLvY8p1enKheTplfWSMaDNuyXR9cmK9xC6sTyfFeNVpm1YoHUUBu38wOOuoqf",
    year: "RB GARAGE INT",
    stats: {
      crewSize: "22 MECHANICS",
      pitTime: "1.82s AVERAGE",
      comms: "55 CHANNELS",
      precision: "99.98% SUCCESS"
    },
    description: "Behind the orange smoke lies the technical mastery of the Red Bull garage. Real-time pit telemetry tracks mechanical adjustments, heat dissipation, and strategic calculations down to the millisecond."
  }
];

export default function RaceDayExperience() {
  const [activeLiveryIndex, setActiveLiveryIndex] = useState(0);

  // Fan Zone Interactive States
  const [fanTab, setFanTab] = useState<"sights" | "radio" | "cheer">("sights");
  const [selectedSight, setSelectedSight] = useState<number | null>(null);
  const [cheerLevel, setCheerLevel] = useState(80);
  const [isMaxCheered, setIsMaxCheered] = useState(false);
  const [activeRadioId, setActiveRadioId] = useState<string | null>(null);
  const [typedText, setTypedText] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);

  const typewriterIntervalRef = useRef<any>(null);
  const smokeTriggerRef = useRef<((x: number, y: number, count: number) => void) | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioProgressIntervalRef = useRef<any>(null);

  // Decibel level decay loop
  useEffect(() => {
    if (cheerLevel > 80) {
      const decay = setInterval(() => {
        setCheerLevel((prev) => {
          if (prev <= 80) {
            clearInterval(decay);
            return 80;
          }
          const amount = isMaxCheered ? 0.4 : 1.0;
          return Math.max(80, prev - amount);
        });
      }, 150);
      return () => clearInterval(decay);
    }
  }, [cheerLevel, isMaxCheered]);

  // Clean typewriter + audio on unmount
  useEffect(() => {
    return () => {
      if (typewriterIntervalRef.current) {
        clearInterval(typewriterIntervalRef.current);
      }
      if (audioProgressIntervalRef.current) {
        clearInterval(audioProgressIntervalRef.current);
      }
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const stopRadio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (audioProgressIntervalRef.current) {
      clearInterval(audioProgressIntervalRef.current);
    }
    setIsAudioPlaying(false);
    setAudioProgress(0);
    setAudioCurrentTime(0);
  };

  const triggerRadio = (id: string, text: string, beeps: number[], audioSrc: string, startTime: number = 0) => {
    if (typewriterIntervalRef.current) {
      clearInterval(typewriterIntervalRef.current);
    }

    // Stop any previously playing audio
    stopRadio();

    setActiveRadioId(id);
    setTypedText("");
    setAudioProgress(0);

    // Play real audio clip with radio filter via Web Audio API
    try {
      const AudioContextClass = (window.AudioContext || (window as any).webkitAudioContext);
      if (AudioContextClass) {
        const ctx = new AudioContextClass();
        let time = ctx.currentTime;

        // Synthesize walkie-talkie beeps
        beeps.forEach((freq) => {
          const osc = ctx.createOscillator();
          const gainNode = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, time);
          gainNode.gain.setValueAtTime(0.06, time);
          gainNode.gain.exponentialRampToValueAtTime(0.0001, time + 0.1);
          osc.connect(gainNode);
          gainNode.connect(ctx.destination);
          osc.start(time);
          osc.stop(time + 0.12);
          time += 0.08;
        });

        // Intro static burst
        const bufferSize = ctx.sampleRate * 0.6;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.value = 1200;
        filter.Q.value = 2.5;
        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.02, time);
        noiseGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.5);
        noise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(ctx.destination);
        noise.start(time);
        noise.stop(time + 0.65);
      }
    } catch (e) {
      console.warn("AudioContext not supported or blocked by browser policy");
    }

    // Play real team radio audio after the beeps (0.35s delay)
    setTimeout(() => {
      try {
        const audio = new Audio(audioSrc);
        audio.currentTime = startTime;
        audioRef.current = audio;

        audio.addEventListener("loadedmetadata", () => {
          setAudioDuration(audio.duration);
        });

        audio.addEventListener("play", () => setIsAudioPlaying(true));
        audio.addEventListener("pause", () => setIsAudioPlaying(false));
        audio.addEventListener("ended", () => {
          setIsAudioPlaying(false);
          setAudioProgress(100);
          if (audioProgressIntervalRef.current) clearInterval(audioProgressIntervalRef.current);
        });

        audio.play().catch((err) => {
          console.warn("Audio playback blocked:", err);
        });

        // Track progress
        audioProgressIntervalRef.current = setInterval(() => {
          if (audio && !audio.paused && audio.duration > 0) {
            const elapsed = audio.currentTime - startTime;
            const clampedProgress = Math.min(100, (elapsed / Math.max(audio.duration - startTime, 1)) * 100);
            setAudioProgress(clampedProgress);
            setAudioCurrentTime(audio.currentTime);
          }
        }, 250);
      } catch (err) {
        console.warn("Audio element error:", err);
      }
    }, 350);

    // Animate typewriter transcript
    let index = 0;
    typewriterIntervalRef.current = setInterval(() => {
      setTypedText((prev) => prev + text.charAt(index));
      index++;
      if (index >= text.length) {
        if (typewriterIntervalRef.current) {
          clearInterval(typewriterIntervalRef.current);
        }
      }
    }, 35);
  };

  const triggerWinSynth = () => {
    try {
      const AudioContextClass = (window.AudioContext || (window as any).webkitAudioContext);
      if (AudioContextClass) {
        const ctx = new AudioContextClass();
        let time = ctx.currentTime;
        // Ascending triumph scale C4 -> C5
        const freqs = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gainNode = ctx.createGain();
          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(freq, time + idx * 0.08);
          gainNode.gain.setValueAtTime(0.03, time + idx * 0.08);
          gainNode.gain.exponentialRampToValueAtTime(0.0001, time + idx * 0.08 + 0.35);
          osc.connect(gainNode);
          gainNode.connect(ctx.destination);
          osc.start(time + idx * 0.08);
          osc.stop(time + idx * 0.08 + 0.4);
        });
      }
    } catch (e) {}
  };

  const handleCheer = (e: React.MouseEvent) => {
    if (isMaxCheered) return;

    // Pitch rises with decibels!
    try {
      const AudioContextClass = (window.AudioContext || (window as any).webkitAudioContext);
      if (AudioContextClass) {
        const ctx = new AudioContextClass();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.setValueAtTime(280 + cheerLevel * 3, ctx.currentTime);
        gain.gain.setValueAtTime(0.02, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
      }
    } catch (err) {}

    // Trigger visual particles
    if (smokeTriggerRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const sectionElement = document.getElementById("fan-zone-section");
      if (sectionElement) {
        const sectionRect = sectionElement.getBoundingClientRect();
        const x = rect.left - sectionRect.left + rect.width / 2;
        const y = rect.top - sectionRect.top + rect.height / 2;
        smokeTriggerRef.current(x, y, 7);
      }
    }

    setCheerLevel((prev) => {
      const next = Math.min(130, prev + 5.0);
      if (next >= 130) {
        setIsMaxCheered(true);
        // Trigger massive center smoke flare!
        if (smokeTriggerRef.current) {
          const sectionElement = document.getElementById("fan-zone-section");
          if (sectionElement) {
            const w = sectionElement.clientWidth;
            const h = sectionElement.clientHeight;
            smokeTriggerRef.current(w / 2, h / 2 + 50, 40);
          }
        }
        triggerWinSynth();
      }
      return next;
    });

    // Shake screen when cheering intensely
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 120);
  };


  // Playgrounds horizontal scroll refs
  const playgroundsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: playgroundsScroll } = useScroll({
    target: playgroundsRef,
    offset: ["start start", "end end"]
  });
  const horizontalX = useTransform(playgroundsScroll, [0, 1], ["0%", "-78%"]);

  // Trophy Room horizontal scroll refs
  const trophyRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: trophyScroll } = useScroll({
    target: trophyRef,
    offset: ["start start", "end end"]
  });
  const trophyX = useTransform(trophyScroll, [0, 1], ["0%", "-78%"]);

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
    <div className="w-full bg-[#050505] text-white">
      
      {/* Section 2: Trophy Room (Stat Engine) - Horizontal Scroll Timeline */}
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


      {/* Section 3: Red Bull Racing Liveries - 3D Card Scroll Showcase */}
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

      {/* Section 4: Max's Playgrounds (Track Records) - Horizontal Scroll Journey */}
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


      {/* Section 5: Fan Zone */}
      <section 
        id="fan-zone-section" 
        className={`py-24 px-6 md:px-12 bg-black relative border-t-2 border-f1-red/30 overflow-hidden ${
          isShaking ? "animate-[shake_0.15s_ease-in-out_infinite]" : ""
        }`}
      >
        {/* Ambient Orange Smoke Background */}
        <OrangeSmokeCanvas triggerRef={smokeTriggerRef} />

        {/* Ambient Grid layout */}
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-f1-red/5 rounded-full blur-[120px] pointer-events-none z-0" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-orange-500/5 rounded-full blur-[140px] pointer-events-none z-0" />

        <div className="max-w-[1440px] mx-auto relative z-10">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-l-4 border-f1-red pl-4 gap-6">
            <div>
              <div className="font-mono text-rb-yellow mb-2 font-black italic tracking-widest text-xs flex items-center gap-1.5">
                <Flame className="h-3.5 w-3.5 text-orange-500 animate-pulse" />
                RAW EMOTION // FANS ENGINE
              </div>
              <h2 className="font-sans text-3xl md:text-5xl italic-headline font-black text-white skew-title uppercase">
                THE ORANGE ARMY HUB
              </h2>
            </div>
            
            {/* Tech Tabs Navigation */}
            <div className="flex bg-white/5 border border-white/10 p-1 aero-edge-reverse select-none">
              {(["sights", "radio", "cheer"] as const).map((tab) => {
                const label = tab === "sights" ? "SIGHTS & STATS" : tab === "radio" ? "TEAM RADIO" : "CHEER GAUGE";
                const Icon = tab === "sights" ? Flame : tab === "radio" ? Volume2 : Zap;
                const isActive = fanTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => {
                      setFanTab(tab);
                      setSelectedSight(null);
                    }}
                    className={`font-mono text-[9px] font-bold px-4 py-2 flex items-center gap-1.5 mechanical-transition cursor-pointer ${
                      isActive 
                        ? "bg-f1-red text-white skew-title" 
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon className={`h-3 w-3 ${isActive && tab === "cheer" ? "animate-bounce" : ""}`} />
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Tab Panel Render */}
          <AnimatePresence mode="wait">
            <motion.div
              key={fanTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="relative w-full"
            >
              
              {/* Tab 1: Sights & Stats */}
              {fanTab === "sights" && (
                <div className="flex flex-col gap-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {SIGHTS_DATA.map((sight) => {
                      const isSelected = selectedSight === sight.id;
                      return (
                        <div 
                          key={sight.id}
                          onClick={() => setSelectedSight(isSelected ? null : sight.id)}
                          className={`relative h-[400px] overflow-hidden group border cursor-pointer mechanical-transition aero-edge ${
                            isSelected ? "border-f1-red shadow-[0_0_25px_rgba(225,6,0,0.25)]" : "border-white/5 hover:border-f1-red/40"
                          }`}
                        >
                          <img 
                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" 
                            src={sight.img} 
                            alt={sight.title}
                          />
                          {/* Ambient Hover Gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-300" />
                          
                          {/* Corner Telemetry Tags */}
                          <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                            <span className="font-mono text-[8px] text-white/50 bg-[#0c2340]/80 border border-white/5 px-2 py-0.5 rounded tracking-widest uppercase">
                              SECTOR_0{sight.id}
                            </span>
                          </div>
                          
                          {/* Title card overlay details */}
                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-6 flex flex-col justify-end">
                            <span className="font-mono text-rb-yellow text-[9px] tracking-widest font-black uppercase mb-1">
                              {sight.tagline}
                            </span>
                            <div className="flex items-center justify-between">
                              <h3 className="font-sans text-lg md:text-xl italic font-black text-white mb-1 skew-title uppercase group-hover:text-f1-red transition-colors duration-300">
                                {sight.title}
                              </h3>
                              <Maximize2 className="h-4 w-4 text-white/40 group-hover:text-white transition-colors duration-300" />
                            </div>
                            <span className="font-mono text-[8px] text-white/40 uppercase">
                              {sight.year}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Telemetry drawer */}
                  <AnimatePresence>
                    {selectedSight !== null && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border border-f1-red/20 bg-black/90 backdrop-blur-md p-6 relative overflow-hidden aero-edge z-10"
                      >
                        <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-f1-red/5 blur-3xl pointer-events-none" />
                        
                        {(() => {
                          const sight = SIGHTS_DATA.find((s) => s.id === selectedSight);
                          if (!sight) return null;
                          return (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                              <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-3">
                                  <span className="font-mono text-rb-yellow text-[9px] bg-[#0c2340]/60 border border-white/5 px-2.5 py-1 rounded tracking-widest uppercase">
                                    COMMS_DECODE #{sight.id}
                                  </span>
                                  <span className="bg-f1-red text-white font-mono text-[9px] font-bold px-2 py-0.5 skew-title">
                                    {sight.year}
                                  </span>
                                </div>
                                <h3 className="font-sans text-2xl md:text-3xl italic font-black text-white skew-title uppercase leading-tight">
                                  {sight.title}
                                </h3>
                                <p className="font-mono text-xs text-white/70 leading-relaxed">
                                  {sight.description}
                                </p>
                                
                                <button 
                                  onClick={() => setSelectedSight(null)}
                                  className="mt-2 text-left font-mono text-[9px] text-f1-red font-bold uppercase tracking-wider hover:text-white transition-colors duration-200 w-fit cursor-pointer"
                                >
                                  [&lt;&lt; COLLAPSE TELEMETRY DIALOG]
                                </button>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4 font-mono">
                                {Object.entries(sight.stats).map(([key, val]) => (
                                  <div key={key} className="bg-white/5 border border-white/10 p-4 relative group hover:border-f1-red/30 mechanical-transition">
                                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 group-hover:border-f1-red/50" />
                                    <span className="text-[8px] text-white/40 uppercase block tracking-wider mb-1">{key.replace(/([A-Z])/g, ' $1')}</span>
                                    <span className="text-white font-bold text-sm sm:text-base tracking-wide lcd-text">{val}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })()}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Tab 2: Team Radio Soundboard */}
              {fanTab === "radio" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                  {/* Left: Radio message trigger chart */}
                  <div className="flex flex-col gap-3 font-mono">
                    <div className="text-[10px] text-white/40 uppercase tracking-wider mb-2 font-bold flex items-center gap-1.5">
                      <Radio className="h-3.5 w-3.5 text-f1-red" />
                      SELECT TELEMETRY CHANNEL // SOUND CLIPS
                    </div>
                    {RADIO_CALLS.map((call) => {
                      const isActive = activeRadioId === call.id;
                      return (
                        <button
                          key={call.id}
                          onClick={() => {
                            if (isActive && isAudioPlaying) {
                              stopRadio();
                              setActiveRadioId(null);
                              setTypedText("");
                            } else {
                              triggerRadio(call.id, call.clip, call.beeps, call.audioSrc, call.startTime);
                            }
                          }}
                          className={`flex items-center justify-between p-4 border text-left cursor-pointer mechanical-transition relative group ${
                            isActive 
                              ? "bg-f1-red/10 border-f1-red shadow-[0_0_15px_rgba(225,6,0,0.15)] text-white" 
                              : "bg-black/40 border-white/10 hover:border-f1-red/50 text-white/70 hover:text-white"
                          }`}
                        >
                          <div className={`absolute top-0 left-0 bottom-0 w-1 ${
                            isActive ? "bg-f1-red" : "bg-transparent group-hover:bg-white/20"
                          }`} />

                          {/* Audio progress bar at bottom */}
                          {isActive && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/5">
                              <motion.div
                                className="h-full bg-f1-red"
                                style={{ width: `${audioProgress}%` }}
                                transition={{ duration: 0.25 }}
                              />
                            </div>
                          )}
                          
                          <div className="pl-3">
                            <span className="text-[8px] text-white/40 block mb-1 uppercase tracking-wider">{call.subtitle}</span>
                            <span className="font-sans italic font-black text-sm uppercase skew-title tracking-wide">{call.label}</span>
                            {isActive && (
                              <span className="text-[8px] text-f1-red block mt-0.5 font-mono tracking-wider">
                                {isAudioPlaying ? "◉ LIVE RADIO" : "◯ READY"}
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] text-white/30 tracking-widest">{call.freq} MHz</span>
                            {isActive && isAudioPlaying ? (
                              <motion.div 
                                animate={{ scale: [1, 1.2, 1] }} 
                                transition={{ duration: 0.8, repeat: Infinity }}
                              >
                                <Square className="h-3.5 w-3.5 text-f1-red" />
                              </motion.div>
                            ) : isActive ? (
                              <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.8, repeat: Infinity }}>
                                <Radio className="h-4 w-4 text-f1-red" />
                              </motion.div>
                            ) : (
                              <Play className="h-3 w-3 text-white/40 group-hover:text-f1-red transition-colors duration-200" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Right: Audio Waveform & Transcript Display */}
                  <div className="flex flex-col gap-5">
                    <div className="flex items-center justify-between">
                      <div className="text-[10px] text-white/40 uppercase tracking-wider font-mono font-bold">
                        COMMS WAVEFORM ANALYZER
                      </div>
                      {activeRadioId && (
                        <div className="flex items-center gap-3 font-mono">
                          <span className="text-[9px] text-white/40">
                            {Math.floor(audioCurrentTime / 60).toString().padStart(2, '0')}:{Math.floor(audioCurrentTime % 60).toString().padStart(2, '0')}
                          </span>
                          <button
                            onClick={stopRadio}
                            className="flex items-center gap-1.5 font-mono text-[8px] text-f1-red border border-f1-red/40 px-2 py-1 hover:bg-f1-red/10 transition-colors duration-200 cursor-pointer uppercase tracking-wider"
                          >
                            <Square className="h-2.5 w-2.5" />
                            STOP
                          </button>
                        </div>
                      )}
                    </div>
                    
                    {/* Visual Audio Wave */}
                    <div className="h-28 bg-black/80 border border-white/10 flex items-center justify-center gap-1.5 px-6 overflow-hidden relative">
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:8px_8px]" />
                      
                      {/* Audio progress scan-line */}
                      {activeRadioId && (
                        <motion.div
                          className="absolute top-0 bottom-0 w-0.5 bg-f1-red/30 pointer-events-none"
                          style={{ left: `${audioProgress}%` }}
                        />
                      )}

                      {Array.from({ length: 28 }).map((_, i) => (
                        <motion.div
                          key={i}
                          animate={isAudioPlaying ? {
                            height: [6, Math.random() * 75 + 10, 6],
                          } : activeRadioId ? {
                            height: [6, Math.random() * 20 + 6, 6]
                          } : {
                            height: 6
                          }}
                          transition={activeRadioId ? {
                            duration: 0.35 + Math.random() * 0.35,
                            repeat: Infinity,
                            ease: "easeInOut"
                          } : {}}
                          className={`w-1.5 rounded-full mechanical-transition ${
                            isAudioPlaying 
                              ? "bg-f1-red/90 shadow-[0_0_8px_rgba(225,6,0,0.5)]" 
                              : activeRadioId 
                              ? "bg-white/30" 
                              : "bg-white/10"
                          }`}
                          style={{ height: 6 }}
                        />
                      ))}
                    </div>

                    {/* Audio progress bar */}
                    {activeRadioId && (
                      <div className="relative h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          className="absolute top-0 left-0 h-full bg-f1-red rounded-full"
                          style={{ width: `${audioProgress}%` }}
                        />
                      </div>
                    )}

                    {/* Neon Telemetry Screen */}
                    <div className="border border-white/10 bg-black/90 p-5 relative overflow-hidden font-mono min-h-[130px] flex flex-col justify-between">
                      <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-f1-red/50" />
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-f1-red/50" />
                      
                      <div>
                        <div className="text-[9px] text-white/40 uppercase tracking-widest mb-3 flex justify-between items-center border-b border-white/5 pb-2">
                          <span>RADIO_DECRYPTION_SCREEN</span>
                          {activeRadioId && isAudioPlaying && (
                            <motion.span 
                              animate={{ opacity: [1, 0.3, 1] }}
                              transition={{ duration: 1.2, repeat: Infinity }}
                              className="text-f1-red flex items-center gap-1"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-f1-red" /> ◉ LIVE RADIO TRANSMISSION
                            </motion.span>
                          )}
                          {activeRadioId && !isAudioPlaying && (
                            <span className="text-rb-yellow flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-rb-yellow" /> COMMS RECEIVED
                            </span>
                          )}
                        </div>
                        
                        <p className="text-xs sm:text-sm text-green-400 font-semibold tracking-wide leading-relaxed">
                          {activeRadioId ? typedText : "> STANDBY SIGNAL... PILOT VOICE TRANSCRIPT NOT COMPILED. SELECT A COMPONENT FROM THE FREQUENCY CHART ON THE LEFT TO CAPTURE."}
                        </p>
                      </div>
                      
                      <div className="text-[7px] text-white/30 uppercase mt-4 flex justify-between items-center">
                        <span>{activeRadioId ? `SRC: ${RADIO_CALLS.find(c => c.id === activeRadioId)?.audioSrc?.split('/').pop()}` : "CHANNEL OPEN"}</span>
                        <span>{activeRadioId ? "REAL-TIME VOICE CORRELATION ACTIVE" : "AWAITING INPUT"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Decibel Cheer Meter */}
              {fanTab === "cheer" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                  
                  {/* Left: The Meter Widget */}
                  <div className="flex flex-col items-center justify-center gap-6 p-6 border border-white/10 bg-black/60 backdrop-blur-sm relative overflow-hidden aero-edge">
                    {/* Radial Gauge */}
                    <div className="relative w-48 h-48 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90">
                        {/* Track circle */}
                        <circle
                          cx="96"
                          cy="96"
                          r="80"
                          fill="transparent"
                          stroke="rgba(255,255,255,0.05)"
                          strokeWidth="12"
                        />
                        {/* Fill circle */}
                        <motion.circle
                          cx="96"
                          cy="96"
                          r="80"
                          fill="transparent"
                          stroke={cheerLevel >= 120 ? "#fcd500" : cheerLevel >= 100 ? "#f97316" : "#e10600"}
                          strokeWidth="12"
                          strokeDasharray={2 * Math.PI * 80}
                          animate={{ strokeDashoffset: (2 * Math.PI * 80) - (((cheerLevel - 80) / 50) * (2 * Math.PI * 80)) }}
                          transition={{ type: "spring", stiffness: 70, damping: 14 }}
                          strokeLinecap="round"
                        />
                      </svg>
                      {/* Center text */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="font-mono text-white/40 text-[9px] uppercase tracking-wider">Sound Level</span>
                        <motion.span 
                          className={`font-sans text-3xl font-black italic skew-title leading-none mt-1 ${
                            cheerLevel >= 120 ? "text-rb-yellow text-glow-blue" : cheerLevel >= 100 ? "text-orange-500" : "text-f1-red text-glow-red"
                          }`}
                        >
                          {Math.round(cheerLevel)}
                        </motion.span>
                        <span className="font-mono text-white/50 text-[9px] mt-1">DECIBELS (dB)</span>
                      </div>
                    </div>

                    {/* Info HUD */}
                    <div className="w-full grid grid-cols-2 gap-4 text-center font-mono border-t border-white/5 pt-4">
                      <div>
                        <span className="text-[8px] text-white/40 uppercase block">Noise Level Info</span>
                        <span className="text-white text-[10px] font-bold mt-0.5 block">
                          {cheerLevel >= 125 ? "🚨 ZANDVOORT PEAK!" : cheerLevel >= 110 ? "🔥 STADIUM ROAR" : cheerLevel >= 95 ? "⚡ AIR HORNS ACTIVE" : "💤 AMBIENT CROWD"}
                        </span>
                      </div>
                      <div>
                        <span className="text-[8px] text-white/40 uppercase block">Engine Revs</span>
                        <span className="text-white text-[10px] font-bold mt-0.5 block">
                          {Math.round(((cheerLevel - 80) / 50) * 12000 + 3000)} RPM
                        </span>
                      </div>
                    </div>

                    {/* Cheer Interactive Action */}
                    <div className="relative w-full flex justify-center mt-2 z-10">
                      {isMaxCheered ? (
                        <div className="flex flex-col items-center gap-3">
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="flex items-center gap-2 bg-rb-yellow/20 border border-rb-yellow p-3 text-rb-yellow rounded"
                          >
                            <Trophy className="h-5 w-5 text-rb-yellow animate-bounce" />
                            <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-center">
                              ORANGE ARMY COMMANDER UNLOCKED!
                            </span>
                          </motion.div>
                          
                          <button
                            onClick={() => {
                              setCheerLevel(80);
                              setIsMaxCheered(false);
                            }}
                            className="font-mono text-[9px] text-white/50 hover:text-white border border-white/20 hover:border-white/50 px-4 py-1.5 rounded uppercase tracking-widest cursor-pointer mt-1"
                          >
                            RESET DECIBEL METER
                          </button>
                        </div>
                      ) : (
                        <motion.button
                          onClick={handleCheer}
                          whileTap={{ scale: 0.93 }}
                          className="relative px-8 py-4 bg-gradient-to-r from-f1-red to-orange-500 hover:from-orange-600 hover:to-f1-red text-white font-sans text-xs font-black italic tracking-widest uppercase skew-title rounded shadow-[0_0_20px_rgba(225,6,0,0.3)] hover:shadow-[0_0_35px_rgba(225,6,0,0.6)] border border-white/20 transition-all duration-300 flex items-center gap-3 cursor-pointer z-10"
                        >
                          <Flame className="h-4 w-4 animate-pulse text-rb-yellow" />
                          REV & CHEER FOR MAX!
                        </motion.button>
                      )}
                    </div>
                  </div>

                  {/* Right: Achieve telemetry milestones list */}
                  <div className="flex flex-col gap-4 font-mono justify-center">
                    <div className="text-[10px] text-white/40 uppercase tracking-wider font-bold">
                      GRANDSTAND TELEMETRY GOALS
                    </div>
                    
                    {[
                      { val: 95, label: "AIR HORNS ACTIVE", desc: "Dutch crowd wakes up the pitlane" },
                      { val: 110, label: "STADIUM ROAR ENGAGED", desc: "Spielberg grandstand vibrates at peak frequency" },
                      { val: 120, label: "ORANGE FLARES TRIGGERED", desc: "Orange smoke begins engulfing the circuit" },
                      { val: 130, label: "ORANGE ARMY COMMANDER", desc: "Unlocked ultimate championship cheer level!" }
                    ].map((goal) => {
                      const isReached = cheerLevel >= goal.val;
                      return (
                        <div 
                          key={goal.val}
                          className={`p-4 border mechanical-transition relative overflow-hidden ${
                            isReached 
                              ? "bg-f1-red/10 border-f1-red/50 text-white" 
                              : "bg-black/30 border-white/5 text-white/40"
                          }`}
                        >
                          {isReached && (
                            <div className="absolute top-0 right-0 bg-f1-red text-white text-[7px] font-bold px-2 py-0.5 uppercase tracking-wider">
                              ACHIEVED
                            </div>
                          )}
                          <div className="flex items-start gap-3">
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center border text-[9px] mt-0.5 font-bold ${
                              isReached ? "border-f1-red text-f1-red" : "border-white/10 text-white/10"
                            }`}>
                              {isReached ? "✓" : goal.val}
                            </div>
                            <div>
                              <h5 className={`font-sans italic font-bold text-xs uppercase ${isReached ? "text-white" : "text-white/40"}`}>
                                {goal.label}
                              </h5>
                              <p className="text-[9px] text-white/50 mt-1">{goal.desc}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                </div>
              )}

            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      {/* Footer */}
      <footer className="w-full px-6 md:px-12 py-12 flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/10 bg-[#0c2340]/10">
        <div className="flex flex-col gap-2 text-center md:text-left">
          <div className="text-2xl font-sans italic font-black text-white skew-title">
            <span className="text-f1-red">MAX</span> VERSTAPPEN
          </div>
          <div className="text-white/40 font-mono text-[9px] tracking-wider uppercase">
            © 2026 MAX VERSTAPPEN - UNLEASH THE LION
          </div>
        </div>
        
        <div className="flex gap-8">
          <a className="text-white/60 font-mono text-xs hover:text-f1-red transition-all duration-300 uppercase tracking-wider" href="#">PRIVACY</a>
          <a className="text-white/60 font-mono text-xs hover:text-f1-red transition-all duration-300 uppercase tracking-wider" href="#">TERMS</a>
          <a className="text-white/60 font-mono text-xs hover:text-f1-red transition-all duration-300 uppercase tracking-wider" href="#">CONTACT</a>
        </div>
        
        <div className="flex gap-4">
          <div className="w-10 h-10 border border-white/10 flex items-center justify-center hover:bg-f1-red hover:border-f1-red hover:text-white cursor-pointer mechanical-transition aero-edge-reverse">
            <Share2 className="h-4 w-4" />
          </div>
          <div className="w-10 h-10 border border-white/10 flex items-center justify-center hover:bg-f1-red hover:border-f1-red hover:text-white cursor-pointer mechanical-transition aero-edge-reverse">
            <Bell className="h-4 w-4" />
          </div>
        </div>
      </footer>

    </div>
  );
}
