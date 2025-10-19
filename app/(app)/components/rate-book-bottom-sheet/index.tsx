import BottomSheet from '@/components/bottom-sheet/bottom-sheet.component';
import { Button, Input, ThemedText } from '@/components/UI';
import { theme } from '@/constants';
import { Rating } from '@rneui/themed';
import { useState } from 'react';
import { useWindowDimensions, View } from 'react-native';

export default function RateBookBottomSheet({
  isVisible,
  onClose,
  bookName,
}: {
  isVisible: boolean;
  onClose: () => void;
  bookName: string;
}) {
  const { width, height } = useWindowDimensions();
  const [comments, setComments] = useState<string>('');

  const onSendComments = () => {
    console.log('comments: ' + comments);
    onClose();
  };

  const onFinishRating = (rating: number) => {
    console.log('rating is: ' + rating);
  };

  return (
    <BottomSheet isVisible={isVisible} onClose={onClose}>
      {({ styles }: any) => {
        return (
          <View style={{ ...styles, height: height / 2, gap: 18, padding: 32 }}>
            <ThemedText
              style={{
                fontSize: 18,
                fontWeight: 'semibold',
              }}>{`Que opinas del libro "${bookName}"?`}</ThemedText>

            <View style={{ flex: 1, alignItems: 'flex-start' }}>
              <Rating fractions={0} imageSize={50} minValue={0} startingValue={0} />
            </View>

            <Input
              style={{ height: 100, color: theme.gray.gray400 }}
              onPressOut={(e) => e.stopPropagation()}
              placeholder="Comentarios"
              keyboardType="default"
              returnKeyType="done"
              multiline={true}
              value={comments}
              onChangeText={(value) => setComments(value)}
            />

            <Button onPress={onSendComments} style={{ width: width / 2 }}>
              Calificar libro
            </Button>
          </View>
        );
      }}
      {/*  */}
    </BottomSheet>
  );
}
