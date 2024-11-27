import { Button, ButtonVariants, Input, ThemedModal, ThemedText } from '@/modules/shared'
import { StyleSheet, View } from 'react-native'

import { ConfirmEmailModalProps } from '../../interfaces/confirm-email-modal.interface'
import { FC } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import { ThemedTextVariants } from '@/modules/shared/components/UI/text/interfaces'
import { theme } from '@/modules/core/constants'

export const ConfirmEmailModal: FC<ConfirmEmailModalProps> = ({ isVisible, onClose, onClick }) => {
	return (
		<ThemedModal isVisible={isVisible} onClose={onClose} title='Inicio de sesión'>
			<ThemedText>Te enviaremos un código para validar tu identidad</ThemedText>
			<ThemedText variant={ThemedTextVariants.default} style={styles.subtitle}>
				Confirmá tu correo electrónico
			</ThemedText>
			<View style={styles.inputContainer}>
				<Input
					placeholder='Confirmar correo electrónico'
					rightIcon={<Ionicons name='at' size={16} color={theme.gray.gray400} style={styles.iconRight} />}
				/>

				<Button onPress={onClick} variant={ButtonVariants.solid}>
					Enviar código
				</Button>
			</View>
		</ThemedModal>
	)
}

const styles = StyleSheet.create({
	inputContainer: {
		gap: 16,
		marginVertical: 20,
	},
	subtitle: { color: theme.gray.gray600, fontSize: 16, marginTop: 8 },
	iconRight: {
		marginRight: 8,
	},
})
