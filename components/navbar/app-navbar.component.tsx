import { theme } from '@/constants'
import { ROUTES } from '@/constants/routes/routes.constant'
import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import { Image } from 'expo-image'
import { Link } from 'expo-router'

import { Appbar } from 'react-native-paper'

export const AppNavbar = (props: NativeStackHeaderProps) => {
	return (
		<Appbar.Header
			{...props}
			style={{
				backgroundColor: theme.base.white,
				paddingHorizontal: 20,
			}}>
			<Link href={ROUTES.HOME} />
			<Image
				source={require('../../assets/images/logo-visualizar-horizontal.png')}
				style={{
					width: '50%',
					height: '75%',
				}}
				contentFit='fill'
				transition={1000}
			/>
		</Appbar.Header>
	)
}
