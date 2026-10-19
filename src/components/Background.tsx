import { motion } from "framer-motion";
import { fadeUpVariants, makeContainerVariants, itemVariants, sectionViewport } from '../lib/motion';
import GlitchHeading from './GlitchHeading';

const workExperiences = [
  {
    company: "Hamburg University of Technology",
    role: "Research Assistant",
    period: "Dec 2025 – Present",
    description: "Built ROS-based navigation stacks and high-fidelity digital twins (NVIDIA Isaac Sim, Newton, Gazebo) for the Leo Rover, validating LiDAR, IMU, and camera sensor fusion before deployment. Automated teleoperation, localization, and state estimation with modular ROS nodes and Python.",
  },
  {
    company: "Hamburg University of Technology",
    role: "Research Assistant",
    period: "Mar 2024 – Dec 2025",
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

const containerVariants = makeContainerVariants(0.1, 0.1);

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
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 h-[70rem] w-[70rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(37,99,235,0.15),transparent_100%)]"
        style={{ animation: 'orb-pulse 9s ease-in-out infinite' }}
      />
      <div
        className="pointer-events-none absolute bottom-1/3 left-1/4 h-[60rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(79,70,229,0.15),transparent_100%)]"
        style={{ animation: 'orb-pulse 12s ease-in-out 1s infinite' }}
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
          viewport={sectionViewport}
          className="mx-auto mb-16 flex max-w-4xl flex-col items-center justify-center text-center sm:mb-24"
        >
          <motion.div variants={fadeUpVariants} className="mb-6 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-white/70 backdrop-blur-md">
            Chapter 04 · Timeline
          </motion.div>
          <GlitchHeading variants={fadeUpVariants} dataText="WORK & ACADEMIA" className="section-heading-glow font-pixel text-[3rem] uppercase leading-[0.85] tracking-tight text-white sm:text-[4.5rem] md:text-[6rem] lg:text-[7.5rem]">
            Work &<br />
            <span className="text-white/60">Academia</span>
          </GlitchHeading>
        </motion.div>

        <div className="mx-auto flex max-w-4xl flex-col gap-20">
          {/* Work Experience — blue track */}
          <div className="flex flex-col">
            <h3 className="mb-8 font-mono text-[1.1rem] font-bold uppercase tracking-widest text-white/70">
              Industry
            </h3>
            <motion.div
              className="relative flex flex-col gap-8 sm:pl-10"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {workExperiences.map((exp, index) => (
                <motion.div key={index} variants={itemVariants} className="group relative">
                  {/* Timeline segment — mirrors the progress rail's scrub-bar design */}
                  <div className="absolute -left-10 top-7 hidden sm:block">
                    <div className="relative h-8 w-1.5 overflow-hidden rounded-full bg-white/10 transition duration-300 group-hover:bg-white/20 group-hover:shadow-[0_0_10px_rgba(96,165,250,0.5)] group-hover:ring-1 group-hover:ring-[#60A5FA]/40">
                      <div className="absolute bottom-0 left-0 right-0 h-full rounded-full bg-gradient-to-t from-[#60A5FA] to-white/80 opacity-70 shadow-[0_0_8px_rgba(96,165,250,0.8)] transition-opacity duration-300 group-hover:opacity-100" />
                    </div>
                  </div>
                  <div className="relative flex flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-black/40 p-6 backdrop-blur-sm transition group-hover:border-[#60A5FA]/30 group-hover:bg-[#60A5FA]/[0.04] group-hover:shadow-[0_0_30px_-10px_rgba(96,165,250,0.3)] sm:p-8">
                    {/* Corner glow on hover */}
                    <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(96,165,250,0.12),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div>
                      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                        <div className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-[#60A5FA]/80">
                          {exp.company}
                        </div>
                        <span className="rounded border border-[#60A5FA]/20 bg-[#60A5FA]/10 px-2.5 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-[#93C5FD]">
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
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Divider carries the blue→violet handoff between tracks */}
          <div className="h-px w-full bg-gradient-to-r from-[#60A5FA]/30 via-white/10 to-[#A78BFA]/30" />

          {/* Education — violet track */}
          <div className="flex flex-col">
            <h3 className="mb-8 font-mono text-[1.1rem] font-bold uppercase tracking-widest text-white/70">
              Education
            </h3>
            <motion.div
              className="relative flex flex-col gap-8 sm:pl-10"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {education.map((edu, index) => (
                <motion.div key={index} variants={itemVariants} className="group relative">
                  {/* Timeline segment — mirrors the progress rail's scrub-bar design */}
                  <div className="absolute -left-10 top-7 hidden sm:block">
                    <div className="relative h-8 w-1.5 overflow-hidden rounded-full bg-white/10 transition duration-300 group-hover:bg-white/20 group-hover:shadow-[0_0_10px_rgba(167,139,250,0.5)] group-hover:ring-1 group-hover:ring-[#A78BFA]/40">
                      <div className="absolute bottom-0 left-0 right-0 h-full rounded-full bg-gradient-to-t from-[#A78BFA] to-white/80 opacity-70 shadow-[0_0_8px_rgba(167,139,250,0.8)] transition-opacity duration-300 group-hover:opacity-100" />
                    </div>
                  </div>
                  <div className="relative flex flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-black/40 p-6 backdrop-blur-sm transition group-hover:border-[#A78BFA]/30 group-hover:bg-[#A78BFA]/[0.04] group-hover:shadow-[0_0_30px_-10px_rgba(167,139,250,0.3)] sm:p-8">
                    {/* Corner glow on hover */}
                    <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.12),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div>
                      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                        <div className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-[#A78BFA]/80">
                          {edu.institution}
                        </div>
                        <span className="rounded border border-[#A78BFA]/20 bg-[#A78BFA]/10 px-2.5 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-[#C4B5FD]">
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
