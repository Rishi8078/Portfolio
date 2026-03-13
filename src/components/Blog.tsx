import { motion } from 'framer-motion';

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const blogPosts = [
  {
    title: "The Reality of Edge ML",
    date: "Mars 2024",
    link: "#",
    category: "TinyML",
    description: "Lessons learned while deploying low-power models to resource-constrained microcontrollers."
  },
  {
    title: "Building Resilient IoT Protocols",
    date: "Feb 2024",
    link: "#",
    category: "Architecture",
    description: "Why MQTT and CoAP aren't enough for the erratic nature of remote sensor deployments."
  },
  {
    title: "ROS vs Custom Stacks",
    date: "Jan 2024",
    link: "#",
    category: "Robotics",
    description: "When to use standard middleware and when it makes sense to build a custom real-time OS from scratch."
  }
];

export default function Blog() {
  return (
    <section
      id="blog"
      className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-[#040810] px-6 py-24 sm:px-12 lg:px-24"
      aria-labelledby="blog-title"
    >
      <div className="relative z-20 flex w-full max-w-5xl flex-col items-center">
        
        {/* Header Section */}
        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20 flex w-full max-w-4xl flex-col items-center text-center"
        >
          <motion.div variants={fadeUpVariants} className="mb-8 rounded-full border border-white/10 bg-white/5 px-6 py-2 pb-2.5 backdrop-blur-md">
            <span className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.3em] text-white/70">
              Chapter 05 · Writings
            </span>
          </motion.div>
          <motion.h2 variants={fadeUpVariants} id="blog-title" className="font-pixel text-[3rem] uppercase leading-[0.85] tracking-tight text-white sm:text-[4.5rem] md:text-[6rem] lg:text-[7.5rem]">
            My <span className="text-white/40">Thoughts</span>
          </motion.h2>
          <motion.p variants={fadeUpVariants} className="mt-8 max-w-2xl font-mono text-sm leading-relaxed text-white/70 sm:text-base md:text-lg">
            Engineering logs, architectural decisions, and essays on building embedded edge systems.
          </motion.p>
        </motion.div>

        {/* Blog List Sequence */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
          className="flex w-full flex-col gap-6"
        >
          {blogPosts.map((post, i) => (
            <motion.a
              key={i}
              variants={fadeUpVariants}
              href={post.link}
              className="group relative flex w-full flex-col justify-between rounded-2xl border border-white/5 bg-white/[0.02] p-8 transition-all hover:bg-white/[0.05] sm:flex-row sm:items-center"
            >
              <div className="flex max-w-xl flex-col gap-2">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-[0.65rem] uppercase tracking-widest text-[#60a5fa]">
                    {post.category}
                  </span>
                  <span className="text-white/20">—</span>
                  <span className="font-mono text-[0.65rem] uppercase tracking-widest text-white/40">
                    {post.date}
                  </span>
                </div>
                <h3 className="font-display text-xl font-medium tracking-tight text-white/90 transition-colors group-hover:text-white sm:text-2xl">
                  {post.title}
                </h3>
                <p className="mt-2 font-mono text-xs leading-relaxed text-white/50 sm:text-sm">
                  {post.description}
                </p>
              </div>
              
              <div className="mt-6 flex shrink-0 sm:mt-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 transition-all group-hover:border-white/20 group-hover:bg-white/10 group-hover:text-white">
                  ↗
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="mt-16 flex w-full justify-center"
        >
          <a
            href="#"
            className="group flex items-center justify-center gap-3 rounded-full border border-white/20 bg-transparent px-8 py-4 text-xs font-bold uppercase tracking-[0.15em] text-white backdrop-blur-sm transition-all hover:border-white/50 hover:bg-white/5"
          >
            <span>Read All Entries</span>
          </a>
        </motion.div>

      </div>
    </section>
  );
}