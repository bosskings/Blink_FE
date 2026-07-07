import { useQuery } from "@tanstack/react-query";
import * as hashtagsApi from "../api/hashtags";

const HASHTAGS_KEY = ["hashtags"] as const;

export function useTrendingHashtags(communityId?: string) {
  return useQuery({
    queryKey: [...HASHTAGS_KEY, "trending", communityId],
    queryFn: async () => {
      const response = await hashtagsApi.fetchTrendingHashtags();
      return response.hashtags.map((h) => ({
        ...h,
        posts: h.count,
        location: h.category,
      }));
    },
  });
}

export function usePostsByHashtag(tag: string) {
  return useQuery({
    queryKey: [...HASHTAGS_KEY, tag, "posts"],
    queryFn: async () => {
      const response = await hashtagsApi.fetchPostsByHashtag(tag);
      return response.posts;
    },
    enabled: !!tag,
  });
}
