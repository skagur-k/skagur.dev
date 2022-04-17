import Image from 'next/image'

const Title = (props) => (
	<h1
		{...props}
		className='text-2xl md:text-4xl font-extrabold leading-10 mb-12 text-center'
	/>
)

const h1 = (props) => (
	<h1 {...props} className='text-xl md:text-2xl font-bold my-4' />
)

const h2 = (props) => (
	<h2 {...props} className='text-lg md:text-xl font-bold my-4' />
)

const h3 = (props) => (
	<h3 {...props} className='text-lg md:text-lg font-bold my-4' />
)

const p = (props) => <p {...props} className='text-medium leading-loose' />

const ResponsiveImage = (props) => {
	return <Image alt={props.alt} layout='responsive' {...props} />
}

export { Title, h1, h2, h3, p, ResponsiveImage }
