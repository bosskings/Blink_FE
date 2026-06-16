import { useQuery } from "@tanstack/react-query";
import * as staged from "../staged/hashtags";

const KEY = "trending_hashtags";

export function useTrendingHashtags(communityId?: string) {
  return useQuery({
    queryKey: [KEY, communityId],
    queryFn: () => staged.fetchTrendingHashtags(communityId),
  });
}
