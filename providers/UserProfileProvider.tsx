import React, { createContext, useCallback, useContext, useMemo } from "react";
import { useProfile, useUpdateProfile } from "@/services";
import type { UserProfile, UpdateProfileRequest } from "@/types/user";

type UserProfileContextValue = {
  profile: UserProfile | undefined;
  isLoading: boolean;
};

type UserProfileActionsValue = {
  refreshProfile: () => void;
  updateProfile: (data: UpdateProfileRequest) => void;
  isUpdating: boolean;
};

const UserProfileContext = createContext<UserProfileContextValue>({
  profile: undefined,
  isLoading: true,
});
const UserProfileActionsContext = createContext<
  UserProfileActionsValue | undefined
>(undefined);

export function UserProfileProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: profile, isLoading, refetch } = useProfile();
  const updateMutation = useUpdateProfile();

  const refreshProfile = useCallback(() => {
    refetch();
  }, [refetch]);

  const updateProfile = useCallback(
    (data: UpdateProfileRequest) => {
      updateMutation.mutate(data);
    },
    [updateMutation],
  );

  const profileValue = useMemo(
    () => ({ profile, isLoading }),
    [profile, isLoading],
  );

  const actionsValue = useMemo(
    () => ({
      refreshProfile,
      updateProfile,
      isUpdating: updateMutation.isPending,
    }),
    [refreshProfile, updateProfile, updateMutation.isPending],
  );

  return (
    <UserProfileContext.Provider value={profileValue}>
      <UserProfileActionsContext.Provider value={actionsValue}>
        {children}
      </UserProfileActionsContext.Provider>
    </UserProfileContext.Provider>
  );
}

export function useUserProfile() {
  return useContext(UserProfileContext);
}

export function useUserProfileActions() {
  const ctx = useContext(UserProfileActionsContext);
  if (!ctx)
    throw new Error(
      "useUserProfileActions must be used within UserProfileProvider",
    );
  return ctx;
}
