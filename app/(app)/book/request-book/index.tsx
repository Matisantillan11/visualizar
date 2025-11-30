import {
  Button,
  ButtonVariants,
  DataSecurityIllustration,
  Dropdown,
  Input,
  Loader,
  RadioButton,
  ThemedText,
  Toast,
} from "@/components/UI";
import { Platform, StyleSheet, View } from "react-native";

import { useAuthContext } from "@/app/(auth)/hooks/useAuthContext";
import { VerticalLinearGradient } from "@/components/linear-gradient/linear-gradient.component";
import useToast from "@/components/UI/toast/use-toast";
import { theme } from "@/constants";
import { useCreateBookRequest } from "@/lib/react-query/books";
import { useCoursesByTeacherId } from "@/lib/react-query/courses";
import { usePreventRemove } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { getAnimationsSelected } from "./helpers";
import CancelRequestModal from "./modals/cancel-request";

export default function RequestBook() {
  const { user } = useAuthContext();
  const router = useRouter();
  const { showToast } = useToast();

  const [selectedGrade, setSelectedGrade] = useState<string>("");

  const [bookName, setBookName] = useState<string>("");
  const [authorName, setAuthorName] = useState<string>("");
  const [comments, setComments] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);
  const [checked, setChecked] = React.useState("all");

  const isIos = Platform.OS === "ios";

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  usePreventRemove(hasUnsavedChanges, () => {
    setIsVisible(true);
  });

  const { data: coursesData, isLoading: isLoadingCourses } =
    useCoursesByTeacherId(user?.teacherId);

  const courses = useMemo(
    () =>
      coursesData?.map((course) => ({
        label: course.name,
        value: course.id,
      })),
    [coursesData]
  );

  const { mutate: createBookRequest, isPending: isCreatingBookRequest } =
    useCreateBookRequest({
      onSuccess: () => {
        onResetForm();
        setHasUnsavedChanges(false);
        showToast("Libro solicitado correctamente", "customSuccess");
        setTimeout(() => {
          router.navigate(`/(app)`);
        }, 3000);
      },
      onError: (error) => {
        showToast("Error al solicitar el libro", "customError");
        console.error(error);
      },
    });

  const onResetForm = () => {
    setBookName("");
    setAuthorName("");
    setSelectedGrade("");
    setComments("");
    setChecked("all");
  };

  const onSendRequest = () => {
    if (!user) {
      showToast("Usuario no encontrado", "customError");
      return;
    }

    if (!bookName || !authorName) {
      showToast(
        "El nombre del libro y el nombre del autor son requeridos",
        "customError"
      );
      return;
    }

    createBookRequest({
      courseIds: [selectedGrade],
      title: bookName,
      authorName,
      comments,
      animations: getAnimationsSelected(checked),
    });
  };

  const onClose = () => {
    setIsVisible(false);
  };

  const onConfirm = () => {
    onResetForm();
    setHasUnsavedChanges(false);
    setIsVisible(false);

    // Navigate back
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(app)");
    }
  };

  const onCancelRequest = () => {
    if (hasUnsavedChanges) {
      setIsVisible(true);
    } else {
      onConfirm();
    }
  };

  return (
    <VerticalLinearGradient>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingVertical: 32 }}>
        <View style={styles.illustrationContainer}>
          <DataSecurityIllustration />
        </View>

        <ThemedText style={[styles.title, { fontSize: isIos ? 24 : 20 }]}>
          Solicitar alta de nuevo libro
        </ThemedText>
        <View style={styles.inputContainer}>
          <Input
            onPressOut={(e) => e.stopPropagation()}
            placeholder="Nombre del libro"
            keyboardType="default"
            value={bookName}
            onChangeText={(value) => {
              setBookName(value);
              setHasUnsavedChanges(true);
            }}
          />

          <View style={{ width: "75%" }}>
            <Input
              onPressOut={(e) => e.stopPropagation()}
              placeholder="Nombre del autor"
              keyboardType="default"
              value={authorName}
              onChangeText={(value) => {
                setAuthorName(value);
                setHasUnsavedChanges(true);
              }}
            />
          </View>

          <Dropdown
            value={selectedGrade}
            onChange={(item: string) => {
              setSelectedGrade(item);
              setHasUnsavedChanges(true);
            }}
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
            onChangeText={(value) => {
              setComments(value);
              setHasUnsavedChanges(true);
            }}
          />

          <View style={{ gap: 16 }}>
            <RadioButton
              value="all"
              status={checked === "all" ? "checked" : "unchecked"}
              onPress={() => {
                setChecked("all");
                setHasUnsavedChanges(true);
              }}
              label="Todas las animaciones"
            />
            <RadioButton
              value="main-characters"
              status={checked === "main-characters" ? "checked" : "unchecked"}
              onPress={() => {
                setChecked("main-characters");
                setHasUnsavedChanges(true);
              }}
              label="Solo caracteres principales"
            />

            <RadioButton
              value="curious-data"
              status={checked === "curious-data" ? "checked" : "unchecked"}
              onPress={() => {
                setChecked("curious-data");
                setHasUnsavedChanges(true);
              }}
              label="Solo datos curiosos"
            />
          </View>
        </View>

        <View style={styles.buttonsContainer}>
          <Button
            onPress={() => onSendRequest()}
            variant={ButtonVariants.solid}
            style={{ flex: 1 }}
            disabled={isCreatingBookRequest || isLoadingCourses}
          >
            {isCreatingBookRequest ? (
              <Loader size="small" />
            ) : (
              "Solicitar libro"
            )}
          </Button>

          <Button
            onPress={onCancelRequest}
            variant={ButtonVariants.outlined}
            style={{ borderColor: theme.error.error500, flex: 1 }}
            labelStyle={{ color: theme.error.error500 }}
            disabled={isCreatingBookRequest || isLoadingCourses}
          >
            Cancelar
          </Button>
        </View>
      </ScrollView>
      <CancelRequestModal
        isVisible={isVisible}
        onClose={onClose}
        onConfirm={onConfirm}
      />
      <Toast />
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
    flexDirection: "row",
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
