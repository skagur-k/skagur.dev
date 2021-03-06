/* eslint-disable @next/next/no-img-element */

import GithubProfile from '@/components/GitHubProfile'
import { NextSeo } from 'next-seo'
import IntroTab from '@/components/IntroTab'
import loadGitHubProfile from '@/lib/utils/loadGitHubProfile'
import ContactModal from '@/components/ContactModal'
import Image from 'next/image'

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

			<div className='flex-col w-full items-center justify-center'>
				<GithubProfile className='' ghmeta={profile} />
				<div className='mt-8 space-y-4'>
					<IntroTab />
				</div>
				<div className='mt-12 mx-auto prose-lg px-2 sm:px-0 max-w-xl sm:max-w-3xl dark:prose-invert'></div>
			</div>

			<ContactModal />
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
