import awsbadge from '@/public/static/images/aws_ccp_badge.png'
import Image from 'next/image'
import {
	SiReact,
	SiJava,
	SiNodedotjs,
	SiSpringboot,
	SiNextdotjs,
	SiHtml5,
	SiJavascript,
	SiAmazonaws,
	SiPython,
	SiLinux,
	SiGithub,
	SiVercel,
	SiTailwindcss,
	SiGnubash,
	SiVisualstudiocode,
	SiPostman,
	SiWebpack,
	SiFlutter,
} from 'react-icons/si'

const ReactBadge = () => {
	return (
		<div
			className={`flex items-center space-x-2 py-2 px-3 cursor-pointer bg-gray-700 rounded-md shadow-lg shadow-gray-700/50`}>
			<SiReact className='text-2xl text-[#61DAFB]' />
			<h2 className={`text-base font-medium text-white`}>React JS</h2>
		</div>
	)
}

const NodeBadge = () => {
	return (
		<div
			className={`flex items-center space-x-2 py-2 px-3 cursor-pointer bg-green-700 rounded-md shadow-lg shadow-green-700/40`}>
			<SiNodedotjs className='text-2xl text-white stroke-[0.5px]' />
			<h2 className={`text-base font-medium text-white`}>Node JS</h2>
		</div>
	)
}

const BootBadge = () => {
	return (
		<div
			className={`flex items-center space-x-2 py-2 px-3 cursor-pointer bg-green-800 rounded-md shadow-lg shadow-green-800/40`}>
			<SiSpringboot className='text-2xl text-white stroke-[0.5px]' />
			<h2 className={`text-base font-medium text-white`}>Spring Boot</h2>
		</div>
	)
}

const NextBadge = () => {
	return (
		<div
			className={`flex items-center space-x-2 py-2 px-3 cursor-pointer bg-gray-700 rounded-md shadow-lg shadow-gray-700/40`}>
			<SiNextdotjs className='text-2xl text-white stroke-[0.5px]' />
			<h2 className={`text-base font-medium text-white`}>Next JS</h2>
		</div>
	)
}

const JavaBadge = () => {
	return (
		<div
			className={`flex items-center space-x-2 py-2 px-3 cursor-pointer bg-amber-700 rounded-md shadow-lg shadow-amber-700/40`}>
			<SiJava className='text-2xl text-white stroke-[0.4px]' />
			<h2 className={`text-base font-medium text-white`}>Java</h2>
		</div>
	)
}

const HTMLBadge = () => {
	return (
		<div
			className={`flex items-center space-x-2 py-2 px-3 cursor-pointer bg-red-700 rounded-md shadow-lg shadow-red-700/40`}>
			<SiHtml5 className='text-2xl text-white' />
			<h2 className={`text-base font-medium text-white`}>HTML</h2>
		</div>
	)
}

const JSBadge = () => {
	return (
		<div
			className={`flex items-center space-x-2 py-2 px-3 cursor-pointer bg-yellow-600 rounded-md shadow-lg shadow-yellow-600/40`}>
			<SiJavascript className='text-2xl text-white' />
			<h2 className={`text-base font-medium text-white`}>Javascript</h2>
		</div>
	)
}

const FlutterBadge = () => {
	return (
		<div
			className={`flex items-center space-x-2 py-2 px-3 cursor-pointer bg-[#02569B] rounded-md shadow-lg shadow-[#02569B]/40`}>
			<SiFlutter className='text-2xl text-white' />
			<h2 className={`text-base font-medium text-white`}>Flutter</h2>
		</div>
	)
}

const ContentLayerBadge = () => {
	return (
		<div
			className={`flex items-center space-x-2 py-2 px-3 cursor-pointer bg-white rounded-md shadow-lg shadow-gray-500/40`}>
			<svg
				width='22'
				height='24'
				viewBox='0 0 22 24'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'>
				<path
					fillRule='evenodd'
					clipRule='evenodd'
					d='M10.43 0.92268C11.1426 0.398115 12.1177 0.407491 12.82 0.945665L19.9928 6.44198C21.0266 7.23419 21.0266 8.78771 19.9928 9.57992L17.2573 11.6761L20.0379 13.9037C21.0493 14.7139 21.022 16.2574 19.9826 17.0315L12.62 22.5153C11.8634 23.0788 10.8134 23.0332 10.1089 22.4063L4.34789 17.2802L3.54224 16.5903C-0.0530112 13.5114 0.390183 7.84094 4.41274 5.35212L10.43 0.92268ZM16.1955 10.8254L12.8515 8.14659C12.1375 7.57457 11.1235 7.56365 10.3972 8.12017L7.92298 10.0161C6.88913 10.8084 6.88913 12.3619 7.92298 13.1541L10.4154 15.064C11.129 15.6108 12.1224 15.6108 12.836 15.064L16.1773 12.5036L19.2086 14.932C19.5457 15.2021 19.5366 15.7166 19.1901 15.9747L11.8275 21.4585C11.5753 21.6463 11.2253 21.6311 10.9905 21.4221L5.2248 16.2918L4.40495 15.5895C1.48255 13.0869 1.84941 8.47338 5.13088 6.46078L5.15471 6.44617L11.2165 1.98398C11.454 1.80913 11.779 1.81225 12.0132 1.99164L19.1859 7.48796C19.5305 7.75203 19.5305 8.26987 19.1859 8.53394L16.1955 10.8254ZM15.1155 11.653L12.0291 14.018C11.7913 14.2003 11.4601 14.2003 11.2223 14.018L8.72984 12.1081C8.38523 11.844 8.38523 11.3262 8.72984 11.0621L11.2041 9.16615C11.4462 8.98065 11.7842 8.98429 12.0222 9.17496L15.1155 11.653Z'
					fill='#7C3AED'
					stroke='#7C3AED'
					strokeWidth='0.8'></path>
			</svg>
			<h2 className={`text-base font-semibold text-[#7C3AED]`}>
				Content Layer
			</h2>
		</div>
	)
}

