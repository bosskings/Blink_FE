import { Headers } from "@/components/Headers";
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
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      let locationData = await Location.getCurrentPositionAsync({});
      setLocation(locationData);

      // Reverse geocode to get address
      try {
        const reverseGeocode = await Location.reverseGeocodeAsync({
          latitude: locationData.coords.latitude,
          longitude: locationData.coords.longitude,
        });

        if (reverseGeocode.length > 0) {
          const address = reverseGeocode[0];
          setCurrentLocation(
            `${address.streetNumber || ""} ${address.street || ""}, ${address.city || ""} ${address.region || ""}`
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

      {/* Header */}
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
            {/* Map placeholder - using an image for now */}
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=600&fit=crop",
              }}
              className="w-full h-full"
              resizeMode="cover"
            />
            {/* Map Action Buttons */}
            <View className="flex-col gap-3 absolute bottom-0 left-0 right-0 px-6 py-4 bg-white/50 z-10">
              <View className="w-full justify-center items-center">
                {/* Current Location Text */}
                <Text
                  className="text-base text-[#000000]"
                  style={{ fontFamily: "HankenGrotesk_900Black" }}
                >
                  Current Location: {currentLocation}
                </Text>
              </View>
              <TouchableOpacity className="flex-1 bg-[#0066CC] py-3 px-4 rounded-xl items-center">
                <Text
                  className="text-white text-base"
                  style={{ fontFamily: "HankenGrotesk_700Bold" }}
                >
                  Draw New Geofence
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 bg-white border-2 border-[#0066CC] py-3 px-4 rounded-xl items-center">
                <Text
                  className="text-[#0066CC] text-base"
                  style={{ fontFamily: "HankenGrotesk_700Bold" }}
                >
                  Confirm Boundary
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Community Details Section */}
        <View className="bg-white mx-6 px-6 py-6 rounded-2xl border border-gray-100 overflow-hidden shadow mb-4">
          <Text
            className="text-base text-black mb-2"
            style={{ fontFamily: "HankenGrotesk_700Bold" }}
          >
            Community Name
          </Text>
          <TextInput
            placeholder="e.g. Created Community"
            placeholderTextColor="#AFAFAF"
            value={communityName}
            onChangeText={setCommunityName}
            className="bg-[#F6F6F6] rounded-lg px-4 py-4 mb-4"
            style={{
              fontFamily: "HankenGrotesk_400Regular",
              color: "#3A3541",
            }}
          />

          <Text
            className="text-base text-black mb-2"
            style={{ fontFamily: "HankenGrotesk_700Bold" }}
          >
            Community Description
          </Text>
          <TextInput
            placeholder="Describe your community its purpose and rules"
            placeholderTextColor="#AFAFAF"
            value={communityDescription}
            onChangeText={setCommunityDescription}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            className="bg-[#F6F6F6] rounded-lg px-4 py-4 mb-4"
            style={{
              fontFamily: "HankenGrotesk_400Regular",
              color: "#3A3541",
              minHeight: 100,
            }}
          />

          <TouchableOpacity className="bg-[#00AA44] py-4 px-4 rounded-lg items-center">
            <Text
              className="text-white text-base"
              style={{ fontFamily: "HankenGrotesk_700Bold" }}
            >
              Save Community
            </Text>
          </TouchableOpacity>
        </View>

        {/* Admin Settings & Join Rules Section */}
        <View className="bg-white mx-6 px-6 py-6 rounded-2xl border border-gray-100 overflow-hidden shadow mb-4">
          <Text
            className="text-base text-black mb-4"
            style={{ fontFamily: "HankenGrotesk_700Bold" }}
          >
            Admin Settings & Join Rules
          </Text>

          {/* Require Verification Toggle */}
          <View className="flex-row items-center justify-between mb-4">
            <Text
              className="text-base text-black flex-1"
              style={{ fontFamily: "HankenGrotesk_400Regular" }}
            >
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
            <Text
              className="text-base text-black flex-1"
              style={{ fontFamily: "HankenGrotesk_400Regular" }}
            >
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
          <Text
            className="text-base text-black mb-2"
            style={{ fontFamily: "HankenGrotesk_700Bold" }}
          >
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
                iconContainer: {
                  top: 16,
                  right: 16,
                },
                viewContainer: {
                  paddingHorizontal: 10,
                },
              }}
              Icon={() => (
                <Ionicons name="chevron-down" size={20} color="#AFAFAF" />
              )}
            />
          </View>

          <TouchableOpacity className="bg-[#00AA44] py-4 px-4 rounded-lg items-center">
            <Text
              className="text-white text-base"
              style={{ fontFamily: "HankenGrotesk_700Bold" }}
            >
              Update Setting
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateCommunity;
