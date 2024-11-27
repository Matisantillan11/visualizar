import { ButtonVariants } from '../interfaces'
import { theme } from '@/constants'

const variants = {
	solid: {
		backgroundColor: theme.primary.brand350,
	},
	outlined: {
		backgroundColor: theme.base.white,
		borderWidth: 1,
		borderColor: theme.primary.brand350,
		borderStyle: 'solid',
	},
}

const textVariants = {
	solid: {
		color: theme.base.white,
	},
	outlined: {
		color: theme.primary.brand350,
	},
}

export const buttonVariants = (variant: ButtonVariants) => {
	return {
		variant: variants[variant] ?? variants.solid,
		textVariant: textVariants[variant] ?? textVariants.solid,
	}
}
