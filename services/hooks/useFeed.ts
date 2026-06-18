import { useQuery } from "@tanstack/react-query";
import * as feedApi from "../api/feed";

const FEED_KEY = ["feed"] as const;

export function useFeed() {
  return useQuery({
    queryKey: FEED_KEY,
    queryFn: async () => {
      const response = await feedApi.fetchFeed();
      return response.feed;
    },
  });
}

export function useFeedRequests() {
  return useQuery({
    queryKey: [...FEED_KEY, "requests"],
    queryFn: async () => {
      const response = await feedApi.fetchFeedRequests();
      return response.requests;
    },
  });
}

export function useFeedDiscussions() {
  return useQuery({
    queryKey: [...FEED_KEY, "discussions"],
    queryFn: async () => {
      const response = await feedApi.fetchFeedDiscussions();
      return response.discussions;
    },
  });
}
