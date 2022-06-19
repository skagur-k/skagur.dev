import BlogList from '@/components/BlogList'
import { InferGetStaticPropsType } from 'next'
import { NextSeo } from 'next-seo'
import { compareDesc, parseISO } from 'date-fns'
import { allBlogs } from 'contentlayer/generated'

const POSTS_PER_PAGE = 5

const BlogPage = ({
	initialPosts,
	blogPosts,
	pagination,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
	return (
		<>
			<NextSeo title='Blog' />

			<div className='flex justify-between space-x-4 mb-12 leading-10'>
				<h1 className='text-3xl font-extrabold text-gray-900 dark:text-gray-100'>
					Blog
				</h1>
				<h2 className='text-gray-400 dark:text-gray-400 font-base'>
					<span className='underline decoration-wavy decoration-amber-500 underline-offset-4'>
						Writings
					</span>{' '}
					I want to share.
				</h2>
			</div>
			<BlogList
				posts={blogPosts}
				initialPosts={initialPosts}
				pagination={pagination}
				title='All Posts'
			/>
		</>
	)
}

export async function getStaticProps() {
	const blogPosts = allBlogs.sort((a, b) => {
		const date_a = parseISO(a.publishedAt)
		const date_b = parseISO(b.publishedAt)
		return compareDesc(date_a, date_b)
	})
	const initialPosts = blogPosts.slice(0, POSTS_PER_PAGE)
	const pagination = {
		currentPage: 1,
		totalPages: Math.ceil(blogPosts.length / POSTS_PER_PAGE),
	}

	return {
		props: {
			initialPosts,
			blogPosts,
			pagination,
		},
	}
}

export default BlogPage
