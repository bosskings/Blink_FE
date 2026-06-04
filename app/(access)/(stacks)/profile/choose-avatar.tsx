import { SolidMainButton } from "@/components/Btns";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
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

export default function ProfileSetup() {
  const [avatars] = useState([
    {
      id: 1,
      uri: require("../../../../assets/avatars/avatar1.png"),
      bg: "#E0DBFF",
    }, // purple-ish
    {
      id: 2,
      uri: require("../../../../assets/avatars/avatar2.png"),
      bg: "#D4F0FC",
    }, // light blue
    {
      id: 3,
      uri: require("../../../../assets/avatars/avatar3.png"),
      bg: "#FFE5C3",
    }, // orange/peach
    {
      id: 4,
      uri: require("../../../../assets/avatars/avatar1.png"),
      bg: "#E0DBFF",
    }, // purple-ish
    {
      id: 5,
      uri: require("../../../../assets/avatars/avatar4.png"),
      bg: "#FFE5C3",
    }, // orange/peach
    {
      id: 6,
      uri: require("../../../../assets/avatars/avatar1.png"),
      bg: "#E0DBFF",
    }, // purple-ish
  ]);

  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);
  const [customImage, setCustomImage] = useState<string | null>(null);

  const handleProceed = async () => {
    if (selectedAvatar === null && !customImage) return;

    if (customImage) {
      await AsyncStorage.setItem("user_avatar", customImage);
    } else if (selectedAvatar !== null) {
      await AsyncStorage.setItem(
        "user_avatar",
        `avatar${avatars[selectedAvatar].id}`,
      );
    }

    router.push("/(access)/(stacks)/profile/profile-details");
  };

  const selectAvatar = (index: number) => {
    setSelectedAvatar(index);
    setCustomImage(null);
  };

  const handleCustomPhotoPress = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setCustomImage(result.assets[0].uri);
      setSelectedAvatar(null);
    }
  };

  const isProceedActive = selectedAvatar !== null || customImage !== null;

  return (
    <SafeAreaView style={styles.viewport}>
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

          <Text style={styles.headerTitle}>Profile Setup</Text>

          {/* Elongated Step Dots Progress Indicator */}
          <View style={styles.dotsRow}>
            <View style={styles.dotInactive} />
            <View style={styles.dotInactive} />
            <View style={styles.dotActive} />
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollStyle}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Main Title */}
          <Text style={styles.titleText}>Choose your avatar</Text>

          {/* Avatars Grid */}
          <View style={styles.gridContainer}>
            {avatars.map((avatar, index) => {
              const isSelected = selectedAvatar === index;
              return (
                <TouchableOpacity
                  key={avatar.id}
                  onPress={() => selectAvatar(index)}
                  activeOpacity={0.8}
                  style={[
                    styles.avatarOuterCircle,
                    { backgroundColor: avatar.bg },
                    isSelected && styles.avatarSelected,
                  ]}
                >
                  <Image source={avatar.uri} style={styles.avatarImage} />
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Styled Or Add Own Photo Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Or add your own photo</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Upload Custom Photo Dashed Box */}
          <TouchableOpacity
            onPress={handleCustomPhotoPress}
            activeOpacity={0.8}
            style={[
              styles.dashedCircle,
              customImage !== null && styles.dashedCircleActive,
            ]}
          >
            {customImage ? (
              <Image
                source={{ uri: customImage }}
                style={styles.customUploadedImage}
              />
            ) : (
              <Ionicons name="add" size={36} color="#9CA3AF" />
            )}
          </TouchableOpacity>
        </ScrollView>

        {/* Absolute Bottom Action Bar */}
        <View style={styles.bottomBar}>
          <SolidMainButton
            text="Proceed"
            onPress={handleProceed}
            disabled={!isProceedActive}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  viewport: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
    marginBottom: 32,
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
  scrollStyle: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 110,
    alignItems: "center",
  },
  titleText: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 26,
    color: "#000000",
    marginBottom: 36,
    textAlign: "center",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 12,
    marginBottom: 44,
    rowGap: 24,
  },
  avatarOuterCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "transparent",
  },
  avatarSelected: {
    borderColor: "#0066CC",
  },
  avatarImage: {
    width: 76,
    height: 76,
    borderRadius: 38,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 32,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  dividerText: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 12,
    color: "#111827",
    marginHorizontal: 16,
  },
  dashedCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 1.5,
    borderColor: "#D1D5DB",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
  },
  dashedCircleActive: {
    borderStyle: "solid",
    borderColor: "#0066CC",
    borderWidth: 2.5,
  },
  customUploadedImage: {
    width: 136,
    height: 136,
    borderRadius: 68,
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
