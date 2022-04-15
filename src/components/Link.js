import Link from 'next/link'
import { ChevronRightIcon, ExternalLinkIcon } from '@heroicons/react/solid'

const CustomLink = ({ children, href, ...rest }) => {
	const isInternalLink = href && href.startsWith('/')
	const isAnchorLink = href && href.startsWith('#')

	if (isInternalLink) {
		return (
			<Link href={href} passHref={true} $scroll={false}>
				<a {...rest}>{children} </a>
			</Link>
		)
	}

	if (isAnchorLink) {
		return (
			<a href={href} {...rest}>
				{children}
			</a>
		)
	}

	return (
		<a target='_blank' rel='noopener noreferrer' href={href} {...rest}>
			{children}
		</a>
	)
}

const DecoratedLink = ({ href, ...rest }) => {
	return (
		<a
			href={href}
			className='z-0 leading-none mx-1 p-1 text-base font-bold items-center justify-center overflow-hidden relative rounded-md before:absolute before:z-[-1] before:top-full before:left-0 before:right-0 before:-bottom-0.5 before:rounded-md before:bg-opacity-80 before:bg-amber-500 hover:before:top-0 before:transition-all before:delay-75 before:duration-100'
			{...rest}
		/>
	)
}

export const InternalLink = ({ children, href, ...rest }) => {
	return (
		<Link href={href} passHref={true}>
			<DecoratedLink>
				<div className='inline-flex items-center space-x-1'>
					{children}
				</div>
			</DecoratedLink>
		</Link>
	)
}

export const ExternalLink = ({ children, href, ...rest }) => {
	return (
		<DecoratedLink href={href} target='_blank' rel='noopener noreferrer'>
			<div className='inline-flex items-center space-x-1'>
				{children}
				<ExternalLinkIcon />
			</div>
		</DecoratedLink>
	)
}

export default CustomLink
