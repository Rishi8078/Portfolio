import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useTheme } from '../contexts/ThemeContext';
import resume from '../assets/resume.pdf';
import { motion, AnimatePresence } from 'framer-motion';

const sections = ['intro', 'work', 'values', 'background', 'about', 'blog', 'contact'] as const;

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('intro');
  const observer = useRef<IntersectionObserver | null>(null);
  const { } = useTheme();

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
            className="lg:hidden fixed top-0 left-0 right-0 h-screen z-[100] bg-cream dark:bg-dark-bg"
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
                    className={`block font-body text-lg font-medium tracking-wide leading-none py-2 flex items-center gap-3 transition-colors ${isActive(sec) ? 'text-accent dark:text-dark-accent' : 'text-ink/60 dark:text-dark-text/60 hover:text-ink dark:hover:text-dark-text'
                      }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {isActive(sec) && (
                      <span className="w-1.5 h-1.5 rounded-full bg-accent dark:bg-dark-accent inline-block" />
                    )}
                    <span>{sec.charAt(0).toUpperCase() + sec.slice(1)}</span>
                  </motion.a>
                ))}
                <div className="pt-6 mt-4 w-full border-t border-card-border dark:border-dark-border">
                  <a
                    href={resume}
                    download
                    onClick={() => setIsMenuOpen(false)}
                    className="soft-btn-accent inline-block"
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
          <div className={`mx-auto flex max-w-6xl items-center justify-between rounded-full border px-4 py-3 transition-all ${isScrolled ? 'border-[#4d3833]/15 bg-[#f2efe8]/90 shadow-soft backdrop-blur dark:border-[#cbd5e1]/10 dark:bg-[#172033]/90' : 'border-transparent bg-transparent'} `}>
            <a
              href="#intro"
              className="font-mono text-sm font-bold uppercase tracking-[0.14em] text-[#4d3833] dark:text-[#f8fafc]"
            >
              Rishib
            </a>
            <div className="flex items-center gap-5">
              {sections.map(sec => (
                <a
                  key={sec}
                  href={`#${sec}`}
                  className={`text-sm font-medium tracking-wide transition-colors ${isActive(sec) ? 'text-[#3b2b29] dark:text-[#f8fafc]' : 'text-[#4d3833]/55 hover:text-[#3b2b29] dark:text-[#cbd5e1]/70 dark:hover:text-[#f8fafc]'
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
                className="rounded-full bg-[#3b2b29] px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[#f6f1e8] transition hover:bg-[#2f2321] dark:bg-[#f8fafc] dark:text-[#172033] dark:hover:bg-[#e2e8f0]"
              >
                Resume
              </a>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Top Bar */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="lg:hidden fixed top-0 left-0 right-0 z-[101] flex items-center justify-between px-5 py-4"
      >
        <a
          href="#intro"
          className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-[#4d3833] dark:text-[#f8fafc]"
        >
          Rishib
        </a>
        <div className="flex items-center space-x-3">
          <ThemeToggle />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className="soft-btn p-2"
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.div>
    </>
  );
}