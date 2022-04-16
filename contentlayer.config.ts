import {
	defineDocumentType,
	makeSource,
	ComputedFields,
} from 'contentlayer/source-files'

import readingTime from 'reading-time'
import rehypePrism from 'rehype-prism'

const computedFields: ComputedFields = {
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
	bodyType: 'mdx',
	fields: {
		title: {
			type: 'string',
			description: 'Title of the blog post',
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
		isDraft: {
			type: 'boolean',
			description: 'If the post is a draft',
			default: true,
		},
		ogImage: {
			type: 'string',
			description: 'Open Graph Image of the blog post',
		},
		// tags: { type: 'list', default: 'string' },
	},
	computedFields,
}))

export default makeSource({
	contentDirPath: 'data',
	documentTypes: [Blog],
	mdx: {
		remarkPlugins: [],
		rehypePlugins: [rehypePrism],
	},
})
