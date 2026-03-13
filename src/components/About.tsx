import { motion } from 'framer-motion';

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

export default function About() {
  return (
    <section
      id="about"
      className="relative flex w-full flex-col justify-center overflow-hidden bg-[#040810] px-6 py-24 sm:px-10 sm:py-32 lg:px-16"
      aria-labelledby="about-title"
    >
      {/* Subtle Background with Glow */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        {/* Deep background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.08),transparent_60%)]" />

        {/* Dynamic Glow */}
        <motion.div
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/4 h-[50rem] w-[50rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-900/10 blur-[150px]"
        />
        <motion.div
          animate={{
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-0 right-1/4 h-[40rem] w-[40rem] translate-x-1/2 translate-y-1/4 rounded-full bg-blue-800/10 blur-[120px]"
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
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20 flex w-full max-w-4xl flex-col items-center text-center"
        >
          <motion.div variants={fadeUpVariants} className="mb-8 rounded-full border border-white/10 bg-white/5 px-6 py-2 pb-2.5 font-mono text-[0.7rem] font-bold uppercase tracking-[0.2em] text-white/50 backdrop-blur-md">
            Chapter 05 · The Developer
          </motion.div>
          <motion.h2 variants={fadeUpVariants} className="section-heading-glow font-pixel text-[3rem] uppercase leading-[0.85] tracking-tight text-white sm:text-[4.5rem] md:text-[6rem] lg:text-[7.5rem]">
            About <span className="text-white/40">Me</span>
          </motion.h2>
        </motion.div>

        {/* Centered Content Layout */}
        <div className="flex w-full max-w-4xl flex-col items-center text-center">
          <motion.div
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col items-center"
          >
            <motion.p variants={fadeUpVariants} className="font-display text-[1.4rem] font-medium leading-relaxed tracking-tight text-white/95 sm:text-[2rem] lg:text-[2.4rem]">
              Most engineers pick a side: <span className="italic text-white/50">Hardware</span> or <span className="italic text-white/50">Software</span>.<br className="hidden md:block" /> I engineer the living layer that connects them.
            </motion.p>

            <motion.div variants={fadeUpVariants} className="mt-12 flex max-w-3xl flex-col gap-8 text-[1.05rem] leading-relaxed text-white/60 sm:text-[1.15rem]">
              <p>
                Currently pursuing my M.Sc. in Microelectronics and Microsystems at TUHH, I've spent the last few years obsessing over how to make physical devices smarter. My background is an unconventional hybrid — blending an academic foundation in rigorous semiconductor technology with battle-tested experience as a Data Engineer at Cognizant.
              </p>
              <p>
                From debugging bare-metal microcontroller firmware and training low-power TinyML models, to scaling distributed Dockerized ETL pipelines, I thrive at the exact point where these disciplines collide. Whether it's building ROS navigation stacks for autonomous rovers or engineering edge systems with millisecond latency — I build systems that actually survive the real world.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}