import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const notifications = [
  { id: "1", title: "New message", description: "You have a new message from Dana", time: "2m ago", type: "message" },
  { id: "2", title: "Item approved", description: "Your listing 'Road Bicycle' was approved", time: "1h ago", type: "item" },
  { id: "3", title: "Payment received", description: "You received ₦12,500 for 'Laptop Stand'", time: "Yesterday", type: "payment" },
];

const iconForType = (type: string) => {
  switch (type) {
    case "message": return <Ionicons name="chatbubble-outline" size={18} color="#0066CC" />;
    case "item": return <Ionicons name="pricetag-outline" size={18} color="#0066CC" />;
    case "payment": return <Ionicons name="card-outline" size={18} color="#0066CC" />;
    default: return <Ionicons name="notifications-outline" size={18} color="#0066CC" />;
  }
};

export default function NotificationsScreen() {
  return (
    <SafeAreaView className="flex-1 px-4 bg-white">
      <View className="py-4 border-b border-gray-100">
        <Text className="text-[17px] text-gray-900 font-hankenBold">
          Notifications
        </Text>
        <Text className="mt-1 text-[13px] text-gray-500 font-hankenRegular">
          Stay on top of your activity
        </Text>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 12, gap: 12 }}
        renderItem={({ item }) => (
          <View className="flex-row items-start p-4 bg-white border border-gray-100 shadow-sm rounded-xl">
            <View className="items-center justify-center w-10 h-10 mr-3 rounded-full bg-blue-50">
              {iconForType(item.type)}
            </View>
            <View className="flex-1" style={{ gap: 4 }}>
              <Text className="text-[15px] text-gray-900 font-hankenSemiBold">
                {item.title}
              </Text>
              <Text className="text-[13px] text-gray-600 font-hankenRegular">
                {item.description}
              </Text>
              <Text className="text-[12px] text-gray-400 font-hankenRegular">
                {item.time}
              </Text>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View className="items-center py-12">
            <Ionicons name="notifications-off-outline" size={32} color="#9CA3AF" />
            <Text className="mt-3 text-[15px] text-gray-500 font-hankenRegular">
              You're all caught up!
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
