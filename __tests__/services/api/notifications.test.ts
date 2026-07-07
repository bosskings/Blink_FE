import { fetchNotifications, markNotificationRead, markAllNotificationsRead } from "@/services/api/notifications";
import { apiClient } from "@/services/api/client";
import type { NotificationsResponse, MarkNotificationReadResponse, MarkAllReadResponse } from "@/types/notification";

jest.mock("@/services/api/client", () => ({ apiClient: { get: jest.fn(), put: jest.fn() }, getStoredToken: jest.fn(), setStoredToken: jest.fn() }));
const mockedApiClient = apiClient as jest.Mocked<typeof apiClient>;

describe("Notifications API Service", () => {
  beforeEach(() => { jest.clearAllMocks(); });

  it("fetchNotifications calls GET /notifications", async () => {
    const mock: NotificationsResponse = { status: "SUCCESS", notifications: [{ _id: "n1", type: "NEW_MESSAGE", message: "New message", read: false }] };
    mockedApiClient.get.mockResolvedValueOnce({ data: mock });
    const result = await fetchNotifications();
    expect(mockedApiClient.get).toHaveBeenCalledWith("/notifications");
    expect(result.notifications).toHaveLength(1);
  });

  it("markNotificationRead calls PUT /notifications/:id/read", async () => {
    const mock: MarkNotificationReadResponse = { status: "SUCCESS", message: "Marked" };
    mockedApiClient.put.mockResolvedValueOnce({ data: mock });
    const result = await markNotificationRead("n1");
    expect(mockedApiClient.put).toHaveBeenCalledWith("/notifications/n1/read", {});
    expect(result.status).toBe("SUCCESS");
  });

  it("markAllNotificationsRead calls PUT /notifications/read-all", async () => {
    const mock: MarkAllReadResponse = { status: "SUCCESS", message: "All marked" };
    mockedApiClient.put.mockResolvedValueOnce({ data: mock });
    const result = await markAllNotificationsRead();
    expect(mockedApiClient.put).toHaveBeenCalledWith("/notifications/read-all", {});
    expect(result.status).toBe("SUCCESS");
  });
});
