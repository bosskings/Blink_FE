import { SolidMainButton } from "@/components/Btns";
import { ErrorMessage } from "@hookform/error-message";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const EmailVerification = () => {
  const [isFocused, setIsFocused] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const emailValue = watch("email");
  const isEmailValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
    emailValue,
  );

  const onSubmit = async (data: any) => {
    console.log("Email verification:", data);
    // Save email in AsyncStorage so it updates the Bronze view dynamically
    await AsyncStorage.setItem("user_email", data.email.trim());
    router.push("/(access)/(stacks)/community-verification-flow/emailOTP");
  };

  return (
    <SafeAreaView style={styles.viewport}>
      <StatusBar style="dark" />
      <View style={styles.container}>
        {/* Working Circle Back Arrow Button */}
        <TouchableOpacity
          style={styles.backCircle}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={18} color="#000000" />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.title}>Enter your email</Text>

        {/* Description */}
        <Text style={styles.subtitle}>
          Please provide a valid email address to proceed
        </Text>

        {/* Email Input Field */}
        <View style={styles.fieldGroup}>
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please enter a valid email address",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <View
                style={[
                  styles.inputWrapper,
                  isFocused && styles.inputWrapperFocused,
                ]}
              >
                <TextInput
                  placeholder=""
                  placeholderTextColor="#AFAFAF"
                  onChangeText={onChange}
                  onBlur={() => {
                    onBlur();
                    setIsFocused(false);
                  }}
                  onFocus={() => setIsFocused(true)}
                  value={value}
                  keyboardType="email-address"
                  style={styles.textInput}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            )}
          />

          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => (
              <Text style={styles.errorText}>{message}</Text>
            )}
          />
        </View>

        <View style={{ flex: 1 }} />

        {/* Dynamic Submit Button */}
        <View style={styles.buttonWrap}>
          <SolidMainButton
            text="Get OTP"
            onPress={handleSubmit(onSubmit)}
            disabled={!isEmailValid}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EmailVerification;

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
  fieldGroup: {
    marginBottom: 24,
  },
  inputWrapper: {
    borderRadius: 14,
    backgroundColor: "#F8F9FB",
    borderWidth: 2,
    borderColor: "transparent",
    height: 58,
    paddingHorizontal: 14,
    justifyContent: "center",
  },
  inputWrapperFocused: {
    borderColor: "#0066CC",
    backgroundColor: "#FFFFFF",
  },
  textInput: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 12,
    color: "#111827",
    height: "100%",
    width: "100%",
  },
  errorText: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 12,
    color: "#EF4444",
    marginTop: 6,
    marginLeft: 4,
  },
  buttonWrap: {
    marginBottom: 24,
  },
});
