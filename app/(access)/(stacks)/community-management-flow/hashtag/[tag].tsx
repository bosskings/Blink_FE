import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { DiscussionCard } from "@/components/cards/DiscussionCard";
import { useTrendingHashtags } from "@/services";

export default function HashtagFeed() {
  const { tag } = useLocalSearchParams<{ tag: string }>();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [likedDiscussions, setLikedDiscussions] = useState<Set<string>>(new Set());
  const { data: trendingData } = useTrendingHashtags();
  const relatedHashtags = trendingData?.slice(0, 5) || [];

  const toggleLikeDiscussion = (discussionId: string) => {
    setLikedDiscussions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(discussionId)) {
        newSet.delete(discussionId);
      } else {
        newSet.add(discussionId);
      }
      return newSet;
    });
  };

  const currentTag = tag?.startsWith("#") ? tag : `#${tag}`;

  const posts = [
    {
      id: "1",
      user: "Alexa Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80",
      time: "2 hrs ago",
      community: "Tech Enthusiasts",
      content: `Just got my hands on the new equipment. The performance leap is incredible! Anyone else upgraded recently? ${currentTag}`,
      likes: 24,
      comments: 8,
      tags: [currentTag, "#tech", "#upgrade"],
    },
    {
      id: "2",
      user: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80",
      time: "5 hrs ago",
      community: "Tech Enthusiasts",
      content: `I've been using this for a week now. The battery life is slightly better but the screen is amazing! ${currentTag}`,
      likes: 15,
      comments: 3,
      tags: [currentTag, "#review"],
    },
    {
      id: "3",
      user: "Sarah Smith",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80",
      time: "1 day ago",
      community: "General",
      content: `Can someone recommend good resources for learning more about this? ${currentTag}`,
      likes: 42,
      comments: 12,
      tags: [currentTag, "#help", "#learning"],
    }
  ];

  const filteredPosts = posts.filter(post => 
    searchQuery === "" || 
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />

      {/* Header */}
      <View className="flex-row items-center px-6 py-4 border-b border-gray-100">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center mr-4"
        >
          <Ionicons name="arrow-back" size={20} color="#000" />
        </TouchableOpacity>
        <Text className="text-xl font-bold">{currentTag}</Text>
      </View>

      {/* Search Bar */}
      <View className="px-6 mt-4 mb-2">
        <View className="flex-row items-center bg-[#F8F9FA] rounded-xl border border-[#D9D9D9] px-3 py-2">
          <Ionicons name="search-outline" size={16} color="#6C757D" />
          <TextInput
            placeholder={`Search in ${currentTag}...`}
            placeholderTextColor="#D9D9D9"
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="flex-1 ml-2 text-[13px]"
            style={{ color: "#000000" }}
          />
          {searchQuery !== "" && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle-outline" size={16} color="#6C757D" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Related Hashtags */}
      <View className="mb-4">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24 }}
        >
          {relatedHashtags.map((hashtag: any) => (
            <TouchableOpacity
              key={hashtag.id}
              className="bg-[#E6F2FF] px-4 py-2 rounded-full mr-3 border border-[#0066CC]/20"
              onPress={() => {
                setSearchQuery("");
                router.push({
                  pathname: "/(access)/(stacks)/community-management-flow/hashtag/[tag]",
                  params: { tag: hashtag.tag }
                });
              }}
            >
              <Text className="text-[#0066CC] font-semibold">{hashtag.tag}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Posts Feed */}
      <ScrollView className="flex-1 px-6 pt-2" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <Text className="font-bold text-gray-800 mb-4">{filteredPosts.length} posts for {currentTag}</Text>
        
        {filteredPosts.map((post) => (
          <DiscussionCard
            key={post.id}
            item={post}
            likedDiscussions={Array.from(likedDiscussions)}
            toggleLikeDiscussion={toggleLikeDiscussion}
          />
        ))}
        {filteredPosts.length === 0 && (
          <View className="items-center justify-center py-10">
            <Text className="text-gray-500">No posts found matching your search.</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
