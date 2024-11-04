import { SafeAreaView, StyleSheet, View } from 'react-native'

import { FC } from 'react'
import { ContainerProps } from './interfaces'

export const Container: FC<ContainerProps> = ({ children, ...props }) => {
	return (
		<SafeAreaView>
			<View style={styles.container} {...props}>
				{children}
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		padding: 32,
	},
})
