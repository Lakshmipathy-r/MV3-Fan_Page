"use client";

import { motion } from "framer-motion";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 70,
        damping: 15,
      },
    },
  };

  const badgeVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 10,
        delay: 0.1,
      },
    },
  };


  return (
    <section className="relative flex min-h-dvh w-full flex-col items-center justify-center overflow-hidden bg-[#050505] px-4">
      {/* Decorative background grid and neon accents */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-f1-red/10 via-transparent to-transparent opacity-60 pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0c0c0c_1px,transparent_1px),linear-gradient(to_bottom,#0c0c0c_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />
      
      {/* Dynamic light rays */}
      <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-f1-red/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-rb-blue/20 blur-[120px] pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center text-center max-w-5xl"
      >
        {/* Championship Badges */}
        <motion.div 
          variants={badgeVariants}
          className="mb-6 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md font-mono"
        >
          <span className="h-2 w-2 rounded-full bg-f1-red animate-pulse" />
          <span className="text-xs font-semibold tracking-[0.2em] text-white/80 uppercase">
            4x World Champion
          </span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          variants={itemVariants}
          className="text-8xl md:text-[12rem] font-black tracking-tighter leading-none select-none text-white/90"
        >
          MV<span className="text-f1-red text-glow-red">3</span>
        </motion.h1>

        {/* Subtitle / Name */}
        <motion.h2
          variants={itemVariants}
          className="mt-4 text-xl md:text-3xl font-extrabold tracking-[0.3em] text-white/70 uppercase"
        >
          Max Verstappen
        </motion.h2>

        {/* Divider line */}
        <motion.div
          variants={itemVariants}
          className="my-8 h-[1px] w-24 bg-gradient-to-r from-transparent via-f1-red to-transparent"
        />

        {/* Supporting taglines & stats */}
        <motion.p
          variants={itemVariants}
          className="max-w-lg text-sm md:text-base text-white/50 leading-relaxed font-normal font-mono"
        >
          You know what that is{" "}
          <span className="inline-block font-sans font-black italic text-f1-red text-glow-red tracking-widest uppercase transform -skew-x-12 ml-1">
            Simply Lovely
          </span>
        </motion.p>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-20 group"
        onClick={() => {
          window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth",
          });
        }}
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40 group-hover:text-f1-red transition-colors duration-300 font-mono">
          Scroll to Explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-white/20 group-hover:border-f1-red/50 flex justify-center p-1 transition-colors duration-300"
        >
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-1 h-2 bg-f1-red rounded-full" 
          />
        </motion.div>
      </motion.div>
    </section>
  );
}


