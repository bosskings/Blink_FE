import React from "react";
import { FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Headers } from "@/components/Headers";
import { router } from "expo-router";
import { useSavedListings } from "@/services";
import type { SavedListing } from "@/types/user";

export default function SavedItemsScreen() {
  const { data: savedItems, isLoading } = useSavedListings();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="mt-6 mb-6 px-6">
        <Headers text="Saved Items" onPress={() => router.back()} />
      </View>

      <FlatList
        data={savedItems ?? []}
        keyExtractor={(item: SavedListing) => item._id}
        contentContainerStyle={{ paddingVertical: 12, paddingHorizontal: 24, gap: 12 }}
        renderItem={({ item }: { item: SavedListing }) => (
          <View className="flex-row gap-3 p-4 bg-white border border-gray-100 shadow-sm rounded-2xl">
            {item.image && (
              <Image source={{ uri: item.image }} className="w-20 h-20 rounded-lg" resizeMode="cover" />
            )}
            <View className="flex-1" style={{ gap: 4 }}>
              <Text className="text-[15px] text-gray-900 font-bold" style={{ fontFamily: "HankenGrotesk_600SemiBold" }}>
                {item.title}
              </Text>
              {item.distance ? (
                <Text className="text-[13px] text-gray-500">{item.distance}</Text>
              ) : null}
              <Text className="text-[15px] text-[#0066CC] font-bold" style={{ fontFamily: "HankenGrotesk_700Bold" }}>
                {"\u20A6"}{item.price?.toLocaleString()}
              </Text>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View className="items-center py-12">
            <Text className="mt-3 text-[15px] text-gray-500">
              {isLoading ? "Loading..." : "No saved items yet."}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
