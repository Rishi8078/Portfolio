import { useEffect, useState, type CSSProperties } from 'react';

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
    const newFireflies = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 6 + 4,
      delay: Math.random() * 5,
      moveX: (Math.random() - 0.5) * 100,
      moveY: (Math.random() - 0.5) * 100,
    }));
    setFireflies(newFireflies);
  }, [count]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden motion-reduce:hidden">
      <style>{`
@keyframes fly {
  0%, 100% { transform: translate(0, 0); opacity: 0; }
  20% { opacity: 0.8; transform: translate(calc(var(--mx) * 0.3), calc(var(--my) * 0.3)); }
  50% { opacity: 0.2; transform: translate(var(--mx), var(--my)); }
  80% { opacity: 0.8; transform: translate(calc(var(--mx) * 0.7), calc(var(--my) * 0.7)); }
}`}</style>
      {fireflies.map((firefly) => (
        <div
          key={firefly.id}
          className="absolute rounded-full bg-blue-300/80"
          style={{
            width: firefly.size,
            height: firefly.size,
            left: `${firefly.x}%`,
            top: `${firefly.y}%`,
            boxShadow: `0 0 ${firefly.size * 4}px ${firefly.size * 1.5}px rgba(96, 165, 250, 0.6)`,
            animation: `fly ${firefly.duration}s ${firefly.delay}s ease-in-out infinite`,
            '--mx': `${firefly.moveX}px`,
            '--my': `${firefly.moveY}px`,
          } as CSSProperties}
        />
      ))}
    </div>
  );
}
