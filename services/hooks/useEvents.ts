import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as eventsApi from "../api/events";
import type { CreateEventRequest } from "@/types/event";

const EVENTS_KEY = ["events"] as const;

export function useEvents(filters?: any) {
  return useQuery({
    queryKey: [...EVENTS_KEY, filters],
    queryFn: async () => {
      const response = await eventsApi.fetchEvents(filters);
      return response.events;
    },
  });
}

export function useEvent(id: string) {
  return useQuery({
    queryKey: [...EVENTS_KEY, id],
    queryFn: async () => {
      const response = await eventsApi.fetchEvent(id);
      return response.event;
    },
    enabled: !!id,
  });
}

export function useCreateEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateEventRequest) => eventsApi.createEvent(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EVENTS_KEY });
    },
  });
}
