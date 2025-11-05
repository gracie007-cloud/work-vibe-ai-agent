import type { RedditComment, RedditCommentQueryData } from "@/types";

/**
 * Flatten Reddit's nested comment structure
 * @param comments - The comments to flatten
 * @param maxComments - The maximum number of comments to return
 * @returns The flattened comments
 */
export function flattenComments(
  comments: RedditCommentQueryData[],
  maxComments: number = 10
): RedditComment[] {
  const flattened: RedditComment[] = [];

  function traverse(children: RedditCommentQueryData[]) {
    if (!children || flattened.length >= maxComments) return;

    for (const child of children) {
      if (child.kind === "t1" && child.data && child.data.body) {
        // Skip deleted/removed comments
        if (
          child.data.body !== "[deleted]" &&
          child.data.body !== "[removed]"
        ) {
          flattened.push({
            id: child.data.id,
            author: child.data.author,
            body: child.data.body,
            score: child.data.score,
            created_utc: child.data.created_utc,
            permalink: `https://www.reddit.com${child.data.permalink}`,
          });
        }
      }

      if (child.data?.replies?.data?.children) {
        traverse(child.data.replies.data.children);
      }
    }
  }

  traverse(comments);
  return flattened.slice(0, maxComments);
}
