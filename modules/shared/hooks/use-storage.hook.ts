import AsyncStorage from '@react-native-async-storage/async-storage'
import { StorageItemProps } from '../interfaces'

export const useStorage = () => {
	const storeItem = async (props: StorageItemProps) => {
		const { pairs } = props

		if (!pairs || pairs.length === 0) {
			return
		}

		try {
			pairs.map(async ({ key, value }) => {
				if (value) {
					if (typeof value === 'object') {
						const valueToStore = JSON.stringify(value)
						return await AsyncStorage.setItem(key, valueToStore)
					}

					if (typeof value !== 'string') {
						return await AsyncStorage.setItem(key, value.toString())
					}

					return await AsyncStorage.setItem(key, value)
				}
			})
		} catch (e) {
			console.log('error saving item', e)
		}

		console.log('Done saving.')
	}

	const getItem = async (key: string) => {
		try {
			const storedValue = await AsyncStorage.getItem(key)
			return storedValue != null ? JSON.parse(storedValue) : null
		} catch (e) {
			console.log('error getting item', e)
		}

		console.log('Done getting.')
	}

	const removeItem = async (key: string | Array<string>) => {
		try {
			if (Array.isArray(key)) {
				key.map(async (k) => {
					await AsyncStorage.removeItem(k)
				})
			} else {
				await AsyncStorage.removeItem('@MyApp_key')
			}
		} catch (e) {
			console.log('error removing item', e)
		}

		console.log('Done.')
	}

	return { storeItem, getItem, removeItem }
}
