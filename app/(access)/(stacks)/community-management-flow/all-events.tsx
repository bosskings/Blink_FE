import { Headers } from "@/components/Headers";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { EventItem } from "./community-details/[id]";

const { height } = Dimensions.get("window");

const AllEvents = () => {
  const { communityName } = useLocalSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDateFilter, setSelectedDateFilter] = useState<
    "all" | "upcoming" | "past"
  >("upcoming");
  const slideAnim = React.useRef(new Animated.Value(height)).current;

  // All available event categories
  const categories = [
    "All",
    "Workshop",
    "Conference",
    "Festival",
    "Study",
    "Sports",
    "Seminar",
    "Exhibition",
    "Entertainment",
    "Health",
    "Book Club",
    "Hackathon",
    "Performance",
  ];

  // Mock events data - in a real app, this would come from an API
  const allEvents: EventItem[] = [
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

  // Filter events based on search and filters
  const filteredEvents = allEvents.filter((event) => {
    // Search filter
    const matchesSearch =
      searchQuery === "" ||
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());

    // Category filter
    const matchesCategory =
      selectedCategory === null ||
      selectedCategory === "All" ||
      event.category === selectedCategory;

    // Date filter (simplified - in real app, parse dates properly)
    const matchesDate =
      selectedDateFilter === "all" ||
      (selectedDateFilter === "upcoming" &&
        new Date(event.date) >= new Date()) ||
      (selectedDateFilter === "past" && new Date(event.date) < new Date());

    return matchesSearch && matchesCategory && matchesDate;
  });

  React.useEffect(() => {
    if (showFilters) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showFilters]);

  const handleCloseFilters = () => {
    setShowFilters(false);
  };

  const handleResetFilters = () => {
    setSelectedCategory(null);
    setSelectedDateFilter("upcoming");
    setSearchQuery("");
  };

  const handleApplyFilters = () => {
    setShowFilters(false);
  };

  const renderEventCard = ({ item }: { item: EventItem }) => (
    <TouchableOpacity
      className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-4 mx-6"
      onPress={() =>
        router.push({
          pathname: "/(access)/(stacks)/community-management-flow/event/[id]",
          params: { id: item.id },
        })
      }
    >
      <Image
        source={{ uri: item.image }}
        className="w-full h-56"
        resizeMode="cover"
      />
      <View className="p-6">
        <View className="flex-row items-center justify-start mb-2">
          <Text
            style={{ fontFamily: "HankenGrotesk_500Medium" }}
            className="text-[#0066CC] text-sm"
          >
            {item.date}
          </Text>
          <Entypo name="dot-single" size={12} color="#0066CC" />
          <Text
            style={{ fontFamily: "HankenGrotesk_500Medium" }}
            className="text-[#0066CC] text-sm"
          >
            {item.time}
          </Text>
        </View>
        <Text
          style={{ fontFamily: "HankenGrotesk_900Black" }}
          className="text-[#000000] text-xl mb-2"
        >
          {item.title}
        </Text>
        {item.description && (
          <Text
            style={{ fontFamily: "HankenGrotesk_400Regular" }}
            className="text-[#6C757D] text-sm mb-3"
            numberOfLines={2}
          >
            {item.description}
          </Text>
        )}
        <View className="flex-row items-center mb-3">
          <Ionicons name="location-outline" size={16} color="#6B7280" />
          <Text
            style={{ fontFamily: "HankenGrotesk_500Medium" }}
            className="text-base text-[#000000] ml-1"
          >
            {item.location}
          </Text>
        </View>
        <View className="bg-[#0066CC] rounded-full px-4 py-2 w-fit">
          <Text
            style={{ fontFamily: "HankenGrotesk_500Medium" }}
            className="text-white text-xs"
          >
            {item.category}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const hasActiveFilters =
    selectedCategory !== null ||
    selectedDateFilter !== "upcoming" ||
    searchQuery !== "";

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />

      {/* Header */}
      <View className="mt-6 mb-4 px-6">
        <Headers
          text={communityName ? `${communityName} Events` : "All Events"}
          onPress={() => router.back()}
        />
      </View>

      {/* Search and Filter Bar */}
      <View className="px-6 mb-4">
        <View className="flex-row gap-3">
          <View className="flex-1 flex-row items-center bg-[#F8F9FA] rounded-xl border border-[#D9D9D9] px-4 py-3">
            <Ionicons name="search" size={20} color="#6C757D" />
            <TextInput
              placeholder="Search events..."
              placeholderTextColor="#D9D9D9"
              value={searchQuery}
              onChangeText={setSearchQuery}
              className="flex-1 ml-2 text-sm"
              style={{ fontFamily: "HankenGrotesk_400Regular" }}
            />
            {searchQuery !== "" && (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <Ionicons name="close-circle" size={20} color="#6C757D" />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity
            onPress={() => setShowFilters(true)}
            className={`flex-row items-center justify-center gap-2 bg-[#F8F9FA] rounded-xl border border-[#D9D9D9] px-4 py-3 ${
              hasActiveFilters ? "border-[#0066CC]" : ""
            }`}
          >
            <Ionicons
              name="filter"
              size={20}
              color={hasActiveFilters ? "#0066CC" : "#6C757D"}
            />
            {hasActiveFilters && (
              <View className="absolute -top-1 -right-1 bg-[#0066CC] rounded-full w-4 h-4" />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <View className="px-6 mb-4">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="flex-row gap-2"
          >
            {selectedCategory && selectedCategory !== "All" && (
              <View className="flex-row items-center bg-[#E6F2FF] rounded-full px-3 py-1.5 gap-2">
                <Text
                  className="text-[#0066CC] text-xs"
                  style={{ fontFamily: "HankenGrotesk_600SemiBold" }}
                >
                  {selectedCategory}
                </Text>
                <TouchableOpacity
                  onPress={() => setSelectedCategory(null)}
                  className="ml-1"
                >
                  <Ionicons name="close-circle" size={16} color="#0066CC" />
                </TouchableOpacity>
              </View>
            )}
            {selectedDateFilter !== "upcoming" && (
              <View className="flex-row items-center bg-[#E6F2FF] rounded-full px-3 py-1.5 gap-2">
                <Text
                  className="text-[#0066CC] text-xs"
                  style={{ fontFamily: "HankenGrotesk_600SemiBold" }}
                >
                  {selectedDateFilter === "all" ? "All Dates" : "Past Events"}
                </Text>
                <TouchableOpacity
                  onPress={() => setSelectedDateFilter("upcoming")}
                  className="ml-1"
                >
                  <Ionicons name="close-circle" size={16} color="#0066CC" />
                </TouchableOpacity>
              </View>
            )}
            <TouchableOpacity
              onPress={handleResetFilters}
              className="flex-row items-center bg-[#F8F9FA] rounded-full px-3 py-1.5"
            >
              <Text
                className="text-[#6C757D] text-xs"
                style={{ fontFamily: "HankenGrotesk_600SemiBold" }}
              >
                Clear All
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}

      {/* Events List */}
      <FlatList
        data={filteredEvents}
        renderItem={renderEventCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingTop: 10, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="items-center justify-center py-20 px-6">
            <Ionicons name="calendar-outline" size={64} color="#D9D9D9" />
            <Text
              className="text-xl text-[#6C757D] mt-4 text-center"
              style={{ fontFamily: "HankenGrotesk_700Bold" }}
            >
              No events found
            </Text>
            <Text
              className="text-sm text-[#6C757D] mt-2 text-center"
              style={{ fontFamily: "HankenGrotesk_400Regular" }}
            >
              Try adjusting your filters or search query
            </Text>
          </View>
        }
      />

      {/* Filter Bottom Sheet */}
      <Modal
        visible={showFilters}
        transparent={true}
        animationType="none"
        onRequestClose={handleCloseFilters}
      >
        <View className="flex-1">
          <Animated.View
            style={{
              flex: 1,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              opacity: showFilters ? 1 : 0,
            }}
          >
            <TouchableOpacity
              style={{ flex: 1 }}
              activeOpacity={1}
              onPress={handleCloseFilters}
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
              maxHeight: height * 0.85,
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

            {/* Filter Header */}
            <View className="flex-row items-center justify-between px-6 py-4 border-b border-gray-100">
              <Text
                className="text-xl text-black"
                style={{ fontFamily: "HankenGrotesk_900Black" }}
              >
                Filter Events
              </Text>
              <TouchableOpacity onPress={handleCloseFilters}>
                <Ionicons name="close" size={24} color="#666666" />
              </TouchableOpacity>
            </View>

            <ScrollView
              className="flex-1"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 20 }}
            >
              {/* Date Filter */}
              <View className="px-6 py-4 border-b border-gray-100">
                <Text
                  className="text-base text-black mb-3"
                  style={{ fontFamily: "HankenGrotesk_700Bold" }}
                >
                  Date
                </Text>
                <View className="flex-row gap-3">
                  {(["upcoming", "past", "all"] as const).map((filter) => (
                    <TouchableOpacity
                      key={filter}
                      onPress={() => setSelectedDateFilter(filter)}
                      className={`flex-1 py-3 px-4 rounded-xl border-2 ${
                        selectedDateFilter === filter
                          ? "bg-[#E6F2FF] border-[#0066CC]"
                          : "bg-white border-[#D9D9D9]"
                      }`}
                    >
                      <Text
                        className={`text-sm text-center ${
                          selectedDateFilter === filter
                            ? "text-[#0066CC]"
                            : "text-[#6C757D]"
                        }`}
                        style={{
                          fontFamily:
                            selectedDateFilter === filter
                              ? "HankenGrotesk_700Bold"
                              : "HankenGrotesk_500Medium",
                        }}
                      >
                        {filter === "upcoming"
                          ? "Upcoming"
                          : filter === "past"
                            ? "Past"
                            : "All"}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Category Filter */}
              <View className="px-6 py-4">
                <Text
                  className="text-base text-black mb-3"
                  style={{ fontFamily: "HankenGrotesk_700Bold" }}
                >
                  Category
                </Text>
                <View className="flex-row flex-wrap gap-2">
                  {categories.map((category) => (
                    <TouchableOpacity
                      key={category}
                      onPress={() =>
                        setSelectedCategory(
                          category === "All" ? null : category
                        )
                      }
                      className={`px-4 py-2 rounded-full border-2 ${
                        selectedCategory === category ||
                        (category === "All" && selectedCategory === null)
                          ? "bg-[#0066CC] border-[#0066CC]"
                          : "bg-white border-[#D9D9D9]"
                      }`}
                    >
                      <Text
                        className={`text-sm ${
                          selectedCategory === category ||
                          (category === "All" && selectedCategory === null)
                            ? "text-white"
                            : "text-[#6C757D]"
                        }`}
                        style={{
                          fontFamily:
                            selectedCategory === category ||
                            (category === "All" && selectedCategory === null)
                              ? "HankenGrotesk_700Bold"
                              : "HankenGrotesk_500Medium",
                        }}
                      >
                        {category}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </ScrollView>

            {/* Filter Actions */}
            <View className="flex-row gap-3 px-6 py-4 border-t border-gray-100 bg-white">
              <TouchableOpacity
                onPress={handleResetFilters}
                className="flex-1 py-3 border-2 border-[#D9D9D9] rounded-xl items-center"
              >
                <Text
                  className="text-[#6C757D] text-base"
                  style={{ fontFamily: "HankenGrotesk_700Bold" }}
                >
                  Reset
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleApplyFilters}
                className="flex-1 py-3 bg-[#0066CC] rounded-xl items-center"
              >
                <Text
                  className="text-white text-base"
                  style={{ fontFamily: "HankenGrotesk_700Bold" }}
                >
                  Apply Filters
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default AllEvents;
