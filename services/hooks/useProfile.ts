import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as profileStaged from "../staged/profile";

const PROFILE_KEY = "user-profile";

export function useProfile() {
  return useQuery({
    queryKey: [PROFILE_KEY],
    queryFn: () => profileStaged.fetchProfile(),
  });
}

export function useUpdateProfile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => profileStaged.updateProfile(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: [PROFILE_KEY] }),
  });
}

export function useUpdateAvatar() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (avatar: string) => profileStaged.updateAvatar(avatar),
    onSuccess: () => qc.invalidateQueries({ queryKey: [PROFILE_KEY] }),
  });
}

export function useUpdateInterests() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (interests: string[]) => profileStaged.updateInterests(interests),
    onSuccess: () => qc.invalidateQueries({ queryKey: [PROFILE_KEY] }),
  });
}

export function useCompleteOnboarding() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => profileStaged.completeOnboarding(),
    onSuccess: () => qc.invalidateQueries({ queryKey: [PROFILE_KEY] }),
  });
}
