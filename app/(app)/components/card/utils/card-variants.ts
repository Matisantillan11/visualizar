import { SizeVariants } from '@/modules/home/interfaces'

const sizeVariants = {
	sm: {
		width: 100,
		height: 200,
	},
	md: {
		width: 150,
		height: 250,
	},
	lg: {},
}

export const cardSizeVariants = (size: SizeVariants) => {
	return {
		SIZE: sizeVariants[size] ?? sizeVariants.md,
	}
}
