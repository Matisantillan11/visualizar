import { SafeAreaView, Text } from 'react-native'

import { useStorage } from '@/modules/shared'
import { useRouter } from 'expo-router'
import { useEffect } from 'react'

export default function Register() {
	const router = useRouter()
	const { getItem } = useStorage()

	useEffect(() => {
		const validateOnboarding = async () => {
			const onboarding = await getItem('onboarding')
			if (!onboarding) {
				router.push('/')
			}
		}

		validateOnboarding()
	}, [])
	return (
		<SafeAreaView>
			<Text>Register</Text>
		</SafeAreaView>
	)
}
