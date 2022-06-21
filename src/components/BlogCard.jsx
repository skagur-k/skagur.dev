import React, { useEffect, useState } from 'react'
import Link from '@/components/Link'
import Tag from './Tag'
import { format, parseISO } from 'date-fns'
import { FiClock } from 'react-icons/fi'
import { FaRegCalendar } from 'react-icons/fa'
import ViewCounter from './ViewCounter'
import { BsEye, BsEyeFill } from 'react-icons/bs'
import { BiGlasses } from 'react-icons/bi'
import useSWR from 'swr'
import fetcher from '@/lib/utils/fetcher'

// TDOO: taglist

function BlogCard({ frontmatter }) {
	const [mounted, setMounted] = useState(false)
	useEffect(() => setMounted(true), [])

	const { data } = useSWR(`/api/views/${frontmatter.slug}`, fetcher)
	const views = data?.total

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
								<div className='flex text-tiny font-medium items-center space-x-2 group-hover:text-sky-500'>
									<time dateTime={publishedAt}>
										<div className='flex items-center space-x-1'>
											<FaRegCalendar className='stroke-2 text-sm' />
											<p>
												{format(
													parseISO(publishedAt),
													'LLL dd, yyyy'
												)}
											</p>
										</div>
									</time>
								</div>
							</div>
						</div>
						<div className='font-sm text-gray-300 dark:text-gray-400'>
							{`${summary.substring(0, 160)}...`}
						</div>

						{tags && (
							<div className='flex flex-wrap gap-y-2'>
								{tags.map((tag) => (
									<Tag key={tag} text={tag} />
								))}
							</div>
						)}
					</div>
					<div className='flex flex-1 space-x-3 items-center justify-end text-sm'>
						<div className='flex items-center justify-end space-x-1'>
							<BiGlasses className='text-base stroke-0' />
							<p>
								{views ? (
									views.toString()
								) : (
									<span>Loading</span>
								)}
							</p>
						</div>
						<div className='flex items-center space-x-1 align-middle'>
							<FiClock className='stroke-[3px]  text-sm' />
							<p>{readingTime.text}</p>
						</div>
					</div>
				</div>
			</Link>
		</li>
	)
}

export default BlogCard
