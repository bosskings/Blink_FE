import { apiClient } from "./client";
import type {
  StorefrontResponse,
  StorefrontData,
  CreateStorefrontResponse,
  UpdateStorefrontResponse,
} from "@/types/storefront";

export async function fetchMyStorefront(): Promise<StorefrontResponse> {
  const response = await apiClient.get<StorefrontResponse>("/storefronts/me");
  return response.data;
}

export async function fetchStorefront(
  id: string,
): Promise<StorefrontResponse> {
  const response = await apiClient.get<StorefrontResponse>(
    `/storefronts/${id}`,
  );
  return response.data;
}

export async function setupStorefront(
  data: StorefrontData,
): Promise<CreateStorefrontResponse> {
  const response = await apiClient.post<CreateStorefrontResponse>(
    "/storefronts/setup",
    data,
  );
  return response.data;
}

export async function updateStorefront(
  data: StorefrontData,
): Promise<UpdateStorefrontResponse> {
  const response = await apiClient.put<UpdateStorefrontResponse>(
    "/storefronts",
    data,
  );
  return response.data;
}
