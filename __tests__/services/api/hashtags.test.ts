import { fetchTrendingHashtags, fetchPostsByHashtag } from "@/services/api/hashtags";
import { apiClient } from "@/services/api/client";

jest.mock("@/services/api/client", () => ({
  apiClient: {
    get: jest.fn(),
  },
}));

const mockedApiClient = apiClient as jest.Mocked<typeof apiClient>;

describe("Hashtags API Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetchTrendingHashtags calls GET /hashtags/trending", async () => {
    mockedApiClient.get.mockResolvedValueOnce({
      data: { status: "SUCCESS", hashtags: [] },
    });
    await fetchTrendingHashtags();
    expect(mockedApiClient.get).toHaveBeenCalledWith("/hashtags/trending");
  });

  it("fetchPostsByHashtag calls GET /hashtags/:tag/posts", async () => {
    mockedApiClient.get.mockResolvedValueOnce({
      data: { status: "SUCCESS", posts: [] },
    });
    await fetchPostsByHashtag("CampusLife");
    expect(mockedApiClient.get).toHaveBeenCalledWith("/hashtags/CampusLife/posts");
  });
});
