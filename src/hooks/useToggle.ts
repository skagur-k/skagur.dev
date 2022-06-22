import { useCallback, useState } from 'react'

export default function useToggle({ initialState = false }: { initialState: boolean }) {
	const [value, setValue] = useState<boolean>(initialState)

	const toggle = useCallback(() => {
		setValue((value) => !value)
	}, [])

	return [value, toggle]
}
