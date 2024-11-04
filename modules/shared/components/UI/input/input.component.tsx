import { StyleSheet, TextInput, View } from 'react-native'

import { theme } from '@/modules/core'
import { FC } from 'react'
import { InputProps } from './interfaces'

export const Input: FC<InputProps> = (props) => {
	const { rightIcon, leftIcon } = props

	return (
		<View style={[styles.wrapper, { backgroundColor: props.disabled ? theme.gray.gray350 : 'transparent' }]}>
			{rightIcon && rightIcon}
			<TextInput style={[props.style, styles.input]} placeholderTextColor={theme.gray.gray400} {...props} />
			{leftIcon && leftIcon}
		</View>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: theme.gray.gray350,
		borderRadius: 8,
		paddingHorizontal: 8,
		paddingVertical: 12,
	},
	input: {
		flex: 1,
		fontSize: 14,
		color: theme.gray.gray400,
	},
})
