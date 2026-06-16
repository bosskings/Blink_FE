import { SolidMainButton } from "@/components/Btns";
import React, { useState } from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import Animated, { SlideInDown } from "react-native-reanimated";

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function UpdateEmailModal({ visible, onClose }: Props) {
  const [email, setEmail] = useState("");

  if (!visible) return null;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 justify-end bg-black/40">
        <TouchableOpacity
          className="absolute inset-0"
          activeOpacity={1}
          onPress={onClose}
        />
        <Animated.View
          entering={SlideInDown.duration(300)}
          className="bg-white rounded-t-3xl p-6"
          style={{ paddingBottom: 40 }}
        >
          {/* Modal Handle */}
          <View className="w-12 h-1.5 bg-gray-300 rounded-full self-center mb-6" />

          <Text
            className="text-[17px] font-bold text-gray-900 mb-6 text-center"
            style={{ fontFamily: "HankenGrotesk_700Bold" }}
          >
            Update your email
          </Text>

          {/* Input field */}
          <View className="w-full bg-[#F9FAFB] rounded-xl flex-row items-center px-4 h-14 border border-gray-100 mb-8">
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Email address"
              keyboardType="email-address"
              autoCapitalize="none"
              className="flex-1 text-[15px] text-gray-900"
              style={{ fontFamily: "HankenGrotesk_500Medium" }}
            />
          </View>

          <SolidMainButton
            text="Continue"
            onPress={() => {
              console.log("Email updated:", email);
              onClose();
            }}
          />
        </Animated.View>
      </View>
    </Modal>
  );
}
