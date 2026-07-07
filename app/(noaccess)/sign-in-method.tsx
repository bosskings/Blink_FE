import { SolidGrayButton, SolidMainButton } from "@/components/Btns";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

const SignInMethod = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.content}>
        <Animated.View entering={FadeInDown.duration(400).springify()} style={styles.logoContainer}>
          <Image
            source={require("../../assets/images/splash-icon.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>Please select your sign-in method</Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.duration(500).delay(100).springify()} style={styles.buttonContainer}>
          <SolidMainButton
            text="Sign in with Email"
            onPress={() =>
              router.push({
                pathname: "/(noaccess)/login",
                params: { variant: "returning", method: "email" },
              })
            }
            style={{ marginBottom: 16 }}
          />
          <SolidGrayButton
            text="Sign in with Phone Number"
            onPress={() =>
              router.push({
                pathname: "/(noaccess)/login",
                params: { variant: "returning", method: "phone" },
              })
            }
          />
        </Animated.View>

        <Animated.View entering={FadeInDown.duration(600).delay(200).springify()} style={styles.footer}>
          <Text style={styles.footerText}>
            New User?{" "}
            <Text
              style={styles.footerLink}
              onPress={() => router.replace("/(noaccess)/register")}
            >
              Signup
            </Text>
          </Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default SignInMethod;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAF0F6",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 60,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 24,
  },
  title: {
    fontFamily: "HankenGrotesk_700Bold",
    fontSize: 24,
    color: "#000000",
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: "HankenGrotesk_400Regular",
    fontSize: 14,
    color: "#4B5563",
    textAlign: "center",
  },
  buttonContainer: {
    marginBottom: 40,
  },
  footer: {
    alignItems: "center",
  },
  footerText: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 14,
    color: "#4B5563",
  },
  footerLink: {
    color: "#0066CC",
    fontFamily: "HankenGrotesk_700Bold",
  },
});
