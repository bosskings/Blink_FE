import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as staged from "../staged/events";

const KEY = "events";

export function useEvents(filters?: any) {
  return useQuery({
    queryKey: [KEY, filters],
    queryFn: () => staged.fetchEvents(filters),
  });
}

export function useCreateEvent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => staged.createEvent(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}
