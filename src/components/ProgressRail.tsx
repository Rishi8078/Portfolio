import { useEffect, useState } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { useActiveSection } from '../context/ActiveSectionContext';
import { EASE_OUT } from '../lib/motion';

const chapters = [
  { id: 'intro', label: 'Intro' },
  { id: 'work', label: 'Work' },
  { id: 'values', label: 'Values' },
  { id: 'background', label: 'Background' },
  { id: 'about', label: 'About' },
  { id: 'blog', label: 'Blog' },
  { id: 'hobbies', label: 'Hobbies' },
  { id: 'contact', label: 'Contact' },
] as const;

const evenPositions = chapters.map((_, i) => i / (chapters.length - 1));

export default function ProgressRail() {
  const activeSection = useActiveSection();
  const { scrollYProgress } = useScroll();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  /* Dots must sit at the scroll fraction where each section actually starts —
     sections vary wildly in height (Hero alone is 500vh), so evenly-spaced
     dots would drift out of sync with the fill line driven by real
     scrollYProgress. Falls back to even spacing until measured. */
  const [positions, setPositions] = useState<number[]>(evenPositions);

  useEffect(() => {
    function measure() {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      setPositions(
        chapters.map((chapter) => {
          const el = document.getElementById(chapter.id);
          return el ? Math.min(el.offsetTop / scrollable, 1) : 0;
        })
      );
    }
    measure();
    window.addEventListener('resize', measure);
    window.addEventListener('load', measure);
    return () => {
      window.removeEventListener('resize', measure);
      window.removeEventListener('load', measure);
    };
  }, []);

  const scrollToChapter = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      aria-label="Section progress"
      className="fixed right-10 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
    >
      <div className="relative h-64 w-px bg-white/10">
        <motion.div
          className="absolute left-0 top-0 w-px origin-top bg-gradient-to-b from-[#60A5FA] to-[#A78BFA]"
          style={{ scaleY: scrollYProgress, height: '100%' }}
        />
        {chapters.map((chapter, index) => {
          const isActive = chapter.id === activeSection;
          const isHovered = hoveredId === chapter.id;
          const top = `${positions[index] * 100}%`;
          return (
            /* Zero-height anchor at the exact track position — both the dot
               and its label center themselves on this same point via
               top-0 -translate-y-1/2, instead of one reading a flow-derived
               box height the other doesn't share. */
            <div key={chapter.id} className="absolute left-1/2 h-0 w-0" style={{ top }}>
              <AnimatePresence>
                {(isActive || isHovered) && (
                  <motion.span
                    initial={{ opacity: 0, x: 6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 6 }}
                    transition={{ duration: 0.25, ease: EASE_OUT }}
                    className={`absolute right-full top-0 mr-4 -translate-y-1/2 whitespace-nowrap font-mono text-[0.65rem] uppercase tracking-[0.2em] ${isHovered ? 'text-white/80' : 'text-white/50'}`}
                  >
                    {chapter.label}
                  </motion.span>
                )}
              </AnimatePresence>

              <button
                type="button"
                onClick={() => scrollToChapter(chapter.id)}
                onMouseEnter={() => setHoveredId(chapter.id)}
                onMouseLeave={() => setHoveredId(null)}
                onFocus={() => setHoveredId(chapter.id)}
                onBlur={() => setHoveredId(null)}
                aria-label={`Go to ${chapter.label}`}
                aria-current={isActive ? 'true' : undefined}
                className="absolute left-0 top-0 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
              >
                <motion.span
                  animate={{
                    scale: isActive ? 1.6 : isHovered ? 1.3 : 1,
                    backgroundColor: isActive
                      ? 'rgba(167,139,250,0.95)'
                      : isHovered
                        ? 'rgba(255,255,255,0.6)'
                        : 'rgba(255,255,255,0.25)',
                  }}
                  transition={{ duration: 0.2, ease: EASE_OUT }}
                  className="block h-1.5 w-1.5 rounded-full"
                />
              </button>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
