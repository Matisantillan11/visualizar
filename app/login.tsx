import {
  Button,
  ButtonVariants,
  Container,
  Input,
  LoginIllustration,
  ThemedText,
  ThemedTextVariants,
} from "@/components/UI";
import { Link, useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

import { theme } from "@/constants";
import { useStorage } from "@/hooks";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useEffect } from "react";

export default function Login() {
  const router = useRouter();
  const { getItem } = useStorage();

  useEffect(() => {
    const validateOnboarding = async () => {
      const onboarding = await getItem("onboarding");
      if (!onboarding) {
      }
    };

    validateOnboarding();
  }, []);

  return (
    <Container>
      <View style={styles.illustrationContainer}>
        <LoginIllustration />
      </View>

      <ThemedText style={styles.title}>Hola!{"\n"}Inicia sesión</ThemedText>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Correo electrónico"
          rightIcon={
            <Ionicons
              name="at"
              size={16}
              color={theme.gray.gray400}
              style={styles.iconRight}
            />
          }
        />
        <Input
          placeholder="Password"
          rightIcon={
            <Ionicons
              name="at"
              size={16}
              color={theme.gray.gray400}
              style={styles.iconRight}
            />
          }
          leftIcon={
            <Ionicons
              name="eye-off"
              size={16}
              color={theme.gray.gray400}
              style={styles.iconLeft}
            />
          }
        />
        <View style={styles.forgotContainer}>
          <Link href="/forgot-password">
            <ThemedText
              variant={ThemedTextVariants.default}
              style={styles.forgotLink}
            >
              Olvidaste tu contraseña?
            </ThemedText>
          </Link>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          onPress={() => router.push("/validate-code")}
          variant={ButtonVariants.solid}
        >
          Ingresar
        </Button>
        <View style={styles.orContainer}>
          <View style={styles.line} />
          <ThemedText
            variant={ThemedTextVariants.default}
            style={styles.orText}
          >
            O
          </ThemedText>
          <View style={styles.line} />
        </View>

        <Button
          variant={ButtonVariants.outlined}
          style={{ flexDirection: "row" }}
          leftIcon={
            <View style={{ paddingHorizontal: 8 }}>
              <AntDesign
                name="google"
                size={20}
                color={theme.primary.brand800}
              />
            </View>
          }
        >
          Ingresa con google
        </Button>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  illustrationContainer: { justifyContent: "center", alignItems: "center" },
  title: {
    marginVertical: 16,
  },
  inputContainer: {
    gap: 16,
  },
  iconRight: {
    marginRight: 8,
  },
  iconLeft: {
    marginLeft: 8,
  },
  forgotContainer: {
    justifyContent: "flex-end",
  },
  forgotLink: {
    textAlign: "right",
    color: theme.primary.brand950,
    fontWeight: "bold",
  },
  buttonsContainer: {
    marginTop: 64,
    gap: 16,
    paddingHorizontal: 48,
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  line: { flex: 1, height: 1, backgroundColor: theme.gray.gray400 },
  orText: { color: theme.base.black, textAlign: "center", marginHorizontal: 8 },
  grayButton: {
    backgroundColor: theme.gray.gray300,
  },
});
