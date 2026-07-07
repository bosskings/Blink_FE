import { apiClient } from "./client";
import type {
  CommunitiesResponse,
  CommunityResponse,
  CommunityFeedResponse,
  NearbyParams,
  CreateCommunityRequest,
  CreateCommunityResponse,
  UpdateCommunityRequest,
  UpdateCommunityResponse,
  JoinCommunityResponse,
  LeaveCommunityResponse,
  DeleteCommunityResponse,
  UploadCommunityImageResponse,
  ApproveRejectResponse,
  UpdateMemberRoleResponse,
  RemoveMemberResponse,
  FetchCommunityRequestsResponse,
  FetchCommunityReportsResponse,
} from "@/types/community";

export async function fetchCommunities(): Promise<CommunitiesResponse> {
  const response = await apiClient.get<CommunitiesResponse>("/communities");
  return response.data;
}

export async function fetchMyCommunities(): Promise<CommunitiesResponse> {
  const response = await apiClient.get<CommunitiesResponse>("/communities/me");
  return response.data;
}

export async function fetchNearbyCommunities(
  params: NearbyParams,
): Promise<CommunitiesResponse> {
  const query = new URLSearchParams({
    lat: params.lat.toString(),
    lng: params.lng.toString(),
  });
  if (params.distance) query.append("distance", params.distance.toString());
  const response = await apiClient.get<CommunitiesResponse>(
    `/communities/nearby?${query.toString()}`,
  );
  return response.data;
}

export async function searchCommunities(
  q: string,
): Promise<CommunitiesResponse> {
  const response = await apiClient.get<CommunitiesResponse>(
    `/communities/search?q=${encodeURIComponent(q)}`,
  );
  return response.data;
}

export async function fetchCommunity(
  id: string,
): Promise<CommunityResponse> {
  const response = await apiClient.get<CommunityResponse>(
    `/communities/${id}`,
  );
  return response.data;
}

export async function fetchCommunityFeed(
  id: string,
): Promise<CommunityFeedResponse> {
  const response = await apiClient.get<CommunityFeedResponse>(
    `/communities/${id}/feed`,
  );
  return response.data;
}

export async function createCommunity(
  data: CreateCommunityRequest,
): Promise<CreateCommunityResponse> {
  const response = await apiClient.post<CreateCommunityResponse>(
    "/communities",
    data,
  );
  return response.data;
}

export async function updateCommunity(
  id: string,
  data: UpdateCommunityRequest,
): Promise<UpdateCommunityResponse> {
  const response = await apiClient.put<UpdateCommunityResponse>(
    `/communities/${id}`,
    data,
  );
  return response.data;
}

export async function joinCommunity(
  id: string,
): Promise<JoinCommunityResponse> {
  const response = await apiClient.post<JoinCommunityResponse>(
    `/communities/${id}/join`,
    {},
  );
  return response.data;
}

export async function leaveCommunity(
  id: string,
): Promise<LeaveCommunityResponse> {
  const response = await apiClient.delete<LeaveCommunityResponse>(
    `/communities/${id}/leave`,
  );
  return response.data;
}

export async function uploadCommunityImage(
  id: string,
  formData: FormData,
): Promise<UploadCommunityImageResponse> {
  const response = await apiClient.post<UploadCommunityImageResponse>(
    `/communities/${id}/image`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } },
  );
  return response.data;
}

export async function deleteCommunity(
  id: string,
): Promise<DeleteCommunityResponse> {
  const response = await apiClient.delete<DeleteCommunityResponse>(
    `/communities/${id}`,
  );
  return response.data;
}

export async function approveJoinRequest(
  communityId: string,
  userId: string,
  role?: string,
): Promise<ApproveRejectResponse> {
  const response = await apiClient.post<ApproveRejectResponse>(
    `/communities/${communityId}/requests/${userId}/approve`,
    role ? { role } : {},
  );
  return response.data;
}

export async function rejectJoinRequest(
  communityId: string,
  userId: string,
): Promise<ApproveRejectResponse> {
  const response = await apiClient.post<ApproveRejectResponse>(
    `/communities/${communityId}/requests/${userId}/reject`,
    {},
  );
  return response.data;
}

export async function updateMemberRole(
  communityId: string,
  userId: string,
  role: string,
): Promise<UpdateMemberRoleResponse> {
  const response = await apiClient.put<UpdateMemberRoleResponse>(
    `/communities/${communityId}/members/${userId}/role`,
    { role },
  );
  return response.data;
}

export async function removeMember(
  communityId: string,
  userId: string,
): Promise<RemoveMemberResponse> {
  const response = await apiClient.delete<RemoveMemberResponse>(
    `/communities/${communityId}/members/${userId}`,
  );
  return response.data;
}

export async function fetchCommunityRequests(
  id: string,
): Promise<FetchCommunityRequestsResponse> {
  const response = await apiClient.get<FetchCommunityRequestsResponse>(`/communities/${id}/requests`);
  return response.data;
}

export async function fetchCommunityReports(
  id: string,
): Promise<FetchCommunityReportsResponse> {
  const response = await apiClient.get<FetchCommunityReportsResponse>(`/communities/${id}/reports`);
  return response.data;
}
