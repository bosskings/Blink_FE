import { SolidMainButton } from "@/components/Btns";
import { useListing } from "@/services";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import * as WebBrowser from "expo-web-browser";

const { width } = Dimensions.get("window");

const Item = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showTransactModal, setShowTransactModal] = useState(false);
  const [showSellerModal, setShowSellerModal] = useState(false);
  const [showMessageEveryTime, setShowMessageEveryTime] = useState(true);
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
        rawPrice: apiListing.price,
        images: apiListing.images ?? [],
        image: apiListing.images?.[0] ?? "",
        tag: apiListing.tag ?? apiListing.status,
        condition: apiListing.condition ?? "",
        category: apiListing.category ?? "",
        distance: apiListing.distance ?? "",
        timePosted: apiListing.timePosted ?? "",
        isPromoted: apiListing.isPromoted ?? false,
        seller: apiListing.seller,
      }
    : parsedItemData;

  const [isLoading, setIsLoading] = useState(false);

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

  const startPaymentPolling = (reference: string) => {
    const secretKey =
      process.env.EXPO_PUBLIC_PAYSTACK_SECRET_KEY ||
      "sk_test_f30e551839c13efb23cb7599fd444935cf70aee4";

    const intervalId = setInterval(async () => {
      try {
        const response = await fetch(
          `https://api.paystack.co/transaction/verify/${reference}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${secretKey}`,
            },
          },
        );

        const data = await response.json();
        if (data.status && data.data.status === "success") {
          clearInterval(intervalId);
          WebBrowser.dismissBrowser();
          router.push("/(access)/(stacks)/success/payment-success");
        }
      } catch (error) {
        console.error("Verification polling error:", error);
      }
    }, 3000);

    // Stop polling after 5 minutes
    setTimeout(() => {
      clearInterval(intervalId);
    }, 300000);
  };

  const initializePayment = async () => {
    try {
      setIsLoading(true);
      const secretKey =
        process.env.EXPO_PUBLIC_PAYSTACK_SECRET_KEY ||
        "sk_test_f30e551839c13efb23cb7599fd444935cf70aee4";

      const cleanPriceStr = eachItemData.price.replace(/[^\d]/g, "");
      const amountInKobo = parseInt(cleanPriceStr, 10) * 100 || 4500000;

      const response = await fetch(
        "https://api.paystack.co/transaction/initialize",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${secretKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: "customer@blink.com",
            amount: amountInKobo,
            callback_url: "https://standard.paystack.co/close",
          }),
        },
      );

      const data = await response.json();
      if (data.status && data.data.authorization_url) {
        const { authorization_url, reference } = data.data;
        setShowTransactModal(false);
        setIsLoading(false);

        startPaymentPolling(reference);
        await WebBrowser.openBrowserAsync(authorization_url);
      } else {
        alert("Failed to initialize payment. Please try again.");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("An error occurred during payment setup.");
      setIsLoading(false);
    }
  };

  const handleThumbnailPress = (index: number) => {
    setCurrentImageIndex(index);
    scrollViewRef.current?.scrollTo({ x: index * width, animated: true });
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

            <TouchableOpacity className="w-12 h-12 rounded-full bg-white/80 items-center justify-center">
              <Ionicons name="heart-outline" size={25} color="#374151" />
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
              <View className="bg-green-700 px-3 py-1 rounded-full">
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
              entering={FadeInDown.duration(400).springify()}
            >
              <Text className="text-[15px] font-bold " style={{}}>
                Details & Category
              </Text>
            </Animated.View>

            <Animated.View
              entering={FadeInDown.duration(400).springify()}
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
              entering={FadeInDown.duration(400).springify()}
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
      <View className="absolute bottom-0 left-0 right-0 py-8 pt-6  bg-white border-t border-gray-100 px-6">
        <Text className="text-[15px] font-bold mb-5" style={{}}>
          Seller Information
        </Text>

        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <View className="relative">
              <Image
                source={eachItemData.seller?.avatar ? { uri: eachItemData.seller.avatar } : require("../../../../assets/avatars/avatar1.webp")}
                style={{ width: 40, height: 40 }}
                className="rounded-full"
              />
              <View className="absolute bottom-0 right-0 w-3 h-3 bg-green-700 rounded-full border-2 border-white" />
            </View>

            <View>
              <Text className="text-sm font-semibold mb-1" style={{}}>
                {`${eachItemData.seller?.firstName ?? ""} ${eachItemData.seller?.lastName ?? ""}`.trim() || "Seller"}
              </Text>
              <View className="flex-row items-center gap-1">
                <Ionicons name="star" size={10} color="#FBBF24" />
                <Text className="text-xs" style={{}}>
                  4.8
                </Text>
                <Text className="text-gray-500 text-sm">·</Text>
                <Text className="text-gray-500 text-xs" style={{}}>
                  23 reviews
                </Text>
              </View>
            </View>
          </View>

          <View className="flex-row gap-2">
            <TouchableOpacity
              className="w-14 rounded-lg bg-gray-100 items-center justify-center"
              onPress={() => setShowSellerModal(true)}
            >
              <Ionicons name="eye" size={18} color="#374151" />
            </TouchableOpacity>

            <TouchableOpacity
              className="rounded-lg bg-[#0066CC] flex-row gap-2 p-3 px-6 items-center justify-center"
              onPress={() => setShowTransactModal(true)}
            >
              <Text className="text-sm text-white" style={{}}>
                Transact
              </Text>
              <Ionicons name="card-outline" size={15} color="#61ADFA" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Transaction Modal */}
      <Modal
        visible={showTransactModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowTransactModal(false)}
      >
        <View className="flex-1 bg-black/50 justify-center items-center px-5">
          <View className="bg-white rounded-3xl w-full max-w-[98%] overflow-hidden">
            <View className="p-6 pb-8">
              <View>
                <Text
                  className="text-2xl font-bold text-[#0066CC] mb-2"
                  style={{}}
                >
                  How Purchases{"\n"}Work on Blink
                </Text>
                <TouchableOpacity
                  className="absolute top-0 right-0"
                  onPress={() => setShowTransactModal(false)}
                >
                  <Ionicons
                    name="close-circle"
                    size={22}
                    color="#9CA3AF"
                    className="absolute top-0 right-0"
                    onPress={() => setShowTransactModal(false)}
                  />
                </TouchableOpacity>
              </View>

              <Text className="text-sm text-gray-700 mb-6" style={{}}>
                Here is what happens when you{"\n"}make a purchase
              </Text>

              <View className="space-y-5">
                {/* Payment Security */}
                <View className="flex-row gap-3">
                  <View className="w-6 h-6 rounded-full bg-[#0066CC]/10 items-center justify-center mt-1">
                    <Ionicons
                      name="checkmark-circle"
                      size={18}
                      color="#0066CC"
                    />
                  </View>
                  <View className="flex-1">
                    <Text className="font-bold text-[15px] mb-1" style={{}}>
                      Payment Security:
                    </Text>
                    <Text
                      className="text-sm text-gray-600 leading-5"
                      style={{}}
                    >
                      Your money is safely held in escrow until the transaction
                      is completed.
                    </Text>
                  </View>
                </View>

                {/* Pickup Code */}
                <View className="flex-row gap-3 mt-3">
                  <View className="w-6 h-6 rounded-full bg-[#0066CC]/10 items-center justify-center mt-1">
                    <Ionicons
                      name="checkmark-circle"
                      size={18}
                      color="#0066CC"
                    />
                  </View>
                  <View className="flex-1">
                    <Text className="font-bold text-[15px] mb-1" style={{}}>
                      Pickup Code:
                    </Text>
                    <Text
                      className="text-sm text-gray-600 leading-5"
                      style={{}}
                    >
                      {
                        "You'll receive a unique pickup code once your order is ready."
                      }
                    </Text>
                  </View>
                </View>

                {/* Verification */}
                <View className="flex-row gap-3 mt-3">
                  <View className="w-6 h-6 rounded-full bg-[#0066CC]/10 items-center justify-center mt-1">
                    <Ionicons
                      name="checkmark-circle"
                      size={18}
                      color="#0066CC"
                    />
                  </View>
                  <View className="flex-1">
                    <Text className="font-bold text-[15px] mb-1" style={{}}>
                      Verification:
                    </Text>
                    <Text
                      className="text-sm text-gray-600 leading-5"
                      style={{}}
                    >
                      {
                        "Present or enter your pickup code to confirm you've received the item."
                      }
                    </Text>
                  </View>
                </View>

                {/* Release of Funds */}
                <View className="flex-row gap-3 mt-3">
                  <View className="w-6 h-6 rounded-full bg-[#0066CC]/10 items-center justify-center mt-1">
                    <Ionicons
                      name="checkmark-circle"
                      size={18}
                      color="#0066CC"
                    />
                  </View>
                  <View className="flex-1">
                    <Text className="font-bold text-[15px] mb-1" style={{}}>
                      Release of Funds:
                    </Text>
                    <Text
                      className="text-sm text-gray-600 leading-5"
                      style={{}}
                    >
                      After confirmation, the payment is released to the seller
                    </Text>
                  </View>
                </View>
              </View>

              <View className="mt-4">
                <SolidMainButton
                  text={isLoading ? "Initializing..." : "Proceed"}
                  onPress={initializePayment}
                  disabled={isLoading}
                />
              </View>

              {/* Checkbox */}
              <TouchableOpacity
                className="flex-row items-center justify-center gap-2 mt-4"
                onPress={() => setShowMessageEveryTime(!showMessageEveryTime)}
              >
                <View
                  className={`w-4 h-4 border-2 rounded ${showMessageEveryTime ? "border-gray-300" : "border-[#0066CC] bg-[#0066CC]"} items-center justify-center`}
                >
                  {!showMessageEveryTime && (
                    <Ionicons name="checkmark" size={14} color="white" />
                  )}
                </View>
                <Text className="text-xs text-gray-600" style={{}}>
                  Show this message every time
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Seller Details Modal */}
      <Modal
        visible={showSellerModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowSellerModal(false)}
      >
        <View className="flex-1 bg-black/50 justify-center items-center px-5">
          <View className="bg-white rounded-3xl w-full max-w-md overflow-hidden">
            <View className="p-6">
              {/* Header */}
              <View className="flex-row justify-between items-center mb-6">
                <Text className="text-xl font-bold" style={{}}>
                  Seller Details
                </Text>
                <TouchableOpacity onPress={() => setShowSellerModal(false)}>
                  <Ionicons name="close-circle" size={22} color="#9CA3AF" />
                </TouchableOpacity>
              </View>

              {/* Seller Profile */}
              <View className="items-center mb-6">
                <View className="relative mb-3">
                  <Image
                    source={eachItemData.seller?.avatar ? { uri: eachItemData.seller.avatar } : require("../../../../assets/avatars/avatar1.webp")}
                    style={{ width: 80, height: 80 }}
                    className="rounded-full"
                  />
                  <View className="absolute bottom-1 right-1 w-5 h-5 bg-green-700 rounded-full border-4 border-white" />
                </View>

                <Text className="text-lg font-bold mb-1" style={{}}>
                  {`${eachItemData.seller?.firstName ?? ""} ${eachItemData.seller?.lastName ?? ""}`.trim() || "Seller"}
                </Text>
                <View className="flex-row items-center gap-1 mb-2">
                  <Ionicons name="star" size={14} color="#FBBF24" />
                  <Text className="text-[15px] font-semibold" style={{}}>
                    4.8
                  </Text>
                  <Text className="text-gray-500 text-sm">·</Text>
                  <Text className="text-gray-500 text-sm" style={{}}>
                    23 reviews
                  </Text>
                </View>
                <Text className="text-gray-500 text-sm" style={{}}>
                  Member since 2022
                </Text>
              </View>

              {/* Stats */}
              <View className="flex-row justify-around mb-6 bg-gray-50 rounded-xl py-4">
                <View className="items-center">
                  <Text className="text-xl font-bold mb-1" style={{}}>
                    156
                  </Text>
                  <Text className="text-xs text-gray-500" style={{}}>
                    Items Sold
                  </Text>
                </View>
                <View className="items-center">
                  <Text className="text-xl font-bold mb-1" style={{}}>
                    98%
                  </Text>
                  <Text className="text-xs text-gray-500" style={{}}>
                    Response Rate
                  </Text>
                </View>
                <View className="items-center">
                  <Text className="text-xl font-bold mb-1" style={{}}>
                    2.5km
                  </Text>
                  <Text className="text-xs text-gray-500" style={{}}>
                    Distance
                  </Text>
                </View>
              </View>

              {/* About */}
              <View className="mb-6">
                <Text className="font-bold text-sm mb-2" style={{}}>
                  About
                </Text>
                <Text className="text-gray-600 text-sm leading-5" style={{}}>
                  Trusted seller with a passion for quality items. Fast
                  responses and reliable transactions. All items carefully
                  inspected before listing.
                </Text>
              </View>

              {/* Action Buttons */}
              <View className="">
                <SolidMainButton text="Message" onPress={() => router.push('/(access)/(stacks)/chat-flow/chat/new-chat')} />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Item;
