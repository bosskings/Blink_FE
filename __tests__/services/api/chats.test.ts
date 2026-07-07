import {
  fetchChats,
  createChat,
  fetchChatMessages,
  deleteMessage,
} from "@/services/api/chats";
import { apiClient } from "@/services/api/client";
import type {
  ChatsResponse,
  CreateChatResponse,
  ChatMessagesResponse,
  DeleteMessageResponse,
} from "@/types/chat";

jest.mock("@/services/api/client", () => ({
  apiClient: {
    get: jest.fn(),
    post: jest.fn(),
    delete: jest.fn(),
  },
  getStoredToken: jest.fn(),
  setStoredToken: jest.fn(),
}));

const mockedApiClient = apiClient as jest.Mocked<typeof apiClient>;

describe("Chats API Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetchChats calls GET /chats", async () => {
    const mock: ChatsResponse = {
      status: "SUCCESS",
      chats: [{
        _id: "chat1",
        participants: [{ _id: "u1", firstName: "John" }, { _id: "u2", firstName: "Jane" }],
        lastMessage: { text: "Hello!", createdAt: "2024-05-12T00:00:00Z" },
      }],
    };
    mockedApiClient.get.mockResolvedValueOnce({ data: mock });
    const result = await fetchChats();
    expect(mockedApiClient.get).toHaveBeenCalledWith("/chats");
    expect(result.chats).toHaveLength(1);
    expect(result.chats[0].participants).toHaveLength(2);
  });

  it("createChat calls POST /chats with participantId", async () => {
    const mock: CreateChatResponse = {
      status: "SUCCESS",
      chat: {
        _id: "chat2",
        participants: [{ _id: "u1", firstName: "John" }, { _id: "u3", firstName: "Bob" }],
      },
    };
    mockedApiClient.post.mockResolvedValueOnce({ data: mock });
    const result = await createChat({ participantId: "u3" });
    expect(mockedApiClient.post).toHaveBeenCalledWith("/chats", { participantId: "u3" });
    expect(result.chat._id).toBe("chat2");
  });

  it("fetchChatMessages calls GET /chats/:chatId/messages", async () => {
    const mock: ChatMessagesResponse = {
      status: "SUCCESS",
      messages: [
        { _id: "m1", sender: "u1", text: "Hey!", createdAt: "2024-05-12T00:00:00Z" },
        { _id: "m2", sender: "u2", text: "Hi there!", createdAt: "2024-05-12T00:01:00Z" },
      ],
    };
    mockedApiClient.get.mockResolvedValueOnce({ data: mock });
    const result = await fetchChatMessages("chat1");
    expect(mockedApiClient.get).toHaveBeenCalledWith("/chats/chat1/messages");
    expect(result.messages).toHaveLength(2);
  });

  it("deleteMessage calls DELETE /chats/:chatId/messages/:messageId", async () => {
    const mock: DeleteMessageResponse = { status: "SUCCESS", message: "Message deleted" };
    mockedApiClient.delete.mockResolvedValueOnce({ data: mock });
    const result = await deleteMessage("chat1", "m1");
    expect(mockedApiClient.delete).toHaveBeenCalledWith("/chats/chat1/messages/m1");
    expect(result.status).toBe("SUCCESS");
  });
});
