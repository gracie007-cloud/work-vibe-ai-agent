import { tool } from "ai";
import { z } from "zod";

export const searchRedditPosts = tool({
  description:
    "Search for posts on Reddit for a given company name. Use when the user asks for company information or gives a company name.",
  inputSchema: z.object({
    query: z.string(),
    limit: z.number().optional(),
  }),
  execute: async ({ query, limit }) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/reddit/posts?q=${query}&limit=${limit}`
    );
    const data = await response.json();
    return data.posts;
  },
});
