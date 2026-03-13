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

  // Scale the background from 1x to 1.3x as we scroll
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const opacityFade = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={containerRef}
      id="intro"
      aria-label="Hero section"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#040810]"
    >
      {/* Background image — full bleed without blur */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ scale: backgroundScale, y: yParallax, opacity: opacityFade }}
      >
        <img
          src="/hero-bg.png"
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-[center_30%] opacity-50"
        />
      </motion.div>

      {/* Cinematic Radial Vignette & Bottom Blend Gradient to Work section */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_0%,#040810_120%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-56 bg-gradient-to-t from-[#040810] via-[#040810]/90 to-transparent" />

      {/* Subtle Grid pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgb(117, 113, 113) 1px, transparent 1px), linear-gradient(to bottom, rgb(117, 113, 113) 1px, transparent .1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Main Content - Centered & Striking */}
      <div className="relative z-10 mt-8 flex w-full max-w-5xl flex-col items-center px-6 text-center sm:mt-94 lg:mt-96">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="flex flex-col items-center"
        >
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur-md"
          >
            <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.3em] text-white/70">
              Hamburg · TUHH
            </p>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="section-heading-glow font-pixel text-[3rem] uppercase leading-[0.85] tracking-tight text-white sm:text-[5rem] md:text-[7.5rem] lg:text-[9rem]"
          >
            Embedded
            <br />
            <span className="text-white/40">Edge AI</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-8 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base md:text-lg"
          >
            Engineering the intelligent layer between hardware, edge logic, and software. 
            Building resilient systems connecting the physical and digital domains.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="mt-10 flex flex-col items-center gap-5 sm:flex-row"
          >
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
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Sleek Ticker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute bottom-6 z-20 w-full border-t border-white/5 bg-[#040810]/50 py-5 backdrop-blur-md sm:bottom-8 sm:py-6"
      >
        <div className="flex w-max font-mono text-[0.7rem] font-bold uppercase tracking-[0.25em] text-white/55 sm:text-[0.9rem]">
          <motion.div 
            animate={{ x: [0, '-50%'] }}
            transition={{ repeat: Infinity, ease: 'linear', duration: 25 }}
            className="flex gap-16 whitespace-nowrap"
          >
            {[...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems].map((item, index) => (
              <span key={`${item}-${index}`} className="inline-flex items-center gap-16">
                <span>{item}</span>
                <span className="h-1 w-1 rounded-full bg-white/20" />
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}