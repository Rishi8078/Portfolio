import { motion } from 'framer-motion';
import { useActiveSection } from '../context/ActiveSectionContext';
import { EASE_OUT } from '../lib/motion';

const chapterTints: Record<string, string> = {
  intro: 'transparent',
  work: 'radial-gradient(circle at 50% 30%, rgba(37,99,235,0.07), transparent 60%)',
  values: 'radial-gradient(circle at 50% 30%, rgba(99,102,241,0.07), transparent 60%)',
  background: 'radial-gradient(circle at 50% 30%, rgba(79,70,229,0.07), transparent 60%)',
  about: 'radial-gradient(circle at 50% 30%, rgba(147,51,234,0.07), transparent 60%)',
  blog: 'radial-gradient(circle at 50% 30%, rgba(37,99,235,0.06), transparent 60%)',
  hobbies: 'radial-gradient(circle at 50% 30%, rgba(5,150,105,0.07), transparent 60%)',
  contact: 'radial-gradient(circle at 50% 30%, rgba(5,150,105,0.07), transparent 60%)',
};

export default function BackgroundTint() {
  const activeSection = useActiveSection();

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {Object.entries(chapterTints).map(([id, tint]) => (
        <motion.div
          key={id}
          className="absolute inset-0"
          style={{ backgroundImage: tint }}
          initial={false}
          animate={{ opacity: activeSection === id ? 1 : 0 }}
          transition={{ duration: 0.8, ease: EASE_OUT }}
        />
      ))}
    </div>
  );
}
