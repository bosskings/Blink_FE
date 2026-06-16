import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

export const RequestCard = ({ item, styles }: { item: any; styles: any }) => (
  <View style={styles.requestCard}>
    {/* Priority label with dot */}
    <View style={styles.priorityRow}>
      <View style={styles.priorityDot} />
      <Text style={styles.priorityText}>{item.priority}</Text>
    </View>

    {/* Request details */}
    <Text style={styles.requestTitle}>{item.title}</Text>
    <Text style={styles.requestDesc}>{item.description}</Text>

    {/* Clock and response count meta row */}
    <View style={styles.metaRow}>
      <View style={styles.metaItem}>
        <Ionicons name="time-outline" size={14} color="#6B7280" />
        <Text style={styles.metaText}>{item.timePosted}</Text>
      </View>
      <View style={styles.metaItem}>
        <Ionicons name="chatbubble-outline" size={14} color="#6B7280" />
        <Text style={styles.metaText}>{item.responsesCount}</Text>
      </View>
    </View>

    {/* Inner Footer Box */}
    <View style={styles.cardFooterDivider} />
    <View style={styles.cardFooterRow}>
      <TouchableOpacity 
        style={styles.footerProfile}
        onPress={() => router.push(`/(access)/(stacks)/user/${item.requester.id || '1'}` as any)}
      >
        <Image source={item.requester.avatar} style={styles.footerAvatar} />
        <View>
          <Text style={styles.footerName}>{item.requester.name}</Text>
          <Text style={styles.footerDistance}>{item.requester.distance}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.footerChatCircle} 
        activeOpacity={0.7}
        onPress={() => router.push('/(access)/(stacks)/chat-flow/chat/new-chat')}
      >
        <Ionicons
          name="chatbubble-ellipses-outline"
          size={18}
          color="#6B7280"
        />
      </TouchableOpacity>
    </View>
  </View>
);
