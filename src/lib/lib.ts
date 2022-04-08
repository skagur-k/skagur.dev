import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { API, BlogArticleType } from '@/types/main'

const postsDirectory = join(process.cwd(), 'data/posts')

function getRawArticleBySlug(slug: string): matter.GrayMatterFile<string> {
	const fullPath = join(postsDirectory, `${slug}.mdx`)
	const fileContents = fs.readFileSync(fullPath, 'utf-8')
	return matter(fileContents)
}

function getAllSlugs(): Array<string> {
	return fs.readdirSync(postsDirectory)
}

function getArticleBySlug(
	slug: string,
	fields: string[] = []
): BlogArticleType {
	const realSlug = slug.replace(/\.mdx$/, '')
	const { data, content } = getRawArticleBySlug(realSlug)
	const items: BlogArticleType = {}

	fields.forEach((field) => {
		if (field === 'slug') {
			items[field] = realSlug
		}
		if (field === 'content') {
			items[field] = content
		}
		if (field === 'slug') {
			items[field] = realSlug
		}
		if (data[field]) {
			items[field] = data[field]
		}
	})
	return items
}

function getAllArticles(fields: string[] = []): Array<BlogArticleType> {
	return getAllSlugs()
		.map((slug) => getArticleBySlug(slug, fields))
		.sort((article1, article2) => (article1.date > article2.date ? -1 : 1))
}

function getArticleByTag(
	tag: string,
	fields: string[] = []
): Array<BlogArticleType> {
	return getAllArticles(fields).filter((article) => {
		const tags = article.tags ?? []
		return tags.includes(tag)
	})
}

function getAllTags(): Array<string> {
	const articles = getAllArticles(['tags'])
	const allTags = new Set<string>()
	articles.forEach((article) => {
		const tags = article.tags as Array<string>
		tags.forEach((tag) => allTags.add(tag))
	})
	return Array.from(allTags)
}

export const api: API = {
	getAllSlugs,
	getAllArticles,
	getAllTags,
	getRawArticleBySlug,
	getArticleBySlug,
	getArticleByTag,
}
