import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

interface ButtonProps {
  text?: string;
  onPress: () => void;
}
export const Headers = ({ text, onPress, ...props }: ButtonProps) => {
  return (
    <View className="flex-row justify-start items-center">
      <TouchableOpacity className="self-start" onPress={onPress}>
        <View
          className="rounded-full border border-gray-300 items-center justify-center"
          style={{ width: 45, height: 45 }}
          {...props}
        >
          <Ionicons name="arrow-back" size={22} color="#3A3541" />
        </View>
      </TouchableOpacity>
      <Text
        style={{
          fontFamily: "HankenGrotesk_900Black",
          fontSize: 17,
          marginLeft: "25%",
        }}
      >
        {text}
      </Text>
    </View>
  );
};
