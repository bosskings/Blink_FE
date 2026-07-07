import { CustomAlert } from "@/components/CustomAlert";
import { Headers } from "@/components/Headers";
import LoadingOverlay from "@/components/LoadingOverlay";
import { useCommunityReports, useDeletePost } from "@/services";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ReportedPostsList from "./_components/report/ReportedPostsList";
import { useAlert } from "@/providers/AlertProvider";


export default function ReportedPosts() {
  const { showAlert } = useAlert();
  const router = useRouter();
  const { communityId } = useLocalSearchParams<{ communityId?: string }>();

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    title: "",
    message: "",
    postId: null as number | string | null,
    action: null as "review" | "takedown" | null,
  });
  const deletePostMutation = useDeletePost();

  const { data, isLoading, refetch, isRefetching } = useCommunityReports(
    communityId || "",
  );
  const [localPosts, setLocalPosts] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setLocalPosts(data);
    }
  }, [data]);

  const loading = isLoading;
  const refreshing = isRefetching;
  const posts = localPosts;

  const onRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleReview = (postId: number | string) => {
    setAlertConfig({
      title: "Review Post",
      message: "Are you sure you want to review this post?",
      postId,
      action: "review",
    });
    setAlertVisible(true);
  };

  const handleTakeDown = (postId: number | string) => {
    setAlertConfig({
      title: "Take Down Post",
      message:
        "Are you sure you want to take down this post? This action cannot be undone.",
      postId,
      action: "takedown",
    });
    setAlertVisible(true);
  };

  const confirmAction = () => {
    if (alertConfig.action === "takedown" && alertConfig.postId) {
      const postId = String(alertConfig.postId);
      deletePostMutation.mutate(postId, {
        onSuccess: () => {
          setLocalPosts((prev) =>
            prev.filter((item) => item.id !== alertConfig.postId),
          );
        },
        onError: (err) => {
          showAlert(
            "Error",
            err instanceof Error ? err.message : "Failed to delete post.",
          );
        },
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <LoadingOverlay visible={deletePostMutation.isPending} />

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
          initialReportedPosts={posts as any}
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
