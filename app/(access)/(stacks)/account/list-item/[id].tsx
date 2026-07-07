import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  FadeInDown,
  FadeInUp,
  FadeOutDown,
} from "react-native-reanimated";
import CountdownTimer from "../_components/CountdownTimer";
import { useListing } from "@/services";

const { width } = Dimensions.get("window");
const ListItem = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [expired, setExpired] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [returnedStatus, setReturnedStatus] = useState<"yes" | "no" | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  const { id, itemData } = useLocalSearchParams<{ id: string; itemData?: string }>();
  const { data: apiListing, isLoading: apiLoading } = useListing(id ?? "");

  const parsedItemData = itemData ? JSON.parse(itemData) : null;

  const eachItemData = apiListing
    ? {
        id: apiListing._id,
        title: apiListing.title,
        description: apiListing.description ?? "",
        price: `₦ ${apiListing.price?.toLocaleString()}`,
        images: apiListing.images ?? [],
        image: apiListing.images?.[0] ?? "",
        tag: apiListing.tag ?? apiListing.status,
        condition: apiListing.condition ?? "",
        category: apiListing.category ?? "",
        distance: apiListing.distance ?? "",
        timePosted: apiListing.timePosted ?? "",
      }
    : parsedItemData;

  if (apiLoading && !parsedItemData) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#FFFFFF" }}>
        <ActivityIndicator size="large" color="#0066CC" />
      </View>
    );
  }

  if (!eachItemData) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#FFFFFF" }}>
        <Text style={{ color: "#6B7280", fontSize: 15 }}>Item not found.</Text>
        <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 16 }}>
          <Text style={{ color: "#0066CC", fontWeight: "600" }}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleThumbnailPress = (index: number) => {
    setCurrentImageIndex(index);
    scrollViewRef.current?.scrollTo({ x: index * width, animated: true });
  };

  // onComplete from countdown
  const handleCountdownComplete = () => {
    setExpired(true);
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView className="flex-1">
        <View className="relative">
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={(e) => {
              const x = e.nativeEvent.contentOffset.x;
              setCurrentImageIndex(Math.round(x / width));
            }}
            scrollEventThrottle={16}
          >
            {eachItemData.images.map((img: any, idx: any) => (
              <View key={idx} style={{ width }}>
                <Image
                  source={{ uri: img }}
                  style={{ width, height: 380 }}
                  resizeMode="cover"
                />
              </View>
            ))}
          </ScrollView>

          {/* Top Icons */}
          <View className="absolute top-10 pt-5 left-4 right-4 flex-row justify-between">
            <TouchableOpacity
              className="w-12 h-12 rounded-full bg-white/80 items-center justify-center"
              onPress={() => router.back()}
            >
              <Ionicons name="arrow-back" size={25} color="#3A3541" />
            </TouchableOpacity>

            <TouchableOpacity
              className="w-12 h-12 rounded-full bg-white/80 items-center justify-center"
              onPress={() => setIsLiked(!isLiked)}
            >
              <Ionicons name={isLiked ? "heart" : "heart-outline"} size={25} color={isLiked ? "#FF3333" : "#374151"} />
            </TouchableOpacity>
          </View>

          {/* Image Indicators */}
          <View className="absolute bottom-4 left-0 right-0 flex-row justify-center gap-2">
            {eachItemData.images.map((_: any, idx: number) => (
              <View
                key={idx}
                className={`w-2 h-2 rounded-full ${
                  idx === currentImageIndex ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </View>

          {/* Thumbnail Images */}
          <Animated.View
            entering={FadeInDown.duration(600).springify()}
            className="absolute m-auto bottom-2 left-0 right-0 justify-center flex-row gap-2"
          >
            {eachItemData.images.map((img: any, idx: number) => (
              <TouchableOpacity
                key={idx}
                onPress={() => handleThumbnailPress(idx)}
                className={`border rounded-md overflow-hidden  ${
                  idx === currentImageIndex
                    ? "border-gray-300"
                    : "border-gray-300/50"
                }`}
              >
                <Image
                  source={{ uri: img }}
                  style={{ width: 60, height: 50 }}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ))}
          </Animated.View>
        </View>

        {/* Content */}
        <View className="p-4 px-6 pb-32">
          <Animated.View
            entering={FadeInDown.duration(600).delay(200).springify()}
          >
            <View className="flex-row items-center justify-between mb-2">
              <View
                className="px-3 py-1 rounded-full"
                style={{
                  backgroundColor:
                    eachItemData.tag === "Active" ||
                    eachItemData.tag === "ACTIVE"
                      ? "#00AA44"
                      : "#D9D9D9",
                }}
              >
                <Text className="text-white text-xs font-semibold" style={{}}>
                  {eachItemData.tag}
                </Text>
              </View>
              <Text className="text-xl font-bold text-[#0066CC]" style={{}}>
                {eachItemData.price}
              </Text>
            </View>

            {/* Title */}
            <Text className="text-xl font-bold mb-2" style={{}}>
              {eachItemData.title}
            </Text>

            {/* Description */}
            <Text className="text-gray-600 text-sm mb-4 leading-5" style={{}}>
              {eachItemData.description}
            </Text>

            {/* Posted Info */}
            <View className="flex-row items-center gap-4 mb-6">
              <View className="flex-row items-center gap-1">
                <Text className="text-gray-500 text-sm">🕐</Text>
                <Text className="text-gray-500 text-sm" style={{}}>
                  Posted {eachItemData.timePosted}
                </Text>
              </View>
              <View className="flex-row items-center gap-1">
                <Text className="text-gray-500 text-sm">📍</Text>
                <Text className="text-gray-500 text-sm" style={{}}>
                  {eachItemData.distance}
                </Text>
              </View>
            </View>
          </Animated.View>

          {/* Details Section */}
          <View className="mb-14 mt-5">
            <Animated.View
              className="mb-4"
              entering={FadeInDown.duration(600).delay(400).springify()}
            >
              <Text className="text-[15px] font-bold " style={{}}>
                Details & Category
              </Text>
            </Animated.View>

            <Animated.View
              entering={FadeInDown.duration(600).delay(600).springify()}
              className="flex-row mb-2"
            >
              <View className="flex-1 bg-gray-100 p-4 rounded-lg mr-2">
                <Text className="text-gray-500 text-xs mb-1" style={{}}>
                  BRAND
                </Text>
                <Text className="text-[15px] font-semibold" style={{}}>
                  Trek
                </Text>
              </View>
              <View className="flex-1 bg-gray-100 p-4 rounded-lg mr-2">
                <Text className="text-gray-500 text-xs mb-1" style={{}}>
                  FRAME SIZE
                </Text>
                <Text className="text-[15px] font-semibold" style={{}}>
                  54 CM
                </Text>
              </View>
            </Animated.View>

            <Animated.View
              entering={FadeInDown.duration(600).delay(800).springify()}
              className="flex-row mb-2"
            >
              <View className="flex-1 bg-gray-100 p-4 rounded-lg mr-2">
                <Text className="text-gray-500 text-xs mb-1" style={{}}>
                  Category
                </Text>
                <Text className="text-[15px] font-semibold" style={{}}>
                  Sports
                </Text>
              </View>
              <View className="flex-1 bg-gray-100 p-4 rounded-lg mr-2">
                <Text className="text-gray-500 text-xs mb-1" style={{}}>
                  Condition
                </Text>
                <Text className="text-[15px] font-semibold" style={{}}>
                  New
                </Text>
              </View>
            </Animated.View>

            <Animated.View
              entering={FadeInDown.duration(600).delay(1000).springify()}
              className="flex-row"
            >
              <View className="flex-1 bg-gray-100 p-4 rounded-lg mr-2">
                <Text className="text-gray-500 text-xs mb-1" style={{}}>
                  YEAR
                </Text>
                <Text className="text-[15px] font-semibold" style={{}}>
                  2018
                </Text>
              </View>
              <View className="flex-1 bg-gray-100 p-4 rounded-lg mr-2">
                <Text className="text-gray-500 text-xs mb-1" style={{}}>
                  Color
                </Text>
                <Text className="text-[15px] font-semibold" style={{}}>
                  Red
                </Text>
              </View>
            </Animated.View>
          </View>
        </View>
      </ScrollView>

      {/* Fixed Seller Information at Bottom */}
      <View className="absolute bottom-0 left-0 right-0">
        {/* while not expired -> show countdown panel */}
        {!expired ? (
          <Animated.View
            entering={FadeInUp.duration(300)}
            exiting={FadeOutDown.duration(200)}
            className="bg-white border-t border-gray-100 px-6 py-4"
          >
            <View className="items-center">
              {/* Countdown centered like screenshot */}
              <CountdownTimer
                endsAt={
                  eachItemData.expiresAt ?? Date.now() + 1000 * 60 * 60 * 2
                }
                onComplete={handleCountdownComplete}
              />
            </View>
          </Animated.View>
        ) : (
          // after expiry -> slide up returned UI
          <Animated.View
            entering={FadeInUp.duration(300)}
            exiting={FadeOutDown.duration(200)}
            className="bg-white border-t border-gray-100 px-6 py-4"
          >
            <View className="flex-row items-center justify-between">
              <Text className="text-[15px]" style={{}}>
                Item Returned?
              </Text>

              <View className="flex-row items-center gap-4">
                <TouchableOpacity
                  className={`px-6 py-3 bg-white border-2 rounded-lg ${
                    returnedStatus === "yes" ? "border-[#0066CC]" : "border-gray-200"
                  }`}
                  onPress={() => setReturnedStatus("yes")}
                >
                  <Text
                    style={{
                      color: returnedStatus === "yes" ? "#0066CC" : "#374151",
                      fontFamily: "HankenGrotesk_500Medium"
                    }}
                  >
                    Yes
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className={`px-6 py-3 bg-white border-2 rounded-lg ${
                    returnedStatus === "no" ? "border-[#FF3333]" : "border-gray-200"
                  }`}
                  onPress={() => setReturnedStatus("no")}
                >
                  <Text
                    style={{
                      color: returnedStatus === "no" ? "#FF3333" : "#374151",
                      fontFamily: "HankenGrotesk_500Medium"
                    }}
                  >
                    No
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        )}
      </View>
    </View>
  );
};

export default ListItem;
