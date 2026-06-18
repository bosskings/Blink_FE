import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/providers/AuthProvider";
import * as usersApi from "../api/users";
import type {
  UpdateProfileRequest,
  UpdateBlinkTagRequest,
  PayoutSettingsRequest,
} from "@/types/user";

const PROFILE_KEY = ["profile"] as const;
const SAVED_LISTINGS_KEY = ["savedListings"] as const;

export function useProfile() {
  const { token } = useAuth();
  return useQuery({
    queryKey: PROFILE_KEY,
    queryFn: async () => {
      const response = await usersApi.fetchCurrentUser();
      return response.user;
    },
    enabled: !!token,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateProfileRequest) => usersApi.updateCurrentUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROFILE_KEY });
    },
  });
}

export function useUpdateAvatar() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => usersApi.uploadAvatar(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROFILE_KEY });
    },
  });
}

export function useUpdateBlinkTag() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateBlinkTagRequest) => usersApi.updateBlinkTag(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROFILE_KEY });
    },
  });
}

export function useUser(userId: string) {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: async () => {
      const response = await usersApi.fetchUser(userId);
      return response.user;
    },
    enabled: !!userId,
  });
}

export function useDeleteAccount() {
  return useMutation({
    mutationFn: () => usersApi.deleteAccount(),
  });
}

export function useSavedListings() {
  const { token } = useAuth();
  return useQuery({
    queryKey: SAVED_LISTINGS_KEY,
    queryFn: async () => {
      const response = await usersApi.fetchSavedListings();
      return response.savedListings;
    },
    enabled: !!token,
  });
}

export function useSaveListing() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (listingId: string) => usersApi.saveListing(listingId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SAVED_LISTINGS_KEY });
    },
  });
}

export function usePayoutSettings() {
  return useMutation({
    mutationFn: (data: PayoutSettingsRequest) => usersApi.setPayoutSettings(data),
  });
}
