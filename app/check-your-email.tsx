import {
  Button,
  ButtonVariants,
  Container,
  ThemedText,
  ThemedTextVariants,
} from "@/components/UI";
import { EmailIllustration } from "@/components/UI/illustrations/email.illustation";
import { theme } from "@/constants";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { getEmailClients, openInbox } from "react-native-email-link";

export default function CheckYourEmail() {
  const router = useRouter();

  const onOpenEmailApp = async () => {
    const clients = await getEmailClients();
    openInbox({
      app: clients[0].id,
    });
  };

  return (
    <Container gradient>
      <View style={styles.illustrationContainer}>
        <EmailIllustration />
      </View>

      <ThemedText style={styles.title}>Chequeá tu email</ThemedText>
      <ThemedText style={styles.subtitle} variant={ThemedTextVariants.default}>
        Te enviamos instrucciones a tu correo para recuperar tu contraseña
      </ThemedText>

      <View style={styles.buttonsContainer}>
        <Button
          onPress={() => router.push("/validate-code")}
          variant={ButtonVariants.solid}
        >
          Continuar
        </Button>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  illustrationContainer: {
    marginTop: 144,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    width: "auto",
    textAlign: "center",
    marginVertical: 24,
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    color: theme.base.white,
    textAlign: "center",
  },

  buttonsContainer: {
    marginTop: 24,
    gap: 16,
    paddingHorizontal: 48,
  },
});
