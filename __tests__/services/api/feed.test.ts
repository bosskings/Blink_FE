import {
  fetchFeed,
  fetchFeedRequests,
  fetchFeedDiscussions,
} from "@/services/api/feed";
import { apiClient } from "@/services/api/client";
import type {
  FeedResponse,
  FeedRequestsResponse,
  FeedDiscussionsResponse,
} from "@/types/feed";

jest.mock("@/services/api/client", () => ({
  apiClient: {
    get: jest.fn(),
  },
  getStoredToken: jest.fn(),
  setStoredToken: jest.fn(),
}));

const mockedApiClient = apiClient as jest.Mocked<typeof apiClient>;

describe("Feed API Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetchFeed calls GET /feed", async () => {
    const mock: FeedResponse = {
      status: "SUCCESS",
      feed: [{ _id: "f1", type: "post", content: "Hello" }],
    };
    mockedApiClient.get.mockResolvedValueOnce({ data: mock });
    const result = await fetchFeed();
    expect(mockedApiClient.get).toHaveBeenCalledWith("/feed");
    expect(result.feed).toHaveLength(1);
  });

  it("fetchFeedRequests calls GET /feed/requests", async () => {
    const mock: FeedRequestsResponse = {
      status: "SUCCESS",
      requests: [{ _id: "r1", type: "request", title: "Need a laptop" }],
    };
    mockedApiClient.get.mockResolvedValueOnce({ data: mock });
    const result = await fetchFeedRequests();
    expect(mockedApiClient.get).toHaveBeenCalledWith("/feed/requests");
    expect(result.requests).toHaveLength(1);
  });

  it("fetchFeedDiscussions calls GET /feed/discussions", async () => {
    const mock: FeedDiscussionsResponse = {
      status: "SUCCESS",
      discussions: [{ _id: "d1", type: "discussion", content: "Thoughts?" }],
    };
    mockedApiClient.get.mockResolvedValueOnce({ data: mock });
    const result = await fetchFeedDiscussions();
    expect(mockedApiClient.get).toHaveBeenCalledWith("/feed/discussions");
    expect(result.discussions).toHaveLength(1);
  });
});
