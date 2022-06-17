/* eslint-disable @next/next/no-img-element */

import GithubProfile from '@/components/GitHubProfile'
import { NextSeo } from 'next-seo'
import IntroTab from '@/components/IntroTab'
import loadGitHubProfile from '@/lib/utils/loadGitHubProfile'
import ContactModal from '@/components/ContactModal'
import Badge from '@/components/TechStackIcons'
import { useEffect, useState } from 'react'

function AboutPage({ profile }: any): JSX.Element {
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

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
			</div>
			<hr className='my-6' />

			<div className='flex flex-col justify-center mt-12'>
				<h2 className='text-xl font-bold mb-8 text-center'>
					🔨 Tools I work with 🔨
				</h2>
				<div className='flex gap-4 flex-wrap justify-center'>
					<Badge name='java' />
					<Badge name='springboot' />
					<Badge name='c' />
					<Badge name='rust' />
					<Badge name='react' />
					<Badge name='nodejs' />
				</div>
			</div>
			<div className='flex flex-col items-center justify-center mt-8'>
				<div className='flex gap-4 flex-wrap justify-center '>
					<Badge name='github' />
					<Badge name='aws' />
					<Badge name='vercel' />
					<Badge name='vscode' />
					<Badge name='nextjs' />
					<Badge name='tailwind' />
					<Badge name='contentlayer' />
					<Badge name='html5' />
					<Badge name='javascript' />
					<Badge name='postman' />
					<Badge name='webpack' />
					<Badge name='yarn' />
					<Badge name='npm' />
					<Badge name='linux' />
					<Badge name='bash' />
					<Badge name='powershell' />
					<Badge name='flutter' />
					<Badge name='latex' />
					<Badge name='more' />
				</div>
			</div>
			<div className='flex flex-col items-center justify-center mt-16'>
				<h2 className='text-xl font-bold mb-8'>🎉 Certifications 🎉</h2>
				<Badge name='awscertified' />
			</div>
		</>
	)
}

export async function getStaticProps() {
	const profile = await loadGitHubProfile()
	return {
		props: {
			profile,
		},
	}
}

export default AboutPage
