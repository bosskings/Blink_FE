import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as staged from "../staged/discussions";

const KEY = "discussions";

export function useDiscussions(filters?: any) {
  return useQuery({
    queryKey: [KEY, filters],
    queryFn: () => staged.fetchDiscussions(filters),
  });
}

export function useLikeDiscussion() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => staged.likeDiscussion(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}
