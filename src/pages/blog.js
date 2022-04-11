import { getAllFilesFrontMatter } from '@/lib/mdx'
import siteMetadata from '@/data/siteMetaData'
import ListLayout from '@/components/Layouts/ListLayout'

const POSTS_PER_PAGE = 5

const Blog = ({ initialDisplayPosts, posts, pagination }) => {

	return (
		<>
			<ListLayout
				posts={posts}
				initialDisplayPosts={initialDisplayPosts}
				pagination={pagination}
				title='All Posts'
			/>
		</>
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
