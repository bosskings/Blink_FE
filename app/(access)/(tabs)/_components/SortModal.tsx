import { Ionicons } from "@expo/vector-icons";
import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native";

interface SortModalProps {
  visible: boolean;
  onClose: () => void;
  activeSort: "Trending" | "Newest Arrivals" | "Price: Low to High" | "Price: High to Low";
  onSelect: (sort: "Trending" | "Newest Arrivals" | "Price: Low to High" | "Price: High to Low") => void;
}

export const SortModal = ({ visible, onClose, activeSort, onSelect }: SortModalProps) => {
  const options = [
    "Trending",
    "Newest Arrivals",
    "Price: Low to High",
    "Price: High to Low",
  ] as const;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable
        style={{
          flex: 1,
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 24,
        }}
        onPress={onClose}
      >
        <View
          style={{
            width: "100%",
            backgroundColor: "#FFFFFF",
            borderRadius: 20,
            padding: 24,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.1,
            shadowRadius: 10,
            elevation: 5,
          }}
        >
          <Text
            style={{
              fontFamily: "HankenGrotesk_500Medium",
              fontSize: 17,
              color: "#000000",
              marginBottom: 12,
            }}
          >
            Sort By
          </Text>
          <View style={{ height: 1, backgroundColor: "#F3F4F6" }} />

          {options.map((opt) => {
            const isSelected = activeSort === opt;
            return (
              <TouchableOpacity
                key={opt}
                onPress={() => {
                  onSelect(opt);
                  onClose();
                }}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingVertical: 12,
                }}
                activeOpacity={0.7}
              >
                <Text
                  style={{
                    fontFamily: "HankenGrotesk_500Medium",
                    fontSize: 12,
                    color: isSelected ? "#0066CC" : "#374151",
                  }}
                >
                  {opt}
                </Text>
                {isSelected && (
                  <Ionicons name="checkmark" size={18} color="#0066CC" />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </Pressable>
    </Modal>
  );
};
