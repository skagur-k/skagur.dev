import { useMDXComponent } from 'next-contentlayer/hooks'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { allBlogs } from 'contentlayer/generated'
import { useEffect, useState } from 'react'
import MDXComponents, { PostInfo } from '@/components/MDXComponent'
import Image from 'next/image'
import GithubProfile from '@/components/GitHubProfile'
import loadGitHubProfile from '@/lib/utils/loadGitHubProfile'

export default function Post({ data, prev, next, profile }) {
	const [mounted, setMounted] = useState(false)
	useEffect(() => setMounted(true), [])

	const router = useRouter()
	const url = 'https://skagur.dev' + router.asPath

	const MDXContent = useMDXComponent(data.body.code)

	const { title, summary, publishedAt, slug, readingTime, coverImg, author } =
		data

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
				<div className='flex flex-col space-y-4'>
					<h1 className='text-2xl md:text-3xl text-center font-extrabold leading-12 md:mb-20 md:mt-12 mt-0 mb-12'>
						{title}
					</h1>
					{/* 
					<div className='cover-image relative w-full h-fit'>
						{coverImg && (
							<Image
								layout='fill'
								src={coverImg}
								alt={`Cover Image - ${title}`}
							/>
						)}
					</div> */}
				</div>

				<article className='flex-col justify-center'>
					<PostInfo
						author={author}
						publishedAt={publishedAt}
						readingTime={readingTime}
					/>
					<div className='mt-12 mx-auto prose px-2 sm:px-0 max-w-xl sm:max-w-3xl dark:prose-invert'>
						<MDXContent components={{ ...MDXComponents }} />
					</div>
					<div className='flex justify-center items-center mt-14'>
						<GithubProfile
							className='pl-10 pr-32 mr-4'
							ghmeta={profile}
						/>
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
