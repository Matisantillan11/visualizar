import "react-native-reanimated";

import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";

import { ThemeProvider } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";

import { Loader } from "@/components/UI";
import { theme } from "@/constants";
import { useFonts } from "expo-font";
import { Slot, useRouter } from 'expo-router';
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { View } from 'react-native';
import { AuthContextProvider } from "./(auth)/context/useAuth.context";
import { useAuthContext } from './(auth)/hooks/useAuthContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
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
          primary: 'rgb(0, 122, 255)',
          background: theme.primary.brand950,
          card: 'rgb(255, 255, 255)',
          text: 'rgb(28, 28, 30)',
          border: 'rgb(216, 216, 216)',
          notification: 'rgb(255, 59, 48)',
        },
        fonts: {
          regular: 'SpaceMono-Regular' as unknown as any,
          medium: 'SpaceMono-Medium' as unknown as any,
          bold: 'SpaceMono-Bold' as unknown as any,
          heavy: 'SpaceMono-Bold' as unknown as any,
        },
      }}>
      <ClerkProvider tokenCache={tokenCache}>
        <AuthContextProvider>
          <RouterRedirector />
          <StatusBar style="light" />
        </AuthContextProvider>
      </ClerkProvider>
    </ThemeProvider>
  );
}

{
  /* <Stack
  screenOptions={{
    header: (props) => <AuthNavbar {...props} />,
  }}
>
  <Stack.Screen name="index" />
  <Stack.Screen name="(auth)" />
</Stack> */
}

function RouterRedirector() {
  const { isSignedIn, isAuthChecked, isUserSignedin, isChecking } = useAuthContext();
  const router = useRouter();

  console.log({ isAuthChecked, isChecking, isUserSignedin });
  useEffect(() => {
    if (isChecking) return;
    if (!isUserSignedin) {
      router.replace('/(auth)');
    } else {
      router.replace('/(app)');
    }
  }, [isUserSignedin, isChecking]);

  if (isChecking) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Loader />
      </View>
    );
  }

  // This renders the correct layout after redirect
  return <Slot />;
}
