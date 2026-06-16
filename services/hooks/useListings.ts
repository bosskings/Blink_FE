import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as listingsStaged from "../staged/listings";

const KEY = "listings";

export function useListings(filters?: any) {
  return useQuery({
    queryKey: [KEY, filters],
    queryFn: () => listingsStaged.fetchListings(filters),
  });
}

export function useListing(id: string) {
  return useQuery({
    queryKey: [KEY, id],
    queryFn: () => listingsStaged.fetchListing(id),
    enabled: !!id,
  });
}

export function useCreateListing() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => listingsStaged.createListing(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}

export function useDeleteListing() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => listingsStaged.deleteListing(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}
