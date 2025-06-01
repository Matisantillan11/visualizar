import {
  Button,
  ButtonVariants,
  Container,
  NotFoundIllustration,
  ThemedText,
  ThemedTextVariants,
} from "@/components/UI";
import { theme } from "@/constants";
import { useRouter } from "expo-router";
import React from "react";

import { StyleSheet, View } from "react-native";

export default function NotFoundScreen() {
  const router = useRouter();
  return (
    <>
      <Container gradient>
        <View style={styles.illustrationContainer}>
          <NotFoundIllustration />
        </View>

        <ThemedText style={styles.title}>Oooopssss!</ThemedText>
        <ThemedText
          style={styles.subtitle}
          variant={ThemedTextVariants.default}
        >
          Te enviamos instrucciones a tu correo para recuperar tu contraseña
        </ThemedText>

        <View style={styles.buttonsContainer}>
          <Button
            onPress={() => router.push("/(app)")}
            variant={ButtonVariants.solid}
          >
            Volver
          </Button>
        </View>
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  illustrationContainer: {
    marginTop: 48,
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
