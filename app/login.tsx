import {
  Button,
  ButtonVariants,
  Container,
  Input,
  ThemedText,
  ThemedTextVariants,
} from "@/components/UI";
import { useRouter } from "expo-router";
import { StyleSheet, useWindowDimensions, View } from "react-native";

import { BlurView } from "@/components/UI/blur-view/blur-view.component";
import Ed from "@/components/UI/illustrations/ed-login.illustration";
import Justin from "@/components/UI/illustrations/justin.illustration";
import Kim from "@/components/UI/illustrations/kim.illustration";
import { theme } from "@/constants";
import { useStorage } from "@/hooks";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";

export default function Login() {
  const router = useRouter();
  const { getItem } = useStorage();
  const { width, height } = useWindowDimensions();

  /* useEffect(() => {
    const validateOnboarding = async () => {
      const onboarding = await getItem("onboarding");
      if (!onboarding) {
      }
    };

    validateOnboarding();
  }, []); */

  return (
    <Container>
      <View
        style={[styles.illustrationsContainer, { width, height: height / 3 }]}
      >
        <Ed />
        <Kim />
        <Justin />
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
      </View>
      <View style={styles.buttonsContainer}>
        <BlurView
          color={theme.primary.brand300}
          intensity={40}
          size={425}
          left={-width / 8}
          top={-30}
        />
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
  illustrationsContainer: {
    flex: 1,
    position: "relative",
    marginBottom: 250,
    backgroundColor: theme.error.error800,
  },
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
  orText: {
    color: theme.gray.gray300,
    textAlign: "center",
    marginHorizontal: 8,
  },
  grayButton: {
    backgroundColor: theme.gray.gray300,
  },
});
