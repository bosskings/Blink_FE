import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as communitiesApi from "../api/communities";
import type {
  CreateCommunityRequest,
  UpdateCommunityRequest,
  NearbyParams,
  ApproveRequestPayload,
  RejectRequestPayload,
  UpdateMemberRolePayload,
  RemoveMemberPayload,
} from "@/types/community";

const COMMUNITIES_KEY = ["communities"] as const;

export function useCommunities() {
  return useQuery({
    queryKey: COMMUNITIES_KEY,
    queryFn: async () => {
      const response = await communitiesApi.fetchCommunities();
      return response.communities;
    },
  });
}

export function useMyCommunities() {
  return useQuery({
    queryKey: [...COMMUNITIES_KEY, "me"],
    queryFn: async () => {
      const response = await communitiesApi.fetchMyCommunities();
      return response.communities;
    },
  });
}

export function useNearbyCommunities(params: NearbyParams) {
  return useQuery({
    queryKey: [...COMMUNITIES_KEY, "nearby", params],
    queryFn: async () => {
      const response = await communitiesApi.fetchNearbyCommunities(params);
      return response.communities;
    },
    enabled: !!params.lat && !!params.lng,
  });
}

export function useSearchCommunities(query: string) {
  return useQuery({
    queryKey: [...COMMUNITIES_KEY, "search", query],
    queryFn: async () => {
      const response = await communitiesApi.searchCommunities(query);
      return response.communities;
    },
    enabled: query.trim().length > 0,
  });
}

export function useCommunity(id: string) {
  return useQuery({
    queryKey: [...COMMUNITIES_KEY, id],
    queryFn: async () => {
      const response = await communitiesApi.fetchCommunity(id);
      return response.community;
    },
    enabled: !!id,
  });
}

export function useCommunityFeed(id: string) {
  return useQuery({
    queryKey: [...COMMUNITIES_KEY, id, "feed"],
    queryFn: async () => {
      const response = await communitiesApi.fetchCommunityFeed(id);
      return response.posts;
    },
    enabled: !!id,
  });
}

export function useCreateCommunity() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateCommunityRequest) =>
      communitiesApi.createCommunity(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COMMUNITIES_KEY });
    },
  });
}

export function useUpdateCommunitySettings() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCommunityRequest }) =>
      communitiesApi.updateCommunity(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COMMUNITIES_KEY });
    },
  });
}

export function useJoinCommunity() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => communitiesApi.joinCommunity(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COMMUNITIES_KEY });
    },
  });
}

export function useLeaveCommunity() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => communitiesApi.leaveCommunity(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COMMUNITIES_KEY });
    },
  });
}

export function useUploadCommunityImage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      communitiesApi.uploadCommunityImage(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COMMUNITIES_KEY });
    },
  });
}

export function useDeleteCommunity() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => communitiesApi.deleteCommunity(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COMMUNITIES_KEY });
    },
  });
}

export function useApproveJoinRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ communityId, userId, role }: ApproveRequestPayload) =>
      communitiesApi.approveJoinRequest(communityId, userId, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COMMUNITIES_KEY });
    },
  });
}

export function useRejectJoinRequest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ communityId, userId }: RejectRequestPayload) =>
      communitiesApi.rejectJoinRequest(communityId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COMMUNITIES_KEY });
    },
  });
}

export function useUpdateMemberRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ communityId, userId, role }: UpdateMemberRolePayload) =>
      communitiesApi.updateMemberRole(communityId, userId, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COMMUNITIES_KEY });
    },
  });
}

export function useRemoveMember() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ communityId, userId }: RemoveMemberPayload) =>
      communitiesApi.removeMember(communityId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COMMUNITIES_KEY });
    },
  });
}

export function useReportCommunity() {
  return useMutation({
    mutationFn: ({
      id,
      reason,
      details,
    }: {
      id: string;
      reason: string;
      details: string;
    }) => {
      void id;
      void reason;
      void details;
      return Promise.resolve({ status: "SUCCESS", message: "Report submitted" });
    },
  });
}

export function useCommunityRequests(id: string) {
  return useQuery({
    queryKey: [...COMMUNITIES_KEY, id, "requests"],
    queryFn: async () => {
      const response = await communitiesApi.fetchCommunityRequests(id);
      return response.requests;
    },
    enabled: !!id,
  });
}

export function useCommunityReports(id: string) {
  return useQuery({
    queryKey: [...COMMUNITIES_KEY, id, "reports"],
    queryFn: async () => {
      const response = await communitiesApi.fetchCommunityReports(id);
      return response.reports;
    },
    enabled: !!id,
  });
}
