import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as staged from "../staged/chats";

const KEY = "chats";

export function useChats() {
  return useQuery({ queryKey: [KEY], queryFn: () => staged.fetchChats() });
}

export function useDeleteChat() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => staged.deleteChat(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}
