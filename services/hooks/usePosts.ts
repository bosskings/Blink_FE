import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as postsApi from "../api/posts";
import type {
  CreatePostRequest,
  AddCommentRequest,
  VotePostRequest,
} from "@/types/post";

const POSTS_KEY = ["posts"] as const;

export function usePost(id: string) {
  return useQuery({
    queryKey: [...POSTS_KEY, id],
    queryFn: async () => {
      const response = await postsApi.fetchPost(id);
      return response.post;
    },
    enabled: !!id,
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreatePostRequest) => postsApi.createPost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: POSTS_KEY });
    },
  });
}

export function useLikePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => postsApi.likePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: POSTS_KEY });
    },
  });
}

export function useAddComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ postId, data }: { postId: string; data: AddCommentRequest }) =>
      postsApi.addComment(postId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: POSTS_KEY });
    },
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => postsApi.deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: POSTS_KEY });
    },
  });
}

export function useVotePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: VotePostRequest }) =>
      postsApi.voteOnPost(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: POSTS_KEY });
    },
  });
}

export function useReportPost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => postsApi.reportPost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: POSTS_KEY });
    },
  });
}
