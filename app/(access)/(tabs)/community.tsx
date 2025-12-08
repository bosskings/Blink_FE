import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import Accordion from "@/components/Accordion";
import trendingHashtagsData from "@/dummyData/trendingHashtagsData";
import { router } from "expo-router";
import { Fragment, useCallback, useEffect, useState } from "react";

import { truncate } from "@/utils/truncate";
import { SafeAreaView } from "react-native-safe-area-context";
import TrendingHashtagsList from "../(stacks)/community-management-flow/_components/trending-hashtags/TrendingHashtagsList";

export default function TabTwoScreen() {
  const [activeTab, setActiveTab] = useState<"my" | "explore">("my");
  const [activeFilter, setActiveFilter] = useState<"joined" | "owned">(
    "joined"
  );
  const [hashtags, setHashtags] = useState<typeof trendingHashtagsData>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [likedDiscussions, setLikedDiscussions] = useState<Set<string>>(
    new Set()
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
      desc: "Join OAU’s passionate student community for collaborative learning, events, and discussions. Network with fellow students, find campus deals, ask academic questions, and stay updated on student-led activities.",
      members: "22k",
      status: "Owned",
      nested: "2",
      image:
        "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNhbXB1c3xlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 3,
      name: "University of Lagos",
      desc: "Connect with UNILAG’s energetic community at Nigeria’s premier urban university. Dive into conversations about classes, events, club activities, housing, and trending news on campus.",
      members: "25k",
      status: "Discover",
      nested: "2",
      image:
        "https://images.unsplash.com/photo-1522752562114-9deaf20c2058?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fFVyYmFuJTIwY2l0eSUyMHNreWxpbmV8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 4,
      name: "University of Ibadan",
      desc: "Engage with Nigeria’s premier university community. Share reading materials, find study groups, discover campus events, and stay in the loop on departmental updates.",
      members: "19k",
      status: "Discover",
      nested: "3",
      image:
        "https://images.unsplash.com/photo-1444201983204-c43cbd584d93?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
    },
    {
      id: 5,
      name: "Lagos State University",
      desc: "Join LASU’s buzzing student hub. Connect over lectures, projects, student politics, social events, and everything happening on and around campus.",
      members: "16k",
      status: "Discover",
      nested: "1",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
    },
    {
      id: 6,
      name: "Babcock University",
      desc: "A close‑knit private university community for sharing faith, academics, business ideas, and campus lifestyle tips.",
      members: "12k",
      status: "Discover",
      nested: "2",
      image:
        "https://images.unsplash.com/photo-1460518451285-97b6aa326961?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
    },
    {
      id: 7,
      name: "Federal University of Technology, Akure",
      desc: "Tech‑driven community for FUTA students to collaborate on projects, hackathons, research, and internships while staying updated on campus gist.",
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

  // Initialize discussion likes from discussions data
  useEffect(() => {
    const initialLikes: Record<string, number> = {};
    discussions.forEach((discussion) => {
      initialLikes[discussion.id] = discussion.likes;
    });
    setDiscussionLikes(initialLikes);
  }, []);

  // Simulate data load with staggered animation
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

      {/* Fixed Header */}
      <View className="bg-white border-b border-gray-100">
        <View className="flex-row items-center justify-between py-3">
          <Text
            className="text-2xl text-gray-900"
            style={{ fontFamily: "HankenGrotesk_900Black" }}
          >
            Communities
          </Text>
          <TouchableOpacity
            className="w-10 h-10 bg-[#0066CC] rounded-full items-center justify-center"
            onPress={() =>
              router.push(
                "/(access)/(stacks)/community-management-flow/create-community"
              )
            }
          >
            <Ionicons name="add" size={22} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Search and Filter */}
        <View className="py-2 flex-row">
          <View className="flex-1 flex-row items-center bg-[#F8F9FA] rounded-xl border border-[#D9D9D9] px-4 py-2">
            <TextInput
              placeholder="Search Communities & Forums"
              placeholderTextColor="#6C757D66"
              className="text-sm flex-1"
              style={{ fontFamily: "HankenGrotesk_500Medium" }}
            />
            <TouchableOpacity className="w-8 h-8 bg-black rounded-xl items-center justify-center">
              <Ionicons name="search" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
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
              style={{ fontFamily: "HankenGrotesk_500Medium" }}
            >
              My Communities
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab("explore")}
            className={`flex-1 items-center justify-center px-6 py-4 rounded-full ${activeTab === "explore" ? "bg-[#0066CC]" : ""}`}
          >
            <Text
              className={`${activeTab === "explore" ? "text-white" : "text-[#6C757D]"}`}
              style={{ fontFamily: "HankenGrotesk_500Medium" }}
            >
              Explore
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === "my" && (
          <>
            {/* Filter Pills */}
            <View className="flex-row items-center mb-8 gap-2">
              <TouchableOpacity
                onPress={() => setActiveFilter("joined")}
                className={`px-4 py-2 items-center justify-center rounded-full ${activeFilter === "joined" ? "bg-[#AAD4FF] border border-[#0066CC]" : "bg-white border-[1.5px] border-[#6C757D]"}`}
              >
                <Text
                  className={`text-sm ${activeFilter === "joined" ? "text-[#0066CC]" : "text-[#6C757D]"}`}
                  style={{ fontFamily: "HankenGrotesk_700Bold" }}
                >
                  Joined Communities
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setActiveFilter("owned")}
                className={`px-4 py-2 items-center justify-center rounded-full ${activeFilter === "owned" ? "bg-[#AAD4FF] border border-[#0066CC]" : "bg-white border-[1.5px] border-[#6C757D]"}`}
              >
                <Text
                  className={`text-sm ${activeFilter === "owned" ? "text-[#0066CC]" : "text-[#6C757D]"}`}
                  style={{ fontFamily: "HankenGrotesk_700Bold" }}
                >
                  Owned Communities
                </Text>
              </TouchableOpacity>
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
                        {/* Content inside Accordion */}
                        <View className="gap-4">
                          <View className="flex-row items-center justify-between bg-white rounded-xl px-6 py-4">
                            <View>
                              <Text
                                className="text-base"
                                style={{ fontFamily: "HankenGrotesk_900Black" }}
                              >
                                {truncate(community.name, 20, "...")}
                              </Text>
                              <View className="flex-row items-center gap-1">
                                <Feather
                                  name="users"
                                  size={14}
                                  color="#D9D9D9"
                                />
                                <Text
                                  className="text-[#000000] text-xs"
                                  style={{
                                    fontFamily: "HankenGrotesk_500Medium",
                                  }}
                                >
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
                              <Text
                                className="text-[#0066CC] text-sm"
                                style={{
                                  fontFamily: "HankenGrotesk_400Regular",
                                }}
                              >
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
                        {/* Content inside Accordion */}
                        <View className="gap-4">
                          <View className="flex-row items-center justify-between bg-white rounded-xl px-6 py-4">
                            <View>
                              <Text
                                className="text-base"
                                style={{ fontFamily: "HankenGrotesk_900Black" }}
                              >
                                {truncate(community.name, 20, "...")}
                              </Text>
                              <View className="flex-row items-center gap-1">
                                <Feather
                                  name="users"
                                  size={14}
                                  color="#D9D9D9"
                                />
                                <Text
                                  className="text-[#000000] text-xs"
                                  style={{
                                    fontFamily: "HankenGrotesk_500Medium",
                                  }}
                                >
                                  {community.members} Members
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
                              <Text
                                className="text-[#0066CC] text-sm"
                                style={{
                                  fontFamily: "HankenGrotesk_400Regular",
                                }}
                              >
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

            {/* Trending Hashtags */}
            <View className="mt-4">
              <View className="flex-row items-center justify-between mb-4">
                <Text
                  className="text-lg font-bold"
                  style={{ fontFamily: "HankenGrotesk_500Medium" }}
                >
                  Trending Hashtags
                </Text>

                <TouchableOpacity
                  onPress={() =>
                    router.push(
                      "/(access)/(stacks)/community-management-flow/trending-hashtags"
                    )
                  }
                >
                  <Text
                    className="text-sm text-[#0066CC] font-bold"
                    style={{ fontFamily: "HankenGrotesk_500Medium" }}
                  >
                    All Trending Hashtags
                  </Text>
                </TouchableOpacity>
              </View>

              <TrendingHashtagsList
                hashtags={hashtags}
                loading={loading}
                initialHashtags={trendingHashtagsData}
                // onViewHashtag={handleViewHashtag}
              />
            </View>

            {/* Recommended Discussions */}
            <View className="mt-6">
              <Text
                className="text-lg font-bold text-gray-900 mb-4"
                style={{ fontFamily: "HankenGrotesk_500Medium" }}
              >
                Recommended Discussions
              </Text>

              {discussions.map((discussion) => (
                <View
                  key={discussion.id}
                  className="bg-white px-6 py-6 rounded-2xl border border-gray-100 overflow-hidden shadow mb-4"
                >
                  {/* User Info */}
                  <View className="flex-row items-center justify-between mb-3">
                    <View className="flex-row items-center">
                      <Image
                        source={{ uri: discussion.avatar }}
                        className="w-14 h-14 rounded-full"
                      />
                      <View className="ml-3">
                        <Text
                          className="font-semibold text-base"
                          style={{ fontFamily: "HankenGrotesk_900Black" }}
                        >
                          {discussion.user}
                        </Text>
                        <Text
                          className="text-black text-sm"
                          style={{ fontFamily: "HankenGrotesk_400Regular" }}
                        >
                          {discussion.time}
                        </Text>
                      </View>
                    </View>
                    <View
                      className="flex-row items-center px-4 py-2 rounded-full"
                      style={{
                        backgroundColor: "#AAD4FF",
                      }}
                    >
                      <Text
                        className="text-xs font-bold"
                        style={{
                          fontFamily: "HankenGrotesk_700Bold",
                          color: "#0066CC",
                        }}
                      >
                        {discussion.community}
                      </Text>
                    </View>
                  </View>

                  {/* Content */}
                  <Text
                    className="text-[#000000] text-base mb-3 leading-5"
                    style={{
                      fontFamily: "HankenGrotesk_500Medium",
                    }}
                  >
                    {discussion.content}
                  </Text>

                  {/* Tags */}
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ flexDirection: "row", rowGap: 15 }}
                    className="flex-row gap-2 mb-3"
                  >
                    {discussion.tags.map((tag, index) => (
                      <View
                        key={index}
                        className="border-[1.5px] border-[#6C757D] px-4 py-1 mr-2 rounded-full"
                      >
                        <Text
                          className="text-[#6C757D] text-xs font-bold"
                          style={{
                            fontFamily: "HankenGrotesk_500Medium",
                          }}
                        >
                          {tag}
                        </Text>
                      </View>
                    ))}
                  </ScrollView>

                  <View
                    className="w-full h-[1px] mt-2"
                    style={{ backgroundColor: "#D9D9D9" }}
                  />

                  {/* Actions */}
                  <View className="flex-row items-center gap-4 mt-4">
                    <TouchableOpacity
                      onPress={() => handleLike(discussion.id)}
                      className="flex-row items-center gap-1"
                    >
                      <FontAwesome
                        name={
                          likedDiscussions.has(discussion.id)
                            ? "heart"
                            : "heart-o"
                        }
                        size={18}
                        color={
                          likedDiscussions.has(discussion.id)
                            ? "#FF3333"
                            : "#666666"
                        }
                      />
                      <Text
                        className={`text-sm ${
                          likedDiscussions.has(discussion.id)
                            ? "text-[#FF3333]"
                            : "text-gray-600"
                        }`}
                      >
                        {discussionLikes[discussion.id] ?? discussion.likes}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-row items-center gap-1">
                      <Feather
                        name="message-circle"
                        size={18}
                        color="#666666"
                      />
                      <Text className="text-gray-600 text-sm">
                        {discussion.comments}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </>
        )}

        {/* Explore */}
        {activeTab === "explore" && (
          <>
            {universityCommunities.map((community) => (
              <TouchableOpacity
                key={community.id}
                onPress={() =>
                  router.push({
                    pathname:
                      "/(access)/(stacks)/community-management-flow/community-details/[id]",
                    params: { id: community.id },
                  })
                }
                className="bg-white px-6 py-6 rounded-2xl border border-gray-100 overflow-hidden shadow mb-4"
              >
                <Image
                  source={{ uri: community.image }}
                  className="w-full rounded-2xl"
                  style={{ height: 120 }}
                />

                <View className="mt-4">
                  <Text
                    className="text-lg font-black"
                    style={{
                      fontFamily: "HankenGrotesk_900Black",
                    }}
                  >
                    {community.name}
                  </Text>

                  <Text
                    className="text-sm"
                    style={{
                      fontFamily: "HankenGrotesk_400Regular",
                    }}
                  >
                    {truncate(community.desc, 95)}
                  </Text>

                  <View className="flex-row items-center gap-1 mt-2">
                    <Feather name="users" size={14} color="#000000" />
                    <Text
                      className="text-[#000000] text-xs"
                      style={{
                        fontFamily: "HankenGrotesk_500Medium",
                      }}
                    >
                      {community.members}
                    </Text>
                  </View>
                </View>

                {community.status !== "Active" &&
                  community.status !== "Owned" && (
                    <View className="w-full flex-row items-end justify-end">
                      <TouchableOpacity
                        onPress={() => {}}
                        className="flex-row items-center gap-2 px-6 py-3 rounded-lg"
                        style={{
                          backgroundColor: "#0066CC",
                        }}
                      >
                        <Text
                          className="text-sm"
                          style={{
                            fontFamily: "HankenGrotesk_500Medium",
                            color: "#FFFFFF",
                          }}
                        >
                          Join
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
              </TouchableOpacity>
            ))}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
