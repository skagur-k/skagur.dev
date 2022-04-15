import {
	defineDocumentType,
	makeSource,
	defineNestedType,
} from 'contentlayer/source-files'
import readingTime from 'reading-time'

export const Blog = defineDocumentType(() => ({
	name: 'Blog',
	filePathPattern: 'blog/*.mdx',
	bodyType: 'mdx',
	fields: {
		title: { type: 'string', required: true },
		publishedAt: { type: 'string', required: true },
		description: { type: 'string', required: false },
		isDraft: { type: 'boolean', default: true },
		ogImage: { type: 'string' },
		// tags: { type: 'list', default: 'string' },
	},
	computedFields: {
		readingTime: {
			type: 'json',
			resolve: (blog) => readingTime(blog.body.raw),
		},
		slug: {
			type: 'string',
			resolve: (blog) => blog._raw.sourceFileName.replace(/\.mdx/, ''),
		},
	},
}))

export default makeSource({
	contentDirPath: 'data',
	documentTypes: [Blog],
	mdx: {
		remarkPlugins: [],
		rehypePlugins: [],
	},
})