const AWSBadge = () => {
	return (
		<div
			className={`flex items-center space-x-2 py-2 px-3 cursor-pointer bg-orange-600 rounded-md shadow-lg shadow-orange-600/40`}>
			<SiAmazonaws className='text-2xl text-white stroke-[0.4px]' />
			<h2 className={`text-base font-medium text-white`}>AWS</h2>
		</div>
	)
}

const AWSCertifiedBadge = () => {
	return (
		<div
			className={`flex items-center space-x-2 py-2 px-3 cursor-pointer bg-orange-600 rounded-md shadow-lg shadow-orange-600/40`}>
			<SiAmazonaws className='text-2xl text-white stroke-[0.4px]' />
			<h2 className={`text-base font-medium text-white`}>
				AWS Certified Cloud Practitioner
			</h2>
		</div>
	)
}

const PythonBadge = () => {
	return (
		<div
			className={`flex items-center space-x-2 py-2 px-3 cursor-pointer bg-cyan-900 rounded-md shadow-lg shadow-cyan-900/40`}>
			<SiPython className='text-2xl text-yellow-500' />
			<h2 className={`text-base font-medium text-white`}>Python</h2>
		</div>
	)
}

const LinuxBadge = () => {
	return (
		<div
			className={`flex items-center space-x-2 py-2 px-3 cursor-pointer bg-yellow-500 rounded-md shadow-lg shadow-yellow-500/40`}>
			<SiLinux className='text-2xl text-black stroke-[0.4px]' />
			<h2 className={`text-base font-medium text-black`}>Linux</h2>
		</div>
	)
}

const GitHubBadge = () => {
	return (
		<div
			className={`flex items-center space-x-2 py-2 px-3 cursor-pointer bg-gray-700 rounded-md shadow-lg shadow-gray-700/40`}>
			<SiGithub className='text-2xl text-white' />
			<h2 className={`text-base font-medium text-white`}>GitHub</h2>
		</div>
	)
}

const VercelBadge = () => {
	return (
		<div
			className={`flex items-center space-x-2 py-2 px-3 cursor-pointer bg-gray-100 rounded-md shadow-lg shadow-gray-800/20 `}>
			<SiVercel className='text-2xl text-black' />
			<h2 className={`text-base font-semibold text-black`}>Vercel</h2>
		</div>
	)
}

const TailwindBadge = () => {
	return (
		<div
			className={`flex items-center space-x-2 py-2 px-3 cursor-pointer bg-[#069db8] rounded-md shadow-lg shadow-[#069db8]/40`}>
			<SiTailwindcss className='text-2xl text-white' />
			<h2 className={`text-base font-semibold text-white`}>
				Tailwind CSS
			</h2>
		</div>
	)
}

const BashBadge = () => {
	return (
		<div
			className={`flex items-center space-x-2 py-2 px-3 cursor-pointer bg-gray-600 rounded-md shadow-lg shadow-gray-600/40`}>
			<SiGnubash className='text-2xl text-[#4EAA25] stroke-[0.4px]' />
			<h2 className={`text-base font-semibold text-[#4EAA25]`}>
				Shell Script
			</h2>
		</div>
	)
}

const VSCBadge = () => {
	return (
		<div
			className={`flex items-center space-x-2 py-2 px-3 cursor-pointer bg-[#007ACC] rounded-md shadow-lg shadow-[#007ACC]/40`}>
			<SiVisualstudiocode className='text-2xl text-white' />
			<h2 className={`text-base font-semibold text-white`}>
				Visual Studio Code
			</h2>
		</div>
	)
}

const PostmanBadge = () => {
	return (
		<div
			className={`flex items-center space-x-2 py-2 px-3 cursor-pointer bg-[#FF6C37] rounded-md shadow-lg shadow-[#FF6C37]/40`}>
			<SiPostman className='text-2xl text-white' />
			<h2 className={`text-base font-semibold text-white`}>Postman</h2>
		</div>
	)
}

const WebpackBadge = () => {
	return (
		<div
			className={`flex items-center space-x-2 py-2 px-3 cursor-pointer bg-[#8DD6F9] rounded-md shadow-lg shadow-[#8DD6F9]/40`}>
			<SiWebpack className='text-2xl text-gray-800' />
			<h2 className={`text-base font-semibold text-gray-800`}>Webpack</h2>
		</div>
	)
}

const MoreBadge = () => {
	return (
		<div
			className={`flex items-center space-x-2 py-2 px-3 cursor-pointer bg-gray-700 rounded-md shadow-lg shadow-gray-700/40`}>
			<h2 className={`text-base font-semibold text-white`}>
				More to come...🏃🏻‍♂️🏃🏻🏃🏻
			</h2>
		</div>
	)
}
const Badges = {
	ReactBadge,
	JavaBadge,
	AWSBadge,
	AWSCertifiedBadge,
	NodeBadge,
	BootBadge,
	NextBadge,
	FlutterBadge,
	HTMLBadge,
	JSBadge,
	PythonBadge,
	LinuxBadge,
	GitHubBadge,
	VercelBadge,
	TailwindBadge,
	BashBadge,
	VSCBadge,
	PostmanBadge,
	WebpackBadge,
	ContentLayerBadge,
	MoreBadge,
}

export default Badges
