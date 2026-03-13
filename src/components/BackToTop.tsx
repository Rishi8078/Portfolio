import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => setVisible(window.scrollY > 800);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    aria-label="Back to top"
                    className="fixed bottom-8 right-8 z-[100] flex h-10 w-10 items-center justify-center rounded-full border border-ink dark:border-ink dark:border-white/10 bg-ink dark:bg-ink dark:bg-white/[0.04] text-ink dark:text-ink dark:text-white/60 backdrop-blur-md transition-all hover:border-ink dark:border-ink dark:border-white/30 hover:bg-ink dark:bg-ink dark:bg-white/[0.1] hover:text-ink dark:text-ink dark:text-white"
                >
                    <ArrowUp size={16} />
                </motion.button>
            )}
        </AnimatePresence>
    );
}
