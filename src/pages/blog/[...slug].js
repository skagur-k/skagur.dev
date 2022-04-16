import { useMDXComponent } from 'next-contentlayer/hooks'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { allBlogs } from 'contentlayer/generated'

export default function Post({ source, prev, next }) {
	const router = useRouter()
	const url = 'https://skagur.dev' + router.asPath

	const MDXContent = useMDXComponent(source.body.html)
	const { title, summary, publishedAt, slug } = source
	const meta = {
		title,
		description: summary,
		date: publishedAt,
	}

	// TODO: Fix mdx error
	return (
		<>
			<NextSeo {...meta} />
			<header>
				<h1>{source.slug}</h1>
				<p>{source.description}</p>
				<p>{source.date}</p>
			</header>
			<article>
				<MDXContent />
			</article>
		</>
	)
}

export async function getStaticProps({ params }) {
	console.log(params.slug)
	const postIndex = allBlogs.findIndex(
		(post) => post.slug === `${params.slug}`
	)
	const prev = allBlogs[postIndex + 1] || null
	const next = allBlogs[postIndex - 1] || null
	const data = allBlogs[postIndex]
	return {
		props: {
			source: data,
			prev,
			next,
		},
	}
}

export async function getStaticPaths() {
	const paths = allBlogs.map((post) => `/blog/${post.slug}`)
	return {
		paths,
		fallback: false,
	}
}
