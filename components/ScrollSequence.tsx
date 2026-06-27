"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent, useSpring } from "framer-motion";

const TOTAL_FRAMES = 273;

export default function ScrollSequence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameCounterRef = useRef<HTMLSpanElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isPreloading, setIsPreloading] = useState(true);
  const [phase, setPhase] = useState<"phase1" | "phase2" | "phase3">("phase1");

  // Keep track of which indices are loaded for fast lookup
  const loadedIndicesRef = useRef<boolean[]>(new Array(TOTAL_FRAMES + 1).fill(false));
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameIndexRef = useRef<number>(1);

  // Get scroll progress from Framer Motion for the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth scroll progress using a spring animation for buttery scrubs
  const smoothScrollProgress = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 120,
    mass: 0.5,
    restDelta: 0.001
  });

  // Preload images progressively
  useEffect(() => {
    const preloadImages = async () => {
      const loadedImages: HTMLImageElement[] = [];
      let count = 0;

      // Helper to load a single image
      const loadImage = (index: number): Promise<HTMLImageElement> => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          const paddedIndex = String(index).padStart(3, "0");
          img.src = `/sequence/ezgif-frame-${paddedIndex}.png`;
          
          img.onload = () => {
            loadedIndicesRef.current[index] = true;
            resolve(img);
          };
          img.onerror = () => {
            console.error(`Failed to load frame ${index}`);
            reject(new Error(`Frame ${index} load error`));
          };
        });
      };

      // Phase 1: Eagerly load the first 15 frames so the user sees the page instantly
      const initialBatch = [];
      for (let i = 1; i <= 15; i++) {
        initialBatch.push(
          loadImage(i)
            .then((img) => {
              loadedImages[i] = img;
              imagesRef.current[i] = img;
              count++;
              setLoadedCount(count);
            })
            .catch(() => {})
        );
      }
      await Promise.all(initialBatch);
      
      // Let the UI render the first frames
      setIsPreloading(false);
      setImages([...imagesRef.current]);

      // Phase 2: Load the rest of the frames progressively in small chunks to avoid choking the thread
      const chunkSize = 20;
      for (let i = 16; i <= TOTAL_FRAMES; i += chunkSize) {
        const chunk = [];
        const end = Math.min(i + chunkSize, TOTAL_FRAMES + 1);
        
        for (let j = i; j < end; j++) {
          chunk.push(
            loadImage(j)
              .then((img) => {
                loadedImages[j] = img;
                imagesRef.current[j] = img;
                count++;
                setLoadedCount(count);
              })
              .catch(() => {})
          );
        }
        await Promise.all(chunk);
        setImages([...imagesRef.current]);
      }
    };

    preloadImages();
  }, []);

  // Handle canvas drawing on frame index change or resize
  const drawFrame = (frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Find the closest loaded frame to avoid drawing undefined/blanks
    let targetIndex = frameIndex;
    if (!loadedIndicesRef.current[targetIndex]) {
      // Find nearest loaded frame index
      let left = targetIndex - 1;
      let right = targetIndex + 1;
      while (left >= 1 || right <= TOTAL_FRAMES) {
        if (left >= 1 && loadedIndicesRef.current[left]) {
          targetIndex = left;
          break;
        }
        if (right <= TOTAL_FRAMES && loadedIndicesRef.current[right]) {
          targetIndex = right;
          break;
        }
        left--;
        right++;
      }
    }

    const img = imagesRef.current[targetIndex];
    if (!img) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the image full size (filling the entire canvas viewport)
    const dpr = window.devicePixelRatio || 1;
    ctx.drawImage(img, 0, 0, canvas.width / dpr, canvas.height / dpr);
  };

  // Listen to scroll progression to trigger drawing of the correct frame
  useMotionValueEvent(smoothScrollProgress, "change", (latest) => {
    // Map scroll progress (0 to 1) to frame index (1 to TOTAL_FRAMES)
    const frameIndex = Math.min(
      TOTAL_FRAMES,
      Math.max(1, Math.floor(latest * TOTAL_FRAMES) + 1)
    );

    if (frameIndex !== frameIndexRef.current) {
      frameIndexRef.current = frameIndex;

      // Phase transitions threshold updates
      let nextPhase: "phase1" | "phase2" | "phase3" = "phase1";
      if (frameIndex >= 150) {
        nextPhase = "phase3";
      } else if (frameIndex >= 50) {
        nextPhase = "phase2";
      }

      if (nextPhase !== phase) {
        setPhase(nextPhase);
      }

      // Directly update frame counter DOM node to prevent full component React re-renders
      if (frameCounterRef.current) {
        frameCounterRef.current.textContent = `${String(frameIndex).padStart(3, "0")} / ${TOTAL_FRAMES}`;
      }

      requestAnimationFrame(() => drawFrame(frameIndex));
    }
  });

  // Resize handler to fit canvas to viewport with High DPI resolution support
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(dpr, dpr);
      }

      drawFrame(frameIndexRef.current);
    };

    window.addEventListener("resize", handleResize);
    // Initial resize setup
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [images]);

  // Redraw when images array updates (e.g. background chunks finish preloading)
  useEffect(() => {
    drawFrame(frameIndexRef.current);
  }, [images]);

  return (
    <div ref={containerRef} className="relative h-[450vh] bg-[#050505] w-full">
      {/* Sticky Canvas Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Loading Overlay */}
        {isPreloading && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] text-white">
            <div className="flex flex-col items-center gap-4">
              <span className="text-3xl font-extrabold tracking-widest text-glow-red uppercase animate-pulse">
                Loading Sequence
              </span>
              <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-f1-red transition-all duration-300 ease-out" 
                  style={{ width: `${Math.round((loadedCount / TOTAL_FRAMES) * 100)}%` }}
                />
              </div>
              <span className="text-xs font-mono text-white/40 tracking-wider">
                {loadedCount} / {TOTAL_FRAMES} Frames Preloaded ({Math.round((loadedCount / TOTAL_FRAMES) * 100)}%)
              </span>
            </div>
          </div>
        )}

        <canvas
          ref={canvasRef}
          className="block w-full h-full object-cover transition-opacity duration-300"
          style={{ opacity: isPreloading ? 0 : 1 }}
        />

        {/* Scroll Progress Indicator & Cinematic Overlay UI */}
        {!isPreloading && (
          <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 md:p-12 z-20">
            {/* Top Bar */}
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold tracking-[0.3em] text-white/30 uppercase">Telemetry</span>
                <span className="text-xs font-mono text-f1-red tracking-wider mt-0.5">SPEED // ENGAGED</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-bold tracking-[0.3em] text-white/30 uppercase">Frame</span>
                <span ref={frameCounterRef} className="text-xs font-mono text-white/60 mt-0.5">
                  001 / {TOTAL_FRAMES}
                </span>
              </div>
            </div>

            {/* Bottom HUD info overlay - synced with key frames of the sequence */}
            <div className="flex flex-col max-w-sm md:max-w-md self-start bg-black/40 backdrop-blur-md border border-white/5 p-5 rounded-xl transition-all duration-500">
              {phase === "phase1" && (
                <div className="animate-fade-in">
                  <span className="text-xs font-bold text-f1-red uppercase tracking-widest text-glow-red">Phase 01 // Grid Launch</span>
                  <h3 className="text-lg font-bold text-white/90 mt-1 uppercase">Oracle Red Bull Racing</h3>
                  <p className="text-xs text-white/50 leading-relaxed mt-2">
                    Igniting the power unit. The journey begins with the iconic signature of championship excellence.
                  </p>
                </div>
              )}
              {phase === "phase2" && (
                <div className="animate-fade-in">
                  <span className="text-xs font-bold text-f1-red uppercase tracking-widest text-glow-red">Phase 02 // Pure Pace</span>
                  <h3 className="text-lg font-bold text-white/90 mt-1 uppercase">Apex Domination</h3>
                  <p className="text-xs text-white/50 leading-relaxed mt-2">
                    Synching with the RB22 at racing velocity. Pushing aerodynamics, mechanical grip, and strategy to the absolute limit.
                  </p>
                </div>
              )}
              {phase === "phase3" && (
                <div className="animate-fade-in">
                  <span className="text-xs font-bold text-f1-red uppercase tracking-widest text-glow-red">Phase 03 // Champion Reveal</span>
                  <h3 className="text-lg font-bold text-white/90 mt-1 uppercase">Max Verstappen</h3>
                  <p className="text-xs text-white/50 leading-relaxed mt-2">
                    Four-time World Drivers' Champion. The record breaker. The standard bearer.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
