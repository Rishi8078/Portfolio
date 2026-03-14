import { useState, useEffect, useLayoutEffect, Suspense, lazy, useRef } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Loading } from './components/Loading';
import { motion, AnimatePresence } from 'framer-motion';
import Fireflies from './components/Fireflies';

const Navigation = lazy(() => import('./components/Navigation'));
const Hero = lazy(() => import('./components/Hero'));
const Work = lazy(() => import('./components/Work'));
const Value = lazy(() => import('./components/Value'));
const Background = lazy(() => import('./components/Background'));
const About = lazy(() => import('./components/About'));
const Blog = lazy(() => import('./components/Blog'));
const Contact = lazy(() => import('./components/Contact'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const BlogArchivePage = lazy(() => import('./pages/BlogArchivePage'));

function HomeSection() {
  return (
    <main>
      <Hero />
      <Work />
      <Value />
      <Background />
      <About />
      <Blog />
      <Contact />
    </main>
  );
}

function AppContent() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const scrollPositionRef = useRef(0);

  useLayoutEffect(() => {
    if (isHome) {
      const scrollTarget = location.state?.scrollTo;
      if (scrollTarget) {
        requestAnimationFrame(() => {
          const el = document.getElementById(scrollTarget);
          if (el) el.scrollIntoView({ behavior: 'instant' });
        });
      } else if (scrollPositionRef.current > 0) {
        window.scrollTo(0, scrollPositionRef.current);
      }
    } else {
      scrollPositionRef.current = window.scrollY;
      window.scrollTo(0, 0);
    }
  }, [location.key, isHome]);

  return (
    <>
      <Navigation />
      <div style={{ display: isHome ? 'block' : 'none' }}>
        <HomeSection />
      </div>
      {!isHome && (
        <Routes>
          <Route path="/post/:id" element={<BlogPost />} />
          <Route path="/blog" element={<BlogArchivePage />} />
        </Routes>
      )}
    </>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    if (!isLoading) setHasLoadedOnce(true);
  }, [isLoading]);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#040810] text-white selection:bg-white/30 transition-colors relative">
        <Fireflies count={35} />
        <AnimatePresence>
          {isLoading && !hasLoadedOnce && (
            <Loading setIsLoading={setIsLoading} />
          )}
        </AnimatePresence>

        {(!isLoading || hasLoadedOnce) && (
          <Suspense fallback={null}>
            <motion.div
              key="app-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
              className="pb-safe-bottom"
            >
              <AppContent />
            </motion.div>
          </Suspense>
        )}
      </div>
    </BrowserRouter>
  );
}
