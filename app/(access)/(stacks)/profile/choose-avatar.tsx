import { Headers } from "@/components/Headers";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Asset } from "expo-asset";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileSetup() {
  const [avatars, setAvatars] = useState([
    { id: 1, uri: require("../../../../assets/avatars/avatar1.png") },
    { id: 2, uri: require("../../../../assets/avatars/avatar2.png") },
    { id: 3, uri: require("../../../../assets/avatars/avatar3.png") },
    { id: 4, uri: require("../../../../assets/avatars/avatar2.png") },
    { id: 5, uri: require("../../../../assets/avatars/avatar1.png") },
    { id: 6, uri: require("../../../../assets/avatars/avatar3.png") },
  ]);

  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  // 🌀 shimmer effect animation
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // 🕒 simulate short load delay
  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timeout);
  }, []);

  // ✅ handle proceed and send file
  const handleProceed = async () => {
    if (!customImage && selectedAvatar === null) {
      alert("Please select or upload an image first!");
      return;
    }

    const selected = customImage
      ? { uri: customImage }
      : avatars[selectedAvatar!];

    let imageUri = selected.uri;

    // if it's a local asset (require() returns number)
    if (typeof imageUri !== "string") {
      const asset = Asset.fromModule(imageUri);
      await asset.downloadAsync();
      imageUri = asset.localUri;
    }

    // ✅ prepare FormData
    const formData = new FormData();
    formData.append("avatar", {
      uri: imageUri,
      type: "image/png",
      name: "avatar.png",
    } as any);

    console.log("✅ Uploaded:", formData);

    // proceed to next page
    router.push("/(access)/(stacks)/profile/profile-details");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView
        className="flex-1 px-6"
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Header */}
        <View className="mt-6 mb-6 flex-row items-center justify-between">
          <Headers text="Verification Tier" onPress={() => router.back()} />
          <TouchableOpacity onPress={() => setLoading(true)}>
            <AntDesign name="reload" size={22} color="#0066FF" />
          </TouchableOpacity>
        </View>

        {/* Title */}
        <Text
          className="text-2xl font-bold text-center mb-8"
          style={{ fontFamily: "HankenGrotesk_700Bold" }}
        >
          Choose your avatar
        </Text>

        {/* Avatar Grid */}
        <View className="flex-row flex-wrap justify-center gap-4 mb-8">
          {loading
            ? Array.from({ length: avatars.length }).map((_, i) => (
                <Animated.View
                  key={i}
                  style={{
                    opacity: shimmerAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.4, 1],
                    }),
                  }}
                  className="w-[105px] h-[105px] rounded-full bg-gray-200"
                />
              ))
            : avatars.map((avatar, index) => (
                <TouchableOpacity
                  key={avatar.id}
                  onPress={() => {
                    setSelectedAvatar(index);
                    setCustomImage(null);
                  }}
                  activeOpacity={0.8}
                >
                  <View
                    className={`w-[105px] h-[105px] rounded-full items-center justify-center ${
                      selectedAvatar === index
                        ? "border-2 border-[#0066FF]"
                        : "border-2 border-transparent"
                    }`}
                  >
                    <Image
                      source={avatar.uri}
                      className="w-[95px] h-[95px] rounded-full"
                      onLoadEnd={() => setLoading(false)}
                    />
                  </View>
                </TouchableOpacity>
              ))}
        </View>

        {/* Divider */}
        <View className="flex-row items-center mb-8">
          <View className="flex-1 h-[1px] bg-gray-200" />
          <Text
            className="mx-4 text-gray-600"
            style={{ fontFamily: "HankenGrotesk_500Medium" }}
          >
            Or add your own photo
          </Text>
          <View className="flex-1 h-[1px] bg-gray-200" />
        </View>

        {/* Upload Photo */}
        <TouchableOpacity
          className="w-[150px] h-[150px] bg-[#F8F9FA] rounded-full border-2 border-dashed border-gray-300 items-center justify-center mx-auto mb-8"
          onPress={() => {}}
        >
          {customImage ? (
            <Image
              source={{ uri: customImage }}
              className="w-full h-full rounded-full"
            />
          ) : (
            <AntDesign name="plus" size={30} color="#d1d5db" />
          )}
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Button */}
      <View className="absolute bottom-0 bg-white left-0 right-0">
        <View className="w-[90%] self-center py-4">
          <TouchableOpacity
            className={`w-full py-4 rounded-lg items-center ${
              selectedAvatar !== null || customImage
                ? "bg-[#0066FF]"
                : "bg-gray-300"
            }`}
            onPress={handleProceed}
            disabled={!customImage && selectedAvatar === null}
          >
            <Text
              className={`font-semibold text-base ${
                selectedAvatar !== null || customImage
                  ? "text-white"
                  : "text-gray-400"
              }`}
              style={{ fontFamily: "HankenGrotesk_500Medium" }}
            >
              Proceed
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
