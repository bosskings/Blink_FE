export interface CommunityLocation {
  type: string;
  coordinates: [number, number];
}

export interface CommunityMember {
  _id: string;
  firstName: string;
  lastName: string;
  blinkTag?: string;
  avatar?: string;
  role?: string;
}

export interface Community {
  _id: string;
  name: string;
  description?: string;
  city?: string;
  location?: CommunityLocation;
  type: string;
  memberCount: number;
  image?: string;
  role?: string;
  distance?: number;
  isJoined?: boolean;
  isOwned?: boolean;
  status?: string;
  settings?: CommunitySettings;
  createdAt?: string;
  updatedAt?: string;
}

export interface CommunitySettings {
  requireApproval?: boolean;
}

export interface CommunitiesResponse {
  status: string;
  communities: Community[];
}

export interface CommunityResponse {
  status: string;
  community: Community;
}

export interface CommunityFeedResponse {
  status: string;
  posts: CommunityFeedPost[];
}

export interface CommunityFeedPost {
  _id: string;
  content: string;
  author: string;
  likes?: number;
  comments?: number;
  createdAt?: string;
}

export interface CommunitiesFilter {
  search?: string;
}

export interface NearbyParams {
  lat: number;
  lng: number;
  distance?: number;
}

export interface CreateCommunityRequest {
  name: string;
  description?: string;
  city?: string;
  location?: CommunityLocation;
  type: string;
}

export interface UpdateCommunityRequest {
  description?: string;
  settings?: CommunitySettings;
}

export interface ApproveRequestPayload {
  communityId: string;
  userId: string;
  role?: string;
}

export interface RejectRequestPayload {
  communityId: string;
  userId: string;
}

export interface UpdateMemberRolePayload {
  communityId: string;
  userId: string;
  role: string;
}

export interface RemoveMemberPayload {
  communityId: string;
  userId: string;
}

export interface CreateCommunityResponse {
  status: string;
  community: Community;
}

export interface UpdateCommunityResponse {
  status: string;
  community: Community;
}

export interface JoinCommunityResponse {
  status: string;
  message: string;
}

export interface LeaveCommunityResponse {
  status: string;
  message: string;
}

export interface DeleteCommunityResponse {
  status: string;
  message: string;
}

export interface UploadCommunityImageResponse {
  status: string;
  community: Community;
}

export interface ApproveRejectResponse {
  status: string;
  message: string;
}

export interface UpdateMemberRoleResponse {
  status: string;
  message: string;
}

export interface RemoveMemberResponse {
  status: string;
  message: string;
}
