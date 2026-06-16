import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as staged from "../staged/requests";

const KEY = "requests";

export function useRequests(filters?: any) {
  return useQuery({
    queryKey: [KEY, filters],
    queryFn: () => staged.fetchRequests(filters),
  });
}

export function useCreateRequest() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => staged.createRequest(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}

export function useUpdateRequest() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: { id: string; changes: any }) => staged.updateRequest(data.id, data.changes),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}
