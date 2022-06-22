import { Blog } from 'contentlayer/generated'
import { useState } from 'react'
import BlogCard from './BlogCard'

type BlogListProps = {
	posts: any
	title: string | undefined
	initialPosts?: []
	pagination?: any
}

function BlogListLayout({ posts, title, initialPosts = [], pagination }: BlogListProps) {
	const [searchValue, setSearchValue] = useState('')
	const filteredPosts = posts.filter((frontMatter: Blog) => {
		const searchContent = frontMatter.title + frontMatter.summary + frontMatter.tags?.join(' ')
		return searchContent.toLowerCase().includes(searchValue.toLowerCase())
	})

	const displayPosts = initialPosts.length > 0 && !searchValue ? initialPosts : filteredPosts

	return (
		<>
			<div className='w-full mb-12 relative'>
				<input
					aria-label='Search Blog'
					type='text'
					onChange={(e) => setSearchValue(e.target.value)}
					placeholder='Search posts'
					className='block w-full px-4 py-2 placeholder:opacity-60 rounded-2xl bg-gray-200 dark:bg-gray-700 focus:ring-2 focus:ring-amber-500 focus:outline-none transition-colors duration-300'
				/>
				<svg className='absolute h-6 w-6 right-3 top-2' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
					<path d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
				</svg>
			</div>
			<div className='flex justify-between items-center'>
				<h1 className='text-xl md:leading-8 font-bold text-gray-900 dark:text-gray-100'>
					{searchValue ? (
						<div className='flex text-xl'>
							<span>You searched - &nbsp;</span>
							<span className='text-sky-500'>{searchValue}</span>
						</div>
					) : (
						title
					)}
				</h1>
				<h1 className='text-sm font-medium text-gray-300 dark:text-gray-500'>{filteredPosts.length} Posts</h1>
			</div>

			<hr className='my-8 border-t-1 border-solid border-gray-900  dark:border-gray-500 border-opacity-30' />

			{!filteredPosts.length && (
				<h1 className='text-lg font-bold underline decoration-wavy decoration-2 decoration-sky-500 underline-offset-2'>None Found.</h1>
			)}
			<ul className='flex flex-col gap-y-4'>
				{displayPosts.map((frontmatter: Blog): JSX.Element => {
					return <BlogCard key={frontmatter.slug} frontmatter={frontmatter} />
				})}
			</ul>
		</>
	)
}

export default BlogListLayout
