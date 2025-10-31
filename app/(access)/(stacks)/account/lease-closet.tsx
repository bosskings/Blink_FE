import { SolidMainButton } from "@/components/Btns";
import { Headers } from "@/components/Headers";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  RefreshControl,
  Animated as RNAnimated,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Animated, {
  FadeInRight,
  FadeOutRight,
  LinearTransition,
} from "react-native-reanimated";

import { SafeAreaView } from "react-native-safe-area-context";

/* -------------------------
   Demo data (keep or replace)
   ------------------------- */
const initialProducts = [
  {
    id: "1",
    title:
      "Road Bicycle - Perfect city & weekend adventures (lightweight frame)",
    price: "₦45,000",
    description:
      "Great condition road bicycle, perfect for city rides and weekend adventures. Recently serviced with new brake pads and chain. Includes helmet",
    timePosted: "2h ago",
    distance: "0.7km away",
    image:
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&h=600&fit=crop",
    tag: "Active",
    images: [
      "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800",
      "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=800",
      "https://images.unsplash.com/photo-1511994298241-608e28f14fde?w=800",
    ],
    expiresAt: Date.now() + 1000 * 10 * 10 * 1,
  },
  {
    id: "2",
    title: "Mountain Bike - Offroad ready",
    price: "₦65,000",
    description:
      "Off-road mountain bike, tough tires and recent tune-up. Good for trails and rough surfaces.",
    timePosted: "1d ago",
    distance: "1.8km away",
    image:
      "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=800&h=600&fit=crop",
    tag: "Leased",
    images: [
      "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=800",
      "https://images.unsplash.com/photo-1511994298241-608e28f14fde?w=800",
    ],
    expiresAt: new Date(Date.now() + 1000 * 10 * 10 * 1).toISOString(),
  },
];

/* -------------------------
   Skeleton item (shimmer)
   ------------------------- */
