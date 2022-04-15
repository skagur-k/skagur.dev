import Link from 'next/link'
import { ChevronRightIcon, ExternalLinkIcon } from '@heroicons/react/solid'

const CustomLink = ({ href, ...rest }) => {
	const isInternalLink = href && href.startsWith('/')
	const isAnchorLink = href && href.startsWith('#')

	if (isInternalLink) {
		return (
			<Link href={href} passHref={true} $scroll={false}>
				<a {...rest} />
			</Link>
		)
	}

	if (isAnchorLink) {
		return <a href={href} {...rest} />
	}

	return <a target='_blank' rel='noopener noreferrer' href={href} {...rest} />
}

export const DecoratedLink = ({ children, href, ...rest }) => {
	return (
		<Link href={href} passHref={true}>
			<a
				{...rest}
				className='z-0 relative  rounded-md before:absolute before:z-[-1] before:top-full before:left-0 before:right-0 before:-bottom-0.5 before:rounded-md before:bg-amber-500 hover:before:top-0 before:transition-all before:delay-75 before:duration-100'>
				<div className='flex px-2 py-1 justify-center items-center font-semibold'>
					{children}
					<ChevronRightIcon className='w-6 h-6' />
				</div>
			</a>
		</Link>
	)
}

export const ExternalLink = ({ children, href, ...rest }) => {
	return (
		<a
			target='_blank'
			rel='noopener noreferrer'
			href={href}
			className='z-0 flex md:ml-auto text-lg font-bold items-center justify-center overflow-hidden py-1 relative rounded-md before:absolute before:z-[-1] before:top-full before:left-0 before:right-0 before:-bottom-0.5 before:rounded-md before:bg-amber-500 hover:before:top-0 before:transition-all before:delay-75 before:duration-100'
			{...rest}>
			<div className='inline-flex px-1 space-x-2'>
				<span>{children}</span>
				<span>↗</span>
			</div>
		</a>
	)
}

export default CustomLink
