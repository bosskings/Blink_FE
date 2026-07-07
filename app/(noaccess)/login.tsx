import { SolidMainButton } from "@/components/Btns";
import LoadingOverlay from "@/components/LoadingOverlay";

import { GoogleIcon } from "@/components/GoogleIcon";
import { useAuth } from "@/providers/AuthProvider";
import { useLogin as useLoginMutation } from "@/services/hooks/useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { useQueryClient } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useMemo, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAlert } from "@/providers/AlertProvider";


type LoginVariant = "signup" | "returning";

const isValidEmail = (value: string): boolean => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(value.trim());
};

const Login = () => {
  const { showAlert } = useAlert();
  const params = useLocalSearchParams<{ variant?: string; method?: "email" | "phone" }>();
  const queryClient = useQueryClient();
  const { login } = useAuth();
  const loginMutation = useLoginMutation();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [isIdentifierFocused, setIsIdentifierFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const variant: LoginVariant =
    params.variant === "signup" ? "signup" : "returning";
  const isSignupVariant = variant === "signup";

  const normalizedIdentifier = useMemo(
    () => identifier.trim().toLowerCase(),
    [identifier],
  );

  const handleLogin = async () => {
    if (!isValidEmail(normalizedIdentifier)) {
      showAlert("Invalid email", "Please enter a valid email address.");
      return;
    }

    if (password.trim().length < 1) {
      showAlert("Password required", "Enter your password to continue.");
      return;
    }

    const finalIdentifier = normalizedIdentifier;

    loginMutation.mutate(
      { email: finalIdentifier, password },
      {
        onSuccess: async (response) => {
          await AsyncStorage.setItem("has_onboarded", "true");
          await queryClient.clear();
          await login(response.token, response.user);
          router.replace("/(access)/(tabs)/home");
        },
        onError: (error) => {
          const message =
            error instanceof Error ? error.message : "Invalid email or password.";
          showAlert("Login failed", message);
        },
      },
    );
  };

  // ==========================================
  // Layout 1: signup variant (Matches image_3.png)
  // ==========================================
  if (isSignupVariant) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <StatusBar style="dark" />
        <LoadingOverlay visible={loginMutation.isPending} />

        <View style={styles.signupContainer}>
          {/* Header Navigation */}
          <View style={styles.signupHeader}>
            <TouchableOpacity
              style={styles.signupBackButton}
              onPress={() => router.back()}
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-back" size={18} color="#000000" />
            </TouchableOpacity>

            <Text style={styles.signupMetaText}>
              New User?{" "}
              <Text
                style={styles.signupMetaLink}
                onPress={() => router.replace("/(noaccess)/register")}
              >
                Signup
              </Text>
            </Text>
          </View>

          {/* Title & Subtitle */}
          <View style={styles.signupTitleWrap}>
            <Text style={styles.signupTitle}>Log in</Text>
            <Text style={styles.signupSubtitle}>
              Access to your Blink account
            </Text>
          </View>

          {/* Fields */}
          <Text style={styles.fieldLabel}>Email</Text>
          <View
            style={[
              styles.inputWrapper,
              isIdentifierFocused && styles.inputWrapperFocused,
            ]}
          >
            <TextInput
              placeholder="Enter your email address"
              placeholderTextColor="#BFBFBF"
              value={identifier}
              onChangeText={setIdentifier}
              autoCapitalize="none"
              keyboardType="email-address"
              style={styles.textInputStyle}
              onFocus={() => setIsIdentifierFocused(true)}
              onBlur={() => setIsIdentifierFocused(false)}
            />
          </View>

          <Text style={styles.fieldLabel}>Password</Text>
          <View
            style={[
              styles.inputWrapper,
              isPasswordFocused && styles.inputWrapperFocused,
            ]}
          >
            <TextInput
              placeholder="Enter your password"
              placeholderTextColor="#BFBFBF"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              style={[styles.textInputStyle, { paddingRight: 48 }]}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
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

          <TouchableOpacity
            style={styles.forgotPasswordButton}
            activeOpacity={0.7}
            onPress={() => router.push("/(noaccess)/forgot-password")}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <View style={{ flex: 1 }} />

          <SolidMainButton
            text="Login"
            onPress={handleLogin}
            disabled={loginMutation.isPending}
          />
        </View>
      </SafeAreaView>
    );
  }

  // ==========================================
  // Layout 2: returning variant (Matches image_4.png)
  // ==========================================
  return (
    <SafeAreaView className="flex-1" style={styles.returningContainer}>
      <StatusBar style="dark" />
      <LoadingOverlay visible={loginMutation.isPending} />

      <ScrollView
        contentContainerStyle={styles.returningScroll}
        keyboardShouldPersistTaps="handled"
      >
        {/* Brand Logo and Greetings at Top */}
        <View style={styles.returningHeader}>
          <Image
            source={require("../../assets/images/splash-icon.png")}
            style={styles.logoImage}
            resizeMode="contain"
          />

          <Text style={styles.returningTitle}>Welcome back</Text>
          <Text style={styles.returningSubtitle}>
            Enter your information on the field below
          </Text>
        </View>

        {/* Rising Card Container */}
        <View style={styles.formCard}>
          {/* Email Input */}
          <Text style={styles.cardFieldLabel}>Email Address</Text>
          <View
            style={[
              styles.inputWrapper,
              isIdentifierFocused && styles.inputWrapperFocused,
              { marginBottom: 20 },
            ]}
          >

            <TextInput
              style={styles.textInputStyle}
              value={identifier}
              onChangeText={setIdentifier}
              placeholder=""
              autoCapitalize="none"
              keyboardType="email-address"
              onFocus={() => setIsIdentifierFocused(true)}
              onBlur={() => setIsIdentifierFocused(false)}
            />
          </View>

          {/* Password Input */}
          <Text style={styles.cardFieldLabel}>Password</Text>
          <View
            style={[
              styles.inputWrapper,
              isPasswordFocused && styles.inputWrapperFocused,
              { marginBottom: 12 },
            ]}
          >
            <TextInput
              style={[styles.textInputStyle, { paddingRight: 48 }]}
              value={password}
              onChangeText={setPassword}
              placeholder=""
              secureTextEntry={!showPassword}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
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

          <TouchableOpacity
            style={[styles.forgotPasswordButton, { marginBottom: 24 }]}
            activeOpacity={0.7}
            onPress={() => router.push("/(noaccess)/forgot-password")}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <SolidMainButton
            text="Log in"
            onPress={handleLogin}
            disabled={loginMutation.isPending}
          />

          {/* Text Divider */}
          <View style={styles.dividerWrap}>
            <View style={styles.dividerLine} />
            <Text style={styles.orText}>or sign in with</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Secondary Google Auth Button */}
          <TouchableOpacity style={styles.alternateButton} activeOpacity={0.7}>
            <GoogleIcon size={18} style={styles.altIcon} />
            <Text style={styles.alternateButtonText}>Google</Text>
          </TouchableOpacity>

          {/* Signup Navigation Footer */}
          <Text style={styles.signupPromptText}>
            Don&apos;t have an account?{" "}
            <Text
              style={styles.signupPromptLink}
              onPress={() => router.replace("/(noaccess)/register")}
            >
              Signup
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  // Layout 1 Styles
  signupContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
  },
  signupHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 44,
  },
  signupBackButton: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#000000",
    borderRadius: 99,
    width: 44,
    height: 44,
  },
  signupMetaText: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 12,
    color: "#1F2937",
  },
  signupMetaLink: {
    color: "#0066CC",
    fontFamily: "HankenGrotesk_500Medium",
  },
  signupTitleWrap: {
    marginBottom: 32,
  },
  signupTitle: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 17,
    color: "#000000",
    marginBottom: 8,
  },
  signupSubtitle: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 12,
    color: "#4B5563",
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
  forgotPasswordButton: {
    alignSelf: "flex-start",
    marginTop: 4,
  },
  forgotPasswordText: {
    color: "#0066CC",
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 12,
  },

  // Layout 2 Styles
  returningContainer: {
    backgroundColor: "#EAF0F6",
    flex: 1,
  },
  returningScroll: {
    flexGrow: 1,
  },
  returningHeader: {
    alignItems: "center",
    paddingTop: 36,
    paddingBottom: 28,
  },
  logoImage: {
    width: 90,
    height: 90,
    marginBottom: 20,
  },
  returningTitle: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 17,
    color: "#000000",
    marginBottom: 6,
  },
  returningSubtitle: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 12,
    color: "#4B5563",
  },
  formCard: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 24,
    paddingTop: 42,
    paddingBottom: 36,
    flex: 1,
    minHeight: 460,
  },
  cardFieldLabel: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 12,
    color: "#111827",
    marginBottom: 8,
  },
  verticalDivider: {
    width: 1.5,
    height: 24,
    backgroundColor: "#D1D5DB",
    marginHorizontal: 8,
  },
  dividerWrap: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  orText: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 12,
    color: "#111827",
    marginHorizontal: 16,
  },
  alternateButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F8F9FB",
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    height: 56,
    marginBottom: 24,
  },
  altIcon: {
    marginRight: 10,
  },
  alternateButtonText: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 12,
    color: "#111827",
  },
  signupPromptText: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 12,
    color: "#4B5563",
    textAlign: "center",
  },
  signupPromptLink: {
    color: "#0066CC",
    fontFamily: "HankenGrotesk_500Medium",
  },
});
