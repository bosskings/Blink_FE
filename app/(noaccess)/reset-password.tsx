import { SolidMainButton } from "@/components/Btns";
import LoadingOverlay from "@/components/LoadingOverlay";
import { useResetPassword } from "@/services/hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useMemo, useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ResetPassword = () => {
  const params = useLocalSearchParams<{ email?: string }>();
  const email = typeof params.email === "string" ? params.email : "";

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const resetMutation = useResetPassword();

  const checks = useMemo(
    () => ({
      minLength: newPassword.length >= 8,
      lowerCase: /[a-z]/.test(newPassword),
      upperCase: /[A-Z]/.test(newPassword),
      number: /[0-9]/.test(newPassword),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
    }),
    [newPassword],
  );

  const canSubmit =
    otp.trim().length >= 4 && Object.values(checks).every(Boolean);

  const handleReset = () => {
    if (!canSubmit) {
      Alert.alert("Incomplete", "Please fill in the OTP and a valid password.");
      return;
    }

    resetMutation.mutate(
      { email, otp: otp.trim(), newPassword },
      {
        onSuccess: () => {
          Alert.alert(
            "Password Reset",
            "Your password has been reset successfully. Please log in.",
            [
              {
                text: "Go to Login",
                onPress: () =>
                  router.replace({
                    pathname: "/(noaccess)/login",
                    params: { variant: "returning" },
                  }),
              },
            ],
          );
        },
        onError: (error) => {
          const message =
            error instanceof Error ? error.message : "Reset failed. Please try again.";
          Alert.alert("Error", message);
        },
      },
    );
  };

  const RequirementRow = ({
    passed,
    text,
  }: {
    passed: boolean;
    text: string;
  }) => (
    <View style={styles.requirementRow}>
      <Ionicons
        name={passed ? "checkmark-circle" : "close-circle"}
        size={18}
        color={passed ? "#03A84E" : "#FF2E2E"}
      />
      <Text
        style={[
          styles.requirementText,
          passed ? styles.requirementPass : styles.requirementFail,
        ]}
      >
        {text}
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <LoadingOverlay visible={resetMutation.isPending} />

      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={18} color="#000000" />
        </TouchableOpacity>

        <View style={styles.contentWrap}>
          <Text style={styles.title}>Reset Password</Text>
          <Text style={styles.subtitle}>
            Enter the verification code sent to {email} and your new password.
          </Text>

          <Text style={styles.fieldLabel}>Verification Code</Text>
          <View
            style={[
              styles.inputWrapper,
              focusedField === "otp" && styles.inputWrapperFocused,
            ]}
          >
            <TextInput
              placeholder="Enter OTP"
              placeholderTextColor="#BFBFBF"
              value={otp}
              onChangeText={setOtp}
              keyboardType="number-pad"
              style={styles.textInputStyle}
              onFocus={() => setFocusedField("otp")}
              onBlur={() => setFocusedField(null)}
              maxLength={6}
            />
          </View>

          <Text style={styles.fieldLabel}>New Password</Text>
          <View
            style={[
              styles.inputWrapper,
              focusedField === "password" && styles.inputWrapperFocused,
            ]}
          >
            <TextInput
              placeholder="Enter new password"
              placeholderTextColor="#BFBFBF"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry={!showPassword}
              style={[styles.textInputStyle, { paddingRight: 48 }]}
              onFocus={() => setFocusedField("password")}
              onBlur={() => setFocusedField(null)}
            />
            <Pressable
              onPress={() => setShowPassword((prev) => !prev)}
              style={styles.eyeButton}
            >
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={18}
                color="#C4C4C4"
              />
            </Pressable>
          </View>

          <Text style={styles.requirementHeading}>
            Your password must contain:
          </Text>
          <RequirementRow passed={checks.minLength} text="8 characters long" />
          <RequirementRow
            passed={checks.lowerCase}
            text="1 lowercase character (a - z)"
          />
          <RequirementRow
            passed={checks.upperCase}
            text="1 Uppercase character (A - Z)"
          />
          <RequirementRow passed={checks.number} text="1 number" />
          <RequirementRow
            passed={checks.specialChar}
            text="1 special character"
          />

          <View style={styles.buttonWrap}>
            <SolidMainButton
              text="Reset Password"
              onPress={handleReset}
              disabled={!canSubmit || resetMutation.isPending}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  backButton: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#000000",
    borderRadius: 99,
    width: 44,
    height: 44,
    marginBottom: 42,
  },
  contentWrap: {
    marginTop: 12,
  },
  title: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 17,
    color: "#000000",
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 12,
    color: "#4B5563",
    lineHeight: 20,
    marginBottom: 32,
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
    position: "relative",
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
  eyeButton: {
    position: "absolute",
    right: 16,
    height: "100%",
    justifyContent: "center",
  },
  requirementHeading: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 12,
    color: "#000000",
    marginBottom: 16,
  },
  requirementRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  requirementText: {
    marginLeft: 12,
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 12,
  },
  requirementPass: {
    color: "#03A84E",
  },
  requirementFail: {
    color: "#FF2E2E",
  },
  buttonWrap: {
    marginTop: 24,
  },
});
