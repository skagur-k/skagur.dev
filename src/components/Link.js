import Link from 'next/link'
import { ExternalLinkIcon } from '@heroicons/react/solid'

const CustomLink = ({ href, ...rest }) => {
	const isInternalLink = href && href.startsWith('/')
	const isAnchorLink = href && href.startsWith('#')

	if (isInternalLink) {
		return (
			<Link href={href} passHref={true}>
				<a {...rest} />
			</Link>
		)
	}

	if (isAnchorLink) {
		return <a href={href} {...rest} />
	}

	return <a target='_blank' rel='noopener noreferrer' href={href} {...rest} />
}

export const ExternalLink = ({ children, href, ...rest }) => {
	return (
		<a
			target='_blank'
			rel='noopener noreferrer'
			href={href}
			className='font-semibold rounded-md hover:text-amber-500'
			{...rest}>
			<div className='inline-flex px-1 space-x-1'>
				<span>{children}</span>
				<ExternalLinkIcon className='w-6 h-6' />
			</div>
		</a>
	)
}

export default CustomLink
