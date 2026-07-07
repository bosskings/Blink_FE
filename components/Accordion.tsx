import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { truncate } from "@/utils/truncate";

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
  const heightValue = useSharedValue(0);
  const rotate = useSharedValue(0);

  const toggle = () => {
    const newOpen = !open;
    setOpen(newOpen);

    if (newOpen) {
      heightValue.value = withSpring(220, {
        damping: 18,
        stiffness: 160,
      });
    } else {
      heightValue.value = withTiming(0, { duration: 200 });
    }
    rotate.value = withTiming(newOpen ? 1 : 0, { duration: 250 });
  };

  const animatedHeight = useAnimatedStyle(() => ({
    maxHeight: heightValue.value,
    opacity: heightValue.value > 10 ? 1 : 0,
  }));

  const rotateAnim = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value * 180}deg` }],
  }));

  return (
    <View className="bg-white px-4 py-4 rounded-2xl border border-gray-100 shadow">
      <TouchableOpacity
        onPress={toggle}
        className={`flex-row items-center justify-between ${open ? "mb-4" : ""}`}
        activeOpacity={0.7}
      >
        <View className="flex-row gap-3 items-center flex-1">
          {image && (
            <Image source={{ uri: image }} className="w-12 h-12 rounded-xl" />
          )}
          <View className="flex-1">
            <View className="flex-row gap-2 items-center mb-1">
              <Text className="text-[15px]">
                {truncate(title, 20, "...")}
              </Text>
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
                  <Text className="text-white text-[12px]">{status}</Text>
                </View>
              )}
            </View>
            {subtitle && (
              <Text className="text-[12px]">{subtitle}</Text>
            )}
          </View>
        </View>

        <Animated.View style={rotateAnim} className="ml-3">
          <MaterialIcons name="keyboard-arrow-down" size={22} color="black" />
        </Animated.View>
      </TouchableOpacity>

      <Animated.View style={[animatedHeight]} className="overflow-hidden">
        <View className="bg-[#F8F9FA] rounded-xl p-4">{children}</View>
      </Animated.View>
    </View>
  );
};

export default Accordion;
