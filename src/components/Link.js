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

export const DecoratedLink = ({ href, ...rest }) => {
	return (
		<a
			target='_blank'
			rel='noopener noreferrer'
			href={href}
			className='z-0 leading-none mx-2 p-1 text-base font-bold items-center justify-center overflow-hidden relative rounded-md before:absolute before:z-[-1] before:top-full before:left-0 before:right-0 before:-bottom-0 before:rounded-md before:bg-opacity-80 before:bg-amber-500 hover:before:top-0 before:transition-all before:delay-75 before:duration-100'
			{...rest}
		/>
	)
}

export const InternalLink = ({ children, href, ...rest }) => {
	return (
		<DecoratedLink href={href}>
			<div className='inline-flex items-center space-x-1'>
				<span>{children}</span>
				<svg
					className='h-5 w-5'
					fill='none'
					viewBox='0 0 24 24'
					stroke='currentColor'
					strokeWidth={2}>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z'
					/>
				</svg>
			</div>
		</DecoratedLink>
	)
}

export const ExternalLink = ({ children, href, ...rest }) => {
	return (
		<DecoratedLink href={href}>
			<div className='inline-flex items-center space-x-1'>
				<span>{children}</span>
				<svg
					className='h-5 w-5'
					fill='none'
					viewBox='0 0 24 24'
					stroke='currentColor'
					strokeWidth={2}
					strokeLinecap='round'
					strokeLinejoin='round'>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
					/>
				</svg>
			</div>
		</DecoratedLink>
	)
}

export default CustomLink
