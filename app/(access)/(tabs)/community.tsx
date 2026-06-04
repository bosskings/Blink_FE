import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Accordion from "@/components/Accordion";
import { SearchInput } from "@/components/SearchInput";
import { FilterPill } from "@/components/FilterPill";
import { CommunityCard } from "@/components/cards/CommunityCard";
import { DiscussionCard } from "@/components/cards/DiscussionCard";
import trendingHashtagsData from "@/dummyData/trendingHashtagsData";
import { router } from "expo-router";
import { Fragment, useCallback, useEffect, useState } from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import TrendingHashtagsList from "../(stacks)/community-management-flow/_components/trending-hashtags/TrendingHashtagsList";

export default function TabTwoScreen() {
  const [activeTab, setActiveTab] = useState<"my" | "explore">("my");
  const [activeFilter, setActiveFilter] = useState<"joined" | "owned">(
    "joined",
  );
  const [hashtags, setHashtags] = useState<typeof trendingHashtagsData>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [likedDiscussions, setLikedDiscussions] = useState<Set<string>>(
    new Set(),
  );
  const [discussionLikes, setDiscussionLikes] = useState<
    Record<string, number>
  >({});

  const universityCommunities = [
    {
      id: 1,
      name: "Covenant University",
      desc: "A vibrant student community in Ota, Ogun State, Nigeria, well-known for its academic excellence and active campus life. Connect for learning resources, peer support, campus events, and buy/sell opportunities.",
      members: "18k",
      status: "Active",
      nested: "2",
      image:
        "https://images.unsplash.com/photo-1587466738777-28022963e45a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Q2l0eSUyMHNreWxpbmUlMjBuaWdodCUyMGxpZ2h0c3xlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 2,
      name: "Obafemi Awolowo University",
      desc: "Join OAU's passionate student community for collaborative learning, events, and discussions. Network with fellow students, find campus deals, ask academic questions, and stay updated on student-led activities.",
      members: "22k",
      status: "Owned",
      nested: "2",
      image:
        "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNhbXB1c3xlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 3,
      name: "University of Lagos",
      desc: "Connect with UNILAG's energetic community at Nigeria's premier urban university. Dive into conversations about classes, events, club activities, housing, and trending news on campus.",
      members: "25k",
      status: "Discover",
      nested: "2",
      image:
        "https://images.unsplash.com/photo-1522752562114-9deaf20c2058?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fFVyYmFuJTIwY2l0eSUyMHNreWxpbmV8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 4,
      name: "University of Ibadan",
      desc: "Engage with Nigeria's premier university community. Share reading materials, find study groups, discover campus events, and stay in the loop on departmental updates.",
      members: "19k",
      status: "Discover",
      nested: "3",
      image:
        "https://images.unsplash.com/photo-1444201983204-c43cbd584d93?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
    },
    {
      id: 5,
      name: "Lagos State University",
      desc: "Join LASU's buzzing student hub. Connect over lectures, projects, student politics, social events, and everything happening on and around campus.",
      members: "16k",
      status: "Discover",
      nested: "1",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
    },
    {
      id: 6,
      name: "Babcock University",
      desc: "A close-knit private university community for sharing faith, academics, business ideas, and campus lifestyle tips.",
      members: "12k",
      status: "Discover",
      nested: "2",
      image:
        "https://images.unsplash.com/photo-1460518451285-97b6aa326961?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
    },
    {
      id: 7,
      name: "Federal University of Technology, Akure",
      desc: "Tech-driven community for FUTA students to collaborate on projects, hackathons, research, and internships while staying updated on campus gist.",
      members: "14k",
      status: "Discover",
      nested: "3",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
    },
  ];

  const discussions = [
    {
      id: "1",
      user: "Mike Berger",
      time: "2 hours ago",
      community: "Covenant University",
      content: "Anyone with ENG 201 past question?\nExams are coming fast 🔥",
      tags: ["#ExamSeason", "#StudyTips"],
      likes: 124,
      comments: 67,
      avatar:
        "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHVzZXJ8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: "2",
      user: "Mike Berger",
      time: "2 hours ago",
      community: "Ota Central Market",
      content: "Anyone with ENG 201 past question?\nExams are coming fast 🔥",
      tags: ["#ExamSeason", "#StudyTips"],
      likes: 124,
      comments: 67,
      avatar:
        "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx8fHx8MA%3D",
    },
  ];

  useEffect(() => {
    const initialLikes: Record<string, number> = {};
    discussions.forEach((discussion) => {
      initialLikes[discussion.id] = discussion.likes;
    });
    setDiscussionLikes(initialLikes);
  }, []);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    setLoading(true);
    setHashtags([]);

    trendingHashtagsData.forEach((item, index) => {
      const t = setTimeout(() => {
        setHashtags((prev) => [...prev, item]);
        if (index === trendingHashtagsData.length - 1) setLoading(false);
      }, index * 150);
      timers.push(t as unknown as NodeJS.Timeout);
    });

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setHashtags([]);
    setLoading(true);

    setTimeout(() => {
      trendingHashtagsData.forEach((item, index) => {
        setTimeout(() => {
          setHashtags((prev) => [...prev, item]);
          if (index === trendingHashtagsData.length - 1) {
            setRefreshing(false);
            setLoading(false);
          }
        }, index * 120);
      });
    }, 700);
  }, []);

  const handleLike = (discussionId: string) => {
    setLikedDiscussions((prev) => {
      const newSet = new Set(prev);
      const isLiked = newSet.has(discussionId);

      if (isLiked) {
        newSet.delete(discussionId);
        setDiscussionLikes((prevLikes) => ({
          ...prevLikes,
          [discussionId]: (prevLikes[discussionId] || 0) - 1,
        }));
      } else {
        newSet.add(discussionId);
        setDiscussionLikes((prevLikes) => ({
          ...prevLikes,
          [discussionId]: (prevLikes[discussionId] || 0) + 1,
        }));
      }

      return newSet;
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-6 pt-4">
      <StatusBar style="dark" />

      <View className="bg-white border-b border-gray-100">
        <View className="flex-row items-center justify-between py-3">
          <Text className="text-2xl text-gray-900">Communities</Text>
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
          <SearchInput placeholder="Search Communities &amp; Forums" />
        </View>
      </View>

      <ScrollView
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Tabs */}
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
            {/* Filter Pills */}
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
              <Fragment key={activeFilter}>
                <View className="mb-4 gap-4">
                  {universityCommunities
                    .filter((community) => community.status === "Active")
                    .map((community, index) => (
                      <Accordion
                        key={index}
                        title={community.name}
                        subtitle={`${community.members} • ${community.nested} Nested Communities`}
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
                                  {community.members}
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
                </View>
              </Fragment>
            )}
            {activeFilter === "owned" && (
              <Fragment key={activeFilter}>
                <View className="mb-4 gap-4">
                  {universityCommunities
                    .filter((community) => community.status === "Owned")
                    .map((community, index) => (
                      <Accordion
                        key={index}
                        title={community.name}
                        subtitle={`${community.members} Members • ${community.nested} Nested Communities`}
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
                                  {community.members} Members
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
                hashtags={hashtags}
                loading={loading}
                initialHashtags={trendingHashtagsData}
              />
            </View>

            {/* Recommended Discussions */}
            <View className="mt-6">
              <Text className="text-lg font-bold text-gray-900 mb-4">
                Recommended Discussions
              </Text>

              {discussions.map((discussion) => (
                <DiscussionCard
                  key={discussion.id}
                  item={discussion}
                  likedDiscussions={Array.from(likedDiscussions)}
                  toggleLikeDiscussion={handleLike}
                />
              ))}
            </View>
          </>
        )}

        {/* Explore */}
        {activeTab === "explore" && (
          <>
            {universityCommunities.map((community) => (
              <CommunityCard
                key={community.id}
                id={community.id}
                name={community.name}
                desc={community.desc}
                members={community.members}
                status={community.status}
                image={community.image}
                nested={community.nested}
                variant="explore"
              />
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
