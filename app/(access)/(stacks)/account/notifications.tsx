import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Headers } from "@/components/Headers";
import { router } from "expo-router";
import { useNotifications } from "@/services";
import Animated, { FadeInDown, FadeOutDown, LinearTransition } from "react-native-reanimated";

const iconForType = (type: string) => {
  switch (type) {
    case "message": return <Ionicons name="chatbubble-outline" size={18} color="#0066CC" />;
    case "item": return <Ionicons name="pricetag-outline" size={18} color="#0066CC" />;
    case "payment": return <Ionicons name="card-outline" size={18} color="#0066CC" />;
    default: return <Ionicons name="notifications-outline" size={18} color="#0066CC" />;
  }
};

export default function NotificationsScreen() {
  const { data: notifications } = useNotifications();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="mt-6 mb-6 px-6">
        <Headers text="Notifications" onPress={() => router.back()} />
      </View>

      <FlatList
        data={notifications || []}
        keyExtractor={(item: any) => item.id}
        contentContainerStyle={{ paddingVertical: 24, paddingHorizontal: 24, gap: 15 }}
        renderItem={({ item, index }: { item: any; index: number }) => (
          <Animated.View
            layout={LinearTransition.springify().damping(15).stiffness(90)}
            entering={FadeInDown.duration(600).delay(100 + index * 50).springify()}
            exiting={FadeOutDown.duration(200)}
            className="flex-row items-start p-5 bg-white border border-gray-100 shadow rounded-2xl"
          >
            <View className="items-center justify-center w-12 h-12 mr-4 rounded-full bg-[#F1F8FF]">
              {iconForType(item.type)}
            </View>
            <View className="flex-1" style={{ gap: 4 }}>
              <Text className="text-[15px] font-bold" style={{ fontFamily: "HankenGrotesk_500Medium" }}>{item.title}</Text>
              <Text className="text-[13px] text-gray-500" style={{ fontFamily: "HankenGrotesk_500Medium" }}>{item.description}</Text>
              <Text className="text-[12px] text-[#0066CC] mt-1" style={{ fontFamily: "HankenGrotesk_500Medium" }}>{item.time}</Text>
            </View>
          </Animated.View>
        )}
        ListEmptyComponent={
          <View className="items-center py-12">
            <Ionicons name="notifications-off-outline" size={32} color="#9CA3AF" />
            <Text className="mt-3 text-[15px] text-gray-500">You're all caught up!</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
