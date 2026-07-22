import { useRef, type ReactNode } from 'react';
import {
  motion,
  MotionConfig,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from 'framer-motion';

/* Deliberate color story: the "problem" beats carry a restrained warning
   tint; the resolution lands in the site's cool blue→purple accent.
   The manifesto is the thesis beat between Hero and Work. */
const WARNING = '#f87171';

/* ----- a single centered beat that cross-fades in place ----- */
function Beat({
  opacity,
  y,
  scale,
  number,
  children,
}: {
  opacity: MotionValue<number>;
  y: MotionValue<number>;
  scale: MotionValue<number>;
  number: string;
  children: ReactNode;
}) {
  return (
    <motion.div
      initial={false}
      style={{ opacity, y, scale }}
      className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -z-10 select-none font-pixel text-[7rem] leading-none text-white/[0.035] sm:text-[10rem] lg:text-[13rem]"
      >
        {number}
      </span>
      {children}
    </motion.div>
  );
}

/* ----- an emphasis line (strike / underline) that draws with scroll ----- */
function DrawLine({
  scaleX,
  color,
  className,
}: {
  scaleX: MotionValue<number>;
  color: string;
  className: string;
}) {
  return (
    <motion.span
      aria-hidden="true"
      initial={false}
      style={{ scaleX, transformOrigin: 'left center', background: color }}
      className={`pointer-events-none absolute block rounded-full ${className}`}
    />
  );
}

export default function Statement() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  /* Beat windows over scroll progress [enter → hold → exit]. */
  const b1 = {
    opacity: useTransform(scrollYProgress, [0, 0.05, 0.26, 0.34], [0, 1, 1, 0]),
    y: useTransform(scrollYProgress, [0, 0.05, 0.26, 0.34], [40, 0, 0, -70]),
    scale: useTransform(scrollYProgress, [0, 0.05, 0.26, 0.34], [0.94, 1, 1, 0.97]),
  };
  const b2 = {
    opacity: useTransform(scrollYProgress, [0.3, 0.4, 0.58, 0.66], [0, 1, 1, 0]),
    y: useTransform(scrollYProgress, [0.3, 0.4, 0.58, 0.66], [70, 0, 0, -70]),
    scale: useTransform(scrollYProgress, [0.3, 0.4, 0.58, 0.66], [0.94, 1, 1, 0.97]),
  };
  const b3 = {
    opacity: useTransform(scrollYProgress, [0.64, 0.74, 1], [0, 1, 1]),
    y: useTransform(scrollYProgress, [0.64, 0.74, 1], [70, 0, 0]),
    scale: useTransform(scrollYProgress, [0.64, 0.74, 1], [0.94, 1, 1]),
  };

  /* Emphasis draws, timed just after each beat settles. */
  const strike1 = useTransform(scrollYProgress, [0.09, 0.18], [0, 1]);
  const underline2 = useTransform(scrollYProgress, [0.43, 0.52], [0, 1]);
  const underline3 = useTransform(scrollYProgress, [0.8, 0.9], [0, 1]);
  const finallyOpacity = useTransform(scrollYProgress, [0.86, 0.94], [0, 1]);
  const finallyY = useTransform(scrollYProgress, [0.86, 0.94], [16, 0]);

  /* Segmented progress across the three beats. */
  const seg1 = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const seg2 = useTransform(scrollYProgress, [0.3, 0.63], [0, 1]);
  const seg3 = useTransform(scrollYProgress, [0.63, 0.94], [0, 1]);

  const statementBase =
    'relative font-display font-medium leading-[1.12] tracking-tight text-white';
  const shortSize = 'text-[2.4rem] sm:text-6xl lg:text-7xl';
  const longSize = 'text-[1.7rem] sm:text-4xl lg:text-5xl';

  /* Reduced-motion: a calm, readable stacked version, no scroll pinning. */
  if (prefersReducedMotion) {
    return (
      <section
        id="manifesto"
        aria-label="Manifesto"
        className="relative w-full overflow-hidden bg-[#040810] px-6 py-28 text-white sm:py-36"
      >
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_0%,#040810_120%)]" />
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-14 text-center">
          <span className="section-pill font-mono text-[0.65rem] font-bold uppercase tracking-[0.3em] text-white/60">
            Chapter 01 · Manifesto
          </span>
          <p className={`${statementBase} ${shortSize}`}>
            Generic software is{' '}
            <span className="relative whitespace-nowrap">
              fragile
              <span
                aria-hidden="true"
                className="absolute left-0 top-1/2 h-[0.08em] w-full -translate-y-1/2 rounded-full"
                style={{ background: WARNING }}
              />
            </span>
            .
          </p>
          <p className={`${statementBase} ${shortSize}`}>
            Edge environments are{' '}
            <span className="relative whitespace-nowrap">
              unforgiving
              <span
                aria-hidden="true"
                className="absolute -bottom-1 left-0 h-[0.07em] w-full rounded-full"
                style={{ background: WARNING }}
              />
            </span>
            .
          </p>
          <p className={`${statementBase} ${longSize}`}>
            I build the <span className="text-gradient">intelligent layer</span>{' '}
            where bare-metal hardware meets resilient logic.
          </p>
          <p className="font-pixel text-3xl uppercase tracking-tight text-white sm:text-5xl">
            Finally.
          </p>
        </div>
      </section>
    );
  }

  return (
    <MotionConfig reducedMotion="never">
    <section
      id="manifesto"
      aria-label="Manifesto"
      ref={containerRef}
      className="relative w-full bg-[#040810] text-white"
      style={{ height: '360vh' }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Consistent grid + vignette texture, stable during the pin */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgb(117, 113, 113) 1px, transparent 1px), linear-gradient(to bottom, rgb(117, 113, 113) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_0%,#040810_115%)]" />

        {/* Chapter framing: eyebrow + segmented progress, persistent */}
        <div className="absolute inset-x-0 top-[15vh] z-20 flex flex-col items-center gap-5">
          <span className="rounded-full border border-white/10 bg-white/5 px-5 py-2 font-mono text-[0.65rem] font-bold uppercase tracking-[0.3em] text-white/60 backdrop-blur-md">
            Chapter 01 · Manifesto
          </span>
          <div className="flex items-center gap-2">
            {[seg1, seg2, seg3].map((seg, i) => (
              <div
                key={i}
                className="h-[3px] w-10 overflow-hidden rounded-full bg-white/10"
              >
                <motion.div
                  initial={false}
                  style={{ scaleX: seg, transformOrigin: 'left center' }}
                  className="h-full w-full rounded-full bg-white/70"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Center stage: overlapping beats cross-fade in place */}
        <div className="relative z-10 flex h-full w-full items-center justify-center">
          <div className="relative h-[46vh] w-full max-w-5xl">
            <Beat {...b1} number="01">
              <p className={`${statementBase} ${shortSize}`}>
                Generic software is{' '}
                <span className="relative whitespace-nowrap">
                  fragile
                  <DrawLine
                    scaleX={strike1}
                    color={WARNING}
                    className="left-0 top-1/2 h-[0.08em] w-full -translate-y-1/2"
                  />
                </span>
                .
              </p>
            </Beat>

            <Beat {...b2} number="02">
              <p className={`${statementBase} ${shortSize}`}>
                Edge environments are{' '}
                <span className="relative whitespace-nowrap">
                  unforgiving
                  <DrawLine
                    scaleX={underline2}
                    color={WARNING}
                    className="-bottom-1 left-0 h-[0.07em] w-full"
                  />
                </span>
                .
              </p>
            </Beat>

            <Beat {...b3} number="03">
              <div className="flex flex-col items-center gap-6">
                <p className={`${statementBase} ${longSize}`}>
                  I build the{' '}
                  <span className="relative whitespace-nowrap">
                    <span className="text-gradient">intelligent layer</span>
                    <DrawLine
                      scaleX={underline3}
                      color="#7C3AED"
                      className="-bottom-1 left-0 h-[0.07em] w-full"
                    />
                  </span>{' '}
                  where bare-metal hardware meets resilient logic.
                </p>
                <motion.p
                  initial={false}
                  style={{ opacity: finallyOpacity, y: finallyY }}
                  className="section-heading-glow font-pixel text-3xl uppercase tracking-tight text-white sm:text-5xl"
                >
                  Finally.
                </motion.p>
              </div>
            </Beat>
          </div>
        </div>
      </div>
    </section>
    </MotionConfig>
  );
}
