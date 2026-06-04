import { SolidMainButton } from "@/components/Btns";
import {
  createSignupSession,
  storePendingSignupSession,
} from "@/utils/fake-auth";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useMemo, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type SignupMethod = "phone" | "email";

const CreatePassword = () => {
  const params = useLocalSearchParams<{
    method?: string;
    identifier?: string;
    business?: string;
  }>();

  const [password, setPassword] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const method: SignupMethod = params.method === "phone" ? "phone" : "email";
  const identifier =
    typeof params.identifier === "string" && params.identifier.length > 0
      ? params.identifier
      : "unknown@blink.local";
  const isBusiness = params.business === "true";

  const checks = useMemo(
    () => ({
      minLength: password.length >= 8,
      lowerCase: /[a-z]/.test(password),
      upperCase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    }),
    [password],
  );

  const canCreate = Object.values(checks).every(Boolean);

  const handleCreateAccount = async () => {
    if (!canCreate) {
      Alert.alert("Invalid password", "Please meet all password requirements.");
      return;
    }

    const session = createSignupSession(method, identifier, isBusiness);
    await storePendingSignupSession(session);
    router.push("/(noaccess)/success/community-success");
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

      <View style={styles.container}>
        {/* Working Back Navigation Arrow */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={18} color="#000000" />
        </TouchableOpacity>

        <View style={styles.contentWrap}>
          <Text style={styles.title}>Create Password</Text>

          {/* Interactive Focus Highlight Input */}
          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={[
              styles.passwordInput,
              isFocused && styles.passwordInputFocused,
            ]}
          />

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
              text="Create Account"
              onPress={handleCreateAccount}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CreatePassword;

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
    fontSize: 30,
    color: "#000000",
    marginBottom: 24,
  },
  passwordInput: {
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 17,
    color: "#111827",
    backgroundColor: "#F8F9FB",
    height: 58,
    marginBottom: 28,
  },
  passwordInputFocused: {
    borderColor: "#0066CC",
    backgroundColor: "#FFFFFF",
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
    marginTop: 32,
  },
});
