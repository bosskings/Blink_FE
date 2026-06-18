import { SolidMainButton } from "@/components/Btns";
import { CountryPicker, Country, COUNTRIES } from "@/components/CountryPicker";
import { GoogleIcon } from "@/components/GoogleIcon";
import { Ionicons } from "@expo/vector-icons";
import { ErrorMessage } from "@hookform/error-message";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


interface PhoneFormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email?: string;
}

interface EmailFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
}

const Register = () => {
  const [activeTab, setActiveTab] = useState<"phone" | "email">("phone");
  const [joinAsBusiness, setJoinAsBusiness] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>(COUNTRIES[0]);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PhoneFormData & EmailFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
    },
  });

  const onPhoneSubmit = async (data: PhoneFormData) => {
    const normalizedPhone = data.phoneNumber.replace(/^0/, "");

    router.push({
      pathname: "/(noaccess)/create-password",
      params: {
        method: "phone",
        identifier: `${selectedCountry.code}${normalizedPhone}`,
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        business: joinAsBusiness ? "true" : "false",
      },
    });
  };

  const onEmailSubmit = async (data: EmailFormData) => {
    router.push({
      pathname: "/(noaccess)/create-password",
      params: {
        method: "email",
        identifier: data.email.trim().toLowerCase(),
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        business: joinAsBusiness ? "true" : "false",
      },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />

      <ScrollView
        className="flex-1"
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header Navigation */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={18} color="#000000" />
          </TouchableOpacity>

          <Text style={styles.returningUserText}>
            Returning user?{" "}
            <Text
              style={styles.loginText}
              onPress={() =>
                router.push({
                  pathname: "/(noaccess)/login",
                  params: { variant: "signup" },
                })
              }
            >
              Login
            </Text>
          </Text>
        </View>

        {/* Dynamic Titles */}
        <View style={styles.titleWrap}>
          <Text style={styles.titleText}>
            {activeTab === "phone" ? "Sign with Phone" : "Sign up with Email"}
          </Text>
          <Text style={styles.subtitleText}>
            Please provide a valid{" "}
            {activeTab === "phone" ? "phone number" : "email address"} to
            proceed
          </Text>
        </View>

        {/* Input Forms */}
        <View style={{ flexDirection: "row", gap: 12, marginBottom: 4 }}>
          <View style={{ flex: 1 }}>
            <Controller
              name="firstName"
              control={control}
              rules={{ required: "First name is required" }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View
                  style={[
                    styles.inputContainer,
                    focusedField === "firstName" && styles.inputFocused,
                  ]}
                >
                  <TextInput
                    placeholder="First name"
                    placeholderTextColor="#AFAFAF"
                    onChangeText={onChange}
                    onBlur={() => {
                      onBlur();
                      setFocusedField(null);
                    }}
                    onFocus={() => setFocusedField("firstName")}
                    value={value || ""}
                    style={[styles.textInput, { paddingLeft: 4 }]}
                    autoCapitalize="words"
                    autoCorrect={false}
                  />
                </View>
              )}
            />
            <ErrorMessage
              errors={errors}
              name="firstName"
              render={({ message }) => (
                <Text style={styles.errorText}>{message}</Text>
              )}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Controller
              name="lastName"
              control={control}
              rules={{ required: "Last name is required" }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View
                  style={[
                    styles.inputContainer,
                    focusedField === "lastName" && styles.inputFocused,
                  ]}
                >
                  <TextInput
                    placeholder="Last name"
                    placeholderTextColor="#AFAFAF"
                    onChangeText={onChange}
                    onBlur={() => {
                      onBlur();
                      setFocusedField(null);
                    }}
                    onFocus={() => setFocusedField("lastName")}
                    value={value || ""}
                    style={[styles.textInput, { paddingLeft: 4 }]}
                    autoCapitalize="words"
                    autoCorrect={false}
                  />
                </View>
              )}
            />
            <ErrorMessage
              errors={errors}
              name="lastName"
              render={({ message }) => (
                <Text style={styles.errorText}>{message}</Text>
              )}
            />
          </View>
        </View>

        {activeTab === "phone" ? (
          <View>
            <Controller
              name="phoneNumber"
              control={control}
              rules={{
                required: "Phone Number is required",
                pattern: {
                  value: /^[0-9]{7,15}$/,
                  message: "Please enter a valid phone number",
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View
                  style={[
                    styles.inputContainer,
                    focusedField === "phone" && styles.inputFocused,
                  ]}
                >
                  <CountryPicker
                    selectedCountry={selectedCountry}
                    onSelectCountry={setSelectedCountry}
                  />

                  <View style={styles.verticalDivider} />

                  <TextInput
                    placeholder=""
                    placeholderTextColor="#AFAFAF"
                    onChangeText={onChange}
                    onBlur={() => {
                      onBlur();
                      setFocusedField(null);
                    }}
                    onFocus={() => setFocusedField("phone")}
                    value={value || ""}
                    keyboardType="phone-pad"
                    style={styles.textInput}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
              )}
            />

            <ErrorMessage
              errors={errors}
              name="phoneNumber"
              render={({ message }) => (
                <Text style={styles.errorText}>{message}</Text>
              )}
            />

            {/* Custom Premium Checkbox */}
            <View style={styles.checkboxContainer}>
              <Text style={styles.joinBusinessText}>Join as Business</Text>
              <TouchableOpacity
                onPress={() => setJoinAsBusiness((prev) => !prev)}
                style={[
                  styles.checkboxBox,
                  joinAsBusiness && styles.checkboxChecked,
                ]}
                activeOpacity={0.8}
              >
                {joinAsBusiness && (
                  <Ionicons name="checkmark" size={13} color="#FFFFFF" />
                )}
              </TouchableOpacity>
            </View>

            <SolidMainButton
              text="Continue"
              onPress={handleSubmit(onPhoneSubmit)}
            />
          </View>
        ) : (
          <View>
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
                    styles.inputContainer,
                    focusedField === "email" && styles.inputFocused,
                  ]}
                >
                  <TextInput
                    placeholder=""
                    placeholderTextColor="#AFAFAF"
                    onChangeText={onChange}
                    onBlur={() => {
                      onBlur();
                      setFocusedField(null);
                    }}
                    onFocus={() => setFocusedField("email")}
                    value={value || ""}
                    keyboardType="email-address"
                    style={[styles.textInput, { paddingLeft: 4 }]}
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

            {/* Custom Premium Checkbox */}
            <View style={styles.checkboxContainer}>
              <Text style={styles.joinBusinessText}>Join as Business</Text>
              <TouchableOpacity
                onPress={() => setJoinAsBusiness((prev) => !prev)}
                style={[
                  styles.checkboxBox,
                  joinAsBusiness && styles.checkboxChecked,
                ]}
                activeOpacity={0.8}
              >
                {joinAsBusiness && (
                  <Ionicons name="checkmark" size={13} color="#FFFFFF" />
                )}
              </TouchableOpacity>
            </View>

            <SolidMainButton
              text="Continue"
              onPress={handleSubmit(onEmailSubmit)}
            />
          </View>
        )}

        {/* Text Divider */}
        <View style={styles.dividerWrap}>
          <View style={styles.dividerLine} />
          <Text style={styles.orText}>or sign in with</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Alternate Sign In Buttons */}
        <TouchableOpacity
          style={styles.alternateButton}
          onPress={() => {
            setActiveTab((prev) => (prev === "phone" ? "email" : "phone"));
            setFocusedField(null);
          }}
          activeOpacity={0.7}
        >
          <Ionicons
            name={activeTab === "phone" ? "mail" : "call"}
            size={18}
            color="#0066CC"
            style={styles.altIcon}
          />
          <Text style={styles.alternateButtonText}>
            Continue with {activeTab === "phone" ? "Email" : "Phone"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.alternateButton} activeOpacity={0.7}>
          <GoogleIcon size={18} style={styles.altIcon} />
          <Text style={styles.alternateButtonText}>Continue with Google</Text>
        </TouchableOpacity>

        {/* Terms and links footer */}
        <Text style={styles.termsText}>
          By continuing, you agree to our{" "}
          <Text style={styles.linkText}>Terms & Conditions</Text>
          {"\n"}
          and <Text style={styles.linkText}>Privacy Policy</Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 16,
    paddingHorizontal: 24,
    paddingBottom: 42,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 52,
  },
  backButton: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#000000",
    borderRadius: 99,
    width: 44,
    height: 44,
  },
  returningUserText: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 12,
    color: "#1F2937",
  },
  loginText: {
    color: "#0066CC",
    fontFamily: "HankenGrotesk_500Medium",
  },
  titleWrap: {
    alignItems: "center",
    marginBottom: 36,
  },
  titleText: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 17,
    color: "#000000",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitleText: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 12,
    color: "#4B5563",
    textAlign: "center",
    lineHeight: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    backgroundColor: "#F8F9FB",
    borderWidth: 2,
    borderColor: "transparent",
    height: 58,
    paddingHorizontal: 12,
    marginBottom: 4,
  },
  inputFocused: {
    borderColor: "#0066CC",
    backgroundColor: "#FFFFFF",
  },
  verticalDivider: {
    width: 1.5,
    height: 24,
    backgroundColor: "#D1D5DB",
    marginHorizontal: 8,
  },
  textInput: {
    flex: 1,
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 12,
    color: "#111827",
    height: "100%",
  },
  errorText: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 12,
    color: "#EF4444",
    marginTop: 4,
    marginLeft: 4,
    marginBottom: 12,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 14,
    marginBottom: 28,
  },
  joinBusinessText: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 12,
    color: "#111827",
  },
  checkboxBox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#000000",
    backgroundColor: "transparent",
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: "#000000",
  },
  dividerWrap: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 32,
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
    marginBottom: 12,
  },
  altIcon: {
    marginRight: 10,
  },
  alternateButtonText: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 12,
    color: "#111827",
  },
  termsText: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 12,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 18,
    marginTop: 36,
  },
  linkText: {
    color: "#0066CC",
    fontFamily: "HankenGrotesk_500Medium",
  },
});
