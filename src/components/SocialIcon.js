import Github from '@/lib/social-icons/github.svg'
import LinkedIn from '@/lib/social-icons/linkedin.svg'
import Gmail from '@/lib/social-icons/gmail.svg'
import Link from '@/components/Link'

const components = {
	mail: Gmail,
	github: Github,
	linkedin: LinkedIn,
}

const SocialIcon = ({ kind, href, size = 8 }) => {
	if (
		!href ||
		(kind === 'mail' &&
			!/^mailto:\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(href))
	)
		return null

	const SocialSvg = components[kind]
	return (
		<Link
			className='flex text-sm hover:text-gray-600'
			target='_blank'
			rel='noopener noreferrer'
			href={href}>
			<span className='sr-only'>{kind}</span>
			<SocialSvg
				className={`fill-current hover:text-amber-500  h-${size} w-${size}`}
			/>
		</Link>
	)
}

export default SocialIcon
