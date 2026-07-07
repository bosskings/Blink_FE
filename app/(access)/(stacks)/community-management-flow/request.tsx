import { Headers } from "@/components/Headers";
import LoadingOverlay from "@/components/LoadingOverlay";
import { useCommunityRequests, useApproveJoinRequest, useRejectJoinRequest } from "@/services";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RequestsList from "./_components/request/RequestsList";
import { useAlert } from "@/providers/AlertProvider";


const Requests = () => {
  const { showAlert } = useAlert();
  const { communityId } = useLocalSearchParams<{ communityId?: string }>();
  const { data, isLoading, refetch, isRefetching } = useCommunityRequests(communityId || "");
  const [localRequests, setLocalRequests] = useState<any[]>([]);
  const approveMutation = useApproveJoinRequest();
  const rejectMutation = useRejectJoinRequest();

  useEffect(() => {
    if (data) {
      setLocalRequests(data);
    }
  }, [data]);

  const loading = isLoading;
  const refreshing = isRefetching;
  const requests = localRequests;

  const onRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleRemove = (id: string | number) => {
    if (!communityId) {
      setLocalRequests((prev) => prev.filter((item) => item.id !== id));
      return;
    }

    rejectMutation.mutate(
      { communityId, userId: String(id) },
      {
        onSuccess: () => {
          setLocalRequests((prev) => prev.filter((item) => item.id !== id));
        },
        onError: (err) => {
          showAlert("Error", err instanceof Error ? err.message : "Failed to reject request.");
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
