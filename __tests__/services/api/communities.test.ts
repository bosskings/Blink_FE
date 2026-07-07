import { apiClient } from "@/services/api/client";
import {
  approveJoinRequest,
  createCommunity,
  deleteCommunity,
  fetchCommunities,
  fetchCommunity,
  fetchCommunityFeed,
  fetchCommunityReports,
  fetchCommunityRequests,
  fetchMyCommunities,
  fetchNearbyCommunities,
  joinCommunity,
  leaveCommunity,
  rejectJoinRequest,
  removeMember,
  searchCommunities,
  updateCommunity,
  updateMemberRole,
  uploadCommunityImage,
} from "@/services/api/communities";
import type {
  ApproveRejectResponse,
  CommunitiesResponse,
  CommunityFeedResponse,
  CommunityResponse,
  CreateCommunityResponse,
  DeleteCommunityResponse,
  JoinCommunityResponse,
  LeaveCommunityResponse,
  RemoveMemberResponse,
  UpdateCommunityResponse,
  UpdateMemberRoleResponse,
  UploadCommunityImageResponse,
} from "@/types/community";

jest.mock("@/services/api/client", () => ({
  apiClient: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
  getStoredToken: jest.fn(),
  setStoredToken: jest.fn(),
}));

const mockedApiClient = apiClient as jest.Mocked<typeof apiClient>;

const mockCommunity = {
  _id: "comm1",
  name: "Lagos Tech",
  description: "Tech community",
  city: "Lagos",
  type: "PUBLIC",
  memberCount: 150,
};

