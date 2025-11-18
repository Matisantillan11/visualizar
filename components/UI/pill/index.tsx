import { theme } from "@/constants";
import { View } from "react-native";
import { ThemedText, ThemedTextVariants } from "../text";

export default function Pill({ label }: { label: string }) {
  return (
    <View
      style={{
        backgroundColor: theme.primary.brand800,
        padding: 8,
        borderRadius: 16,
      }}
    >
      <ThemedText variant={ThemedTextVariants.default}>{label}</ThemedText>
    </View>
  );
}
