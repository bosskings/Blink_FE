import { Feather, FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { PostItem } from "../community-details/[id]";

interface PostCardProps {
  post: PostItem;
}

const PostCard = ({ post }: PostCardProps) => {
  const [likedPost, setLikedPost] = useState<Set<string>>(new Set());
  const [postLikes, setPostLikes] = useState<Record<string, number>>({});

  // Initialize post likes from post data
  useEffect(() => {
    setPostLikes({ [post.id]: post.likes });
  }, [post]);

  const handleLike = (postId: string, e?: any) => {
    if (e) {
      e.stopPropagation();
    }
    setLikedPost((prev) => {
      const newSet = new Set(prev);
      const isLiked = newSet.has(postId);

      if (isLiked) {
        newSet.delete(postId);
        setPostLikes((prevLikes) => ({
          ...prevLikes,
          [postId]: (prevLikes[postId] || 0) - 1,
        }));
      } else {
        newSet.add(postId);
        setPostLikes((prevLikes) => ({
          ...prevLikes,
          [postId]: (prevLikes[postId] || 0) + 1,
        }));
      }

      return newSet;
    });
  };

  const handlePostPress = () => {
    router.push({
      pathname: "/(access)/(stacks)/community-management-flow/post/[id]",
      params: { id: post.id },
    });
  };

  return (
    <Pressable
      key={post.id}
      onPress={handlePostPress}
      className="bg-white py-6 rounded-2xl border border-gray-100 overflow-hidden shadow mb-4"
    >
      {/* User Info */}
      <View className="flex-row items-center justify-between mb-3 px-6">
        <View className="flex-row items-center">
          <Image
            source={{ uri: post.avatar }}
            className="w-14 h-14 rounded-full"
          />
          <View className="ml-3">
            <Text
              className="font-semibold text-base"
              style={{ fontFamily: "HankenGrotesk_900Black" }}
            >
              {post.user}
            </Text>
            <Text
              className="text-black text-sm"
              style={{ fontFamily: "HankenGrotesk_400Regular" }}
            >
              {post.time}
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
            {post.community}
          </Text>
        </View>
      </View>

      {/* Content */}
      <Text
        className="text-[#000000] text-base mb-3 leading-5 px-6"
        style={{
          fontFamily: "HankenGrotesk_500Medium",
        }}
      >
        {post.content}
      </Text>

      {/* Tags */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexDirection: "row", rowGap: 15 }}
        className="flex-row gap-2 mb-3 px-6"
      >
        {post.tags.map((tag: string, index: number) => (
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

      {/* Images */}
      {post.images && post.images.length > 0 && (
        <View className="">
          {post.images.length === 1 ? (
            // Single image
            <Image
              source={{ uri: post.images[0] }}
              className="w-full h-48"
              resizeMode="cover"
            />
          ) : post.images.length === 2 ? (
            // Two images side by side
            <View className="flex-row gap-2">
              <Image
                source={{ uri: post.images[0] }}
                className="flex-1 h-48"
                resizeMode="cover"
              />
              <Image
                source={{ uri: post.images[1] }}
                className="flex-1 h-48"
                resizeMode="cover"
              />
            </View>
          ) : post.images.length === 3 ? (
            // Three images: one full width, two below
            <View className="gap-2">
              <Image
                source={{ uri: post.images[0] }}
                className="w-full h-48"
                resizeMode="cover"
              />
              <View className="flex-row gap-2">
                <Image
                  source={{ uri: post.images[1] }}
                  className="flex-1 h-48"
                  resizeMode="cover"
                />
                <Image
                  source={{ uri: post.images[2] }}
                  className="flex-1 h-48"
                  resizeMode="cover"
                />
              </View>
            </View>
          ) : (
            // Four or more images: 2x2 grid with overlay
            <View className="gap-2">
              <View className="flex-row gap-2">
                <View className="flex-1 relative">
                  <Image
                    source={{ uri: post.images[0] }}
                    className="w-full h-40"
                    resizeMode="cover"
                  />
                </View>
                <View className="flex-1 relative">
                  <Image
                    source={{ uri: post.images[1] }}
                    className="w-full h-40"
                    resizeMode="cover"
                  />
                </View>
              </View>
              <View className="flex-row gap-2">
                <View className="flex-1 relative">
                  <Image
                    source={{ uri: post.images[2] }}
                    className="w-full h-40"
                    resizeMode="cover"
                  />
                </View>
                <View className="flex-1 relative">
                  <Image
                    source={{ uri: post.images[3] }}
                    className="w-full h-40"
                    resizeMode="cover"
                  />
                  {post.images.length > 4 && (
                    <View className="absolute inset-0 bg-black/50 items-center justify-center">
                      <Text
                        className="text-white text-lg font-bold"
                        style={{ fontFamily: "HankenGrotesk_700Bold" }}
                      >
                        +{post.images.length - 4}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          )}
        </View>
      )}
      <View
        className="w-full h-[1px] mt-2"
        style={{ backgroundColor: "#D9D9D9" }}
      />

      {/* Actions */}
      <View className="flex-row items-center gap-4 mt-4 px-6">
        <TouchableOpacity
          onPress={(e) => handleLike(post.id, e)}
          className="flex-row items-center gap-1"
        >
          <FontAwesome
            name={likedPost.has(post.id) ? "heart" : "heart-o"}
            size={18}
            color={likedPost.has(post.id) ? "#FF3333" : "#666666"}
          />
          <Text
            className={`text-sm ${
              likedPost.has(post.id) ? "text-[#FF3333]" : "text-gray-600"
            }`}
          >
            {postLikes[post.id] ?? post.likes}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={(e) => {
            e.stopPropagation();
            handlePostPress();
          }}
          className="flex-row items-center gap-1"
        >
          <Feather name="message-circle" size={18} color="#666666" />
          <Text className="text-gray-600 text-sm">{post.comments}</Text>
        </TouchableOpacity>
      </View>
    </Pressable>
  );
};

export default PostCard;
