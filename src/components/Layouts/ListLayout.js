import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetaData'
import { useState, useEffect } from 'react'
import formatDate from '@/lib/utils/formatDate'
import Tag from '@/components/Tag'

function ListLayout({ posts, title, initialDisplayPosts = [], pagination }) {
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
		<>
			<div className='space-y-2 pt-6 pb-8 md:space-y-5'>
				<h1 className='text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 md:text-4xl md:leading-10 lg:text-6xl md:leading-14'>
					{title}
				</h1>
			</div>
			{!filteredPosts.length && 'No Posts Found.'}
			{displayPosts.map((frontmatter) => {
				const { slug, title, date, summary, tags } = frontmatter
				return (
					<li key={slug} className='py-4'>
						<article className='space-y-2'>
							<dl>
								<dt className='sr-only'>Published On</dt>
								<dd className='text-base font-medium leading-6'>
									<time dateTime={date}>
										{formatDate(date)}
									</time>
								</dd>
							</dl>
							<div className='space-y-4'>
								<div>
									<h3 className='text-3xl font-bold leading-8 tracking-tight'>
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
								<div className='prose font-semibold text-gray-600 dark:text-gray-400'>
									{summary}
								</div>
							</div>
						</article>
					</li>
				)
			})}
		</>
	)
}

export default ListLayout
