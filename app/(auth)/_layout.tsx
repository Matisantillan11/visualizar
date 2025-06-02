import { AuthNavbar } from "@/components/navbar/auth-navbar.component";
import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href={"/(app)"} />;
  }

  return (
    <Stack
      screenOptions={{
        header: (props) => <AuthNavbar {...props} />,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="check-your-email" />
      <Stack.Screen name="validate-code" />
      <Stack.Screen name="/(app)" />
    </Stack>
  );
}
