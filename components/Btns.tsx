import { Text, TouchableOpacity } from "react-native";

interface ButtonProps {
  text: string;
  onPress?: () => void;
  disabled?: boolean;
}
export const SolidMainButton = ({ text, onPress, ...props }: ButtonProps) => {
  return (
    <TouchableOpacity
      {...props}
      onPress={onPress}
      className="flex items-center gap-4 bg-[#0066CC] p-4 w-full rounded-lg"
    >
      <Text
        className="text-white text-base"
        style={{ fontFamily: "HankenGrotesk_700Bold" }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};
