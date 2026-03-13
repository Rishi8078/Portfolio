import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import resume from '../assets/resume.pdf';
import { motion, AnimatePresence } from 'framer-motion';

const sections = ['intro', 'work', 'values', 'background', 'about', 'blog', 'contact'] as const;

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('intro');
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const options = { root: null, rootMargin: '-50% 0px -50% 0px', threshold: 0 };
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => entry.isIntersecting && setActiveSection(entry.target.id));
    }, options);
    const secs = document.querySelectorAll('section[id]');
    secs.forEach(sec => observer.current?.observe(sec));
    return () => secs.forEach(sec => observer.current?.unobserve(sec));
  }, []);

  const isActive = (section: string) => activeSection === section;

  return (
    <>
      {/* Mobile/Tablet Menu */}
      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed top-0 left-0 right-0 h-screen z-[100] bg-[#040810]/95 backdrop-blur-xl"
          >
            <motion.div className="h-full flex flex-col justify-center items-start px-8 pb-8">
              <div className="space-y-6 w-full">
                {sections.map(sec => (
                  <motion.a
                    key={sec}
                    href={`#${sec}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className={`block font-body text-lg font-medium tracking-wide leading-none py-2 flex items-center gap-3 transition-colors ${isActive(sec) ? 'text-white' : 'text-white/40 hover:text-white/80'
                      }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {isActive(sec) && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white/80 inline-block" />
                    )}
                    <span>{sec.charAt(0).toUpperCase() + sec.slice(1)}</span>
                  </motion.a>
                ))}
                <div className="pt-6 mt-4 w-full border-t border-white/10">
                  <a
                    href={resume}
                    download
                    onClick={() => setIsMenuOpen(false)}
                    className="inline-block rounded-full border border-white/10 bg-white/[0.03] px-6 py-2.5 text-sm font-semibold uppercase tracking-[0.08em] text-white/80 transition-all hover:bg-white/[0.08] hover:text-white"
                  >
                    Resume ↓
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Navigation */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="fixed left-0 top-0 z-[101] hidden w-full lg:block"
      >
        <div className="px-8 pt-6">
          <div className={`mx-auto flex max-w-6xl items-center justify-between rounded-full border px-4 py-3 transition-all duration-500 ${isScrolled ? 'border-white/10 bg-white/[0.02] backdrop-blur-md shadow-[0_0_30px_-10px_rgba(255,255,255,0.05)]' : 'border-transparent bg-transparent'} `}>
            <a
              href="#intro"
              className="font-mono text-sm font-bold uppercase tracking-[0.14em] text-white/90 transition-colors hover:text-white"
            >
              Rishib
            </a>
            <div className="flex items-center gap-5">
              {sections.map(sec => (
                <a
                  key={sec}
                  href={`#${sec}`}
                  className={`text-sm font-medium tracking-wide transition-colors duration-300 ${isActive(sec) ? 'text-white' : 'text-white/40 hover:text-white/90'
                    }`}
                >
                  {sec.charAt(0).toUpperCase() + sec.slice(1)}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <a
                href={resume}
                download
                className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-white/80 transition-all hover:border-white/30 hover:bg-white/[0.08] hover:text-white"
              >
                Resume
              </a>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Top Bar */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`lg:hidden fixed top-0 left-0 right-0 z-[101] flex items-center justify-between px-5 py-4 transition-all duration-500 ${isScrolled || isMenuOpen ? 'border-b border-white/10 bg-[#040810]/70 backdrop-blur-md' : 'bg-transparent'}`}
      >
        <a
          href="#intro"
          className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-white/90"
        >
          Rishib
        </a>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className="rounded-full border border-white/10 bg-white/[0.02] p-2 text-white/70 transition-colors hover:bg-white/[0.08] hover:text-white"
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.div>
    </>
  );
}