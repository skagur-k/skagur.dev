import Image from 'next/image'
import Link from 'next/link'

import { FaLink } from 'react-icons/fa'

export const Title = (props) => (
	<h1
		{...props}
		className='text-2xl md:text-4xl font-extrabold leading-10 mb-12 text-center '
	/>
)

const a = (props) => {
	const href = props.href
	const isInternalLink =
		href && (href.startsWith('/') || href.startsWith('#'))

	if (isInternalLink) {
		return (
			<Link href={href}>
				<a {...props} className='no-underline'>
					{props.children}
				</a>
			</Link>
		)
	}

	return (
		<a
			target='_blank'
			rel='noopener noreferrer'
			className='no-underline'
			{...props}
		/>
	)
}

const A = ({ children, rest, href }) => {
	const isInternalLink =
		href && (href.startsWith('/') || href.startsWith('#'))

	if (isInternalLink) {
		return (
			<Link href={href} passHref={true}>
				<a
					href={href}
					className='z-0 w-fit text-base underline underline-offset-0 decoration-wavy decoration-amber-500 px-1 font-semibold overflow-hidden relative rounded-md'
					{...rest}>
					{children}
				</a>
			</Link>
		)
	}

	return (
		<a
			href={href}
			target='_blank'
			rel='noopener noreferrer'
			className='z-0 w-fit px-1 py-1 text-base font-semibold no-underline decoration-wavy underline-2 underline-amber-500 overflow-hidden relative rounded-md before:absolute before:z-[-1] before:top-full before:left-0 before:right-0 before:-bottom-0 before:rounded-md before:bg-opacity-80 before:bg-amber-500 hover:before:top-0 before:transition-all before:delay-75 before:duration-100'
			{...rest}>
			<div className='inline-flex items-center space-x-1'>
				<span>{children}</span>
				<FaLink className='w-3 h-3' />
			</div>
		</a>
	)
}

const h1 = (props) => (
	<div>
		<h1
			{...props}
			className='text-lg md:text-xl flex-wrap leading-10 font-bold my-8 border-l-4 border-l-amber-500 pl-4 no-underline'
		/>
	</div>
)

const h2 = (props) => (
	<h2
		{...props}
		className='text-lg md:text-xl font-bold my-4 border-b-2 border-b-amber-500 pb-1 inline-block no-underline'
	/>
)

const h3 = (props) => (
	<h3 {...props} className='text-lg md:text-lg font-bold my-4 no-underline' />
)

const ResponsiveImage = (props) => {
	return (
		<Image
			alt={props.alt}
			layout='responsive'
			className='w-full h-full'
			{...props}
		/>
	)
}

const MDXComponents = {
	h1,
	h2,
	h3,
	a,
	A,
	img: ResponsiveImage,
}

export default MDXComponents
