import { apiClient } from "./client";
import type {
  FetchTrendingHashtagsResponse,
  FetchPostsByHashtagResponse,
} from "@/types/hashtag";

export async function fetchTrendingHashtags(): Promise<FetchTrendingHashtagsResponse> {
  const response = await apiClient.get<FetchTrendingHashtagsResponse>("/hashtags/trending");
  return response.data;
}

export async function fetchPostsByHashtag(tag: string): Promise<FetchPostsByHashtagResponse> {
  const response = await apiClient.get<FetchPostsByHashtagResponse>(`/hashtags/${tag}/posts`);
  return response.data;
}
