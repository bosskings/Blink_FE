import { SolidMainButton } from "@/components/Btns";
import React, { useState } from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import Animated, { SlideInDown } from "react-native-reanimated";

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function UpdatePhoneModal({ visible, onClose }: Props) {
  const [phone, setPhone] = useState("");

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
            Update your phone number
          </Text>

          {/* Input field container */}
          <View className="w-full bg-[#F9FAFB] rounded-xl flex-row items-center px-4 h-14 border border-gray-100">
            {/* Country Selector (Static for UI) */}
            <View className="flex-row items-center border-r border-gray-300 pr-3 mr-3">
              <View className="w-5 h-3.5 bg-green-600 flex-row mr-2">
                <View className="flex-1 bg-green-600" />
                <View className="flex-1 bg-white" />
                <View className="flex-1 bg-green-600" />
              </View>
              <Text
                className="text-[14px] text-gray-700"
                style={{ fontFamily: "HankenGrotesk_500Medium" }}
              >
                +234 v
              </Text>
            </View>

            {/* Actual Input */}
            <TextInput
              value={phone}
              onChangeText={setPhone}
              placeholder="Phone number"
              keyboardType="phone-pad"
              className="flex-1 text-[15px] text-gray-900"
              style={{ fontFamily: "HankenGrotesk_500Medium" }}
            />
          </View>

          <View className="mt-8">
            <SolidMainButton
              text="Continue"
              onPress={() => {
                console.log("Phone updated:", phone);
                onClose();
              }}
            />
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}
