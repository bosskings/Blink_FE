import { Text, TouchableOpacity, StyleSheet } from "react-native";

interface ButtonProps {
  text: string;
  onPress?: () => void;
  disabled?: boolean;
  style?: any;
}

export const SolidMainButton = ({
  text,
  onPress,
  style,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      {...props}
      onPress={onPress}
      disabled={disabled}
      style={[styles.mainButton, disabled && styles.disabledButton, style]}
      activeOpacity={0.8}
    >
      <Text style={styles.mainButtonText}>{text}</Text>
    </TouchableOpacity>
  );
};

export const SolidGrayButton = ({
  text,
  onPress,
  style,
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      {...props}
      onPress={onPress}
      disabled={disabled}
      style={[styles.grayButton, disabled && styles.disabledButton, style]}
      activeOpacity={0.8}
    >
      <Text style={styles.grayButtonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainButton: {
    backgroundColor: "#0066CC",
    width: "100%",
    borderRadius: 10,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  mainButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontFamily: "HankenGrotesk_500Medium",
  },
  grayButton: {
    backgroundColor: "#F3F4F6",
    width: "100%",
    borderRadius: 10,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  grayButtonText: {
    color: "#374151",
    fontSize: 12,
    fontFamily: "HankenGrotesk_500Medium",
  },
  disabledButton: {
    opacity: 0.6,
  },
});
