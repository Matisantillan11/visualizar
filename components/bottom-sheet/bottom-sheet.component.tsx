import { theme } from '@/constants';
import { BottomSheet as BottomSheetModal } from "@rneui/themed";

export default function BottomSheet({
  children,
  index = 1,
  items,
  onClose,
  ...props
}: any) {
  return (
    <BottomSheetModal
      {...props}
      index={index}
      containerStyle={{
        backgroundColor: "#00000085",
        paddingBottom: -35,
      }}
      onBackdropPress={() => onClose()}
    >
      {children({
        styles: {
          backgroundColor: theme.primary.brand950,
          padding: 0,
          zIndex: 9999999,
        },
      })}
    </BottomSheetModal>
  );
}
