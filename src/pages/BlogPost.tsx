import { useParams, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { getPostById, posts, Post } from '../data/posts.js';
import { useLayoutEffect, useMemo, Children, isValidElement } from 'react';

const CALLOUT_TITLES: Record<string, string> = {
  note: 'Note',
  info: 'Info',
  tip: 'Tip',
  abstract: 'Abstract',
  summary: 'Summary',
  tldr: 'TL;DR',
  success: 'Success',
  check: 'Check',
  done: 'Done',
  question: 'Question',
  help: 'Help',
  faq: 'FAQ',
  warning: 'Warning',
  caution: 'Caution',
  attention: 'Attention',
  failure: 'Failure',
  fail: 'Fail',
  missing: 'Missing',
  danger: 'Danger',
  bug: 'Bug',
  example: 'Example',
  quote: 'Quote'
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function resolveWikiLinkTarget(rawTarget: string) {
  const normalizedTarget = rawTarget.trim();
  const normalizedSlug = slugify(normalizedTarget);

  const found = posts.find((post: Post) => {
    const postId = post.id.toLowerCase();
    const postTitle = post.title.toLowerCase();
    return postId === normalizedTarget.toLowerCase() || postId === normalizedSlug || slugify(postTitle) === normalizedSlug;
  });

  return found ? `/post/${found.id}` : null;
}

function normalizeObsidianMarkdown(markdown: string) {
  const withWikiLinks = markdown.replace(/\[\[([^\]|#]+)(#[^\]|]+)?(?:\|([^\]]+))?\]\]/g, (_full, target, heading, alias) => {
    const cleanTarget = String(target).trim();
    const cleanAlias = alias ? String(alias).trim() : cleanTarget;
    const resolvedTarget = resolveWikiLinkTarget(cleanTarget);

    if (!resolvedTarget) {
      return cleanAlias;
    }

    const anchor = heading ? `#${slugify(String(heading).replace('#', ''))}` : '';
    return `[${cleanAlias}](${resolvedTarget}${anchor})`;
  });

  return withWikiLinks.replace(/==([^=\n]+)==/g, '<mark>$1</mark>');
}

export default function BlogPost() {
  const { id } = useParams();
  const location = useLocation();
  const post = id ? getPostById(id) : null;
  const fromArchive = location.state?.fromArchive === true;
  const markdownContent = useMemo(() => normalizeObsidianMarkdown(post?.content ?? ''), [post?.content]);

  // Scroll to top when opening a new post route
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
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
      <Link
        to={fromArchive ? '/blog' : '/'}
        state={fromArchive ? undefined : { scrollTo: 'blog' }}
        className="group inline-flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-white/40 transition-colors duration-300 hover:text-white mb-10"
      >
        <span className="text-white/20 transition-all duration-300 group-hover:-translate-x-1 group-hover:text-white/80">{'<'}</span>
        <span className="border-b border-transparent transition-colors duration-300 group-hover:border-white/40 pb-0.5">
          {fromArchive ? 'Back to all posts' : 'Back to home'}
        </span>
      </Link>

      <div className="mb-8 flex flex-col gap-4">
        <div className="flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-widest text-white/40">
          <span>{post.date}</span>
          {post.category && (
            <>
              <span className="h-1 w-1 rounded-full bg-white/20" />
              <span className="text-white/70">{post.category}</span>
            </>
          )}
        </div>

        <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight text-white/90 text-balance">
          {post.title}
        </h1>
      </div>

      <div className="w-full h-px bg-white/10 mb-12" />

      {post.image && (
        <div className="w-full rounded-2xl overflow-hidden mb-12 border border-white/10 bg-white/5">
          <img src={post.image} alt={post.title} className="w-full h-auto object-cover" />
        </div>
      )}

      {/* Tailwind Typography plugin classes typically go here (prose prose-invert) */}
      {/* If tailwindcss/typography isn't installed, we cascade our own generic styles */}
      <div className="obsidian-markdown text-white/70 leading-relaxed font-medium space-y-6 max-w-full break-words text-base sm:text-lg custom-markdown-container">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            h1: ({ node, ...props }) => <h1 className="text-3xl sm:text-4xl font-bold text-white mt-12 mb-6 break-words leading-tight" {...props} />,
            h2: ({ node, ...props }) => <h2 className="text-2xl sm:text-3xl font-bold text-white mt-12 mb-5 break-words leading-tight" {...props} />,
            h3: ({ node, ...props }) => <h3 className="text-xl sm:text-2xl font-bold text-white mt-10 mb-4 break-words leading-tight" {...props} />,
            h4: ({ node, ...props }) => <h4 className="text-lg sm:text-xl font-semibold text-white mt-8 mb-3 break-words" {...props} />,
            p: ({ node, ...props }) => <p className="mb-6 break-words text-white/80" {...props} />,
            ul: ({ node, ...props }) => <ul className="list-disc pl-6 space-y-2 mb-6 break-words" {...props} />,
            ol: ({ node, ...props }) => <ol className="list-decimal pl-6 space-y-2 mb-6 break-words" {...props} />,
            li: ({ node, ...props }) => <li className="text-white/80 break-words marker:text-white/50" {...props} />,
            blockquote: ({ node, children, ...props }) => {
              const quoteChildren = Children.toArray(children);
              const firstChild = quoteChildren[0];

              if (isValidElement(firstChild)) {
                const firstText = Children.toArray(firstChild.props.children)
                  .filter((chunk) => typeof chunk === 'string')
                  .join('')
                  .trim();

                const calloutMatch = firstText.match(/^\[!([a-zA-Z-]+)\](?:\+|-)?\s*(.*)$/);

                if (calloutMatch) {
                  const calloutType = calloutMatch[1].toLowerCase();
                  const calloutTitle = calloutMatch[2]?.trim() || CALLOUT_TITLES[calloutType] || 'Note';
                  const contentChildren = quoteChildren.slice(1);

                  return (
                    <div className={`obsidian-callout obsidian-callout-${calloutType}`}>
                      <div className="obsidian-callout-title">{calloutTitle}</div>
                      <div className="obsidian-callout-content">{contentChildren}</div>
                    </div>
                  );
                }
              }

              return <blockquote className="my-8 border-l-4 border-white/20 pl-5 text-white/70 italic" {...props}>{children}</blockquote>;
            },
            hr: ({ node, ...props }) => <hr className="my-10 border-white/10" {...props} />,
            table: ({ node, ...props }) => (
              <div className="my-8 w-full overflow-x-auto">
                <table className="w-full min-w-[560px] border-separate border-spacing-0" {...props} />
              </div>
            ),
            thead: ({ node, ...props }) => <thead className="bg-white/5" {...props} />,
            th: ({ node, ...props }) => <th className="px-4 py-3 text-left text-white border-b border-white/20 font-semibold" {...props} />,
            td: ({ node, ...props }) => <td className="px-4 py-3 text-white/80 border-b border-white/10 align-top" {...props} />,
            a: ({ node, href, ...props }) => {
              const external = typeof href === 'string' && /^https?:\/\//i.test(href);
              return (
                <a
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noreferrer' : undefined}
                  className="text-white underline decoration-white/30 underline-offset-4 hover:decoration-white transition-colors"
                  {...props}
                />
              );
            },
            img: ({ node, ...props }) => <img className="my-8 rounded-xl border border-white/10 max-w-full h-auto" {...props} />,
            code({ node, inline, className, children, ...props }: any) {
              const codeText = String(children ?? '');
              const isBlockCode = inline === false || Boolean(className?.includes('language-')) || codeText.includes('\n');

              return isBlockCode ? (
                <pre className="bg-black/50 border border-white/10 p-4 rounded-lg overflow-x-auto my-6 max-w-full w-full custom-scrollbar">
                  <code className={className} {...props}>
                    {children}
                  </code>
                </pre>
              ) : (
                <code className="obsidian-inline-code inline align-baseline break-words" {...props}>
                  {children}
                </code>
              )
            }
          }}
        >
          {markdownContent}
        </ReactMarkdown>
      </div>
    </motion.article>
  );
}
