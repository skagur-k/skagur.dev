import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import getAllFilesRecursively from './utils/files'
import { bundleMDX } from 'mdx-bundler'
// import { mdxAPI, BlogArticleType } from '@/types/main'
import rehypePrism from 'rehype-prism/lib/src'
import remarkGfm from 'remark-gfm'

const rootDir = path.join(process.cwd(), 'data/posts')

export function getFiles(type) {
	const prefixPaths = path.join(rootDir, 'data', type)
	const files = getAllFilesRecursively(prefixPaths)
	return files
}

export function formatSlug(slug) {
	return slug.replace(/\.(mdx|md)/, '')
}

export function dateSortDesc(a, b) {
	return a > b ? -1 : 1
}

export async function getFileBySlug(type, slug) {
	const fullPath = path.join(rootDir, 'data', type, `${slug}.mdx`)
	const mdxSource = fs.readFileSync(fullPath, 'utf-8')

	const remarkPlugins = [remarkGfm]
	const rehypePlugins = [rehypePrism]

	const { code, frontmatter } = await bundleMDX(mdxSource, {
		mdxOptions(options) {
			options.remarkPlugins = [
				...(options?.remarkPlugins ?? []),
				remarkPlugins,
			]
			options.rehypePlugins = [
				...(options?.rehypePlugins ?? []),
				rehypePlugins,
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
	const prefixPaths = path.join(rootDir, 'data', folder)
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
