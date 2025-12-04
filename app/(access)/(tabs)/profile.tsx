import { useLogout } from "@/hooks/mutations/auth";
import {
  Feather,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQueryClient } from '@tanstack/react-query';
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const Profile = () => {
    const { mutate } = useLogout();
    const queryCLient = useQueryClient();

    const handleLogout = async () => {
    mutate();
    await queryCLient.clear();
    await AsyncStorage.removeItem("blink_token");
    await AsyncStorage.removeItem("blink_onboarding");
    router.replace("/login");
  };


  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />

      <View className="bg-[#F8F9FA]">
        <View className="bg-white px-6 pt-8 pb-10 mb-10" style={{ rowGap: 25 }}>
          <Text
            className="text-xl"
            style={{ fontFamily: "HankenGrotesk_700Bold" }}
          >
            My Account
          </Text>
          <View
            className="flex-row items-center justify-between w-full rounded-xl p-6 gap-5"
            style={{ backgroundColor: "#0066CC" }}
          >
            <View className="relative">
              <Image
                source={require("../../../assets/avatars/avatar1.png")}
                className="w-[6.5rem] h-[6.5rem] rounded-full"
                resizeMode="cover"
              />

              <Image
                source={require("../../../assets/images/bronze.png")}
                className="w-14 h-14 rounded-full absolute right-[-20%] bottom-1"
                resizeMode="center"
              />
            </View>
            <View className="flex-col" style={{ rowGap: 10 }}>
              <Text
                className="text-white text-xl"
                style={{ fontFamily: "HankenGrotesk_900Black" }}
              >
                Lasman Ade
              </Text>
              <View className="flex-row gap-2" style={{ rowGap: 5 }}>
                <View className="flex-row gap-2" style={{ rowGap: 5 }}>
                  <FontAwesome name="star-o" size={20} color="#F5CB10" />
                  <FontAwesome name="star-o" size={20} color="#F5CB10" />
                  <FontAwesome name="star-o" size={20} color="#F5CB10" />
                  <FontAwesome name="star-o" size={20} color="#61ADFA" />
                  <FontAwesome name="star-o" size={20} color="#61ADFA" />
                </View>
                <Text
                  className="text-white"
                  style={{ fontFamily: "HankenGrotesk_600SemiBold" }}
                >
                  (4.6)
                </Text>
              </View>
            </View>
            <View>
              <TouchableOpacity className="bg-[#61ADFA] p-3 rounded-full">
                <MaterialIcons
                  name="arrow-forward-ios"
                  size={18}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <ScrollView
          className="flex-col bg-white px-6 pt-8"
          contentContainerStyle={{ paddingBottom: 100, rowGap: 10 }}
          showsVerticalScrollIndicator={false}
        >
          <TouchableOpacity className="flex-row items-center bg-white px-6 py-3 rounded-2xl border border-gray-50 overflow-hidden shadow-sm">
            <View className="flex-1 flex-row items-center gap-5">
              <View className="p-3 rounded-full bg-[#F8F9FA] w-fit">
                <MaterialIcons name="save-alt" size={20} color="#D9D9D9" />
              </View>
              <Text
                className="text-base text-black"
                style={{ fontFamily: "HankenGrotesk_400Regular" }}
              >
                Saved Items
              </Text>
            </View>
            <MaterialIcons name="arrow-forward-ios" size={17} color="#D9D9D9" />
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row items-center bg-white px-6 py-3 rounded-2xl border border-gray-50 overflow-hidden shadow-sm"
            onPress={() =>
              router.push("/(access)/(stacks)/account/community-membership")
            }
          >
            <View className="flex-1 flex-row items-center gap-5">
              <View className="p-3 rounded-full bg-[#F8F9FA] w-fit">
                <Feather name="users" size={20} color="#D9D9D9" />
              </View>
              <Text
                className="text-base text-black"
                style={{ fontFamily: "HankenGrotesk_400Regular" }}
              >
                Community Membership
              </Text>
            </View>
            <MaterialIcons name="arrow-forward-ios" size={17} color="#D9D9D9" />
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row items-center bg-white px-6 py-3 rounded-2xl border border-gray-50 overflow-hidden shadow-sm"
            onPress={() =>
              router.push("/(access)/(stacks)/account/lease-closet")
            }
          >
            <View className="flex-1 flex-row items-center gap-5">
              <View className="p-3 rounded-full bg-[#F8F9FA] w-fit">
                <Ionicons name="storefront-outline" size={20} color="#D9D9D9" />
              </View>
              <Text
                className="text-base text-black"
                style={{ fontFamily: "HankenGrotesk_400Regular" }}
              >
                Lease Closet
              </Text>
            </View>
            <MaterialIcons name="arrow-forward-ios" size={17} color="#D9D9D9" />
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center bg-white px-6 py-3 rounded-2xl border border-gray-50 overflow-hidden shadow-sm">
            <View className="flex-1 flex-row items-center gap-5">
              <View className="p-3 rounded-full bg-[#F8F9FA] w-fit">
                <Ionicons
                  name="notifications-outline"
                  size={20}
                  color="#D9D9D9"
                />
              </View>
              <Text
                className="text-base text-black"
                style={{ fontFamily: "HankenGrotesk_400Regular" }}
              >
                Notification
              </Text>
            </View>
            <MaterialIcons name="arrow-forward-ios" size={17} color="#D9D9D9" />
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center bg-white px-6 py-3 rounded-2xl border border-gray-50 overflow-hidden shadow-sm">
            <View className="flex-1 flex-row items-center gap-5">
              <View className="p-3 rounded-full bg-[#F8F9FA] w-fit">
                <MaterialIcons name="support-agent" size={20} color="#D9D9D9" />
              </View>
              <Text
                className="text-base text-black"
                style={{ fontFamily: "HankenGrotesk_400Regular" }}
              >
                Contact Support
              </Text>
            </View>
            <MaterialIcons name="arrow-forward-ios" size={17} color="#D9D9D9" />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleLogout}  className="flex-row items-center bg-white px-6 py-3 rounded-2xl border border-gray-50 overflow-hidden shadow-sm">
            <View className="flex-1 flex-row items-center gap-5">
              <View className="p-3 rounded-full bg-[#F8F9FA] w-fit">
                <MaterialIcons name="logout" size={20} color="#D9D9D9" />
              </View>
              <Text
                className="text-base text-black"
                style={{ fontFamily: "HankenGrotesk_400Regular" }}
              >
                Logout
              </Text>
            </View>
            <MaterialIcons name="arrow-forward-ios" size={17} color="#D9D9D9" />
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
