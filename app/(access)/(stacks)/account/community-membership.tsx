import { Headers } from "@/components/Headers";
import { EvilIcons, Feather, Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";


import { StatusBar } from "expo-status-bar";
import React, { useCallback, useState } from "react";
import { RefreshControl, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Animated, {
  FadeInDown,
  FadeOutDown,
  LinearTransition,
} from "react-native-reanimated";

import ReportedPostsList from "../community-management-flow/_components/report/ReportedPostsList";
import RequestsList from "../community-management-flow/_components/request/RequestsList";
import { CustomAlert } from "@/components/CustomAlert";

const CommunityMembership = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertConfig, setAlertConfig] = useState({ title: "", message: "", postId: null as number | string | null, action: null as "review" | "takedown" | null });

  // 🔁 Pull to refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRequests([]);
      setPosts([]);
      setRefreshing(false);
    }, 600);
  }, []);

  // Actions
  const handleRemove = (id: string | number) => {
    setRequests((prev) => prev.filter((item) => item.id !== id));
  };

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
        <Headers text="Community Membership" onPress={() => router.back()} />
      </View>

      <ScrollView
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ rowGap: 25 }}
        showsVerticalScrollIndicator={false}
      >
        {/* 🌀 Moderation Overview (Animated) */}
        <Animated.View
          layout={LinearTransition.springify().damping(15).stiffness(90)}
          style={{ rowGap: 25 }}
        >
          <Animated.View
            layout={LinearTransition.springify().damping(15).stiffness(90)}
            entering={FadeInDown.duration(600).springify()}
            exiting={FadeOutDown.duration(250)}
            className="bg-white mx-6 px-6 py-6 rounded-2xl border border-gray-100 overflow-hidden shadow"
            style={{ rowGap: 15 }}
          >
            <View className="flex-row items-center justify-between w-full">
              <Text className="text-[17px] font-bold" style={{ fontFamily: "HankenGrotesk_500Medium" }}>
                Moderation Overview
              </Text>

              <Link
                className="flex-row items-center gap-3"
                href="/(access)/(stacks)/community-management-flow/reported-posts"
                style={{ color: "#0066CC" }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    marginRight: 10,
                  }}
                  className="mr-2"
                >
                  View All
                </Text>
                <Feather name="arrow-right" size={12} color="#0066CC" />
              </Link>
            </View>

            {/* Animated inner stats */}
            <Animated.View
              layout={LinearTransition.springify().damping(15).stiffness(100)}
              entering={FadeInDown.duration(600).delay(200).springify()}
              exiting={FadeOutDown.duration(250)}
              className="w-full flex-row justify-between items-center gap-4"
            >
              <View className="bg-[#F8F9FA] p-4 flex-1 flex-col items-center rounded-lg gap-2">
                <View className="flex-row items-center gap-1">
                  <EvilIcons name="clock" size={22} color="#0066CC" />
                  <Text style={{ fontFamily: "HankenGrotesk_500Medium" }} className="text-[17px] font-bold">
                    52
                  </Text>
                </View>
                <Text style={{ fontFamily: "HankenGrotesk_500Medium", color: "#6C757D" }} className="text-[13px]">
                  Pending Reviews
                </Text>
              </View>

              <View className="bg-[#F8F9FA] p-4 flex-1 flex-col items-center rounded-lg gap-2">
                <View className="flex-row items-center gap-1">
                  <Ionicons
                    name="alert-circle-outline"
                    size={22}
                    color="#FF3333"
                  />
                  <Text style={{ fontFamily: "HankenGrotesk_500Medium" }} className="text-[17px] font-bold">
                    8
                  </Text>
                </View>
                <Text style={{ fontFamily: "HankenGrotesk_500Medium", color: "#6C757D" }} className="text-[13px]">
                  Reported Users
                </Text>
              </View>
            </Animated.View>
          </Animated.View>
          {/* 📨 Requests */}
          <View className="px-6 mb-4">
            <RequestsList
              title="Requests"
              requests={requests}
              loading={false}
              handleRemove={handleRemove}
            />
          </View>
          <View className="bg-[#F1F8FF] pt-8 pb-8 px-6 mt-4">
            <ReportedPostsList
              title="Reported Posts"
              posts={posts}
              loading={false}
              handleReview={handleReview}
              handleTakeDown={handleTakeDown}
              initialReportedPosts={posts as any}
            />
          </View>
        </Animated.View>
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
};

export default CommunityMembership;
