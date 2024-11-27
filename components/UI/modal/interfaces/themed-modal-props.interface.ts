import { PropsWithChildren } from 'react'

export type ModalProps = PropsWithChildren<{
	isVisible: boolean
	onClose: () => void
}>

export type ThemedModalProps = ModalProps & {
	title: string
}
