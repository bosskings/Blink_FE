import { apiClient } from "./client";
import type {
  FetchEventsResponse,
  FetchEventResponse,
  CreateEventRequest,
  CreateEventResponse,
} from "@/types/event";

export async function fetchEvents(filters?: any): Promise<FetchEventsResponse> {
  const query = new URLSearchParams();
  if (filters?.communityId) query.append("communityId", filters.communityId);
  // Add any other filter parameters as needed based on backend support
  const url = query.toString() ? `/events?${query.toString()}` : "/events";
  const response = await apiClient.get<FetchEventsResponse>(url);
  return response.data;
}

export async function fetchEvent(id: string): Promise<FetchEventResponse> {
  const response = await apiClient.get<FetchEventResponse>(`/events/${id}`);
  return response.data;
}

export async function createEvent(data: CreateEventRequest): Promise<CreateEventResponse> {
  const response = await apiClient.post<CreateEventResponse>("/events", data);
  return response.data;
}
