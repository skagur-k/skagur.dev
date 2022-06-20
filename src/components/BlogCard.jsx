import React, { useEffect, useState } from 'react'
import Link from '@/components/Link'
import Tag from './Tag'
import { format, parseISO } from 'date-fns'
import { FiClock } from 'react-icons/fi'

function BlogCard({ frontmatter }) {
	const [mounted, setMounted] = useState(false)
	useEffect(() => setMounted(true), [])

	const { slug, title, publishedAt, summary, tags, readingTime } = frontmatter
	return (
		<li key={slug}>
			<Link href={`/blog/${slug}`}>
				<div className='group space-y-2 p-4 ring-2 cursor-pointer hover:ring-sky-500 dark:hover:ring-sky-500 ring-gray-200 dark:ring-gray-800 rounded-2xl'>
					<div className='space-y-2'>
						<div className='flex justify-between'>
							<h3 className='flex-1 group-hover:text-sky-500 text-lg font-black'>
								{title}
							</h3>
							<div className=''>
								<div className='text-tiny font-semibold group-hover:text-sky-500'>
									<time dateTime={publishedAt}>
										{format(
											parseISO(publishedAt),
											'LLL dd, yyyy'
										)}
									</time>
								</div>
							</div>
						</div>
						<div className='font-sm text-gray-300 dark:text-gray-400'>
							{`${summary.substring(0, 160)}...`}
						</div>
						<div className='flex items-center space-x-1 text-tiny text-gray-500 dark:text-gray-200 font-semibold'>
							<FiClock className='stroke-[3px]]' />
							<p>{readingTime.text}</p>
						</div>
						{tags && (
							<div className='flex flex-wrap gap-y-2'>
								{tags.map((tag) => (
									<Tag key={tag} text={tag} />
								))}
							</div>
						)}
					</div>
				</div>
			</Link>
		</li>
	)
}

export default BlogCard
