import "react-native-reanimated";

import * as SplashScreen from "expo-splash-screen";

import { AppNavbar } from "@/components/navbar/app-navbar.component";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { useEffect } from "react";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function AppLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
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
    <Stack
      screenOptions={{
        header: (props) => <AppNavbar {...props} />,
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
