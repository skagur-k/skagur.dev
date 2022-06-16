import {
	SiJavascript,
	SiNextdotjs,
	SiTailwindcss,
	SiTypescript,
} from 'react-icons/si'
import ProjectCard from './ProjectCard'

function FeaturedProjects() {
	return (
		<div>
			<h1 className='font-black text-3xl'>Featured Projects</h1>
			<div className='mt-10'>
				{projects.map((project) => (
					<ProjectCard project={project} key={project.id} />
				))}
			</div>
		</div>
	)
}

export const color = {
	typescript: 'text-blue-500',
}

export const icons = {
	nextjs: (
		<SiNextdotjs data-tip='Next.js' className='w-5 h-5 hover:text-gray-300' />
	),
	typescript: (
		<SiTypescript
			data-tip='TypeScript'
			className='w-5 h-5 hover:text-[#3178C6]'
		/>
	),
	javascript: (
		<SiJavascript
			data-tip='JavaScript'
			className='w-5 h-5 hover:text-[#F7DF1E]'
		/>
	),
	tailwind: (
		<SiTailwindcss
			data-tip='Tailwind CSS'
			className='w-5 h-5 hover:text-[#06B6D4]'
		/>
	),
}

const projects = [
	{
		id: 1,
		name: 'skagur.dev',
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
		description: 'This is a description for the project',
		stacks: [
			{ name: 'Next.JS', icon: icons.nextjs },
			{ name: 'JavaScript', icon: icons.javascript },
			{ name: 'Tailwind CSS', icon: icons.tailwind },
		],
	},
]

export default FeaturedProjects
