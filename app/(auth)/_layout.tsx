import { AuthNavbar } from "@/components/navbar/auth-navbar.component";
import { Loader } from "@/components/UI";
import { Redirect, Stack } from "expo-router";
import { useAuthContext } from "./hooks/useAuthContext";

export default function AuthLayout() {
  const { isSignedIn, isAuthChecked, isChecking } = useAuthContext();

  if (isChecking) return <Loader />;

  if (isAuthChecked && isSignedIn) {
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
    </Stack>
  );
}
