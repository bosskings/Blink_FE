import { useAuth } from "@/providers/AuthProvider";
import { useUserProfile, useUserProfileActions } from "@/providers/UserProfileProvider";
import { Feather, FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useQueryClient } from "@tanstack/react-query";
import { router, useFocusEffect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MenuItem } from "@/components/MenuItem";
import DeleteAccountModal from "../(stacks)/account/_components/DeleteAccountModal";

const Profile = () => {
  const queryClient = useQueryClient();
  const { logout } = useAuth();
  const { profile } = useUserProfile();
  const { refreshProfile } = useUserProfileActions();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useFocusEffect(
    useCallback(() => {
      refreshProfile();
    }, [refreshProfile]),
  );

  const handleLogout = async () => {
    await queryClient.clear();
    await logout();
    router.replace({ pathname: "/(noaccess)/login", params: { variant: "returning" } });
  };

  const displayName = profile
    ? `${profile.firstName ?? ""} ${profile.lastName ?? ""}`.trim()
    : "";

  const avatarSource = profile?.avatar
    ? profile.avatar.startsWith("avatar")
      ? require("../../../assets/avatars/avatar1.png")
      : { uri: profile.avatar }
    : require("../../../assets/avatars/avatar1.png");

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />

      <View className="flex-1 bg-[#F8F9FA]">
        <View className="px-6 pt-8 pb-10 mb-10 bg-white" style={{ gap: 25 }}>
          <Text className="text-[17px]">My Account</Text>
          <View className="flex-row items-center justify-between w-full gap-5 p-6 rounded-xl" style={{ backgroundColor: "#0066CC" }}>
            <View className="relative">
              <Image source={avatarSource} className="w-[6.5rem] h-[6.5rem] rounded-full" resizeMode="cover" />
              <Image source={require("../../../assets/images/bronze.png")} className="w-14 h-14 rounded-full absolute right-[-20%] bottom-1" resizeMode="center" />
            </View>
            <View className="flex-col" style={{ gap: 10 }}>
              <Text className="text-xl text-white">{profile?.blinkTag ?? (displayName || "Your Name")}</Text>
              <View className="flex-row gap-2">
                <View className="flex-row gap-2">
                  <FontAwesome name="star-o" size={18} color="#F5CB10" />
                  <FontAwesome name="star-o" size={18} color="#F5CB10" />
                  <FontAwesome name="star-o" size={18} color="#F5CB10" />
                  <FontAwesome name="star-o" size={18} color="#61ADFA" />
                  <FontAwesome name="star-o" size={18} color="#61ADFA" />
                </View>
                <Text className="text-white">(4.6)</Text>
              </View>
            </View>
            <View>
              <TouchableOpacity
                className="bg-[#61ADFA] p-3 rounded-full"
                onPress={() => router.push("/(access)/(stacks)/account/edit-profile")}
              >
                <MaterialIcons name="arrow-forward-ios" size={18} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <ScrollView className="flex-1 flex-col px-6 pt-8 bg-white" contentContainerStyle={{ paddingBottom: 180, gap: 10 }} showsVerticalScrollIndicator={false}>
          <MenuItem icon={<MaterialIcons name="save-alt" size={18} color="#D9D9D9" />} label="Saved Items"
            onPress={() => router.push("/(access)/(stacks)/account/saved-items" as const)} />
          <MenuItem icon={<Feather name="users" size={18} color="#D9D9D9" />} label="Community Membership"
            onPress={() => router.push("/(access)/(stacks)/account/community-membership")} />
          <MenuItem icon={<Ionicons name="storefront-outline" size={18} color="#D9D9D9" />} label="Lease Closet"
            onPress={() => router.push("/(access)/(stacks)/account/lease-closet")} />
          <MenuItem icon={<MaterialIcons name="account-balance" size={18} color="#D9D9D9" />} label="Payout Settings"
            onPress={() => router.push("/(access)/(stacks)/account/payout-settings")} />
          <MenuItem icon={<Ionicons name="notifications-outline" size={18} color="#D9D9D9" />} label="Notification"
            onPress={() => router.push("/(access)/(stacks)/account/notifications" as const)} />
          <MenuItem icon={<MaterialIcons name="support-agent" size={18} color="#D9D9D9" />} label="Contact Support"
            onPress={() => router.push("/(access)/(stacks)/account/contact-support" as const)} />
          <MenuItem icon={<Ionicons name="trash-outline" size={18} color="#DC2626" />} label="Delete Account"
            onPress={() => setShowDeleteModal(true)} danger />
          <MenuItem icon={<MaterialIcons name="logout" size={18} color="#DC2626" />} label="Log Out"
            onPress={handleLogout} danger />
        </ScrollView>
      </View>

      <DeleteAccountModal
        visible={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
      />
    </SafeAreaView>
  );
};

export default Profile;
