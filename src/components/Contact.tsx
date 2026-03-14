import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import contactAnimation from '../assets/contact-lottie.json';

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

function MagicContactCard({ link }: { link: any }) {
  const handleMouseMove = (e: any) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <a
      href={link.href}
      target={link.name !== 'Email' ? '_blank' : undefined}
      rel={link.name !== 'Email' ? 'noopener noreferrer' : undefined}
      onMouseMove={handleMouseMove}
      className="group relative flex flex-col items-center justify-center overflow-hidden rounded-xl border border-white/5 bg-white/[0.02] p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.04]"
    >
      {/* Background Hover Highlight */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(300px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(255, 255, 255, 0.05), transparent 40%)`
        }}
      />
      
      {/* Border Hover Highlight */}
      <div 
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          padding: "1px",
          background: `radial-gradient(300px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(255, 255, 255, 0.4), transparent 40%)`,
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-2">
        <h3 className="font-display text-xl font-semibold tracking-tight text-white/80 transition-colors group-hover:text-white">
          {link.name}
        </h3>
        <span className="font-mono text-[0.65rem] tracking-widest text-white/40 transition-colors group-hover:text-white/80">
          {link.value}
        </span>
      </div>
    </a>
  );
}

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative flex min-h-[90vh] w-full flex-col items-center justify-center overflow-hidden bg-[#040810] px-6 py-24 sm:px-12 lg:px-24"
      aria-labelledby="contact-title"
    >
      {/* Cinematic Background with Glow */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.08),transparent_50%)]" />

        {/* Dynamic Glow */}
        <div
          className="pointer-events-none absolute h-[80rem] w-[80rem] rounded-full bg-[radial-gradient(circle,var(--tw-gradient-stops))] from-indigo-900/15 via-indigo-900/5 to-transparent"
          style={{ animation: 'orb-pulse 15s ease-in-out infinite' }}
        />
        <div
          className="pointer-events-none absolute bottom-0 right-0 h-[60rem] w-[60rem] translate-x-1/4 translate-y-1/4 rounded-full bg-[radial-gradient(circle,var(--tw-gradient-stops))] from-blue-800/15 via-blue-800/5 to-transparent"
          style={{ animation: 'orb-contact 11s ease-in-out 3s infinite' }}
        />
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

      {/* Section Vignette for smooth blending */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#040810_100%)]" />

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
            Let's <span className="text-white/40">Connect</span>
          </motion.h2>
          <motion.p variants={fadeUpVariants} className="mt-8 max-w-2xl font-mono text-sm leading-relaxed text-white/70 sm:text-base md:text-lg">
            Whether you're building the next generation of physical products or need to scale your device data pipelines to the edge, I'm ready to collaborate.
          </motion.p>
        </motion.div>

        {/* Center Lottie and Cards */}
        <div className="flex w-full flex-col items-center gap-12">

          {/* Lottie Animation Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
            className="relative flex w-full max-w-[240px] sm:max-w-[280px] justify-center"
          >
            <div className="relative w-full drop-shadow-2xl">
              <Lottie 
                animationData={contactAnimation} 
                loop={true} 
                className="w-full h-full opacity-90"
              />
            </div>
            
            {/* Symmetrical Decorative Elements */}
            <div className="absolute -left-8 top-1/2 -z-10 h-[30rem] w-[30rem] -translate-y-1/2 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(37,99,235,0.1),transparent_100%)]" />
            <div className="absolute -right-8 top-1/2 -z-10 h-[30rem] w-[30rem] -translate-y-1/2 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(5,150,105,0.1),transparent_100%)]" />
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
              <MagicContactCard key={link.name} link={link} />
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