import {
  Container,
  Dropdown,
  ThemedText,
  ThemedTextVariants,
} from "@/components/UI";
import { theme } from "@/constants";
import { fetcher } from "@/lib/fetcher";
import { useEffect, useState } from "react";
import { Platform, ScrollView, StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { useAuthContext } from "../(auth)/hooks/useAuthContext";
import { Role } from "../(auth)/interfaces";
import { Book } from "./book/types/book";
import CardAligmentButton from "./components/card-aligment-button/card-aligment-button.component";
import Card from "./components/card/card.component";
import { EmptyState } from "./components/empty-state";
import useBooksAligment, { BooksAligment } from "./hooks/use-books-aligment";

export default function app() {
  const { bookAligment, flexDirection, setDirection } = useBooksAligment();
  const { user } = useAuthContext();

  const [isLoadingCourses, setIsLoadingCourses] = useState<boolean>(true);
  const [books, setBook] = useState<Array<Book> | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedGrade, setSelectedGrade] = useState("all");
  const [courses, setCourses] = useState<
    Array<{ label: string; value: string }>
  >([{ label: "Todos", value: "all" }]);

  const isHorizontal = bookAligment === BooksAligment.horizontal;
  const isTeacher = user?.role === Role.TEACHER;
  const booksUrl = `/books`;

  const isIos = Platform.OS === "ios";

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoadingCourses(true);
        const courseResponse = await fetcher<any[]>({
          url: `/courses/teacher/${user?.teacherId}`,
        });

        if (courseResponse) {
          const courses = courseResponse.map((course) => ({
            label: course.name,
            value: course.id,
          }));
          setCourses((prevCourses) => [...prevCourses, ...courses]);
        }
      } catch (error) {
        console.log({ error });
      } finally {
        setIsLoadingCourses(false);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      if (isLoadingCourses) return;

      try {
        const isAllGradesSelected = selectedGrade === "all";
        const finalBookUrl = isAllGradesSelected
          ? booksUrl
          : `${booksUrl}/course/${selectedGrade}`;
        const bookResponse = await fetcher<Book[]>({
          url: finalBookUrl,
        });

        if (bookResponse) {
          setBook(bookResponse);
        }
      } catch (error) {
        console.log({ error });
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, [isLoadingCourses, selectedGrade]);

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
            onChange={(item: string) => setSelectedGrade(item)}
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
          {isLoading || isLoadingCourses ? (
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
