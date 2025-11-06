"use client";

import { Input } from "@/components/ui/input";
import { animate, useMotionValue, useMotionValueEvent } from "motion/react";
import { useEffect, useState, useRef } from "react";

interface MotionInputProps extends React.ComponentProps<"input"> {
  /**
   * The placeholders that will be animated.
   * @example ["Staff Engineer at Google...", "Senior Software Engineer at Meta..."]
   */
  animatedPlaceholders?: string[];
}

// Speed of typing in milliseconds per character
const typingSpeed = 50;
// Delay before clearing the text in milliseconds
const clearDelay = 2000;

export default function MotionInput({
  animatedPlaceholders,
  placeholder,
  ...props
}: MotionInputProps) {
  const textIndex = useMotionValue(0);
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);
  const [currentPlaceholder, setCurrentPlaceholder] = useState("");
  const animationRef = useRef<ReturnType<typeof animate> | null>(null);

  // Determine which placeholder to use
  const placeholders =
    animatedPlaceholders && animatedPlaceholders.length > 0
      ? animatedPlaceholders
      : placeholder
      ? [placeholder]
      : [];

  const currentText = placeholders[currentPlaceholderIndex] || "";

  useMotionValueEvent(textIndex, "change", (index) => {
    const length = Math.floor(index);
    setCurrentPlaceholder(currentText.slice(0, length));
  });

  useEffect(() => {
    if (placeholders.length === 0) {
      textIndex.set(0);
      return;
    }

    // If we have multiple placeholders, cycle through them
    if (placeholders.length > 1) {
      const cyclePlaceholders = async () => {
        // Type out the current placeholder
        animationRef.current = animate(textIndex, currentText.length, {
          duration: (currentText.length * typingSpeed) / 1000,
          ease: "linear",
        });

        await animationRef.current;

        // Wait before clearing
        await new Promise((resolve) => setTimeout(resolve, clearDelay));

        // Clear the text (animate back to 0)
        animationRef.current = animate(textIndex, 0, {
          duration: (currentText.length * typingSpeed) / 1000,
          ease: "linear",
        });

        await animationRef.current;

        // Move to next placeholder (loop back to 0 if at end)
        setCurrentPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
      };

      cyclePlaceholders();

      return () => {
        if (animationRef.current) {
          animationRef.current.stop();
        }
      };
    } else {
      // Single placeholder - just type it out once
      animationRef.current = animate(textIndex, currentText.length, {
        duration: (currentText.length * typingSpeed) / 1000,
        ease: "linear",
      });

      return () => {
        if (animationRef.current) {
          animationRef.current.stop();
        }
      };
    }
  }, [currentPlaceholderIndex, currentText, placeholders.length, textIndex]);

  return <Input {...props} placeholder={currentPlaceholder} />;
}
