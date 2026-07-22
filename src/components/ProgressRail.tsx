import { useEffect, useState } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { useActiveSection } from '../context/ActiveSectionContext';
import { EASE_OUT } from '../lib/motion';

const chapters = [
  { id: 'work', label: 'Work', num: '02' },
  { id: 'values', label: 'Values', num: '03' },
  { id: 'background', label: 'Background', num: '04' },
  { id: 'about', label: 'About', num: '05' },
  { id: 'blog', label: 'Blog', num: '06' },
  { id: 'hobbies', label: 'Hobbies', num: '07' },
  { id: 'contact', label: 'Contact', num: '08' },
] as const;

export default function ProgressRail() {
  const activeSection = useActiveSection();
  const { scrollY } = useScroll();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [sectionProgresses, setSectionProgresses] = useState<Record<string, number>>({});

  const isVisible = activeSection !== 'intro';

  useEffect(() => {
    function calculateSectionProgress() {
      const currentScroll = window.scrollY;
      const windowHeight = window.innerHeight;
      const progressMap: Record<string, number> = {};

      chapters.forEach((chapter, index) => {
        const el = document.getElementById(chapter.id);
        if (!el) {
          progressMap[chapter.id] = 0;
          return;
        }

        const top = el.offsetTop;
        const height = el.offsetHeight;
        const nextEl = chapters[index + 1] ? document.getElementById(chapters[index + 1].id) : null;
        const end = nextEl ? nextEl.offsetTop : top + height;

        if (currentScroll < top - windowHeight * 0.3) {
          progressMap[chapter.id] = 0;
        } else if (currentScroll >= end - windowHeight * 0.3) {
          progressMap[chapter.id] = 1;
        } else {
          const totalDistance = Math.max(end - top, 1);
          const currentDistance = currentScroll - (top - windowHeight * 0.3);
          progressMap[chapter.id] = Math.min(Math.max(currentDistance / totalDistance, 0), 1);
        }
      });

      setSectionProgresses(progressMap);
    }

    calculateSectionProgress();
    window.addEventListener('scroll', calculateSectionProgress, { passive: true });
    window.addEventListener('resize', calculateSectionProgress, { passive: true });
    return () => {
      window.removeEventListener('scroll', calculateSectionProgress);
      window.removeEventListener('resize', calculateSectionProgress);
    };
  }, []);

  const scrollToChapter = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const activeIndex = chapters.findIndex((c) => c.id === activeSection);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 16 }}
          transition={{ duration: 0.35, ease: EASE_OUT }}
          aria-label="Section progress scrubber"
          className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
        >
          {/* Segmented Scrub Bar Container */}
          <div className="flex flex-col items-end gap-2 py-2">
            {chapters.map((chapter, index) => {
              const isActive = chapter.id === activeSection;
              const isHovered = hoveredId === chapter.id;
              const isPast = activeIndex > index;
              const progress = sectionProgresses[chapter.id] ?? (isPast ? 1 : 0);

              return (
                <div key={chapter.id} className="group relative flex items-center justify-end">
                  {/* Floating Tooltip Label */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0, x: 8, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 6, scale: 0.95 }}
                        transition={{ duration: 0.18, ease: EASE_OUT }}
                        className="pointer-events-none absolute right-full mr-3.5 flex items-center gap-2 whitespace-nowrap rounded-lg border border-white/10 bg-[#040810]/90 px-2.5 py-1 shadow-xl backdrop-blur-md"
                      >
                        <span className="font-mono text-[0.6rem] font-bold text-[#60A5FA]">
                          {chapter.num}
                        </span>
                        <span className="font-mono text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-white/90">
                          {chapter.label}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Segment Bar Button */}
                  <button
                    type="button"
                    onClick={() => scrollToChapter(chapter.id)}
                    onMouseEnter={() => setHoveredId(chapter.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onFocus={() => setHoveredId(chapter.id)}
                    onBlur={() => setHoveredId(null)}
                    aria-label={`Jump to ${chapter.label}`}
                    aria-current={isActive ? 'true' : undefined}
                    className="relative flex h-8 w-6 items-center justify-center focus:outline-none"
                  >
                    {/* Track Segment */}
                    <div
                      className={`relative overflow-hidden rounded-full transition-all duration-300 ${
                        isActive
                          ? 'h-8 w-1.5 bg-white/20 shadow-[0_0_10px_rgba(96,165,250,0.5)] ring-1 ring-[#60A5FA]/40'
                          : isHovered
                            ? 'h-7 w-1.5 bg-white/20'
                            : 'h-6 w-1 bg-white/10'
                      }`}
                    >
                      {/* Fill Progress Bar */}
                      <motion.div
                        className={`absolute bottom-0 left-0 right-0 rounded-full transition-colors duration-300 ${
                          isActive
                            ? 'bg-gradient-to-t from-[#60A5FA] to-white shadow-[0_0_8px_rgba(96,165,250,0.8)]'
                            : isPast
                              ? 'bg-[#60A5FA]/80'
                              : 'bg-transparent'
                        }`}
                        style={{
                          height: `${(isActive ? Math.max(progress, 0.15) : isPast ? 1 : 0) * 100}%`,
                        }}
                        transition={{ duration: 0.1, ease: 'linear' }}
                      />
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

