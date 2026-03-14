import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLayoutEffect } from 'react';

// Example structured data for tracks
const tracks = [
    { id: 1, title: 'Midnight Echoes', duration: '3:42', plays: '124K' },
    { id: 2, title: 'Neon Horizon', duration: '4:15', plays: '98K' },
    { id: 3, title: 'Lost in the Grid', duration: '2:58', plays: '210K' },
    { id: 4, title: 'Synthetic Dreams', duration: '5:01', plays: '85K' },
    { id: 5, title: 'Vapor Wave', duration: '3:20', plays: '150K' },
];

export default function MusicPage() {
    // Scroll to top on mount
    useLayoutEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, []);

    return (
        <div className="min-h-screen bg-[#040810] relative overflow-hidden pt-32 pb-24">
            {/* Background Glow */}
            <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
                <div
                    className="absolute top-1/4 h-[40rem] w-[40rem] rounded-full bg-purple-900/10 blur-[150px]"
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
                className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-8 lg:px-16"
            >
                {/* Navigation */}
                <div className="mb-12">
                    <Link
                        to="/"
                        className="group flex w-10 h-10 items-center justify-center rounded-full bg-white/[0.03] border border-white/10 text-white/40 transition-all duration-500 hover:bg-white/10 hover:text-white hover:border-white/20 hover:scale-105"
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
                </div>

                {/* Hero Area */}
                <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start mb-20">
                    {/* Album Art / Singer Profile */}
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="w-full max-w-[300px] shrink-0"
                    >
                        <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-2xl">
                            {/* Replace with actual band/singer photo */}
                            <img
                                src="https://images.unsplash.com/photo-1598387181032-a3103a2db5b3?q=80&w=2076&auto=format&fit=crop"
                                alt="Band Profile"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        </div>
                    </motion.div>

                    {/* Details */}
                    <div className="flex flex-col gap-6 pt-4">
                        <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md self-start">
                            <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.3em] text-white/70">
                                Main Singer / Vocals
                            </p>
                        </div>
                        <div>
                            <h2 className="font-pixel text-4xl sm:text-5xl uppercase tracking-tight text-white/90">
                                The <span className="text-white/40">Sound</span>
                            </h2>
                            <p className="max-w-xl text-white/50 text-[1.05rem] leading-relaxed mt-4">
                                When I'm not writing code, I'm writing melodies. I am the lead singer for an indie-electronic project. Here's a selection of our latest tracks and upcoming releases.
                            </p>
                        </div>

                        {/* Quick Actions */}
                        <div className="flex items-center gap-4 mt-4">
                            <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="translate-x-0.5">
                                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                </svg>
                                Listen Now
                            </button>
                            <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.05] border border-white/10 text-white font-semibold hover:bg-white/10 transition-colors">
                                View on Spotify
                            </button>
                        </div>
                    </div>
                </div>

                {/* Tracklist */}
                <div className="flex flex-col gap-6">
                    <h3 className="font-display text-2xl font-semibold tracking-tight text-white/80 border-b border-white/10 pb-4">
                        Popular Tracks
                    </h3>

                    <div className="flex flex-col">
                        {tracks.map((track, index) => (
                            <div
                                key={track.id}
                                className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl hover:bg-white/[0.03] border border-transparent hover:border-white/5 transition-all duration-300 gap-4"
                            >
                                <div className="flex items-center gap-4">
                                    <span className="font-mono text-xs text-white/30 w-6 text-center group-hover:hidden">
                                        {index + 1}
                                    </span>
                                    <button className="hidden group-hover:flex items-center justify-center w-6 h-6 text-white text-xs">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                        </svg>
                                    </button>
                                    <span className="font-display text-lg text-white/80 group-hover:text-white transition-colors">
                                        {track.title}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between sm:justify-end gap-12 sm:gap-20 sm:w-[250px] pl-10 sm:pl-0">
                                    <span className="font-mono text-[0.75rem] text-white/40 group-hover:text-white/60 transition-colors">
                                        {track.plays}
                                    </span>
                                    <span className="font-mono text-[0.7rem] text-white/40 group-hover:text-white/60 transition-colors">
                                        {track.duration}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
