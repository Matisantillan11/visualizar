import "react-native-reanimated";

import * as SplashScreen from "expo-splash-screen";

import { ThemeProvider } from "@react-navigation/native";

import { AuthNavbar } from "@/components/navbar/auth-navbar.component";
import { theme } from "@/constants";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider
      value={{
        dark: false,
        colors: {
          primary: "rgb(0, 122, 255)",
          background: theme.primary.brand950,
          card: "rgb(255, 255, 255)",
          text: "rgb(28, 28, 30)",
          border: "rgb(216, 216, 216)",
          notification: "rgb(255, 59, 48)",
        },
        fonts: {
          regular: "SpaceMono-Regular" as unknown as any,
          medium: "SpaceMono-Medium" as unknown as any,
          bold: "SpaceMono-Bold" as unknown as any,
          heavy: "SpaceMono-Bold" as unknown as any,
        },
      }}
    >
      <Stack
        screenOptions={{
          header: (props) => <AuthNavbar {...props} />,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="forgot-password" />
        <Stack.Screen name="validate-code" />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
