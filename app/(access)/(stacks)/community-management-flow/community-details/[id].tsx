import { Headers } from "@/components/Headers";
import { truncate } from "@/utils/truncate";
import {
  AntDesign,
  Entypo,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ExpandableDescription from "../_components/ExpandableDescription";
import ListingCard from "../_components/listing-card";
import PostCard from "../_components/post-card";

export type PostItem = {
  id: string;
  type: "post";
  user: string;
  time: string;
  community: string;
  content: string;
  tags: string[];
  likes: number;
  comments: number;
  avatar: string;
  images?: string[];
  videos?: string[];
};

export type ListingItem = {
  id: string;
  type: "listing";
  title: string;
  price: string;
  community: string;
  description: string;
  timePosted: string;
  distance: string;
  image: string;
  tag: string;
  images: string[];
};

export type CommunityPost = PostItem | ListingItem;

export type EventItem = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  image: string;
  category: string;
  community: string;
  description?: string;
  images?: string[];
  videos?: string[];
};

const CommunityDetail = () => {
  const { id } = useLocalSearchParams();
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState<string>("");
  const [reportDescription, setReportDescription] = useState<string>("");

  const reportReasons = [
    "Harassment or Bullying",
    "Spam or Misleading Content",
    "Hate Speech or Discrimination",
    "Inappropriate Content",
    "Violence or Threats",
    "Other",
  ];

  const handleReportSubmit = () => {
    // Handle report submission logic here
    console.log("Report submitted:", {
      communityId: id,
      reason: reportReason,
      description: reportDescription,
    });
    // Close modal and reset form
    setShowReportModal(false);
    setReportReason("");
    setReportDescription("");
    // You can add a success toast/notification here
  };

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

  const posts: CommunityPost[] = [
    {
      id: "1",
      type: "post",
      user: "Mike Berger",
      time: "2 hours ago",
      community: "Convenant University",
      content: "Anyone with ENG 201 past question?\nExams are coming fast 🔥",
      tags: ["#ExamSeason", "#StudyTips"],
      likes: 124,
      comments: 67,
      avatar:
        "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHVzZXJ8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: "2",
      type: "listing",
      title: "Road Bicycle",
      price: "₦45,000",
      community: "Convenant University",
      description:
        "Great condition road bicycle, perfect for city rides and weekend adventures. Recently serviced with new brake pads and chain. Includes helmet",
      timePosted: "2h ago",
      distance: "0.7km away",
      image:
        "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&h=600&fit=crop",
      tag: "SALE",
      images: [
        "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800",
        "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=800",
        "https://images.unsplash.com/photo-1511994298241-608e28f14fde?w=800",
      ],
    },
    {
      id: "3",
      type: "post",
      user: "Mike Berger",
      time: "2 hours ago",
      community: "Convenant University",
      content: "Anyone with ENG 201 past question?\nExams are coming fast 🔥",
      images: [
        "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800",
      ],
      tags: ["#ExamSeason", "#StudyTips"],
      likes: 124,
      comments: 67,
      avatar:
        "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx8fHx8MA%3D",
    },
    {
      id: "4",
      type: "listing",
      title: "Office Chair",
      price: "₦35,000",
      community: "Convenant University",
      description: "Ergonomic office chair with lumbar support",
      distance: "1.2km away",
      timePosted: "1d ago",
      image:
        "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800&h=600&fit=crop",
      tag: "SERVICE",
      images: [
        "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=800&h=600&fit=crop",
      ],
    },
  ];

  const events: EventItem[] = [
    {
      id: "1",
      title: "Urban Garden Workshop",
      date: "Oct 26, 2023",
      time: "10:00AM - 12:00PM",
      location: "Community Park",
      image:
        "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop",
      category: "Workshop",
      community: "Covenant University",
      description:
        "Learn urban gardening techniques and sustainable practices. Hands-on workshop with expert guidance.",
    },
    {
      id: "2",
      title: "Tech Innovation Summit",
      date: "Nov 5, 2023",
      time: "9:00AM - 5:00PM",
      location: "Main Auditorium",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
      category: "Conference",
      community: "Covenant University",
      description:
        "Join industry leaders and innovators for a day of tech talks, networking, and startup pitches.",
    },
    {
      id: "3",
      title: "Campus Food Festival",
      date: "Oct 30, 2023",
      time: "12:00PM - 6:00PM",
      location: "Student Center Plaza",
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop",
      category: "Festival",
      community: "Covenant University",
      description:
        "Taste delicious food from various vendors. Live music, games, and fun activities for everyone.",
    },
    {
      id: "4",
      title: "Study Group Meetup",
      date: "Oct 28, 2023",
      time: "2:00PM - 4:00PM",
      location: "Library Study Room 3",
      image:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop",
      category: "Study",
      community: "Covenant University",
      description:
        "Collaborative study session for exam preparation. Bring your notes and study materials.",
    },
    {
      id: "5",
      title: "Basketball Tournament",
      date: "Nov 10, 2023",
      time: "3:00PM - 7:00PM",
      location: "Sports Complex",
      image:
        "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=600&fit=crop",
      category: "Sports",
      community: "Covenant University",
      description:
        "Inter-departmental basketball championship. Cheer for your favorite team!",
    },
    {
      id: "6",
      title: "Career Development Seminar",
      date: "Nov 2, 2023",
      time: "11:00AM - 1:00PM",
      location: "Business School Hall",
      image:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop",
      category: "Seminar",
      community: "Covenant University",
      description:
        "Learn resume writing, interview skills, and networking strategies from industry professionals.",
    },
    {
      id: "7",
      title: "Art Exhibition Opening",
      date: "Nov 8, 2023",
      time: "5:00PM - 8:00PM",
      location: "Gallery Hall",
      image:
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop",
      category: "Exhibition",
      community: "Covenant University",
      description:
        "View stunning artworks from talented students. Refreshments and live music included.",
    },
    {
      id: "8",
      title: "Movie Night Under the Stars",
      date: "Oct 27, 2023",
      time: "7:00PM - 10:00PM",
      location: "Main Quad",
      image:
        "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=600&fit=crop",
      category: "Entertainment",
      community: "Covenant University",
      description:
        "Outdoor movie screening. Bring blankets and snacks. Free popcorn for all attendees!",
    },
    {
      id: "9",
      title: "Health & Wellness Fair",
      date: "Nov 12, 2023",
      time: "10:00AM - 3:00PM",
      location: "Health Center",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
      category: "Health",
      community: "Covenant University",
      description:
        "Free health screenings, fitness demos, and wellness tips. Take care of your mind and body.",
    },
    {
      id: "10",
      title: "Book Club Discussion",
      date: "Nov 1, 2023",
      time: "4:00PM - 5:30PM",
      location: "Coffee Shop",
      image:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop",
      category: "Book Club",
      community: "Covenant University",
      description:
        "Discuss this month's selected book. New members welcome! Light refreshments provided.",
    },
    {
      id: "11",
      title: "Hackathon Challenge",
      date: "Nov 15, 2023",
      time: "9:00AM - 9:00PM",
      location: "Computer Lab",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop",
      category: "Hackathon",
      community: "Covenant University",
      description:
        "24-hour coding challenge. Build innovative solutions. Prizes for winners!",
    },
    {
      id: "12",
      title: "Cultural Dance Performance",
      date: "Nov 7, 2023",
      time: "6:00PM - 8:00PM",
      location: "Theater Hall",
      image:
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop",
      category: "Performance",
      community: "Covenant University",
      description:
        "Experience diverse cultural performances from different student groups. Tickets available at door.",
    },
  ];

  const community = universityCommunities.find(
    (community) => community.id === Number(id)
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />

      {/* Header */}
      <View className="mt-6 mb-6 px-6">
        <Headers
          text={truncate(community?.name || "", 20, "...")}
          onPress={() => router.back()}
        />
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={{ uri: community?.image }}
          className="w-full h-44"
          resizeMode="cover"
        />

        <View className="px-6 mt-5 mb-7">
          <View className="flex-row flex-wrap items-center justify-start gap-4 mb-3">
            <Text
              className="text-lg text-[#0066CC]"
              style={{ fontFamily: "HankenGrotesk_700Bold" }}
            >
              {community?.name}
            </Text>

            <TouchableOpacity
              className={`flex-row items-center gap-2 p-2 px-4 rounded-full border border-[#0066CC] ${community?.status === "Active" || community?.status === "Owned" ? "bg-[#0066CC]" : "bg-white"}`}
            >
              <Text
                className={`text-xs ${community?.status === "Active" || community?.status === "Owned" ? "text-white" : "text-[#0066CC]"}`}
                style={{
                  fontFamily: `HankenGrotesk_${community?.status === "Active" || community?.status === "Owned" ? "500Medium" : "700Bold"}`,
                }}
              >
                {community?.status === "Active" || community?.status === "Owned"
                  ? "Following..."
                  : "Follow"}
              </Text>
              <Ionicons
                name={
                  community?.status === "Active" ||
                  community?.status === "Owned"
                    ? "remove-outline"
                    : "add-outline"
                }
                size={16}
                color={
                  community?.status === "Active" ||
                  community?.status === "Owned"
                    ? "#FFFFFF"
                    : "#0066CC"
                }
              />
            </TouchableOpacity>
          </View>
          {/* View more for long description */}
          {community?.desc && (
            <ExpandableDescription
              text={community.desc}
              maxWords={32}
              textClassName="text-sm text-black"
              textStyle={{
                fontFamily: "HankenGrotesk_400Regular",
              }}
              viewMoreClassName="text-sm font-bold text-[#0066CC] mt-1"
              viewMoreStyle={{
                fontFamily: "HankenGrotesk_700Bold",
              }}
            />
          )}
        </View>

        <View
          className="w-full h-[1px] mt-2"
          style={{ backgroundColor: "#D9D9D9" }}
        />

        <View className="mt-6 px-6 mb-6">
          <Text
            className="text-xl text-black mb-4"
            style={{ fontFamily: "HankenGrotesk_700Bold" }}
          >
            Posts
          </Text>

          {posts.map((item) => {
            if (item.type === "post") {
              return <PostCard key={item.id} post={item} />;
            }

            if (item.type === "listing") {
              return <ListingCard key={item.id} item={item} />;
            }

            return null;
          })}
        </View>

        <View className="bg-[#F1F8FF] px-6 py-8">
          <View className="flex-row items-center justify-between mb-4">
            <Text
              className="text-xl text-black"
              style={{ fontFamily: "HankenGrotesk_700Bold" }}
            >
              Upcoming Events
            </Text>

            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname:
                    "/(access)/(stacks)/community-management-flow/all-events",
                  params: {
                    communityId: id,
                    communityName: community?.name || "",
                  },
                })
              }
            >
              <Text
                className="text-base text-[#0066CC]"
                style={{ fontFamily: "HankenGrotesk_700Bold" }}
              >
                All Events
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ flexDirection: "row", rowGap: 20 }}
            className="gap-2"
          >
            {events.map((event) => (
              <TouchableOpacity
                key={event.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden mr-4"
                onPress={() =>
                  router.push({
                    pathname:
                      "/(access)/(stacks)/community-management-flow/event/[id]",
                    params: { id: event.id },
                  })
                }
              >
                <Image
                  source={{ uri: event.image }}
                  className="w-full h-56"
                  resizeMode="cover"
                />
                <View className="p-6 flex-col justify-start items-start">
                  <View className="flex-row items-center justify-start mb-1">
                    <Text
                      style={{ fontFamily: "HankenGrotesk_500Medium" }}
                      className="text-[#0066CC] text-base"
                    >
                      {event.date}
                    </Text>
                    <Entypo name="dot-single" size={15} color="#0066CC" />
                    <Text
                      style={{ fontFamily: "HankenGrotesk_500Medium" }}
                      className="text-[#0066CC] text-base"
                    >
                      {event.time}
                    </Text>
                  </View>
                  <Text
                    style={{ fontFamily: "HankenGrotesk_900Black" }}
                    className="text-[#000000] text-xl mb-1"
                  >
                    {event.title}
                  </Text>
                  <View className="flex-row items-center">
                    <Ionicons
                      name="location-outline"
                      size={18}
                      color="#6B7280"
                    />
                    <Text
                      style={{ fontFamily: "HankenGrotesk_500Medium" }}
                      className="text-base text-[#000000] ml-1 mr-3"
                    >
                      {event.location}
                    </Text>
                  </View>
                  <View className="bg-[#0066CC] rounded-full px-4 py-2 mt-3 w-fit">
                    <Text
                      style={{ fontFamily: "HankenGrotesk_500Medium" }}
                      className="text-white text-sm"
                    >
                      {event.category}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {community?.status !== "Owned" && (
          <View className="mt-6 px-6">
            <Text
              className="text-xl text-black mb-4"
              style={{ fontFamily: "HankenGrotesk_700Bold" }}
            >
              Community Rules
            </Text>

            <View className="flex-col items-start gap-3">
              <View className="flex-row items-center justify-start gap-2">
                <Feather name="check-circle" size={20} color="#0066CC" />
                <Text
                  style={{ fontFamily: "HankenGrotesk_400Regular" }}
                  className="text-base text-black"
                >
                  Be respectful and constructive in all discussions.
                </Text>
              </View>
              <View className="flex-row items-center justify-start gap-2">
                <Feather name="check-circle" size={20} color="#0066CC" />
                <Text
                  style={{ fontFamily: "HankenGrotesk_400Regular" }}
                  className="text-base text-black"
                >
                  No hate speech, bullying or personal attacks.
                </Text>
              </View>
              <View className="flex-row items-center justify-start gap-2">
                <Feather name="check-circle" size={20} color="#0066CC" />
                <Text
                  style={{ fontFamily: "HankenGrotesk_400Regular" }}
                  className="text-base text-black"
                >
                  Keep discussions relevant to environmental topics.
                </Text>
              </View>
              <View className="flex-row items-center justify-start gap-2">
                <Feather name="check-circle" size={20} color="#0066CC" />
                <Text
                  style={{ fontFamily: "HankenGrotesk_400Regular" }}
                  className="text-base text-black"
                >
                  Report any violations to community moderators.
                </Text>
              </View>
              <View className="flex-row items-center justify-start gap-2">
                <Feather name="check-circle" size={20} color="#0066CC" />
                <Text
                  style={{ fontFamily: "HankenGrotesk_400Regular" }}
                  className="text-base text-black"
                >
                  Promote factual and evidence-based information.
                </Text>
              </View>
            </View>
          </View>
        )}

        {community?.status !== "Owned" && (
          <View className="flex-col gap-4 mt-10 px-6">
            <TouchableOpacity
              onPress={() => setShowReportModal(true)}
              className="w-full py-3 flex-row justify-center items-center gap-3 bg-[#F8F9FA] border-2 border-[#D9D9D9] rounded-xl"
            >
              <Feather name="flag" size={24} color="#6C757D" />
              <Text
                style={{ fontFamily: "HankenGrotesk_600SemiBold" }}
                className="text-lg text-[#000000]"
              >
                Report Community
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="w-full py-3 flex-row justify-center items-center gap-3 bg-[#D01111] border-2 border-[#D01111] rounded-xl">
              <MaterialCommunityIcons name="logout" size={24} color="#F96262" />
              <Text
                style={{ fontFamily: "HankenGrotesk_600SemiBold" }}
                className="text-lg text-[#ffff]"
              >
                Leave Community
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {community?.status === "Owned" && (
          <View className="flex-col gap-4 mt-10 px-6">
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname:
                    "/(access)/(stacks)/community-management-flow/request",
                  params: {
                    communityId: id,
                    communityName: community?.name || "",
                  },
                })
              }
              className="flex-row items-center justify-between bg-white px-6 py-6 rounded-2xl border border-gray-100 overflow-hidden shadow mb-1"
            >
              <View className="flex-row items-center justify-start gap-2">
                <Text
                  style={{ fontFamily: "HankenGrotesk_700Bold" }}
                  className="text-lg text-[#000000]"
                >
                  Requests
                </Text>
                <View className="items-center justify-center px-3 py-1 bg-[#0066CC] rounded-full">
                  <Text
                    style={{ fontFamily: "HankenGrotesk_500Medium" }}
                    className="text-xs text-[#fff]"
                  >
                    10
                  </Text>
                </View>
              </View>
              <Feather name="arrow-right" size={20} color="#D9D9D9" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname:
                    "/(access)/(stacks)/community-management-flow/reported-posts",
                  params: {
                    communityId: id,
                    communityName: community?.name || "",
                  },
                })
              }
              className="flex-row items-center justify-between bg-white px-6 py-6 rounded-2xl border border-gray-100 overflow-hidden shadow mb-4"
            >
              <View className="flex-row items-center justify-start gap-2">
                <Text
                  style={{ fontFamily: "HankenGrotesk_700Bold" }}
                  className="text-lg text-[#000000]"
                >
                  Reported Posts
                </Text>
                <View className="items-center justify-center px-3 py-1 bg-[#0066CC] rounded-full">
                  <Text
                    style={{ fontFamily: "HankenGrotesk_500Medium" }}
                    className="text-xs text-[#fff]"
                  >
                    10
                  </Text>
                </View>
              </View>
              <Feather name="arrow-right" size={20} color="#D9D9D9" />
            </TouchableOpacity>

            <TouchableOpacity className="w-full py-3 flex-row justify-center items-center gap-3 bg-[#D01111] border-2 border-[#D01111] rounded-xl">
              <MaterialCommunityIcons name="logout" size={24} color="#F96262" />
              <Text
                style={{ fontFamily: "HankenGrotesk_600SemiBold" }}
                className="text-lg text-[#ffff]"
              >
                Delete Community
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      {/* Floating Action Button */}
      {community?.status === "Owned" && (
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname:
                "/(access)/(stacks)/community-management-flow/create-content",
              params: {
                communityId: id,
                communityName: community?.name || "",
              },
            })
          }
          className="absolute bottom-32 right-6 border-2 border-white bg-[#0066CC] w-14 h-14 rounded-full items-center justify-center shadow-lg"
        >
          <AntDesign name="edit" size={20} color="#fff" />
        </TouchableOpacity>
      )}

      {/* Report Community Modal */}
      <Modal
        visible={showReportModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowReportModal(false)}
      >
        <View className="flex-1 bg-black/50 justify-end">
          <View className="bg-white rounded-t-3xl px-6 pt-6 pb-10">
            {/* Handle Bar */}
            <View className="items-center mb-6">
              <View className="w-10 h-1 bg-[#E5E7EB] rounded-full" />
            </View>

            {/* Header */}
            <View className="flex-row items-center justify-between mb-6">
              <View className="flex-1">
                <Text
                  className="text-2xl text-black mb-1"
                  style={{ fontFamily: "HankenGrotesk_700Bold" }}
                >
                  Report Community
                </Text>
                <Text
                  className="text-sm text-[#6B7280]"
                  style={{ fontFamily: "HankenGrotesk_400Regular" }}
                >
                  Help us understand what&apos;s wrong
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setShowReportModal(false)}
                className="w-8 h-8 items-center justify-center"
              >
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            {/* Report Reason Selection */}
            <View className="mb-6">
              <Text
                className="text-base text-black mb-3"
                style={{ fontFamily: "HankenGrotesk_600SemiBold" }}
              >
                What&apos;s the issue?
              </Text>
              <View className="gap-2">
                {reportReasons.map((reason) => (
                  <TouchableOpacity
                    key={reason}
                    onPress={() => setReportReason(reason)}
                    className={`flex-row items-center p-4 rounded-xl border-2 ${
                      reportReason === reason
                        ? "bg-[#E6F2FF] border-[#0066CC]"
                        : "bg-[#F8F9FA] border-[#E5E7EB]"
                    }`}
                  >
                    <View
                      className={`w-5 h-5 rounded-full border-2 mr-3 items-center justify-center ${
                        reportReason === reason
                          ? "border-[#0066CC]"
                          : "border-[#D1D5DB]"
                      }`}
                    >
                      {reportReason === reason && (
                        <View className="w-3 h-3 rounded-full bg-[#0066CC]" />
                      )}
                    </View>
                    <Text
                      className={`flex-1 text-base ${
                        reportReason === reason
                          ? "text-[#0066CC]"
                          : "text-black"
                      }`}
                      style={{
                        fontFamily:
                          reportReason === reason
                            ? "HankenGrotesk_600SemiBold"
                            : "HankenGrotesk_400Regular",
                      }}
                    >
                      {reason}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Additional Details */}
            <View className="mb-6">
              <Text
                className="text-base text-black mb-3"
                style={{ fontFamily: "HankenGrotesk_600SemiBold" }}
              >
                Additional Details (Optional)
              </Text>
              <TextInput
                placeholder="Provide more context about your report..."
                placeholderTextColor="#9CA3AF"
                value={reportDescription}
                onChangeText={setReportDescription}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                className="bg-[#F8F9FA] rounded-xl p-4 border-2 border-[#E5E7EB]"
                style={{
                  fontFamily: "HankenGrotesk_400Regular",
                  color: "#000000",
                  minHeight: 100,
                }}
              />
            </View>

            {/* Action Buttons */}
            <View className="flex-row gap-3">
              <TouchableOpacity
                onPress={() => {
                  setShowReportModal(false);
                  setReportReason("");
                  setReportDescription("");
                }}
                className="flex-1 py-4 bg-[#F3F4F6] rounded-xl items-center"
              >
                <Text
                  className="text-[#374151] text-base"
                  style={{ fontFamily: "HankenGrotesk_700Bold" }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleReportSubmit}
                disabled={!reportReason}
                className={`flex-1 py-4 rounded-xl items-center ${
                  reportReason ? "bg-[#0066CC]" : "bg-[#D1D5DB]"
                }`}
              >
                <Text
                  className={`text-base ${
                    reportReason ? "text-white" : "text-[#9CA3AF]"
                  }`}
                  style={{ fontFamily: "HankenGrotesk_700Bold" }}
                >
                  Submit Report
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default CommunityDetail;
