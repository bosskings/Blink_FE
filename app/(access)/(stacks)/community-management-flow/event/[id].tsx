import { Headers } from "@/components/Headers";
import { AntDesign, Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
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
import { EventItem } from "../community-details/[id]";

interface Comment {
  id: string;
  user: string;
  avatar: string;
  text: string;
  time: string;
}

const { height } = Dimensions.get("window");

const EventDetail = () => {
  const { id } = useLocalSearchParams();
  const [likedEvent, setLikedEvent] = useState(false);
  const [eventLikes, setEventLikes] = useState(45);
  const [going, setGoing] = useState(false);
  const [goingCount, setGoingCount] = useState(128);
  const [commentText, setCommentText] = useState("");
  const [showAllComments, setShowAllComments] = useState(false);
  const slideAnim = useRef(new Animated.Value(height)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setEventLikes(45);
    setGoingCount(128);
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

  // Mock event data - in a real app, this would come from an API
  const event: EventItem = {
    id: id as string,
    title: "Tech Innovation Summit",
    date: "Nov 5, 2023",
    time: "9:00AM - 5:00PM",
    location: "Main Auditorium",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
    category: "Conference",
    community: "Covenant University",
    description:
      "Join industry leaders and innovators for a day of tech talks, networking, and startup pitches. This summit brings together the brightest minds in technology to discuss the future of innovation, artificial intelligence, blockchain, and sustainable tech solutions. Network with professionals, attend hands-on workshops, and discover the latest trends shaping our digital world. Don't miss this opportunity to connect with like-minded individuals and expand your professional network.",
    images: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop",
    ],
  };

  const comments: Comment[] = [
    {
      id: "1",
      user: "Sarah Johnson",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      text: "This looks amazing! Can't wait to attend.",
      time: "2 hours ago",
    },
    {
      id: "2",
      user: "Michael Chen",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      text: "Will there be parking available?",
      time: "1 hour ago",
    },
    {
      id: "3",
      user: "Emily Rodriguez",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      text: "Looking forward to the networking session!",
      time: "45 mins ago",
    },
  ];

  // Generate all comments (30 total)
  const allComments: Comment[] = [
    ...comments,
    {
      id: "4",
      user: "David Kim",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      text: "Is registration required?",
      time: "3 hours ago",
    },
    {
      id: "5",
      user: "Lisa Wang",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      text: "This is exactly what I needed!",
      time: "4 hours ago",
    },
    {
      id: "6",
      user: "James Taylor",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      text: "Can students attend?",
      time: "5 hours ago",
    },
    {
      id: "7",
      user: "Maria Garcia",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      text: "Will there be food provided?",
      time: "6 hours ago",
    },
    {
      id: "8",
      user: "Robert Brown",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      text: "Excited to learn about AI!",
      time: "7 hours ago",
    },
    {
      id: "9",
      user: "Jennifer Lee",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      text: "What time does it start?",
      time: "8 hours ago",
    },
    {
      id: "10",
      user: "Thomas Anderson",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      text: "Looking forward to this event!",
      time: "9 hours ago",
    },
    {
      id: "11",
      user: "Amanda White",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      text: "Will there be certificates?",
      time: "10 hours ago",
    },
    {
      id: "12",
      user: "Christopher Martinez",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      text: "This is going to be great!",
      time: "11 hours ago",
    },
    {
      id: "13",
      user: "Jessica Thompson",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      text: "Can I bring a friend?",
      time: "12 hours ago",
    },
    {
      id: "14",
      user: "Daniel Wilson",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      text: "What's the dress code?",
      time: "13 hours ago",
    },
    {
      id: "15",
      user: "Olivia Davis",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      text: "Is it free to attend?",
      time: "14 hours ago",
    },
    {
      id: "16",
      user: "Matthew Harris",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      text: "Will there be Wi-Fi?",
      time: "15 hours ago",
    },
    {
      id: "17",
      user: "Sophia Clark",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      text: "Looking forward to networking!",
      time: "16 hours ago",
    },
    {
      id: "18",
      user: "Andrew Lewis",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      text: "This is perfect timing!",
      time: "17 hours ago",
    },
    {
      id: "19",
      user: "Isabella Walker",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      text: "Can't wait for the workshops!",
      time: "18 hours ago",
    },
    {
      id: "20",
      user: "Ryan Hall",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      text: "Will there be refreshments?",
      time: "19 hours ago",
    },
    {
      id: "21",
      user: "Emma Young",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      text: "This sounds amazing!",
      time: "20 hours ago",
    },
    {
      id: "22",
      user: "Nathan King",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      text: "What topics will be covered?",
      time: "21 hours ago",
    },
    {
      id: "23",
      user: "Grace Wright",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      text: "Is there a registration deadline?",
      time: "22 hours ago",
    },
    {
      id: "24",
      user: "Lucas Lopez",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      text: "Looking forward to this!",
      time: "23 hours ago",
    },
    {
      id: "25",
      user: "Chloe Hill",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      text: "Will there be live streaming?",
      time: "1 day ago",
    },
    {
      id: "26",
      user: "Ethan Scott",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      text: "This is going to be informative!",
      time: "1 day ago",
    },
    {
      id: "27",
      user: "Mia Green",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      text: "Can I get a schedule?",
      time: "1 day ago",
    },
    {
      id: "28",
      user: "Alexander Adams",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      text: "Excited to attend!",
      time: "1 day ago",
    },
    {
      id: "29",
      user: "Ava Martinez",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      text: "Will there be Q&A sessions?",
      time: "1 day ago",
    },
    {
      id: "30",
      user: "Noah Johnson",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
      text: "This is perfect for my career!",
      time: "2 days ago",
    },
  ];

  const handleLike = () => {
    setLikedEvent((prev) => {
      const newLiked = !prev;
      setEventLikes((prevLikes) => (newLiked ? prevLikes + 1 : prevLikes - 1));
      return newLiked;
    });
  };

  const handleGoing = () => {
    setGoing((prev) => {
      const newGoing = !prev;
      setGoingCount((prevCount) => (newGoing ? prevCount + 1 : prevCount - 1));
      return newGoing;
    });
  };

  const handleShare = () => {
    // In a real app, this would open the native share dialog
    console.log("Share event:", event.id);
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
        <Headers text="Event" onPress={() => router.back()} />
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Event Image */}
        <Image
          source={{ uri: event.image }}
          className="w-full h-64"
          resizeMode="cover"
        />

        {/* Event Details Card */}
        <View className="bg-white py-6 rounded-2xl border border-gray-100 overflow-hidden shadow mb-4 mx-6 -mt-8">
          {/* Event Title and Category */}
          <View className="px-6 mb-4">
            <View className="flex-row items-center justify-between mb-2">
              <View className="bg-[#0066CC] rounded-full px-4 py-2">
                <Text
                  className="text-white text-xs font-bold"
                  style={{ fontFamily: "HankenGrotesk_700Bold" }}
                >
                  {event.category}
                </Text>
              </View>
              <TouchableOpacity onPress={handleShare}>
                <Ionicons name="share-outline" size={24} color="#0066CC" />
              </TouchableOpacity>
            </View>
            <Text
              className="text-2xl text-black mb-3"
              style={{ fontFamily: "HankenGrotesk_900Black" }}
            >
              {event.title}
            </Text>
          </View>

          {/* Date and Time */}
          <View className="px-6 mb-4">
            <View className="flex-row items-center gap-3 mb-3">
              <View className="bg-[#E6F2FF] rounded-xl p-3">
                <Ionicons name="calendar-outline" size={24} color="#0066CC" />
              </View>
              <View className="flex-1">
                <Text
                  className="text-sm text-[#6C757D] mb-1"
                  style={{ fontFamily: "HankenGrotesk_400Regular" }}
                >
                  Date & Time
                </Text>
                <Text
                  className="text-base text-black"
                  style={{ fontFamily: "HankenGrotesk_700Bold" }}
                >
                  {event.date}
                </Text>
                <Text
                  className="text-sm text-[#6C757D]"
                  style={{ fontFamily: "HankenGrotesk_400Regular" }}
                >
                  {event.time}
                </Text>
              </View>
            </View>

            {/* Location */}
            <View className="flex-row items-center gap-3">
              <View className="bg-[#E6F2FF] rounded-xl p-3">
                <Ionicons name="location-outline" size={24} color="#0066CC" />
              </View>
              <View className="flex-1">
                <Text
                  className="text-sm text-[#6C757D] mb-1"
                  style={{ fontFamily: "HankenGrotesk_400Regular" }}
                >
                  Location
                </Text>
                <Text
                  className="text-base text-black"
                  style={{ fontFamily: "HankenGrotesk_700Bold" }}
                >
                  {event.location}
                </Text>
              </View>
            </View>
          </View>

          {/* Description */}
          {event.description && (
            <View className="px-6 mb-4">
              <Text
                className="text-sm text-[#6C757D] mb-2"
                style={{ fontFamily: "HankenGrotesk_700Bold" }}
              >
                About This Event
              </Text>
              <Text
                className="text-base text-black leading-6"
                style={{ fontFamily: "HankenGrotesk_400Regular" }}
              >
                {event.description}
              </Text>
            </View>
          )}

          {/* Additional Images */}
          {event.images && event.images.length > 1 && (
            <View className="px-6 mb-4">
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 10 }}
                className="flex-row gap-3"
              >
                {event.images.slice(1).map((imageUri, index) => (
                  <Image
                    key={index}
                    source={{ uri: imageUri }}
                    className="w-32 h-32 rounded-xl"
                    resizeMode="cover"
                  />
                ))}
              </ScrollView>
            </View>
          )}

          {/* Engagement Metrics */}
          <View className="flex-row items-center justify-between px-6 pt-4 border-t border-gray-100">
            <TouchableOpacity
              onPress={handleLike}
              className="flex-row items-center gap-2"
            >
              <FontAwesome
                name={likedEvent ? "heart" : "heart-o"}
                size={20}
                color={likedEvent ? "#FF3333" : "#666666"}
              />
              <Text
                className={`text-base ${
                  likedEvent ? "text-[#FF3333]" : "text-gray-600"
                }`}
                style={{ fontFamily: "HankenGrotesk_600SemiBold" }}
              >
                {eventLikes}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleGoing}
              className={`flex-row items-center gap-2 px-4 py-2 rounded-full ${
                going ? "bg-[#0066CC]" : "bg-[#E6F2FF]"
              }`}
            >
              <Ionicons
                name={going ? "checkmark-circle" : "checkmark-circle-outline"}
                size={20}
                color={going ? "#FFFFFF" : "#0066CC"}
              />
              <Text
                className={`text-base ${
                  going ? "text-white" : "text-[#0066CC]"
                }`}
                style={{ fontFamily: "HankenGrotesk_700Bold" }}
              >
                {going ? "Going" : "Interested"} ({goingCount})
              </Text>
            </TouchableOpacity>

            <View className="flex-row items-center gap-2">
              <Feather name="message-circle" size={20} color="#666666" />
              <Text
                className="text-gray-600 text-base"
                style={{ fontFamily: "HankenGrotesk_600SemiBold" }}
              >
                {comments.length}
              </Text>
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
                  {allComments.length}
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
                    {allComments.length}
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

export default EventDetail;
