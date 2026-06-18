export interface ChatParticipant {
  _id: string;
  firstName: string;
  lastName?: string;
  avatar?: string;
}

export interface ChatLastMessage {
  text: string;
  createdAt: string;
}

export interface Chat {
  _id: string;
  id?: string;
  participants: ChatParticipant[];
  lastMessage?: ChatLastMessage;
  lastMessageTime?: string;
  participantName?: string;
  participantAvatar?: string;
  unreadCount?: number;
  readReceipt?: boolean;
  isOnline?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ChatMessage {
  _id: string;
  sender: string;
  text: string;
  createdAt: string;
  image?: string;
  audio?: string;
}

export interface ChatsResponse {
  status: string;
  chats: Chat[];
}

export interface CreateChatRequest {
  participantId: string;
}

export interface CreateChatResponse {
  status: string;
  chat: Chat;
}

export interface ChatMessagesResponse {
  status: string;
  messages: ChatMessage[];
}

export interface DeleteMessageResponse {
  status: string;
  message: string;
}
