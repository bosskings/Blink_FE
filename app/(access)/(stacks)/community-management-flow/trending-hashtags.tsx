import { Headers } from "@/components/Headers";
import trendingHashtagsData from "@/dummyData/trendingHashtagsData";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TrendingHashtagsList from "./_components/trending-hashtags/TrendingHashtagsList";
import { CustomAlert } from "@/components/CustomAlert";

export default function TrendingHashtags() {
  const router = useRouter();
  const [hashtags, setHashtags] = useState<typeof trendingHashtagsData>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertConfig] = useState({ title: "", message: "" });

  // Simulate data load with staggered animation
  useEffect(() => {
    setHashtags(trendingHashtagsData);
    setLoading(false);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setHashtags(trendingHashtagsData);
      setRefreshing(false);
    }, 700);
  }, []);

  const handleViewHashtag = (tag: string) => {
    router.push(`/(access)/(stacks)/community-management-flow/hashtag/${tag.replace('#', '')}` as any);
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

      <CustomAlert
        visible={alertVisible}
        title={alertConfig.title}
        message={alertConfig.message}
        onClose={() => setAlertVisible(false)}
      />
    </SafeAreaView>
  );
}
