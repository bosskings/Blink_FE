import { Headers } from "@/components/Headers";
import initialReportedPosts from "@/dummyData/reportedPostsData";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import ReportedPostsList from "./_components/report/ReportedPostsList";
import { CustomAlert } from "@/components/CustomAlert";

export default function ReportedPosts() {
  const router = useRouter();
  const [posts, setPosts] = useState<typeof initialReportedPosts>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertConfig, setAlertConfig] = useState({ title: "", message: "", postId: null as number | string | null, action: null as "review" | "takedown" | null });

  useEffect(() => {
    setPosts(initialReportedPosts);
    setLoading(false);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setPosts(initialReportedPosts);
      setRefreshing(false);
    }, 700);
  }, []);

  const handleReview = (postId: number | string) => {
    setAlertConfig({
      title: "Review Post",
      message: "Are you sure you want to review this post?",
      postId,
      action: "review"
    });
    setAlertVisible(true);
  };

  const handleTakeDown = (postId: number | string) => {
    setAlertConfig({
      title: "Take Down Post",
      message: "Are you sure you want to take down this post? This action cannot be undone.",
      postId,
      action: "takedown"
    });
    setAlertVisible(true);
  };

  const confirmAction = () => {
    if (alertConfig.action === "takedown" && alertConfig.postId) {
      setPosts((prev) => prev.filter((item) => item.id !== alertConfig.postId));
    }
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

      <CustomAlert
        visible={alertVisible}
        title={alertConfig.title}
        message={alertConfig.message}
        onClose={() => setAlertVisible(false)}
        onConfirm={confirmAction}
        confirmText={alertConfig.action === "takedown" ? "Take Down" : "Review"}
      />
    </SafeAreaView>
  );
}
