import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MOCK_PROFILES: Record<string, { name: string; avatar: string }> = {
  "mike-berger": {
    name: "Mike Berger",
    avatar: "https://i.pravatar.cc/300?u=mike",
  },
  "jay-blazier": {
    name: "Jay Blazier",
    avatar: "https://i.pravatar.cc/300?u=jay",
  },
  "augustus-anna": {
    name: "Augustus Anna",
    avatar: "https://i.pravatar.cc/300?u=anna",
  },
};

export default function CallScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [seconds, setSeconds] = useState(45); // Start at 00:45 like the mockup

  const profile = MOCK_PROFILES[id || "mike-berger"] || MOCK_PROFILES["mike-berger"];

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FA]">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 pt-4 pb-2">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-12 h-12 rounded-full border border-black items-center justify-center"
        >
          <Ionicons name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>

        <View className="items-center">
          <Text className="text-[20px] font-bold text-black mb-1" style={{}}>
            {profile.name}
          </Text>
          <Text
            className="text-[13px] text-[#6C757D]"
            style={{ fontFamily: "HankenGrotesk_500Medium" }}
          >
            {formatTime(seconds)}
          </Text>
        </View>

        <TouchableOpacity className="w-12 h-12 rounded-full bg-[#EAEAEA] items-center justify-center">
          <Ionicons name="ellipsis-horizontal-outline" size={24} color="#000000" />
        </TouchableOpacity>
      </View>

      {/* Avatar Center */}
      <View className="flex-1 items-center justify-center">
        <Image
          source={{ uri: profile.avatar }}
          className="w-48 h-48 rounded-full"
          resizeMode="cover"
        />
      </View>

      {/* Controls Bottom */}
      <View className="flex-row items-center justify-center gap-6 pb-12 pt-8 bg-[#F0F4F8] rounded-tl-3xl rounded-tr-3xl mt-auto">
        <TouchableOpacity className="w-16 h-16 rounded-full bg-[#61ADFA] items-center justify-center shadow-sm">
          <Ionicons name="volume-high-outline" size={28} color="#FFFFFF" />
        </TouchableOpacity>

        <TouchableOpacity className="w-16 h-16 rounded-full bg-white items-center justify-center shadow-sm">
          <Ionicons name="mic-outline" size={28} color="#000000" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.back()}
          className="w-16 h-16 rounded-full bg-[#FF3B30] items-center justify-center shadow-sm"
        >
          <Ionicons name="call-outline" size={28} color="#FFFFFF" style={{ transform: [{ rotate: "135deg" }] }} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
