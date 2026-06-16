import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as staged from "../staged/notifications";

const KEY = "notifications";

export function useNotifications() {
  return useQuery({ queryKey: [KEY], queryFn: () => staged.fetchNotifications() });
}

export function useClearNotifications() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => staged.clearNotifications(),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}
