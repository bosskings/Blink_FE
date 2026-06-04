import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { truncate } from "@/utils/truncate";

interface CommunityCardProps {
  id: number;
  name: string;
  desc?: string;
  members: string;
  status: string;
  image: string;
  nested?: string;
  variant?: "explore" | "compact";
}

export const CommunityCard = ({
  id,
  name,
  desc,
  members,
  status,
  image,
  nested,
  variant = "explore",
}: CommunityCardProps) => {
  const handlePress = () => {
    router.push({
      pathname:
        "/(access)/(stacks)/community-management-flow/community-details/[id]",
      params: { id },
    });
  };

  if (variant === "compact") {
    return (
      <View className="mb-5 mr-3 bg-white rounded shadow">
        <Image source={{ uri: image }} className="w-32 h-20 mb-1 rounded-t" />
        <View className="flex-row items-center justify-between px-2 pb-2">
          <Text className="text-[13px] font-semibold">{name}</Text>
          <Text className="text-[12px] text-gray-500">{members}</Text>
        </View>
      </View>
    );
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="bg-white px-6 py-6 rounded-2xl border border-gray-100 shadow mb-4"
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: image }}
        className="w-full rounded-2xl"
        style={{ height: 120 }}
      />
      <View className="mt-4">
        <Text className="text-lg font-black">{name}</Text>
        {desc && (
          <Text className="text-[13px] mt-1">{truncate(desc, 95)}</Text>
        )}
        <View className="flex-row items-center gap-1 mt-2">
          <Feather name="users" size={14} color="#000000" />
          <Text className="text-[12px]">{members}</Text>
          {nested && (
            <Text className="text-[12px] text-gray-500">
              {" "}
              • {nested} Nested
            </Text>
          )}
        </View>
      </View>
      {status !== "Active" && status !== "Owned" && (
        <View className="w-full flex-row items-end justify-end mt-4">
          <TouchableOpacity
            className="flex-row items-center gap-2 px-6 py-3 rounded-lg bg-[#0066CC]"
            onPress={handlePress}
          >
            <Text className="text-[13px] text-white">Join</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};
