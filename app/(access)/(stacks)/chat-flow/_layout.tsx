import { Stack } from "expo-router";

export default function ChatFlowLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="chat/[id]" />
      <Stack.Screen name="call/[id]" />
      <Stack.Screen name="start-conversation" />
    </Stack>
  );
}
