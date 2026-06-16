import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProductCard } from "@/components/cards/ProductCard";
import { DiscussionCard } from "@/components/cards/DiscussionCard";

export default function UserProfile() {
  const { id } = useLocalSearchParams();
  
  // Fake data for demonstration
  const isSeller = true; // Pretend we checked the backend and they are a seller
  
  const [activeTab, setActiveTab] = useState<"listings" | "posts" | "events">(isSeller ? "listings" : "posts");

  const [likedDiscussions, setLikedDiscussions] = useState<Set<string>>(new Set());

  const toggleLikeDiscussion = (discussionId: string) => {
    setLikedDiscussions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(discussionId)) {
        newSet.delete(discussionId);
      } else {
        newSet.add(discussionId);
      }
      return newSet;
    });
  };

  const listings = [
    {
      id: "1",
      title: "MacBook Pro M1 2020",
      price: "₦ 850,000",
      distance: "2.5km",
      timePosted: "2h ago",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80",
      images: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80"],
      tag: "Verified",
      isPromoted: true,
      condition: "Used - Like New",
    },
    {
      id: "2",
      title: "iPhone 13 Pro Max",
      price: "₦ 650,000",
      distance: "1.2km",
      timePosted: "5h ago",
      image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&q=80",
      images: ["https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&q=80"],
      condition: "Refurbished",
    },
  ];

  const posts = [
    {
      id: "1",
      user: "Alexa Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
      time: "2 hrs ago",
      community: "Tech Enthusiasts",
      content: "Just got my hands on the new M3 MacBook. The performance leap is incredible! Anyone else upgraded recently?",
      likes: 24,
      comments: 8,
      tags: ["#apple", "#macbook", "#tech"],
    },
  ];

  const renderContent = () => {
    if (activeTab === "listings") {
      return (
        <View className="px-6 flex-row flex-wrap justify-between pt-4 pb-20">
          {listings.map((item) => (
            <View key={item.id} className="w-[48%] mb-4">
              <ProductCard
                item={item}
              />
            </View>
          ))}
          {listings.length === 0 && (
            <Text className="text-gray-500 text-center w-full mt-10">No listings available.</Text>
          )}
        </View>
      );
    } else if (activeTab === "posts") {
      return (
        <View className="px-6 pt-4 pb-20">
          {posts.map((post) => (
            <DiscussionCard
              key={post.id}
              item={post}
              likedDiscussions={Array.from(likedDiscussions)}
              toggleLikeDiscussion={toggleLikeDiscussion}
            />
          ))}
          {posts.length === 0 && (
            <Text className="text-gray-500 text-center mt-10">No posts available.</Text>
          )}
        </View>
      );
    } else if (activeTab === "events") {
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

      {/* Header */}
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
        {/* Profile Info */}
        <View className="items-center px-6 mt-6 mb-6">
          <View className="relative mb-3">
            <Image
              source={require("../../../../assets/avatars/avatar1.png")}
              style={{ width: 100, height: 100 }}
              className="rounded-full"
            />
            <View className="absolute bottom-1 right-1 w-6 h-6 bg-green-700 rounded-full border-4 border-white" />
          </View>

          <Text className="text-2xl font-bold mb-1">Alexa Johnson</Text>
          <View className="flex-row items-center gap-1 mb-2">
            <Ionicons name="star" size={14} color="#FBBF24" />
            <Text className="text-[15px] font-semibold">4.8</Text>
            <Text className="text-gray-500 text-sm">·</Text>
            <Text className="text-gray-500 text-sm">23 reviews</Text>
          </View>
          <Text className="text-gray-500 text-sm mb-4">Member since 2022</Text>

          <TouchableOpacity
            className="bg-[#0066CC] px-8 py-3 rounded-full flex-row items-center"
            onPress={() => router.push("/(access)/(stacks)/chat-flow/chat/new-chat")}
          >
            <Ionicons name="chatbubble-outline" size={18} color="#fff" style={{ marginRight: 8 }} />
            <Text className="text-white font-semibold">Message</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View className="px-6 mb-6">
          <View className="flex-row justify-around bg-gray-50 rounded-xl py-4">
            <View className="items-center">
              <Text className="text-xl font-bold mb-1">156</Text>
              <Text className="text-xs text-gray-500">Items Sold</Text>
            </View>
            <View className="items-center">
              <Text className="text-xl font-bold mb-1">98%</Text>
              <Text className="text-xs text-gray-500">Response Rate</Text>
            </View>
            <View className="items-center">
              <Text className="text-xl font-bold mb-1">2.5km</Text>
              <Text className="text-xs text-gray-500">Distance</Text>
            </View>
          </View>
        </View>

        {/* About */}
        <View className="px-6 mb-6">
          <Text className="font-bold text-sm mb-2">About</Text>
          <Text className="text-gray-600 text-sm leading-5">
            Trusted seller with a passion for quality items. Fast
            responses and reliable transactions. All items carefully
            inspected before listing. Also an active community member in Tech Enthusiasts.
          </Text>
        </View>

        {/* Tabs */}
        <View className="flex-row px-6 border-b border-gray-100">
          {isSeller && (
            <TouchableOpacity
              onPress={() => setActiveTab("listings")}
              className={`pb-3 mr-6 ${activeTab === "listings" ? "border-b-2 border-[#0066CC]" : ""}`}
            >
              <Text className={`font-semibold ${activeTab === "listings" ? "text-[#0066CC]" : "text-gray-500"}`}>
                Listings
              </Text>
            </TouchableOpacity>
          )}
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

        {/* Content */}
        {renderContent()}
      </ScrollView>
    </SafeAreaView>
  );
}
