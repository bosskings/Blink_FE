import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, Stack } from "expo-router";
import React, { useEffect } from "react";

const StackPagesLayout = () => {
  useEffect(() => {
    (async () => {
      try {
        const onboarded = await AsyncStorage.getItem("blink_onboarding");
        const token = await AsyncStorage.getItem("blink_token");
        if (token) {
          router.replace("/home");
          return;
        }

        if (onboarded) {
          router.replace("/home");
          return;
        } else {
          router.replace("/onboarding");
          return;
        }
      } catch (error) {
        console.error(error);
        router.replace("/login");
        return;
      }
    })();
    return () => {};
  }, []);
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="login" />
    </Stack>
  );
};

export default StackPagesLayout;
