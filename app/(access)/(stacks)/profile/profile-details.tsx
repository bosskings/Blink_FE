import { Headers } from "@/components/Headers";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileDetails() {
  const [blinkTag, setBlinkTag] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      bio: "",
    },
  });

  const bio = watch("bio") || "";
  console.log(bio);

  const checkAvailability = (username: string) => {
    // Mock availability check
    setIsAvailable(username.length > 3 && !username.includes(" "));
  };

  const onSubmit = (data: any) => {
    console.log("Profile details submitted:", {
      blinkTag,
      bio: data.bio,
    });
    router.push("/(access)/(stacks)/profile/interests");
  };

  const isFormValid = blinkTag.trim().length > 0 && isAvailable;

  const remaining = 250 - bio.trim().length;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView
        className="flex-1 px-6"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header */}
        <View className="mt-6 mb-6">
          <Headers text="Verification Tier" onPress={() => router.back()} />
        </View>

        {/* Main Content */}
        <View>
          <Text
            style={{ fontFamily: "HankenGrotesk_700Bold" }}
            className="text-2xl font-bold text-center mb-8"
          >
            Tell us about yourself
          </Text>

          {/* Blink Tag Input */}
          <View className="mb-8">
            <View className="flex-row items-center mb-1">
              <Text
                style={{ fontFamily: "HankenGrotesk_600SemiBold" }}
                className="text-base font-semibold"
              >
                Your Blink Tag
              </Text>
              <Text
                style={{ fontFamily: "HankenGrotesk_600SemiBold" }}
                className="text-red-500 ml-1"
              >
                *
              </Text>
            </View>
            <Text
              style={{ fontFamily: "HankenGrotesk_600SemiBold" }}
              className="text-gray-600 text-sm mb-3"
            >
              Feel free to use any name of your choice
            </Text>
            <TextInput
              className="w-full bg-gray-50 rounded-lg px-4 py-3 text-base"
              style={{ fontFamily: "HankenGrotesk_600SemiBold" }}
              value={blinkTag}
              onChangeText={(text) => {
                setBlinkTag(text);
                checkAvailability(text);
              }}
              placeholder="Lasman Ade"
              placeholderTextColor="#999999"
            />
            {blinkTag.length > 0 && (
              <View
                className={`flex-row items-center mt-2 ${
                  isAvailable ? "bg-green-100" : "bg-red-100"
                } rounded-full px-3 py-1 self-start`}
              >
                <Text
                  style={{ fontFamily: "HankenGrotesk_600SemiBold" }}
                  className={`text-sm ${
                    isAvailable ? "text-green-700" : "text-red-700"
                  }`}
                >
                  @{blinkTag.toLowerCase().replace(/\s/g, "-")}{" "}
                  {isAvailable ? "is available" : "is not available"}
                </Text>
              </View>
            )}
          </View>

          {/* Bio Input */}
          <View className="mb-8">
            <Text
              style={{ fontFamily: "HankenGrotesk_600SemiBold" }}
              className="text-base font-semibold mb-1"
            >
              Your Bio
            </Text>
            <Text
              style={{ fontFamily: "HankenGrotesk_600SemiBold" }}
              className="text-gray-600 text-sm mb-3"
            >
              Write a short intro about yourself. Not less than 250 characters
            </Text>

            <Controller
              name="bio"
              control={control}
              rules={{
                required: "Bio is required",
                minLength: {
                  value: 250,
                  message: "Bio must be at least 250 characters",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  className="w-full bg-gray-50 rounded-lg px-4 py-3 text-base min-h-[150px]"
                  style={{ fontFamily: "HankenGrotesk_600SemiBold" }}
                  value={value}
                  onChangeText={onChange}
                  placeholder="Write something about yourself..."
                  placeholderTextColor="#999999"
                  multiline
                  textAlignVertical="top"
                />
              )}
            />

            {/* Character Counter */}
            <Text className="text-gray-500 mt-2 text-sm">
              {bio.trim().length < 250 && `${remaining} more characters to go`}
            </Text>

            {errors.bio && (
              <Text className="text-red-600 mt-2 text-sm">
                {errors.bio.message}
              </Text>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Button */}
      <View className="absolute bottom-0 bg-white left-0 right-0">
        <View className="w-[90%] self-center py-4">
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            className={`py-4 rounded-xl items-center ${
              isFormValid ? "bg-[#0066CC]" : "bg-gray-300"
            }`}
            disabled={!isFormValid}
            accessibilityLabel="Save profile details"
          >
            <Text
              className={`font-semibold text-base ${
                isFormValid ? "text-white" : "text-gray-400"
              }`}
              style={{ fontFamily: "HankenGrotesk_600SemiBold" }}
            >
              {isFormValid
                ? "Save"
                : bio.trim().length < 250
                  ? "Keep writing..."
                  : "Fill in your Blink Tag"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
