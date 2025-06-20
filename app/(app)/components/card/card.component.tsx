import { Button, ThemedText, ThemedTextVariants } from "@/components/UI";
import { theme } from "@/constants";
import { BASE_URL } from "@/lib/fetcher/constants";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { TouchableOpacity, useWindowDimensions, View } from "react-native";
import { Book } from "../../book/types/book";
import { SizeVariants } from "../../interfaces";

export interface CardProps {
  isHorizontal: boolean;
  book: Book;
  size?: SizeVariants;
}
export default function Card({ isHorizontal, book }: CardProps) {
  const { width } = useWindowDimensions();
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.push(`/(app)/book/${book.documentId}`)}
    >
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
          source={`${BASE_URL}${book.image.url}`}
        />
        <View
          style={{
            marginVertical: 8,
          }}
        >
          <ThemedText
            variant={ThemedTextVariants.default}
            style={{
              fontSize: 16,
              color: theme.primary.brand50,
              fontWeight: "bold",
            }}
          >
            {book.name}
          </ThemedText>
          <ThemedText
            variant={ThemedTextVariants.default}
            style={{
              fontSize: 14,
              color: theme.primary.brand50,
            }}
          >
            {book.author_id.name}
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
              {book.description.slice(0, 150)}...
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
