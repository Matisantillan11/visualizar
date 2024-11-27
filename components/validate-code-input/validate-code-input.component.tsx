import { TextInput, TextInputProps } from 'react-native'

import { FC } from 'react'
import { theme } from '@/constants'

export const CodeInput: FC<TextInputProps> = (props) => {
	return (
		<TextInput
			style={{
				height: 40,
				width: 40,
				borderWidth: 1,
				borderColor: theme.gray.gray350,
				borderRadius: 8,
				justifyContent: 'center',
				paddingHorizontal: 15,
				color: theme.gray.gray400,
			}}
			maxLength={1}
			keyboardType='number-pad'
			{...props}
		/>
	)
}
