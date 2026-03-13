import { motion } from "framer-motion";

const projects = [
  {
    title: "AI Voice Assistant",
    description: "Real-time, multilingual AI voice assistant using LiveKit Agent framework. Integrated with Home Assistant via Context Protocol for hands-free workflow.",
    technologies: ["LiveKit", "Python", "LLM Pipelines", "MCP"],
    link: "https://github.com",
    category: "AI Product",
  },
  {
    title: "SmartSip Hydration Monitor",
    description: "Edge machine learning workflow classifying drinking gestures via IMU data. Trained neural network runs on-device with ultra-low power.",
    technologies: ["TinyML", "Arduino Nano", "BLE", "Edge Impulse"],
    link: "https://github.com",
    category: "Embedded AI",
  },
  {
    title: "Bed Occupancy Sensor",
    description: "High-sensitivity hardware trigger using FSRs. Custom firmware processes analog values to dispatch real-time states over local Wi-Fi.",
    technologies: ["ESP8266", "ESPHome", "C++", "Home Assistant"],
    link: "https://github.com",
    category: "Hardware",
  },
  {
    title: "Self-Hosted Smart Home",
    description: "Fully containerized automation network across isolated Docker environments, combining MQTT-driven microcontrollers and external endpoints.",
    technologies: ["Docker", "MQTT", "YAML", "Linux Admin"],
    link: "https://github.com",
    category: "DevOps / IoT",
  },
  {
    title: "Power Converter Simulation",
    description: "Modeled and validated solar charging behavior across buck, boost, and full-bridge electronic configurations to optimize efficiency algorithms.",
    technologies: ["MATLAB", "Simulink", "Data Analysis"],
    link: "https://github.com",
    category: "Research",
  },
  {
    title: "Data Automation Engine",
    description: "End-to-end data ingestion pipeline and standalone GUI built to eliminate manual post-processing of massive numerical datasets.",
    technologies: ["MATLAB App Builder", "Data Preprocessing"],
    link: "https://github.com",
    category: "Pipelines",
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
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export default function Work() {
  return (
    <section
      id="work"
      className="relative -mt-10 min-h-screen w-full overflow-hidden bg-[#040810] pt-24 transition-colors sm:-mt-14 sm:pt-28 lg:pt-32"
      aria-labelledby="portfolio-title"
    >
      {/* Redesigned Cinematic Background with Glow */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        {/* Deep background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1d2b45]/20 via-[#040810]/80 to-[#040810]" />

        {/* Dynamic Glow */}
        <motion.div
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 h-[40rem] w-[40rem] rounded-full bg-blue-900/20 blur-[120px]"
        />
      </div>

      {/* Subdued Grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgb(117, 113, 113) 1px, transparent 1px), linear-gradient(to bottom, rgb(117, 113, 113) 1px, transparent .1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Section Vignette for smooth blending */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#040810_100%)]" />

      <div className="relative z-10 flex w-full flex-col items-center justify-between px-6 pb-12 sm:px-10 lg:px-16">
        {/* Striking Centered Header similar to Hero */}
        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center text-center max-w-4xl"
        >
          {/* Tag */}
          <motion.div
            variants={fadeUpVariants}
            className="mb-8 rounded-full border border-white/10 bg-white/5 px-6 py-2.5 backdrop-blur-md"
          >
            <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.3em] text-white/70">
              Chapter 02 · Work Log
            </p>
          </motion.div>

          <motion.h2 variants={fadeUpVariants} className="section-heading-glow font-pixel text-[3rem] uppercase leading-[0.85] tracking-tight text-white sm:text-[4.5rem] md:text-[6rem] lg:text-[7.5rem]">
            Selected
            <br />
            <span className="text-white/40">Builds</span>
          </motion.h2>
          <motion.p variants={fadeUpVariants} className="mt-8 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base md:text-lg">
            Engineering the physical-to-digital layer. Each project tackles real-world constraints across robotics, embedded processing, and deployed automation.
          </motion.p>
        </motion.div>

        {/* Project Cards Grid */}
        <motion.div
          className="mt-20 grid w-full max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {projects.map((project, index) => (
            <motion.a
              key={index}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex min-h-[400px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:bg-white/[0.06] hover:border-white/30 hover:shadow-[0_0_30px_rgba(29,43,69,0.5)]"
              variants={cardVariants}
            >
              {/* Hover Gradient Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Top line accent */}
              <div className="absolute left-0 top-0 h-[2px] w-0 bg-white/20 transition-all duration-500 group-hover:w-full" />

              <div className="relative z-10 flex flex-col flex-grow">
                {/* Header info */}
                <div className="flex justify-between items-start mb-8">
                  <div className="flex flex-col">
                    <span className="font-pixel text-[2.5rem] leading-none text-white/10 transition-colors duration-300 group-hover:text-white/20">
                      0{index + 1}
                    </span>
                  </div>
                  <div className="rounded-full border border-white/10 bg-black/50 px-3 py-1 font-mono text-[0.6rem] font-medium tracking-[0.2em] text-white/50 transition-colors group-hover:border-white/30 group-hover:text-white/90">
                    {project.category}
                  </div>
                </div>

                {/* Title & Desc */}
                <h3 className="mb-4 font-display text-2xl font-semibold tracking-wide text-white/90 transition-colors duration-300 group-hover:text-white">
                  {project.title}
                </h3>
                <p className="mb-8 text-[0.92rem] leading-relaxed text-white/50 transition-colors duration-300 flex-grow group-hover:text-white/75">
                  {project.description}
                </p>

                {/* Tags area */}
                <div className="mt-auto pt-6 border-t border-white/5 group-hover:border-white/10 transition-colors duration-300">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="flex items-center gap-1.5 rounded-md bg-white/[0.03] px-2.5 py-1.5 font-mono text-[0.65rem] text-white/50 transition-colors group-hover:bg-white/[0.08] group-hover:text-white/90"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action link */}
                  <div className="flex items-center text-xs font-mono tracking-widest text-white/30 transition-colors uppercase group-hover:text-white/90">
                    <span className="mr-3 font-semibold">View Repository</span>
                    <svg className="h-4 w-4 transform transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}