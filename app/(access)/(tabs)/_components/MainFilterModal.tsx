import { Ionicons } from "@expo/vector-icons";
import {
  Modal,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface MainFilterModalProps {
  visible: boolean;
  onClose: () => void;
  distance: number;
  setDistance: (v: number) => void;
  itemType: "All" | "Goods" | "Services" | "Requests" | null;
  setItemType: (v: "All" | "Goods" | "Services" | "Requests" | null) => void;
  minPrice: string;
  setMinPrice: (v: string) => void;
  maxPrice: string;
  setMaxPrice: (v: string) => void;
  listingType: "All" | "For Sale" | "For Rent" | null;
  setListingType: (v: "All" | "For Sale" | "For Rent" | null) => void;
  sliderWidth: number;
  setSliderWidth: (v: number) => void;
  onApply: () => void;
  onReset: () => void;
}

export const MainFilterModal = ({
  visible,
  onClose,
  distance,
  setDistance,
  itemType,
  setItemType,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  listingType,
  setListingType,
  sliderWidth,
  setSliderWidth,
  onApply,
  onReset,
}: MainFilterModalProps) => {
  return (
    <Modal visible={visible} transparent={false} animationType="slide" onRequestClose={onClose}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 14,
            height: 56,
            borderBottomWidth: 1,
            borderBottomColor: "#F3F4F6",
          }}
        >
          <TouchableOpacity onPress={onClose} style={{ padding: 8 }} activeOpacity={0.7}>
            <Ionicons name="chevron-back" size={22} color="#0066CC" />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 20,
              fontFamily: "HankenGrotesk_500Medium",
              color: "#0066CC",
              textAlign: "center",
              flex: 1,
            }}
          >
            Filter
          </Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingTop: 16,
            paddingBottom: 100,
          }}
        >
          {/* Distance Card */}
          <View style={filterCard}>
            <Text style={filterCardTitle}>Distance</Text>
            <Text style={filterCardDesc}>
              Show results within{" "}
              <Text style={{ color: "#0066CC", fontFamily: "HankenGrotesk_500Medium" }}>
                {distance === 0 ? "Not specified" : `${distance}km`}
              </Text>{" "}
              of your current location
            </Text>

            <View
              style={{ height: 40, justifyContent: "center", marginTop: 8 }}
              onLayout={(e) => setSliderWidth(e.nativeEvent.layout.width)}
              onStartShouldSetResponder={() => true}
              onMoveShouldSetResponder={() => true}
              onResponderGrant={(e) => {
                const x = e.nativeEvent.locationX;
                const pct = Math.max(0, Math.min(100, (x / (sliderWidth || 250)) * 100));
                setDistance(Math.round(pct));
              }}
              onResponderMove={(e) => {
                const x = e.nativeEvent.locationX;
                const pct = Math.max(0, Math.min(100, (x / (sliderWidth || 250)) * 100));
                setDistance(Math.round(pct));
              }}
            >
              <View
                pointerEvents="none"
                style={{
                  height: 6,
                  backgroundColor: "#E5E7EB",
                  borderRadius: 3,
                  position: "relative",
                }}
              >
                <View
                  pointerEvents="none"
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: `${Math.max(0, Math.min(100, distance))}%`,
                    backgroundColor: "#0066CC",
                    borderRadius: 3,
                  }}
                />
                <View
                  pointerEvents="none"
                  style={{
                    position: "absolute",
                    left: `${Math.max(0, Math.min(100, distance))}%`,
                    marginLeft: -10,
                    top: -7,
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: "#FFFFFF",
                    borderWidth: 2,
                    borderColor: "#0066CC",
                  }}
                />
              </View>
            </View>
          </View>

          {/* Item Type Card */}
          <View style={filterCard}>
            <Text style={filterCardTitle}>Item Type</Text>
            <View style={{ marginTop: 12, gap: 12 }}>
              {(["All", "Goods", "Services", "Requests"] as const).map((type) => {
                const isActive = itemType === type;
                return (
                  <TouchableOpacity
                    key={type}
                    onPress={() => setItemType(type)}
                    style={{ flexDirection: "row", alignItems: "center", paddingVertical: 8 }}
                    activeOpacity={0.7}
                  >
                    <View
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        borderWidth: 2,
                        borderColor: isActive ? "#0066CC" : "#9CA3AF",
                        marginRight: 12,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {isActive && (
                        <View
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: 5,
                            backgroundColor: "#0066CC",
                          }}
                        />
                      )}
                    </View>
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: "HankenGrotesk_500Medium",
                        color: isActive ? "#000000" : "#4B5563",
                      }}
                    >
                      {type}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Price Card */}
          <View style={filterCard}>
            <Text style={filterCardTitle}>Price</Text>
            <Text style={filterCardDesc}>
              Set your desired minimum and maximum price in{" "}
              <Text style={{ color: "#0066CC", fontFamily: "HankenGrotesk_500Medium" }}>NGN</Text>
            </Text>

            <View style={{ marginTop: 8 }}>
              <View
                style={{
                  height: 6,
                  backgroundColor: "#E5E7EB",
                  borderRadius: 3,
                  position: "relative",
                  marginVertical: 8,
                }}
              >
                <View
                  style={{
                    position: "absolute",
                    left: "5%",
                    right: "10%",
                    top: 0,
                    bottom: 0,
                    backgroundColor: "#0066CC",
                  }}
                />
              </View>

              <View style={{ flexDirection: "row", gap: 12, marginTop: 8 }}>
                <TextInput
                  value={minPrice}
                  onChangeText={setMinPrice}
                  keyboardType="numeric"
                  placeholder="Min"
                  placeholderTextColor="#9CA3AF"
                  style={{
                    flex: 1,
                    height: 44,
                    borderWidth: 1,
                    borderColor: "#E5E7EB",
                    borderRadius: 10,
                    paddingHorizontal: 14,
                    textAlign: "center",
                    fontFamily: "HankenGrotesk_500Medium",
                    fontSize: 12,
                    color: "#000",
                    backgroundColor: "#F9FAFB",
                  }}
                />
                <TextInput
                  value={maxPrice}
                  onChangeText={setMaxPrice}
                  keyboardType="numeric"
                  placeholder="Max"
                  placeholderTextColor="#9CA3AF"
                  style={{
                    flex: 1,
                    height: 44,
                    borderWidth: 1,
                    borderColor: "#E5E7EB",
                    borderRadius: 10,
                    paddingHorizontal: 14,
                    textAlign: "center",
                    fontFamily: "HankenGrotesk_500Medium",
                    fontSize: 12,
                    color: "#000",
                    backgroundColor: "#F9FAFB",
                  }}
                />
              </View>
            </View>
          </View>

          {/* Listing Type Card */}
          <View style={filterCard}>
            <Text style={filterCardTitle}>Listing Type</Text>
            <View style={{ marginTop: 12, gap: 12 }}>
              {(["All", "For Sale", "For Rent"] as const).map((type) => {
                const isActive = listingType === type;
                return (
                  <TouchableOpacity
                    key={type}
                    onPress={() => setListingType(type)}
                    style={{ flexDirection: "row", alignItems: "center", paddingVertical: 8 }}
                    activeOpacity={0.7}
                  >
                    <View
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        borderWidth: 2,
                        borderColor: isActive ? "#0066CC" : "#9CA3AF",
                        marginRight: 12,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {isActive && (
                        <View
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: 5,
                            backgroundColor: "#0066CC",
                          }}
                        />
                      )}
                    </View>
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: "HankenGrotesk_500Medium",
                        color: isActive ? "#000000" : "#4B5563",
                      }}
                    >
                      {type}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </ScrollView>

        {/* Bottom Bar */}
        <View
          style={{
            flexDirection: "row",
            gap: 12,
            backgroundColor: "#FFFFFF",
            paddingBottom: 32,
            paddingTop: 16,
            paddingHorizontal: 24,
            borderTopWidth: 1,
            borderTopColor: "#F3F4F6",
          }}
        >
          <TouchableOpacity
            onPress={onReset}
            style={{
              flex: 1,
              height: 44,
              borderWidth: 2,
              borderColor: "#0066CC",
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#FFFFFF",
            }}
            activeOpacity={0.8}
          >
            <Text
              style={{
                fontFamily: "HankenGrotesk_500Medium",
                color: "#0066CC",
                fontSize: 12,
              }}
            >
              Reset All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onApply}
            style={{
              flex: 1.2,
              height: 44,
              backgroundColor: "#0066CC",
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
            activeOpacity={0.8}
          >
            <Text
              style={{
                fontFamily: "HankenGrotesk_500Medium",
                color: "#FFFFFF",
                fontSize: 12,
              }}
            >
              Apply Filters
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const filterCard = {
  borderWidth: 1,
  borderColor: "#E5E7EB",
  borderRadius: 14,
  padding: 14,
  marginBottom: 16,
  backgroundColor: "#FFFFFF",
};

const filterCardTitle = {
  fontSize: 12,
  fontFamily: "HankenGrotesk_500Medium",
  color: "#000000",
  marginBottom: 4,
};

const filterCardDesc = {
  fontSize: 12,
  fontFamily: "HankenGrotesk_500Medium",
  color: "#4B5563",
  marginBottom: 12,
};
