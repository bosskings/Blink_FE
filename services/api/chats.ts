import { apiClient } from "./client";
import type {
  ChatsResponse,
  CreateChatRequest,
  CreateChatResponse,
  ChatMessagesResponse,
  DeleteMessageResponse,
} from "@/types/chat";

export async function fetchChats(): Promise<ChatsResponse> {
  const response = await apiClient.get<ChatsResponse>("/chats");
  return response.data;
}

export async function createChat(
  data: CreateChatRequest,
): Promise<CreateChatResponse> {
  const response = await apiClient.post<CreateChatResponse>("/chats", data);
  return response.data;
}

export async function fetchChatMessages(
  chatId: string,
): Promise<ChatMessagesResponse> {
  const response = await apiClient.get<ChatMessagesResponse>(
    `/chats/${chatId}/messages`,
  );
  return response.data;
}

export async function deleteMessage(
  chatId: string,
  messageId: string,
): Promise<DeleteMessageResponse> {
  const response = await apiClient.delete<DeleteMessageResponse>(
    `/chats/${chatId}/messages/${messageId}`,
  );
  return response.data;
}
