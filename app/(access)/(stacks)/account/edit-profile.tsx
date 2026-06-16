import { SolidMainButton } from "@/components/Btns";
import { Headers } from "@/components/Headers";
import { Feather, FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown, SlideInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

// @ts-ignore
import UpdateEmailModal from "./_components/profile/UpdateEmailModal";
import UpdateNameModal from "./_components/profile/UpdateNameModal";
import UpdatePhoneModal from "./_components/profile/UpdatePhoneModal";

export default function EditProfileScreen() {
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const [showNameModal, setShowNameModal] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setAvatarUri(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />

      {/* Header */}
      <View className="mt-6 mb-6 px-6">
        <Headers text="Profile" onPress={() => router.back()} />
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInDown.duration(600).springify()}>
          {/* Avatar Section */}
          <View className="items-center mt-4">
            <View className="relative">
              <View className="w-28 h-28 rounded-full bg-[#E8E0FF] items-center justify-center overflow-hidden">
                <Image
                  source={avatarUri ? { uri: avatarUri } : require("../../../../assets/avatars/avatar1.png")}
                  className="w-24 h-24 rounded-full"
                  resizeMode="cover"
                />
              </View>
              {/* Edit Avatar Icon */}
              <TouchableOpacity 
                className="absolute bottom-1 right-1 bg-white w-7 h-7 rounded-full items-center justify-center shadow-sm"
                onPress={pickImage}
              >
                <Feather name="edit-2" size={12} color="#4B5563" />
              </TouchableOpacity>
            </View>

            {/* Bronze Badge */}
            <View className="bg-[#D97706] px-4 py-1 rounded-full mt-[-10px] z-10 border-2 border-white">
              <Text
                className="text-white text-[12px] font-bold"
                style={{ fontFamily: "HankenGrotesk_700Bold" }}
              >
                Bronze
              </Text>
            </View>

            {/* Name & Rating */}
            <Text
              className="text-[20px] font-bold text-gray-900 mt-3 mb-1"
              style={{ fontFamily: "HankenGrotesk_700Bold" }}
            >
              Lasman Ade
            </Text>
            <View className="flex-row items-center gap-1">
              <FontAwesome name="star" size={16} color="#0066CC" />
              <FontAwesome name="star" size={16} color="#0066CC" />
              <FontAwesome name="star" size={16} color="#0066CC" />
              <FontAwesome name="star-o" size={16} color="#9CA3AF" />
              <FontAwesome name="star-o" size={16} color="#9CA3AF" />
              <Text
                className="text-[#61ADFA] text-[13px] ml-1"
                style={{ fontFamily: "HankenGrotesk_500Medium" }}
              >
                (4.6)
              </Text>
            </View>
          </View>

          {/* Info Banner */}
          <View className="bg-[#F1F8FF] rounded-2xl p-4 flex-row items-center mt-8 gap-4">
            <View className="bg-white w-8 h-8 rounded-full items-center justify-center">
              <Feather name="info" size={16} color="#0066CC" />
            </View>
            <Text
              className="flex-1 text-[13px] text-gray-800"
              style={{ fontFamily: "HankenGrotesk_500Medium", lineHeight: 18 }}
            >
              Updating your phone number or email will require verification to
              confirm your identity.
            </Text>
          </View>

          {/* Details Card */}
          <View className="bg-white rounded-2xl border border-gray-100 shadow-sm mt-6 mb-10 p-2">
            {/* Name Row */}
            <View className="flex-row items-center p-4 border-b border-gray-100">
              <Feather name="user" size={20} color="#374151" />
              <View className="flex-1 ml-4">
                <Text
                  className="text-[15px] text-gray-900 font-bold"
                  style={{ fontFamily: "HankenGrotesk_700Bold" }}
                >
                  Lasman Ade
                </Text>
              </View>
              <TouchableOpacity
                className="border border-[#0066CC] rounded-lg px-4 py-1.5"
                onPress={() => setShowNameModal(true)}
              >
                <Text
                  className="text-[#0066CC] text-[13px]"
                  style={{ fontFamily: "HankenGrotesk_500Medium" }}
                >
                  Edit
                </Text>
              </TouchableOpacity>
            </View>

            {/* Phone Row */}
            <View className="flex-row items-center p-4 border-b border-gray-100">
              <Feather name="phone" size={20} color="#374151" />
              <View className="flex-1 ml-4">
                <Text
                  className="text-[15px] text-gray-900 font-bold"
                  style={{ fontFamily: "HankenGrotesk_700Bold" }}
                >
                  08022194901
                </Text>
              </View>
              <TouchableOpacity
                className="border border-[#0066CC] rounded-lg px-4 py-1.5"
                onPress={() => setShowPhoneModal(true)}
              >
                <Text
                  className="text-[#0066CC] text-[13px]"
                  style={{ fontFamily: "HankenGrotesk_500Medium" }}
                >
                  Edit
                </Text>
              </TouchableOpacity>
            </View>

            {/* Email Row */}
            <View className="flex-row items-center p-4">
              <Feather name="mail" size={20} color="#374151" />
              <View className="flex-1 ml-4">
                <Text
                  className="text-[15px] text-gray-900 font-bold"
                  style={{ fontFamily: "HankenGrotesk_700Bold" }}
                >
                  gcruz@gmail.com
                </Text>
                <Text
                  className="text-[#10B981] text-[12px] mt-0.5"
                  style={{ fontFamily: "HankenGrotesk_500Medium" }}
                >
                  Email verified
                </Text>
              </View>
              <TouchableOpacity
                className="border border-[#0066CC] rounded-lg px-4 py-1.5"
                onPress={() => setShowEmailModal(true)}
              >
                <Text
                  className="text-[#0066CC] text-[13px]"
                  style={{ fontFamily: "HankenGrotesk_500Medium" }}
                >
                  Edit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </ScrollView>

      {/* Modals */}
      <UpdateNameModal
        visible={showNameModal}
        onClose={() => setShowNameModal(false)}
      />
      <UpdatePhoneModal
        visible={showPhoneModal}
        onClose={() => setShowPhoneModal(false)}
      />
      <UpdateEmailModal
        visible={showEmailModal}
        onClose={() => setShowEmailModal(false)}
      />
    </SafeAreaView>
  );
}
