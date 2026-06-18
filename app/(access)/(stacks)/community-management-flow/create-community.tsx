import { Headers } from "@/components/Headers";
import { SolidMainButton } from "@/components/Btns";
import LoadingOverlay from "@/components/LoadingOverlay";
import { useCreateCommunity } from "@/services";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { CustomAlert } from "@/components/CustomAlert";
import RNPickerSelect from "react-native-picker-select";
import { SafeAreaView } from "react-native-safe-area-context";

const CreateCommunity = () => {
  const [communityName, setCommunityName] = useState("");
  const [communityDescription, setCommunityDescription] = useState("");
  const [requireVerification, setRequireVerification] = useState(true);
  const [enableModeratorRules, setEnableModeratorRules] = useState(false);
  const [minimumVerificationLevel, setMinimumVerificationLevel] = useState("");
  const [currentLocation, setCurrentLocation] =
    useState<string>("000, 0000 State");
  const [, setLocation] = useState<Location.LocationObject | null>(null);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertConfig, setAlertConfig] = useState({ title: "", message: "", navigateBack: false });
  const createMutation = useCreateCommunity();

  const showAlert = (title: string, message: string, navigateBack = false) => {
    setAlertConfig({ title, message, navigateBack });
    setAlertVisible(true);
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;

      let locationData = await Location.getCurrentPositionAsync({});
      setLocation(locationData);

      try {
        const reverseGeocode = await Location.reverseGeocodeAsync({
          latitude: locationData.coords.latitude,
          longitude: locationData.coords.longitude,
        });
        if (reverseGeocode.length > 0) {
          const address = reverseGeocode[0];
          setCurrentLocation(
            `${address.streetNumber || ""} ${address.street || ""}, ${address.city || ""} ${address.region || ""}`,
          );
        }
      } catch (error) {
        console.log("Error reverse geocoding:", error);
      }
    })();
  }, []);

  const verificationLevels = [
    { label: "Bronze", value: "bronze" },
    { label: "Silver", value: "silver" },
    { label: "Gold", value: "gold" },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <LoadingOverlay visible={createMutation.isPending} />

      <View className="mt-6 mb-6 px-6">
        <Headers text="Create/Manage Community" onPress={() => router.back()} />
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Map Section */}
        <View className="px-6 mb-6">
          <View className="relative w-full h-72 rounded-xl overflow-hidden mb-4">
            <Image
              source={{ uri: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=600&fit=crop" }}
              className="w-full h-full"
              resizeMode="cover"
            />
            <View className="flex-col gap-3 absolute bottom-0 left-0 right-0 px-6 py-4 bg-white/50 z-10">
              <View className="w-full justify-center items-center">
                <Text className="text-[15px] text-[#000000]">
                  Current Location: {currentLocation}
                </Text>
              </View>
              <TouchableOpacity className="flex-1 bg-[#0066CC] py-3 px-4 rounded-xl items-center">
                <Text className="text-white text-[14px]">Draw New Geofence</Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 bg-white border-2 border-[#0066CC] py-3 px-4 rounded-xl items-center">
                <Text className="text-[#0066CC] text-[14px]">Confirm Boundary</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Community Details Section */}
        <View className="bg-white mx-6 px-6 py-6 rounded-2xl border border-gray-100 shadow mb-4">
          <Text className="text-[15px] text-black mb-2">Community Name</Text>
          <TextInput
            placeholder="e.g. Created Community"
            placeholderTextColor="#AFAFAF"
            value={communityName}
            onChangeText={setCommunityName}
            className="bg-[#F6F6F6] rounded-lg px-4 py-4 mb-4"
            style={{ color: "#3A3541", fontSize: 13 }}
          />

          <Text className="text-[15px] text-black mb-2">Community Description</Text>
          <TextInput
            placeholder="Describe your community its purpose and rules"
            placeholderTextColor="#AFAFAF"
            value={communityDescription}
            onChangeText={setCommunityDescription}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            className="bg-[#F6F6F6] rounded-lg px-4 py-4 mb-4"
            style={{ color: "#3A3541", minHeight: 100, fontSize: 13 }}
          />

          <SolidMainButton
            text="Save Community"
            disabled={createMutation.isPending || !communityName.trim()}
            onPress={() => {
              createMutation.mutate(
                {
                  name: communityName.trim(),
                  description: communityDescription.trim() || undefined,
                  city: currentLocation,
                  type: requireVerification ? "PRIVATE" : "PUBLIC",
                },
                {
                  onSuccess: () => showAlert("Community Created", "Your new community has been successfully created.", true),
                  onError: (err) => showAlert("Error", err instanceof Error ? err.message : "Failed to create community."),
                },
              );
            }}
          />
        </View>

        {/* Admin Settings & Join Rules Section */}
        <View className="bg-white mx-6 px-6 py-6 rounded-2xl border border-gray-100 shadow mb-4">
          <Text className="text-[15px] text-black mb-4">
            Admin Settings & Join Rules
          </Text>

          {/* Require Verification Toggle */}
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-[14px] text-black flex-1">
              Require Verification to Join
            </Text>
            <Switch
              value={requireVerification}
              onValueChange={setRequireVerification}
              trackColor={{ false: "#D1D5DB", true: "#0066CC" }}
              thumbColor="#FFFFFF"
            />
          </View>

          {/* Enable Moderator Rules Toggle */}
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-[14px] text-black flex-1">
              Enable Moderator Rules
            </Text>
            <Switch
              value={enableModeratorRules}
              onValueChange={setEnableModeratorRules}
              trackColor={{ false: "#D1D5DB", true: "#0066CC" }}
              thumbColor="#FFFFFF"
            />
          </View>

          {/* Minimum Verification Level */}
          <Text className="text-[14px] text-black mb-2">
            Minimum Verification Level
          </Text>
          <View className="bg-[#F6F6F6] rounded-lg mb-4">
            <RNPickerSelect
              onValueChange={(value) => setMinimumVerificationLevel(value)}
              items={verificationLevels}
              placeholder={{ label: "Select", value: null }}
              value={minimumVerificationLevel}
              style={{
                inputIOS: {
                  fontSize: 12,
                  color: "#3A3541",
                  fontFamily: "HankenGrotesk_400Regular",
                },
                inputAndroid: {
                  fontSize: 12,
                  color: "#3A3541",
                  fontFamily: "HankenGrotesk_400Regular",
                },
                placeholder: {
                  color: "#AFAFAF",
                  fontSize: 12,
                  fontFamily: "HankenGrotesk_400Regular",
                },
                iconContainer: { top: 16, right: 16 },
                viewContainer: { paddingHorizontal: 10 },
              }}
              Icon={() => (
                <Ionicons name="chevron-down" size={18} color="#AFAFAF" />
              )}
            />
          </View>

          <SolidMainButton text="Update Setting" onPress={() => showAlert("Settings Updated", "Your community settings have been saved.")} />
        </View>
      </ScrollView>

      <CustomAlert
        visible={alertVisible}
        title={alertConfig.title}
        message={alertConfig.message}
        onClose={() => {
          setAlertVisible(false);
          if (alertConfig.navigateBack) {
            router.back();
          }
        }}
      />
    </SafeAreaView>
  );
};

export default CreateCommunity;
