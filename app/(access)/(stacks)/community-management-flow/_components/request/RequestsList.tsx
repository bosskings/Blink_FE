import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  FadeInRight,
  FadeOutRight,
  LinearTransition,
} from "react-native-reanimated";
import RequestSkeletonItem from "./request-skeleton";

interface RequestItem {
  id: string | number;
  name: string;
  image: any; // can be require() or { uri: string }
}

interface RequestsListProps {
  requests: RequestItem[];
  loading: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
  handleRemove: (id: string | number) => void;
  title?: string;
}

const RequestsList: React.FC<RequestsListProps> = ({
  requests,
  loading,
  refreshing,
  onRefresh,
  handleRemove,
  title,
}) => {
  return (
    <ScrollView
      className="flex-1 px-6"
      refreshControl={
        <RefreshControl refreshing={refreshing!} onRefresh={onRefresh} />
      }
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    >
      {title && (
        <Text
          className="text-lg font-semibold mb-4"
          style={{ fontFamily: "HankenGrotesk_700Bold" }}
        >
          {title}
        </Text>
      )}

      {loading ? (
        <View className="bg-white px-6 py-6 rounded-2xl border border-gray-100 shadow">
          {requests.map((key) => (
            <RequestSkeletonItem key={key.id} />
          ))}
        </View>
      ) : (
        <View className="flex-1">
          {requests.length === 0 ? (
            <Animated.View
              entering={FadeInRight.duration(300)}
              exiting={FadeOutRight.duration(200)}
              className="items-center justify-center mt-32"
            >
              <MaterialIcons name="inbox" size={60} color="#d1d1d1" />
              <Text
                className="text-gray-400 mt-3"
                style={{
                  fontFamily: "HankenGrotesk_500Medium",
                  fontSize: 16,
                }}
              >
                No requests yet
              </Text>
            </Animated.View>
          ) : (
            <Animated.View
              layout={LinearTransition.springify().damping(15).stiffness(90)}
              entering={FadeInRight.duration(250)}
              exiting={FadeOutRight.duration(200)}
              className="bg-white px-6 py-6 rounded-2xl border border-gray-100 overflow-hidden shadow"
              style={{ rowGap: 15 }}
            >
              {requests.map((item, index) => (
                <Animated.View
                  key={item.id}
                  layout={LinearTransition.springify()}
                  entering={FadeInRight.duration(250)}
                  exiting={FadeOutRight.duration(250)}
                >
                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center">
                      <View className="w-14 h-14 bg-orange-400 rounded-full overflow-hidden items-center justify-center mr-2">
                        <Image
                          source={item.image}
                          className="object-contain w-full h-full"
                        />
                      </View>
                      <View>
                        <Text
                          className="font-semibold text-md"
                          style={{
                            fontFamily: "HankenGrotesk_900Black",
                            fontSize: 15,
                          }}
                        >
                          {item.name}
                        </Text>
                        <Text
                          className="text-xs text-gray-500"
                          style={{
                            fontFamily: "HankenGrotesk_400Regular",
                          }}
                        >
                          wants to join Covenant University
                        </Text>
                      </View>
                    </View>

                    <View className="flex-row items-center">
                      <TouchableOpacity
                        className="flex items-center justify-center w-9 h-9 rounded-full mr-2"
                        style={{ backgroundColor: "#00AA44" }}
                        onPress={() => {}}
                      >
                        <FontAwesome6 name="check" size={15} color="white" />
                      </TouchableOpacity>

                      <TouchableOpacity
                        className="flex items-center justify-center w-9 h-9 rounded-full"
                        style={{ backgroundColor: "#FFB0B0" }}
                        onPress={() => handleRemove(item.id)}
                      >
                        <MaterialIcons name="close" size={15} color="#FF3333" />
                      </TouchableOpacity>
                    </View>
                  </View>

                  {index !== requests.length - 1 && (
                    <View
                      className="w-full h-[1px] mt-4"
                      style={{ backgroundColor: "#D9D9D9" }}
                    />
                  )}
                </Animated.View>
              ))}
            </Animated.View>
          )}
        </View>
      )}
    </ScrollView>
  );
};

export default RequestsList;
