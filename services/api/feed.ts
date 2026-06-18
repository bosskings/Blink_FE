import { apiClient } from "./client";
import type {
  FeedResponse,
  FeedRequestsResponse,
  FeedDiscussionsResponse,
} from "@/types/feed";

export async function fetchFeed(): Promise<FeedResponse> {
  const response = await apiClient.get<FeedResponse>("/feed");
  return response.data;
}

export async function fetchFeedRequests(): Promise<FeedRequestsResponse> {
  const response = await apiClient.get<FeedRequestsResponse>("/feed/requests");
  return response.data;
}

export async function fetchFeedDiscussions(): Promise<FeedDiscussionsResponse> {
  const response = await apiClient.get<FeedDiscussionsResponse>(
    "/feed/discussions",
  );
  return response.data;
}
