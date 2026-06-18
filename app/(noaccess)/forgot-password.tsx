import { SolidMainButton } from "@/components/Btns";
import LoadingOverlay from "@/components/LoadingOverlay";
import { useForgotPassword } from "@/services/hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const forgotMutation = useForgotPassword();

  const handleSubmit = () => {
    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(trimmed)) {
      Alert.alert("Invalid email", "Please enter a valid email address.");
      return;
    }

    forgotMutation.mutate(
      { email: trimmed },
      {
        onSuccess: () => {
          router.push({
            pathname: "/(noaccess)/reset-password",
            params: { email: trimmed },
          });
        },
        onError: (error) => {
          const message =
            error instanceof Error ? error.message : "Something went wrong. Please try again.";
          Alert.alert("Error", message);
        },
      },
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <LoadingOverlay visible={forgotMutation.isPending} />

      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={18} color="#000000" />
        </TouchableOpacity>

        <View style={styles.contentWrap}>
          <Text style={styles.title}>Forgot Password</Text>
          <Text style={styles.subtitle}>
            Enter your email address and we&apos;ll send you a verification code
            to reset your password.
          </Text>

          <Text style={styles.fieldLabel}>Email Address</Text>
          <View
            style={[
              styles.inputWrapper,
              isFocused && styles.inputWrapperFocused,
            ]}
          >
            <TextInput
              placeholder="Enter your email address"
              placeholderTextColor="#BFBFBF"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              style={styles.textInputStyle}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
          </View>

          <View style={styles.buttonWrap}>
            <SolidMainButton
              text="Send Reset Code"
              onPress={handleSubmit}
              disabled={forgotMutation.isPending}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;

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
  buttonWrap: {
    marginTop: 16,
  },
});
