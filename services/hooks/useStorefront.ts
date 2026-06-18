import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as storefrontsApi from "../api/storefronts";
import type { StorefrontData } from "@/types/storefront";

const STOREFRONT_KEY = ["storefront"] as const;

export function useStorefront() {
  return useQuery({
    queryKey: STOREFRONT_KEY,
    queryFn: async () => {
      const response = await storefrontsApi.fetchMyStorefront();
      return response.storefront;
    },
  });
}

export function useStorefrontById(id: string) {
  return useQuery({
    queryKey: [...STOREFRONT_KEY, id],
    queryFn: async () => {
      const response = await storefrontsApi.fetchStorefront(id);
      return response.storefront;
    },
    enabled: !!id,
  });
}

export function useCreateStorefront() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: StorefrontData) => storefrontsApi.setupStorefront(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: STOREFRONT_KEY });
    },
  });
}

export function useUpdateStorefront() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: StorefrontData) =>
      storefrontsApi.updateStorefront(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: STOREFRONT_KEY });
    },
  });
}
