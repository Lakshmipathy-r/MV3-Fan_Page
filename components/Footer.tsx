"use client";

import { ArrowRight, Share2, Bell } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full px-6 md:px-12 py-12 flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/10 bg-[#0c2340]/10">
      <div className="flex flex-col gap-2 text-center md:text-left max-w-md">
        <div className="text-2xl font-sans italic font-black text-white skew-title">
          <span className="text-f1-red">MAX</span> VERSTAPPEN
        </div>
        <p className="text-[10px] font-mono text-white/40 leading-relaxed uppercase">
          Disclaimer: This is an unofficial, non-commercial fan-made tribute page celebrating Max Verstappen & Oracle Red Bull Racing. All logos, images, and brand names are property of their respective owners.
        </p>
        <div className="text-white/30 font-mono text-[9px] tracking-wider uppercase mt-1">
          © 2026 MAX VERSTAPPEN - UNLEASH THE LION
        </div>
      </div>
      
      <div className="flex gap-8">
        <a className="text-white/60 font-mono text-xs hover:text-f1-red transition-all duration-300 uppercase tracking-wider" href="#">PRIVACY</a>
        <a className="text-white/60 font-mono text-xs hover:text-f1-red transition-all duration-300 uppercase tracking-wider" href="#">TERMS</a>
        <a 
          className="text-white/60 font-mono text-xs hover:text-f1-red transition-all duration-300 uppercase tracking-wider flex items-center gap-1.5" 
          href="https://www.linkedin.com/in/lakshmipathy-r-/" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          CONTACT <ArrowRight className="h-3 w-3" />
        </a>
      </div>
      
      <div className="flex gap-4">
        <a 
          href="https://www.linkedin.com/in/lakshmipathy-r-/" 
          target="_blank" 
          rel="noopener noreferrer"
          title="Connect on LinkedIn"
          className="w-10 h-10 border border-white/10 flex items-center justify-center hover:bg-f1-red hover:border-f1-red hover:text-white cursor-pointer mechanical-transition aero-edge-reverse text-white/70"
        >
          <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
        </a>
        <div className="w-10 h-10 border border-white/10 flex items-center justify-center hover:bg-f1-red hover:border-f1-red hover:text-white cursor-pointer mechanical-transition aero-edge-reverse text-white/70">
          <Share2 className="h-4 w-4" />
        </div>
        <div className="w-10 h-10 border border-white/10 flex items-center justify-center hover:bg-f1-red hover:border-f1-red hover:text-white cursor-pointer mechanical-transition aero-edge-reverse text-white/70">
          <Bell className="h-4 w-4" />
        </div>
      </div>
    </footer>
  );
}
