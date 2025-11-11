// components/CountdownTimer.tsx
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useMemo, useState } from "react";
import { Text, View } from "react-native";

type Props = {
  endsAt?: number | string;
  durationSeconds?: number;
  onComplete?: () => void;
};

const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);

export default function CountdownTimer({
  endsAt,
  durationSeconds,
  onComplete,
}: Props) {
  const targetMs = useMemo(() => {
    if (!endsAt && !durationSeconds) return null;
    if (endsAt)
      return typeof endsAt === "string"
        ? Date.parse(endsAt)
        : (endsAt as number);
    return Date.now() + (durationSeconds ?? 0) * 1000;
  }, [endsAt, durationSeconds]);

  const [remainingMs, setRemainingMs] = useState<number>(() =>
    targetMs ? Math.max(0, targetMs - Date.now()) : 0
  );

  useEffect(() => {
    if (!targetMs) return;
    setRemainingMs(Math.max(0, targetMs - Date.now()));

    const interval = setInterval(() => {
      const rem = Math.max(0, targetMs - Date.now());
      setRemainingMs(rem);
      if (rem <= 0) {
        clearInterval(interval);
        onComplete?.();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetMs, onComplete]);

  if (!targetMs) return null;

  const totalSeconds = Math.floor(Math.max(0, remainingMs) / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  // Convert days to hours for display boxes (so boxes always show HH:MM:SS)
  const displayHours = days > 0 ? days * 24 + hours : hours;

  // Friendly text
  let friendly = "";
  if (totalSeconds === 0) friendly = "Expired";
  else if (days > 0) friendly = `${days}d ${hours}h ${minutes}m`;
  else if (hours > 0) friendly = `${hours}hr ${minutes} minutes`;
  else friendly = `${minutes} minutes ${seconds} sec`;

  return (
    <View className="items-center">
      <View className="flex-row items-center justify-center gap-3 mb-2">
        <Ionicons name="stopwatch-outline" size={24} color="black" />

        <View className="bg-white border border-gray-200 rounded-md px-3 py-2 shadow">
          <Text
            className="text-lg font-semibold"
            style={{ fontFamily: "HankenGrotesk_700Bold" }}
            accessibilityLabel="hours"
          >
            {pad(displayHours)}
          </Text>
        </View>

        <Text className="text-lg font-bold">:</Text>

        <View className="bg-white border border-gray-200 rounded-md px-3 py-2 shadow">
          <Text
            className="text-lg font-semibold"
            style={{ fontFamily: "HankenGrotesk_700Bold" }}
            accessibilityLabel="minutes"
          >
            {pad(minutes)}
          </Text>
        </View>

        <Text className="text-lg font-bold">:</Text>

        <View className="bg-white border border-gray-200 rounded-md px-3 py-2 shadow">
          <Text
            className="text-lg font-semibold"
            style={{ fontFamily: "HankenGrotesk_700Bold" }}
            accessibilityLabel="seconds"
          >
            {pad(seconds)}
          </Text>
        </View>
      </View>

      <Text
        className="text-xs text-gray-600"
        style={{ fontFamily: "HankenGrotesk_500Medium" }}
      >
        Time left: {friendly}
      </Text>
    </View>
  );
}
