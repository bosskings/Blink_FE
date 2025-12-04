import { Headers } from "@/components/Headers";
import trendingHashtagsData from "@/dummyData/trendingHashtagsData";
import { Entypo, Feather, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
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

// Skeleton loader for shimmer effect
const SkeletonItem = () => {
  const opacity = useRef(new RNAnimated.Value(0.3)).current;

  useEffect(() => {
    const loop = RNAnimated.loop(
      RNAnimated.sequence([
        RNAnimated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        RNAnimated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, []);

  return (
    <RNAnimated.View
      style={{ opacity }}
      className="bg-gray-100 p-5 rounded-2xl border border-gray-200"
    >
      <RNAnimated.View className="w-32 h-4 bg-gray-300 rounded mb-3" />
      <RNAnimated.View className="w-24 h-3 bg-gray-300 rounded mb-2" />
      <RNAnimated.View className="w-16 h-3 bg-gray-300 rounded" />
    </RNAnimated.View>
  );
};

export default function TrendingHashtags() {
  const router = useRouter();
  const [hashtags, setHashtags] = useState<typeof trendingHashtagsData>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Simulate data load with staggered animation
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    setLoading(true);
    setHashtags([]);

    trendingHashtagsData.forEach((item, index) => {
      const t = setTimeout(() => {
        setHashtags((prev) => [...prev, item]);
        if (index === trendingHashtagsData.length - 1) setLoading(false);
      }, index * 150);
      timers.push(t);
    });

    return () => timers.forEach(clearTimeout);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setHashtags([]);
    setLoading(true);

    setTimeout(() => {
      trendingHashtagsData.forEach((item, index) => {
        setTimeout(() => {
          setHashtags((prev) => [...prev, item]);
          if (index === trendingHashtagsData.length - 1) {
            setRefreshing(false);
            setLoading(false);
          }
        }, index * 120);
      });
    }, 700);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />

      {/* Header */}
      <View className="mt-6 mb-6 px-6">
        <Headers text="Trending Hashtags" onPress={() => router.back()} />
      </View>

      <ScrollView
        className="flex-1 px-6"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <View style={{ rowGap: 20 }}>
            {trendingHashtagsData.map((item) => (
              <SkeletonItem key={item.id} />
            ))}
          </View>
        ) : hashtags.length === 0 ? (
          <Animated.View
            entering={FadeInRight.duration(400).springify().damping(18)}
            exiting={FadeOutRight.duration(250)}
            className="flex-1 items-center justify-center mt-32"
          >
            <MaterialIcons name="inbox" size={60} color="#d1d1d1" />
            <Text
              className="text-lg text-gray-700 text-center"
              style={{ fontFamily: "HankenGrotesk_700Bold" }}
            >
              No Trending Hashtags
            </Text>
            <Text
              className="text-gray-500 mt-1 text-center px-10"
              style={{ fontFamily: "HankenGrotesk_400Regular" }}
            >
              There are currently no trending hashtags to display.
            </Text>
          </Animated.View>
        ) : (
          // 🟢 Content
          <Animated.View
            layout={LinearTransition.springify().damping(15).stiffness(90)}
            entering={FadeInRight.duration(300)}
            exiting={FadeOutRight.duration(250)}
            style={{ rowGap: 20 }}
          >
            {hashtags.map((item) => (
              <Animated.View
                key={item.id}
                layout={LinearTransition.springify()}
                entering={FadeInRight.duration(250)}
                exiting={FadeOutRight.duration(250)}
                className="bg-white px-6 py-6 rounded-2xl border border-gray-100 shadow"
              >
                <View className="flex-row items-center justify-between">
                  <View>
                    <View
                      className="flex-row items-center"
                      style={{ rowGap: 10 }}
                    >
                      <Text
                        className="text-lg font-semibold"
                        style={{
                          fontFamily: "HankenGrotesk_700Bold",
                          color: "#0066CC",
                        }}
                      >
                        {item.tag}
                      </Text>
                      <Entypo name="dot-single" size={10} color="#0066CC" />
                      <Text
                        className="text-black text-base"
                        style={{ fontFamily: "HankenGrotesk_700Bold" }}
                      >
                        {item.posts} posts
                      </Text>
                    </View>
                    <Text
                      className="text-black text-sm mt-1"
                      style={{ fontFamily: "HankenGrotesk_400Regular" }}
                    >
                      {item.location}
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => console.log(`View hashtag: ${item.tag}`)}
                    className="p-3 rounded-full"
                    style={{ backgroundColor: "#0066CC" }}
                  >
                    <Feather name="arrow-right" size={18} color="#fff" />
                  </TouchableOpacity>
                </View>
              </Animated.View>
            ))}
          </Animated.View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
