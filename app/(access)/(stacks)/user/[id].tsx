import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "@/services";

export default function UserProfile() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: user, isLoading, error } = useUser(id ?? "");

  const [activeTab, setActiveTab] = useState<"listings" | "posts" | "events">("listings");

  const displayName = user
    ? `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim()
    : "";

  const avatarSource = user?.avatar
    ? { uri: user.avatar }
    : require("../../../../assets/avatars/avatar1.webp");

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size="large" color="#0066CC" />
      </SafeAreaView>
    );
  }

  if (error || !user) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center px-6">
        <Text className="text-gray-500 text-center">
          {error instanceof Error ? error.message : "User not found."}
        </Text>
        <TouchableOpacity onPress={() => router.back()} className="mt-4">
          <Text className="text-[#0066CC] font-semibold">Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const renderContent = () => {
    if (activeTab === "listings") {
      return (
        <View className="px-6 pt-4 pb-20">
          <Text className="text-gray-500 text-center mt-10">No listings available.</Text>
        </View>
      );
    } else if (activeTab === "posts") {
      return (
        <View className="px-6 pt-4 pb-20">
          <Text className="text-gray-500 text-center mt-10">No posts available.</Text>
        </View>
      );
    } else {
      return (
        <View className="px-6 pt-4 pb-20">
          <Text className="text-gray-500 text-center mt-10">No events hosted.</Text>
        </View>
      );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />

      <View className="flex-row items-center px-6 py-4 border-b border-gray-100">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center mr-4"
        >
          <Ionicons name="arrow-back" size={20} color="#000" />
        </TouchableOpacity>
        <Text className="text-xl font-bold">Profile</Text>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="items-center px-6 mt-6 mb-6">
          <View className="relative mb-3">
            <Image
              source={avatarSource}
              style={{ width: 100, height: 100 }}
              className="rounded-full"
            />
            <View className="absolute bottom-1 right-1 w-6 h-6 bg-green-700 rounded-full border-4 border-white" />
          </View>

          <Text className="text-2xl font-bold mb-1">{displayName || "User"}</Text>
          {user.blinkTag && (
            <Text className="text-gray-500 text-sm mb-2">@{user.blinkTag}</Text>
          )}
          <Text className="text-gray-500 text-sm mb-4">
            {user.role === "USER" ? "Member" : user.role}
          </Text>

          <TouchableOpacity
            className="bg-[#0066CC] px-8 py-3 rounded-full flex-row items-center"
            onPress={() =>
              router.push(`/(access)/(stacks)/chat-flow/start-conversation` as const)
            }
          >
            <Ionicons name="chatbubble-outline" size={18} color="#fff" style={{ marginRight: 8 }} />
            <Text className="text-white font-semibold">Message</Text>
          </TouchableOpacity>
        </View>

        {user.bio ? (
          <View className="px-6 mb-6">
            <Text className="font-bold text-sm mb-2">About</Text>
            <Text className="text-gray-600 text-sm leading-5">{user.bio}</Text>
          </View>
        ) : null}

        <View className="flex-row px-6 border-b border-gray-100">
          <TouchableOpacity
            onPress={() => setActiveTab("listings")}
            className={`pb-3 mr-6 ${activeTab === "listings" ? "border-b-2 border-[#0066CC]" : ""}`}
          >
            <Text className={`font-semibold ${activeTab === "listings" ? "text-[#0066CC]" : "text-gray-500"}`}>
              Listings
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab("posts")}
            className={`pb-3 mr-6 ${activeTab === "posts" ? "border-b-2 border-[#0066CC]" : ""}`}
          >
            <Text className={`font-semibold ${activeTab === "posts" ? "text-[#0066CC]" : "text-gray-500"}`}>
              Posts
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab("events")}
            className={`pb-3 ${activeTab === "events" ? "border-b-2 border-[#0066CC]" : ""}`}
          >
            <Text className={`font-semibold ${activeTab === "events" ? "text-[#0066CC]" : "text-gray-500"}`}>
              Events
            </Text>
          </TouchableOpacity>
        </View>

        {renderContent()}
      </ScrollView>
    </SafeAreaView>
  );
}
