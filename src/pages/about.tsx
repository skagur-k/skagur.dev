import GithubProfile from '@/components/GitHubProfile'
import { NextSeo } from 'next-seo'
import { useMDXComponent } from 'next-contentlayer/hooks'
import MDXComponents from '@/components/MDXComponent'

const AboutPage = ({ profilemeta }: any) => {
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

			<div className='flex-col items-center justify-center'>
				<GithubProfile className='' ghmeta={profilemeta} />
				<div className='mt-8'>
					<h2>안녕하세요 김남혁입니다.</h2>
				</div>
			</div>
		</>
	)
}

export async function getStaticProps() {
	const profile = await fetch('https://api.github.com/users/skagur-k')
	const profilemeta = await profile.json()

	return {
		props: {
			profilemeta,
		},
	}
}

export default AboutPage
