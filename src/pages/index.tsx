import { NextSeo } from 'next-seo'
import { useEffect, useState } from 'react'
import Hero from '@/components/Hero'
import FeaturedProjects from '@/components/FeaturedProjects'

function Home() {
	const [mounted, setMounted] = useState(false)
	useEffect(() => {
		setMounted(true)
	}, [])

	return (
		<>
			<NextSeo />
			{mounted && (
				<div className='flex-col space-y-16'>
					<Hero />
					<FeaturedProjects />
				</div>
			)}
		</>
	)
}

export default Home
