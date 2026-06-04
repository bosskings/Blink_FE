import { SolidMainButton } from "@/components/Btns";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Path, Svg } from "react-native-svg";
import { StatusBar } from "expo-status-bar";

const ProfileSetupCompleted = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.contentWrap}>
        {/* Scalloped Success badge SVG */}
        <Animated.View
          style={styles.badgeWrap}
          entering={FadeInDown.duration(600).springify()}
        >
          <Svg width="140" height="140" viewBox="0 0 80 80" fill="none">
            <Path
              d="M40 0C43.5 0 45.5 2 48 4C50.5 2 52.5 0 56 0C59.5 0 62 2.5 64 6C66 6 70 6.5 72 10C74 13.5 73.5 17 72 20C75 22 78 25 78 29C78 33 75 36 72 38C73.5 41 74 44.5 72 48C70 51.5 66 52 64 52C62 55.5 59.5 58 56 58C52.5 58 50.5 56 48 54C45.5 56 43.5 58 40 58C36.5 58 34.5 56 32 54C29.5 56 27.5 58 24 58C20.5 58 18 55.5 16 52C14 52 10 51.5 8 48C6 44.5 6.5 41 8 38C5 36 2 33 2 29C2 25 5 22 8 20C6.5 17 6 13.5 8 10C10 6.5 14 6 16 6C18 2.5 20.5 0 24 0C27.5 0 29.5 2 32 4C34.5 2 36.5 0 40 0Z"
              fill="#00A84E"
            />
            <Path
              d="M32 29L37 34L50 21"
              stroke="white"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </Animated.View>

        {/* Dynamic headings and text */}
        <Animated.View
          style={styles.textContainer}
          entering={FadeInDown.duration(600).delay(200).springify()}
        >
          <Text style={styles.titleText}>Awesome!</Text>
          <Text style={styles.subtitleText}>You’re all set</Text>
          <Text style={styles.bodyText}>
            Start trading, connecting, and{"\n"}thriving in your community.
          </Text>
        </Animated.View>
      </View>

      {/* Upgraded standard Let's Go button */}
      <Animated.View
        style={styles.buttonContainer}
        entering={FadeInDown.duration(600).delay(400).springify()}
      >
        <SolidMainButton
          text="Let’s Go"
          onPress={async () => {
            await AsyncStorage.setItem("has_onboarded", "true");
            router.replace("/(access)/(tabs)/home");
          }}
        />
      </Animated.View>
    </View>
  );
};

export default ProfileSetupCompleted;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 42,
  },
  contentWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeWrap: {
    marginBottom: 44,
  },
  textContainer: {
    alignItems: "center",
  },
  titleText: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 28,
    color: "#00A84E",
    marginBottom: 8,
  },
  subtitleText: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 24,
    color: "#000000",
    marginBottom: 16,
  },
  bodyText: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 12,
    color: "#4B5563",
    textAlign: "center",
    lineHeight: 22,
  },
  buttonContainer: {
    width: "100%",
  },
});
