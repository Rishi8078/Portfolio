import { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
const BlogPost = lazy(() => import('./pages/BlogPost'));

function Home() {
  return (
    <>
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
    </>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

  // once we flip loading → false, mark that we've shown it
  useEffect(() => {
    if (!isLoading) setHasLoadedOnce(true);
  }, [isLoading]);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-[#040810] text-white selection:bg-white/30 transition-colors relative z-0">
          <AnimatePresence>
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
                transition={{ duration: 1.2 }}
                className="pb-safe-bottom"
              >
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/post/:id" element={<BlogPost />} />
                </Routes>
              </motion.div>
            </Suspense>
          )}
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}