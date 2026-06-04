import React from "react";
import { FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const savedItems = [
  {
    id: "1",
    title: "Road Bicycle",
    price: "₦45,000",
    distance: "0.7km",
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600&h=400&fit=crop",
  },
  {
    id: "2",
    title: "Laptop Stand",
    price: "₦12,500",
    distance: "0.5km",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=400&fit=crop",
  },
  {
    id: "3",
    title: "Office Chair",
    price: "₦35,000",
    distance: "1.2km",
    image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=600&h=400&fit=crop",
  },
];

export default function SavedItemsScreen() {
  return (
    <SafeAreaView className="flex-1 px-4 bg-white">
      <View className="py-4 border-b border-gray-100">
        <Text className="text-[17px] text-gray-900 font-hankenBold">
          Saved Items
        </Text>
        <Text className="mt-1 text-[13px] text-gray-500 font-hankenRegular">
          Quick access to things you liked
        </Text>
      </View>

      <FlatList
        data={savedItems}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 12, gap: 12 }}
        renderItem={({ item }) => (
          <View className="flex-row gap-3 p-3 bg-white border border-gray-100 shadow-sm rounded-xl">
            <Image
              source={{ uri: item.image }}
              className="w-20 h-20 rounded-lg"
              resizeMode="cover"
            />
            <View className="flex-1" style={{ gap: 4 }}>
              <Text className="text-[15px] text-gray-900 font-hankenSemiBold">
                {item.title}
              </Text>
              <Text className="text-[13px] text-gray-600 font-hankenRegular">
                {item.distance}
              </Text>
              <Text className="text-[15px] text-[#0066CC] font-hankenBold">
                {item.price}
              </Text>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View className="items-center py-12">
            <Text className="mt-3 text-[15px] text-gray-500 font-hankenRegular">
              No saved items yet.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
