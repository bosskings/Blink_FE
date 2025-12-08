import { Headers } from "@/components/Headers";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Image,
  Modal,
  Platform,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { EventItem } from "./community-details/[id]";

// Lazy load DateTimePicker - requires native build
// Note: This package requires a dev build. Run: npx expo prebuild
const getDateTimePicker = () => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require("@react-native-community/datetimepicker").default;
  } catch {
    return null;
  }
};

const CreateContent = () => {
  const { communityId, communityName } = useLocalSearchParams();
  const [contentType, setContentType] = useState<"post" | "event">("post");
  const [content, setContent] = useState("");
  const [allowComments, setAllowComments] = useState(false);
  const [showPollModal, setShowPollModal] = useState(false);
  const [pollQuestion, setPollQuestion] = useState("");
  const [pollOptions, setPollOptions] = useState<string[]>(["", ""]);
  const [hasPoll, setHasPoll] = useState(false);

  // Event fields
  const [eventTitle, setEventTitle] = useState("");
  const [eventDate, setEventDate] = useState<Date>(new Date());
  const [eventTime, setEventTime] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [eventLocation, setEventLocation] = useState("");
  const [eventCategory, setEventCategory] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventImages, setEventImages] = useState<string[]>([]);
  const [eventVideos, setEventVideos] = useState<string[]>([]);

  // Mock user data - in a real app, this would come from auth context
  const currentUser = {
    name: "Lasman Ade",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
  };

  const eventCategories = [
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

  const handleAddPollOption = () => {
    if (pollOptions.length < 6) {
      setPollOptions([...pollOptions, ""]);
    }
  };

  const handleRemovePollOption = (index: number) => {
    if (pollOptions.length > 2) {
      const newOptions = pollOptions.filter((_, i) => i !== index);
      setPollOptions(newOptions);
    }
  };

  const handleUpdatePollOption = (index: number, value: string) => {
    const newOptions = [...pollOptions];
    newOptions[index] = value;
    setPollOptions(newOptions);
  };

  const handleSavePoll = () => {
    const validOptions = pollOptions.filter((opt) => opt.trim() !== "");
    if (pollQuestion.trim() && validOptions.length >= 2) {
      setHasPoll(true);
      setShowPollModal(false);
    }
  };

  // Format date to "Oct 26, 2023" format
  const formatDate = (date: Date): string => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  };

  // Format time to "10:00AM" format
  const formatTime = (date: Date): string => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;
    const displayMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${displayHours}:${displayMinutes}${ampm}`;
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }
    if (selectedDate) {
      setEventDate(selectedDate);
      if (Platform.OS === "ios") {
        // On iOS, keep picker open until user confirms
      }
    } else if (Platform.OS === "android") {
      setShowDatePicker(false);
    }
  };

  const handleTimeChange = (event: any, selectedTime?: Date) => {
    if (Platform.OS === "android") {
      setShowTimePicker(false);
    }
    if (selectedTime) {
      setEventTime(selectedTime);
      if (Platform.OS === "ios") {
        // On iOS, keep picker open until user confirms
      }
    } else if (Platform.OS === "android") {
      setShowTimePicker(false);
    }
  };

  const handleCreatePost = () => {
    if (contentType === "event") {
      // Validate event fields
      if (!eventTitle.trim() || !eventLocation || !eventCategory) {
        // In a real app, show error message
        return;
      }

      // Format date and time for display
      const formattedDate = formatDate(eventDate);
      const formattedTime = formatTime(eventTime);

      const eventData: EventItem = {
        id: Date.now().toString(),
        title: eventTitle,
        date: formattedDate,
        time: formattedTime,
        location: eventLocation,
        category: eventCategory,
        community: communityName as string,
        description: eventDescription || undefined,
        image:
          eventImages.length > 0
            ? eventImages[0]
            : "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop", // Default image or first image
        images: eventImages.length > 0 ? eventImages : undefined,
        videos: eventVideos.length > 0 ? eventVideos : undefined,
      };

      console.log("Creating event:", eventData);
      // In a real app, this would submit the event to the API
    } else {
      // Create post
      const postData = {
        content,
        allowComments,
        communityId,
        poll: hasPoll
          ? {
              question: pollQuestion,
              options: pollOptions.filter((opt) => opt.trim() !== ""),
            }
          : undefined,
      };

      console.log("Creating post:", postData);
      // In a real app, this would submit the post to the API
    }

    // Navigate back after creation
    router.back();
  };

  const handlePhotoPress = () => {
    // TODO: Implement image picker functionality
    // Requires new dev build with image picker library
    // For now, using placeholder URLs for demonstration
    if (contentType === "post") {
      console.log("Post Photo functionality - TODO: Implement image picker");
      // In real implementation:
      // const result = await ImagePicker.launchImageLibraryAsync({...});
      // if (!result.canceled) {
      //   setPostImages([...postImages, result.assets[0].uri]);
      // }
    } else {
      // Event image selection
      console.log("Event Photo functionality - TODO: Implement image picker");
      // In real implementation:
      // const result = await ImagePicker.launchImageLibraryAsync({...});
      // if (!result.canceled) {
      //   setEventImages([...eventImages, result.assets[0].uri]);
      // }
      // For demo, adding a placeholder
      setEventImages([
        ...eventImages,
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop",
      ]);
    }
  };

  const handleVideoPress = () => {
    // TODO: Implement video picker functionality
    // Requires new dev build with video picker library
    if (contentType === "post") {
      console.log("Post Video functionality - TODO: Implement video picker");
      // In real implementation:
      // const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: 'videos' });
      // if (!result.canceled) {
      //   setPostVideos([...postVideos, result.assets[0].uri]);
      // }
    } else {
      // Event video selection
      console.log("Event Video functionality - TODO: Implement video picker");
      // In real implementation:
      // const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: 'videos' });
      // if (!result.canceled) {
      //   setEventVideos([...eventVideos, result.assets[0].uri]);
      // }
      // For demo, adding a placeholder
      setEventVideos([
        ...eventVideos,
        "https://example.com/video-placeholder.mp4",
      ]);
    }
  };

  const handleRemoveEventImage = (index: number) => {
    const newImages = eventImages.filter((_, i) => i !== index);
    setEventImages(newImages);
  };

  const handleRemoveEventVideo = (index: number) => {
    const newVideos = eventVideos.filter((_, i) => i !== index);
    setEventVideos(newVideos);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />

      {/* Header */}
      <View className="mt-6 mb-6 px-6">
        <Headers text="Create Content" onPress={() => router.back()} />
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Content Type Tabs */}
        <View className="px-6 mb-6">
          <View className="flex-row gap-3">
            {/* Post Tab */}
            <TouchableOpacity
              onPress={() => setContentType("post")}
              className={`flex-1 flex-row items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 ${
                contentType === "post"
                  ? "bg-[#E6F2FF] border-[#0066CC]"
                  : "bg-white border-[#D9D9D9]"
              }`}
            >
              <Feather
                name="message-circle"
                size={20}
                color={contentType === "post" ? "#0066CC" : "#6C757D"}
              />
              <Text
                className={`text-base ${
                  contentType === "post" ? "text-[#0066CC]" : "text-[#6C757D]"
                }`}
                style={{
                  fontFamily:
                    contentType === "post"
                      ? "HankenGrotesk_700Bold"
                      : "HankenGrotesk_500Medium",
                }}
              >
                Post
              </Text>
            </TouchableOpacity>

            {/* Event Tab */}
            <TouchableOpacity
              onPress={() => setContentType("event")}
              className={`flex-1 flex-row items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 ${
                contentType === "event"
                  ? "bg-[#E6F2FF] border-[#0066CC]"
                  : "bg-white border-[#D9D9D9]"
              }`}
            >
              <AntDesign
                name="calendar"
                size={20}
                color={contentType === "event" ? "#0066CC" : "#6C757D"}
              />
              <Text
                className={`text-base ${
                  contentType === "event" ? "text-[#0066CC]" : "text-[#6C757D]"
                }`}
                style={{
                  fontFamily:
                    contentType === "event"
                      ? "HankenGrotesk_700Bold"
                      : "HankenGrotesk_500Medium",
                }}
              >
                Event
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* User Profile Section */}
        <View className="px-6 mb-6">
          <View className="flex-row items-center gap-3">
            <Image
              source={{ uri: currentUser.avatar }}
              className="w-12 h-12 rounded-full"
            />
            <View className="flex-1">
              <Text
                className="text-base text-black mb-1"
                style={{ fontFamily: "HankenGrotesk_900Black" }}
              >
                {currentUser.name}
              </Text>
              <View className="flex-row items-center gap-1">
                <Text
                  className="text-sm text-black"
                  style={{ fontFamily: "HankenGrotesk_400Regular" }}
                >
                  Posting to
                </Text>
                <TouchableOpacity>
                  <Text
                    className="text-sm text-[#0066CC]"
                    style={{ fontFamily: "HankenGrotesk_700Bold" }}
                  >
                    {communityName || "Covenant University Community"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Content Input - Post */}
        {contentType === "post" && (
          <View className="px-6">
            <View className="bg-[#F8F9FA] rounded-tr-2xl rounded-tl-2xl p-4 min-h-[200px]">
              <TextInput
                placeholder="What's in your mind today..."
                placeholderTextColor="#D9D9D9"
                value={content}
                onChangeText={setContent}
                multiline
                textAlignVertical="top"
                className="flex-1 text-base"
                style={{
                  fontFamily: "HankenGrotesk_400Regular",
                  color: "#000000",
                  minHeight: 200,
                }}
              />
            </View>
          </View>
        )}

        {/* Event Form Fields */}
        {contentType === "event" && (
          <View className="px-6 mb-6 gap-4">
            {/* Event Title */}
            <View>
              <Text
                className="text-sm text-black mb-2"
                style={{ fontFamily: "HankenGrotesk_700Bold" }}
              >
                Event Title
              </Text>
              <TextInput
                placeholder="Enter event title"
                placeholderTextColor="#D9D9D9"
                value={eventTitle}
                onChangeText={setEventTitle}
                className="bg-[#F8F9FA] rounded-xl p-4"
                style={{
                  fontFamily: "HankenGrotesk_400Regular",
                  color: "#000000",
                }}
              />
            </View>

            {/* Date and Time Row */}
            <View className="flex-row gap-3">
              <View className="flex-1">
                <Text
                  className="text-sm text-black mb-2"
                  style={{ fontFamily: "HankenGrotesk_700Bold" }}
                >
                  Date
                </Text>
                <TouchableOpacity
                  onPress={() => setShowDatePicker(true)}
                  className="bg-[#F8F9FA] rounded-xl p-4 flex-row items-center justify-between"
                >
                  <Text
                    style={{
                      fontFamily: "HankenGrotesk_400Regular",
                      color: "#000000",
                    }}
                  >
                    {formatDate(eventDate)}
                  </Text>
                  <Ionicons name="calendar-outline" size={20} color="#6C757D" />
                </TouchableOpacity>
                {showDatePicker &&
                  (() => {
                    const Picker = getDateTimePicker();
                    if (Picker) {
                      return (
                        <Picker
                          value={eventDate}
                          mode="date"
                          display={
                            Platform.OS === "ios" ? "spinner" : "default"
                          }
                          onChange={handleDateChange}
                          minimumDate={new Date()}
                        />
                      );
                    }
                    return (
                      <View className="mt-2 bg-[#F8F9FA] rounded-xl p-4">
                        <Text
                          className="text-sm text-[#6C757D] mb-2"
                          style={{ fontFamily: "HankenGrotesk_400Regular" }}
                        >
                          Date picker requires a native build. Run: npx expo
                          prebuild
                        </Text>
                        <TextInput
                          placeholder="MM/DD/YYYY"
                          placeholderTextColor="#D9D9D9"
                          value={formatDate(eventDate)}
                          editable={false}
                          className="bg-white rounded-lg p-3"
                          style={{
                            fontFamily: "HankenGrotesk_400Regular",
                            color: "#000000",
                          }}
                        />
                      </View>
                    );
                  })()}
                {Platform.OS === "ios" &&
                  showDatePicker &&
                  getDateTimePicker() && (
                    <View className="flex-row gap-2 mt-2">
                      <TouchableOpacity
                        onPress={() => setShowDatePicker(false)}
                        className="flex-1 bg-[#D9D9D9] rounded-xl py-2 items-center"
                      >
                        <Text
                          style={{ fontFamily: "HankenGrotesk_600SemiBold" }}
                          className="text-[#6C757D]"
                        >
                          Cancel
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => setShowDatePicker(false)}
                        className="flex-1 bg-[#0066CC] rounded-xl py-2 items-center"
                      >
                        <Text
                          style={{ fontFamily: "HankenGrotesk_600SemiBold" }}
                          className="text-white"
                        >
                          Done
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
              </View>
              <View className="flex-1">
                <Text
                  className="text-sm text-black mb-2"
                  style={{ fontFamily: "HankenGrotesk_700Bold" }}
                >
                  Time
                </Text>
                <TouchableOpacity
                  onPress={() => setShowTimePicker(true)}
                  className="bg-[#F8F9FA] rounded-xl p-4 flex-row items-center justify-between"
                >
                  <Text
                    style={{
                      fontFamily: "HankenGrotesk_400Regular",
                      color: "#000000",
                    }}
                  >
                    {formatTime(eventTime)}
                  </Text>
                  <Ionicons name="time-outline" size={20} color="#6C757D" />
                </TouchableOpacity>
                {showTimePicker &&
                  (() => {
                    const Picker = getDateTimePicker();
                    if (Picker) {
                      return (
                        <Picker
                          value={eventTime}
                          mode="time"
                          display={
                            Platform.OS === "ios" ? "spinner" : "default"
                          }
                          onChange={handleTimeChange}
                          is24Hour={false}
                        />
                      );
                    }
                    return (
                      <View className="mt-2 bg-[#F8F9FA] rounded-xl p-4">
                        <Text
                          className="text-sm text-[#6C757D] mb-2"
                          style={{ fontFamily: "HankenGrotesk_400Regular" }}
                        >
                          Time picker requires a native build. Run: npx expo
                          prebuild
                        </Text>
                        <TextInput
                          placeholder="HH:MM AM/PM"
                          placeholderTextColor="#D9D9D9"
                          value={formatTime(eventTime)}
                          editable={false}
                          className="bg-white rounded-lg p-3"
                          style={{
                            fontFamily: "HankenGrotesk_400Regular",
                            color: "#000000",
                          }}
                        />
                      </View>
                    );
                  })()}
                {Platform.OS === "ios" &&
                  showTimePicker &&
                  getDateTimePicker() && (
                    <View className="flex-row gap-2 mt-2">
                      <TouchableOpacity
                        onPress={() => setShowTimePicker(false)}
                        className="flex-1 bg-[#D9D9D9] rounded-xl py-2 items-center"
                      >
                        <Text
                          style={{ fontFamily: "HankenGrotesk_600SemiBold" }}
                          className="text-[#6C757D]"
                        >
                          Cancel
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => setShowTimePicker(false)}
                        className="flex-1 bg-[#0066CC] rounded-xl py-2 items-center"
                      >
                        <Text
                          style={{ fontFamily: "HankenGrotesk_600SemiBold" }}
                          className="text-white"
                        >
                          Done
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
              </View>
            </View>

            {/* Location */}
            <View>
              <Text
                className="text-sm text-black mb-2"
                style={{ fontFamily: "HankenGrotesk_700Bold" }}
              >
                Location
              </Text>
              <TextInput
                placeholder="Enter event location"
                placeholderTextColor="#D9D9D9"
                value={eventLocation}
                onChangeText={setEventLocation}
                className="bg-[#F8F9FA] rounded-xl p-4"
                style={{
                  fontFamily: "HankenGrotesk_400Regular",
                  color: "#000000",
                }}
              />
            </View>

            {/* Category */}
            <View>
              <Text
                className="text-sm text-black mb-2"
                style={{ fontFamily: "HankenGrotesk_700Bold" }}
              >
                Category
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="flex-row gap-2"
              >
                {eventCategories.map((category) => (
                  <TouchableOpacity
                    key={category}
                    onPress={() => setEventCategory(category)}
                    className={`px-4 py-2 rounded-full border-2 ${
                      eventCategory === category
                        ? "bg-[#0066CC] border-[#0066CC]"
                        : "bg-white border-[#D9D9D9]"
                    }`}
                  >
                    <Text
                      className={`text-sm ${
                        eventCategory === category
                          ? "text-white"
                          : "text-[#6C757D]"
                      }`}
                      style={{
                        fontFamily:
                          eventCategory === category
                            ? "HankenGrotesk_700Bold"
                            : "HankenGrotesk_500Medium",
                      }}
                    >
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Description */}
            <View>
              <Text
                className="text-sm text-black mb-2"
                style={{ fontFamily: "HankenGrotesk_700Bold" }}
              >
                Description (Optional)
              </Text>
              <TextInput
                placeholder="Describe your event..."
                placeholderTextColor="#D9D9D9"
                value={eventDescription}
                onChangeText={setEventDescription}
                multiline
                textAlignVertical="top"
                className="bg-[#F8F9FA] rounded-xl p-4"
                style={{
                  fontFamily: "HankenGrotesk_400Regular",
                  color: "#000000",
                  minHeight: 100,
                }}
              />
            </View>

            {/* Event Media Action Buttons */}
            <View>
              <Text
                className="text-sm text-black mb-2"
                style={{ fontFamily: "HankenGrotesk_700Bold" }}
              >
                Media (Optional)
              </Text>
              <View className="flex-row gap-3">
                {/* Photo Button */}
                <TouchableOpacity
                  onPress={handlePhotoPress}
                  className="flex-1 flex-row items-center justify-center gap-2 bg-[#D9D9D9] rounded-full py-4 px-4"
                >
                  <Ionicons name="image-outline" size={20} color="#6C757D" />
                  <Text
                    className="text-sm text-[#6C757D]"
                    style={{ fontFamily: "HankenGrotesk_600SemiBold" }}
                  >
                    Photo
                  </Text>
                </TouchableOpacity>

                {/* Video Button */}
                <TouchableOpacity
                  onPress={handleVideoPress}
                  className="flex-1 flex-row items-center justify-center gap-2 bg-[#D9D9D9] rounded-full py-4 px-4"
                >
                  <Ionicons name="videocam-outline" size={20} color="#6C757D" />
                  <Text
                    className="text-sm text-[#6C757D]"
                    style={{ fontFamily: "HankenGrotesk_600SemiBold" }}
                  >
                    Video
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setShowPollModal(true)}
                  className="flex-1 flex-row items-center justify-center gap-2 bg-[#D9D9D9] rounded-full py-4 px-4"
                >
                  <Ionicons
                    name="bar-chart-outline"
                    size={20}
                    color="#6C757D"
                  />
                  <Text
                    className="text-sm text-[#6C757D]"
                    style={{ fontFamily: "HankenGrotesk_600SemiBold" }}
                  >
                    Poll
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Selected Event Images */}
            {eventImages.length > 0 && (
              <View>
                <Text
                  className="text-sm text-black mb-2"
                  style={{ fontFamily: "HankenGrotesk_700Bold" }}
                >
                  Selected Images ({eventImages.length})
                </Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ gap: 10 }}
                >
                  {eventImages.map((imageUri, index) => (
                    <View key={index} className="relative">
                      <Image
                        source={{ uri: imageUri }}
                        className="w-24 h-24 rounded-xl"
                        resizeMode="cover"
                      />
                      <TouchableOpacity
                        onPress={() => handleRemoveEventImage(index)}
                        className="absolute -top-0 -right-0 bg-[#D01111] rounded-full w-6 h-6 items-center justify-center"
                      >
                        <Ionicons name="close" size={14} color="#FFFFFF" />
                      </TouchableOpacity>
                    </View>
                  ))}
                </ScrollView>
              </View>
            )}

            {/* Selected Event Videos */}
            {eventVideos.length > 0 && (
              <View>
                <Text
                  className="text-sm text-black mb-2"
                  style={{ fontFamily: "HankenGrotesk_700Bold" }}
                >
                  Selected Videos ({eventVideos.length})
                </Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ gap: 10 }}
                >
                  {eventVideos.map((videoUri, index) => (
                    <View key={index} className="relative">
                      <View className="w-24 h-24 rounded-xl bg-[#F8F9FA] border border-[#D9D9D9] items-center justify-center">
                        <Feather name="video" size={32} color="#6C757D" />
                      </View>
                      <TouchableOpacity
                        onPress={() => handleRemoveEventVideo(index)}
                        className="absolute -top-0 -right-0 bg-[#D01111] rounded-full w-6 h-6 items-center justify-center"
                      >
                        <Ionicons name="close" size={14} color="#FFFFFF" />
                      </TouchableOpacity>
                    </View>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
        )}

        {/* Poll Display (if created) */}
        {hasPoll && contentType === "post" && (
          <View className="px-6 mb-6">
            <View className="bg-[#E6F2FF] rounded-xl p-4 border border-[#0066CC]">
              <View className="flex-row items-center justify-between mb-3">
                <Text
                  className="text-base text-[#0066CC]"
                  style={{ fontFamily: "HankenGrotesk_700Bold" }}
                >
                  Poll
                </Text>
                <TouchableOpacity onPress={() => setShowPollModal(true)}>
                  <Feather name="edit-2" size={18} color="#0066CC" />
                </TouchableOpacity>
              </View>
              <Text
                className="text-base text-black mb-3"
                style={{ fontFamily: "HankenGrotesk_700Bold" }}
              >
                {pollQuestion}
              </Text>
              <View className="gap-2">
                {pollOptions
                  .filter((opt) => opt.trim() !== "")
                  .map((option, index) => (
                    <View
                      key={index}
                      className="bg-white rounded-lg p-3 border border-[#D9D9D9]"
                    >
                      <Text
                        className="text-sm text-black"
                        style={{ fontFamily: "HankenGrotesk_400Regular" }}
                      >
                        {option}
                      </Text>
                    </View>
                  ))}
              </View>
            </View>
          </View>
        )}

        {/* Media Action Buttons - Only show for Post */}
        {contentType === "post" && (
          <View className="px-6 mb-6">
            <View className="flex-row gap-3 bg-[#EAEAEA] rounded-br-2xl rounded-bl-2xl p-6">
              {/* Photo Button */}
              <TouchableOpacity
                onPress={handlePhotoPress}
                className="flex-1 flex-row items-center justify-center gap-2 bg-[#D9D9D9] rounded-full py-4 px-4"
              >
                <Ionicons name="image-outline" size={20} color="#6C757D" />
                <Text
                  className="text-sm text-[#6C757D]"
                  style={{ fontFamily: "HankenGrotesk_600SemiBold" }}
                >
                  Photo
                </Text>
              </TouchableOpacity>

              {/* Video Button */}
              <TouchableOpacity
                onPress={handleVideoPress}
                className="flex-1 flex-row items-center justify-center gap-2 bg-[#D9D9D9] rounded-full py-4 px-4"
              >
                <Ionicons name="videocam-outline" size={20} color="#6C757D" />
                <Text
                  className="text-sm text-[#6C757D]"
                  style={{ fontFamily: "HankenGrotesk_600SemiBold" }}
                >
                  Video
                </Text>
              </TouchableOpacity>

              {/* Poll Button */}
              <TouchableOpacity
                onPress={() => setShowPollModal(true)}
                className={`flex-1 flex-row items-center justify-center gap-2 rounded-full py-4 px-4 ${
                  hasPoll ? "bg-[#E6F2FF] border-[#0066CC]" : "bg-[#D9D9D9]"
                }`}
              >
                <Ionicons
                  name="bar-chart-outline"
                  size={20}
                  color={hasPoll ? "#0066CC" : "#6C757D"}
                />
                <Text
                  className={`text-sm ${
                    hasPoll ? "text-[#0066CC]" : "text-[#6C757D]"
                  }`}
                  style={{
                    fontFamily: hasPoll
                      ? "HankenGrotesk_700Bold"
                      : "HankenGrotesk_600SemiBold",
                  }}
                >
                  Poll
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Allow Comments Section - Only show for Post */}
        {contentType === "post" && (
          <View className="px-6 mb-6">
            <View className="bg-white rounded-xl border-2 border-[#D9D9D9] p-4">
              <Text
                className="text-lg text-black"
                style={{ fontFamily: "HankenGrotesk_700Bold" }}
              >
                Allow Comments
              </Text>
              <View className="flex-row items-center justify-between">
                <Text
                  className="text-base text-[#6C757D] flex-1"
                  style={{ fontFamily: "HankenGrotesk_400Regular" }}
                >
                  Let community members comment
                </Text>
                <Switch
                  value={allowComments}
                  onValueChange={setAllowComments}
                  trackColor={{ false: "#D1D5DB", true: "#0066CC" }}
                  thumbColor="#FFFFFF"
                />
              </View>
            </View>
          </View>
        )}

        {/* Create Post Button */}
        <View className="px-6">
          <TouchableOpacity
            onPress={handleCreatePost}
            className="bg-[#0066CC] rounded-xl py-4 px-4 items-center"
          >
            <Text
              className="text-white text-base"
              style={{ fontFamily: "HankenGrotesk_700Bold" }}
            >
              {contentType === "post" ? "Create Post" : "Create Event"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Poll Creation Modal */}
      <Modal
        visible={showPollModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowPollModal(false)}
      >
        <View className="flex-1 bg-black/50 justify-center items-center px-6">
          <View className="bg-white rounded-2xl w-full max-w-md p-6">
            <View className="flex-row items-center justify-between mb-4">
              <Text
                className="text-xl text-black"
                style={{ fontFamily: "HankenGrotesk_900Black" }}
              >
                Create Poll
              </Text>
              <TouchableOpacity onPress={() => setShowPollModal(false)}>
                <Ionicons name="close" size={24} color="#666666" />
              </TouchableOpacity>
            </View>

            {/* Poll Question */}
            <View className="mb-4">
              <Text
                className="text-sm text-black mb-2"
                style={{ fontFamily: "HankenGrotesk_700Bold" }}
              >
                Poll Question
              </Text>
              <TextInput
                placeholder="Ask a question..."
                placeholderTextColor="#D9D9D9"
                value={pollQuestion}
                onChangeText={setPollQuestion}
                className="bg-[#F8F9FA] rounded-xl p-4"
                style={{
                  fontFamily: "HankenGrotesk_400Regular",
                  color: "#000000",
                }}
              />
            </View>

            {/* Poll Options */}
            <View className="mb-4">
              <Text
                className="text-sm text-black mb-2"
                style={{ fontFamily: "HankenGrotesk_700Bold" }}
              >
                Options ({pollOptions.length}/6)
              </Text>
              <ScrollView className="max-h-64">
                <View className="gap-2">
                  {pollOptions.map((option, index) => (
                    <View key={index} className="flex-row items-center gap-2">
                      <TextInput
                        placeholder={`Option ${index + 1}`}
                        placeholderTextColor="#D9D9D9"
                        value={option}
                        onChangeText={(value) =>
                          handleUpdatePollOption(index, value)
                        }
                        className="flex-1 bg-[#F8F9FA] rounded-xl p-3"
                        style={{
                          fontFamily: "HankenGrotesk_400Regular",
                          color: "#000000",
                        }}
                      />
                      {pollOptions.length > 2 && (
                        <TouchableOpacity
                          onPress={() => handleRemovePollOption(index)}
                          className="p-2"
                        >
                          <Ionicons
                            name="close-circle"
                            size={24}
                            color="#D01111"
                          />
                        </TouchableOpacity>
                      )}
                    </View>
                  ))}
                </View>
              </ScrollView>
            </View>

            {/* Add Option Button */}
            {pollOptions.length < 6 && (
              <TouchableOpacity
                onPress={handleAddPollOption}
                className="flex-row items-center justify-center gap-2 py-3 border-2 border-[#0066CC] rounded-xl mb-4"
              >
                <Ionicons name="add" size={20} color="#0066CC" />
                <Text
                  className="text-[#0066CC] text-base"
                  style={{ fontFamily: "HankenGrotesk_700Bold" }}
                >
                  Add Option
                </Text>
              </TouchableOpacity>
            )}

            {/* Action Buttons */}
            <View className="flex-row gap-3">
              <TouchableOpacity
                onPress={() => {
                  setShowPollModal(false);
                  setHasPoll(false);
                  setPollQuestion("");
                  setPollOptions(["", ""]);
                }}
                className="flex-1 py-3 border-2 border-[#D9D9D9] rounded-xl items-center"
              >
                <Text
                  className="text-[#6C757D] text-base"
                  style={{ fontFamily: "HankenGrotesk_700Bold" }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSavePoll}
                className="flex-1 py-3 bg-[#0066CC] rounded-xl items-center"
              >
                <Text
                  className="text-white text-base"
                  style={{ fontFamily: "HankenGrotesk_700Bold" }}
                >
                  Save Poll
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default CreateContent;
