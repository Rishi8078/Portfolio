import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Firefly {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  moveX: number;
  moveY: number;
}

export default function Fireflies({ count = 40 }: { count?: number }) {
  const [fireflies, setFireflies] = useState<Firefly[]>([]);

  useEffect(() => {
    const generateFireflies = () => {
      const newFireflies = Array.from({ length: count }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1, // 1px to 4px
        duration: Math.random() * 6 + 4, // 4s to 10s
        delay: Math.random() * 5,
        moveX: (Math.random() - 0.5) * 100, // Random movement distance X
        moveY: (Math.random() - 0.5) * 100, // Random movement distance Y
      }));
      setFireflies(newFireflies);
    };

    generateFireflies();
  }, [count]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      {fireflies.map((firefly) => (
        <motion.div
          key={firefly.id}
          className="absolute rounded-full bg-blue-300/80"
          style={{
            width: firefly.size,
            height: firefly.size,
            left: `${firefly.x}%`,
            top: `${firefly.y}%`,
            boxShadow: `0 0 ${firefly.size * 4}px ${firefly.size * 1.5}px rgba(96, 165, 250, 0.6)`,
          }}
          animate={{
            y: [0, firefly.moveY, 0],
            x: [0, firefly.moveX, 0],
            opacity: [0, 0.8, 0.2, 0.8, 0],
            scale: [0, 1.2, 0.8, 1.2, 0],
          }}
          transition={{
            duration: firefly.duration,
            repeat: Infinity,
            delay: firefly.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}