import { Ionicons } from "@expo/vector-icons";
import { Animated, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface FloatingActionMenuProps {
  visible: boolean;
  menuAnim: Animated.Value;
  onClose: () => void;
  onCreateListing: () => void;
  onMakeRequest: () => void;
  onPostToForum: () => void;
}

export const FloatingActionMenu = ({
  visible,
  menuAnim,
  onClose,
  onCreateListing,
  onMakeRequest,
  onPostToForum,
}: FloatingActionMenuProps) => {
  return (
    <Modal visible={visible} transparent animationType="none" onRequestClose={onClose}>
      <Animated.View style={[styles.overlay, { opacity: menuAnim }]}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <Animated.View
          style={[
            styles.container,
            {
              transform: [
                {
                  translateY: menuAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0],
                  }),
                },
                {
                  scale: menuAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.95, 1],
                  }),
                },
              ],
            },
          ]}
        >
          <TouchableOpacity onPress={onCreateListing} style={styles.menuItem} activeOpacity={0.8}>
            <Text style={styles.menuItemText}>Create a Listing</Text>
            <View style={styles.iconCircle}>
              <Ionicons name="settings-outline" size={18} color="#0066CC" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={onMakeRequest} style={styles.menuItem} activeOpacity={0.8}>
            <Text style={styles.menuItemText}>Make a Request</Text>
            <View style={styles.iconCircle}>
              <Ionicons name="calendar-outline" size={18} color="#0066CC" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={onPostToForum} style={styles.menuItem} activeOpacity={0.8}>
            <Text style={styles.menuItemText}>Post to Forum</Text>
            <View style={styles.iconCircle}>
              <Ionicons name="document-text-outline" size={18} color="#0066CC" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose} style={styles.closeBtn} activeOpacity={0.8}>
            <Ionicons name="close" size={26} color="#fff" />
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingBottom: 110,
    paddingRight: 24,
  },
  container: {
    alignItems: "flex-end",
    gap: 16,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  menuItemText: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 12,
    color: "#000000",
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F0F7FF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  closeBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#0066CC",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
});
