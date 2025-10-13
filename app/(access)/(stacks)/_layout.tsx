import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

const StackPagesLayout = () => {
  return (
    <>
      <StatusBar style='dark'/>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
      </Stack>
    </>
  );
};

export default StackPagesLayout;
