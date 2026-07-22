import { useRef, ReactNode } from "react";
import { motion, useInView, Variants } from "framer-motion";

interface GlitchHeadingProps {
  /** Plain-text version of the heading used by the glitch pseudo-elements */
  dataText: string;
  variants?: Variants;
  className?: string;
  id?: string;
  children: ReactNode;
}

/**
 * Drop-in replacement for `<motion.h2>` that fires a one-shot glitch
 * animation the first time the element scrolls into view.
 */
export default function GlitchHeading({
  dataText,
  variants,
  className = "",
  id,
  children,
}: GlitchHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.h2
      ref={ref}
      variants={variants}
      id={id}
      className={`${className} ${isInView ? "glitch-text" : ""}`}
      data-text={dataText}
    >
      {children}
    </motion.h2>
  );
}
