import {
	defineDocumentType,
	makeSource,
	ComputedFields,
} from 'contentlayer/source-files'
import readingTime from 'reading-time'
import remarkGfm from 'remark-gfm'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkToc from 'remark-toc'
import { remarkMdxFrontmatter } from 'remark-mdx-frontmatter'
import rehypeSlug from 'rehype-slug'
import rehypeCodeTitles from 'rehype-code-titles'
import rehypePrismPlus from 'rehype-prism-plus'

const blogComputedFields: ComputedFields = {
	wordCount: {
		type: 'number',
		resolve: (blog) => blog.body.raw.split(/\s+/gu).length,
	},
	readingTime: {
		type: 'json',
		resolve: (blog) => readingTime(blog.body.raw),
	},
	slug: {
		type: 'string',
		resolve: (blog) =>
			`${blog._raw.sourceFileName
				.replace(/\.mdx/, '')
				.replace(/\s/g, '-')}`,
	},
}

export const Blog = defineDocumentType(() => ({
	name: 'Blog',
	filePathPattern: 'blog/*.mdx',
	contentType: 'mdx',
	fields: {
		title: {
			type: 'string',
			description: 'Title of the blog post',
			required: true,
		},
		author: {
			type: 'string',
			description: 'Author of the post',
			required: true,
		},
		summary: {
			type: 'string',
			description: 'Summary of the blog post',
			required: false,
		},
		publishedAt: {
			type: 'string',
			description: 'Published date of the post',
			required: true,
		},
		coverImg: {
			type: 'string',
			required: false,
		},
		tags: {
			type: 'string',
			required: false,
		},
		ogImage: {
			type: 'string',
			description: 'Open Graph Image of the blog post',
		},
		slug: {
			type: 'string',
		},
	},
	computedFields: blogComputedFields,
}))

const projectComputedFields: ComputedFields = {
	slug: {
		type: 'string',
		resolve: (project) =>
			`${project._raw.sourceFileName
				.replace(/\.mdx/, '')
				.replace(/\s/g, '-')}`,
	},
}

export const Project = defineDocumentType(() => ({
	name: 'Project',
	filePathPattern: 'project/*.mdx',
	contentType: 'mdx',
	fields: {
		title: {
			type: 'string',
			description: 'Title of the blog post',
			required: true,
		},
		description: {
			type: 'string',
			description: 'Summary of the blog post',
			required: false,
		},
		publishedAt: {
			type: 'string',
			description: 'Published date of the post',
			required: true,
		},
		coverImg: {
			type: 'string',
			required: false,
		},
		stack: {
			type: 'string',
			required: false,
		},
		ogImage: {
			type: 'string',
			description: 'Open Graph Image of the blog post',
		},
	},
	computedFields: projectComputedFields,
}))

export default makeSource({
	contentDirPath: 'data',
	documentTypes: [Blog, Project],
	mdx: {
		remarkPlugins: [remarkMdxFrontmatter, remarkGfm],
		rehypePlugins: [
			rehypeSlug,
			rehypeCodeTitles,
			rehypePrismPlus,
			[
				rehypeAutolinkHeadings,
				{
					behavior: 'wrap',
					properties: {
						class: ['anchor'],
						tabIndex: -1,
						ariaHidden: true,
					},
				},
			],
		],
	},
})
