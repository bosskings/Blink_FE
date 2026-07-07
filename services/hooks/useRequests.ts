import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as feedApi from "../api/feed";
import * as postsApi from "../api/posts";
import type { CreatePostRequest } from "@/types/post";

const REQUESTS_KEY = ["feed", "requests"] as const;

export function useRequests() {
  return useQuery({
    queryKey: REQUESTS_KEY,
    queryFn: async () => {
      const response = await feedApi.fetchFeedRequests();
      return response.requests;
    },
  });
}

export function useCreateRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreatePostRequest) =>
      postsApi.createPost({ ...data, type: "request" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: REQUESTS_KEY });
    },
  });
}

export function useUpdateRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id }: { id: string; changes: Record<string, unknown> }) =>
      postsApi.deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: REQUESTS_KEY });
    },
  });
}
