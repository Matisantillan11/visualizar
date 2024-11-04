import { Stack } from 'expo-router'

export const AuthStack = () => {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}>
			<Stack.Screen name='index' />
			<Stack.Screen name='login' />
			<Stack.Screen name='register' />
			<Stack.Screen name='forgot-password' />
			<Stack.Screen name='+not-found' />
		</Stack>
	)
}
