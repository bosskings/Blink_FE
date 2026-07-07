import { Feather, Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Accordion from "@/components/Accordion";
import { FilterPill } from "@/components/FilterPill";
import { SearchInput } from "@/components/SearchInput";
import { CommunityCard } from "@/components/cards/CommunityCard";
import { DiscussionCard } from "@/components/cards/DiscussionCard";
import {
  useCommunities,
  useDiscussions,
  useLikeDiscussion,
  useTrendingHashtags,
} from "@/services";
import { router, useLocalSearchParams } from "expo-router";
import { Fragment, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import TrendingHashtagsList from "../(stacks)/community-management-flow/_components/trending-hashtags/TrendingHashtagsList";

export default function TabTwoScreen() {
  const { defaultTab } = useLocalSearchParams<{
    defaultTab?: "my" | "explore";
  }>();
  const [activeTab, setActiveTab] = useState<"my" | "explore">(
    defaultTab || "my",
  );
  const [activeFilter, setActiveFilter] = useState<"joined" | "owned">(
    "joined",
  );
  const [likedDiscussions, setLikedDiscussions] = useState<Set<string>>(
    new Set(),
  );
const [, setDiscussionLikes] = useState<
  Record<string, number>
>({});

  const { data: communities } = useCommunities();
  const { data: discussions } = useDiscussions();
  const { data: hashtags, isLoading, refetch } = useTrendingHashtags();

  const likeDiscussion = useLikeDiscussion();

  const handleLike = (discussionId: string) => {
    likeDiscussion.mutate(discussionId, {
      onSuccess: (updated: any) => {
        if (updated) {
          setLikedDiscussions((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(discussionId)) newSet.delete(discussionId);
            else newSet.add(discussionId);
            return newSet;
          });
          setDiscussionLikes((prev) => ({
            ...prev,
            [discussionId]: updated.likes,
          }));
        }
      },
    });
  };

  const allCommunities = communities || [];
  const allDiscussions = discussions || [];

  return (
    <SafeAreaView className="flex-1 bg-white px-6 pt-4">
      <StatusBar style="dark" />

      <View className="bg-white border-b border-gray-100">
        <View className="flex-row items-center justify-between py-3">
          <Text className="text-[17px] text-gray-900">Communities</Text>
          <TouchableOpacity
            className="w-10 h-10 bg-[#0066CC] rounded-full items-center justify-center"
            onPress={() =>
              router.push(
                "/(access)/(stacks)/community-management-flow/create-community",
              )
            }
          >
            <Ionicons name="add" size={22} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View className="py-2">
          <SearchInput
            placeholder="Search Communities & Forums"
            containerStyle={{ height: 44 }}
          />
        </View>
      </View>

      <ScrollView
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={() => refetch()} />
        }
        contentContainerStyle={{ paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row px-4 py-4 mb-6 gap-3 mt-5 bg-[#F8F9FA] rounded-[2rem]">
          <TouchableOpacity
            onPress={() => setActiveTab("my")}
            className={`flex-1 items-center justify-center px-6 py-2.5 rounded-full ${activeTab === "my" ? "bg-[#0066CC]" : ""}`}
          >
            <Text
              className={`${activeTab === "my" ? "text-white" : "text-[#6C757D]"}`}
            >
              My Communities
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab("explore")}
            className={`flex-1 items-center justify-center px-6 py-2.5 rounded-full ${activeTab === "explore" ? "bg-[#0066CC]" : ""}`}
          >
            <Text
              className={`${activeTab === "explore" ? "text-white" : "text-[#6C757D]"}`}
            >
              Explore
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === "my" && (
          <>
            <View className="flex-row items-center mb-8 gap-2">
              <FilterPill
                label="Joined Communities"
                active={activeFilter === "joined"}
                onPress={() => setActiveFilter("joined")}
              />
              <FilterPill
                label="Owned Communities"
                active={activeFilter === "owned"}
                onPress={() => setActiveFilter("owned")}
              />
            </View>

            {activeFilter === "joined" && (
              <Fragment key="joined">
                <View className="mb-4 gap-4">
                  {allCommunities
                    .filter((c: any) => c.isJoined)
                    .map((community: any, index: number) => (
                      <Accordion
                        key={index}
                        title={community.name}
                        subtitle={`${community.memberCount?.toLocaleString() || "0"} Members`}
                        status={community.status}
                        image={community.image}
                      >
                        <View className="gap-4">
                          <View className="flex-row items-center justify-between bg-white rounded-xl px-6 py-2">
                            <View>
                              <Text className="text-[15px]">
                                {community.name}
                              </Text>
                              <View className="flex-row items-center gap-1">
                                <Feather
                                  name="users"
                                  size={14}
                                  color="#D9D9D9"
                                />
                                <Text className="text-[12px]">
                                  {community.memberCount?.toLocaleString()}
                                </Text>
                              </View>
                            </View>
                            <TouchableOpacity
                              onPress={() =>
                                router.push({
                                  pathname:
                                    "/(access)/(stacks)/community-management-flow/community-details/[id]",
                                  params: { id: community.id },
                                })
                              }
                              className="border-[1.5px] border-[#0066CC] rounded-xl px-6 py-2"
                            >
                              <Text className="text-[#0066CC] text-[13px]">
                                View
                              </Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </Accordion>
                    ))}
                  {allCommunities.filter((c: any) => c.isJoined).length ===
                    0 && (
                    <Text className="text-center text-[13px] text-gray-500 py-8">
                      No joined communities yet.
                    </Text>
                  )}
                </View>
              </Fragment>
            )}

            {activeFilter === "owned" && (
              <Fragment key="owned">
                <View className="mb-4 gap-4">
                  {allCommunities
                    .filter((c: any) => c.isOwned)
                    .map((community: any, index: number) => (
                      <Accordion
                        key={index}
                        title={community.name}
                        subtitle={`${community.memberCount?.toLocaleString() || "0"} Members`}
                        status="Owned"
                        image={community.image}
                      >
                        <View className="gap-4">
                          <View className="flex-row items-center justify-between bg-white rounded-xl px-6 py-2">
                            <View>
                              <Text className="text-[15px]">
                                {community.name}
                              </Text>
                              <View className="flex-row items-center gap-1">
                                <Feather
                                  name="users"
                                  size={14}
                                  color="#D9D9D9"
                                />
                                <Text className="text-[12px]">
                                  {community.memberCount?.toLocaleString()}{" "}
                                  Members
                                </Text>
                              </View>
                            </View>
                            <View className="flex-row gap-2">
                              <TouchableOpacity
                                onPress={() =>
                                  router.push({
                                    pathname:
                                      "/(access)/(stacks)/community-management-flow/community-details/[id]",
                                    params: { id: community.id },
                                  })
                                }
                                className="border-[1.5px] border-[#0066CC] rounded-xl px-6 py-2"
                              >
                                <Text className="text-[#0066CC] text-[13px]">
                                  View
                                </Text>
                              </TouchableOpacity>
                              <TouchableOpacity
                                onPress={() =>
                                  router.push(
                                    "/(access)/(stacks)/community-management-flow/all-events",
                                  )
                                }
                                className="bg-[#0066CC] rounded-xl px-4 py-2 items-center justify-center"
                              >
                                <Ionicons name="add" size={16} color="#fff" />
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      </Accordion>
                    ))}
                  {allCommunities.filter((c: any) => c.isOwned).length ===
                    0 && (
                    <Text className="text-center text-[13px] text-gray-500 py-8">
                      No owned communities yet.
                    </Text>
                  )}
                </View>
              </Fragment>
            )}

            {/* Trending Hashtags */}
            <View className="mt-4">
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-lg font-bold">Trending Hashtags</Text>
                <TouchableOpacity
                  onPress={() =>
                    router.push(
                      "/(access)/(stacks)/community-management-flow/trending-hashtags",
                    )
                  }
                >
                  <Text className="text-[13px] text-[#0066CC] font-bold">
                    All Trending Hashtags
                  </Text>
                </TouchableOpacity>
              </View>
              <TrendingHashtagsList
                hashtags={hashtags || []}
                loading={isLoading}
                initialHashtags={hashtags || []}
              />
            </View>

            {/* Recommended Discussions */}
            <View className="mt-6">
              <Text className="text-lg font-bold text-gray-900 mb-4">
                Recommended Discussions
              </Text>
              {allDiscussions.map((discussion: any) => (
                <DiscussionCard
                  key={discussion.id}
                  item={discussion}
                  likedDiscussions={Array.from(likedDiscussions)}
                  toggleLikeDiscussion={handleLike}
                />
              ))}
              {allDiscussions.length === 0 && (
                <Text className="text-center text-[13px] text-gray-500 py-8">
                  No discussions yet.
                </Text>
              )}
            </View>
          </>
        )}

        {/* Explore */}
        {activeTab === "explore" && (
          <>
            {allCommunities.map((community: any) => (
              <CommunityCard
                key={community.id}
                id={community.id}
                name={community.name}
                desc={community.description}
                members={community.memberCount?.toLocaleString() || "0"}
                status={community.isJoined ? "Active" : "Discover"}
                image={community.image}
                variant="explore"
              />
            ))}
            {allCommunities.length === 0 && (
              <Text className="text-center text-[13px] text-gray-500 py-8">
                No communities available.
              </Text>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
