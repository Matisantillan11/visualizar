import { AppNavbar } from "@/components/navbar/app-navbar.component";
import Menu from '@/components/navbar/menu/menu.component';
import { Stack } from "expo-router";
import { useCallback, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function AppLayout() {
  const [isVisible, setIsVisible] = useState(false);
  const handlePresentModalPress = useCallback(() => {
    setIsVisible(true);
  }, []);

  const onClose = () => {
    setIsVisible(false);
  };

  return (
    <GestureHandlerRootView>
      <Stack
        screenOptions={{
          header: (props) => (
            <AppNavbar
              {...props}
              handlePresentModalPress={handlePresentModalPress}
            />
          ),
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

        <Stack.Screen
          name="book/request-book"
          initialParams={{
            canGoBack: () => true,
          }}
        />

        <Stack.Screen
          name="faqs"
          initialParams={{
            canGoBack: () => true,
          }}
        />

        <Stack.Screen
          name="book/[id]/animate"
          initialParams={{
            canGoBack: () => true,
            models: [],
          }}
        />
      </Stack>

      <Menu isVisible={isVisible} onClose={onClose} />
    </GestureHandlerRootView>
  );
}
