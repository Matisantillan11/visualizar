import {
  Button,
  ButtonVariants,
  DataSecurityIllustration,
  Dropdown,
  Input,
  RadioButton,
  ThemedText,
} from "@/components/UI";
import { StyleSheet, View } from "react-native";

import { useAuthContext } from "@/app/(auth)/hooks/useAuthContext";
import { VerticalLinearGradient } from "@/components/linear-gradient/linear-gradient.component";
import { theme } from "@/constants";
import { fetcher } from "@/lib/fetcher";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { getAnimationsSelected } from "./helpers";

export default function RequestBook() {
  const { user } = useAuthContext();
  const router = useRouter();

  const [selectedGrade, setSelectedGrade] = useState<string>("");
  const [courses, setCourses] = useState<
    Array<{ label: string; value: string }>
  >([]);

  const [bookName, setBookName] = useState<string>("");
  const [authorName, setAuthorName] = useState<string>("");
  const [comments, setComments] = useState<string>("");
  const [checked, setChecked] = React.useState("all");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
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
      }
    };

    fetchCourses();
  }, []);
  const onSendRequest = async () => {
    try {
      if (!user) {
        throw new Error("User not found");
      }

      if (!bookName || !authorName) {
        throw new Error("Book name and author name are required");
      }

      console.log({
        courseIds: [selectedGrade],
        title: bookName,
        authorName,
        comments,
        animations: getAnimationsSelected(checked),
      });

      const response = await fetcher<any>({
        url: "/books/request",
        init: {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            courseIds: [selectedGrade],
            title: bookName,
            authorName,
            comments,
            animations: getAnimationsSelected(checked),
          }),
        },
      });

      if ("id" in response) {
        router.navigate(`/(app)`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <VerticalLinearGradient>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingVertical: 32 }}>
        <View style={styles.illustrationContainer}>
          <DataSecurityIllustration />
        </View>

        <ThemedText style={styles.title}>
          Solicitar alta de nuevo libro
        </ThemedText>
        <View style={styles.inputContainer}>
          <Input
            onPressOut={(e) => e.stopPropagation()}
            placeholder="Nombre del libro"
            keyboardType="default"
            value={bookName}
            onChangeText={(value) => setBookName(value)}
          />

          <View style={{ width: "75%" }}>
            <Input
              onPressOut={(e) => e.stopPropagation()}
              placeholder="Nombre del autor"
              keyboardType="default"
              value={authorName}
              onChangeText={(value) => setAuthorName(value)}
            />
          </View>

          <Dropdown
            value={selectedGrade}
            onChange={(item: string) => setSelectedGrade(item)}
            options={courses || []}
          />

          <Input
            style={{ height: 100, color: theme.gray.gray400 }}
            onPressOut={(e) => e.stopPropagation()}
            placeholder="Comentarios"
            keyboardType="default"
            returnKeyType="done"
            multiline={true}
            value={comments}
            onChangeText={(value) => setComments(value)}
          />

          <View style={{ gap: 16 }}>
            <RadioButton
              value="all"
              status={checked === "all" ? "checked" : "unchecked"}
              onPress={() => setChecked("all")}
              label="Todas las animaciones"
            />
            <RadioButton
              value="main-characters"
              status={checked === "main-characters" ? "checked" : "unchecked"}
              onPress={() => setChecked("main-characters")}
              label="Solo caracteres principales"
            />

            <RadioButton
              value="curious-data"
              status={checked === "curious-data" ? "checked" : "unchecked"}
              onPress={() => setChecked("curious-data")}
              label="Solo datos curiosos"
            />
          </View>
        </View>

        <View style={styles.buttonsContainer}>
          <Button
            onPress={() => onSendRequest()}
            variant={ButtonVariants.solid}
          >
            Solicitar libro
          </Button>
        </View>
      </ScrollView>
    </VerticalLinearGradient>
  );
}

const styles = StyleSheet.create({
  illustrationContainer: {
    marginTop: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    width: "auto",
    marginVertical: 48,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
  inputContainer: {
    gap: 16,
    paddingHorizontal: 48,
  },
  buttonsContainer: {
    gap: 16,
    paddingHorizontal: 48,
    marginTop: 32,
  },
  noReceived: {
    color: theme.base.white,
    textAlign: "center",
    marginVertical: 24,
  },
  coloredNoReceivedText: {
    color: theme.primary.brand400,
    textAlign: "center",
    fontWeight: "bold",
  },
});
