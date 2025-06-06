import "react-native-reanimated";

import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";

import { ThemeProvider } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";

import { AuthNavbar } from "@/components/navbar/auth-navbar.component";
import { Loader } from "@/components/UI";
import { theme } from "@/constants";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { AuthContextProvider } from "./(auth)/context/useAuth.context";

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

  if (!loaded) return <Loader />;

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
      <ClerkProvider tokenCache={tokenCache}>
        <AuthContextProvider>
          <Stack
            screenOptions={{
              header: (props) => <AuthNavbar {...props} />,
            }}
          >
            <Stack.Screen name="index" />
            <Stack.Screen name="(auth)" />
          </Stack>
          <StatusBar style="light" />
        </AuthContextProvider>
      </ClerkProvider>
    </ThemeProvider>
  );
}
