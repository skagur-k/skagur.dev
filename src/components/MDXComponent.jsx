import Image from 'next/image'
import copy from 'copy-text-to-clipboard'
import Link from '@/components/Link'
import { format, parseISO } from 'date-fns'
import classNames from 'classnames'
import { FiClock } from 'react-icons/fi'
import { FaRegCalendar } from 'react-icons/fa'
import { BiBell, BiCheckSquare, BiError, BiInfoCircle } from 'react-icons/bi'
import ViewCounter from './ViewCounter/ViewCounter'

export const PostInfo = ({ author, publishedAt, readingTime, slug }) => {
	return (
		<div className='flex flex-col sm:flex-row justify-start items-start space-y-3 sm:justify-between sm:items-center px-0 mb-6'>
			<Link href='/about'>
				<p data-tip='Written by' className='font-bold text-base rounded-md hover:text-sky-500'>
					{author}
				</p>
			</Link>
			<div className='flex justify-center space-x-2  text-sm md:text-sm font-medium'>
				<div className='flex items-center space-x-1 justify-center'>
					<FiClock className='stroke-[3px]' />
					<p className=''>{readingTime.text}</p>
				</div>
				<p>·</p>
				<div className='flex items-center space-x-1	 justify-center '>
					<FaRegCalendar className='stroke-2' />
					<p>{format(parseISO(publishedAt), 'LLL dd, yyyy')}</p>
				</div>
				<p>·</p>
				<div className='flex items-center space-x-2 justify-center'>
					<ViewCounter slug={slug} />
				</div>
			</div>
		</div>
	)
}

const Alert = ({ type, children, ...rest }) => {
	const iconClassName = 'w-6 h-6 mr-2'

	const data = {
		note: {
			color: 'bg-slate-50',
			textColor: 'text-slate-900',
			borderColor: 'bg-slate-400 ',
			text: 'NOTE',
			icon: <BiInfoCircle className={iconClassName} />,
		},
		tip: {
			color: 'bg-green-50',
			textColor: 'text-green-900',
			borderColor: 'bg-green-400',
			text: 'TIP',
			icon: <BiCheckSquare className={iconClassName} />,
		},
		warning: {
			color: 'bg-red-50',
			textColor: 'text-red-900',
			borderColor: 'bg-red-400',
			text: 'WARNING',
			icon: <BiBell className={iconClassName} />,
		},
		caution: {
			color: 'bg-yellow-50',
			textColor: 'text-yellow-900',
			borderColor: 'bg-yellow-400',
			text: 'CAUTION',
			icon: <BiError className={iconClassName} />,
		},
	}
	const alert = data[type]
	return (
		<div role='warning' className={`relative flex-col items-center ${alert.color} ${alert.textColor} my-6 px-4 py-4 rounded-lg shadow-md`}>
			<div className={`absolute w-1 h-full left-0 top-0 rounded-l-md ${alert.borderColor}`} />
			<div className='flex items-center'>
				<i>{alert.icon}</i>
				<span className='font-semibold mr-3 text-sm'>{alert.text}:</span>
			</div>
			<div className='text-sm sm:text-base mt-2'>{children}</div>
		</div>
	)
}

const a = ({ children, href, className }) => {
	return (
		<span>
			<Link href={href} className={classNames(className, 'font-bold hover:text-sky-500 no-underline')}>
				{children}
			</Link>
		</span>
	)
}

const h1 = (props) => <h1 {...props} className='text-2xl sm:text-3xl' />

const h2 = (props) => <h2 {...props} className='text-xl sm:text-2xl' />

const h3 = (props) => <h3 {...props} className='text-lg sm:text-xl' />

const code = (props) => <code {...props} className={classNames(props.className, `before:content-none after:content-none`)} />

const del = (props) => <del {...props} className='line-through decoration-wavy decoration-4 decoration-red-500' />

const Img = ({ src, alt, width, height, caption }) => {
	return (
		<figure>
			<Image layout='responsive' priority='true' src={src} alt={alt} width={width} height={height} />
			<figcaption className='text-center font-semibold text-base'>{caption ?? null}</figcaption>
		</figure>
	)
}

const strong = (props) => {
	return <strong {...props} className='bg-sky-100 dark:bg-sky-200 dark:text-gray-900 font-semibold mx-0 px-1'></strong>
}

const blockquote = (props) => {
	return <blockquote {...props} className='borde-rl-0 border-l-sky-300/40 ml-0 my-4 px-4' />
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
