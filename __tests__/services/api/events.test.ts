import { fetchEvents, fetchEvent, createEvent } from "@/services/api/events";
import { apiClient } from "@/services/api/client";

jest.mock("@/services/api/client", () => ({
  apiClient: {
    get: jest.fn(),
    post: jest.fn(),
  },
}));

const mockedApiClient = apiClient as jest.Mocked<typeof apiClient>;

describe("Events API Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetchEvents calls GET /events", async () => {
    mockedApiClient.get.mockResolvedValueOnce({
      data: { status: "SUCCESS", events: [] },
    });
    await fetchEvents();
    expect(mockedApiClient.get).toHaveBeenCalledWith("/events");
  });

  it("fetchEvents with filters appends query params", async () => {
    mockedApiClient.get.mockResolvedValueOnce({
      data: { status: "SUCCESS", events: [] },
    });
    await fetchEvents({ communityId: "123" });
    expect(mockedApiClient.get).toHaveBeenCalledWith("/events?communityId=123");
  });

  it("fetchEvent calls GET /events/:id", async () => {
    mockedApiClient.get.mockResolvedValueOnce({
      data: { status: "SUCCESS", event: { _id: "1" } as any },
    });
    await fetchEvent("1");
    expect(mockedApiClient.get).toHaveBeenCalledWith("/events/1");
  });

  it("createEvent calls POST /events", async () => {
    mockedApiClient.post.mockResolvedValueOnce({
      data: { status: "SUCCESS", event: { _id: "2" } as any },
    });
    const payload = { title: "Test", communityId: "123", date: "today", time: "now", location: "here", category: "test" };
    await createEvent(payload);
    expect(mockedApiClient.post).toHaveBeenCalledWith("/events", payload);
  });
});
