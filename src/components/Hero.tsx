import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const tickerItems = [
  'EMBEDDED SYSTEMS',
  'EDGE COMPUTING',
  'ROBOTICS & AUTOMATION',
  'TINYML',
  'IOT PROTOCOLS',
  'MICROELECTRONICS',
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // --- Intro Sequence Transforms ---
  // Container is h-[500vh]. Sticky is 100vh. Scrollable before release is 400vh.
  // 400/500 = 0.80. So sticky releases and rolls up exactly at 0.80.
  // We compress the story sequence into the 0.0 - 0.6 range, leaving a "stop" (0.6 - 0.8) for UX pause!

  // T1: Initial text holds, then rolls up and away
  const t1Rot = useTransform(scrollYProgress, [0, 0.08, 0.14], [0, 0, 90]);
  const t1Y = useTransform(scrollYProgress, [0, 0.08, 0.14], ["0%", "0%", "-50%"]);
  const t1O = useTransform(scrollYProgress, [0, 0.08, 0.14], [1, 1, 0]);
  const t1B = useTransform(scrollYProgress, [0, 0.08, 0.14], ["blur(0px)", "blur(0px)", "blur(10px)"]);

  // T2: Rolls in from bottom, holds, rolls up
  const t2Rot = useTransform(scrollYProgress, [0.10, 0.16, 0.22, 0.29], [-90, 0, 0, 90]);
  const t2Y = useTransform(scrollYProgress, [0.10, 0.16, 0.22, 0.29], ["50%", "0%", "0%", "-50%"]);
  const t2O = useTransform(scrollYProgress, [0.10, 0.16, 0.22, 0.29], [0, 1, 1, 0]);
  const t2B = useTransform(scrollYProgress, [0.10, 0.16, 0.22, 0.29], ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]);

  // T3: Rolls in from bottom, holds, rolls up
  const t3Rot = useTransform(scrollYProgress, [0.25, 0.30, 0.37, 0.43], [-90, 0, 0, 90]);
  const t3Y = useTransform(scrollYProgress, [0.25, 0.30, 0.37, 0.43], ["50%", "0%", "0%", "-50%"]);
  const t3O = useTransform(scrollYProgress, [0.25, 0.30, 0.37, 0.43], [0, 1, 1, 0]);
  const t3B = useTransform(scrollYProgress, [0.25, 0.30, 0.37, 0.43], ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]);

  // T4: Rolls in from bottom, holds, then rolls up to reveal the hero
  const t4Rot = useTransform(scrollYProgress, [0.39, 0.45, 0.52, 0.60], [-90, 0, 0, 90]);
  const t4Y = useTransform(scrollYProgress, [0.39, 0.45, 0.52, 0.60], ["50%", "0%", "0%", "-50%"]);
  const t4O = useTransform(scrollYProgress, [0.39, 0.45, 0.52, 0.60], [0, 1, 1, 0]);
  const t4B = useTransform(scrollYProgress, [0.39, 0.45, 0.52, 0.60], ["blur(10px)", "blur(0px)", "blur(0px)", "blur(10px)"]);

  const overlayOpacity = useTransform(scrollYProgress, [0.55, 0.60], [1, 0]);
  const overlayDisplay = useTransform(scrollYProgress, (p) => (p > 0.61 ? "none" : "flex"));

  // --- Hero Landing Sequence ---
  // Background starts large and scales down slowly throughout the whole text sequence.
  // Then scales back up as parallax happens after 0.80.
  const backgroundScale = useTransform(scrollYProgress, [0, 0.60, 1], [2, 1, 1.3]);
  const opacityFade = useTransform(scrollYProgress, [0.52, 0.60, 0.80, 1], [0, 1, 1, 0.3]);
  const heroContentY = useTransform(scrollYProgress, [0.52, 0.60], [50, 0]);
  const yParallax = useTransform(scrollYProgress, [0.80, 1], ["0%", "30%"]);

  const radialOverlay = useTransform(
    scrollYProgress,
    [0, 1],
    [
      "radial-gradient(circle at center, transparent 0%, black 0%)",
      "radial-gradient(circle at center, transparent 0%, black 130%)"
    ]
  );

  return (
    <section ref={containerRef} id="intro" className="relative h-[500vh] w-full bg-[black]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* =========================================
            UNDERLYING HERO CONTENT (Revealed via animation)
            ========================================= */}
        <div className="absolute inset-0 z-0 flex flex-col items-center justify-center overflow-hidden bg-[black]">
          {/* Background image */}
          <motion.div
            className="absolute inset-0 z-0"
            style={{ scale: backgroundScale, y: yParallax }}
          >
            <img
              src="/hero-bg.png"
              alt=""
              aria-hidden="true"
              className="h-full w-full object-cover object-[center_30%] opacity-60"
            />
          </motion.div>

          <motion.div
            className="absolute inset-0 z-0"
            style={{ backgroundImage: radialOverlay }}
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-46 bg-gradient-to-t from-[black] via-[black]/70 to-transparent" />

          <div
            className="pointer-events-none absolute inset-0 z-0 opacity-[0.06]"
            style={{
              backgroundImage: 'linear-gradient(to right, rgb(117, 113, 113) 1px, transparent 1px), linear-gradient(to bottom, rgb(117, 113, 113) 1px, transparent .1px)',
              backgroundSize: '40px 40px',
            }}
          />

          <motion.div
            className="relative z-10 mt-8 flex w-full max-w-5xl flex-col items-center px-6 text-center sm:mt-94 lg:mt-96"
            style={{ opacity: opacityFade, y: heroContentY }}
          >
            <div className="flex flex-col items-center">
              <div className="mb-6 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md">
                <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.3em] text-white/70">
                  Hamburg · TUHH
                </p>
              </div>

              <h1 className="section-heading-glow font-pixel text-[3rem] uppercase leading-[0.85] tracking-tight text-white sm:text-[5rem] md:text-[7.5rem] lg:text-[9rem]">
                Embedded
                <br />
                <span className="text-white/40">Edge AI</span>
              </h1>

              <p className="mt-8 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base md:text-lg">
                Engineering the intelligent layer between hardware, edge logic, and software.
                Building resilient systems connecting the physical and digital domains.
              </p>

              <div className="mt-10 flex flex-col items-center gap-5 sm:flex-row">
                <a href="#work" className="group relative flex items-center justify-center overflow-hidden rounded-full bg-white px-8 py-4 text-xs font-bold uppercase tracking-[0.15em] text-black transition-transform hover:scale-105">
                  <span className="relative z-10">Explore Work</span>
                  <div className="absolute inset-0 z-0 bg-gradient-to-r from-gray-200 to-white opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
                <a href="#about" className="group flex items-center justify-center rounded-full border border-white/20 bg-black/20 px-8 py-4 text-xs font-bold uppercase tracking-[0.15em] text-white backdrop-blur-sm transition-all hover:border-white/50 hover:bg-white/10">
                  About Me
                </a>
              </div>
            </div>
          </motion.div>

          {/* Bottom Sleek Ticker */}
          <motion.div
            style={{ opacity: opacityFade }}
            className="absolute bottom-6 z-20 w-full border-t border-white/5 bg-[black]/50 py-5 backdrop-blur-md sm:bottom-8 sm:py-6"
          >
            <div className="flex w-max font-mono text-[0.7rem] font-bold uppercase tracking-[0.25em] text-white/55 sm:text-[0.9rem]">
              <motion.div animate={{ x: [0, '-50%'] }} transition={{ repeat: Infinity, ease: 'linear', duration: 25 }} className="flex gap-16 whitespace-nowrap">
                {[...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems].map((item, index) => (
                  <span key={`${item}-${index}`} className="inline-flex items-center gap-16">
                    <span>{item}</span>
                    <span className="h-1 w-1 rounded-full bg-white/20" />
                  </span>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* =========================================
            STORY OVERLAY
            ========================================= */}
        <motion.div
          style={{ opacity: overlayOpacity, display: overlayDisplay }}
          className="absolute inset-0 z-50 flex-col items-center justify-center bg-transparent [perspective:1000px]"
        >
          <div className="relative z-10 flex h-full w-full items-center justify-center">
            {/* Slide 1 */}
            <motion.h1
              style={{ opacity: t1O, rotateX: t1Rot, y: t1Y, filter: t1B }}
              className="absolute font-pixel text-[2.5rem] uppercase leading-none tracking-tight text-white sm:text-[5rem] md:text-[6rem] lg:text-[7rem] section-heading-glow text-center transform-gpu"
            >
              HI, I AM<br /><span className="text-white/40">RISHI</span>
            </motion.h1>

            {/* Slide 2 */}
            <motion.h1
              style={{ opacity: t2O, rotateX: t2Rot, y: t2Y, filter: t2B }}
              className="absolute font-pixel text-[2.5rem] uppercase leading-none tracking-tight text-white sm:text-[5rem] md:text-[6rem] lg:text-[7rem] section-heading-glow text-center transform-gpu"
            >
              AND I<br /><span className="text-white/40">ENGINEER</span>
            </motion.h1>

            {/* Slide 3 */}
            <motion.h1
              style={{ opacity: t3O, rotateX: t3Rot, y: t3Y, filter: t3B }}
              className="absolute font-pixel text-[2.5rem] uppercase leading-none tracking-tight text-white sm:text-[5rem] md:text-[6rem] lg:text-[7rem] section-heading-glow text-center transform-gpu"
            >
              I<br /><span className="text-white/40">AUTOMATE</span>
            </motion.h1>

            {/* Slide 4 (End of sequence) */}
            <motion.h1
              style={{ opacity: t4O, rotateX: t4Rot, y: t4Y, filter: t4B }}
              className="absolute font-pixel text-[2.5rem] uppercase leading-none tracking-tight text-white sm:text-[5rem] md:text-[6rem] lg:text-[7rem] section-heading-glow text-center transform-gpu"
            >
              AND I<br /><span className="text-white/40">BUILD</span>
            </motion.h1>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
