import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetaData'
import { useState, useEffect } from 'react'
import formatDate from '@/lib/utils/formatDate'
import Tag from '@/components/Tag'
import { SearchIcon } from '@heroicons/react/outline/SearchCircleIcon'

// import { formatDistance, subDays } from 'date-fns'

function handleTagClick(e) {}

function BlogListLayout({
	posts,
	title,
	initialDisplayPosts = [],
	pagination,
}) {
	const [mounted, setMounted] = useState(false)
	useEffect(() => setMounted(true), [])

	const [searchValue, setSearchValue] = useState('')
	const filteredPosts = posts.filter((frontMatter) => {
		const searchContent =
			frontMatter.title +
			frontMatter.summary +
			frontMatter.tags?.join(' ')
		return searchContent.toLowerCase().includes(searchValue.toLowerCase())
	})

	const displayPosts =
		initialDisplayPosts.length > 0 && !searchValue
			? initialDisplayPosts
			: filteredPosts

	return (
		<div className='mb-8'>
			<div className='w-full mb-12 relative'>
				<input
					aria-label='Search Blog'
					type='text'
					onChange={(e) => setSearchValue(e.target.value)}
					placeholder='Search posts'
					className='block w-full px-4 py-2 placeholder:opacity-60 rounded-2xl bg-gray-200 dark:bg-gray-800 focus:ring-2 focus:ring-amber-500 focus:outline-none transition-colors duration-500'
				/>
				<svg
					className='absolute h-6 w-6 right-3 top-2'
					fill='none'
					viewBox='0 0 24 24'
					stroke='currentColor'>
					<path d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
				</svg>
			</div>
			<div className='flex justify-between items-center'>
				<h1 className='text-3xl md:leading-8 font-bold text-gray-900 dark:text-gray-100'>
					{searchValue ? (
						<div className='flex text-2xl'>
							<span>You searched - &nbsp;</span>
							<span className='text-amber-500'>
								{searchValue}
							</span>
						</div>
					) : (
						title
					)}
				</h1>
				<h1 className='font-base text-gray-300 dark:text-gray-500'>
					{filteredPosts.length} Posts
				</h1>
			</div>

			<hr className='my-8 border-t-1 border-solid border-gray-900  dark:border-gray-500 border-opacity-30' />

			{!filteredPosts.length && (
				<h1 className='text-xl font-bold underline decoration-wavy decoration-2 decoration-amber-500 underline-offset-2'>
					None Found.
				</h1>
			)}
			{displayPosts.map((frontmatter) => {
				const { slug, title, date, summary, tags } = frontmatter
				return (
					<li key={slug} className='pb-8'>
						<article className='space-y-2'>
							<dl>
								<dt className='sr-only'>Published On</dt>
								<dd className='text-tiny font-base leading-6'>
									<time dateTime={date}>
										{formatDate(date)}
									</time>
								</dd>
							</dl>
							<div className='space-y-4'>
								<div>
									<h3 className='text-2xl font-bold leading-8 tracking-tight'>
										<Link href={`/blog/${slug}`}>
											{title}
										</Link>
									</h3>
								</div>
								{mounted && (
									<div>
										{tags.map((tag) => (
											<Tag key={tag} text={tag} />
										))}
									</div>
								)}
								<div className='prose font-base text-gray-600 dark:text-gray-400'>
									{summary}
								</div>
							</div>
						</article>
					</li>
				)
			})}
		</div>
	)
}

export default BlogListLayout
