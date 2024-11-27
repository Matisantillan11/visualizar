import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { ButtonProps, ButtonVariants } from './interfaces'

import { FC } from 'react'
import { buttonVariants } from './utils'

export const Button: FC<ButtonProps> = ({ variant = ButtonVariants.solid, style, ...props }) => {
	const { variant: buttonVariant, textVariant } = buttonVariants(variant)
	const buttonStyle = [styles.wrapper, buttonVariant, style]
	const textStyle = [styles.text, textVariant]
	return (
		<TouchableOpacity style={buttonStyle} {...props}>
			<Text style={textStyle}>{props.children}</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		height: 40,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 4,
	},
	text: {
		fontSize: 16,
		fontWeight: 'bold',
	},
})
