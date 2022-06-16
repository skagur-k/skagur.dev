import Link from 'next/link'
import { FaExternalLinkAlt } from 'react-icons/fa'

const CustomLink = ({ children, href, ...rest }) => {
	const isInternalLink = href && href.startsWith('/')
	const isAnchorLink = href && href.startsWith('#')

	if (isInternalLink) {
		return (
			<Link href={href} passHref={true} {...rest}>
				<a {...rest}>{children} </a>
			</Link>
		)
	}

	if (isAnchorLink) {
		return (
			<Link href={href} {...rest}>
				{children}
			</Link>
		)
	}

	return (
		<a target='_blank' rel='noopener noreferrer' href={href} {...rest}>
			{children}
		</a>
	)
}

export const InternalLink = ({ children, href, ...rest }) => {
	return (
		<Link href={href} passHref={true}>
			<a
				href={href}
				className='z-0 w-fit mx-1 p-1 text-base font-bold no-underline overflow-hidden relative rounded-md before:absolute before:z-[-1] before:top-full before:left-0 before:right-0 before:-bottom-0.5 before:rounded-md before:bg-opacity-80 before:bg-amber-500 hover:before:top-0 before:transition-all before:delay-75 before:duration-100'
				{...rest}>
				<div className='inline-flex items-center space-x-2'>{children}</div>
			</a>
		</Link>
	)
}

export const ExternalLink = ({ children, href, ...rest }) => {
	return (
		<a
			href={href}
			target='_blank'
			rel='noopener noreferrer'
			className='z-0 w-fit px-2 py-1 text-base font-bold overflow-hidden relative rounded-md before:absolute before:z-[-1] before:top-full before:left-0 before:right-0 before:bottom-0 before:rounded-md before:bg-opacity-80 before:bg-amber-500 hover:before:top-0 before:transition-all before:delay-75 before:duration-100'
			{...rest}>
			<div className='inline-flex items-center space-x-2'>
				<span>{children}</span>
				<FaExternalLinkAlt className='w-4 h-4' />
			</div>
		</a>
	)
}

export default CustomLink
