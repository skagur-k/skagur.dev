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
			<hr className='my-12' />

			<div className='flex flex-col justify-center mt-12'>
				<h2 className='text-xl font-bold mb-8 text-center'>
					🎯{' '}
					<span className='underline decoration-wavy decoration-amber-500 underline-offset-4'>
						Skills
					</span>{' '}
					🎯
				</h2>
				<div className='flex gap-4 flex-wrap'>
					<Badge.JavaBadge />
					<Badge.BootBadge />
					<Badge.ReactBadge />
					<Badge.NextBadge />
					<Badge.HTMLBadge />
					<Badge.JSBadge />
				</div>
			</div>
			<div className='flex flex-col items-center justify-center mt-16'>
				<h2 className='text-xl font-bold mb-8'>
					🔨{' '}
					<span className='underline decoration-wavy decoration-amber-500 underline-offset-4'>
						I work with these tools
					</span>{' '}
					🔨
				</h2>
				<div className='flex gap-4 flex-wrap'>
					<Badge.VSCBadge />
					<Badge.PostmanBadge />
					<Badge.GitHubBadge />
					<Badge.VercelBadge />
					<Badge.NodeBadge />
					<Badge.ContentLayerBadge />
					<Badge.TailwindBadge />
					<Badge.WebpackBadge />
					<Badge.AWSBadge />
					<Badge.PythonBadge />
					<Badge.FlutterBadge />
					<Badge.LinuxBadge />
					<Badge.BashBadge />
					<Badge.MoreBadge />
				</div>
			</div>
			<div className='flex flex-col items-center justify-center mt-16'>
				<h2 className='text-xl font-bold mb-8'>
					🎉{' '}
					<span className='underline decoration-wavy decoration-amber-500 underline-offset-4'>
						Certifications
					</span>{' '}
					🎉
				</h2>
				<div className='flex gap-6'>
					<Badge.AWSCertifiedBadge />
				</div>
			</div>
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
