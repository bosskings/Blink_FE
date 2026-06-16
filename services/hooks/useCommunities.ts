import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as staged from "../staged/communities";

const KEY = "communities";

export function useCommunities(filters?: any) {
  return useQuery({
    queryKey: [KEY, filters],
    queryFn: () => staged.fetchCommunities(filters),
  });
}

export function useCommunity(id: string) {
  return useQuery({
    queryKey: [KEY, id],
    queryFn: () => staged.fetchCommunity(id),
    enabled: !!id,
  });
}

export function useCreateCommunity() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => staged.createCommunity(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}

export function useUpdateCommunitySettings() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: { id: string; changes: any }) => staged.updateCommunitySettings(data.id, data.changes),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}

export function useJoinCommunity() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => staged.joinCommunity(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}

export function useLeaveCommunity() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => staged.leaveCommunity(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}

export function useReportCommunity() {
  return useMutation({
    mutationFn: (data: { id: string; reason: string; details: string }) => staged.reportCommunity(data.id, data.reason, data.details),
  });
}
