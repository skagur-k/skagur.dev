import { useMDXComponent } from 'next-contentlayer/hooks'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { allBlogs } from 'contentlayer/generated'
import { useEffect, useState } from 'react'
import { format, parseISO } from 'date-fns'
import MDXComponents, { Author } from '@/components/MDXComponent'
import { FcCalendar, FcOpenedFolder, FcAlarmClock } from 'react-icons/fc'
import siteMetaData from '@/data/siteMetaData'

export default function Post({ data, prev, next }) {
	const [mounted, setMounted] = useState(false)
	useEffect(() => setMounted(true), [])

	const router = useRouter()
	const url = 'https://skagur.dev' + router.asPath

	const MDXContent = useMDXComponent(data.body.code)

	const { title, summary, publishedAt, slug, readingTime } = data
	const meta = {
		title,
		description: summary,
		date: publishedAt,
		url,
	}

	return (
		<>
			<NextSeo {...meta} />
			<h1 className='text-2xl md:text-4xl font-extrabold leading-12 mt-4 mb-8 text-center '>
				{title}
			</h1>
			<div className='flex justify-center mb-10 md:mb-20 space-x-6 text-gray-400 text-sm md:text-base'>
				<div className='flex items-center space-x-2 justify-center'>
					<FcOpenedFolder className='w-4 h-4' />
					<p>Blog</p>
				</div>
				<div className='flex items-center space-x-2 justify-center'>
					<FcCalendar className='w-4 h-4' />
					<p>{format(parseISO(publishedAt), 'dd LLLL, yyyy')}</p>
				</div>
				<div className='flex items-center space-x-2 justify-center'>
					<FcAlarmClock className='w-4 h-4' />
					<p>{readingTime.text}</p>
				</div>
			</div>
			<article className='flex justify-center'>
				{mounted && (
					<div className='prose-sm sm:prose-lg max-w-2xl sm:max-w-3xl md:max-w-3xl dark:prose-invert'>
						<MDXContent components={{ ...MDXComponents }} />
						<Author
							name={siteMetaData.author}
							imgsrc={siteMetaData.authorProfilePic}
							description={siteMetaData.authorDescription}
						/>
					</div>
				)}
			</article>
			<div className='hidden md:flex justify-evenly mt-16'>
				<div>{prev ? prev.title : null}</div>

				<div>{next ? next.title : null}</div>
			</div>
		</>
	)
}

export async function getStaticProps({ params }) {
	const postIndex = allBlogs.findIndex(
		(post) => post.slug === `${params.slug}`
	)
	const prev = allBlogs[postIndex + 1] || null
	const next = allBlogs[postIndex - 1] || null
	const data = allBlogs[postIndex]
	return {
		props: {
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
