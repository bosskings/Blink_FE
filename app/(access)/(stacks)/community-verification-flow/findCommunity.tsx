import SuccessModal from "@/components/modals/SuccessModal";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const FindCommunity = () => {
  const [selectedCommunity, setSelectedCommunity] = useState<number | null>(
    null,
  );
  const [, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // All available communities with their coordinates
  const allCommunities = [
    {
      id: 1,
      name: "Covenant University",
      latitude: 6.6745,
      longitude: 3.1686,
      image:
        "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    },
    {
      id: 2,
      name: "Landmark University",
      latitude: 6.5074,
      longitude: 3.3758,
      image:
        "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80",
    },
    {
      id: 3,
      name: "University of Lagos",
      latitude: 6.5158,
      longitude: 3.3885,
      image:
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
    },
    {
      id: 4,
      name: "Pan-Atlantic University",
      latitude: 6.4698,
      longitude: 3.5852,
      image:
        "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800&q=80",
    },
    {
      id: 5,
      name: "Lagos Business School",
      latitude: 6.4407,
      longitude: 3.4326,
      image:
        "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?w=800&q=80",
    },
    {
      id: 6,
      name: "Redeemers University",
      latitude: 6.8333,
      longitude: 3.9167,
      image:
        "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800&q=80",
    },
  ];

  const [communities, setCommunities] = useState(allCommunities);

  // Calculate distance between two coordinates using Haversine formula
  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ) => {
    const R = 6371; // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Request location permission and get current location
  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          Alert.alert(
            "Permission Denied",
            "Location permission is required to find communities near you.",
            [{ text: "OK" }],
          );
          setLoading(false);
          return;
        }

        const currentLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

        setLocation(currentLocation);

        // Calculate distances and sort communities by proximity
        const communitiesWithDistance = allCommunities.map((community) => ({
          ...community,
          distance: calculateDistance(
            currentLocation.coords.latitude,
            currentLocation.coords.longitude,
            community.latitude,
            community.longitude,
          ),
        }));

        // Sort by distance and format
        const sortedCommunities: any = communitiesWithDistance
          .sort((a, b) => a.distance - b.distance)
          .map((community) => ({
            id: community.id,
            name: community.name,
            distance: `${community.distance.toFixed(1)}km`,
            duration: `${Math.round(community.distance * 4)}min`,
            image: community.image,
          }));

        setCommunities(sortedCommunities);
        setLoading(false);
      } catch (error) {
        console.error("Error getting location:", error);
        Alert.alert(
          "Error",
          "Failed to get your location. Showing all communities.",
        );
        setLoading(false);
      }
    })();
  }, [allCommunities]);

  const selectCommunity = (id: number) => {
    setSelectedCommunity(selectedCommunity === id ? null : id);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <View style={styles.container}>
        {/* Custom Premium One-Line Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={18} color="#000000" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Community Discovery</Text>

          <TouchableOpacity
            onPress={() =>
              router.push("/(access)/(stacks)/profile/choose-avatar")
            }
            style={styles.skipButton}
          >
            <Text style={styles.skipText}>Skip </Text>
            <Ionicons name="arrow-forward" size={16} color="#0066CC" />
          </TouchableOpacity>
        </View>

        {/* Heading Section */}
        <Animated.View
          style={styles.titleWrap}
          entering={FadeInDown.duration(600).springify()}
        >
          <Text style={styles.titleText}>Get in a Community</Text>
          <Text style={styles.subtitleText}>
            Select one or more communities around you
          </Text>
        </Animated.View>

        {/* Loading State */}
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#0066CC" />
            <Text style={styles.loadingText}>
              Finding communities near you...
            </Text>
          </View>
        ) : (
          <>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.scrollStyle}
              contentContainerStyle={styles.scrollContent}
            >
              {communities.map((community: any) => (
                <TouchableOpacity
                  key={community.id}
                  onPress={() => selectCommunity(community.id)}
                  activeOpacity={0.8}
                  style={styles.cardContainer}
                >
                  <View style={styles.cardFrame}>
                    <Image
                      source={{ uri: community.image }}
                      style={styles.cardImage}
                      resizeMode="cover"
                    />

                    {/* Premium dark gradient overlay for text legibility */}
                    <View style={styles.cardOverlay} />

                    {/* Bottom-Aligned Title and Translucent Badges */}
                    <View style={styles.cardContent}>
                      <Text style={styles.cardTitle}>{community.name}</Text>

                      <View style={styles.badgeRow}>
                        <View style={styles.cardBadge}>
                          <Ionicons
                            name="locate-outline"
                            size={14}
                            color="white"
                          />
                          <Text style={styles.badgeText}>
                            {community.distance}
                          </Text>
                        </View>

                        <View style={styles.cardBadge}>
                          <Ionicons
                            name="navigate-outline"
                            size={14}
                            color="white"
                          />
                          <Text style={styles.badgeText}>
                            {community.distance}
                          </Text>
                        </View>
                      </View>
                    </View>

                    {/* High-Fidelity Radio Selector Circle at BOTTOM-RIGHT */}
                    <View style={styles.radioContainer}>
                      <View
                        style={[
                          styles.radioCircle,
                          selectedCommunity === community.id &&
                            styles.radioCircleActive,
                        ]}
                      >
                        {selectedCommunity === community.id && (
                          <View style={styles.radioDot} />
                        )}
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Contextual Bottom Action Bar */}
            <View style={styles.bottomBarWrap}>
              {selectedCommunity !== null ? (
                // Selected State: Left Skip Text, Right Join Button
                <View style={styles.bottomSplit}>
                  <TouchableOpacity
                    onPress={() =>
                      router.push("/(access)/(stacks)/profile/choose-avatar")
                    }
                    activeOpacity={0.7}
                    style={styles.splitSkipWrap}
                  >
                    <Text style={styles.splitSkipText}>Skip</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.splitJoinButton}
                    onPress={() => setShowSuccessModal(true)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.splitJoinButtonText}>
                      Join Community
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                // Unselected State: Full Width Disabled Button
                <TouchableOpacity style={styles.disabledButton} disabled={true}>
                  <Text style={styles.disabledButtonText}>Join Community</Text>
                </TouchableOpacity>
              )}
            </View>
          </>
        )}
      </View>

      <SuccessModal
        visible={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        communityName={
          communities.find((c: any) => c.id === selectedCommunity)?.name || ""
        }
        onProceed={() => {
          setShowSuccessModal(false);
          router.push(
            "/(access)/(stacks)/community-verification-flow/packageverification",
          );
        }}
      />
    </SafeAreaView>
  );
};

