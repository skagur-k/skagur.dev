import Image from 'next/image'
import Link from 'next/link'
import { FaLink, FaInfoCircle } from 'react-icons/fa'
import { BsExclamationCircleFill, BsFillCheckSquareFill } from 'react-icons/bs'
import { RiAlarmWarningFill } from 'react-icons/ri'
import { AiFillWarning } from 'react-icons/ai'

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

const Alert = ({ type, children, ...rest }) => {
	const iconClassName = 'w-4 h-4 mr-2'

	const data = {
		note: {
			color: 'bg-blue-100',
			textColor: 'text-blue-900',
			text: 'Note',
			icon: <FaInfoCircle className={iconClassName} />,
		},
		tip: {
			color: 'bg-green-100',
			textColor: 'text-green-900',
			text: 'Tip',
			icon: <BsFillCheckSquareFill className={iconClassName} />,
		},
		warning: {
			color: 'bg-red-100',
			textColor: 'text-red-900',
			text: 'Warning',
			icon: <RiAlarmWarningFill className={iconClassName} />,
		},
		important: {
			color: 'bg-yellow-100',
			textColor: 'text-yellow-900',
			text: 'Important',
			icon: <AiFillWarning className={iconClassName} />,
		},
	}

	const alert = data[type]
	console.log(alert)
	return (
		<div
			role='warning'
			className={`alert flex items-center ${alert.color} ${alert.textColor} bg-opacity-90 my-6 px-6 py-6 rounded-2xl shadow-md`}>
			<i className='inline-block'>{alert.icon}</i>
			<span className='font-semibold mr-3'>{alert.text}:</span>
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
	Alert,
	img: ResponsiveImage,
}

export default MDXComponents
