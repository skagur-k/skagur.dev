import { useEffect, useState } from 'react'

const useReadingProgress = (): number => {
	const [completion, setCompletion] = useState<number>(0)

	useEffect(() => {
		const updateScrollCompletion = () => {
			const currentProgress: number = window.scrollY
			const scrollHeight: number = document.body.scrollHeight - window.innerHeight
			if (scrollHeight) {
				setCompletion(Number((currentProgress / scrollHeight).toFixed(4)) * 100)
			}
		}

		window.addEventListener('scroll', updateScrollCompletion)
		return () => {
			window.removeEventListener('scroll', updateScrollCompletion)
		}
	}, [])
	return completion
}

export default useReadingProgress
