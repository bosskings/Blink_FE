import { Entypo, Feather, Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, {
  FadeInDown,
  FadeOutDown,
  LinearTransition,
} from "react-native-reanimated";
import TrendingHashtagsSkeletonItem from "./trending-hashtags-skeleton";

interface TrendingHashtag {
  id: string | number;
  tag: string;
  posts: number | string;
  location: string;
}

interface TrendingHashtagsListProps {
  hashtags: TrendingHashtag[];
  loading: boolean;
  initialHashtags: TrendingHashtag[];
  onViewHashtag?: (tag: string) => void;
  title?: string;
}

const TrendingHashtagsList: React.FC<TrendingHashtagsListProps> = ({
  hashtags,
  loading,
  initialHashtags,
  onViewHashtag,
  title,
}) => {
  return (
    <Animated.View
      layout={LinearTransition.springify()}
      entering={FadeInDown.duration(300)}
      exiting={FadeOutDown.duration(250)}
      style={{ rowGap: 20 }}
    >
      {title && (
        <Text className="text-lg font-semibold mb-4" style={{}}>
          {title}
        </Text>
      )}

      {loading ? (
        // 🟡 Skeleton Loader
        <View style={{ rowGap: 20 }}>
          {initialHashtags.map((item) => (
            <TrendingHashtagsSkeletonItem key={item.id} />
          ))}
        </View>
      ) : hashtags.length === 0 ? (
        // 🚫 Empty State
        <Animated.View
          entering={FadeInDown.duration(400).springify().damping(18)}
          exiting={FadeOutDown.duration(250)}
          className="flex-1 items-center justify-center mt-32"
        >
          <Feather name="inbox" size={60} color="#d1d1d1" />
          <Text
            className="text-[17px] text-gray-700 text-center font-bold"
            style={{}}
          >
            No Trending Hashtags
          </Text>
          <Text
            className="text-gray-500 mt-1 text-center px-10 text-[13px]"
            style={{ fontFamily: "HankenGrotesk_500Medium" }}
          >
            There are currently no trending hashtags to display.
          </Text>
        </Animated.View>
      ) : (
        // 🟢 Content
        <Animated.View
          layout={LinearTransition.springify().damping(15).stiffness(90)}
          entering={FadeInDown.duration(300)}
          exiting={FadeOutDown.duration(250)}
          style={{ rowGap: 20 }}
        >
          {hashtags.map((item, index) => (
            <Animated.View
              key={item.id}
              layout={LinearTransition.springify()}
              entering={FadeInDown.duration(600)
                .delay(100 + index * 50)
                .springify()}
              exiting={FadeOutDown.duration(250)}
              className="bg-white px-6 py-6 rounded-2xl border border-gray-100 shadow"
            >
              <View className="flex-row items-center justify-between">
                <View>
                  <View
                    className="flex-row items-center"
                    style={{ rowGap: 10 }}
                  >
                    <Text
                      className="text-[17px] font-bold"
                      style={{
                        color: "#0066CC",
                      }}
                    >
                      {item.tag}
                    </Text>
                    <Entypo name="dot-single" size={10} color="#0066CC" />
                    <Text
                      className="text-black text-[13px] font-bold"
                      style={{ fontFamily: "HankenGrotesk_500Medium" }}
                    >
                      {typeof item.posts === "number"
                        ? `${item.posts} posts`
                        : item.posts}
                    </Text>
                  </View>
                  <Text
                    className="text-black text-[13px]"
                    style={{ fontFamily: "HankenGrotesk_500Medium" }}
                  >
                    {item.location}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => onViewHashtag?.(item.tag)}
                  className="p-3 rounded-full"
                  style={{ backgroundColor: "#0066CC" }}
                >
                  <Ionicons
                    name="arrow-forward-outline"
                    size={18}
                    color="#fff"
                  />
                </TouchableOpacity>
              </View>
            </Animated.View>
          ))}
        </Animated.View>
      )}
    </Animated.View>
  );
};

export default TrendingHashtagsList;
