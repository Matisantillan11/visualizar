import { theme } from "@/constants";
import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";

export const VerticalLinearGradient = ({
  children,
  colors = [
    theme.primary.brand950,
    theme.primary.brand900,
    theme.primary.brand800,
  ],
}: {
  children?: ReactNode;
  colors?: any;
}) => {
  return (
    <LinearGradient
      colors={colors}
      locations={[0.5, 0.75, 1]}
      start={{ x: 0.5, y: 1 }}
      end={{ x: 0.5, y: 0 }}
      style={{ flex: 1 }}
    >
      {children}
    </LinearGradient>
  );
};
