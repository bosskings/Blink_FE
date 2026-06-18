import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState, useMemo } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { useChats, useDeleteChat, useNotifications, useClearNotifications } from "@/services";

export default function MessagesScreen() {
  const [activeTab, setActiveTab] = useState<"Messages" | "Notifications">("Messages");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: chatsData } = useChats();
  const { data: notificationsData } = useNotifications();
  const deleteChat = useDeleteChat();
  const clearNotifications = useClearNotifications();

  const chats = useMemo(() => {
    if (!chatsData) return [];
    if (!searchQuery.trim()) return chatsData;
    const q = searchQuery.toLowerCase();
    return chatsData.filter((c: any) => c.participantName?.toLowerCase().includes(q));
  }, [chatsData, searchQuery]);

  const notifications = notificationsData || [];

  const handleDeleteChat = (id: string) => {
    deleteChat.mutate(id);
  };

  const handleClearNotifications = () => {
    clearNotifications.mutate();
  };

  const renderRightActions = (id: string) => {
    return (
      <View className="flex-row items-center pl-2 h-full py-2">
        <TouchableOpacity
          onPress={() => handleDeleteChat(id)}
          className="bg-[#FFA8A8] w-14 h-14 rounded-xl items-center justify-center mr-2"
        >
          <Ionicons name="trash-outline" size={24} color="#D01111" />
        </TouchableOpacity>
        <TouchableOpacity className="bg-[#0066CC] w-14 h-14 rounded-xl items-center justify-center mr-2">
          <Ionicons name="archive-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity className="bg-[#F8F9FA] w-14 h-14 rounded-xl items-center justify-center border border-[#D9D9D9]">
          <Ionicons name="mail-unread-outline" size={24} color="#000000" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-6 pt-6 pb-4 border-b border-gray-200">
        <Text className="text-[22px] text-black font-bold mb-4" style={{}}>
          Chats
        </Text>

        <View className="flex-row items-center bg-[#F8F9FA] rounded-2xl px-4 py-2 mb-4 border border-[#D9D9D9]">
          <TextInput
            placeholder={
              activeTab === "Messages"
                ? "Search for a message"
                : "Search for a notification"
            }
            placeholderTextColor="#D9D9D9"
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="flex-1 text-[13px]"
            style={{ color: "#000000", fontFamily: "HankenGrotesk_500Medium" }}
          />
          <TouchableOpacity className="w-8 h-8 rounded-full items-center justify-center">
            <Ionicons name="search-outline" size={20} color="#000000" />
          </TouchableOpacity>
        </View>

        {/* Segmented Control */}
        <View className="flex-row bg-[#F8F9FA] rounded-[2rem] p-1 mb-6">
          <TouchableOpacity
            onPress={() => setActiveTab("Messages")}
            className={`flex-1 py-2.5 px-6 rounded-full items-center ${
              activeTab === "Messages" ? "bg-[#0066CC]" : "bg-transparent"
            }`}
          >
            <Text
              className={`text-[13px] ${
                activeTab === "Messages" ? "text-white" : "text-[#6C757D]"
              }`}
              style={{ fontFamily: "HankenGrotesk_500Medium" }}
            >
              Messages
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab("Notifications")}
            className={`flex-1 py-2.5 px-6 rounded-full items-center ${
              activeTab === "Notifications" ? "bg-[#0066CC]" : "bg-transparent"
            }`}
          >
            <Text
              className={`text-[13px] ${
                activeTab === "Notifications" ? "text-white" : "text-[#6C757D]"
              }`}
              style={{ fontFamily: "HankenGrotesk_500Medium" }}
            >
              Notifications
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        className="flex-1 px-6 pt-4"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {activeTab === "Messages" ? (
          chats.length === 0 ? (
            <Animated.View
              entering={FadeIn}
              exiting={FadeOut}
              className="items-center justify-center mt-20"
            >
              <Text className="text-gray-500 font-bold">No messages</Text>
            </Animated.View>
          ) : (
            chats.map((chat) => (
              <Swipeable
                key={chat._id}
                renderRightActions={() => renderRightActions(chat._id)}
              >
                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: `/(access)/(stacks)/chat-flow/chat/${chat._id}`,
                      params: {
                        name: chat.participantName ?? "",
                        avatar: chat.participantAvatar ?? "",
                      },
                    } as never)
                  }
                  className="flex-row items-center py-4 border-b border-gray-100 bg-white"
                >
                  <View className="relative">
                    <Image
                      source={{ uri: chat.participantAvatar }}
                      className="w-14 h-14 rounded-full"
                    />
                    {chat.isOnline && (
                      <View className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#00C851] rounded-full border-2 border-white" />
                    )}
                  </View>
                  <View className="flex-1 ml-4">
                    <Text
                      className="text-[15px] text-black font-bold mb-1"
                      style={{}}
                    >
                      {chat.participantName}
                    </Text>
                    <Text
                      className="text-[13px] text-[#6C757D]"
                      style={{ fontFamily: "HankenGrotesk_500Medium" }}
                      numberOfLines={1}
                    >
                      {chat.lastMessage?.text}
                    </Text>
                  </View>
                  <View className="items-end">
                    <Text
                      className="text-[11px] text-[#6C757D] mb-1"
                      style={{ fontFamily: "HankenGrotesk_500Medium" }}
                    >
                      {chat.lastMessageTime}
                    </Text>
                    {(chat.unreadCount ?? 0) > 0 ? (
                      <View className="bg-[#0066CC] w-5 h-5 rounded-full items-center justify-center">
                        <Text
                          className="text-white text-[11px] font-bold"
                          style={{}}
                        >
                          {chat.unreadCount}
                        </Text>
                      </View>
                    ) : chat.readReceipt !== undefined ? (
                      <Ionicons
                        name={
                          chat.readReceipt
                            ? "checkmark-done"
                            : "checkmark-outline"
                        }
                        size={16}
                        color={chat.readReceipt ? "#0066CC" : "#6C757D"}
                      />
                    ) : null}
                  </View>
                </TouchableOpacity>
              </Swipeable>
            ))
          )
        ) : notifications.length === 0 ? (
          <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
            className="items-center justify-center mt-20"
          >
            <Text className="text-gray-500 font-bold mb-4">
              No notifications
            </Text>
          </Animated.View>
        ) : (
          <>
            <View className="flex-row justify-end mb-4">
              <TouchableOpacity onPress={handleClearNotifications}>
                <Text
                  className="text-[#0066CC] text-[13px]"
                  style={{ fontFamily: "HankenGrotesk_500Medium" }}
                >
                  Clear All
                </Text>
              </TouchableOpacity>
            </View>
            {notifications.map((notif) => (
              <View
                key={notif.id}
                className="bg-[#F8F9FA] rounded-2xl p-4 mb-4 border border-[#EAEAEA]"
              >
                <View className="flex-row items-start">
                  <View className="bg-white w-8 h-8 rounded-full items-center justify-center shadow-sm">
                    <Ionicons
                      name={
                        notif.type === "pin"
                          ? "pin-outline"
                          : "calendar-outline"
                      }
                      size={16}
                      color="#0066CC"
                    />
                  </View>
                  <View className="flex-1 ml-3">
                    <Text
                      className="text-[15px] text-black font-bold mb-1"
                      style={{}}
                    >
                      {notif.title}
                    </Text>
                    <Text
                      className="text-[11px] text-[#6C757D] mb-3"
                      style={{ fontFamily: "HankenGrotesk_500Medium" }}
                    >
                      {notif.time || notif.date}
                    </Text>

                    {notif.imageUrl && (
                    <Image
                      source={{ uri: notif.imageUrl }}
                      className="w-full h-32 rounded-xl mb-3"
                      resizeMode="cover"
                    />
                    )}

                    <Text
                      className="text-[13px] text-[#4A4A4A] mb-3"
                      style={{
                        fontFamily: "HankenGrotesk_500Medium",
                        lineHeight: 18,
                      }}
                    >
                      {notif.description}
                    </Text>

                    <TouchableOpacity className="flex-row items-center justify-end">
                      <Text
                        className="text-[#0066CC] text-[13px] font-bold mr-1"
                        style={{}}
                      >
                        Read More
                      </Text>
                      <Ionicons
                        name="arrow-forward-outline"
                        size={14}
                        color="#0066CC"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
