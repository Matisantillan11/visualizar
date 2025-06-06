import { Container, ThemedText, ThemedTextVariants } from "@/components/UI";
import { theme } from "@/constants";
import { ScrollView, StyleSheet, View } from "react-native";
import CardAligmentButton from "./components/card-aligment-button/card-aligment-button.component";
import Card from "./components/card/card.component";
import useBooksAligment, { BooksAligment } from "./hooks/use-books-aligment";

export default function app() {
  const { bookAligment, flexDirection, setDirection } = useBooksAligment();
  const isHorizontal = bookAligment === BooksAligment.horizontal;
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
          <Card isHorizontal={isHorizontal} />
          <Card isHorizontal={isHorizontal} />
          <Card isHorizontal={isHorizontal} />
          <Card isHorizontal={isHorizontal} />
          <Card isHorizontal={isHorizontal} />
          <Card isHorizontal={isHorizontal} />
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
