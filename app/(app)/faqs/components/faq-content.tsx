import { ThemedText, ThemedTextVariants } from "@/components/UI";
import { View } from "react-native";

export default function FaqContent({ content }: { content: string }) {
  return (
    <View>
      <ThemedText variant={ThemedTextVariants.default}>{content}</ThemedText>
    </View>
  );
}

export function FaqSubContent({ content }: { content: string }) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        gap: 5,
        paddingHorizontal: 5,
        paddingVertical: 5,
      }}
    >
      <View
        style={{
          height: 4,
          width: 4,
          marginTop: 5,
          backgroundColor: "#fff",
          borderRadius: 100,
        }}
      />
      <ThemedText variant={ThemedTextVariants.default}>{content}</ThemedText>
    </View>
  );
}
