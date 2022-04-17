import { useMDXComponent } from 'next-contentlayer/hooks'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { allBlogs } from 'contentlayer/generated'
import { useEffect, useState } from 'react'
import { Title, h1, h2, h3, p, img } from '@/components/MDXComponent'

export default function Post({ data, prev, next }) {
	const [mounted, setMounted] = useState(false)
	useEffect(() => setMounted(true), [])

	const router = useRouter()
	const url = 'https://skagur.dev' + router.asPath

	const MDXContent = useMDXComponent(data.body.code)

	const { title, summary, publishedAt, slug } = data
	const meta = {
		title,
		description: summary,
		date: publishedAt,
		url,
	}

	const MDXComponents = {
		Title,
		h1,
		h2,
		h3,
		p,
		img,
	}

	return (
		<>
			<NextSeo {...meta} />
			<Title>{title}</Title>
			<article className='flex justify-center'>
				{mounted && (
					<div className='max-w-xl'>
						<MDXContent components={MDXComponents} />
					</div>
				)}
			</article>
		</>
	)
}

export async function getStaticProps({ params }) {
	const postIndex = allBlogs.findIndex(
		(post) => post.slug === `${params.slug}`
	)
	const prev = allBlogs[postIndex + 1] || null
	const next = allBlogs[postIndex - 1] || null
	const data = allBlogs[postIndex]
	return {
		props: {
			data,
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
