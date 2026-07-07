import { apiClient } from "./client";
import type {
  PostResponse,
  CreatePostRequest,
  CreatePostResponse,
  LikePostResponse,
  AddCommentRequest,
  AddCommentResponse,
  DeletePostResponse,
  VotePostRequest,
  VotePostResponse,
  ReportPostResponse,
  FetchPostCommentsResponse,
} from "@/types/post";

export async function fetchPost(id: string): Promise<PostResponse> {
  const response = await apiClient.get<PostResponse>(`/posts/${id}`);
  return response.data;
}

export async function createPost(
  data: CreatePostRequest,
): Promise<CreatePostResponse> {
  const response = await apiClient.post<CreatePostResponse>("/posts", data);
  return response.data;
}

export async function likePost(id: string): Promise<LikePostResponse> {
  const response = await apiClient.post<LikePostResponse>(
    `/posts/${id}/like`,
    {},
  );
  return response.data;
}

export async function addComment(
  postId: string,
  data: AddCommentRequest,
): Promise<AddCommentResponse> {
  const response = await apiClient.post<AddCommentResponse>(
    `/posts/${postId}/comments`,
    data,
  );
  return response.data;
}

export async function deletePost(id: string): Promise<DeletePostResponse> {
  const response = await apiClient.delete<DeletePostResponse>(`/posts/${id}`);
  return response.data;
}

export async function voteOnPost(
  id: string,
  data: VotePostRequest,
): Promise<VotePostResponse> {
  const response = await apiClient.post<VotePostResponse>(
    `/posts/${id}/vote`,
    data,
  );
  return response.data;
}

export async function reportPost(id: string): Promise<ReportPostResponse> {
  const response = await apiClient.post<ReportPostResponse>(
    `/posts/${id}/report`,
    {},
  );
  return response.data;
}

export async function fetchPostComments(id: string): Promise<FetchPostCommentsResponse> {
  const response = await apiClient.get<FetchPostCommentsResponse>(`/posts/${id}/comments`);
  return response.data;
}
