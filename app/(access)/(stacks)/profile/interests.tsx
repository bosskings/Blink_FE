import { Headers } from "@/components/Headers";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Mock interests data
const INTERESTS = [
  "Health",
  "Fashion",
  "Food",
  "Music",
  "Sports",
  "Photography",
  "Movies",
  "Fitness",
  "Tech",
  "Science",
  "Writing",
  "Reading",
  "Lifestyle",
  "Gaming",
  "Politics",
  "Faith",
  "Travel",
  "Culture",
];

export default function InterestsScreen() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const onSubmit = (data: any) => {
    console.log("Interest:", {
      selectedInterests,
    });
    router.push("/(access)/(stacks)/profile/profile-setup-completed");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <View className="flex-1 px-6">
        {/* Header */}
        <View className="mt-6 mb-6">
          <Headers onPress={() => router.back()} />
        </View>

        {/* Title */}
        <View className="mb-6">
          <Text
            style={{ fontFamily: "HankenGrotesk_700Bold" }}
            className="text-2xl font-bold text-black"
          >
            What are your interests?
          </Text>
          <Text
            style={{ fontFamily: "HankenGrotesk_600SemiBold" }}
            className="text-base text-[#666666] mt-2"
          >
            Select one or more areas you&apos;re interested in
          </Text>
        </View>

        {/* Interests Grid */}
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          <View style={styles.interestDivStyle} className="gap-3 pb-24">
            {INTERESTS.map((interest) => (
              <TouchableOpacity
                key={interest}
                onPress={() => toggleInterest(interest)}
                style={styles.interestItem}
                className={`px-6 py-3 rounded-md border ${
                  selectedInterests.includes(interest)
                    ? "bg-[#F4FAFF] border-[#0066CC]"
                    : "bg-white border-gray-200"
                }`}
                accessibilityLabel={`Select ${interest}`}
                accessibilityState={{
                  selected: selectedInterests.includes(interest),
                }}
              >
                <Text
                  className={`text-base ${
                    selectedInterests.includes(interest)
                      ? "text-[#0066CC] font-semibold"
                      : "text-gray-800"
                  }`}
                  style={{ fontFamily: "HankenGrotesk_600SemiBold" }}
                >
                  {interest}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Complete Profile Button */}
        <View className="absolute bottom-0 bg-white left-0 right-0">
          <View className="w-[90%] self-center py-4">
            <TouchableOpacity
              className={`py-4 rounded-xl ${
                selectedInterests.length > 0 ? "bg-[#0066CC]" : "bg-gray-300"
              }`}
              disabled={selectedInterests.length === 0}
              accessibilityLabel="Complete profile"
              accessibilityState={{ disabled: selectedInterests.length === 0 }}
              onPress={onSubmit}
            >
              <Text
                className={`text-center text-base font-semibold ${
                  selectedInterests.length > 0 ? "text-white" : "text-gray-400"
                }`}
                style={{ fontFamily: "HankenGrotesk_600SemiBold" }}
              >
                Complete Profile
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  interestDivStyle: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    paddingBottom: 96,
  },
  interestItem: {
    width: "48%",
  },
});
