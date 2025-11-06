import { UIMessage } from "@ai-sdk/react";
import { Tool } from "../Tool";
import { VibeScore } from "../VibeScore";
import { DotsPulse } from "../DotsPulse";

import type { RedditPost, RedditComment } from "@/types";

interface ChatResultProps {
  messages: UIMessage[];
  isStreaming?: boolean;
}

export default function ChatResult({ messages, isStreaming }: ChatResultProps) {
  console.debug(messages);

  return (
    <div className="w-full max-w-3xl bg-card border border-border rounded-lg p-6 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-300">
      {messages
        .filter((message) => message.role !== "user")
        .map((message) => (
          <div key={message.id} className="whitespace-pre-wrap">
            {message.parts.map((part, i) => {
              switch (part.type) {
                case "text":
                  return <div key={`${message.id}-${i}`}>{part.text}</div>;
                case "tool-searchRedditPosts":
                  return (
                    <Tool
                      key={part.toolCallId || `${message.id}-${i}`}
                      isLoading={
                        !(part.state === "output-available" && part.output)
                      }
                    >
                      Reddit Posts Analyzed:{" "}
                      {(part.output as RedditPost[])?.length || 0}
                    </Tool>
                  );
                case "tool-searchRedditComments":
                  return (
                    <Tool
                      key={part.toolCallId || `${message.id}-${i}`}
                      isLoading={
                        !(part.state === "output-available" && part.output)
                      }
                    >
                      Reddit Comments Analyzed:{" "}
                      {(part.output as RedditComment[])?.length || 0}
                    </Tool>
                  );
                case "tool-getVibeScore":
                  return (
                    <VibeScore
                      key={part.toolCallId || `${message.id}-${i}`}
                      data={
                        part.output as {
                          companyName: string;
                          vibeScore: number;
                        }
                      }
                    />
                  );
              }
            })}
          </div>
        ))}

      {isStreaming && (
        <div className="mt-4 w-fit border border-gray-200 rounded-md px-3 py-2.5 dark:bg-gray-800 dark:border-gray-700">
          <DotsPulse />
        </div>
      )}
    </div>
  );
}
