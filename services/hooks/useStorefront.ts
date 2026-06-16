import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as staged from "../staged/storefront";

const KEY = "storefront";

export function useStorefront() {
  return useQuery({ queryKey: [KEY], queryFn: () => staged.fetchStorefront() });
}

export function useCreateStorefront() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => staged.createStorefront(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}

export function useUpdateStorefront() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => staged.updateStorefront(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: [KEY] }),
  });
}
