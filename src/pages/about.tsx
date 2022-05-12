import MotionLayout from '@/components/Layouts/MotionLayout'
import { NextSeo } from 'next-seo'

const AboutPage = () => {
	return (
		<>
			<NextSeo title='About' />
			<div className='flex justify-between space-x-4 mb-12 leading-10'>
				<h1 className='text-3xl font-bold text-gray-900 dark:text-gray-100'>
					About me
				</h1>
				<h2 className='text-gray-400 dark:text-gray-400  '>
					<span className='underline decoration-wavy decoration-amber-500 underline-offset-4'>
						Everything
					</span>{' '}
					about me.
				</h2>
			</div>
		</>
	)
}

export default AboutPage
