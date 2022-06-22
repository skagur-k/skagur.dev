import { useMDXComponent } from 'next-contentlayer/hooks'
import { NextSeo, NextSeoProps } from 'next-seo'
import { useRouter } from 'next/router'
import { allBlogs, Blog } from 'contentlayer/generated'
import MDXComponents, { PostInfo } from '@/components/MDXComponent'
import GithubProfile from '@/components/GitHubProfile'
import loadGitHubProfile from '@/lib/utils/loadGitHubProfile'
import Image from 'next/image'
import Tag from '@/components/Tag'
import { useTheme } from 'next-themes'

type PostPropTypes = {
	data: Blog
	prev?: Blog
	next?: Blog
	profile: any
}

export default function Post({ data, prev, next, profile }: PostPropTypes) {
	const router = useRouter()
	const { resolvedTheme } = useTheme()

	const MDXContent: any = useMDXComponent(data.body.code)
	const { title, summary, publishedAt, slug, readingTime, coverImg, coverImgDark, author, tags }: Blog = data

	const url: string = 'https://skagur.dev' + router.asPath

	let imgSrc: string = coverImg!

	switch (resolvedTheme) {
		case 'dark':
			imgSrc = coverImgDark! ?? coverImg!
			break
		default:
			imgSrc = coverImg!
			break
	}

	const meta: NextSeoProps = {
		title,
		description: summary?.substring(0, 140),
		openGraph: {
			type: 'article',
			url,
			article: {
				publishedTime: publishedAt,
				authors: ['/about'],
			},
			images: [
				{
					url: imgSrc,
					alt: 'Post Cover Image',
				},
				{
					url: '/og-image.webp',
					width: 1200,
					height: 630,
					alt: 'skagur.dev',
				},
			],
		},
	}

	return (
		<>
			<NextSeo {...meta} />
			<div>
				<div className='flex flex-col space-y-8 items-center justify-center mb-6 sm:my-6'>
					<h1 className='text-2xl sm:text-3xl text-center font-black'>{title}</h1>
					{tags && (
						<div className='flex flex-wrap gap-y-2 justify-center'>
							{tags.map((tag) => (
								<Tag key={tag} text={tag} />
							))}
						</div>
					)}
				</div>
				<PostInfo author={author} publishedAt={publishedAt} readingTime={readingTime} slug={slug} />
			</div>
			<hr className='my-8 border-gray-500' />
			{imgSrc && (
				<div className='flex'>
					<Image src={imgSrc} width='1200px' height='630px' alt='Post cover image' className='rounded-2xl z-0' />
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
}

export async function getStaticProps({ params }: any) {
	const profile = await loadGitHubProfile()
	const postIndex = allBlogs.findIndex((post) => post.slug === `${params.slug}`)
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