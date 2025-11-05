import { tool } from "ai";
import { z } from "zod";

export const searchRedditComments = tool({
  description: "Search for comments on Reddit",
  inputSchema: z.object({
    subreddit: z.string(),
    postId: z.string(),
    maxComments: z.number().optional(),
  }),
  execute: async ({ subreddit, postId, maxComments }) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/reddit/comments?subreddit=${subreddit}&postId=${postId}&maxComments=${maxComments}`
    );
    const data = await response.json();
    return data.comments.map((comment: any) => comment.body);
  },
});
