import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

const StackPagesLayout = () => {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="account/notifications" />
        <Stack.Screen name="account/saved-items" />
        <Stack.Screen name="account/contact-support" />
        <Stack.Screen name="account/create-item" />
      </Stack>
    </>
  );
};

export default StackPagesLayout;
