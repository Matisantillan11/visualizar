import {
  Button,
  ButtonVariants,
  Container,
  DataSecurityIllustration,
  Input,
  Loader,
  ThemedText,
  ThemedTextVariants,
} from "@/components/UI";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { theme } from "@/constants";
import React from "react";
import { useAuthContext } from "./hooks/useAuthContext";

export default function ValidateCode() {
  const {
    isLoading,
    userCodeAttempt,
    setUserCodeAttempt,
    onSendEmailCode,
    onValidateCode,
  } = useAuthContext();

  return (
    <Container gradient>
      <View style={styles.illustrationContainer}>
        <DataSecurityIllustration />
      </View>

      <ThemedText style={styles.title}>Ingresá tu código</ThemedText>
      <View style={styles.inputContainer}>
        <Input
          onPressOut={(e) => e.stopPropagation()}
          maxLength={6}
          placeholder="Código"
          keyboardType="number-pad"
          returnKeyType="done"
          value={userCodeAttempt}
          onChangeText={(value) => setUserCodeAttempt(value)}
        />
      </View>
      <ThemedText
        variant={ThemedTextVariants.default}
        style={styles.noReceived}
      >
        No recibiste tu código? Asegurate de chequear tu spam o
        <TouchableOpacity onPress={onSendEmailCode}>
          <ThemedText
            variant={ThemedTextVariants.default}
            style={styles.coloredNoReceivedText}
          >
            {" "}
            solicita nuevas instrucciones.
          </ThemedText>
        </TouchableOpacity>
      </ThemedText>

      <View style={styles.buttonsContainer}>
        <Button onPress={onValidateCode} variant={ButtonVariants.solid}>
          {isLoading ? <Loader /> : "Validar código"}
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
