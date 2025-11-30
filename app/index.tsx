import { Loader, OnboardingIllustration } from "@/components/UI";
import {
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";

import { BlurView } from "@/components/UI/blur-view/blur-view.component";
import { theme } from "@/constants";
import AntDesign from "@expo/vector-icons/AntDesign";
import React from "react";
import { useAuthContext } from "./(auth)/hooks/useAuthContext";

export default function Onboarding() {
  const { height } = useWindowDimensions();
  const { isLoading, disableOnboardingPage, isChecking } = useAuthContext();

  if (isChecking || isLoading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Loader />
      </View>
    );
  return (
    <View
      style={{
        height,
        paddingTop: 125,
        paddingHorizontal: 24,
        alignItems: "center",
        backgroundColor: theme.primary.brand950,
      }}
    >
      <OnboardingIllustration />
      <BlurView
        color={theme.primary.brand300}
        intensity={90}
        size={520}
        top={60}
        left={-50}
      />
      <View style={{ flex: 1 }}>
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
            color: theme.primary.brand100,
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
          <TouchableOpacity
            onPress={disableOnboardingPage}
            style={{
              width: 45,
              height: 45,
              borderColor: theme.primary.brand800,
              borderWidth: 3,
              borderRadius: 100,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                width: 45,
                height: 45,
                borderRadius: 100,
                alignItems: "center",
                justifyContent: "center",
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
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
