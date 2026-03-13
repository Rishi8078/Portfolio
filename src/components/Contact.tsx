import { motion } from 'framer-motion';

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative flex min-h-[90vh] w-full flex-col items-center justify-center overflow-hidden bg-[#040810] px-6 py-24 sm:px-12 lg:px-24"
      aria-labelledby="contact-title"
    >
      {/* Cinematic Background */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.08),transparent_50%)]" />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-64 bg-gradient-to-t from-[#040810] to-transparent" />
      
      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-20 flex w-full max-w-5xl flex-col items-center">
        
        {/* Header Section */}
        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 flex w-full max-w-4xl flex-col items-center text-center"
        >
          <motion.div variants={fadeUpVariants} className="mb-8 rounded-full border border-white/10 bg-white/5 px-6 py-2 pb-2.5 backdrop-blur-md">
            <span className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.3em] text-white/70">
              Chapter 07 · Connect
            </span>
          </motion.div>
            <motion.h2 variants={fadeUpVariants} className="section-heading-glow font-pixel text-[3rem] uppercase leading-[0.85] tracking-tight text-white sm:text-[4.5rem] md:text-[6rem] lg:text-[7.5rem]">
            Let's <span className="text-white/40">Build</span>
          </motion.h2>
          <motion.p variants={fadeUpVariants} className="mt-8 max-w-2xl font-mono text-sm leading-relaxed text-white/70 sm:text-base md:text-lg">
            Whether you're building the next generation of physical products or need to scale your device data pipelines to the edge, I'm ready to collaborate.
          </motion.p>
        </motion.div>

        {/* Center Portrait and Cards */}
        <div className="flex w-full flex-col items-center gap-16">
          
          {/* Symmetrical Portrait Container */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
            className="group relative flex w-full max-w-xs justify-center sm:max-w-sm xl:max-w-[320px]"
          >
            {/* Image Frame */}
            <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-[#070d18]/50 p-2 shadow-2xl backdrop-blur-sm transition-all duration-500 group-hover:border-white/20">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl">
                <img
                  src="/portrait.png"
                  alt="Rishib Iyapady"
                  className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                {/* Subtle inner overlay for cinematic feel without killing color */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#040810]/80 via-transparent to-transparent" />
              </div>
            </div>
            
            {/* Symmetrical Decorative Elements */}
            <div className="absolute -left-12 top-1/2 -z-10 h-32 w-32 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[3rem] transition-all duration-500 group-hover:bg-blue-600/20" />
            <div className="absolute -right-12 top-1/2 -z-10 h-32 w-32 -translate-y-1/2 rounded-full bg-emerald-600/10 blur-[3rem] transition-all duration-500 group-hover:bg-emerald-600/20" />
          </motion.div>

          {/* Interactive Links Array */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            className="flex w-full grid-cols-1 flex-col gap-4 sm:grid sm:grid-cols-3"
          >
            {[
              { name: 'Email', value: 'rishibiyapady@gmail.com', href: 'mailto:rishibiyapady@gmail.com' },
              { name: 'GitHub', value: 'github.com/Rishi8078', href: 'https://github.com/Rishi8078' },
              { name: 'LinkedIn', value: 'in/rishib-iyapady', href: 'https://linkedin.com/in/rishib-iyapady' }
            ].map((link) => (
              <a
                key={link.name}
                href={link.href}
                target={link.name !== 'Email' ? '_blank' : undefined}
                rel={link.name !== 'Email' ? 'noopener noreferrer' : undefined}
                className="group flex flex-col items-center justify-center gap-2 rounded-xl border border-white/5 bg-white/[0.02] p-6 text-center transition-all duration-300 hover:border-white/10 hover:bg-white/[0.04]"
              >
                <h3 className="font-display text-xl font-semibold tracking-tight text-white/80 transition-colors group-hover:text-white">
                  {link.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[0.65rem] tracking-widest text-white/40 transition-colors group-hover:text-white/80">
                    {link.value}
                  </span>
                  <span className="text-white/30 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white">
                    ↗
                  </span>
                </div>
              </a>
            ))}
          </motion.div>
        </div>

      </div>

      {/* Footer */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="relative z-20 mt-32 flex w-full flex-col items-center justify-center gap-4 font-mono text-[0.65rem] uppercase tracking-widest text-white/30 sm:flex-row"
      >
        <span>© {new Date().getFullYear()} Rishib Iyapady</span>
      </motion.div>
    </section>
  );
}