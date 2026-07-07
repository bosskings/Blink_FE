import { fetchTickets, createTicket } from "@/services/api/support";
import { apiClient } from "@/services/api/client";

jest.mock("@/services/api/client", () => ({
  apiClient: {
    get: jest.fn(),
    post: jest.fn(),
  },
}));

const mockedApiClient = apiClient as jest.Mocked<typeof apiClient>;

describe("Support API Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetchTickets calls GET /support/tickets", async () => {
    mockedApiClient.get.mockResolvedValueOnce({
      data: { status: "SUCCESS", tickets: [] },
    });
    await fetchTickets();
    expect(mockedApiClient.get).toHaveBeenCalledWith("/support/tickets");
  });

  it("createTicket calls POST /support/tickets", async () => {
    mockedApiClient.post.mockResolvedValueOnce({
      data: { status: "SUCCESS", ticket: { _id: "2" } as any },
    });
    const payload = { topic: "Payments", subject: "Help", message: "Help me" };
    await createTicket(payload);
    expect(mockedApiClient.post).toHaveBeenCalledWith("/support/tickets", payload);
  });
});
