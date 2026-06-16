import { SolidMainButton } from "@/components/Btns";
import { Headers } from "@/components/Headers";
import { useListings, useStorefront } from "@/services";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, RefreshControl, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown, FadeOutDown, LinearTransition } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LeaseCloset() {
  const { data: products, isLoading, refetch } = useListings({ userId: "u1" });
  const { data: store } = useStorefront();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const handleRedirectItem = (item: any) => {
    router.push({
      pathname: "/(access)/(stacks)/account/list-item/[id]",
      params: { id: item.id, itemData: JSON.stringify(item) },
    });
  };

  const myListings = products || [];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <View className="mt-6 mb-6 px-6">
        <Headers text="Lease Closet" onPress={() => router.back()} />
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={{ gap: 35, paddingBottom: 30 }}
      >
        {/* Storefront Card */}
        <Animated.View
          layout={LinearTransition.springify().damping(15).stiffness(90)}
          entering={FadeInDown.duration(600).springify()}
          exiting={FadeOutDown.duration(200)}
          className="bg-[#F1F8FF] mx-6 px-6 py-6 rounded-2xl overflow-hidden mt-6 shadow"
          style={{ gap: 15 }}
        >
          <View className="flex-row items-center gap-4">
            <MaterialIcons name="storefront" size={26} color="#61ADFA" />
            <Text className="text-[17px]" style={{ color: "#0066CC", fontFamily: "HankenGrotesk_500Medium" }}>
              {store ? store.storeName : "Your Storefront"}
            </Text>
          </View>
          <Text className="text-[13px]" style={{ color: "#000000", fontFamily: "HankenGrotesk_500Medium" }}>
            {store
              ? "Manage your store, view analytics, and edit your listings."
              : "Showcase your items with a personalized storefront. Set up once, sell to many!"}
          </Text>
          <View className="mt-2 w-full">
            {store ? (
              <SolidMainButton text="View Store" onPress={() => router.push("/(access)/(stacks)/account/store" as any)} />
            ) : (
              <SolidMainButton text="Create Storefront" onPress={() => router.push("/(access)/(stacks)/account/storefront-setup")} />
            )}
          </View>
        </Animated.View>

        {/* Divider */}
        <View className="w-full h-[1px] mt-4" style={{ backgroundColor: "#D9D9D9" }} />

        {/* My Listings */}
        <Animated.View layout={LinearTransition.springify()} className="px-6" style={{ gap: 20 }}>
          <View className="flex-row items-center gap-2">
            <Text className="text-[17px] font-bold" style={{ fontFamily: "HankenGrotesk_500Medium" }}>My Listings</Text>
            <View className="bg-[#0066CC] px-4 py-1 rounded-3xl">
              <Text className="text-[13px]" style={{ color: "#fff", fontFamily: "HankenGrotesk_500Medium" }}>{myListings.length}</Text>
            </View>
          </View>

          {isLoading ? (
            <View className="items-center py-8">
              <Text className="text-[13px] text-gray-400">Loading...</Text>
            </View>
          ) : myListings.length === 0 ? (
            <View className="items-center py-12">
              <MaterialIcons name="inventory" size={72} color="#d1d1d1" />
              <Text className="text-[15px] text-gray-700 mt-4 font-bold" style={{ fontFamily: "HankenGrotesk_700Bold" }}>No listings yet</Text>
              <Text className="text-[13px] text-gray-500 mt-2 text-center px-10">You haven't listed any items yet.</Text>
              <View className="w-full px-6 mt-8">
                <SolidMainButton text="Create your first listing" onPress={() => {
                  // TODO: Navigate to create listing flow
                }} />
              </View>
            </View>
          ) : (
            <View style={{ gap: 20, marginTop: 8 }}>
              {myListings.map((item: any, index: number) => (
                <Animated.View
                  key={item.id}
                  layout={LinearTransition.springify().damping(15).stiffness(90)}
                  entering={FadeInDown.duration(600).delay(200 + index * 50).springify()}
                  exiting={FadeOutDown.duration(200)}
                  className="flex-row items-center gap-4 bg-white rounded-xl border border-gray-100 overflow-hidden p-6 shadow"
                >
                  <View className="w-[120px] rounded-2xl overflow-hidden">
                    <Image source={{ uri: item.image }} className="w-full h-[160px] rounded-2xl" resizeMode="cover" />
                  </View>
                  <View className="flex-1 flex-col gap-2">
                    <View className="self-end rounded-lg px-4 py-2" style={{ backgroundColor: item.tag === "SALE" || item.tag === "ACTIVE" ? "#00AA44" : "#D9D9D9" }}>
                      <Text className="text-[12px] text-white capitalize" style={{ fontFamily: "HankenGrotesk_500Medium" }}>{item.tag}</Text>
                    </View>
                    <View style={{ gap: 8 }}>
                      <View>
                        <Text className="text-[15px] font-bold" numberOfLines={1} ellipsizeMode="tail" style={{ fontFamily: "HankenGrotesk_500Medium" }}>{item.title}</Text>
                        <View className="flex-row items-center gap-2 mt-1">
                          <Text className="text-[13px] text-[#6C757D]" style={{ fontFamily: "HankenGrotesk_500Medium" }}>Price:</Text>
                          <Text className="text-[15px] font-bold text-[#0066CC]" style={{ fontFamily: "HankenGrotesk_500Medium" }}>₦{item.price?.toLocaleString()}</Text>
                        </View>
                      </View>
                      <View className="flex-row gap-2 mt-4">
                        <TouchableOpacity
                          className="flex-1 items-center justify-center bg-white border-[1.5px] border-[#0066CC] py-2.5 px-1 rounded-xl"
                          onPress={() => handleRedirectItem(item)}
                        >
                          <Text className="text-[12px] font-bold text-center text-[#0066CC]" style={{ fontFamily: "HankenGrotesk_500Medium" }}>Edit Listing</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          className="flex-1 items-center justify-center bg-[#0066CC] py-2.5 px-1 rounded-xl border-[1.5px] border-[#0066CC]"
                          onPress={() => handleRedirectItem(item)}
                        >
                          <Text className="text-[12px] font-bold text-center text-white" style={{ fontFamily: "HankenGrotesk_500Medium" }}>View Details</Text>
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
}
