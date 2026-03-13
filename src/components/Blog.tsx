import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { posts as featuredPosts } from '../data/posts';

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const ImageBlock = ({ className = "", src }: { className?: string; src?: string }) => (
  <div className={`relative w-full h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-colors duration-500 group-hover:border-white/20 group-hover:bg-white/[0.05] ${className}`}>
    {src ? (
      <img src={src} alt="Post cover" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
    ) : (
      <>
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent backdrop-blur-sm opacity-50" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity duration-500"
          style={{
            backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />
        <div className="absolute inset-0 grid place-items-center opacity-20 transition-opacity duration-300 group-hover:opacity-40">
          <svg className="w-8 h-8 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      </>
    )}
  </div>
);

// Content mapped from our centralized data file

export default function Blog() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // 2 slides: Slide 0 (Hero) & Slide 1 (Grid)
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 2);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const handleDragEnd = (e: any, { offset, velocity }: any) => {
    const swipe = swipePower(offset.x, velocity.x);

    if (swipe < -swipeConfidenceThreshold) {
      // swiped left
      setCurrentSlide(1);
    } else if (swipe > swipeConfidenceThreshold) {
      // swiped right
      setCurrentSlide(0);
    }
  };

  return (
    <section
      id="blog"
      className="relative w-full overflow-hidden bg-[#040810] py-24 sm:py-32"
      aria-labelledby="blog-title"
    >
      {/* Background Gradients with Glow */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#040810_120%)]" />

        {/* Dynamic Glow */}
        <motion.div
          animate={{
            opacity: [0.15, 0.35, 0.15],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="pointer-events-none absolute top-1/3 h-[45rem] w-[45rem] rounded-full bg-emerald-900/10 blur-[140px]"
        />
        <motion.div
          animate={{
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="pointer-events-none absolute bottom-1/4 left-1/4 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-blue-900/10 blur-[150px]"
        />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-56 bg-gradient-to-t from-[#040810] via-[#040810]/90 to-transparent" />
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

      <div className="relative z-20 mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16">

        {/* Header Section */}
        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20 mx-auto flex w-full max-w-4xl flex-col items-center text-center"
        >
          <motion.div variants={fadeUpVariants} className="mb-8 rounded-full border border-white/10 bg-white/5 px-6 py-2.5 backdrop-blur-md">
            <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.3em] text-white/70">
              Chapter 05 · Writings
            </p>
          </motion.div>
          <motion.h2 variants={fadeUpVariants} id="blog-title" className="section-heading-glow font-pixel text-[3rem] uppercase leading-[0.85] tracking-tight text-white sm:text-[4.5rem] md:text-[6rem] lg:text-[7.5rem]">
            My
            <br />
            <span className="text-white/40">Thoughts</span>
          </motion.h2>
          <motion.p variants={fadeUpVariants} className="mt-8 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg md:text-xl">
            Engineering logs, architectural decisions, and essays on <br className="hidden sm:block" />  building embedded edge systems.
          </motion.p>
        </motion.div>

        {/* CAROUSEL SECTION */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUpVariants}
          className="relative w-full min-h-[1050px] sm:min-h-[750px] lg:min-h-[600px] mt-8 flex flex-col"
        >
          <AnimatePresence mode="wait">
            {currentSlide === 0 ? (
              <motion.div
                key="slide-0"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                className="w-full h-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start lg:items-stretch flex-1 cursor-grab active:cursor-grabbing"
              >
                <Link to={`/post/${featuredPosts[0].id}`} className="lg:col-span-6 flex flex-col justify-between h-full py-4 lg:py-4 z-10 w-full min-h-[400px] cursor-pointer group">
                  <div className="flex flex-wrap items-center gap-3 text-[0.65rem] font-mono font-bold uppercase tracking-widest text-white/50">
                    <span>{featuredPosts[0].date}</span>
                    <span className="text-white/30">/</span>
                    <span>By {featuredPosts[0].author}</span>
                    <span className="text-white/30">/</span>
                    <span className="rounded-full border border-white/20 bg-white/5 px-2 py-0.5 text-white">{featuredPosts[0].category}</span>
                  </div>

                  <h2 className="font-display text-4xl sm:text-5xl lg:text-[5rem] font-bold leading-[1.05] tracking-tight text-white uppercase text-balance group-hover:text-white/90 transition-colors">
                    {featuredPosts[0].title}
                  </h2>

                  <p className="mt-4 font-mono text-sm leading-relaxed text-white/60 max-w-xl pr-6 font-medium">
                    {featuredPosts[0].description}
                  </p>
                </Link>

                <Link to={`/post/${featuredPosts[0].id}`} className="lg:col-span-6 w-full h-[400px] lg:h-[550px] z-0 cursor-pointer block group">
                  <ImageBlock className="w-full h-full object-cover" src={featuredPosts[0]?.image} />
                </Link>
              </motion.div>
            ) : (
              <motion.div
                key="slide-1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                className="w-full h-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 flex-1 mt-4 lg:mt-0 cursor-grab active:cursor-grabbing"
              >
                {/* Left: 1 Large Post */}
                <Link to={`/post/${featuredPosts[1].id}`} className="lg:col-span-8 flex flex-col gap-5 h-[400px] lg:h-[550px] group cursor-pointer w-full">
                  <div className="flex-1 w-full relative">
                    <ImageBlock className="absolute inset-0 w-full h-full object-cover" src={featuredPosts[1]?.image} />
                  </div>
                  <div className="flex flex-col gap-3 shrink-0">
                    <div className="flex items-center gap-3 text-[0.65rem] font-mono font-bold uppercase tracking-widest text-white/50">
                      <span>{featuredPosts[1].date}</span>
                      <span className="text-white/20">/</span>
                      <span className="rounded-full border border-white/15 bg-transparent px-2 py-0.5">{featuredPosts[1].category}</span>
                    </div>
                    <h3 className="font-display text-2xl lg:text-4xl font-bold tracking-tight text-white uppercase leading-[1.05] group-hover:text-white/80 transition-colors">
                      {featuredPosts[1].title}
                    </h3>
                  </div>
                </Link>

                {/* Right: 2 Smaller Posts */}
                <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-8 h-auto lg:h-[550px]">
                  <Link to={`/post/${featuredPosts[2].id}`} className="flex-1 flex flex-col gap-4 group cursor-pointer h-[280px] lg:h-0 w-full">
                    <div className="flex-1 w-full relative">
                      <ImageBlock className="absolute inset-0 w-full h-full object-cover" src={featuredPosts[2]?.image} />
                    </div>
                    <div className="flex flex-col gap-2 shrink-0 lg:pb-2">
                      <div className="flex items-center gap-3 text-[0.6rem] font-mono font-bold uppercase tracking-widest text-white/50">
                        <span>{featuredPosts[2].date}</span>
                        <span className="text-white/20">/</span>
                        <span className="rounded-full border border-white/15 bg-transparent px-2 py-0.5">{featuredPosts[2].category}</span>
                      </div>
                      <h3 className="font-display text-lg lg:text-xl font-bold tracking-tight text-white uppercase leading-tight group-hover:text-white/80 transition-colors">
                        {featuredPosts[2].title}
                      </h3>
                    </div>
                  </Link>

                  <Link to={`/post/${featuredPosts[3].id}`} className="flex-1 flex flex-col gap-4 group cursor-pointer h-[280px] lg:h-0 w-full">
                    <div className="flex-1 w-full relative">
                      <ImageBlock className="absolute inset-0 w-full h-full object-cover" src={featuredPosts[3]?.image} />
                    </div>
                    <div className="flex flex-col gap-2 shrink-0">
                      <div className="flex items-center gap-3 text-[0.6rem] font-mono font-bold uppercase tracking-widest text-white/50">
                        <span>{featuredPosts[3].date}</span>
                        <span className="text-white/20">/</span>
                        <span className="rounded-full border border-white/15 bg-transparent px-2 py-0.5">{featuredPosts[3].category}</span>
                      </div>
                      <h3 className="font-display text-lg lg:text-xl font-bold tracking-tight text-white uppercase leading-tight group-hover:text-white/80 transition-colors">
                        {featuredPosts[3].title}
                      </h3>
                    </div>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Carousel Controls & View All */}
          <div className="mt-12 w-full flex flex-col sm:flex-row items-center justify-between gap-6 z-20 pb-4 border-t border-white/10 pt-6">
            <div className="flex items-center gap-3">
              {[0, 1].map((i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentSlide(i);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/20 hover:bg-white/40'}`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <a href="#" className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.1em] text-white/80 hover:text-white transition-colors group">
              View All Posts
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}