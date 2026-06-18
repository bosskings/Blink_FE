import { Headers } from "@/components/Headers";
import LoadingOverlay from "@/components/LoadingOverlay";
import { requests as initialRequests } from "@/dummyData/requestsData";
import { useApproveJoinRequest, useRejectJoinRequest } from "@/services";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, RefreshControl, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RequestsList from "./_components/request/RequestsList";

const Requests = () => {
  const { communityId } = useLocalSearchParams<{ communityId?: string }>();
  const [requests, setRequests] = useState<typeof initialRequests>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const approveMutation = useApproveJoinRequest();
  const rejectMutation = useRejectJoinRequest();

  useEffect(() => {
    setRequests(initialRequests);
    setLoading(false);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRequests(initialRequests);
      setRefreshing(false);
    }, 700);
  }, []);

  const handleRemove = (id: string | number) => {
    if (!communityId) {
      setRequests((prev) => prev.filter((item) => item.id !== id));
      return;
    }

    rejectMutation.mutate(
      { communityId, userId: String(id) },
      {
        onSuccess: () => {
          setRequests((prev) => prev.filter((item) => item.id !== id));
        },
        onError: (err) => {
          Alert.alert("Error", err instanceof Error ? err.message : "Failed to reject request.");
        },
      },
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <LoadingOverlay visible={approveMutation.isPending || rejectMutation.isPending} />

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
