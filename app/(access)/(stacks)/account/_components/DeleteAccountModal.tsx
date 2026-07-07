import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDeleteAccount } from "@/services";
import { useAuth } from "@/providers/AuthProvider";
import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import LoadingOverlay from "@/components/LoadingOverlay";
import { useAlert } from "@/providers/AlertProvider";


interface DeleteAccountModalProps {
  visible: boolean;
  onClose: () => void;
}

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({
  visible,
  onClose,
}) => {
  const deleteAccountMutation = useDeleteAccount();
  const { logout } = useAuth();
  const queryClient = useQueryClient();
  const { showAlert } = useAlert();

  const handleDelete = () => {
    deleteAccountMutation.mutate(undefined, {
      onSuccess: async () => {
        onClose();
        await queryClient.clear();
        await logout();
        router.replace("/(noaccess)/sign-in-method");
      },
      onError: (error) => {
        showAlert(
          "Error",
          error instanceof Error ? error.message : "Failed to delete account.",
        );
      },
    });
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <LoadingOverlay visible={deleteAccountMutation.isPending} />
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.iconWrap}>
            <Ionicons name="warning-outline" size={36} color="#DC2626" />
          </View>

          <Text style={styles.title}>Delete Account</Text>
          <Text style={styles.message}>
            Are you sure you want to delete your account? This action is
            permanent and cannot be undone. All your data will be lost.
          </Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onClose}
              activeOpacity={0.8}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDelete}
              activeOpacity={0.8}
              disabled={deleteAccountMutation.isPending}
            >
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteAccountModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 28,
    width: "100%",
    alignItems: "center",
  },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#FEF2F2",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontFamily: "HankenGrotesk_700Bold",
    fontSize: 18,
    color: "#111827",
    marginBottom: 8,
  },
  message: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 12,
    color: "#4B5563",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 28,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
  },
  cancelButton: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
  cancelText: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 12,
    color: "#374151",
  },
  deleteButton: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    backgroundColor: "#DC2626",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteText: {
    fontFamily: "HankenGrotesk_500Medium",
    fontSize: 12,
    color: "#FFFFFF",
  },
});
