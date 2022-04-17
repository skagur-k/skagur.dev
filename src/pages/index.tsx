import siteMetadata from '@/data/siteMetaData'
import Link, { ExternalLink, InternalLink } from '@/components/Link'
import SocialIcon from '@/components/SocialIcon'
import { NextSeo } from 'next-seo'
import { useEffect, useState } from 'react'

function Home() {
	const [mounted, setMounted] = useState(false)
	useEffect(() => setMounted(true), [])

	return (
		<>
			<NextSeo />
			{mounted && (
				<div className='flex flex-col mt-0 md:mt-12 space-y-8'>
					<h1 className='text-xl md:text-4xl font-bold'>
						Hi, I am{' '}
						<span className='underline underline-offset-8 decoration-wavy decoration-amber-500'>
							Nam Hyuck Kim
						</span>
					</h1>
					<h2 className='text-md md:text-lg'>
						Check out some of the
						<InternalLink href='/projects'>/projects</InternalLink>I
						worked on.
						<h2>
							Check out my blog too if you have time 😁.
							<InternalLink href='/blog'>/blog</InternalLink>
						</h2>
					</h2>

					<div className='flex justify-between'>
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
			)}
		</>
	)
}

export default Home
