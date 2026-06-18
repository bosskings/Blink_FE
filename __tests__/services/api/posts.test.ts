import {
  fetchPost,
  createPost,
  likePost,
  addComment,
  deletePost,
  voteOnPost,
  reportPost,
} from "@/services/api/posts";
import { apiClient } from "@/services/api/client";
import type {
  PostResponse,
  CreatePostResponse,
  LikePostResponse,
  AddCommentResponse,
  DeletePostResponse,
  VotePostResponse,
  ReportPostResponse,
} from "@/types/post";

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

const mockPost = {
  _id: "post123",
  content: "Hello Community!",
  author: { firstName: "Jane", lastName: "Smith", blinkTag: "janesmith" },
  community: { name: "Lagos Tech" },
  type: "discussion",
  likesCount: 10,
  commentsCount: 2,
};

describe("Posts API Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetchPost calls GET /posts/:id", async () => {
    const mock: PostResponse = { status: "SUCCESS", post: mockPost };
    mockedApiClient.get.mockResolvedValueOnce({ data: mock });
    const result = await fetchPost("post123");
    expect(mockedApiClient.get).toHaveBeenCalledWith("/posts/post123");
    expect(result.post.content).toBe("Hello Community!");
  });

  it("createPost calls POST /posts with data", async () => {
    const mock: CreatePostResponse = { status: "SUCCESS", post: mockPost };
    mockedApiClient.post.mockResolvedValueOnce({ data: mock });
    const result = await createPost({ content: "Hello!", community: "comm1", type: "discussion" });
    expect(mockedApiClient.post).toHaveBeenCalledWith("/posts", { content: "Hello!", community: "comm1", type: "discussion" });
    expect(result.status).toBe("SUCCESS");
  });

  it("likePost calls POST /posts/:id/like", async () => {
    const mock: LikePostResponse = { status: "SUCCESS", message: "Liked" };
    mockedApiClient.post.mockResolvedValueOnce({ data: mock });
    const result = await likePost("post123");
    expect(mockedApiClient.post).toHaveBeenCalledWith("/posts/post123/like", {});
    expect(result.status).toBe("SUCCESS");
  });

  it("addComment calls POST /posts/:id/comments", async () => {
    const mock: AddCommentResponse = { status: "SUCCESS", message: "Comment added" };
    mockedApiClient.post.mockResolvedValueOnce({ data: mock });
    const result = await addComment("post123", { content: "Great!", parentId: null });
    expect(mockedApiClient.post).toHaveBeenCalledWith("/posts/post123/comments", { content: "Great!", parentId: null });
    expect(result.status).toBe("SUCCESS");
  });

  it("deletePost calls DELETE /posts/:id", async () => {
    const mock: DeletePostResponse = { status: "SUCCESS", message: "Deleted" };
    mockedApiClient.delete.mockResolvedValueOnce({ data: mock });
    const result = await deletePost("post123");
    expect(mockedApiClient.delete).toHaveBeenCalledWith("/posts/post123");
    expect(result.status).toBe("SUCCESS");
  });

  it("voteOnPost calls POST /posts/:id/vote", async () => {
    const mock: VotePostResponse = { status: "SUCCESS", message: "Voted" };
    mockedApiClient.post.mockResolvedValueOnce({ data: mock });
    const result = await voteOnPost("post123", { optionId: "opt1" });
    expect(mockedApiClient.post).toHaveBeenCalledWith("/posts/post123/vote", { optionId: "opt1" });
    expect(result.status).toBe("SUCCESS");
  });

  it("reportPost calls POST /posts/:id/report", async () => {
    const mock: ReportPostResponse = { status: "SUCCESS", message: "Reported" };
    mockedApiClient.post.mockResolvedValueOnce({ data: mock });
    const result = await reportPost("post123");
    expect(mockedApiClient.post).toHaveBeenCalledWith("/posts/post123/report", {});
    expect(result.status).toBe("SUCCESS");
  });
});
