import { getAllFilesFrontMatter } from '@/lib/mdx'
import siteMetadata from '@/data/siteMetaData'
import BlogListLayout from '@/components/Layouts/BlogListLayout'
import { InferGetStaticPropsType } from 'next'

const POSTS_PER_PAGE = 5

const Blog = ({
	initialDisplayPosts,
	posts,
	pagination,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
	return (
		<div>
			<div className='flex justify-between space-x-4 mb-12 leading-10'>
				<h1 className='text-3xl font-extrabold text-gray-900 dark:text-gray-100'>
					Blog
				</h1>
				<h2 className='text-gray-400 dark:text-gray-400 font-base'>
					<span className='underline decoration-wavy decoration-amber-500 underline-offset-4'>
						Everything
					</span>{' '}
					I want to share.
				</h2>
			</div>
			<BlogListLayout
				posts={posts}
				initialDisplayPosts={initialDisplayPosts}
				pagination={pagination}
				title='All Posts'
			/>
		</div>
	)
}

export async function getStaticProps() {
	const posts = await getAllFilesFrontMatter('blog')
	const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)
	const pagination = {
		currentPage: 1,
		totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
	}
	return {
		props: {
			initialDisplayPosts,
			posts,
			pagination,
		},
	}
}

export default Blog