export default FindCommunity;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16,
    marginBottom: 44,
  },
  backButton: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#000000",
    borderRadius: 99,
    width: 44,
    height: 44,
  },
  headerTitle: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 17,
    color: "#0066CC",
  },
  skipButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  skipText: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 12,
    color: "#000000",
  },
  titleWrap: {
    alignItems: "center",
    marginBottom: 36,
  },
  titleText: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 17,
    color: "#000000",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitleText: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 12,
    color: "#4B5563",
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    fontFamily: "HankenGrotesk_500Medium",
    color: "#6B7280",
    marginTop: 16,
    fontSize: 12,
  },
  scrollStyle: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 110,
  },
  cardContainer: {
    marginBottom: 16,
  },
  cardFrame: {
    position: "relative",
    borderRadius: 24,
    overflow: "hidden",
    height: 160,
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
  cardOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.35)",
  },
  cardContent: {
    position: "absolute",
    left: 20,
    bottom: 20,
    right: 70, // Leaves space for the radio button on the right
  },
  cardTitle: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 17,
    color: "#FFFFFF",
    marginBottom: 8,
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  cardBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 99,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  badgeText: {
    fontFamily: "HankenGrotesk_500Medium",
    color: "#FFFFFF",
    fontSize: 12,
    marginLeft: 4,
  },
  radioContainer: {
    position: "absolute",
    right: 20,
    bottom: 24,
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  radioCircleActive: {
    borderColor: "#0066CC",
    backgroundColor: "#0066CC",
  },
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
  },
  bottomBarWrap: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    paddingBottom: 24,
    paddingTop: 12,
    paddingHorizontal: 24,
  },
  disabledButton: {
    backgroundColor: "#E5E7EB",
    borderRadius: 14,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  disabledButtonText: {
    fontFamily: "HankenGrotesk_500Medium",
    color: "#9CA3AF",
    fontSize: 12,
  },
  bottomSplit: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  splitSkipWrap: {
    paddingHorizontal: 14,
    height: 56,
    justifyContent: "center",
  },
  splitSkipText: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 12,
    color: "#000000",
  },
  splitJoinButton: {
    backgroundColor: "#0066CC",
    borderRadius: 14,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginLeft: 16,
  },
  splitJoinButtonText: {
    fontFamily: "HankenGrotesk_500Medium",
    color: "#FFFFFF",
    fontSize: 12,
  },
});
