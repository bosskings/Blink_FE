import { apiClient } from "./client";
import type {
  ListingsResponse,
  ListingResponse,
  ListingsFilter,
  CreateDraftRequest,
  CreateAndPublishRequest,
  UpdateListingRequest,
  PublishListingRequest,
  CreateListingResponse,
  UpdateListingResponse,
  UploadListingPhotosResponse,
  PublishListingResponse,
  DeleteListingResponse,
} from "@/types/listing";

export async function fetchListings(
  filters?: ListingsFilter,
): Promise<ListingsResponse> {
  const params = new URLSearchParams();
  if (filters?.search) params.append("search", filters.search);
  if (filters?.type) params.append("type", filters.type);
  if (filters?.category) params.append("category", filters.category);
  if (filters?.communityId) params.append("communityId", filters.communityId);
  if (filters?.status) params.append("status", filters.status);
  if (filters?.userId) params.append("userId", filters.userId);

  const query = params.toString();
  const url = query ? `/listings?${query}` : "/listings";
  const response = await apiClient.get<ListingsResponse>(url);
  return response.data;
}

export async function fetchListing(id: string): Promise<ListingResponse> {
  const response = await apiClient.get<ListingResponse>(`/listings/${id}`);
  return response.data;
}

export async function createDraft(
  data: CreateDraftRequest,
): Promise<CreateListingResponse> {
  const response = await apiClient.post<CreateListingResponse>(
    "/listings/draft",
    data,
  );
  return response.data;
}

export async function createAndPublish(
  data: CreateAndPublishRequest,
): Promise<CreateListingResponse> {
  const response = await apiClient.post<CreateListingResponse>(
    "/listings/create-publish",
    data,
  );
  return response.data;
}

export async function updateListing(
  id: string,
  data: UpdateListingRequest,
): Promise<UpdateListingResponse> {
  const response = await apiClient.put<UpdateListingResponse>(
    `/listings/${id}`,
    data,
  );
  return response.data;
}

export async function uploadListingPhotos(
  id: string,
  formData: FormData,
): Promise<UploadListingPhotosResponse> {
  const response = await apiClient.post<UploadListingPhotosResponse>(
    `/listings/${id}/photos`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } },
  );
  return response.data;
}

export async function publishListing(
  id: string,
  data?: PublishListingRequest,
): Promise<PublishListingResponse> {
  const response = await apiClient.post<PublishListingResponse>(
    `/listings/${id}/publish`,
    data ?? {},
  );
  return response.data;
}

export async function deleteListing(
  id: string,
): Promise<DeleteListingResponse> {
  const response = await apiClient.delete<DeleteListingResponse>(
    `/listings/${id}`,
  );
  return response.data;
}
