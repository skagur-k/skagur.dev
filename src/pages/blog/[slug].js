import { useMDXComponent } from 'next-contentlayer/hooks'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { allBlogs } from 'contentlayer/generated'
import { useEffect, useState } from 'react'
import MDXComponents, { PostInfo } from '@/components/MDXComponent'
import GithubProfile from '@/components/GitHubProfile'
import loadGitHubProfile from '@/lib/utils/loadGitHubProfile'
import Image from 'next/image'
import Tag from '@/components/Tag'
import ReactTooltip from 'react-tooltip'

export default function Post({ data, prev, next, profile }) {
	const [mounted, setMounted] = useState(false)
	useEffect(() => setMounted(true), [])

	const router = useRouter()
	const url = 'https://skagur.dev' + router.asPath

	const MDXContent = useMDXComponent(data.body.code)

	const {
		title,
		summary,
		publishedAt,
		slug,
		readingTime,
		coverImg,
		author,
		tags,
	} = data

	const meta = {
		title,
		description: summary,
		date: publishedAt,
		url,
	}

	return (
		mounted && (
			<>
				<NextSeo {...meta} />

				<div>
					<ReactTooltip effect='solid' />

					<div className='flex flex-col space-y-8 items-center justify-center mt-8 mb-14'>
						<h1 className='text-2xl sm:text-3xl text-center font-black'>
							{title}
						</h1>
						{tags && (
							<div className='flex flex-wrap gap-y-2 justify-center'>
								{tags.map((tag) => (
									<Tag key={tag} text={tag} />
								))}
							</div>
						)}
					</div>
					<PostInfo
						author={author}
						publishedAt={publishedAt}
						readingTime={readingTime}
					/>
				</div>
				<hr className='my-8 border-gray-500' />

				{coverImg && (
					<div className='relative w-full h-[300px] rounded-xl hidden sm:flex'>
						<Image
							layout='fill'
							priority='true'
							src={coverImg}
							alt='Post cover image'
							objectFit='contain'
						/>
					</div>
				)}

				<article className='flex-col justify-center'>
					<div className='mt-12 mx-auto prose dark:prose-invert max-w-xl sm:max-w-3xl'>
						<MDXContent components={{ ...MDXComponents }} />
					</div>
					<div className='mt-14'>
						<GithubProfile className='' ghmeta={profile} />
					</div>
				</article>
			</>
		)
	)
}

export async function getStaticProps({ params }) {
	const profile = await loadGitHubProfile()
	const postIndex = allBlogs.findIndex(
		(post) => post.slug === `${params.slug}`
	)
	const prev = allBlogs[postIndex + 1] || null
	const next = allBlogs[postIndex - 1] || null
	const data = allBlogs[postIndex]

	return {
		props: {
			profile,
			data,
			prev,
			next,
		},
	}
}

export async function getStaticPaths() {
	const paths = allBlogs.map((post) => `/blog/${post.slug}`)
	return {
		paths,
		fallback: false,
	}
}
