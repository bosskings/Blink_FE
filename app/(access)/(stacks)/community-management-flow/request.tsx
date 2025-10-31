import { Headers } from "@/components/Headers";
import { requests as initialRequests } from "@/dummyData/requestsData";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RequestsList from "./_components/request/RequestsList";

const Requests = () => {
  const [requests, setRequests] = useState<typeof initialRequests>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load requests with staggered animation
  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    setLoading(true);
    setRequests([]);
    initialRequests.forEach((req, index) => {
      const t = setTimeout(() => {
        setRequests((prev) => [...prev, req]);
        if (index === initialRequests.length - 1) setLoading(false);
      }, index * 150);
      timeouts.push(t);
    });
    return () => timeouts.forEach(clearTimeout);
  }, []);

  // Pull to refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setRequests([]);
    setLoading(true);
    setTimeout(() => {
      initialRequests.forEach((req, index) => {
        setTimeout(() => {
          setRequests((prev) => [...prev, req]);
          if (index === initialRequests.length - 1) {
            setRefreshing(false);
            setLoading(false);
          }
        }, index * 120);
      });
    }, 700);
  }, []);

  const handleRemove = (id: string | number) => {
    setRequests((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />

      {/* Header */}
      <View className="mt-6 mb-6 px-6">
        <Headers text="Requests" onPress={() => router.back()} />
      </View>

      <ScrollView
        className="flex-1 px-6"
        refreshControl={
          <RefreshControl refreshing={refreshing!} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <RequestsList
          requests={requests}
          loading={loading}
          handleRemove={handleRemove}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Requests;
