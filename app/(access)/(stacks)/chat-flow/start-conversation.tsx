import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCreateChat } from "@/services";
import { useUserProfile } from "@/providers/UserProfileProvider";
import LoadingOverlay from "@/components/LoadingOverlay";

export default function StartConversationScreen() {
  const { name = "User", avatarUrl = "", userId = "" } =
    useLocalSearchParams<{ name: string; avatarUrl: string; userId: string }>();
  const [inputText, setInputText] = useState("");
  const { profile } = useUserProfile();
  const createChatMutation = useCreateChat();

  const myAvatar = profile?.avatar ?? "";

  const handleSend = () => {
    if (!inputText.trim()) return;

    if (!userId) {
      Alert.alert("Error", "Cannot start conversation without a user.");
      return;
    }

    createChatMutation.mutate(
      { participantId: userId as string },
      {
        onSuccess: (response) => {
          router.replace({
            pathname: `/(access)/(stacks)/chat-flow/chat/${response.chat._id}`,
            params: { name, avatar: avatarUrl },
          } as never);
        },
        onError: (err) => {
          Alert.alert(
            "Error",
            err instanceof Error ? err.message : "Failed to start conversation.",
          );
        },
      },
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <LoadingOverlay visible={createChatMutation.isPending} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1">
          <View className="flex-1 bg-[#1A73E8] items-center justify-center overflow-hidden">
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

          <View className="flex-1 bg-white items-center pt-20 px-6">
            <View className="absolute -top-12 flex-row items-center justify-center">
              <View className="w-24 h-24 rounded-full border-4 border-white bg-[#EAEAEA] overflow-hidden z-10">
                {myAvatar ? (
                  <Image source={{ uri: myAvatar }} className="w-full h-full" />
                ) : (
                  <View className="w-full h-full bg-[#0066CC] items-center justify-center">
                    <Ionicons name="person" size={40} color="#FFFFFF" />
                  </View>
                )}
              </View>
              <View className="w-24 h-24 rounded-full border-4 border-white bg-[#EAEAEA] overflow-hidden -ml-6">
                {avatarUrl ? (
                  <Image source={{ uri: avatarUrl }} className="w-full h-full" />
                ) : (
                  <View className="w-full h-full bg-[#61ADFA] items-center justify-center">
                    <Ionicons name="person" size={40} color="#FFFFFF" />
                  </View>
                )}
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
              disabled={createChatMutation.isPending}
              className="w-10 h-10 rounded-full items-center justify-center ml-2 bg-[#0066CC]"
            >
              <Ionicons name="send-outline" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
