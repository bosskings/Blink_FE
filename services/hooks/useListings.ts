import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as listingsApi from "../api/listings";
import type {
  ListingsFilter,
  CreateDraftRequest,
  CreateAndPublishRequest,
  UpdateListingRequest,
  PublishListingRequest,
} from "@/types/listing";

const LISTINGS_KEY = ["listings"] as const;

export function useListings(filters?: ListingsFilter) {
  return useQuery({
    queryKey: [...LISTINGS_KEY, filters],
    queryFn: async () => {
      const response = await listingsApi.fetchListings(filters);
      return response.listings;
    },
  });
}

export function useListing(id: string) {
  return useQuery({
    queryKey: [...LISTINGS_KEY, id],
    queryFn: async () => {
      const response = await listingsApi.fetchListing(id);
      return response.listing;
    },
    enabled: !!id,
  });
}

export function useCreateDraft() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateDraftRequest) => listingsApi.createDraft(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LISTINGS_KEY });
    },
  });
}

export function useCreateAndPublish() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateAndPublishRequest) =>
      listingsApi.createAndPublish(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LISTINGS_KEY });
    },
  });
}

export function useUpdateListing() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateListingRequest }) =>
      listingsApi.updateListing(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LISTINGS_KEY });
    },
  });
}

export function useUploadListingPhotos() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, formData }: { id: string; formData: FormData }) =>
      listingsApi.uploadListingPhotos(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LISTINGS_KEY });
    },
  });
}

export function usePublishListing() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data?: PublishListingRequest;
    }) => listingsApi.publishListing(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LISTINGS_KEY });
    },
  });
}

export function useDeleteListing() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => listingsApi.deleteListing(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LISTINGS_KEY });
    },
  });
}
