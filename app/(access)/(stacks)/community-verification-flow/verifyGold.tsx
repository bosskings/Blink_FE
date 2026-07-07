import { SolidMainButton } from "@/components/Btns";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const s = {
  topSection: { paddingHorizontal: 24, paddingTop: 16, flex: 1, justifyContent: "space-between" as const },
  headerRow: { flexDirection: "row" as const, alignItems: "center" as const, justifyContent: "space-between" as const },
  backCircle: { alignItems: "center" as const, justifyContent: "center" as const, borderWidth: 1.5, borderColor: "#000000", borderRadius: 99, width: 44, height: 44, backgroundColor: "#FFFFFF" },
  headerTitle: { fontFamily: "HankenGrotesk_600SemiBold", fontSize: 17, color: "#000000", textAlign: "center" as const, flex: 1 },
  resetButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: "#FFFFFF", borderWidth: 1.5, borderColor: "#E5E7EB", justifyContent: "center" as const, alignItems: "center" as const },
  medalWrap: { flex: 1, alignItems: "center" as const, justifyContent: "center" as const, paddingVertical: 12 },
  medalImage: { width: 200, height: 200 },
  bottomSheet: { backgroundColor: "#FFFFFF", borderTopLeftRadius: 40, borderTopRightRadius: 40, paddingHorizontal: 24, paddingTop: 42, paddingBottom: 48, minHeight: 380 },
  sheetTitle: { fontFamily: "HankenGrotesk_600SemiBold", fontSize: 22, color: "#000000", textAlign: "center" as const, marginBottom: 8 },
  sheetSubtitle: { fontFamily: "HankenGrotesk_500Medium", fontSize: 12, color: "#4B5563", textAlign: "center" as const, marginBottom: 36 },
  pill: { flexDirection: "row" as const, alignItems: "center" as const, borderWidth: 2, borderColor: "#000000", borderRadius: 99, height: 64, paddingHorizontal: 14, marginBottom: 16, backgroundColor: "#FFFFFF" },
  pillVerified: { borderColor: "#F5CB10" },
  pillInput: { flex: 1, fontFamily: "HankenGrotesk_600SemiBold", fontSize: 12, color: "#000000", paddingVertical: 0 },
  pillInputVerified: { color: "#000000" },
  pillButton: { backgroundColor: "#0066CC", borderRadius: 99, height: 38, width: 80, justifyContent: "center" as const, alignItems: "center" as const },
  pillButtonText: { fontFamily: "HankenGrotesk_600SemiBold", color: "#FFFFFF", fontSize: 12 },
  successSheetContent: { alignItems: "center" as const, justifyContent: "center" as const, paddingVertical: 12 },
  successTitle: { fontFamily: "HankenGrotesk_600SemiBold", fontSize: 26, color: "#000000", textAlign: "center" as const, marginBottom: 12 },
  successSubtitle: { fontFamily: "HankenGrotesk_500Medium", fontSize: 12, color: "#4B5563", textAlign: "center" as const, lineHeight: 22, paddingHorizontal: 12, marginBottom: 36 },
  successButtonWrap: { width: "100%" as const },
};

