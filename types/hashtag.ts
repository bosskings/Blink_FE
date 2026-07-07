import { Post } from "./post";

export interface Hashtag {
  id: number;
  tag: string;
  count: string;
  trend: "up" | "down" | "stable" | string;
  category: string;
  posts?: number | string;
  location?: string;
}

export interface FetchTrendingHashtagsResponse {
  status: string;
  hashtags: Hashtag[];
}

export interface FetchPostsByHashtagResponse {
  status: string;
  posts: Post[];
}
