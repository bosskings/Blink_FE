import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export const DiscussionCard = ({
  item,
  likedDiscussions,
  toggleLikeDiscussion,
}: {
  item: any;
  likedDiscussions: string[];
  toggleLikeDiscussion: (id: string) => void;
}) => (
  <View
    key={item.id}
    className="bg-white px-6 py-6 rounded-2xl border border-gray-100 overflow-hidden shadow mb-4"
  >
    {/* User Info */}
    <View className="flex-row items-center justify-between mb-3">
      <View className="flex-row items-center">
        <Image
          source={{ uri: item.avatar }}
          className="w-14 h-14 rounded-full"
        />
        <View className="ml-3">
          <Text className="font-semibold text-[15px]">{item.user}</Text>
          <Text className="text-gray-500 text-[13px]">{item.time}</Text>
        </View>
      </View>
      <View
        className="flex-row items-center px-4 py-2 rounded-full"
        style={{
          backgroundColor: "#AAD4FF",
        }}
      >
        <Text
          className="text-xs font-bold"
          style={{
            color: "#0066CC",
          }}
        >
          {item.community}
        </Text>
      </View>
    </View>

    {/* Content */}
    <Text className="text-[#000000] text-[15px] mb-3 leading-5">
      {item.content}
    </Text>

    {/* Tags */}
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ flexDirection: "row" }}
      className="flex-row gap-2 mb-3"
    >
      {item.tags.map((tag: string, index: number) => (
        <View
          key={index}
          className="border-[1.5px] border-[#6C757D] px-4 py-1 mr-2 rounded-full"
        >
          <Text className="text-[#6C757D] text-xs font-bold">{tag}</Text>
        </View>
      ))}
    </ScrollView>

    <View
      className="w-full h-[1px] mt-2"
      style={{ backgroundColor: "#D9D9D9" }}
    />

    {/* Actions */}
    <View className="flex-row items-center gap-4 mt-4">
      <TouchableOpacity
        onPress={() => toggleLikeDiscussion(item.id)}
        className="flex-row items-center gap-1"
      >
        <Ionicons
          name={likedDiscussions.includes(item.id) ? "heart" : "heart-outline"}
          size={18}
          color={likedDiscussions.includes(item.id) ? "#FF3333" : "#6B7280"}
        />
        <Text
          className={`text-[13px] ${
            likedDiscussions.includes(item.id)
              ? "text-[#FF3333]"
              : "text-gray-600"
          }`}
        >
          {item.likes + (likedDiscussions.includes(item.id) ? 1 : 0)}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity className="flex-row items-center gap-1">
        <Ionicons name="chatbubble-outline" size={18} color="#6B7280" />
        <Text className="text-gray-600 text-[13px]">{item.comments}</Text>
      </TouchableOpacity>
    </View>
  </View>
);
