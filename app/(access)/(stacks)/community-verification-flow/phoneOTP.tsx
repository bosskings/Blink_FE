import { SolidMainButton } from "@/components/Btns";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
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

type OtpStatus = "default" | "error" | "success";

const OTPPhone = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [status, setStatus] = useState<OtpStatus>("default");
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const handleOtpChange = (value: string, index: number) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Dynamic Status Validation: once 4 digits are fully entered
    const code = newOtp.join("");
    if (code.length === 4) {
      if (code === "6307") {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } else {
      setStatus("default");
    }

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Handle backspace to go to previous input
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      setStatus("default");
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpCode = otp.join("");
    if (otpCode === "6307") {
      await AsyncStorage.setItem("phone_verified", "true");
      router.replace(
        "/(access)/(stacks)/community-verification-flow/verifyBronze",
      );
    } else {
      setStatus("error");
    }
  };

  const handleResendCode = () => {
    console.log("Resending code...");
    // Reset state on resend
    setOtp(["", "", "", ""]);
    setStatus("default");
    inputRefs.current[0]?.focus();
  };

  return (
    <SafeAreaView style={styles.viewport}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        {/* Working Circle Back Button */}
        <TouchableOpacity
          style={styles.backCircle}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={18} color="#000000" />
        </TouchableOpacity>

        {/* Left-Aligned Title */}
        <Text style={styles.title}>Enter 4-digit code</Text>

        {/* Dynamic Bolded Subtitle */}
        <Text style={styles.subtitle}>
          We sent a verification code to your phone number:{" "}
          <Text style={styles.boldText}>+2348022194139</Text>
        </Text>

        {/* OTP Input Fields Wrapper */}
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

        {/* Resend Link */}
        <View style={styles.resendRow}>
          <Text style={styles.resendNormal}>
            {"You didn't receive any code? "}
          </Text>
          <TouchableOpacity onPress={handleResendCode}>
            <Text style={styles.resendLink}>Resend code</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1 }} />

        {/* Action button triggers on correct OTP code */}
        <View style={styles.buttonWrap}>
          <SolidMainButton
            text="Verify OTP"
            onPress={handleVerify}
            disabled={status !== "success"}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OTPPhone;

const styles = StyleSheet.create({
  viewport: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  backCircle: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#000000",
    borderRadius: 99,
    width: 44,
    height: 44,
    marginBottom: 42,
  },
  title: {
    fontFamily: "HankenGrotesk_600SemiBold",
    fontSize: 26,
    color: "#000000",
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 12,
    color: "#4B5563",
    lineHeight: 22,
    marginBottom: 36,
  },
  boldText: {
    fontFamily: "HankenGrotesk_600SemiBold",
    color: "#000000",
  },
  otpRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  otpInput: {
    width: "22%",
    height: 72,
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    textAlign: "center",
    fontFamily: "HankenGrotesk_600SemiBold",
    fontSize: 24,
    color: "#000000",
    backgroundColor: "#FFFFFF",
  },
  otpInputSuccess: {
    borderColor: "#00A84E",
    color: "#00A84E",
  },
  otpInputError: {
    borderColor: "#FF3B30",
    color: "#FF3B30",
  },
  resendRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 32,
  },
  resendNormal: {
    fontFamily: "HankenGrotesk_500Medium",
    color: "#4B5563",
    fontSize: 12,
  },
  resendLink: {
    fontFamily: "HankenGrotesk_600SemiBold",
    color: "#0066CC",
    fontSize: 12,
  },
  buttonWrap: {
    marginBottom: 24,
  },
});
