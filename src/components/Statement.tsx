import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

function DrawCircle({ progress, range }: { progress: MotionValue<number>, range: [number, number] }) {
  // Path length goes from 0 to 1 over the given scroll range
  const pathLength = useTransform(progress, range, [0, 1]);
  const opacity = useTransform(progress, [range[0], range[0] + 0.05], [0, 1]);

  return (
    <motion.svg
      className="absolute -inset-2 h-[calc(100%+16px)] w-[calc(100%+16px)] text-red-500"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{ opacity }}
    >
      <motion.path
        d="M50,5 C25,5 5,25 5,50 C5,75 25,95 50,95 C75,95 95,75 95,50 C95,25 75,5 50,5 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        style={{ pathLength }}
      />
    </motion.svg>
  );
}

function DrawStrike({ progress, range }: { progress: MotionValue<number>, range: [number, number] }) {
  const pathLength = useTransform(progress, range, [0, 1]);
  const opacity = useTransform(progress, [range[0], range[0] + 0.01], [0, 1]);

  return (
    <motion.svg
      className="absolute top-1/2 left-0 h-4 w-full -translate-y-1/2 text-red-500"
      viewBox="0 0 100 20"
      preserveAspectRatio="none"
      style={{ opacity }}
    >
      <motion.path
        d="M0,10 Q50,15 100,5"
        fill="none"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
        style={{ pathLength }}
      />
    </motion.svg>
  );
}

export default function Statement() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 40%", "end 80%"]
  });

  // Fade logic based on scroll segment
  // Part 1: "Generic software is fragile." (0 to 0.3)
  const part1Opacity = useTransform(scrollYProgress, [0, 0.1, 0.3, 0.4], [0, 1, 1, 0.3]);
  const part1Scale = useTransform(scrollYProgress, [0.3, 0.4], [1, 0.95]);

  // Part 2: "Edge environments are unforgiving." (0.3 to 0.6)
  const part2Opacity = useTransform(scrollYProgress, [0.3, 0.4, 0.6, 0.7], [0, 1, 1, 0.3]);
  const part2Scale = useTransform(scrollYProgress, [0.6, 0.7], [1, 0.95]);

  // Part 3: The final statement (0.6 to 1)
  const part3Opacity = useTransform(scrollYProgress, [0.6, 0.7, 1], [0, 1, 1]);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full bg-[#040810] text-white"
      style={{ height: "400vh" }}
    >
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_0%,#040810_120%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-56 bg-gradient-to-t from-[#040810] via-[#040810]/90 to-transparent" />
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgb(117, 113, 113) 1px, transparent 1px), linear-gradient(to bottom, rgb(117, 113, 113) 1px, transparent .1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div className="sticky top-0 z-10 flex h-screen w-full flex-col items-center justify-center px-6">
        <div className="flex max-w-5xl flex-col items-start gap-8 font-pixel text-4xl uppercase leading-[1.2] sm:text-5xl md:text-6xl lg:text-7xl">
          
          <motion.div style={{ opacity: part1Opacity, scale: part1Scale }} className="origin-left">
            <span className="text-white">Generic software </span>
            <span className="text-white/60">is </span>
            <span className="relative inline-block text-white/60">
              fragile.
              <DrawStrike progress={scrollYProgress} range={[0.15, 0.25]} />
            </span>
          </motion.div>

          <motion.div style={{ opacity: part2Opacity, scale: part2Scale }} className="origin-left">
            <span className="text-white">Edge environments </span>
            <span className="text-white/60">are </span>
            <span className="relative inline-block text-white/60">
              unforgiving.
              <DrawCircle progress={scrollYProgress} range={[0.45, 0.55]} />
            </span>
          </motion.div>

          <motion.div style={{ opacity: part3Opacity }} className="text-white">
            <span className="text-white/40">I build the intelligent layer where </span>
            bare-metal hardware meets resilient logic. <br />
            <span className="mt-4 inline-block text-[1.2em] font-bold text-white">Finally.</span>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
