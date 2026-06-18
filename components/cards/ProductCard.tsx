import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import Animated from "react-native-reanimated";

export const ProductCard = ({ item }: { item: any }) => {
  const handleRedirectItem = () => {
    router.push({
      pathname: "/(access)/(stacks)/item/[id]",
      params: { id: item.id, itemData: JSON.stringify(item) },
    });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
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

        <Animated.Image
          source={{ uri: item.image }}
          className="w-full h-56"
          resizeMode="cover"
          // @ts-ignore
          sharedTransitionTag={`item-image-${item.id}`}
        />
      </View>
      <View className="p-4">
        <View className="mb-2">
          <Text className="text-[15px] font-bold mb-1" numberOfLines={1}>{item.title}</Text>
          <Text className="text-[#0066CC] font-bold text-[15px]">
            {item.price}
          </Text>
        </View>
        <Text className="mb-3 text-[13px] text-gray-600" numberOfLines={2}>
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
    </TouchableOpacity>
  );
};
