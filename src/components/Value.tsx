import { motion } from 'framer-motion';

const values = [
  {
    number: "01",
    title: "Hardware × Software",
    description: "Living at the intersection of microelectronics and code. I design systems where raw silicon meets robust logic, bringing physical prototypes to life.",
  },
  {
    number: "02",
    title: "Edge Intelligence",
    description: "Deploying TinyML models and containerized data pipelines directly to the device. Focusing on fast inference, low latency, and efficient power usage.",
  },
  {
    number: "03",
    title: "Shipped & Proven",
    description: "Building tools that communities and teams actually deploy. Because code only matters when it survives real-world constraints and physical edge cases.",
  },
];

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export default function Value() {
  return (
    <section
      id="values"
      aria-label="Core values section"
      className="relative w-full overflow-hidden bg-[#040810] px-6 py-24 sm:px-10 sm:py-32 lg:px-16"
    >
      {/* Background gradients */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.1),transparent_50%)]" />

      {/* Grid pattern glows */}
      <motion.div
        animate={{
          opacity: [0.1, 0.25, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute top-1/4 left-1/4 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[120px]"
      />
      <motion.div
        animate={{
          opacity: [0.1, 0.25, 0.1],
        }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="pointer-events-none absolute bottom-1/4 right-0 h-[35rem] w-[35rem] translate-x-1/4 translate-y-1/4 rounded-full bg-indigo-500/10 blur-[120px]"
      />

      {/* Grid pattern */}
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

      <div className="relative z-10 flex w-full flex-col items-center justify-between">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex w-full flex-col items-center justify-center max-w-7xl mx-auto"
        >
          <motion.div
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="relative mb-20 flex max-w-4xl flex-col items-center text-center"
          >
            {/* Symmetrical Decorative Elements */}
            <motion.div 
              animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.2, 1] }} 
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} 
              className="absolute -left-16 top-1/2 -z-10 h-40 w-40 -translate-y-1/2 rounded-full bg-indigo-600/20 blur-[4rem]" 
            />
            <motion.div 
              animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.2, 1] }} 
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} 
              className="absolute -right-16 top-1/2 -z-10 h-40 w-40 -translate-y-1/2 rounded-full bg-blue-600/20 blur-[4rem]" 
            />

            <motion.div
              variants={fadeUpVariants}
              className="mb-8 rounded-full border border-white/10 bg-white/5 px-6 py-2.5 backdrop-blur-md"
            >
              <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.3em] text-white/70">
                Chapter 03 · Core Principles
              </p>
            </motion.div>

            <motion.h2 variants={fadeUpVariants} className="section-heading-glow font-pixel text-[3rem] uppercase leading-[0.85] tracking-tight text-white sm:text-[4.5rem] md:text-[6rem] lg:text-[7.5rem]">
              Engineering
              <br />
              <span className="text-white/40">Philosophy</span>
            </motion.h2>
          </motion.div>

          <div className="grid w-full gap-5 lg:grid-cols-3">
            {values.map((value) => (
              <motion.div
                key={value.title}
                variants={itemVariants}
                className="group relative flex flex-col overflow-hidden rounded-xl border border-white/10 bg-black/40 p-8 backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/[0.08]"
              >
                {/* Number Watermark */}
                <div className="pointer-events-none absolute -right-4 -top-8 font-pixel text-[8rem] text-white/[0.03] transition-colors group-hover:text-white/[0.06]">
                  {value.number}
                </div>

                <div className="relative z-10">
                  <span className="mb-6 inline-block font-mono text-[0.8rem] font-semibold text-white/40">
                    // {value.number}
                  </span>
                  <h3 className="mb-4 font-display text-[1.4rem] font-semibold tracking-wide text-white/95 sm:text-2xl">
                    {value.title}
                  </h3>
                  <p className="text-[0.95rem] leading-relaxed text-white/60 group-hover:text-white/80 transition-colors">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}