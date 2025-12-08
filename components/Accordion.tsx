import { truncate } from "@/utils/truncate";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Image,
  LayoutChangeEvent,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface AccordionProps {
  title: string;
  subtitle?: string;
  status?: string;
  image?: string;
  children?: React.ReactNode;
}

const Accordion = ({
  title,
  subtitle,
  status,
  image,
  children,
}: AccordionProps) => {
  const [open, setOpen] = useState(false);

  const height = useSharedValue(0);
  const contentHeight = useSharedValue(0);
  const rotate = useSharedValue(0);

  // Measure content when it's rendered without height constraints
  const onMeasureLayout = (event: LayoutChangeEvent) => {
    const { height: measuredHeight } = event.nativeEvent.layout;
    if (measuredHeight > 0) {
      // Add a small buffer to account for rounding and ensure content isn't cut off
      contentHeight.value = measuredHeight + 2;
    }
  };

  const toggle = () => {
    const newOpen = !open;
    setOpen(newOpen);

    if (newOpen) {
      // When opening, animate to the measured content height
      height.value = withTiming(contentHeight.value || 0, {
        duration: 250,
      });
    } else {
      // When closing, animate to 0
      height.value = withTiming(0, {
        duration: 250,
      });
    }
    rotate.value = withTiming(newOpen ? 1 : 0, { duration: 250 });
  };

  const animatedHeight = useAnimatedStyle(() => ({
    height: height.value,
    opacity: height.value > 0 ? 1 : 0,
  }));

  const rotateAnim = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value * 180}deg` }],
  }));

  return (
    <View className="bg-white px-6 py-6 rounded-2xl border border-gray-100 overflow-hidden shadow">
      {/* HEADER */}
      <TouchableOpacity
        onPress={toggle}
        className={`flex-row items-center justify-between ${open ? "mb-4" : ""}`}
        activeOpacity={0.7}
      >
        <View className="flex-row gap-3 items-center flex-1">
          {image && (
            <Image source={{ uri: image }} className="w-16 h-16 rounded-xl" />
          )}

          <View className="flex-1">
            <View className="flex-row gap-2 items-center mb-1">
              <Text
                className="text-base"
                style={{ fontFamily: "HankenGrotesk_900Black" }}
              >
                {truncate(title, 20, "...")}
              </Text>

              {/* Badge */}
              {status && (
                <View
                  className={`px-3 py-1 ${
                    status === "Active"
                      ? "bg-green-600"
                      : status === "Owned"
                        ? "bg-[#0066CC]"
                        : "bg-[#6C757D]"
                  } rounded-lg`}
                >
                  <Text
                    className="text-white text-xs"
                    style={{ fontFamily: "HankenGrotesk_400Regular" }}
                  >
                    {status}
                  </Text>
                </View>
              )}
            </View>
            {subtitle && (
              <Text
                className="text-[#000000] text-xs"
                style={{ fontFamily: "HankenGrotesk_500Medium" }}
              >
                {subtitle}
              </Text>
            )}
          </View>
        </View>

        {/* Arrow */}
        <Animated.View style={rotateAnim} className="ml-3">
          <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
        </Animated.View>
      </TouchableOpacity>

      {/* CONTENT */}
      {/* Hidden container to measure content height */}
      <View
        onLayout={onMeasureLayout}
        style={{
          position: "absolute",
          opacity: 0,
          zIndex: -1,
          left: 24, // px-6 = 24px (6 * 4px)
          right: 24,
        }}
        pointerEvents="none"
      >
        <View className="bg-[#F8F9FA] rounded-xl p-4 pt-8">{children}</View>
      </View>

      {/* Animated visible container */}
      <Animated.View style={[animatedHeight]} className="overflow-hidden">
        <View className="bg-[#F8F9FA] rounded-xl p-4 pt-8">{children}</View>
      </Animated.View>
    </View>
  );
};

export default Accordion;
