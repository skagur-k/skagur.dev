import { useEffect, useState } from 'react'
import { BsFillArrowUpCircleFill } from 'react-icons/bs'

const ScrollToTopButton = () => {
	const [showButton, setShowButton] = useState(false)

	useEffect(() => {
		window.addEventListener('scroll', () => {
			if (window.scrollY > 300) {
				setShowButton(true)
			} else {
				setShowButton(false)
			}
		})
	}, [])

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	}

	return (
		showButton && (
			<div className='hidden lg:flex lg:fixed bottom-10 right-20'>
				<button onClick={scrollToTop}>
					<BsFillArrowUpCircleFill className='w-10 h-10' />
				</button>
			</div>
		)
	)
}

export default ScrollToTopButton
