import { ThemedText } from "@/components/UI";
import { FlatList, ScrollView, View } from "react-native";
import { Card } from "./components/card/card.component";

export default function app() {
  return (
    <View style={{ flex: 1, padding: 32 }}>
      <ScrollView
        contentContainerStyle={{ paddingVertical: 16, gap: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <ThemedText>Libros destacados</ThemedText>
        <FlatList
          style={{ flex: 1 }}
          data={[null, null, null, null]}
          keyExtractor={(item, index) => `${index}`}
          renderItem={(info) => <Card />}
          horizontal
        />

        <ThemedText>Tus libros favoritos</ThemedText>
        <FlatList
          style={{ flex: 1 }}
          data={[null, null, null, null]}
          keyExtractor={(item, index) => `${index}`}
          renderItem={(info) => <Card />}
        />
      </ScrollView>
    </View>
  );
}
