import { router } from "expo-router";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { ListingItem } from "../community-details/[id]";

import { Ionicons } from "@expo/vector-icons";

interface ListingCardProps {
  item: ListingItem;
}

const ListingCard = ({ item }: ListingCardProps) => {
  const handleRedirectItem = (item: any) => {
    router.push({
      pathname: "/(access)/(stacks)/item/[id]",
      params: { id: item.id, itemData: JSON.stringify(item) },
    });
  };

  return (
    <Pressable
      onPress={() => handleRedirectItem(item)}
      className="mb-4 bg-white rounded-xl border border-gray-200 overflow-hidden"
    >
      <View className="relative">
        {item.tag === "SALE" && (
          <View className="absolute top-3 left-3 border border-blue-500 bg-[#0066CC] px-3 py-2 rounded-full z-10">
            <Text
              style={{ fontFamily: "HankenGrotesk_500Medium" }}
              className="text-white text-xs font-bold"
            >
              {item.tag}
            </Text>
          </View>
        )}

        {item.tag === "SERVICE" && (
          <View className="absolute top-3 left-3 border border-green-500 bg-[#045e28] px-3 py-2 rounded-full z-10">
            <Text
              style={{ fontFamily: "HankenGrotesk_500Medium" }}
              className="text-white text-xs font-bold"
            >
              {item.tag}
            </Text>
          </View>
        )}

        {item.tag === "RENT" && (
          <View className="absolute top-3 left-3 border border-yellow-500 bg-[#e4a403] px-3 py-2 rounded-full z-10">
            <Text
              style={{ fontFamily: "HankenGrotesk_500Medium" }}
              className="text-white text-xs font-bold"
            >
              {item.tag}
            </Text>
          </View>
        )}

        <Image
          source={{ uri: item.image }}
          className="w-full h-56"
          resizeMode="cover"
        />
      </View>
      <View className="p-4">
        <View className="flex-row justify-between items-start mb-2">
          <Text className="font-bold text-lg flex-1">{item.title}</Text>
          <Text
            style={{ fontFamily: "HankenGrotesk_500Medium" }}
            className="text-[#0066CC] font-bold text-lg"
          >
            {item.price}
          </Text>
        </View>
        <Text
          style={{ fontFamily: "HankenGrotesk_500Medium" }}
          className="text-gray-600 text-sm mb-3"
        >
          {item.description}
        </Text>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Ionicons name="location-outline" size={14} color="#6B7280" />
            <Text
              style={{ fontFamily: "HankenGrotesk_500Medium" }}
              className="text-xs text-gray-500 ml-1 mr-3"
            >
              {item.distance}
            </Text>
          </View>
          <View className="flex-row items-cente">
            <Ionicons name="time-outline" size={14} color="#6B7280" />
            <Text
              style={{ fontFamily: "HankenGrotesk_500Medium" }}
              className="text-xs text-gray-500 ml-1"
            >
              {item.timePosted}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default ListingCard;
