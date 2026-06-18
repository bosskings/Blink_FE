import { initiateCall, fetchCallHistory } from "@/services/api/calls";
import { apiClient } from "@/services/api/client";
import type { InitiateCallResponse, CallHistoryResponse } from "@/types/call";

jest.mock("@/services/api/client", () => ({ apiClient: { get: jest.fn(), post: jest.fn() }, getStoredToken: jest.fn(), setStoredToken: jest.fn() }));
const mockedApiClient = apiClient as jest.Mocked<typeof apiClient>;

describe("Calls API Service", () => {
  beforeEach(() => { jest.clearAllMocks(); });

  it("initiateCall calls POST /calls/initiate", async () => {
    const mock: InitiateCallResponse = { status: "SUCCESS", call: { _id: "call1", channelName: "room_123", participants: ["u1", "u2"] } };
    mockedApiClient.post.mockResolvedValueOnce({ data: mock });
    const result = await initiateCall({ channelName: "room_123" });
    expect(mockedApiClient.post).toHaveBeenCalledWith("/calls/initiate", { channelName: "room_123" });
    expect(result.call.channelName).toBe("room_123");
  });

  it("fetchCallHistory calls GET /calls/history", async () => {
    const mock: CallHistoryResponse = { status: "SUCCESS", calls: [{ _id: "call1", channelName: "room_123", participants: ["u1", "u2"], duration: "10:05" }] };
    mockedApiClient.get.mockResolvedValueOnce({ data: mock });
    const result = await fetchCallHistory();
    expect(mockedApiClient.get).toHaveBeenCalledWith("/calls/history");
    expect(result.calls).toHaveLength(1);
  });
});
