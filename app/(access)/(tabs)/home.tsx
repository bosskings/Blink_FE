import { CommunityCard } from "@/components/cards/CommunityCard";
import { DiscussionCard } from "@/components/cards/DiscussionCard";
import { ProductCard } from "@/components/cards/ProductCard";
import { RequestCard } from "@/components/cards/RequestCard";
import { ProfileHeader } from "@/components/ProfileHeader";
import { SearchInput } from "@/components/SearchInput";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { useFocusEffect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { FloatingActionMenu } from "./_components/FloatingActionMenu";
import { MainFilterModal } from "./_components/MainFilterModal";
import { SearchFilterModal } from "./_components/SearchFilterModal";
import { SortModal } from "./_components/SortModal";

const { height } = Dimensions.get("window");

const HomeScreen = () => {
  const [activeTab, setActiveTab] = React.useState("forYou");
  const [viewMode, setViewMode] = React.useState("list");
  const [filterVisible, setFilterVisible] = React.useState(false);
  const slideAnim = React.useRef(new Animated.Value(height)).current;
  const insets = useSafeAreaInsets();

  const [displayName, setDisplayName] = React.useState("Lasman Ade");
  const [avatarSource, setAvatarSource] = React.useState<any>(
    require("../../../assets/avatars/avatar1.png"),
  );

  const [searchQuery, setSearchQuery] = React.useState("");
  const [activeSearchPill, setActiveSearchPill] = React.useState<
    "map" | "community" | null
  >(null);
  const [selectedMapArea, setSelectedMapArea] = React.useState<
    "city" | "country" | "state" | "town" | null
  >(null);
  const [selectedCommunityOption, setSelectedCommunityOption] = React.useState<
    "joined" | "specific" | null
  >(null);
  const [specificCommunitiesExpanded, setSpecificCommunitiesExpanded] =
    React.useState(false);
  const [checkedCommunities, setCheckedCommunities] = React.useState<string[]>(
    [],
  );

  const [sortVisible, setSortVisible] = React.useState(false);
  const [activeSort, setActiveSort] = React.useState<
    "Trending" | "Newest Arrivals" | "Price: Low to High" | "Price: High to Low"
  >("Trending");

  const [appliedSearchQuery, setAppliedSearchQuery] = React.useState("");
  const [appliedSearchPill, setAppliedSearchPill] = React.useState<
    "map" | "community" | null
  >(null);
  const [appliedMapArea, setAppliedMapArea] = React.useState<
    "city" | "country" | "state" | "town" | null
  >(null);
  const [appliedCommunityOption, setAppliedCommunityOption] = React.useState<
    "joined" | "specific" | null
  >(null);
  const [appliedCheckedCommunities, setAppliedCheckedCommunities] =
    React.useState<string[]>([]);

  const [mainFilterVisible, setMainFilterVisible] = React.useState(false);
  const [distance, setDistance] = React.useState(0);
  const [appliedDistance, setAppliedDistance] = React.useState(0);
  const [itemType, setItemType] = React.useState<
    "All" | "Goods" | "Services" | "Requests" | null
  >(null);
  const [appliedItemType, setAppliedItemType] = React.useState<
    "All" | "Goods" | "Services" | "Requests" | null
  >(null);
  const [minPrice, setMinPrice] = React.useState("");
  const [appliedMinPrice, setAppliedMinPrice] = React.useState("");
  const [maxPrice, setMaxPrice] = React.useState("");
  const [appliedMaxPrice, setAppliedMaxPrice] = React.useState("");
  const [listingType, setListingType] = React.useState<
    "All" | "For Sale" | "For Rent" | null
  >(null);
  const [appliedListingType, setAppliedListingType] = React.useState<
    "All" | "For Sale" | "For Rent" | null
  >(null);

  const [sliderWidth, setSliderWidth] = React.useState(250);

  const [likedDiscussions, setLikedDiscussions] = React.useState<string[]>([]);
  const toggleLikeDiscussion = (id: string) => {
    setLikedDiscussions((prev) =>
      prev.includes(id) ? prev.filter((dId) => dId !== id) : [...prev, id],
    );
  };

  const [floatingMenuVisible, setFloatingMenuVisible] = React.useState(false);
  const menuAnim = React.useRef(new Animated.Value(0)).current;

  const openFloatingMenu = () => {
    setFloatingMenuVisible(true);
    Animated.timing(menuAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeFloatingMenu = () => {
    Animated.timing(menuAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start(() => setFloatingMenuVisible(false));
  };

  const [createListingVisible, setCreateListingVisible] = React.useState(false);
  const [createListingStep, setCreateListingStep] = React.useState(1);

  const [listingCategory, setListingCategory] = React.useState<string | null>(
    null,
  );
  const [listingTitle, setListingTitle] = React.useState("");
  const [listingDesc, setListingDesc] = React.useState("");
  const [listingCondition, setListingCondition] = React.useState<string | null>(
    null,
  );
  const [listingDetails, setListingDetails] = React.useState<string[]>([]);
  const [listingPhotos, setListingPhotos] = React.useState<string[]>([]);
  const [listingPrice, setListingPrice] = React.useState("");
  const [listingLocation, setListingLocation] = React.useState(
    "Covenant University",
  );
  const [listingVerification, setListingVerification] =
    React.useState("Bronze");

  const [listingTransactionType, setListingTransactionType] = React.useState<
    "Sale" | "Lease" | "Free"
  >("Sale");
  const [listingPriceNegotiable, setListingPriceNegotiable] =
    React.useState(false);
  const [listingStartDate, setListingStartDate] = React.useState("");
  const [listingEndDate, setListingEndDate] = React.useState("");
  const [listingDuration, setListingDuration] = React.useState("7 Days");
  const [listingPickupOption, setListingPickupOption] =
    React.useState("My Location");
  const [listingAvailability, setListingAvailability] = React.useState<
    string[]
  >(["Anytime"]);
  const [listingSearchComm, setListingSearchComm] = React.useState("");
  const [listingQuickSel, setListingQuickSel] =
    React.useState("Nearby Communities");
  const [listingRecComms, setListingRecComms] = React.useState<string[]>([
    "Downtown",
    "Hillside",
  ]);
  const [listingPostMap, setListingPostMap] = React.useState(false);
  const [listingMapGeo, setListingMapGeo] = React.useState("");
  const [startDatePickerVisible, setStartDatePickerVisible] =
    React.useState(false);
  const [endDatePickerVisible, setEndDatePickerVisible] = React.useState(false);

  const [listingPublishPush, setListingPublishPush] = React.useState(true);
  const [listingPublishShare, setListingPublishShare] = React.useState(true);
  const [listingPublishRepost, setListingPublishRepost] = React.useState(false);
  const [listingAgreement, setListingAgreement] = React.useState(false);

  const [createRequestVisible, setCreateRequestVisible] = React.useState(false);
  const [requestTitle, setRequestTitle] = React.useState("");
  const [requestDesc, setRequestDesc] = React.useState("");
  const [requestType, setRequestType] = React.useState<
    "Buy" | "Rent" | "Borrow"
  >("Borrow");
  const [requestBudget, setRequestBudget] = React.useState("");
  const [requestUrgency, setRequestUrgency] = React.useState("Low priority");
  const [requestDuration, setRequestDuration] = React.useState("Few hours");
  const [requestCommType, setRequestCommType] =
    React.useState("Joined Communities");

  const communitiesList = [
    { name: "Covenant University", slug: "covenant" },
    { name: "Downtown", slug: "downtown" },
    { name: "Riverside", slug: "riverside" },
    { name: "Hillside", slug: "hillside" },
  ];

  useFocusEffect(
    React.useCallback(() => {
      const loadUserData = async () => {
        const savedTag = await AsyncStorage.getItem("blink_tag");
        if (savedTag) setDisplayName(savedTag);
        const savedAvatar = await AsyncStorage.getItem("user_avatar");
        if (savedAvatar) {
          if (
            savedAvatar.startsWith("http") ||
            savedAvatar.startsWith("file://") ||
            savedAvatar.startsWith("content://")
          ) {
            setAvatarSource({ uri: savedAvatar });
          } else {
            switch (savedAvatar) {
              case "avatar1":
                setAvatarSource(require("../../../assets/avatars/avatar1.png"));
                break;
              case "avatar2":
                setAvatarSource(require("../../../assets/avatars/avatar2.png"));
                break;
              case "avatar3":
                setAvatarSource(require("../../../assets/avatars/avatar3.png"));
                break;
              case "avatar4":
                setAvatarSource(require("../../../assets/avatars/avatar4.png"));
                break;
              default:
                setAvatarSource(require("../../../assets/avatars/avatar1.png"));
            }
          }
        }
      };
      loadUserData();
    }, []),
  );

  const products = [
    {
      id: "1",
      title: "Road Bicycle",
      price: "₦45,000",
      description:
        "Great condition road bicycle, perfect for city rides and weekend adventures.",
      timePosted: "2h ago",
      distance: "0.7km away",
      image:
        "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&h=600&fit=crop",
      tag: "SALE",
      images: [
        "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800",
      ],
    },
    {
      id: "2",
      title: "Laptop Stand",
      price: "₦12,500",
      description: "Adjustable aluminum laptop stand, barely used",
      distance: "0.5km away",
      timePosted: "5h ago",
      image:
        "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=600&fit=crop",
      tag: "RENT",
      images: [
        "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&h=600&fit=crop",
      ],
    },
    {
      id: "3",
      title: "Office Chair",
      price: "₦35,000",
      description: "Ergonomic office chair with lumbar support",
      distance: "1.2km away",
      timePosted: "1d ago",
      image:
        "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800&h=600&fit=crop",
      tag: "SERVICE",
      images: [
        "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800&h=600&fit=crop",
      ],
    },
    {
      id: "4",
      title: "MacBook Pro M1 Laptop",
      price: "₦420,000",
      description: "Super fast Apple MacBook Pro M1, 8GB RAM, 256GB SSD",
      distance: "0.3km away",
      timePosted: "1h ago",
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop",
      tag: "SALE",
      images: [
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800",
      ],
    },
    {
      id: "5",
      title: "HP EliteBook Laptop",
      price: "₦180,000",
      description: "Core i7 business laptop, 16GB RAM, 512GB SSD",
      distance: "1.8km away",
      timePosted: "3h ago",
      image:
        "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&h=600&fit=crop",
      tag: "SALE",
      images: [
        "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800",
      ],
    },
  ];

  const requests = [
    {
      id: "req1",
      priority: "URGENT PRIORITY",
      title: "Looking for: An umbrella",
      description: "I need an umbrella ASAP!",
      timePosted: "Posted 8 mins ago",
      responsesCount: "3 responses",
      requester: {
        name: "Anna Montana",
        distance: "0.2km away",
        avatar: require("../../../assets/avatars/avatar3.png"),
      },
    },
    {
      id: "req2",
      priority: "URGENT PRIORITY",
      title: "Looking for: Laptop Charger",
      description:
        "My USB-C laptop charger stopped working, need to borrow one for tonight!",
      timePosted: "Posted 15 mins ago",
      responsesCount: "1 response",
      requester: {
        name: "David Adeleke",
        distance: "0.6km away",
        avatar: require("../../../assets/avatars/avatar2.png"),
      },
    },
  ];

  const communities = [
    {
      id: "1",
      name: "Downtown",
      members: "2.3k",
      image:
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
    },
    {
      id: "2",
      name: "Riverside",
      members: "1.0k",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    },
  ];

  const discussions = [
    {
      id: "1",
      user: "Mike Berger",
      time: "2 hours ago",
      community: "Covenant University",
      content: "Anyone with ENG 201 past questions?\nExams are coming fast 😩",
      tags: ["#ExamSeason", "#StudyTips"],
      likes: 124,
      comments: 67,
      avatar:
        "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
    },
    {
      id: "2",
      user: "Mike Berger",
      time: "2 hours ago",
      community: "Ota Central Market",
      content: "Anyone with ENG 201 past questions?\nExams are coming fast 😩",
      tags: ["#ExamSeason", "#StudyTips"],
      likes: 124,
      comments: 67,
      avatar:
        "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0",
    },
  ];

  const openFilter = () => setMainFilterVisible(true);
  const openSearchFilter = () => {
    setFilterVisible(true);
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
      tension: 65,
      friction: 11,
    }).start();
  };
  const closeFilter = () => {
    Animated.timing(slideAnim, {
      toValue: height,
      duration: 250,
      useNativeDriver: true,
    }).start(() => setFilterVisible(false));
  };
  const toggleCommunityCheck = (slug: string) => {
    setCheckedCommunities((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    );
  };

  const handleApplyFilters = () => {
    setAppliedSearchQuery(searchQuery);
    setAppliedSearchPill(activeSearchPill);
    setAppliedMapArea(selectedMapArea);
    setAppliedCommunityOption(selectedCommunityOption);
    setAppliedCheckedCommunities(checkedCommunities);
    closeFilter();
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setActiveSearchPill(null);
    setSelectedMapArea(null);
    setSelectedCommunityOption(null);
    setSpecificCommunitiesExpanded(false);
    setCheckedCommunities([]);
    setAppliedSearchQuery("");
    setAppliedSearchPill(null);
    setAppliedMapArea(null);
    setAppliedCommunityOption(null);
    setAppliedCheckedCommunities([]);
    closeFilter();
  };

  const handleApplyMainFilters = () => {
    setAppliedDistance(distance);
    setAppliedItemType(itemType);
    setAppliedMinPrice(minPrice);
    setAppliedMaxPrice(maxPrice);
    setAppliedListingType(listingType);
    setMainFilterVisible(false);
  };

  const handleResetMainFilters = () => {
    setDistance(0);
    setItemType(null);
    setMinPrice("");
    setMaxPrice("");
    setListingType(null);
    setAppliedDistance(0);
    setAppliedItemType(null);
    setAppliedMinPrice("");
    setAppliedMaxPrice("");
    setAppliedListingType(null);
    setMainFilterVisible(false);
  };

  const filteredProducts = React.useMemo(() => {
    let result = [...products];
    const query = (searchQuery || appliedSearchQuery).trim().toLowerCase();
    if (query) {
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query),
      );
    }
    if (
      appliedSearchPill === "community" &&
      appliedCommunityOption === "joined"
    ) {
      result = result.filter((p) => p.distance.includes("km"));
    } else if (
      appliedSearchPill === "community" &&
      appliedCommunityOption === "specific" &&
      appliedCheckedCommunities.length > 0
    ) {
      result = result.filter((p) => {
        if (p.id === "1" && appliedCheckedCommunities.includes("downtown"))
          return true;
        if (p.id === "2" && appliedCheckedCommunities.includes("hillside"))
          return true;
        return false;
      });
    }
    if (appliedSearchPill === "map" && appliedMapArea === "city") {
      result = result.filter((p) => parseFloat(p.distance) <= 1.0);
    } else if (appliedSearchPill === "map" && appliedMapArea === "town") {
      result = result.filter((p) => parseFloat(p.distance) <= 2.0);
    }
    if (appliedMinPrice !== "" || appliedMaxPrice !== "") {
      const minVal = parseFloat(appliedMinPrice) || 0;
      const maxVal = parseFloat(appliedMaxPrice) || Infinity;
      result = result.filter((p) => {
        const priceNum = parseInt(p.price.replace(/[^\d]/g, ""), 10) || 0;
        return priceNum >= minVal && priceNum <= maxVal;
      });
    }
    if (appliedItemType && appliedItemType !== "All") {
      result = result.filter((p) => {
        if (appliedItemType === "Goods") return p.tag === "SALE";
        if (appliedItemType === "Services") return p.tag === "SERVICE";
        if (appliedItemType === "Requests") return p.tag === "RENT";
        return true;
      });
    }
    if (appliedListingType && appliedListingType !== "All") {
      result = result.filter((p) => {
        if (appliedListingType === "For Sale") return p.tag === "SALE";
        if (appliedListingType === "For Rent") return p.tag === "RENT";
        return true;
      });
    }
    if (appliedDistance > 0) {
      result = result.filter((p) => {
        const distNum = parseFloat(p.distance) || 0;
        return distNum <= appliedDistance * 0.05;
      });
    }
    if (activeSort === "Price: Low to High") {
      result.sort((a, b) => {
        const pA = parseInt(a.price.replace(/[^\d]/g, ""), 10) || 0;
        const pB = parseInt(b.price.replace(/[^\d]/g, ""), 10) || 0;
        return pA - pB;
      });
    } else if (activeSort === "Price: High to Low") {
      result.sort((a, b) => {
        const pA = parseInt(a.price.replace(/[^\d]/g, ""), 10) || 0;
        const pB = parseInt(b.price.replace(/[^\d]/g, ""), 10) || 0;
        return pB - pA;
      });
    } else if (activeSort === "Newest Arrivals") {
      result.sort((a, b) => {
        if (a.timePosted.includes("h") && b.timePosted.includes("d")) return -1;
        if (a.timePosted.includes("d") && b.timePosted.includes("h")) return 1;
        return parseFloat(a.timePosted) - parseFloat(b.timePosted);
      });
    }
    return result;
  }, [
    searchQuery,
    appliedSearchQuery,
    appliedSearchPill,
    appliedMapArea,
    appliedCommunityOption,
    appliedCheckedCommunities,
    appliedDistance,
    appliedItemType,
    appliedMinPrice,
    appliedMaxPrice,
    appliedListingType,
    activeSort,
  ]);

  const filteredRequests = React.useMemo(() => {
    let result = [...requests];
    const query = (searchQuery || appliedSearchQuery).trim().toLowerCase();
    if (query) {
      result = result.filter(
        (r) =>
          r.title.toLowerCase().includes(query) ||
          r.description.toLowerCase().includes(query),
      );
    }
    return result;
  }, [searchQuery, appliedSearchQuery, requests]);

  const filteredDiscussions = React.useMemo(() => {
    let result = [...discussions];
    const query = (searchQuery || appliedSearchQuery).trim().toLowerCase();
    if (query) {
      result = result.filter(
        (d) =>
          d.user.toLowerCase().includes(query) ||
          d.content.toLowerCase().includes(query) ||
          d.community.toLowerCase().includes(query) ||
          d.tags.some((t) => t.toLowerCase().includes(query)),
      );
    }
    return result;
  }, [searchQuery, appliedSearchQuery, discussions]);

  const renderHeader = () => (
    <View>
      <View className="flex-row items-center justify-between px-4 py-3 pt-6">
        <TouchableOpacity className="flex-row items-center">
          <Ionicons name="people-outline" size={16} color="#9CA3AF" />
          <Text className="ml-1 text-[13px] text-gray-400">Following</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-[#0066CC] px-4 py-2 rounded flex-row items-center">
          <Ionicons name="eye-outline" size={16} color="#fff" />
          <Text className="ml-2 text-[13px] font-semibold text-white">
            Explore
          </Text>
        </TouchableOpacity>
      </View>

      {/* Urgent Priority Card */}
      <View className="p-4 mx-2 mt-8 mb-4 border border-gray-200 rounded-xl bg-gray-50">
        <View className="flex-row items-center mb-2">
          <View className="w-1 h-4 mr-2 bg-red-600 rounded" />
          <Text className="text-[12px] font-bold text-red-600 uppercase">
            Urgent Priority
          </Text>
        </View>
        <Text className="mb-1 text-lg font-bold">Looking for: An umbrella</Text>
        <Text className="mb-3 text-[13px] text-gray-600">
          I need an umbrella ASAP!
        </Text>
        <View className="flex-row items-center mb-3">
          <Ionicons name="time-outline" size={14} color="#6B7280" />
          <Text className="ml-1 mr-4 text-[12px] text-gray-500">
            Posted 3 mins ago
          </Text>
          <Ionicons name="chatbubble-outline" size={14} color="#6B7280" />
          <Text className="ml-1 text-[12px] text-gray-500">3 responses</Text>
        </View>
        <View className="flex-row items-center justify-between p-2 rounded-lg bg-gray-50">
          <View className="flex-row items-center">
            <View className="items-center justify-center w-10 h-10 mr-2 overflow-hidden bg-orange-400 rounded-full">
              <Image
                source={require("../../../assets/avatars/avatar3.png")}
                className="object-contain w-full h-full"
              />
            </View>
            <View>
              <Text className="text-[13px] font-semibold">Anna Montana</Text>
              <Text className="text-[12px] text-gray-500">0.2km away</Text>
            </View>
          </View>
          <TouchableOpacity>
            <Ionicons name="chatbubble-outline" size={18} color="#9CA3AF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Suggested Communities */}
      <View className="px-4 pt-6 mb-4">
        <Text className="mb-3 text-lg font-bold">Suggested Communities</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {communities.map((community) => (
            <CommunityCard
              key={community.id}
              id={parseInt(community.id)}
              name={community.name}
              members={community.members}
              status="Discover"
              image={community.image}
              variant="compact"
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 px-6 pt-4 bg-white">
      <StatusBar style="dark" />

      {/* Profile Header */}
      <ProfileHeader displayName={displayName} avatarSource={avatarSource} />

      {/* Search and Filter Bar */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 12,
          gap: 12,
        }}
      >
        <SearchInput
          placeholder="Search items and communities..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity
          onPress={openFilter}
          style={{
            flexDirection: "row",
            alignItems: "center",
            height: 44,
            backgroundColor: "#F0F7FF",
            borderRadius: 10,
            paddingHorizontal: 14,
            gap: 8,
          }}
          activeOpacity={0.8}
        >
          <Ionicons name="options-outline" size={16} color="#000000" />
          <Text
            style={{
              fontFamily: "HankenGrotesk_500Medium",
              fontSize: 13,
              color: "#000000",
            }}
          >
            Filter
          </Text>
        </TouchableOpacity>
      </View>

      {/* Global Tabs */}
      <View className="flex-row border-b border-gray-200">
        {["forYou", "requests", "discussions"].map((tab) => (
          <TouchableOpacity
            key={tab}
            className={`flex-1 py-3 ${activeTab === tab ? "border-b-2 border-[#0066CC]" : ""}`}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              className={`text-center text-[13px] ${activeTab === tab ? "text-[#0066CC] font-semibold" : "text-gray-500"}`}
            >
              {tab === "forYou"
                ? "For You"
                : tab === "requests"
                  ? "Requests"
                  : "Discussions"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Conditionally Swap FlatLists based on activeTab */}
      {activeTab === "requests" ? (
        <FlatList
          data={filteredRequests}
          renderItem={({ item }) => <RequestCard item={item} styles={styles} />}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: insets.bottom + 80,
            paddingTop: 8,
          }}
        />
      ) : activeTab === "discussions" ? (
        <FlatList
          data={filteredDiscussions}
          renderItem={({ item }) => (
            <DiscussionCard
              item={item}
              likedDiscussions={likedDiscussions}
              toggleLikeDiscussion={toggleLikeDiscussion}
            />
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: insets.bottom + 80,
            paddingTop: 8,
          }}
        />
      ) : (
        <FlatList
          data={filteredProducts}
          renderItem={({ item }) => <ProductCard item={item} />}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={renderHeader}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: insets.bottom + 80 }}
        />
      )}

      {/* Search Filter Modal */}
      <SearchFilterModal
        visible={filterVisible}
        onClose={closeFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeSearchPill={activeSearchPill}
        setActiveSearchPill={setActiveSearchPill}
        selectedMapArea={selectedMapArea}
        setSelectedMapArea={setSelectedMapArea}
        selectedCommunityOption={selectedCommunityOption}
        setSelectedCommunityOption={setSelectedCommunityOption}
        specificCommunitiesExpanded={specificCommunitiesExpanded}
        setSpecificCommunitiesExpanded={setSpecificCommunitiesExpanded}
        checkedCommunities={checkedCommunities}
        toggleCommunityCheck={toggleCommunityCheck}
        communitiesList={communitiesList}
        onApply={handleApplyFilters}
        onReset={handleResetFilters}
        onSortPress={() => setSortVisible(true)}
      />

      {/* Main Filter Modal */}
      <MainFilterModal
        visible={mainFilterVisible}
        onClose={() => setMainFilterVisible(false)}
        distance={distance}
        setDistance={setDistance}
        itemType={itemType}
        setItemType={setItemType}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        listingType={listingType}
        setListingType={setListingType}
        sliderWidth={sliderWidth}
        setSliderWidth={setSliderWidth}
        onApply={handleApplyMainFilters}
        onReset={handleResetMainFilters}
      />

      {/* Sort Modal */}
      <SortModal
        visible={sortVisible}
        onClose={() => setSortVisible(false)}
        activeSort={activeSort}
        onSelect={setActiveSort}
      />

      {/* Floating Action Menu */}
      <FloatingActionMenu
        visible={floatingMenuVisible}
        menuAnim={menuAnim}
        onClose={closeFloatingMenu}
        onCreateListing={() => {
          closeFloatingMenu();
          setCreateListingStep(1);
          setListingCategory(null);
          setListingTitle("");
          setListingDesc("");
          setListingCondition(null);
          setListingDetails([]);
          setListingPhotos([]);
          setListingPrice("");
          setCreateListingVisible(true);
        }}
        onMakeRequest={() => {
          closeFloatingMenu();
          setRequestTitle("");
          setRequestDesc("");
          setRequestType("Borrow");
          setRequestBudget("");
          setRequestUrgency("Low priority");
          setRequestDuration("Few hours");
          setRequestCommType("Joined Communities");
          setCreateRequestVisible(true);
        }}
        onPostToForum={closeFloatingMenu}
      />

      {/* Create Listing Flow Modal */}
      <Modal
        visible={createListingVisible}
        transparent={false}
        animationType="slide"
        onRequestClose={() => setCreateListingVisible(false)}
      >
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
          {createListingStep < 8 && (
            <View style={styles.wizardHeader}>
              <TouchableOpacity
                onPress={() => {
                  if (createListingStep > 1)
                    setCreateListingStep(createListingStep - 1);
                  else setCreateListingVisible(false);
                }}
                style={styles.wizardBackBtn}
                activeOpacity={0.7}
              >
                <Ionicons name="arrow-back" size={22} color="#000000" />
              </TouchableOpacity>
              <Text style={styles.wizardHeaderTitle}>Create Listing</Text>
              <View style={{ width: 44 }} />
            </View>
          )}
          {createListingStep < 8 && (
            <View style={styles.wizardProgressSection}>
              <Text style={styles.wizardStepText}>
                Step {createListingStep} of 7
              </Text>
              <View style={styles.wizardTrackBackground}>
                <View
                  style={[
                    styles.wizardTrackActive,
                    { width: `${(createListingStep / 7) * 100}%` },
                  ]}
                />
              </View>
            </View>
          )}
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.wizardScrollContent}
          >
            {/* Step 1: Category Selection */}
            {createListingStep === 1 && (
              <View>
                <Text style={styles.wizardTitle}>What are you listing?</Text>
                <Text style={styles.wizardSubtitle}>
                  Choose the category that best describes your item
                </Text>
                <View style={styles.categoryGrid}>
                  {[
                    {
                      name: "Electronics",
                      icon: "phone-portrait-outline",
                      color: "#E0EBFF",
                      textCol: "#0066CC",
                    },
                    {
                      name: "Furniture",
                      icon: "home-outline",
                      color: "#E6F9F0",
                      textCol: "#00A84E",
                    },
                    {
                      name: "Clothing",
                      icon: "shirt-outline",
                      color: "#FCE8FF",
                      textCol: "#D500F9",
                    },
                    {
                      name: "Books",
                      icon: "book-outline",
                      color: "#FFF4E0",
                      textCol: "#FF8F00",
                    },
                    {
                      name: "Sports",
                      icon: "flash-outline",
                      color: "#FFEAEA",
                      textCol: "#E53935",
                    },
                    {
                      name: "Others",
                      icon: "ellipsis-horizontal",
                      color: "#F3F4F6",
                      textCol: "#6B7280",
                    },
                  ].map((cat) => {
                    const isSelected = listingCategory === cat.name;
                    return (
                      <TouchableOpacity
                        key={cat.name}
                        onPress={() => setListingCategory(cat.name)}
                        style={[
                          styles.categoryCard,
                          isSelected && styles.categoryCardSelected,
                        ]}
                        activeOpacity={0.8}
                      >
                        <View
                          style={[
                            styles.categoryIconBox,
                            { backgroundColor: cat.color },
                          ]}
                        >
                          <Ionicons
                            name={cat.icon as any}
                            size={22}
                            color={cat.textCol}
                          />
                        </View>
                        <Text style={styles.categoryCardText}>{cat.name}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            )}

            {/* Step 2: Tell us about your item */}
            {createListingStep === 2 && (
              <View>
                <Text style={styles.wizardTitle}>Tell us about your item</Text>
                <Text style={styles.wizardSubtitle}>
                  Add details to help buyers understand what you&apos;re
                  offering
                </Text>
                <Text style={styles.fieldLabel}>Title *</Text>
                <TextInput
                  value={listingTitle}
                  onChangeText={setListingTitle}
                  placeholder="ex: iPhone 13 Pro Max 256GB"
                  placeholderTextColor="#9CA3AF"
                  style={styles.wizardInput}
                />
                <Text style={styles.fieldLabel}>Description</Text>
                <View style={styles.descContainer}>
                  <TextInput
                    value={listingDesc}
                    onChangeText={(text) => {
                      if (text.length <= 500) setListingDesc(text);
                    }}
                    placeholder="Describe your item's features"
                    placeholderTextColor="#9CA3AF"
                    multiline
                    numberOfLines={4}
                    style={styles.descTextArea}
                  />
                  <Text style={styles.charCounter}>
                    {listingDesc.length}/500 characters
                  </Text>
                </View>
                <Text style={styles.fieldLabel}>Condition *</Text>
                <View style={{ gap: 10 }}>
                  {[
                    { title: "New", desc: "(Never used)" },
                    { title: "Like New", desc: "(Barely used)" },
                    { title: "Good", desc: "(Minor wear)" },
                    { title: "Fair", desc: "(Visible wear)" },
                  ].map((cond) => {
                    const isSelected = listingCondition === cond.title;
                    return (
                      <TouchableOpacity
                        key={cond.title}
                        onPress={() => setListingCondition(cond.title)}
                        style={styles.conditionOptionCard}
                        activeOpacity={0.7}
                      >
                        <View
                          style={[
                            styles.radioCircleLeft,
                            isSelected && styles.radioCircleLeftActive,
                          ]}
                        >
                          {isSelected && <View style={styles.radioDotInner} />}
                        </View>
                        <View>
                          <Text style={styles.conditionTitle}>
                            {cond.title}
                          </Text>
                          <Text style={styles.conditionDesc}>{cond.desc}</Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
                <Text style={styles.fieldLabel}>Specific Details *</Text>
                <Text style={styles.fieldSubLabel}>
                  Add specific attributes like brand, model, size, color etc.
                </Text>
                <View style={styles.quickTagsRow}>
                  {["Brand", "Model", "Size", "Color", "Year"].map((tag) => (
                    <TouchableOpacity
                      key={tag}
                      onPress={() => {
                        if (!listingDetails.includes(tag))
                          setListingDetails([
                            ...listingDetails,
                            `${tag}: Value`,
                          ]);
                      }}
                      style={styles.quickTagPill}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.quickTagText}>{tag}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <View style={styles.detailsBox}>
                  {listingDetails.length === 0 ? (
                    <View
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        paddingVertical: 12,
                      }}
                    >
                      <Ionicons
                        name="document-text-outline"
                        size={32}
                        color="#9CA3AF"
                      />
                      <Text style={styles.detailsBoxEmptyText}>
                        No specific details added yet
                      </Text>
                      <Text style={styles.detailsBoxSubText}>
                        Tap &apos;Add Detail&apos; or use quick add buttons
                      </Text>
                    </View>
                  ) : (
                    <View style={{ gap: 8 }}>
                      {listingDetails.map((detail, idx) => (
                        <View key={idx} style={styles.detailRowItem}>
                          <Text style={styles.detailRowText}>{detail}</Text>
                          <TouchableOpacity
                            onPress={() =>
                              setListingDetails(
                                listingDetails.filter((_, i) => i !== idx),
                              )
                            }
                          >
                            <Ionicons
                              name="close-circle"
                              size={18}
                              color="#EF4444"
                            />
                          </TouchableOpacity>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
                <TouchableOpacity
                  onPress={() =>
                    setListingDetails([...listingDetails, `Detail: Value`])
                  }
                  style={styles.addDetailBtn}
                  activeOpacity={0.8}
                >
                  <Ionicons name="add" size={18} color="#FFFFFF" />
                  <Text style={styles.addDetailText}>Add Detail</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Step 3: Add photos */}
            {createListingStep === 3 && (
              <View>
                <Text style={styles.wizardTitle}>Add photos of your item</Text>
                <Text style={styles.wizardSubtitle}>
                  Great photos helps your item sell faster. Add up to 8 photos
                </Text>
                <View style={styles.photosWrapper}>
                  {listingPhotos.length === 0 ? (
                    <View style={styles.emptyPhotosBox}>
                      <View style={styles.bluePlusCircleBig}>
                        <Ionicons name="add" size={26} color="#FFFFFF" />
                      </View>
                      <Text style={styles.addPhotoTitle}>
                        Add your first photo
                      </Text>
                      <Text style={styles.addPhotoSub}>
                        Tap to take a photo or choose from gallery
                      </Text>
                    </View>
                  ) : (
                    <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      style={{ flexDirection: "row", marginBottom: 16 }}
                    >
                      {listingPhotos.map((photo, idx) => (
                        <View key={idx} style={styles.photoPreviewCard}>
                          <Image
                            source={{ uri: photo }}
                            style={styles.photoPreviewImg}
                          />
                          <TouchableOpacity
                            onPress={() =>
                              setListingPhotos(
                                listingPhotos.filter((_, i) => i !== idx),
                              )
                            }
                            style={styles.deletePhotoBtn}
                          >
                            <Ionicons
                              name="close-circle"
                              size={18}
                              color="#EF4444"
                            />
                          </TouchableOpacity>
                        </View>
                      ))}
                    </ScrollView>
                  )}
                  <View style={{ flexDirection: "row", gap: 12, marginTop: 8 }}>
                    <TouchableOpacity
                      onPress={async () => {
                        const { status } =
                          await ImagePicker.requestCameraPermissionsAsync();
                        if (status === "granted") {
                          const result = await ImagePicker.launchCameraAsync({
                            mediaTypes: ImagePicker.MediaTypeOptions.Images,
                            allowsEditing: true,
                            quality: 0.8,
                          });
                          if (!result.canceled && result.assets?.[0]?.uri)
                            setListingPhotos([
                              ...listingPhotos,
                              result.assets[0].uri,
                            ]);
                        }
                      }}
                      style={styles.photoActionBtn}
                      activeOpacity={0.8}
                    >
                      <Ionicons
                        name="camera-outline"
                        size={18}
                        color="#000000"
                      />
                      <Text style={styles.photoActionBtnText}>Camera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={async () => {
                        const { status } =
                          await ImagePicker.requestMediaLibraryPermissionsAsync();
                        if (status === "granted") {
                          const result =
                            await ImagePicker.launchImageLibraryAsync({
                              mediaTypes: ImagePicker.MediaTypeOptions.Images,
                              allowsEditing: true,
                              quality: 0.8,
                            });
                          if (!result.canceled && result.assets?.[0]?.uri)
                            setListingPhotos([
                              ...listingPhotos,
                              result.assets[0].uri,
                            ]);
                        }
                      }}
                      style={styles.photoActionBtn}
                      activeOpacity={0.8}
                    >
                      <Ionicons
                        name="images-outline"
                        size={18}
                        color="#000000"
                      />
                      <Text style={styles.photoActionBtnText}>Gallery</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.photoTipsCard}>
                  <Text style={styles.photoTipsCardTitle}>Photo Tips</Text>
                  <View style={{ gap: 12, marginTop: 12 }}>
                    {[
                      "Use natural lighting and avoid shadows",
                      "Show the item from multiple angles",
                      "Include close-ups of any damage or wear",
                      "Keep backgrounds clean and uncluttered",
                    ].map((tip, idx) => (
                      <View key={idx} style={styles.tipRow}>
                        <Ionicons
                          name="checkmark-circle-outline"
                          size={18}
                          color="#0066CC"
                        />
                        <Text style={styles.tipText}>{tip}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            )}

            {/* Step 4: Price details */}
            {createListingStep === 4 && (
              <View>
                <Text style={styles.wizardTitle}>Set your price</Text>
                <Text style={styles.wizardSubtitle}>
                  Choose how you want to offer your item
                </Text>
                <Text style={styles.fieldLabel}>Transaction Type</Text>
                <View style={{ gap: 10 }}>
                  {[
                    { title: "Sale", desc: "Sell your item for a fixed price" },
                    { title: "Lease", desc: "Rent out your item temporarily" },
                    { title: "Free", desc: "Give away your item for free" },
                  ].map((tt) => {
                    const isSelected = listingTransactionType === tt.title;
                    return (
                      <TouchableOpacity
                        key={tt.title}
                        onPress={() =>
                          setListingTransactionType(tt.title as any)
                        }
                        style={[
                          styles.conditionOptionCard,
                          isSelected && styles.categoryCardSelected,
                        ]}
                        activeOpacity={0.7}
                      >
                        <View
                          style={[
                            styles.radioCircleLeft,
                            isSelected && styles.radioCircleLeftActive,
                          ]}
                        >
                          {isSelected && <View style={styles.radioDotInner} />}
                        </View>
                        <View>
                          <Text style={styles.conditionTitle}>{tt.title}</Text>
                          <Text style={styles.conditionDesc}>{tt.desc}</Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
                {listingTransactionType === "Lease" && (
                  <View
                    style={{ flexDirection: "row", gap: 12, marginTop: 24 }}
                  >
                    <View style={{ flex: 1 }}>
                      <Text style={styles.fieldLabel}>Start Date</Text>
                      <TouchableOpacity
                        style={[
                          styles.wizardInput,
                          {
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                          },
                        ]}
                        onPress={() => setStartDatePickerVisible(true)}
                        activeOpacity={0.7}
                      >
                        <Text
                          style={{
                            color: listingStartDate ? "#000" : "#9CA3AF",
                          }}
                        >
                          {listingStartDate || "Tap to set"}
                        </Text>
                        <Ionicons
                          name="calendar-outline"
                          size={18}
                          color="#9CA3AF"
                        />
                      </TouchableOpacity>
                      {startDatePickerVisible && (
                        <DateTimePicker
                          value={
                            listingStartDate
                              ? new Date(listingStartDate)
                              : new Date()
                          }
                          mode="date"
                          display="default"
                          onChange={(_, selectedDate) => {
                            setStartDatePickerVisible(false);
                            if (selectedDate)
                              setListingStartDate(
                                selectedDate.toISOString().split("T")[0],
                              );
                          }}
                        />
                      )}
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.fieldLabel}>End Date</Text>
                      <TouchableOpacity
                        style={[
                          styles.wizardInput,
                          {
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                          },
                        ]}
                        onPress={() => setEndDatePickerVisible(true)}
                        activeOpacity={0.7}
                      >
                        <Text
                          style={{ color: listingEndDate ? "#000" : "#9CA3AF" }}
                        >
                          {listingEndDate || "Tap to set"}
                        </Text>
                        <Ionicons
                          name="calendar-outline"
                          size={18}
                          color="#9CA3AF"
                        />
                      </TouchableOpacity>
                      {endDatePickerVisible && (
                        <DateTimePicker
                          value={
                            listingEndDate
                              ? new Date(listingEndDate)
                              : new Date()
                          }
                          mode="date"
                          display="default"
                          onChange={(_, selectedDate) => {
                            setEndDatePickerVisible(false);
                            if (selectedDate)
                              setListingEndDate(
                                selectedDate.toISOString().split("T")[0],
                              );
                          }}
                        />
                      )}
                    </View>
                  </View>
                )}
                <View
                  style={{
                    height: 1,
                    backgroundColor: "#F3F4F6",
                    marginVertical: 16,
                  }}
                />
                <Text style={styles.fieldLabel}>Price</Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "stretch",
                    height: 44,
                    borderRadius: 8,
                    overflow: "hidden",
                    borderWidth: 1,
                    borderColor: "#E5E7EB",
                    marginBottom: 24,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#6B7280",
                      paddingHorizontal: 14,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 17,
                        fontWeight: "bold",
                      }}
                    >
                      ₦
                    </Text>
                  </View>
                  <TextInput
                    value={listingPrice}
                    onChangeText={setListingPrice}
                    placeholder="0.00"
                    keyboardType="numeric"
                    placeholderTextColor="#9CA3AF"
                    style={{
                      flex: 1,
                      paddingHorizontal: 12,
                      fontSize: 12,
                      color: "#000",
                      backgroundColor: "#F9FAFB",
                    }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <View>
                    <Text style={styles.conditionTitle}>Price Negotiable</Text>
                    <Text style={styles.conditionDesc}>
                      Allow buyers to make offers
                    </Text>
                  </View>
                  <Switch
                    value={listingPriceNegotiable}
                    onValueChange={(val) => setListingPriceNegotiable(val)}
                    trackColor={{ false: "#E5E7EB", true: "#0066CC" }}
                    thumbColor="#fff"
                  />
                </View>
              </View>
            )}

            {/* Step 5: Availability */}
            {createListingStep === 5 && (
              <View>
                <Text style={styles.wizardTitle}>Set availability</Text>
                <Text style={styles.wizardSubtitle}>
                  Let buyers know when and how they can get
                </Text>
                <Text style={styles.fieldLabel}>Listing Duration</Text>
                <View style={{ gap: 10 }}>
                  {[
                    { title: "7 Days", desc: "Standard listing period" },
                    { title: "14 Days", desc: "Extended visibility" },
                    { title: "30 Days", desc: "Maximum exposure" },
                    {
                      title: "Until Sold",
                      desc: "Keep active until item is sold",
                    },
                  ].map((tt) => {
                    const isSelected = listingDuration === tt.title;
                    return (
                      <TouchableOpacity
                        key={tt.title}
                        onPress={() => setListingDuration(tt.title)}
                        style={[
                          styles.conditionOptionCard,
                          isSelected && styles.categoryCardSelected,
                        ]}
                        activeOpacity={0.7}
                      >
                        <View
                          style={[
                            styles.radioCircleLeft,
                            isSelected && styles.radioCircleLeftActive,
                          ]}
                        >
                          {isSelected && <View style={styles.radioDotInner} />}
                        </View>
                        <View>
                          <Text style={styles.conditionTitle}>{tt.title}</Text>
                          <Text style={styles.conditionDesc}>{tt.desc}</Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
                <View
                  style={{
                    height: 1,
                    backgroundColor: "#F3F4F6",
                    marginVertical: 16,
                  }}
                />
                <Text style={styles.fieldLabel}>Pickup Options</Text>
                <View style={{ gap: 10 }}>
                  {[
                    {
                      title: "My Location",
                      desc: "Buyer picks up from your address",
                    },
                    {
                      title: "Public Place",
                      desc: "Meet at a safe public place",
                    },
                    {
                      title: "Delivery Available",
                      desc: "You can deliver to buyer's location",
                    },
                  ].map((tt) => {
                    const isSelected = listingPickupOption === tt.title;
                    return (
                      <TouchableOpacity
                        key={tt.title}
                        onPress={() => setListingPickupOption(tt.title)}
                        style={[
                          styles.conditionOptionCard,
                          isSelected && styles.categoryCardSelected,
                        ]}
                        activeOpacity={0.7}
                      >
                        <View
                          style={[
                            styles.radioCircleLeft,
                            isSelected && styles.radioCircleLeftActive,
                          ]}
                        >
                          {isSelected && <View style={styles.radioDotInner} />}
                        </View>
                        <View>
                          <Text style={styles.conditionTitle}>{tt.title}</Text>
                          <Text style={styles.conditionDesc}>{tt.desc}</Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
                <View
                  style={{
                    height: 1,
                    backgroundColor: "#F3F4F6",
                    marginVertical: 16,
                  }}
                />
                <Text style={styles.fieldLabel}>Availability Schedule</Text>
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    marginTop: 12,
                  }}
                >
                  {["Anytime", "Weekends", "Evenings", "Custom"].map((sch) => {
                    const isSelected = listingAvailability.includes(sch);
                    return (
                      <TouchableOpacity
                        key={sch}
                        onPress={() => {
                          if (isSelected)
                            setListingAvailability(
                              listingAvailability.filter((a) => a !== sch),
                            );
                          else
                            setListingAvailability([
                              ...listingAvailability,
                              sch,
                            ]);
                        }}
                        style={[
                          {
                            width: "48%",
                            paddingVertical: 12,
                            borderRadius: 8,
                            borderWidth: 1,
                            borderColor: "#E5E7EB",
                            alignItems: "center",
                            marginBottom: 12,
                          },
                          isSelected && {
                            borderColor: "#0066CC",
                            backgroundColor: "#F0F7FF",
                          },
                        ]}
                        activeOpacity={0.7}
                      >
                        <Text
                          style={[
                            styles.conditionTitle,
                            isSelected && { color: "#0066CC" },
                          ]}
                        >
                          {sch}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            )}

            {/* Step 6: Communities */}
            {createListingStep === 6 && (
              <View>
                <Text style={styles.wizardTitle}>Choose communities</Text>
                <Text style={styles.wizardSubtitle}>
                  Select which communities can see your listing.{"\n"}You can
                  choose multiple communities
                </Text>
                <View style={{ marginBottom: 16, zIndex: 10 }}>
                  <TextInput
                    value={listingSearchComm}
                    onChangeText={setListingSearchComm}
                    placeholder="Search Communities"
                    placeholderTextColor="#9CA3AF"
                    style={[styles.wizardInput, { paddingRight: 44 }]}
                  />
                  <View
                    style={{
                      position: "absolute",
                      right: 8,
                      top: 8,
                      width: 28,
                      height: 28,
                      borderRadius: 14,
                      backgroundColor: "#000",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Ionicons name="search" size={14} color="#fff" />
                  </View>
                </View>
                <Text style={styles.fieldLabel}>Quick Selection</Text>
                <View
                  style={{ flexDirection: "row", gap: 12, marginBottom: 24 }}
                >
                  {["Nearby Communities", "All Communities"].map((qs) => {
                    const isSelected = listingQuickSel === qs;
                    return (
                      <TouchableOpacity
                        key={qs}
                        onPress={() => setListingQuickSel(qs)}
                        style={[
                          {
                            flex: 1,
                            paddingVertical: 12,
                            borderRadius: 8,
                            borderWidth: 1,
                            borderColor: "#E5E7EB",
                            alignItems: "center",
                          },
                          isSelected && { borderColor: "#000000" },
                        ]}
                      >
                        <Text
                          style={{
                            fontSize: 12,
                            fontFamily: "HankenGrotesk_500Medium",
                            color: "#000",
                          }}
                        >
                          {qs}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
                <Text style={styles.fieldLabel}>Recommended for you</Text>
                <View style={{ gap: 10, marginBottom: 24 }}>
                  {[
                    {
                      name: "Downtown",
                      members: "2.3k",
                      dist: "0.5km",
                      image: {
                        uri: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=100&q=80",
                      },
                    },
                    {
                      name: "Riverside",
                      members: "1.8k",
                      dist: "0.8km",
                      image: {
                        uri: "https://images.unsplash.com/photo-1517737284698-1b5e5fb0f75a?w=100&q=80",
                      },
                    },
                    {
                      name: "Hillside",
                      members: "1.8k",
                      dist: "0.8km",
                      image: {
                        uri: "https://images.unsplash.com/photo-1472224371017-08207f84aaae?w=100&q=80",
                      },
                    },
                  ].map((comm) => {
                    const isSelected = listingRecComms.includes(comm.name);
                    return (
                      <TouchableOpacity
                        key={comm.name}
                        onPress={() => {
                          if (isSelected)
                            setListingRecComms(
                              listingRecComms.filter((c) => c !== comm.name),
                            );
                          else
                            setListingRecComms([...listingRecComms, comm.name]);
                        }}
                        style={[
                          styles.conditionOptionCard,
                          { paddingVertical: 8 },
                          isSelected && styles.categoryCardSelected,
                        ]}
                      >
                        <View
                          style={[
                            styles.checkBox,
                            isSelected && styles.checkBoxChecked,
                            { marginRight: 12 },
                          ]}
                        >
                          {isSelected && (
                            <Ionicons
                              name="checkmark"
                              size={13}
                              color="white"
                            />
                          )}
                        </View>
                        <Image
                          source={comm.image}
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: 6,
                            marginRight: 12,
                          }}
                        />
                        <View>
                          <Text style={styles.conditionTitle}>{comm.name}</Text>
                          <Text style={styles.conditionDesc}>
                            {comm.members} members • {comm.dist} away
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
                <Text style={styles.fieldLabel}>Map Areas</Text>
                <View
                  style={[
                    styles.conditionOptionCard,
                    {
                      paddingVertical: 12,
                      paddingHorizontal: 14,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    },
                    listingPostMap && styles.categoryCardSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.conditionTitle,
                      { color: listingPostMap ? "#0066CC" : "#000" },
                    ]}
                  >
                    Post to Map Areas
                  </Text>
                  <Switch
                    value={listingPostMap}
                    onValueChange={(val) => setListingPostMap(val)}
                    trackColor={{ false: "#E5E7EB", true: "#0066CC" }}
                    thumbColor="#fff"
                  />
                </View>
                {listingPostMap && (
                  <View style={{ marginTop: 12 }}>
                    <TextInput
                      value={listingMapGeo}
                      onChangeText={setListingMapGeo}
                      placeholder="Input Map Area Geofence"
                      placeholderTextColor="#9CA3AF"
                      style={styles.wizardInput}
                    />
                  </View>
                )}
              </View>
            )}

            {/* Step 7: Review */}
            {createListingStep === 7 && (
              <View>
                <Text style={styles.wizardTitle}>Review your listing</Text>
                <Text style={styles.wizardSubtitle}>
                  Check all details before publishing.
                </Text>
                <View
                  style={{
                    marginTop: 16,
                    backgroundColor: "#fff",
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: "#E5E7EB",
                    overflow: "hidden",
                    marginBottom: 16,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "HankenGrotesk_500Medium",
                      fontSize: 12,
                      padding: 12,
                    }}
                  >
                    Listing Preview
                  </Text>
                  <View style={{ height: 180, backgroundColor: "#F3F4F6" }}>
                    <Image
                      source={{
                        uri:
                          listingPhotos[0] ||
                          "https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=800&q=80",
                      }}
                      style={{ width: "100%", height: "100%" }}
                    />
                    <View
                      style={{
                        position: "absolute",
                        top: 12,
                        left: 12,
                        backgroundColor: "#0066CC",
                        paddingHorizontal: 12,
                        paddingVertical: 4,
                        borderRadius: 10,
                      }}
                    >
                      <Text
                        style={{
                          color: "#fff",
                          fontSize: 10,
                          fontFamily: "HankenGrotesk_500Medium",
                        }}
                      >
                        {listingTransactionType.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                  <View style={{ padding: 12 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 4,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "HankenGrotesk_500Medium",
                          fontSize: 12,
                        }}
                      >
                        {listingTitle || "No Title"}
                      </Text>
                      <Text
                        style={{
                          fontFamily: "HankenGrotesk_500Medium",
                          fontSize: 12,
                          color: "#0066CC",
                        }}
                      >
                        {listingPrice ? `₦${listingPrice}` : "₦0.00"}
                      </Text>
                    </View>
                    <Text
                      style={{ color: "#6B7280", fontSize: 12 }}
                      numberOfLines={2}
                    >
                      {listingDesc || "No description provided."}
                    </Text>
                  </View>
                </View>

                {/* Category & Details */}
                <View
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: "#E5E7EB",
                    padding: 12,
                    marginBottom: 16,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 12,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "HankenGrotesk_500Medium",
                        fontSize: 12,
                      }}
                    >
                      Category & Details
                    </Text>
                    <TouchableOpacity
                      onPress={() => setCreateListingStep(1)}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        borderWidth: 1,
                        borderColor: "#E5E7EB",
                        borderRadius: 10,
                        paddingHorizontal: 10,
                        paddingVertical: 4,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 10,
                          fontFamily: "HankenGrotesk_500Medium",
                          marginRight: 4,
                        }}
                      >
                        Edit
                      </Text>
                      <Ionicons name="pencil" size={10} color="#000" />
                    </TouchableOpacity>
                  </View>
                  <View style={{ gap: 8 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={{ color: "#6B7280", fontSize: 12 }}>
                        Category:
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: "HankenGrotesk_500Medium",
                        }}
                      >
                        {listingCategory || "-"}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={{ color: "#6B7280", fontSize: 12 }}>
                        Condition:
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: "HankenGrotesk_500Medium",
                        }}
                      >
                        {listingCondition || "-"}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Description */}
                <View
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: "#E5E7EB",
                    padding: 12,
                    marginBottom: 16,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 12,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "HankenGrotesk_500Medium",
                        fontSize: 12,
                      }}
                    >
                      Description
                    </Text>
                    <TouchableOpacity
                      onPress={() => setCreateListingStep(2)}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        borderWidth: 1,
                        borderColor: "#E5E7EB",
                        borderRadius: 10,
                        paddingHorizontal: 10,
                        paddingVertical: 4,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 10,
                          fontFamily: "HankenGrotesk_500Medium",
                          marginRight: 4,
                        }}
                      >
                        Edit
                      </Text>
                      <Ionicons name="pencil" size={10} color="#000" />
                    </TouchableOpacity>
                  </View>
                  <Text
                    style={{ color: "#6B7280", fontSize: 12, lineHeight: 18 }}
                  >
                    {listingDesc || "-"}
                  </Text>
                </View>

                {/* Availability */}
                <View
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: "#E5E7EB",
                    padding: 12,
                    marginBottom: 16,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 12,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "HankenGrotesk_500Medium",
                        fontSize: 12,
                      }}
                    >
                      Availability
                    </Text>
                    <TouchableOpacity
                      onPress={() => setCreateListingStep(5)}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        borderWidth: 1,
                        borderColor: "#E5E7EB",
                        borderRadius: 10,
                        paddingHorizontal: 10,
                        paddingVertical: 4,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 10,
                          fontFamily: "HankenGrotesk_500Medium",
                          marginRight: 4,
                        }}
                      >
                        Edit
                      </Text>
                      <Ionicons name="pencil" size={10} color="#000" />
                    </TouchableOpacity>
                  </View>
                  <View style={{ gap: 8 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={{ color: "#6B7280", fontSize: 12 }}>
                        Duration:
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: "HankenGrotesk_500Medium",
                        }}
                      >
                        {listingDuration}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={{ color: "#6B7280", fontSize: 12 }}>
                        Pickup Time:
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: "HankenGrotesk_500Medium",
                        }}
                      >
                        {listingAvailability.join(", ") || "-"}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={{ color: "#6B7280", fontSize: 12 }}>
                        Meet Location:
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: "HankenGrotesk_500Medium",
                        }}
                      >
                        {listingPickupOption}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Communities */}
                <View
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: "#E5E7EB",
                    padding: 12,
                    marginBottom: 16,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 12,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "HankenGrotesk_500Medium",
                        fontSize: 12,
                      }}
                    >
                      Communities
                    </Text>
                    <TouchableOpacity
                      onPress={() => setCreateListingStep(6)}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        borderWidth: 1,
                        borderColor: "#E5E7EB",
                        borderRadius: 10,
                        paddingHorizontal: 10,
                        paddingVertical: 4,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 10,
                          fontFamily: "HankenGrotesk_500Medium",
                          marginRight: 4,
                        }}
                      >
                        Edit
                      </Text>
                      <Ionicons name="pencil" size={10} color="#000" />
                    </TouchableOpacity>
                  </View>
                  <View style={{ gap: 12 }}>
                    {listingRecComms.length > 0 ? (
                      listingRecComms.map((c, i) => (
                        <View
                          key={i}
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <Image
                            source={{
                              uri: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=100&q=80",
                            }}
                            style={{
                              width: 32,
                              height: 32,
                              borderRadius: 6,
                              marginRight: 10,
                            }}
                          />
                          <View>
                            <Text
                              style={{
                                fontFamily: "HankenGrotesk_500Medium",
                                fontSize: 12,
                              }}
                            >
                              {c}
                            </Text>
                            <Text style={{ color: "#6B7280", fontSize: 10 }}>
                              2.3k members • 0.5km away
                            </Text>
                          </View>
                        </View>
                      ))
                    ) : (
                      <Text style={{ fontSize: 12, color: "#9CA3AF" }}>
                        No communities selected
                      </Text>
                    )}
                  </View>
                </View>

                {/* Publishing Options */}
                <View
                  style={{
                    backgroundColor: "#F9FAFB",
                    borderRadius: 10,
                    padding: 14,
                    marginBottom: 24,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "HankenGrotesk_500Medium",
                      fontSize: 12,
                      marginBottom: 16,
                    }}
                  >
                    Publishing Options
                  </Text>
                  {[
                    {
                      key: "push",
                      label: "Send push notifications",
                      desc: "Notify nearby members when your listing goes live",
                      state: listingPublishPush,
                      setter: setListingPublishPush,
                    },
                    {
                      key: "share",
                      label: "Allow sharing",
                      desc: "Let members share your listing with others",
                      state: listingPublishShare,
                      setter: setListingPublishShare,
                    },
                    {
                      key: "repost",
                      label: "Auto-repost weekly",
                      desc: "Automatically bump your listing every 7 days",
                      state: listingPublishRepost,
                      setter: setListingPublishRepost,
                    },
                  ].map((option) => (
                    <TouchableOpacity
                      key={option.key}
                      onPress={() => option.setter(!option.state)}
                      style={{
                        flexDirection: "row",
                        alignItems: "flex-start",
                        marginBottom: 16,
                      }}
                    >
                      <View
                        style={[
                          styles.checkBox,
                          option.state && styles.checkBoxChecked,
                          { marginRight: 12, marginTop: 2 },
                        ]}
                      >
                        {option.state && (
                          <Ionicons name="checkmark" size={13} color="white" />
                        )}
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text
                          style={{
                            fontFamily: "HankenGrotesk_500Medium",
                            fontSize: 12,
                          }}
                        >
                          {option.label}
                        </Text>
                        <Text style={{ color: "#6B7280", fontSize: 12 }}>
                          {option.desc}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Agreement */}
                <TouchableOpacity
                  onPress={() => setListingAgreement(!listingAgreement)}
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                    marginBottom: 32,
                  }}
                >
                  <View
                    style={[
                      styles.checkBox,
                      listingAgreement && styles.checkBoxChecked,
                      { marginRight: 12, marginTop: 2, borderRadius: 4 },
                    ]}
                  >
                    {listingAgreement && (
                      <Ionicons name="checkmark" size={13} color="white" />
                    )}
                  </View>
                  <Text
                    style={{
                      flex: 1,
                      color: "#6B7280",
                      fontSize: 12,
                      lineHeight: 16,
                    }}
                  >
                    I agree to the Community Guidelines and Terms of Service. I
                    confirm that this listing is accurate and I have right to
                    sell this item.
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Step 8: Success */}
            {createListingStep === 8 && (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  paddingVertical: 32,
                }}
              >
                <View style={{ marginBottom: 20 }}>
                  <Ionicons name="checkmark-circle" size={80} color="#00A84E" />
                </View>
                <Text
                  style={{
                    fontSize: 24,
                    fontFamily: "HankenGrotesk_500Medium",
                    color: "#00A84E",
                    marginBottom: 4,
                  }}
                >
                  Awesome!
                </Text>
                <Text
                  style={{
                    fontSize: 28,
                    fontFamily: "HankenGrotesk_500Medium",
                    color: "#000000",
                    marginBottom: 12,
                  }}
                >
                  Your Listing is Live
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "HankenGrotesk_500Medium",
                    color: "#6B7280",
                    textAlign: "center",
                    paddingHorizontal: 24,
                  }}
                >
                  Start trading, connecting, and thriving in your community.
                </Text>
              </View>
            )}
          </ScrollView>

          {/* Wizard Bottom buttons */}
          <View style={styles.wizardBottomBar}>
            {createListingStep === 8 ? (
              <TouchableOpacity
                onPress={() => {
                  setCreateListingVisible(false);
                }}
                style={styles.wizardFullSubmitBtn}
                activeOpacity={0.8}
              >
                <Text style={styles.wizardSubmitText}>Back to Home</Text>
              </TouchableOpacity>
            ) : (
              <View style={{ flexDirection: "row", gap: 12 }}>
                <TouchableOpacity
                  onPress={() => {
                    if (createListingStep === 7) {
                      setCreateListingVisible(false);
                      return;
                    }
                    if (createListingStep > 1)
                      setCreateListingStep(createListingStep - 1);
                    else setCreateListingVisible(false);
                  }}
                  style={[
                    styles.wizardPrevBtn,
                    createListingStep === 7 && {
                      backgroundColor: "#fff",
                      borderColor: "#0066CC",
                    },
                  ]}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.wizardPrevText,
                      createListingStep === 7 && {
                        color: "#0066CC",
                        fontFamily: "HankenGrotesk_500Medium",
                      },
                    ]}
                  >
                    {createListingStep === 7 ? "Save Draft" : "Previous"}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    if (createListingStep === 1 && !listingCategory) {
                      alert("Please select a category");
                      return;
                    }
                    if (createListingStep === 2 && !listingTitle) {
                      alert("Please enter a title");
                      return;
                    }
                    if (createListingStep === 7 && !listingAgreement) {
                      alert(
                        "Please agree to the Community Guidelines to publish.",
                      );
                      return;
                    }
                    setCreateListingStep(createListingStep + 1);
                  }}
                  style={styles.wizardNextBtn}
                  activeOpacity={0.8}
                >
                  <Text style={styles.wizardNextText}>
                    {createListingStep === 7 ? "Publish" : "Save"}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </SafeAreaView>
      </Modal>

      {/* Create Request Modal */}
      <Modal
        visible={createRequestVisible}
        transparent={false}
        animationType="slide"
        onRequestClose={() => setCreateRequestVisible(false)}
      >
        <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
          <View style={styles.wizardHeader}>
            <TouchableOpacity
              onPress={() => setCreateRequestVisible(false)}
              style={styles.wizardBackBtn}
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-back" size={22} color="#000000" />
            </TouchableOpacity>
            <Text style={styles.wizardHeaderTitle}>Make a Request</Text>
            <View style={{ width: 44 }} />
          </View>
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={styles.wizardScrollContent}
          >
            <Text style={styles.wizardTitle}>Request Item</Text>
            <Text style={[styles.wizardSubtitle, { marginBottom: 24 }]}>
              Looking for something specific?
            </Text>
            <Text style={[styles.fieldLabel, { marginBottom: 8 }]}>
              What do you need? *
            </Text>
            <TextInput
              value={requestTitle}
              onChangeText={setRequestTitle}
              placeholder="ex: Umbrella"
              placeholderTextColor="#9CA3AF"
              style={[styles.wizardInput, { marginBottom: 24 }]}
            />
            <Text style={styles.fieldLabel}>Description</Text>
            <Text
              style={[
                styles.wizardSubtitle,
                { marginTop: -4, marginBottom: 8 },
              ]}
            >
              Give a little info
            </Text>
            <TextInput
              value={requestDesc}
              onChangeText={(text) => {
                if (text.length <= 500) setRequestDesc(text);
              }}
              placeholder=""
              placeholderTextColor="#9CA3AF"
              style={[
                styles.wizardInput,
                {
                  height: 120,
                  paddingTop: 16,
                  textAlignVertical: "top",
                  marginBottom: 4,
                },
              ]}
              multiline
            />
            <Text
              style={{
                textAlign: "right",
                color: "#9CA3AF",
                fontSize: 10,
                marginBottom: 24,
              }}
            >
              {requestDesc.length}/500 characters
            </Text>
            <Text style={[styles.fieldLabel, { marginBottom: 12 }]}>Type</Text>
            <View style={{ flexDirection: "row", gap: 12, marginBottom: 24 }}>
              {["Buy", "Rent", "Borrow"].map((type) => (
                <TouchableOpacity
                  key={type}
                  onPress={() => setRequestType(type as any)}
                  style={[
                    {
                      flex: 1,
                      height: 44,
                      borderRadius: 8,
                      borderWidth: 1,
                      borderColor: "#E5E7EB",
                      justifyContent: "center",
                      alignItems: "center",
                    },
                    requestType === type && {
                      borderColor: "#0066CC",
                      backgroundColor: "#F0F7FF",
                    },
                  ]}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      {
                        fontSize: 12,
                        fontFamily: "HankenGrotesk_500Medium",
                        color: "#4B5563",
                      },
                      requestType === type && {
                        color: "#0066CC",
                        fontFamily: "HankenGrotesk_500Medium",
                      },
                    ]}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {(requestType === "Buy" || requestType === "Rent") && (
              <View style={{ marginBottom: 24 }}>
                <Text style={[styles.fieldLabel, { marginBottom: 8 }]}>
                  Your Budget *
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: "#E5E7EB",
                    borderRadius: 8,
                    height: 44,
                    overflow: "hidden",
                  }}
                >
                  <View
                    style={{
                      width: 48,
                      height: 44,
                      backgroundColor: "#000",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 17,
                        fontFamily: "HankenGrotesk_500Medium",
                      }}
                    >
                      ₦
                    </Text>
                  </View>
                  <TextInput
                    value={requestBudget}
                    onChangeText={setRequestBudget}
                    placeholder="0.00"
                    keyboardType="numeric"
                    style={{
                      flex: 1,
                      height: 44,
                      paddingHorizontal: 14,
                      fontFamily: "HankenGrotesk_500Medium",
                      fontSize: 12,
                      color: "#000",
                    }}
                  />
                </View>
              </View>
            )}
            <Text style={[styles.fieldLabel, { marginBottom: 12 }]}>
              Urgency Level
            </Text>
            <View style={{ marginBottom: 12 }}>
              {[
                {
                  title: "Low priority",
                  desc: "Whenever convenient (1 - 2 weeks)",
                },
                {
                  title: "Medium priority",
                  desc: "Within a few days (3 - 7 days)",
                },
                { title: "High priority", desc: "Needed today" },
              ].map((level) => (
                <TouchableOpacity
                  key={level.title}
                  onPress={() => setRequestUrgency(level.title)}
                  style={[
                    styles.conditionOptionCard,
                    requestUrgency === level.title &&
                      styles.categoryCardSelected,
                    { marginBottom: 12, paddingVertical: 12 },
                  ]}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      styles.radioCircleLeft,
                      requestUrgency === level.title &&
                        styles.radioCircleLeftActive,
                    ]}
                  >
                    {requestUrgency === level.title && (
                      <View style={styles.radioDotInner} />
                    )}
                  </View>
                  <View>
                    <Text style={[styles.conditionTitle, { fontSize: 12 }]}>
                      {level.title}
                    </Text>
                    <Text style={[styles.conditionDesc, { fontSize: 12 }]}>
                      {level.desc}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={[styles.fieldLabel, { marginBottom: 12 }]}>
              Duration
            </Text>
            <View style={{ marginBottom: 12 }}>
              {[
                { title: "Few hours", desc: "Same day return" },
                { title: "1 - 3 days", desc: "Short term borrow" },
                { title: "Up to 1 week", desc: "Medium-term borrow" },
                { title: "To keep", desc: "Looking to buy or receive" },
              ].map((level) => (
                <TouchableOpacity
                  key={level.title}
                  onPress={() => setRequestDuration(level.title)}
                  style={[
                    styles.conditionOptionCard,
                    requestDuration === level.title &&
                      styles.categoryCardSelected,
                    { marginBottom: 12, paddingVertical: 12 },
                  ]}
                  activeOpacity={0.7}
                >
                  <View
                    style={[
                      styles.radioCircleLeft,
                      requestDuration === level.title &&
                        styles.radioCircleLeftActive,
                    ]}
                  >
                    {requestDuration === level.title && (
                      <View style={styles.radioDotInner} />
                    )}
                  </View>
                  <View>
                    <Text style={[styles.conditionTitle, { fontSize: 12 }]}>
                      {level.title}
                    </Text>
                    <Text style={[styles.conditionDesc, { fontSize: 12 }]}>
                      {level.desc}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={[styles.fieldLabel, { marginTop: 12 }]}>
              Choose communities
            </Text>
            <View style={{ flexDirection: "row", gap: 12, marginBottom: 24 }}>
              {["Specific Communities", "Joined Communities"].map((type) => (
                <TouchableOpacity
                  key={type}
                  onPress={() => setRequestCommType(type)}
                  style={[
                    {
                      flex: 1,
                      height: 44,
                      borderRadius: 8,
                      borderWidth: 1,
                      borderColor: "#E5E7EB",
                      justifyContent: "center",
                      alignItems: "center",
                    },
                    requestCommType === type && {
                      borderColor: "#0066CC",
                      backgroundColor: "#F0F7FF",
                    },
                  ]}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      {
                        fontSize: 12,
                        fontFamily: "HankenGrotesk_500Medium",
                        color: "#4B5563",
                      },
                      requestCommType === type && {
                        color: "#0066CC",
                        fontFamily: "HankenGrotesk_500Medium",
                      },
                    ]}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={{ height: 24 }} />
          </ScrollView>
          <View style={styles.wizardBottomBar}>
            <TouchableOpacity
              onPress={() => {
                if (!requestTitle) {
                  alert("Please enter what you need");
                  return;
                }
                alert("Request Published!");
                setCreateRequestVisible(false);
              }}
              style={styles.wizardFullSubmitBtn}
              activeOpacity={0.8}
            >
              <Text style={styles.wizardSubmitText}>Publish</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>

      {/* Floating Action Button */}
      <TouchableOpacity
        onPress={openFloatingMenu}
        className="absolute bottom-32 right-6 border-2 border-white bg-[#0066CC] w-14 h-14 rounded-full items-center justify-center shadow-lg"
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={26} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  requestCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#F3F4F6",
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
    position: "relative",
    borderLeftWidth: 4,
    borderLeftColor: "#EF4444",
  },
  priorityRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  priorityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#EF4444",
    marginRight: 8,
  },
  priorityText: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 12,
    color: "#EF4444",
    textTransform: "uppercase",
  },
  requestTitle: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 17,
    color: "#000000",
    marginBottom: 4,
  },
  requestDesc: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 13,
    color: "#4B5563",
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  metaText: {
    fontSize: 12,
    color: "#6B7280",
    marginLeft: 4,
  },
  cardFooterDivider: {
    height: 1,
    backgroundColor: "#F3F4F6",
    marginBottom: 10,
  },
  cardFooterRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  footerProfile: {
    flexDirection: "row",
    alignItems: "center",
  },
  footerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  footerName: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 13,
    color: "#000000",
  },
  footerDistance: {
    fontSize: 12,
    color: "#6B7280",
  },
  footerChatCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
  wizardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  wizardBackBtn: { padding: 8 },
  wizardHeaderTitle: {
    fontSize: 20,
    fontFamily: "HankenGrotesk_500Medium",
    color: "#000000",
    textAlign: "center",
    flex: 1,
  },
  wizardProgressSection: { paddingHorizontal: 24, paddingVertical: 12 },
  wizardStepText: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 12,
    color: "#9CA3AF",
    marginBottom: 6,
  },
  wizardTrackBackground: {
    height: 6,
    backgroundColor: "#E5E7EB",
    borderRadius: 3,
    width: "100%",
  },
  wizardTrackActive: {
    height: "100%",
    backgroundColor: "#0066CC",
    borderRadius: 3,
  },
  wizardScrollContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 120,
  },
  wizardTitle: {
    fontSize: 22,
    fontFamily: "HankenGrotesk_500Medium",
    color: "#000000",
    marginBottom: 4,
  },
  wizardSubtitle: {
    fontSize: 12,
    fontFamily: "HankenGrotesk_500Medium",
    color: "#6B7280",
    marginBottom: 24,
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    justifyContent: "space-between",
  },
  categoryCard: {
    width: "47%",
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    padding: 14,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  categoryCardSelected: {
    borderColor: "#0066CC",
    borderWidth: 2,
    backgroundColor: "#F5F9FF",
  },
  categoryIconBox: {
    width: 64,
    height: 64,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  categoryCardText: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 12,
    color: "#000000",
  },
  fieldLabel: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 12,
    color: "#000000",
    marginTop: 16,
    marginBottom: 6,
  },
  fieldSubLabel: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 12,
  },
  wizardInput: {
    height: 44,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    paddingHorizontal: 14,
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 12,
    color: "#000000",
    backgroundColor: "#F9FAFB",
  },
  descContainer: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    backgroundColor: "#F9FAFB",
    padding: 12,
    minHeight: 120,
    justifyContent: "space-between",
  },
  descTextArea: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 12,
    color: "#000000",
    textAlignVertical: "top",
    flex: 1,
  },
  charCounter: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 12,
    color: "#9CA3AF",
    textAlign: "right",
  },
  conditionOptionCard: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    padding: 14,
    backgroundColor: "#FFFFFF",
  },
  conditionTitle: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 12,
    color: "#000000",
  },
  conditionDesc: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },
  radioCircleLeft: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#9CA3AF",
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  radioCircleLeftActive: { borderColor: "#0066CC" },
  radioDotInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#0066CC",
  },
  checkBox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#D1D5DB",
    justifyContent: "center",
    alignItems: "center",
  },
  checkBoxChecked: { backgroundColor: "#0066CC", borderColor: "#0066CC" },
  quickTagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },
  quickTagPill: {
    borderWidth: 1.5,
    borderColor: "#000000",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: "#FFFFFF",
  },
  quickTagText: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 12,
    color: "#000000",
  },
  detailsBox: {
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    padding: 14,
    backgroundColor: "#FFFFFF",
    marginBottom: 12,
    minHeight: 80,
    justifyContent: "center",
  },
  detailsBoxEmptyText: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 12,
    color: "#374151",
    marginTop: 8,
  },
  detailsBoxSubText: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },
  detailRowItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  detailRowText: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 12,
    color: "#1F2937",
  },
  addDetailBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000",
    height: 38,
    borderRadius: 20,
    paddingHorizontal: 14,
    alignSelf: "flex-start",
    gap: 6,
  },
  addDetailText: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 12,
    color: "#FFFFFF",
  },
  photosWrapper: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    padding: 14,
    backgroundColor: "#FFFFFF",
  },
  emptyPhotosBox: {
    borderWidth: 2,
    borderColor: "#0066CC",
    borderStyle: "dashed",
    borderRadius: 10,
    backgroundColor: "#F5F9FF",
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  bluePlusCircleBig: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#0066CC",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  addPhotoTitle: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 12,
    color: "#000000",
  },
  addPhotoSub: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
    textAlign: "center",
  },
  photoPreviewCard: { position: "relative", marginRight: 12 },
  photoPreviewImg: { width: 80, height: 80, borderRadius: 10 },
  deletePhotoBtn: {
    position: "absolute",
    top: -6,
    right: -6,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
  },
  photoActionBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#000000",
    height: 44,
    borderRadius: 10,
    gap: 8,
  },
  photoActionBtnText: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 12,
    color: "#000000",
  },
  photoTipsCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    padding: 14,
    marginTop: 16,
  },
  photoTipsCardTitle: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 12,
    color: "#000000",
  },
  tipRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  tipText: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 12,
    color: "#4B5563",
  },
  wizardBottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    paddingBottom: 32,
    paddingTop: 16,
    paddingHorizontal: 24,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  wizardPrevBtn: {
    flex: 1,
    height: 44,
    borderWidth: 2,
    borderColor: "#0066CC",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  wizardPrevText: {
    fontFamily: "HankenGrotesk_500Medium",
    color: "#0066CC",
    fontSize: 12,
  },
  wizardNextBtn: {
    flex: 1.2,
    height: 44,
    backgroundColor: "#0066CC",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  wizardNextText: {
    fontFamily: "HankenGrotesk_500Medium",
    color: "#FFFFFF",
    fontSize: 12,
  },
  wizardFullSubmitBtn: {
    width: "100%",
    height: 44,
    backgroundColor: "#0066CC",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  wizardSubmitText: {
    fontFamily: "HankenGrotesk_500Medium",
    color: "#FFFFFF",
    fontSize: 12,
  },
});
