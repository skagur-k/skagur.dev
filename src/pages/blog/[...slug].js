import { useMemo } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'
import {
	getAllSlugs,
	getFileBySlug,
	getAllFilesFrontMatter,
	formatSlug,
} from '@/lib/mdx'

export default function Post({ source, frontmatter }) {
	const Component = useMemo(() => getMDXComponent(source), [source])
	return (
		<>
			<header>
				<h1>{frontmatter.slug}</h1>
				<p>{frontmatter.description}</p>
				<p>{frontmatter.date}</p>
			</header>
			<article>
				<Component />
			</article>
		</>
	)
}

export async function getStaticProps({ params }) {
	const allPosts = await getAllFilesFrontMatter('blog')
	const postIndex = allPosts.findIndex(
		(post) => formatSlug(post.slug) === params.slug.join('/')
	)
	const prev = allPosts[postIndex + 1] || null
	const next = allPosts[postIndex - 1] || null
	const data = await getFileBySlug('blog', params.slug.join('/'))

	// const data = await getFileBySlug('blog', params.slug)
	return {
		props: {
			source: data.mdxSource,
			frontmatter: data.frontmatter,
		},
	}
}

export async function getStaticPaths() {
	const slugs = await getAllSlugs('blog')
	return {
		paths: slugs,
		fallback: false,
	}
}
