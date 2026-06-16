import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Mock user profiles based on ID
const MOCK_PROFILES: Record<
  string,
  { name: string; avatar: string; isOnline: boolean }
> = {
  "mike-berger": {
    name: "Mike Berger",
    avatar: "https://i.pravatar.cc/150?u=mike",
    isOnline: true,
  },
  "jay-blazier": {
    name: "Jay Blazier",
    avatar: "https://i.pravatar.cc/150?u=jay",
    isOnline: false,
  },
  "augustus-anna": {
    name: "Augustus Anna",
    avatar: "https://i.pravatar.cc/150?u=anna",
    isOnline: false,
  },
};

type Message = {
  id: string;
  text?: string;
  sender: "me" | "them";
  time: string;
  type?: "text" | "location";
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    text: "Hi there! I'm interested in the vintage camera. Is it available",
    sender: "me",
    time: "10:32 AM",
    type: "text",
  },
  {
    id: "2",
    text: "Yes! It is in a great condition.",
    sender: "them",
    time: "10:33 AM",
    type: "text",
  },
  {
    id: "3",
    text: "Okay. I've just made the payment.\nCan you confirm please",
    sender: "me",
    time: "10:45 AM",
    type: "text",
  },
  {
    id: "4",
    text: "I'll be in the Central Park in the next 30 minutes to deliver your purchase",
    sender: "them",
    time: "10:49 AM",
    type: "text",
  },
  {
    id: "5",
    sender: "them",
    time: "10:51 AM",
    type: "location",
  },
  {
    id: "6",
    text: "Thanks! See you there in 30 minutes",
    sender: "me",
    time: "10:59 AM",
    type: "text",
  },
];

export default function ActiveChat() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState("");
  const scrollViewRef = useRef<ScrollView>(null);

  const profile = MOCK_PROFILES[id || "mike-berger"] || MOCK_PROFILES["mike-berger"];

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "me",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      type: "text",
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText("");

    // Simulate bot reply
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "That sounds great! Got it.",
        sender: "them",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        type: "text",
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1500);
  };

  useEffect(() => {
    // Scroll to bottom when messages update
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]">
      {/* Header */}
      <View className="flex-row items-center justify-between px-6 py-4 bg-[#FAFAFA]">
        <View className="flex-row items-center gap-4">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 items-center justify-center rounded-full border border-[#D9D9D9]"
          >
            <Ionicons name="arrow-back" size={20} color="#000000" />
          </TouchableOpacity>
          <View className="flex-row items-center gap-3">
            <View className="relative">
              <Image
                source={{ uri: profile.avatar }}
                className="w-12 h-12 rounded-full"
              />
              {profile.isOnline && (
                <View className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#00C851] rounded-full border-2 border-white" />
              )}
            </View>
            <View>
              <Text className="text-[17px] text-black font-bold" style={{}}>
                {profile.name}
              </Text>
              {profile.isOnline && (
                <Text
                  className="text-[13px] text-[#00C851]"
                  style={{ fontFamily: "HankenGrotesk_500Medium" }}
                >
                  Active now
                </Text>
              )}
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => router.push(`/(access)/(stacks)/chat-flow/call/${id}` as any)}
          className="w-10 h-10 items-center justify-center rounded-full bg-[#EAEAEA]"
        >
          <Ionicons name="call-outline" size={20} color="#000000" />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          ref={scrollViewRef}
          className="flex-1 px-6"
          contentContainerStyle={{ paddingTop: 20, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        >
          <Text
            className="text-center text-[#0066CC] font-bold text-[11px] mb-6 tracking-widest uppercase"
            style={{ fontFamily: "HankenGrotesk_500Medium" }}
          >
            Today
          </Text>

          {messages.map((msg) => {
            const isMe = msg.sender === "me";

            if (msg.type === "location") {
              return (
                <View key={msg.id} className="items-start mb-4 max-w-[85%]">
                  <View className="bg-white rounded-2xl overflow-hidden border border-[#EAEAEA]">
                    <Image
                      source={{
                        uri: "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
                      }}
                      className="w-full h-32"
                      resizeMode="cover"
                    />
                    <View className="p-4 bg-white">
                      <Text
                        className="text-black font-bold text-[15px] mb-3"
                        style={{}}
                      >
                        Central Park Meeting Point
                      </Text>
                      <TouchableOpacity className="bg-black rounded-xl py-3 flex-row items-center justify-center gap-2">
                        <Ionicons
                          name="map-outline"
                          size={18}
                          color="#FFFFFF"
                        />
                        <Text
                          className="text-white text-[13px] font-bold"
                          style={{}}
                        >
                          View Map
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Text
                    className="text-[#6C757D] text-[11px] mt-1 ml-1"
                    style={{ fontFamily: "HankenGrotesk_500Medium" }}
                  >
                    {msg.time}
                  </Text>
                </View>
              );
            }

            return (
              <View
                key={msg.id}
                className={`mb-4 max-w-[85%] ${
                  isMe ? "self-end items-end" : "self-start items-start"
                }`}
              >
                <View
                  className={`rounded-2xl p-4 ${
                    isMe ? "bg-[#0066CC] rounded-tr-sm" : "bg-[#F8F9FA] rounded-tl-sm border border-[#EAEAEA]"
                  }`}
                >
                  <Text
                    className={`text-[13px] ${
                      isMe ? "text-white" : "text-black"
                    }`}
                    style={{
                      fontFamily: "HankenGrotesk_500Medium",
                      lineHeight: 20,
                    }}
                  >
                    {msg.text}
                  </Text>
                  <Text
                    className={`text-[11px] mt-2 text-right ${
                      isMe ? "text-[#B3D4FF]" : "text-[#6C757D]"
                    }`}
                    style={{ fontFamily: "HankenGrotesk_500Medium" }}
                  >
                    {msg.time}
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>

        {/* Input Area */}
        <View className="px-6 py-4 bg-white border-t border-gray-100">
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
                inputText.trim() ? "bg-[#0066CC]" : "bg-[#D9D9D9]"
              }`}
            >
              <Ionicons
                name="send-outline"
                size={16}
                color={inputText.trim() ? "#FFFFFF" : "#FFFFFF"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
