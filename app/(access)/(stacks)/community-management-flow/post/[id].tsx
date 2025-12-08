import { Headers } from "@/components/Headers";
import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PostItem } from "../community-details/[id]";

interface Comment {
  id: string;
  user: string;
  avatar: string;
  text: string;
  time: string;
}

const { height } = Dimensions.get("window");

const PostDetail = () => {
  const { id } = useLocalSearchParams();
  const [likedPost, setLikedPost] = useState(false);
  const [postLikes, setPostLikes] = useState(61);
  const [commentText, setCommentText] = useState("");
  const [showAllComments, setShowAllComments] = useState(false);
  const slideAnim = useRef(new Animated.Value(height)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setPostLikes(61); // Initialize from post data
  }, []);

  useEffect(() => {
    if (showAllComments) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: height,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAllComments]);

  // Mock post data - in a real app, this would come from an API
  const post: PostItem = {
    id: id as string,
    type: "post",
    user: "Mike Berger",
    time: "2 hours ago",
    community: "DevFest 2.0",
    content:
      "During the DevFest 2.0 yesterday, we had an amazing session with the co-founder of Google, Mr Irish Yak. His presence alone lit up the entire room, but what truly stood out was the depth of insights he shared about innovation, technology, and the future of digital transformation. From the early days of building Google to the company's continuous impact on billions of lives today, he walked us through stories, challenges, and bold decisions that shaped one of the world's most influential tech companies. The energy in the hall was unmatched. ✨ Developers, students, and tech enthusiasts left feeling inspired, motivated, and challenged to build solutions that can create real impact in their communities and beyond. Truly, this was a day to remember – one that will keep fueling our drive for innovation and creativity in tech.",
    tags: ["#DevTechFest", "#Google"],
    likes: 61,
    comments: 30,
    avatar:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHVzZXJ8ZW58MHx8MHx8fDA%3D",
    images: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
    ],
  };

  const comments: Comment[] = [
    {
      id: "1",
      user: "Augustus Anna",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      text: "Oh! Nice one",
      time: "28 mins ago",
    },
    {
      id: "2",
      user: "Nana Irish",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      text: "It was really a nice experience",
      time: "20 mins ago",
    },
  ];

  // Generate all comments (30 total as per post.comments)
  const allComments: Comment[] = [
    ...comments,
    {
      id: "3",
      user: "Sarah Johnson",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      text: "This event sounds incredible! Wish I could have been there.",
      time: "1 hour ago",
    },
    {
      id: "4",
      user: "Michael Chen",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      text: "The insights shared were mind-blowing. Thanks for sharing!",
      time: "1 hour ago",
    },
    {
      id: "5",
      user: "Emily Rodriguez",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      text: "DevFest 2.0 was absolutely amazing! The energy was unmatched.",
      time: "2 hours ago",
    },
    {
      id: "6",
      user: "David Kim",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      text: "Can't wait for the next one! This was inspiring.",
      time: "2 hours ago",
    },
    {
      id: "7",
      user: "Lisa Wang",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      text: "The Google co-founder's talk was the highlight of the event!",
      time: "3 hours ago",
    },
    {
      id: "8",
      user: "James Taylor",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      text: "Great post! Really captures the essence of the event.",
      time: "3 hours ago",
    },
    {
      id: "9",
      user: "Maria Garcia",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      text: "The networking opportunities were fantastic too!",
      time: "4 hours ago",
    },
    {
      id: "10",
      user: "Robert Brown",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      text: "Innovation and creativity in tech - exactly what we need!",
      time: "4 hours ago",
    },
    {
      id: "11",
      user: "Jennifer Lee",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      text: "This event has motivated me to build something impactful.",
      time: "5 hours ago",
    },
    {
      id: "12",
      user: "Thomas Anderson",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      text: "The stories shared were truly inspiring. Thank you!",
      time: "5 hours ago",
    },
    {
      id: "13",
      user: "Amanda White",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      text: "DevFest 2.0 exceeded all expectations!",
      time: "6 hours ago",
    },
    {
      id: "14",
      user: "Christopher Martinez",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      text: "The future of digital transformation looks bright!",
      time: "6 hours ago",
    },
    {
      id: "15",
      user: "Jessica Thompson",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      text: "Amazing insights from one of the tech industry's legends!",
      time: "7 hours ago",
    },
    {
      id: "16",
      user: "Daniel Wilson",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      text: "The energy in the hall was truly unmatched!",
      time: "7 hours ago",
    },
    {
      id: "17",
      user: "Olivia Davis",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      text: "This is exactly the kind of inspiration we need in tech!",
      time: "8 hours ago",
    },
    {
      id: "18",
      user: "Matthew Harris",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      text: "Great write-up! Captures the essence perfectly.",
      time: "8 hours ago",
    },
    {
      id: "19",
      user: "Sophia Clark",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      text: "The challenges and bold decisions shared were eye-opening!",
      time: "9 hours ago",
    },
    {
      id: "20",
      user: "Andrew Lewis",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      text: "DevFest 2.0 was a day to remember!",
      time: "9 hours ago",
    },
    {
      id: "21",
      user: "Isabella Walker",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      text: "The impact on billions of lives - what an incredible journey!",
      time: "10 hours ago",
    },
    {
      id: "22",
      user: "Ryan Hall",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      text: "Innovation and creativity - the driving forces of tech!",
      time: "10 hours ago",
    },
    {
      id: "23",
      user: "Emma Young",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      text: "This event has fueled my drive for innovation!",
      time: "11 hours ago",
    },
    {
      id: "24",
      user: "Nathan King",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      text: "The stories from the early days of Google were fascinating!",
      time: "11 hours ago",
    },
    {
      id: "25",
      user: "Grace Wright",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      text: "Truly inspiring! Can't wait to apply these insights.",
      time: "12 hours ago",
    },
    {
      id: "26",
      user: "Lucas Lopez",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      text: "The depth of insights shared was remarkable!",
      time: "12 hours ago",
    },
    {
      id: "27",
      user: "Chloe Hill",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      text: "DevFest 2.0 was an incredible experience!",
      time: "13 hours ago",
    },
    {
      id: "28",
      user: "Ethan Scott",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      text: "Building solutions that create real impact - that's the goal!",
      time: "13 hours ago",
    },
    {
      id: "29",
      user: "Mia Green",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      text: "The presence of Mr Irish Yak lit up the entire room!",
      time: "14 hours ago",
    },
    {
      id: "30",
      user: "Alexander Adams",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      text: "What an amazing day! Thanks for sharing this experience.",
      time: "14 hours ago",
    },
  ];

  const handleLike = () => {
    setLikedPost((prev) => {
      const newLiked = !prev;
      setPostLikes((prevLikes) => (newLiked ? prevLikes + 1 : prevLikes - 1));
      return newLiked;
    });
  };

  const handleSendComment = () => {
    if (commentText.trim()) {
      // In a real app, this would send the comment to the API
      setCommentText("");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />

      {/* Header */}
      <View className="mt-6 mb-4 px-6">
        <Headers text="Post" onPress={() => router.back()} />
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Main Post Card */}
        <View className="bg-white py-6 rounded-2xl border border-gray-100 overflow-hidden shadow mb-4 mx-6">
          {/* User Info */}
          <View className="flex-row items-center mb-3 px-6">
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
          <View className="flex-row gap-2 mb-3 px-6">
            {post.tags.map((tag: string, index: number) => (
              <View
                key={index}
                className="border-[1.5px] border-[#6C757D] px-4 py-1 rounded-full"
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
          </View>

          {/* Image */}
          {post.images && post.images.length > 0 && (
            <View className="mb-3">
              <Image
                source={{ uri: post.images[0] }}
                className="w-full"
                style={{ height: 200 }}
                resizeMode="cover"
              />
            </View>
          )}

          {/* Engagement Metrics */}
          <View className="flex-row items-center gap-4 px-6">
            <TouchableOpacity
              onPress={handleLike}
              className="flex-row items-center gap-1"
            >
              <FontAwesome
                name={likedPost ? "heart" : "heart-o"}
                size={18}
                color={likedPost ? "#FF3333" : "#666666"}
              />
              <Text
                className={`text-sm ${
                  likedPost ? "text-[#FF3333]" : "text-gray-600"
                }`}
              >
                {postLikes}
              </Text>
            </TouchableOpacity>
            <View className="flex-row items-center gap-1">
              <Feather name="message-circle" size={18} color="#666666" />
              <Text className="text-gray-600 text-sm">{post.comments}</Text>
            </View>
          </View>
        </View>

        {/* Comments Card */}
        <View className="bg-white py-6 rounded-2xl border border-gray-100 overflow-hidden shadow mb-4 mx-6">
          {/* Comments Header */}
          <View className="flex-row items-center justify-between mb-4 px-6">
            <View className="flex-row items-center gap-2">
              <Text
                className="font-semibold text-base"
                style={{ fontFamily: "HankenGrotesk_900Black" }}
              >
                Comments
              </Text>
              <View className="bg-black px-3 py-1 rounded-full">
                <Text
                  className="text-white text-xs font-bold"
                  style={{ fontFamily: "HankenGrotesk_700Bold" }}
                >
                  {post.comments}
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => setShowAllComments(true)}>
              <Text
                className="text-[#0066CC] text-sm font-bold"
                style={{ fontFamily: "HankenGrotesk_700Bold" }}
              >
                View All
              </Text>
            </TouchableOpacity>
          </View>

          {/* Individual Comments */}
          <View className="px-6 gap-4 mb-4">
            {comments.map((comment) => (
              <View key={comment.id} className="flex-row gap-3">
                <Image
                  source={{ uri: comment.avatar }}
                  className="w-10 h-10 rounded-full"
                />
                <View className="flex-1">
                  <Text
                    className="font-semibold text-sm mb-1"
                    style={{ fontFamily: "HankenGrotesk_900Black" }}
                  >
                    {comment.user}
                  </Text>
                  <Text
                    className="text-black text-sm mb-1"
                    style={{ fontFamily: "HankenGrotesk_400Regular" }}
                  >
                    {comment.text}
                  </Text>
                  <Text
                    className="text-gray-500 text-xs"
                    style={{ fontFamily: "HankenGrotesk_400Regular" }}
                  >
                    {comment.time}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {/* Comment Input Field */}
          <View className="flex-row items-center gap-3 px-6">
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
              }}
              className="w-10 h-10 rounded-full"
            />
            <View className="flex-1 flex-row items-center bg-[#F8F9FA] rounded-xl px-4 py-2">
              <TextInput
                placeholder="Comment as [User Name]"
                placeholderTextColor="#D9D9D9"
                value={commentText}
                onChangeText={setCommentText}
                className="flex-1 text-sm"
                style={{ fontFamily: "HankenGrotesk_500Medium" }}
              />
              <TouchableOpacity
                onPress={handleSendComment}
                className="w-10 h-10 bg-[#0066CC] rounded-full items-center justify-center"
              >
                <AntDesign
                  name="send"
                  size={14}
                  color="#FFFFFF"
                  style={{ marginLeft: 2 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* All Comments Modal */}
      <Modal
        visible={showAllComments}
        transparent={true}
        animationType="none"
        onRequestClose={() => setShowAllComments(false)}
      >
        <View className="flex-1">
          <Animated.View
            style={{
              flex: 1,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              opacity: fadeAnim,
            }}
          >
            <TouchableOpacity
              style={{ flex: 1 }}
              activeOpacity={1}
              onPress={() => setShowAllComments(false)}
            />
          </Animated.View>

          <Animated.View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: "white",
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              maxHeight: "90%",
              transform: [{ translateY: slideAnim }],
              shadowColor: "#000",
              shadowOffset: { width: 0, height: -4 },
              shadowOpacity: 0.1,
              shadowRadius: 12,
              elevation: 20,
            }}
          >
            {/* Handle Bar */}
            <View className="items-center pt-3 pb-2">
              <View className="w-10 h-1 bg-gray-300 rounded-full" />
            </View>

            {/* Header */}
            <View className="flex-row items-center justify-between px-6 py-4 border-b border-gray-100">
              <View className="flex-row items-center gap-2">
                <Text
                  className="font-semibold text-lg"
                  style={{ fontFamily: "HankenGrotesk_900Black" }}
                >
                  All Comments
                </Text>
                <View className="bg-black px-3 py-1 rounded-full">
                  <Text
                    className="text-white text-xs font-bold"
                    style={{ fontFamily: "HankenGrotesk_700Bold" }}
                  >
                    {post.comments}
                  </Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => setShowAllComments(false)}>
                <Feather name="x" size={24} color="#666666" />
              </TouchableOpacity>
            </View>

            {/* Comments List */}
            <ScrollView
              className="flex-1"
              contentContainerStyle={{ paddingBottom: 20 }}
              showsVerticalScrollIndicator={false}
            >
              <View className="px-6 pt-4 gap-4">
                {allComments.map((comment) => (
                  <View key={comment.id} className="flex-row gap-3">
                    <Image
                      source={{ uri: comment.avatar }}
                      className="w-10 h-10 rounded-full"
                    />
                    <View className="flex-1">
                      <View className="flex-row items-center gap-2 mb-1">
                        <Text
                          className="font-semibold text-sm"
                          style={{ fontFamily: "HankenGrotesk_900Black" }}
                        >
                          {comment.user}
                        </Text>
                        <Text
                          className="text-gray-500 text-xs"
                          style={{ fontFamily: "HankenGrotesk_400Regular" }}
                        >
                          {comment.time}
                        </Text>
                      </View>
                      <Text
                        className="text-black text-sm leading-5"
                        style={{ fontFamily: "HankenGrotesk_400Regular" }}
                      >
                        {comment.text}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </ScrollView>

            {/* Comment Input Field */}
            <View className="flex-row items-center gap-3 px-6 py-4 border-t border-gray-100 bg-white">
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
                }}
                className="w-10 h-10 rounded-full"
              />
              <View className="flex-1 flex-row items-center bg-[#F8F9FA] rounded-xl px-4 py-2">
                <TextInput
                  placeholder="Add a comment..."
                  placeholderTextColor="#D9D9D9"
                  value={commentText}
                  onChangeText={setCommentText}
                  className="flex-1 text-sm"
                  style={{ fontFamily: "HankenGrotesk_500Medium" }}
                />
                <TouchableOpacity
                  onPress={handleSendComment}
                  className="w-10 h-10 bg-[#0066CC] rounded-full items-center justify-center"
                >
                  <AntDesign
                    name="send"
                    size={14}
                    color="#FFFFFF"
                    style={{ marginLeft: 2 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default PostDetail;
