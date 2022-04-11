import Link from '@/components/Link'

const PageNotFound = () => {
	return (
		<div className='flex flex-col mt-48 items-center justify-center space-y-8'>
			<div className='flex items-center justify-center space-x-4'>
				<h1 className='text-5xl text-amber-500 font-bold'>404</h1>
				<div className='width-4 bg-amber-500' />
				<h3 className='text-3xl font-bold'>Page Not Found</h3>
			</div>
			<p className='font-bold text-gray-500'>
				The URL of the page was not found.
			</p>
			<Link href='/' className=''>
				<button className='bg-slate-700 text-white py-2 px-4 rounded-md'>
					Go Home
				</button>
			</Link>
		</div>
	)
}

export default PageNotFound
