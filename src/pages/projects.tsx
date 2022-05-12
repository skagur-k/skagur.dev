import { NextSeo } from 'next-seo'

const ProjectsPage = () => {
	return (
		<>
			<NextSeo title='Projects' />
			<div className='flex justify-between space-x-4 mb-12 leading-10'>
				<h1 className='text-3xl font-extrabold text-gray-900 dark:text-gray-100'>
					Projects
				</h1>
				<h2 className='text-gray-400 dark:text-gray-400 font-base'>
					<span className='underline decoration-wavy decoration-amber-500 underline-offset-4'>
						Things
					</span>{' '}
					I worked on.
				</h2>
			</div>
		</>
	)
}

export default ProjectsPage
