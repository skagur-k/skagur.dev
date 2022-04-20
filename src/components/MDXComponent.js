import Image from 'next/image'
import Link from 'next/link'
import { FaLink } from 'react-icons/fa'
import classNames from 'classnames'

export const Title = (props) => (
	<h1
		{...props}
		className='text-2xl md:text-5xl font-extrabold leading-12 mt-4 mb-6 text-center '
	/>
)

export const Author = ({ children, ...rest }) => {
	return (
		<div className='mb-12 '>
			<p
				className='text-base md:text-lg text-center font-semibold'
				{...rest}>
				{children}
			</p>
		</div>
	)
}

const a = ({ href, ...rest }) => {
	const isInternalLink =
		href && (href.startsWith('/') || href.startsWith('#'))

	if (isInternalLink) {
		return (
			<Link href={href}>
				<a {...rest} />
			</Link>
		)
	}

	return <a target='_blank' rel='noopener noreferrer' href={href} {...rest} />
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

const h1 = (props) => <h1 {...props} className='text-lg md:text-3xl' />

const h2 = (props) => <h2 {...props} className='text-lg md:text-xl' />

const h3 = (props) => <h3 {...props} className='text-lg md:text-lg' />

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

function pre(props) {
	const { className, children, ...rest } = { ...props }
	const childClassNames = classNames('relative', className)
	return (
		<pre className={childClassNames} {...rest}>
			<div className='hidden hover:absolute copy-button right-8 top-2 border-2 p-2 border-black'>
				Copy
			</div>
			{children}
		</pre>
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
