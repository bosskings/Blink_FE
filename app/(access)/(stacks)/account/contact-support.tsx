import { SolidMainButton } from "@/components/Btns";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Headers } from "@/components/Headers";
import { router } from "expo-router";
import Animated, {
  FadeInDown,
} from "react-native-reanimated";

export default function ContactSupportScreen() {
  const [message, setMessage] = useState("");
  const [topic, setTopic] = useState("");

  const handleSubmit = () => {};

  const topics = ["Payments", "Listings", "Account", "Other"];

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="mt-6 mb-6 px-6">
        <Headers text="Contact Support" onPress={() => router.back()} />
      </View>

      <View className="flex-1 px-6" style={{ gap: 24, paddingVertical: 24 }}>
        <Animated.View
          entering={FadeInDown.duration(600).delay(100).springify()}
          style={{ gap: 12 }}
        >
          <Text className="text-[15px] font-bold" style={{ fontFamily: "HankenGrotesk_500Medium" }}>
            Topic
          </Text>
          <View className="flex-row flex-wrap gap-3">
            {topics.map((t) => {
              const active = topic === t;
              return (
                <View
                  key={t}
                  className={`px-5 py-2.5 rounded-full border shadow-sm ${
                    active
                      ? "border-[#0066CC] bg-[#0066CC]"
                      : "border-gray-100 bg-white"
                  }`}
                >
                  <Text
                    className={`text-[13px] font-bold ${active ? "text-white" : "text-gray-600"}`}
                    style={{ fontFamily: "HankenGrotesk_500Medium" }}
                    onPress={() => setTopic(t)}
                  >
                    {t}
                  </Text>
                </View>
              );
            })}
          </View>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.duration(600).delay(250).springify()}
          style={{ gap: 12 }}
        >
          <Text className="text-[15px] font-bold" style={{ fontFamily: "HankenGrotesk_500Medium" }}>
            Message
          </Text>
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Describe your issue"
            placeholderTextColor="#9CA3AF"
            multiline
            numberOfLines={5}
            className="w-full p-4 text-[15px] bg-white border border-gray-100 shadow-sm rounded-2xl"
            style={{ minHeight: 140, textAlignVertical: "top", fontFamily: "HankenGrotesk_500Medium" }}
          />
        </Animated.View>

        <Animated.View
          entering={FadeInDown.duration(600).delay(400).springify()}
          className="pb-6 mt-auto"
        >
          <SolidMainButton text="Send Message" onPress={handleSubmit} />
          <View className="flex-row items-center justify-center gap-2 mt-4">
            <Ionicons name="shield-checkmark-outline" size={16} color="#9CA3AF" />
            <Text className="text-[12px] text-gray-500" style={{ fontFamily: "HankenGrotesk_500Medium" }}>
              Support typically replies within a few minutes.
            </Text>
          </View>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}
