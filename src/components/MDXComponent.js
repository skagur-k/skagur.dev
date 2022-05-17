import Image from 'next/image'
import Link from 'next/link'
import {
	BiCheckSquare,
	BiError,
	BiBell,
	BiInfoCircle,
	BiLink,
} from 'react-icons/bi'
import siteMetadata from '@/data/siteMetaData'
import { FcCalendar, FcOpenedFolder, FcAlarmClock } from 'react-icons/fc'
import { format, parseISO } from 'date-fns'
import classNames from 'classnames'

export const PostInfo = ({ author, publishedAt, readingTime }) => {
	return (
		<div className='flex justify-between items-center px-0 mb-6'>
			<p className='font-semibold text-sm bg-sky-200 text-sky-800 px-2'>
				{author}
			</p>
			<div className='flex justify-center space-x-6 text-gray-400 text-xs md:text-xs font-semibold'>
				<div className='flex items-center space-x-2 justify-center'>
					<FcOpenedFolder className='w-4 h-4' />
					<p>Blog</p>
				</div>
				<div className='flex items-center space-x-2 justify-center'>
					<FcCalendar className='w-4 h-4' />
					<p>{format(parseISO(publishedAt), 'dd LLLL, yyyy')}</p>
				</div>
				<div className='flex items-center space-x-2 justify-center'>
					<FcAlarmClock className='w-4 h-4' />
					<p>{readingTime.text}</p>
				</div>
			</div>
		</div>
	)
}

export const Author = ({ name, imgsrc, description, ...rest }) => {
	return (
		<article className='author-info'>
			<div>
				<Image
					layout='intrinsic'
					priority='true'
					src={imgsrc}
					alt='Profile Picture'
					className='author-img'
					width={100}
					height={100}
				/>
			</div>
			<div className='author-details'>
				<a className='author-name' href={siteMetadata.github} {...rest}>
					{name}
				</a>
				<p className='author-description'>{description}</p>
			</div>
		</article>
	)
}

const Alert = ({ type, children, ...rest }) => {
	const iconClassName = 'w-6 h-6 mr-2'

	const data = {
		note: {
			color: 'bg-blue-100',
			textColor: 'text-blue-900',
			borderColor: 'border-blue-900',
			text: 'Note',
			icon: <BiInfoCircle className={iconClassName} />,
		},
		tip: {
			color: 'bg-green-100',
			textColor: 'text-green-900',
			borderColor: 'border-green-900',
			text: 'Tip',
			icon: <BiCheckSquare className={iconClassName} />,
		},
		warning: {
			color: 'bg-red-100',
			textColor: 'text-red-900',
			borderColor: 'border-red-900',
			text: 'Warning',
			icon: <BiBell className={iconClassName} />,
		},
		important: {
			color: 'bg-yellow-100',
			textColor: 'text-yellow-900',
			borderColor: 'border-yellow-900',
			text: 'Important',
			icon: <BiError className={iconClassName} />,
		},
	}
	const alert = data[type]
	return (
		<div
			role='warning'
			className={`alert flex items-center ${alert.color} ${alert.textColor} dark:bg-opacity-100 dark:shadow-none my-6 mx-4 px-4 py-2 rounded-lg shadow-xl dark:shadow-gray-700`}>
			<div className='flex items-center'>
				<i>{alert.icon}</i>
				<span className='font-semibold mr-3'>{alert.text}:</span>
			</div>
			<div className='text-sm sm:text-base'>{children}</div>
		</div>
	)
}

const a = ({ children, href, ...rest }) => {
	const isInternalLink =
		href && (href.startsWith('/') || href.startsWith('#'))

	if (isInternalLink) {
		return (
			<Link href={href}>
				<a
					{...rest}
					className='underline font-bold hover:text-sky-500 hover:underline decoration-2'>
					{children}
				</a>
			</Link>
		)
	}

	return (
		<a
			target='_blank'
			rel='noopener noreferrer'
			href={href}
			{...rest}
			className={`inline-flex relative items-center underline hover:text-sky-500 font-bold hover:underline decoration-2`}>
			{children}
			{/* <BiLink className='ml-1 absolute w-6 h-6 stroke-0' /> */}
		</a>
	)
}

const h1 = (props) => (
	<h1 {...props} className='text-2xl sm:text-3xl decoration-transparent' />
)

const h2 = (props) => (
	<h2 {...props} className='text-xl sm:text-2xl decoration-transparent' />
)

const h3 = (props) => (
	<h3 {...props} className='text-lg sm:text-xl decoration-transparent' />
)

const code = (props) => (
	<code
		{...props}
		className={classNames(
			props.className,
			`before:content-none after:content-none text-white bg-gray-600`
		)}
	/>
)

const del = (props) => (
	<del
		{...props}
		className='line-through decoration-wavy decoration-4 decoration-red-500'
	/>
)

const Img = ({ src, alt, width, height, caption }) => {
	return (
		<figure>
			<Image
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
	return (
		<strong
			{...props}
			className='bg-sky-100 dark:bg-sky-200 dark:text-gray-900 font-semibold mx-0 px-1'></strong>
	)
}

const blockquote = (props) => {
	return (
		<blockquote
			{...props}
			className='borde-rl-0 border-l-sky-300/40 ml-0 my-4 px-4'
		/>
	)
}

const MDXComponents = {
	h1,
	h2,
	h3,
	a,
	Alert,
	Img,
	code,
	strong,
	blockquote,
	del,
}

export default MDXComponents
