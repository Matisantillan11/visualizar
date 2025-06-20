import { AppNavbar } from "@/components/navbar/app-navbar.component";
import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        header: (props) => <AppNavbar {...props} />,
      }}
    >
      <Stack.Screen
        name="index"
        initialParams={{
          canGoBack: () => false,
        }}
      />
      <Stack.Screen
        name="book/[id]"
        initialParams={{
          canGoBack: () => true,
        }}
      />
      <Stack.Screen
        name="book/camera"
        initialParams={{
          canGoBack: () => true,
          gestureEnabled: true,
        }}
      />
    </Stack>
  );
}
