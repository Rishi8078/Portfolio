import { useState, useEffect, Suspense, lazy } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { Loading } from './components/Loading';
import { motion, AnimatePresence } from 'framer-motion';

const Navigation = lazy(() => import('./components/Navigation'));
const Hero = lazy(() => import('./components/Hero'));
const Work = lazy(() => import('./components/Work'));
const Value = lazy(() => import('./components/Value'));
const Background = lazy(() => import('./components/Background'));
const About = lazy(() => import('./components/About'));
const Blog = lazy(() => import('./components/Blog'));
const Contact = lazy(() => import('./components/Contact'));

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

  // once we flip loading → false, mark that we've shown it
  useEffect(() => {
    if (!isLoading) setHasLoadedOnce(true);
  }, [isLoading]);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-cream dark:bg-dark-bg transition-colors relative z-0">
        <AnimatePresence mode="wait">
          {isLoading && !hasLoadedOnce && (
            <Loading setIsLoading={setIsLoading} />
          )}
        </AnimatePresence>

        {/* main content only after first load completes */}
        {(!isLoading || hasLoadedOnce) && (
          <Suspense fallback={null}>
            <motion.div
              key="app-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="pb-safe-bottom"
            >
              <Navigation />
              <main>
                <Hero />
                <Work />
                <Value />
                <Background />
                <About />
                <Blog />
                <Contact />
              </main>
            </motion.div>
          </Suspense>
        )}
      </div>
    </ThemeProvider>
  );
}