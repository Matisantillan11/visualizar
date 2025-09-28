import { AppNavbar } from "@/components/navbar/app-navbar.component";
import Menu from "@/components/navbar/menu/menu.component";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import { useCallback, useRef } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function AppLayout() {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
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
        </Stack>

        <Menu bottomSheetModalRef={bottomSheetModalRef} />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
