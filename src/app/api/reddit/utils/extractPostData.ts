import type { RedditPost, RedditPostQueryData } from "@/types";

/**
 * Extract only relevant fields from a Reddit post
 * @param post - The Reddit post to extract data from
 * @returns The extracted data
 */
export function extractPostData(post: RedditPostQueryData['data']): RedditPost {
  return {
    id: post.id,
    title: post.title,
    author: post.author,
    subreddit: post.subreddit,
    url: post.url,
    permalink: `https://www.reddit.com${post.permalink}`,
    score: post.score,
    upvote_ratio: post.upvote_ratio,
    num_comments: post.num_comments,
    created_utc: post.created_utc,
    selftext: post.selftext?.substring(0, 200) || "", // First 200 chars of text
    thumbnail:
      post.thumbnail && post.thumbnail !== "self" ? post.thumbnail : null,
  };
}
