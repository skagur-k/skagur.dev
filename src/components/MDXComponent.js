import Image from 'next/image'
import Link from 'next/link'
import { BiCheckSquare, BiError, BiBell, BiInfoCircle } from 'react-icons/bi'

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

const Alert = ({ type, children, ...rest }) => {
	const iconClassName = 'w-6 h-6 mr-2'

	const data = {
		note: {
			color: 'bg-blue-100',
			textColor: 'text-blue-900',
			text: 'Note',
			icon: <BiInfoCircle className={iconClassName} />,
		},
		tip: {
			color: 'bg-green-100',
			textColor: 'text-green-900',
			text: 'Tip',
			icon: <BiCheckSquare className={iconClassName} />,
		},
		warning: {
			color: 'bg-red-100',
			textColor: 'text-red-900',
			text: 'Warning',
			icon: <BiBell className={iconClassName} />,
		},
		important: {
			color: 'bg-yellow-100',
			textColor: 'text-yellow-900',
			text: 'Important',
			icon: <BiError className={iconClassName} />,
		},
	}

	const alert = data[type]
	console.log(alert)
	return (
		<div
			role='warning'
			className={`alert flex items-center ${alert.color} ${alert.textColor} dark:bg-opacity-70 bg-opacity-90 my-6 px-4 py-4 rounded-3xl shadow-lg`}>
			<div className='flex items-center'>
				<i>{alert.icon}</i>
				<span className='font-semibold mr-3'>{alert.text}:</span>
			</div>
			{children}
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

const h1 = (props) => <h1 {...props} className='text-lg md:text-2xl' />

const h2 = (props) => <h2 {...props} className='text-lg md:text-xl' />

const h3 = (props) => <h3 {...props} className='text-lg md:text-lg' />

const Img = ({ src, alt, width, height, caption }) => {
	return (
		<figure>
			<Image
				className='rounded-3xl shadow-2xl'
				layout='responsive'
				priority='true'
				src={src}
				alt={alt}
				width={width}
				height={height}
			/>
			<figcaption className='text-center font-semibold text-base'>
				{caption ?? null}
			</figcaption>
		</figure>
	)
}

const strong = (props) => {
	return <strong className='inline shadow-2xl' {...props} />
}

const MDXComponents = {
	h1,
	h2,
	h3,
	a,
	Alert,
	strong,
	Img,
}

export default MDXComponents
