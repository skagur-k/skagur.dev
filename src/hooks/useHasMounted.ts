// Simple hook that tells if the component has mounted

import { useState, useEffect } from 'react'

export default function useHasMounted(): boolean {
	const [mounted, setMounted] = useState<boolean>(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	return mounted
}