export default function VerifyGold() {
  const [idUploaded, setIdUploaded] = useState(false);
  const [addressUploaded, setAddressUploaded] = useState(false);
  const [socialLinked, setSocialLinked] = useState(false);
  const [socialHandle, setSocialHandle] = useState("");
  const [, setIdImageUri] = useState<string | null>(null);
  const [, setAddressImageUri] = useState<string | null>(null);

  const allVerified = idUploaded && addressUploaded && socialLinked;

  const pickDocument = async (setUri: (uri: string) => void, setVerified: (v: boolean) => void) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({ allowsEditing: true, quality: 0.8 });
      if (!result.canceled && result.assets?.[0]?.uri) {
        setUri(result.assets[0].uri);
        setVerified(true);
      }
    }
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: allVerified ? "#FEF9E7" : "#E5E7EB" }}>
      <StatusBar style="dark" />

      <View style={s.topSection}>
        <View style={s.headerRow}>
          <TouchableOpacity style={s.backCircle} onPress={() => router.back()} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={18} color="#000000" />
          </TouchableOpacity>
          <Text style={s.headerTitle}>Gold</Text>
          <TouchableOpacity style={s.resetButton} onPress={() => { setIdUploaded(false); setAddressUploaded(false); setSocialLinked(false); setIdImageUri(null); setAddressImageUri(null); setSocialHandle(""); }} activeOpacity={0.7}>
            <Ionicons name="refresh" size={16} color="#6B7280" />
          </TouchableOpacity>
        </View>

        <View style={s.medalWrap}>
          <Image
            source={allVerified ? require("../../../../assets/images/bronze.webp") : require("../../../../assets/images/bronzegray.webp")}
            style={[s.medalImage, { opacity: allVerified ? 1 : 0.5 }]}
            resizeMode="contain"
          />
        </View>
      </View>

      <View style={s.bottomSheet}>
        {allVerified ? (
          <View style={s.successSheetContent}>
            <Ionicons name="trophy" size={84} color="#F5CB10" style={{ marginBottom: 24 }} />
            <Text style={s.successTitle}>Gold Verified!</Text>
            <Text style={s.successSubtitle}>
              You now have access to premium features and exclusive community access.
            </Text>
            <View style={s.successButtonWrap}>
              <SolidMainButton text="Continue" onPress={() => router.back()} />
            </View>
          </View>
        ) : (
          <Animated.View entering={FadeInDown.duration(600).springify()}>
            <Text style={s.sheetTitle}>Gold Verification</Text>
            <Text style={s.sheetSubtitle}>Complete all steps to unlock Gold tier</Text>

            <TouchableOpacity onPress={() => pickDocument(setIdImageUri, setIdUploaded)}
              style={[s.pill, idUploaded && s.pillVerified]}>
              <Ionicons name={idUploaded ? "checkmark-circle" : "id-card-outline"} size={22}
                color={idUploaded ? "#00A84E" : "#9CA3AF"} style={{ marginRight: 10 }} />
              <Text style={[s.pillInput, idUploaded && s.pillInputVerified]}>
                {idUploaded ? "ID Document Uploaded" : "Upload Identity Document"}
              </Text>
              {idUploaded && <Ionicons name="checkmark-circle" size={20} color="#00A84E" />}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => pickDocument(setAddressImageUri, setAddressUploaded)}
              style={[s.pill, addressUploaded && s.pillVerified]}>
              <Ionicons name={addressUploaded ? "checkmark-circle" : "home-outline"} size={22}
                color={addressUploaded ? "#00A84E" : "#9CA3AF"} style={{ marginRight: 10 }} />
              <Text style={[s.pillInput, addressUploaded && s.pillInputVerified]}>
                {addressUploaded ? "Address Proof Uploaded" : "Upload Address Proof"}
              </Text>
              {addressUploaded && <Ionicons name="checkmark-circle" size={20} color="#00A84E" />}
            </TouchableOpacity>

            <View style={[s.pill, socialLinked && s.pillVerified]}>
              <Ionicons name={socialLinked ? "checkmark-circle" : "at-outline"} size={22}
                color={socialLinked ? "#00A84E" : "#9CA3AF"} style={{ marginRight: 10 }} />
              {socialLinked ? (
                <Text style={[s.pillInput, s.pillInputVerified]}>@{socialHandle}</Text>
              ) : (
                <>
                  <TextInput
                    value={socialHandle}
                    onChangeText={setSocialHandle}
                    placeholder="Social media handle"
                    placeholderTextColor="#9CA3AF"
                    style={s.pillInput}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity onPress={() => { if (socialHandle.trim()) setSocialLinked(true); }}
                    style={[s.pillButton, socialHandle.trim() ? {} : { opacity: 0.5 }]} activeOpacity={0.8}>
                    <Text style={s.pillButtonText}>Link</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>

            <View className="mt-8">
              <Text className="text-[12px] text-gray-500 text-center" style={{ fontFamily: "HankenGrotesk_500Medium" }}>
                {!idUploaded ? "Step 1: Upload a valid government-issued ID" :
                 !addressUploaded ? "Step 2: Upload proof of address" :
                 "Step 3: Link your social media account"}
              </Text>
            </View>
          </Animated.View>
        )}
      </View>
    </SafeAreaView>
  );
}
