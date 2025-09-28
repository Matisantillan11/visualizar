import { theme } from "@/constants";
import {
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { ReactNode, RefObject, useCallback } from "react";

import { StyleSheet } from "react-native";

export default function BottomSheet({
  children,
  bottomSheetRef,
  snapPoints = ["50%"],
  index = 1,
  ...props
}: BottomSheetModalProps & {
  children?: ReactNode;
  bottomSheetRef: RefObject<BottomSheetModal | null>;
}) {
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  return (
    <BottomSheetModal
      {...props}
      ref={bottomSheetRef}
      onChange={handleSheetChanges}
      snapPoints={snapPoints}
      index={index}
      containerStyle={{
        backgroundColor: "#00000075",
        zIndex: 9999999,
      }}
      backgroundStyle={{
        backgroundColor: theme.primary.brand950,
      }}
    >
      <BottomSheetView style={styles.contentContainer}>
        {children}
      </BottomSheetView>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    maxHeight: "50%",
    alignItems: "center",
  },
});
