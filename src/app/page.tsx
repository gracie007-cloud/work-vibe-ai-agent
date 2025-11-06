"use client";

import { ChatResult } from "@/components/shared/ChatResult";
import { MotionInput } from "@/components/shared/MotionInput";
import { AnimatedBackground } from "@/components/shared/AnimatedBackground";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useChat } from "@ai-sdk/react";
import { useState, useRef } from "react";

export default function Chat() {
  const [input, setInput] = useState("");
  const { messages, status, sendMessage, setMessages } = useChat();
  const headerRef = useRef<HTMLElement>(null);

  const scrollToHeader = () => {
    if (headerRef.current) {
      headerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessages([]);
    sendMessage({ text: input });
    setInput("");
  };

  const containerClasses = "container mx-auto";
  const inputAndChatContainerClasses = "w-full max-w-3xl";

  return (
    <div>
      <AnimatedBackground />
      <section ref={headerRef} className="relative min-h-screen flex z-10">
        <div
          className={cn(
            containerClasses,
            "flex flex-col gap-10 items-center px-4 sm:px-0 mt-64"
          )}
        >
          <div className="text-center">
            <h1 className="text-5xl font-bold sm:text-8xl text-gray-200">
              AI-Powered Company <br /> Vibe Checker
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mt-4">
              Thinking of applying somewhere? Our AI checks the reviews and
              reveals if it&apos;s good vibes 😎 or red flags 🚩.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className={cn("flex gap-3", inputAndChatContainerClasses)}
          >
            <MotionInput
              required
              value={input}
              animatedPlaceholders={[
                "Software Engineer at Google...",
                "Frontend Engineer at Meta...",
                "Backend Engineer at Apple...",
                "Full Stack Engineer at Amazon...",
                "DevOps Engineer at Microsoft...",
                "Data Scientist at Tesla...",
                "Product Manager at Airbnb...",
                "UX Designer at Spotify...",
              ]}
              className="h-10 sm:h-12 sm:h-12 w-full shadow-md dark:shadow-lg dark:shadow-white/5 border border-gray-200 dark:border-gray-800"
              onChange={(e) => setInput(e.currentTarget.value)}
            />

            <Button
              type="submit"
              className="cursor-pointer min-w-20 h-10 sm:h-12"
            >
              Check Vibe
            </Button>
          </form>

          {messages.length > 0 && (
            <div className={cn(inputAndChatContainerClasses, "pb-20")}>
              <ChatResult
                messages={messages}
                isStreaming={status === "streaming" || messages.length === 1}
              />
              {status === "ready" && (
                <Button onClick={scrollToHeader} className="mt-4">
                  Try Again
                </Button>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
