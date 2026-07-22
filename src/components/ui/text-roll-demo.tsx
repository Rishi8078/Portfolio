"use client";

import { chromatic, TextRoll } from "@/components/ui/text-roll";
import { useEffect, useState } from "react";

const WORDS = ["Design", "Develop", "Deploy", "Deliver"];

export default function TextRollDemo() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % WORDS.length);
    }, 1600);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="flex min-h-[300px] w-full flex-col items-center justify-center gap-6 bg-[#040810] px-6 text-white">
      <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/50">
        Ship faster
      </span>
      <div className="flex items-baseline gap-3 font-display font-semibold text-5xl tracking-tight">
        <span>We</span>
        <TextRoll
          text={WORDS[index]}
          options={{
            direction: "up",
            duration: 320,
            stagger: 45,
            bounce: 0.6,
            skipUnchanged: false,
            color: chromatic({ from: 210 }),
          }}
        />
      </div>
    </div>
  );
}
