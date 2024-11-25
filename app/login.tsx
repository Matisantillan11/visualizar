import { LoginIllustration, theme } from '@/modules/core'
import { Button, ButtonVariants, Container, Input, ThemedText } from '@/modules/shared'
import { Link, useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, View } from 'react-native'

import { ThemedTextVariants } from '@/modules/shared/components/UI/text/interfaces'
import AntDesign from '@expo/vector-icons/AntDesign'
import Ionicons from '@expo/vector-icons/Ionicons'

export default function Login() {
	const router = useRouter()

	return (
		<Container>
			<View style={styles.illustrationContainer}>
				<LoginIllustration />
			</View>

			<ThemedText style={styles.title}>Hola!{'\n'}Inicia sesión</ThemedText>
			<View style={styles.inputContainer}>
				<Input
					placeholder='Correo electrónico'
					rightIcon={<Ionicons name='at' size={16} color={theme.gray.gray400} style={styles.iconRight} />}
				/>
				<Input
					placeholder='Password'
					rightIcon={<Ionicons name='at' size={16} color={theme.gray.gray400} style={styles.iconRight} />}
					leftIcon={<Ionicons name='eye-off' size={16} color={theme.gray.gray400} style={styles.iconLeft} />}
				/>
				<View style={styles.forgotContainer}>
					<Link href='/forgot-password'>
						<ThemedText variant={ThemedTextVariants.default} style={styles.forgotLink}>
							Olvidaste tu contraseña?
						</ThemedText>
					</Link>
				</View>
			</View>
			<View style={styles.buttonsContainer}>
				<Button onPress={() => router.push('/validate-code')} variant={ButtonVariants.solid}>
					Ingresar
				</Button>
				<View style={styles.orContainer}>
					<View style={styles.line} />
					<ThemedText variant={ThemedTextVariants.default} style={styles.orText}>
						O
					</ThemedText>
					<View style={styles.line} />
				</View>

				<Button variant={ButtonVariants.outlined}>
					<View style={{ paddingHorizontal: 8, marginTop: -2 }}>
						<AntDesign name='google' size={20} color={theme.primary.brand350} />
					</View>
					Ingresa con google
				</Button>
			</View>

			<ThemedText variant={ThemedTextVariants.default} style={styles.registerString}>
				Aún no tienes cuenta?{' '}
				<Link href='/register'>
					<ThemedText variant={ThemedTextVariants.default} style={styles.coloredRegisterText}>
						Registrate
					</ThemedText>
				</Link>
			</ThemedText>
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
	},
	iconRight: {
		marginRight: 8,
	},
	iconLeft: {
		marginLeft: 8,
	},
	forgotContainer: {
		justifyContent: 'flex-end',
	},
	forgotLink: {
		textAlign: 'right',
		color: theme.primary.brand700,
		fontWeight: 'bold',
	},
	buttonsContainer: {
		marginTop: 64,
		gap: 16,
		paddingHorizontal: 48,
	},
	orContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
	line: { flex: 1, height: 1, backgroundColor: theme.gray.gray400 },
	orText: { color: theme.base.black, textAlign: 'center', marginHorizontal: 8 },
	grayButton: {
		backgroundColor: theme.gray.gray300,
	},
	registerString: {
		color: theme.base.black,
		textAlign: 'center',
		marginTop: 32,
	},
	coloredRegisterText: {
		color: theme.primary.brand700,
		textAlign: 'center',
		fontWeight: 'bold',
	},
})
