"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useMotionValue, motion, useTransform } from "motion/react";

interface AnimatedBackgroundProps {
  className?: string;
}

export default function AnimatedBackground({
  className = "",
}: AnimatedBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });

  const blob1X = useMotionValue(0);
  const blob1Y = useMotionValue(0);
  const blob2X = useMotionValue(0);
  const blob2Y = useMotionValue(0);

  const blob1TransformX = useTransform(blob1X, (x) => `${x - 300}px`);
  const blob1TransformY = useTransform(blob1Y, (y) => `${y - 300}px`);
  const blob2TransformX = useTransform(blob2X, (x) => `${x - 300}px`);
  const blob2TransformY = useTransform(blob2Y, (y) => `${y - 300}px`);

  useEffect(() => {
    if (prefersReducedMotion) return;

    // Use viewport dimensions for fixed positioning
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Initialize positions
    blob1X.set(width * 0.2);
    blob1Y.set(height * 0.3);
    blob2X.set(width * 0.8);
    blob2Y.set(height * 0.7);

    const animateBlob = (
      x: typeof blob1X,
      y: typeof blob1Y,
      duration: number
    ) => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      const newX = Math.random() * newWidth;
      const newY = Math.random() * newHeight;

      animate(x, newX, {
        duration,
        ease: "easeInOut",
        onComplete: () => animateBlob(x, y, duration),
      });

      animate(y, newY, {
        duration,
        ease: "easeInOut",
      });
    };

    // Start animations with different durations
    animateBlob(blob1X, blob1Y, 25);
    animateBlob(blob2X, blob2Y, 30);

    // Handle resize
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      
      // Update positions proportionally
      blob1X.set((blob1X.get() / width) * newWidth);
      blob1Y.set((blob1Y.get() / height) * newHeight);
      blob2X.set((blob2X.get() / width) * newWidth);
      blob2Y.set((blob2Y.get() / height) * newHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [blob1X, blob1Y, blob2X, blob2Y, prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 overflow-hidden pointer-events-none z-0 ${className}`}
      style={{ contain: "layout style paint" }}
    >
      {/* Light mode: white to dark-gray */}
      <motion.div
        className="absolute rounded-full opacity-20 blur-3xl dark:opacity-0 transition-opacity duration-500"
        style={{
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(31,41,55,0.8) 50%, rgba(17,24,39,1) 100%)",
          x: blob1TransformX,
          y: blob1TransformY,
          willChange: "transform",
        }}
      />
      <motion.div
        className="absolute rounded-full opacity-15 blur-3xl dark:opacity-0 transition-opacity duration-500"
        style={{
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(17,24,39,0.8) 0%, rgba(31,41,55,0.6) 50%, rgba(255,255,255,0.9) 100%)",
          x: blob2TransformX,
          y: blob2TransformY,
          willChange: "transform",
        }}
      />

      {/* Dark mode: black to grey */}
      <motion.div
        className="absolute rounded-full opacity-0 dark:opacity-20 blur-3xl transition-opacity duration-500"
        style={{
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(107,114,128,0.8) 50%, rgba(156,163,175,0.6) 100%)",
          x: blob1TransformX,
          y: blob1TransformY,
          willChange: "transform",
        }}
      />
      <motion.div
        className="absolute rounded-full opacity-0 dark:opacity-15 blur-3xl transition-opacity duration-500"
        style={{
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(156,163,175,0.6) 0%, rgba(107,114,128,0.7) 50%, rgba(0,0,0,0.9) 100%)",
          x: blob2TransformX,
          y: blob2TransformY,
          willChange: "transform",
        }}
      />
    </div>
  );
}
