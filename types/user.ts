import type { AuthUser } from "./auth";

export type UserProfile = AuthUser;

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  bio?: string;
  interests?: string[];
}

export interface UpdateProfileResponse {
  status: string;
  user: UserProfile;
}

export interface UpdateBlinkTagRequest {
  blinkTag: string;
}

export interface UpdateBlinkTagResponse {
  status: string;
  user: UserProfile;
}

export interface UploadAvatarResponse {
  status: string;
  user: UserProfile;
}

export interface PayoutSettingsRequest {
  bankName: string;
  bankCode: string;
  accountNumber: string;
}

export interface PayoutSettingsResponse {
  status: string;
  message: string;
}

export interface UserProfileResponse {
  status: string;
  user: UserProfile;
}

export interface DeleteAccountResponse {
  status: string;
  message: string;
}

export interface SavedListing {
  _id: string;
  title: string;
  price: number;
  image?: string;
  distance?: string;
  createdAt?: string;
}

export interface SavedListingsResponse {
  status: string;
  savedListings: SavedListing[];
}

export interface SaveListingResponse {
  status: string;
  message: string;
}
