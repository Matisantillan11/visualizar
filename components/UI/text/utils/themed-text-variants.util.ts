import { theme } from '@/constants'
import { ThemedTextVariants } from '../interfaces'

const variants = {
	default: {
		fontSize: 14,
		color: theme.gray.gray500,
	},
	h1: {
		fontSize: 24,
		color: theme.base.black,
	},
}

export const textVariants = (variant: ThemedTextVariants) => {
	return {
		variant: variants[variant] ?? variants.default,
	}
}
