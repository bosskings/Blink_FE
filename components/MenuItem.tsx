import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
  danger?: boolean;
  textColor?: string;
  hideArrow?: boolean;
}

export const MenuItem = ({
  icon,
  label,
  onPress,
  danger = false,
  textColor,
  hideArrow = false,
}: MenuItemProps) => {
  return (
    <TouchableOpacity
      className={`flex-row items-center px-6 py-3 overflow-hidden border shadow-sm rounded-2xl ${
        danger ? "bg-[#FFF5F5] border-[#FED7D7]" : "bg-white border-gray-50"
      }`}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View className="flex-row items-center flex-1 gap-5">
        <View
          className={`p-3 rounded-full ${
            danger ? "bg-[#FEE2E2]" : "bg-[#F8F9FA]"
          }`}
        >
          {icon}
        </View>
        <Text
          className="text-[13px]"
          style={{
            color: textColor ? textColor : danger ? "#B91C1C" : "#000000",
            fontFamily: "HankenGrotesk_500Medium",
          }}
        >
          {label}
        </Text>
      </View>
      {!hideArrow && (
        <MaterialIcons
          name="arrow-forward-ios"
          size={17}
          color={danger ? "#F87171" : "#D9D9D9"}
        />
      )}
    </TouchableOpacity>
  );
};
