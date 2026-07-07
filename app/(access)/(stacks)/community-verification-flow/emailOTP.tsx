import { SolidMainButton } from "@/components/Btns";
import LoadingOverlay from "@/components/LoadingOverlay";
import { useVerifyEmail, useResendOtp } from "@/services";
import { useUserProfile } from "@/providers/UserProfileProvider";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAlert } from "@/providers/AlertProvider";


type OtpStatus = "default" | "error" | "success";

const OTPEmail = () => {
  const { showAlert } = useAlert();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [status, setStatus] = useState<OtpStatus>("default");
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const { profile } = useUserProfile();
  const verifyMutation = useVerifyEmail();
  const resendMutation = useResendOtp();

  const userEmail = profile?.email ?? "";

  const handleOtpChange = (value: string, index: number) => {
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (newOtp.join("").length === 4) {
      setStatus("default");
    } else {
      setStatus("default");
    }

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: { nativeEvent: { key: string } }, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      setStatus("default");
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const otpCode = otp.join("");
    if (otpCode.length < 4) return;

    verifyMutation.mutate(
      { email: userEmail, otp: otpCode },
      {
        onSuccess: () => {
          setStatus("success");
          router.replace(
            "/(access)/(stacks)/community-verification-flow/verifyBronze",
          );
        },
        onError: (err) => {
          setStatus("error");
          showAlert("Verification Failed", err instanceof Error ? err.message : "Invalid OTP code.");
        },
      },
    );
  };

  const handleResendCode = () => {
    resendMutation.mutate(
      { email: userEmail, type: "email" },
      {
        onSuccess: () => {
          showAlert("Code Sent", "A new verification code has been sent to your email.");
          setOtp(["", "", "", ""]);
          setStatus("default");
          inputRefs.current[0]?.focus();
        },
        onError: (err) => {
          showAlert("Error", err instanceof Error ? err.message : "Failed to resend code.");
        },
      },
    );
  };

  const canVerify = otp.join("").length === 4 && !verifyMutation.isPending;

  return (
    <SafeAreaView style={styles.viewport}>
      <StatusBar style="dark" />
      <LoadingOverlay visible={verifyMutation.isPending || resendMutation.isPending} />
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backCircle}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={18} color="#000000" />
        </TouchableOpacity>

        <Text style={styles.title}>Enter 4-digit code</Text>

        <Text style={styles.subtitle}>
          We sent a verification code to your email:{" "}
          <Text style={styles.boldText}>{userEmail || "your email"}</Text>
        </Text>

        <View style={styles.otpRow}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                inputRefs.current[index] = ref;
              }}
              style={[
                styles.otpInput,
                status === "success" && styles.otpInputSuccess,
                status === "error" && styles.otpInputError,
              ]}
              value={digit}
              onChangeText={(value) => handleOtpChange(value, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
            />
          ))}
        </View>

        <View style={styles.resendRow}>
          <Text style={styles.resendNormal}>
            {"You didn't receive any code? "}
          </Text>
          <TouchableOpacity onPress={handleResendCode} disabled={resendMutation.isPending}>
            <Text style={styles.resendLink}>Resend code</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1 }} />

        <View style={styles.buttonWrap}>
          <SolidMainButton
            text="Verify OTP"
            onPress={handleVerify}
            disabled={!canVerify}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OTPEmail;

const styles = StyleSheet.create({
  viewport: { flex: 1, backgroundColor: "#FFFFFF" },
  container: { flex: 1, paddingHorizontal: 24, paddingTop: 16 },
  backCircle: { alignItems: "center", justifyContent: "center", borderWidth: 1.5, borderColor: "#000000", borderRadius: 99, width: 44, height: 44, marginBottom: 42 },
  title: { fontFamily: "HankenGrotesk_600SemiBold", fontSize: 26, color: "#000000", marginBottom: 10 },
  subtitle: { fontFamily: "HankenGrotesk_500Medium", fontSize: 12, color: "#4B5563", lineHeight: 22, marginBottom: 36 },
  boldText: { fontFamily: "HankenGrotesk_600SemiBold", color: "#000000" },
  otpRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 24 },
  otpInput: { width: "22%", height: 72, borderWidth: 2, borderColor: "#E5E7EB", borderRadius: 14, textAlign: "center", fontFamily: "HankenGrotesk_600SemiBold", fontSize: 24, color: "#000000", backgroundColor: "#FFFFFF" },
  otpInputSuccess: { borderColor: "#00A84E", color: "#00A84E" },
  otpInputError: { borderColor: "#FF3B30", color: "#FF3B30" },
  resendRow: { flexDirection: "row", justifyContent: "center", marginBottom: 32 },
  resendNormal: { fontFamily: "HankenGrotesk_500Medium", color: "#4B5563", fontSize: 12 },
  resendLink: { fontFamily: "HankenGrotesk_600SemiBold", color: "#0066CC", fontSize: 12 },
  buttonWrap: { marginBottom: 24 },
});
