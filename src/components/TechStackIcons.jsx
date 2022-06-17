import {
	SiReact,
	SiJava,
	SiC,
	SiRust,
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
	SiYarn,
	SiNpm,
	SiPowershell,
	SiLatex,
} from 'react-icons/si'

const SiContentLayer = () => {
	return (
		<svg
			width='16'
			height='16'
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
	)
}

const badges = {
	react: {
		icon: SiReact,
		bg: 'bg-gray-700',
		iconColor: 'text-[#61DAFB]',
		textColor: 'text-white',
		text: 'React JS',
	},
	nodejs: {
		icon: SiNodedotjs,
		bg: 'bg-green-700',
		iconColor: 'text-white',
		textColor: 'text-white',
		text: 'Node JS',
	},
	springboot: {
		icon: SiSpringboot,
		bg: 'bg-green-800',
		iconColor: 'text-white',
		textColor: 'text-white',
		text: 'Spring Boot',
	},
	nextjs: {
		icon: SiNextdotjs,
		bg: 'bg-gray-700',
		iconColor: 'text-white',
		textColor: 'text-white',
		text: 'Next JS',
	},
	java: {
		icon: SiJava,
		bg: 'bg-red-800',
		iconColor: 'text-white',
		textColor: 'text-white',
		text: 'Java',
	},
	c: {
		icon: SiC,
		bg: 'bg-slate-400',
		iconColor: 'text-black',
		textColor: 'text-black',
		text: 'C Language',
	},
	rust: {
		icon: SiRust,
		bg: 'bg-gray-600',
		iconColor: 'text-white',
		textColor: 'text-white',
		text: 'Rust',
	},
	javascript: {
		icon: SiJavascript,
		bg: 'bg-yellow-600',
		iconColor: 'text-white',
		textColor: 'text-white',
		text: 'JavaScript',
	},
	latex: {
		icon: SiLatex,
		bg: 'bg-teal-800',
		iconColor: 'text-white',
		textColor: 'text-white',
		text: 'LaTeX',
	},
	html5: {
		icon: SiHtml5,
		bg: 'bg-orange-600',
		iconColor: 'text-white',
		textColor: 'text-white',
		text: 'HTML',
	},
	flutter: {
		icon: SiFlutter,
		bg: 'bg-[#02569B]',
		iconColor: 'text-white',
		textColor: 'text-white',
		text: 'Flutter',
	},
	contentlayer: {
		icon: SiContentLayer,
		bg: 'bg-gray-100',
		iconColor: 'text-white',
		textColor: 'text-black',
		text: 'ContentLayer',
	},
	aws: {
		icon: SiAmazonaws,
		bg: 'bg-orange-600',
		iconColor: 'text-white',
		textColor: 'text-white',
		text: 'Amazon AWS',
	},
	awscertified: {
		icon: SiAmazonaws,
		bg: 'bg-orange-600',
		iconColor: 'text-white',
		textColor: 'text-white',
		text: 'Amazon AWS Certified Cloud Practitioner',
	},
	python: {
		icon: SiPython,
		bg: 'bg-cyan-900',
		iconColor: 'text-yellow-500',
		textColor: 'text-white',
		text: 'Python',
	},
	linux: {
		icon: SiLinux,
		bg: 'bg-yellow-500',
		iconColor: 'text-black',
		textColor: 'text-black',
		text: 'Linux',
	},
	github: {
		icon: SiGithub,
		bg: 'bg-gray-700',
		iconColor: 'text-white',
		textColor: 'text-white',
		text: 'GitHub',
	},
	vercel: {
		icon: SiVercel,
		bg: 'bg-gray-100',
		iconColor: 'text-black',
		textColor: 'text-black',
		text: 'Vercel',
	},
	bash: {
		icon: SiGnubash,
		bg: 'bg-gray-600',
		iconColor: 'text-[#4EAA25]',
		textColor: 'text-[#4EAA25]',
		text: 'Bash',
	},
	tailwind: {
		icon: SiTailwindcss,
		bg: 'bg-[#069db8]',
		iconColor: 'text-white',
		textColor: 'text-white',
		text: 'Tailwind CSS',
	},
	powershell: {
		icon: SiPowershell,
		bg: 'bg-[#5391FE]',
		iconColor: 'text-white',
		textColor: 'text-white',
		text: 'Powershell',
	},
	vscode: {
		icon: SiVisualstudiocode,
		bg: 'bg-[#5391FE]',
		iconColor: 'text-white',
		textColor: 'text-white',
		text: 'Visual Studio Code',
	},
	postman: {
		icon: SiPostman,
		bg: 'bg-[#FF6C37]',
		iconColor: 'text-white',
		textColor: 'text-white',
		text: 'Postman',
	},
	webpack: {
		icon: SiWebpack,
		bg: 'bg-[#8DD6F9]',
		iconColor: 'text-gray-800',
		textColor: 'text-gray-800',
		text: 'Webpack',
	},
	yarn: {
		icon: SiYarn,
		bg: 'bg-[#2C8EBB]',
		iconColor: 'text-white',
		textColor: 'text-white',
		text: 'Yarn',
	},
	npm: {
		icon: SiNpm,
		bg: 'bg-[#CB3837]',
		iconColor: 'text-white',
		textColor: 'text-white',
		text: 'NPM',
	},

	more: {
		icon: null,
		bg: 'bg-white',
		iconColor: 'text-black',
		textColor: 'text-black',
		text: 'More to Come 🚀',
	},
}

const BadgeTemplate = ({ icon, bg, iconColor, textColor, children }) => {
	const Icon = icon
	return (
		<div
			className={`flex h-6 items-center space-x-2 px-2 cursor-pointer ${bg} rounded-md shadow-lg shadow-black/30 dark:shadow-gray-500/30`}>
			{Icon && <Icon className={`text-base ${iconColor}`} />}
			<h2 className={`text-sm font-semibold ${textColor}`}>{children}</h2>
		</div>
	)
}

const Badge = ({ name }) => {
	const badge = badges[name]
	return (
		<BadgeTemplate
			icon={badge.icon}
			bg={badge.bg}
			iconColor={badge.iconColor}
			textColor={badge.textColor}>
			{badge.text}
		</BadgeTemplate>
	)
}

export default Badge
