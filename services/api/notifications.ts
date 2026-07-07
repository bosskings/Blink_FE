import { apiClient } from "./client";
import type {
  NotificationsResponse,
  MarkNotificationReadResponse,
  MarkAllReadResponse,
} from "@/types/notification";

export async function fetchNotifications(): Promise<NotificationsResponse> {
  const response = await apiClient.get<NotificationsResponse>("/notifications");
  return response.data;
}

export async function markNotificationRead(
  notifId: string,
): Promise<MarkNotificationReadResponse> {
  const response = await apiClient.put<MarkNotificationReadResponse>(
    `/notifications/${notifId}/read`,
    {},
  );
  return response.data;
}

export async function markAllNotificationsRead(): Promise<MarkAllReadResponse> {
  const response = await apiClient.put<MarkAllReadResponse>(
    "/notifications/read-all",
    {},
  );
  return response.data;
}
