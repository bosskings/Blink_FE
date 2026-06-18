import { useAuth } from "@/providers/AuthProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, Stack, usePathname } from "expo-router";
import React, { useEffect } from "react";

const StackPagesLayout = () => {
  const { token, isLoading } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    const checkNavigationRoute = async () => {
      // Guard: Only perform redirections if the user is actually on an unauthenticated (noaccess) screen.
      const isNoAccessPath =
        pathname === "/" ||
        pathname === "/index" ||
        pathname.includes("/onboarding") ||
        pathname.includes("/register") ||
        pathname.includes("/create-password") ||
        pathname.includes("/login") ||
        pathname.includes("/forgot-password") ||
        pathname.includes("/reset-password") ||
        pathname.includes("/success");

      if (!isNoAccessPath) {
        return;
      }

      if (token) {
        // If they just signed up, route them to the community discovery stack instead of home
        const justRegistered = await AsyncStorage.getItem("just_registered");
        if (justRegistered === "true") {
          await AsyncStorage.removeItem("just_registered");
          router.replace(
            "/(access)/(stacks)/community-verification-flow/findCommunity",
          );
        } else {
          router.replace("/home");
        }
        return;
      }

      if (pathname === "/") {
        const onboarded = await AsyncStorage.getItem("has_onboarded");
        if (onboarded === "true") {
          router.replace("/sign-in-method");
        } else {
          router.replace("/onboarding");
        }
      }
    };

    checkNavigationRoute();
  }, [isLoading, pathname, token]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="sign-in-method" />
      <Stack.Screen name="register" />
      <Stack.Screen name="create-password" />
      <Stack.Screen name="login" />
      <Stack.Screen name="forgot-password" />
      <Stack.Screen name="reset-password" />
      <Stack.Screen name="success/community-success" />
    </Stack>
  );
};

export default StackPagesLayout;
