import { theme } from "@/constants";
import React from "react";
import { View } from "react-native";
import Svg, { Circle, Defs, RadialGradient, Stop } from "react-native-svg";
import { BlurViewProps } from "./types";
export const BlurView = ({
  children,
  size = 200,
  top = 0,
  left = 0,
  bottom = 0,
  right = 0,
  color = theme.success.success100,
  intensity = 70,
}: BlurViewProps) => {
  const opacity = intensity / 100;
  const glowCenter = size / 2;
  return (
    <View
      style={{
        position: "absolute",
        top,
        left,
        bottom,
        right,
        width: size,
        height: size,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Radial glow effect */}
      <Svg width={size} height={size} style={{ position: "absolute" }}>
        <Defs>
          <RadialGradient
            id="grad"
            cx="50%"
            cy="50%"
            rx="50%"
            ry="50%"
            fx="50%"
            fy="50%"
          >
            <Stop offset="0%" stopColor={color} stopOpacity={opacity} />
            <Stop offset="100%" stopColor={color} stopOpacity="0" />
          </RadialGradient>
        </Defs>
        <Circle
          cx={glowCenter}
          cy={glowCenter}
          r={glowCenter}
          fill="url(#grad)"
        />
      </Svg>

      {/* Avatar */}
      {children}
    </View>
  );
};
