import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function StartConversationScreen() {
  const { name = "Alexa", avatarUrl = "https://i.pravatar.cc/150?u=alexa" } =
    useLocalSearchParams<{ name: string; avatarUrl: string }>();
  const [inputText, setInputText] = useState("");

  const handleSend = () => {
    if (!inputText.trim()) return;
    // For demo purposes, we just go back to messages tab or open the actual chat screen.
    // Assuming starting a chat creates a chat id 'new-chat'
    router.replace(`/(access)/(stacks)/chat-flow/chat/new-chat` as any);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1">
          {/* Top Half Background Pattern */}
          <View className="flex-1 bg-[#1A73E8] items-center justify-center overflow-hidden">
            {/* We use a simple view to represent the blue pattern background */}
            <View className="absolute inset-0 opacity-10">
              <Ionicons
                name="musical-notes-outline"
                size={80}
                color="#FFFFFF"
                style={{ position: "absolute", top: 20, left: 30 }}
              />
              <Ionicons
                name="star-outline"
                size={60}
                color="#FFFFFF"
                style={{ position: "absolute", top: 120, right: 40 }}
              />
              <Ionicons
                name="headset-outline"
                size={100}
                color="#FFFFFF"
                style={{ position: "absolute", bottom: 20, left: 80 }}
              />
              <Ionicons
                name="mic-outline"
                size={70}
                color="#FFFFFF"
                style={{ position: "absolute", bottom: 60, right: 60 }}
              />
            </View>
          </View>

          {/* Bottom Half */}
          <View className="flex-1 bg-white items-center pt-20 px-6">
            <View className="absolute -top-12 flex-row items-center justify-center">
              {/* My Avatar (Mock) */}
              <View className="w-24 h-24 rounded-full border-4 border-white bg-[#EAEAEA] overflow-hidden z-10">
                <Image
                  source={{ uri: "https://i.pravatar.cc/150?u=me" }}
                  className="w-full h-full"
                />
              </View>
              {/* Their Avatar */}
              <View className="w-24 h-24 rounded-full border-4 border-white bg-[#EAEAEA] overflow-hidden -ml-6">
                <Image source={{ uri: avatarUrl }} className="w-full h-full" />
              </View>
            </View>

            <Text
              className="text-[22px] font-bold text-black text-center mt-4"
              style={{}}
            >
              Start a conversation{"\n"}with {name}
            </Text>
          </View>
        </View>

        {/* Input Area */}
        <View className="px-6 py-4 bg-white">
          <View className="flex-row items-center bg-[#F8F9FA] rounded-full px-4 py-2 border border-[#EAEAEA]">
            <TextInput
              placeholder="Send a message..."
              placeholderTextColor="#B0B0B0"
              value={inputText}
              onChangeText={setInputText}
              className="flex-1 text-[13px] py-2"
              style={{
                fontFamily: "HankenGrotesk_500Medium",
                color: "#000000",
              }}
              onSubmitEditing={handleSend}
            />
            <TouchableOpacity
              onPress={handleSend}
              className={`w-10 h-10 rounded-full items-center justify-center ml-2 ${
                inputText.trim() ? "bg-[#0066CC]" : "bg-[#0066CC]"
              }`}
            >
              <Ionicons name="send-outline" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
