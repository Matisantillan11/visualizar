import {
  Button,
  ButtonVariants,
  Container,
  DataSecurityIllustration,
  Input,
  Loader,
  ThemedText,
  ThemedTextVariants,
} from "@/components/UI";
import { StyleSheet, View } from 'react-native';

import { theme } from '@/constants';
import React, { useEffect } from 'react';
import ToastManager, { Toast } from 'toastify-react-native';
import { useAuthContext } from './hooks/useAuthContext';

export default function ValidateCode() {
  const {
    isValidatingCode,
    isLoading,
    userCodeAttempt,
    wasCodeResent,
    setUserCodeAttempt,
    onSendEmailCode,
    onValidateCode,
  } = useAuthContext();

  useEffect(() => {
    if (!isLoading && wasCodeResent) {
      Toast.success('Hemos enviado un nuevo codigo a tu correo electronico!');
    }
  }, [isLoading, wasCodeResent]);

  return (
    <Container gradient>
      <View style={styles.illustrationContainer}>
        <DataSecurityIllustration />
      </View>

      <ThemedText style={styles.title}>Ingresá tu código</ThemedText>
      <View style={styles.inputContainer}>
        <Input
          onPressOut={(e) => e.stopPropagation()}
          maxLength={6}
          placeholder="Código"
          keyboardType="number-pad"
          returnKeyType="done"
          value={userCodeAttempt}
          onChangeText={(value) => setUserCodeAttempt(value)}
        />
      </View>
      <ThemedText variant={ThemedTextVariants.default} style={styles.noReceived}>
        No recibiste tu código? Asegurate de chequear tu spam o
        <ThemedText
          onPress={() => onSendEmailCode(true)}
          variant={ThemedTextVariants.default}
          style={styles.coloredNoReceivedText}>
          {' '}
          solicita nuevas instrucciones.
        </ThemedText>
      </ThemedText>

      <View style={styles.buttonsContainer}>
        <Button onPress={onValidateCode} variant={ButtonVariants.solid} disabled={isLoading}>
          {isValidatingCode ? <Loader /> : 'Validar código'}
        </Button>
      </View>

      <ToastManager position="bottom" animationStyle="fade" showProgressBar={false} />
    </Container>
  );
}

const styles = StyleSheet.create({
  illustrationContainer: {
    marginTop: 96,
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
  },
  buttonsContainer: {
    gap: 16,
    paddingHorizontal: 48,
  },
  noReceived: {
    color: theme.base.white,
    textAlign: 'center',
    marginVertical: 24,
  },
  coloredNoReceivedText: {
    color: theme.primary.brand400,
    fontWeight: 'bold',
  },
});
