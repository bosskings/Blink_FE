import { SolidMainButton } from "@/components/Btns";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileDetails() {
  const [blinkTag, setBlinkTag] = useState("Lasman Ade");
  const [bio, setBio] = useState("");

  const formattedBlinkTag = blinkTag.trim().toLowerCase().replace(/\s+/g, "~");

  // Availability logic: taken if formatted tag is "time~keeper", otherwise available
  const isAvailable =
    formattedBlinkTag.length > 0 && formattedBlinkTag !== "time~keeper";
  const isFormValid = formattedBlinkTag.length > 0 && isAvailable;

  const onSubmit = async () => {
    if (!isFormValid) return;
    console.log("Profile details submitted:", {
      blinkTag,
      bio,
    });
    await AsyncStorage.setItem("blink_tag", blinkTag);
    router.push("/(access)/(stacks)/profile/interests");
  };

  return (
    <SafeAreaView style={styles.viewport}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        {/* Step Progress Single-Row Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backCircle}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={18} color="#000000" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Profile Setup</Text>

          {/* Elongated Step Dots Progress Indicator */}
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
          {/* Main Title */}
          <Text style={styles.titleText}>Tell us about yourself</Text>

          {/* Blink Tag Section */}
          <View style={styles.fieldSection}>
            <View style={styles.labelRow}>
              <Text style={styles.labelText}>Your Blink Tag</Text>
              <Text style={styles.asteriskText}> *</Text>
            </View>
            <Text style={styles.descText}>
              Feel free to use any name of your choice
            </Text>

            <TextInput
              style={styles.textInput}
              value={blinkTag}
              onChangeText={setBlinkTag}
              placeholder="Lasman Ade"
              placeholderTextColor="#AFAFAF"
              autoCapitalize="none"
              autoCorrect={false}
            />

            {formattedBlinkTag.length > 0 && (
              <View
                style={[
                  styles.statusBubble,
                  isAvailable
                    ? styles.statusBubbleAvailable
                    : styles.statusBubbleTaken,
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    isAvailable
                      ? styles.statusTextAvailable
                      : styles.statusTextTaken,
                  ]}
                >
                  @{formattedBlinkTag}{" "}
                  {isAvailable ? "is available" : "is taken"}
                </Text>
              </View>
            )}
          </View>

          {/* Bio Section */}
          <View style={styles.fieldSection}>
            <Text style={styles.labelText}>Your Bio</Text>
            <Text style={styles.descText}>
              Write a short intro about yourself. Not less than 250
            </Text>

            <TextInput
              style={styles.bioInput}
              value={bio}
              onChangeText={setBio}
              placeholder="Write a short intro about yourself..."
              placeholderTextColor="#AFAFAF"
              multiline
              textAlignVertical="top"
              autoCorrect={false}
            />
          </View>
        </ScrollView>

        {/* Absolute Bottom Action Bar */}
        <View style={styles.bottomBar}>
          <SolidMainButton
            text="Save"
            onPress={onSubmit}
            disabled={!isFormValid}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  viewport: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
    marginBottom: 32,
  },
  backCircle: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#000000",
    borderRadius: 99,
    width: 44,
    height: 44,
  },
  headerTitle: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 17,
    color: "#0066CC",
  },
  dotsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  dotInactive: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E5E7EB",
  },
  dotActive: {
    width: 20,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#0066CC",
  },
  scrollStyle: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 110,
  },
  titleText: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 26,
    color: "#000000",
    marginBottom: 36,
    textAlign: "center",
  },
  fieldSection: {
    width: "100%",
    marginBottom: 28,
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  labelText: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 12,
    color: "#000000",
  },
  asteriskText: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 12,
    color: "#EF4444",
  },
  descText: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 12,
    color: "#4B5563",
    marginBottom: 12,
  },
  textInput: {
    width: "100%",
    backgroundColor: "#F9FAFB",
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    height: 58,
    paddingHorizontal: 14,
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 12,
    color: "#000000",
  },
  statusBubble: {
    alignSelf: "flex-start",
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginTop: 10,
  },
  statusBubbleAvailable: {
    backgroundColor: "#E8F8F0",
    borderColor: "#00A84E",
  },
  statusBubbleTaken: {
    backgroundColor: "#FFEBEB",
    borderColor: "#FF3B30",
  },
  statusText: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 12,
  },
  statusTextAvailable: {
    color: "#00A84E",
  },
  statusTextTaken: {
    color: "#FF3B30",
  },
  bioInput: {
    width: "100%",
    backgroundColor: "#F9FAFB",
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    height: 180,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 12,
    color: "#000000",
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    paddingBottom: 24,
    paddingTop: 12,
    paddingHorizontal: 24,
  },
});
