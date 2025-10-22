import React, { useEffect, useRef } from "react";
import { Animated as RNAnimated, View } from "react-native";

const ReportSkeletonItem = () => {
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
    <View className="bg-white p-4 rounded-xl shadow">
      <RNAnimated.View
        style={{ opacity }}
        className="flex-row items-center mb-3"
      >
        <RNAnimated.View className="w-14 h-14 rounded-full bg-gray-200 mr-3" />
        <View>
          <RNAnimated.View className="w-32 h-4 bg-gray-200 rounded mb-2" />
          <RNAnimated.View className="w-24 h-3 bg-gray-200 rounded" />
        </View>
      </RNAnimated.View>
      <RNAnimated.View className="w-full h-4 bg-gray-200 rounded mb-4" />
    </View>
  );
};

export default ReportSkeletonItem;
