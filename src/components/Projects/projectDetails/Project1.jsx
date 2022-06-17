import Link from '@/components/Link'

import Project1Cover from '@/public/static/images/projects/skagurdev.webp'

const Project1 = () => {
	return (
		<div className='text-sm leading-6 sm:text-base sm:leading-8 dark:text-gray-300 '>
			<p className=''>
				<span className='font-bold dark:text-gray-200'>skagur.dev</span> is a
				portfolio website designed and developed by Nam Hyuck Kim. This site is
				developed with{' '}
				<span className='font-bold dark:text-gray-200'>Next.js</span>, a
				frontend Javascript framework built upon React.js. All pages are
				statically generated, and are styled with{' '}
				<span className='font-bold dark:text-gray-200'>Tailwind CSS</span>. It
				is mostly written in javascript, but will be gradually migrated to
				typescript. Blog posts are written in{' '}
				<span className='underline'>MDX</span> and they are managed by{' '}
				<span className='font-bold dark:text-gray-200'>ContentLayer</span>. The
				project is deployed on{' '}
				<span className='font-bold dark:text-gray-200'>Vercel</span> and its
				source code can be found on GitHub🔥. Go check it out!
			</p>
		</div>
	)
}

export default Project1
