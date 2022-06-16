import {
	SiJavascript,
	SiNextdotjs,
	SiTailwindcss,
	SiTypescript,
} from 'react-icons/si'

const icons = {
	nextjs: (
		<SiNextdotjs data-tip='Next.js' className='w-6 h-6 hover:text-gray-300' />
	),
	typescript: (
		<SiTypescript
			data-tip='TypeScript'
			className='w-6 h-6 hover:text-[#3178C6]'
		/>
	),
	javascript: (
		<SiJavascript
			data-tip='JavaScript'
			className='w-6 h-6 hover:text-[#F7DF1E]'
		/>
	),
	tailwind: (
		<SiTailwindcss
			data-tip='Tailwind CSS'
			className='w-6 h-6 hover:text-[#06B6D4]'
		/>
	),
}

const Projects = [
	{
		id: 1,
		name: 'skagur.dev',
		slug: 'skagurdev',
		description: 'This is a description for the project',
		stacks: [
			{ name: 'Next.JS', icon: icons.nextjs },
			{ name: 'JavaScript', icon: icons.javascript },
			{ name: 'Tailwind CSS', icon: icons.tailwind },
		],
	},
	{
		id: 2,
		name: 'Project 2',
		slug: 'leagueoflegens',
		description: 'This is a description for the project',
		stacks: [
			{ name: 'Next.JS', icon: icons.nextjs },
			{ name: 'JavaScript', icon: icons.javascript },
			{ name: 'Tailwind CSS', icon: icons.tailwind },
		],
	},
	{
		id: 3,
		name: 'Project 3',
		slug: 'skagurdev',
		description: 'This is a description for the project',
		stacks: [
			{ name: 'Next.JS', icon: icons.nextjs },
			{ name: 'JavaScript', icon: icons.javascript },
			{ name: 'Tailwind CSS', icon: icons.tailwind },
		],
	},
]

export default Projects
