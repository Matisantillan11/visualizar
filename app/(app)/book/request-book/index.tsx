import {
  Button,
  ButtonVariants,
  DataSecurityIllustration,
  Input,
  ThemedText,
} from '@/components/UI';
import { StyleSheet, View } from 'react-native';

import { VerticalLinearGradient } from '@/components/linear-gradient/linear-gradient.component';
import { theme } from '@/constants';
import React, { useState } from 'react';

export default function RequestBook() {
  const [bookName, setBookName] = useState<string>('');
  const [authorName, setAuthorName] = useState<string>('');
  const [comments, setComments] = useState<string>('');

  return (
    <VerticalLinearGradient>
      <View style={{ flex: 1 }}>
        <View style={styles.illustrationContainer}>
          <DataSecurityIllustration />
        </View>

        <ThemedText style={styles.title}>Solicitar alta de nuevo libro</ThemedText>
        <View style={styles.inputContainer}>
          <Input
            onPressOut={(e) => e.stopPropagation()}
            placeholder="Nombre del libro"
            keyboardType="default"
            value={bookName}
            onChangeText={(value) => setBookName(value)}
          />

          <View style={{ width: '75%' }}>
            <Input
              onPressOut={(e) => e.stopPropagation()}
              placeholder="Nombre del autor"
              keyboardType="default"
              value={authorName}
              onChangeText={(value) => setAuthorName(value)}
            />
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

          {/* TODO: Add checkboxes */}
        </View>

        <View style={styles.buttonsContainer}>
          <Button onPress={() => {}} variant={ButtonVariants.solid}>
            {'Solicitar libro'}
          </Button>
        </View>
      </View>
    </VerticalLinearGradient>
  );
}

const styles = StyleSheet.create({
  illustrationContainer: {
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    width: 'auto',
    marginVertical: 48,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  inputContainer: {
    gap: 16,
    paddingHorizontal: 48,
  },
  buttonsContainer: {
    gap: 16,
    paddingHorizontal: 48,
    marginTop: 64,
  },
  noReceived: {
    color: theme.base.white,
    textAlign: 'center',
    marginVertical: 24,
  },
  coloredNoReceivedText: {
    color: theme.primary.brand400,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
