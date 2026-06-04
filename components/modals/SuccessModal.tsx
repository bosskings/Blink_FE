import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SolidMainButton } from "../Btns";

const { height } = Dimensions.get("window");

interface SuccessModalProps {
  visible: boolean;
  onClose: () => void;
  communityName: string;
  onProceed: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  visible,
  onClose,
  communityName,
  onProceed,
}) => {
  const slideAnim = useRef(new Animated.Value(height)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: height,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, slideAnim, fadeAnim]);

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.modalViewport}>
        {/* Animated backdrop with overlay blur */}
        <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]}>
          <TouchableOpacity
            style={{ flex: 1 }}
            activeOpacity={1}
            onPress={onClose}
          />
        </Animated.View>

        {/* Success Modal Sheet */}
        <Animated.View
          style={[
            styles.successSheet,
            { transform: [{ translateY: slideAnim }] },
          ]}
        >
          {/* Large Thumbs Up Success Icon */}
          <View style={styles.iconContainer}>
            <Ionicons name="thumbs-up" size={82} color="#0066CC" />
          </View>

          {/* Core copy with HankenGrotesk typography */}
          <View style={styles.textWrap}>
            <Text style={styles.successTitle}>
              {"You've joined your first community"}
            </Text>

            <Text style={styles.successSubtitle}>
              Secure your account and stand out in your{"\n"}new community with
              verification
            </Text>
          </View>

          {/* Upgraded action button */}
          <SolidMainButton
            text="Proceed to Account Verification"
            onPress={onProceed}
          />
        </Animated.View>
      </View>
    </Modal>
  );
};

export default SuccessModal;

const styles = StyleSheet.create({
  modalViewport: {
    flex: 1,
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
  },
  successSheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 42,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 20,
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  textWrap: {
    alignItems: "center",
    marginBottom: 36,
  },
  successTitle: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 20,
    color: "#000000",
    marginBottom: 10,
    textAlign: "center",
  },
  successSubtitle: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 12,
    color: "#4B5563",
    textAlign: "center",
    lineHeight: 22,
  },
});
