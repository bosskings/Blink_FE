import { Ionicons } from "@expo/vector-icons";
import {
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SolidMainButton } from "@/components/Btns";

interface SearchFilterModalProps {
  visible: boolean;
  onClose: () => void;
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  activeSearchPill: "map" | "community" | null;
  setActiveSearchPill: (v: "map" | "community" | null) => void;
  selectedMapArea: "city" | "country" | "state" | "town" | null;
  setSelectedMapArea: (v: "city" | "country" | "state" | "town" | null) => void;
  selectedCommunityOption: "joined" | "specific" | null;
  setSelectedCommunityOption: (v: "joined" | "specific" | null) => void;
  specificCommunitiesExpanded: boolean;
  setSpecificCommunitiesExpanded: (v: boolean) => void;
  checkedCommunities: string[];
  toggleCommunityCheck: (slug: string) => void;
  communitiesList: { name: string; slug: string }[];
  onApply: () => void;
  onReset: () => void;
  onSortPress: () => void;
  onFilterPress: () => void;
}

export const SearchFilterModal = ({
  visible,
  onClose,
  searchQuery,
  setSearchQuery,
  activeSearchPill,
  setActiveSearchPill,
  selectedMapArea,
  setSelectedMapArea,
  selectedCommunityOption,
  setSelectedCommunityOption,
  specificCommunitiesExpanded,
  setSpecificCommunitiesExpanded,
  checkedCommunities,
  toggleCommunityCheck,
  communitiesList,
  onApply,
  onReset,
  onSortPress,
  onFilterPress,
}: SearchFilterModalProps) => {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              paddingHorizontal: 24,
              paddingTop: 16,
              paddingBottom: 120,
            }}
          >
            {/* Search Header Row */}
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 16, gap: 8 }}>
              <View
                style={{
                  flex: 1,
                  height: 44,
                  backgroundColor: "#FFFFFF",
                  borderRadius: 10,
                  paddingHorizontal: 14,
                  justifyContent: "center",
                  borderWidth: 1.5,
                  borderColor: "#0066CC"
                }}
              >
                <TextInput
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholder="Search"
                  placeholderTextColor="#9CA3AF"
                  autoCorrect={false}
                  style={{
                    fontFamily: "HankenGrotesk_500Medium",
                    fontSize: 12,
                    color: "#111827",
                  }}
                />
              </View>

              <TouchableOpacity
                onPress={onFilterPress}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "#F9FAFB",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                activeOpacity={0.8}
              >
                <Ionicons name="options-outline" size={18} color="#000000" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={onSortPress}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: "#F9FAFB",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                activeOpacity={0.8}
              >
                <Ionicons name="swap-vertical" size={18} color="#000000" />
              </TouchableOpacity>
            </View>

            {/* Filter Toggle Pills Row */}
            <View style={{ flexDirection: "row", gap: 12, marginBottom: 16 }}>
              {(activeSearchPill === null || activeSearchPill === "map") && (
                <TouchableOpacity
                  onPress={() => setActiveSearchPill(activeSearchPill === "map" ? null : "map")}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 16,
                    paddingVertical: 10,
                    borderRadius: 20,
                    backgroundColor: activeSearchPill === "map" ? "#0066CC" : "#F3F6FA",
                  }}
                  activeOpacity={0.8}
                >
                  <Text
                    style={{
                      fontFamily: "HankenGrotesk_500Medium",
                      fontSize: 12,
                      color: activeSearchPill === "map" ? "#FFFFFF" : "#4B5563",
                    }}
                  >
                    Search by Map Area
                  </Text>
                </TouchableOpacity>
              )}

              {(activeSearchPill === null || activeSearchPill === "community") && (
                <TouchableOpacity
                  onPress={() =>
                    setActiveSearchPill(activeSearchPill === "community" ? null : "community")
                  }
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 16,
                    paddingVertical: 10,
                    borderRadius: 20,
                    backgroundColor: activeSearchPill === "community" ? "#0066CC" : "#F3F6FA",
                  }}
                  activeOpacity={0.8}
                >
                  <Text
                    style={{
                      fontFamily: "HankenGrotesk_500Medium",
                      fontSize: 12,
                      color: activeSearchPill === "community" ? "#FFFFFF" : "#4B5563",
                    }}
                  >
                    Search by Community
                  </Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Divider */}
            <View style={{ height: 1, backgroundColor: "#F3F4F6", marginBottom: 16 }} />

            {/* Map Area Radios */}
            {activeSearchPill === "map" && (
              <View style={{ gap: 8 }}>
                {(["city", "country", "state", "town"] as const).map((area) => {
                  const isSelected = selectedMapArea === area;
                  return (
                    <TouchableOpacity
                      key={area}
                      onPress={() => setSelectedMapArea(area)}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingVertical: 16,
                        paddingHorizontal: isSelected ? 16 : 4,
                        borderRadius: isSelected ? 10 : 0,
                        borderWidth: isSelected ? 1 : 0,
                        borderColor: isSelected ? "#0066CC" : "transparent",
                        backgroundColor: isSelected ? "#F5F9FF" : "transparent",
                        marginBottom: isSelected ? 8 : 0,
                      }}
                      activeOpacity={0.8}
                    >
                      <Text
                        style={{
                          fontFamily: "HankenGrotesk_600SemiBold",
                          fontSize: 13,
                          color: "#111827",
                        }}
                      >
                        {area.charAt(0).toUpperCase() + area.slice(1)}
                      </Text>
                      {isSelected ? (
                        <Ionicons name="radio-button-on" size={20} color="#0066CC" />
                      ) : (
                        <Ionicons name="radio-button-off" size={20} color="#9CA3AF" />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}

            {/* Community Filters */}
            {activeSearchPill === "community" && (
              <View style={{ gap: 8 }}>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedCommunityOption("joined");
                    setSpecificCommunitiesExpanded(false);
                  }}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingVertical: 16,
                    paddingHorizontal: 16,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: selectedCommunityOption === "joined" ? "#0066CC" : "#E5E7EB",
                    backgroundColor: selectedCommunityOption === "joined" ? "#F5F9FF" : "#FFFFFF",
                  }}
                  activeOpacity={0.8}
                >
                  <Text
                    style={{
                      fontFamily: "HankenGrotesk_600SemiBold",
                      fontSize: 13,
                      color: selectedCommunityOption === "joined" ? "#0066CC" : "#111827",
                    }}
                  >
                    Joined Communities
                  </Text>
                  {selectedCommunityOption === "joined" ? (
                    <Ionicons name="radio-button-on" size={20} color="#0066CC" />
                  ) : (
                    <Ionicons name="radio-button-off" size={20} color="#E5E7EB" />
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setSelectedCommunityOption("specific");
                    setSpecificCommunitiesExpanded(!specificCommunitiesExpanded);
                  }}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingVertical: 16,
                    paddingHorizontal: 16,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: selectedCommunityOption === "specific" ? "#0066CC" : "#E5E7EB",
                    backgroundColor:
                      selectedCommunityOption === "specific" ? "#F5F9FF" : "#FFFFFF",
                  }}
                  activeOpacity={0.8}
                >
                  <Text
                    style={{
                      fontFamily: "HankenGrotesk_600SemiBold",
                      fontSize: 13,
                      color: selectedCommunityOption === "specific" ? "#0066CC" : "#111827",
                    }}
                  >
                    Specific Communities
                  </Text>
                  <Ionicons
                    name={specificCommunitiesExpanded ? "chevron-up" : "chevron-down"}
                    size={20}
                    color={selectedCommunityOption === "specific" ? "#0066CC" : "#9CA3AF"}
                  />
                </TouchableOpacity>

                {specificCommunitiesExpanded && (
                  <View
                    style={{
                      marginTop: 4,
                      backgroundColor: "#F9FAFB",
                      borderRadius: 10,
                      padding: 12,
                      gap: 12,
                    }}
                  >
                    {communitiesList.map((comm) => {
                      const isChecked = checkedCommunities.includes(comm.slug);
                      return (
                        <TouchableOpacity
                          key={comm.slug}
                          onPress={() => toggleCommunityCheck(comm.slug)}
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 12,
                            paddingVertical: 4,
                          }}
                          activeOpacity={0.8}
                        >
                          <View
                            style={{
                              width: 20,
                              height: 20,
                              borderRadius: 4,
                              borderWidth: 2,
                              borderColor: isChecked ? "#0066CC" : "#D1D5DB",
                              backgroundColor: isChecked ? "#0066CC" : "transparent",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            {isChecked && (
                              <Ionicons name="checkmark" size={13} color="white" />
                            )}
                          </View>
                          <Text
                            style={{
                              fontFamily: "HankenGrotesk_500Medium",
                              fontSize: 12,
                              color: "#374151",
                            }}
                          >
                            {comm.name}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                )}
              </View>
            )}
          </ScrollView>

          {/* Bottom Bar */}
          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: "#FFFFFF",
              paddingBottom: 24,
              paddingTop: 12,
              paddingHorizontal: 24,
              borderTopWidth: 1,
              borderTopColor: "#F3F4F6",
            }}
          >
            <View style={{ flexDirection: "row", gap: 12, width: "100%" }}>
              <TouchableOpacity
                onPress={onReset}
                style={{
                  flex: 1,
                  height: 44,
                  backgroundColor: "#F3F4F6",
                  borderRadius: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                activeOpacity={0.8}
              >
                <Text
                  style={{
                    fontFamily: "HankenGrotesk_500Medium",
                    color: "#4B5563",
                    fontSize: 12,
                  }}
                >
                  Reset
                </Text>
              </TouchableOpacity>
              <View style={{ flex: 2 }}>
                <SolidMainButton text="Apply Filters" onPress={onApply} />
              </View>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
};
