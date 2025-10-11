import { AuthNavbar } from "@/components/navbar/auth-navbar.component";
import { Loader } from "@/components/UI";
import { Redirect, Stack } from "expo-router";
import { useAuthContext } from "./hooks/useAuthContext";

export default function AuthLayout() {
  const { isLoading, user } = useAuthContext();

  if (isLoading) return <Loader />;

  if (user && user.email) {
    return <Redirect href={'/(app)'} />;
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
