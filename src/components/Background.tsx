import { motion } from "framer-motion";

const workExperiences = [
  {
    company: "Hamburg University of Technology",
    role: "Research Assistant",
    period: "Mar 2024 – Present",
    description: "Automated the research data pipeline by developing a modular suite of MATLAB scripts for end-to-end data ingestion, preprocessing, and analysis. Built a standalone MATLAB App GUI to eliminate manual analysis and improve reproducibility.",
  },
  {
    company: "Cognizant",
    role: "Data Engineer",
    period: "Sep 2021 – Aug 2023",
    description: "Developed and maintained ETL pipelines using Informatica. Optimized data warehousing queries for scalability. Automated monitoring workflows with Unix Shell scripts and maintained version control utilizing Git.",
  },
];

const education = [
  {
    institution: "Technische Universität Hamburg",
    degree: "M.Sc. Microelectronics and Microsystems",
    period: "Oct 2023 – Present",
    description: "Expertise in Advanced IC Design, Semiconductor Technology, Edge Intelligence, and Embedded System integration.",
  },
  {
    institution: "Federal Institute of Science and Technology",
    degree: "B.Tech Electrical & Electronics Engineering",
    period: "Sep 2017 – Apr 2021",
    description: "Foundational engineering studies focused on circuit analysis, energy systems, and electronic instrumentation.",
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
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export default function Background() {
  return (
    <section
      id="background"
      className="relative flex w-full flex-col items-start justify-center overflow-hidden bg-[#040810] px-6 py-24 sm:px-10 sm:py-32 lg:px-16"
      aria-labelledby="experience-title"
    >
      {/* Cinematic Background Elements */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1d2b45]/20 via-[#040810]/60 to-[#070d18]" />
      </div>

      {/* Dynamic Grid Glows */}
      <motion.div
        animate={{
          opacity: [0.1, 0.25, 0.1],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute top-1/3 left-1/2 h-[50rem] w-[50rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[150px]"
      />
      <motion.div
        animate={{
          opacity: [0.1, 0.25, 0.1],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="pointer-events-none absolute bottom-1/3 left-1/4 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-indigo-600/10 blur-[120px]"
      />

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

      <div className="relative z-10 w-full">
        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto mb-16 flex max-w-4xl flex-col items-center justify-center text-center sm:mb-24"
        >
          <motion.div variants={fadeUpVariants} className="mb-6 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-mono text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/70 backdrop-blur-md">
            Chapter 04 · Timeline
          </motion.div>
          <motion.h2 variants={fadeUpVariants} className="section-heading-glow font-pixel text-[3rem] uppercase leading-[0.85] tracking-tight text-white sm:text-[4.5rem] md:text-[6rem] lg:text-[7.5rem]">
            Work &<br />
            <span className="text-white/40">Academia</span>
          </motion.h2>
        </motion.div>

        <div className="mx-auto flex max-w-4xl flex-col gap-20">
          {/* Work Experience */}
          <div className="flex flex-col">
            <h3 className="mb-8 font-mono text-[1.1rem] font-bold uppercase tracking-widest text-white/50">
              Industry
            </h3>
            <motion.div
              className="grid gap-5"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {workExperiences.map((exp, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-black/40 p-6 backdrop-blur-sm transition-all hover:bg-white/[0.04] hover:border-white/20 sm:p-8"
                >
                  <div>
                    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                      <div className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.15em] text-white/50">
                        {exp.company}
                      </div>
                      <span className="rounded border border-white/15 bg-white/5 px-2.5 py-1 font-mono text-[0.65rem] font-semibold uppercase tracking-wider text-white/80">
                        {exp.period}
                      </span>
                    </div>
                    <div className="mb-4 font-display text-xl font-semibold leading-tight text-white/95 sm:text-2xl">
                      {exp.role}
                    </div>
                    <div className="text-[0.92rem] leading-relaxed text-white/60">
                      {exp.description}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="h-px w-full bg-white/10" />

          {/* Education */}
          <div className="flex flex-col">
            <h3 className="mb-8 font-mono text-[1.1rem] font-bold uppercase tracking-widest text-white/50">
              Education
            </h3>
            <motion.div
              className="grid gap-5"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-black/40 p-6 backdrop-blur-sm transition-all hover:bg-white/[0.04] hover:border-white/20 sm:p-8"
                >
                  <div>
                    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                      <div className="font-mono text-[0.7rem] font-bold uppercase tracking-[0.15em] text-white/50">
                        {edu.institution}
                      </div>
                      <span className="rounded border border-white/15 bg-white/5 px-2.5 py-1 font-mono text-[0.65rem] font-semibold uppercase tracking-wider text-white/80">
                        {edu.period}
                      </span>
                    </div>
                    <div className="mb-4 font-display text-xl font-semibold leading-tight text-white/95 sm:text-2xl">
                      {edu.degree}
                    </div>
                    <div className="text-[0.92rem] leading-relaxed text-white/60">
                      {edu.description}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
