import classNames from 'classnames'
import Image from 'next/image'

//TODO: Figure out how to mask profile image with github svg
const GithubProfile = ({ ghmeta, className, ...rest }) => {
	return (
		<a target='_blank' rel='noopener noreferrer' href={ghmeta.html_url}>
			<div
				{...rest}
				className={classNames(
					className,
					'group max-w-3xl flex items-center p-6 rounded-lg bg-white dark:bg-gray-900 ring-1 ring-slate-900/10 dark:ring-sky-500 shadow-lg hover:bg-sky-500 hover:ring-sky-500 dark:hover:bg-sky-700 transition-colors'
				)}>
				<Image
					className='group-hover:text-white rounded-full'
					alt='gh-profilepic'
					layout='fixed'
					width='100'
					height='100'
					priority='true'
					src={ghmeta.avatar_url}></Image>
				<div className=' flex-column space-y-1 ml-14 pr-2'>
					<h1 className='group-hover:text-white font-bold text-2xl text-gray-800 dark:text-gray-100'>
						{ghmeta.name}
					</h1>
					<h1 className='flex items-center justify-between group-hover:text-white font-semibold'>
						<span className=''>{ghmeta.login}</span>{' '}
					</h1>
					<h1 className='group-hover:text-white font-medium text-sm text-gray-500 dark:text-gray-300 '>
						{ghmeta.location}
					</h1>
					<h1 className='group-hover:text-white font-medium text-sm text-gray-500 dark:text-gray-300'>
						{ghmeta.bio}
					</h1>
					<h1 className='group-hover:text-white font-medium text-sm text-gray-500 dark:text-gray-300'></h1>
				</div>
			</div>
		</a>
	)
}

export default GithubProfile
