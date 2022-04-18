import {
	defineDocumentType,
	makeSource,
	ComputedFields,
} from 'contentlayer/source-files'
import { h, s } from 'hastscript'
import readingTime from 'reading-time'
import rehypePrism from 'rehype-prism'
import remarkGfm from 'remark-gfm'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import remarkToc from 'remark-toc'
import { remarkMdxFrontmatter } from 'remark-mdx-frontmatter'
import { remarkCodeHike } from '@code-hike/mdx'
import rehypeSlug from 'rehype-slug'
import rehypeCodeTitles from 'rehype-code-titles'
import theme from 'shiki/themes/github-light.json' assert { type: 'json' }

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
	contentType: 'mdx',
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
		tags: {
			type: 'string',
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
	},
	computedFields,
}))

export default makeSource({
	contentDirPath: 'data',
	documentTypes: [Blog],
	mdx: {
		remarkPlugins: [
			[remarkToc, { heading: 'Contents' }],
			remarkMdxFrontmatter,
			remarkGfm,
		],
		rehypePlugins: [
			rehypeSlug,
			rehypeCodeTitles,
			[
				rehypeAutolinkHeadings,
				{
					behavior: 'wrap',
					properties: {
						class: 'anchor',
						ariaHidden: true,
						tabIndex: -1,
					},
					content: [h('p.class-name', 'This is a link')],
				},
			],
			rehypePrism,
		],
	},
})
