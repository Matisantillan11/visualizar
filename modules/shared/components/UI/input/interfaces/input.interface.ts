import { ReactNode } from 'react'
import { TextInputProps } from 'react-native'

export interface InputProps extends TextInputProps {
	rightIcon?: ReactNode
	leftIcon?: ReactNode
	disabled?: boolean
}
