import { SolidMainButton, SolidGrayButton } from "@/components/Btns";
import { Headers } from "@/components/Headers";
import { useListings, useStorefront } from "@/services";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown, FadeOutDown, LinearTransition } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function StoreDashboard() {
  const { data: store, isLoading: storeLoading } = useStorefront();
  const { data: listings } = useListings();

  const storeListings = listings?.filter((l: any) => l.storeId === store?.id) || [];

  if (storeLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <StatusBar style="dark" />
        <View className="items-center justify-center flex-1">
          <Text className="text-[13px] text-gray-400">Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!store) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <StatusBar style="dark" />
        <View className="mt-6 mb-6 px-6">
          <Headers text="My Store" onPress={() => router.back()} />
        </View>
        <View className="flex-1 items-center justify-center px-6">
          <MaterialIcons name="storefront" size={72} color="#d1d1d1" />
          <Text className="text-[17px] text-gray-700 mt-4 font-bold" style={{ fontFamily: "HankenGrotesk_700Bold" }}>No storefront yet</Text>
          <Text className="text-[13px] text-gray-500 mt-2 text-center">Create your storefront to start selling.</Text>
          <View className="w-full mt-8 px-10">
            <SolidMainButton text="Create Storefront" onPress={() => router.push("/(access)/(stacks)/account/storefront-setup")} />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <View className="mt-4 mb-4 px-6">
        <Headers text={store.storeName || "My Store"} onPress={() => router.back()} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Banner */}
        {store.bannerUri ? (
          <Image source={{ uri: store.bannerUri }} className="w-full h-48" resizeMode="cover" />
        ) : (
          <View className="w-full h-32 bg-[#F1F8FF]" />
        )}

        {/* Store Info Header */}
        <View className="px-6 -mt-10">
          <Animated.View entering={FadeInDown.duration(400).springify()} className="bg-white rounded-2xl shadow p-5 border border-gray-100" style={{ gap: 12 }}>
            <View className="flex-row items-center gap-4">
              {store.logoUri ? (
                <Image source={{ uri: store.logoUri }} className="w-20 h-20 rounded-2xl" resizeMode="cover" />
              ) : (
                <View className="w-20 h-20 rounded-2xl bg-[#0066CC] items-center justify-center">
                  <MaterialIcons name="storefront" size={32} color="white" />
                </View>
              )}
              <View className="flex-1" style={{ gap: 4 }}>
                <Text className="text-[17px] font-bold text-gray-900" style={{ fontFamily: "HankenGrotesk_700Bold" }}>{store.storeName}</Text>
                {store.category && <Text className="text-[13px] text-gray-500">{store.category}</Text>}
                <View className="flex-row items-center gap-4">
                  <View className="flex-row items-center gap-1">
                    <MaterialIcons name="inventory" size={14} color="#6B7280" />
                    <Text className="text-[12px] text-gray-500">{storeListings.length} items</Text>
                  </View>
                  {store.address && <View className="flex-row items-center gap-1">
                    <Ionicons name="location-outline" size={14} color="#6B7280" />
                    <Text className="text-[12px] text-gray-500">{store.address}</Text>
                  </View>}
                </View>
              </View>
            </View>

            {store.storeDescription && (
              <Text className="text-[13px] text-gray-600 leading-5" style={{ fontFamily: "HankenGrotesk_500Medium" }}>
                {store.storeDescription}
              </Text>
            )}

            <View className="w-full h-[1px] bg-gray-100" />

            {/* Quick Info */}
            <View className="flex-row flex-wrap" style={{ gap: 16 }}>
              {store.contactEmail && <InfoChip icon="mail-outline" label={store.contactEmail} />}
              {store.contactPhone && <InfoChip icon="call-outline" label={store.contactPhone} />}
              {store.openTime && store.closeTime && <InfoChip icon="time-outline" label={`${store.openTime} - ${store.closeTime}`} />}
            </View>

            {/* Social */}
            <View className="flex-row gap-3">
              {store.instagram && <SocialBtn name="logo-instagram" onPress={() => {}} />}
              {store.twitter && <SocialBtn name="logo-twitter" onPress={() => {}} />}
              {store.whatsapp && <SocialBtn name="logo-whatsapp" onPress={() => {}} />}
            </View>

            <View className="flex-row gap-3 mt-2">
              <View className="flex-1">
                <SolidGrayButton text="Edit Store" onPress={() => router.push("/(access)/(stacks)/account/storefront-setup")} />
              </View>
            </View>
          </Animated.View>
        </View>

        {/* Products Section */}
        <View className="px-6 mt-8">
          <Text className="text-[17px] font-bold text-gray-900 mb-4" style={{ fontFamily: "HankenGrotesk_700Bold" }}>
            Products ({storeListings.length})
          </Text>
          {storeListings.length === 0 ? (
            <View className="items-center py-8 bg-[#F8F9FA] rounded-2xl">
              <Text className="text-[13px] text-gray-500">No products listed yet.</Text>
            </View>
          ) : (
            <View style={{ gap: 12 }}>
              {storeListings.map((item: any, index: number) => (
                <Animated.View
                  key={item.id}
                  layout={LinearTransition.springify().damping(15)}
                  entering={FadeInDown.duration(400).delay(index * 50).springify()}
                  exiting={FadeOutDown.duration(200)}
                  className="flex-row items-center gap-4 bg-white rounded-xl border border-gray-100 p-4"
                >
                  <Image source={{ uri: item.image }} className="w-16 h-16 rounded-xl" resizeMode="cover" />
                  <View className="flex-1" style={{ gap: 2 }}>
                    <Text className="text-[15px] font-bold text-gray-900" style={{ fontFamily: "HankenGrotesk_600SemiBold" }} numberOfLines={1}>{item.title}</Text>
                    <Text className="text-[13px] text-[#0066CC]" style={{ fontFamily: "HankenGrotesk_600SemiBold" }}>₦{item.price?.toLocaleString()}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => router.push({ pathname: "/(access)/(stacks)/item/[id]", params: { id: item.id, itemData: JSON.stringify(item) } })}
                    className="px-4 py-2 border border-[#0066CC] rounded-xl"
                  >
                    <Text className="text-[12px] text-[#0066CC]" style={{ fontFamily: "HankenGrotesk_500Medium" }}>View</Text>
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function InfoChip({ icon, label }: { icon: string; label: string }) {
  return (
    <View className="flex-row items-center gap-1.5">
      <Ionicons name={icon as any} size={14} color="#6B7280" />
      <Text className="text-[12px] text-gray-500" style={{ fontFamily: "HankenGrotesk_500Medium" }}>{label}</Text>
    </View>
  );
}

function SocialBtn({ name, onPress }: { name: string; onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} className="w-9 h-9 rounded-full bg-[#F3F4F6] items-center justify-center">
      <Ionicons name={name as any} size={16} color="#374151" />
    </TouchableOpacity>
  );
}
