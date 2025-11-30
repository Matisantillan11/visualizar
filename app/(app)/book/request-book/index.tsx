import {
  Button,
  ButtonVariants,
  DataSecurityIllustration,
  Loader,
  ThemedText,
  Toast,
} from "@/components/UI";
import { Platform, StyleSheet, View } from "react-native";

import { useAuthContext } from "@/app/(auth)/hooks/useAuthContext";
import { VerticalLinearGradient } from "@/components/linear-gradient/linear-gradient.component";
import {
  Form,
  FormInput,
  FormRadioButton,
  FormSelector,
} from "@/components/UI/form";
import useToast from "@/components/UI/toast/use-toast";
import { theme } from "@/constants";
import {
  formSchema,
  FormValues,
  useCreateBookRequest,
} from "@/lib/react-query/books";
import { useCoursesByTeacherId } from "@/lib/react-query/courses";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePreventRemove } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { ScrollView } from "react-native-gesture-handler";
import {
  bookRequestFormKeys,
  getAnimationsSelected,
  getFormValues,
} from "./helpers";
import CancelRequestModal from "./modals/cancel-request";

export default function RequestBook() {
  const router = useRouter();

  const { user } = useAuthContext();
  const { showToast } = useToast();

  const formMethods = useForm({
    defaultValues: getFormValues(),
    resolver: zodResolver(formSchema),
  });

  const [isVisible, setIsVisible] = useState(false);

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
    formMethods.reset({
      bookName: "",
      authorName: "",
      courseIds: [],
      comments: "",
      animations: ["all"],
    });
  };

  const onSendRequest = (data: FormValues) => {
    if (!user) {
      showToast("Usuario no encontrado", "customError");
      return;
    }

    if (
      !formMethods.getValues("bookName") ||
      !formMethods.getValues("authorName")
    ) {
      showToast(
        "El nombre del libro y el nombre del autor son requeridos",
        "customError"
      );
      return;
    }

    createBookRequest({
      courseIds: data.courseIds,
      title: data.bookName,
      authorName: data.authorName,
      comments: data.comments,
      animations: getAnimationsSelected(data.animations),
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
        <Form methods={formMethods}>
          <View style={styles.inputContainer}>
            <FormInput
              form={formMethods}
              name={bookRequestFormKeys.bookName}
              onPressOut={(e) => e.stopPropagation()}
              placeholder="Nombre del libro"
              keyboardType="default"
            />

            <View style={{ width: "75%" }}>
              <FormInput
                form={formMethods}
                onPressOut={(e) => e.stopPropagation()}
                placeholder="Nombre del autor"
                keyboardType="default"
                name={bookRequestFormKeys.authorName}
              />
            </View>

            <FormSelector
              form={formMethods}
              name={bookRequestFormKeys.courseIds}
              options={courses || []}
              multiple
            />

            <FormInput
              form={formMethods}
              onPressOut={(e) => e.stopPropagation()}
              placeholder="Comentarios"
              keyboardType="default"
              returnKeyType="done"
              multiline={true}
              name={bookRequestFormKeys.comments}
              style={{ height: 100, color: theme.gray.gray400 }}
            />

            <View style={{ gap: 16 }}>
              <FormRadioButton
                form={formMethods}
                name={bookRequestFormKeys.animations}
                options={[
                  { label: "Todas las animaciones", value: "all" },
                  {
                    label: "Solo caracteres principales",
                    value: "main-characters",
                  },
                  { label: "Solo datos curiosos", value: "curious-data" },
                ]}
              />
            </View>
          </View>

          <View style={styles.buttonsContainer}>
            <Button
              onPress={formMethods.handleSubmit(onSendRequest)}
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
        </Form>
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
    gap: 4,
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
