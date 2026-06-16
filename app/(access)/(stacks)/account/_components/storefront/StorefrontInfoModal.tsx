import { SolidMainButton } from "@/components/Btns";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function StorefrontInfoModal({ visible, onClose }: Props) {
  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 items-center justify-center bg-black/40 px-4">
        <Animated.View
          entering={FadeInDown.duration(400)}
          className="w-full bg-white rounded-3xl overflow-hidden shadow-lg p-6"
        >
          <TouchableOpacity
            className="absolute top-4 right-4 z-10 p-2"
            onPress={onClose}
          >
            <Feather name="x" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <View className="items-center mt-2">
            <Text
              className="text-[22px] font-bold text-[#0066CC] text-center"
              style={{ fontFamily: "HankenGrotesk_700Bold", lineHeight: 28 }}
            >
              Setup Your{"\n"}Storefront in Minutes
            </Text>
          </View>

          <View className="w-full h-[1px] bg-gray-100 my-6" />

          <Text
            className="text-[17px] font-bold text-gray-900 mb-4"
            style={{ fontFamily: "HankenGrotesk_700Bold" }}
          >
            Key Benefits
          </Text>

          <View className="w-full" style={{ gap: 16 }}>
            <BenefitRow
              title="Personalized Branding"
              description="Add your store name, logo, and description"
            />
            <BenefitRow
              title="Centralized Listings"
              description="All your items in one easy-to-browse storefront"
            />
            <BenefitRow
              title="Boost Credibility"
              description="Verified storefronts attract more buyers"
            />
            <BenefitRow
              title="Easy Sharing"
              description="Share your unique storefront link anywhere"
            />
          </View>

          <View className="mt-8">
            <SolidMainButton
              text="Continue To Setup"
              onPress={() => {
                onClose();
                setTimeout(() => {
                  router.push("/(access)/(stacks)/account/storefront-setup");
                }, 300);
              }}
            />
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

function BenefitRow({ title, description }: { title: string; description: string }) {
  return (
    <View className="flex-row items-start gap-3">
      <View className="mt-1">
        <Feather name="check-circle" size={18} color="#0066CC" />
      </View>
      <View className="flex-1 flex-col">
        <Text
          className="text-[15px] font-bold text-gray-900"
          style={{ fontFamily: "HankenGrotesk_700Bold" }}
        >
          {title}
        </Text>
        <Text
          className="text-[13px] text-gray-600 mt-0.5"
          style={{ fontFamily: "HankenGrotesk_500Medium" }}
        >
          {description}
        </Text>
      </View>
    </View>
  );
}
