import siteMetadata from '@/data/siteMetaData'
import Link, { ExternalLink, InternalLink } from '@/components/Link'
import SocialIcon from '@/components/SocialIcon'
import Logo from '@/components/Logo'
import { NextSeo } from 'next-seo'
import { useEffect, useState } from 'react'
import { FaChevronRight } from 'react-icons/fa'
import Image from 'next/image'
import profilePic from '@/public/static/images/profile.png'

function Home() {
	const [mounted, setMounted] = useState(false)
	useEffect(() => setMounted(true), [])

	return (
		<>
			<NextSeo />
			{mounted && (
				<div className='flex flex-col mt-8 md:mt-32'>
					<div className=' space-y-8'>
						<h1 className='text-2xl md:text-5xl font-medium'>
							안녕하세요.{' '}
							<span className='font-bold text-amber-500'>
								김남혁
							</span>{' '}
							입니다.
						</h1>
						<h1 className='text-xl md:text-4xl font-bold'>
							Hi, I am{' '}
							<span className='underline underline-offset-8 font-bold decoration-wavy decoration-amber-500'>
								Nam Hyuck Kim.
							</span>{' '}
						</h1>
					</div>
					<div>
						<div className='mt-12'>
							<h2 className='text-lg md:text-xl my-4 font-semibold'>
								I am a developer from{' '}
								<span className='text-blue-300 dark:text-blue-300'>
									South
								</span>{' '}
								<span className='text-red-300 dark:text-red-300'>
									Korea
								</span>
								. Welcome to this blog. This is where I reside
								and share what I deem to be useful 👍.
							</h2>
						</div>
						<div className='text-md md:text-lg mt-12 space-y-4'>
							<h2>
								Check out
								<InternalLink href='/projects'>
									/about
								</InternalLink>
								If you are interested in who I am 😎.
							</h2>
							<h2>
								Check out
								<InternalLink href='/projects'>
									/projects
								</InternalLink>
								If you are interested in what I worked on 💾.
							</h2>
							<h2>
								Check out
								<InternalLink href='/blog'>
									/blog
								</InternalLink>{' '}
								if you wnat to read some of my writings 📄.
							</h2>
						</div>

						<div className='flex justify-between items-center mt-8'>
							<div className='hidden md:inline-flex space-x-4 items-center justify-center md:justify-start'>
								<SocialIcon
									kind='github'
									href={siteMetadata.github}
									size={8}
								/>
								<SocialIcon
									kind='linkedin'
									href={siteMetadata.linkedin}
									size={8}
								/>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default Home
