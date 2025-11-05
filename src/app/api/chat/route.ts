import { openai } from "@ai-sdk/openai";
import { streamText, UIMessage, convertToModelMessages, stepCountIs } from "ai";

import { searchRedditPosts, searchRedditComments } from "./tools";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: openai("gpt-4.1-mini"),
    messages: convertToModelMessages(messages),
    system:
      `You are a helpful assistant that searches Reddit for companies information to see if the company has good comments or not.\n` +
      `You will be given a query with the company name and you will need to search Reddit for the company reviews. \n` +
      `You will then need to search the comments for the company and see if the company has good comments or not. \n` +
      `You will then need to make a summary of the company information and the comments, saying if the company has good work vibes or not.`,
    stopWhen: stepCountIs(5), // Important to allow multiple tool calls
    tools: {
      searchRedditPosts,
      searchRedditComments,
      // TODO: Add more tools here
      // Example:
      // searchGlassdoorReviews
      // searchGoogleReviews
    },
  });

  return result.toUIMessageStreamResponse();
}
