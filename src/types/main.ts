import matter from 'gray-matter'

export interface AuthorType {
	name: string
	picture: string
}

export interface ArticleType {
	slug: string
	title: string
	description: string
	date: string
	coverImage?: string
	author: AuthorType
	excerpt?: string
	content: string
}

export interface BlogArticleType {
	[key: string]: string | Array<string>
}

export interface mdxAPI {
	getAllSlugs: () => Array<string>
	getAllArticles: () => Array<BlogArticleType>
	getAllTags: () => Array<string>
	getRawArticleBySlug: (slug: string) => matter.GrayMatterFile<string>
	getArticleBySlug: (slug: string, fields: string[]) => BlogArticleType
	getArticleByTag: (slug: string, fields: string[]) => Array<BlogArticleType>
}
