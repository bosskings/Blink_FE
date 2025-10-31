import React, { useEffect, useRef } from "react";
import { Animated as RNAnimated, View } from "react-native";

const RequestSkeletonItem = () => {
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
    <View className="flex-row items-center justify-between mb-5">
      <View className="flex-row items-center">
        <RNAnimated.View
          style={{ opacity }}
          className="w-14 h-14 bg-gray-200 rounded-full mr-3"
        />
        <View>
          <RNAnimated.View
            style={{ opacity }}
            className="w-28 h-4 bg-gray-200 rounded-md mb-2"
          />
          <RNAnimated.View
            style={{ opacity }}
            className="w-40 h-3 bg-gray-200 rounded-md"
          />
        </View>
      </View>
      <View className="flex-row">
        <RNAnimated.View
          style={{ opacity }}
          className="w-9 h-9 bg-gray-200 rounded-full mr-2"
        />
        <RNAnimated.View
          style={{ opacity }}
          className="w-9 h-9 bg-gray-200 rounded-full"
        />
      </View>
    </View>
  );
};

export default RequestSkeletonItem;
