import { Button, ThemedText, ThemedTextVariants } from "@/components/UI";
import { theme } from "@/constants";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { TouchableOpacity, useWindowDimensions, View } from "react-native";
import { SizeVariants } from "../../interfaces";

export interface CardProps {
  isHorizontal: boolean;
  size?: SizeVariants;
}
export default function Card({ isHorizontal }: CardProps) {
  const { width } = useWindowDimensions();
  const router = useRouter();
  return (
    <TouchableOpacity onPress={() => router.push("/(app)/book")}>
      <View
        style={{
          width: isHorizontal ? 150 : width,
          overflow: "hidden",
          flexDirection: isHorizontal ? "column" : "row",
          gap: isHorizontal ? 0 : 24,
        }}
      >
        <Image
          style={{
            borderRadius: 8,
            width: 150,
            height: 250,
          }}
          contentFit="cover"
          source="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoKGktM4wNk7zxIoOJHs4djt9VLFd-005fFQ&s"
        />
        <View style={{ alignContent: "center", marginVertical: 8 }}>
          <ThemedText
            variant={ThemedTextVariants.default}
            style={{
              fontSize: 16,
              color: theme.primary.brand50,
              fontWeight: "bold",
            }}
          >
            The tiny dragon
          </ThemedText>
          <ThemedText
            variant={ThemedTextVariants.default}
            style={{
              fontSize: 14,
              color: theme.primary.brand50,
            }}
          >
            Rupert Carter
          </ThemedText>

          {!isHorizontal ? (
            <ThemedText
              variant={ThemedTextVariants.default}
              style={{
                fontSize: 14,
                color: theme.primary.brand50,
                textOverflow: "",
                marginTop: 16,
                maxWidth: 150,
              }}
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's...
            </ThemedText>
          ) : null}

          {!isHorizontal ? (
            <Button style={{ maxWidth: 150, maxHeight: 28, marginTop: 16 }}>
              Ver detalles
            </Button>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
}
