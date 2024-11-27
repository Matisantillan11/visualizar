import { Button, ButtonVariants, Container, Input, ThemedText, ThemedTextVariants } from '@/components/UI'
import { StyleSheet, View } from 'react-native'

import { ContactUsIllustration } from '@/components/UI/illustrations/contact-us.illustration'
import { theme } from '@/constants'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useRouter } from 'expo-router'
import React from 'react'

export default function ForgotPassword() {
	const router = useRouter()

	return (
		<Container>
			<View style={styles.illustrationContainer}>
				<ContactUsIllustration />
			</View>

			<ThemedText style={styles.title}>Olvidaste{'\n'}tu contraseña</ThemedText>
			<ThemedText variant={ThemedTextVariants.default}>
				No te preocupes. Decinos tu correo electrónico y te ayudaremos a recuperar tu contraseña.
			</ThemedText>

			<View style={styles.inputContainer}>
				<Input
					placeholder='Correo electrónico'
					rightIcon={<Ionicons name='at' size={16} color={theme.gray.gray400} style={styles.iconRight} />}
				/>
			</View>
			<View style={styles.buttonsContainer}>
				<Button onPress={() => router.push('/validate-code')} variant={ButtonVariants.solid}>
					Continuar
				</Button>
			</View>
		</Container>
	)
}

const styles = StyleSheet.create({
	illustrationContainer: { justifyContent: 'center', alignItems: 'center' },
	title: {
		marginVertical: 16,
	},
	inputContainer: {
		gap: 16,
		marginVertical: 32,
	},
	iconRight: {
		marginRight: 8,
	},
	buttonsContainer: {
		marginTop: 64,
		gap: 16,
		paddingHorizontal: 48,
	},
})
