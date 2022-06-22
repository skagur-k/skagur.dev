const PageNotFound = () => {
	return (
		<div className='flex flex-col items-center justify-center space-y-8'>
			<div className='flex items-center justify-center space-x-4'>
				<h1 className='text-5xl text-amber-500 font-bold'>404</h1>
				<div className='width-4 bg-amber-500' />
				<h3 className='text-3xl font-bold'>Page Not Found</h3>
			</div>
			<p className='font-bold text-gray-500'>The URL of the page was not found.</p>
		</div>
	)
}

export default PageNotFound
