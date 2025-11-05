export type RedditComment = {
  id: string;
  author: string;
  body: string;
  score: number;
  created_utc: number;
  permalink: string;
};

export type RedditCommentQueryData = {
  kind: string;
  data: {
    id: string;
    body: string;
    author: string;
    score: number;
    created_utc: number;
    permalink: string;
    replies: {
      data: {
        children: RedditCommentQueryData[];
      };
    };
  };
};

export type RedditPost = {
  id: string;
  title: string;
  author: string;
  subreddit: string;
  url: string;
  permalink: string;
  score: number;
  upvote_ratio: number;
  num_comments: number;
  created_utc: number;
  selftext: string;
  thumbnail: string | null;
};

export type RedditPostQueryData = {
  data: {
    id: string;
    title: string;
    author: string;
    subreddit: string;
    url: string;
    permalink: string;
    score: number;
    upvote_ratio: number;
    num_comments: number;
    created_utc: number;
    selftext: string;
    thumbnail: string | null;
  };
};
