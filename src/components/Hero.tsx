import { useRef, useState } from 'react';
import { motion, MotionConfig, useScroll, useTransform, useMotionValueEvent, type MotionValue } from 'framer-motion';

function useScrollNumber(source: MotionValue<number>) {
  const [value, setValue] = useState(source.get());
  useMotionValueEvent(source, 'change', (latest) => setValue(latest));
  return value;
}

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
  const t1O = useTransform(scrollYProgress, [0, 0.04, 0.10, 0.14], [0, 1, 1, 0]);
  const t1Y = useTransform(scrollYProgress, [0, 0.04, 0.10, 0.14], [16, 0, 0, -16]);

  const t2O = useTransform(scrollYProgress, [0.14, 0.18, 0.25, 0.29], [0, 1, 1, 0]);
  const t2Y = useTransform(scrollYProgress, [0.14, 0.18, 0.25, 0.29], [16, 0, 0, -16]);

  const t3O = useTransform(scrollYProgress, [0.29, 0.33, 0.39, 0.43], [0, 1, 1, 0]);
  const t3Y = useTransform(scrollYProgress, [0.29, 0.33, 0.39, 0.43], [16, 0, 0, -16]);

  const t4O = useTransform(scrollYProgress, [0.43, 0.47, 0.56, 0.60], [0, 1, 1, 0]);
  const t4Y = useTransform(scrollYProgress, [0.43, 0.47, 0.56, 0.60], [16, 0, 0, -16]);

  const overlayOpacityMv = useTransform(scrollYProgress, [0.55, 0.60], [1, 0]);
  const overlayDisplay = useTransform(scrollYProgress, (p) => (p > 0.61 ? "none" : "flex"));

  // --- Hero Landing Sequence ---
  const backgroundScale = useTransform(scrollYProgress, [0, 0.60, 1], [2, 1, 1.3]);
  const opacityFadeMv = useTransform(scrollYProgress, [0.52, 0.60, 0.80, 1], [0, 1, 1, 0.3]);
  const heroContentY = useTransform(scrollYProgress, [0.52, 0.60], [50, 0]);
  const yParallax = useTransform(scrollYProgress, [0.80, 1], ["0%", "30%"]);

  // Plain-number opacities read out to React state
  const overlayOpacity = useScrollNumber(overlayOpacityMv);
  const opacityFade = useScrollNumber(opacityFadeMv);
  const t1Opacity = useScrollNumber(t1O);
  const t2Opacity = useScrollNumber(t2O);
  const t3Opacity = useScrollNumber(t3O);
  const t4Opacity = useScrollNumber(t4O);

  // Animated scroll indicator fade out when user starts scrubbing
  const scrollIndicatorOpacityMv = useTransform(scrollYProgress, [0, 0.03], [1, 0]);
  const scrollIndicatorOpacity = useScrollNumber(scrollIndicatorOpacityMv);

  const radialOverlay = useTransform(
    scrollYProgress,
    [
      0, 0.08,
      0.16, 0.22,
      0.30, 0.37,
      0.45, 0.52,
      0.60, 1
    ],
    [
      "radial-gradient(circle at center, transparent 0%, black 0%)",
      "radial-gradient(circle at center, transparent 0%, black 0%)",
      "radial-gradient(circle at center, transparent 0%, black 30%)",
      "radial-gradient(circle at center, transparent 0%, black 30%)",
      "radial-gradient(circle at center, transparent 0%, black 60%)",
      "radial-gradient(circle at center, transparent 0%, black 60%)",
      "radial-gradient(circle at center, transparent 0%, black 90%)",
      "radial-gradient(circle at center, transparent 0%, black 90%)",
      "radial-gradient(circle at center, transparent 0%, black 130%)",
      "radial-gradient(circle at center, transparent 0%, black 130%)"
    ]
  );

  // Story beats data
  const beats = [
    {
      num: '01',
      tag: 'IDENTITY',
      main: 'HI, I AM RISHI',
      sub: 'FULL-STACK EMBEDDED & EDGE AI ENGINEER',
      opacity: t1Opacity,
      y: t1Y,
    },
    {
      num: '02',
      tag: 'THE MISSION',
      main: 'BRIDGING HARDWARE & INTELLIGENCE',
      sub: 'TRANSFORMING RAW SENSOR DATA INTO REAL-TIME ACTION',
      opacity: t2Opacity,
      y: t2Y,
    },
    {
      num: '03',
      tag: 'THE CRAFT',
      main: 'BUILDING RESILIENT EDGE SYSTEMS',
      sub: 'TINYML, EMBEDDED COMPUTING & AUTOMATION AT SCALE',
      opacity: t3Opacity,
      y: t3Y,
    },
    {
      num: '04',
      tag: 'THE WORKSPACE',
      main: 'WELCOME TO MY PORTFOLIO',
      sub: 'EXPLORE RECENT PROJECTS, TECHNICAL LOGS & EXPERTISE',
      opacity: t4Opacity,
      y: t4Y,
    },
  ];

  return (
    <MotionConfig reducedMotion="never">
      <section ref={containerRef} id="intro" className="relative h-[500vh] w-full bg-black">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Animated Scroll Prompt (Visible on initial landing) */}
          <div
            style={{ opacity: scrollIndicatorOpacity }}
            className="pointer-events-none absolute bottom-10 left-1/2 z-[60] flex -translate-x-1/2 flex-col items-center gap-2 transition-opacity duration-300"
          >
            <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/30 p-1.5 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.15)]">
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                className="h-1.5 w-1.5 rounded-full bg-[#60A5FA] shadow-[0_0_8px_rgba(96,165,250,0.9)]"
              />
            </div>
            <span className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.25em] text-white/70">
              Scroll to Unfold ↓
            </span>
          </div>

          {/* =========================================
              UNDERLYING HERO CONTENT (Revealed via animation)
              ========================================= */}
          <div className="absolute inset-0 z-0 flex flex-col items-center justify-end pb-32 sm:pb-40 lg:pb-48 overflow-hidden bg-black">
            {/* Background image */}
            <motion.div
              initial={false}
              className="absolute inset-0 z-0"
              style={{ scale: backgroundScale, y: yParallax }}
            >
              <img
                src="/hero-bg.png"
                alt=""
                aria-hidden="true"
                className="h-full w-full object-cover object-[center_20%] sm:object-[center_30%] opacity-60"
              />
            </motion.div>

            <motion.div
              className="absolute inset-0 z-0"
              style={{ backgroundImage: radialOverlay }}
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-64 bg-gradient-to-t from-[#040810] via-[#040810]/70 to-transparent" />

            <div
              className="pointer-events-none absolute inset-0 z-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  'linear-gradient(to right, rgb(117, 113, 113) 1px, transparent 1px), linear-gradient(to bottom, rgb(117, 113, 113) 1px, transparent .1px)',
                backgroundSize: '40px 40px',
              }}
            />

            <motion.div
              initial={false}
              className="relative z-10 flex w-full max-w-5xl flex-col items-center px-6 text-center"
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
                  <a
                    href="#work"
                    className="group relative flex items-center justify-center overflow-hidden rounded-full bg-white px-8 py-4 text-xs font-bold uppercase tracking-[0.15em] text-black transition-transform hover:scale-105"
                  >
                    <span className="relative z-10">Explore Work</span>
                    <div className="absolute inset-0 z-0 bg-gradient-to-r from-gray-200 to-white opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                  <a
                    href="#about"
                    className="group flex items-center justify-center rounded-full border border-white/20 bg-black/20 px-8 py-4 text-xs font-bold uppercase tracking-[0.15em] text-white backdrop-blur-sm transition-all hover:border-white/50 hover:bg-white/10"
                  >
                    About Me
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Bottom Sleek Ticker */}
            <div
              style={{ opacity: opacityFade }}
              className="absolute bottom-6 z-20 w-full border-t border-white/5 bg-black/50 py-5 backdrop-blur-md sm:bottom-8 sm:py-6 pointer-events-none select-none"
            >
              <div className="flex w-max font-mono text-[0.7rem] font-bold uppercase tracking-[0.25em] text-white/55 sm:text-[0.9rem]">
                <div
                  className="flex gap-16 whitespace-nowrap"
                  style={{ animation: 'ticker-scroll 25s linear infinite' }}
                >
                  {[...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems].map(
                    (item, index) => (
                      <span key={`${item}-${index}`} className="inline-flex items-center gap-16">
                        <span>{item}</span>
                        <span className="h-1 w-1 rounded-full bg-white/20" />
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* =========================================
              STORY OVERLAY
              ========================================= */}
          <motion.div
            initial={false}
            style={{ opacity: overlayOpacity, display: overlayDisplay }}
            className="absolute inset-0 z-50 flex-col items-center justify-center bg-transparent"
          >
            <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6">
              <div className="relative flex h-64 w-full max-w-3xl items-center justify-center sm:h-72 lg:h-80">
                {beats.map((beat) => (
                  <motion.div
                    key={beat.num}
                    aria-hidden="true"
                    initial={false}
                    style={{ opacity: beat.opacity, y: beat.y }}
                    className="pointer-events-none absolute flex select-none flex-col items-center gap-4 text-center px-4"
                  >
                    {/* Chapter Tag Badge */}
                    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md">
                      <span className="font-mono text-[0.65rem] font-bold text-[#60A5FA]">
                        {beat.num}
                      </span>
                      <span className="text-white/20">/</span>
                      <span className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/80">
                        {beat.tag}
                      </span>
                    </div>

                    {/* Main Headline */}
                    <h2 className="section-heading-glow max-w-2xl font-pixel text-[2.2rem] uppercase leading-[1.05] tracking-tight text-white sm:text-[3.5rem] lg:text-[4.5rem]">
                      {beat.main}
                    </h2>

                    {/* Subtitle Continuation Line */}
                    <p className="max-w-xl font-mono text-xs uppercase tracking-[0.2em] text-white/60 sm:text-sm">
                      {beat.sub}
                    </p>

                    {/* Step Dots Indicator */}
                    <div className="mt-4 flex items-center gap-2">
                      {beats.map((b) => (
                        <span
                          key={b.num}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            b.num === beat.num
                              ? 'w-6 bg-[#60A5FA] shadow-[0_0_8px_rgba(96,165,250,0.8)]'
                              : 'w-1.5 bg-white/20'
                          }`}
                        />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
