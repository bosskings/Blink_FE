import { SolidMainButton } from "@/components/Btns";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ContactSupportScreen() {
  const [message, setMessage] = useState("");
  const [topic, setTopic] = useState("");

  const handleSubmit = () => {};

  const topics = ["Payments", "Listings", "Account", "Other"];

  return (
    <SafeAreaView className="flex-1 px-4 bg-white">
      <View className="py-4 border-b border-gray-100">
        <Text className="text-[17px] text-gray-900 font-hankenBold">
          Contact Support
        </Text>
        <Text className="mt-1 text-[13px] text-gray-500 font-hankenRegular">
          Tell us what you need help with
        </Text>
      </View>

      <View className="flex-1" style={{ gap: 16, paddingVertical: 12 }}>
        <View style={{ gap: 8 }}>
          <Text className="text-[13px] text-gray-700 font-hankenSemiBold">
            Topic
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {topics.map((t) => {
              const active = topic === t;
              return (
                <View
                  key={t}
                  className={`px-4 py-2 rounded-full border ${
                    active
                      ? "border-[#0066CC] bg-blue-50"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <Text
                    className={`text-[13px] ${active ? "text-[#0066CC]" : "text-gray-700"} font-hankenSemiBold`}
                    onPress={() => setTopic(t)}
                  >
                    {t}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        <View style={{ gap: 8 }}>
          <Text className="text-[13px] text-gray-700 font-hankenSemiBold">
            Message
          </Text>
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Describe your issue"
            placeholderTextColor="#9CA3AF"
            multiline
            numberOfLines={5}
            className="w-full p-4 text-[15px] text-gray-900 border border-gray-200 rounded-xl font-hankenRegular"
            style={{ minHeight: 140, textAlignVertical: "top" }}
          />
        </View>

        <View className="pb-6 mt-auto">
          <SolidMainButton text="Send" onPress={handleSubmit} />
          <View className="flex-row items-center gap-2 mt-3">
            <Ionicons name="shield-checkmark-outline" size={18} color="#9CA3AF" />
            <Text className="text-[12px] text-gray-500 font-hankenRegular">
              Support typically replies within a few minutes.
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
