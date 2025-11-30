import {
  Container,
  Dropdown,
  ThemedText,
  ThemedTextVariants,
} from "@/components/UI";
import { theme } from "@/constants";
import { useBooksByCourseId } from "@/lib/react-query/books";
import { useCoursesByTeacherId } from "@/lib/react-query/courses";
import { useMemo, useState } from "react";
import { Platform, ScrollView, StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useAuthContext } from "../(auth)/hooks/useAuthContext";
import { Role } from "../(auth)/interfaces";
import CardAligmentButton from "./components/card-aligment-button/card-aligment-button.component";
import Card from "./components/card/card.component";
import { EmptyState } from "./components/empty-state";
import useBooksAligment, { BooksAligment } from "./hooks/use-books-aligment";

export default function App() {
  const [selectedGrade, setSelectedGrade] = useState("all");
  const { bookAligment, setDirection } = useBooksAligment();
  const { user } = useAuthContext();

  const isHorizontal = bookAligment === BooksAligment.horizontal;
  const isTeacher = user?.role === Role.TEACHER;
  const isIos = Platform.OS === "ios";

  const { data: coursesData, isLoading: isLoadingCourses } =
    useCoursesByTeacherId(user?.teacherId, isTeacher);

  const { data: books, isLoading: isLoadingBooks } = useBooksByCourseId(
    selectedGrade,
    !isLoadingCourses && isTeacher
  );

  const courses = useMemo(
    () => [
      { label: "Todos", value: "all" },
      ...(coursesData?.map((course) => ({
        label: course.name,
        value: course.id,
      })) || []),
    ],
    [coursesData]
  );

  return (
    <Container gradient withNavbar>
      <View
        style={{
          marginTop: isIos ? -32 : 0,
          marginBottom: 21,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <ThemedText style={styles.title} variant={ThemedTextVariants.default}>
          Todos los libros
        </ThemedText>

        {isTeacher ? (
          <Dropdown
            value={selectedGrade}
            onChange={(item: string | string[]) =>
              setSelectedGrade(item as string)
            }
            options={courses || []}
          />
        ) : (
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
        )}
      </View>

      <ScrollView
        contentContainerStyle={{ paddingVertical: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: books?.length ? 28 : 0,
            paddingBottom: isIos ? 32 : 128,
          }}
        >
          {isLoadingBooks || isLoadingCourses ? (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ActivityIndicator color="white" />
            </View>
          ) : books?.length ? (
            books?.map((book) => (
              <Card isHorizontal={isHorizontal} book={book} key={book.id} />
            ))
          ) : (
            <EmptyState />
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
