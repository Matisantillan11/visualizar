import { ThemedText, ThemedTextVariants } from "@/components/UI";
import { View } from "react-native";

export default function FaqContent({ content }: { content: string }) {
  return (
    <View>
      <ThemedText variant={ThemedTextVariants.default}>{content}</ThemedText>
    </View>
  );
}
