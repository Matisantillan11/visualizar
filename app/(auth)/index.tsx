import { Button, ButtonVariants, Container, Input, ThemedText } from '@/components/UI';
import { ActivityIndicator, StyleSheet, useWindowDimensions, View } from 'react-native';

import { BlurView } from '@/components/UI/blur-view/blur-view.component';
import Ed from '@/components/UI/illustrations/ed-login.illustration';
import Justin from '@/components/UI/illustrations/justin.illustration';
import Kim from '@/components/UI/illustrations/kim.illustration';
import { theme } from '@/constants';

import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { useAuthContext } from './hooks/useAuthContext';

export default function Login() {
  const { width, height } = useWindowDimensions();
  const { isLoading, userEmailAttempt, setUserEmailAttempt, onSendEmailCode } = useAuthContext();

  return (
    <Container>
      <View style={[styles.illustrationsContainer, { width, height: height / 3 }]}>
        <Ed />
        <Kim />
        <Justin />
      </View>

      <ThemedText style={styles.title}>¡Hola! Inicia sesión</ThemedText>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Correo electrónico"
          rightIcon={
            <Ionicons name="at" size={16} color={theme.gray.gray400} style={styles.iconRight} />
          }
          value={userEmailAttempt}
          onChangeText={(value: string) => setUserEmailAttempt(value)}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <BlurView
          color={theme.primary.brand300}
          intensity={40}
          size={425}
          left={-width / 8}
          top={-30}
        />

        <Button onPress={onSendEmailCode} variant={ButtonVariants.solid}>
          {isLoading ? (
            <ActivityIndicator size="small" color={theme.primary.brand50} />
          ) : (
            'Ingresar'
          )}
        </Button>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  illustrationsContainer: {
    flex: 1,
    position: 'relative',
    marginBottom: 250,
    backgroundColor: theme.error.error800,
  },
  title: {
    textAlign: 'center',
    marginVertical: 32,
    fontSize: 24,
    fontWeight: 'bold',
  },
  inputContainer: {
    gap: 16,
  },
  iconRight: {
    marginRight: 8,
  },
  iconLeft: {
    marginLeft: 8,
  },
  buttonsContainer: {
    marginTop: 64,
    gap: 16,
    paddingHorizontal: 48,
  },
});
