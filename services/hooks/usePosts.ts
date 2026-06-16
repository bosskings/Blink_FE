import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as staged from "../staged/posts";

const KEY = "posts";

export function usePosts(communityId?: string) {
  return useQuery({
    queryKey: [KEY, communityId],
    queryFn: () => staged.fetchPosts(communityId),
  });
}

export function useCreatePost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => staged.createPost(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}

export function useDeletePost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => staged.deletePost(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}
