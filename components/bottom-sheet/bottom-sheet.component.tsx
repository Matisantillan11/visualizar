/* import {
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet"; */
import { theme } from '@/constants';
import { BottomSheet as BottomSheetModal } from '@rneui/themed';
import { useCallback } from 'react';

export default function BottomSheet({ children, index = 1, items, onClose, ...props }: any) {
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <BottomSheetModal
      {...props}
      onChange={handleSheetChanges}
      index={index}
      containerStyle={{
        paddingBottom: -35,
      }}
      onBackdropPress={() => onClose()}>
      {children({
        styles: { backgroundColor: theme.primary.brand950, padding: 0, zIndex: 9999999 },
      })}
    </BottomSheetModal>
  );
}
