import {
	SiC,
	SiJavascript,
	SiNextdotjs,
	SiTailwindcss,
	SiTypescript,
	SiVercel,
} from 'react-icons/si'

export const icons = {
	nextjs: <SiNextdotjs data-tip='Next.js' className='text-sm' />,
	typescript: <SiTypescript data-tip='TypeScript' className='text-sm' />,
	javascript: <SiJavascript data-tip='JavaScript' className='text-sm' />,
	tailwind: <SiTailwindcss data-tip='Tailwind CSS' className='text-sm' />,
	vercel: <SiVercel data-tip='Vercel' className='text-sm' />,
	contentlayer: <SiC data-tip='ContentLayer' className='text-sm' />,
}

const Tag = ({ text }) => {
	const techname = text.split(' ').join('').toLowerCase()
	const Icon = icons[techname]
	return (
		<div className='inline-flex items-center justify-center space-x-1 mr-3 text-xs font-semibold uppercase px-3 py-1 rounded-full ring-1 ring-sky-500'>
			<span className='hidden sm:flex'>{Icon && Icon}</span>
			<span className=''>{text.split(' ').join('-')}</span>
		</div>
	)
}

export default Tag
