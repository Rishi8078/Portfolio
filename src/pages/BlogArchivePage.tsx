import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { posts as featuredPosts, Post } from '../data/posts';
import { useLayoutEffect } from 'react';

const ImageBlock = ({ className = "", src }: { className?: string; src?: string }) => (
  <div className={`relative w-full h-full overflow-hidden rounded-xl bg-white/[0.02] border border-white/10 transition-colors duration-300 group-hover:border-white/20 ${className}`}>
    {src ? (
      <img src={src} alt="Post cover" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
    ) : (
      <div className="absolute inset-0 bg-white/5" />
    )}
  </div>
);

const PostMetadata = ({ post }: { post: Post }) => (
  <div className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-widest text-white/40">
    <span>{post.date}</span>
    {post.category && (
      <>
        <span className="h-1 w-1 rounded-full bg-white/20" />
        <span className="text-white/70">{post.category}</span>
      </>
    )}
  </div>
);

export default function BlogArchivePage() {
  // Scroll to top on mount
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen bg-[#040810] relative overflow-hidden pt-32 pb-24">
      {/* Background Grid & Glow (matching main site) */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
        <div
          className="absolute top-1/4 h-[30rem] w-[30rem] rounded-full bg-emerald-900/10 blur-[120px]"
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
        className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-8 lg:px-16"
      >
        <Link
          to="/"
          state={{ scrollTo: 'blog' }}
          className="group inline-flex items-center gap-2 font-mono text-xs tracking-widest text-white/40 hover:text-white/90 transition-colors uppercase mb-12"
        >
          <span className="transition-transform group-hover:-translate-x-1">←</span>
          <span>Back home</span>
        </Link>

        {/* Header */}
        <div className="flex flex-col gap-4 mb-16">
          <div className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md self-start">
            <p className="font-mono text-[0.65rem] font-bold uppercase tracking-[0.3em] text-white/70">
              Archive
            </p>
          </div>
          <h2 className="font-pixel text-4xl sm:text-5xl uppercase tracking-tight text-white/90">
            All <span className="text-white/40">Posts</span>
          </h2>
        </div>

        {/* List Content */}
        <div className="flex flex-col gap-4">
          {featuredPosts.map((post) => (
            <Link
              key={post.id}
              to={`/post/${post.id}`}
              state={{ fromArchive: true }}
              className="group flex flex-col sm:flex-row items-start sm:items-center gap-6 p-4 sm:p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300"
            >
              {/* Thumbnail Image */}
              <div className="relative h-[100px] w-[150px] sm:h-[120px] sm:w-[180px] shrink-0 rounded-xl overflow-hidden bg-white/5 border border-white/10">
                {post.image && (
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-80" />
              </div>

              {/* Text Content */}
              <div className="flex flex-col gap-3 flex-1 min-w-0">
                <h3 className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-white/80 group-hover:text-white transition-colors truncate">
                  {post.title}
                </h3>
                <p className="text-sm text-white/40 line-clamp-2 group-hover:text-white/60 transition-colors leading-relaxed">
                  {post.description}
                </p>
                
                {/* Metadata */}
                <div className="flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-widest text-white/30 mt-1">
                  <span>{post.date}</span>
                  <span className="h-1 w-1 rounded-full bg-white/10" />
                  <span className="text-white/50">{post.category}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
}