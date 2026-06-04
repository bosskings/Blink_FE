import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

const BRONZE_BADGE = require("../assets/images/bronze.png");

interface ProfileHeaderProps {
  displayName: string;
  avatarSource: any;
  showNotification?: boolean;
}

export const ProfileHeader = ({
  displayName,
  avatarSource,
  showNotification = true,
}: ProfileHeaderProps) => {
  return (
    <View className="bg-white border-b border-gray-100">
      <View className="flex-row items-center justify-between py-3">
        <View className="flex-row items-center">
          <View style={{ position: "relative", marginRight: 12 }}>
            <Image
              source={avatarSource}
              className="w-10 h-10 rounded-full"
              resizeMode="cover"
            />
            <Image
              source={BRONZE_BADGE}
              className="w-5 h-5 rounded-full absolute -right-1 -bottom-1"
              resizeMode="contain"
            />
          </View>

          <View>
            <Text
              className="text-[15px]"
              style={{ fontFamily: "HankenGrotesk_500Medium" }}
            >
              {displayName}
            </Text>
            <Text className="text-[12px] text-gray-500">Bronze</Text>
          </View>
        </View>

        {showNotification && (
          <TouchableOpacity
            className="w-10 h-10 bg-[#F3F4F6] rounded-full items-center justify-center relative"
            onPress={() =>
              router.push("/(access)/(stacks)/account/notifications")
            }
            activeOpacity={0.8}
          >
            <Ionicons name="notifications-outline" size={22} color="#000000" />
            <View className="w-2.5 h-2.5 bg-red-500 rounded-full absolute top-2 right-2 border-2 border-white" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
