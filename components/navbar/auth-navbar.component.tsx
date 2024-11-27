import { ROUTES } from '@/constants/routes/routes.constant'
import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import { usePathname } from 'expo-router'
import { Appbar } from 'react-native-paper'

const ALLOWED_ROUTES = [ROUTES.FORGOT_PASSWORD, ROUTES.VALIDATE_CODE]

export const AuthNavbar = (props: NativeStackHeaderProps) => {
	const path = usePathname()

	if (ALLOWED_ROUTES.includes(path)) {
		return (
			<Appbar.Header
				{...props}
				style={{
					backgroundColor: 'transparent',
				}}>
				{props.navigation.canGoBack() && (
					<Appbar.Action icon={'arrow-left'} onPress={() => props.navigation.goBack()} />
				)}
			</Appbar.Header>
		)
	}

	return null
}
