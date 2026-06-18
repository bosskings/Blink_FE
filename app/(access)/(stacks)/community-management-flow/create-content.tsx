import { Headers } from "@/components/Headers";
import { SolidMainButton } from "@/components/Btns";
import LoadingOverlay from "@/components/LoadingOverlay";
import { useCreatePost } from "@/services";
import { useUserProfile } from "@/providers/UserProfileProvider";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
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
import { CustomAlert } from "@/components/CustomAlert";
import { SafeAreaView } from "react-native-safe-area-context";

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
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertConfig, setAlertConfig] = useState({ title: "", message: "" });
  const createPostMutation = useCreatePost();

  const showAlert = (title: string, message: string) => {
    setAlertConfig({ title, message });
    setAlertVisible(true);
  };
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
  const [postImages, setPostImages] = useState<string[]>([]);
  const [postVideos, setPostVideos] = useState<string[]>([]);

  const { profile } = useUserProfile();
  const currentUser = {
    name: profile ? `${profile.firstName ?? ""} ${profile.lastName ?? ""}`.trim() : "",
    avatar: profile?.avatar ?? "",
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
      if (!eventTitle.trim() || !eventLocation || !eventCategory) {
        return;
      }

      showAlert("Event Created", "Your event has been successfully created.");
    } else {
      if (!content.trim()) return;

      const filteredOptions = pollOptions.filter((opt) => opt.trim() !== "");

      createPostMutation.mutate(
        {
          content,
          community: (communityId as string) ?? "",
          type: "discussion",
          allowComments,
          poll:
            hasPoll && pollQuestion.trim() && filteredOptions.length >= 2
              ? { question: pollQuestion, options: filteredOptions }
              : undefined,
        },
        {
          onSuccess: () => {
            showAlert("Post Created", "Your post has been successfully published.");
          },
          onError: (err) => {
            showAlert(
              "Error",
              err instanceof Error ? err.message : "Failed to create post.",
            );
          },
        },
      );
    }
  };

  const handlePhotoPress = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      if (contentType === "post") {
        setPostImages([...postImages, result.assets[0].uri]);
      } else {
        setEventImages([...eventImages, result.assets[0].uri]);
      }
    }
  };

  const handleVideoPress = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      if (contentType === "post") {
        setPostVideos([...postVideos, result.assets[0].uri]);
      } else {
        setEventVideos([...eventVideos, result.assets[0].uri]);
      }
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

  const handleRemovePostImage = (index: number) => {
    const newImages = postImages.filter((_, i) => i !== index);
    setPostImages(newImages);
  };

  const handleRemovePostVideo = (index: number) => {
    const newVideos = postVideos.filter((_, i) => i !== index);
    setPostVideos(newVideos);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <LoadingOverlay visible={createPostMutation.isPending} />

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
                size={18}
                color={contentType === "post" ? "#0066CC" : "#6C757D"}
              />
              <Text
                className={`text-[13px] ${
                  contentType === "post" ? "text-[#0066CC]" : "text-[#6C757D]"
                }`}
                style={{
                  fontFamily: "HankenGrotesk_500Medium",
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
                size={18}
                color={contentType === "event" ? "#0066CC" : "#6C757D"}
              />
              <Text
                className={`text-[13px] ${
                  contentType === "event" ? "text-[#0066CC]" : "text-[#6C757D]"
                }`}
                style={{
                  fontFamily: "HankenGrotesk_500Medium",
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
              <Text className="text-[17px] text-black mb-1 font-bold" style={{}}>
                {currentUser.name}
              </Text>
              <View className="flex-row items-center gap-1">
                <Text className="text-[13px] text-black" style={{ fontFamily: "HankenGrotesk_500Medium" }}>
                  Posting to
                </Text>
                <TouchableOpacity>
                  <Text className="text-[13px] text-[#0066CC]" style={{ fontFamily: "HankenGrotesk_500Medium" }}>
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
                className="flex-1 text-[15px]"
                style={{
                  color: "#000000",
                  minHeight: 200,
                }}
              />

              {/* Selected Post Images */}
              {postImages.length > 0 && (
                <View className="mt-4">
                  <Text className="text-[13px] text-black mb-2 font-bold" style={{}}>
                    Selected Images ({postImages.length})
                  </Text>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ gap: 10 }}
                  >
                    {postImages.map((imageUri, index) => (
                      <View key={index} className="relative">
                        <Image
                          source={{ uri: imageUri }}
                          className="w-24 h-24 rounded-xl"
                          resizeMode="cover"
                        />
                        <TouchableOpacity
                          onPress={() => handleRemovePostImage(index)}
                          className="absolute -top-0 -right-0 bg-[#D01111] rounded-full w-6 h-6 items-center justify-center"
                        >
                          <Ionicons name="close" size={14} color="#FFFFFF" />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </ScrollView>
                </View>
              )}

              {/* Selected Post Videos */}
              {postVideos.length > 0 && (
                <View className="mt-4">
                  <Text className="text-[13px] text-black mb-2 font-bold" style={{}}>
                    Selected Videos ({postVideos.length})
                  </Text>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ gap: 10 }}
                  >
                    {postVideos.map((videoUri, index) => (
                      <View key={index} className="relative">
                        <View className="w-24 h-24 rounded-xl bg-[#EAEAEA] border border-[#D9D9D9] items-center justify-center">
                          <Feather name="video" size={32} color="#6C757D" />
                        </View>
                        <TouchableOpacity
                          onPress={() => handleRemovePostVideo(index)}
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
          </View>
        )}

        {/* Event Form Fields */}
        {contentType === "event" && (
          <View className="px-6 mb-6 gap-4">
            {/* Event Title */}
            <View>
              <Text className="text-[13px] text-black mb-2 font-bold" style={{}}>
                Event Title
              </Text>
              <TextInput
                placeholder="Enter event title"
                placeholderTextColor="#D9D9D9"
                value={eventTitle}
                onChangeText={setEventTitle}
                className="bg-[#F8F9FA] rounded-xl p-4"
                style={{
                  color: "#000000",
                }}
              />
            </View>

            {/* Date and Time Row */}
            <View className="flex-row gap-3">
              <View className="flex-1">
                <Text className="text-[13px] text-black mb-2 font-bold" style={{}}>
                  Date
                </Text>
                <TouchableOpacity
                  onPress={() => setShowDatePicker(true)}
                  className="bg-[#F8F9FA] rounded-xl p-4 flex-row items-center justify-between"
                >
                  <Text
                    style={{
                      color: "#000000",
                    }}
                  >
                    {formatDate(eventDate)}
                  </Text>
                  <Ionicons name="calendar-outline" size={18} color="#6C757D" />
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
                          className="text-[13px] text-[#6C757D] mb-2"
                          style={{}}
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
                        <Text style={{ fontFamily: "HankenGrotesk_500Medium" }} className="text-[#6C757D] text-[13px]">
                          Cancel
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => setShowDatePicker(false)}
                        className="flex-1 bg-[#0066CC] rounded-xl py-2 items-center"
                      >
                        <Text style={{ fontFamily: "HankenGrotesk_500Medium" }} className="text-white text-[13px]">
                          Done
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
              </View>
              <View className="flex-1">
                <Text className="text-[13px] text-black mb-2 font-bold" style={{}}>
                  Time
                </Text>
                <TouchableOpacity
                  onPress={() => setShowTimePicker(true)}
                  className="bg-[#F8F9FA] rounded-xl p-4 flex-row items-center justify-between"
                >
                  <Text
                    style={{
                      color: "#000000",
                    }}
                  >
                    {formatTime(eventTime)}
                  </Text>
                  <Ionicons name="time-outline" size={18} color="#6C757D" />
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
                          className="text-[13px] text-[#6C757D] mb-2"
                          style={{}}
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
                        <Text style={{}} className="text-[#6C757D]">
                          Cancel
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => setShowTimePicker(false)}
                        className="flex-1 bg-[#0066CC] rounded-xl py-2 items-center"
                      >
                        <Text style={{}} className="text-white">
                          Done
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
              </View>
            </View>

            {/* Location */}
            <View>
              <Text className="text-[13px] text-black mb-2 font-bold" style={{}}>
                Location
              </Text>
              <TextInput
                placeholder="Enter event location"
                placeholderTextColor="#D9D9D9"
                value={eventLocation}
                onChangeText={setEventLocation}
                className="bg-[#F8F9FA] rounded-xl p-4"
                style={{
                  color: "#000000",
                }}
              />
            </View>

            {/* Category */}
            <View>
              <Text className="text-[13px] text-black mb-2 font-bold" style={{}}>
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
                      className={`text-[13px] ${
                        eventCategory === category
                          ? "text-white"
                          : "text-[#6C757D]"
                      }`}
                      style={{
                        fontFamily:
                          eventCategory === category
                            ? "HankenGrotesk_500Medium"
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
              <Text className="text-[13px] text-black mb-2 font-bold" style={{}}>
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
                  color: "#000000",
                  minHeight: 100,
                }}
              />
            </View>

            {/* Event Media Action Buttons */}
            <View>
              <Text className="text-[13px] text-black mb-2 font-bold" style={{}}>
                Media (Optional)
              </Text>
              <View className="flex-row gap-3">
                {/* Photo Button */}
                <TouchableOpacity
                  onPress={handlePhotoPress}
                  className="flex-1 flex-row items-center justify-center gap-2 bg-[#D9D9D9] rounded-full py-4 px-4"
                >
                  <Ionicons name="image-outline" size={18} color="#6C757D" />
                  <Text className="text-[13px] text-[#6C757D]" style={{}}>
                    Photo
                  </Text>
                </TouchableOpacity>

                {/* Video Button */}
                <TouchableOpacity
                  onPress={handleVideoPress}
                  className="flex-1 flex-row items-center justify-center gap-2 bg-[#D9D9D9] rounded-full py-4 px-4"
                >
                  <Ionicons name="videocam-outline" size={18} color="#6C757D" />
                  <Text className="text-[13px] text-[#6C757D]" style={{}}>
                    Video
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setShowPollModal(true)}
                  className="flex-1 flex-row items-center justify-center gap-2 bg-[#D9D9D9] rounded-full py-4 px-4"
                >
                  <Ionicons
                    name="bar-chart-outline"
                    size={18}
                    color="#6C757D"
                  />
                  <Text className="text-[13px] text-[#6C757D]" style={{}}>
                    Poll
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Selected Event Images */}
            {eventImages.length > 0 && (
              <View>
                <Text className="text-[13px] text-black mb-2" style={{}}>
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
                <Text className="text-[13px] text-black mb-2" style={{}}>
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
                <Text className="text-[15px] text-[#0066CC]" style={{}}>
                  Poll
                </Text>
                <TouchableOpacity onPress={() => setShowPollModal(true)}>
                  <Feather name="edit-2" size={18} color="#0066CC" />
                </TouchableOpacity>
              </View>
              <Text className="text-[15px] text-black mb-3" style={{}}>
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
                      <Text className="text-[13px] text-black" style={{}}>
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
                <Ionicons name="image-outline" size={18} color="#6C757D" />
                <Text className="text-[13px] text-[#6C757D]" style={{}}>
                  Photo
                </Text>
              </TouchableOpacity>

              {/* Video Button */}
              <TouchableOpacity
                onPress={handleVideoPress}
                className="flex-1 flex-row items-center justify-center gap-2 bg-[#D9D9D9] rounded-full py-4 px-4"
              >
                <Ionicons name="videocam-outline" size={18} color="#6C757D" />
                <Text className="text-[13px] text-[#6C757D]" style={{}}>
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
                  size={18}
                  color={hasPoll ? "#0066CC" : "#6C757D"}
                />
                <Text
                  className={`text-[13px] ${
                    hasPoll ? "text-[#0066CC]" : "text-[#6C757D]"
                  }`}
                  style={{
                    fontFamily: hasPoll
                      ? "HankenGrotesk_500Medium"
                      : "HankenGrotesk_500Medium",
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
              <Text className="text-[15px] text-black font-bold" style={{}}>
                Allow Comments
              </Text>
              <View className="flex-row items-center justify-between">
                <Text className="text-[15px] text-[#6C757D] flex-1" style={{}}>
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
          <SolidMainButton
            text={contentType === "post" ? "Create Post" : "Create Event"}
            onPress={handleCreatePost}
          />
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
              <Text className="text-[17px] text-black font-bold" style={{}}>
                Create Poll
              </Text>
              <TouchableOpacity onPress={() => setShowPollModal(false)}>
                <Ionicons name="close-outline" size={22} color="#666666" />
              </TouchableOpacity>
            </View>

            {/* Poll Question */}
            <View className="mb-4">
              <Text className="text-[13px] text-black mb-2 font-bold" style={{}}>
                Poll Question
              </Text>
              <TextInput
                placeholder="Ask a question..."
                placeholderTextColor="#D9D9D9"
                value={pollQuestion}
                onChangeText={setPollQuestion}
                className="bg-[#F8F9FA] rounded-xl p-4"
                style={{
                  color: "#000000",
                }}
              />
            </View>

            {/* Poll Options */}
            <View className="mb-4">
              <Text className="text-[13px] text-black mb-2 font-bold" style={{}}>
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
                          color: "#000000",
                        }}
                      />
                      {pollOptions.length > 2 && (
                        <TouchableOpacity
                          onPress={() => handleRemovePollOption(index)}
                          className="p-2"
                        >
                          <Ionicons
                            name="close-circle-outline"
                            size={22}
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
                <Ionicons name="add" size={18} color="#0066CC" />
                <Text className="text-[#0066CC] text-[15px]" style={{ fontFamily: "HankenGrotesk_500Medium" }}>
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
                <Text className="text-[#6C757D] text-[15px]" style={{ fontFamily: "HankenGrotesk_500Medium" }}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSavePoll}
                className="flex-1 py-3 bg-[#0066CC] rounded-xl items-center"
              >
                <Text className="text-white text-[15px]" style={{ fontFamily: "HankenGrotesk_500Medium" }}>
                  Save Poll
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <CustomAlert
        visible={alertVisible}
        title={alertConfig.title}
        message={alertConfig.message}
        onClose={() => {
          setAlertVisible(false);
          router.back();
        }}
      />
    </SafeAreaView>
  );
};

export default CreateContent;
