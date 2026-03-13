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
      {/* Redesigned Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1d2b45]/20 via-[#040810]/80 to-[#040810]" />
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
      
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-56 bg-gradient-to-b from-[#040810] via-[#040810]/80 to-transparent" />

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

          <motion.h2 variants={fadeUpVariants} className="font-pixel text-[3rem] uppercase leading-[0.85] tracking-tight text-white sm:text-[4.5rem] md:text-[6rem] lg:text-[7.5rem]">
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
              className="group relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-xl border border-white/20 bg-black/40 p-7 backdrop-blur-md transition-all hover:-translate-y-1 hover:border-white/40 hover:bg-white/10"
              variants={cardVariants}
            >
              {/* Top Meta Area */}
              <div>
                <div className="mb-5 flex items-center justify-between">
                  <span className="rounded bg-white/10 px-2.5 py-1 font-mono text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white">
                    {project.category}
                  </span>
                  <span className="font-pixel text-xs text-white/40 group-hover:text-white/80 transition-colors">0{index + 1}</span>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-display text-[1.4rem] font-semibold leading-tight text-white/95">
                    {project.title}
                  </h3>
                </div>

                <p className="text-[0.92rem] leading-relaxed text-white/70">
                  {project.description}
                </p>
              </div>

              {/* Bottom Tech/Action Area */}
              <div className="mt-6 flex flex-col items-start gap-6">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="rounded border border-white/15 bg-black/50 px-2 py-1 font-mono text-[0.65rem] font-medium tracking-wide text-white/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex w-full justify-start pt-2">
                  <span className="rounded-full border border-white/30 px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.08em] text-white/80 transition group-hover:border-white/60 group-hover:bg-white group-hover:text-[#1a1a2e]">
                    Explore Build
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}