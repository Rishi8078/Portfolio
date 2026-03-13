import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Loading({ setIsLoading }: { setIsLoading: (loading: boolean) => void }) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const exitTimer = setTimeout(() => {
      setExiting(true);
    }, 1800);

    const unmountTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2800);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(unmountTimer);
    };
  }, [setIsLoading]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#040810] overflow-hidden"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            className="text-center"
          >
            <h1 className="text-4xl font-light tracking-tight text-white md:text-6xl lg:text-7xl">
              Rishib Iyapady
            </h1>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
              className="mt-5 flex items-center justify-center gap-4"
            >
              <div className="h-[1px] w-12 bg-white/20" />
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/50">
                Hardware &amp; Software
              </span>
              <div className="h-[1px] w-12 bg-white/20" />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
