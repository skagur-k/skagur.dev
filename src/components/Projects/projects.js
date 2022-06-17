import {
	SiC,
	SiJavascript,
	SiNextdotjs,
	SiTailwindcss,
	SiTypescript,
	SiVercel,
} from 'react-icons/si'

import Project1Cover from '@/public/static/images/projects/skagurdev.webp'
import Project1CoverDark from '@/public/static/images/projects/skagurdev-dark.webp'
import Project1 from '@/components/Projects/projectDetails/Project1'

const icons = {
	nextjs: <SiNextdotjs data-tip='Next.js' className='w-6 h-6' />,
	typescript: <SiTypescript data-tip='TypeScript' className='w-6 h-6' />,
	javascript: <SiJavascript data-tip='JavaScript' className='w-6 h-6' />,
	tailwind: <SiTailwindcss data-tip='Tailwind CSS' className='w-6 h-6' />,
	vercel: <SiVercel data-tip='Vercel' className='w-6 h-6' />,
	contentlayer: <SiC data-tip='ContentLayer' className='w-6 h-6' />,
}

const Projects = [
	{
		id: 1,
		name: 'skagur.dev',
		slug: 'skagurdev',
		period: 'May 2022 ~ Present',
		summary: 'Portfolio website developed with Next.JS and Tailwind CSS.',
		description: <Project1 />,
		githubRepo: 'https://github.com/skagur-k/skagur.dev',
		projectUrl: '/',
		coverimage: Project1Cover,
		coverimagedark: Project1CoverDark,
		stacks: [
			{ name: 'Next.JS', icon: icons.nextjs, url: 'https://nextjs.org/' },
			{
				name: 'JavaScript',
				icon: icons.javascript,
			},
			{
				name: 'Tailwind CSS',
				icon: icons.tailwind,
				url: 'https://tailwindcss.com/',
			},
			{ name: 'TypeScript', icon: icons.typescript },
			{ name: 'Vercel', icon: icons.vercel, url: 'https://vercel.com' },
			{
				name: 'ContentLayer',
				icon: icons.contentlayer,
				url: 'https://contentlayer.dev',
			},
		],
	},
	{
		id: 2,
		name: 'skagur.dev',
		slug: 'skagurdev',
		period: 'May 2022 ~ Present',
		summary: 'Portfolio website developed with Next.JS and Tailwind CSS.',
		description: <Project1 />,
		githubRepo: 'https://github.com/skagur-k/skagur.dev',
		projectUrl: '/',
		coverimage: Project1Cover,
		coverimagedark: Project1CoverDark,
		stacks: [
			{ name: 'Next.JS', icon: icons.nextjs },
			{ name: 'JavaScript', icon: icons.javascript },
			{ name: 'Tailwind CSS', icon: icons.tailwind },
			{ name: 'TypeScript', icon: icons.typescript },
			{ name: 'Vercel', icon: icons.vercel },
			{ name: 'ContentLayer', icon: icons.contentlayer },
		],
	},
	,
]

export default Projects
