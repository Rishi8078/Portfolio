import { motion } from 'framer-motion';
import { fadeUpVariants, sectionViewport, EASE_OUT } from '../lib/motion';
import GlitchHeading from './GlitchHeading';

/* Bio as annotated source: each prose block carries a margin annotation
   styled like a firmware comment that compresses the block beside it. */
const blocks = [
  {
    annotation: '// thesis',
    body: (
      <p className="font-display text-[1.35rem] font-medium leading-snug tracking-tight text-white/95 sm:text-[1.7rem] lg:text-[2rem]">
        Most engineers choose a side: <span className="text-gradient">Hardware</span> or{' '}
        <span className="text-gradient">Software</span>. I operate at the intersection where
        they meet.
      </p>
    ),
  },
  {
    annotation: '// path',
    body: (
      <p className="max-w-prose text-[1.02rem] leading-relaxed text-white/60 sm:text-[1.1rem]">
        Currently pursuing my M.Sc. in Microelectronics and Microsystems at TUHH, I focus on
        making physical devices truly intelligent. My background bridges two worlds, combining
        advanced hardware design with battle-tested industry experience as a Data Engineer at
        Cognizant.
      </p>
    ),
  },
  {
    annotation: '// practice',
    body: (
      <p className="max-w-prose text-[1.02rem] leading-relaxed text-white/60 sm:text-[1.1rem]">
        From low-power TinyML models and bare-metal firmware to scaling Dockerized ETL
        pipelines, I thrive at the exact boundary where hardware meets software. Whether I'm
        configuring ROS stacks for autonomous systems or designing edge infrastructure built
        for ultra-low latency, I engineer systems designed to operate reliably in the real
        world.
      </p>
    ),
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative flex w-full flex-col justify-center bg-[#040810] px-6 py-24 sm:px-10 sm:py-32 lg:px-16"
      aria-labelledby="about-title"
    >
      {/* Subtle Background with Glow */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        {/* Deep background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.08),transparent_60%)]" />

        {/* Dynamic Glow */}
        <div
          className="absolute top-1/2 left-1/4 h-[70rem] w-[70rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(88,28,135,0.15),transparent_100%)]"
          style={{ animation: 'orb-glow 10s ease-in-out infinite' }}
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Section Vignette for smooth blending */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#040810_100%)]" />

      <div className="relative z-10 flex w-full flex-col items-center">
        {/* Header Section */}
        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          className="mb-20 flex w-full max-w-4xl flex-col items-center text-center"
        >
          <motion.div variants={fadeUpVariants} className="mb-8 rounded-full border border-white/10 bg-white/5 px-6 py-2 pb-2.5 font-mono text-[0.7rem] font-bold uppercase tracking-[0.2em] text-white/50 backdrop-blur-md">
            Chapter 05 · The Developer
          </motion.div>
          <GlitchHeading variants={fadeUpVariants} dataText="ABOUT ME" className="section-heading-glow font-pixel text-[3rem] uppercase leading-[0.85] tracking-tight text-white sm:text-[4.5rem] md:text-[6rem] lg:text-[7.5rem]">
            About <span className="text-white/40">Me</span>
          </GlitchHeading>
        </motion.div>

        {/* Annotated-source narrative: mono comments in the margin, prose in the body */}
        <div className="relative w-full max-w-4xl">
          {/* Ambient glows, kept off-axis to match the asymmetric layout */}
          <div
            className="absolute -left-40 top-1/3 -z-10 h-[40rem] w-[40rem] -translate-y-1/2 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(37,99,235,0.1),transparent_100%)]"
            style={{ animation: 'orb-glow-no-translate 5s ease-in-out infinite' }}
          />
          <div
            className="absolute -right-40 bottom-0 -z-10 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(147,51,234,0.1),transparent_100%)]"
            style={{ animation: 'orb-glow-no-translate 6s ease-in-out 1s infinite' }}
          />

          {/* Gutter rule that draws down as the section reveals */}
          <motion.div
            aria-hidden="true"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={sectionViewport}
            transition={{ duration: 1.2, ease: EASE_OUT }}
            className="absolute bottom-0 left-0 top-0 hidden w-px origin-top bg-gradient-to-b from-[#60A5FA]/40 via-white/10 to-transparent sm:left-[10.5rem] sm:block"
          />

          <div className="flex flex-col gap-14 sm:gap-16">
            {blocks.map((block) => (
              <motion.div
                key={block.annotation}
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
                initial="hidden"
                whileInView="visible"
                viewport={sectionViewport}
                className="grid grid-cols-1 gap-3 text-left sm:grid-cols-[10.5rem_1fr] sm:gap-0"
              >
                <motion.span
                  variants={fadeUpVariants}
                  className="font-mono text-[0.75rem] font-bold tracking-[0.12em] text-[#60A5FA]/80 sm:pr-8 sm:pt-2 sm:text-right"
                >
                  {block.annotation}
                </motion.span>
                <motion.div variants={fadeUpVariants} className="sm:pl-10">
                  {block.body}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}