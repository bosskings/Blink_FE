import React, { createContext, useCallback, useContext, useMemo } from "react";
import { useProfile, useUpdateProfile } from "@/services";

type UserProfile = {
  blinkTag?: string;
  name?: string;
  avatar?: string;
  email?: string;
  phone?: string;
  bio?: string;
  interests?: string[];
  verificationLevel?: string;
  phoneVerified?: boolean;
  emailVerified?: boolean;
  hasOnboarded?: boolean;
} | undefined;

type UserProfileContextValue = {
  profile: UserProfile;
  isLoading: boolean;
};

type UserProfileActionsValue = {
  refreshProfile: () => void;
  updateProfile: (data: Partial<NonNullable<UserProfile>>) => void;
  isUpdating: boolean;
};

const UserProfileContext = createContext<UserProfileContextValue>({ profile: undefined, isLoading: true });
const UserProfileActionsContext = createContext<UserProfileActionsValue | undefined>(undefined);

export function UserProfileProvider({ children }: { children: React.ReactNode }) {
  const { data: profile, isLoading, refetch } = useProfile();
  const updateMutation = useUpdateProfile();

  const refreshProfile = useCallback(() => { refetch(); }, [refetch]);

  const updateProfile = useCallback((data: Partial<NonNullable<UserProfile>>) => {
    updateMutation.mutate(data);
  }, [updateMutation]);

  const profileValue = useMemo(() => ({ profile, isLoading }), [profile, isLoading]);

  const actionsValue = useMemo(() => ({
    refreshProfile,
    updateProfile,
    isUpdating: updateMutation.isPending,
  }), [refreshProfile, updateProfile, updateMutation.isPending]);

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
  if (!ctx) throw new Error("useUserProfileActions must be used within UserProfileProvider");
  return ctx;
}
