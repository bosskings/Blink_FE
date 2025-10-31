import { Headers } from "@/components/Headers";
import initialReportedPosts from "@/dummyData/reportedPostsData";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import ReportedPostsList from "./_components/report/ReportedPostsList";

export default function ReportedPosts() {
  const router = useRouter();
  const [posts, setPosts] = useState<typeof initialReportedPosts>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    setLoading(true);
    setPosts([]);

    initialReportedPosts.forEach((post, index) => {
      const t = setTimeout(() => {
        setPosts((prev) => [...prev, post]);
        if (index === initialReportedPosts.length - 1) setLoading(false);
      }, index * 150);
      timeouts.push(t);
    });

    return () => timeouts.forEach(clearTimeout);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setPosts([]);
    setLoading(true);

    setTimeout(() => {
      initialReportedPosts.forEach((post, index) => {
        setTimeout(() => {
          setPosts((prev) => [...prev, post]);
          if (index === initialReportedPosts.length - 1) {
            setRefreshing(false);
            setLoading(false);
          }
        }, index * 120);
      });
    }, 700);
  }, []);

  const handleReview = (postId: number | string) => {
    // Handle review action
    console.log("Review post:", postId);
  };

  const handleTakeDown = (postId: number | string) => {
    // Handle review action
    console.log("Take Down Post:", postId);
    setPosts((prev) => prev.filter((item) => item.id !== postId));
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />

      {/* Header */}
      <View className="mt-6 mb-6 px-6">
        <Headers text="Reported Posts" onPress={() => router.back()} />
      </View>

      <ScrollView
        className="flex-1 px-6"
        refreshControl={
          <RefreshControl refreshing={refreshing!} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <ReportedPostsList
          posts={posts}
          loading={loading}
          handleReview={handleReview}
          handleTakeDown={handleTakeDown}
          initialReportedPosts={initialReportedPosts}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
