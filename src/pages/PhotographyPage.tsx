import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLayoutEffect } from 'react';
import { galleryPhotos } from '../data/photos';

export default function PhotographyPage() {
    // Scroll to top on mount
    useLayoutEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, []);

    return (
        <div className="min-h-screen bg-[#040810] relative overflow-hidden pt-32 pb-24">
            {/* Background Grid & Glow */}
            <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
                <div
                    className="absolute top-1/4 h-[40rem] w-[40rem] rounded-full bg-blue-900/10 blur-[120px]"
                    style={{ animation: 'orb-pulse 10s ease-in-out infinite' }}
                />
            </div>
            <div
                className="pointer-events-none absolute inset-0 z-0 opacity-[0.04]"
                style={{
                    backgroundImage: 'linear-gradient(to right, rgb(117, 113, 113) 1px, transparent 1px), linear-gradient(to bottom, rgb(117, 113, 113) 1px, transparent .1px)',
                    backgroundSize: '40px 40px',
                }}
            />

            <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-16"
            >
                {/* Header Section */}
                <div className="flex flex-col gap-8 mb-16 max-w-4xl mx-auto">
                    <Link
                        to="/"
                        className="group flex w-11 h-11 items-center justify-center rounded-full bg-white/[0.03] border border-white/20 text-white/60 transition duration-200 hover:bg-white/10 hover:text-white hover:border-white/20 hover:scale-105"
                        aria-label="Back to home"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="transition-transform duration-500 group-hover:-translate-x-0.5"
                        >
                            <path d="M19 12H5" />
                            <path d="M12 19l-7-7 7-7" />
                        </svg>
                    </Link>

                    <div className="flex flex-col gap-4">
                        <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md self-start">
                            <p className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-white/70">
                                Visuals
                            </p>
                        </div>
                        <h2 className="font-pixel text-4xl sm:text-5xl uppercase tracking-tight text-white/90">
                            Photo<span className="text-white/60">graphy</span>
                        </h2>
                        <p className="max-w-xl text-white/70 text-[1.05rem] leading-relaxed mt-2">
                            Captured moments, architectural studies, and experiments with light and shadow.
                        </p>
                    </div>
                </div>

                {/* Masonry Layout Grid */}
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
                    {galleryPhotos.map((photo, index) => (
                        <motion.div
                            key={photo.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.04, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className="group relative overflow-hidden rounded-2xl bg-white/[0.02] border border-white/10 break-inside-avoid"
                        >
                            <div className="relative w-full overflow-hidden">
                                <img
                                    src={photo.url}
                                    alt={photo.caption}
                                    loading="lazy"
                                    className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                                />

                                {/* Dark Vignette Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#040810]/80 via-transparent to-transparent [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Caption on hover */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 [@media(hover:hover)]:translate-y-4 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-100 transition duration-500">
                                    <span className="font-mono text-xs uppercase tracking-widest text-white/80">
                                        {photo.caption}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
