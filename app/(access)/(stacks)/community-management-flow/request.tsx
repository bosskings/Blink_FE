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

  useEffect(() => {
    setRequests(initialRequests);
    setLoading(false);
  }, []);

  // Pull to refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRequests(initialRequests);
      setRefreshing(false);
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
