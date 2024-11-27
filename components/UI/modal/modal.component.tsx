import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'

import { FC } from 'react'
import { ThemedModalProps } from './interfaces'
import { theme } from '@/constants'

export const ThemedModal: FC<ThemedModalProps> = ({ title, isVisible, onClose, children }) => {
	return (
		<Modal animationType='slide' visible={isVisible} transparent onDismiss={onClose}>
			<View style={styles.overlay}>
				<View style={styles.modalContent}>
					<View
						style={{
							width: '100%',
							justifyContent: 'center',
							alignItems: 'center',
							marginTop: -16,
						}}>
						<Pressable onPress={onClose} onLongPress={onClose}>
							<View
								style={{
									height: 8,
									width: 100,
									backgroundColor: theme.borders.disabled,
									borderRadius: 100,
								}}
							/>
						</Pressable>
					</View>
					<View style={styles.titleContainer}>
						<Text style={styles.title}>{title}</Text>
					</View>
					{children}
				</View>
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo negro semitransparente
		justifyContent: 'flex-end', // Asegura que el modal se posicione en la parte inferior
	},
	modalContent: {
		minHeight: '33%',
		height: 'auto',
		width: '100%',
		backgroundColor: '#f1f1f1',
		borderTopRightRadius: 18,
		borderTopLeftRadius: 18,
		position: 'absolute',
		bottom: 0,
		padding: 32,
	},
	titleContainer: {
		height: 'auto',
		paddingHorizontal: 20,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	title: {
		color: '#fff',
		fontSize: 16,
	},
})
