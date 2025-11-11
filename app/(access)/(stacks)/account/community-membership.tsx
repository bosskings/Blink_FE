import { Headers } from "@/components/Headers";
import { EvilIcons, Feather, Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";

import initialReportedPosts from "@/dummyData/reportedPostsData";
import { requests as initialRequests } from "@/dummyData/requestsData";

import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useState } from "react";
import { RefreshControl, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Animated, {
  FadeInRight,
  FadeOutRight,
  LinearTransition,
} from "react-native-reanimated";

import ReportedPostsList from "../community-management-flow/_components/report/ReportedPostsList";
import RequestsList from "../community-management-flow/_components/request/RequestsList";

const CommunityMembership = () => {
  const [requests, setRequests] = useState<typeof initialRequests>([]);
  const [posts, setPosts] = useState<typeof initialReportedPosts>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🔁 Function to simulate data load with staggered animation
  const loadData = useCallback((callback?: () => void) => {
    setLoading(true);
    setRequests([]);
    setPosts([]);

    const allTimeouts: ReturnType<typeof setTimeout>[] = [];

    initialReportedPosts.forEach((post, index) => {
      const t = setTimeout(() => {
        setPosts((prev) => [...prev, post]);
      }, index * 120);
      allTimeouts.push(t);
    });

    initialRequests.forEach((req, index) => {
      const t = setTimeout(() => {
        setRequests((prev) => [...prev, req]);
        if (index === initialRequests.length - 1) {
          setLoading(false);
          callback?.();
        }
      }, index * 120);
      allTimeouts.push(t);
    });

    return () => allTimeouts.forEach(clearTimeout);
  }, []);

  // 🔥 Load once on mount
  useEffect(() => {
    const cleanup = loadData();
    return cleanup;
  }, [loadData]);

  // 🔁 Pull to refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    const cleanup = loadData(() => {
      setTimeout(() => {
        setRefreshing(false);
      }, 400);
    });
    return cleanup;
  }, [loadData]);

  // Actions
  const handleRemove = (id: string | number) => {
    setRequests((prev) => prev.filter((item) => item.id !== id));
  };

  const handleReview = (postId: number | string) => {
    console.log("Review post:", postId);
  };

  const handleTakeDown = (postId: number | string) => {
    console.log("Take Down Post:", postId);
    setPosts((prev) => prev.filter((item) => item.id !== postId));
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
            entering={FadeInRight.duration(400)}
            exiting={FadeOutRight.duration(250)}
            className="bg-white mx-6 px-6 py-6 rounded-2xl border border-gray-100 overflow-hidden shadow"
            style={{ rowGap: 15 }}
          >
            <View className="flex-row items-center justify-between w-full">
              <Text
                className="text-lg"
                style={{ fontFamily: "HankenGrotesk_700Bold" }}
              >
                Moderation Overview
              </Text>

              <Link
                className="flex-row items-center gap-3"
                href={""}
                style={{ color: "#0066CC" }}
              >
                <Text
                  style={{
                    fontFamily: "HankenGrotesk_600SemiBold",
                    fontSize: 13,
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
              entering={FadeInRight.duration(500).delay(150)}
              exiting={FadeOutRight.duration(250)}
              className="w-full flex-row justify-between items-center gap-4"
            >
              <View className="bg-[#F8F9FA] p-4 flex-1 flex-col items-center rounded-lg gap-2">
                <View className="flex-row items-center gap-1">
                  <EvilIcons name="clock" size={24} color="#0066CC" />
                  <Text
                    style={{ fontFamily: "HankenGrotesk_900Black" }}
                    className="text-xl"
                  >
                    52
                  </Text>
                </View>
                <Text
                  style={{ fontFamily: "HankenGrotesk_400Regular" }}
                  className="text-sm"
                >
                  Pending Reviews
                </Text>
              </View>

              <View className="bg-[#F8F9FA] p-4 flex-1 flex-col items-center rounded-lg gap-2">
                <View className="flex-row items-center gap-1">
                  <Ionicons
                    name="alert-circle-outline"
                    size={24}
                    color="#FF3333"
                  />
                  <Text
                    style={{ fontFamily: "HankenGrotesk_900Black" }}
                    className="text-xl"
                  >
                    8
                  </Text>
                </View>
                <Text
                  style={{ fontFamily: "HankenGrotesk_400Regular" }}
                  className="text-sm"
                >
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
              loading={loading}
              handleRemove={handleRemove}
            />
          </View>
          🚨 Reported Posts
          <View className="bg-[#F1F8FF] pt-8 pb-8 px-6">
            <ReportedPostsList
              title="Reported Posts"
              posts={posts}
              loading={loading}
              handleReview={handleReview}
              handleTakeDown={handleTakeDown}
              initialReportedPosts={initialReportedPosts}
            />
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CommunityMembership;
