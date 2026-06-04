import { useAuth } from "@/providers/AuthProvider";
import { router, Stack } from "expo-router";
import React, { useEffect } from "react";

import "react-native-reanimated";

const StackPagesLayout = () => {
  const { token, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !token) {
      router.replace("/login");
    }
  }, [isLoading, token]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(stacks)" />
    </Stack>
  );
};

export default StackPagesLayout;
