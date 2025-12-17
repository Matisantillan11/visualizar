import { useAuthContext } from "@/app/(auth)/hooks/useAuthContext";
import { Role } from "@/app/(auth)/interfaces";
import {
  Button,
  ButtonVariants,
  NotFoundIllustration,
  ThemedText,
  ThemedTextVariants,
} from "@/components/UI";
import { theme } from "@/constants";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

export const EmptyState = ({ isBookPage = true }: { isBookPage?: boolean }) => {
  const router = useRouter();
  const { user } = useAuthContext();

  const isTeacher = user?.role === Role.TEACHER;

  return (
    <View style={styles.container}>
      <View style={styles.illustrationContainer}>
        <NotFoundIllustration />
      </View>

      <ThemedText style={styles.title}>Oooopssss!</ThemedText>
      <ThemedText style={styles.subtitle} variant={ThemedTextVariants.default}>
        Lo sentimos! No hemos encontrado {isBookPage ? "libros" : "solicitudes"}{" "}
        para el curso solicitado.
      </ThemedText>

      {isTeacher && (
        <View style={styles.buttonsContainer}>
          <Button
            onPress={() => router.navigate("/book/request-book")}
            variant={ButtonVariants.solid}
          >
            Solicitar libro
          </Button>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 0 },
  illustrationContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    width: "auto",
    marginVertical: 6,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    color: theme.primary.brand100,
    textAlign: "center",
  },
  buttonsContainer: {
    marginTop: 24,
    gap: 16,
    paddingHorizontal: 48,
  },
});
