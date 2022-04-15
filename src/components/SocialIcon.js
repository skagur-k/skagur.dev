import Github from '@/lib/icons/github.svg'
import LinkedIn from '@/lib/icons/linkedin.svg'
import Gmail from '@/lib/icons/gmail.svg'
import Link from '@/components/Link'

const components = {
	mail: Gmail,
	github: Github,
	linkedin: LinkedIn,
}

const SocialIcon = ({ kind, href, size }) => {
	if (kind == 'mail') {
		href = `mailto:${href}`
	}

	const sizes = `w-${size}`
	const SocialSvg = components[kind]
	return (
		<Link href={href}>
			<span className='sr-only'>{kind}</span>
			<SocialSvg
				className={`w-${size} h-${size} fill-current hover:text-amber-500 transition-color duration-300`}
			/>
		</Link>
	)
}

export default SocialIcon
