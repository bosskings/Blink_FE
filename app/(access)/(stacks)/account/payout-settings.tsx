import { SolidMainButton } from "@/components/Btns";
import { Headers } from "@/components/Headers";
import LoadingOverlay from "@/components/LoadingOverlay";
import { usePayoutSettings } from "@/services";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomAlert } from "@/components/CustomAlert";

export default function PayoutSettingsScreen() {
  const [bankName, setBankName] = useState("");
  const [bankCode, setBankCode] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [alertVisible, setAlertVisible] = useState(false);

  const payoutMutation = usePayoutSettings();

  const isFormValid =
    bankName.trim().length > 0 &&
    bankCode.trim().length > 0 &&
    accountNumber.trim().length >= 10;

  const handleSubmit = () => {
    if (!isFormValid) return;

    payoutMutation.mutate(
      {
        bankName: bankName.trim(),
        bankCode: bankCode.trim(),
        accountNumber: accountNumber.trim(),
      },
      {
        onSuccess: () => setAlertVisible(true),
        onError: (error) => {
          Alert.alert(
            "Error",
            error instanceof Error ? error.message : "Failed to save payout settings.",
          );
        },
      },
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <LoadingOverlay visible={payoutMutation.isPending} />

      <View className="mt-6 mb-6 px-6">
        <Headers text="Payout Settings" onPress={() => router.back()} />
      </View>

      <ScrollView
        className="flex-1 px-6"
        contentContainerStyle={{ paddingBottom: 120 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.infoBanner}>
          <View style={styles.infoBannerIcon}>
            <Ionicons name="information-circle-outline" size={20} color="#0066CC" />
          </View>
          <Text style={styles.infoBannerText}>
            Add your bank account details to receive payouts from your sales.
          </Text>
        </View>

        <Text style={styles.fieldLabel}>Bank Name</Text>
        <View
          style={[
            styles.inputWrapper,
            focusedField === "bankName" && styles.inputWrapperFocused,
          ]}
        >
          <TextInput
            placeholder="e.g. Access Bank"
            placeholderTextColor="#BFBFBF"
            value={bankName}
            onChangeText={setBankName}
            style={styles.textInputStyle}
            onFocus={() => setFocusedField("bankName")}
            onBlur={() => setFocusedField(null)}
          />
        </View>

        <Text style={styles.fieldLabel}>Bank Code</Text>
        <View
          style={[
            styles.inputWrapper,
            focusedField === "bankCode" && styles.inputWrapperFocused,
          ]}
        >
          <TextInput
            placeholder="e.g. 044"
            placeholderTextColor="#BFBFBF"
            value={bankCode}
            onChangeText={setBankCode}
            keyboardType="number-pad"
            style={styles.textInputStyle}
            onFocus={() => setFocusedField("bankCode")}
            onBlur={() => setFocusedField(null)}
          />
        </View>

        <Text style={styles.fieldLabel}>Account Number</Text>
        <View
          style={[
            styles.inputWrapper,
            focusedField === "accountNumber" && styles.inputWrapperFocused,
          ]}
        >
          <TextInput
            placeholder="e.g. 0001234567"
            placeholderTextColor="#BFBFBF"
            value={accountNumber}
            onChangeText={setAccountNumber}
            keyboardType="number-pad"
            maxLength={10}
            style={styles.textInputStyle}
            onFocus={() => setFocusedField("accountNumber")}
            onBlur={() => setFocusedField(null)}
          />
        </View>

        <View style={{ marginTop: 16 }}>
          <SolidMainButton
            text="Save Payout Settings"
            onPress={handleSubmit}
            disabled={!isFormValid || payoutMutation.isPending}
          />
        </View>
      </ScrollView>

      <CustomAlert
        visible={alertVisible}
        title="Payout Settings Saved"
        message="Your bank details have been saved successfully."
        onClose={() => {
          setAlertVisible(false);
          router.back();
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  infoBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F8FF",
    borderRadius: 14,
    padding: 16,
    gap: 12,
    marginBottom: 28,
  },
  infoBannerIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  infoBannerText: {
    flex: 1,
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 12,
    color: "#374151",
    lineHeight: 18,
  },
  fieldLabel: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 12,
    color: "#111827",
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    backgroundColor: "#F8F9FB",
    borderWidth: 2,
    borderColor: "transparent",
    height: 58,
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  inputWrapperFocused: {
    borderColor: "#0066CC",
    backgroundColor: "#FFFFFF",
  },
  textInputStyle: {
    flex: 1,
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 12,
    color: "#111827",
    height: "100%",
  },
});
