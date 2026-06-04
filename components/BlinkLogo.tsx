import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle, Path } from "react-native-svg";

interface BlinkLogoProps {
  size?: number;
  textColor?: string;
  style?: any;
}

export const BlinkLogoIcon = ({ size = 48 }: { size?: number }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      {/* Outer Blue Circle */}
      <Circle cx="24" cy="24" r="24" fill="#0066CC" />

      {/* Styled white "b" / shopping cart symbol inside */}
      {/* Stem of the b */}
      <Path
        d="M17 14v16c0 1 .5 1.5 1.5 1.5h1"
        stroke="#FFFFFF"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* Cart/basket shape */}
      <Path
        d="M19.5 21.5h11c1 0 1.8.8 1.8 1.8v2.5c0 1.5-1.2 2.7-2.7 2.7H19.5"
        stroke="#FFFFFF"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Small wheels */}
      <Circle cx="21" cy="35" r="2.5" fill="#FFFFFF" />
      <Circle cx="29" cy="35" r="2.5" fill="#FFFFFF" />
    </Svg>
  );
};

export const BlinkLogo = ({
  size = 42,
  textColor = "#000000",
  style,
}: BlinkLogoProps) => {
  return (
    <View style={[styles.container, style]}>
      <BlinkLogoIcon size={size} />
      <Text style={[styles.brandText, { color: textColor }]}>blink</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  brandText: {
    fontFamily: "HankenGrotesk_900Black",
    fontSize: 48,
    letterSpacing: -1,
  },
});
