import { Headers } from "@/components/Headers";
import trendingHashtagsData from "@/dummyData/trendingHashtagsData";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TrendingHashtagsList from "./_components/trending-hashtags/TrendingHashtagsList";

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

  const handleViewHashtag = (tag: string) => {
    console.log(`View hashtag: ${tag}`);
  };

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
        <TrendingHashtagsList
          hashtags={hashtags}
          loading={loading}
          initialHashtags={trendingHashtagsData}
          onViewHashtag={handleViewHashtag}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
