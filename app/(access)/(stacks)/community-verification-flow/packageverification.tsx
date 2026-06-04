import { SolidMainButton } from "@/components/Btns";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Packageverification = () => {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  const verificationTiers = [
    {
      id: "bronze",
      name: "Bronze",
      subtitle: "(Basic Verification)",
      features: ["Phone number verification", "Email verification"],
      image: require("../../../../assets/images/bronze.png"),
      link: "/(access)/(stacks)/community-verification-flow/verifyBronze",
    },
    {
      id: "gold",
      name: "Gold",
      subtitle: "(Advanced Verification)",
      features: [
        "An Identity Card",
        "Business document upload",
        "Social media account linking",
      ],
      image: require("../../../../assets/images/gold.png"),
      link: "/(access)/(stacks)/community-verification-flow/verifyGold",
    },
  ];

  const handleProceed = () => {
    const selected = verificationTiers.find((tier) => tier.id === selectedTier);
    if (selected) {
      router.push(selected.link as any);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <View style={styles.container}>
        {/* Step Progress Single-Row Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backCircle}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={18} color="#000000" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Verification Tier</Text>

          {/* Elongated Step Dots Progress Indicator */}
          <View style={styles.dotsRow}>
            <View style={styles.dotInactive} />
            <View style={styles.dotActive} />
            <View style={styles.dotInactive} />
          </View>
        </View>

        {/* Heading Copy */}
        <View style={styles.titleWrap}>
          <Text style={styles.titleText}>Build Trust in your Community</Text>
          <Text style={styles.subtitleText}>
            Choose a verification level to trade safely and be{"\n"}more trusted
            by others
          </Text>
        </View>

        {/* Verification Tier Selection List */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollStyle}
          contentContainerStyle={styles.scrollContent}
        >
          {verificationTiers.map((tier) => {
            const isSelected = selectedTier === tier.id;
            return (
              <TouchableOpacity
                key={tier.id}
                onPress={() => setSelectedTier(tier.id)}
                activeOpacity={0.8}
                style={styles.cardContainer}
              >
                <View
                  style={[
                    styles.cardFrame,
                    isSelected
                      ? styles.cardFrameSelected
                      : styles.cardFrameNormal,
                  ]}
                >
                  <View style={styles.cardInner}>
                    {/* Left Column: Copy & Criteria bullets */}
                    <View style={styles.leftCol}>
                      <View style={styles.titleRow}>
                        <Text style={styles.tierName}>{tier.name} </Text>
                        <Text style={styles.tierSubtitle}>{tier.subtitle}</Text>
                      </View>

                      <View style={styles.bulletList}>
                        {tier.features.map((feature, index) => (
                          <View key={index} style={styles.bulletRow}>
                            <View style={styles.bulletDot} />
                            <Text style={styles.bulletText}>{feature}</Text>
                          </View>
                        ))}
                      </View>
                    </View>

                    {/* Right Column: Medal Graphic Image */}
                    <View style={styles.rightCol}>
                      <Image
                        source={tier.image}
                        style={styles.medalImage}
                        resizeMode="contain"
                      />
                    </View>
                  </View>

                  {/* Active Blue Selection Checkmark Circle */}
                  {isSelected && (
                    <View style={styles.checkmarkWrap}>
                      <View style={styles.checkmarkCircle}>
                        <Ionicons name="checkmark" size={12} color="white" />
                      </View>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Proceed Action Button */}
        <View style={styles.bottomBar}>
          <SolidMainButton
            text="Proceed"
            onPress={handleProceed}
            disabled={selectedTier === null}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Packageverification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
    marginBottom: 44,
  },
  backCircle: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#000000",
    borderRadius: 99,
    width: 44,
    height: 44,
  },
  headerTitle: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 17,
    color: "#0066CC",
  },
  dotsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  dotInactive: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E5E7EB",
  },
  dotActive: {
    width: 20,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#0066CC",
  },
  titleWrap: {
    alignItems: "center",
    marginBottom: 36,
  },
  titleText: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 25,
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
  scrollStyle: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 110,
  },
  cardContainer: {
    marginBottom: 16,
  },
  cardFrame: {
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 24,
    backgroundColor: "#FFFFFF",
    position: "relative",
    minHeight: 140,
  },
  cardFrameNormal: {
    borderWidth: 1.5,
    borderColor: "#000000",
  },
  cardFrameSelected: {
    borderWidth: 2.5,
    borderColor: "#0066CC",
    shadowColor: "#0066CC",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftCol: {
    flex: 1,
    paddingRight: 12,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "baseline",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  tierName: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 20,
    color: "#000000",
  },
  tierSubtitle: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 12,
    color: "#6B7280",
  },
  bulletList: {
    gap: 8,
  },
  bulletRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  bulletDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#D1D5DB",
    marginRight: 10,
  },
  bulletText: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 12,
    color: "#374151",
    flex: 1,
  },
  rightCol: {
    justifyContent: "center",
    alignItems: "center",
    width: 76,
    height: 76,
  },
  medalImage: {
    width: "100%",
    height: "100%",
  },
  checkmarkWrap: {
    position: "absolute",
    top: 16,
    right: 16,
  },
  checkmarkCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#0066CC",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    paddingBottom: 24,
    paddingTop: 12,
    paddingHorizontal: 24,
  },
});
