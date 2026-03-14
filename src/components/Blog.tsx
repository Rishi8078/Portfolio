import { motion } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import useEmblaCarousel from 'embla-carousel-react';
import { posts as featuredPosts } from '../data/posts';

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const ImageBlock = ({ className = "", src, isActive }: { className?: string; src?: string, isActive?: boolean }) => (
  <div className={`relative w-full h-full overflow-hidden rounded-xl bg-white/[0.02] border border-white/10 transition-colors duration-300 ${isActive ? 'group-hover:border-white/20' : ''} ${className}`}>
    {src ? (
      <img src={src} alt="Post cover" className={`w-full h-full object-cover transition-transform duration-700 ${isActive ? 'group-hover:scale-[1.02]' : ''}`} />
    ) : (
      <div className="absolute inset-0 bg-white/5" />
    )}
    {/* Dark Overlay for inactive slides */}
    {!isActive && <div className="absolute inset-0 bg-black/40 transition-opacity duration-500" />}
  </div>
);

// Content mapped from our centralized data file

const PostMetadata = ({ post }: { post: any }) => (
  <div className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-widest text-white/40">
    <span>{post.date}</span>
    {post.category && (
      <>
        <span className="h-1 w-1 rounded-full bg-white/20" />
        <span className="text-white/70">{post.category}</span>
      </>
    )}
  </div>
);

export default function Blog() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentSlide(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  return (
    <section
      id="blog"
      className="relative w-full bg-[#040810] py-24 sm:py-32"
      aria-labelledby="blog-title"
    >
      {/* Minimal Background (matching Work section) */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1d2b45]/10 via-[#040810]/80 to-[#040810]" />
      </div>
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(to right, rgb(117, 113, 113) 1px, transparent 1px), linear-gradient(to bottom, rgb(117, 113, 113) 1px, transparent .1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-20 mx-auto w-full max-w-7xl px-6 sm:px-10 lg:px-16">

        {/* Header Section */}
        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 mx-auto flex w-full max-w-4xl flex-col items-center text-center"
        >

          <motion.div variants={fadeUpVariants} className="mb-6 rounded-full border border-white/10 bg-white/5 px-6 py-2 pb-2.5 font-mono text-[0.7rem] font-bold uppercase tracking-[0.2em] text-white/50 backdrop-blur-md">
            Chapter 05 · Writings
          </motion.div>
          <motion.h2 variants={fadeUpVariants} id="blog-title" className="section-heading-glow font-pixel text-[3rem] uppercase leading-[0.85] tracking-tight text-white sm:text-[4.5rem] md:text-[6rem] lg:text-[7.5rem]">
            My <span className="text-white/40">Thoughts</span>
          </motion.h2>
          <motion.p variants={fadeUpVariants} className="mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-white/60 sm:text-[1.15rem]">
            Engineering logs, architectural decisions, and essays on building embedded edge systems.
          </motion.p>
        </motion.div>

        {/* CAROUSEL SECTION */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUpVariants}
          className="relative w-full min-h-[900px] sm:min-h-[650px] lg:min-h-[500px] mt-4 flex flex-col"
        >
          {/* Symmetrical Decorative Elements */}
          <div 
            className="absolute -left-32 top-1/2 -z-10 h-[40rem] w-[40rem] -translate-y-1/2 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(5,150,105,0.1),transparent_100%)]"
            style={{ animation: 'orb-glow-no-translate 5s ease-in-out infinite' }}
          />
          <div 
            className="absolute -right-32 top-1/2 -z-10 h-[40rem] w-[40rem] -translate-y-1/2 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(37,99,235,0.1),transparent_100%)]"
            style={{ animation: 'orb-glow-no-translate 6s ease-in-out 1s infinite' }}
          />
          <div className="overflow-hidden flex-1 w-full" ref={emblaRef}>
            <div className="flex h-full touch-pan-y">
              {featuredPosts.map((post, index) => (
                <div 
                  key={post.id} 
                  className={`min-w-0 shrink-0 grow-0 basis-full transition-all duration-500 select-none ${
                    index === currentSlide ? 'opacity-100 blur-0 scale-100' : 'opacity-30 blur-[4px] scale-[0.95]'
                  }`}
                >
                  <div className="w-full h-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start lg:items-stretch cursor-grab active:cursor-grabbing select-none">
                    <Link to={`/post/${post.id}`} className="lg:col-span-6 flex flex-col justify-center gap-6 h-full py-4 z-10 w-full min-h-[250px] cursor-pointer group">
                      <PostMetadata post={post} />

                      <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight text-white/90 group-hover:text-white transition-colors">
                        {post.title}
                      </h2>

                      <p className="text-base leading-relaxed text-white/50 max-w-xl pr-6">
                        {post.description}
                      </p>
                      
                      <div className="mt-4 flex items-center text-xs font-mono tracking-widest text-white/40 transition-colors uppercase group-hover:text-white/90">
                        <span className="mr-3 font-semibold">Read Article</span>
                        <span className="transition-transform group-hover:translate-x-1">→</span>
                      </div>
                    </Link>

                    <Link to={`/post/${post.id}`} className="lg:col-span-6 w-full h-[300px] lg:h-[450px] z-0 cursor-pointer block group">
                      <ImageBlock src={post.image} isActive={index === currentSlide} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Controls & View All */}
          <div className="mt-12 w-full flex flex-col sm:flex-row items-center justify-between gap-6 z-20 pb-4 border-t border-white/5 pt-6">
            <div className="flex items-center gap-2">
              {featuredPosts.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    scrollTo(i);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-6 bg-white/80' : 'w-2 bg-white/20 hover:bg-white/40'}`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <Link 
              to="/blog"
              className="flex items-center gap-2 font-mono text-xs tracking-widest text-white/40 hover:text-white/90 transition-colors uppercase group"
            >
              <span>View All Posts</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}