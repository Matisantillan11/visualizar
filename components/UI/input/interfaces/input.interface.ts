import { StyleProp, TextInputProps, TextStyle, ViewStyle } from 'react-native'

import { ReactNode } from 'react'

interface InputStyle {
	wrapper?: StyleProp<ViewStyle>
	input?: StyleProp<TextStyle>
}
export interface InputProps extends TextInputProps {
	rightIcon?: ReactNode
	leftIcon?: ReactNode
	disabled?: boolean
	styles?: InputStyle
}
