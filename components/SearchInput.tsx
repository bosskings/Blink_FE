import { Ionicons } from "@expo/vector-icons";
import { TextInput, TouchableOpacity, View } from "react-native";

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  containerStyle?: any;
}

export const SearchInput = ({
  placeholder = "Search...",
  value,
  onChangeText,
  containerStyle,
}: SearchInputProps) => {
  return (
    <View style={containerStyle}>
      <View
        style={{
          height: 44,
          backgroundColor: "#F9FAFB",
          borderRadius: 10,
          paddingHorizontal: 14,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Ionicons name="search" size={20} color="#9CA3AF" style={{ marginRight: 8 }} />
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          style={{
            fontFamily: "HankenGrotesk_500Medium",
            fontSize: 13,
            color: "#111827",
            flex: 1,
          }}
          value={value}
          onChangeText={onChangeText}
          autoCorrect={false}
        />
      </View>
    </View>
  );
};
