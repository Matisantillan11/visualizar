import { ThemedText, ThemedTextVariants } from "@/components/UI";
import { Image } from "expo-image";
import { View } from "react-native";
import { SizeVariants } from "../../interfaces";
import { cardSizeVariants } from "./utils/card-variants";

export interface CardProps {
  size?: SizeVariants;
}
export const Card = ({ size = SizeVariants.md }: CardProps) => {
  const cardSize = cardSizeVariants(size);
  return (
    <View
      style={{
        flex: 1,
        marginRight: 12,
        overflow: "hidden",
      }}
    >
      <Image
        style={{ flex: 1, borderRadius: 8, ...cardSize }}
        contentFit="cover"
        source="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoKGktM4wNk7zxIoOJHs4djt9VLFd-005fFQ&s"
      />
      <View style={{ alignItems: "center", marginVertical: 8 }}>
        <ThemedText
          variant={ThemedTextVariants.default}
          style={{ fontSize: 16 }}
        >
          The tiny dragon
        </ThemedText>
      </View>
    </View>
  );
};
