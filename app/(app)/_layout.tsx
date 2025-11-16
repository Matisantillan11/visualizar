import { AppNavbar } from "@/components/navbar/app-navbar.component";
import Menu from '@/components/navbar/menu/menu.component';
import { Stack } from "expo-router";
import { useCallback, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ModelPreloadProvider } from "./book/[id]/context/model-preload.context";

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
      <ModelPreloadProvider>
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
            name="requests"
            initialParams={{
              canGoBack: () => true,
            }}
          />

          <Stack.Screen
            name="book/[id]"
            initialParams={{
              canGoBack: () => true,
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
            }}
          />
        </Stack>

        <Menu isVisible={isVisible} onClose={onClose} />
      </ModelPreloadProvider>
    </GestureHandlerRootView>
  );
}
