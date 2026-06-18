import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import Animated, {
  FadeInDown,
  FadeOutDown,
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
  handleRemove?: (id: string | number) => void;
  handleAccept?: (id: string | number) => void;
  title?: string;
}

const RequestsList: React.FC<RequestsListProps> = ({
  requests,
  loading,
  handleRemove,
  handleAccept,
  title,
}) => {
  return (
    <Animated.View
      layout={LinearTransition.springify().damping(15).stiffness(90)}
      entering={FadeInDown.duration(300)}
      exiting={FadeOutDown.duration(200)}
      style={{ rowGap: 15 }}
    >
      {title && (
        <Text className="text-lg font-semibold mb-4" style={{}}>
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
        <View className="">
          {requests.length === 0 ? (
            <Animated.View
              entering={FadeInDown.duration(300)}
              exiting={FadeOutDown.duration(200)}
              className="items-center justify-center mt-32"
            >
              <Feather name="inbox" size={60} color="#d1d1d1" />
              <Text
                className="text-gray-400 mt-3 text-[13px]"
                style={{
                  fontFamily: "HankenGrotesk_500Medium",
                }}
              >
                No requests yet
              </Text>
            </Animated.View>
          ) : (
            <Animated.View
              layout={LinearTransition.springify().damping(15).stiffness(90)}
              entering={FadeInDown.duration(600).delay(300).springify()}
              exiting={FadeOutDown.duration(200)}
              className="bg-white px-6 py-6 rounded-2xl border border-gray-100 overflow-hidden shadow"
              style={{ rowGap: 15 }}
            >
              {requests.map((item, index) => (
                <Animated.View
                  key={item.id}
                  layout={LinearTransition.springify()}
                  entering={FadeInDown.duration(600)
                    .delay(400 + index * 100)
                    .springify()}
                  exiting={FadeOutDown.duration(250)}
                >
                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center flex-1 pr-2">
                      <View className="w-14 h-14 bg-orange-400 rounded-full overflow-hidden items-center justify-center mr-3">
                        <Image
                          source={item.image}
                          className="object-contain w-full h-full"
                        />
                      </View>
                      <View className="flex-1">
                        <Text
                          className="font-bold text-[17px]"
                          style={{}}
                          numberOfLines={1}
                        >
                          {item.name}
                        </Text>
                        <Text
                          className="text-[13px] text-gray-500"
                          style={{ fontFamily: "HankenGrotesk_500Medium" }}
                          numberOfLines={2}
                        >
                          wants to join Covenant University
                        </Text>
                      </View>
                    </View>

                    <View className="flex-row items-center">
                      <TouchableOpacity
                        className="flex items-center justify-center w-9 h-9 rounded-full mr-2"
                        style={{ backgroundColor: "#00AA44" }}
                        onPress={() => handleAccept?.(item.id)}
                      >
                        <Ionicons
                          name="checkmark-outline"
                          size={18}
                          color="white"
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        className="flex items-center justify-center w-9 h-9 rounded-full"
                        style={{ backgroundColor: "#FFB0B0" }}
                        onPress={() => handleRemove?.(item.id)}
                      >
                        <Ionicons
                          name="close-outline"
                          size={18}
                          color="#FF3333"
                        />
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
    </Animated.View>
  );
};

export default RequestsList;
