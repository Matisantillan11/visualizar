import { Container, ThemedText, ThemedTextVariants } from "@/components/UI";
import { theme } from "@/constants";
import { fetcher } from "@/lib/fetcher";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { Book, BooksResponse } from "./book/types/book";
import CardAligmentButton from "./components/card-aligment-button/card-aligment-button.component";
import Card from "./components/card/card.component";
import useBooksAligment, { BooksAligment } from "./hooks/use-books-aligment";

export default function app() {
  const { bookAligment, flexDirection, setDirection } = useBooksAligment();
  const isHorizontal = bookAligment === BooksAligment.horizontal;

  const [books, setBook] = useState<Array<Book> | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const booksUrl = `/api/books?populate[author_id][fields][0]=name&populate[image][fields][0]=url`;

  useEffect(() => {
    const fetchBook = async () => {
      const response = await fetcher<BooksResponse>({
        url: booksUrl,
      });

      if (response && response.data) {
        setBook(response.data);
        setIsLoading(false);
      }
    };

    fetchBook();
  }, []);

  return (
    <Container gradient withNavbar>
      <View
        style={{
          marginTop: -32,
          marginBottom: 21,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <ThemedText style={styles.title} variant={ThemedTextVariants.default}>
          Todos los libros
        </ThemedText>
        <View style={{ flexDirection: "row", gap: 4 }}>
          <CardAligmentButton
            iconName="grid-outline"
            size={20}
            onPress={() => setDirection(BooksAligment.horizontal)}
            color="white"
            isSelected={isHorizontal}
          />
          <CardAligmentButton
            iconName="list"
            size={20}
            onPress={() => setDirection(BooksAligment.vertical)}
            color="white"
            isSelected={!isHorizontal}
          />
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{ paddingVertical: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            flexDirection,
            flexWrap: "wrap",
            gap: 28,
          }}
        >
          {isLoading ? (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ActivityIndicator color="white" />
            </View>
          ) : (
            books?.map((book) => (
              <Card isHorizontal={isHorizontal} book={book} key={book.id} />
            ))
          )}
        </View>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.primary.brand50,
  },
});
