import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  FadeInRight,
  FadeOutRight,
  LinearTransition,
} from "react-native-reanimated";
import ReportSkeletonItem from "./report-skeleton";

interface ReportedPost {
  id: string | number;
  avatar: any;
  userName: string;
  timeAgo: string;
  reason: string;
  content: string;
}

interface ReportedPostsListProps {
  posts: ReportedPost[];
  loading: boolean;
  handleReview?: (id: string | number) => void;
  handleTakeDown?: (id: string | number) => void;
  initialReportedPosts: ReportedPost[];
  title?: string;
}

const ReportedPostsList: React.FC<ReportedPostsListProps> = ({
  posts,
  loading,
  handleReview,
  handleTakeDown,
  initialReportedPosts,
  title,
}) => {
  return (
    <Animated.View
      layout={LinearTransition.springify()}
      entering={FadeInRight.duration(250)}
      exiting={FadeOutRight.duration(200)}
      style={{ rowGap: 20 }}
    >
      {title && (
        <Text className="text-lg font-semibold mb-4" style={{}}>
          {title}
        </Text>
      )}

      {loading ? (
        <View style={{ rowGap: 20 }}>
          {initialReportedPosts.map((key) => (
            <ReportSkeletonItem key={key.id} />
          ))}
        </View>
      ) : (
        <View className="">
          {posts.length === 0 ? (
            <Animated.View
              entering={FadeInRight.duration(400).springify().damping(18)}
              exiting={FadeOutRight.duration(250)}
              className="items-center justify-center mt-32"
            >
              <MaterialIcons name="inbox" size={60} color="#d1d1d1" />
              <Text className="text-lg text-gray-700 text-center" style={{}}>
                No Reported Posts
              </Text>
              <Text className="text-gray-500 mt-1 text-center px-10" style={{}}>
                You currently have no reported posts to review.
              </Text>
            </Animated.View>
          ) : (
            <Animated.View
              layout={LinearTransition.springify().damping(15).stiffness(90)}
              entering={FadeInRight.duration(250)}
              exiting={FadeOutRight.duration(200)}
              style={{ rowGap: 20 }}
            >
              {posts.map((post) => (
                <Animated.View
                  key={post.id}
                  layout={LinearTransition.springify()}
                  entering={FadeInRight.duration(250)}
                  exiting={FadeOutRight.duration(250)}
                  className="bg-white px-6 py-6 rounded-2xl border border-gray-100 overflow-hidden shadow"
                >
                  <View className="flex-row items-center justify-between mb-3">
                    <View className="flex-row items-center">
                      <Image
                        source={post.avatar}
                        className="w-14 h-14 rounded-full mr-3"
                      />
                      <View>
                        <Text className="font-semibold text-[15px]" style={{}}>
                          {post.userName}
                        </Text>
                        <Text className="text-black text-sm" style={{}}>
                          {post.timeAgo}
                        </Text>
                      </View>
                    </View>
                    <View
                      className="flex-row items-center px-4 py-2 rounded-full"
                      style={{
                        backgroundColor: "#F8F9FA",
                      }}
                    >
                      <Text
                        className="text-sm"
                        style={{
                          color: "#FF3333",
                        }}
                      >
                        Reason: {post.reason}
                      </Text>
                    </View>
                  </View>

                  <Text className="text-gray-800 mb-4" style={{}}>
                    {post.content}
                  </Text>

                  <View className="flex-row gap-3">
                    <TouchableOpacity
                      onPress={() => handleReview?.(post.id)}
                      className="flex-1 py-3 rounded-lg items-center"
                      style={{ backgroundColor: "#0066CC" }}
                    >
                      <Text className="text-white font-semibold" style={{}}>
                        Review
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleTakeDown?.(post.id)}
                      className="flex-1 py-3 rounded-lg items-center"
                      style={{ backgroundColor: "#FF3333" }}
                    >
                      <Text className="text-white font-semibold" style={{}}>
                        Take Down
                      </Text>
                    </TouchableOpacity>
                  </View>
                </Animated.View>
              ))}
            </Animated.View>
          )}
        </View>
      )}
    </Animated.View>
  );
};

export default ReportedPostsList;
