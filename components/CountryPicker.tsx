import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export interface Country {
  name: string;
  code: string;
  flag: string;
}

export const COUNTRIES: Country[] = [
  { name: "Nigeria", code: "+234", flag: "🇳🇬" },
  { name: "United States", code: "+1", flag: "🇺🇸" },
  { name: "United Kingdom", code: "+44", flag: "🇬🇧" },
  { name: "Ghana", code: "+233", flag: "🇬🇭" },
  { name: "Kenya", code: "+254", flag: "🇰🇪" },
  { name: "South Africa", code: "+27", flag: "🇿🇦" },
  { name: "Canada", code: "+1", flag: "🇨🇦" },
  { name: "India", code: "+91", flag: "🇮🇳" },
  { name: "Germany", code: "+49", flag: "🇩🇪" },
  { name: "France", code: "+33", flag: "🇫🇷" },
];

interface CountryPickerProps {
  selectedCountry: Country;
  onSelectCountry: (country: Country) => void;
  style?: any;
}

export const CountryPicker = ({
  selectedCountry,
  onSelectCountry,
  style,
}: CountryPickerProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (country: Country) => {
    onSelectCountry(country);
    setModalVisible(false);
  };

  return (
    <View style={style}>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.triggerButton}
        activeOpacity={0.7}
      >
        <Text style={styles.triggerText}>
          {selectedCountry.flag} {selectedCountry.code}
        </Text>
        <Ionicons
          name="chevron-down"
          size={14}
          color="#4B5563"
          style={styles.chevron}
        />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <SafeAreaView style={styles.safeArea}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select Country Code</Text>
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={styles.closeButton}
                >
                  <Ionicons name="close" size={22} color="#1F2937" />
                </TouchableOpacity>
              </View>

              <FlatList
                data={COUNTRIES}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => handleSelect(item)}
                    style={[
                      styles.countryRow,
                      selectedCountry.name === item.name && styles.selectedRow,
                    ]}
                  >
                    <View style={styles.countryInfo}>
                      <Text style={styles.countryFlag}>{item.flag}</Text>
                      <Text style={styles.countryName}>{item.name}</Text>
                    </View>
                    <Text style={styles.countryCode}>{item.code}</Text>
                  </TouchableOpacity>
                )}
                contentContainerStyle={styles.listContent}
              />
            </SafeAreaView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  triggerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    paddingHorizontal: 8,
  },
  triggerText: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 12,
    color: "#1F2937",
  },
  chevron: {
    marginLeft: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: "55%",
  },
  safeArea: {
    flex: 1,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  modalTitle: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 17,
    color: "#111827",
    flex: 1,
  },
  closeButton: {
    padding: 4,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  countryRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 4,
  },
  selectedRow: {
    backgroundColor: "#EFF6FF",
  },
  countryInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  countryFlag: {
    fontSize: 22,
    marginRight: 16,
  },
  countryName: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 12,
    color: "#1F2937",
  },
  countryCode: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 12,
    color: "#4B5563",
  },
});
