import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetaData'
import { useState } from 'react'
import formatDate from '@/lib/utils/formatDate'

function ListLayout({ posts, title, initialDisplayPosts = [], pagination }) {
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
		<>
			<div className='space-y-2 pt-6 pb-8 md:space-y-5'>
				<h1 className='text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14'>
					{title}
				</h1>
				<div className='relative max-w-lg'>
					<input
						aria-label='Search articles'
						type='text'
						onChange={(e) => setSearchValue(e.target.value)}
						placeholder='Search articles'
						className='block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-900 dark:bg-gray-800 dark:text-gray-100'
					/>
					<svg
						className='absolute right-3 top-3 h-5 w-5 text-gray-400 dark:text-gray-300'
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
						/>
					</svg>
				</div>
			</div>
			{!filteredPosts.length && 'No Posts Found.'}
			{displayPosts.map((frontmatter) => {
				const { slug, title, date, summary, tags } = frontmatter
				return (
					<li key={slug} className='py-4'>
						<article>
							<dl>
								<dt className='sr-only'>Published On</dt>
								<dd>
									<time dateTime={date}>
										{formatDate(date)}
									</time>
								</dd>
							</dl>
						</article>
						{title}
					</li>
				)
			})}
		</>
	)
}

export default ListLayout
