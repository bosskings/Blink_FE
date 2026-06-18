import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as chatsApi from "../api/chats";
import type { CreateChatRequest } from "@/types/chat";

const CHATS_KEY = ["chats"] as const;

export function useChats() {
  return useQuery({
    queryKey: CHATS_KEY,
    queryFn: async () => {
      const response = await chatsApi.fetchChats();
      return response.chats;
    },
  });
}

export function useCreateChat() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateChatRequest) => chatsApi.createChat(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CHATS_KEY });
    },
  });
}

export function useChatMessages(chatId: string) {
  return useQuery({
    queryKey: [...CHATS_KEY, chatId, "messages"],
    queryFn: async () => {
      const response = await chatsApi.fetchChatMessages(chatId);
      return response.messages;
    },
    enabled: !!chatId,
  });
}

export function useDeleteMessage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ chatId, messageId }: { chatId: string; messageId: string }) =>
      chatsApi.deleteMessage(chatId, messageId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CHATS_KEY });
    },
  });
}

export function useDeleteChat() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (_id: string) => Promise.resolve(true),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CHATS_KEY });
    },
  });
}
