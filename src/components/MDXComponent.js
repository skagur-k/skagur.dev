import Image from 'next/image'
import Link from 'next/link'

export const Title = (props) => (
	<h1
		{...props}
		className='text-2xl md:text-4xl font-extrabold leading-10 mb-12 text-center'
	/>
)

const CustomLink = (props) => {
	const href = props.href
	const isInternalLink =
		href && (href.startsWith('/') || href.startsWith('#'))

	if (isInternalLink) {
		return (
			<Link href={href}>
				<a {...props}>{props.children}</a>
			</Link>
		)
	}

	return <a target='_blank' rel='noopener noreferrer' {...props} />
}

const h1 = (props) => (
	<h1 {...props} className='text-xl md:text-4xl font-bold my-4' />
)

const h2 = (props) => (
	<h2 {...props} className='text-lg md:text-xl font-bold my-4' />
)

const h3 = (props) => (
	<h3 {...props} className='text-lg md:text-lg font-bold my-4' />
)

const ResponsiveImage = (props) => {
	return <Image alt={props.alt} layout='responsive' {...props} />
}

const MDXComponents = {
	h1,
	h2,
	h3,
	img: ResponsiveImage,
	a: CustomLink,
}

export default MDXComponents
