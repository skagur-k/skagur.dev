import Image from 'next/image'
import Link from 'next/link'
import { BiCheckSquare, BiError, BiBell, BiInfoCircle } from 'react-icons/bi'
import SocialIcon from '@/components/SocialIcon'
import siteMetadata from '@/data/siteMetaData'

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
	console.log(alert)
	return (
		<div
			role='warning'
			className={`alert flex items-center ${alert.color} ${alert.textColor} bg-opacity-90 my-6 px-4 py-4 rounded-xl shadow-xl dark:shadow-gray-700`}>
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

const h1 = (props) => <h1 {...props} className='text-2xl sm:text-2xl' />

const h2 = (props) => <h2 {...props} className='text-xl sm:text-xl' />

const h3 = (props) => <h3 {...props} className='text-lg sm:text-lg' />

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

const MDXComponents = {
	h1,
	h2,
	h3,
	a,
	Alert,
	Img,
}

export default MDXComponents
