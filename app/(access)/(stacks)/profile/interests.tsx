import { SolidMainButton } from "@/components/Btns";
import LoadingOverlay from "@/components/LoadingOverlay";
import { useUpdateProfile } from "@/services";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomAlert } from "@/components/CustomAlert";

const INTERESTS = [
  "Health", "Fashion", "Food", "Music", "Sports", "Photography",
  "Movies", "Fitness", "Tech", "Science", "Writing", "Reading",
  "Lifestyle", "Gaming", "Politics", "Faith", "Travel", "Culture",
];

export default function InterestsScreen() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [alertVisible, setAlertVisible] = useState(false);
  const updateMutation = useUpdateProfile();

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest],
    );
  };

  const onSubmit = () => {
    updateMutation.mutate(
      { interests: selectedInterests },
      {
        onSuccess: () => setAlertVisible(true),
        onError: (error) => {
          Alert.alert(
            "Error",
            error instanceof Error ? error.message : "Failed to save interests.",
          );
        },
      },
    );
  };

  const isCompleteActive = selectedInterests.length > 0 && !updateMutation.isPending;

  return (
    <SafeAreaView style={styles.viewport}>
      <StatusBar style="dark" />
      <LoadingOverlay visible={updateMutation.isPending} />
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backCircle}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={18} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile Setup</Text>
          <View style={styles.dotsRow}>
            <View style={styles.dotInactive} />
            <View style={styles.dotInactive} />
            <View style={styles.dotActive} />
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollStyle}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.titleWrap}>
            <Text style={styles.titleText}>What are your interests?</Text>
            <Text style={styles.subtitleText}>
              Select one or more areas you&apos;re interested in
            </Text>
          </View>

          <View style={styles.interestDivStyle}>
            {INTERESTS.map((interest) => {
              const isSelected = selectedInterests.includes(interest);
              return (
                <TouchableOpacity
                  key={interest}
                  onPress={() => toggleInterest(interest)}
                  activeOpacity={0.8}
                  style={[
                    styles.interestItem,
                    isSelected
                      ? styles.interestItemSelected
                      : styles.interestItemNormal,
                  ]}
                >
                  <Text
                    style={[
                      styles.interestText,
                      isSelected
                        ? styles.interestTextSelected
                        : styles.interestTextNormal,
                    ]}
                  >
                    {interest}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        <View style={styles.bottomBar}>
          <SolidMainButton
            text="Complete Profile"
            onPress={onSubmit}
            disabled={!isCompleteActive}
          />
        </View>
      </View>

      <CustomAlert
        visible={alertVisible}
        title="Interests Saved"
        message="Your interests have been saved successfully."
        onClose={() => {
          setAlertVisible(false);
          router.push("/(access)/(stacks)/profile/profile-setup-completed");
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  viewport: { flex: 1, backgroundColor: "#FFFFFF" },
  container: { flex: 1, paddingHorizontal: 24 },
  headerRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 16, marginBottom: 32 },
  backCircle: { alignItems: "center", justifyContent: "center", borderWidth: 1.5, borderColor: "#000000", borderRadius: 99, width: 44, height: 44 },
  headerTitle: { fontFamily: "HankenGrotesk_500Medium", fontSize: 17, color: "#0066CC" },
  dotsRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  dotInactive: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#E5E7EB" },
  dotActive: { width: 20, height: 8, borderRadius: 4, backgroundColor: "#0066CC" },
  scrollStyle: { flex: 1 },
  scrollContent: { paddingBottom: 110 },
  titleWrap: { alignItems: "center", marginBottom: 36 },
  titleText: { fontFamily: "HankenGrotesk_500Medium", fontSize: 26, color: "#000000", marginBottom: 8, textAlign: "center" },
  subtitleText: { fontFamily: "HankenGrotesk_500Medium", fontSize: 12, color: "#4B5563", textAlign: "center" },
  interestDivStyle: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", rowGap: 12, width: "100%" },
  interestItem: { width: "48%", height: 52, borderRadius: 10, borderWidth: 1.5, justifyContent: "center", alignItems: "center" },
  interestItemNormal: { backgroundColor: "#FFFFFF", borderColor: "#E5E7EB" },
  interestItemSelected: { backgroundColor: "#F0F7FF", borderColor: "#0066CC" },
  interestText: { fontSize: 12 },
  interestTextNormal: { fontFamily: "HankenGrotesk_500Medium", color: "#374151" },
  interestTextSelected: { fontFamily: "HankenGrotesk_500Medium", color: "#0066CC" },
  bottomBar: { position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "#FFFFFF", paddingBottom: 24, paddingTop: 12, paddingHorizontal: 24 },
});
