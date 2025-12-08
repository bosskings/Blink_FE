import React, { useEffect, useRef } from "react";
import { Animated as RNAnimated, View } from "react-native";

const TrendingHashtagsSkeletonItem = () => {
  const opacity = useRef(new RNAnimated.Value(0.3)).current;

  useEffect(() => {
    const loop = RNAnimated.loop(
      RNAnimated.sequence([
        RNAnimated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        RNAnimated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, []);

  return (
    <RNAnimated.View
      style={{ opacity }}
      className="bg-gray-100 p-5 rounded-2xl border border-gray-200"
    >
      <RNAnimated.View className="w-32 h-4 bg-gray-300 rounded mb-3" />
      <RNAnimated.View className="w-24 h-3 bg-gray-300 rounded mb-2" />
      <RNAnimated.View className="w-16 h-3 bg-gray-300 rounded" />
    </RNAnimated.View>
  );
};

export default TrendingHashtagsSkeletonItem;

