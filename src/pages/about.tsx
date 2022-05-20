/* eslint-disable @next/next/no-img-element */

import GithubProfile from '@/components/GitHubProfile'
import { NextSeo } from 'next-seo'
import IntroTab from '@/components/IntroTab'
import loadGitHubProfile from '@/lib/utils/loadGitHubProfile'
import ContactModal from '@/components/ContactModal'
import TechStack, { AWSBadge } from '@/lib/techStackIcons'

function AboutPage({ profile }: any): JSX.Element {
	return (
		<>
			<NextSeo title='About' />
			<div className='flex justify-between space-x-4 mb-12 leading-10'>
				<h1 className='text-3xl font-bold text-gray-900 dark:text-gray-100'>
					About me
				</h1>
				<h2 className='text-gray-400 dark:text-gray-400  '>
					<span className='underline decoration-wavy decoration-amber-500 underline-offset-4'>
						Snippets
					</span>{' '}
					about me.
				</h2>
			</div>

			<div className='flex flex-col w-full justify-center'>
				<GithubProfile className='' ghmeta={profile} />
				<div className='mt-8 space-y-4'>
					<IntroTab />
				</div>
				<div className='mt-12 mx-auto prose-lg px-2 sm:px-0 max-w-xl sm:max-w-3xl dark:prose-invert'></div>
			</div>
			<hr className='my-12' />
			<div className='flex flex-col items-center justify-center'>
				<h2 className='text-xl font-bold mb-8'>
					<span className='underline decoration-wavy decoration-amber-500 underline-offset-4'>
						Skills
					</span>
				</h2>
				<div className='flex gap-6 flex-wrap'>
					<TechStack type={'java'} />
					<TechStack type={'springboot'} />
					<TechStack type={'react'} />
					<TechStack type={'nextjs'} />
					<TechStack type={'nodejs'} />
					<TechStack type={'aws'} />
				</div>
			</div>
			<hr className='my-12' />
			<div className='flex flex-col items-center justify-center'>
				<h2 className='text-xl font-bold mb-8'>
					<span className='underline decoration-wavy decoration-amber-500 underline-offset-4'>
						Certifications
					</span>
				</h2>
				<div className='flex gap-6'>
					<AWSBadge />
				</div>
			</div>

			<ContactModal className='mt-12' />
		</>
	)
}

export async function getStaticProps() {
	const profile = await loadGitHubProfile()
	console.log(profile)

	return {
		props: {
			profile,
		},
	}
}

export default AboutPage
