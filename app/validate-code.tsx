import {
  Button,
  ButtonVariants,
  Container,
  DataSecurityIllustration,
  ThemedText,
  ThemedTextVariants,
} from "@/components/UI";
import { Link, useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

import { theme } from "@/constants";
import React from "react";
import { CodeInput } from "./components/validate-code-input";

export default function ValidateCode() {
  const router = useRouter();

  return (
    <Container gradient>
      <View style={styles.illustrationContainer}>
        <DataSecurityIllustration />
      </View>

      <ThemedText style={styles.title}>Ingresá tu código</ThemedText>
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
        No recibiste tu código? Asegurate de chequear tu spam o
        <Link href="/validate-code">
          <ThemedText
            variant={ThemedTextVariants.default}
            style={styles.coloredNoReceivedText}
          >
            {" "}
            solicita nuevas instrucciones.
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
  illustrationContainer: {
    marginTop: 96,
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
    flexDirection: "row",
  },
  buttonsContainer: {
    gap: 16,
    paddingHorizontal: 48,
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
