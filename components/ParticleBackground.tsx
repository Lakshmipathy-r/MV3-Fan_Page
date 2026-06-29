"use client";

import { useEffect, useRef } from "react";

interface Spark {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  color: string;
  size: number;
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let sparks: Spark[] = [];
    const maxSparks = 60;

    // Red Bull Yellow, F1 Red, White, Carbon Orange
    const colors = ["#e10600", "#ffffff", "#e10600", "#fcd500", "#ff6a00", "#ffffff"];

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const createSpark = (initAtBottom = false): Spark => {
      const rect = canvas.getBoundingClientRect();
      const x = initAtBottom 
        ? Math.random() * rect.width + rect.width * 0.2 // Start from bottom / right side
        : Math.random() * rect.width;
      const y = initAtBottom 
        ? rect.height + 20 
        : Math.random() * rect.height;

      return {
        x,
        y,
        length: Math.random() * 15 + 5, // Trail length
        speed: Math.random() * 1.5 + 0.5, // Wind/drift speed
        angle: Math.PI * 1.15 + (Math.random() * 0.15 - 0.075), // Diagonal drift (pointing top-left, around 205 degrees)
        opacity: Math.random() * 0.5 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 1.2 + 0.6, // Width of spark line
      };
    };

    // Initialize sparks
    for (let i = 0; i < maxSparks; i++) {
      sparks.push(createSpark(false));
    }

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      sparks.forEach((spark, index) => {
        // Calculate velocity vectors based on angle
        let vx = Math.cos(spark.angle) * spark.speed;
        let vy = Math.sin(spark.angle) * spark.speed;

        // Interaction with mouse (repulsive / wind force)
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - spark.x;
          const dy = mouseRef.current.y - spark.y;
          const distSq = dx * dx + dy * dy;
          const maxDist = 120;
          
          if (distSq < maxDist * maxDist) {
            const dist = Math.sqrt(distSq);
            // Push particles in the direction they are already traveling, but speed them up when near the cursor
            const force = (maxDist - dist) / maxDist;
            vx += Math.cos(spark.angle) * force * 2;
            vy += Math.sin(spark.angle) * force * 2;
            
            // Faint deflection away from mouse
            const forceAngle = Math.atan2(spark.y - mouseRef.current.y, spark.x - mouseRef.current.x);
            vx += Math.cos(forceAngle) * force * 0.5;
            vy += Math.sin(forceAngle) * force * 0.5;
          }
        }

        // Update position
        spark.x += vx;
        spark.y += vy;

        // Fade in/out slightly based on position
        if (spark.x < -20 || spark.y < -20 || spark.x > rect.width + 20 || spark.y > rect.height + 20) {
          // Recycle spark when it goes off screen
          sparks[index] = createSpark(true);
        }

        // Drawing spark with trail
        ctx.beginPath();
        // Tail position
        const tailX = spark.x - Math.cos(spark.angle) * spark.length;
        const tailY = spark.y - Math.sin(spark.angle) * spark.length;

        // Create gradient for trail
        const gradient = ctx.createLinearGradient(spark.x, spark.y, tailX, tailY);
        gradient.addColorStop(0, spark.color);
        gradient.addColorStop(1, "transparent");

        ctx.strokeStyle = gradient;
        ctx.lineWidth = spark.size;
        ctx.lineCap = "round";
        ctx.moveTo(spark.x, spark.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        // Draw a tiny glowing dot head
        ctx.beginPath();
        ctx.arc(spark.x, spark.y, spark.size / 2, 0, Math.PI * 2);
        ctx.fillStyle = spark.color;
        ctx.globalAlpha = spark.opacity;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener("mousemove", handleMouseMove);
      parent.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
      if (parent) {
        parent.removeEventListener("mousemove", handleMouseMove);
        parent.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