const SkeletonItem: React.FC<{ keyId: string | number }> = ({ keyId }) => {
  const opacity = useRef(new RNAnimated.Value(0.3)).current;

  useEffect(() => {
    const loop = RNAnimated.loop(
      RNAnimated.sequence([
        RNAnimated.timing(opacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        RNAnimated.timing(opacity, {
          toValue: 0.3,
          duration: 700,
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  return (
    <View
      key={keyId}
      style={{ flexDirection: "row", gap: 16, alignItems: "center" }}
      className="bg-white px-6 py-4 rounded-xl border border-gray-100 shadow"
    >
      <RNAnimated.View
        style={{ opacity }}
        className="w-[120px] h-[100px] bg-gray-200 rounded-2xl"
      />
      <RNAnimated.View style={{ opacity, flex: 1 }}>
        <RNAnimated.View
          style={{ opacity }}
          className="w-3/4 h-5 bg-gray-200 rounded mb-3"
        />
        <RNAnimated.View
          style={{ opacity }}
          className="w-1/3 h-4 bg-gray-200 rounded mb-6"
        />
        <RNAnimated.View
          style={{ opacity }}
          className="w-full h-9 bg-gray-200 rounded"
        />
      </RNAnimated.View>
    </View>
  );
};

/* -------------------------
   LeaseCloset screen
   ------------------------- */
const LeaseCloset: React.FC = () => {
  const [products, setProducts] = useState<typeof initialProducts>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // Simulate initial load with skeleton (staggered appearance)
  useEffect(() => {
    let timeouts: ReturnType<typeof setTimeout>[] = [];
    setLoading(true);
    setProducts([]);
    // small stagger for a nicer entrance
    initialProducts.forEach((p, i) => {
      const t = setTimeout(
        () => {
          setProducts((prev) => [...prev, p]);
          if (i === initialProducts.length - 1) setLoading(false);
        },
        220 * i + 400
      );
      timeouts.push(t);
    });

    return () => timeouts.forEach(clearTimeout);
  }, []);

  // Pull-to-refresh handler
  const onRefresh = () => {
    setRefreshing(true);
    setLoading(true);
    setProducts([]);
    // simulate network refresh
    setTimeout(() => {
      // could fetch new data here
      initialProducts.forEach((p, i) => {
        setTimeout(() => {
          setProducts((prev) => [...prev, p]);
          if (i === initialProducts.length - 1) {
            setLoading(false);
            setRefreshing(false);
          }
        }, 150 * i);
      });
    }, 600);
  };

  const handleRedirectItem = (item: any) => {
    router.push({
      pathname: "/(access)/(stacks)/account/list-item/[id]",
      params: { id: item.id, itemData: JSON.stringify(item) },
    });
  };

  // Empty-state UI
  if (!loading && products.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <StatusBar style="dark" />
        <View className="mt-6 mb-6 px-6">
          <Headers text="Lease Closet" onPress={() => router.back()} />
        </View>

        <ScrollView
          className="flex-1 px-6"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="items-center justify-center mt-28">
            <MaterialIcons name="inventory" size={72} color="#d1d1d1" />
            <Text
              className="text-lg text-gray-700 mt-4"
              style={{ fontFamily: "HankenGrotesk_700Bold" }}
            >
              No listings yet
            </Text>
            <Text
              className="text-gray-500 mt-2 text-center px-10"
              style={{ fontFamily: "HankenGrotesk_400Regular" }}
            >
              You haven&apos;t listed any items to lease. Create your first
              listing and showcase it on your storefront.
            </Text>

            <View className="w-full px-6 mt-8">
              <SolidMainButton
                text="Create your first listing"
                onPress={() => {
                  /* navigate to listing creation */
                }}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />

      {/* Header */}
      <View className="mt-6 mb-6 px-6">
        <Headers text="Lease Closet" onPress={() => router.back()} />
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ rowGap: 35, paddingBottom: 30 }}
      >
        {/* Create Storefront */}
        <Animated.View
          entering={FadeInRight.duration(400)}
          exiting={FadeOutRight.duration(250)}
          className="bg-[#F1F8FF] p-6 mx-6 rounded-xl"
          style={{ rowGap: 15 }}
        >
          <View className="flex-row items-center gap-4">
            <MaterialIcons name="storefront" size={26} color="#61ADFA" />
            <Text
              className="text-xl"
              style={{ fontFamily: "HankenGrotesk_700Bold", color: "#0066CC" }}
            >
              Your Storefront
            </Text>
          </View>
          <Text
            className="text-base"
            style={{ fontFamily: "HankenGrotesk_400Regular", color: "#000000" }}
          >
            Showcase your items with a personalized storefront. Set up once,
            sell to many!
          </Text>
          <View className="mt-2 w-full">
            <SolidMainButton
              text="Create Storefront"
              onPress={() => {
                /* navigate or open create storefront */
              }}
            />
          </View>
        </Animated.View>

        {/* Divider */}
        <View
          className="w-full h-[1px] mt-4"
          style={{ backgroundColor: "#D9D9D9" }}
        />

        {/* My Listings */}
        <Animated.View
          layout={LinearTransition.springify()}
          className="px-6"
          style={{ rowGap: 20 }}
        >
          <View className="flex-row items-center gap-2">
            <Text
              className="text-xl font-semibold"
              style={{ fontFamily: "HankenGrotesk_700Bold" }}
            >
              My Listings
            </Text>
            <View className="bg-[#0066CC] px-4 py-1 rounded-3xl">
              <Text
                className="text-sm"
                style={{ fontFamily: "HankenGrotesk_700Bold", color: "#fff" }}
              >
                {products.length}
              </Text>
            </View>
          </View>

          {/* Loading skeleton */}
          {loading ? (
            <View style={{ rowGap: 16, marginTop: 12 }}>
              {products.map((_, i) => (
                <SkeletonItem keyId={i} key={i} />
              ))}
            </View>
          ) : (
            <View style={{ rowGap: 20, marginTop: 8 }}>
              {products.map((item) => (
                <Animated.View
                  key={item.id}
                  layout={LinearTransition.springify()}
                  entering={FadeInRight.duration(450)}
                  exiting={FadeOutRight.duration(250)}
                  className="flex-row items-center gap-4 bg-white rounded-xl border border-gray-100 overflow-hidden p-6 shadow"
                >
                  <View className="w-[120px] rounded-2xl overflow-hidden">
                    <Image
                      source={{ uri: item.image }}
                      className="w-full h-[160px] rounded-2xl"
                      resizeMode="cover"
                    />
                  </View>

                  <View className="flex-1 flex-col gap-2">
                    <View
                      className="self-end rounded-lg px-4 py-2"
                      style={{
                        backgroundColor:
                          item.tag === "Active" || item.tag === "ACTIVE"
                            ? "#00AA44"
                            : "#D9D9D9",
                      }}
                    >
                      <Text
                        className="text-xs"
                        style={{
                          fontFamily: "HankenGrotesk_500Medium",
                          textTransform: "capitalize",
                          color: "#fff",
                        }}
                      >
                        {item.tag}
                      </Text>
                    </View>

                    <View style={{ rowGap: 8 }}>
                      <View>
                        <Text
                          className="text-xl"
                          numberOfLines={1}
                          ellipsizeMode="tail"
                          style={{
                            fontFamily: "HankenGrotesk_700Bold",
                          }}
                        >
                          {item.title}
                        </Text>

                        <View className="flex-row items-center gap-2 mt-1">
                          <Text
                            className="text-sm"
                            style={{
                              fontFamily: "HankenGrotesk_400Regular",
                              color: "#6C757D",
                            }}
                          >
                            Price:
                          </Text>
                          <Text
                            className="text-base"
                            style={{
                              fontFamily: "HankenGrotesk_600SemiBold",
                              color: "#0066CC",
                            }}
                          >
                            {item.price}
                          </Text>
                        </View>
                      </View>

                      <View className="flex-row gap-3 mt-4">
                        <TouchableOpacity
                          className="flex-1 items-center bg-white border-2 border-[#0066CC] py-3 rounded-xl"
                          onPress={() => handleRedirectItem(item)}
                        >
                          <Text
                            className="text-sm"
                            style={{
                              fontFamily: "HankenGrotesk_400Regular",
                              color: "#0066CC",
                            }}
                          >
                            Edit Listing
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          className="flex-1 items-center bg-[#0066CC] py-3 rounded-xl"
                          onPress={() => handleRedirectItem(item)}
                        >
                          <Text
                            className="text-sm"
                            style={{
                              fontFamily: "HankenGrotesk_400Regular",
                              color: "#fff",
                            }}
                          >
                            View Details
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </Animated.View>
              ))}
            </View>
          )}
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LeaseCloset;
