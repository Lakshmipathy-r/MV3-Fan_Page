# 🏎️ MV3 — Max Verstappen & Red Bull Racing Interactive Fan Experience

[![Next.js](https://img.shields.io/badge/Next.js-15+-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-v12-F024B6?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

An immersive, highly interactive, and cinematic web application celebrating the championship legacy of **Max Verstappen** and the engineering excellence of **Oracle Red Bull Racing**. 

Built with modern web technologies, the application delivers a premium, high-performance user experience with smooth scrolling, interactive animations, telemetry HUD overlays, audio synthesis, and custom canvas-based physics simulations.

---

## 🌟 Key Features

### 1. 🎬 Cinematic Scroll-Linked Canvas Sequence
*   **Progressive Preloading Engine:** Preloads **273 high-fidelity frames** in background batches to prevent thread choke and ensure immediate interactivity.
*   **Buttery-Smooth Scrubbing:** Utilizes Framer Motion's `useScroll` combined with `useSpring` physics to map page scroll directly to canvas frame updates.
*   **Dynamic Telemetry HUD:** Real-time information displays (Telemetry, Speed, Frame counter) that shift context in lockstep with the sequence's phase transitions:
    *   `Phase 01 // Grid Launch` (Oracle Red Bull Racing Engine Ignite)
    *   `Phase 02 // Pure Pace` (RB22 Aerodynamic Velocity & Apex Sync)
    *   `Phase 03 // Champion Reveal` (4x World Drivers' Champion)

### 2. 🎨 3D Interactive Livery Showcase
*   **Livery Deck Carousel:** Explore a collection of **12 legendary Red Bull Racing liveries** (including the *Lone Star Texas*, *Jerez Camo Bull*, *Miami Palm Deco*, *Monaco Superman*, and the *Honda Tribute*).
*   **3D Perspective Transforms:** Cards morph, scale, rotate, and fade dynamically based on horizontal scroll progression using custom mathematical ranges.

### 3. 💨 Interactive Zandvoort Orange Smoke Canvas
*   **HTML5 Canvas Smoke Simulation:** A custom-built 2D physics particle engine rendering the iconic orange flare smoke of the Dutch "Orange Army".
*   **Mouse-Reactive Deflection:** Smoke particles actively shift and displace around the user's mouse cursor, creating a highly engaging and tactile visual.

### 4. 📻 Live Team Radio Call Simulator
*   **Synthesized Web Audio:** Plays back iconic team radio messages between Max Verstappen and his race engineer Gianpiero Lambiase (GP) (e.g. *"Simply Lovely!"*, *"Send Regards"*).
*   **Custom Waveform Animations:** Includes visual feedback and radio sound effects simulating actual telemetry transmissions.

### 5. 🔊 Decibel Cheer Meter & Seismic Shaker
*   **Interactive Grandstand Cheer:** Users can click to cheer for Max, which instantly triggers a decibel meter increase.
*   **Physical Screen Shaking:** Reaching high decibel thresholds triggers camera-shake CSS animations and bursts of orange smoke particles across the screen.

### 6. 📊 Playground Track Stats & Timeline
*   **Detailed Track Analytics:** Deep dive into 7 legendary Grand Prix tracks dominated by Max (Zandvoort, Spa, Red Bull Ring, Suzuka, etc.) with lap records, track lengths, number of corners, and peak speeds.
*   **Milestone Career Timeline:** An interactive timeline charting Max's rise from his 2015 breakthrough to championship glory.

---

## 🛠️ Technology Stack

*   **Core:** [Next.js 16](https://nextjs.org/) (App Router), React 19, TypeScript
*   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (using CSS-first configuration and post-processing)
*   **Animation:** [Framer Motion v12](https://www.framer.com/motion/) (scroll tracking, springs, layout transitions, exit animations)
*   **Icons:** [Lucide React](https://lucide.dev/)
*   **Graphics & Particles:** HTML5 2D Canvas API (used for the custom smoke simulation and the 273-frame scroll sequence player)
*   **Fonts:** Geist & Geist Mono

---

## 📁 File Structure

```text
mv3/
├── app/
│   ├── layout.tsx         # Root layout with HTML headers and fonts
│   ├── page.tsx           # Entry page mounting Hero, Canvas and Fan Zone
│   └── globals.css        # Tailwind directives and custom animation styles
├── components/
│   ├── Hero.tsx           # Title landing section with championship badges
│   ├── ScrollSequence.tsx # Preloaded image sequence with HUD overlay
│   └── RaceDayExperience.tsx # Interactive fan dashboard (Liveries, Smoke, Radio, Stats)
├── public/
│   ├── audio/             # Team radio audio assets
│   ├── liveries/          # Car livery images
│   └── sequence/          # 273 sequential frames for the scroll animation
├── package.json           # Scripts and package dependencies
└── tsconfig.json          # TypeScript configurations
```

---

## 🚀 Getting Started

Follow these steps to run the project locally on your machine:

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
```

### 2. Install Dependencies
Make sure you have [Node.js](https://nodejs.org/) installed (v18.x or later recommended).
```bash
npm install
```

### 3. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to experience the site.

### 4. Build for Production
To build the application for deployment:
```bash
npm run build
npm run start
```

---

## 🚀 Deployment

The easiest way to deploy this project is via the [Vercel Platform](https://vercel.com/new).

1. Connect your GitHub repository to Vercel.
2. Ensure the framework preset is set to **Next.js**.
3. Click **Deploy**. Vercel will automatically build the assets and host your application on a global CDN.

---

## 🎙️ *"Simply Lovely!"*
Created with passion for Formula 1 racing, speed, and premium web animations.

*Feel free to star ⭐ this repository if you love it!*
