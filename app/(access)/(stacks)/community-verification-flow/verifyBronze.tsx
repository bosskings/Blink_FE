import { SolidMainButton } from "@/components/Btns";
import { useUserProfile } from "@/providers/UserProfileProvider";
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState, useCallback } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const VerifyBronze = () => {
  const { profile } = useUserProfile();
  const [isEditable, setIsEditable] = useState(false);
  const [localPhone, setLocalPhone] = useState("");

  useFocusEffect(
    useCallback(() => {
      if (profile?.phone) {
        setLocalPhone(profile.phone);
      }
    }, [profile?.phone]),
  );

  const phoneNumber = localPhone || profile?.phone || "";
  const emailAddress = profile?.email || "";
  const phoneVerified = profile?.phoneVerified ?? false;
  const emailVerified = profile?.emailVerified ?? false;

  const handleProceed = () => {
    router.replace("/(access)/(stacks)/profile/choose-avatar");
  };

  const bothVerified = phoneVerified && emailVerified;

  return (
    <SafeAreaView
      style={[styles.viewport, bothVerified && styles.viewportPeachy]}
    >
      <StatusBar style="dark" />

      {/* Gray/Peachy Header and Medal Graphic Area */}
      <View style={styles.topSection}>
        {/* Custom Header Row */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backCircle}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={18} color="#000000" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Bronze</Text>

          <View style={{ width: 44 }} />
        </View>

        {/* Large Centered Medal */}
        <View style={styles.medalWrap}>
          <Image
            source={
              bothVerified
                ? require("../../../../assets/images/bronze.png")
                : require("../../../../assets/images/bronzegray.png")
            }
            style={styles.medalImage}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* White Rising Bottom Verification Sheet */}
      <View style={styles.bottomSheet}>
        {bothVerified ? (
          <View style={styles.successSheetContent}>
            {/* Large Blue Thumbs-Up Icon */}
            <Ionicons
              name="thumbs-up"
              size={84}
              color="#0066CC"
              style={styles.successIcon}
            />

            <Text style={styles.successTitle}>You’re verified</Text>

            <Text style={styles.successSubtitle}>
              Add a profile photo and update your details to comoplete your
              account
            </Text>

            <View style={styles.successButtonWrap}>
              <SolidMainButton
                text="Proceed to Profile Update"
                onPress={handleProceed}
              />
            </View>
          </View>
        ) : (
          <>
            <Text style={styles.sheetTitle}>Basic Verification</Text>
            <Text style={styles.sheetSubtitle}>
              Verify your contact details
            </Text>

            {/* Phone Number Pill Container */}
            <View style={[styles.pill, phoneVerified && styles.pillVerified]}>
              <Ionicons
                name={
                  phoneVerified
                    ? "checkmark-circle"
                    : "checkmark-circle-outline"
                }
                size={22}
                color={phoneVerified ? "#00A84E" : "#9CA3AF"}
                style={styles.pillCheckIcon}
              />

              <TextInput
                value={phoneNumber}
                onChangeText={setLocalPhone}
                editable={isEditable && !phoneVerified}
                style={[
                  styles.pillInput,
                  isEditable && styles.pillInputEditable,
                  phoneVerified && styles.pillInputVerified,
                ]}
                keyboardType="phone-pad"
              />

              {!phoneVerified && (
                <>
                  <TouchableOpacity
                    onPress={() => setIsEditable((prev) => !prev)}
                    style={styles.pencilButton}
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name={isEditable ? "checkmark-sharp" : "pencil"}
                      size={16}
                      color="#4B5563"
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() =>
                      router.push(
                        "/(access)/(stacks)/community-verification-flow/phoneOTP",
                      )
                    }
                    style={styles.pillButton}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.pillButtonText}>Verify</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>

            {/* Email Address Pill Container */}
            <View style={[styles.pill, emailVerified && styles.pillVerified]}>
              <Ionicons
                name={
                  emailVerified
                    ? "checkmark-circle"
                    : "checkmark-circle-outline"
                }
                size={22}
                color={emailVerified ? "#00A84E" : "#9CA3AF"}
                style={styles.pillCheckIcon}
              />

              {emailVerified ? (
                <Text style={[styles.pillInput, styles.pillInputVerified]}>
                  {emailAddress}
                </Text>
              ) : (
                <>
                  <Text style={styles.pillEmailPlaceholder}>
                    No email found
                  </Text>

                  <TouchableOpacity
                    onPress={() =>
                      router.push(
                        "/(access)/(stacks)/community-verification-flow/emailVerification",
                      )
                    }
                    style={[styles.pillButton, { width: 120 }]}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.pillButtonText}>Add an email</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default VerifyBronze;

const styles = StyleSheet.create({
  viewport: {
    flex: 1,
    backgroundColor: "#E5E7EB",
  },
  viewportPeachy: {
    backgroundColor: "#FDF0EA", // Peachy gold warm color matching fully verified state
  },
  topSection: {
    paddingHorizontal: 24,
    paddingTop: 16,
    flex: 1,
    justifyContent: "space-between",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backCircle: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#000000",
    borderRadius: 99,
    width: 44,
    height: 44,
    backgroundColor: "#FFFFFF",
  },
  headerTitle: {
    fontFamily: "HankenGrotesk_600SemiBold",
    fontSize: 17,
    color: "#000000",
    textAlign: "center",
    flex: 1,
  },
  resetButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
  },
  medalWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },
  medalImage: {
    width: 200,
    height: 200,
  },
  bottomSheet: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 24,
    paddingTop: 42,
    paddingBottom: 48,
    minHeight: 380,
  },
  sheetTitle: {
    fontFamily: "HankenGrotesk_600SemiBold",
    fontSize: 22,
    color: "#000000",
    textAlign: "center",
    marginBottom: 8,
  },
  sheetSubtitle: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 12,
    color: "#4B5563",
    textAlign: "center",
    marginBottom: 36,
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#000000",
    borderRadius: 99,
    height: 64,
    paddingHorizontal: 14,
    marginBottom: 16,
    backgroundColor: "#FFFFFF",
  },
  pillVerified: {
    borderColor: "#000000", // Still retains clear black outline
  },
  pillCheckIcon: {
    marginRight: 10,
  },
  pillInput: {
    flex: 1,
    fontFamily: "HankenGrotesk_600SemiBold",
    fontSize: 12,
    color: "#000000",
    paddingVertical: 0,
    textAlignVertical: "center",
  },
  pillInputEditable: {
    color: "#0066CC",
  },
  pillInputVerified: {
    color: "#000000", // matches mockup perfectly
  },
  pencilButton: {
    width: 32,
    height: 32,
    borderRadius: 14,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  pillButton: {
    backgroundColor: "#0066CC",
    borderRadius: 99,
    height: 38,
    width: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  pillButtonText: {
    fontFamily: "HankenGrotesk_600SemiBold",
    color: "#FFFFFF",
    fontSize: 12,
  },
  pillEmailPlaceholder: {
    flex: 1,
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 12,
    color: "#6B7280",
  },
  successSheetContent: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },
  successIcon: {
    marginBottom: 24,
  },
  successTitle: {
    fontFamily: "HankenGrotesk_600SemiBold",
    fontSize: 26,
    color: "#000000",
    textAlign: "center",
    marginBottom: 12,
  },
  successSubtitle: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 12,
    color: "#4B5563",
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 12,
    marginBottom: 36,
  },
  successButtonWrap: {
    width: "100%",
  },
});
