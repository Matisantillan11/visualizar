import { AuthNavbar } from '@/components/navbar/auth-navbar.component';
import { Redirect, Stack } from 'expo-router';
import { useAuthContext } from './hooks/useAuthContext';

export default function AuthLayout() {
  const { user } = useAuthContext();

  if (user && user.email) {
    return <Redirect href={'/(app)'} />;
  }

  return (
    <Stack
      screenOptions={{
        header: (props) => <AuthNavbar {...props} />,
      }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="check-your-email" />
      <Stack.Screen name="validate-code" />
    </Stack>
  );
}
