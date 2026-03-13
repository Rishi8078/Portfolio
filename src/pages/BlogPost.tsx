import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { getPostById } from '../data/posts';
import { useEffect } from 'react';

export default function BlogPost() {
  const { id } = useParams();
  const post = id ? getPostById(id) : null;

  // Scroll to top when opening a new post route
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-screen py-32 flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-pixel section-heading-glow mb-4">Post not found</h1>
        <Link to="/" className="text-white/50 hover:text-white transition-colors underline font-mono">
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <motion.article 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full min-h-screen pt-32 pb-24 px-6 sm:px-8 lg:px-16 max-w-4xl mx-auto"
    >
      <Link to="/" className="inline-flex flex-row items-center gap-2 mb-12 font-mono text-xs text-white/50 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
        <span>←</span> Back home
      </Link>

      <div className="flex items-center gap-3 text-[0.65rem] font-mono font-bold uppercase tracking-widest text-[#60a5fa] mb-6">
        <span>{post.date}</span>
        <span className="text-white/30">/</span>
        <span className="rounded-full border border-white/20 bg-white/5 px-2 py-0.5 text-white">{post.category}</span>
      </div>

      <h1 className="font-display text-4xl sm:text-5xl lg:text-[4rem] font-bold leading-[1.05] tracking-tight text-white uppercase text-balance mb-8">
        {post.title}
      </h1>

      <div className="w-full h-px bg-white/10 mb-12" />

      {post.image && (
        <div className="w-full rounded-2xl overflow-hidden mb-12 border border-white/10 bg-white/5">
          <img src={post.image} alt={post.title} className="w-full h-auto object-cover" />
        </div>
      )}

      {/* Tailwind Typography plugin classes typically go here (prose prose-invert) */}
      {/* If tailwindcss/typography isn't installed, we cascade our own generic styles */}
      <div className="text-white/70 leading-relaxed font-medium space-y-6 max-w-none text-base sm:text-lg custom-markdown-container">
        <ReactMarkdown
          components={{
            h2: ({node, ...props}) => <h2 className="text-2xl font-bold text-white mt-12 mb-4" {...props} />,
            h3: ({node, ...props}) => <h3 className="text-xl font-bold text-white mt-8 mb-4" {...props} />,
            p: ({node, ...props}) => <p className="mb-6" {...props} />,
            ul: ({node, ...props}) => <ul className="list-disc pl-6 space-y-2 mb-6" {...props} />,
            li: ({node, ...props}) => <li className="text-white/80" {...props} />,
            code({node, inline, className, children, ...props}: any) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline ? (
                <pre className="bg-black/50 border border-white/10 p-4 rounded-lg overflow-x-auto my-6">
                  <code className={className} {...props}>
                    {children}
                  </code>
                </pre>
              ) : (
                <code className="bg-white/10 px-1 py-0.5 rounded text-sm font-mono text-[#60a5fa]" {...props}>
                  {children}
                </code>
              )
            }
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </motion.article>
  );
}
