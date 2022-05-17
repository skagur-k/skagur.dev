import { SiGithub, SiLinkedin, SiMaildotru } from 'react-icons/si'
import Link from '@/components/Link'

const components = {
	mail: SiMaildotru,
	github: SiGithub,
	linkedin: SiLinkedin,
}

const SocialIcon = ({ kind, href, size }) => {
	if (!kind) return null

	if (kind == 'mail') {
		href = `mailto:${href}`
	}

	const SocialSvg = components[kind]
	return (
		<Link href={href}>
			<span className='sr-only'>{kind}</span>
			<SocialSvg
				className={`w-${size} h-${size}  hover:text-amber-500 transition-color duration-300`}
			/>
		</Link>
	)
}

export default SocialIcon
