import classNames from 'classnames'
import Image from 'next/image'
import { SiGithub } from 'react-icons/si'
import Link from '@/components/Link/Link'

const GithubProfile = ({ ghmeta, className, ...rest }) => {
	return (
		<Link href={ghmeta.html_url} className='flex'>
			<div
				{...rest}
				className={classNames(
					className,
					'group flex flex-1 items-center p-6 rounded-lg bg-white dark:bg-gray-900 ring-1 ring-slate-900/10 dark:ring-sky-500 shadow-lg hover:bg-sky-500 hover:ring-sky-500 dark:hover:bg-sky-700 transition-colors'
				)}>
				{ghmeta && (
					<Image
						className='group-hover:text-white rounded-full'
						alt='gh-profilepic'
						layout='fixed'
						width='100'
						height='100'
						priority={true}
						quality={100}
						src={ghmeta.avatar_url}
					/>
				)}

				<div className='flex justify-between items-center'>
					<div className='flex flex-col space-y-1 ml-8 pr-2'>
						<h1 className='group-hover:text-white flex items-center font-bold text-sm sm:text-xl text-gray-800 dark:text-gray-100'>
							{ghmeta.name}
							<SiGithub className='group-hover:text-white w-6 h-6 ml-4' />
						</h1>
						<h1 className='group-hover:text-white font-semibold text-gray-800 dark:text-gray-300'>
							<span className=''>{ghmeta.login}</span>{' '}
						</h1>
						<h1 className='group-hover:text-white font-medium text-sm text-gray-500 dark:text-gray-300'>
							{ghmeta.location}
						</h1>
						<h1 className='group-hover:text-white font-medium text-sm text-gray-500 dark:text-gray-300'>
							{ghmeta.bio}
						</h1>
						<h1 className='group-hover:text-white font-medium text-sm text-gray-500 dark:text-gray-300'></h1>
					</div>
				</div>
			</div>
		</Link>
	)
}

export default GithubProfile
