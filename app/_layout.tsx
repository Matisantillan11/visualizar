import 'react-native-reanimated'

import * as SplashScreen from 'expo-splash-screen'

import { DefaultTheme, ThemeProvider } from '@react-navigation/native'

import { AuthNavbar } from '@/components/navbar/auth-navbar.component'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
	const [loaded] = useFonts({
		SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
	})

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync()
		}
	}, [loaded])

	if (!loaded) {
		return null
	}

	return (
		<ThemeProvider value={/* colorScheme === 'dark' ? DarkTheme : */ DefaultTheme}>
			<Stack
				screenOptions={{
					header: (props) => <AuthNavbar {...props} />,
				}}>
				<Stack.Screen name='index' />
				<Stack.Screen name='login' />
				<Stack.Screen name='register' />
				<Stack.Screen name='forgot-password' />
				<Stack.Screen name='validate-code' />
				<Stack.Screen name='+not-found' />
			</Stack>
			<StatusBar style='auto' />
		</ThemeProvider>
	)
}
