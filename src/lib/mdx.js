import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import getAllFilesRecursively from './utils/files'
import { bundleMDX } from 'mdx-bundler'
// import { mdxAPI, BlogArticleType } from '@/types/main'
import rehypePrism from 'rehype-prism/lib/src'
import remarkGfm from 'remark-gfm'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

const postsDir = path.join(process.cwd(), 'data')

export function getFiles(type) {
	const prefixPaths = path.join(postsDir, type)
	const files = getAllFilesRecursively(prefixPaths)
	return files.map((file) => file.slice(prefixPaths.length + 1))
}

export function getAllSlugs(type) {
	const files = getFiles(type)
	return files.map((file) => {
		return {
			params: {
				slug: formatSlug(file).split('/'),
			},
		}
	})
}

export function formatSlug(slug) {
	return slug.replace(/\.(mdx|md)/, '')
}

export function dateSortDesc(a, b) {
	return a > b ? -1 : 1
}

export async function getFileBySlug(type, slug) {
	const fullPath = path.join(postsDir, type, `${slug}.mdx`)
	const mdxSource = fs.readFileSync(fullPath, 'utf-8')

	const remarkPlugins = [remarkGfm]
	const rehypePlugins = [
		[
			rehypePrism,
			[
				rehypeAutolinkHeadings,
				{
					properties: {
						className: ['anchor'],
					},
				},
			],
			{ plugins: ['line-numbers', 'show-language', 'autolinker'] },
		],
	]

	const { code, frontmatter } = await bundleMDX({
		source: mdxSource,
		mdxOptions(options) {
			options.remarkPlugins = [
				...(options?.remarkPlugins ?? []),
				...remarkPlugins,
			]
			options.rehypePlugins = [
				...(options?.rehypePlugins ?? []),
				...rehypePlugins,
			]
			return options
		},
	})

	return {
		mdxSource: code,
		frontmatter: {
			slug: slug || null,
			fileName: fs.existsSync(fullPath) ? `${slug}.mdx` : null,
			date: frontmatter.date
				? new Date(frontmatter.date).toISOString()
				: null,
		},
	}
}

export async function getAllFilesFrontMatter(folder) {
	const prefixPaths = path.join(postsDir, folder)
	const files = getAllFilesRecursively(prefixPaths)
	const allFrontMatter = []

	files.forEach((file) => {
		const fileName = file.slice(prefixPaths.length + 1).replace(/\\/g, '/')
		if (path.extname(fileName) !== '.mdx') return

		const source = fs.readFileSync(file, 'utf-8')
		const { data: frontmatter } = matter(source)
		if (frontmatter.drate !== true) {
			allFrontMatter.push({
				...frontmatter,
				slug: formatSlug(fileName),
				date: frontmatter.date
					? new Date(frontmatter.date).toISOString()
					: null,
			})
		}
	})
	return allFrontMatter.sort((a, b) => dateSortDesc(a.date, b.date))
}
