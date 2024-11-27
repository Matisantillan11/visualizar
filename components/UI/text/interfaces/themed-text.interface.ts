import { TextProps } from 'react-native'
import { ThemedTextVariants } from './themed-text-variants.interface'

export interface ThemedTextProps extends TextProps {
	variant?: ThemedTextVariants
}
