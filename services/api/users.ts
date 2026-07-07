import { apiClient } from "./client";
import type {
  UserProfileResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
  UploadAvatarResponse,
  UpdateBlinkTagRequest,
  UpdateBlinkTagResponse,
  PayoutSettingsRequest,
  PayoutSettingsResponse,
  DeleteAccountResponse,
  SavedListingsResponse,
  SaveListingResponse,
} from "@/types/user";

export async function fetchCurrentUser(): Promise<UserProfileResponse> {
  const response = await apiClient.get<UserProfileResponse>("/users/me");
  return response.data;
}

export async function updateCurrentUser(
  data: UpdateProfileRequest,
): Promise<UpdateProfileResponse> {
  const response = await apiClient.put<UpdateProfileResponse>(
    "/users/me",
    data,
  );
  return response.data;
}

export async function uploadAvatar(
  formData: FormData,
): Promise<UploadAvatarResponse> {
  const response = await apiClient.post<UploadAvatarResponse>(
    "/users/me/avatar",
    formData,
    { headers: { "Content-Type": "multipart/form-data" } },
  );
  return response.data;
}

export async function updateBlinkTag(
  data: UpdateBlinkTagRequest,
): Promise<UpdateBlinkTagResponse> {
  const response = await apiClient.put<UpdateBlinkTagResponse>(
    "/users/me/blink-tag",
    data,
  );
  return response.data;
}

export async function setPayoutSettings(
  data: PayoutSettingsRequest,
): Promise<PayoutSettingsResponse> {
  const response = await apiClient.post<PayoutSettingsResponse>(
    "/users/me/payout-settings",
    data,
  );
  return response.data;
}

export async function fetchUser(userId: string): Promise<UserProfileResponse> {
  const response = await apiClient.get<UserProfileResponse>(
    `/users/${userId}`,
  );
  return response.data;
}

export async function deleteAccount(): Promise<DeleteAccountResponse> {
  const response = await apiClient.delete<DeleteAccountResponse>("/users/me");
  return response.data;
}

export async function fetchSavedListings(): Promise<SavedListingsResponse> {
  const response = await apiClient.get<SavedListingsResponse>(
    "/users/me/saved-listings",
  );
  return response.data;
}

export async function saveListing(
  listingId: string,
): Promise<SaveListingResponse> {
  const response = await apiClient.post<SaveListingResponse>(
    `/users/me/saved-listings/${listingId}`,
    {},
  );
  return response.data;
}
