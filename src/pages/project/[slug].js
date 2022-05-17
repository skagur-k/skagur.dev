import { allProjects } from 'contentlayer/generated'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Project({ data }) {
	const [mounted, setMounted] = useState(false)
	useEffect(() => setMounted(true), [])

	const router = useRouter()
	const url = 'https://skagur.dev' + router.asPath

	const { title, description, poublishedAt, slug } = data

	const meta = { title, description, date: poublishedAt, url }

	return (
		mounted && (
			<>
				<NextSeo {...meta} />
				<div>{title}</div>
			</>
		)
	)
}

export async function getStaticProps({ params }) {
	const projectIndex = allProjects.findIndex(
		(project) => project.slug === `${params.slug}`
	)

	const data = allProjects[projectIndex]
	return {
		props: {
			data,
		},
	}
}

export async function getStaticPaths() {
	const paths = allProjects.map((project) => `/project/${project.slug}`)
	return {
		paths,
		fallback: false,
	}
}
