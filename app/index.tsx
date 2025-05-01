import { Loader, OnboardingIllustration } from "@/components/UI";
import { Text, View, useWindowDimensions } from "react-native";

import { theme } from "@/constants";
import { useOnboarding } from "@/hooks/use-onboarding.hook";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Link } from "expo-router";
import React from "react";

export default function Onboarding() {
  const { height } = useWindowDimensions();
  const { hasToShowOnboarding, isChecking } = useOnboarding();

  if (isChecking || !hasToShowOnboarding) {
    return <Loader />;
  }

  return (
    <View
      style={{
        height,
        paddingTop: 64,
        paddingHorizontal: 24,
        alignItems: "center",
        backgroundColor: theme.primary.brand700,
      }}
    >
      <OnboardingIllustration />
      <View style={{ flex: 1, marginTop: 50 }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 96,
            color: theme.base.white,
          }}
        >
          Descubre el MUNDO de los libros con REALIDAD AUMENTADA
        </Text>
        <Text
          style={{
            fontSize: 14,
            textAlign: "center",
            color: theme.gray.gray350,
            marginTop: 24,
          }}
        >
          Leer ya no tiene que ser aburrido. Con la REALIDAD AUMENTADA, puedes
          APRENDER y DIVERTIRTE AL MISMO TIEMPO. ¡Únete y vive la experiencia!
        </Text>

        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Link
            href="/login"
            style={{
              width: 45,
              height: 45,
              borderColor: theme.primary.brand800,
              borderWidth: 3,
              borderRadius: 100,
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 100,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: theme.primary.brand800,
              }}
            >
              <AntDesign name="right" size={16} color="white" />
            </View>
          </Link>
        </View>
      </View>
    </View>
  );
}