describe("Communities API Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetchCommunities calls GET /communities", async () => {
    const mock: CommunitiesResponse = {
      status: "SUCCESS",
      communities: [mockCommunity],
    };
    mockedApiClient.get.mockResolvedValueOnce({ data: mock });
    const result = await fetchCommunities();
    expect(mockedApiClient.get).toHaveBeenCalledWith("/communities");
    expect(result.communities).toHaveLength(1);
  });

  it("fetchMyCommunities calls GET /communities/me", async () => {
    const mock: CommunitiesResponse = {
      status: "SUCCESS",
      communities: [{ ...mockCommunity, role: "ADMIN" }],
    };
    mockedApiClient.get.mockResolvedValueOnce({ data: mock });
    const result = await fetchMyCommunities();
    expect(mockedApiClient.get).toHaveBeenCalledWith("/communities/me");
    expect(result.communities[0].role).toBe("ADMIN");
  });

  it("fetchNearbyCommunities calls GET /communities/nearby with params", async () => {
    const mock: CommunitiesResponse = {
      status: "SUCCESS",
      communities: [{ ...mockCommunity, distance: 2.5 }],
    };
    mockedApiClient.get.mockResolvedValueOnce({ data: mock });
    const result = await fetchNearbyCommunities({
      lat: 6.5244,
      lng: 3.3792,
      distance: 50000,
    });
    expect(mockedApiClient.get).toHaveBeenCalledWith(
      expect.stringContaining("/communities/nearby?"),
    );
    expect(result.communities[0].distance).toBe(2.5);
  });

  it("searchCommunities calls GET /communities/search with query", async () => {
    const mock: CommunitiesResponse = {
      status: "SUCCESS",
      communities: [mockCommunity],
    };
    mockedApiClient.get.mockResolvedValueOnce({ data: mock });
    const result = await searchCommunities("tech");
    expect(mockedApiClient.get).toHaveBeenCalledWith(
      "/communities/search?q=tech",
    );
    expect(result.status).toBe("SUCCESS");
  });

  it("fetchCommunity calls GET /communities/:id", async () => {
    const mock: CommunityResponse = {
      status: "SUCCESS",
      community: mockCommunity,
    };
    mockedApiClient.get.mockResolvedValueOnce({ data: mock });
    const result = await fetchCommunity("comm1");
    expect(mockedApiClient.get).toHaveBeenCalledWith("/communities/comm1");
    expect(result.community.name).toBe("Lagos Tech");
  });

  it("fetchCommunityFeed calls GET /communities/:id/feed", async () => {
    const mock: CommunityFeedResponse = {
      status: "SUCCESS",
      posts: [{ _id: "p1", content: "Hello!", author: "user1" }],
    };
    mockedApiClient.get.mockResolvedValueOnce({ data: mock });
    const result = await fetchCommunityFeed("comm1");
    expect(mockedApiClient.get).toHaveBeenCalledWith("/communities/comm1/feed");
    expect(result.posts).toHaveLength(1);
  });

  it("createCommunity calls POST /communities", async () => {
    const mock: CreateCommunityResponse = {
      status: "SUCCESS",
      community: mockCommunity,
    };
    mockedApiClient.post.mockResolvedValueOnce({ data: mock });
    const result = await createCommunity({
      name: "Lagos Tech",
      type: "PUBLIC",
    });
    expect(mockedApiClient.post).toHaveBeenCalledWith("/communities", {
      name: "Lagos Tech",
      type: "PUBLIC",
    });
    expect(result.community.name).toBe("Lagos Tech");
  });

  it("updateCommunity calls PUT /communities/:id", async () => {
    const mock: UpdateCommunityResponse = {
      status: "SUCCESS",
      community: { ...mockCommunity, description: "Updated" },
    };
    mockedApiClient.put.mockResolvedValueOnce({ data: mock });
    const result = await updateCommunity("comm1", { description: "Updated" });
    expect(mockedApiClient.put).toHaveBeenCalledWith("/communities/comm1", {
      description: "Updated",
    });
    expect(result.community.description).toBe("Updated");
  });

  it("joinCommunity calls POST /communities/:id/join", async () => {
    const mock: JoinCommunityResponse = {
      status: "SUCCESS",
      message: "Joined",
    };
    mockedApiClient.post.mockResolvedValueOnce({ data: mock });
    const result = await joinCommunity("comm1");
    expect(mockedApiClient.post).toHaveBeenCalledWith(
      "/communities/comm1/join",
      {},
    );
    expect(result.status).toBe("SUCCESS");
  });

  it("leaveCommunity calls DELETE /communities/:id/leave", async () => {
    const mock: LeaveCommunityResponse = { status: "SUCCESS", message: "Left" };
    mockedApiClient.delete.mockResolvedValueOnce({ data: mock });
    const result = await leaveCommunity("comm1");
    expect(mockedApiClient.delete).toHaveBeenCalledWith(
      "/communities/comm1/leave",
    );
    expect(result.status).toBe("SUCCESS");
  });

  it("uploadCommunityImage calls POST /communities/:id/image", async () => {
    const mock: UploadCommunityImageResponse = {
      status: "SUCCESS",
      community: mockCommunity,
    };
    mockedApiClient.post.mockResolvedValueOnce({ data: mock });
    const formData = new FormData();
    const result = await uploadCommunityImage("comm1", formData);
    expect(mockedApiClient.post).toHaveBeenCalledWith(
      "/communities/comm1/image",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } },
    );
    expect(result.status).toBe("SUCCESS");
  });

  it("deleteCommunity calls DELETE /communities/:id", async () => {
    const mock: DeleteCommunityResponse = {
      status: "SUCCESS",
      message: "Deleted",
    };
    mockedApiClient.delete.mockResolvedValueOnce({ data: mock });
    const result = await deleteCommunity("comm1");
    expect(mockedApiClient.delete).toHaveBeenCalledWith("/communities/comm1");
    expect(result.status).toBe("SUCCESS");
  });

  it("approveJoinRequest calls POST /communities/:id/requests/:userId/approve", async () => {
    const mock: ApproveRejectResponse = {
      status: "SUCCESS",
      message: "Approved",
    };
    mockedApiClient.post.mockResolvedValueOnce({ data: mock });
    const result = await approveJoinRequest("comm1", "user1", "moderator");
    expect(mockedApiClient.post).toHaveBeenCalledWith(
      "/communities/comm1/requests/user1/approve",
      { role: "moderator" },
    );
    expect(result.status).toBe("SUCCESS");
  });

  it("rejectJoinRequest calls POST /communities/:id/requests/:userId/reject", async () => {
    const mock: ApproveRejectResponse = {
      status: "SUCCESS",
      message: "Rejected",
    };
    mockedApiClient.post.mockResolvedValueOnce({ data: mock });
    const result = await rejectJoinRequest("comm1", "user1");
    expect(mockedApiClient.post).toHaveBeenCalledWith(
      "/communities/comm1/requests/user1/reject",
      {},
    );
    expect(result.status).toBe("SUCCESS");
  });

  it("updateMemberRole calls PUT /communities/:id/members/:userId/role", async () => {
    const mock: UpdateMemberRoleResponse = {
      status: "SUCCESS",
      message: "Role updated",
    };
    mockedApiClient.put.mockResolvedValueOnce({ data: mock });
    const result = await updateMemberRole("comm1", "user1", "admin");
    expect(mockedApiClient.put).toHaveBeenCalledWith(
      "/communities/comm1/members/user1/role",
      { role: "admin" },
    );
    expect(result.status).toBe("SUCCESS");
  });

  it("removeMember calls DELETE /communities/:id/members/:userId", async () => {
    const mock: RemoveMemberResponse = {
      status: "SUCCESS",
      message: "Removed",
    };
    mockedApiClient.delete.mockResolvedValueOnce({ data: mock });
    const result = await removeMember("comm1", "user1");
    expect(mockedApiClient.delete).toHaveBeenCalledWith(
      "/communities/comm1/members/user1",
    );
    expect(result.status).toBe("SUCCESS");
  });
  it("fetchCommunityRequests calls GET /communities/:id/requests", async () => {
    mockedApiClient.get.mockResolvedValueOnce({
      data: { status: "SUCCESS", requests: [] },
    });
    const result = await fetchCommunityRequests("123");
    expect(mockedApiClient.get).toHaveBeenCalledWith(
      "/communities/123/requests",
    );
    expect(result.requests).toEqual([]);
  });

  it("fetchCommunityReports calls GET /communities/:id/reports", async () => {
    mockedApiClient.get.mockResolvedValueOnce({
      data: { status: "SUCCESS", reports: [] },
    });
    const result = await fetchCommunityReports("123");
    expect(mockedApiClient.get).toHaveBeenCalledWith(
      "/communities/123/reports",
    );
    expect(result.reports).toEqual([]);
  });
});
