import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

const ActiveSectionContext = createContext<string>('intro');

export function ActiveSectionProvider({ isHome, children }: { isHome: boolean; children: ReactNode }) {
  const [activeSection, setActiveSection] = useState('intro');

  useEffect(() => {
    if (!isHome) return;
    const options = { root: null, rootMargin: '-50% 0px -50% 0px', threshold: 0 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => entry.isIntersecting && setActiveSection(entry.target.id));
    }, options);
    const secs = document.querySelectorAll('section[id]');
    secs.forEach(sec => observer.observe(sec));
    return () => observer.disconnect();
  }, [isHome]);

  return (
    <ActiveSectionContext.Provider value={activeSection}>
      {children}
    </ActiveSectionContext.Provider>
  );
}

export const useActiveSection = () => useContext(ActiveSectionContext);
