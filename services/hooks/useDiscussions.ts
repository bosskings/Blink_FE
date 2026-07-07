import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as feedApi from "../api/feed";
import * as postsApi from "../api/posts";

const DISCUSSIONS_KEY = ["feed", "discussions"] as const;

export function useDiscussions() {
  return useQuery({
    queryKey: DISCUSSIONS_KEY,
    queryFn: async () => {
      const response = await feedApi.fetchFeedDiscussions();
      return response.discussions;
    },
  });
}

export function useLikeDiscussion() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => postsApi.likePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DISCUSSIONS_KEY });
    },
  });
}
