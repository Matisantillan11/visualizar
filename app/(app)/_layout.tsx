import "react-native-reanimated";

import { AppNavbar } from "@/components/navbar/app-navbar.component";
import { Stack } from "expo-router";

export default function AppLayout() {
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
