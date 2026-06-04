import { Text, TouchableOpacity } from "react-native";

interface FilterPillProps {
  label: string;
  active: boolean;
  onPress: () => void;
}

export const FilterPill = ({ label, active, onPress }: FilterPillProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`px-4 py-2 items-center justify-center rounded-full ${
        active
          ? "bg-[#AAD4FF] border border-[#0066CC]"
          : "bg-white border-[1.5px] border-[#6C757D]"
      }`}
      activeOpacity={0.7}
    >
      <Text
        className={`text-[13px] ${
          active ? "text-[#0066CC]" : "text-[#6C757D]"
        }`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};
