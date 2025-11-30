import BottomSheet from "@/components/bottom-sheet/bottom-sheet.component";
import {
  Button,
  ButtonVariants,
  ThemedText,
  ThemedTextVariants,
} from "@/components/UI";
import { Platform, View } from "react-native";

export default function CancelRequestModal({
  isVisible,
  onClose,
  onConfirm,
}: {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  const isIos = Platform.OS === "ios";

  const cancelRequest = () => {
    onClose();
  };

  return (
    <BottomSheet isVisible={isVisible} onClose={onClose}>
      {({ styles }: any) => {
        return (
          <View
            style={{
              ...styles,
              minHeight: 200,
              paddingVertical: isIos ? 20 : 40,
              paddingHorizontal: 20,
              alignItems: "center",
            }}
          >
            <ThemedText style={{ fontSize: isIos ? 24 : 20 }}>
              Estás por cancelar la solicitud
            </ThemedText>
            <ThemedText
              variant={ThemedTextVariants.default}
              style={{ textAlign: "center", marginTop: 10 }}
            >
              ¿Estás seguro de cancelar la solicitud? Si lo haces, perderás tu
              progreso.
            </ThemedText>
            <View style={{ flexDirection: "row", gap: 16, marginTop: 30 }}>
              <Button onPress={onConfirm} style={{ flex: 1 }}>
                Si
              </Button>
              <Button
                onPress={cancelRequest}
                variant={ButtonVariants.outlined}
                style={{ flex: 1 }}
              >
                No
              </Button>
            </View>
          </View>
        );
      }}
    </BottomSheet>
  );
}
