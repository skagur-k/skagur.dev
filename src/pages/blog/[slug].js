import { useMDXComponent } from 'next-contentlayer/hooks'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { allBlogs } from 'contentlayer/generated'
import { useEffect, useState } from 'react'
import { format, parseISO } from 'date-fns'
import { FcCalendar, FcOpenedFolder, FcAlarmClock } from 'react-icons/fc'
import MDXComponents, { Author } from '@/components/MDXComponent'
import siteMetaData from '@/data/siteMetaData'
import Link from '@/components/Link'
import Image from 'next/image'

export default function Post({ data, prev, next }) {
	const [mounted, setMounted] = useState(false)
	useEffect(() => setMounted(true), [])

	const router = useRouter()
	const url = 'https://skagur.dev' + router.asPath

	const MDXContent = useMDXComponent(data.body.code)

	const { title, summary, publishedAt, slug, readingTime, coverImg } = data

	const meta = {
		title,
		description: summary,
		date: publishedAt,
		url,
	}

	console.log(slug)
	return (
		<>
			<NextSeo {...meta} />
			<div className='flex flex-col space-y-4'>
				<h1 className='text-2xl md:text-5xl text-center font-extrabold leading-12'>
					{title}
				</h1>

				<div className='cover-image relative w-full h-fit'>
					<Image
						layout='fill'
						src={coverImg}
						alt={`Cover Image - ${title}`}
					/>
				</div>
			</div>

			<article className='flex justify-center'>
				{mounted && (
					<div className='relative prose-sm md:prose px-4 sm:px-0 max-w-xl md:max-w-3xl dark:prose-invert'>
						<div className='flex justify-between items-center px-0 mb-4'>
							<p className='font-semibold text-sm bg-sky-200 text-sky-800 px-2 rounded-'>
								Nam Hyuck Kim
							</p>
							<div className='flex justify-center space-x-6 text-gray-400 text-sm md:text-sm'>
								<div className='flex items-center space-x-2 justify-center'>
									<FcOpenedFolder className='w-4 h-4' />
									<p>Blog</p>
								</div>
								<div className='flex items-center space-x-2 justify-center'>
									<FcCalendar className='w-4 h-4' />
									<p>
										{format(
											parseISO(publishedAt),
											'dd LLLL, yyyy'
										)}
									</p>
								</div>
								<div className='flex items-center space-x-2 justify-center'>
									<FcAlarmClock className='w-4 h-4' />
									<p>{readingTime.text}</p>
								</div>
							</div>
						</div>
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
				<div>
					{prev ? (
						<Link href={`/blog/${prev.slug}`}>{prev.title}</Link>
					) : null}
				</div>

				<div>
					{next ? (
						<Link href={`/blog/${next.slug}`}>{next.title}</Link>
					) : null}
				</div>
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
