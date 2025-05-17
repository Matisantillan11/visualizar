import { theme } from "@/constants";
import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";

export const VerticalLinearGradient = ({
  children,
}: {
  children?: ReactNode;
}) => {
  return (
    <LinearGradient
      colors={[
        theme.primary.brand950,
        theme.primary.brand900,
        theme.primary.brand800,
      ]} // reemplazá con los reales
      locations={[0.5, 0.75, 1]}
      start={{ x: 0.5, y: 1 }}
      end={{ x: 0.5, y: 0 }}
      style={{ flex: 1 }}
    >
      {children}
    </LinearGradient>
  );
};
