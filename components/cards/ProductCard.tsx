import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

export const ProductCard = ({ item }: { item: any }) => {
  const handleRedirectItem = () => {
    router.push({
      pathname: "/(access)/(stacks)/item/[id]",
      params: { id: item.id, itemData: JSON.stringify(item) },
    });
  };

  return (
    <Pressable
      onPress={handleRedirectItem}
      className="mb-4 overflow-hidden bg-white border border-gray-200 rounded-xl"
    >
      <View className="relative">
        {item.tag === "SALE" && (
          <View className="absolute top-3 left-3 border border-blue-500 bg-[#0066CC] px-3 py-2 rounded-full z-10">
            <Text className="text-xs font-bold text-white">{item.tag}</Text>
          </View>
        )}

        {item.tag === "SERVICE" && (
          <View className="absolute top-3 left-3 border border-green-500 bg-[#045e28] px-3 py-2 rounded-full z-10">
            <Text className="text-xs font-bold text-white">{item.tag}</Text>
          </View>
        )}

        {item.tag === "RENT" && (
          <View className="absolute top-3 left-3 border border-yellow-500 bg-[#e4a403] px-3 py-2 rounded-full z-10">
            <Text className="text-xs font-bold text-white">{item.tag}</Text>
          </View>
        )}

        <Image
          source={{ uri: item.image }}
          className="w-full h-56"
          resizeMode="cover"
        />
      </View>
      <View className="p-4">
        <View className="flex-row items-start justify-between mb-2">
          <Text className="flex-1 text-[17px] font-bold">{item.title}</Text>
          <Text className="text-[#0066CC] font-bold text-[17px]">
            {item.price}
          </Text>
        </View>
        <Text className="mb-3 text-[13px] text-gray-600">
          {item.description}
        </Text>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Ionicons name="location-outline" size={14} color="#6B7280" />
            <Text className="ml-1 mr-3 text-xs text-gray-500">
              {item.distance}
            </Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="time-outline" size={14} color="#6B7280" />
            <Text className="ml-1 text-xs text-gray-500">
              {item.timePosted}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};
