import { ThemedTextProps, ThemedTextVariants } from './interfaces'

import { FC } from 'react'
import { Text } from 'react-native'
import { textVariants } from './utils/themed-text-variants.util'

export const ThemedText: FC<ThemedTextProps> = ({ children, variant = ThemedTextVariants.h1, style, ...props }) => {
	const { variant: textVariant } = textVariants(variant)
	const textStyle = [textVariant, style]

	return (
		<Text {...props} style={textStyle}>
			{children}
		</Text>
	)
}
