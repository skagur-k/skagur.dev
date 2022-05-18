import Link from '@/components/Link'
import { NextSeo } from 'next-seo'
import { useEffect, useState, createContext } from 'react'
import GitHubProfile from '@/components/GitHubProfile'

function Home({ ghmeta }: any) {
	const [mounted, setMounted] = useState(false)
	const [gh] = useState(ghmeta)
	useEffect(() => {
		setMounted(true)
	}, [])

	return (
		<>
			<NextSeo />
			{mounted && (
				<div className='flex-col mt-8 md:mt-20'>
					<div className='relative md:flex justify-between items-end'>
						<div className='space-y-4 mb-10'>
							<h1 className='text-3xl md:text-4xl font-medium'>
								안녕하세요.{' '}
								<span className='gradient-text font-bold text-amber-500'>
									김남혁
								</span>{' '}
								입니다.
							</h1>
							<h1 className='text-2xl md:text-3xl font-medium'>
								Hi, I am{' '}
								<span className='underline underline-offset-8 font-bold decoration-wavy decoration-amber-500'>
									Nam Hyuck Kim.
								</span>{' '}
							</h1>
						</div>
						<GitHubProfile className='' ghmeta={gh} />
					</div>
					<div>
						<div className='flex'></div>
						<div className='text-md md:text-lg mt-12 space-y-4'>
							<h2 className=''>
								<Link
									className='font-bold text-lg underline decoration-2 underline-offset-0 decoration-amber-500 hover:text-amber-500 mr-3'
									href='/about'>
									/about
								</Link>
								If you are interested in who I am. 😎
							</h2>
							<h2 className=''>
								<Link
									className='font-bold text-lg underline decoration-2 underline-offset-0 decoration-amber-500 hover:text-amber-500 mr-3'
									href='/project'>
									/projects
								</Link>
								If you are interested in what I worked on. 💾
							</h2>
							<h2 className=''>
								<Link
									className='font-bold text-lg underline decoration-2 underline-offset-0 decoration-amber-500 hover:text-amber-500 mr-3'
									href='/blog'>
									/blog
								</Link>{' '}
								if you would like to do some reading.
							</h2>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export async function getStaticProps() {
	const res = await fetch('https://api.github.com/users/skagur-k')
	const ghmeta = await res.json()
	return {
		props: {
			ghmeta,
		},
	}
}

export default Home
