import { ActivityIndicator, StyleSheet, View } from 'react-native'

import { theme } from '@/constants'

export const Loader = () => {
	return (
		<View style={loaderStyles.loaderContainer}>
			<ActivityIndicator size='large' color={theme.primary.brand700} />
		</View>
	)
}

const loaderStyles = StyleSheet.create({
	loaderContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
})
