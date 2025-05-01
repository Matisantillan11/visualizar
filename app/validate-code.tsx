import {
  Button,
  ButtonVariants,
  Container,
  DataSecurityIllustration,
  ThemedText,
  ThemedTextVariants,
} from "@/components/UI";
import { Link, useRouter } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { getEmailClients, openInbox } from "react-native-email-link";

import { theme } from "@/constants";
import React from "react";
import { CodeInput } from "./components/validate-code-input";

export default function ValidateCode() {
  const router = useRouter();

  const onOpenEmailApp = async () => {
    const clients = await getEmailClients();
    openInbox({
      app: clients[0].id,
    });
  };

  return (
    <Container>
      <View style={styles.illustrationContainer}>
        <DataSecurityIllustration />
      </View>

      <ThemedText style={styles.title}>
        Ingresá tu código de verificación
      </ThemedText>
      <ThemedText variant={ThemedTextVariants.default} style={styles.subtitle}>
        Enviamos un código de verificación a
        <Pressable onPress={onOpenEmailApp}>
          <ThemedText
            variant={ThemedTextVariants.default}
            style={styles.coloredNoReceivedText}
          >
            matias1.santillan@gmail.com
          </ThemedText>
        </Pressable>
      </ThemedText>
      <View style={styles.inputContainer}>
        <CodeInput />
        <CodeInput />
        <CodeInput />
        <CodeInput />
        <CodeInput />
        <CodeInput />
      </View>
      <ThemedText
        variant={ThemedTextVariants.default}
        style={styles.noReceived}
      >
        No recibiste tu código?
        <Link href="/validate-code">
          <ThemedText
            variant={ThemedTextVariants.default}
            style={styles.coloredNoReceivedText}
          >
            {" "}
            Enviar nuevamente.
          </ThemedText>
        </Link>
      </ThemedText>

      <View style={styles.buttonsContainer}>
        <Button
          onPress={() => router.push("/(app)")}
          variant={ButtonVariants.solid}
        >
          Validar código
        </Button>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  illustrationContainer: { justifyContent: "center", alignItems: "center" },
  title: {
    width: "auto",
    marginVertical: 16,
    textAlign: "center",
  },
  subtitle: {
    width: "auto",
    textAlign: "center",
    marginBottom: 32,
  },
  inputContainer: {
    gap: 16,
    flexDirection: "row",
  },

  buttonsContainer: {
    marginTop: 32,
    gap: 16,
    paddingHorizontal: 48,
  },

  noReceived: {
    color: theme.base.black,
    textAlign: "center",
    marginTop: 32,
  },
  coloredNoReceivedText: {
    color: theme.primary.brand700,
    textAlign: "center",
    fontWeight: "bold",
  },
});
